import FallbackImage from "../components/FallbackImage";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, RotateCw, Maximize, Palette, Droplet } from 'lucide-react';

export default function WrapVisualization() {
  const [view, setView] = useState('Front 3/4');
  const selectedColor = '#8c928b'; // Mock selected Nardo Grey

  return (
    <div className="flex flex-col min-h-screen bg-surface-dim overflow-hidden relative">
      
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px]"></div>
        
        {/* Dynamic lighting based on wrap color */}
        <div 
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[800px] blur-[150px] rounded-full pointer-events-none opacity-40 transition-colors duration-1000"
          style={{ backgroundColor: selectedColor }}
        ></div>
        
        {/* Mock 3D Car Image */}
        <div className="absolute inset-0 flex items-center justify-center p-12 pt-24">
          <div 
            className="w-full h-full max-w-7xl relative transition-all duration-700 ease-in-out drop-shadow-2xl"
            style={{
              filter: `drop-shadow(0 40px 50px rgba(0,0,0,0.6))`
            }}
          >
            <FallbackImage
              src="https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=2000&auto=format&fit=crop" 
              alt="Wrap Visualization" 
              className="w-full h-full object-contain mix-blend-screen opacity-90 transition-transform duration-1000" 
              style={{
                maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)'
              }}
            />
          </div>
        </div>
      </div>

      {/* Top Header Layer */}
      <div className="relative z-10 p-6 md:p-12 flex justify-between items-start pointer-events-none">
        <div className="flex items-center gap-4 pointer-events-auto">
          <Link to="/wrap/color" className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-on-surface hover:bg-white/10 transition-colors shadow-lg">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div className="bg-background/80 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 shadow-lg flex items-center gap-4">
            <div className="w-8 h-8 rounded-full border border-white/20" style={{ backgroundColor: selectedColor }}></div>
            <div>
              <h1 className="text-xl font-medium tracking-tight">Nardo Grey</h1>
              <p className="text-sm text-on-surface-muted mt-1 uppercase tracking-widest font-bold">Gloss Finish</p>
            </div>
          </div>
        </div>
        
        <div className="flex gap-3 pointer-events-auto">
          <button className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-on-surface hover:bg-white/10 transition-colors shadow-lg group relative tooltip-trigger">
            <Droplet className="w-5 h-5" />
            <span className="absolute -bottom-10 bg-surface-highest px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">Toggle Reflections</span>
          </button>
          <button className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-on-surface hover:bg-white/10 transition-colors shadow-lg group relative tooltip-trigger">
            <Palette className="w-5 h-5" />
            <span className="absolute -bottom-10 right-0 bg-surface-highest px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">Quick Color Swap</span>
          </button>
          <button className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-on-surface hover:bg-white/10 transition-colors shadow-lg hidden md:flex group relative tooltip-trigger">
            <Maximize className="w-5 h-5" />
            <span className="absolute -bottom-10 right-0 bg-surface-highest px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/10">Fullscreen</span>
          </button>
        </div>
      </div>

      {/* Bottom Controls Layer */}
      <div className="relative z-10 mt-auto p-6 md:p-12 pointer-events-none flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* View Angles */}
        <div className="bg-background/80 backdrop-blur-xl rounded-full p-2 border border-white/10 flex items-center gap-2 pointer-events-auto shadow-2xl">
          {['Front 3/4', 'Side', 'Rear 3/4', 'Top'].map((angle) => (
            <button 
              key={angle}
              onClick={() => setView(angle)}
              className={`px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-colors ${
                view === angle 
                  ? 'bg-primary-brand/20 text-primary-brand border border-primary-brand/30' 
                  : 'text-on-surface-muted hover:text-on-surface hover:bg-white/5 border border-transparent'
              }`}
            >
              {angle}
            </button>
          ))}
          <div className="w-px h-8 bg-white/10 mx-2 hidden md:block"></div>
          <button className="w-10 h-10 rounded-full items-center justify-center text-on-surface hover:bg-white/10 transition-colors hidden md:flex">
            <RotateCw className="w-5 h-5" />
          </button>
        </div>

        {/* Action Panel */}
        <div className="bg-background/80 backdrop-blur-xl p-6 rounded-3xl border border-white/10 flex items-center gap-8 shadow-2xl pointer-events-auto">
          <Link 
            to="/wrap/vendor"
            className="bg-primary-brand hover:brightness-110 text-on-primary font-bold px-10 py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-primary-brand/20 uppercase tracking-widest text-sm"
          >
            Find Installers
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>

    </div>
  );
}
