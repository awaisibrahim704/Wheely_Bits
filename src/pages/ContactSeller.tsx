import FallbackImage from "../components/FallbackImage";
import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
} from "lucide-react";
import {
  createInquiry,
  getMarketplace,
  type MarketplaceData,
} from "../lib/sellerApi";
import { useAuth } from "../contexts/AuthContext";

const prompts = [
  "Available in stock?",
  "Compatible with my car?",
  "Request finish pictures",
  "Islamabad installation?",
  "Price for set of 4?",
];

export default function ContactSeller() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [marketplace, setMarketplace] = useState<MarketplaceData | null>(null);
  const [senderName, setSenderName] = useState(user?.displayName || "");
  const [senderPhone, setSenderPhone] = useState("");
  const [car, setCar] = useState("Honda Civic RS Turbo (FC)");
  const [message, setMessage] = useState(
    'Hello AutoMax Wheels team, I am interested in this set of OZ Racing Ultraleggera 18" rims for my Civic RS. Could you confirm if hub rings are included?',
  );
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  useEffect(() => {
    getMarketplace()
      .then(setMarketplace)
      .catch(() => setMarketplace(null));
  }, []);
  const seller = marketplace?.seller;
  const sellerName =
    seller?.store?.businessName || seller?.businessName || "Seller";
  const sellerPhone =
    seller?.store?.businessPhone ||
    seller?.businessPhone ||
    "Contact number unavailable";
  const sellerWhatsapp =
    seller?.store?.whatsapp || seller?.whatsapp || "WhatsApp unavailable";
  const sellerEmail =
    seller?.store?.businessEmail || seller?.email || "Email unavailable";
  const sellerLocation =
    seller?.store?.address || seller?.store?.city || "Location unavailable";
  const selectedProduct = marketplace?.products[0];
  const submit = async (event: FormEvent) => {
    event.preventDefault();
    if (!marketplace?.sellerId || !senderName.trim() || !senderPhone.trim()) {
      setSubmitError("Enter your name and phone number before sending.");
      return;
    }
    setSubmitting(true);
    setSubmitError("");
    try {
      const conversationToken = Array.from(
        window.crypto.getRandomValues(new Uint8Array(32)),
        (byte) => byte.toString(16).padStart(2, "0"),
      ).join("");
      const result = await createInquiry({
        sellerId: marketplace.sellerId,
        productId: selectedProduct?._id,
        productName: selectedProduct?.productName,
        senderName,
        senderPhone,
        car,
        message,
        conversationToken,
      });
      let tokenStorageFailed = false;
      try {
        window.localStorage.setItem(
          `wheelybits:inquiry-token:${result.inquiryId}`,
          conversationToken,
        );
      } catch {
        tokenStorageFailed = true;
      }
      navigate(`/inquiries/${encodeURIComponent(result.inquiryId)}`, {
        state: { conversationToken, tokenStorageFailed },
      });
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Message could not be sent.",
      );
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="min-h-screen bg-[#121416] pb-16 text-[#e2e2e5]">
      <div className="mx-auto max-w-[1120px] px-4 pt-5 sm:px-6 lg:px-8">
        <div className="mb-5 flex items-center justify-between text-[10px] text-[#c2c8c0]">
          <span>
            Vendors › AutoMax Wheels › Products › OZ Racing Ultraleggera ›{" "}
            <strong className="text-[#abcfb2]">Contact Seller</strong>
          </span>
          <Link
            to="/rim/detail/oz-racing-ultraleggera"
            className="rounded-full bg-[#1a1c1e] px-3 py-2"
          >
            <ArrowLeft className="mr-1 inline h-3 w-3" /> Back to Product
          </Link>
        </div>
        <header>
          <p className="text-[9px] uppercase tracking-wider text-[#abcfb2]">
            ● Direct merchant inquiry
          </p>
          <h1 className="mt-2 text-3xl font-bold text-white sm:text-4xl">
            Contact Seller
          </h1>
          <p className="mt-2 max-w-xl text-sm text-[#c2c8c0]">
            Get in touch directly with AutoMax Wheels regarding product
            availability, technical vehicle fitment checks, or custom offset
            orders.
          </p>
        </header>
        <div className="mt-7 grid gap-3 md:grid-cols-3">
          {[
            ["Direct Line", sellerPhone, "Seller contact number"],
            ["Instant WhatsApp", sellerWhatsapp, "Seller WhatsApp contact"],
            [
              "Wheely Bits Direct",
              sellerEmail,
              "Seller email from marketplace profile",
            ],
          ].map(([title, value, note]) => (
            <div key={title} className="rounded-xl bg-[#1a1c1e] p-4">
              <Phone className="mr-3 inline h-8 w-8 rounded-lg bg-[#313b36] p-2 text-[#abcfb2]" />
              <span className="inline-block align-middle">
                <small className="block text-[8px] uppercase text-[#c2c8c0]">
                  {title}
                </small>
                <strong className="block text-xs text-white">{value}</strong>
                <small className="text-[8px] text-[#c2c8c0]">{note}</small>
              </span>
            </div>
          ))}
        </div>
        <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_230px]">
          <main className="space-y-5">
            <section className="rounded-xl bg-[#1a1c1e] p-5">
              <span className="mr-3 inline-grid h-12 w-12 place-items-center rounded-lg bg-[#313b36] text-sm font-bold text-[#abcfb2]">
                AMW
              </span>
              <span className="inline-block align-middle">
                <h2 className="text-lg font-bold text-white">
                  {sellerName}{" "}
                  <small className="text-[8px] text-[#abcfb2]">
                    ✓ Verified Seller
                  </small>
                </h2>
                <p className="text-[10px] text-[#d4a373]">
                  ★ {marketplace?.averageRating ? marketplace.averageRating.toFixed(1) : "4.8"}{" "}
                  <span className="text-[#c2c8c0]">
                    ({marketplace?.totalRatings || 4} verified customer reviews)
                  </span>
                  <Link
                    to="/vendors/automax-wheels#reviews-section"
                    className="ml-2 text-[9px] text-[#abcfb2] hover:underline"
                  >
                    View Reviews & Rating
                  </Link>
                  <span className="ml-2 text-[#c2c8c0]">
                    <MapPin className="mr-1 inline h-3 w-3" />
                    {sellerLocation}
                  </span>
                </p>
              </span>
              <span className="float-right text-[9px] text-[#abcfb2]">
                ● Replies in ~10 mins
              </span>
            </section>
            <section className="flex flex-wrap items-center gap-4 rounded-xl bg-[#1a1c1e] p-3">
              <FallbackImage
                src="https://images.unsplash.com/photo-1600712242805-9f72877b0492?auto=format&fit=crop&w=300&q=85"
                alt="OZ Racing Ultraleggera"
                className="h-16 w-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <small className="text-[8px] uppercase text-[#abcfb2]">
                  Subject of inquiry
                </small>
                <h2 className="text-lg font-bold text-white">
                  {selectedProduct?.productName || "Published product"}
                </h2>
                <p className="text-[9px] text-[#c2c8c0]">
                  {selectedProduct?.brand || "Seller listing"} ·{" "}
                  {selectedProduct?.category || "Product"}
                </p>
              </div>
              <div className="text-right text-[9px] text-[#c2c8c0]">
                <span className="rounded-full bg-[#abcfb2]/15 px-2 py-1 text-[#abcfb2]">
                  ✓ In Stock ({selectedProduct?.stock ?? 0})
                </span>
                <strong className="mt-2 block text-lg text-white">
                  Rs. {Number(selectedProduct?.price || 0).toLocaleString()}
                </strong>
                <span>Published price from seller</span>
              </div>
            </section>
            <form
              onSubmit={submit}
              className="rounded-xl bg-[#1a1c1e] p-5 sm:p-6"
            >
              <h2 className="text-xl font-bold text-white">
                Send a Direct Message
              </h2>
              <p className="text-[10px] text-[#c2c8c0]">
                Your inquiry and vehicle specs will be sent securely to AutoMax
                Wheels' verified merchant dashboard.
              </p>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                <label className="text-[9px] text-[#c2c8c0]">
                  Your Name
                  <input
                    value={senderName}
                    onChange={(event) => setSenderName(event.target.value)}
                    className="mt-1 w-full rounded bg-[#202325] p-3 text-[10px] text-white outline-none"
                  />
                </label>
                <label className="text-[9px] text-[#c2c8c0]">
                  Phone / WhatsApp
                  <input
                    value={senderPhone}
                    onChange={(event) => setSenderPhone(event.target.value)}
                    type="tel"
                    autoComplete="tel"
                    maxLength={40}
                    required
                    className="mt-1 w-full rounded bg-[#202325] p-3 text-[10px] text-white outline-none"
                  />
                  <small className="mt-1 block text-[8px] text-[#c2c8c0]">
                    Shared with the seller so they can call or WhatsApp you.
                  </small>
                </label>
                <label className="text-[9px] text-[#c2c8c0]">
                  Select Your Car
                  <select
                    value={car}
                    onChange={(event) => setCar(event.target.value)}
                    className="mt-1 w-full rounded bg-[#202325] p-3 text-[10px] text-white outline-none"
                  >
                    <option>Honda Civic RS Turbo (FC)</option>
                    <option>Toyota Corolla</option>
                  </select>
                </label>
              </div>
              <p className="mt-4 text-[9px] text-[#c2c8c0]">⌘ Quick Prompts</p>
              <div className="mt-2 flex flex-wrap gap-1">
                {prompts.map((prompt) => (
                  <button
                    type="button"
                    key={prompt}
                    onClick={() =>
                      setMessage((current) => `${current} ${prompt}`)
                    }
                    className="rounded-full bg-[#333537] px-2 py-1 text-[8px] text-[#c2c8c0]"
                  >
                    + {prompt}
                  </button>
                ))}
              </div>
              <label className="mt-4 block text-[9px] text-[#c2c8c0]">
                Message to AutoMax Wheels{" "}
                <span className="float-right">{message.length}/500</span>
                <textarea
                  value={message}
                  maxLength={500}
                  onChange={(event) => setMessage(event.target.value)}
                  className="mt-1 min-h-28 w-full rounded bg-[#202325] p-3 text-[10px] leading-5 text-white outline-none"
                />
              </label>
              {submitError && (
                <p className="rounded bg-[#5b302a] p-3 text-[10px] text-[#ffc4ba]">
                  {submitError}
                </p>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="mt-4 w-full rounded-lg bg-[#abcfb2] py-3 text-[10px] font-bold text-[#163722]"
              >
                <Send className="mr-1 inline h-3 w-3" />{" "}
                {submitting ? "Sending..." : "Send Message to AutoMax"}
                Wheels
              </button>
              <p className="mt-3 text-[8px] text-[#c2c8c0]">
                🛡 Buyer Protection: seller contact details are loaded from the
                verified marketplace profile.
              </p>
            </form>
          </main>
          <aside className="space-y-5">
            <section className="rounded-xl bg-[#1a1c1e] p-5">
              <h2 className="text-sm font-bold text-white">
                ⚙ Why AutoMax Wheels?
              </h2>
              {[
                "100% Genuine Italian Monoblock",
                "Touchless Corghi Mount",
                "Free Hub-Centric Rings",
                "24hr Express Courier",
              ].map((item) => (
                <p key={item} className="mt-4 text-[9px] text-[#c2c8c0]">
                  <span className="mr-2 text-[#abcfb2]">◉</span>
                  <strong className="text-white">{item}</strong>
                  <br />
                  <span className="ml-5">
                    Verified service with fitment protection.
                  </span>
                </p>
              ))}
            </section>
            <section className="rounded-xl bg-[#1a1c1e] p-5">
              <h2 className="text-sm font-bold text-white">
                ▣ Store & Fitment Bay
              </h2>
              <div className="mt-3 flex h-24 items-end justify-center rounded-lg bg-[#9eb8a1] p-2 text-[8px] text-white">
                <span className="rounded bg-[#121416]/80 px-2 py-1">
                  AutoMax Performance Hub
                </span>
              </div>
              <p className="mt-3 text-[9px] text-[#c2c8c0]">
                Monday - Saturday:{" "}
                <span className="float-right text-white">
                  10:00 AM - 9:00 PM
                </span>
                <br />
                <br />
                Sunday:{" "}
                <span className="float-right text-[#d4a373]">
                  2:00 PM - 8:00 PM
                </span>
              </p>
              <button className="mt-4 w-full rounded-lg bg-[#333537] py-2 text-[9px] text-white">
                <MapPin className="mr-1 inline h-3 w-3" /> Get Driving
                Directions
              </button>
            </section>
            <section className="rounded-xl bg-[#1a1c1e] p-4 text-[9px] text-[#c2c8c0]">
              <ShieldCheck className="mr-2 inline h-4 w-4 text-[#abcfb2]" />
              <strong className="text-white">Fitment Guarantee Included</strong>
              <br />
              100% money-back guarantee on declared chassis clearance.
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
}
