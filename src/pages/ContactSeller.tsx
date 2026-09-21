import { useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Check,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
} from "lucide-react";

const prompts = [
  "Available in stock?",
  "Compatible with my car?",
  "Request finish pictures",
  "Islamabad installation?",
  "Price for set of 4?",
];

export default function ContactSeller() {
  const [message, setMessage] = useState(
    'Hello AutoMax Wheels team, I am interested in this set of OZ Racing Ultraleggera 18" rims for my Civic RS. Could you confirm if hub rings are included?',
  );
  const [sent, setSent] = useState(false);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    setSent(true);
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
            ["Direct Line", "+92 51 844 9210", "Speak with Master Tech Tariq"],
            [
              "Instant WhatsApp",
              "+92 300 555 4321",
              "Instant fitment confirmation & photos",
            ],
            [
              "Wheely Bits Direct",
              "Verified In-App Chat",
              "Protected logs & fitment guarantee",
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
                  AutoMax Wheels{" "}
                  <small className="text-[8px] text-[#abcfb2]">
                    ✓ Verified Seller
                  </small>
                </h2>
                <p className="text-[10px] text-[#d4a373]">
                  ★ 4.8 (124 reviews){" "}
                  <span className="ml-2 text-[#c2c8c0]">
                    <MapPin className="mr-1 inline h-3 w-3" /> Sector G-8/1,
                    Blue Area, Islamabad
                  </span>
                </p>
              </span>
              <span className="float-right text-[9px] text-[#abcfb2]">
                ● Replies in ~10 mins
              </span>
            </section>
            <section className="flex flex-wrap items-center gap-4 rounded-xl bg-[#1a1c1e] p-3">
              <img
                src="https://images.unsplash.com/photo-1600712242805-9f72877b0492?auto=format&fit=crop&w=300&q=85"
                alt="OZ Racing Ultraleggera"
                className="h-16 w-20 rounded-lg object-cover"
              />
              <div className="flex-1">
                <small className="text-[8px] uppercase text-[#abcfb2]">
                  Subject of inquiry
                </small>
                <h2 className="text-lg font-bold text-white">
                  OZ Racing Ultraleggera
                </h2>
                <p className="text-[9px] text-[#c2c8c0]">
                  18&quot; Lightweight Monoblock Alloy Rim · 8.0J · 5x114.3 ·
                  ET+35 · Matte Graphite
                </p>
              </div>
              <div className="text-right text-[9px] text-[#c2c8c0]">
                <span className="rounded-full bg-[#abcfb2]/15 px-2 py-1 text-[#abcfb2]">
                  ✓ In Stock (4 Sets)
                </span>
                <strong className="mt-2 block text-lg text-white">
                  Rs. 85,000<small> /rim</small>
                </strong>
                <span>Rs. 340,000 / set of 4</span>
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
                    defaultValue="Hamza Khan"
                    className="mt-1 w-full rounded bg-[#202325] p-3 text-[10px] text-white outline-none"
                  />
                </label>
                <label className="text-[9px] text-[#c2c8c0]">
                  Phone / WhatsApp
                  <input
                    defaultValue="+92 321 9876543"
                    className="mt-1 w-full rounded bg-[#202325] p-3 text-[10px] text-white outline-none"
                  />
                </label>
                <label className="text-[9px] text-[#c2c8c0]">
                  Select Your Car
                  <select className="mt-1 w-full rounded bg-[#202325] p-3 text-[10px] text-white outline-none">
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
              {sent && (
                <p className="rounded bg-[#315141] p-3 text-[10px] text-[#abcfb2]">
                  <Check className="mr-1 inline h-3 w-3" /> Message sent to
                  AutoMax Wheels.
                </p>
              )}
              <button
                type="submit"
                className="mt-4 w-full rounded-lg bg-[#abcfb2] py-3 text-[10px] font-bold text-[#163722]"
              >
                <Send className="mr-1 inline h-3 w-3" /> Send Message to AutoMax
                Wheels
              </button>
              <p className="mt-3 text-[8px] text-[#c2c8c0]">
                🛡 Buyer Protection: AutoMax Wheels has verified bank details
                and a physical Islamabad workshop.
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
