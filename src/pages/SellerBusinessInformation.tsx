import FallbackImage from "../components/FallbackImage";
import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  ChevronDown,
  Mail,
  MapPin,
  Phone,
  RefreshCw,
  ShieldCheck,
  Store,
  Trash2,
  Upload,
  UserRound,
  Zap,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { hasSellerProfile } from "../lib/sellerApi";

type BusinessType = "rim" | "auto" | "manufacturer" | "distributor" | "other";

type SellerBusinessDraft = {
  businessName: string;
  ownerName: string;
  email: string;
  phone: string;
  businessType: BusinessType;
  address: string;
  city: string;
  description: string;
  logo: string;
};

const draftKey = "wheelybits:seller-business-draft";

const businessTypes: Array<{
  value: BusinessType;
  title: string;
  description: string;
}> = [
  {
    value: "rim",
    title: "Rim & Tyre Shop",
    description: "Specialized in wheels, tyres, offset tuning & fitment",
  },
  {
    value: "auto",
    title: "Auto Parts Shop",
    description: "General performance parts, brakes, suspension & fluids",
  },
  {
    value: "manufacturer",
    title: "Manufacturer",
    description: "Direct producer of bespoke automotive hardware",
  },
  {
    value: "distributor",
    title: "Distributor",
    description: "Wholesale importer and regional brand supplier",
  },
  {
    value: "other",
    title: "Other",
    description: "Custom garages, specialty vinyl wrap & tint studios",
  },
];

const emptyDraft = (email: string): SellerBusinessDraft => ({
  businessName: "",
  ownerName: "",
  email,
  phone: "",
  businessType: "rim",
  address: "",
  city: "",
  description: "",
  logo: "",
});

