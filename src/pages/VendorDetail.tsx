import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Bookmark,
  ChevronDown,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  Send,
  Share2,
} from "lucide-react";

type Product = {
  name: string;
  brand: string;
  type: string;
  price: string;
  image: string;
  tags: string[];
  stock: string;
};

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

const reviews = [
  {
    name: "Hamza Malik",
    initials: "HM",
    car: "Civic Type R (FK8) Owner · Islamabad",
    text: "Spot on fitment for my Civic FL5. Fitted 19×9.5 Volk TE37s with Michelin Pilot Sport 4S. AutoMax checked Brembo caliper clearance beforehand and laser balancing was millimeter perfect.",
  },
  {
    name: "Taimoor Raza",
    initials: "TR",
    car: "BMW M340i Owner · Lahore",
    text: "Genuine BBS LM rims with fast 24-hour insured courier delivery to Lahore. Arrived boxed in original packaging with inspection certificates. Outstanding customer support on WhatsApp!",
  },
];

export default function VendorDetail() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("Popularity");
  const visibleProducts = useMemo(() => {
    const matches = products.filter((product) =>
      `${product.name} ${product.brand} ${product.type}`
        .toLowerCase()
        .includes(query.toLowerCase()),
    );
    return sort === "Price: Low to High"
      ? [...matches].sort(
          (a, b) =>
            Number(a.price.replace(/[^0-9]/g, "")) -
            Number(b.price.replace(/[^0-9]/g, "")),
        )
      : matches;
  }, [query, sort]);

  return (
    <div className="min-h-screen bg-[#121416] pb-12 text-[#e2e2e5]">
      <div className="mx-auto max-w-[1120px] px-4 pt-5 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between text-[10px] text-[#c2c8c0]">
          <span>
            Vendors <span className="mx-2 text-white/30">›</span> Islamabad{" "}
            <span className="mx-2 text-white/30">›</span>{" "}
            <strong className="text-white">AutoMax Wheels</strong>
          </span>
          <Link to="/vendors" className="rounded-full bg-[#1a1c1e] px-3 py-2">
            <ArrowLeft className="mr-1 inline h-3 w-3" /> Back to Discover Shops
          </Link>
        </div>
        <section className="overflow-hidden rounded-2xl border border-white/[0.08] bg-[#1a1c1e] shadow-2xl">
          <div className="relative h-52 overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1600&q=85"
              alt="AutoMax Wheels showroom"
              className="h-full w-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1a1c1e] via-[#121416]/35 to-transparent" />
            <span className="absolute right-4 top-4 rounded-full bg-[#121416]/70 px-3 py-1 text-[10px] text-[#abcfb2]">
              ✓ Verified Partner 2024
            </span>
            <div className="absolute bottom-4 left-4 flex items-end gap-3 sm:left-7">
              <div className="grid h-16 w-16 place-items-center rounded-xl border-4 border-[#8fb397]/40 bg-[#d5ddd2] text-3xl text-[#1a1c1e]">
                ✳
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-lg font-bold text-white">
                    AutoMax Wheels
                  </h1>
                  <span className="text-[10px] text-[#abcfb2]">
                    ✓ Wheely Bits Verified Seller
                  </span>
                </div>
                <p className="mt-1 text-xs text-[#c2c8c0]">
                  ★ 4.8 (124 reviews)
                </p>
                <p className="mt-1 text-xs text-[#c2c8c0]">
                  <MapPin className="mr-1 inline h-3 w-3" /> Sector G-8/1, Blue
                  Area, Islamabad, Pakistan
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 border-t border-white/[0.06] px-4 py-3 sm:px-7">
            <div className="flex gap-3 text-[10px] text-[#c2c8c0]">
              <span>Rims</span>
              <span>Tyres</span>
              <span>Auto Parts</span>
            </div>
            <span className="rounded bg-[#8fb397]/15 px-2 py-1 text-[10px] text-[#abcfb2]">
              Performance Fitment
            </span>
            <span className="rounded bg-[#8fb397]/15 px-2 py-1 text-[10px] text-[#abcfb2]">
              Fitment Guaranteed
            </span>
            <div className="ml-auto flex gap-2">
              <button className="rounded-lg bg-[#abcfb2] px-4 py-2 text-[10px] font-bold text-[#163722]">
                <MessageCircle className="mr-1 inline h-3 w-3" /> Contact Seller
              </button>
              <button className="hidden rounded-lg bg-[#063a32] px-4 py-2 text-[10px] text-[#55d6a7] sm:block">
                <Send className="mr-1 inline h-3 w-3" /> WhatsApp Us
              </button>
              <button className="rounded-lg bg-[#282a2c] p-2">
                <Share2 className="h-3 w-3" />
              </button>
              <button className="rounded-lg bg-[#282a2c] p-2">
                <Bookmark className="h-3 w-3" />
              </button>
            </div>
          </div>
          <nav className="flex gap-5 border-t border-white/[0.06] px-4 text-[10px] text-[#c2c8c0] sm:px-7">
            <button className="py-3">Overview</button>
            <Link
              to="/vendors/automax-wheels/catalog"
              className="rounded-t-lg bg-[#abcfb2] px-4 py-3 font-semibold text-[#163722]"
            >
              Products (124)
            </Link>
            <button className="py-3">About & Services</button>
            <button className="py-3">Reviews (124)</button>
          </nav>
        </section>
        <div className="mt-5 grid gap-5 lg:grid-cols-[230px_1fr]">
          <aside className="space-y-4">
            <InfoPanel />
            <PerformancePanel />
            <ContactPanel />
            <HoursPanel />
          </aside>
          <main>
            <section className="rounded-xl bg-[#1a1c1e] p-4 sm:p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-sm font-bold text-white">
                    Seller Products Catalog
                  </h2>
                  <p className="text-[10px] text-[#c2c8c0]">
                    Showing verified in-stock fitments available in Islamabad
                  </p>
                </div>
                <div className="flex gap-1 text-[8px]">
                  <span className="rounded-full bg-[#abcfb2] px-2 py-1.5 font-bold text-[#163722]">
                    All (124)
                  </span>
                  <span className="rounded-full bg-[#282a2c] px-2 py-1.5">
                    Forged Rims (68)
                  </span>
                  <span className="rounded-full bg-[#282a2c] px-2 py-1.5">
                    Tyres (42)
                  </span>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <label className="flex min-h-9 flex-1 items-center gap-2 rounded-lg border border-white/20 px-3 text-[#c2c8c0]">
                  <Search className="h-3 w-3" />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    className="w-full bg-transparent text-[10px] outline-none"
                    placeholder="Search within AutoMax Wheels inventory..."
                  />
                </label>
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                  className="rounded-lg border border-white/20 bg-transparent px-2 text-[10px] text-white outline-none"
                >
                  <option>Popularity</option>
                  <option>Price: Low to High</option>
                </select>
              </div>
            </section>
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
                    <div className="flex justify-between gap-2 text-[8px] uppercase text-[#8fb397]">
                      <span>{product.brand}</span>
                      <span>◈ {product.type.split("·")[0]}</span>
                    </div>
                    <h3 className="mt-2 text-sm font-bold text-white">
                      {product.name}
                    </h3>
                    <p className="mt-1 h-7 text-[8px] text-[#c2c8c0]">
                      {product.type}
                    </p>
                    <p className="mt-3 text-[8px] uppercase text-[#c2c8c0]">
                      {product.stock}
                    </p>
                    <strong className="mt-1 block text-lg text-white">
                      {product.price}
                    </strong>
                    <button className="mt-3 w-full rounded-lg bg-[#333537] py-2 text-[10px] font-semibold text-white hover:bg-[#abcfb2] hover:text-[#163722]">
                      View Details & Fit{" "}
                      <ArrowRight className="ml-1 inline h-3 w-3" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
            <div className="flex items-center justify-between py-6 text-[10px] text-[#c2c8c0]">
              <span>Showing 1–{visibleProducts.length} of 124 products</span>
              <button className="rounded-lg bg-[#1a1c1e] px-3 py-2 text-[#abcfb2]">
                Load More Products{" "}
                <ChevronDown className="ml-1 inline h-3 w-3" />
              </button>
            </div>
            <section className="border-t border-white/[0.08] pt-6">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-white">
                    Verified Buyer Reviews
                  </h2>
                  <p className="text-[10px] text-[#c2c8c0]">
                    Real fitment feedback from Pakistani car enthusiasts
                  </p>
                </div>
                <span className="text-[10px] text-[#abcfb2]">
                  Read all 124 reviews →
                </span>
              </div>
              <div className="grid gap-3 md:grid-cols-2">
                {reviews.map((review) => (
                  <article
                    key={review.name}
                    className="rounded-xl bg-[#1a1c1e] p-4"
                  >
                    <div className="flex items-center gap-2">
                      <span className="grid h-7 w-7 place-items-center rounded-full bg-[#315141] text-[9px]">
                        {review.initials}
                      </span>
                      <div>
                        <h3 className="text-[10px] font-bold text-white">
                          {review.name}
                        </h3>
                        <p className="text-[8px] text-[#c2c8c0]">
                          {review.car}
                        </p>
                      </div>
                      <span className="ml-auto">★★★★★</span>
                    </div>
                    <p className="mt-3 text-[9px] leading-4 text-[#c2c8c0]">
                      “{review.text}”
                    </p>
                    <p className="mt-3 text-[8px] text-[#abcfb2]">
                      ✓ Verified Wheely Bits delivery · 2 weeks ago
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}

function InfoPanel() {
  return (
    <section className="rounded-xl bg-[#1a1c1e] p-5">
      <h2 className="mb-3 text-xs font-bold text-white">About AutoMax</h2>
      <p className="text-[10px] leading-5 text-[#c2c8c0]">
        Pakistan's authorized premium distributor for forged monoblock wheels
        including Vossen, BBS, Enkei, and Volk Racing, paired with
        ultra-high-performance tyres from Michelin Pilot Sport and Yokohama
        Advan.
      </p>
      <p className="mt-3 text-[10px] leading-5 text-[#c2c8c0]">
        Over 12 years in bespoke fitment engineering with computerized laser
        hub-centric balancing, custom offsets, and certified master technicians.
      </p>
      <div className="mt-3 flex flex-wrap gap-1 text-[8px]">
        <span className="rounded bg-[#333537] px-2 py-1">
          Authorized Importer
        </span>
        <span className="rounded bg-[#333537] px-2 py-1">
          Precision Alignment Bay
        </span>
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
          ["Active Inventory", "124"],
          ["Avg Response", "< 15m"],
          ["Orders Fulfilled", "1,450+"],
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
function ContactPanel() {
  return (
    <section className="rounded-xl bg-[#1a1c1e] p-5">
      <h2 className="mb-4 text-xs font-bold text-white">Contact & Location</h2>
      <div className="space-y-3 text-[10px] text-[#c2c8c0]">
        <p>
          <Phone className="mr-2 inline h-3 w-3 text-[#abcfb2]" /> Phone Support
          <br />
          <span className="ml-5 text-white">+92 51 844 9210</span>
        </p>
        <p>
          <MessageCircle className="mr-2 inline h-3 w-3 text-[#abcfb2]" />{" "}
          WhatsApp Direct
          <br />
          <span className="ml-5 text-white">+92 300 555 4321</span>
        </p>
        <p>
          <Mail className="mr-2 inline h-3 w-3 text-[#abcfb2]" /> Official Email
          <br />
          <span className="ml-5 text-white">sales@automaxwheels.pk</span>
        </p>
        <p>
          <MapPin className="mr-2 inline h-3 w-3 text-[#abcfb2]" /> Flagship
          Facility
          <br />
          <span className="ml-5 text-white">
            Plot 14-B, Executive Sector, Blue Area
          </span>
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
function HoursPanel() {
  return (
    <section className="rounded-xl bg-[#1a1c1e] p-5 text-[10px]">
      <h2 className="mb-4 text-xs font-bold text-white">Store Hours & Bay</h2>
      <p className="flex justify-between border-b border-white/[0.06] py-2 text-[#c2c8c0]">
        <span>Mon - Sat</span>
        <strong className="text-white">10:00 AM - 9:00 PM</strong>
      </p>
      <p className="flex justify-between py-2 text-[#c2c8c0]">
        <span>Sunday</span>
        <strong className="text-white">12:00 PM - 6:00 PM</strong>
      </p>
      <p className="mt-4 leading-5 text-[#c2c8c0]">
        ♨ Touchless Tyre Dismount & Balancer
        <br />↯ 4-Post Low Clearance Hydraulic Ramps
      </p>
    </section>
  );
}
