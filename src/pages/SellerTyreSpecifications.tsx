import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Car,
  Check,
  ChevronDown,
  CloudUpload,
  ImagePlus,
  Info,
  Plus,
  Save,
  Trash2,
  Upload,
  X,
} from "lucide-react";

const listingKey = "wheelybits:product-listing-draft";
type Vehicle = { make: string; model: string };
type TyreDraft = {
  brand: string;
  productName: string;
  price: string;
  stock: string;
  condition: string;
  description: string;
  width: string;
  aspect: string;
  diameter: string;
  loadIndex: string;
  speedRating: string;
  tyreType: string;
  construction: string;
  manufacturingYear: string;
  dotNumber: string;
  treadPattern: string;
  vehicles: Vehicle[];
  gallery: string[];
};
const defaults: TyreDraft = {
  brand: "",
  productName: "Pilot Sport 4 S",
  price: "315.00",
  stock: "12",
  condition: "Brand New",
  description:
    "Ultra-high performance summer tyre featuring Michelin dynamic response technology and multi-compound construction for pinpoint steering precision and exceptional dry/wet braking distances.",
  width: "225",
  aspect: "45",
  diameter: "18",
  loadIndex: "95 (690 kg)",
  speedRating: "Y - Up to 300 km/h (186 mph)",
  tyreType: "Summer Compound",
  construction: "Tubeless (TL)",
  manufacturingYear: "2024",
  dotNumber: "DOT 6Y 81 4823",
  treadPattern: "Asymmetric Pattern",
  vehicles: [
    { make: "BMW 3 Series (G20)", model: "2019-2024 - Front Fitment" },
    { make: "Volkswagen Golf R / GTI", model: "2015-2023 - OEM Square Spec" },
    { make: "Audi A4 / S4 (B9)", model: "2017-2024 - All-Wheel Drive" },
  ],
  gallery: [],
};
function readDraft(): Partial<TyreDraft> {
  try {
    return JSON.parse(window.localStorage.getItem(listingKey) ?? "{}");
  } catch {
    return {};
  }
}

