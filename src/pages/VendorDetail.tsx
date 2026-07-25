import { Link } from 'react-router-dom';
import { Star, MapPin, Calendar, Clock, CheckCircle2, Shield, Wrench, ArrowRight, ArrowLeft } from 'lucide-react';

export default function VendorDetail() {
  return (
    <div className="flex flex-col min-h-screen pb-24">
      {/* Cinematic Hero Cover */}
      <section className="relative h-[600px] w-full overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD9F1mICWPdflbRwCZfZTQefS8eqNmp-h0Ezz7lR6uME1F-X48RcmklrDmESIs9FFqSOKGtzkAsEer3f-jjvuUUk3LJqUpvin6Xq6Rp2J0ln5v0Yh3ctcxkiKPxFT4iPJ3AxJD12gwlVycfXxH6-XEy347fykCC_vYCBIavoUwrGYy5WampofCYCB4vncvbLERvNzSvhvirzcDzSN13covKYqyXJsMsCRhHGkvtPFhzjQxEaT9RamS-wMykixW1uEdZi_5j_NY8e7XU')" }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
        
        {/* Back Button */}
        <div className="absolute top-8 left-4 md:left-12 z-20">
          <Link to="/vendors" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors font-bold uppercase tracking-widest text-xs bg-black/20 hover:bg-black/40 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
            <ArrowLeft className="w-4 h-4" />
            Back to Vendors
          </Link>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 px-4 md:px-12 max-w-[1280px] mx-auto pb-12 flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap items-center gap-4">
              <span className="bg-primary-brand/20 backdrop-blur-md text-primary-brand border border-primary-brand/30 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
                Master Certified
              </span>
              <div className="flex items-center gap-1 bg-background/50 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                <Star className="w-4 h-4 text-secondary-brand fill-secondary-brand" />
                <span className="font-bold text-on-surface text-sm">4.9</span>
                <span className="text-on-surface-muted text-xs">(128 Reviews)</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-6xl font-medium text-on-surface tracking-tight drop-shadow-lg">
              Aura Custom Studio
            </h1>
            <div className="flex items-center gap-2 text-on-surface-muted">
              <MapPin className="w-5 h-5" />
              <span className="text-lg">Silverstone Technopark, CA</span>
            </div>
          </div>
          
          <div className="w-full md:w-auto">
            <Link 
              to="/booking/schedule" 
              className="bg-primary-brand hover:brightness-110 text-on-primary font-bold px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-lg shadow-primary-brand/20 w-full md:w-auto"
            >
              <Calendar className="w-5 h-5" />
              Schedule Installation
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <main className="px-4 md:px-12 max-w-[1280px] mx-auto w-full mt-12">
        <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Left Column: Details */}
          <div className="w-full lg:w-2/3 flex flex-col gap-12">
            
            {/* About Section */}
            <section>
              <h2 className="text-2xl font-medium text-on-surface mb-6">About the Studio</h2>
              <div className="bg-surface-high/60 backdrop-blur-md p-8 rounded-2xl border border-white/5 shadow-xl">
                <p className="text-on-surface-muted leading-relaxed mb-6">
                  Established in 2014, Aura Custom Studio is California's premier destination for bespoke automotive aesthetics. Our facility is engineered for perfection, featuring climate-controlled wrap bays, hospital-grade clean rooms for PPF, and advanced lighting arrays to ensure zero defects in our finish. We treat every vehicle as a masterclass in precision.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="flex flex-col gap-1">
                    <span className="text-3xl font-medium text-primary-brand">10+</span>
                    <span className="text-xs font-bold text-on-surface-muted uppercase tracking-wider">Years Exp.</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-3xl font-medium text-primary-brand">1.2k</span>
                    <span className="text-xs font-bold text-on-surface-muted uppercase tracking-wider">Builds</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-3xl font-medium text-primary-brand">5</span>
                    <span className="text-xs font-bold text-on-surface-muted uppercase tracking-wider">Master Techs</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-3xl font-medium text-primary-brand">24/7</span>
                    <span className="text-xs font-bold text-on-surface-muted uppercase tracking-wider">Security</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Services Section */}
            <section>
              <h2 className="text-2xl font-medium text-on-surface mb-6">Premium Services</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Service 1 */}
                <div className="bg-surface-high/60 backdrop-blur-md p-6 rounded-2xl border border-white/5 flex flex-col gap-4 group hover:border-primary-brand/30 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-primary-brand/10 flex items-center justify-center text-primary-brand">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-medium text-on-surface">Vinyl Color Change</h3>
                  <p className="text-sm text-on-surface-muted mb-4">Complete exterior transformations using premium cast vinyls from 3M, Inozetek, and Avery.</p>
                  <span className="mt-auto text-primary-brand font-bold">From $2,800</span>
                </div>
                
                {/* Service 2 */}
                <div className="bg-surface-high/60 backdrop-blur-md p-6 rounded-2xl border border-white/5 flex flex-col gap-4 group hover:border-secondary-brand/30 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-secondary-brand/10 flex items-center justify-center text-secondary-brand">
                    <Shield className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-medium text-on-surface">Paint Protection Film</h3>
                  <p className="text-sm text-on-surface-muted mb-4">Self-healing clear bra installation protecting against rock chips, scratches, and UV damage.</p>
                  <span className="mt-auto text-secondary-brand font-bold">From $1,500</span>
                </div>

                {/* Service 3 */}
                <div className="bg-surface-high/60 backdrop-blur-md p-6 rounded-2xl border border-white/5 flex flex-col gap-4 group hover:border-primary-brand/30 transition-colors">
                  <div className="w-12 h-12 rounded-xl bg-primary-brand/10 flex items-center justify-center text-primary-brand">
                    <Wrench className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-medium text-on-surface">Ceramic Coating</h3>
                  <p className="text-sm text-on-surface-muted mb-4">9H hardness nano-ceramic coating for extreme gloss and hydrophobic protection.</p>
                  <span className="mt-auto text-primary-brand font-bold">From $800</span>
                </div>

              </div>
            </section>

            {/* Gallery */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-medium text-on-surface">Recent Builds</h2>
                <button className="text-primary-brand text-sm font-bold hover:underline flex items-center gap-1">
                  View All <ArrowRight className="w-4 h-4" />
                </button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-[4/3] rounded-xl overflow-hidden">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAxas52YM3vx0HVzezi--YcSELeWQK0onF4LWcGDpgNLj9H1NWQ9r-ljBWj0l39yFfhHjSwLmz0-xQb3cNmSD6rKbv81mV0dFE_h66e5SGjggztLScXgSPX1LaCZQPGBBF8dEDqR1WLE_Qps5Li6Mg2oAVPD1cLpr3Nb1noRg2u9LG1FakOjs9ro1Pe4bxeZqtNoyjQs5xhsrndLylRb_EXYXvOcT3U0ukmF-AWdaihRU4pml6Fw8LqjN_gY0CeHLes0vbZAuq7fhMI" alt="Build 1" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="aspect-[4/3] rounded-xl overflow-hidden">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7PrXdtxO4OFvlecfasxbtmFXGBKgccOQoLksnrEPnzvKFLlzFMzZ9_3dQMA0blA52UvI6ql7QGrjbDaYBKdMjNPrTNs7H06YEZDWJyNyHYq-HQhOxVna7XFB41QMHGTHaZs0LKb06Q6_nsuGBbd_HvAmgTgEmjvRSjgM6EP3_6hNQN_qHWyZe7-tL50jBUm76bJo7ohdTciQoNWxCA8rwldjWaLUEszRZU-0SBN_lrYPIksdnByPfwjykOxVrtga6tdEKgP_fckNf" alt="Build 2" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
            </section>

          </div>
          
          {/* Right Column: Sticky Contact & Info Panel */}
          <aside className="w-full lg:w-1/3 flex flex-col gap-6">
            
            <div className="sticky top-32 flex flex-col gap-6">
              <div className="bg-surface-high/60 backdrop-blur-md p-8 rounded-2xl border border-white/5 shadow-xl">
                <h3 className="text-xl font-medium text-on-surface mb-6">Contact Studio</h3>
                
                <div className="flex flex-col gap-4 mb-8">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-on-surface-muted mt-0.5" />
                    <div className="flex flex-col">
                      <span className="text-on-surface font-medium">42nd Design Way, Suite 8</span>
                      <span className="text-on-surface-muted text-sm">Silverstone Technopark</span>
                      <span className="text-on-surface-muted text-sm">Los Angeles, CA 90021</span>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <Clock className="w-5 h-5 text-on-surface-muted mt-0.5" />
                    <div className="flex flex-col">
                      <span className="text-on-surface font-medium">Business Hours</span>
                      <span className="text-on-surface-muted text-sm">Mon-Fri: 9:00 AM - 6:00 PM</span>
                      <span className="text-on-surface-muted text-sm">Sat: 10:00 AM - 2:00 PM (By Appt)</span>
                    </div>
                  </div>
                </div>
                
                <div className="h-[1px] w-full bg-white/5 mb-8"></div>
                
                <div className="flex flex-col gap-4">
                  <Link 
                    to="/booking/schedule" 
                    className="w-full bg-primary-brand text-on-primary font-bold py-4 rounded-xl hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary-brand/20"
                  >
                    Schedule Installation
                  </Link>
                  <button className="w-full bg-transparent border border-white/10 text-on-surface font-bold py-4 rounded-xl hover:bg-surface-highest transition-all flex items-center justify-center gap-2">
                    Message Studio
                  </button>
                </div>
              </div>
              
              {/* Trust Badge */}
              <div className="bg-primary-brand/5 border border-primary-brand/20 rounded-2xl p-6 flex gap-4">
                <Shield className="w-8 h-8 text-primary-brand shrink-0" />
                <div className="flex flex-col">
                  <span className="font-medium text-primary-brand mb-1">Wheely Bits Certified</span>
                  <span className="text-sm text-on-surface-muted leading-relaxed">This vendor has passed our rigorous 40-point technical inspection and maintains a consistent 4.8+ rating.</span>
                </div>
              </div>
            </div>

          </aside>
          
        </div>
      </main>
    </div>
  );
}
