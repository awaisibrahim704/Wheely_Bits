import FallbackImage from "../components/FallbackImage";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Check,
  ChevronDown,
  CloudUpload,
  Info,
  Save,
  Sparkles,
  Trash2,
  Upload,
} from "lucide-react";

const listingKey = "wheelybits:product-listing-draft";
type Listing = {
  brand: string;
  productName: string;
  price: string;
  stock: string;
  condition: string;
  description: string;
  diameter: string;
  width: string;
  pcd: string;
  offset: string;
  centerBore: string;
  bolts: string;
  material: string;
  color: string;
  finish: string;
  gallery: string[];
  aiImage: string;
};
const defaults: Listing = {
  brand: "",
  productName: "",
  price: "",
  stock: "",
  condition: "Brand New",
  description: "",
  diameter: "19 inch",
  width: "9.5J",
  pcd: "5x114.3 (JDM / Tuner Standard)",
  offset: "+35mm",
  centerBore: "73.1mm",
  bolts: "5 Lug",
  material: "Forged Monoblock 6061-T6",
  color: "Satin Black & Diamond Polished",
  finish: "Gloss Clear Coat",
  gallery: [],
  aiImage: "",
};
function readListing(): Partial<Listing> {
  try {
    return JSON.parse(window.localStorage.getItem(listingKey) ?? "{}");
  } catch {
    return {};
  }
}

