import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShieldCheck, CheckCircle2, Star, SlidersHorizontal, Sparkles } from 'lucide-react';

const RIM_DETAILS: Record<string, {
  brand: string;
  model: string;
  type: string;
  finish: string;
  price: string;
  rating: number;
  reviews: number;
  description: string;
  specs: { label: string; value: string }[];
  image: string;
}> = {
  'vossen-hf5': {
    brand: 'Vossen',
    model: 'HF-5',
    type: 'Hybrid Forged',
    finish: 'Gloss Gunmetal',
    price: '$850 / ea',
    rating: 4.9,
    reviews: 142,
    description: 'Derived from its forged counterpart, the S21-01, the Vossen HF-5 features Y-spoke geometry and aggressive undercut pockets for maximum performance and strength.',
    specs: [
      { label: 'Construction', value: 'Hybrid Forged (Flow Formed)' },
      { label: 'Available Diameters', value: '19", 20", 21", 22"' },
      { label: 'Standard Finishes', value: 'Gloss Gunmetal, Satin Black' },
      { label: 'Custom Finishes', value: '9 Custom Options Available' },
      { label: 'Load Rating', value: '950 kg per wheel' },
      { label: 'Warranty', value: 'Lifetime Structural / 5-Yr Finish' },
    ],
    image: 'https://images.unsplash.com/photo-1582596521319-3c35f793b8f6?auto=format&fit=crop&w=800&q=80'
  },
  'bbs-lm': {
    brand: 'BBS',
    model: 'LM',
    type: 'Multi-Piece Forged',
    finish: 'Diamond Black',
    price: '$1,200 / ea',
    rating: 5.0,
    reviews: 289,
    description: 'The iconic 2-piece die-forged aluminum wheel. Features the classic BBS motorsport cross-spoke design with polished rim barrel.',
    specs: [
      { label: 'Construction', value: '2-Piece Die-Forged' },
      { label: 'Available Diameters', value: '17", 18", 19", 20"' },
      { label: 'Standard Finishes', value: 'Diamond Black, Gold, Silver' },
      { label: 'Load Rating', value: '880 kg per wheel' },
      { label: 'Warranty', value: 'Lifetime Structural' },
    ],
    image: 'https://images.unsplash.com/photo-1600712242805-9f72877b0492?auto=format&fit=crop&w=800&q=80'
  },
  'rotiform-las-r': {
    brand: 'Rotiform',
    model: 'LAS-R',
    type: 'Monoblock',
    finish: 'Matte Black',
    price: '$350 / ea',
    rating: 4.7,
    reviews: 94,
    description: 'Distinctive multi-spoke design with integrated aero dish aesthetic. Engineered for daily street performance and clean stance fitment.',
    specs: [
      { label: 'Construction', value: 'Cast Monoblock' },
      { label: 'Available Diameters', value: '17", 18", 19", 20"' },
      { label: 'Standard Finishes', value: 'Matte Black, Silver' },
      { label: 'Load Rating', value: '750 kg per wheel' },
      { label: 'Warranty', value: '1-Year Limited' },
    ],
    image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80'
  }
};

export default function RimDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const rim = (id && RIM_DETAILS[id]) ? RIM_DETAILS[id] : RIM_DETAILS['vossen-hf5'];

  return (
    <div className="flex flex-col min-h-full pb-24 text-on-surface">
      {/* Header */}
      <div className="max-w-[1280px] mx-auto w-full px-4 md:px-12 pt-8 mb-8">
        <div className="flex items-center gap-4 mb-6">
          <button 
            onClick={() => navigate(-1)} 
            className="w-10 h-10 rounded-full bg-surface-high border border-white/10 flex items-center justify-center text-on-surface hover:bg-white/5 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <span className="text-xs font-bold text-primary-brand uppercase tracking-widest">{rim.brand} Series</span>
            <h1 className="text-4xl md:text-5xl font-medium text-on-surface tracking-tight">{rim.brand} {rim.model}</h1>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="max-w-[1280px] mx-auto w-full px-4 md:px-12 flex-grow grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Image Preview */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <div className="relative aspect-[4/3] rounded-3xl overflow-hidden bg-surface-high border border-white/10 shadow-2xl group">
            <img 
              src={rim.image} 
              alt={`${rim.brand} ${rim.model}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            />
            <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-primary-brand" />
              <span className="text-xs font-bold uppercase tracking-widest text-on-surface">{rim.type}</span>
            </div>
            <div className="absolute bottom-4 right-4 bg-background/80 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 flex items-center gap-2">
              <Star className="w-4 h-4 text-secondary-brand fill-secondary-brand" />
              <span className="font-bold text-sm text-on-surface">{rim.rating}</span>
              <span className="text-xs text-on-surface-muted">({rim.reviews} Reviews)</span>
            </div>
          </div>

          {/* Key Highlights */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-surface-high/60 backdrop-blur-md p-4 rounded-2xl border border-white/5 text-center">
              <span className="block text-[10px] text-on-surface-muted uppercase tracking-widest font-bold mb-1">Process</span>
              <span className="text-sm font-semibold text-primary-brand">{rim.type}</span>
            </div>
            <div className="bg-surface-high/60 backdrop-blur-md p-4 rounded-2xl border border-white/5 text-center">
              <span className="block text-[10px] text-on-surface-muted uppercase tracking-widest font-bold mb-1">Finish</span>
              <span className="text-sm font-semibold text-on-surface">{rim.finish}</span>
            </div>
            <div className="bg-surface-high/60 backdrop-blur-md p-4 rounded-2xl border border-white/5 text-center">
              <span className="block text-[10px] text-on-surface-muted uppercase tracking-widest font-bold mb-1">Fitment Status</span>
              <span className="text-sm font-semibold text-emerald-400 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Specs & Next Step */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6">
          <div className="bg-surface-high/60 backdrop-blur-md p-8 rounded-3xl border border-white/5 shadow-xl space-y-6">
            <div className="flex justify-between items-baseline border-b border-white/10 pb-4">
              <div>
                <h3 className="text-xs font-bold text-on-surface-muted uppercase tracking-widest">Model Price</h3>
                <span className="text-3xl font-bold text-primary-brand">{rim.price}</span>
              </div>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-3 py-1 rounded-full border border-emerald-400/20">
                In Stock
              </span>
            </div>

            <p className="text-sm text-on-surface-muted leading-relaxed">
              {rim.description}
            </p>

            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold text-on-surface-muted uppercase tracking-widest">Technical Specifications</h4>
              <div className="divide-y divide-white/5 text-sm">
                {rim.specs.map((spec, idx) => (
                  <div key={idx} className="py-2.5 flex justify-between items-center">
                    <span className="text-on-surface-muted">{spec.label}</span>
                    <span className="font-semibold text-on-surface">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-primary-brand shrink-0" />
              <span className="text-xs text-on-surface-muted">Includes Wheely Bits Precision Guarantee for brake & strut clearance.</span>
            </div>
          </div>

          {/* Action CTA */}
          <Link 
            to="/fitment-engine"
            className="w-full bg-primary-brand hover:brightness-110 text-on-primary font-bold py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-primary-brand/20 uppercase tracking-widest text-sm"
          >
            <SlidersHorizontal className="w-5 h-5" />
            Proceed to Fitment Engine
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
