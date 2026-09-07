import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  CirclePlus,
  Edit3,
  Eye,
  Filter,
  Grid2X2,
  LayoutDashboard,
  MoreVertical,
  Package,
  Search,
  ShoppingCart,
  Store,
  Wrench,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import {
  getSellerDashboard,
  type SellerDashboardData,
  type SellerDashboardProduct,
} from "../lib/sellerApi";

type Product = {
  id: string;
  name: string;
  detail: string;
  category: string;
  price: string;
  stock: string;
  status: "Active" | "Inactive";
  stockState: "In Stock" | "Low Stock" | "Out of Stock";
  image: string;
  source: SellerDashboardProduct;
};

function formatPrice(price: string | number | undefined) {
  if (price === undefined || price === "") return "Not set";
  const numericPrice = Number(price);
  return Number.isFinite(numericPrice)
    ? `PKR ${numericPrice.toLocaleString()}`
    : String(price);
}

function toProduct(product: SellerDashboardProduct): Product {
  const stockNumber = Number(product.stock ?? 0);
  const status =
    product.status === "published" || product.status === "active"
      ? "Active"
      : "Inactive";
  const stockState =
    stockNumber <= 0
      ? "Out of Stock"
      : stockNumber <= 3
        ? "Low Stock"
        : "In Stock";
  return {
    id: product._id,
    name: product.productName || "Unnamed product",
    detail:
      [product.brand, product.description].filter(Boolean).join(" • ") ||
      "No product details",
    category: product.category || "Other Products",
    price: formatPrice(product.price),
    stock: product.stock === undefined ? "Not set" : `${product.stock} Units`,
    status,
    stockState,
    image: product.gallery?.[0] || product.aiImage || "",
    source: product,
  };
}

