import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, Check, Clock3, Mail, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import RecoveryBrandPanel from "../components/RecoveryBrandPanel";
import { useAuth } from "../contexts/AuthContext";

export default function CheckEmail() {
  const location = useLocation();
  const { sendPasswordReset } = useAuth();
  const email =
    (location.state as { email?: string } | null)?.email ||
    "your email address";
  const [secondsLeft, setSecondsLeft] = useState(48);
  const [resendError, setResendError] = useState<string | null>(null);
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (secondsLeft === 0) return;

    const timer = window.setInterval(() => {
      setSecondsLeft((seconds) => Math.max(0, seconds - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [secondsLeft]);

  const handleOpenEmail = () => {
    if (email !== "your email address") {
      window.location.href = `mailto:${encodeURIComponent(email)}`;
    }
  };

  const handleResend = async () => {
    if (secondsLeft > 0 || resending || email === "your email address") return;

    setResendError(null);
    setResending(true);
    try {
      await sendPasswordReset(email);
      setSecondsLeft(48);
    } catch (error: any) {
      setResendError(error?.message || "We could not resend the reset email.");
    } finally {
      setResending(false);
    }
  };

  return (
    <>
      <div className="flex w-full items-center bg-background p-8">
        <div className="w-full max-w-sm">
          <div className="mb-6">
            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-primary-brand/30 bg-primary-brand/10 text-primary-brand">
              <Mail className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-primary-brand/40 bg-primary-brand/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-brand">
              <Check className="h-3 w-3" /> Link Dispatched
            </div>
            <h2 className="mb-2 text-2xl font-bold text-on-surface">
              Check Your Email
            </h2>
            <p className="text-sm leading-relaxed text-on-surface-muted">
              We&apos;ve dispatched a secure verification link to:
            </p>
          </div>

          <div className="mb-4 flex items-center justify-between rounded-lg border border-outline-subtle bg-surface-highest px-3 py-3 text-sm">
            <span className="flex min-w-0 items-center gap-2 truncate">
              <Mail className="h-4 w-4 shrink-0 text-primary-brand" />
              {email}
            </span>
            <span className="ml-3 rounded border border-primary-brand/30 bg-primary-brand/10 px-2 py-1 text-[10px] text-primary-brand">
              Active
            </span>
          </div>
          <div className="mb-4 flex gap-2 rounded-lg border border-outline-subtle/50 bg-surface px-3 py-3 text-xs leading-relaxed text-on-surface-muted">
            <Clock3 className="mt-0.5 h-4 w-4 shrink-0 text-primary-brand" />
            <p>
              The secure link is valid for{" "}
              <strong className="text-on-surface">30 minutes</strong>. If you
              don&apos;t find it in your primary inbox, please inspect your spam
              or junk folder.
            </p>
          </div>
          <button
            type="button"
            onClick={handleOpenEmail}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-brand py-4 font-bold text-on-primary shadow-lg shadow-primary-brand/10 hover:bg-primary"
          >
            Open Email Client <ArrowLeft className="h-4 w-4 rotate-180" />
          </button>
          <button
            type="button"
            onClick={handleResend}
            disabled={secondsLeft > 0 || resending}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg border border-outline-subtle py-3 text-sm font-semibold text-on-surface transition-colors hover:border-primary-brand disabled:cursor-not-allowed disabled:opacity-50"
          >
            <RefreshCw
              className={`h-4 w-4 ${resending ? "animate-spin" : ""}`}
            />
            {resending
              ? "Sending Email..."
              : secondsLeft > 0
                ? `Resend Email (0:${String(secondsLeft).padStart(2, "0")})`
                : "Resend Email"}
          </button>
          {resendError && (
            <p className="mt-2 text-xs text-red-300" role="alert">
              {resendError}
            </p>
          )}
          <div className="my-5 flex items-center gap-4 text-xs text-on-surface-muted">
            <span className="h-px flex-1 bg-outline-subtle/50" />
            OR
            <span className="h-px flex-1 bg-outline-subtle/50" />
          </div>
          <div className="flex justify-between text-sm text-on-surface-muted">
            <span>
              Wrong email address?{" "}
              <Link to="/forgot-password" className="text-primary-brand">
                Change
              </Link>
            </span>
            <span>
              Need Help?{" "}
              <Link to="/contact" className="text-on-surface">
                Support
              </Link>
            </span>
          </div>
        </div>
      </div>
      <RecoveryBrandPanel />
    </>
  );
}
