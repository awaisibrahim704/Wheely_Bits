import FallbackImage from "../components/FallbackImage";
import { Link } from 'react-router-dom';
import { Search, MapPin, Star, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';

const VENDORS = [
  {
    id: 'aura-custom-studio',
    name: 'Aura Custom Studio',
    rating: 4.9,
    reviews: 128,
    distance: '2.4 mi',
    tags: ['XPEL Prime Certified', '3M Pro Shop', 'Computer Cut Tint'],
    image: 'https://images.unsplash.com/photo-1613214149922-f1809c99b414?q=80&w=800&auto=format&fit=crop',
    featured: true
  },
  {
    id: 'shade-masters',
    name: 'Shade Masters Auto Spa',
    rating: 4.7,
    reviews: 215,
    distance: '4.8 mi',
    tags: ['Llumar SelectPro', 'Same Day Service'],
    image: 'https://images.unsplash.com/photo-1599256621730-535171e2898b?q=80&w=800&auto=format&fit=crop',
    featured: false
  },
  {
    id: 'eclipse-window-tint',
    name: 'Eclipse Window Tint',
    rating: 4.8,
    reviews: 89,
    distance: '8.1 mi',
    tags: ['Ceramic Specialists', 'Lifetime Warranty'],
    image: 'https://images.unsplash.com/photo-1632823471565-3cefc4589b2f?q=80&w=800&auto=format&fit=crop',
    featured: false
  }
];

export default function TintVendor() {
  return (
    <div className="flex flex-col min-h-full pb-24">
      {/* Header */}
      <div className="max-w-[1024px] mx-auto w-full px-4 md:px-12 pt-8 mb-8">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/tint/visualization" className="w-10 h-10 rounded-full bg-surface-high border border-white/10 flex items-center justify-center text-on-surface hover:bg-white/5 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-4xl md:text-5xl font-medium text-on-surface tracking-tight">Select Tint Shop</h1>
          </div>
        </div>
        <p className="text-on-surface-muted text-lg mb-8 max-w-2xl">
          Choose a certified tint installation facility in your area. All partners use precision computer-cutting technology for perfect fitment without risking razor scratches on your glass.
        </p>

        {/* Search & Location Bar */}
        <div className="flex flex-col md:flex-row gap-4 bg-surface-high/60 backdrop-blur-md p-3 rounded-2xl border border-white/5 shadow-lg">
          <div className="relative flex-grow">
            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-brand" />
            <input 
              type="text" 
              defaultValue="Los Angeles, CA" 
              className="w-full bg-background border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary-brand focus:ring-1 focus:ring-primary-brand text-on-surface font-medium"
            />
          </div>
          <div className="relative flex-grow">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-muted" />
            <input 
              type="text" 
              placeholder="Search by name or specialty..." 
              className="w-full bg-background border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-primary-brand focus:ring-1 focus:ring-primary-brand text-on-surface"
            />
          </div>
        </div>
      </div>

      {/* Vendor List */}
      <div className="max-w-[1024px] mx-auto w-full px-4 md:px-12 flex flex-col gap-6">
        {VENDORS.map((vendor) => (
          <div 
            key={vendor.id} 
            className={`bg-surface-high/60 backdrop-blur-md rounded-3xl border overflow-hidden flex flex-col md:flex-row transition-all duration-300 hover:border-white/20 hover:shadow-xl group ${vendor.featured ? 'border-primary-brand/50 shadow-[0_0_30px_rgba(171,207,178,0.1)]' : 'border-white/5'}`}
          >
            <div className="md:w-1/3 aspect-video md:aspect-auto relative overflow-hidden">
              <FallbackImage
                src={vendor.image} 
                alt={vendor.name} 
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500 group-hover:scale-105"
              />
              {vendor.featured && (
                <div className="absolute top-4 left-4 bg-primary-brand text-on-primary px-3 py-1 rounded-lg text-xs font-bold tracking-widest uppercase flex items-center gap-1 shadow-lg">
                  <ShieldCheck className="w-4 h-4" />
                  Top Rated
                </div>
              )}
            </div>
            
            <div className="p-6 md:p-8 flex flex-col flex-grow justify-between">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-2xl font-medium text-on-surface">{vendor.name}</h2>
                  <div className="flex items-center gap-1 bg-surface-highest px-3 py-1.5 rounded-lg border border-white/5">
                    <Star className="w-4 h-4 text-secondary-brand fill-secondary-brand" />
                    <span className="font-bold text-on-surface">{vendor.rating}</span>
                    <span className="text-on-surface-muted text-sm">({vendor.reviews})</span>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 text-sm text-on-surface-muted mb-6">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{vendor.distance}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6 md:mb-0">
                  {vendor.tags.map(tag => (
                    <span key={tag} className="bg-white/5 border border-white/10 px-3 py-1 rounded-md text-xs font-bold text-on-surface-muted">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-4">
                <Link 
                  to={`/vendors/${vendor.id}`} 
                  className="px-6 py-3 rounded-xl border border-white/20 text-sm font-bold text-on-surface hover:bg-white/5 transition-colors"
                >
                  View Profile
                </Link>
                <Link 
                  to="/booking/schedule" 
                  className="bg-primary-brand text-on-primary px-6 py-3 rounded-xl text-sm font-bold hover:brightness-110 transition-colors flex items-center gap-2"
                >
                  Schedule Tint
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
