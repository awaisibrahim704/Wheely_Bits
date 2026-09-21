import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Filter,
  MapPin,
  Search,
  Settings2,
  SlidersHorizontal,
  Store,
} from "lucide-react";

type Vendor = {
  id: string;
  name: string;
  location: string;
  area: string;
  rating: number;
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
    distance: "3.2 km",
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
    distance: "4.7 km",
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
    distance: "6.8 km",
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
    distance: "5.1 km",
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
    distance: "8.4 km",
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
    distance: "11.2 km",
    products: 175,
    services: ["Tyres", "Rims"],
    badge: "Verified Seller",
    initials: "RT",
    description:
      "Extensive warehouse inventory of high-performance radial tyres, lightweight flow...",
    accent: "#b9966b",
  },
];

const categories = [
  "All Categories (8)",
  "Rims & Forged Wheels",
  "Tyres & Fitment",
  "Auto Parts & Tuning",
  "Wrap & Tint Studios",
];

export default function VendorDirectory() {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("Islamabad");
  const [category, setCategory] = useState(categories[0]);
  const [sort, setSort] = useState("Highest Rated");
  const [selectedLocations, setSelectedLocations] = useState([
    "Islamabad",
    "Rawalpindi",
  ]);

  const filteredVendors = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const result = vendors.filter((vendor) => {
      const matchesQuery =
        !normalizedQuery ||
        `${vendor.name} ${vendor.location} ${vendor.services.join(" ")}`
          .toLowerCase()
          .includes(normalizedQuery);
      const matchesLocation = selectedLocations.includes(vendor.area);
      const matchesCategory =
        category === categories[0] ||
        vendor.services.some((service) =>
          category.toLowerCase().includes(service.toLowerCase().split(" ")[0]),
        );
      return matchesQuery && matchesLocation && matchesCategory;
    });
    return [...result].sort((first, second) =>
      sort === "Closest"
        ? parseFloat(first.distance) - parseFloat(second.distance)
        : second.rating - first.rating,
    );
  }, [category, query, selectedLocations, sort]);

  const toggleLocation = (area: string) =>
    setSelectedLocations((current) =>
      current.includes(area)
        ? current.filter((item) => item !== area)
        : [...current, area],
    );

  return (
    <div className="min-h-screen bg-[#121416] px-4 pb-16 text-[#e2e2e5] sm:px-6 lg:px-8">
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
        <div className="mt-7 rounded-xl border border-white/[0.12] bg-[#1e2022]/80 p-2 shadow-[0_18px_40px_rgba(0,0,0,0.22)]">
          <div className="flex flex-col gap-2 md:flex-row">
            <label className="flex min-h-11 flex-1 items-center gap-2 rounded-lg border border-white/[0.1] bg-[#282a2c] px-3 text-[#c2c8c0] focus-within:border-[#8fb397]">
              <Search className="h-4 w-4" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                className="w-full bg-transparent text-xs text-white outline-none placeholder:text-[#c2c8c0]/50"
                placeholder="Search shops, sellers, or locations..."
              />
            </label>
            <label className="flex min-h-11 items-center gap-2 rounded-lg border border-white/[0.1] bg-[#282a2c] px-3 text-xs text-white md:w-36">
              <MapPin className="h-4 w-4 text-[#abcfb2]" />
              <select
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                className="w-full bg-transparent outline-none"
              >
                <option>Islamabad</option>
                <option>Rawalpindi</option>
                <option>Lahore</option>
                <option>Karachi</option>
              </select>
              <ChevronDown className="h-3 w-3" />
            </label>
            <button
              onClick={() => setQuery("")}
              className="flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#abcfb2] px-5 text-xs font-bold text-[#163722] transition hover:bg-[#c1e1c7]"
            >
              <SlidersHorizontal className="h-4 w-4" /> Apply
            </button>
          </div>
          <div className="mt-2 flex flex-wrap items-center gap-2 border-t border-white/[0.08] px-1 pt-2 text-[10px]">
            <span className="mr-1 text-[#c2c8c0]">
              <Settings2 className="mr-1 inline h-3 w-3" />
              Category:
            </span>
            {categories.map((item) => (
              <button
                key={item}
                onClick={() => setCategory(item)}
                className={`rounded-full px-3 py-1.5 transition ${category === item ? "bg-[#abcfb2] font-semibold text-[#163722]" : "bg-[#333537] text-[#e2e2e5] hover:bg-[#424842]"}`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="mx-auto mt-6 grid max-w-[1120px] gap-6 lg:grid-cols-[168px_1fr]">
        <aside className="hidden rounded-xl border border-white/[0.1] bg-[#1a1c1e] p-4 lg:block">
          <div className="mb-5 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wide">
              <Filter className="mr-1 inline h-3 w-3 text-[#abcfb2]" /> Filters
            </span>
            <button
              onClick={() => setSelectedLocations(["Islamabad", "Rawalpindi"])}
              className="text-[9px] text-[#c2c8c0]"
            >
              Reset All
            </button>
          </div>
          <p className="mb-2 flex justify-between text-[9px] font-bold">
            <span>Location</span>
            <span className="font-normal text-[#c2c8c0]">Metro Area</span>
          </p>
          {["Islamabad", "Rawalpindi", "Lahore", "Karachi"].map(
            (area, index) => (
              <label
                key={area}
                className="mb-2 flex items-center justify-between text-[10px] text-[#c2c8c0]"
              >
                <span>
                  <input
                    type="checkbox"
                    checked={selectedLocations.includes(area)}
                    onChange={() => toggleLocation(area)}
                    className="mr-2 accent-[#abcfb2]"
                  />
                  {area}
                </span>
                <span className="text-[9px]">{[5, 3, 2, 4][index]} shops</span>
              </label>
            ),
          )}
          <div className="my-5 border-t border-white/[0.08]" />
          <p className="mb-3 flex justify-between text-[9px] font-bold">
            <span>Shop Type</span>
            <span className="text-[#abcfb2]">SPECIALTY</span>
          </p>
          {["Rims", "Tyres", "Auto Parts"].map((type) => (
            <label key={type} className="mb-2 block text-[10px] text-[#c2c8c0]">
              <input
                type="checkbox"
                defaultChecked
                className="mr-2 accent-[#abcfb2]"
              />
              {type}
            </label>
          ))}
          <div className="my-5 border-t border-white/[0.08]" />
          <p className="mb-2 flex justify-between text-[9px] font-bold">
            <span>Minimum Rating</span>
            <span className="text-[#d4a373]">4.0+ Stars</span>
          </p>
          <div className="grid grid-cols-3 gap-1 text-[9px]">
            <button className="rounded bg-[#333537] py-1">Any</button>
            <button className="rounded bg-[#333537] py-1">4.0+</button>
            <button className="rounded bg-[#d4a373]/20 py-1 text-[#d4a373]">
              4.5+
            </button>
          </div>
        </aside>
        <div>
          <div className="mb-4 flex items-center justify-between rounded-lg border border-white/[0.08] bg-[#1a1c1e] px-3 py-2 text-[10px] text-[#c2c8c0]">
            <span>
              <span className="mr-1 inline-block h-1.5 w-1.5 rounded-full bg-[#abcfb2]" />{" "}
              Showing{" "}
              <strong className="text-white">
                {filteredVendors.length} verified shops
              </strong>{" "}
              near {location.toLowerCase()}
            </span>
            <label>
              Sort by:{" "}
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
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
                    ♥ {vendor.distance}
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
                        <span className="shrink-0 rounded bg-[#d4a373]/15 px-1.5 py-1 text-[9px] text-[#d4a373]">
                          ★ {vendor.rating}
                        </span>
                      </div>
                      <p className="mt-1 truncate text-[9px] text-[#c2c8c0]">
                        <MapPin className="mr-1 inline h-3 w-3" />
                        {vendor.location}
                      </p>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-1 text-[8px] text-[#c2c8c0]">
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
                    <Link
                      to={`/vendors/${vendor.id}`}
                      className="rounded-lg border border-[#8fb397]/30 px-3 py-2 text-[9px] font-semibold text-[#abcfb2] transition hover:bg-[#abcfb2] hover:text-[#163722]"
                    >
                      View Shop <ArrowRight className="ml-1 inline h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {filteredVendors.length === 0 && (
            <div className="rounded-xl border border-dashed border-white/10 py-16 text-center text-sm text-[#c2c8c0]">
              No shops match these filters.
            </div>
          )}
          <div className="mt-6 flex items-center justify-between border-t border-white/[0.08] pt-5 text-[9px] text-[#c2c8c0]">
            <span>
              Displaying 6 of 24 licensed Wheely Bits merchant partners
            </span>
            <div className="flex gap-1">
              <button className="rounded bg-[#1a1c1e] px-3 py-2">
                Previous
              </button>
              <button className="rounded bg-[#abcfb2] px-3 py-2 font-bold text-[#163722]">
                1
              </button>
              <button className="rounded bg-[#1a1c1e] px-3 py-2">2</button>
              <button className="rounded bg-[#1a1c1e] px-3 py-2">3</button>
              <button className="rounded bg-[#333537] px-3 py-2">Next</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
