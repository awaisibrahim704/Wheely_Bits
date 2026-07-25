import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Store, Star, Info, ArrowRight, ShieldCheck } from 'lucide-react';

export default function ScheduleInstallation() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState<number | null>(7);
  const [selectedTime, setSelectedTime] = useState<string | null>('11:30 AM');

  // Helper for generating calendar dates
  const generateDates = () => {
    const dates = [];
    for (let i = 28; i <= 30; i++) {
      dates.push({ day: i, currentMonth: false });
    }
    for (let i = 1; i <= 17; i++) {
      dates.push({ day: i, currentMonth: true });
    }
    dates.push({ day: 18, currentMonth: false });
    return dates;
  };

  const handleConfirm = () => {
    navigate('/booking/success');
  };

  return (
    <div className="flex flex-col min-h-screen pb-24">
      <main className="flex-grow pt-32 px-4 md:px-12 max-w-[1280px] mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* LEFT SECTION: Scheduling & Date Selection */}
          <section className="w-full lg:w-2/3 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <button 
                onClick={() => navigate(-1)} 
                className="inline-flex items-center gap-2 text-sm font-semibold text-on-surface-muted hover:text-primary-brand transition-colors mb-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Back to Vendor
              </button>
              <h1 className="text-4xl md:text-5xl font-medium text-on-surface tracking-tight">Schedule Installation</h1>
              <p className="text-on-surface-muted text-lg max-w-2xl">
                Secure your slot for the British Racing Green transform. Aura Custom Studio requires a 48-hour notice for cancellations.
              </p>
            </div>

            {/* Calendar Component */}
            <div className="bg-surface-high/60 backdrop-blur-md rounded-2xl p-8 border border-white/5 shadow-2xl">
              <div className="flex items-center justify-between mb-8">
                <div className="flex flex-col">
                  <span className="text-2xl font-medium text-on-surface">October 2024</span>
                  <span className="text-xs font-bold text-on-surface-muted uppercase tracking-widest mt-1">Select Installation Date</span>
                </div>
                <div className="flex gap-2">
                  <button className="p-2 rounded-full border border-white/10 hover:bg-surface-highest transition-colors">
                    <ChevronLeft className="w-5 h-5 text-on-surface" />
                  </button>
                  <button className="p-2 rounded-full border border-white/10 hover:bg-surface-highest transition-colors">
                    <ChevronRight className="w-5 h-5 text-on-surface" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 text-center text-sm font-bold mb-4 text-on-surface-muted uppercase tracking-wider">
                <div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div><div>Sun</div>
              </div>

              <div className="grid grid-cols-7 gap-2">
                {generateDates().map((date, idx) => (
                  <button 
                    key={idx}
                    onClick={() => date.currentMonth && setSelectedDate(date.day)}
                    disabled={!date.currentMonth}
                    className={`aspect-square flex items-center justify-center rounded-xl text-sm transition-all ${
                      !date.currentMonth 
                        ? 'text-on-surface-muted/30 cursor-default' 
                        : selectedDate === date.day 
                          ? 'bg-primary-brand text-on-primary font-bold shadow-[0_0_15px_rgba(171,207,178,0.4)]' 
                          : 'text-on-surface hover:bg-surface-highest cursor-pointer font-medium'
                    }`}
                  >
                    {date.day}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slot Grid */}
            <div className="flex flex-col gap-4 mt-4">
              <h3 className="text-sm font-bold text-primary-brand tracking-widest uppercase">Available Times</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {['09:00 AM', '11:30 AM', '02:00 PM', '04:30 PM'].map((time) => (
                  <button 
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-4 px-6 rounded-xl transition-all text-sm font-bold flex items-center justify-center ${
                      selectedTime === time
                        ? 'border-2 border-primary-brand bg-primary-brand/10 text-primary-brand shadow-inner'
                        : 'border border-white/10 bg-background/50 text-on-surface hover:border-primary-brand/50'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* RIGHT SECTION: Build Review Panel */}
          <aside className="w-full lg:w-1/3 lg:sticky lg:top-32 flex flex-col gap-6">
            <div className="bg-surface-high/60 backdrop-blur-md rounded-2xl overflow-hidden border border-white/5 shadow-2xl flex flex-col">
              
              {/* Image Header */}
              <div className="relative h-48 w-full">
                <div className="absolute inset-0 bg-gradient-to-t from-surface-high to-transparent z-10"></div>
                <div 
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC1MxKg0a5Ufmpt235Q6WRjivAucsguESDJBEDiEwIWqVkaBT5VapIBNm53yPps5CKV9akASDMfFQcvGQXE8qc1pZ27rTLH7rRTFlwlB6oiTAhlyR9_iJ7mlolR_X_eiUTggnpkK6DrwlERJNaMSSGDHgqr3SASv6O_xA2JKi4b-ckng2xhwJUnT5jC5knYkYilOQQutB5Wq-QqEbA_8_OLxa_l-UU0TRAShxY8T7LJ0_a8w10JzxXxBBKayQG-puBkXZBREFRYHjH7')" }}
                ></div>
                <div className="absolute bottom-6 left-6 z-20">
                  <span className="bg-primary-brand/20 backdrop-blur-md text-primary-brand border border-primary-brand/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-3 inline-block">
                    Scheduled Service
                  </span>
                  <h2 className="text-2xl font-medium text-white drop-shadow-md">British Racing Green Wrap</h2>
                </div>
              </div>

              {/* Panel Content */}
              <div className="p-8 flex flex-col gap-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-background flex items-center justify-center border border-white/10 shadow-inner">
                      <Store className="w-6 h-6 text-primary-brand" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-bold text-on-surface">Aura Custom Studio</span>
                      <span className="text-xs text-on-surface-muted">Silverstone Technopark</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1 text-secondary-brand">
                      <Star className="w-4 h-4 fill-secondary-brand" />
                      <span className="font-bold text-sm">4.9</span>
                    </div>
                    <span className="text-xs text-on-surface-muted">124 Reviews</span>
                  </div>
                </div>

                <div className="h-[1px] bg-white/5 w-full"></div>

                {/* Cost Breakdown */}
                <div className="flex flex-col gap-4 text-sm">
                  <div className="flex justify-between items-center text-on-surface-muted">
                    <span>Service Estimate</span>
                    <span>$3,450.00</span>
                  </div>
                  <div className="flex justify-between items-center text-on-surface-muted">
                    <span>Materials (Satin Film)</span>
                    <span>$1,200.00</span>
                  </div>
                  <div className="flex justify-between items-center text-primary-brand font-bold text-base mt-2">
                    <span>Reservation Deposit</span>
                    <span>$50.00</span>
                  </div>
                  
                  {/* Deposit Breakdown Alert */}
                  <div className="bg-primary-brand/10 border border-primary-brand/20 rounded-xl p-4 flex gap-3 mt-2">
                    <Info className="w-5 h-5 text-primary-brand shrink-0" />
                    <div className="flex flex-col gap-1">
                      <span className="font-bold text-primary-brand text-xs uppercase tracking-wider">Refundable Deposit</span>
                      <p className="text-xs text-on-surface-muted leading-relaxed">
                        This $50.00 deposit secures your shop time and technician. It is fully refundable if cancelled 48 hours prior to the appointment.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="h-[1px] bg-white/5 w-full"></div>

                {/* Total Footer */}
                <div className="flex flex-col gap-6">
                  <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-on-surface-muted uppercase tracking-widest mb-1">Total Due Today</span>
                      <span className="text-3xl font-medium text-on-surface">$50.00</span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span className="text-xs font-bold text-on-surface-muted uppercase tracking-widest mb-1">Est. Final</span>
                      <span className="text-lg font-bold text-on-surface-muted">$4,700.00</span>
                    </div>
                  </div>
                  
                  <button 
                    onClick={handleConfirm}
                    className="w-full bg-primary-brand hover:brightness-110 text-on-primary font-bold h-14 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-primary-brand/20 tracking-widest uppercase"
                  >
                    Confirm & Pay Deposit
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Technical Specs Mini-Card */}
            <div className="bg-surface-high/60 backdrop-blur-md rounded-xl p-4 flex items-center gap-4 border-l-4 border-l-primary-brand border border-white/5 shadow-lg">
              <ShieldCheck className="w-8 h-8 text-on-surface-muted shrink-0" />
              <span className="text-xs text-on-surface-muted leading-relaxed">Price includes 5-year manufacturer warranty on film adhesion and color fastness.</span>
            </div>

          </aside>
          
        </div>
      </main>
    </div>
  );
}