export default function SellerProductSpecifications() {
  const navigate = useNavigate();
  const [draft, setDraft] = useState<Listing>({
    ...defaults,
    ...readListing(),
  });
  const [aiMessage, setAiMessage] = useState("");
  const update = <K extends keyof Listing>(field: K, value: Listing[K]) =>
    setDraft((current) => ({ ...current, [field]: value }));
  const save = () =>
    window.localStorage.setItem(listingKey, JSON.stringify(draft));
  const uploadGallery = (event: ChangeEvent<HTMLInputElement>) =>
    Array.from(event.target.files ?? [])
      .slice(0, 8 - draft.gallery.length)
      .forEach((file) => {
        const reader = new FileReader();
        reader.onload = () =>
          update("gallery", [...draft.gallery, String(reader.result)]);
        reader.readAsDataURL(file);
      });
  const uploadAi = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      update("aiImage", String(reader.result));
      setAiMessage("AI calibration succeeded (99.4%)");
    };
    reader.readAsDataURL(file);
  };
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    save();
    navigate("/seller/products/preview");
  };
  return (
    <div className="seller-spec-page">
      <SellerSpecNav />
      <main className="seller-spec-content">
        <div className="seller-spec-breadcrumb">
          Seller Dashboard / Add Product / <strong>Add New Rim</strong>
        </div>
        <header className="seller-spec-header">
          <div>
            <h1>
              Add New Rim <span>PRODUCT ID #RM-DRAFT</span>
            </h1>
            <p>
              Configure specifications, fitment compatibility, and AI try-on
              visualization assets.
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
              form="rim-spec-form"
              className="seller-button seller-button-primary"
            >
              Continue to Preview <ArrowRight size={13} />
            </button>
          </div>
        </header>
        <form id="rim-spec-form" onSubmit={submit} className="seller-spec-form">
          <SpecSection
            icon={<Info size={15} />}
            title="Basic Information"
            description="Core identity, commercial pricing, stock inventory, and condition status."
          >
            <div className="seller-spec-grid seller-spec-grid-2">
              <SelectField
                label="Rim Brand *"
                value={draft.brand}
                onChange={(value) => update("brand", value)}
                options={[
                  "Select manufacturer...",
                  "BBS",
                  "Volk Racing",
                  "HRE",
                  "Enkei",
                ]}
              />
              <TextField
                label="Model / Product Name *"
                value={draft.productName}
                onChange={(value) => update("productName", value)}
                placeholder="e.g. H-Forged HF-5 Monoblock"
              />
              <TextField
                label="Price (PKR / Set of 4) *"
                value={draft.price}
                onChange={(value) => update("price", value)}
                placeholder="PKR 2,450.00"
              />
              <TextField
                label="Stock Quantity (Sets) *"
                value={draft.stock}
                onChange={(value) => update("stock", value)}
                placeholder="e.g. 5"
              />
            </div>
            <label className="seller-spec-label">Condition *</label>
            <div className="seller-condition-grid">
              <Condition
                value="Brand New"
                active={draft.condition === "Brand New"}
                onClick={() => update("condition", "Brand New")}
                text="Never mounted, original factory packaging with certificates."
              />
              <Condition
                value="Pre-Owned / Refurbished"
                active={draft.condition === "Pre-Owned / Refurbished"}
                onClick={() => update("condition", "Pre-Owned / Refurbished")}
                text="Minor blemishes, verified true and straight with zero cracks."
              />
            </div>
            <TextAreaField
              label="Product Description"
              value={draft.description}
              onChange={(value) => update("description", value)}
              placeholder="Describe spoke design, structural forging technology, load rating, and finish durability..."
            />
          </SpecSection>
          <SpecSection
            icon={<Info size={15} />}
            title="Rim Specifications"
            description="Detailed geometry used by the Wheely Bits Fitment Engine to calculate hub clearances."
          >
            <div className="seller-spec-grid seller-spec-grid-3">
              <SelectField
                label="Diameter *"
                value={draft.diameter}
                onChange={(value) => update("diameter", value)}
                options={["19 inch", "18 inch", "20 inch", "21 inch"]}
              />
              <TextField
                label="Width (J)"
                value={draft.width}
                onChange={(value) => update("width", value)}
                placeholder="9.5J"
              />
              <SelectField
                label="PCD / Bolt Pattern"
                value={draft.pcd}
                onChange={(value) => update("pcd", value)}
                options={[
                  "5x114.3 (JDM / Tuner Standard)",
                  "5x112",
                  "5x120",
                  "6x139.7",
                ]}
              />
              <TextField
                label="Offset (ET)"
                value={draft.offset}
                onChange={(value) => update("offset", value)}
                placeholder="+35mm"
              />
              <TextField
                label="Center Bore (mm)"
                value={draft.centerBore}
                onChange={(value) => update("centerBore", value)}
                placeholder="73.1mm"
              />
              <SelectField
                label="Number of Bolts"
                value={draft.bolts}
                onChange={(value) => update("bolts", value)}
                options={["5 Lug", "4 Lug", "6 Lug"]}
              />
              <SelectField
                label="Material"
                value={draft.material}
                onChange={(value) => update("material", value)}
                options={[
                  "Forged Monoblock 6061-T6",
                  "Cast Aluminum",
                  "Flow Formed",
                ]}
              />
              <TextField
                label="Color"
                value={draft.color}
                onChange={(value) => update("color", value)}
                placeholder="Satin Black & Diamond Polished"
              />
              <SelectField
                label="Finish"
                value={draft.finish}
                onChange={(value) => update("finish", value)}
                options={["Gloss Clear Coat", "Satin Clear Coat", "Brushed"]}
              />
            </div>
          </SpecSection>
          <SpecSection
            title="Upload Rim Images"
            description="Upload multiple high-resolution photos showcasing face finish, concave profile, and barrel stampings."
            note="PNG, JPG, WEBP up to 25MB"
          >
            <div className="seller-dropzone">
              <CloudUpload size={25} />
              <strong>Drag and drop your rim photo files here</strong>
              <small>
                Support multiple uploads at once. Recommended size: 2400 x
                2400px
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
                    <FallbackImage src={image} alt={`Rim gallery ${index + 1}`} />
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
              {draft.gallery.length
                ? `Uploaded Gallery (${draft.gallery.length}/8)`
                : "Photo not uploaded"}
            </p>
          </SpecSection>
          <SpecSection
            icon={<Sparkles size={15} />}
            title="AI Visualization Image"
            description="Upload a clean front-facing image of the rim for Wheely Bits' virtual try-on feature."
            note="3D TRY-ON READY"
          >
            <div className="seller-ai-requirements">
              <strong>Recommended Image Requirements</strong>
              <span>Full rim visible</span>
              <span>Front-facing</span>
              <span>Good lighting</span>
              <span>High resolution</span>
              <span>Minimal background</span>
            </div>
            <div className="seller-ai-preview">
              <div>
                {draft.aiImage ? (
                  <FallbackImage src={draft.aiImage} alt="AI visualization preview" />
                ) : (
                  <span>Photo not uploaded</span>
                )}
              </div>
              <section>
                <p>
                  Current File:{" "}
                  {draft.aiImage ? "rim-front-facing.png" : "Photo not uploaded"}
                </p>
                <small>
                  {draft.aiImage
                    ? aiMessage
                    : "Upload a clean rim image for accurate calibration."}
                </small>
                <label className="seller-button seller-button-primary">
                  <Upload size={12} />{" "}
                  {draft.aiImage ? "Replace AI Image" : "Upload AI Image"}
                  <input type="file" accept="image/*" onChange={uploadAi} />
                </label>
                {draft.aiImage && (
                  <button
                    type="button"
                    onClick={() => update("aiImage", "")}
                    className="seller-clear-button"
                  >
                    Clear
                  </button>
                )}
              </section>
            </div>
          </SpecSection>
        </form>
        <footer className="seller-spec-actions">
          <span>
            <Check size={12} /> Auto-saved draft moments ago
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
              form="rim-spec-form"
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
function SellerSpecNav() {
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
  icon?: React.ReactNode;
  title: string;
  description: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="seller-spec-section">
      <header>
        {icon && <span>{icon}</span>}
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
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <label className="seller-spec-field seller-spec-textarea">
      <span>{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
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
