import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  MessageCircle,
  Phone,
  RotateCw,
  Share2,
} from "lucide-react";

const wheelImage =
  "https://images.unsplash.com/photo-1600712242805-9f72877b0492?auto=format&fit=crop&w=1200&q=90";
const specs = [
  ["WHEEL DIAMETER", '18"', "Inches"],
  ["RIM WIDTH (J)", "8.0 J", "Ideal 225-245 tyres"],
  ["BOLT PATTERN (PCD)", "5x114.3", "Optional 5x112"],
  ["OFFSET (ET)", "+35 mm", "Flush aesthetic"],
  ["WHEEL WEIGHT", "8.1 kg", "Rotational mass reduction"],
  ["CENTER BORE", "75.0 mm", "Includes 64.1 rings"],
  ["ALLOY TECHNOLOGY", "Flow-Formed", "Cast + spun barrel"],
  ["COLORWAY", "Matte Graphite", "Anti-brake dust coating"],
  ["ORIGIN", "Italy", "San Marino"],
  ["STRUCTURAL WARRANTY", "2 Years", "Wheely Bits backed"],
];
const reviews = [
  "Honda Civic RS (2020) - ET35",
  "Toyota Corolla Altis (2022) - ET35",
  "Civic Type R Track Setup - ET35",
];

