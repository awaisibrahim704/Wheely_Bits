import { useMemo, useState } from "react";
import {
  Car,
  Eye,
  MapPin,
  Package,
  Pencil,
  Rocket,
  ShieldCheck,
  Wrench,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { publishSellerProduct, updateSellerProduct } from "../lib/sellerApi";

const listingKey = "wheelybits:product-listing-draft";
type Draft = {
  category?: string;
  brand?: string;
  productName?: string;
  price?: string;
  stock?: string;
  condition?: string;
  description?: string;
  diameter?: string;
  width?: string;
  pcd?: string;
  offset?: string;
  centerBore?: string;
  material?: string;
  color?: string;
  loadIndex?: string;
  speedRating?: string;
  tyreType?: string;
  vehicles?: Array<{ make: string; model: string }>;
  gallery?: string[];
};
function readDraft(): Draft {
  try {
    return JSON.parse(window.localStorage.getItem(listingKey) ?? "{}");
  } catch {
    return {};
  }
}

export default function SellerProductPreview() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const draft = useMemo(readDraft, []);
  const [customerView, setCustomerView] = useState(false);
  const [published, setPublished] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [publishError, setPublishError] = useState("");
  const editingProductId = window.localStorage.getItem(
    "wheelybits:editing-product-id",
  );
  const isTyre = draft.category === "tyres" || Boolean(draft.tyreType);
  const productName =
    draft.productName ||
    (isTyre ? "Pilot Sport 4 S" : "Vossen Hybrid Forged HF-5 Monoblock");
  const brand = draft.brand || (isTyre ? "Michelin" : "Vossen Wheels");
  const stock = draft.stock || (isTyre ? "12" : "5");
  const vehicles = draft.vehicles ?? [];
  const details = isTyre
    ? [
        ["Width", `${draft.width || "225"} mm`],
        ["Aspect Ratio", "45%"],
        ["Rim Diameter", `${draft.diameter || "18"} inch`],
        ["Load Index", draft.loadIndex || "95 (690 kg)"],
        ["Speed Rating", draft.speedRating || "Y"],
        ["Tyre Type", draft.tyreType || "Summer Compound"],
      ]
    : [
        ["Diameter", draft.diameter || "19 inch"],
        ["Width", draft.width || "9.5J"],
        ["PCD / Bolt Pattern", draft.pcd || "5x114.3"],
        ["Offset (ET)", draft.offset || "+35mm"],
        ["Center Bore", draft.centerBore || "73.1mm"],
        ["Material", draft.material || "Forged 6061-T6"],
      ];
  const editPath = isTyre
    ? "/seller/products/tyre-specifications"
    : "/seller/products/specifications";
  const publish = async () => {
    if (!user?.uid) {
      setPublishError("You must be signed in before publishing a product.");
      return;
    }
    setPublishing(true);
    setPublishError("");
    window.localStorage.setItem(
      listingKey,
      JSON.stringify({ ...draft, status: "published" }),
    );
    try {
      if (editingProductId) {
        await updateSellerProduct(editingProductId, {
          ...draft,
          userId: user.uid,
        });
        window.localStorage.removeItem("wheelybits:editing-product-id");
      } else {
        await publishSellerProduct({ ...draft, userId: user.uid });
      }
      setPublished(true);
    } catch (publishErrorValue) {
      setPublishError(
        publishErrorValue instanceof Error
          ? publishErrorValue.message
          : "Product could not be published.",
      );
    } finally {
      setPublishing(false);
    }
  };

  return (
    <div className="seller-preview-page">
      <PreviewNav customerView={customerView} />
      <main className="seller-preview-content">
        <div className="seller-spec-breadcrumb">
          Seller Dashboard / Add Product / <strong>Preview & Publish</strong>
          <span className="seller-preview-id">#RM-PREVIEW</span>
        </div>
        <header className="seller-preview-header">
          <div>
            <h1>Review Your Product</h1>
            <p>
              Make sure everything looks correct before publishing your listing.
              This is exactly how customers on Wheely Bits will see and
              configure your product.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setCustomerView((value) => !value)}
            className="seller-button seller-button-muted"
          >
            <Eye size={13} /> Marketplace Customer View
          </button>
        </header>
        <section className="seller-preview-card">
          <div className="seller-preview-status">
            <span>
              <ShieldCheck size={12} /> Verified Wheely Bits Fitment Engine
              Synchronized
            </span>
            <span>
              SKU: WB-{isTyre ? "TR" : "VOS"}-DRAFT{" "}
              <b>
                In Stock ({stock} {isTyre ? "Units" : "Sets"})
              </b>
            </span>
          </div>
          <div className="seller-preview-main">
            <div className="seller-preview-media">
              <div className="seller-preview-image">
                {draft.gallery?.[0] ? (
                  <img src={draft.gallery[0]} alt={productName} />
                ) : (
                  <PreviewProductIcon tyre={isTyre} />
                )}
              </div>
              <div className="seller-preview-thumbs">
                <div className="seller-thumb-active">Primary</div>
                <div>3/4 Angle</div>
                <div>{isTyre ? "Tread Profile" : "Concave Lip"}</div>
                <div>Details</div>
              </div>
              <MerchantCard />
            </div>
            <div className="seller-preview-details">
              <span className="seller-preview-category">
                CATEGORY: {isTyre ? "TYRES" : "WHEELS & RIMS"}
              </span>
              <h2>{productName}</h2>
              <p className="seller-preview-meta">
                Brand: <strong>{brand}</strong>　 Condition:{" "}
                <strong>
                  {draft.condition || "Brand New (Factory Sealed)"}
                </strong>
              </p>
              <p className="seller-preview-finish">
                {isTyre
                  ? `${draft.tyreType || "Summer Compound"} | ${draft.speedRating || "Y Speed Rating"}`
                  : `Finish: ${draft.color || "Satin Black & Diamond Polished"}`}
              </p>
              <div className="seller-preview-price">
                <small>
                  PRICE ({isTyre ? "SINGLE TYRE" : "SET OF 4 RIMS"})
                </small>
                <strong>
                  PKR {draft.price || (isTyre ? "315.00" : "2,450.00")}
                </strong>
                <span>PKR</span>
              </div>
              <h3>Product Description</h3>
              <p className="seller-preview-description">
                {draft.description ||
                  "The premium product is configured with precision engineering, durable construction, and verified fitment data for an accurate customer purchase experience."}
              </p>
              <h3>
                Specifications & Geometry{" "}
                <small>Fitment Engine Calibrated</small>
              </h3>
              <div className="seller-preview-spec-grid">
                {details.map(([label, value]) => (
                  <div key={label}>
                    <small>{label}</small>
                    <strong>{value}</strong>
                  </div>
                ))}
              </div>
              <h3>
                Compatible Vehicles <small>{vehicles.length} ATTACHED</small>
              </h3>
              <div className="seller-preview-vehicles">
                {vehicles.slice(0, 3).map((vehicle, index) => (
                  <span key={`${vehicle.make}-${index}`}>
                    <Car size={11} /> {vehicle.make}{" "}
                    <small>{vehicle.model}</small>
                  </span>
                ))}
              </div>
              <div className="seller-preview-customer-actions">
                <span>Customer View: Add to Cart & Fitment Verification</span>
                <button type="button">
                  <Package size={12} /> Customer Buy Button Preview
                </button>
              </div>
            </div>
          </div>
        </section>
        {publishError && (
          <p role="alert" className="seller-publish-error">
            {publishError}
          </p>
        )}
        {published && (
          <p role="status" className="seller-publish-success">
            {editingProductId
              ? "Product updated successfully."
              : "Product added successfully."}
          </p>
        )}
        <footer className="seller-preview-actions">
          <div>
            <button
              type="button"
              onClick={() => navigate(editPath)}
              className="seller-button seller-button-muted"
            >
              <Pencil size={13} /> Edit Product
            </button>
            <button
              type="button"
              onClick={() =>
                window.localStorage.setItem(listingKey, JSON.stringify(draft))
              }
              className="seller-button seller-button-muted"
            >
              Save as Draft
            </button>
          </div>
          <span>By publishing, you agree to Wheely Bits Merchant Policy</span>
          <button
            type="button"
            disabled={publishing}
            onClick={publish}
            className="seller-button seller-button-primary"
          >
            <Rocket size={13} />{" "}
            {publishing
              ? "Publishing..."
              : published
                ? "Product Published"
                : "Publish Product"}
          </button>
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

function PreviewNav({ customerView }: { customerView: boolean }) {
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
      <small>{customerView ? "Customer View" : "Draft Auto-Saved"}　 AP</small>
    </div>
  );
}
function PreviewProductIcon({ tyre }: { tyre: boolean }) {
  return (
    <div className={`seller-preview-product-icon ${tyre ? "tyre" : "rim"}`}>
      <Wrench size={70} strokeWidth={1} />
    </div>
  );
}
function MerchantCard() {
  return (
    <div className="seller-preview-merchant">
      <div>
        <span>AP</span>
        <strong>Apex Performance Wheels</strong>
        <small>
          Authorized automotive fitment specialist - Rawalpindi / Islamabad
        </small>
      </div>
      <b>
        ★ 4.9 <small>(118 Reviews)</small>
      </b>
      <footer>
        <span>
          <MapPin size={11} /> Free Nationwide Fitment Shipping
        </span>
        <span>
          <ShieldCheck size={11} /> Wheely Bits Guarantee
        </span>
      </footer>
    </div>
  );
}
