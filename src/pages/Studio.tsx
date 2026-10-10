import FallbackImage from "../components/FallbackImage";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layers, Camera, Maximize, RotateCw, Undo, ChevronLeft, Droplet, Sun, Shield } from 'lucide-react';

export default function Studio() {
  const [activeTab, setActiveTab] = useState('paint');
  const [selectedColor, setSelectedColor] = useState('#abcfb2');

  const colors = [
    { name: 'Sage Green', hex: '#abcfb2' },
    { name: 'Slate Grey', hex: '#282a2c' },
    { name: 'Nardo Grey', hex: '#8c928b' },
    { name: 'Stealth Black', hex: '#121416' },
    { name: 'Carmine Red', hex: '#93000a' },
    { name: 'Chalk', hex: '#e2e2e5' },
  ];

  return (
    <div className="flex h-screen bg-background overflow-hidden text-on-surface">
      
      {/* LEFT SIDEBAR: Configuration Panel */}
      <aside className="w-80 h-full bg-surface-high/80 backdrop-blur-xl border-r border-white/10 flex flex-col z-20 shadow-2xl flex-shrink-0">
        
        {/* Header */}
        <div className="h-16 flex items-center px-6 border-b border-white/10 shrink-0">
          <Link to="/garage" className="mr-4 text-on-surface-muted hover:text-on-surface transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-lg font-medium tracking-wide">Studio Configurator</h1>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-white/10 shrink-0">
          <button 
            onClick={() => setActiveTab('paint')}
            className={`flex-1 py-4 text-sm font-bold tracking-widest uppercase transition-colors ${activeTab === 'paint' ? 'text-primary-brand border-b-2 border-primary-brand' : 'text-on-surface-muted hover:text-on-surface'}`}
          >
            Paint
          </button>
          <button 
            onClick={() => setActiveTab('wheels')}
            className={`flex-1 py-4 text-sm font-bold tracking-widest uppercase transition-colors ${activeTab === 'wheels' ? 'text-primary-brand border-b-2 border-primary-brand' : 'text-on-surface-muted hover:text-on-surface'}`}
          >
            Wheels
          </button>
          <button 
            onClick={() => setActiveTab('tint')}
            className={`flex-1 py-4 text-sm font-bold tracking-widest uppercase transition-colors ${activeTab === 'tint' ? 'text-primary-brand border-b-2 border-primary-brand' : 'text-on-surface-muted hover:text-on-surface'}`}
          >
            Tint
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
          
          {activeTab === 'paint' && (
            <div className="space-y-8 animate-fade-in">
              {/* Material Type */}
              <div>
                <h3 className="text-xs font-bold text-on-surface-muted uppercase tracking-widest mb-4">Material Finish</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex flex-col items-center justify-center p-4 rounded-xl border-2 border-primary-brand bg-primary-brand/10 text-primary-brand gap-2">
                    <Droplet className="w-5 h-5" />
                    <span className="text-xs font-bold">Gloss</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-white/10 bg-surface-highest text-on-surface hover:border-white/30 transition-colors gap-2">
                    <Sun className="w-5 h-5" />
                    <span className="text-xs font-bold">Satin</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-white/10 bg-surface-highest text-on-surface hover:border-white/30 transition-colors gap-2">
                    <Shield className="w-5 h-5" />
                    <span className="text-xs font-bold">Matte</span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-4 rounded-xl border border-white/10 bg-surface-highest text-on-surface hover:border-white/30 transition-colors gap-2">
                    <Layers className="w-5 h-5" />
                    <span className="text-xs font-bold">ColorShift</span>
                  </button>
                </div>
              </div>

              {/* Colors */}
              <div>
                <div className="flex justify-between items-end mb-4">
                  <h3 className="text-xs font-bold text-on-surface-muted uppercase tracking-widest">Select Color</h3>
                  <span className="text-xs font-medium text-primary-brand">Custom Hex</span>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  {colors.map((color) => (
                    <button 
                      key={color.hex}
                      onClick={() => setSelectedColor(color.hex)}
                      className={`aspect-square rounded-xl relative overflow-hidden flex items-center justify-center border-2 transition-all ${selectedColor === color.hex ? 'border-white scale-105 shadow-lg' : 'border-transparent hover:border-white/30'}`}
                      style={{ backgroundColor: color.hex }}
                      title={color.name}
                    >
                      {selectedColor === color.hex && (
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
                <div className="mt-4 p-3 bg-surface-highest rounded-lg border border-white/5 flex items-center justify-between">
                  <span className="text-sm font-medium">{colors.find(c => c.hex === selectedColor)?.name || 'Custom'}</span>
                  <span className="text-xs text-on-surface-muted font-mono">{selectedColor.toUpperCase()}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'wheels' && (
            <div className="flex flex-col items-center justify-center h-full text-on-surface-muted space-y-4 animate-fade-in">
              <p className="text-sm text-center">Select wheels from the catalog to preview on your build.</p>
              <Link to="/rim" className="px-6 py-2 bg-surface-highest border border-white/10 rounded-lg text-sm font-bold text-on-surface hover:bg-white/5 transition-colors">
                Browse Wheels
              </Link>
            </div>
          )}

          {activeTab === 'tint' && (
            <div className="flex flex-col items-center justify-center h-full text-on-surface-muted space-y-4 animate-fade-in">
              <Layers className="w-12 h-12 opacity-50" />
              <p className="text-sm text-center">Configure window tint percentages and film types.</p>
              <Link to="/tint" className="px-6 py-2 bg-surface-highest border border-white/10 rounded-lg text-sm font-bold text-on-surface hover:bg-white/5 transition-colors">
                Configure Tint
              </Link>
            </div>
          )}

        </div>

        {/* Footer Action */}
        <div className="p-6 border-t border-white/10 shrink-0 bg-surface-high">
          <div className="flex justify-between items-center mb-4">
            <span className="text-xs text-on-surface-muted uppercase tracking-widest">Est. Build Cost</span>
            <span className="text-lg font-bold text-primary-brand">$4,250</span>
          </div>
          <button className="w-full bg-primary-brand text-on-primary font-bold py-3 rounded-lg hover:brightness-110 transition-all shadow-lg shadow-primary-brand/20 active:scale-95">
            Save Configuration
          </button>
        </div>
      </aside>

      {/* RIGHT MAIN: 3D Visualization Canvas (Placeholder) */}
      <main className="flex-1 relative flex flex-col bg-surface-dim">
        
        {/* Canvas Area */}
        <div className="absolute inset-0 z-0">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
          
          {/* Lighting gradients */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-brand/10 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary-brand/10 blur-[150px] rounded-full pointer-events-none"></div>

          {/* 3D Model Placeholder Image */}
          <div className="absolute inset-0 flex items-center justify-center p-12">
            <div 
              className="w-full h-full max-w-5xl max-h-[600px] relative transition-all duration-700 ease-in-out drop-shadow-2xl"
              style={{
                filter: `drop-shadow(0 30px 40px rgba(0,0,0,0.5)) hue-rotate(${selectedColor === '#abcfb2' ? '0deg' : selectedColor === '#93000a' ? '120deg' : '0deg'})`
              }}
            >
              {/* Note: Using a transparent PNG of a car would be ideal here. Using a high-quality placeholder for now. */}
              <FallbackImage
                src="https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=2000&auto=format&fit=crop" 
                alt="3D Vehicle Visualization" 
                className="w-full h-full object-contain mix-blend-screen opacity-90 scale-x-[-1]" 
                style={{
                  maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
                }}
              />
            </div>
          </div>
        </div>

        {/* Top Toolbar */}
        <div className="relative z-10 flex justify-between items-center p-6 pointer-events-none">
          <div className="bg-surface-high/60 backdrop-blur-md rounded-full px-4 py-2 border border-white/10 flex items-center gap-2 pointer-events-auto shadow-lg">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
            <span className="text-xs font-bold tracking-widest uppercase">Live Render</span>
          </div>
          
          <div className="flex items-center gap-2 pointer-events-auto">
            <button className="w-10 h-10 rounded-full bg-surface-high/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-on-surface hover:bg-white/10 transition-colors tooltip-trigger group relative">
              <Undo className="w-4 h-4" />
              <span className="absolute -bottom-8 bg-surface-highest px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Undo</span>
            </button>
            <button className="w-10 h-10 rounded-full bg-surface-high/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-on-surface hover:bg-white/10 transition-colors tooltip-trigger group relative">
              <Camera className="w-4 h-4" />
              <span className="absolute -bottom-8 bg-surface-highest px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Snapshot</span>
            </button>
            <button className="w-10 h-10 rounded-full bg-surface-high/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-on-surface hover:bg-white/10 transition-colors tooltip-trigger group relative">
              <Maximize className="w-4 h-4" />
              <span className="absolute -bottom-8 right-0 bg-surface-highest px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">Fullscreen</span>
            </button>
          </div>
        </div>

        {/* Bottom Toolbar (Angles) */}
        <div className="relative z-10 mt-auto p-6 flex justify-center pointer-events-none">
          <div className="bg-surface-high/80 backdrop-blur-xl rounded-full p-2 border border-white/10 flex items-center gap-2 pointer-events-auto shadow-2xl">
            <button className="px-4 py-2 rounded-full bg-primary-brand/20 text-primary-brand text-xs font-bold uppercase tracking-widest border border-primary-brand/30">Front 3/4</button>
            <button className="px-4 py-2 rounded-full text-on-surface-muted hover:text-on-surface hover:bg-white/5 text-xs font-bold uppercase tracking-widest transition-colors">Side</button>
            <button className="px-4 py-2 rounded-full text-on-surface-muted hover:text-on-surface hover:bg-white/5 text-xs font-bold uppercase tracking-widest transition-colors">Rear 3/4</button>
            <div className="w-px h-6 bg-white/10 mx-2"></div>
            <button className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface hover:bg-white/10 transition-colors">
              <RotateCw className="w-4 h-4" />
            </button>
          </div>
        </div>

      </main>
    </div>
  );
}
