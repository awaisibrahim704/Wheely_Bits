import FallbackImage from "../components/FallbackImage";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  MessageCircle,
  Phone,
  Share2,
} from "lucide-react";
import { getMarketplace, type MarketplaceData } from "../lib/sellerApi";

const specs = [
  ["TYRE WIDTH", "225 mm", "Section footprint width"],
  ["ASPECT RATIO", "45 %", "Sidewall height to width"],
  ["RIM DIAMETER", "18 inches", "Standard wheel inner seat"],
  ["LOAD INDEX", "95 (690 kg)", "Extra load rating"],
  ["SPEED RATING", "Y (300 km/h)", "Maximum speed index"],
  ["TYRE TYPE", "HP Street & Track", "Summer high-silica compound"],
  ["TUBELESS", "Yes (TL Radial)", "Puncture-resistant liner"],
  ["RUN FLAT", "No (Reinforced XL)", "Soft compliant sidewall"],
  ["MANUFACTURE YEAR", "2024 (DOT 1824)", "Fresh imported stock"],
  ["WET GRIP RATING", "EU Grade A", "Shortest wet braking"],
  ["ROLLING RESISTANCE", "EU Grade C", "Optimized fuel economy"],
  ["EXTERNAL NOISE", "69 dB", "Quiet tuned profile"],
];

