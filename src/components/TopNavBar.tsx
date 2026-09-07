import { Link, useLocation } from "react-router-dom";

export default function TopNavBar() {
  const location = useLocation();
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Rim", path: "/rim" },
    { name: "Wrap", path: "/wrap" },
    { name: "Tint", path: "/tint" },
    { name: "Vendors", path: "/vendors" },
    { name: "Community", path: "/community" },
    { name: "FAQ", path: "/faq" },
  ];

  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-4xl px-4">
      <nav className="bg-surface-mid/70 backdrop-blur-md border-t border-white/10 rounded-full px-6 py-3 flex items-center justify-between shadow-lg">
        <Link
          to="/"
          className="text-on-surface font-bold text-lg tracking-wider"
        >
          WHEELY BITS
        </Link>
        <div className="flex items-center gap-1 sm:gap-4 overflow-x-auto no-scrollbar">
          {navLinks.map((link) => {
            const isActive =
              location.pathname === link.path ||
              (link.path !== "/" && location.pathname.startsWith(link.path));
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                  isActive
                    ? "bg-primary-brand/20 text-primary-brand"
                    : "text-on-surface-muted hover:text-on-surface hover:bg-white/5"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
          <Link
            to="/seller/business-information"
            className={`ml-1 whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-semibold transition-colors ${
              location.pathname.startsWith("/seller")
                ? "bg-primary-brand text-on-primary"
                : "bg-primary-brand/15 text-primary-brand hover:bg-primary-brand hover:text-on-primary"
            }`}
          >
            Become a Seller
          </Link>
        </div>
      </nav>
    </div>
  );
}
