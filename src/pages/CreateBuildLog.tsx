import FallbackImage from "../components/FallbackImage";
import { useState } from 'react';
import { ArrowRight, CloudUpload, Trash2, Plus, Search, Check, Wrench, X, Rocket, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CreateBuildLog() {
  const [step, setStep] = useState(1);
  const [selectedMods, setSelectedMods] = useState([
    { id: 1, title: 'KW V3 Coilover Kit', category: 'Performance Suspension' }
  ]);

  const handleNext = (e: React.MouseEvent, nextStep: number) => {
    e.preventDefault();
    setStep(nextStep);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRemoveMod = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    setSelectedMods(selectedMods.filter(m => m.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow pt-32 pb-16 px-4 md:px-12 max-w-4xl mx-auto w-full">
        
        {/* Header Section */}
        <div className="mb-16 text-center md:text-left">
          <Link to="/community" className="inline-flex items-center gap-2 text-sm font-semibold text-on-surface-muted hover:text-primary-brand transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" /> Back to Community
          </Link>
          <h1 className="text-4xl md:text-5xl font-medium text-on-surface mb-4">Initiate New Build Log</h1>
          <p className="text-on-surface-muted max-w-2xl">
            Document every precision adjustment and performance upgrade. Share your journey with the Wheely Bits engineering community.
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="mb-16 relative px-8">
          <div className="flex justify-between items-center relative z-10">
            {/* Step 1 */}
            <div className="flex flex-col items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-500 ${step >= 1 ? 'bg-primary-brand text-on-primary shadow-[0_0_15px_rgba(171,207,178,0.4)]' : 'bg-surface-highest text-on-surface-muted border border-white/5'}`}>
                1
              </div>
              <span className={`text-xs font-semibold uppercase tracking-widest ${step >= 1 ? 'text-primary-brand' : 'text-on-surface-muted'}`}>Basic Info</span>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-500 ${step >= 2 ? 'bg-primary-brand text-on-primary shadow-[0_0_15px_rgba(171,207,178,0.4)]' : 'bg-surface-highest text-on-surface-muted border border-white/5'}`}>
                2
              </div>
              <span className={`text-xs font-semibold uppercase tracking-widest ${step >= 2 ? 'text-primary-brand' : 'text-on-surface-muted'}`}>Media</span>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center gap-3">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold transition-all duration-500 ${step >= 3 ? 'bg-primary-brand text-on-primary shadow-[0_0_15px_rgba(171,207,178,0.4)]' : 'bg-surface-highest text-on-surface-muted border border-white/5'}`}>
                3
              </div>
              <span className={`text-xs font-semibold uppercase tracking-widest ${step >= 3 ? 'text-primary-brand' : 'text-on-surface-muted'}`}>Modifications</span>
            </div>
          </div>
          
          {/* Progress Line */}
          <div className="absolute top-6 left-12 right-12 h-[2px] bg-surface-highest -z-0">
            <div 
              className="h-full bg-primary-brand transition-all duration-500 shadow-[0_0_10px_rgba(171,207,178,0.5)]" 
              style={{ width: `${(step - 1) * 50}%` }}
            ></div>
          </div>
        </div>

        {/* Wizard Steps Container */}
        <div className="bg-surface-high/60 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-white/5 relative overflow-hidden shadow-2xl">
          
          <form className="relative z-10" onSubmit={(e) => { e.preventDefault(); alert('Build log published successfully!'); }}>
            
            {/* STEP 1: BASIC INFO */}
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-on-surface-muted uppercase tracking-wider">Project Title</label>
                      <input 
                        type="text" 
                        className="bg-background/50 backdrop-blur-sm border border-white/10 p-4 rounded-xl text-on-surface w-full focus:border-primary-brand focus:ring-1 focus:ring-primary-brand transition-all outline-none" 
                        placeholder="e.g. Midnight Slate GT" 
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-sm font-semibold text-on-surface-muted uppercase tracking-wider">Base Vehicle</label>
                      <input 
                        type="text" 
                        className="bg-background/50 backdrop-blur-sm border border-white/10 p-4 rounded-xl text-on-surface w-full focus:border-primary-brand focus:ring-1 focus:ring-primary-brand transition-all outline-none" 
                        placeholder="e.g. 2024 Porsche 911 GT3" 
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-on-surface-muted uppercase tracking-wider">Build Objective</label>
                    <textarea 
                      className="bg-background/50 backdrop-blur-sm border border-white/10 p-4 rounded-xl text-on-surface w-full resize-none focus:border-primary-brand focus:ring-1 focus:ring-primary-brand transition-all outline-none" 
                      placeholder="Describe your vision for this performance build..." 
                      rows={4}
                    ></textarea>
                  </div>
                </div>
                <div className="mt-12 flex justify-end">
                  <button 
                    type="button" 
                    onClick={(e) => handleNext(e, 2)}
                    className="bg-primary-brand hover:brightness-110 text-on-primary font-bold px-8 py-4 rounded-xl transition-all active:scale-95 flex items-center gap-2 min-w-[160px] justify-center shadow-lg hover:shadow-primary-brand/20"
                  >
                    Next Stage <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: UPLOAD MEDIA */}
            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-8">
                  <div className="border-2 border-dashed border-outline-subtle rounded-2xl p-16 flex flex-col items-center justify-center text-center bg-background/20 hover:bg-background/40 transition-colors cursor-pointer group">
                    <CloudUpload className="w-16 h-16 text-primary-brand mb-6 group-hover:scale-110 transition-transform duration-300" />
                    <h3 className="text-2xl font-medium text-on-surface mb-3">Upload Visual Assets</h3>
                    <p className="text-on-surface-muted text-sm max-w-sm leading-relaxed">
                      Drag and drop high-resolution imagery or engineering blueprints. (JPG, PNG, MP4 up to 500MB)
                    </p>
                    <input type="file" multiple className="hidden" />
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {/* Placeholder Uploaded Item */}
                    <div className="aspect-video bg-surface-highest rounded-xl overflow-hidden border border-white/10 relative group">
                      <FallbackImage
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQJptYgd_riCkgP0g2IZfXXqRN9m25Qc2nElPNvKdBhQM51jjsar7xeq0sXcbA5aeUheYwUOeUrpqrYojEmBTKp7wiPrQqG5Xv5QLonxlMvdW0hL18rjOsmtteAfIuG_7VQxpNdhSurJ3zY6YKUszbCIPHgayOGC7oKZNwsM4Epu9PquYC8ff_4jhUXcGdkHGXbN9KkjkcTtXMaIjdSMgtJXgGpbv07zyexeKEz0TsB2QFILazAnDTv2uXoQjwEnW7aIKlg5fh20hb" 
                        alt="Uploaded Media" 
                        className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" 
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                        <button type="button" className="bg-error/20 p-2 rounded-full text-error hover:bg-error hover:text-white transition-colors">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    {/* Add More Placeholder */}
                    <div className="aspect-video bg-background/50 rounded-xl border border-dashed border-outline-subtle flex items-center justify-center hover:bg-background transition-colors cursor-pointer">
                      <Plus className="w-8 h-8 text-outline-subtle" />
                    </div>
                  </div>
                </div>
                <div className="mt-12 flex justify-between items-center">
                  <button 
                    type="button" 
                    onClick={(e) => handleNext(e, 1)}
                    className="text-on-surface-muted hover:text-on-surface font-bold px-8 py-4 transition-all"
                  >
                    Back
                  </button>
                  <button 
                    type="button" 
                    onClick={(e) => handleNext(e, 3)}
                    className="bg-primary-brand hover:brightness-110 text-on-primary font-bold px-8 py-4 rounded-xl transition-all active:scale-95 flex items-center gap-2 min-w-[160px] justify-center shadow-lg hover:shadow-primary-brand/20"
                  >
                    Tag Mods <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: TAG MODIFICATIONS */}
            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="space-y-8">
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-on-surface-muted uppercase tracking-wider">Search Parts Catalog</label>
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-muted w-5 h-5" />
                      <input 
                        type="text" 
                        className="bg-background/50 backdrop-blur-sm border border-white/10 p-4 pl-12 rounded-xl text-on-surface w-full focus:border-primary-brand focus:ring-1 focus:ring-primary-brand transition-all outline-none" 
                        placeholder="Search for ECU tuners, suspension kits, aero components..." 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-semibold text-on-surface-muted uppercase tracking-wider mb-4 block">Common Categories</label>
                    <div className="flex flex-wrap gap-3">
                      <button type="button" className="px-5 py-2 rounded-full border border-outline-subtle hover:border-primary-brand hover:text-primary-brand transition-all text-sm font-semibold text-on-surface-muted">Engine & ECU</button>
                      <button type="button" className="px-5 py-2 rounded-full border border-primary-brand bg-primary-brand/10 text-primary-brand transition-all text-sm font-semibold flex items-center gap-1.5 shadow-[0_0_10px_rgba(171,207,178,0.2)]">
                        Suspension <Check className="w-4 h-4" />
                      </button>
                      <button type="button" className="px-5 py-2 rounded-full border border-outline-subtle hover:border-primary-brand hover:text-primary-brand transition-all text-sm font-semibold text-on-surface-muted">Aesthetics</button>
                      <button type="button" className="px-5 py-2 rounded-full border border-outline-subtle hover:border-primary-brand hover:text-primary-brand transition-all text-sm font-semibold text-on-surface-muted">Wheels & Tires</button>
                      <button type="button" className="px-5 py-2 rounded-full border border-outline-subtle hover:border-primary-brand hover:text-primary-brand transition-all text-sm font-semibold text-on-surface-muted">Interior</button>
                    </div>
                  </div>
                  
                  <div className="space-y-4 pt-4">
                    {selectedMods.map(mod => (
                      <div key={mod.id} className="bg-background/50 p-4 rounded-xl flex justify-between items-center border border-white/5">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-primary-brand/10 rounded-xl flex items-center justify-center">
                            <Wrench className="w-6 h-6 text-primary-brand" />
                          </div>
                          <div>
                            <h4 className="font-bold text-on-surface">{mod.title}</h4>
                            <p className="text-xs font-semibold text-on-surface-muted uppercase tracking-wider mt-1">{mod.category}</p>
                          </div>
                        </div>
                        <button 
                          type="button" 
                          onClick={(e) => handleRemoveMod(e, mod.id)}
                          className="text-on-surface-muted hover:text-error p-2 bg-surface-highest rounded-lg transition-colors border border-white/5"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="mt-12 flex justify-between items-center pt-8 border-t border-white/5">
                  <button 
                    type="button" 
                    onClick={(e) => handleNext(e, 2)}
                    className="text-on-surface-muted hover:text-on-surface font-bold px-8 py-4 transition-all"
                  >
                    Back
                  </button>
                  <button 
                    type="submit" 
                    className="bg-primary-brand hover:brightness-110 text-on-primary font-bold px-8 py-4 rounded-xl transition-all active:scale-95 flex items-center gap-2 min-w-[160px] justify-center shadow-lg hover:shadow-primary-brand/30"
                  >
                    Publish Log <Rocket className="w-5 h-5" />
                  </button>
                </div>
              </div>
            )}
            
          </form>
        </div>
      </div>
    </div>
  );
}
