import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Compass,
  Crosshair,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  ShieldCheck,
  Store,
  Zap,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { saveSellerProfile } from "../lib/sellerApi";

const draftKey = "wheelybits:seller-business-draft";
const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

type StoreDraft = {
  address: string;
  city: string;
  neighborhood: string;
  postalCode: string;
  latitude: string;
  longitude: string;
  openDays: string[];
  openingTime: string;
  closingTime: string;
  storeDescription: string;
  businessPhone: string;
  whatsapp: string;
  businessEmail: string;
  whatsappOptIn: boolean;
};

const emptyStoreDraft: StoreDraft = {
  address: "",
  city: "",
  neighborhood: "",
  postalCode: "",
  latitude: "33.6698",
  longitude: "73.0571",
  openDays: [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  openingTime: "09:30",
  closingTime: "20:00",
  storeDescription: "",
  businessPhone: "",
  whatsapp: "",
  businessEmail: "",
  whatsappOptIn: true,
};

function readDraft(): Record<string, unknown> {
  try {
    return JSON.parse(window.localStorage.getItem(draftKey) ?? "{}");
  } catch {
    return {};
  }
}

export default function SellerStoreDetails() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [draft, setDraft] = useState<StoreDraft>(() => ({
    ...emptyStoreDraft,
    ...readDraft(),
    openDays: (readDraft().openDays as string[]) ?? emptyStoreDraft.openDays,
  }));
  const [error, setError] = useState("");
  const [complete, setComplete] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    window.localStorage.setItem(
      draftKey,
      JSON.stringify({ ...readDraft(), ...draft }),
    );
  }, [draft]);

  const update = <K extends keyof StoreDraft>(
    field: K,
    value: StoreDraft[K],
  ) => {
    setDraft((current) => ({ ...current, [field]: value }));
    setError("");
    setComplete(false);
  };

  const toggleDay = (day: string) => {
    update(
      "openDays",
      draft.openDays.includes(day)
        ? draft.openDays.filter((item) => item !== day)
        : [...draft.openDays, day],
    );
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      setError("Location detection is not available in this browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        update("latitude", coords.latitude.toFixed(4));
        update("longitude", coords.longitude.toFixed(4));
      },
      () =>
        setError(
          "We could not detect your location. You can enter the store address manually.",
        ),
    );
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !draft.address ||
      !draft.city ||
      !draft.postalCode ||
      !draft.openDays.length ||
      !draft.openingTime ||
      !draft.closingTime ||
      !draft.businessPhone ||
      !draft.whatsapp ||
      !draft.businessEmail
    ) {
      setError(
        "Complete all required store and contact fields before finishing setup.",
      );
      return;
    }
    const sellerPayload = {
      ...readDraft(),
      store: draft,
      userId: user?.uid ?? null,
      status: "submitted",
      updatedAt: new Date().toISOString(),
    };
    window.localStorage.setItem(draftKey, JSON.stringify(sellerPayload));
    if (!user?.uid) {
      setError("You must be signed in before submitting seller information.");
      return;
    }
    setSaving(true);
    try {
      await saveSellerProfile(user.uid, sellerPayload);
      setComplete(true);
      navigate("/seller/complete");
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Seller information could not be saved.",
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="seller-onboarding mx-auto w-full max-w-[900px] px-4 pb-16 pt-8 sm:px-6 lg:px-0">
      <SellerStepper />
      <form
        onSubmit={handleSubmit}
        className="overflow-hidden rounded-xl border border-white/10 bg-surface-mid shadow-2xl"
      >
        <header className="border-b border-white/10 p-6 sm:p-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-brand/30 bg-primary-brand/10 px-3 py-1 text-xs font-semibold text-primary-brand">
            <MapPin size={14} /> Physical Storefront & Operations
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-on-surface sm:text-3xl">
            Tell Us About Your Store
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-on-surface-muted">
            Help customers learn more about your store, business hours, and
            where they can find you for installations, rim fitments, or
            consultations.
          </p>
        </header>

        <div className="space-y-7 p-6 sm:p-8">
          <StoreSection
            icon={<MapPin size={15} />}
            title="Store Location"
            description="Pin your physical workshop or storefront to appear in regional customer searches"
          >
            <div className="grid gap-5">
              <StoreField
                label="Full Store Address *"
                icon={<MapPin size={15} />}
                value={draft.address}
                onChange={(value) => update("address", value)}
                placeholder="Plot 42, Street 7, Sector I-9/3 Industrial Area"
              />
              <div className="grid gap-5 sm:grid-cols-2">
                <SelectField
                  label="City *"
                  value={draft.city}
                  onChange={(value) => update("city", value)}
                  options={[
                    "Islamabad",
                    "Lahore",
                    "Karachi",
                    "Rawalpindi",
                    "Peshawar",
                  ]}
                />
                <StoreField
                  label="Area / Neighborhood"
                  icon={<Compass size={15} />}
                  value={draft.neighborhood}
                  onChange={(value) => update("neighborhood", value)}
                  placeholder="Sector I-9/3 Automotive Hub"
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <StoreField
                  label="Postal Code *"
                  icon={<Building2 size={15} />}
                  value={draft.postalCode}
                  onChange={(value) => update("postalCode", value)}
                  placeholder="44000"
                />
                <div className="seller-location-status">
                  <span>
                    <Crosshair size={14} /> GPS: {draft.latitude}° N,{" "}
                    {draft.longitude}° E
                  </span>
                  <button type="button" onClick={detectLocation}>
                    Detect My Location
                  </button>
                </div>
              </div>
              <div className="seller-map-preview">
                <div className="seller-map-grid" />
                <div className="seller-map-label">
                  <Store size={14} />{" "}
                  {String(readDraft().businessName || "Your Store")}{" "}
                  <small>{draft.neighborhood || "Main Bay"}</small>
                </div>
                <div className="seller-map-pin">
                  <MapPin size={19} />
                </div>
                <div className="seller-map-footer">
                  <ShieldCheck size={13} /> Verified Automotive Zone:{" "}
                  {draft.neighborhood || "Store location"}
                  {draft.city ? `, ${draft.city}` : ""}
                </div>
                <div className="seller-map-controls">
                  <button type="button">+</button>
                  <button type="button">-</button>
                </div>
              </div>
            </div>
          </StoreSection>

          <StoreSection
            icon={<CalendarDays size={15} />}
            title="Store Information"
            description="Specify operating hours so customers can schedule wheel fittings and consultations"
          >
            <label className="seller-label">Opening Days *</label>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
              {days.map((day) => (
                <button
                  type="button"
                  key={day}
                  onClick={() => toggleDay(day)}
                  className={`seller-day ${draft.openDays.includes(day) ? "seller-day-active" : ""}`}
                >
                  {day.slice(0, 3)}
                </button>
              ))}
            </div>
            <p className="mt-2 text-xs text-on-surface-muted">
              Active Selection:{" "}
              {draft.openDays.length
                ? draft.openDays.join(" - ")
                : "No days selected"}{" "}
              ({draft.openDays.length} Days Open)
            </p>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <TimeField
                label="Opening Time *"
                value={draft.openingTime}
                onChange={(value) => update("openingTime", value)}
              />
              <TimeField
                label="Closing Time *"
                value={draft.closingTime}
                onChange={(value) => update("closingTime", value)}
              />
            </div>
            <div className="mt-5">
              <div className="mb-2 flex justify-between">
                <label className="seller-label mb-0">Store Description</label>
                <span className="text-xs text-on-surface-muted">
                  {draft.storeDescription.length}/600
                </span>
              </div>
              <textarea
                maxLength={600}
                value={draft.storeDescription}
                onChange={(event) =>
                  update("storeDescription", event.target.value)
                }
                placeholder="Equipped with 4 hydraulic fitment lifts, Hunter laser wheel alignments, and a dust-free ceramic & wrap booth..."
                className="seller-textarea"
              />
              <p className="mt-2 text-xs text-on-surface-muted">
                This customer-facing copy is showcased on your public Wheely
                Bits Store Profile & Booking Portal.
              </p>
            </div>
          </StoreSection>

          <StoreSection
            icon={<Phone size={15} />}
            title="Contact Information"
            description="Provide verified communication channels for order dispatches, fitment inquiries, and quotes"
          >
            <div className="grid gap-5 sm:grid-cols-3">
              <StoreField
                label="Business Phone *"
                icon={<Phone size={15} />}
                value={draft.businessPhone}
                onChange={(value) => update("businessPhone", value)}
                placeholder="+92 51 8489201"
              />
              <StoreField
                label="WhatsApp Number *"
                icon={<MessageCircle size={15} />}
                value={draft.whatsapp}
                onChange={(value) => update("whatsapp", value)}
                placeholder="+92 300 1234567"
              />
              <StoreField
                label="Business Email *"
                icon={<Mail size={15} />}
                value={draft.businessEmail}
                onChange={(value) => update("businessEmail", value)}
                placeholder="sales@apexwheels.pk"
              />
            </div>
            <label className="seller-checkbox mt-5">
              <input
                type="checkbox"
                checked={draft.whatsappOptIn}
                onChange={(event) =>
                  update("whatsappOptIn", event.target.checked)
                }
              />
              <span>
                <strong>
                  Receive instant customer fitment quote requests on WhatsApp
                </strong>{" "}
                Enable quick dispatch notifications when an enthusiast builds a
                car and requests availability from your shop.
              </span>
            </label>
          </StoreSection>
        </div>

        <footer className="flex flex-col gap-3 border-t border-white/10 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <button
            type="button"
            onClick={() => navigate("/seller/business-information")}
            className="seller-button seller-button-muted"
          >
            <ArrowLeft size={15} /> Back
          </button>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={() =>
                window.localStorage.setItem(
                  draftKey,
                  JSON.stringify({ ...readDraft(), store: draft }),
                )
              }
              className="seller-button seller-button-muted"
            >
              Save Draft
            </button>
            <button
              type="submit"
              disabled={saving}
              className="seller-button seller-button-primary"
            >
              {saving
                ? "Saving..."
                : complete
                  ? "Seller Setup Saved"
                  : "Complete Seller Setup"}{" "}
              {complete ? <Check size={15} /> : <ArrowRight size={15} />}
            </button>
          </div>
        </footer>
      </form>
      {error && (
        <p
          role="alert"
          className="mt-4 rounded-lg border border-red-300/20 bg-red-400/10 px-4 py-3 text-sm text-red-200"
        >
          {error}
        </p>
      )}
      {complete && (
        <p
          role="status"
          className="mt-4 rounded-lg border border-primary-brand/30 bg-primary-brand/10 px-4 py-3 text-sm text-primary"
        >
          Your seller profile is ready for review. The complete payload is saved
          for the MongoDB integration.
        </p>
      )}
      <div className="mt-5 grid gap-2 text-xs text-on-surface-muted sm:grid-cols-3">
        <div className="seller-benefit">
          <ShieldCheck size={15} /> Verified Seller Protection
        </div>
        <div className="seller-benefit">
          <Zap size={15} /> Real-time Fitment Sync
        </div>
        <div className="seller-benefit">
          <MessageCircle size={15} /> 24/7 Seller Concierge Support
        </div>
      </div>
    </div>
  );
}