export default function SellerDashboard() {
  const { user, loading: authLoading } = useAuth();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [page, setPage] = useState(1);
  const [dashboard, setDashboard] = useState<SellerDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setLoading(false);
      setError("Sign in to view your seller dashboard.");
      return;
    }
    let active = true;
    setLoading(true);
    getSellerDashboard(user.uid)
      .then((data) => {
        if (active) setDashboard(data);
      })
      .catch((requestError) => {
        if (active)
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Seller data could not be loaded.",
          );
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [authLoading, user]);

  const products = useMemo(
    () => (dashboard?.products ?? []).map(toProduct),
    [dashboard],
  );
  const sellerName =
    dashboard?.seller?.ownerName || user?.displayName || "Seller";
  const businessName = dashboard?.seller?.businessName || "Seller business";
  const location =
    [dashboard?.seller?.store?.city, dashboard?.seller?.store?.address]
      .filter(Boolean)
      .join(", ") || "Store location not set";
  const categories = useMemo(
    () => [
      "All Categories",
      ...Array.from(new Set(products.map((product) => product.category))),
    ],
    [products],
  );
  const filteredProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesSearch = `${product.name} ${product.detail}`
          .toLowerCase()
          .includes(search.toLowerCase());
        const matchesCategory =
          category === "All Categories" || product.category === category;
        return matchesSearch && matchesCategory;
      }),
    [category, products, search],
  );
  const activeProducts = products.filter(
    (product) => product.status === "Active",
  ).length;
  const categoryCount = (name: string) =>
    products.filter((product) => product.category.toLowerCase().includes(name))
      .length;

  return (
    <div className="seller-dashboard-page">
      <div className="seller-dashboard-nav">
        <div className="seller-dashboard-brand">
          WHEELY
          <br />
          BITS
        </div>
        <span className="seller-hub-pill">
          SELLER
          <br />
          HUB
        </span>
        <nav>
          <a className="seller-dashboard-nav-active">
            <LayoutDashboard size={12} /> Dashboard
          </a>
          <a>
            <Package size={12} /> Products
          </a>
          <Link to="/seller/products/new">
            <CirclePlus size={12} /> Add Product
          </Link>
          <a>
            <ShoppingCart size={12} /> Orders
          </a>
          <a>
            <Store size={12} /> Store Profile
          </a>
        </nav>
        <div className="seller-dashboard-user">
          <span /> {sellerName.toLowerCase().replace(" ", "")}@wheelybits.com{" "}
          <Bell size={14} />
        </div>
      </div>
      <main className="seller-dashboard-content">
        <section className="seller-dashboard-welcome">
          <div>
            <div className="seller-dashboard-title-row">
              <h1>Welcome back, {sellerName}</h1>
              <span className="seller-active-pill">
                <span /> Active Merchant
              </span>
            </div>
            <p>Manage your products, listings, and sales.</p>
            <div className="seller-dashboard-meta">
              <span>
                <Store size={12} /> {businessName}
              </span>
              <span>⌖ {location}</span>
              <span>
                <Wrench size={12} /> Fitment Engine Synced
              </span>
            </div>
          </div>
          <Link
            to="/seller/products/new"
            className="seller-button seller-button-primary"
          >
            <CirclePlus size={15} /> Add New Product
          </Link>
        </section>
        <div className="seller-dashboard-overline">
          <span>
            <Grid2X2 size={12} /> Catalog Overview & Statistics
          </span>
          <small>{loading ? "Loading live data..." : "Live data"}</small>
        </div>
        {error && <div className="seller-empty-products">{error}</div>}
        <section className="seller-stats-grid">
          <Stat
            label="Total Products"
            value={String(products.length)}
            note="From your live catalog"
            icon={<Grid2X2 size={14} />}
          />
          <Stat
            label="Rims"
            value={String(categoryCount("rim"))}
            note="Live rim listings"
            icon={<Wrench size={14} />}
          />
          <Stat
            label="Tyres"
            value={String(categoryCount("tyre"))}
            note="Live tyre listings"
            icon={<CirclePlus size={14} />}
          />
          <Stat
            label="Other Products"
            value={String(
              Math.max(
                products.length - categoryCount("rim") - categoryCount("tyre"),
                0,
              ),
            )}
            note="Other live listings"
            icon={<Package size={14} />}
          />
          <Stat
            label="Active Listings"
            value={String(activeProducts)}
            note="Published listings"
            icon={<Eye size={14} />}
            active
          />
        </section>
        <section className="seller-products-panel">
          <header className="seller-products-header">
            <div>
              <h2>
                <Package size={15} /> Recent Products
              </h2>
              <p>
                Manage and inspect your recently listed automotive inventory
              </p>
            </div>
            <div className="seller-product-tools">
              <label>
                <Search size={13} />
                <input
                  value={search}
                  onChange={(event) => {
                    setSearch(event.target.value);
                    setPage(1);
                  }}
                  placeholder="Search products, PCD, specs..."
                />
              </label>
              <select
                value={category}
                onChange={(event) => {
                  setCategory(event.target.value);
                  setPage(1);
                }}
              >
                <option>All Categories</option>
                {categories.slice(1).map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
              <button>
                <Filter size={13} /> Filter
              </button>
            </div>
          </header>
          <div className="seller-product-table">
            <div className="seller-product-row seller-product-heading">
              <span>Product</span>
              <span>Category</span>
              <span>Price</span>
              <span>Stock</span>
              <span>Status</span>
              <span>Actions</span>
            </div>
            {filteredProducts.map((product) => (
              <ProductRow key={product.id} product={product} />
            ))}
            {filteredProducts.length === 0 && (
              <div className="seller-empty-products">
                {loading
                  ? "Loading products..."
                  : products.length === 0
                    ? "No products have been added yet."
                    : "No products match your search."}
              </div>
            )}
          </div>
          <footer className="seller-products-footer">
            <span>
              Showing {filteredProducts.length ? 1 : 0}-
              {filteredProducts.length} of {products.length} inventory items
            </span>
            <div>
              <button
                disabled={page === 1}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
              >
                <ChevronLeft size={13} /> Previous
              </button>
              <button className="seller-page-active">1</button>
              <button>2</button>
              <button>3</button>
              <span>...</span>
              <button>10</button>
              <button onClick={() => setPage((current) => current + 1)}>
                Next <ChevronRight size={13} />
              </button>
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}

function Stat({
  label,
  value,
  note,
  icon,
  active = false,
}: {
  label: string;
  value: string;
  note: string;
  icon: React.ReactNode;
  active?: boolean;
}) {
  return (
    <div className={`seller-stat ${active ? "seller-stat-active" : ""}`}>
      <div>
        <small>{label}</small>
        <strong>{value}</strong>
        <span>{note}</span>
      </div>
      <i>{icon}</i>
    </div>
  );
}

function ProductRow({ product }: { product: Product }) {
  const navigate = useNavigate();
  const categoryClass =
    product.category === "Performance Tyres"
      ? "tyre"
      : product.category === "Car Accessories"
        ? "accessory"
        : "rim";
  return (
    <div className="seller-product-row">
      <div className="seller-product-name">
        <img src={product.image} alt="" />
        <span>
          <strong>{product.name}</strong>
          <small>{product.detail}</small>
        </span>
      </div>
      <span>
        <em className={`seller-category seller-category-${categoryClass}`}>
          {product.category}
        </em>
      </span>
      <span className="seller-price">
        {product.price}
        <small>Per {product.category === "Alloy Rims" ? "Set" : "Unit"}</small>
      </span>
      <span className="seller-stock">
        {product.stock}
        <em
          className={`seller-stock-${product.stockState.toLowerCase().replaceAll(" ", "-")}`}
        >
          {product.stockState}
        </em>
      </span>
      <span>
        <em
          className={`seller-status seller-status-${product.status.toLowerCase()}`}
        >
          {product.status}
        </em>
      </span>
      <span className="seller-row-actions">
        <button
          type="button"
          onClick={() => {
            window.localStorage.setItem(
              "wheelybits:product-listing-draft",
              JSON.stringify(product.source),
            );
            window.localStorage.setItem(
              "wheelybits:editing-product-id",
              product.id,
            );
            navigate(
              product.category.toLowerCase().includes("tyre")
                ? "/seller/products/tyre-specifications"
                : "/seller/products/specifications",
            );
          }}
        >
          <Edit3 size={12} /> Edit
        </button>
        <button aria-label="More actions">
          <MoreVertical size={13} />
        </button>
      </span>
    </div>
  );
}
