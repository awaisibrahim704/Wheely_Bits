import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  Filter,
  MapPin,
  Search,
  Settings2,
  Store,
} from "lucide-react";
import {
  getMarketplace,
  getLocalRatings,
  computeRatingSummary,
  type MarketplaceData,
} from "../lib/sellerApi";

type Vendor = {
  id: string;
  name: string;
  location: string;
  area: string;
  rating: number;
  reviewsCount?: number;
  distance: string;
  products: number;
  services: string[];
  badge: string;
  initials: string;
  description: string;
  accent: string;
};

const vendors: Vendor[] = [
  {
    id: "automax-wheels",
    name: "AutoMax Wheels",
    location: "Blue Area, Islamabad",
    area: "Islamabad",
    rating: 4.8,
    distance: "3.2",
    products: 124,
    services: ["Rims", "Tyres", "Auto Parts"],
    badge: "Verified Seller",
    initials: "AM",
    description:
      "Premium alloy and forged wheels importer. Authorized Vossen, Enkei, and BBS...",
    accent: "#6b9a7b",
  },
  {
    id: "apex-performance",
    name: "Apex Performance Garage",
    location: "Sector I-9/3, Islamabad",
    area: "Islamabad",
    rating: 4.9,
    distance: "4.7",
    products: 88,
    services: ["Auto Parts", "Rims"],
    badge: "Top Rated Partner",
    initials: "AP",
    description:
      "High-end automotive tuning, custom forged monoblocks, Brembo BBK kits, an...",
    accent: "#b9966b",
  },
  {
    id: "velocity-wheels",
    name: "Velocity Wheels & Tyres",
    location: "Saddar, Rawalpindi",
    area: "Rawalpindi",
    rating: 4.7,
    distance: "6.8",
    products: 218,
    services: ["Rims", "Tyres"],
    badge: "Verified Seller",
    initials: "VW",
    description:
      "Complete tyre solutions from Michelin, Yokohama, and Pirelli. Track semi-slicks,...",
    accent: "#6b9a7b",
  },
  {
    id: "aura-custom",
    name: "Aura Custom Studio",
    location: "P-I Markaz, Islamabad",
    area: "Islamabad",
    rating: 4.9,
    distance: "5.1",
    products: 65,
    services: ["Wraps", "Auto Parts"],
    badge: "Avery Certified",
    initials: "AC",
    description:
      "Bespoke vinyl color change wraps, ceramic window tints (5% to 70% VLT), and self-...",
    accent: "#6b9a7b",
  },
  {
    id: "stancecraft",
    name: "StanceCraft Parts & Tuning",
    location: "G-10/4, Islamabad",
    area: "Islamabad",
    rating: 4.6,
    distance: "8.4",
    products: 142,
    services: ["Rims", "Auto Parts"],
    badge: "Verified Seller",
    initials: "SC",
    description:
      "Air suspension management systems, wheel spacers, hub-centric rings, and...",
    accent: "#6b9a7b",
  },
  {
    id: "rawal-tyre",
    name: "Rawal Tyre & Wheel Point",
    location: "Murree Road, Rawalpindi",
    area: "Rawalpindi",
    rating: 4.5,
    distance: "11.2",
    products: 175,
    services: ["Tyres", "Rims"],
    badge: "Verified Seller",
    initials: "RT",
    description:
      "Extensive warehouse inventory of high-performance radial tyres, lightweight flow...",
    accent: "#b9966b",
  },
];

const ALL_LOCATIONS = ["Islamabad", "Rawalpindi", "Lahore", "Karachi"] as const;

