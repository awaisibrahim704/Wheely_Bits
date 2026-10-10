import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, ShieldAlert } from 'lucide-react';

export default function RimFitment() {
  const [diameter, setDiameter] = useState(20);
  const [width, setWidth] = useState(10.5);
  const [offset, setOffset] = useState(35);
  const [boltPattern, setBoltPattern] = useState('5x130');

  return (
    <div className="flex flex-col min-h-full pb-24">
      {/* Header */}
      <div className="max-w-[1280px] mx-auto w-full px-4 md:px-12 pt-8 mb-12">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/rim/selection" className="w-10 h-10 rounded-full bg-surface-high border border-white/10 flex items-center justify-center text-on-surface hover:bg-white/5 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-4xl md:text-5xl font-medium text-on-surface tracking-tight">Configure Fitment</h1>
          </div>
        </div>
        <p className="text-on-surface-muted text-lg max-w-2xl">
          Fine-tune the specifications for your selected BBS FI-R wheels. Our engine automatically checks for fender and suspension clearance.
        </p>
      </div>

      {/* Main Configuration Area */}
      <div className="max-w-[1280px] mx-auto w-full px-4 md:px-12 flex-grow flex flex-col lg:flex-row gap-12 items-start">
        
        {/* Left: Interactive Diagram */}
        <div className="w-full lg:w-1/2 bg-surface-high/60 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/5 shadow-2xl relative overflow-hidden flex flex-col items-center justify-center min-h-[500px]">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-brand/10 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="relative w-64 h-64 border-2 border-primary-brand/30 rounded-full flex items-center justify-center border-dashed">
            <div className="absolute w-full h-[1px] bg-primary-brand/30"></div>
            <div className="absolute h-full w-[1px] bg-primary-brand/30"></div>
            
            {/* Dynamic visualizer representation */}
            <div 
              className="border-2 border-secondary-brand/50 rounded-full absolute transition-all duration-300" 
              style={{ 
                width: `${(diameter / 24) * 100}%`, 
                height: `${(diameter / 24) * 100}%`,
                borderWidth: `${(width / 10) * 2}px`
              }}
            ></div>
          </div>
          
          <div className="mt-12 text-center">
            <h3 className="text-3xl font-light text-on-surface font-mono">{diameter}" × {width}J</h3>
            <p className="text-lg text-primary-brand font-mono mt-2">ET+{offset} | {boltPattern}</p>
          </div>
        </div>

        {/* Right: Parameter Sliders */}
        <div className="w-full lg:w-1/2 flex flex-col gap-8">
          
          <div className="bg-surface-highest/50 p-8 rounded-3xl border border-white/5 space-y-8 shadow-xl">
            {/* Diameter Slider */}
            <div>
              <div className="flex justify-between items-end mb-4">
                <label className="text-sm font-bold uppercase tracking-widest text-on-surface-muted">Wheel Diameter</label>
                <span className="text-lg font-mono text-on-surface">{diameter}"</span>
              </div>
              <input 
                type="range" 
                min="18" max="24" step="1" 
                value={diameter} 
                onChange={(e) => setDiameter(Number(e.target.value))}
                className="w-full accent-primary-brand bg-surface h-2 rounded-lg appearance-none cursor-pointer" 
              />
              <div className="flex justify-between text-xs text-on-surface-muted mt-2 font-mono">
                <span>18"</span>
                <span>24"</span>
              </div>
            </div>

            {/* Width Slider */}
            <div>
              <div className="flex justify-between items-end mb-4">
                <label className="text-sm font-bold uppercase tracking-widest text-on-surface-muted">Wheel Width</label>
                <span className="text-lg font-mono text-on-surface">{width}J</span>
              </div>
              <input 
                type="range" 
                min="8" max="13" step="0.5" 
                value={width} 
                onChange={(e) => setWidth(Number(e.target.value))}
                className="w-full accent-primary-brand bg-surface h-2 rounded-lg appearance-none cursor-pointer" 
              />
              <div className="flex justify-between text-xs text-on-surface-muted mt-2 font-mono">
                <span>8.0J</span>
                <span>13.0J</span>
              </div>
            </div>

            {/* Offset Slider */}
            <div>
              <div className="flex justify-between items-end mb-4">
                <label className="text-sm font-bold uppercase tracking-widest text-on-surface-muted">Offset (ET)</label>
                <span className="text-lg font-mono text-on-surface">+{offset}</span>
              </div>
              <input 
                type="range" 
                min="0" max="60" step="1" 
                value={offset} 
                onChange={(e) => setOffset(Number(e.target.value))}
                className="w-full accent-primary-brand bg-surface h-2 rounded-lg appearance-none cursor-pointer" 
              />
              <div className="flex justify-between text-xs text-on-surface-muted mt-2 font-mono">
                <span>ET0</span>
                <span>ET60</span>
              </div>
            </div>
            
            {/* Bolt Pattern */}
            <div>
              <label className="text-sm font-bold uppercase tracking-widest text-on-surface-muted mb-4 block">Bolt Pattern</label>
              <div className="grid grid-cols-3 gap-3">
                {['5x112', '5x114.3', '5x120', '5x130', 'Centerlock'].map((pattern) => (
                  <button 
                    key={pattern}
                    onClick={() => setBoltPattern(pattern)}
                    className={`p-3 text-xs font-bold text-center rounded-xl border transition-colors ${
                      boltPattern === pattern
                        ? 'border-primary-brand bg-primary-brand/10 text-primary-brand'
                        : 'border-white/10 bg-surface text-on-surface-muted hover:border-white/30 hover:text-on-surface'
                    }`}
                  >
                    {pattern}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Warnings */}
          {width > 11 && (
            <div className="bg-secondary-brand/10 border border-secondary-brand/30 rounded-2xl p-6 flex gap-4 animate-fade-in shadow-lg">
              <ShieldAlert className="w-6 h-6 text-secondary-brand shrink-0" />
              <div>
                <h4 className="text-sm font-bold text-secondary-brand uppercase tracking-widest mb-1">Fitment Warning</h4>
                <p className="text-sm text-on-surface-muted leading-relaxed">
                  A width of {width}J exceeds typical OEM specifications. This may require rolled fenders or aggressive camber depending on your tire choice.
                </p>
              </div>
            </div>
          )}

          <div className="mt-auto">
            <Link 
              to="/rim/visualization"
              className="w-full bg-primary-brand text-on-primary font-bold py-5 rounded-2xl hover:brightness-110 transition-all shadow-lg shadow-primary-brand/20 active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest"
            >
              Preview on Vehicle
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}
