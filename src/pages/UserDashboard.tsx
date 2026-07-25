import { Link } from 'react-router-dom';
import { SlidersHorizontal, Plus, MoreVertical, Calendar, PaintBucket, CircleDashed, Sun, ArrowLeft } from 'lucide-react';

export default function UserDashboard() {
  return (
    <div className="flex flex-col min-h-screen pb-24">
      {/* Background Atmospheric Effect */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-brand/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-secondary-brand/5 blur-[150px] rounded-full"></div>
      </div>

      <main className="relative z-10 flex-grow pt-32 px-4 md:px-12 max-w-[1280px] mx-auto w-full">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-on-surface-muted hover:text-primary-brand transition-colors mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <h1 className="text-4xl md:text-5xl font-medium text-on-surface mb-2 tracking-tight">My Garage</h1>
            <p className="text-lg text-on-surface-muted max-w-xl leading-relaxed">
              Your collection of precision-engineered builds and custom aesthetics. Continue where you left off or view your booked services.
            </p>
          </div>
          <div className="flex gap-4">
            <button className="h-12 px-6 rounded-xl border border-white/10 flex items-center gap-2 hover:bg-surface-highest transition-colors group">
              <SlidersHorizontal className="w-5 h-5 text-on-surface-muted group-hover:text-on-surface" />
              <span className="font-bold text-on-surface text-sm tracking-wide">Filter Builds</span>
            </button>
            <Link to="/rim" className="h-12 px-6 rounded-xl bg-primary-brand/20 text-primary-brand flex items-center gap-2 hover:bg-primary-brand hover:text-on-primary transition-all active:scale-95 font-bold text-sm tracking-wide">
              <Plus className="w-5 h-5" />
              New Configuration
            </Link>
          </div>
        </div>

        {/* Garage Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Build Card 1: The Porsche */}
          <div className="bg-surface-high/60 backdrop-blur-md rounded-2xl overflow-hidden group border border-white/5 shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col">
            <div className="relative h-64 overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAxas52YM3vx0HVzezi--YcSELeWQK0onF4LWcGDpgNLj9H1NWQ9r-ljBWj0l39yFfhHjSwLmz0-xQb3cNmSD6rKbv81mV0dFE_h66e5SGjggztLScXgSPX1LaCZQPGBBF8dEDqR1WLE_Qps5Li6Mg2oAVPD1cLpr3Nb1noRg2u9LG1FakOjs9ro1Pe4bxeZqtNoyjQs5xhsrndLylRb_EXYXvOcT3U0ukmF-AWdaihRU4pml6Fw8LqjN_gY0CeHLes0vbZAuq7fhMI')" }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-80"></div>
              <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                <span className="text-xs font-bold text-primary-brand uppercase tracking-widest">Draft</span>
              </div>
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl font-medium text-on-surface tracking-tight">GT3 Precision One</h3>
                <button className="text-on-surface-muted hover:text-on-surface transition-colors p-1">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-on-surface-muted mb-8 leading-relaxed">
                Porsche 911 GT3 RS • British Racing Green • Satin Black Magnesium Wheels
              </p>
              <div className="mt-auto flex items-center justify-between gap-4">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-surface-highest bg-primary-brand flex items-center justify-center text-on-primary">
                    <PaintBucket className="w-3.5 h-3.5" />
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-surface-highest bg-secondary-brand flex items-center justify-center text-on-primary">
                    <CircleDashed className="w-3.5 h-3.5" />
                  </div>
                </div>
                <Link to="/rim" className="h-10 px-5 rounded-lg bg-primary-brand text-on-primary font-bold text-sm flex items-center justify-center hover:brightness-110 transition-all">
                  Continue
                </Link>
              </div>
            </div>
          </div>

          {/* Build Card 2: The Lucid */}
          <div className="bg-surface-high/60 backdrop-blur-md rounded-2xl overflow-hidden group border border-white/5 shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col">
            <div className="relative h-64 overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC7PrXdtxO4OFvlecfasxbtmFXGBKgccOQoLksnrEPnzvKFLlzFMzZ9_3dQMA0blA52UvI6ql7QGrjbDaYBKdMjNPrTNs7H06YEZDWJyNyHYq-HQhOxVna7XFB41QMHGTHaZs0LKb06Q6_nsuGBbd_HvAmgTgEmjvRSjgM6EP3_6hNQN_qHWyZe7-tL50jBUm76bJo7ohdTciQoNWxCA8rwldjWaLUEszRZU-0SBN_lrYPIksdnByPfwjykOxVrtga6tdEKgP_fckNf')" }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-80"></div>
              <div className="absolute top-4 right-4 bg-secondary-brand/20 backdrop-blur-md px-3 py-1 rounded-full border border-secondary-brand/30">
                <span className="text-xs font-bold text-secondary-brand uppercase tracking-widest">Booked</span>
              </div>
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl font-medium text-on-surface tracking-tight">Stealth Commuter</h3>
                <button className="text-on-surface-muted hover:text-on-surface transition-colors p-1">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-on-surface-muted mb-8 leading-relaxed">
                Lucid Air Sapphire • Stealth Matte Grey • Ceramic Pro Gold Package
              </p>
              <div className="mt-auto flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-secondary-brand">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm font-bold tracking-wide">Nov 24, 2024</span>
                </div>
                <button className="h-10 px-5 rounded-lg border border-white/10 text-on-surface font-bold text-sm flex items-center justify-center hover:bg-surface-highest transition-all">
                  View Appt
                </button>
              </div>
            </div>
          </div>

          {/* Build Card 3: The Defender */}
          <div className="bg-surface-high/60 backdrop-blur-md rounded-2xl overflow-hidden group border border-white/5 shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col">
            <div className="relative h-64 overflow-hidden">
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBXhb1xQsa6rir7ES2U2qS9y4UsQv9r6PLFTHFpmRCgR4jL2hi_CUK88dJjTmAE_ONfJZrWoUmZ4CjeLZFGQHuCVoKA-R8Mgfx_FSRg2L2DSR84Fc2Slaineox7eRnw618WXiRN-0cuwUoNQbk0gwB-yXfFtxcfkcMyu5QsYQ3QmAJ-zPWs9x-GESTvETwFVPwVa3LqdLw9T28yUfX6mmhYvvswZonM9ecrJbXgCHUsGtMQEuvJK3avNoIzjH1rkn32gUaxAjNB3Tkn')" }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-80"></div>
              <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                <span className="text-xs font-bold text-primary-brand uppercase tracking-widest">Draft</span>
              </div>
            </div>
            <div className="p-8 flex flex-col flex-grow">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-2xl font-medium text-on-surface tracking-tight">Overland Luxe</h3>
                <button className="text-on-surface-muted hover:text-on-surface transition-colors p-1">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-on-surface-muted mb-8 leading-relaxed">
                Defender 110 • Satin Sage • Forged Bronze Off-road Package
              </p>
              <div className="mt-auto flex items-center justify-between gap-4">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 rounded-full border-2 border-surface-highest bg-primary-brand flex items-center justify-center text-on-primary">
                    <PaintBucket className="w-3.5 h-3.5" />
                  </div>
                  <div className="w-8 h-8 rounded-full border-2 border-surface-highest bg-[#929090] flex items-center justify-center text-background">
                    <Sun className="w-3.5 h-3.5" />
                  </div>
                </div>
                <Link to="/wrap" className="h-10 px-5 rounded-lg bg-primary-brand text-on-primary font-bold text-sm flex items-center justify-center hover:brightness-110 transition-all">
                  Continue
                </Link>
              </div>
            </div>
          </div>

          {/* Empty State / Add Build */}
          <Link 
            to="/rim"
            className="border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center p-12 gap-4 group hover:border-primary-brand/50 hover:bg-primary-brand/5 transition-all duration-300 h-full min-h-[400px]"
          >
            <div className="w-16 h-16 rounded-full bg-surface-highest flex items-center justify-center group-hover:bg-primary-brand group-hover:text-on-primary transition-all text-on-surface-muted">
              <Plus className="w-8 h-8" />
            </div>
            <div className="text-center">
              <h4 className="text-xl font-medium text-on-surface mb-2 tracking-tight">Start a New Build</h4>
              <p className="text-sm text-on-surface-muted">Explore our catalog of parts and finishes</p>
            </div>
          </Link>

        </div>
      </main>
    </div>
  );
}