export default function VendorDirectory() {
  const [marketplace, setMarketplace] = useState<MarketplaceData | null>(null);
  const [marketplaceError, setMarketplaceError] = useState("");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("Highest Rated");
  const [category, setCategory] = useState("All Categories");

  // Sidebar filter state
  const [selectedLocations, setSelectedLocations] = useState<string[]>([
    ...ALL_LOCATIONS,
  ]);
  const [minRating, setMinRating] = useState<number>(0); // 0 = Any, 4.0, 4.5

  useEffect(() => {
    getMarketplace()
      .then(setMarketplace)
      .catch((error: unknown) =>
        setMarketplaceError(
          error instanceof Error
            ? error.message
            : "Marketplace data is unavailable.",
        ),
      );
  }, []);

  // Merge live API vendor with static vendor list and apply dynamic ratings.
  const allVendors: Vendor[] = useMemo(() => {
    const liveVendor: Vendor | null = marketplace?.seller
      ? {
          id: "automax-wheels",
          name:
            marketplace.seller.store?.businessName ||
            marketplace.seller.businessName ||
            "AutoMax Wheels",
          location:
            marketplace.seller.store?.address ||
            marketplace.seller.store?.city ||
            "Blue Area, Islamabad",
          area: marketplace.seller.store?.city || "Islamabad",
          rating: marketplace.averageRating ?? 4.8,
          reviewsCount: marketplace.totalRatings || 28,
          distance: "3.2",
          products: marketplace.products.length || 124,
          services: [
            ...new Set(
              marketplace.products.length > 0
                ? marketplace.products.map((p) =>
                    p.category === "tyres"
                      ? "Tyres"
                      : p.category === "rims"
                        ? "Rims"
                        : "Auto Parts",
                  )
                : ["Rims", "Tyres", "Auto Parts"],
            ),
          ],
          badge: "Verified Seller",
          initials: (
            marketplace.seller.store?.businessName ||
            marketplace.seller.businessName ||
            "AutoMax Wheels"
          )
            .slice(0, 2)
            .toUpperCase(),
          description:
            marketplace.seller.store?.address ||
            "Premium alloy and forged wheels importer. Authorized Vossen, Enkei, and BBS...",
          accent: "#6b9a7b",
        }
      : null;

    return vendors.map((v) => {
      const base = v.id === "automax-wheels" && liveVendor ? liveVendor : v;
      const ratings = getLocalRatings(v.id);
      const summary = computeRatingSummary(ratings);
      return {
        ...base,
        rating: summary.averageRating ?? base.rating,
        reviewsCount: summary.totalRatings || base.reviewsCount || 0,
      };
    });
  }, [marketplace]);

  const filteredVendors = useMemo(() => {
    const q = query.trim().toLowerCase();
    const result = allVendors.filter((vendor) => {
      // Text search
      const matchesQuery =
        !q ||
        `${vendor.name} ${vendor.location} ${vendor.description} ${vendor.services.join(" ")}`
          .toLowerCase()
          .includes(q);
      // Location filter
      const matchesLocation = selectedLocations.includes(vendor.area);
      // Minimum rating filter
      const matchesRating = vendor.rating >= minRating;
      // Category tab filter
      const matchesCategory =
        category === "All Categories" ||
        (category === "Rims & Forged Wheels" &&
          vendor.services.some((s) =>
            ["Rims"].includes(s),
          )) ||
        (category === "Tyres & Fitment" &&
          vendor.services.includes("Tyres")) ||
        (category === "Auto Parts & Tuning" &&
          vendor.services.includes("Auto Parts")) ||
        (category === "Wrap & Tint Studios" &&
          vendor.services.some((s) => ["Wraps", "Tint"].includes(s)));

      return matchesQuery && matchesLocation && matchesRating && matchesCategory;
    });

    return [...result].sort((a, b) =>
      sort === "Closest"
        ? parseFloat(a.distance) - parseFloat(b.distance)
        : b.rating - a.rating,
    );
  }, [allVendors, query, selectedLocations, minRating, sort, category]);

  const toggleLocation = (area: string) =>
    setSelectedLocations((cur) =>
      cur.includes(area) ? cur.filter((l) => l !== area) : [...cur, area],
    );

  const resetAll = () => {
    setSelectedLocations([...ALL_LOCATIONS]);
    setMinRating(0);
    setQuery("");
    setSort("Highest Rated");
    setCategory("All Categories");
  };

  const ratingOptions = [
    { label: "Any", value: 0 },
    { label: "4.0+", value: 4.0 },
    { label: "4.5+", value: 4.5 },
  ];

  const locationShopCounts: Record<string, number> = {
    Islamabad: 5,
    Rawalpindi: 3,
    Lahore: 2,
    Karachi: 4,
  };

  return (
    <div className="min-h-screen bg-[#121416] px-4 pb-16 text-[#e2e2e5] sm:px-6 lg:px-8">
      {/* ── Hero Search ── */}
      <section className="mx-auto max-w-[1120px] pt-8 text-center sm:pt-10">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#8fb397]/20 bg-[#8fb397]/[0.08] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-[#abcfb2]">
          <Check className="h-3 w-3" /> Verified automotive network
        </div>
        <h1 className="text-3xl font-bold tracking-[-0.04em] text-white sm:text-4xl">
          Find Automotive Shops
        </h1>
        <p className="mt-2 text-sm text-[#c2c8c0]">
          Discover trusted sellers for rims, tyres, and automotive products near
          you.
        </p>
        {/* Search-only bar */}
        <div className="mt-7 rounded-xl border border-white/[0.12] bg-[#1e2022]/80 p-3 shadow-[0_18px_40px_rgba(0,0,0,0.22)]">
          <label className="flex min-h-11 items-center gap-2 rounded-lg border border-white/[0.1] bg-[#282a2c] px-4 text-[#c2c8c0] focus-within:border-[#8fb397]">
            <Search className="h-4 w-4 shrink-0" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full bg-transparent text-xs text-white outline-none placeholder:text-[#c2c8c0]/50"
              placeholder="Search shops, sellers, or locations..."
            />
            {query && (
              <button
                onClick={() => setQuery("")}
                className="shrink-0 text-[#c2c8c0] hover:text-white transition"
              >
                ✕
              </button>
            )}
          </label>
        </div>
        {/* Category pill tabs */}
        <div className="mt-2 flex flex-wrap items-center gap-2 border-t border-white/[0.08] px-1 pt-3 text-[10px]">
          <span className="mr-1 text-[#c2c8c0]">
            <Settings2 className="mr-1 inline h-3 w-3" />
            Category:
          </span>
          {[
            "All Categories",
            "Rims & Forged Wheels",
            "Tyres & Fitment",
            "Auto Parts & Tuning",
            "Wrap & Tint Studios",
          ].map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-3 py-1.5 transition ${
                category === item
                  ? "bg-[#abcfb2] font-semibold text-[#163722]"
                  : "bg-[#333537] text-[#e2e2e5] hover:bg-[#424842]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      {marketplaceError && (
        <p className="mx-auto mt-4 max-w-[1120px] rounded-lg bg-[#d4a373]/10 p-3 text-xs text-[#d4a373]">
          {marketplaceError} Start the seller API to load live marketplace data.
        </p>
      )}

      <section className="mx-auto mt-6 grid max-w-[1120px] gap-6 lg:grid-cols-[180px_1fr]">
        {/* ── Sidebar Filters ── */}
        <aside className="hidden rounded-xl border border-white/[0.1] bg-[#1a1c1e] p-4 lg:block self-start sticky top-4">
          <div className="mb-5 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wide">
              <Filter className="mr-1 inline h-3 w-3 text-[#abcfb2]" /> Filters
            </span>
            <button
              onClick={resetAll}
              className="text-[9px] text-[#c2c8c0] hover:text-white transition"
            >
              Reset All
            </button>
          </div>

          {/* Location */}
          <p className="mb-3 flex justify-between text-[9px] font-bold">
            <span>Location</span>
            <span className="font-normal text-[#c2c8c0]">Metro Area</span>
          </p>
          {ALL_LOCATIONS.map((area) => (
            <label
              key={area}
              className="mb-2 flex cursor-pointer items-center justify-between text-[10px] text-[#c2c8c0] hover:text-white transition"
            >
              <span className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedLocations.includes(area)}
                  onChange={() => toggleLocation(area)}
                  className="accent-[#abcfb2]"
                />
                {area}
              </span>
              <span className="text-[9px]">{locationShopCounts[area]} shops</span>
            </label>
          ))}

          <div className="my-4 border-t border-white/[0.08]" />



          {/* Minimum Rating */}
          <p className="mb-3 flex justify-between text-[9px] font-bold">
            <span>Minimum Rating</span>
            <span className="text-[#d4a373]">
              {minRating === 0 ? "All" : `${minRating}+ ★`}
            </span>
          </p>
          <div className="grid grid-cols-3 gap-1 text-[9px]">
            {ratingOptions.map(({ label, value }) => (
              <button
                key={label}
                onClick={() => setMinRating(value)}
                className={`rounded py-1.5 transition font-medium ${
                  minRating === value
                    ? "bg-[#abcfb2] text-[#163722]"
                    : "bg-[#333537] text-[#c2c8c0] hover:bg-[#3e4040]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </aside>

        {/* ── Vendor Grid ── */}
        <div>
          <div className="mb-4 flex items-center justify-between rounded-lg border border-white/[0.08] bg-[#1a1c1e] px-3 py-2 text-[10px] text-[#c2c8c0]">
            <span>
              <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-[#abcfb2]" />{" "}
              Showing{" "}
              <strong className="text-white">
                {filteredVendors.length} verified shops
              </strong>
            </span>
            <label>
              Sort by:{" "}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="ml-1 rounded bg-[#333537] px-2 py-1 text-white outline-none"
              >
                <option>Highest Rated</option>
                <option>Closest</option>
              </select>
            </label>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {filteredVendors.map((vendor) => (
              <article
                key={vendor.id}
                className="group overflow-hidden rounded-xl border border-white/[0.1] bg-[#1a1c1e] shadow-[0_10px_24px_rgba(0,0,0,0.16)] transition hover:-translate-y-0.5 hover:border-[#8fb397]/50"
              >
                <div className="relative flex h-24 items-center justify-center bg-[radial-gradient(circle_at_50%_0%,#41435a,#252735_55%,#1a1c1e)]">
                  <span className="absolute left-2 top-2 rounded-full bg-[#121416]/80 px-2 py-1 text-[9px] text-white">
                    <Check className="mr-1 inline h-3 w-3 text-[#abcfb2]" />
                    {vendor.badge}
                  </span>
                  <span className="absolute right-2 top-2 rounded bg-[#121416]/80 px-2 py-1 text-[9px] text-[#abcfb2]">
                    ♥ {vendor.distance} km
                  </span>
                  <Store className="h-5 w-5 text-[#7167e8]" />
                </div>
                <div className="p-3">
                  <div className="flex items-start gap-2">
                    <span
                      className="grid h-7 w-7 shrink-0 place-items-center rounded-md text-[10px] font-bold text-[#121416]"
                      style={{ backgroundColor: vendor.accent }}
                    >
                      {vendor.initials}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-1">
                        <h2 className="text-xs font-bold leading-tight text-white">
                          {vendor.name}
                        </h2>
                        <Link
                          to={`/vendors/${vendor.id}#reviews-section`}
                          className="shrink-0 rounded bg-[#d4a373]/15 hover:bg-[#d4a373]/25 px-1.5 py-1 text-[9px] font-semibold text-[#d4a373] transition"
                          title={`View customer reviews for ${vendor.name}`}
                        >
                          ★ {typeof vendor.rating === "number" ? vendor.rating.toFixed(1) : vendor.rating}{" "}
                          {vendor.reviewsCount ? `(${vendor.reviewsCount})` : ""}
                        </Link>
                      </div>
                      <p className="mt-1 truncate text-[9px] text-[#c2c8c0]">
                        <MapPin className="mr-1 inline h-3 w-3" />
                        {vendor.location}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex flex-wrap items-center gap-1 text-[8px] text-[#c2c8c0]">
                    {vendor.services.map((service) => (
                      <span
                        key={service}
                        className="rounded bg-[#333537] px-2 py-1"
                      >
                        {service}
                      </span>
                    ))}
                    <span className="ml-auto">{vendor.products} Products</span>
                  </div>
                  <p className="mt-3 h-8 overflow-hidden text-[9px] leading-4 text-[#c2c8c0]">
                    {vendor.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between gap-2 border-t border-white/[0.08] pt-3 text-[8px] text-[#abcfb2]">
                    <span>
                      ⌁{" "}
                      {vendor.id === "aura-custom"
                        ? "3-Year Warranty"
                        : "In-Stock Fitments"}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <Link
                        to={`/vendors/${vendor.id}#rate`}
                        className="rounded-lg border border-[#d4a373]/40 bg-[#d4a373]/10 hover:bg-[#d4a373] hover:text-[#163722] px-2.5 py-2 text-[9px] font-semibold text-[#d4a373] transition flex items-center gap-1"
                        title={`Rate & review ${vendor.name}`}
                      >
                        ★ Rate
                      </Link>
                      <Link
                        to={`/vendors/${vendor.id}`}
                        className="rounded-lg border border-[#8fb397]/30 px-3 py-2 text-[9px] font-semibold text-[#abcfb2] transition hover:bg-[#abcfb2] hover:text-[#163722]"
                      >
                        View Shop <ArrowRight className="ml-1 inline h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredVendors.length === 0 && (
            <div className="rounded-xl border border-dashed border-white/10 py-16 text-center text-sm text-[#c2c8c0]">
              No shops match these filters.
              <br />
              <button
                onClick={resetAll}
                className="mt-3 text-xs text-[#abcfb2] underline hover:no-underline"
              >
                Clear all filters
              </button>
            </div>
          )}

          <div className="mt-6 border-t border-white/[0.08] pt-5 text-center text-[9px] text-[#c2c8c0]">
            Displaying {filteredVendors.length} of {allVendors.length} licensed
            Wheely Bits merchant partners
          </div>
        </div>
      </section>
    </div>
  );
}
