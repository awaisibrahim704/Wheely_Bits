import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CircleDashed,
  CircleDot,
  Package,
  ShieldCheck,
  Sparkles,
  Truck,
  Wrench,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const listingKey = "wheelybits:product-listing-draft";

type Category = "rims" | "tyres" | "auto-parts" | "other";
const categories: Array<{
  value: Category;
  title: string;
  description: string;
  detail: string;
  icon: React.ReactNode;
}> = [
  {
    value: "rims",
    title: "Rims",
    description: "List alloy wheels and rims for customers.",
    detail:
      "Supports forged, multi-piece, PCD, offset (ET), and center bore specifications.",
    icon: <CircleDot size={56} strokeWidth={1.2} />,
  },
  {
    value: "tyres",
    title: "Tyres",
    description: "List tyres with sizes and specifications.",
    detail:
      "Seamlessly configure width, profile, speed index, compound, and rim diameters.",
    icon: <CircleDashed size={56} strokeWidth={1.2} />,
  },
  {
    value: "auto-parts",
    title: "Auto Parts",
    description: "List other automotive products.",
    detail:
      "Perfect for coilovers, big brake kits, wheel spacers, lug nuts, TPMS sensors, and chassis hardware.",
    icon: <Wrench size={56} strokeWidth={1.2} />,
  },
  {
    value: "other",
    title: "Other",
    description: "List other automotive products.",
    detail:
      "Vinyl wrap films, ceramic detailing supplies, interior trim kits, badges, and workshop merchandise.",
    icon: <Package size={56} strokeWidth={1.2} />,
  },
];

export default function SellerProductCategory() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<Category>(() => {
    try {
      return (
        JSON.parse(window.localStorage.getItem(listingKey) ?? "{}").category ||
        "rims"
      );
    } catch {
      return "rims";
    }
  });
  const selectedCategory =
    categories.find((category) => category.value === selected) ?? categories[0];

  const chooseCategory = (category: Category) => {
    setSelected(category);
    window.localStorage.setItem(listingKey, JSON.stringify({ category }));
  };

  const continueToSpecifications = () => {
    window.localStorage.setItem(
      listingKey,
      JSON.stringify({ category: selected }),
    );
    navigate(
      selected === "tyres"
        ? "/seller/products/tyre-specifications"
        : "/seller/products/specifications",
    );
  };

  return (
    <div className="seller-listing-page">
      <SellerListingNav />
      <main className="seller-listing-content">
        <ListingStepper />
        <div className="seller-listing-intro">
          <span className="seller-listing-eyebrow">
            <Sparkles size={12} /> New Listing Workflow
          </span>
          <h1>What Do You Want to Sell?</h1>
          <p>
            Choose a product category to start creating your listing. We'll
            tailor
            <br className="hidden sm:block" /> fitment and catalog fields
            accordingly.
          </p>
        </div>
        <div className="seller-category-grid">
          {categories.map((category) => (
            <button
              key={category.value}
              type="button"
              onClick={() => chooseCategory(category.value)}
              className={`seller-category-card ${selected === category.value ? "seller-category-selected" : ""}`}
            >
              <div className="seller-category-art">
                {category.icon}
                <span>
                  {selected === category.value
                    ? "Fitment Synced"
                    : category.value === "tyres"
                      ? "Matrix Ready"
                      : category.value === "auto-parts"
                        ? "Suspension & Brakes"
                        : "Care & Accessories"}
                </span>
              </div>
              <h2>{category.title}</h2>
              <p>
                {category.description}
                <br />
                {category.detail}
              </p>
              <footer>
                <span>
                  Select Category <ArrowRight size={11} />
                </span>
                <small>
                  {category.value === "rims"
                    ? "ET / PCD / J"
                    : category.value === "tyres"
                      ? "245/40 R18"
                      : category.value === "auto-parts"
                        ? "Spacers / Lugs"
                        : "Detailing & Wraps"}
                </small>
              </footer>
              {selected === category.value && (
                <b className="seller-category-check">
                  <Check size={12} />
                </b>
              )}
            </button>
          ))}
        </div>
        <section className="seller-selected-category">
          <div className="seller-selected-type">
            <span>
              <CircleDot size={16} />
            </span>
            <div>
              <small>Selected Type</small>
              <strong>
                {selectedCategory.title === "Rims"
                  ? "Rims & Alloy Wheels"
                  : selectedCategory.title}
              </strong>
            </div>
            <em>Stage 1 of 4</em>
          </div>
          <div>
            <button
              type="button"
              onClick={() => navigate("/seller/dashboard")}
              className="seller-button seller-button-muted"
            >
              <ArrowLeft size={14} /> Cancel & Back
            </button>
            <button
              type="button"
              onClick={continueToSpecifications}
              className="seller-button seller-button-primary"
            >
              Continue to Specifications <ArrowRight size={14} />
            </button>
          </div>
        </section>
        <div className="seller-listing-benefits">
          <Benefit
            icon={<ShieldCheck size={15} />}
            title="Automated Fitment"
            text="Specifications are mapped directly to the Wheely Bits Fitment Engine for vehicle compatibility."
          />
          <Benefit
            icon={<CircleDot size={15} />}
            title="3D Studio Showcase"
            text="Approvals listings can be rendered onto user cars in real-time within the Studio."
          />
          <Benefit
            icon={<Truck size={15} />}
            title="Nationwide Logistics"
            text="Integrated courier shipping across Islamabad, Rawalpindi, Lahore, and Karachi."
          />
        </div>
      </main>
      <footer className="seller-listing-footer">
        <strong>WHEELY BITS</strong>
        <span>
          SELLER
          <br />
          NETWORK
        </span>
        <p>
          Pakistan's premier automotive fitment, styling, and vendor marketplace
          platform.
        </p>
        <div>
          Seller Agreement　 Fee Schedule　 Merchant Policy
          <br />
          Seller Concierge 24/7
        </div>
        <small>© 2024 Wheely Bits. All rights reserved.</small>
      </footer>
    </div>
  );
}

function SellerListingNav() {
  return (
    <div className="seller-listing-nav">
      <strong>▣ WHEELY BITS</strong>
      <span>SELLER HUB</span>
      <nav>
        <Link to="/seller/dashboard">▦ Dashboard</Link>
        <Link to="/seller/dashboard">▤ Products</Link>
        <Link className="seller-listing-nav-active" to="/seller/products/new">
          ⊕ Add Product
        </Link>
        <a>▧ Orders</a>
        <a>▥ Store Profile</a>
      </nav>
      <small>● alex@wheelybits.com ◯ ◉</small>
    </div>
  );
}
function ListingStepper() {
  return (
    <div className="seller-listing-stepper">
      <Step number="1" label="Category" active />
      <Step number="2" label="Specifications" />
      <Step number="3" label="Pricing & Media" />
      <Step number="4" label="Review & Live" />
    </div>
  );
}
function Step({
  number,
  label,
  active = false,
}: {
  number: string;
  label: string;
  active?: boolean;
}) {
  return (
    <div className={`seller-listing-step ${active ? "active" : ""}`}>
      <span>{number}</span>
      <small>{label}</small>
    </div>
  );
}
function Benefit({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div>
      <span>{icon}</span>
      <strong>{title}</strong>
      <p>{text}</p>
    </div>
  );
}
