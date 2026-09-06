import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CircleAlert,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import RecoveryBrandPanel from "../components/RecoveryBrandPanel";

export default function ForgotPassword() {
  const { sendPasswordReset } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);

    try {
      await sendPasswordReset(email);
      navigate("/check-email", { state: { email } });
    } catch (err: any) {
      setError(err?.message || "We could not send the reset link.");
    }
  };

  return (
    <>
      <div className="flex w-full items-center bg-background p-8">
        <div className="w-full max-w-sm">
          <div className="mb-8">
            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-primary-brand/30 bg-primary-brand/10 text-primary-brand">
              <LockKeyhole className="h-5 w-5" aria-hidden="true" />
            </div>
            <h2 className="mb-2 text-2xl font-bold text-on-surface">
              Reset Password
            </h2>
            <p className="text-sm leading-relaxed text-on-surface-muted">
              Enter the email address associated with your account.
              <br />
              We&apos;ll send you a secure verification link to recover your
              <br className="hidden sm:block" /> garage access.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label
                className="mb-1 block text-xs font-semibold uppercase tracking-wider text-on-surface-muted"
                htmlFor="reset-email"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-on-surface-muted/50" />
                <input
                  type="email"
                  id="reset-email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="enthusiast@wheelybits.com"
                  autoComplete="email"
                  required
                  className="w-full rounded-lg border border-outline-subtle bg-surface-highest py-3 pl-10 pr-4 font-medium text-on-surface placeholder:text-on-surface-muted/50 focus:border-primary-brand focus:outline-none focus:ring-1 focus:ring-primary-brand"
                />
              </div>
            </div>
            <div className="rounded-lg border border-outline-subtle/50 bg-background/30 px-3 py-3 text-xs leading-relaxed text-on-surface-muted">
              <div className="flex gap-2">
                <ShieldCheck
                  className="mt-0.5 h-4 w-4 shrink-0 text-primary-brand"
                  aria-hidden="true"
                />
                <p>
                  For your security, reset links expire after 30 minutes. Make
                  sure to check your spam folder if it doesn&apos;t arrive
                  shortly.
                </p>
              </div>
            </div>
            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-2 rounded-lg bg-primary-brand py-4 font-bold text-on-primary shadow-lg shadow-primary-brand/10 transition-colors hover:bg-primary"
            >
              <span>Send Reset Link</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>

          {error && (
            <div className="auth-error" role="alert" aria-live="polite">
              <CircleAlert className="h-5 w-5" aria-hidden="true" />
              <p>{error}</p>
            </div>
          )}

          <div className="mt-6 flex items-start justify-between border-t border-outline-subtle/40 pt-5 text-sm leading-relaxed text-on-surface-muted">
            <span>
              Remember your password?{" "}
              <Link
                to="/login"
                className="text-primary-brand hover:text-primary"
              >
                Log
                <br /> In
              </Link>
            </span>
            <span>
              Need Help?{" "}
              <Link
                to="/contact"
                className="text-on-surface hover:text-primary"
              >
                Contact
                <br /> Support
              </Link>
            </span>
          </div>
        </div>
      </div>

      <RecoveryBrandPanel />
    </>
  );
}
