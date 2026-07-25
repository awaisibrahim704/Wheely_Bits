import { Link } from 'react-router-dom';
import { Shield, Droplet, Sun, ArrowRight } from 'lucide-react';

const TINT_TYPES = [
  {
    id: 'carbon',
    title: 'Carbon Film',
    description: 'Provides a dark, matte-finish look with moderate heat rejection. Does not contain metal, so it won\'t interfere with cellular or GPS signals.',
    price: '$$',
    heatRejection: 'Good',
    uvProtection: '99%',
    icon: Droplet,
  },
  {
    id: 'ceramic',
    title: 'Ceramic Film',
    description: 'The industry standard for premium tint. Contains ceramic particles that reject up to 90% of infrared heat while maintaining excellent visibility.',
    price: '$$$',
    heatRejection: 'Excellent',
    uvProtection: '99.9%',
    icon: Shield,
    popular: true
  },
  {
    id: 'crystalline',
    title: 'Crystalline',
    description: 'Ultimate performance film featuring multilayer nanotechnology. Rejects more heat than darker films without changing the appearance of your vehicle.',
    price: '$$$$',
    heatRejection: 'Superior',
    uvProtection: '99.9%',
    icon: Sun,
  }
];

export default function TintTypes() {
  return (
    <div className="flex flex-col min-h-full pb-24 relative overflow-hidden">
      
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-surface-highest via-background to-background"></div>
        {/* Subtle grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>
      </div>

      {/* Header */}
      <div className="max-w-[1280px] mx-auto w-full px-4 md:px-12 pt-16 mb-16 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-medium text-on-surface tracking-tight mb-6 animate-fade-up">Select Film Technology</h1>
        <p className="text-on-surface-muted text-lg max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '100ms' }}>
          Different tint technologies offer varying levels of heat rejection, glare reduction, and UV protection. Choose the right foundation for your needs.
        </p>
      </div>

      {/* Options Grid */}
      <div className="max-w-[1280px] mx-auto w-full px-4 md:px-12 flex-grow relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {TINT_TYPES.map((type, index) => {
            const Icon = type.icon;
            return (
              <div 
                key={type.id}
                className={`relative bg-surface-high/60 backdrop-blur-md rounded-3xl border overflow-hidden flex flex-col transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl ${type.popular ? 'border-primary-brand/50 shadow-[0_0_30px_rgba(171,207,178,0.1)]' : 'border-white/5 hover:border-white/20'}`}
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {type.popular && (
                  <div className="absolute top-0 inset-x-0 bg-primary-brand text-center py-1">
                    <span className="text-[10px] font-bold text-on-primary uppercase tracking-widest">Most Popular Choice</span>
                  </div>
                )}
                
                <div className="p-8 md:p-10 flex flex-col flex-grow pt-12">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center mb-6">
                    <Icon className={`w-8 h-8 ${type.popular ? 'text-primary-brand' : 'text-on-surface-muted'}`} />
                  </div>
                  
                  <h2 className="text-3xl font-medium text-on-surface mb-4">{type.title}</h2>
                  <p className="text-on-surface-muted leading-relaxed mb-8 h-24">
                    {type.description}
                  </p>
                  
                  <div className="space-y-4 mb-8 flex-grow">
                    <div className="flex justify-between items-center pb-4 border-b border-white/5">
                      <span className="text-sm font-bold uppercase tracking-widest text-on-surface-muted">Heat Rejection</span>
                      <span className={`text-sm font-bold ${type.popular ? 'text-primary-brand' : 'text-on-surface'}`}>{type.heatRejection}</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-white/5">
                      <span className="text-sm font-bold uppercase tracking-widest text-on-surface-muted">UV Protection</span>
                      <span className="text-sm font-bold text-on-surface">{type.uvProtection}</span>
                    </div>
                    <div className="flex justify-between items-center pb-4 border-b border-white/5">
                      <span className="text-sm font-bold uppercase tracking-widest text-on-surface-muted">Price Tier</span>
                      <span className="text-sm font-bold text-on-surface font-mono">{type.price}</span>
                    </div>
                  </div>
                  
                  <Link 
                    to="/tint/shade"
                    className={`w-full py-4 rounded-xl flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-sm transition-colors ${type.popular ? 'bg-primary-brand text-on-primary hover:brightness-110' : 'bg-surface-highest text-on-surface hover:bg-white/10 border border-white/10'}`}
                  >
                    Select {type.title}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