export default function TyreDetailPage() {
  const { id } = useParams<{ id?: string }>();
  const [marketplace, setMarketplace] = useState<MarketplaceData | null>(null);
  const [make, setMake] = useState("Toyota");
  const [model, setModel] = useState("Corolla");
  const [quantity, setQuantity] = useState("Full Set (4 Tyres)");
  const [isFavorite, setIsFavorite] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  useEffect(() => {
    getMarketplace()
      .then(setMarketplace)
      .catch(() => setMarketplace(null));
  }, []);

  const normalizedId = id?.toLowerCase().replace(/[^a-z0-9]/g, "");
  const matchedProduct = marketplace?.products.find((product) => {
    if (product._id === id) return true;
    const normalizedName = product.productName
      ?.toLowerCase()
      .replace(/[^a-z0-9]/g, "");
    return Boolean(normalizedId && normalizedName === normalizedId);
  });

  const productName = matchedProduct?.productName || "Michelin Pilot Sport 4";
  const brand = matchedProduct?.brand || "Michelin";
  const priceNum = Number(matchedProduct?.price || 52000);
  const stockNum = Number(matchedProduct?.stock || 8);
  const description =
    matchedProduct?.description ||
    "225 / 45 R18 95Y XL Extra Load Ultra High Performance Summer Tyre";
  const galleryImages = Array.isArray(matchedProduct?.gallery)
    ? [...new Set(matchedProduct.gallery.filter(Boolean))]
    : [];
  const allImages =
    galleryImages.length > 0
      ? galleryImages
      : matchedProduct?.aiImage
        ? [matchedProduct.aiImage]
        : [];
  const imageSrc = allImages.includes(selectedImage)
    ? selectedImage
    : allImages[0] || undefined;

  const sellerName =
    marketplace?.seller?.store?.businessName ||
    marketplace?.seller?.businessName ||
    "AutoMax Wheels";
  const sellerAddress =
    marketplace?.seller?.store?.address ||
    marketplace?.seller?.store?.city ||
    "Sector G-8/1, Islamabad";

  const singlePriceStr = `Rs. ${priceNum.toLocaleString()}`;
  const setPriceStr = `Rs. ${(priceNum * 4).toLocaleString()}`;
  const total = quantity === "Single Tyre" ? singlePriceStr : setPriceStr;

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#121416] pb-16 text-[#e2e2e5]">
      <div className="mx-auto max-w-[1120px] px-4 pt-5 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-center justify-between text-[10px] text-[#c2c8c0]">
          <span>
            Vendors › {sellerName} › Tyres ›{" "}
            <strong className="text-white">{productName}</strong>
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
              <FallbackImage
                src={imageSrc}
                alt={productName}
                className="h-[330px] w-full object-cover sm:h-[410px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121416]/70 via-transparent to-transparent" />
              <span className="absolute left-3 top-3 rounded-full bg-[#abcfb2] px-2 py-1 text-[8px] font-bold text-[#163722]">
                ✓ 100% FITMENT GUARANTEED
              </span>
              <span className="absolute left-3 top-9 rounded-full bg-[#d4a373] px-2 py-1 text-[8px] text-[#26180e]">
                Fresh 2024 DOT (Week 18)
              </span>
              <span className="absolute right-3 top-3 rounded-full bg-[#abcfb2] px-3 py-1 text-[9px] text-[#163722]">
                ● In Stock ({stockNum} Tyres)
              </span>
              {allImages.length > 1 && (
                <div
                  className="absolute bottom-3 left-3 z-10 flex max-w-[calc(100%-1.5rem)] gap-2 overflow-x-auto rounded-lg bg-[#121416]/75 p-1.5"
                  aria-label="Product photos"
                >
                  {allImages.map((image, index) => (
                    <button
                      key={`${image}-${index}`}
                      type="button"
                      onClick={() => setSelectedImage(image)}
                      aria-label={`Show product photo ${index + 1}`}
                      aria-pressed={imageSrc === image}
                      className={`h-14 w-16 shrink-0 overflow-hidden rounded-md border-2 ${imageSrc === image ? "border-[#abcfb2]" : "border-white/10"}`}
                    >
                      <FallbackImage
                        src={image}
                        alt={`${productName} photo ${index + 1}`}
                        className="h-full w-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 rounded-xl bg-[#1a1c1e] p-3 text-[8px] text-[#c2c8c0]">
              <span>
                ◉ Genuine {brand}
                <br />
                <strong className="text-white">Authorized Stock</strong>
              </span>
              <span>
                ◉ Ultra-Grade Wet Grip
                <br />
                <strong className="text-white">Track Tuned</strong>
              </span>
              <span>
                ◉ Road Hazard Protect
                <br />
                <strong className="text-white">Replacement Cover</strong>
              </span>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[9px] uppercase tracking-wider text-[#abcfb2]">
                  ◉ {brand}
                </p>
                <h1 className="mt-2 text-2xl font-bold text-white sm:text-3xl">
                  {productName}
                </h1>
                <p className="text-[10px] text-[#c2c8c0]">{description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  title={
                    isFavorite ? "Remove from Favorites" : "Save to Favorites"
                  }
                  className={`rounded-lg p-2 ${isFavorite ? "bg-[#abcfb2] text-[#163722]" : "bg-[#1a1c1e] text-white"}`}
                >
                  <Heart
                    className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`}
                  />
                </button>
                <button
                  onClick={handleShare}
                  title="Share link"
                  className="relative rounded-lg bg-[#1a1c1e] p-2 text-white"
                >
                  <Share2 className="h-4 w-4" />
                  {copied && (
                    <span className="absolute -bottom-7 right-0 rounded bg-[#abcfb2] px-2 py-0.5 text-[8px] font-bold text-[#163722]">
                      Copied!
                    </span>
                  )}
                </button>
              </div>
            </div>
            <div className="text-[10px] text-[#d4a373]">
              ★★★★★{" "}
              <span className="text-white">
                {marketplace?.averageRating
                  ? marketplace.averageRating.toFixed(1)
                  : "4.8"}
              </span>{" "}
              <span className="text-[#c2c8c0]">
                · {marketplace?.totalRatings || 4} verified seller reviews ·{" "}
                {stockNum} Available
              </span>
            </div>
            <div className="rounded-xl bg-[#1a1c1e] p-4">
              <div className="flex justify-between text-[9px] text-[#c2c8c0]">
                <span>
                  PER TYRE PRICE
                  <strong className="mt-1 block text-2xl text-white">
                    {singlePriceStr}
                  </strong>
                  <small>Single replacement</small>
                </span>
                <span className="text-right text-[#d4a373]">
                  FULL SET (4 TYRES)
                  <strong className="mt-1 block text-lg">{setPriceStr}</strong>
                  <small>Free balancing & stems</small>
                </span>
              </div>
              <p className="mt-3 text-[9px] text-[#c2c8c0]">
                Free insured courier across Pakistan or free laser fitment in
                Islamabad.
              </p>
              <p className="mt-2 text-[9px] text-[#abcfb2]">
                ▣ Dispatches within 24h from {sellerAddress}
              </p>
            </div>
            <div className="rounded-xl bg-[#1a1c1e] p-3">
              <p className="mb-2 text-[9px] text-[#c2c8c0]">
                Select Fitment Quantity
              </p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setQuantity("Single Tyre")}
                  className={`rounded-lg border p-2 text-left text-[9px] ${quantity === "Single Tyre" ? "border-[#abcfb2] bg-[#abcfb2]/10 text-white" : "border-white/10 bg-[#282a2c] text-white"}`}
                >
                  Single Tyre
                  <br />
                  <span className="text-[#c2c8c0]">{singlePriceStr}</span>
                </button>
                <button
                  onClick={() => setQuantity("Full Set (4 Tyres)")}
                  className={`rounded-lg border p-2 text-left text-[9px] ${quantity !== "Single Tyre" ? "border-[#abcfb2] bg-[#abcfb2]/10 text-white" : "border-white/10 bg-[#282a2c] text-white"}`}
                >
                  Full Set (4 Tyres)
                  <br />
                  <span className="text-[#c2c8c0]">{setPriceStr}</span>
                </button>
              </div>
              <Link
                to="/booking/schedule"
                className="mt-3 block w-full rounded-lg bg-[#abcfb2] py-3 text-center text-[11px] font-bold text-[#163722] hover:bg-[#9eb8a1]"
              >
                Buy Now - {total}
              </Link>
              <Link
                to="/booking/schedule"
                className="mt-2 block w-full rounded-lg bg-[#333537] py-2 text-center text-[10px] text-white hover:bg-[#434547]"
              >
                Book with Touchless Mounting & Laser Bay
              </Link>
              <div className="mt-3 flex gap-2">
                <Link
                  to="/vendors/automax-wheels/contact"
                  className="flex-1 rounded-lg bg-[#333537] py-2 text-center text-[9px] text-white hover:bg-[#abcfb2] hover:text-[#163722]"
                >
                  <MessageCircle className="mr-1 inline h-3 w-3 text-[#abcfb2]" />{" "}
                  Inquire with AutoMax
                </Link>
                <a
                  href="tel:+923001234567"
                  className="flex-1 rounded-lg bg-[#333537] py-2 text-center text-[9px] text-white hover:bg-[#abcfb2] hover:text-[#163722]"
                >
                  <Phone className="mr-1 inline h-3 w-3 text-[#d4a373]" />{" "}
                  Direct Tyre Desk
                </a>
              </div>
            </div>
            {/* Seller Trust & Rating Card */}
            <div className="mt-3 flex items-center justify-between rounded-xl border border-white/5 bg-[#141618] p-3 text-xs">
              <div className="flex items-center gap-2.5">
                <div className="grid h-9 w-9 place-items-center rounded-lg bg-[#313b36] text-xs font-bold text-[#abcfb2]">
                  AM
                </div>
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-white">
                    <span>{sellerName}</span>
                    <span className="rounded bg-[#063a32] px-1.5 py-0.5 text-[8px] text-[#55d6a7]">
                      ✓ Verified Seller
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[10px] text-[#d4a373] mt-0.5">
                    <span>
                      ★{" "}
                      {marketplace?.averageRating
                        ? marketplace.averageRating.toFixed(1)
                        : "4.8"}
                    </span>
                    <span className="text-[#c2c8c0]">
                      ({marketplace?.totalRatings || 4} seller reviews)
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <Link
                  to="/vendors/automax-wheels#reviews-section"
                  className="rounded-lg bg-[#282a2c] px-3 py-1.5 text-[10px] font-semibold text-[#abcfb2] hover:bg-[#abcfb2] hover:text-[#163722] transition"
                >
                  View Reviews
                </Link>
                <Link
                  to="/vendors/automax-wheels#reviews-section"
                  className="rounded-lg bg-[#abcfb2] px-3 py-1.5 text-[10px] font-bold text-[#163722] hover:bg-[#8fb397] transition"
                >
                  Rate Seller
                </Link>
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
            ⚙ CHASSIS & DRIVETRAIN ACCURACY
          </p>
          <h2 className="mt-1 text-xl font-bold text-white">
            Vehicle Fitment & Rolling Radius Verification
          </h2>
          <p className="text-[10px] text-[#c2c8c0]">
            Wheely Bits verifies load rating, aspect, speedometer calibration
            and clearance against chassis specifications.
          </p>
          <div className="mt-4 grid gap-2 rounded-lg bg-[#202325] p-3 sm:grid-cols-3">
            <label className="text-[8px] text-[#c2c8c0]">
              Make
              <select
                value={make}
                onChange={(event) => setMake(event.target.value)}
                className="mt-1 block w-full rounded bg-[#282a2c] p-2 text-[10px] text-white outline-none"
              >
                <option>Toyota</option>
                <option>Honda</option>
                <option>BMW</option>
              </select>
            </label>
            <label className="text-[8px] text-[#c2c8c0]">
              Model
              <select
                value={model}
                onChange={(event) => setModel(event.target.value)}
                className="mt-1 block w-full rounded bg-[#282a2c] p-2 text-[10px] text-white outline-none"
              >
                <option>Corolla</option>
                <option>Civic</option>
                <option>Camry</option>
              </select>
            </label>
            <label className="text-[8px] text-[#c2c8c0]">
              Year & Sub-Trim
              <select className="mt-1 block w-full rounded bg-[#282a2c] p-2 text-[10px] text-white outline-none">
                <option>2018-2023 1.8 Grande</option>
                <option>2020-2024 Sport</option>
              </select>
            </label>
          </div>
          <p className="mt-3 rounded bg-[#315141] p-2 text-[9px] text-[#abcfb2]">
            ✓ GUARANTEED FIT · 0.0% Speed Error · Tested on 18x8.0 ET+40 with
            zero fender scrub.
          </p>
        </section>
        <section className="mt-8">
          <p className="text-[9px] uppercase text-[#abcfb2]">
            ENGINEERED PERFORMANCE
          </p>
          <h2 className="text-xl font-bold text-white">
            Tyre Technical Specifications Grid
          </h2>
          <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4">
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
            <h2 className="font-bold text-white">AutoMax Wheels</h2>
            <p className="text-[8px] text-[#c2c8c0]">
              Sector G-8/1, Blue Area, Islamabad · ★ 4.8 (124 reviews)
            </p>
            <p className="mt-4 text-[10px] text-[#c2c8c0]">
              Official Michelin distributor offering genuine Pilot Sport rubber
              with touchless mounting, balancing and fresh DOT stock.
            </p>
          </div>
          <div className="rounded-xl bg-[#1a1c1e] p-5">
            <h2 className="text-lg font-bold text-white">
              100% Fitment & Fresh DOT Guarantee
            </h2>
            <p className="mt-2 text-[10px] leading-5 text-[#c2c8c0]">
              Every tyre purchased through Wheely Bits includes replacement if a
              defect or speedometer deviation occurs within 1,000 km.
            </p>
            <p className="mt-3 text-[9px] text-[#abcfb2]">
              Read Full Tyre Guarantee Terms →
            </p>
          </div>
        </section>
        <section className="mt-8">
          <p className="text-[9px] uppercase text-[#abcfb2]">
            REAL DRIVERS · REAL FEEDBACK
          </p>
          <h2 className="text-xl font-bold text-white">
            Customer Fitment Showcase & Reviews
          </h2>
          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {[
              "Toyota Corolla Altis Grande (2021)",
              "Honda Civic RS Turbo (2020)",
              "Toyota Camry Hybrid (2020)",
            ].map((title) => (
              <article
                key={title}
                className="overflow-hidden rounded-xl bg-[#1a1c1e]"
              >
                <FallbackImage
                  src={imageSrc}
                  alt={title}
                  className="h-28 w-full object-cover"
                />
                <div className="p-3">
                  <h3 className="text-[9px] text-white">{title}</h3>
                  <p className="mt-2 text-[10px] text-[#d4a373]">★★★★★</p>
                  <p className="mt-2 text-[9px] text-[#c2c8c0]">
                    “Turn-in response is sharp and predictable. Fresh tyres
                    transformed the car in wet and dry conditions.”
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
          <FallbackImage
            src={imageSrc}
            alt={productName}
            className="h-9 w-10 rounded object-cover"
          />
          <div className="flex-1 text-[9px] text-[#c2c8c0]">
            {productName}
            <br />
            <span>
              {stockNum} Tyres available in {sellerAddress} · Fresh DOT Included
            </span>
          </div>
          <strong className="text-lg text-[#abcfb2]">{total}</strong>
          <Link
            to="/booking/schedule"
            className="rounded-lg bg-[#abcfb2] px-4 py-2 text-[10px] font-bold text-[#163722] hover:bg-[#9eb8a1]"
          >
            Order with Fitment Guarantee{" "}
            <ArrowRight className="ml-1 inline h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  );
}
