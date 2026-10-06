import FallbackImage from "../components/FallbackImage";
import { Link } from 'react-router-dom';
import { ArrowRight, Palette, Shield, Sparkles } from 'lucide-react';

const STYLES = [
  {
    id: 'color-change',
    title: 'Color Change',
    description: 'Completely transform the look of your vehicle with premium vinyl films in gloss, satin, matte, or colorshift finishes.',
    icon: Palette,
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=800&auto=format&fit=crop',
    link: '/wrap/color'
  },
  {
    id: 'ppf',
    title: 'Paint Protection (PPF)',
    description: 'Invisible, self-healing polyurethane film that protects your factory paint from rock chips, scratches, and UV damage.',
    icon: Shield,
    image: 'https://images.unsplash.com/photo-1632823471565-3cefc4589b2f?q=80&w=800&auto=format&fit=crop',
    link: '/wrap/color'
  },
  {
    id: 'custom-livery',
    title: 'Custom Livery',
    description: 'Work with our partnered designers to create a one-off racing livery or commercial graphic for your vehicle.',
    icon: Sparkles,
    image: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=800&auto=format&fit=crop',
    link: '/wrap/color'
  }
];

export default function WrapStyles() {
  return (
    <div className="flex flex-col min-h-full pb-24 relative overflow-hidden">
      
      {/* Background elements */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary-brand/10 blur-[150px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-secondary-brand/10 blur-[150px] rounded-full pointer-events-none"></div>

      {/* Header */}
      <div className="max-w-[1280px] mx-auto w-full px-4 md:px-12 pt-16 mb-16 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-medium text-on-surface tracking-tight mb-6 animate-fade-up">Select Wrap Type</h1>
        <p className="text-on-surface-muted text-lg max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: '100ms' }}>
          Choose the foundation of your aesthetic transformation. Whether you want a bold new color or invisible protection.
        </p>
      </div>

      {/* Options Grid */}
      <div className="max-w-[1280px] mx-auto w-full px-4 md:px-12 flex-grow relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {STYLES.map((style, index) => {
            const Icon = style.icon;
            return (
              <Link 
                key={style.id}
                to={style.link}
                className="group relative bg-surface-high/60 backdrop-blur-md rounded-3xl border border-white/5 overflow-hidden transition-all duration-500 hover:border-primary-brand/50 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(171,207,178,0.1)] flex flex-col h-[500px]"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                {/* Image Background */}
                <div className="absolute inset-0 z-0">
                  <div className="absolute inset-0 bg-gradient-to-b from-surface-highest/80 via-surface-highest/40 to-surface-highest/95 z-10 group-hover:from-surface-highest/60 group-hover:to-surface-highest/90 transition-colors duration-500"></div>
                  <FallbackImage
                    src={style.image} 
                    alt={style.title} 
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700"
                  />
                </div>

                {/* Content */}
                <div className="relative z-20 flex flex-col h-full p-8 md:p-10">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-auto group-hover:bg-primary-brand/20 group-hover:border-primary-brand/50 transition-colors duration-500">
                    <Icon className="w-8 h-8 text-white group-hover:text-primary-brand transition-colors duration-500" />
                  </div>
                  
                  <div>
                    <h2 className="text-3xl font-medium text-white mb-4 group-hover:text-primary-brand transition-colors duration-500">{style.title}</h2>
                    <p className="text-on-surface-muted/90 leading-relaxed mb-8 group-hover:text-white/90 transition-colors duration-500">
                      {style.description}
                    </p>
                    
                    <div className="inline-flex items-center gap-2 text-sm font-bold tracking-widest uppercase text-white group-hover:text-primary-brand transition-colors duration-500">
                      Select
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform duration-500" />
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
