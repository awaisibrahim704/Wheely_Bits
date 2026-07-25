import { useState, useEffect } from 'react';
import { PlusCircle, HelpCircle, FolderOpen } from 'lucide-react';

const BACKGROUND_IMAGES = [
  "https://lh3.googleusercontent.com/aida/AP1WRLtl_UcCMVfY8SaXmAbNezrsmYXOLercclE93Q3yh-FP3hfNudgEVGaV87gULCqFRIuLLXlg5PLmtAFzZ4w90rkVV1e8zeBhMYf3haTp2p1_GYLEJkKeBQK-GfjFoBwpeiald3JfStVhYjW1Mm7EYmv5tA9vHtXEPPrRDZkvokq9RrP1YP_EJKqIaAl7-T1yjrivERtDzm1VHxaj_YGZaFQi57W64aZUCJ-r92eOiSXsnyiZIafBkHuhTkU",
  "https://lh3.googleusercontent.com/aida/AP1WRLsaN1knnv4qKo7r36zDG8Lfm9VAuE2hjNOQXSMErbwO5aoLaFz_M9ShB1mRzUeop97Wz8TiNZXrWD7PM1_zR7l0qs92L1sIG8yPoUGRw7PNrj6z9WQhK95QQ5wKSGVyCYzzPkNTLl_sZagS8Bf4a598i0jQvs66EKxqKN0Rdz2lN0zj8hy7Tec2SESCSC5oHYx80ggn55N3ByVQRzZcOMZTtNHEHafiJ73bHgmOq7asFHg8vbDgKt5QSdwCwLIgdhdoAFQ7PLKSYQ"
];

export default function NewUserWelcome() {
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % BACKGROUND_IMAGES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full bg-background overflow-x-hidden -mt-24">
      {/* Hero Carousel */}
      <section className="relative flex flex-col items-center justify-center min-h-[90vh] px-4 md:px-12 text-center pt-24">
        <div className="absolute inset-0 z-0 overflow-hidden">
          {BACKGROUND_IMAGES.map((src, idx) => (
            <div 
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ${idx === currentBg ? 'opacity-100' : 'opacity-0'}`}
              style={{
                background: `linear-gradient(to bottom, rgba(18, 20, 22, 0.8), rgba(18, 20, 22, 0.4)), url('${src}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />
          ))}
        </div>
        
        <div className="relative z-10 max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white drop-shadow-[0_0_20px_rgba(171,207,178,0.3)]">
            Welcome to Wheely Bits, <span className="text-primary-brand">Alex</span>
          </h1>
          <p className="text-lg text-on-surface-muted opacity-80 mb-16 max-w-2xl mx-auto leading-relaxed">
            Pakistan's first AI-powered automotive canvas is yours. Start your first build or explore the community to find inspiration.
          </p>
          
          <div className="flex flex-col md:flex-row gap-8 justify-center items-stretch w-full max-w-3xl mx-auto">
            {/* Primary Action */}
            <button className="group relative bg-primary-brand text-on-primary px-16 py-8 rounded-xl font-medium text-lg overflow-hidden flex-1 active:scale-95 transition-transform hover:shadow-[0_0_30px_rgba(143,179,151,0.2)]">
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
              <div className="relative flex items-center justify-center gap-2">
                <PlusCircle className="w-6 h-6" />
                Start New Build
              </div>
            </button>
            
            {/* Secondary Action Glass Panel */}
            <div className="bg-surface-high/40 backdrop-blur-md border border-white/5 p-8 rounded-xl text-left flex-1 flex flex-col justify-between hover:border-primary-brand/30 hover:shadow-lg hover:shadow-primary-brand/10 transition-all duration-300 cursor-pointer group active:scale-[0.98]">
              <div>
                <div className="flex justify-between items-start mb-2">
                  <span className="bg-primary-brand/20 text-primary-brand px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">New User</span>
                  <HelpCircle className="w-5 h-5 text-on-surface-muted group-hover:text-primary-brand transition-colors" />
                </div>
                <h3 className="text-2xl font-bold text-white">Getting Started</h3>
                <p className="text-sm text-on-surface-muted mt-1">Learn how to use our AI tools</p>
              </div>
              <div className="mt-8 flex items-center gap-2">
                <span className="text-sm font-medium text-on-surface group-hover:text-primary-brand transition-colors">View Tutorial Guide</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Community Exploration Grid */}
      <section className="relative z-10 px-4 md:px-12 py-16 max-w-[1280px] mx-auto">
        <h2 className="text-3xl font-medium text-white mb-8">Explore the Community</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="bg-surface-low rounded-xl overflow-hidden aspect-[4/3] relative cursor-pointer group border border-white/5 hover:border-primary-brand/30 transition-colors">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
              style={{ backgroundImage: `url('${BACKGROUND_IMAGES[0]}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90"></div>
            <div className="absolute bottom-6 left-6">
              <p className="text-xs text-primary-brand uppercase tracking-widest font-semibold mb-1">Concept</p>
              <h4 className="text-xl font-bold text-white">Midnight Drift</h4>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-surface-low rounded-xl overflow-hidden aspect-[4/3] relative cursor-pointer group border border-white/5 hover:border-primary-brand/30 transition-colors">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" 
              style={{ backgroundImage: `url('${BACKGROUND_IMAGES[1]}')` }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent opacity-90"></div>
            <div className="absolute bottom-6 left-6">
              <p className="text-xs text-primary-brand uppercase tracking-widest font-semibold mb-1">Refining</p>
              <h4 className="text-xl font-bold text-white">Tuned Elegance</h4>
            </div>
          </div>

          {/* Empty State Card */}
          <div className="rounded-xl flex flex-col items-center justify-center border-dashed border-2 border-white/10 hover:border-primary-brand/40 hover:bg-primary-brand/5 transition-all cursor-pointer group min-h-[250px]">
            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-primary-brand group-hover:text-on-primary transition-all duration-300">
              <FolderOpen className="w-5 h-5 text-on-surface-muted group-hover:text-on-primary transition-colors" />
            </div>
            <span className="text-sm font-medium mt-4 text-on-surface-muted group-hover:text-white transition-colors">View all projects</span>
          </div>
          
        </div>
      </section>
    </div>
  );
}
