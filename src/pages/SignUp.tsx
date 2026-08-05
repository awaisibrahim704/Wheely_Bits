import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function SignUp() {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== confirmPassword) return setError("Passwords do not match");
    try {
      await signup(email, password, fullName || undefined);
      navigate("/welcome");
    } catch (err: any) {
      setError(err?.message || "Failed to create account");
    }
  };

  return (
    <>
      {/* Left Side: Form Container */}
      <div className="w-full flex items-center justify-center p-8 bg-background relative z-20">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center md:text-left">
            <h2 className="text-2xl font-bold text-on-surface mb-2">
              Create Account
            </h2>
            <p className="text-on-surface-muted text-sm">
              Join Wheely Bits to explore precision engineering.
            </p>
          </div>

          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Full Name Field */}
            <div>
              <label
                className="block text-xs font-semibold text-on-surface-muted mb-1 uppercase tracking-wider"
                htmlFor="fullName"
              >
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-muted/50 w-5 h-5" />
                <input
                  type="text"
                  id="fullName"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-surface-highest border border-outline-subtle text-on-surface font-medium rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-primary-brand focus:border-primary-brand transition-all duration-300 placeholder:text-on-surface-muted/50"
                />
              </div>
            </div>

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
                  placeholder="john@example.com"
                  className="w-full bg-surface-highest border border-outline-subtle text-on-surface font-medium rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-primary-brand focus:border-primary-brand transition-all duration-300 placeholder:text-on-surface-muted/50"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label
                className="block text-xs font-semibold text-on-surface-muted mb-1 uppercase tracking-wider"
                htmlFor="password"
              >
                Password
              </label>
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

            {/* Confirm Password Field */}
            <div>
              <label
                className="block text-xs font-semibold text-on-surface-muted mb-1 uppercase tracking-wider"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-muted/50 w-5 h-5" />
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-surface-highest border border-outline-subtle text-on-surface font-medium rounded-lg py-3 pl-10 pr-4 focus:outline-none focus:ring-1 focus:ring-primary-brand focus:border-primary-brand transition-all duration-300 placeholder:text-on-surface-muted/50"
                />
              </div>
            </div>

            {/* Action Button */}
            <button
              type="submit"
              className="w-full bg-primary-brand text-on-primary font-bold py-4 rounded-lg hover:bg-primary transition-colors duration-300 shadow-lg hover:shadow-primary-brand/20 flex items-center justify-center gap-2 mt-2 group"
            >
              <span>Join the Community</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
          {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

          {/* Secondary Action */}
          <div className="mt-8 text-center text-sm font-medium text-on-surface-muted">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary-brand hover:text-primary transition-colors font-semibold underline underline-offset-4 decoration-primary-brand/50 hover:decoration-primary-brand"
            >
              Log In
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