export default function SellerTyreSpecifications() {
  const navigate = useNavigate();
  const [draft, setDraft] = useState<TyreDraft>({
    ...defaults,
    ...readDraft(),
  });
  const [vehicle, setVehicle] = useState<Vehicle>({ make: "", model: "" });
  const update = <K extends keyof TyreDraft>(field: K, value: TyreDraft[K]) =>
    setDraft((current) => ({ ...current, [field]: value }));
  const save = () =>
    window.localStorage.setItem(
      listingKey,
      JSON.stringify({ ...draft, category: "tyres" }),
    );
  const addVehicle = () => {
    if (!vehicle.make || !vehicle.model) return;
    update("vehicles", [...draft.vehicles, vehicle]);
    setVehicle({ make: "", model: "" });
  };
  const uploadGallery = (event: React.ChangeEvent<HTMLInputElement>) =>
    Array.from(event.target.files ?? [])
      .slice(0, 8 - draft.gallery.length)
      .forEach((file) => {
        const reader = new FileReader();
        reader.onload = () =>
          update("gallery", [...draft.gallery, String(reader.result)]);
        reader.readAsDataURL(file);
      });
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    save();
    navigate("/seller/products/preview");
  };

  return (
    <div className="seller-spec-page">
      <TyreNav />
      <main className="seller-spec-content">
        <div className="seller-spec-breadcrumb">
          Seller Dashboard / Add Product / <strong>Add New Tyre</strong>
        </div>
        <header className="seller-spec-header">
          <div>
            <h1>
              Add New Tyre <span>PRODUCT ID #TR-DRAFT</span>
            </h1>
            <p>
              Configure specification attributes, compound ratings, fitment
              sizing, and listing media.
            </p>
          </div>
          <div>
            <button
              type="button"
              onClick={save}
              className="seller-button seller-button-muted"
            >
              <Save size={13} /> Save Draft
            </button>
            <button
              type="submit"
              form="tyre-spec-form"
              className="seller-button seller-button-primary"
            >
              Continue to Preview <ArrowRight size={13} />
            </button>
          </div>
        </header>
        <form
          id="tyre-spec-form"
          onSubmit={submit}
          className="seller-spec-form"
        >
          <SpecSection
            icon={<Info size={15} />}
            title="Basic Information"
            description="Core identity, commercial pricing, stock inventory, and condition status."
          >
            <div className="seller-spec-grid seller-spec-grid-2">
              <SelectField
                label="Tyre Brand *"
                value={draft.brand}
                onChange={(value) => update("brand", value)}
                options={[
                  "Select tyre manufacturer...",
                  "Michelin",
                  "Continental",
                  "Bridgestone",
                  "Pirelli",
                ]}
              />
              <TextField
                label="Model / Product Name *"
                value={draft.productName}
                onChange={(value) => update("productName", value)}
                placeholder="e.g. Pilot Sport 4 S"
              />
              <TextField
                label="Price (PKR / Single Tyre) *"
                value={draft.price}
                onChange={(value) => update("price", value)}
                placeholder="PKR 315.00"
              />
              <TextField
                label="Stock Quantity (Units) *"
                value={draft.stock}
                onChange={(value) => update("stock", value)}
                placeholder="e.g. 12"
              />
            </div>
            <label className="seller-spec-label">Condition *</label>
            <div className="seller-condition-grid">
              <Condition
                value="Brand New"
                active={draft.condition === "Brand New"}
                onClick={() => update("condition", "Brand New")}
                text="Never mounted, zero road miles with full original tread depth."
              />
              <Condition
                value="Pre-Owned / Take-Off"
                active={draft.condition === "Pre-Owned / Take-Off"}
                onClick={() => update("condition", "Pre-Owned / Take-Off")}
                text="Verified remaining tread depth, zero punctures or sidewall dry rot."
              />
            </div>
            <TextAreaField
              label="Product Description"
              value={draft.description}
              onChange={(value) => update("description", value)}
            />
          </SpecSection>
          <SpecSection
            icon={<Info size={15} />}
            title="Tyre Size & Dimension Metrics"
            description="Define structured dimensions to trigger automated Wheely Bits Fitment Engine matching."
          >
            <div className="seller-computed-size">
              COMPUTED SIZE:{" "}
              <strong>
                {draft.width} / {draft.aspect} R{draft.diameter}
              </strong>
            </div>
            <div className="seller-spec-grid seller-spec-grid-3">
              <TextField
                label="Width (mm) *"
                value={draft.width}
                onChange={(value) => update("width", value)}
                placeholder="225"
              />
              <TextField
                label="Aspect Ratio (%) *"
                value={draft.aspect}
                onChange={(value) => update("aspect", value)}
                placeholder="45"
              />
              <TextField
                label="Rim Diameter (Inches) *"
                value={draft.diameter}
                onChange={(value) => update("diameter", value)}
                placeholder="18"
              />
            </div>
          </SpecSection>
          <SpecSection
            icon={<Info size={15} />}
            title="Technical Specifications & Classifications"
            description="Ratings, structural features, and manufacturing traceability codes."
          >
            <div className="seller-spec-grid seller-spec-grid-3">
              <TextField
                label="Load Index"
                value={draft.loadIndex}
                onChange={(value) => update("loadIndex", value)}
                placeholder="95 (690 kg)"
              />
              <SelectField
                label="Speed Rating"
                value={draft.speedRating}
                onChange={(value) => update("speedRating", value)}
                options={[
                  "Y - Up to 300 km/h (186 mph)",
                  "W - Up to 270 km/h",
                  "V - Up to 240 km/h",
                ]}
              />
              <SelectField
                label="Tyre Type"
                value={draft.tyreType}
                onChange={(value) => update("tyreType", value)}
                options={["Summer Compound", "All Season", "Winter Compound"]}
              />
            </div>
            <label className="seller-spec-label">
              Construction & Safety Technology
            </label>
            <div className="seller-condition-grid">
              <Condition
                value="Tubeless (TL)"
                active={draft.construction === "Tubeless (TL)"}
                onClick={() => update("construction", "Tubeless (TL)")}
                text="Equipped with internal airtight halobutyl liner."
              />
              <Condition
                value="Run Flat Technology (RFT / SSR)"
                active={draft.construction !== "Tubeless (TL)"}
                onClick={() =>
                  update("construction", "Run Flat Technology (RFT / SSR)")
                }
                text="Reinforced self-supporting sidewalls for zero-pressure mobility."
              />
            </div>
            <div className="seller-spec-grid seller-spec-grid-3">
              <TextField
                label="Manufacturing Year"
                value={draft.manufacturingYear}
                onChange={(value) => update("manufacturingYear", value)}
                placeholder="2024"
              />
              <TextField
                label="DOT Number"
                value={draft.dotNumber}
                onChange={(value) => update("dotNumber", value)}
                placeholder="DOT 6Y 81 4823"
              />
              <SelectField
                label="Tread Pattern"
                value={draft.treadPattern}
                onChange={(value) => update("treadPattern", value)}
                options={[
                  "Asymmetric Pattern",
                  "Directional Pattern",
                  "Symmetric Pattern",
                ]}
              />
            </div>
          </SpecSection>
          <SpecSection
            icon={<Car size={15} />}
            title="Compatible Vehicles"
            description="Map this tyre to specific chassis models so buyers find it instantly in vehicle searches."
          >
            <div className="seller-vehicle-entry">
              <small>
                <Plus size={11} /> Add Compatible Vehicle Entry
              </small>
              <div className="seller-spec-grid seller-spec-grid-3">
                <TextField
                  label="Vehicle Manufacturer"
                  value={vehicle.make}
                  onChange={(value) => setVehicle({ ...vehicle, make: value })}
                  placeholder="e.g. BMW"
                />
                <TextField
                  label="Vehicle Model"
                  value={vehicle.model}
                  onChange={(value) => setVehicle({ ...vehicle, model: value })}
                  placeholder="e.g. 3 Series / M3"
                />
                <TextField
                  label="Year / Year Range"
                  value=""
                  onChange={() => undefined}
                  placeholder="e.g. 2019-2024"
                />
              </div>
              <button
                type="button"
                onClick={addVehicle}
                className="seller-attach-button"
              >
                + Attach Vehicle
              </button>
            </div>
            <label className="seller-spec-label">
              Currently Attached Vehicles
            </label>
            <div className="seller-attached-grid">
              {draft.vehicles.map((item, index) => (
                <div
                  className="seller-attached-vehicle"
                  key={`${item.make}-${index}`}
                >
                  <Car size={14} />
                  <span>
                    <strong>{item.make}</strong>
                    <small>{item.model}</small>
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      update(
                        "vehicles",
                        draft.vehicles.filter(
                          (_, itemIndex) => itemIndex !== index,
                        ),
                      )
                    }
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          </SpecSection>
          <SpecSection
            icon={<ImagePlus size={15} />}
            title="Upload Tyre Images"
            description="Upload high-resolution photography showcasing tread pattern, shoulder grooves, and sidewall branding."
            note="PNG, JPG, WEBP up to 25MB"
          >
            <div className="seller-dropzone">
              <CloudUpload size={25} />
              <strong>Drag and drop your tyre photo files here</strong>
              <small>
                Support multiple uploads at once. Recommended resolution: 2400 x
                2400px (1:1 square).
              </small>
              <label className="seller-button seller-button-muted">
                <Upload size={12} /> Browse Files
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={uploadGallery}
                />
              </label>
            </div>
            {draft.gallery.length > 0 && (
              <div className="seller-gallery-grid">
                {draft.gallery.map((image, index) => (
                  <div className="seller-gallery-image" key={image}>
                    <img src={image} alt={`Tyre gallery ${index + 1}`} />
                    <button
                      type="button"
                      onClick={() =>
                        update(
                          "gallery",
                          draft.gallery.filter(
                            (_, itemIndex) => itemIndex !== index,
                          ),
                        )
                      }
                    >
                      <Trash2 size={12} />
                    </button>
                    <small>
                      {index === 0 ? "PRIMARY IMAGE" : "GALLERY IMAGE"}
                    </small>
                  </div>
                ))}
              </div>
            )}
            <p className="seller-upload-count">
              Uploaded Gallery ({draft.gallery.length}/8)
            </p>
          </SpecSection>
        </form>
        <footer className="seller-spec-actions">
          <span>
            <Check size={12} /> Draft auto-saved 1 minute ago
          </span>
          <div>
            <button
              type="button"
              onClick={save}
              className="seller-button seller-button-muted"
            >
              Save Draft
            </button>
            <button
              type="submit"
              form="tyre-spec-form"
              className="seller-button seller-button-primary"
            >
              Continue to Preview <ArrowRight size={13} />
            </button>
          </div>
        </footer>
      </main>
      <footer className="seller-spec-footer">
        © 2024 Wheely Bits Seller Network. All rights reserved.
        <span>
          Merchant Policy　 Fitment Guarantee Terms　 Seller Support & API
        </span>
      </footer>
    </div>
  );
}

function TyreNav() {
  return (
    <div className="seller-spec-nav">
      <strong>▣ Wheely Bits</strong>
      <span>Seller Center</span>
      <nav>
        <a>Dashboard</a>
        <a>Inventory</a>
        <a className="seller-spec-nav-active">Add Product</a>
        <a>Orders</a>
      </nav>
      <small>◉ AP</small>
    </div>
  );
}
function SpecSection({
  icon,
  title,
  description,
  note,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="seller-spec-section">
      <header>
        <span>{icon}</span>
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
        {note && <small>{note}</small>}
      </header>
      {children}
    </section>
  );
}
function TextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="seller-spec-field">
      <span>{label}</span>
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
      />
    </label>
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
    <label className="seller-spec-field">
      <span>{label}</span>
      <div>
        <select
          value={value}
          onChange={(event) => onChange(event.target.value)}
        >
          <option value="">{options[0]}</option>
          {options.slice(1).map((option) => (
            <option key={option}>{option}</option>
          ))}
        </select>
        <ChevronDown size={13} />
      </div>
    </label>
  );
}
function TextAreaField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="seller-spec-field seller-spec-textarea">
      <span>{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </label>
  );
}
function Condition({
  value,
  active,
  onClick,
  text,
}: {
  value: string;
  active: boolean;
  onClick: () => void;
  text: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`seller-condition ${active ? "active" : ""}`}
    >
      <span>{active && <Check size={10} />}</span>
      <strong>{value}</strong>
      <small>{text}</small>
    </button>
  );
}
