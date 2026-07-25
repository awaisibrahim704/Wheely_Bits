import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ShieldAlert, Info } from 'lucide-react';

export default function TintShadeSelection() {
  const [vlt, setVlt] = useState(35);

  // Determine legality and characteristics based on VLT
  const isDark = vlt <= 20;
  const isLegalFront = vlt >= 70; // CA law example
  
  return (
    <div className="flex flex-col min-h-full pb-24">
      {/* Header */}
      <div className="max-w-[1024px] mx-auto w-full px-4 md:px-12 pt-8 mb-12">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/tint/types" className="w-10 h-10 rounded-full bg-surface-high border border-white/10 flex items-center justify-center text-on-surface hover:bg-white/5 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-4xl md:text-5xl font-medium text-on-surface tracking-tight">Select Shade</h1>
          </div>
        </div>
        <p className="text-on-surface-muted text-lg max-w-2xl">
          Choose your desired Visible Light Transmission (VLT). Lower percentages mean darker film and less light entering the cabin.
        </p>
      </div>

      <div className="max-w-[1024px] mx-auto w-full px-4 md:px-12 flex-grow flex flex-col items-center">
        
        {/* Main VLT Display */}
        <div className="w-full bg-surface-high/60 backdrop-blur-md rounded-3xl border border-white/5 shadow-2xl p-8 md:p-16 mb-8 text-center relative overflow-hidden">
          
          {/* Dynamic Background representing darkness */}
          <div 
            className="absolute inset-0 z-0 transition-opacity duration-300"
            style={{ 
              backgroundColor: '#000',
              opacity: 1 - (vlt / 100)
            }}
          ></div>
          
          <div className="relative z-10">
            <h2 className="text-[120px] md:text-[180px] font-light leading-none tracking-tighter text-white drop-shadow-2xl font-mono">
              {vlt}<span className="text-4xl md:text-6xl">%</span>
            </h2>
            <p className="text-xl font-medium tracking-widest uppercase text-white/80 mt-4">VLT (Visible Light Transmission)</p>
          </div>
        </div>

        {/* Controls */}
        <div className="w-full max-w-2xl mb-12">
          <input 
            type="range" 
            min="5" max="90" step="5" 
            value={vlt} 
            onChange={(e) => setVlt(Number(e.target.value))}
            className="w-full accent-primary-brand bg-surface-highest h-3 rounded-lg appearance-none cursor-pointer" 
          />
          <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-on-surface-muted mt-4">
            <span>5% (Limo)</span>
            <span>35% (Medium)</span>
            <span>90% (Clear)</span>
          </div>
        </div>

        {/* Info & Warnings */}
        <div className="w-full max-w-2xl space-y-4">
          
          {/* Characteristic Info */}
          <div className="bg-surface-highest/50 border border-white/5 rounded-2xl p-6 flex gap-4">
            <Info className="w-6 h-6 text-primary-brand shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-on-surface uppercase tracking-widest mb-1">Film Characteristics</h4>
              <p className="text-sm text-on-surface-muted leading-relaxed">
                {isDark 
                  ? 'Provides maximum privacy and glare reduction. Excellent for rear windows and passengers.' 
                  : 'Provides a clean, subtle look while still offering superior heat and UV rejection without compromising nighttime visibility.'}
              </p>
            </div>
          </div>

          {/* Legal Warning (Mock) */}
          {!isLegalFront && (
            <div className="bg-secondary-brand/10 border border-secondary-brand/30 rounded-2xl p-6 flex gap-4 animate-fade-in shadow-lg">
              <ShieldAlert className="w-6 h-6 text-secondary-brand shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-secondary-brand uppercase tracking-widest mb-1">Legal Notice</h4>
                <p className="text-sm text-on-surface-muted leading-relaxed">
                  A VLT of {vlt}% on front side windows is below the legal limit in California (70%). This shade is recommended for rear windows only. Please check your local regulations.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Action Button */}
        <div className="w-full max-w-2xl mt-12">
          <Link 
            to="/tint/visualization"
            className="w-full bg-primary-brand text-on-primary font-bold py-5 rounded-2xl hover:brightness-110 transition-all shadow-lg shadow-primary-brand/20 active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest"
          >
            Preview Shade
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
