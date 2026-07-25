import { Wrench, Handshake, ShoppingBag, Send, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow pt-32 pb-16 px-4 md:px-12 max-w-[1280px] mx-auto w-full">
        
        {/* Hero Section */}
        <section className="text-center mb-16 relative">
          <div className="absolute left-0 top-0 hidden md:block">
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-on-surface-muted hover:text-primary-brand transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
          <div className="md:hidden mb-6 flex justify-center">
            <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-on-surface-muted hover:text-primary-brand transition-colors">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-on-surface mb-4 tracking-tight drop-shadow-lg">
            How can we help?
          </h1>
          <p className="text-lg text-on-surface-muted max-w-2xl mx-auto leading-relaxed">
            Our team of automotive enthusiasts and precision engineers is here to ensure your journey with Wheely Bits is seamless.
          </p>
        </section>

        {/* Support Channels Bento */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* Channel 1 */}
          <div className="bg-surface-high/60 backdrop-blur-md p-8 rounded-2xl flex flex-col items-start gap-4 group border border-white/5 hover:-translate-y-1 transition-all duration-300 hover:border-primary-brand/30 shadow-lg hover:shadow-primary-brand/10">
            <div className="w-12 h-12 rounded-xl bg-primary-brand/10 flex items-center justify-center text-primary-brand mb-2 group-hover:bg-primary-brand/20 transition-colors">
              <Wrench className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-medium text-on-surface">Technical Fitment</h3>
            <p className="text-sm text-on-surface-muted mb-4 leading-relaxed">Direct access to our senior fitment engineers for complex offset and clearance queries.</p>
            <a href="tel:+1800WHEELY" className="mt-auto text-sm font-bold text-primary-brand flex items-center gap-2 hover:underline tracking-widest uppercase">
              Connect Now <span className="text-lg leading-none">&rarr;</span>
            </a>
          </div>

          {/* Channel 2 */}
          <div className="bg-surface-high/60 backdrop-blur-md p-8 rounded-2xl flex flex-col items-start gap-4 group border border-white/5 hover:-translate-y-1 transition-all duration-300 hover:border-secondary-brand/30 shadow-lg hover:shadow-secondary-brand/10">
            <div className="w-12 h-12 rounded-xl bg-secondary-brand/10 flex items-center justify-center text-secondary-brand mb-2 group-hover:bg-secondary-brand/20 transition-colors">
              <Handshake className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-medium text-on-surface">Vendor Partnerships</h3>
            <p className="text-sm text-on-surface-muted mb-4 leading-relaxed">Dedicated onboarding support for detailing shops and performance garages looking to join our network.</p>
            <a href="#" className="mt-auto text-sm font-bold text-secondary-brand flex items-center gap-2 hover:underline tracking-widest uppercase">
              Partner Inquiry <span className="text-lg leading-none">&rarr;</span>
            </a>
          </div>

          {/* Channel 3 */}
          <div className="bg-surface-high/60 backdrop-blur-md p-8 rounded-2xl flex flex-col items-start gap-4 group border border-white/5 hover:-translate-y-1 transition-all duration-300 hover:border-primary-brand/30 shadow-lg hover:shadow-primary-brand/10">
            <div className="w-12 h-12 rounded-xl bg-primary-brand/10 flex items-center justify-center text-primary-brand mb-2 group-hover:bg-primary-brand/20 transition-colors">
              <ShoppingBag className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-medium text-on-surface">Orders & Bookings</h3>
            <p className="text-sm text-on-surface-muted mb-4 leading-relaxed">Real-time tracking, service rescheduling, and transaction queries handled by our concierge.</p>
            <a href="#" className="mt-auto text-sm font-bold text-primary-brand flex items-center gap-2 hover:underline tracking-widest uppercase">
              Track Order <span className="text-lg leading-none">&rarr;</span>
            </a>
          </div>
        </div>

        {/* Contact Form Section */}
        <section className="max-w-3xl mx-auto">
          <div className="bg-surface-high/60 backdrop-blur-md p-8 md:p-12 rounded-2xl border border-primary-brand/10 shadow-2xl">
            <div className="mb-8">
              <h2 className="text-3xl font-medium text-on-surface mb-2">Send us a message</h2>
              <p className="text-sm text-on-surface-muted">Expected response time is under 12 hours for all verified owners.</p>
            </div>
            <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Inquiry Sent!'); }}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-on-surface-muted uppercase tracking-wider ml-1">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="bg-background/50 border border-white/10 rounded-xl p-4 text-on-surface focus:outline-none focus:border-primary-brand focus:ring-1 focus:ring-primary-brand/50 transition-all placeholder:text-on-surface-muted/50" 
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-on-surface-muted uppercase tracking-wider ml-1">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="bg-background/50 border border-white/10 rounded-xl p-4 text-on-surface focus:outline-none focus:border-primary-brand focus:ring-1 focus:ring-primary-brand/50 transition-all placeholder:text-on-surface-muted/50" 
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-on-surface-muted uppercase tracking-wider ml-1">Inquiry Topic</label>
                <select className="bg-background/50 border border-white/10 rounded-xl p-4 text-on-surface focus:outline-none focus:border-primary-brand focus:ring-1 focus:ring-primary-brand/50 transition-all appearance-none cursor-pointer">
                  <option className="bg-surface-high">Product Compatibility</option>
                  <option className="bg-surface-high">Installation Appointment</option>
                  <option className="bg-surface-high">Warranty Claim</option>
                  <option className="bg-surface-high">International Shipping</option>
                  <option className="bg-surface-high">Other</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-on-surface-muted uppercase tracking-wider ml-1">Message</label>
                <textarea 
                  placeholder="How can we assist your build?" 
                  rows={4} 
                  className="bg-background/50 border border-white/10 rounded-xl p-4 text-on-surface focus:outline-none focus:border-primary-brand focus:ring-1 focus:ring-primary-brand/50 transition-all resize-none placeholder:text-on-surface-muted/50"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="w-full bg-primary-brand text-on-primary font-bold py-4 rounded-xl hover:brightness-110 transition-all active:scale-[0.98] flex items-center justify-center gap-2 mt-4 tracking-widest shadow-lg shadow-primary-brand/20"
              >
                TRANSMIT INQUIRY
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </section>

        {/* Decorative Map/Visual element */}
        <section className="mt-16 rounded-2xl overflow-hidden h-[400px] relative group border border-white/5 shadow-2xl">
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-background via-background/40 to-transparent opacity-80"></div>
          
          <div className="absolute bottom-8 left-8 z-20 bg-surface-highest/80 backdrop-blur-md p-6 rounded-xl max-w-sm border border-white/10">
            <h4 className="text-sm font-bold text-primary-brand mb-1 uppercase tracking-widest">Global HQ</h4>
            <p className="text-base font-medium text-on-surface mb-2">Stuttgart Performance District, DE</p>
            <p className="text-xs text-on-surface-muted font-medium">Open Mon-Fri: 09:00 - 18:00 CET</p>
          </div>
          
          <div className="w-full h-full bg-surface-highest flex items-center justify-center overflow-hidden">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDCaE_4LA8w8bLNeJgGeWW_36MhezXzCI1Qx_vFeRnOueKWrklJym2fhS4VYYDatkDQo7KvQTwit4T9xr2bCT4kshYlK-TCvNPaucivRuLbf1pVVRiGziglfFvHBh3IgopAns7ezRKV_8Ju8qqKmzLWFD9LRwzyk8OO64Z9KeYrl7R4ZO_nrvHjHjbzaBvfOWSVdP2LNeMjPiR9OKUuTN9d4U9s1cIOnb-ZxXfb47TDYUTi2MwrlKyjB8smyfK3Re8DYvyuxtuO5BqY" 
              alt="Global HQ" 
              className="w-full h-full object-cover grayscale opacity-40 group-hover:opacity-60 group-hover:scale-105 transition-all duration-700" 
            />
          </div>
        </section>

      </div>
    </div>
  );
}
