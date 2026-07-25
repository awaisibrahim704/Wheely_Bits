import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Sun, Moon, Info } from 'lucide-react';

export default function TintVisualization() {
  const [timeOfDay, setTimeOfDay] = useState<'day' | 'night'>('day');
  
  // Mock data
  const vlt = 35;
  const opacity = 1 - (vlt / 100);

  return (
    <div className="flex flex-col min-h-screen bg-black overflow-hidden relative">
      
      {/* Simulation Environment Background */}
      <div className="absolute inset-0 z-0 transition-colors duration-1000">
        <img 
          src={timeOfDay === 'day' 
            ? 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=2000&auto=format&fit=crop' // Sunny road
            : 'https://images.unsplash.com/photo-1506527506979-994df5877c48?q=80&w=2000&auto=format&fit=crop' // Night city
          }
          alt="Environment"
          className="w-full h-full object-cover transition-opacity duration-1000"
        />
        
        {/* Tint Overlay - applies the simulated VLT darkness */}
        <div 
          className="absolute inset-0 bg-black pointer-events-none transition-opacity duration-300"
          style={{ opacity: opacity }}
        ></div>

        {/* Interior frame overlay (Mock) */}
        <div className="absolute inset-0 border-[40px] border-black/90 pointer-events-none rounded-[100px] shadow-[inset_0_0_100px_rgba(0,0,0,0.8)] z-10"></div>
      </div>

      {/* Top Header Layer */}
      <div className="relative z-20 p-6 md:p-12 flex justify-between items-start pointer-events-none">
        <div className="flex items-center gap-4 pointer-events-auto">
          <Link to="/tint/shade" className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors shadow-lg">
            <ArrowLeft className="w-6 h-6" />
          </Link>
          <div className="bg-black/60 backdrop-blur-md px-6 py-3 rounded-2xl border border-white/20 shadow-lg text-white">
            <h1 className="text-xl font-medium tracking-tight">Interior View Simulation</h1>
            <p className="text-sm text-primary-brand font-mono mt-1">Ceramic Film | {vlt}% VLT</p>
          </div>
        </div>
      </div>

      {/* Center Reticle / Info (Optional aesthetic) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 opacity-30">
        <div className="w-32 h-32 border border-white/20 rounded-full flex items-center justify-center">
          <div className="w-1 h-1 bg-white rounded-full"></div>
        </div>
      </div>

      {/* Bottom Controls Layer */}
      <div className="relative z-20 mt-auto p-6 md:p-12 pointer-events-none flex flex-col md:flex-row justify-between items-end md:items-center gap-6">
        
        {/* Environment Toggle */}
        <div className="bg-black/60 backdrop-blur-xl rounded-full p-2 border border-white/20 flex items-center gap-2 pointer-events-auto shadow-2xl">
          <button 
            onClick={() => setTimeOfDay('day')}
            className={`px-6 py-3 rounded-full flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors ${
              timeOfDay === 'day' 
                ? 'bg-primary-brand text-on-primary' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            <Sun className="w-4 h-4" />
            Day
          </button>
          <button 
            onClick={() => setTimeOfDay('night')}
            className={`px-6 py-3 rounded-full flex items-center gap-2 text-xs font-bold uppercase tracking-widest transition-colors ${
              timeOfDay === 'night' 
                ? 'bg-blue-600 text-white' 
                : 'text-white hover:bg-white/10'
            }`}
          >
            <Moon className="w-4 h-4" />
            Night
          </button>
        </div>

        {/* Action Panel */}
        <div className="bg-black/60 backdrop-blur-xl p-6 rounded-3xl border border-white/20 flex items-center gap-8 shadow-2xl pointer-events-auto">
          <div className="flex flex-col text-white">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-white/50 uppercase tracking-widest">Est. Install Total</span>
              <Info className="w-4 h-4 text-white/50" />
            </div>
            <span className="text-3xl font-medium">$450</span>
          </div>
          
          <Link 
            to="/tint/vendor"
            className="bg-primary-brand hover:brightness-110 text-on-primary font-bold px-10 py-5 rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-primary-brand/20 uppercase tracking-widest text-sm border border-transparent"
          >
            Find Installers
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>

      </div>
    </div>
  );
}