export default function SellerBusinessInformation() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [draft, setDraft] = useState<SellerBusinessDraft>(() => {
    const saved = window.localStorage.getItem(draftKey);
    return saved
      ? { ...emptyDraft(user?.email ?? ""), ...JSON.parse(saved) }
      : emptyDraft(user?.email ?? "");
  });
  const [logoName, setLogoName] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    window.localStorage.setItem(draftKey, JSON.stringify(draft));
  }, [draft]);

  useEffect(() => {
    let active = true;

    const redirectIfSellerExists = async () => {
      if (!user?.uid) return;
      const exists = await hasSellerProfile(user.uid);
      if (active && exists) {
        navigate("/seller/dashboard", { replace: true });
      }
    };

    void redirectIfSellerExists();
    return () => {
      active = false;
    };
  }, [navigate, user?.uid]);

  const updateField = <K extends keyof SellerBusinessDraft>(
    field: K,
    value: SellerBusinessDraft[K],
  ) => {
    setDraft((current) => ({ ...current, [field]: value }));
    setSaved(false);
    setError("");
  };

  const handleLogo = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > 5 * 1024 * 1024) {
      setError("Please choose an image smaller than 5 MB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => updateField("logo", String(reader.result));
    reader.readAsDataURL(file);
    setLogoName(file.name);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !draft.businessName ||
      !draft.ownerName ||
      !draft.phone ||
      !draft.address ||
      !draft.city
    ) {
      setError("Complete all required fields before continuing.");
      return;
    }
    const sellerPayload = {
      ...draft,
      userId: user?.uid ?? null,
      status: "draft",
      updatedAt: new Date().toISOString(),
    };
    window.localStorage.setItem(draftKey, JSON.stringify(sellerPayload));
    setSaved(true);
    navigate("/seller/store-details");
    // This payload is the contract for the future MongoDB seller-profile endpoint.
    console.info("Seller business information ready to persist", sellerPayload);
  };

  return (
    <div className="seller-onboarding mx-auto w-full max-w-[900px] px-4 pb-16 pt-8 sm:px-6 lg:px-0">
      <div className="seller-stepper mb-7 grid grid-cols-3 gap-2 rounded-xl border border-white/10 bg-surface-mid/80 p-3 sm:p-4">
        <div className="seller-step seller-step-active">
          <span>1</span>
          <div>
            <small>STEP 1</small>
            <strong>Business Information</strong>
          </div>
        </div>
        <div className="seller-step">
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

      <form
        onSubmit={handleSubmit}
        className="overflow-hidden rounded-xl border border-white/10 bg-surface-mid shadow-2xl"
      >
        <header className="border-b border-white/10 p-6 sm:p-8">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-brand/30 bg-primary-brand/10 px-3 py-1 text-xs font-semibold text-primary-brand">
            <ShieldCheck size={14} /> Verified Seller Program
          </div>
          <h1 className="text-2xl font-semibold tracking-tight text-on-surface sm:text-3xl">
            Set Up Your Seller Profile
          </h1>
          <p className="mt-2 text-sm text-on-surface-muted">
            Tell us about your business to start selling on Wheely Bits.
          </p>
        </header>

        <div className="space-y-7 p-6 sm:p-8">
          <section>
            <label className="seller-label">Business Logo</label>
            <p className="mb-3 text-xs text-on-surface-muted">
              Recommended: Square format (PNG, JPG or WebP). Minimum 400x400px.
            </p>
            <div className="flex flex-wrap items-center gap-3 rounded-lg border border-white/10 bg-background/30 p-3">
              <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-lg border border-white/10 bg-background text-on-surface-muted">
                <FallbackImage
                  src={draft.logo}
                  alt="Business logo preview"
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                <label className="seller-button seller-button-muted cursor-pointer">
                  <Upload size={14} /> Upload Logo
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleLogo}
                    className="hidden"
                  />
                </label>
                {draft.logo && (
                  <button
                    type="button"
                    onClick={() => {
                      updateField("logo", "");
                      setLogoName("");
                    }}
                    className="seller-button seller-button-danger"
                  >
                    <Trash2 size={14} /> Remove
                  </button>
                )}
              </div>
              <span className="w-full text-xs text-on-surface-muted sm:w-auto">
                {logoName ||
                  "Shown across your vendor showcase and listing badges."}
              </span>
            </div>
          </section>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              label="Business / Shop Name *"
              icon={<Store size={15} />}
              value={draft.businessName}
              onChange={(value) => updateField("businessName", value)}
              placeholder="e.g. Apex Performance Wheels"
            />
            <Field
              label="Owner Name *"
              icon={<UserRound size={15} />}
              value={draft.ownerName}
              onChange={(value) => updateField("ownerName", value)}
              placeholder="e.g. Alex Harrison"
            />
            <div>
              <label className="seller-label">
                Email Address *{" "}
                <span className="seller-verified">
                  <Check size={11} /> Authenticated
                </span>
              </label>
              <div className="seller-input opacity-80">
                <Mail size={15} />
                <input value={draft.email} readOnly />
                <span className="seller-tag">Verified</span>
              </div>
            </div>
            <Field
              label="Phone Number *"
              icon={<Phone size={15} />}
              value={draft.phone}
              onChange={(value) => updateField("phone", value)}
              placeholder="+92 300 1234567"
            />
          </div>

          <section>
            <label className="seller-label">Business Type *</label>
            <p className="mb-3 text-xs text-on-surface-muted">
              Select the primary business category that matches your inventory.
            </p>
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
              {businessTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => updateField("businessType", type.value)}
                  className={`seller-type ${draft.businessType === type.value ? "seller-type-active" : ""}`}
                >
                  <span className="seller-radio">
                    {draft.businessType === type.value && <span />}
                  </span>
                  <span>
                    <strong>{type.title}</strong>
                    <small>{type.description}</small>
                  </span>
                </button>
              ))}
            </div>
          </section>

          <div className="grid gap-5 sm:grid-cols-[1fr_180px]">
            <Field
              label="Shop Address *"
              icon={<MapPin size={15} />}
              value={draft.address}
              onChange={(value) => updateField("address", value)}
              placeholder="Plot 42, Sector I-9/3, Industrial Area"
            />
            <div>
              <label className="seller-label">City *</label>
              <div className="seller-input">
                <Building2 size={15} />
                <select
                  value={draft.city}
                  onChange={(event) => updateField("city", event.target.value)}
                >
                  <option value="">Select City</option>
                  <option>Islamabad</option>
                  <option>Lahore</option>
                  <option>Karachi</option>
                  <option>Rawalpindi</option>
                  <option>Peshawar</option>
                </select>
                <ChevronDown size={15} />
              </div>
            </div>
          </div>

          <section>
            <div className="mb-2 flex justify-between">
              <label className="seller-label mb-0">Business Description</label>
              <span className="text-xs text-on-surface-muted">
                {draft.description.length}/500
              </span>
            </div>
            <textarea
              maxLength={500}
              value={draft.description}
              onChange={(event) =>
                updateField("description", event.target.value)
              }
              placeholder="Briefly describe your specialization, brands you carry, warranty offerings, or anything else to help buyers find your shop..."
              className="seller-textarea"
            />
            <p className="mt-2 text-xs text-on-surface-muted">
              This copy will be displayed on your verified Seller Card in the
              Wheely Bits Vendor Directory.
            </p>
          </section>
        </div>

        <footer className="flex flex-col gap-3 border-t border-white/10 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="seller-button seller-button-muted"
          >
            <ArrowLeft size={15} /> Back
          </button>
          <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
            <button
              type="button"
              onClick={() => {
                window.localStorage.setItem(draftKey, JSON.stringify(draft));
                setSaved(true);
              }}
              className="seller-button seller-button-muted"
            >
              {saved ? <Check size={15} /> : <RefreshCw size={14} />}{" "}
              {saved ? "Draft Saved" : "Save Draft"}
            </button>
            <button
              type="submit"
              className="seller-button seller-button-primary"
            >
              {saved ? "Saved" : "Continue"} <ArrowRight size={15} />
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
      <div className="mt-5 grid gap-2 text-xs text-on-surface-muted sm:grid-cols-3">
        <div className="seller-benefit">
          <ShieldCheck size={15} /> Verified Buyer Network
        </div>
        <div className="seller-benefit">
          <Zap size={15} /> Instant Wheel & Wrap Listings
        </div>
        <div className="seller-benefit">
          <UserRound size={15} /> Dedicated Seller Onboarding Help
        </div>
      </div>
    </div>
  );
}

function Field({
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
