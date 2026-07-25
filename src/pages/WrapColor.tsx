import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';

const COLORS = [
  { id: 'g-1', name: 'Gloss Black', finish: 'Gloss', hex: '#000000' },
  { id: 'g-2', name: 'Nardo Grey', finish: 'Gloss', hex: '#8c928b' },
  { id: 'g-3', name: 'Carmine Red', finish: 'Gloss', hex: '#93000a' },
  { id: 'g-4', name: 'Chalk White', finish: 'Gloss', hex: '#e2e2e5' },
  
  { id: 's-1', name: 'Satin Black', finish: 'Satin', hex: '#121416' },
  { id: 's-2', name: 'Satin Dark Grey', finish: 'Satin', hex: '#282a2c' },
  { id: 's-3', name: 'Satin Pine Green', finish: 'Satin', hex: '#2f4233' },
  { id: 's-4', name: 'Satin Azure', finish: 'Satin', hex: '#1d3e5e' },
  
  { id: 'm-1', name: 'Matte Military Green', finish: 'Matte', hex: '#4a5320' },
  { id: 'm-2', name: 'Matte Black', finish: 'Matte', hex: '#1a1a1a' },
  { id: 'm-3', name: 'Matte Charcoal', finish: 'Matte', hex: '#36454f' },
  
  { id: 'cs-1', name: 'Mystic Bronze', finish: 'ColorShift', hex: 'linear-gradient(135deg, #cd7f32, #800020)' },
  { id: 'cs-2', name: 'Volcanic Flare', finish: 'ColorShift', hex: 'linear-gradient(135deg, #ff4500, #8b0000)' },
  { id: 'cs-3', name: 'Northern Lights', finish: 'ColorShift', hex: 'linear-gradient(135deg, #00fa9a, #4b0082)' },
];

export default function WrapColor() {
  const [activeFinish, setActiveFinish] = useState('All');
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const finishes = ['All', 'Gloss', 'Satin', 'Matte', 'ColorShift'];
  const filteredColors = activeFinish === 'All' ? COLORS : COLORS.filter(c => c.finish === activeFinish);

  return (
    <div className="flex flex-col min-h-full pb-32">
      {/* Header */}
      <div className="max-w-[1280px] mx-auto w-full px-4 md:px-12 pt-8 mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-8">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <Link to="/wrap/styles" className="w-10 h-10 rounded-full bg-surface-high border border-white/10 flex items-center justify-center text-on-surface hover:bg-white/5 transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-4xl md:text-5xl font-medium text-on-surface tracking-tight">Select Color</h1>
            </div>
            <p className="text-on-surface-muted text-lg max-w-2xl">Browse our extensive palette of premium vinyl films from top manufacturers like 3M, Inozetek, and Avery Dennison.</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 w-full overflow-x-auto custom-scrollbar pb-4 border-b border-white/10">
          {finishes.map(f => (
            <button 
              key={f}
              onClick={() => setActiveFinish(f)}
              className={`px-8 py-3 rounded-full text-sm font-bold tracking-widest uppercase transition-all whitespace-nowrap ${activeFinish === f ? 'bg-primary-brand text-on-primary shadow-lg shadow-primary-brand/20' : 'bg-transparent text-on-surface-muted hover:text-on-surface hover:bg-white/5 border border-white/10'}`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Color Grid */}
      <div className="max-w-[1280px] mx-auto w-full px-4 md:px-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filteredColors.map(color => {
            const isSelected = selectedColor === color.id;
            return (
              <div 
                key={color.id}
                onClick={() => setSelectedColor(color.id)}
                className={`group cursor-pointer flex flex-col gap-3 transition-all duration-300 ${isSelected ? 'scale-105' : 'hover:-translate-y-1'}`}
              >
                <div 
                  className={`aspect-square rounded-3xl relative overflow-hidden transition-all duration-300 border-4 shadow-xl ${isSelected ? 'border-primary-brand' : 'border-white/5 group-hover:border-white/20'}`}
                  style={{ background: color.hex }}
                >
                  {/* Gloss Highlight Overlay */}
                  {color.finish === 'Gloss' && (
                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-transparent to-transparent pointer-events-none"></div>
                  )}
                  {/* Satin Overlay */}
                  {color.finish === 'Satin' && (
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px] pointer-events-none"></div>
                  )}
                  {/* Selected Indicator */}
                  {isSelected && (
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center animate-fade-in">
                      <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg text-black">
                        <Check className="w-6 h-6" />
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="text-center">
                  <h3 className="text-sm font-bold text-on-surface mb-1">{color.name}</h3>
                  <p className="text-xs font-medium text-on-surface-muted uppercase tracking-widest">{color.finish}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Floating Action Bar */}
      {selectedColor && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-fade-up">
          <div className="bg-surface-high/90 backdrop-blur-xl border border-white/10 p-2 pl-6 rounded-2xl shadow-2xl flex items-center gap-6">
            <div className="flex flex-col">
              <span className="text-xs text-on-surface-muted font-bold uppercase tracking-widest mb-1">Selected Color</span>
              <span className="text-base font-medium text-on-surface">{COLORS.find(c => c.id === selectedColor)?.name}</span>
            </div>
            
            <div 
              className="w-10 h-10 rounded-full border-2 border-white/20"
              style={{ background: COLORS.find(c => c.id === selectedColor)?.hex }}
            ></div>
            
            <Link 
              to="/wrap/visualization"
              className="bg-primary-brand hover:brightness-110 text-on-primary font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-primary-brand/20 uppercase tracking-widest text-sm"
            >
              Preview on Vehicle
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
