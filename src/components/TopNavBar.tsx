import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { hasSellerProfile } from "../lib/sellerApi";

export default function TopNavBar() {
  const location = useLocation();
  const { user } = useAuth();
  const [hasSellerAccess, setHasSellerAccess] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const checkSellerState = async () => {
      if (!user?.uid) {
        setHasSellerAccess(false);
        return;
      }

      const exists = await hasSellerProfile(user.uid);
      if (!cancelled) setHasSellerAccess(exists);
    };

    void checkSellerState();
    return () => {
      cancelled = true;
    };
  }, [user?.uid]);

  const sellerDashboardLink = "/seller/dashboard";
  const becomeSellerLink = "/seller/business-information";

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Rim", path: "/rim" },
    { name: "Wrap", path: "/wrap" },
    { name: "Tint", path: "/tint" },
    { name: "Vendors", path: "/vendors" },
    { name: "Community", path: "/community" },
    { name: "FAQ", path: "/faq" },
    ...(user ? [{ name: "Garage", path: "/garage" }] : []),
  ];

  return (
    <div className="fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2">
      <nav className="flex min-h-14 w-full flex-nowrap items-center gap-2 rounded-full border border-white/10 bg-surface-mid/80 px-3 shadow-lg shadow-black/20 backdrop-blur-xl sm:gap-3 sm:px-5">
        <Link
          to="/"
          className="shrink-0 whitespace-nowrap text-sm font-bold tracking-wide text-on-surface sm:text-base"
        >
          WHEELY BITS
        </Link>
        <div className="min-w-0 flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="mx-auto flex w-max flex-nowrap items-center justify-center gap-0.5">
            {navLinks.map((link) => {
              const isActive =
                location.pathname === link.path ||
                (link.path !== "/" && location.pathname.startsWith(link.path));
              return (
                <Link
                  key={link.name}
                  to={link.path}
                  aria-current={isActive ? "page" : undefined}
                  className={`whitespace-nowrap rounded-full px-2 py-2 text-xs font-medium transition-colors ${
                    isActive
                      ? "bg-primary-brand/15 text-primary-brand"
                      : "text-on-surface-muted hover:bg-white/5 hover:text-on-surface"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
            {hasSellerAccess && (
              <Link
                to={sellerDashboardLink}
                className={`whitespace-nowrap rounded-full px-2.5 py-2 text-xs font-semibold transition-colors ${
                  location.pathname.startsWith("/seller")
                    ? "bg-primary-brand text-on-primary"
                    : "bg-primary-brand/15 text-primary-brand hover:bg-primary-brand hover:text-on-primary"
                }`}
              >
                Seller Dashboard
              </Link>
            )}
            <Link
              to={becomeSellerLink}
              className={`whitespace-nowrap rounded-full px-2.5 py-2 text-xs font-semibold transition-colors ${
                location.pathname.startsWith("/seller")
                  ? "bg-primary-brand text-on-primary"
                  : "bg-primary-brand/15 text-primary-brand hover:bg-primary-brand hover:text-on-primary"
              }`}
            >
              Become a Seller
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}
