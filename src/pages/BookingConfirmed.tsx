import { Link } from 'react-router-dom';
import { CheckCircle2, Calendar, MapPin, Map, CalendarPlus, CarFront } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function BookingConfirmed() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true);
  }, []);

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-background">
      {/* Background Layer */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] scale-105 hover:scale-110"
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDOIW4SQG7XoFuGNO7iAS7hAZYzAeqUfNIUPQYdrGeGPxjejM4Yoc6ZBvsWs808ukIVHId0S2kceDm152q80F3mJ5WhtMXKLIIZZ8zXHdeqtWkIxBzXvneQyXHCfNvdWEf83POL3NpIjRsnRRqS5bHDpZnGOKXZ1O4oSPoBfiVOiicxxtpyMnpM-bDv7PJJ-PeTqrGuLA2j7N0spJTeSHmeiiT0b-z40t2ACt3_6alZBPH9nMK_O-9bdhAZh3nXj3_j-mbz7gs3mDUy')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background/90"></div>
      </div>

      {/* Main Success Content */}
      <main className="relative z-10 flex-grow flex items-center justify-center px-4 md:px-12 py-32">
        <div className="w-full max-w-2xl flex flex-col items-center">
          
          {/* Animated Success Icon */}
          <div className={`transition-all duration-700 ease-out transform ${show ? 'scale-100 opacity-100' : 'scale-50 opacity-0'} mb-12`}>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-primary-brand/20 blur-3xl rounded-full"></div>
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-surface-high/40 backdrop-blur-md flex items-center justify-center border border-primary-brand/30 shadow-[0_0_50px_rgba(171,207,178,0.2)]">
                <CheckCircle2 className="w-20 h-20 md:w-24 md:h-24 text-primary-brand" strokeWidth={1} />
              </div>
            </div>
          </div>

          {/* Confirmation Text */}
          <div className={`text-center transition-all duration-700 delay-200 ease-out transform ${show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <h1 className="text-4xl md:text-5xl font-medium text-on-surface mb-4 tracking-tight drop-shadow-md">
              Booking Confirmed!
            </h1>
            <p className="text-lg text-on-surface-muted max-w-md mx-auto leading-relaxed">
              Your appointment at <span className="text-primary-brand font-bold">Aura Custom Studio</span> is set for June 15th.
            </p>
          </div>

          {/* Detail Card */}
          <div className={`w-full mt-12 bg-surface-high/60 backdrop-blur-xl rounded-2xl p-8 border border-white/10 shadow-2xl transition-all duration-700 delay-300 ease-out transform ${show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              {/* Date & Time */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-background/80 flex items-center justify-center text-primary-brand border border-white/5 shadow-inner">
                  <Calendar className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <p className="text-xs font-bold text-on-surface-muted uppercase tracking-widest mb-1">Date & Time</p>
                  <p className="text-lg font-medium text-on-surface">June 15th, 2024</p>
                  <p className="text-sm text-on-surface-muted">10:00 AM — 12:30 PM</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-background/80 flex items-center justify-center text-primary-brand border border-white/5 shadow-inner">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <p className="text-xs font-bold text-on-surface-muted uppercase tracking-widest mb-1">Studio Location</p>
                  <p className="text-lg font-medium text-on-surface">Aura Custom Studio</p>
                  <p className="text-sm text-on-surface-muted">42nd Design Way, Suite 8</p>
                </div>
              </div>
            </div>

            <div className="my-8 border-t border-white/10 w-full"></div>

            {/* Booking Meta */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-on-surface-muted uppercase tracking-widest">CONFIRMATION ID:</span>
                <span className="text-sm font-mono text-on-surface tracking-widest bg-background/50 px-2 py-1 rounded border border-white/5">WB-9902-AUR</span>
              </div>
              <div className="px-3 py-1 bg-primary-brand/10 rounded-full border border-primary-brand/30">
                <span className="text-xs font-bold text-primary-brand uppercase tracking-widest">STATUS: SECURED</span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className={`mt-12 w-full grid grid-cols-1 md:grid-cols-3 gap-4 transition-all duration-700 delay-500 ease-out transform ${show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <button className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-primary-brand text-on-primary font-bold hover:brightness-110 transition-all active:scale-95 shadow-lg shadow-primary-brand/20">
              <CalendarPlus className="w-5 h-5" />
              Add to Calendar
            </button>
            <button className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-white/10 bg-surface-high/40 backdrop-blur-md text-on-surface font-bold hover:bg-surface-highest transition-all active:scale-95">
              <Map className="w-5 h-5" />
              View Directions
            </button>
            <Link to="/garage" className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-white/10 bg-surface-high/40 backdrop-blur-md text-on-surface font-bold hover:bg-surface-highest transition-all active:scale-95">
              <CarFront className="w-5 h-5" />
              Back to Garage
            </Link>
          </div>

          {/* Support Link */}
          <p className={`mt-12 text-sm text-on-surface-muted transition-all duration-700 delay-700 ease-out transform ${show ? 'opacity-100' : 'opacity-0'}`}>
            Need to reschedule? <a className="text-primary-brand font-bold hover:underline" href="#">Contact Support</a>
          </p>
        </div>
      </main>
    </div>
  );
}
