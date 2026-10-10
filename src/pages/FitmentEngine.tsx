import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, Info, SlidersHorizontal, ArrowRight, Activity, AlertTriangle } from 'lucide-react';

export default function FitmentEngine() {
  const navigate = useNavigate();
  const [diameter, setDiameter] = useState(20);
  const [width, setWidth] = useState(10.5);
  const [offset, setOffset] = useState(35);
  const [suspension, setSuspension] = useState('Stock');

  return (
    <div className="flex h-screen bg-background overflow-hidden text-on-surface">
      
      {/* LEFT MAIN: Visualization Canvas */}
      <main className="flex-1 relative flex flex-col bg-surface-dim">
        
        {/* Header */}
        <div className="absolute top-0 left-0 right-0 p-6 z-20 flex justify-between items-center pointer-events-none">
          <div className="flex items-center gap-4 pointer-events-auto">
            <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-surface-high/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-on-surface hover:bg-white/10 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="bg-surface-high/60 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
              <h1 className="font-medium">Porsche 911 GT3 RS</h1>
              <p className="text-xs text-on-surface-muted">Fitment Simulation</p>
            </div>
          </div>
          <div className="bg-surface-high/60 backdrop-blur-md rounded-full px-4 py-2 border border-white/10 flex items-center gap-2 shadow-lg pointer-events-auto">
            <Activity className="w-4 h-4 text-primary-brand" />
            <span className="text-xs font-bold tracking-widest uppercase">Engine Active</span>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary-brand/5 blur-[120px] rounded-full pointer-events-none"></div>

          {/* Wheel Placeholder Diagram */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-12">
            <div className="relative w-full max-w-2xl aspect-video rounded-3xl border border-white/10 bg-surface/40 backdrop-blur-sm overflow-hidden flex items-center justify-center shadow-2xl">
              {/* Abstract suspension geometry diagram */}
              <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at center, transparent 30%, #000 100%), linear-gradient(0deg, #121416 0%, transparent 100%)' }}></div>
              <div className="relative z-10 text-center">
                <h3 className="text-2xl font-light text-on-surface mb-2 font-mono">X-Axis Offset: {offset}mm</h3>
                <p className="text-on-surface-muted font-mono">Diameter: {diameter}" | Width: {width}"</p>
                
                {/* Visualizer bounds */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-primary-brand/30 rounded-full border-dashed animate-[spin_20s_linear_infinite]" style={{ width: `${diameter * 15}px`, height: `${diameter * 15}px` }}></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 border-2 border-secondary-brand/30 rounded-full" style={{ width: `${diameter * 15 - 40}px`, height: `${diameter * 15 - 40}px` }}></div>
              </div>
            </div>
            
            <div className="mt-8 bg-surface-high/60 backdrop-blur-md px-6 py-3 rounded-xl border border-white/10 flex items-center gap-3">
              <Info className="w-5 h-5 text-secondary-brand" />
              <span className="text-sm font-medium">Use the right panel to adjust parameters and calculate fitment bounds.</span>
            </div>
          </div>
        </div>
      </main>

      {/* RIGHT SIDEBAR: Parameters Panel */}
      <aside className="w-96 h-full bg-surface-high/80 backdrop-blur-xl border-l border-white/10 flex flex-col z-20 shadow-2xl flex-shrink-0">
        
        {/* Header */}
        <div className="h-16 flex items-center px-6 border-b border-white/10 shrink-0">
          <SlidersHorizontal className="w-5 h-5 text-primary-brand mr-3" />
          <h2 className="text-lg font-medium tracking-wide">Fitment Parameters</h2>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
          
          {/* Wheel Specs */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold text-on-surface-muted uppercase tracking-widest border-b border-white/10 pb-2">Wheel Dimensions</h3>
            
            {/* Diameter Slider */}
            <div>
              <div className="flex justify-between items-end mb-2">
                <label className="text-sm font-medium">Diameter</label>
                <span className="text-sm font-mono text-primary-brand bg-primary-brand/10 px-2 py-0.5 rounded">{diameter}"</span>
              </div>
              <input 
                type="range" 
                min="18" max="24" step="1" 
                value={diameter} 
                onChange={(e) => setDiameter(Number(e.target.value))}
                className="w-full accent-primary-brand bg-surface-highest h-2 rounded-lg appearance-none cursor-pointer" 
              />
              <div className="flex justify-between text-xs text-on-surface-muted mt-1 font-mono">
                <span>18"</span>
                <span>24"</span>
              </div>
            </div>

            {/* Width Slider */}
            <div>
              <div className="flex justify-between items-end mb-2">
                <label className="text-sm font-medium">Width</label>
                <span className="text-sm font-mono text-primary-brand bg-primary-brand/10 px-2 py-0.5 rounded">{width}J</span>
              </div>
              <input 
                type="range" 
                min="8" max="13" step="0.5" 
                value={width} 
                onChange={(e) => setWidth(Number(e.target.value))}
                className="w-full accent-primary-brand bg-surface-highest h-2 rounded-lg appearance-none cursor-pointer" 
              />
              <div className="flex justify-between text-xs text-on-surface-muted mt-1 font-mono">
                <span>8.0J</span>
                <span>13.0J</span>
              </div>
            </div>

            {/* Offset Slider */}
            <div>
              <div className="flex justify-between items-end mb-2">
                <label className="text-sm font-medium">Offset (ET)</label>
                <span className="text-sm font-mono text-primary-brand bg-primary-brand/10 px-2 py-0.5 rounded">+{offset}</span>
              </div>
              <input 
                type="range" 
                min="0" max="60" step="1" 
                value={offset} 
                onChange={(e) => setOffset(Number(e.target.value))}
                className="w-full accent-primary-brand bg-surface-highest h-2 rounded-lg appearance-none cursor-pointer" 
              />
              <div className="flex justify-between text-xs text-on-surface-muted mt-1 font-mono">
                <span>ET0</span>
                <span>ET60</span>
              </div>
            </div>
          </div>

          {/* Vehicle Setup */}
          <div className="space-y-6">
            <h3 className="text-xs font-bold text-on-surface-muted uppercase tracking-widest border-b border-white/10 pb-2">Vehicle Setup</h3>
            
            <div>
              <label className="text-sm font-medium mb-3 block">Suspension Configuration</label>
              <div className="grid grid-cols-2 gap-2">
                {['Stock', 'Lowering Springs', 'Coilovers', 'Air Ride'].map((type) => (
                  <button 
                    key={type}
                    onClick={() => setSuspension(type)}
                    className={`p-3 text-xs font-bold uppercase tracking-wider rounded-lg border transition-colors text-center ${
                      suspension === type 
                        ? 'border-primary-brand bg-primary-brand/10 text-primary-brand' 
                        : 'border-white/10 bg-surface-highest text-on-surface hover:bg-white/5'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Warnings / Alerts */}
          {offset < 20 && width > 11 && (
            <div className="bg-secondary-brand/10 border border-secondary-brand/30 rounded-xl p-4 flex gap-3 mt-4 animate-fade-in">
              <AlertTriangle className="w-5 h-5 text-secondary-brand shrink-0" />
              <div>
                <h4 className="text-xs font-bold text-secondary-brand uppercase tracking-widest mb-1">Fender Clearance</h4>
                <p className="description-copy text-on-surface-muted">Aggressive offset and width may require fender rolling or aggressive camber settings on this chassis.</p>
              </div>
            </div>
          )}

        </div>

        {/* Footer Action */}
        <div className="p-6 border-t border-white/10 shrink-0 bg-surface-high">
          <Link to="/rim/visualization" className="w-full bg-primary-brand text-on-primary font-bold py-4 rounded-xl hover:brightness-110 transition-all shadow-lg shadow-primary-brand/20 active:scale-95 flex items-center justify-center gap-2 uppercase tracking-widest text-sm">
            Apply Specs & View 3D
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </aside>

    </div>
  );
}