function SellerStepper() {
  return (
    <div className="seller-stepper mb-7 grid grid-cols-3 gap-2 rounded-xl border border-white/10 bg-surface-mid/80 p-3 sm:p-4">
      <div className="seller-step seller-step-done">
        <span>
          <Check size={14} />
        </span>
        <div>
          <small>STEP 1</small>
          <strong>Business Information</strong>
        </div>
      </div>
      <div className="seller-step seller-step-active">
        <span>2</span>
        <div>
          <small>STEP 2</small>
          <strong>Store Details</strong>
        </div>
      </div>
      <div className="seller-step">
        <span>3</span>
        <div>
          <small>STEP 3</small>
          <strong>Complete</strong>
        </div>
      </div>
    </div>
  );
}

function StoreSection({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="seller-section">
      <div className="seller-section-heading">
        <span>{icon}</span>
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>
      {children}
    </section>
  );
}

function StoreField({
  label,
  icon,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label className="seller-label">{label}</label>
      <div className="seller-input">
        <span className="text-on-surface-muted">{icon}</span>
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <div>
      <label className="seller-label">{label}</label>
      <div className="seller-input">
        <Building2 size={15} />
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
        >
          <option value="">Select City</option>
          {options.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <ChevronDown size={15} />
      </div>
    </div>
  );
}

function TimeField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="seller-label">{label}</label>
      <div className="seller-input">
        <Clock3 size={15} />
        <input
          type="time"
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
      </div>
    </div>
  );
}
