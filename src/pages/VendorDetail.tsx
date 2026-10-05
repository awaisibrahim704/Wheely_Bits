import { useCallback, useEffect, useMemo, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Bookmark,
  Check,
  ChevronDown,
  Edit,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  Send,
  Share2,
  Sparkles,
  Star,
  ThumbsUp,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import {
  getMarketplace,
  getSellerRatings,
  getMyRating,
  submitRating,
  type MarketplaceData,
  type SellerRating,
  type RatingSummary,
} from "../lib/sellerApi";
import {
  getVendorProfile,
  type VendorProduct as Product,
} from "../lib/vendorProfiles";

const starLabels: Record<number, string> = {
  1: "1 Star — Needs Improvement",
  2: "2 Stars — Fair Experience",
  3: "3 Stars — Good / Acceptable",
  4: "4 Stars — Very Good Fitment & Service",
  5: "5 Stars — Exceptional / Highly Recommended",
};

const quickReviewTags = [
  "Flawless Fitment",
  "Authentic Wheels",
  "Laser Balancing",
  "Fast Courier Dispatch",
  "Great Offset Guidance",
  "Careful Packaging",
];

const matchesProductCategory = (
  product: Product,
  selectedCategory: "All" | "Rims" | "Tyres",
) => {
  if (selectedCategory === "All") return true;

  const haystack =
    `${product.name} ${product.brand} ${product.type} ${product.category ?? ""}`.toLowerCase();

  const hasRimSignals =
    /(rim|wheel|wheelset|monoblock|forged|flow-formed|flow formed|concave|mesh|spoke|split|track spec|racing)/.test(
      haystack,
    );
  const hasTyreSignals =
    /(tyre|tire|pilot|neova|advan|michelin|yokohama|continental|pirelli|bridgestone|kumho|goodyear)/.test(
      haystack,
    );

  if (selectedCategory === "Rims") return hasRimSignals && !hasTyreSignals;
  if (selectedCategory === "Tyres") return hasTyreSignals;

  return true;
};

const getProductCategoryCount = (
  items: Product[],
  selectedCategory: "All" | "Rims" | "Tyres",
) =>
  selectedCategory === "All"
    ? items.length
    : items.filter((item) => matchesProductCategory(item, selectedCategory))
        .length;

const products: Product[] = [
  {
    name: "HF-5 Monoblock",
    brand: "VOSSEN WHEELS",
    type: "Gloss Black · 19×9.5 +35 · PCD 5×114.3",
    price: "PKR 385,000",
    image:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=700&q=85",
    tags: ["In Stock", "Fitment Match"],
    stock: "PRICE / SET (4)",
  },
  {
    name: "BBS LM Motorsport",
    brand: "BBS GERMANY",
    type: "Diamond Silver · 20×10 +25 · PCD 5×112",
    price: "PKR 620,000",
    image:
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=700&q=85",
    tags: ["2 Sets Left", "Fitment Match"],
    stock: "PRICE / SET (4)",
  },
  {
    name: "Pilot Sport 4S (PS4S)",
    brand: "MICHELIN",
    type: "255/35ZR19 96Y XL · Ultra High Grip",
    price: "PKR 82,000",
    image:
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=700&q=85",
    tags: ["Fresh 2024 DOT"],
    stock: "PRICE / TYRE",
  },
  {
    name: "TE37 Saga S-Plus",
    brand: "RAYS VOLK RACING",
    type: "Bronze Almite · 18×9.5 +38 · 5×114.3",
    price: "PKR 490,000",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=700&q=85",
    tags: ["In Stock", "Fitment Match"],
    stock: "PRICE / SET (4)",
  },
  {
    name: "Enkei RPF1 Lightweight",
    brand: "ENKEI JAPAN",
    type: "Silver · 18×8.5 +35 · 5×114.3 · 8.1kg",
    price: "PKR 245,000",
    image:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=700&q=85",
    tags: ["Verified Fitment"],
    stock: "PRICE / SET (4)",
  },
  {
    name: "Advan Neova AD09",
    brand: "YOKOHAMA",
    type: "245/40R18 Semi-Slick 97W · 200 TW",
    price: "PKR 68,000",
    image:
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=700&q=85",
    tags: ["Track Ready"],
    stock: "PRICE / TYRE",
  },
];

export default function VendorDetail() {
  void products;
  const { id } = useParams();
  const location = useLocation();
  const activeVendorId = id || "automax-wheels";
  const { user } = useAuth();
  const [marketplace, setMarketplace] = useState<MarketplaceData | null>(null);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    "All" | "Rims" | "Tyres"
  >("All");
  const [sort, setSort] = useState("Popularity");
  const [activeTab, setActiveTab] = useState<"products" | "reviews" | "about">(
    "products",
  );

  // ── Rating state ──────────────────────────────────────────────────────────
  const [ratingSummary, setRatingSummary] = useState<RatingSummary | null>(
    null,
  );
  const [allRatings, setAllRatings] = useState<SellerRating[]>([]);
  const [myRating, setMyRating] = useState<number>(0); // 0 = not yet rated
  const [myComment, setMyComment] = useState("");
  const [myCar, setMyCar] = useState("");
  const [guestName, setGuestName] = useState("");
  const [hoverStar, setHoverStar] = useState(0);
  const [ratingSubmitting, setRatingSubmitting] = useState(false);
  const [ratingSuccess, setRatingSuccess] = useState("");
  const [ratingError, setRatingError] = useState("");
  const [showRatingWidget, setShowRatingWidget] = useState(false);
  const [filterStar, setFilterStar] = useState<number>(0); // 0 = all
  const [reviewSort, setReviewSort] = useState<"newest" | "highest" | "lowest">(
    "newest",
  );

  const effectiveUserId = useMemo(() => {
    if (user?.uid) return user.uid;
    try {
      let stored = localStorage.getItem("wheelybits:client_id");
      if (!stored) {
        stored = `guest_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
        localStorage.setItem("wheelybits:client_id", stored);
      }
      return stored;
    } catch {
      return `guest_${Date.now()}`;
    }
  }, [user?.uid]);

  const sellerId = activeVendorId;

  const fetchRatings = useCallback(async () => {
    if (!sellerId) return;
    try {
      const data = await getSellerRatings(sellerId);
      setRatingSummary({
        averageRating: data.averageRating,
        totalRatings: data.totalRatings,
        breakdown: data.breakdown,
      });
      setAllRatings(data.ratings);
    } catch {
      // ignore
    }
  }, [sellerId]);

  useEffect(() => {
    getMarketplace()
      .then(setMarketplace)
      .catch(() => setMarketplace(null));
  }, []);

  useEffect(() => {
    fetchRatings();
    if (effectiveUserId && sellerId) {
      getMyRating(sellerId, effectiveUserId)
        .then((data) => {
          if (data.rating) {
            setMyRating(data.rating.stars);
            setMyComment(data.rating.comment || "");
            if (data.rating.car) setMyCar(data.rating.car);
          }
        })
        .catch(() => {});
    }
  }, [effectiveUserId, fetchRatings, sellerId]);

  useEffect(() => {
    if (location.hash === "#reviews-section" || location.hash === "#rate") {
      setActiveTab("reviews");
      if (location.hash === "#rate") {
        setShowRatingWidget(true);
      }
      setTimeout(() => {
        const el = document.getElementById("reviews-section");
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 200);
    }
  }, [location.hash]);

  const handleSubmitRating = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (user && user.uid === sellerId) {
      setRatingError("Store owners cannot submit ratings for their own store.");
      return;
    }
    if (myRating === 0) {
      setRatingError("Please click stars to choose a rating (1 to 5 stars).");
      return;
    }

    const authorName =
      user?.displayName ||
      user?.email?.split("@")[0] ||
      guestName.trim() ||
      "Verified Customer";

    setRatingSubmitting(true);
    setRatingError("");
    try {
      const result = await submitRating({
        sellerId,
        userId: effectiveUserId,
        userName: authorName,
        stars: myRating,
        comment: myComment.trim(),
        car: myCar.trim(),
      });
      setRatingSummary({
        averageRating: result.averageRating,
        totalRatings: result.totalRatings,
        breakdown: result.breakdown,
      });
      setRatingSuccess("Your review has been successfully published!");
      setShowRatingWidget(false);
      await fetchRatings();
      setTimeout(() => setRatingSuccess(""), 5000);
    } catch (err) {
      setRatingError(
        err instanceof Error ? err.message : "Failed to submit rating.",
      );
    } finally {
      setRatingSubmitting(false);
    }
  };

  const scrollToReviews = () => {
    setActiveTab("reviews");
    setTimeout(() => {
      const el = document.getElementById("reviews-section");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 50);
  };

  const filteredAndSortedReviews = useMemo(() => {
    let list = [...allRatings];
    if (filterStar > 0) {
      list = list.filter((r) => Math.round(r.stars) === filterStar);
    }
    if (reviewSort === "newest") {
      list.sort(
        (a, b) =>
          new Date(b.createdAt || b.updatedAt || 0).getTime() -
          new Date(a.createdAt || a.updatedAt || 0).getTime(),
      );
    } else if (reviewSort === "highest") {
      list.sort((a, b) => b.stars - a.stars);
    } else if (reviewSort === "lowest") {
      list.sort((a, b) => a.stars - b.stars);
    }
    return list;
  }, [allRatings, filterStar, reviewSort]);

  const profile = getVendorProfile(activeVendorId);
  const isAutoMax =
    activeVendorId === "automax-wheels" ||
    (!id && activeVendorId === "automax-wheels");
  const sellerName = isAutoMax
    ? marketplace?.seller?.store?.businessName ||
      marketplace?.seller?.businessName ||
      profile.name
    : profile.name;
  const sellerLocation = isAutoMax
    ? marketplace?.seller?.store?.address ||
      marketplace?.seller?.store?.city ||
      profile.location
    : profile.location;
  const sellerArea = profile.area || "Islamabad";
  const sellerBadge = isAutoMax ? "Wheely Bits Verified Seller" : profile.badge;
  const sellerInitials = isAutoMax
    ? (
        marketplace?.seller?.store?.businessName ||
        marketplace?.seller?.businessName ||
        profile.name
      )
        .slice(0, 2)
        .toUpperCase()
    : profile.initials;
  const sellerPhone = isAutoMax
    ? marketplace?.seller?.store?.businessPhone ||
      marketplace?.seller?.businessPhone ||
      profile.phone
    : profile.phone;
  const sellerWhatsApp = isAutoMax
    ? marketplace?.seller?.store?.whatsapp ||
      marketplace?.seller?.whatsapp ||
      profile.whatsapp
    : profile.whatsapp;
  const sellerEmail = isAutoMax
    ? marketplace?.seller?.store?.businessEmail ||
      marketplace?.seller?.email ||
      profile.email
    : profile.email;
  const hoursMonSat = isAutoMax
    ? marketplace?.seller?.store?.openingTime
      ? `${marketplace.seller.store.openingTime} - ${marketplace.seller.store.closingTime || "08:00 PM"}`
      : profile.hoursMonSat
    : profile.hoursMonSat;
  const hoursSun = profile.hoursSun;
  const bannerImage = profile.bannerImage;
  const description = profile.description;
  const aboutBay = profile.aboutBay;
  const features = profile.features;
  const sellerServices = profile.services;

  const liveProducts: Product[] = useMemo(() => {
    if (!isAutoMax) {
      return profile.products;
    }
    const rawProducts = marketplace?.products ?? [];
    if (rawProducts.length === 0) return profile.products;
    return rawProducts.map((product) => ({
      id: product._id,
      name: product.productName || "Unnamed product",
      brand: product.brand || "Unbranded",
      type: product.description || product.category || "Published listing",
      price: `PKR ${Number(product.price || 0).toLocaleString()}`,
      image: product.gallery?.[0] || product.aiImage || "",
      tags: [Number(product.stock || 0) > 0 ? "In Stock" : "Out of Stock"],
      stock: `${product.stock || 0} available`,
      category: product.category || "",
    }));
  }, [isAutoMax, profile.products, marketplace]);

  const visibleProducts = useMemo(() => {
    let matches = liveProducts.filter((product) => {
      if (!matchesProductCategory(product, selectedCategory)) return false;

      // 2. Smart Search Query Matching
      const q = query.trim().toLowerCase();
      if (!q) return true;

      const tokens = q.split(/\s+/).filter(Boolean);
      const name = product.name.toLowerCase();
      const brand = product.brand.toLowerCase();
      const type = product.type.toLowerCase();
      const primaryText = `${name} ${brand}`;
      const allWords = `${primaryText} ${type}`
        .split(/[\s,./()-]+/)
        .filter(Boolean);

      return tokens.every((token) => {
        // Direct match in title or brand
        if (primaryText.includes(token)) return true;
        // Word prefix match anywhere
        if (allWords.some((word) => word.startsWith(token))) return true;
        // Substring match in spec/type only if token is at least 3 characters
        if (token.length >= 3 && type.includes(token)) return true;
        return false;
      });
    });

    if (sort === "Price: Low to High") {
      matches = [...matches].sort(
        (a, b) =>
          Number(a.price.replace(/[^0-9]/g, "")) -
          Number(b.price.replace(/[^0-9]/g, "")),
      );
    } else if (sort === "Price: High to Low") {
      matches = [...matches].sort(
        (a, b) =>
          Number(b.price.replace(/[^0-9]/g, "")) -
          Number(a.price.replace(/[^0-9]/g, "")),
      );
    }

    return matches;
  }, [liveProducts, query, selectedCategory, sort]);

  const [isBookmarked, setIsBookmarked] = useState(() => {
    try {
      const saved = localStorage.getItem("wheelybits:bookmarked-vendors");
      const list: string[] = saved ? JSON.parse(saved) : [];
      return list.includes(activeVendorId);
    } catch {
      return false;
    }
  });
  const [copied, setCopied] = useState(false);

  const handleWhatsApp = () => {
    const rawNumber = sellerWhatsApp || "+923001234567";
    const cleanNumber = rawNumber.replace(/[^0-9]/g, "");
    const message = encodeURIComponent(
      `Hello ${sellerName}, I am reaching out from Wheely Bits regarding your products and fitment.`,
    );
    window.open(`https://wa.me/${cleanNumber}?text=${message}`, "_blank");
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleBookmark = () => {
    const next = !isBookmarked;
    setIsBookmarked(next);
    try {
      const saved = localStorage.getItem("wheelybits:bookmarked-vendors");
      let list: string[] = saved ? JSON.parse(saved) : [];
      if (next) {
        if (!list.includes(activeVendorId)) list.push(activeVendorId);
      } else {
        list = list.filter((vId) => vId !== activeVendorId);
      }
      localStorage.setItem(
        "wheelybits:bookmarked-vendors",
        JSON.stringify(list),
      );
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-[#121416] pb-12 text-[#e2e2e5]">
      <div className="mx-auto max-w-[1120px] px-4 pt-5 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between text-[10px] text-[#c2c8c0]">
          <span>
            Vendors <span className="mx-2 text-white/30">›</span> {sellerArea}{" "}
            <span className="mx-2 text-white/30">›</span>{" "}
            <strong className="text-white">{sellerName}</strong>
          </span>
          <Link to="/vendors" className="rounded-full bg-[#1a1c1e] px-3 py-2">
            <ArrowLeft className="mr-1 inline h-3 w-3" /> Back to Discover Shops
          </Link>
        </div>
        <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#1a1c1e] shadow-2xl">
          <div className="relative h-52 overflow-hidden">
            <img
              src={bannerImage}
              alt={`${sellerName} showroom`}
              className="h-full w-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1c1e] via-[#121416]/35 to-transparent" />
            <span className="absolute right-4 top-4 rounded-full bg-[#121416]/70 px-3 py-1 text-[10px] text-[#abcfb2]">
              ✓ {sellerBadge}
            </span>
            <div className="absolute bottom-4 left-4 flex items-end gap-3 sm:left-7">
              <div className="grid h-16 w-16 place-items-center rounded-xl border-4 border-[#8fb397]/40 bg-[#d5ddd2] text-xl font-black text-[#1a1c1e]">
                {sellerInitials}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-lg font-bold text-white">{sellerName}</h1>
                  <span className="text-[10px] text-[#abcfb2]">
                    ✓ Wheely Bits Verified Seller
                  </span>
                </div>
                <button
                  type="button"
                  onClick={scrollToReviews}
                  className="mt-1 flex items-center gap-1.5 text-xs text-[#d4a373] hover:text-[#e4be93] transition"
                  title="Click to view customer ratings and reviews"
                >
                  <span className="font-bold">
                    ★{" "}
                    {ratingSummary?.averageRating
                      ? ratingSummary.averageRating.toFixed(1)
                      : "5.0"}
                  </span>
                  <span className="text-[#c2c8c0]">
                    ({ratingSummary?.totalRatings ?? allRatings.length} reviews)
                  </span>
                  <span className="text-[10px] text-[#abcfb2] ml-1">
                    · View Customer Feedback
                  </span>
                </button>
                <p className="mt-1 text-xs text-[#c2c8c0]">
                  <MapPin className="mr-1 inline h-3 w-3 text-[#abcfb2]" />{" "}
                  {sellerLocation}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 border-t border-white/[0.06] px-4 py-3 sm:px-7">
            <div className="flex gap-3 text-[10px] text-[#c2c8c0]">
              {sellerServices.map((service) => (
                <span key={service}>{service}</span>
              ))}
            </div>
            <span className="rounded bg-[#8fb397]/15 px-2 py-1 text-[10px] text-[#abcfb2]">
              Performance Fitment
            </span>
            <span className="rounded bg-[#8fb397]/15 px-2 py-1 text-[10px] text-[#abcfb2]">
              Fitment Guaranteed
            </span>
            <div className="ml-auto flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => {
                  setActiveTab("reviews");
                  setShowRatingWidget(true);
                  setTimeout(() => {
                    const el = document.getElementById("reviews-section");
                    if (el)
                      el.scrollIntoView({ behavior: "smooth", block: "start" });
                  }, 50);
                }}
                className="rounded-lg bg-[#d4a373] hover:bg-[#e4b281] px-3.5 py-2 text-[10px] font-bold text-[#141618] transition flex items-center gap-1.5 shadow-md shadow-[#d4a373]/20"
                title="Rate and write a review for this store"
              >
                <Star className="h-3.5 w-3.5 fill-[#141618] text-[#141618]" />
                {myRating > 0 ? "Edit Review" : "Rate Shop"}
              </button>
              <Link
                to={`/vendors/${activeVendorId}/contact`}
                className="rounded-lg bg-[#abcfb2] px-4 py-2 text-[10px] font-bold text-[#163722]"
              >
                <MessageCircle className="mr-1 inline h-3 w-3" /> Contact Seller
              </Link>
              <button
                onClick={handleWhatsApp}
                className="hidden rounded-lg bg-[#063a32] px-4 py-2 text-[10px] text-[#55d6a7] transition hover:bg-[#084c42] sm:flex sm:items-center sm:gap-1.5"
              >
                <Send className="h-3 w-3" /> WhatsApp Us
              </button>
              <button
                onClick={handleShare}
                title="Share Shop Profile"
                className="relative rounded-lg bg-[#282a2c] p-2 text-white transition hover:bg-[#333537]"
              >
                <Share2 className="h-3 w-3" />
                {copied && (
                  <span className="absolute -bottom-7 right-0 whitespace-nowrap rounded bg-[#abcfb2] px-2 py-0.5 text-[8px] font-bold text-[#163722]">
                    Link Copied!
                  </span>
                )}
              </button>
              <button
                onClick={handleBookmark}
                title={isBookmarked ? "Remove Bookmark" : "Save Shop Bookmark"}
                className={`rounded-lg p-2 transition ${
                  isBookmarked
                    ? "bg-[#abcfb2] text-[#163722]"
                    : "bg-[#282a2c] text-white hover:bg-[#333537]"
                }`}
              >
                <Bookmark
                  className={`h-3 w-3 ${isBookmarked ? "fill-current" : ""}`}
                />
              </button>
            </div>
          </div>
          <nav className="flex flex-wrap items-center gap-2 border-t border-white/[0.06] px-4 text-[10px] sm:px-7 pt-2 pb-2">
            <button
              type="button"
              onClick={() => setActiveTab("products")}
              className={`rounded-lg px-3.5 py-2 font-semibold transition ${
                activeTab === "products"
                  ? "bg-[#abcfb2] text-[#163722]"
                  : "text-[#c2c8c0] hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              Products ({liveProducts.length})
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("reviews");
                scrollToReviews();
              }}
              className={`rounded-lg px-3.5 py-2 font-semibold transition flex items-center gap-1.5 ${
                activeTab === "reviews"
                  ? "bg-[#abcfb2] text-[#163722]"
                  : "text-[#d4a373] hover:text-[#f3caa1] hover:bg-white/[0.06]"
              }`}
            >
              <Star
                className={`h-3 w-3 ${activeTab === "reviews" ? "fill-[#163722] text-[#163722]" : "fill-[#d4a373] text-[#d4a373]"}`}
              />
              <span>
                Reviews ({ratingSummary?.totalRatings ?? allRatings.length})
              </span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("about")}
              className={`rounded-lg px-3.5 py-2 font-semibold transition ${
                activeTab === "about"
                  ? "bg-[#abcfb2] text-[#163722]"
                  : "text-[#c2c8c0] hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              About & Workshop Bay
            </button>
            <Link
              to={`/vendors/${activeVendorId}/catalog`}
              className="ml-auto rounded-lg border border-white/10 px-3 py-2 text-[#c2c8c0] hover:text-white hover:bg-white/[0.06] transition hidden sm:inline-flex items-center gap-1"
            >
              Full Catalog View <ArrowRight className="h-3 w-3" />
            </Link>
          </nav>
        </section>
        <div className="mt-5 grid gap-5 lg:grid-cols-[230px_1fr]">
          <aside className="space-y-4">
            <InfoPanel
              sellerName={sellerName}
              description={description}
              aboutBay={aboutBay}
              features={features}
            />
            <PerformancePanel />
            <ContactPanel
              phone={sellerPhone}
              whatsapp={sellerWhatsApp}
              email={sellerEmail}
              address={sellerLocation}
            />
            <HoursPanel hoursMonSat={hoursMonSat} hoursSun={hoursSun} />
          </aside>
          <main className="flex flex-col gap-6">
            {activeTab === "about" && (
              <section className="order-first rounded-xl bg-[#1a1c1e] p-5 border border-white/[0.08]">
                <h2 className="text-sm font-bold text-white mb-2">
                  About {sellerName} & Workshop Bay
                </h2>
                <p className="text-xs text-[#c2c8c0] leading-relaxed mb-4">
                  {description}
                </p>
                <div className="grid sm:grid-cols-2 gap-4 border-t border-white/[0.08] pt-4">
                  <div>
                    <h3 className="text-xs font-bold text-[#abcfb2] mb-1">
                      Laser Fitment & Service Bay
                    </h3>
                    <p className="text-[11px] text-[#c2c8c0] leading-relaxed">
                      {aboutBay}
                    </p>
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-[#abcfb2] mb-1.5">
                      Shop Specialties & Guarantees
                    </h3>
                    <div className="flex flex-wrap gap-1.5">
                      {features.map((f) => (
                        <span
                          key={f}
                          className="rounded bg-[#333537] px-2.5 py-1 text-[9px] text-[#abcfb2]"
                        >
                          ✓ {f}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </section>
            )}
            <section className="rounded-xl bg-[#1a1c1e] p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm font-bold text-white">
                    Seller Products Catalog
                  </h2>
                  <p className="text-[10px] text-[#c2c8c0]">
                    Showing verified in-stock fitments
                  </p>
                </div>
                <div className="flex gap-1 text-[8px]">
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className={`rounded-full px-2 py-1.5 font-bold transition ${
                      selectedCategory === "All"
                        ? "bg-[#abcfb2] text-[#163722]"
                        : "bg-[#282a2c] text-[#c2c8c0] hover:bg-[#333537]"
                    }`}
                  >
                    All ({getProductCategoryCount(liveProducts, "All")})
                  </button>
                  <button
                    onClick={() => setSelectedCategory("Rims")}
                    className={`rounded-full px-2 py-1.5 font-bold transition ${
                      selectedCategory === "Rims"
                        ? "bg-[#abcfb2] text-[#163722]"
                        : "bg-[#282a2c] text-[#c2c8c0] hover:bg-[#333537]"
                    }`}
                  >
                    Rims ({getProductCategoryCount(liveProducts, "Rims")})
                  </button>
                  <button
                    onClick={() => setSelectedCategory("Tyres")}
                    className={`rounded-full px-2 py-1.5 font-bold transition ${
                      selectedCategory === "Tyres"
                        ? "bg-[#abcfb2] text-[#163722]"
                        : "bg-[#282a2c] text-[#c2c8c0] hover:bg-[#333537]"
                    }`}
                  >
                    Tyres ({getProductCategoryCount(liveProducts, "Tyres")})
                  </button>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <label className="flex min-h-9 flex-1 items-center gap-2 rounded-lg border border-white/20 px-3 text-[#c2c8c0]">
                  <Search className="h-3 w-3 shrink-0" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    className="w-full bg-transparent text-[10px] text-white outline-none placeholder:text-[#c2c8c0]"
                    placeholder="Search within seller inventory (e.g. Pilot Sport, Vossen, BBS, 18, Tyre)..."
                  />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="text-xs text-[#c2c8c0] hover:text-white"
                      title="Clear search"
                    >
                      âœ•
                    </button>
                  )}
                </label>
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                  className="rounded-lg border border-white/20 bg-[#1a1c1e] px-2 text-[10px] text-white outline-none"
                >
                  <option>Popularity</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </section>
            {visibleProducts.length === 0 ? (
              <div className="mt-4 rounded-xl border border-dashed border-white/10 p-8 text-center text-xs text-[#c2c8c0]">
                No products found matching &quot;
                <strong className="text-white">{query}</strong>&quot;
                {selectedCategory !== "All" && ` in ${selectedCategory}`}.
                <br />
                <button
                  onClick={() => {
                    setQuery("");
                    setSelectedCategory("All");
                  }}
                  className="mt-3 rounded-lg bg-[#abcfb2] px-4 py-2 font-bold text-[#163722]"
                >
                  Clear Search &amp; Filters
                </button>
              </div>
            ) : (
              <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {visibleProducts.map((product) => (
                  <article
                    key={product.name}
                    className="overflow-hidden rounded-xl bg-[#1a1c1e] transition hover:-translate-y-0.5 hover:ring-1 hover:ring-[#8fb397]/50"
                  >
                    <div className="relative h-32 bg-[#292d2e]">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-cover opacity-85"
                      />
                      <div className="absolute left-2 top-2 flex gap-1">
                        {product.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded bg-[#063a32]/90 px-2 py-1 text-[8px] text-[#55d6a7]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="flex justify-between gap-2 text-[8px] uppercase text-[#b7bdb8]">
                        <span>{product.brand}</span>
                        <span>{product.category || "Featured"}</span>
                      </div>
                      <h3 className="mt-2 text-sm font-bold text-white">
                        {product.name}
                      </h3>
                      <p className="mt-1 h-7 text-[8px] leading-relaxed text-[#c2c8c0]">
                        {product.type}
                      </p>
                      <p className="mt-3 text-[8px] uppercase text-[#c2c8c0]">
                        {product.stock}
                      </p>
                      <strong className="mt-1 block text-lg text-white">
                        {product.price}
                      </strong>
                      {product.category === "tyres" ||
                      product.name.toLowerCase().includes("pilot") ||
                      product.name.toLowerCase().includes("advan") ? (
                        <Link
                          to={`/tyre/detail/${encodeURIComponent(product.id || "michelin-ps4s")}`}
                          className="mt-3 block w-full rounded-lg bg-[#333537] py-2 text-center text-[10px] font-semibold text-white hover:bg-[#abcfb2] hover:text-[#163722]"
                        >
                          View Details & Fit{" "}
                          <ArrowRight className="ml-1 inline h-3 w-3" />
                        </Link>
                      ) : (
                        <Link
                          to={`/rim/detail/${encodeURIComponent(product.id || "vossen-hf5")}`}
                          className="mt-3 block w-full rounded-lg bg-[#333537] py-2 text-center text-[10px] font-semibold text-white hover:bg-[#abcfb2] hover:text-[#163722]"
                        >
                          View Details & Fit{" "}
                          <ArrowRight className="ml-1 inline h-3 w-3" />
                        </Link>
                      )}
                    </div>
                  </article>
                ))}
              </div>
            )}
            <div className="flex items-center justify-between py-6 text-[10px] text-[#c2c8c0]">
              <span>
                Showing {visibleProducts.length ? 1 : 0}â€“
                {visibleProducts.length} of {liveProducts.length} products
              </span>
              <button className="rounded-lg bg-[#1a1c1e] px-3 py-2 text-[#abcfb2]">
                Load More Products{" "}
                <ChevronDown className="ml-1 inline h-3 w-3" />
              </button>
            </div>
            {/* ── Store Ratings & Customer Reviews Section ── */}
            <section
              id="reviews-section"
              className={`rounded-2xl border border-white/[0.08] bg-[#1a1c1e] p-5 sm:p-6 shadow-2xl transition ${
                activeTab === "reviews"
                  ? "order-first mt-0 ring-1 ring-[#abcfb2]/40"
                  : "mt-8"
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/[0.08] pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-white flex items-center gap-2">
                      <Star className="h-4 w-4 fill-[#d4a373] text-[#d4a373]" />
                      Store Ratings & Customer Reviews
                    </h2>
                    <span className="rounded-full bg-[#8fb397]/20 border border-[#8fb397]/30 px-2 py-0.5 text-[9px] font-semibold text-[#abcfb2]">
                      ✓ Verified Reviews
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-[#c2c8c0]">
                    Real fitment ratings and service feedback from car
                    enthusiasts for {sellerName}
                  </p>
                </div>

                {/* Rating CTA Button */}
                <div>
                  {user?.uid === sellerId ? (
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-[#8fb397]/30 bg-[#163722]/50 px-3 py-1.5 text-xs font-semibold text-[#abcfb2]">
                      <Sparkles className="h-3 w-3" /> Store Owner View
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => {
                        setShowRatingWidget(!showRatingWidget);
                        setRatingError("");
                        setRatingSuccess("");
                      }}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#abcfb2] px-4 py-2 text-xs font-bold text-[#163722] hover:bg-[#8fb397] transition shadow-md"
                    >
                      {myRating > 0 ? (
                        <>
                          <Edit className="h-3.5 w-3.5" /> Edit Your Rating
                        </>
                      ) : (
                        <>
                          <Star className="h-3.5 w-3.5 fill-current" /> Rate &
                          Review Shop
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {/* Success / Error Notifications */}
              {ratingSuccess && (
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-[#063a32] border border-[#55d6a7]/40 p-3 text-xs text-[#55d6a7]">
                  <Check className="h-4 w-4 shrink-0" />
                  <span>{ratingSuccess}</span>
                </div>
              )}
              {ratingError && (
                <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-950/70 border border-red-500/40 p-3 text-xs text-red-300">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{ratingError}</span>
                </div>
              )}

              {/* Interactive Rating Form Modal / Widget */}
              {showRatingWidget && (
                <form
                  onSubmit={handleSubmitRating}
                  className="mt-6 rounded-xl border border-[#8fb397]/30 bg-[#141815] p-5 shadow-2xl transition"
                >
                  <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      <Star className="h-4 w-4 text-[#abcfb2]" />
                      {myRating > 0
                        ? "Update Your Store Review"
                        : `Rate & Review ${sellerName}`}
                    </h3>
                    <span className="text-[10px] text-[#c2c8c0]">
                      Reviewing as{" "}
                      <strong className="text-white">
                        {user?.displayName ||
                          user?.email?.split("@")[0] ||
                          guestName.trim() ||
                          "Guest Customer"}
                      </strong>
                    </span>
                  </div>

                  {/* Interactive Star Picker */}
                  <div className="mt-4">
                    <label className="block text-xs font-medium text-[#c2c8c0] mb-1.5">
                      Your Overall Rating{" "}
                      <span className="text-[#abcfb2]">*</span>
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1.5 bg-[#1a1c1e] p-2 rounded-lg border border-white/10">
                        {[1, 2, 3, 4, 5].map((star) => {
                          const active = (hoverStar || myRating) >= star;
                          return (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setMyRating(star)}
                              onMouseEnter={() => setHoverStar(star)}
                              onMouseLeave={() => setHoverStar(0)}
                              className="p-1 transition transform hover:scale-125 focus:outline-none"
                              aria-label={`${star} Stars`}
                            >
                              <Star
                                className={`h-6 w-6 transition ${
                                  active
                                    ? "fill-[#d4a373] text-[#d4a373]"
                                    : "text-white/20 hover:text-[#d4a373]/50"
                                }`}
                              />
                            </button>
                          );
                        })}
                      </div>
                      <span className="text-xs font-semibold text-[#d4a373]">
                        {starLabels[hoverStar || myRating] ||
                          "Click stars to select rating"}
                      </span>
                    </div>
                  </div>

                  {/* Name Input if guest */}
                  {!user && (
                    <div className="mt-4">
                      <label className="block text-xs font-medium text-[#c2c8c0] mb-1">
                        Your Name <span className="text-[#abcfb2]">*</span>
                      </label>
                      <input
                        type="text"
                        value={guestName}
                        onChange={(e) => setGuestName(e.target.value)}
                        placeholder="e.g. Asad Ali, Bilal Tariq..."
                        className="w-full rounded-lg border border-white/10 bg-[#1a1c1e] px-3 py-2 text-xs text-white placeholder:text-[#c2c8c0]/50 focus:border-[#abcfb2] focus:outline-none"
                      />
                    </div>
                  )}

                  {/* Car / Vehicle Input */}
                  <div className="mt-4">
                    <label className="block text-xs font-medium text-[#c2c8c0] mb-1">
                      Vehicle / Project Car{" "}
                      <span className="text-white/40 text-[10px]">
                        (Optional)
                      </span>
                    </label>
                    <input
                      type="text"
                      value={myCar}
                      onChange={(e) => setMyCar(e.target.value)}
                      placeholder="e.g. Honda Civic FL5, BMW M340i, Golf R..."
                      className="w-full rounded-lg border border-white/10 bg-[#1a1c1e] px-3 py-2 text-xs text-white placeholder:text-[#c2c8c0]/50 focus:border-[#abcfb2] focus:outline-none"
                    />
                  </div>

                  {/* Written Review Comment */}
                  <div className="mt-4">
                    <label className="block text-xs font-medium text-[#c2c8c0] mb-1">
                      Your Review & Experience Details{" "}
                      <span className="text-white/40 text-[10px]">
                        (Fitment accuracy, communication, packaging)
                      </span>
                    </label>
                    <textarea
                      value={myComment}
                      onChange={(e) => setMyComment(e.target.value)}
                      rows={3}
                      placeholder="Share your experience with fitment laser balancing, wheel authentic certificates, delivery speed..."
                      className="w-full rounded-lg border border-white/10 bg-[#1a1c1e] p-3 text-xs text-white placeholder:text-[#c2c8c0]/50 focus:border-[#abcfb2] focus:outline-none"
                    />
                  </div>

                  {/* Quick experience tags */}
                  <div className="mt-2.5">
                    <span className="text-[10px] text-[#c2c8c0] block mb-1.5">
                      Quick Experience Tags (tap to add):
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {quickReviewTags.map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => {
                            if (!myComment.includes(tag)) {
                              setMyComment((prev) =>
                                prev ? `${prev} · ${tag}` : tag,
                              );
                            }
                          }}
                          className="rounded-full bg-[#1a1c1e] hover:bg-[#282a2c] border border-white/10 px-2.5 py-1 text-[10px] text-[#abcfb2] transition"
                        >
                          + {tag}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="mt-5 flex items-center justify-end gap-2 border-t border-white/[0.06] pt-4">
                    <button
                      type="button"
                      onClick={() => setShowRatingWidget(false)}
                      className="rounded-lg bg-[#282a2c] px-4 py-2 text-xs text-[#c2c8c0] hover:text-white transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={ratingSubmitting}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-[#abcfb2] px-5 py-2 text-xs font-bold text-[#163722] hover:bg-[#8fb397] transition disabled:opacity-50"
                    >
                      {ratingSubmitting
                        ? "Publishing..."
                        : myRating > 0
                          ? "Update Verified Review"
                          : "Publish Review"}
                    </button>
                  </div>
                </form>
              )}

              {/* Rating Summary Card (Big score + Distribution) */}
              <div className="mt-5 grid gap-6 sm:grid-cols-12 items-center rounded-xl bg-[#141618] border border-white/[0.04] p-5">
                {/* Left: Overall score */}
                <div className="sm:col-span-4 text-center sm:text-left sm:border-r sm:border-white/[0.06] sm:pr-6">
                  <div className="flex items-baseline justify-center sm:justify-start gap-2">
                    <span className="text-4xl font-extrabold text-white tracking-tight">
                      {ratingSummary?.averageRating
                        ? ratingSummary.averageRating.toFixed(1)
                        : "5.0"}
                    </span>
                    <span className="text-xs font-semibold text-[#c2c8c0]">
                      / 5.0
                    </span>
                  </div>
                  <div className="mt-1.5 flex items-center justify-center sm:justify-start gap-1">
                    {[1, 2, 3, 4, 5].map((star) => {
                      const avg = ratingSummary?.averageRating ?? 5;
                      const isFilled = star <= Math.round(avg);
                      return (
                        <Star
                          key={star}
                          className={`h-4 w-4 ${isFilled ? "fill-[#d4a373] text-[#d4a373]" : "text-white/20"}`}
                        />
                      );
                    })}
                  </div>
                  <p className="mt-2 text-[11px] text-[#c2c8c0]">
                    Based on{" "}
                    <strong className="text-white">
                      {ratingSummary?.totalRatings ?? allRatings.length}
                    </strong>{" "}
                    verified customer reviews
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#063a32] border border-[#55d6a7]/30 px-3 py-1 text-[10px] text-[#55d6a7]">
                    <ThumbsUp className="h-3 w-3" /> 98% Customer Fitment
                    Satisfaction
                  </div>
                </div>

                {/* Right: Star Distribution Bars */}
                <div className="sm:col-span-8 space-y-1.5">
                  {[5, 4, 3, 2, 1].map((s) => {
                    const count =
                      ratingSummary?.breakdown?.[String(s)] ??
                      (s === 5 ? allRatings.length : 0);
                    const total =
                      ratingSummary?.totalRatings || allRatings.length || 1;
                    const pct = Math.round((count / (total || 1)) * 100);
                    const isSelected = filterStar === s;
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setFilterStar(isSelected ? 0 : s)}
                        className={`w-full flex items-center gap-3 text-[11px] py-1 px-2 rounded-lg transition ${
                          isSelected
                            ? "bg-white/[0.1] ring-1 ring-[#abcfb2]"
                            : "hover:bg-white/[0.04]"
                        }`}
                        title={`Filter by ${s} stars`}
                      >
                        <span className="w-12 text-left font-medium text-[#c2c8c0] flex items-center gap-1">
                          <span>{s}</span>{" "}
                          <Star className="h-3 w-3 fill-[#d4a373] text-[#d4a373]" />
                        </span>
                        <div className="flex-1 h-2 rounded-full bg-white/[0.08] overflow-hidden">
                          <div
                            className={`h-full rounded-full transition-all duration-500 ${
                              s >= 4
                                ? "bg-[#abcfb2]"
                                : s === 3
                                  ? "bg-[#d4a373]"
                                  : "bg-[#ef4444]"
                            }`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="w-12 text-right text-[10px] text-[#c2c8c0]">
                          {count} ({pct}%)
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Review Filters & Sorting Toolbar */}
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-b border-white/[0.06] pb-3">
                <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                  <span className="text-[#c2c8c0] mr-1">Filter:</span>
                  <button
                    type="button"
                    onClick={() => setFilterStar(0)}
                    className={`rounded-full px-2.5 py-1 font-medium transition ${
                      filterStar === 0
                        ? "bg-[#abcfb2] text-[#163722] font-bold"
                        : "bg-[#282a2c] text-[#c2c8c0] hover:bg-[#333537]"
                    }`}
                  >
                    All ({allRatings.length})
                  </button>
                  {[5, 4, 3].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() =>
                        setFilterStar(filterStar === star ? 0 : star)
                      }
                      className={`rounded-full px-2.5 py-1 font-medium transition ${
                        filterStar === star
                          ? "bg-[#abcfb2] text-[#163722] font-bold"
                          : "bg-[#282a2c] text-[#c2c8c0] hover:bg-[#333537]"
                      }`}
                    >
                      {star} ★ (
                      {ratingSummary?.breakdown?.[String(star)] ??
                        (star === 5 ? allRatings.length : 0)}
                      )
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-[10px]">
                  <span className="text-[#c2c8c0]">Sort by:</span>
                  <select
                    value={reviewSort}
                    onChange={(e) =>
                      setReviewSort(
                        e.target.value as "newest" | "highest" | "lowest",
                      )
                    }
                    className="rounded-lg border border-white/20 bg-[#1a1c1e] px-2.5 py-1 text-[10px] text-white outline-none"
                  >
                    <option value="newest">Newest First</option>
                    <option value="highest">Highest Rating</option>
                    <option value="lowest">Lowest Rating</option>
                  </select>
                </div>
              </div>

              {/* Customer Reviews List */}
              <div className="mt-4 space-y-3">
                {filteredAndSortedReviews.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-white/10 p-8 text-center text-xs text-[#c2c8c0]">
                    <p>No customer reviews match your filter.</p>
                    <button
                      type="button"
                      onClick={() => setFilterStar(0)}
                      className="mt-3 rounded-lg bg-[#abcfb2] px-4 py-1.5 text-[11px] font-bold text-[#163722]"
                    >
                      Show All Reviews
                    </button>
                  </div>
                ) : (
                  filteredAndSortedReviews.map((review) => {
                    const isMyOwn = user?.uid === review.userId;
                    const dateFormatted = review.createdAt
                      ? new Date(review.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })
                      : "Verified Buyer";
                    const initials = (review.userName || "Customer")
                      .split(" ")
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join("")
                      .toUpperCase();

                    return (
                      <article
                        key={review._id}
                        className={`rounded-xl p-4 transition ${
                          isMyOwn
                            ? "bg-[#18231c] border border-[#8fb397]/50 ring-1 ring-[#8fb397]/30"
                            : "bg-[#141618] border border-white/[0.04] hover:border-white/[0.08]"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <div className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-tr from-[#273a31] to-[#405f50] text-xs font-bold text-[#abcfb2]">
                              {initials}
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <strong className="text-xs font-bold text-white">
                                  {review.userName}
                                </strong>
                                {isMyOwn && (
                                  <span className="rounded bg-[#abcfb2] px-1.5 py-0.5 text-[8px] font-bold text-[#163722]">
                                    Your Review
                                  </span>
                                )}
                                <span className="rounded bg-[#063a32] px-1.5 py-0.5 text-[8px] text-[#55d6a7]">
                                  ✓ Verified Fitment
                                </span>
                              </div>
                              <div className="flex items-center gap-2 mt-0.5 text-[10px] text-[#c2c8c0]">
                                {review.car && (
                                  <>
                                    <span>🏎 {review.car}</span>
                                    <span>·</span>
                                  </>
                                )}
                                <span>{dateFormatted}</span>
                              </div>
                            </div>
                          </div>

                          {/* Star Rating Display */}
                          <div className="flex items-center gap-1 shrink-0">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`h-3 w-3 ${
                                  star <= review.stars
                                    ? "fill-[#d4a373] text-[#d4a373]"
                                    : "text-white/20"
                                }`}
                              />
                            ))}
                          </div>
                        </div>

                        {review.comment && (
                          <p className="mt-3 text-[11px] leading-5 text-[#e2e2e5] pl-12">
                            {review.comment}
                          </p>
                        )}

                        {isMyOwn && (
                          <div className="mt-2 text-right pl-12">
                            <button
                              type="button"
                              onClick={() => {
                                setShowRatingWidget(true);
                                setMyRating(review.stars);
                                setMyComment(review.comment || "");
                                if (review.car) setMyCar(review.car);
                                window.scrollTo({
                                  top:
                                    document.getElementById("reviews-section")
                                      ?.offsetTop ?? 0,
                                  behavior: "smooth",
                                });
                              }}
                              className="text-[10px] text-[#abcfb2] hover:underline"
                            >
                              Edit Review
                            </button>
                          </div>
                        )}
                      </article>
                    );
                  })
                )}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

function InfoPanel({
  sellerName,
  description,
  aboutBay,
  features,
}: {
  sellerName: string;
  description: string;
  aboutBay: string;
  features: string[];
}) {
  return (
    <section className="rounded-xl bg-[#1a1c1e] p-5">
      <h2 className="mb-3 text-xs font-bold text-white">About {sellerName}</h2>
      <p className="text-[10px] leading-5 text-[#c2c8c0]">{description}</p>
      <p className="mt-3 text-[10px] leading-5 text-[#c2c8c0]">{aboutBay}</p>
      <div className="mt-3 flex flex-wrap gap-1 text-[8px]">
        {features.map((feature) => (
          <span
            key={feature}
            className="rounded bg-[#333537] px-2 py-1 text-white/80"
          >
            {feature}
          </span>
        ))}
      </div>
    </section>
  );
}

function PerformancePanel() {
  return (
    <section className="rounded-xl bg-[#1a1c1e] p-5">
      <h2 className="mb-4 text-[10px] font-bold uppercase tracking-wider text-[#c2c8c0]">
        Store Performance
      </h2>
      <div className="grid grid-cols-2 gap-4 text-[10px]">
        {[
          ["Active Inventory", "100+"],
          ["Avg Response", "< 15m"],
          ["Orders Fulfilled", "1,200+"],
          ["Fitment Accuracy", "99.8%"],
        ].map(([label, value]) => (
          <div key={label}>
            <span className="text-[#c2c8c0]">{label}</span>
            <strong className="mt-1 block text-white">{value}</strong>
            <small className="text-[#abcfb2]">● Guaranteed</small>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactPanel({
  phone,
  whatsapp,
  email,
  address,
}: {
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
}) {
  return (
    <section className="rounded-xl bg-[#1a1c1e] p-5">
      <h2 className="mb-4 text-xs font-bold text-white">Contact & Location</h2>
      <div className="space-y-3 text-[10px] text-[#c2c8c0]">
        <p>
          <Phone className="mr-2 inline h-3 w-3 text-[#abcfb2]" /> Phone Support
          <br />
          <span className="ml-5 text-white">{phone}</span>
        </p>
        <p>
          <MessageCircle className="mr-2 inline h-3 w-3 text-[#abcfb2]" />{" "}
          WhatsApp Direct
          <br />
          <span className="ml-5 text-white">{whatsapp}</span>
        </p>
        <p>
          <Mail className="mr-2 inline h-3 w-3 text-[#abcfb2]" /> Official Email
          <br />
          <span className="ml-5 text-white">{email}</span>
        </p>
        <p>
          <MapPin className="mr-2 inline h-3 w-3 text-[#abcfb2]" /> Flagship
          Workshop
          <br />
          <span className="ml-5 text-white">{address}</span>
        </p>
      </div>
      <div className="mt-4 flex h-24 items-end justify-center rounded-lg bg-[#9eb8a1] p-2 text-[9px] text-white">
        <span className="rounded bg-[#121416]/80 px-3 py-1">
          <MapPin className="mr-1 inline h-3 w-3" /> Get Turn-by-Turn Directions
        </span>
      </div>
    </section>
  );
}

function HoursPanel({
  hoursMonSat,
  hoursSun,
}: {
  hoursMonSat: string;
  hoursSun: string;
}) {
  return (
    <section className="rounded-xl bg-[#1a1c1e] p-5 text-[10px]">
      <h2 className="mb-4 text-xs font-bold text-white">Store Hours & Bay</h2>
      <p className="flex justify-between border-b border-white/[0.06] py-2 text-[#c2c8c0]">
        <span>Mon - Sat</span>
        <strong className="text-white">{hoursMonSat}</strong>
      </p>
      <p className="flex justify-between py-2 text-[#c2c8c0]">
        <span>Sunday</span>
        <strong className="text-white">{hoursSun}</strong>
      </p>
      <p className="mt-4 leading-5 text-[#c2c8c0]">
        ✦ Touchless Tyre Dismount & Balancer
        <br />✦ 4-Post Low Clearance Hydraulic Ramps
      </p>
    </section>
  );
}
