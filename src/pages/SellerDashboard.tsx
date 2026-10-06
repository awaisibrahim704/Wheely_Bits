import FallbackImage from "../components/FallbackImage";
import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bell,
  Check,
  ChevronLeft,
  ChevronRight,
  CirclePlus,
  Edit3,
  ExternalLink,
  Eye,
  Filter,
  Grid2X2,
  LayoutDashboard,
  MoreVertical,
  MessageCircle,
  Package,
  Phone,
  Search,
  Send,
  ShoppingCart,
  Star,
  Store,
  Trash2,
  ThumbsUp,
  Wrench,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import {
  getSellerDashboard,
  getSellerInquiries,
  deleteSellerProduct,
  replyToInquiryAsSeller,
  updateInquiryStatus,
  type InquiryMessage,
  type SellerInquiry,
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
  gallery: string[];
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
  const gallery = Array.isArray(product.gallery)
    ? product.gallery.filter(Boolean)
    : [];

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
    image: gallery[0] || product.aiImage || "",
    gallery,
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
  const [reviewFilter, setReviewFilter] = useState<number>(0);
  const [copiedStoreLink, setCopiedStoreLink] = useState(false);

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

  useEffect(() => {
    if (!user) return;
    let active = true;
    const refreshMessages = async () => {
      try {
        const latest = await getSellerInquiries(user.uid);
        if (active) {
          setDashboard((current) =>
            current ? { ...current, inquiries: latest.inquiries } : current,
          );
          setError("");
        }
      } catch (requestError) {
        if (active) {
          setError(
            requestError instanceof Error
              ? requestError.message
              : "Customer messages could not be refreshed.",
          );
        }
      }
    };
    const intervalId = window.setInterval(() => void refreshMessages(), 10000);
    return () => {
      active = false;
      window.clearInterval(intervalId);
    };
  }, [user]);

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
  const inquiries = dashboard?.inquiries ?? [];
  const unreadInquiries = inquiries.filter(
    (inquiry) => inquiry.status === "unread",
  ).length;

  const recentRatings = useMemo(
    () => dashboard?.recentRatings ?? [],
    [dashboard?.recentRatings],
  );
  const ratingSummary = dashboard?.ratingSummary;

  const filteredSellerRatings = useMemo(() => {
    if (reviewFilter === 0) return recentRatings;
    if (reviewFilter === 5) return recentRatings.filter((r) => r.stars >= 5);
    if (reviewFilter === 4) return recentRatings.filter((r) => r.stars === 4);
    if (reviewFilter === 1) return recentRatings.filter((r) => r.stars <= 3);
    return recentRatings;
  }, [recentRatings, reviewFilter]);

  const handleCopyStoreLink = () => {
    const url = `${window.location.origin}/vendors/automax-wheels`;
    navigator.clipboard.writeText(url);
    setCopiedStoreLink(true);
    setTimeout(() => setCopiedStoreLink(false), 2000);
  };
  const markInquiryRead = async (inquiryId: string) => {
    if (!user || !dashboard) return;
    await updateInquiryStatus(inquiryId, user.uid, "read");
    setDashboard({
      ...dashboard,
      inquiries: dashboard.inquiries.map((inquiry) =>
        inquiry._id === inquiryId ? { ...inquiry, status: "read" } : inquiry,
      ),
    });
  };
  const sendInquiryReply = async (inquiryId: string, content: string) => {
    if (!user) throw new Error("Sign in to reply to a customer.");
    const { message } = await replyToInquiryAsSeller(
      inquiryId,
      user.uid,
      content,
    );
    setDashboard((current) =>
      current
        ? {
            ...current,
            inquiries: current.inquiries.map((inquiry) =>
              inquiry._id === inquiryId
                ? {
                    ...inquiry,
                    status: "replied",
                    messages: [
                      ...(inquiry.messages?.length
                        ? inquiry.messages
                        : [
                            {
                              sender: "customer" as const,
                              content: inquiry.message,
                              createdAt:
                                inquiry.createdAt || new Date().toISOString(),
                            },
                          ]),
                      message,
                    ],
                  }
                : inquiry,
            ),
          }
        : current,
    );
  };
  const removeProduct = async (productId: string) => {
    if (!user) throw new Error("Sign in to delete a product.");
    await deleteSellerProduct(productId, user.uid);
    setDashboard((current) =>
      current
        ? {
            ...current,
            products: current.products.filter(
              (product) => product._id !== productId,
            ),
          }
        : current,
    );
  };

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
          <a
            href="#products-section"
            onClick={(event) => {
              event.preventDefault();
              document.getElementById("products-section")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
          >
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
          />
          <Stat
            label="Store Rating"
            value={
              ratingSummary?.averageRating
                ? `★ ${ratingSummary.averageRating.toFixed(1)}`
                : "★ 5.0"
            }
            note={`${ratingSummary?.totalRatings ?? recentRatings.length} Customer Reviews`}
            icon={<Star size={14} className="fill-[#d4a373] text-[#d4a373]" />}
            active
          />
        </section>
        <section className="seller-products-panel">
          <header className="seller-products-header">
            <div>
              <h2>
                <MessageCircle size={15} /> Customer Messages
              </h2>
              <p>{unreadInquiries} unread inquiries from the marketplace</p>
            </div>
          </header>
          {inquiries.length === 0 ? (
            <div className="seller-empty-products">
              No customer inquiries yet.
            </div>
          ) : (
            <div className="seller-inquiry-list">
              {inquiries.map((inquiry) => (
                <SellerInquiryCard
                  key={inquiry._id}
                  inquiry={inquiry}
                  onReply={sendInquiryReply}
                  onMarkRead={markInquiryRead}
                />
              ))}
            </div>
          )}
        </section>
        <section className="seller-products-panel">
          <header className="seller-products-header">
            <div>
              <h2>
                <Star size={15} className="fill-[#d4a373] text-[#d4a373]" />{" "}
                Store Reputation & Customer Reviews
              </h2>
              <p>
                Real fitment ratings and feedback left by verified car
                enthusiasts
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyStoreLink}
                className="seller-button seller-button-muted flex items-center gap-1.5"
                title="Copy public store link to share with buyers"
              >
                {copiedStoreLink ? (
                  <>
                    <Check size={12} className="text-[#55d6a7]" />
                    <span className="text-[#55d6a7]">Link Copied!</span>
                  </>
                ) : (
                  <span>Share Store Link</span>
                )}
              </button>
              <Link
                to="/vendors/automax-wheels"
                target="_blank"
                className="seller-button seller-button-primary flex items-center gap-1.5"
                title="View your store as buyers see it"
              >
                <span>Public Shop Profile</span>
                <ExternalLink size={12} />
              </Link>
            </div>
          </header>

          {/* Score overview & reviews grid */}
          <div className="p-4 sm:p-5">
            <div className="grid gap-5 lg:grid-cols-12 items-start">
              {/* Rating summary card */}
              <div className="lg:col-span-4 rounded-xl bg-[#141618] border border-white/[0.06] p-4 text-center sm:text-left">
                <small className="block text-[10px] uppercase font-bold tracking-wider text-[#c2c8c0]">
                  Overall Store Score
                </small>
                <div className="mt-2 flex items-baseline justify-center sm:justify-start gap-2">
                  <span className="text-3xl font-extrabold text-white">
                    {ratingSummary?.averageRating
                      ? ratingSummary.averageRating.toFixed(1)
                      : "5.0"}
                  </span>
                  <span className="text-xs text-[#c2c8c0]">/ 5.0</span>
                </div>
                <div className="mt-1 flex items-center justify-center sm:justify-start gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star
                      key={s}
                      size={14}
                      className={
                        s <= Math.round(ratingSummary?.averageRating ?? 5)
                          ? "fill-[#d4a373] text-[#d4a373]"
                          : "text-white/20"
                      }
                    />
                  ))}
                </div>
                <p className="mt-2 text-[11px] text-[#c2c8c0]">
                  Based on{" "}
                  <strong className="text-white">
                    {ratingSummary?.totalRatings ?? recentRatings.length}
                  </strong>{" "}
                  verified customer reviews
                </p>

                <div className="mt-4 border-t border-white/[0.06] pt-3 space-y-1.5">
                  {[5, 4, 3, 2, 1].map((s) => {
                    const count =
                      ratingSummary?.breakdown?.[String(s)] ??
                      (s === 5 ? recentRatings.length : 0);
                    const total =
                      ratingSummary?.totalRatings || recentRatings.length || 1;
                    const pct = Math.round((count / (total || 1)) * 100);
                    return (
                      <div
                        key={s}
                        className="flex items-center gap-2 text-[10px] text-[#c2c8c0]"
                      >
                        <span className="w-8 flex items-center gap-0.5">
                          {s}{" "}
                          <Star
                            size={10}
                            className="fill-[#d4a373] text-[#d4a373]"
                          />
                        </span>
                        <div className="flex-1 h-1.5 rounded-full bg-white/[0.08] overflow-hidden">
                          <div
                            className={`h-full rounded-full ${s >= 4 ? "bg-[#abcfb2]" : s === 3 ? "bg-[#d4a373]" : "bg-red-500"}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="w-8 text-right text-[9px]">
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-4 rounded-lg bg-[#063a32] border border-[#55d6a7]/30 p-2 text-center text-[10px] text-[#55d6a7] font-medium flex items-center justify-center gap-1.5">
                  <ThumbsUp size={12} /> Top Rated Merchant
                </div>
              </div>

              {/* Reviews list */}
              <div className="lg:col-span-8">
                {/* Filter toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/[0.06] pb-3 mb-3">
                  <div className="flex items-center gap-1.5 text-[10px]">
                    <span className="text-[#c2c8c0]">Filter:</span>
                    <button
                      type="button"
                      onClick={() => setReviewFilter(0)}
                      className={`rounded px-2.5 py-1 text-[10px] transition ${
                        reviewFilter === 0
                          ? "bg-[#abcfb2] text-[#163722] font-bold"
                          : "bg-[#282a2c] text-[#c2c8c0] hover:bg-[#333537]"
                      }`}
                    >
                      All ({recentRatings.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setReviewFilter(5)}
                      className={`rounded px-2.5 py-1 text-[10px] transition ${
                        reviewFilter === 5
                          ? "bg-[#abcfb2] text-[#163722] font-bold"
                          : "bg-[#282a2c] text-[#c2c8c0] hover:bg-[#333537]"
                      }`}
                    >
                      5 ★
                    </button>
                    <button
                      type="button"
                      onClick={() => setReviewFilter(4)}
                      className={`rounded px-2.5 py-1 text-[10px] transition ${
                        reviewFilter === 4
                          ? "bg-[#abcfb2] text-[#163722] font-bold"
                          : "bg-[#282a2c] text-[#c2c8c0] hover:bg-[#333537]"
                      }`}
                    >
                      4 ★
                    </button>
                    <button
                      type="button"
                      onClick={() => setReviewFilter(1)}
                      className={`rounded px-2.5 py-1 text-[10px] transition ${
                        reviewFilter === 1
                          ? "bg-[#abcfb2] text-[#163722] font-bold"
                          : "bg-[#282a2c] text-[#c2c8c0] hover:bg-[#333537]"
                      }`}
                    >
                      1–3 ★
                    </button>
                  </div>
                  <span className="text-[10px] text-[#c2c8c0]">
                    Showing {filteredSellerRatings.length} feedback items
                  </span>
                </div>

                {filteredSellerRatings.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-white/10 p-6 text-center text-xs text-[#c2c8c0]">
                    No customer reviews under this filter.
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    {filteredSellerRatings.map((review) => {
                      const initials = (review.userName || "Customer")
                        .split(" ")
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join("")
                        .toUpperCase();
                      const dateFormatted = review.createdAt
                        ? new Date(review.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            },
                          )
                        : "Recently";

                      return (
                        <article
                          key={review._id}
                          className="rounded-lg bg-[#141618] border border-white/[0.04] p-3.5 hover:border-white/[0.08] transition"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="flex items-center gap-2.5">
                              <div className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-gradient-to-tr from-[#273a31] to-[#405f50] text-[10px] font-bold text-[#abcfb2]">
                                {initials}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <strong className="text-xs font-semibold text-white">
                                    {review.userName}
                                  </strong>
                                  <span className="rounded bg-[#063a32] px-1.5 py-0.5 text-[8px] text-[#55d6a7]">
                                    ✓ Verified Fitment
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-[9px] text-[#c2c8c0]">
                                  {review.car && (
                                    <span>🏎 {review.car} · </span>
                                  )}
                                  <span>{dateFormatted}</span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-0.5">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <Star
                                  key={s}
                                  size={11}
                                  className={
                                    s <= review.stars
                                      ? "fill-[#d4a373] text-[#d4a373]"
                                      : "text-white/20"
                                  }
                                />
                              ))}
                            </div>
                          </div>

                          {review.comment && (
                            <p className="mt-2 pl-9 text-[11px] leading-relaxed text-[#c2c8c0]">
                              {review.comment}
                            </p>
                          )}
                        </article>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
        <section id="products-section" className="seller-products-panel">
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
              <ProductRow
                key={product.id}
                product={product}
                onDelete={removeProduct}
              />
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

function SellerInquiryCard({
  inquiry,
  onReply,
  onMarkRead,
}: {
  inquiry: SellerInquiry;
  onReply: (inquiryId: string, content: string) => Promise<void>;
  onMarkRead: (inquiryId: string) => Promise<void>;
}) {
  const [reply, setReply] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const phoneHref = inquiry.senderPhone.replace(/[^\d+]/g, "");
  const whatsappNumber = inquiry.senderPhone.replace(/\D/g, "");
  const messages: InquiryMessage[] =
    inquiry.messages?.length
      ? inquiry.messages
      : [
          {
            sender: "customer",
            content: inquiry.message,
            createdAt: inquiry.createdAt || new Date().toISOString(),
          },
        ];

  const submitReply = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!reply.trim()) return;
    setSending(true);
    setError("");
    try {
      await onReply(inquiry._id, reply.trim());
      setReply("");
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Reply could not be sent.",
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <article className="seller-inquiry-item">
      <div className="seller-inquiry-content">
        <div className="seller-inquiry-header">
          <div>
            <strong>{inquiry.senderName}</strong>
            <small>
              {inquiry.car || "Vehicle not specified"} ·{" "}
              {inquiry.productName || "General seller inquiry"}
            </small>
          </div>
          <button
            type="button"
            className="seller-button seller-button-muted"
            onClick={() => void onMarkRead(inquiry._id)}
            disabled={inquiry.status !== "unread"}
          >
            {inquiry.status === "unread" ? "Mark Read" : inquiry.status}
          </button>
        </div>
        <a className="seller-inquiry-phone" href={`tel:${phoneHref}`}>
          <Phone size={13} /> {inquiry.senderPhone} · Call customer
        </a>
        {whatsappNumber && (
          <a
            className="seller-inquiry-whatsapp"
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noreferrer"
          >
            WhatsApp
          </a>
        )}
        <div className="seller-inquiry-messages">
          {messages.map((message, index) => (
            <div
              key={`${message.createdAt}-${index}`}
              className={`seller-inquiry-message seller-inquiry-message-${message.sender}`}
            >
              <small>{message.sender === "seller" ? "You" : inquiry.senderName}</small>
              <p>{message.content}</p>
              <time>{new Date(message.createdAt).toLocaleString()}</time>
            </div>
          ))}
        </div>
        <form className="seller-inquiry-reply" onSubmit={submitReply}>
          <label htmlFor={`reply-${inquiry._id}`}>Reply to customer</label>
          <textarea
            id={`reply-${inquiry._id}`}
            value={reply}
            onChange={(event) => setReply(event.target.value)}
            maxLength={1000}
            rows={3}
            placeholder="Write a reply..."
            required
          />
          {error && (
            <p role="alert" className="seller-inquiry-error">
              {error}
            </p>
          )}
          <button type="submit" disabled={sending || !reply.trim()}>
            <Send size={13} />
            {sending ? "Sending..." : "Send reply"}
          </button>
        </form>
      </div>
    </article>
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

function ProductRow({
  product,
  onDelete,
}: {
  product: Product;
  onDelete: (productId: string) => Promise<void>;
}) {
  const navigate = useNavigate();
  const [actionsOpen, setActionsOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const categoryClass =
    product.category === "Performance Tyres"
      ? "tyre"
      : product.category === "Car Accessories"
        ? "accessory"
        : "rim";
  const galleryImages =
    product.gallery.length > 0
      ? product.gallery.slice(0, 3)
      : [product.image];

  return (
    <div className="seller-product-row">
      <div className="seller-product-name">
        <div className="seller-product-gallery">
          {galleryImages.map((image, index) => (
            <FallbackImage key={`${image}-${index}`} src={image} alt="" />
          ))}
        </div>
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
        <button
          type="button"
          aria-label={`More actions for ${product.name}`}
          aria-expanded={actionsOpen}
          onClick={() => setActionsOpen((open) => !open)}
        >
          <MoreVertical size={13} />
        </button>
        {actionsOpen && (
          <span className="seller-row-action-menu">
            <button
              type="button"
              disabled={deleting}
              onClick={async () => {
                if (
                  !window.confirm(
                    `Delete "${product.name}"? This cannot be undone.`,
                  )
                ) {
                  return;
                }
                setDeleting(true);
                setDeleteError("");
                try {
                  await onDelete(product.id);
                } catch (error) {
                  setDeleteError(
                    error instanceof Error
                      ? error.message
                      : "Product could not be deleted.",
                  );
                } finally {
                  setDeleting(false);
                }
              }}
            >
              <Trash2 size={12} />
              {deleting ? "Deleting..." : "Delete product"}
            </button>
            {deleteError && (
              <small role="alert" className="seller-row-delete-error">
                {deleteError}
              </small>
            )}
          </span>
        )}
      </span>
    </div>
  );
}
