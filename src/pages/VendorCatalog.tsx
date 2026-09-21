import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  MapPin,
  MessageCircle,
  Search,
  SlidersHorizontal,
} from "lucide-react";

type CatalogProduct = {
  name: string;
  brand: string;
  kind: string;
  spec: string;
  price: string;
  image: string;
  badge: string;
  badgeTone: string;
};

const products: CatalogProduct[] = [
  {
    name: "HF-5 Monoblock Satin Bronze",
    brand: "Vossen · Hybrid Forged",
    kind: "Forged Rim",
    spec: "19×9.5 · 5×114.3 · ET+35",
    price: "PKR 385,000",
    image:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=700&q=85",
    badge: "IN STOCK",
    badgeTone: "bg-[#abcfb2] text-[#163722]",
  },
  {
    name: "Pilot Sport 4S (PS4S) Acoustic",
    brand: "Michelin · Ultra Sport",
    kind: "Tyre",
    spec: "255/35ZR19 · 96Y XL · 300 AA A",
    price: "PKR 86,500",
    image:
      "https://images.unsplash.com/photo-1619767886558-efdc259cde1a?auto=format&fit=crop&w=700&q=85",
    badge: "FRESH 2024 DOT",
    badgeTone: "bg-[#abcfb2] text-[#163722]",
  },
  {
    name: "BBS LM Motorsport Stepped Lip",
    brand: "BBS · Germany",
    kind: "2-Piece Forged",
    spec: "19×8.5 · 5×112/120 · ET+32",
    price: "PKR 540,000",
    image:
      "https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=700&q=85",
    badge: "2 SETS LEFT",
    badgeTone: "bg-[#d4a373] text-[#26180e]",
  },
  {
    name: "TE37 Saga S-Plus Bronze",
    brand: "RAYS · Japan",
    kind: "Monoblock",
    spec: "18×9.5 · 5×114.3 · ET+22",
    price: "PKR 620,000",
    image:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=700&q=85",
    badge: "IN STOCK",
    badgeTone: "bg-[#abcfb2] text-[#163722]",
  },
  {
    name: "RPF1 Lightweight Track Spec",
    brand: "Enkei · Mat Flow Formed",
    kind: "Racing Rim",
    spec: "18×8.5 · 5×114.3 · ET+40",
    price: "PKR 310,000",
    image:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&w=700&q=85",
    badge: "IN STOCK",
    badgeTone: "bg-[#abcfb2] text-[#163722]",
  },
  {
    name: "Advan Neova AD09 Semi-Slick",
    brand: "Yokohama · Advan",
    kind: "Track Tyre",
    spec: "245/40R18 · 97W XL · TW 200",
    price: "PKR 74,000",
    image:
      "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?auto=format&fit=crop&w=700&q=85",
    badge: "FRESH 2024 DOT",
    badgeTone: "bg-[#abcfb2] text-[#163722]",
  },
  {
    name: "Work Emotion CR Kiwami Ultra Concave",
    brand: "Work Wheels · Japan",
    kind: "Flow Formed",
    spec: "19×9.5 · 5×114.3 · ET+26",
    price: "PKR 465,000",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=700&q=85",
    badge: "IN STOCK",
    badgeTone: "bg-[#abcfb2] text-[#163722]",
  },
  {
    name: "Monolith T6/06 Neo Chrome Lugs (20pc)",
    brand: "Project Kics · Japan",
    kind: "Hardware",
    spec: "M12 · SMC435 · Includes Key",
    price: "PKR 48,000",
    image:
      "https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=700&q=85",
    badge: "IN STOCK",
    badgeTone: "bg-[#abcfb2] text-[#163722]",
  },
  {
    name: "BluEarth-GT AE51 Grand Touring",
    brand: "Yokohama · Touring",
    kind: "Tyre",
    spec: "225/45 R17 · 91W XL · Quiet Compound",
    price: "PKR 58,000",
    image:
      "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&w=700&q=85",
    badge: "FRESH 2024 DOT",
    badgeTone: "bg-[#abcfb2] text-[#163722]",
  },
];

