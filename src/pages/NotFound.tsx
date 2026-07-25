import { Link } from 'react-router-dom';
import { ArrowLeft, Search, AlertTriangle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 md:px-12 text-center relative overflow-hidden">
      
      {/* Background flair */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary-brand/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="relative z-10 max-w-lg">
        <div className="w-24 h-24 rounded-3xl bg-surface-highest border border-white/10 flex items-center justify-center mx-auto mb-8 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-secondary-brand/10"></div>
          <AlertTriangle className="w-10 h-10 text-secondary-brand relative z-10" />
        </div>
        
        <h1 className="text-8xl font-bold text-on-surface tracking-tighter mb-4">404</h1>
        <h2 className="text-2xl font-medium text-on-surface mb-4">Lost Traction</h2>
        <p className="text-on-surface-muted leading-relaxed mb-10">
          The page you're looking for seems to have veered off track. It might have been moved or no longer exists.
        </p>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
          <Link 
            to="/"
            className="w-full sm:w-auto bg-primary-brand text-on-primary font-bold px-8 py-4 rounded-xl hover:brightness-110 transition-all shadow-lg shadow-primary-brand/20 flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Garage
          </Link>
          <Link 
            to="/community"
            className="w-full sm:w-auto bg-surface-highest border border-white/10 text-on-surface font-bold px-8 py-4 rounded-xl hover:bg-white/5 transition-all flex items-center justify-center gap-2 uppercase tracking-widest text-sm"
          >
            <Search className="w-4 h-4" />
            Search Community
          </Link>
        </div>
      </div>
    </div>
  );
}
