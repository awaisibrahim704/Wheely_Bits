import { Loader2 } from 'lucide-react';

export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <div className="relative">
        {/* Outer glowing ring */}
        <div className="absolute inset-0 border-2 border-primary-brand/20 rounded-full animate-[spin_3s_linear_infinite] w-24 h-24 -m-4"></div>
        {/* Inner glowing ring */}
        <div className="absolute inset-2 border-2 border-primary-brand/40 rounded-full animate-[spin_2s_linear_infinite_reverse] w-16 h-16 -m-2"></div>
        
        {/* Core Icon */}
        <div className="w-16 h-16 bg-surface-highest rounded-full flex items-center justify-center border border-white/10 shadow-[0_0_30px_rgba(171,207,178,0.2)]">
          <Loader2 className="w-8 h-8 text-primary-brand animate-spin" />
        </div>
      </div>
      
      <div className="mt-12 flex flex-col items-center gap-2">
        <h2 className="text-sm font-bold tracking-widest uppercase text-on-surface">Loading Assets</h2>
        <p className="text-xs text-on-surface-muted font-mono animate-pulse">Establishing connection...</p>
      </div>
    </div>
  );
}
