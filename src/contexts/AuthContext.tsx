import React, { createContext, useContext, useEffect, useState } from "react";
import type { User, ConfirmationResult } from "firebase/auth";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import {
  confirmPasswordReset as resetPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
} from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (
    email: string,
    password: string,
    displayName?: string,
  ) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  sendPasswordReset: (email: string) => Promise<void>;
  confirmPasswordReset: (code: string, password: string) => Promise<void>;
  resendEmailVerification: () => Promise<void>;
  sendPhoneVerification: (phone: string) => Promise<void>;
  confirmPhoneCode: (code: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const getFriendlyAuthError = (error: unknown) => {
  const code = (error as { code?: unknown })?.code;
  if (
    code === "auth/invalid-credential" ||
    code === "auth/user-not-found" ||
    code === "auth/wrong-password"
  ) {
    return new Error("Email or password is incorrect.");
  }
  if (code === "auth/email-already-in-use") {
    return new Error(
      "An account already exists with this email address. Try signing in instead, or use a different email.",
    );
  }
  if (code === "auth/too-many-requests") {
    return new Error(
      "We have temporarily paused attempts from this device for security. Please wait a few minutes and try again.",
    );
  }
  return error;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const confirmationResultRef = React.useRef<ConfirmationResult | null>(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const login = async (email: string, password: string) => {
    let cred;
    try {
      cred = await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw getFriendlyAuthError(error);
    }
    // If email is not verified, prevent access and ask user to verify
    const u = cred.user;
    if (u && !u.emailVerified) {
      await signOut(auth);
      throw new Error(
        "Please verify your email address. Check your inbox for a verification email.",
      );
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    let cred;
    try {
      cred = await signInWithPopup(auth, provider);
    } catch (error) {
      throw getFriendlyAuthError(error);
    }
    if (cred.user) setUser(cred.user);
  };

  const resendEmailVerification = async () => {
    const user = auth.currentUser;
    if (!user)
      throw new Error("No authenticated user to resend verification to.");
    await sendEmailVerification(user);
  };

  const sendPasswordReset = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      throw getFriendlyAuthError(error);
    }
  };

  const confirmPasswordReset = async (code: string, password: string) => {
    await resetPassword(auth, code, password);
  };

  const sendPhoneVerification = async (phone: string) => {
    // Ensure a reCAPTCHA verifier is created and attached to the page.
    try {
      const win = window as any;
      // Always (re)create the verifier to avoid stale / removed widgets.
      try {
        win.recaptchaVerifier = new RecaptchaVerifier(
          auth,
          "recaptcha-container",
          { size: "invisible" },
        );
      } catch (e) {
        // ignore construction errors and try to proceed
      }

      const verifier = win.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, phone, verifier);
      confirmationResultRef.current = result;
    } catch (err) {
      // Surface friendlier error for region-restricted projects
      const code = (err as any)?.code || (err as any)?.message || "";
      if (typeof code === "string" && code.includes("operation-not-allowed")) {
        throw new Error(
          "Phone/SMS for this project or region is not allowed by Firebase. Add test phone numbers in the Console or contact Firebase Support to enable SMS for the region.",
        );
      }
      throw err;
    }
  };

  const confirmPhoneCode = async (code: string) => {
    if (!confirmationResultRef.current)
      throw new Error("No verification in progress");
    const cred = await confirmationResultRef.current.confirm(code);
    if (cred.user) setUser(cred.user);
  };

  const signup = async (
    email: string,
    password: string,
    displayName?: string,
  ) => {
    let cred;
    let verificationAlreadySent = false;
    try {
      cred = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName && cred.user) {
        await updateProfile(cred.user, { displayName });
      }
    } catch (error) {
      if ((error as { code?: unknown })?.code === "auth/email-already-in-use") {
        try {
          cred = await signInWithEmailAndPassword(auth, email, password);
        } catch {
          throw new Error(
            "This email is already registered but has not been verified. Use the password created with this account, then sign in to resend the verification email.",
          );
        }

        if (cred.user.emailVerified) {
          throw getFriendlyAuthError(error);
        }

        await sendEmailVerification(cred.user);
        verificationAlreadySent = true;
      } else {
        throw getFriendlyAuthError(error);
      }
    }
    // Send verification email. If VITE_USE_SENDGRID is true, POST to the external
    // send server (which uses SendGrid) to improve deliverability. Otherwise
    // fall back to Firebase's sendEmailVerification.
    if (cred.user && !verificationAlreadySent) {
      // eslint-disable-next-line no-console
      console.log("Sending verification email to", cred.user.email);

      const useSendGrid = import.meta.env.VITE_USE_SENDGRID === "true";
      if (useSendGrid) {
        const serverUrl =
          import.meta.env.VITE_VERIFICATION_SERVER_URL ||
          "http://localhost:4000";
        const res = await fetch(`${serverUrl}/sendVerification`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: cred.user.email }),
        });
        if (!res.ok) {
          const body = await res.json().catch(() => ({}));
          throw new Error(
            body.error || `Failed to send verification via ${serverUrl}`,
          );
        }
      } else {
        await sendEmailVerification(cred.user);
      }
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signInWithGoogle,
        sendPasswordReset,
        confirmPasswordReset,
        resendEmailVerification,
        signup,
        logout,
        sendPhoneVerification,
        confirmPhoneCode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
