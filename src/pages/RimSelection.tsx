import FallbackImage from "../components/FallbackImage";
import { useEffect, useMemo, useState } from 'react';
import { Camera, ArrowRight, MapPin } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { getMarketplace, type MarketplaceData, type SellerDashboardProduct } from '../lib/sellerApi';

function isRimListing(product: SellerDashboardProduct) {
  const category = product.category?.toLowerCase() || '';
  const details = `${product.productName || ''} ${product.brand || ''} ${product.description || ''}`.toLowerCase();
  if (/(rim|wheel)/.test(category) && !/(tyre|tire)/.test(category)) return true;
  return /(rim|wheel|monoblock|forged|flow[- ]?formed|concave|mesh|spoke|racing)/.test(details) &&
    !/(tyre|tire)/.test(details);
}

function getRimType(product: SellerDashboardProduct) {
  const details = `${product.productName || ''} ${product.description || ''}`.toLowerCase();
  if (/multi[- ]piece|2[- ]piece|3[- ]piece/.test(details)) return 'Multi-Piece';
  if (/hybrid forged/.test(details)) return 'Hybrid Forged';
  if (/monoblock/.test(details)) return 'Monoblock';
  return 'Rim';
}

export default function RimSelection() {
  const [marketplace, setMarketplace] = useState<MarketplaceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [marketplaceError, setMarketplaceError] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    getMarketplace()
      .then(setMarketplace)
      .catch((error: unknown) => {
        setMarketplaceError(
          error instanceof Error ? error.message : 'Marketplace data is unavailable.',
        );
      })
      .finally(() => setLoading(false));
  }, []);

  const rims = useMemo(
    () => (marketplace?.products ?? []).filter(isRimListing),
    [marketplace],
  );
  return (
    <div className="min-h-screen bg-surface text-on-surface p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Rim Selection</h1>
            <p className="text-on-surface-muted text-sm mt-1">Choose your preferred wheels or match via AI scan.</p>
          </div>
          <button 
            onClick={() => navigate('/ai-recognition')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-brand text-on-primary font-bold text-sm shadow-lg hover:opacity-90 transition-all"
          >
            <Camera className="w-4 h-4" /> AI Rim Scan
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {loading ? (
            <p className="col-span-full py-12 text-center text-on-surface-muted">Loading rim listings...</p>
          ) : rims.length > 0 ? (
            rims.map((rim) => {
              const title = rim.productName || 'Rim listing';
              const price = Number(rim.price);
              const priceLabel = Number.isFinite(price)
                ? `PKR ${price.toLocaleString()}`
                : rim.price || 'Contact vendor';
              const image = rim.gallery?.[0] || rim.aiImage;
              return (
                <article
                  key={rim._id}
                  className="bg-surface-high/60 backdrop-blur-md rounded-3xl overflow-hidden transition-all duration-300 group flex flex-col border border-white/10 hover:border-primary-brand/50 hover:shadow-xl"
                >
                  <div className="relative h-64 overflow-hidden bg-surface-highest">
                    <FallbackImage
                      key={image || rim._id}
                      src={image}
                      alt={title}
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 right-4 bg-surface/90 px-3 py-1 rounded-full text-xs font-bold">
                      {Number(rim.stock || 0) > 0 ? 'In stock' : 'Check availability'}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                    <div>
                      <span className="text-xs font-semibold text-primary-brand uppercase tracking-wider">
                        {rim.brand || getRimType(rim)}
                      </span>
                      <h2 className="text-xl font-bold mt-0.5">{title}</h2>
                      <p className="text-sm text-on-surface-muted mt-1 line-clamp-2">
                        {rim.description || getRimType(rim)}
                      </p>
                      <p className="mt-3 flex items-center gap-1 text-xs text-on-surface-muted">
                        <MapPin className="h-3.5 w-3.5" />
                        {rim.vendorName || 'Marketplace vendor'}
                        {rim.vendorLocation ? ` · ${rim.vendorLocation}` : ''}
                      </p>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <span className="text-lg font-extrabold text-primary-brand">{priceLabel}</span>
                      <Link
                        to={`/rim/detail/${encodeURIComponent(rim._id)}`}
                        className="flex items-center gap-1 text-sm font-bold text-on-surface hover:text-primary-brand transition-colors"
                      >
                        Details <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })
          ) : (
            <p className="col-span-full rounded-2xl border border-white/10 py-12 text-center text-on-surface-muted">
              {marketplaceError
                ? `Unable to load vendor rim listings: ${marketplaceError}`
                : 'No vendor rim listings are available yet.'}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
