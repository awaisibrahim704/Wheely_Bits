import FallbackImage from "../components/FallbackImage";
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Camera, X, Zap, CheckCircle2, ChevronRight } from 'lucide-react';

export default function AIRecognition() {
  const [scanning, setScanning] = useState(true);
  const [result, setResult] = useState<null | {brand: string, model: string, confidence: number}>(null);

  useEffect(() => {
    // Simulate AI scanning process
    const timer = setTimeout(() => {
      setScanning(false);
      setResult({
        brand: 'BBS',
        model: 'FI-R Forged',
        confidence: 98.4
      });
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex h-screen bg-black overflow-hidden text-on-surface relative">
      
      {/* Simulated Camera Feed Background */}
      <div className="absolute inset-0 z-0">
        <FallbackImage
          src="https://images.unsplash.com/photo-1590362891991-f776e747a588?q=80&w=2000&auto=format&fit=crop" 
          alt="Wheel Camera Feed" 
          className={`w-full h-full object-cover transition-all duration-1000 ${scanning ? 'scale-110 brightness-75' : 'scale-100 brightness-50'}`} 
        />
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)]"></div>
      </div>

      {/* Header Overlay */}
      <div className="absolute top-0 left-0 right-0 p-6 z-20 flex justify-between items-start pointer-events-none">
        <div className="pointer-events-auto">
          <Link to="/rim" className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/10 transition-colors">
            <X className="w-6 h-6" />
          </Link>
        </div>
        <div className="bg-black/40 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 flex items-center gap-2 pointer-events-auto">
          <Zap className="w-4 h-4 text-primary-brand" />
          <span className="text-xs font-bold tracking-widest uppercase text-white">AI Vision Active</span>
        </div>
      </div>

      {/* Main Scanner UI */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6">
        
        {/* Scanning Reticle */}
        <div className={`relative w-72 h-72 md:w-96 md:h-96 transition-all duration-500 ${scanning ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          {/* Corners */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary-brand"></div>
          <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary-brand"></div>
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary-brand"></div>
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary-brand"></div>
          
          {/* Scanning Line */}
          <div className="absolute inset-0 overflow-hidden flex flex-col justify-center">
            <div className="w-full h-0.5 bg-primary-brand shadow-[0_0_20px_rgba(171,207,178,1)] animate-[scan_2s_ease-in-out_infinite]"></div>
          </div>
          
          <div className="absolute bottom-[-60px] left-0 right-0 text-center">
            <p className="text-sm font-mono text-white tracking-widest uppercase animate-pulse">Analyzing Geometry...</p>
          </div>
        </div>

        {/* Results Panel */}
        {!scanning && result && (
          <div className="absolute bottom-12 left-6 right-6 md:left-1/2 md:-translate-x-1/2 md:w-[480px] bg-surface-high/80 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-2xl animate-fade-in flex flex-col gap-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-primary-brand/20 border border-primary-brand/30 flex items-center justify-center shrink-0">
                <CheckCircle2 className="w-8 h-8 text-primary-brand" />
              </div>
              <div className="flex flex-col flex-grow">
                <h3 className="text-xs font-bold text-on-surface-muted uppercase tracking-widest mb-1">Match Found</h3>
                <h2 className="text-3xl font-medium text-white tracking-tight">{result.brand}</h2>
                <h4 className="text-xl text-on-surface-muted">{result.model}</h4>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-2xl font-mono text-primary-brand">{result.confidence}%</span>
                <span className="text-[10px] text-on-surface-muted uppercase tracking-widest">Confidence</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              <Link to="/rim/selection" className="py-4 rounded-xl border border-white/20 bg-white/5 text-center text-sm font-bold text-white hover:bg-white/10 transition-colors uppercase tracking-widest">
                Retake
              </Link>
              <Link to="/rim/overview" className="py-4 rounded-xl bg-primary-brand text-on-primary text-center text-sm font-bold hover:brightness-110 transition-colors uppercase tracking-widest flex items-center justify-center gap-2">
                Configure Project
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}

      </div>
      
      {/* Bottom Controls (Only during scanning) */}
      {scanning && (
        <div className="absolute bottom-12 left-0 right-0 flex justify-center z-20 pointer-events-none">
          <div className="pointer-events-auto">
            <button className="w-20 h-20 rounded-full border-4 border-white/50 flex items-center justify-center hover:border-white transition-colors bg-white/10 backdrop-blur-sm">
              <div className="w-16 h-16 rounded-full bg-white transition-transform hover:scale-95 flex items-center justify-center text-black">
                <Camera className="w-8 h-8" />
              </div>
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
