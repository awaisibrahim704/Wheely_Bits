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
import { sendEmailVerification } from "firebase/auth";
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
  resendEmailVerification: () => Promise<void>;
  sendPhoneVerification: (phone: string) => Promise<void>;
  confirmPhoneCode: (code: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

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
    const cred = await signInWithEmailAndPassword(auth, email, password);
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
    const cred = await signInWithPopup(auth, provider);
    if (cred.user) setUser(cred.user);
  };

  const resendEmailVerification = async () => {
    const user = auth.currentUser;
    if (!user)
      throw new Error("No authenticated user to resend verification to.");
    await sendEmailVerification(user);
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
    const cred = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName && cred.user) {
      await updateProfile(cred.user, { displayName });
    }
    // Send verification email. Let failures propagate so the UI can surface them.
    if (cred.user) {
      // eslint-disable-next-line no-console
      console.log("Sending verification email to", cred.user.email);
      await sendEmailVerification(cred.user);
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
