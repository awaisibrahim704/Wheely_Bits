import FallbackImage from "../components/FallbackImage";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, RotateCw, Maximize, Share2, Info } from 'lucide-react';

export default function RimVisualization() {
  const navigate = useNavigate();
  const [view, setView] = useState('Front 3/4');

  return (
    <div className="flex flex-col min-h-screen bg-surface-dim overflow-hidden relative">
      
      {/* 3D Canvas Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:48px_48px]"></div>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary-brand/5 blur-[120px] rounded-full pointer-events-none"></div>
        
        {/* Mock 3D Car Image */}
        <div className="absolute inset-0 flex items-center justify-center p-12 pt-24">
          <FallbackImage
            src="https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=2000&auto=format&fit=crop" 
            alt="3D Visualization" 
            className="w-full h-full max-w-6xl object-contain mix-blend-screen opacity-90 drop-shadow-2xl transition-transform duration-1000 scale-105" 
            style={{
              maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
            }}
          />
        </div>
      </div>

      {/* Top Header Layer */}
      <div className="relative z-10 p-6 md:p-12 flex justify-between items-start pointer-events-none">
        <div className="flex items-center gap-4 pointer-events-auto">
          <button onClick={() => navigate(-1)} className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-on-surface hover:bg-white/10 transition-colors shadow-lg">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="bg-background/80 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/10 shadow-lg">
            <h1 className="text-xl font-medium tracking-tight">BBS FI-R on GT3 RS</h1>
            <p className="text-sm text-primary-brand font-mono mt-1">20" x 10.5J | ET+35</p>
          </div>
        </div>
        
        <div className="flex gap-3 pointer-events-auto">
          <button className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-on-surface hover:bg-white/10 transition-colors shadow-lg">
            <Share2 className="w-5 h-5" />
          </button>
          <button className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-md border border-white/10 flex items-center justify-center text-on-surface hover:bg-white/10 transition-colors shadow-lg">
            <Maximize className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Bottom Controls Layer */}
      <div className="relative z-10 mt-auto p-6 md:p-12 pointer-events-none flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* View Angles */}
        <div className="bg-background/80 backdrop-blur-xl rounded-full p-2 border border-white/10 flex items-center gap-2 pointer-events-auto shadow-2xl">
          {['Front 3/4', 'Side', 'Rear 3/4'].map((angle) => (
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
          <div className="w-px h-8 bg-white/10 mx-2"></div>
          <button className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface hover:bg-white/10 transition-colors">
            <RotateCw className="w-5 h-5" />
          </button>
        </div>

        {/* Action Panel */}
        <div className="bg-background/80 backdrop-blur-xl p-6 rounded-3xl border border-white/10 flex items-center gap-8 shadow-2xl pointer-events-auto">
          <div className="flex flex-col">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-on-surface-muted uppercase tracking-widest">Est. Build Total</span>
              <Info className="w-4 h-4 text-on-surface-muted" />
            </div>
            <span className="text-3xl font-medium text-on-surface">$2,200</span>
          </div>
          
          <Link 
            to="/rim/vendor"
            className="bg-primary-brand hover:brightness-110 text-on-primary font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-primary-brand/20 uppercase tracking-widest text-sm"
          >
            Find Installers
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>

    </div>
  );
}
