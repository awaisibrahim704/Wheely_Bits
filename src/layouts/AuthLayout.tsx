import { Link, Outlet, useLocation } from "react-router-dom";
import { ArrowLeft, CircleGauge } from "lucide-react";
import TopNavBar from "../components/TopNavBar";

export default function AuthLayout() {
  const location = useLocation();
  const isRecoveryPage = [
    "/forgot-password",
    "/check-email",
    "/create-new-password",
  ].includes(location.pathname);

  if (isRecoveryPage) {
    return (
      <div className="min-h-screen flex flex-col bg-background text-on-surface">
        <header className="flex items-center justify-between px-6 py-6 sm:px-9 sm:py-7">
          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-bold text-primary-brand"
          >
            <CircleGauge className="h-4 w-4" aria-hidden="true" />
            Wheely Bits
          </Link>
          <Link
            to="/"
            className="flex items-center gap-1.5 text-[11px] text-on-surface-muted transition-colors hover:text-on-surface"
          >
            <ArrowLeft className="h-3 w-3" aria-hidden="true" />
            Back to Login
          </Link>
        </header>
        <main className="flex flex-1 items-center justify-center p-4 sm:px-8">
          <div className="grid w-full max-w-4xl grid-cols-1 overflow-hidden rounded-2xl border border-outline-subtle/60 bg-surface-low/90 shadow-2xl shadow-black/20 md:grid-cols-2 md:items-stretch">
            <Outlet />
          </div>
        </main>
        <footer className="flex flex-col gap-3 border-t border-outline-subtle/30 px-6 py-5 text-[9px] text-on-surface-muted/80 sm:flex-row sm:items-center sm:justify-between sm:px-9">
          <span>© 2024 Wheely Bits. Precision Engineering &amp; Design.</span>
          <div className="flex gap-5">
            <Link to="/faq" className="hover:text-on-surface">
              Privacy Policy
            </Link>
            <Link to="/faq" className="hover:text-on-surface">
              Terms of Service
            </Link>
            <Link to="/contact" className="hover:text-on-surface">
              Contact Support
            </Link>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background relative overflow-hidden">
      <TopNavBar />
      <main className="flex-1 flex items-center justify-center p-4">
        {/* Moody automotive background effect */}
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-surface-low to-background"></div>
          <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-brand/5 to-transparent"></div>
        </div>
        <div className="z-10 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 bg-surface-low/50 backdrop-blur-xl border border-outline-subtle rounded-2xl overflow-hidden shadow-2xl relative">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
