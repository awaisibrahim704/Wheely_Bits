import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, CircleAlert } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { login, signInWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const { sendPhoneVerification, confirmPhoneCode } = useAuth();
  const [usePhone, setUsePhone] = useState(false);
  const [phone, setPhone] = useState("");
  const [code, setCode] = useState("");
  const [phoneStep, setPhoneStep] = useState<"enter" | "verify">("enter");
  const [phoneError, setPhoneError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      await login(email, password);
      navigate("/garage");
    } catch (err: any) {
      setError(err?.message || "Failed to sign in");
    }
  };

  const handleGoogle = async () => {
    setError(null);
    try {
      await signInWithGoogle();
      navigate("/garage");
    } catch (err: any) {
      setError(err?.message || "Failed to sign in with Google");
    }
  };

  const handleSendCode = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setPhoneError(null);
    try {
      await sendPhoneVerification(phone);
      setPhoneStep("verify");
    } catch (err: any) {
      setPhoneError(err?.message || "Failed to send verification code");
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setPhoneError(null);
    try {
      await confirmPhoneCode(code);
      navigate("/garage");
    } catch (err: any) {
      setPhoneError(err?.message || "Failed to verify code");
    }
  };

  return (
    <>
      {/* Left Side: Form Container */}
      <div className="w-full flex items-center justify-center p-8 bg-background relative z-20">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-2xl font-bold text-on-surface mb-2">
              Welcome Back
            </h2>
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email Field */}
            <div>
              <label
                className="block text-xs font-semibold text-on-surface-muted mb-1 uppercase tracking-wider"
                htmlFor="email"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-muted/50 w-5 h-5" />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="enthusiast@wheelybits.com"
                  className="w-full bg-surface-highest border border-outline-subtle text-on-surface font-medium rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-primary-brand focus:border-primary-brand transition-all duration-300 placeholder:text-on-surface-muted/50"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  className="block text-xs font-semibold text-on-surface-muted uppercase tracking-wider"
                  htmlFor="password"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-xs font-semibold text-primary-brand hover:text-primary transition-colors"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-muted/50 w-5 h-5" />
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-surface-highest border border-outline-subtle text-on-surface font-medium rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-primary-brand focus:border-primary-brand transition-all duration-300 placeholder:text-on-surface-muted/50"
                />
              </div>
            </div>

            {/* Action Button */}
            <button
              type="submit"
              className="w-full bg-primary-brand text-on-primary font-bold py-4 rounded-lg hover:bg-primary transition-colors duration-300 shadow-lg hover:shadow-primary-brand/20 flex items-center justify-center gap-2 mt-4 group"
            >
              <span>Login</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
          {error && (
            <div className="auth-error" role="alert" aria-live="polite">
              <CircleAlert className="h-5 w-5" aria-hidden="true" />
              <p>{error}</p>
            </div>
          )}

          {/* Divider */}
          <div className="mt-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-outline-subtle/50"></div>
            <span className="text-xs font-medium text-on-surface-muted">
              OR
            </span>
            <div className="flex-1 h-px bg-outline-subtle/50"></div>
          </div>

          {/* Google Sign-in */}
          <div className="mt-4 flex justify-center">
            <button
              onClick={handleGoogle}
              type="button"
              className="w-full max-w-sm flex items-center justify-center gap-2 border border-outline-subtle rounded-lg py-3 px-4 hover:shadow-sm"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M21.35 11.1h-9.18v2.92h5.26c-.23 1.38-1.36 3.08-5.26 3.08-3.16 0-5.73-2.6-5.73-5.8s2.57-5.8 5.73-5.8c1.8 0 3.01.77 3.7 1.43l2.53-2.43C17.34 3.08 15.48 2 12.17 2 7.48 2 3.8 5.67 3.8 10.5s3.68 8.5 8.36 8.5c4.82 0 8.2-3.38 8.2-8.17 0-.55-.06-.94-.01-1.73z"
                  fill="#4285F4"
                />
              </svg>
              <span className="text-sm font-semibold">
                Continue with Google
              </span>
            </button>
          </div>

          {/* Phone sign-in toggle and UI */}
          <div className="mt-4 text-center">
            <button
              className="text-sm font-medium text-primary-brand hover:text-primary"
              onClick={() => setUsePhone((v) => !v)}
              type="button"
            >
              {usePhone ? "Use email instead" : "Sign in with phone"}
            </button>
          </div>

          {usePhone && (
            <div className="mt-4">
              {phoneStep === "enter" ? (
                <form onSubmit={handleSendCode} className="space-y-3">
                  <label className="block text-xs font-semibold text-on-surface-muted mb-1">
                    Phone number
                  </label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+12345678900"
                    className="w-full bg-surface-highest border border-outline-subtle rounded-lg py-3 px-3"
                  />
                  <div className="flex gap-2">
                    <button
                      className="bg-primary-brand text-on-primary px-4 py-2 rounded"
                      type="submit"
                    >
                      Send code
                    </button>
                    <button
                      className="px-4 py-2 rounded border"
                      type="button"
                      onClick={() => {
                        // Fill with env-provided test credentials if available
                        const testPhone = import.meta.env.VITE_TEST_PHONE || "";
                        const testCode = import.meta.env.VITE_TEST_CODE || "";
                        if (testPhone) setPhone(testPhone);
                        if (testCode) {
                          setCode(testCode);
                          setPhoneStep("verify");
                        }
                      }}
                    >
                      Use test creds
                    </button>
                    <button
                      className="px-4 py-2 rounded border"
                      type="button"
                      onClick={() => setUsePhone(false)}
                    >
                      Cancel
                    </button>
                  </div>
                  {phoneError && (
                    <div className="auth-error" role="alert" aria-live="polite">
                      <CircleAlert className="h-5 w-5" aria-hidden="true" />
                      <p>{phoneError}</p>
                    </div>
                  )}
                </form>
              ) : (
                <form onSubmit={handleVerifyCode} className="space-y-3">
                  <label className="block text-xs font-semibold text-on-surface-muted mb-1">
                    Verification code
                  </label>
                  <input
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="123456"
                    className="w-full bg-surface-highest border border-outline-subtle rounded-lg py-3 px-3"
                  />
                  <div className="flex gap-2">
                    <button
                      className="bg-primary-brand text-on-primary px-4 py-2 rounded"
                      type="submit"
                    >
                      Verify
                    </button>
                    <button
                      className="px-4 py-2 rounded border"
                      type="button"
                      onClick={() => {
                        setPhoneStep("enter");
                        setCode("");
                      }}
                    >
                      Back
                    </button>
                    <button
                      className="px-4 py-2 rounded border"
                      type="button"
                      onClick={() => {
                        const testCode = import.meta.env.VITE_TEST_CODE || "";
                        if (testCode) setCode(testCode);
                      }}
                    >
                      Fill test code
                    </button>
                  </div>
                  {phoneError && (
                    <div className="auth-error" role="alert" aria-live="polite">
                      <CircleAlert className="h-5 w-5" aria-hidden="true" />
                      <p>{phoneError}</p>
                    </div>
                  )}
                </form>
              )}
            </div>
          )}

          {/* Secondary Action */}
          <div className="mt-6 text-center text-sm font-medium text-on-surface-muted">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-primary-brand hover:text-primary transition-colors font-semibold underline underline-offset-4 decoration-primary-brand/50 hover:decoration-primary-brand"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>

      {/* Right Side: Brand Showcase */}
      <div className="hidden md:flex relative bg-surface items-center justify-center overflow-hidden border-l border-outline-subtle">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-surface-low/80 via-surface/80 to-surface-low/80 z-0"></div>

        {/* Abstract shapes */}
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary-brand/5 rounded-full blur-3xl z-0"></div>
        <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-secondary-brand/5 rounded-full blur-3xl z-0"></div>

        <div className="relative z-10 text-center px-12">
          <h2 className="text-5xl font-bold animate-shimmer-text tracking-tight mb-6">
            Wheely Bits
          </h2>
          <p className="text-lg text-on-surface-muted max-w-sm mx-auto opacity-80 leading-relaxed">
            Precision engineering meets organic design. A sophisticated platform
            for automotive enthusiasts who demand clarity and performance.
          </p>
        </div>

        {/* Structural lines overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-0 opacity-10"
          style={{
            backgroundImage:
              "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        ></div>
      </div>
    </>
  );
}
