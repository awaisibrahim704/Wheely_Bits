import { Link, useNavigate, useSearchParams } from "react-router-dom";
import {
  ArrowRight,
  Check,
  CircleAlert,
  Eye,
  EyeOff,
  LockKeyhole,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import RecoveryBrandPanel from "../components/RecoveryBrandPanel";

export default function CreateNewPassword() {
  const { confirmPasswordReset } = useAuth();
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    if (password.length < 8)
      return setError("Password must be at least 8 characters long.");
    if (password !== confirmation) return setError("Passwords do not match.");
    const code = params.get("oobCode");
    if (!code)
      return setError("This password reset link is invalid or has expired.");
    try {
      await confirmPasswordReset(code, password);
      navigate("/login", { replace: true });
    } catch (err: any) {
      setError(err?.message || "We could not update your password.");
    }
  };

  return (
    <>
      <div className="flex w-full items-center bg-background p-8">
        <div className="w-full max-w-sm">
          <div className="mb-6">
            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-lg border border-primary-brand/30 bg-primary-brand/10 text-primary-brand">
              <LockKeyhole className="h-5 w-5" />
            </div>
            <div className="mb-3 inline-flex rounded-full border border-primary-brand/40 bg-primary-brand/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-primary-brand">
              • Step 2 of 2
            </div>
            <h2 className="mb-2 text-2xl font-bold text-on-surface">
              Create New Password
            </h2>
            <p className="text-sm leading-relaxed text-on-surface-muted">
              Set a robust, secure password for your garage and project files.
            </p>
          </div>
          <form className="space-y-5" onSubmit={handleSubmit}>
            <PasswordField
              id="new-password"
              label="New Password"
              value={password}
              onChange={setPassword}
              visible={showPassword}
              toggle={() => setShowPassword((value) => !value)}
            />
            <div className="rounded-lg border border-outline-subtle/50 bg-surface px-3 py-3 text-xs text-on-surface-muted">
              <div className="mb-2 flex justify-between">
                <span>Security Strength</span>
                <strong className="text-primary-brand">
                  {password.length >= 8 ? "Strong" : ""}
                </strong>
              </div>
              <div className="mb-3 flex gap-1">
                <span className="h-1 flex-1 rounded bg-primary-brand" />
                <span className="h-1 flex-1 rounded bg-primary-brand" />
                <span className="h-1 flex-1 rounded bg-primary-brand" />
                <span className="h-1 flex-1 rounded bg-outline-subtle" />
              </div>
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <span>
                  <Check className="mr-1 inline h-3 w-3 text-primary-brand" />
                  8+ characters
                </span>
                <span>
                  <Check className="mr-1 inline h-3 w-3 text-primary-brand" />
                  Uppercase &amp; lowercase
                </span>
                <span>
                  <Check className="mr-1 inline h-3 w-3 text-primary-brand" />
                  At least 1 number
                </span>
                <span>
                  <Check className="mr-1 inline h-3 w-3 text-primary-brand" />
                  Special symbol
                </span>
              </div>
            </div>
            <PasswordField
              id="confirm-password"
              label="Confirm New Password"
              value={confirmation}
              onChange={setConfirmation}
              visible={showConfirmation}
              toggle={() => setShowConfirmation((value) => !value)}
            />
            <button
              type="submit"
              className="group flex w-full items-center justify-center gap-2 rounded-lg bg-primary-brand py-4 font-bold text-on-primary shadow-lg shadow-primary-brand/10 hover:bg-primary"
            >
              Save Password &amp; Sign In{" "}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </form>
          {error && (
            <div className="auth-error" role="alert">
              <CircleAlert className="h-5 w-5" />
              <p>{error}</p>
            </div>
          )}
          <div className="mt-6 border-t border-outline-subtle/40 pt-5 text-sm text-on-surface-muted">
            Remembered credentials?{" "}
            <Link to="/login" className="text-primary-brand">
              Log In
            </Link>
            <span className="float-right">
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

function PasswordField({
  id,
  label,
  value,
  onChange,
  visible,
  toggle,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  visible: boolean;
  toggle: () => void;
}) {
  return (
    <div>
      <label
        className="mb-1 block text-xs font-semibold uppercase tracking-wider text-on-surface-muted"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="relative">
        <LockKeyhole className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-on-surface-muted/60" />
        <input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full rounded-lg border border-outline-subtle bg-surface-highest py-3 pl-10 pr-10 text-sm text-on-surface focus:border-primary-brand focus:outline-none focus:ring-1 focus:ring-primary-brand"
          required
        />
        <button
          type="button"
          onClick={toggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-muted"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? (
            <EyeOff className="h-4 w-4" />
          ) : (
            <Eye className="h-4 w-4" />
          )}
        </button>
      </div>
    </div>
  );
}
