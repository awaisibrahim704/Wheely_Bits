import { useMemo } from "react";
import {
  ArrowRight,
  Check,
  CirclePlus,
  Headphones,
  ShieldCheck,
  Sparkles,
  Store,
  Wrench,
} from "lucide-react";
import { Link } from "react-router-dom";

const draftKey = "wheelybits:seller-business-draft";

type SellerDraft = {
  businessName?: string;
  businessType?: string;
  city?: string;
  store?: {
    city?: string;
  };
};

const businessTypeLabels: Record<string, string> = {
  rim: "Rim & Tyre Shop",
  auto: "Auto Parts Shop",
  manufacturer: "Manufacturer",
  distributor: "Distributor",
  other: "Other",
};

function readDraft(): SellerDraft {
  try {
    return JSON.parse(window.localStorage.getItem(draftKey) ?? "{}");
  } catch {
    return {};
  }
}

export default function SellerSetupComplete() {
  const draft = useMemo(readDraft, []);
  const businessName = draft.businessName || "Your Business";
  const businessType =
    businessTypeLabels[draft.businessType ?? ""] || "Automotive Seller";
  const city = draft.store?.city || draft.city || "Your City";

  return (
    <div className="seller-onboarding mx-auto flex w-full max-w-[900px] flex-col items-center px-4 pb-16 pt-8 sm:px-6 lg:px-0">
      <div className="seller-stepper mb-7 grid w-full grid-cols-3 gap-2 rounded-xl border border-white/10 bg-surface-mid/80 p-3 sm:p-4">
        <CompleteStep label="Business Info" />
        <CompleteStep label="Store Details" />
        <div className="seller-step seller-step-active">
          <span>3</span>
          <div>
            <small>STEP 3</small>
            <strong>Complete</strong>
          </div>
        </div>
      </div>

      <section className="seller-complete-panel w-full overflow-hidden rounded-2xl border border-white/10 bg-surface-mid shadow-2xl">
        <div className="seller-complete-hero">
          <div className="seller-complete-badge">
            <Sparkles size={30} />
            <span>
              <Check size={12} />
            </span>
          </div>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary-brand/30 bg-primary-brand/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[.16em] text-primary-brand">
            <Check size={12} /> Onboarding Complete
          </div>
          <h1 className="mt-4 text-center text-2xl font-semibold tracking-tight text-on-surface sm:text-3xl">
            Your Seller Account Is Ready!
          </h1>
          <p className="mt-2 max-w-lg text-center text-sm leading-relaxed text-on-surface-muted">
            Your store has been successfully set up. You can now start listing
            your rims, tyres, and other automotive products on Wheely Bits.
          </p>
        </div>

        <div className="seller-merchant-card mx-auto mt-6 max-w-[480px]">
          <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div className="flex min-w-0 items-center gap-3">
              <div className="seller-merchant-icon">
                <Store size={18} />
              </div>
              <div>
                <small>Verified Merchant</small>
                <strong>{businessName}</strong>
              </div>
            </div>
            <span className="seller-active-pill">
              <span /> Active
            </span>
          </div>
          <div className="mt-3 grid gap-2 sm:grid-cols-2">
            <div className="seller-summary-cell">
              <small>Business Type</small>
              <strong>
                <Wrench size={12} /> {businessType}
              </strong>
            </div>
            <div className="seller-summary-cell">
              <small>Primary Location</small>
              <strong>
                <Store size={12} /> {city}, PK
              </strong>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap justify-between gap-2 text-[10px] text-primary-brand">
            <span>
              <ShieldCheck size={11} /> Verified Seller Protection Active
            </span>
            <span>Fitment Engine Ready</span>
          </div>
        </div>

        <div className="mt-6 flex flex-col justify-center gap-3 border-b border-white/10 px-6 pb-6 sm:flex-row">
          <Link
            to="/seller/dashboard"
            className="seller-button seller-button-primary min-w-[150px]"
          >
            Go to Seller Dashboard <ArrowRight size={15} />
          </Link>
          <Link
            to="/seller/products/new"
            className="seller-button seller-button-muted min-w-[150px]"
          >
            <CirclePlus size={15} /> Add Your First Product
          </Link>
        </div>
        <div className="grid gap-5 px-6 py-6 text-center sm:grid-cols-3">
          <CompleteBenefit
            icon={<Sparkles size={15} />}
            title="Instant Sync"
            description="Live catalog sync with 3D Studio"
          />
          <CompleteBenefit
            icon={<Wrench size={15} />}
            title="Fitment Validation"
            description="Automated PCD & offset checks"
          />
          <CompleteBenefit
            icon={<Headphones size={15} />}
            title="Seller Concierge"
            description="Direct technical support 24/7"
          />
        </div>
      </section>
    </div>
  );
}

function CompleteStep({ label }: { label: string }) {
  return (
    <div className="seller-step seller-step-done">
      <span>
        <Check size={14} />
      </span>
      <div>
        <small>STEP</small>
        <strong>{label}</strong>
      </div>
    </div>
  );
}

function CompleteBenefit({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="seller-complete-benefit">
      <span>{icon}</span>
      <strong>{title}</strong>
      <small>{description}</small>
    </div>
  );
}
