import FallbackImage from "../components/FallbackImage";
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Target, AlertCircle } from 'lucide-react';

export default function RimOverview() {
  return (
    <div className="flex flex-col min-h-full pb-24">
      
      {/* Header */}
      <div className="max-w-[1280px] mx-auto w-full px-4 md:px-12 pt-8 mb-8">
        <div className="flex items-center gap-4 mb-6">
          <Link to="/ai-recognition" className="w-10 h-10 rounded-full bg-surface-high border border-white/10 flex items-center justify-center text-on-surface hover:bg-white/5 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-4xl md:text-5xl font-medium text-on-surface tracking-tight">Project Overview</h1>
          </div>
        </div>
        <p className="text-on-surface-muted text-lg max-w-2xl">
          Your vehicle has been successfully scanned. From here, you can explore compatible wheel options and configure your perfect fitment.
        </p>
      </div>

      <div className="max-w-[1280px] mx-auto w-full px-4 md:px-12 flex flex-col md:flex-row gap-8">
        
        {/* Left Column: Detected Vehicle */}
        <div className="w-full md:w-2/3">
          <div className="bg-surface-high/60 backdrop-blur-md rounded-3xl p-8 border border-white/5 shadow-2xl relative overflow-hidden flex flex-col min-h-[400px]">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-brand/10 blur-[100px] rounded-full pointer-events-none"></div>
            
            <div className="flex justify-between items-start relative z-10 mb-8">
              <div>
                <span className="bg-primary-brand/20 backdrop-blur-md text-primary-brand border border-primary-brand/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest inline-block mb-3">
                  AI Detected Vehicle
                </span>
                <h2 className="text-3xl font-medium text-white drop-shadow-md">Porsche 911 GT3 RS</h2>
                <p className="text-on-surface-muted font-mono mt-1">Chassis: 992 | Factory Fitment Data Synced</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-surface-highest flex items-center justify-center border border-white/10">
                <Target className="w-6 h-6 text-primary-brand" />
              </div>
            </div>

            <div className="relative flex-grow rounded-2xl overflow-hidden border border-white/10 mt-auto aspect-video md:aspect-auto">
              <FallbackImage
                src="https://images.unsplash.com/photo-1503376760367-11eb8516886e?q=80&w=1200&auto=format&fit=crop" 
                alt="Detected Vehicle" 
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent"></div>
              
              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                <div className="flex gap-4">
                  <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                    <span className="block text-[10px] text-on-surface-muted uppercase tracking-widest">Bolt Pattern</span>
                    <span className="font-mono text-sm text-white">Centerlock</span>
                  </div>
                  <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 hidden sm:block">
                    <span className="block text-[10px] text-on-surface-muted uppercase tracking-widest">OEM Front</span>
                    <span className="font-mono text-sm text-white">20x9.5 ET46</span>
                  </div>
                  <div className="bg-black/50 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 hidden sm:block">
                    <span className="block text-[10px] text-on-surface-muted uppercase tracking-widest">OEM Rear</span>
                    <span className="font-mono text-sm text-white">21x12.5 ET45</span>
                  </div>
                </div>
              </div>
            </div>
            
          </div>
        </div>

        {/* Right Column: Actions */}
        <div className="w-full md:w-1/3 flex flex-col gap-6">
          
          <div className="bg-surface-high/60 backdrop-blur-md rounded-2xl p-8 border border-white/5 shadow-xl flex flex-col h-full">
            <h3 className="text-xl font-medium text-on-surface mb-6">Next Steps</h3>
            
            <div className="flex flex-col gap-4 flex-grow">
              <Link to="/rim/selection" className="group relative overflow-hidden rounded-xl border border-white/10 bg-surface-highest p-6 hover:border-primary-brand/50 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-primary-brand/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 flex flex-col">
                  <span className="text-primary-brand font-bold uppercase tracking-widest text-xs mb-2 block">Step 1</span>
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-medium text-white group-hover:text-primary-brand transition-colors">Select Wheels</h4>
                    <ArrowRight className="w-5 h-5 text-on-surface-muted group-hover:text-primary-brand group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-sm text-on-surface-muted mt-2">Browse compatible premium brands like BBS, Vossen, and HRE.</p>
                </div>
              </Link>
              
              <div className="rounded-xl border border-white/5 bg-surface p-6 opacity-50 relative">
                <div className="flex flex-col">
                  <span className="text-on-surface-muted font-bold uppercase tracking-widest text-xs mb-2 block">Step 2</span>
                  <div className="flex items-center justify-between">
                    <h4 className="text-lg font-medium text-on-surface-muted">Configure Fitment</h4>
                  </div>
                  <p className="text-sm text-on-surface-muted mt-2">Requires wheel selection.</p>
                </div>
              </div>
              
            </div>
            
            <div className="mt-8 pt-6 border-t border-white/10 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-secondary-brand shrink-0" />
              <p className="text-xs text-on-surface-muted leading-relaxed">
                The fitment engine will automatically constrain offset and width options based on your scanned chassis to prevent clearance issues.
              </p>
            </div>

          </div>
          
        </div>
        
      </div>
    </div>
  );
}