export default function VendorCatalog() {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("Featured & Recommended");
  const [category, setCategory] = useState("All Products (124)");
  const [guarantee, setGuarantee] = useState(true);
  const [brand, setBrand] = useState("All brands");

  const visibleProducts = useMemo(() => {
    let result = products.filter((product) =>
      `${product.name} ${product.brand} ${product.kind} ${product.spec}`
        .toLowerCase()
        .includes(query.toLowerCase()),
    );
    if (category.includes("Wheels"))
      result = result.filter(
        (product) =>
          product.kind.toLowerCase().includes("rim") ||
          product.kind.toLowerCase().includes("forged") ||
          product.kind.toLowerCase().includes("racing") ||
          product.kind.toLowerCase().includes("formed"),
      );
    if (category.includes("Tyres"))
      result = result.filter((product) =>
        product.kind.toLowerCase().includes("tyre"),
      );
    if (category.includes("Hardware"))
      result = result.filter((product) => product.kind === "Hardware");
    if (brand !== "All brands")
      result = result.filter((product) =>
        product.brand.toLowerCase().includes(brand.toLowerCase()),
      );
    if (sort === "Price: Low to High")
      result = [...result].sort(
        (a, b) =>
          Number(a.price.replace(/[^0-9]/g, "")) -
          Number(b.price.replace(/[^0-9]/g, "")),
      );
    return result;
  }, [brand, category, query, sort]);

  return (
    <div className="min-h-screen bg-[#121416] pb-20 text-[#e2e2e5]">
      <div className="mx-auto max-w-[1120px] px-4 pt-5 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-center justify-between text-[10px] text-[#c2c8c0]">
          <span>
            Vendors <span className="mx-2 text-white/30">›</span> Islamabad{" "}
            <span className="mx-2 text-white/30">›</span> AutoMax Wheels{" "}
            <span className="mx-2 text-white/30">›</span>{" "}
            <strong className="text-white">Catalog</strong>
          </span>
          <Link
            to="/vendors/automax-wheels"
            className="rounded-full bg-[#1a1c1e] px-3 py-2"
          >
            <ArrowLeft className="mr-1 inline h-3 w-3" /> Back to Shop Profile
          </Link>
        </div>
        <header className="rounded-xl border border-white/[0.06] bg-[#1a1c1e] p-5 sm:p-6">
          <div className="flex gap-3">
            <div className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-[#273a31] text-2xl text-[#abcfb2]">
              ♧
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#8fb397]/15 px-2 py-1 text-[9px] text-[#abcfb2]">
                  ✓ Wheely Bits Verified Partner
                </span>
                <span className="text-[10px] text-[#d4a373]">
                  ★ 4.8 (124 reviews)
                </span>
                <span className="text-[10px] text-[#c2c8c0]">
                  <MapPin className="mr-1 inline h-3 w-3" /> Sector I-9,
                  Islamabad
                </span>
              </div>
              <h1 className="mt-2 text-2xl font-bold tracking-tight text-white">
                AutoMax Wheels Catalog{" "}
                <span className="align-middle rounded-full bg-[#333537] px-2 py-1 text-[9px] font-normal text-[#c2c8c0]">
                  124 Products In Stock
                </span>
              </h1>
              <p className="mt-1 max-w-xl text-[11px] text-[#c2c8c0]">
                Browse genuine imported rims, ultra-high performance tyres, and
                fitment hardware with Wheely Bits guaranteed laser fitment.
              </p>
            </div>
            <div className="hidden text-right text-[9px] text-[#c2c8c0] sm:block">
              Instant Technical Support
              <br />
              <button className="mt-1 rounded bg-[#333537] px-3 py-1 text-[#abcfb2]">
                <MessageCircle className="mr-1 inline h-3 w-3" /> WhatsApp
                Fitment Desk
              </button>
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-2 rounded-lg bg-[#202325] p-2 sm:flex-row">
            <label className="flex min-h-9 flex-1 items-center gap-2 rounded border border-white/10 px-3 text-[#c2c8c0]">
              <Search className="h-3 w-3" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full bg-transparent text-[10px] outline-none"
                placeholder="Search this shop... (e.g. BBS LM, 19 inch, Michelin PS4S, 5×114.3)"
              />
              <span className="text-white">×</span>
            </label>
            <span className="self-center px-2 text-[9px] text-[#c2c8c0]">
              Showing 1-9 of 124 products
            </span>
            <label className="self-center whitespace-nowrap text-[9px]">
              Sort by:{" "}
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
                className="rounded bg-[#333537] px-2 py-1 text-white outline-none"
              >
                <option>Featured & Recommended</option>
                <option>Price: Low to High</option>
              </select>
            </label>
          </div>
        </header>
        <div className="my-5 flex flex-wrap gap-2 text-[10px]">
          {[
            "All Products (124)",
            "Rims & Wheels (68)",
            "Performance Tyres (42)",
            "Auto Parts & Hardware (14)",
          ].map((item) => (
            <button
              key={item}
              onClick={() => setCategory(item)}
              className={`rounded-full px-3 py-2 ${category === item ? "bg-[#abcfb2] font-semibold text-[#163722]" : "bg-[#282a2c] text-[#e2e2e5]"}`}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="grid gap-5 lg:grid-cols-[165px_1fr]">
          <aside className="rounded-xl bg-[#1a1c1e] p-4 text-[10px]">
            <h2 className="mb-5 text-xs font-bold text-white">
              <SlidersHorizontal className="mr-1 inline h-3 w-3 text-[#abcfb2]" />{" "}
              Filters{" "}
              <button className="float-right text-[9px] font-normal text-[#c2c8c0]">
                Reset All
              </button>
            </h2>
            <label className="flex items-center justify-between border-b border-white/[0.08] pb-4 text-[#c2c8c0]">
              <span>
                100% Fitment Guarantee
                <br />
                <small>Pre-verified bolt offset</small>
              </span>
              <input
                type="checkbox"
                checked={guarantee}
                onChange={(event) => setGuarantee(event.target.checked)}
                className="accent-[#abcfb2]"
              />
            </label>
            <div className="border-b border-white/[0.08] py-4">
              <p className="mb-2 font-bold text-white">Price Range (PKR)</p>
              <div className="flex justify-between text-[9px] text-[#c2c8c0]">
                <span>
                  MIN
                  <br />
                  <strong className="text-white">30,000</strong>
                </span>
                <span>
                  MAX
                  <br />
                  <strong className="text-white">800,000</strong>
                </span>
              </div>
              <input
                type="range"
                min="30000"
                max="800000"
                defaultValue="800000"
                className="mt-3 w-full accent-[#abcfb2]"
              />
            </div>
            <div className="border-b border-white/[0.08] py-4">
              <p className="mb-2 font-bold text-white">Brand</p>
              {[
                "All brands",
                "Vossen Wheels",
                "BBS Germany",
                "Rays Volk Racing",
                "Enkei Japan",
                "Michelin",
                "Yokohama",
              ].map((item) => (
                <label key={item} className="mb-2 block text-[#c2c8c0]">
                  <input
                    type="radio"
                    name="brand"
                    checked={brand === item}
                    onChange={() => setBrand(item)}
                    className="mr-2 accent-[#abcfb2]"
                  />
                  {item}
                </label>
              ))}
            </div>
            <div className="py-4">
              <p className="mb-2 font-bold text-white">Rim Diameter</p>
              <div className="grid grid-cols-3 gap-1 text-center text-[9px]">
                <button className="rounded bg-[#282a2c] py-2">18”</button>
                <button className="rounded bg-[#abcfb2] py-2 text-[#163722]">
                  19”
                </button>
                <button className="rounded bg-[#282a2c] py-2">20”</button>
              </div>
              <p className="mt-4 font-bold text-white">Condition</p>
              <label className="mt-2 block text-[#c2c8c0]">
                <input
                  type="checkbox"
                  defaultChecked
                  className="mr-2 accent-[#abcfb2]"
                />{" "}
                Factory Boxed (New)
              </label>
              <label className="mt-2 block text-[#c2c8c0]">
                <input type="checkbox" className="mr-2 accent-[#abcfb2]" /> Open
                Box / Display Set
              </label>
            </div>
          </aside>
          <main>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {visibleProducts.map((product) => (
                <article
                  key={product.name}
                  className="overflow-hidden rounded-xl bg-[#1a1c1e] shadow-lg transition hover:-translate-y-0.5 hover:ring-1 hover:ring-[#8fb397]/50"
                >
                  <div className="relative h-36 bg-[#293031]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover opacity-85"
                    />
                    <span
                      className={`absolute left-2 top-2 rounded-full px-2 py-1 text-[8px] font-bold ${product.badgeTone}`}
                    >
                      {product.badge}
                    </span>
                    <span className="absolute left-2 top-8 rounded-full bg-[#121416]/80 px-2 py-1 text-[8px] text-[#abcfb2]">
                      ✓ Fitment Match
                    </span>
                    <button className="absolute right-2 top-2 text-white">
                      <Heart className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="p-3">
                    <div className="flex justify-between gap-2 text-[8px] uppercase text-[#8fb397]">
                      <span>{product.brand}</span>
                      <span>{product.kind}</span>
                    </div>
                    <h2 className="mt-2 min-h-8 text-sm font-bold leading-4 text-white">
                      {product.name}
                    </h2>
                    <p className="mt-2 text-[8px] text-[#c2c8c0]">
                      SPEC: {product.spec}
                    </p>
                    <p className="mt-2 text-[8px] text-[#c2c8c0]">
                      ▣ AutoMax Wheels (Islamabad)
                    </p>
                    <strong className="mt-4 block text-lg text-white">
                      {product.price}{" "}
                      <small className="text-[8px] font-normal text-[#c2c8c0]">
                        /set (4 rims)
                      </small>
                    </strong>
                    {product.kind === "Tyre" ? (
                      <Link
                        to="/tyre/detail/michelin-ps4s"
                        className="mt-2 block w-full rounded-lg bg-[#abcfb2] py-2 text-center text-[9px] font-semibold text-[#163722]"
                      >
                        View Details{" "}
                        <ArrowRight className="ml-1 inline h-3 w-3" />
                      </Link>
                    ) : (
                      <button className="mt-2 w-full rounded-lg bg-[#abcfb2] py-2 text-[9px] font-semibold text-[#163722]">
                        View Details{" "}
                        <ArrowRight className="ml-1 inline h-3 w-3" />
                      </button>
                    )}
                  </div>
                </article>
              ))}
            </div>
            {visibleProducts.length === 0 && (
              <div className="rounded-xl border border-dashed border-white/10 py-14 text-center text-sm text-[#c2c8c0]">
                No products match these filters.
              </div>
            )}
            <div className="mt-5 flex items-center justify-between rounded-xl bg-[#1a1c1e] px-4 py-3 text-[9px] text-[#c2c8c0]">
              <span>‹ Previous</span>
              <div className="flex gap-2">
                <button className="rounded bg-[#abcfb2] px-3 py-2 text-[#163722]">
                  1
                </button>
                <button>2</button>
                <button>3</button>
                <span>...</span>
                <button>14</button>
              </div>
              <span>Next ›</span>
            </div>
            <section className="mt-5 flex flex-wrap items-center gap-4 rounded-xl bg-[#1a1c1e] p-5">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-[#315141] text-[#abcfb2]">
                ♧
              </div>
              <div className="flex-1">
                <h2 className="text-sm font-semibold text-white">
                  Need a custom offset or specific PCD fitment?
                </h2>
                <p className="text-[10px] text-[#c2c8c0]">
                  Contact AutoMax Wheels for custom master directly for brake
                  clearance calculations and custom hub rings.
                </p>
              </div>
              <button className="rounded-lg bg-[#abcfb2] px-4 py-2 text-[10px] font-bold text-[#163722]">
                <MessageCircle className="mr-1 inline h-3 w-3" /> WhatsApp
                Inquiry
              </button>
            </section>
          </main>
        </div>
      </div>
    </div>
  );
}