export default function RimDetailPage() {
  const [vehicle, setVehicle] = useState("Honda Civic");
  const [year, setYear] = useState("2016-2021");
  return (
    <div className="min-h-screen bg-[#121416] pb-16 text-[#e2e2e5]">
      <div className="mx-auto max-w-[1120px] px-4 pt-5 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between text-[10px] text-[#c2c8c0]">
          <span>
            Vendors <span className="mx-2 text-white/30">›</span> AutoMax Wheels{" "}
            <span className="mx-2 text-white/30">›</span> Rims & Wheels{" "}
            <span className="mx-2 text-white/30">›</span> OZ Racing Ultraleggera
          </span>
          <Link
            to="/vendors/automax-wheels/catalog"
            className="rounded-full bg-[#1a1c1e] px-3 py-2"
          >
            <ArrowLeft className="mr-1 inline h-3 w-3" /> Back to Shop Catalog
          </Link>
        </div>
        <section className="grid gap-5 lg:grid-cols-[1.18fr_0.82fr]">
          <div>
            <div className="relative overflow-hidden rounded-xl bg-[#1b2223] shadow-2xl">
              <img
                src={wheelImage}
                alt="OZ Racing Ultraleggera"
                className="h-[360px] w-full object-cover sm:h-[440px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121416]/70 via-transparent to-transparent" />
              <span className="absolute left-3 top-3 rounded-full bg-[#abcfb2] px-2 py-1 text-[8px] font-bold text-[#163722]">
                ✓ 100% Fitment Guaranteed
              </span>
              <span className="absolute right-3 top-3 rounded-full bg-[#abcfb2] px-3 py-1 text-[9px] text-[#163722]">
                ● In Stock (4 Sets)
              </span>
              <button className="absolute bottom-3 right-3 rounded bg-[#121416]/70 px-2 py-1 text-[8px] text-white">
                <RotateCw className="mr-1 inline h-3 w-3" /> DRAG TO ROTATE 3D
                VIEW
              </button>
              <p className="absolute bottom-3 left-3 text-[8px] text-white">
                ⚙ Lightweight Flow-Formed: 8.1 kg
              </p>
            </div>
            <div className="mt-2 flex gap-2 overflow-x-auto">
              <img
                src={wheelImage}
                alt="Wheel thumbnail"
                className="h-12 w-16 rounded border border-[#abcfb2] object-cover"
              />
              {[
                "45° Concave",
                "Center Cap",
                "Barrel & Val",
                "Mounted",
                "3D Viewer",
              ].map((item) => (
                <button
                  key={item}
                  className="h-12 min-w-16 rounded border border-white/10 bg-[#1a1c1e] px-2 text-[8px] text-[#c2c8c0]"
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 rounded-xl bg-[#1a1c1e] p-3 text-[8px] text-[#c2c8c0]">
              <span>
                ◉ Authentic OZ
                <br />
                <strong className="text-white">Serial Stamped</strong>
              </span>
              <span>
                ◉ Ultra Lightweight
                <br />
                <strong className="text-white">8.1 kg Track Tune</strong>
              </span>
              <span>
                ◉ Fit Guarantee
                <br />
                <strong className="text-white">100% Zero-Rub</strong>
              </span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[9px] uppercase tracking-wider text-[#abcfb2]">
                  ◉ OZ Racing · Italy
                </p>
                <h1 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  OZ Racing Ultraleggera
                </h1>
                <p className="text-[10px] text-[#c2c8c0]">
                  18&quot; Lightweight Monoblock Alloy Wheel (Matte Graphite
                  Silver)
                </p>
              </div>
              <div className="flex gap-2">
                <button className="rounded-lg bg-[#1a1c1e] p-2">
                  <Heart className="h-4 w-4" />
                </button>
                <button className="rounded-lg bg-[#1a1c1e] p-2">
                  <Share2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            <div className="text-[10px] text-[#d4a373]">
              ★★★★★ <span className="text-white">4.8</span>{" "}
              <span className="text-[#c2c8c0]">
                · 36 verified reviews · 62 Sets Fitted
              </span>
            </div>
            <div className="rounded-xl bg-[#1a1c1e] p-4">
              <div className="flex justify-between text-[9px] text-[#c2c8c0]">
                <span>
                  PER RIM PRICE
                  <strong className="mt-1 block text-2xl text-white">
                    Rs. 85,000<small className="text-[9px]"> /rim</small>
                  </strong>
                </span>
                <span className="text-right text-[#d4a373]">
                  COMPLETE SET (4 RIMS)
                  <strong className="mt-1 block text-lg">Rs. 340,000</strong>
                </span>
              </div>
              <p className="mt-3 text-[9px] text-[#c2c8c0]">
                ♧ Free insured pallet courier across Pakistan or Free Laser
                Fitment in Islamabad.
              </p>
              <p className="mt-2 text-[9px] text-[#abcfb2]">
                ▣ Available in Islamabad G-8 Bay{" "}
                <span className="float-right">Dispatches &lt;24h</span>
              </p>
            </div>
            <div className="rounded-xl bg-[#1a1c1e] p-3">
              <p className="mb-2 text-[9px] text-[#c2c8c0]">
                Select Order Package
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button className="rounded-lg border border-[#abcfb2] bg-[#abcfb2]/10 p-2 text-left text-[9px] text-white">
                  Single Rim (1x)
                  <br />
                  <span className="text-[#c2c8c0]">Rim Price: Rs. 85,000</span>
                </button>
                <button className="rounded-lg border border-white/10 bg-[#282a2c] p-2 text-left text-[9px] text-white">
                  Full Set (4x)
                  <br />
                  <span className="text-[#c2c8c0]">
                    Includes 4 Wheels · Rs. 340,000
                  </span>
                </button>
              </div>
              <button className="mt-3 w-full rounded-lg bg-[#abcfb2] py-3 text-[11px] font-bold text-[#163722]">
                ♧ Buy Now - Rs. 340,000
              </button>
              <Link
                to="/fitment-engine"
                className="mt-2 block w-full rounded-lg bg-[#333537] py-2 text-center text-[10px] text-white"
              >
                ⚙ Book with Laser Balancing & Fitment Bay
              </Link>
              <div className="mt-3 flex gap-2">
                <Link
                  to="/vendors/automax-wheels/contact"
                  className="flex-1 rounded-lg bg-[#333537] py-2 text-center text-[9px]"
                >
                  <MessageCircle className="mr-1 inline h-3 w-3 text-[#abcfb2]" />{" "}
                  Inquire with AutoMax
                </Link>
                <button className="flex-1 rounded-lg bg-[#333537] py-2 text-[9px]">
                  <Phone className="mr-1 inline h-3 w-3 text-[#d4a373]" />{" "}
                  Direct Fitment Desk
                </button>
              </div>
            </div>
            <p className="text-[9px] text-[#c2c8c0]">
              AM AutoMax Wheels · Verified Dealer{" "}
              <span className="float-right text-[#abcfb2]">
                ● Replies in ~12 mins
              </span>
            </p>
          </div>
        </section>
        <section className="mt-8 rounded-xl bg-[#1a1c1e] p-5 sm:p-6">
          <p className="text-[9px] uppercase tracking-wider text-[#abcfb2]">
            ⚙ FITMENT & CLEARANCE ENGINE
          </p>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h2 className="mt-1 text-xl font-bold text-white">
                Vehicle Fitment & Stance Verification
              </h2>
              <p className="text-[10px] text-[#c2c8c0]">
                Wheely Bits inputs hub bore, PCD, offset, pitch and caliper
                clearance against genuine manufacturer chassis data.
              </p>
            </div>
            <Link
              to="/studio"
              className="rounded-full bg-[#333537] px-3 py-2 text-[9px] text-[#abcfb2]"
            >
              ⚙ Test in Wheely Bits 3D Studio
            </Link>
          </div>
          <div className="mt-4 grid gap-2 rounded-lg bg-[#202325] p-3 sm:grid-cols-3">
            <label className="text-[8px] text-[#c2c8c0]">
              1. Select Make
              <select
                value={vehicle}
                onChange={(event) => setVehicle(event.target.value)}
                className="mt-1 block w-full rounded bg-[#282a2c] p-2 text-[10px] text-white outline-none"
              >
                <option>Honda Civic</option>
                <option>Toyota Corolla</option>
                <option>BMW M3</option>
              </select>
            </label>
            <label className="text-[8px] text-[#c2c8c0]">
              2. Select Model
              <select
                value={year}
                onChange={(event) => setYear(event.target.value)}
                className="mt-1 block w-full rounded bg-[#282a2c] p-2 text-[10px] text-white outline-none"
              >
                <option>2016-2021</option>
                <option>2022-2025</option>
              </select>
            </label>
            <label className="text-[8px] text-[#c2c8c0]">
              3. Year & Sub-trim
              <select className="mt-1 block w-full rounded bg-[#282a2c] p-2 text-[10px] text-white outline-none">
                <option>2019 2.0 Turbo (FC1)</option>
                <option>2020 1.5 Turbo</option>
              </select>
            </label>
          </div>
          <div className="mt-3 grid gap-3 text-[9px] text-[#c2c8c0] md:grid-cols-4">
            {[
              "Honda Civic (2016-2021)",
              "Toyota Corolla (2018-2023)",
              "Honda Civic Type R (FK8/FL5)",
              "Toyota Camry (2018+)",
            ].map((item) => (
              <p key={item}>
                <span className="text-white">{item}</span>
                <br />
                Direct OEM flush fitment.
                <br />
                Brembo BBK and brake clearance verified with safety gap.
              </p>
            ))}
          </div>
        </section>
        <section className="mt-8">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[9px] uppercase text-[#abcfb2]">
                ENGINEERING METRICS
              </p>
              <h2 className="text-xl font-bold text-white">
                Technical Specifications
              </h2>
            </div>
            <span className="text-[8px] text-[#c2c8c0]">
              Verified by TUV Rheinland & JWL VIA Lab testing
            </span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
            {specs.map(([label, value, note]) => (
              <div key={label} className="rounded-lg bg-[#1a1c1e] p-3">
                <p className="text-[7px] text-[#c2c8c0]">{label}</p>
                <strong className="mt-1 block text-base text-white">
                  {value}
                </strong>
                <small className="text-[8px] text-[#c2c8c0]">{note}</small>
              </div>
            ))}
          </div>
        </section>
        <section className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-xl bg-[#1a1c1e] p-5">
            <div className="flex items-center gap-3">
              <span className="rounded bg-[#315141] px-2 py-3 text-lg text-[#abcfb2]">
                AMW
              </span>
              <div>
                <h2 className="font-bold text-white">AutoMax Wheels</h2>
                <p className="text-[8px] text-[#c2c8c0]">
                  Sector G-8/1, Blue Area, Islamabad
                </p>
              </div>
              <span className="ml-auto text-[9px] text-[#c2c8c0]">
                ★ 4.8 (124 reviews)
              </span>
            </div>
            <div className="mt-5 grid grid-cols-3 gap-2 text-[8px] text-[#c2c8c0]">
              <span>
                ◈ 100% Genuine
                <br />
                <strong className="text-white">Authorized OZ Importer</strong>
              </span>
              <span>
                ◈ Laser Balancer
                <br />
                <strong className="text-white">Hunter Road Force Bay</strong>
              </span>
              <span>
                ◈ Fast Dispatch
                <br />
                <strong className="text-white">
                  Same-day pickup available
                </strong>
              </span>
            </div>
          </div>
          <div className="rounded-xl bg-[#1a1c1e] p-5">
            <h2 className="text-lg font-bold text-white">
              🛡 Wheely Bits Fitment Guarantee
            </h2>
            <p className="mt-2 text-[10px] leading-5 text-[#c2c8c0]">
              Every set purchased through our marketplace is protected. If the
              rim interferes with OEM brakes, suspension strut, or fender arch,
              we handle free returns and re-exchange.
            </p>
            <div className="mt-3 rounded bg-[#282a2c] p-3 text-[9px] leading-5 text-[#c2c8c0]">
              ✓ 2-Year Manufacturer Structural Integrity Guarantee
              <br />✓ Free Hub-Centric Rings and Extended Lug Bolts included
              <br />✓ Transit damage fully insured door-to-door
            </div>
          </div>
        </section>
        <section className="mt-8">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[9px] uppercase text-[#abcfb2]">
                CUSTOMER SHOWCASE
              </p>
              <h2 className="text-xl font-bold text-white">
                Installed Fitment Reviews
              </h2>
            </div>
            <button className="rounded bg-[#1a1c1e] px-3 py-2 text-[9px]">
              Submit Your Vehicle Photos
            </button>
          </div>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {reviews.map((title, index) => (
              <article
                key={title}
                className="overflow-hidden rounded-xl bg-[#1a1c1e]"
              >
                <img
                  src={[wheelImage, wheelImage, wheelImage][index]}
                  alt={title}
                  className="h-28 w-full object-cover"
                />
                <div className="p-3">
                  <h3 className="text-[9px] text-white">{title}</h3>
                  <p className="mt-2 text-[10px] text-[#d4a373]">★★★★★</p>
                  <p className="mt-2 text-[9px] leading-4 text-[#c2c8c0]">
                    “Direct flush stance without any fender rolling. Steering
                    response feels instantaneous.”
                  </p>
                  <p className="mt-2 text-[8px] text-[#abcfb2]">
                    ✓ Verified Buyer
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <div className="sticky bottom-3 mt-8 flex flex-wrap items-center gap-3 rounded-xl bg-[#222627] p-3 shadow-2xl">
          <img
            src={wheelImage}
            alt="OZ Racing"
            className="h-9 w-10 rounded object-cover"
          />
          <div className="flex-1 text-[9px] text-[#c2c8c0]">
            OZ Racing Ultraleggera 18&quot; (Set of 4)
            <br />
            <span>4 Sets available in Islamabad · Laser Fitment Included</span>
          </div>
          <strong className="text-lg text-[#abcfb2]">Rs. 340,000</strong>
          <button className="rounded-lg bg-[#abcfb2] px-4 py-2 text-[10px] font-bold text-[#163722]">
            Order with Fitment Guarantee{" "}
            <ArrowRight className="ml-1 inline h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
