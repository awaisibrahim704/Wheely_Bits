import { Calendar, Clock, User, CheckCircle2, Share2, Bookmark, BookOpen, ArrowRight, ArrowLeft, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TechnicalGuide() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow pt-20">
        
        {/* Cinematic Header */}
        <section className="relative w-full h-[500px] md:h-[614px] overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105" 
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBsL4wWjoy7i18iy2UIMmtwBKQoY0r7XontxXX4BXBZMEwgMAB3diD7BXypYn5v7-1iMxe3yv0Pc8GkCgoscuh8x0r1-K5rsTSSveyzdMatpVTeAEEXIZm3iOsHaGJH5cdf2FfDCEchbNrS7tugb4PuHbraXiF66PThD1IRka-vqnSNzPnMwrCcGnFsvmdpA29PizWwedt7IYRohTRxGmNvOZkvDeDbXUuWJbfVqy2rrMziUX-9UjzJB43zZ7QHJe9RHy0s6KhPF_G3")' }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"></div>
          
          {/* Back Button */}
          <div className="absolute top-8 left-4 md:left-12 z-30">
            <Link to="/education" className="flex items-center gap-2 text-sm font-semibold text-white bg-background/40 hover:bg-background/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 transition-all shadow-lg hover:shadow-black/50">
              <ArrowLeft className="w-4 h-4" /> Back to Hub
            </Link>
          </div>

          <div className="absolute bottom-0 left-0 w-full px-4 md:px-12 pb-12 flex flex-col items-center text-center md:text-left md:items-start max-w-[1280px] mx-auto z-20">
            <div className="max-w-4xl w-full mx-auto md:mx-0">
              <span className="inline-block py-1.5 px-4 mb-4 rounded-full bg-primary-brand/20 text-primary-brand text-xs font-bold tracking-widest border border-primary-brand/20 backdrop-blur-sm">
                TECHNICAL GUIDE
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium text-on-surface leading-tight mb-6 tracking-tight drop-shadow-lg">
                Understanding Wheel Offset & Backspacing
              </h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6 text-on-surface-muted text-sm font-medium">
                <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Oct 24, 2024</span>
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 12 min read</span>
                <span className="flex items-center gap-1.5"><User className="w-4 h-4" /> Engineering Team</span>
              </div>
            </div>
          </div>
        </section>

        {/* Content Area */}
        <section className="px-4 md:px-12 mt-12 pb-24 max-w-[1280px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Main Article Column */}
            <article className="lg:col-span-8 bg-surface-high/60 backdrop-blur-md p-8 md:p-12 rounded-2xl border border-white/5 shadow-2xl">
              
              <section className="mb-12">
                <h2 className="text-3xl font-medium text-primary-brand mb-6">What is Offset?</h2>
                <p className="text-lg text-on-surface-muted mb-6 leading-relaxed">
                  At its core, wheel offset is the distance from the hub-mounting surface to the wheel's true centerline. It is measured in millimeters and determines how far the wheel sits inside or outside the vehicle's fender. Getting this measurement right is the difference between a perfect "flush" fitment and a wheel that rubs against your suspension or sticks out past the bodywork.
                </p>
                
                {/* Technical Diagram Placeholder */}
                <div className="bg-surface-highest/50 backdrop-blur-md rounded-2xl p-6 my-10 relative overflow-hidden group border border-white/5">
                  <div 
                    className="w-full h-[400px] bg-cover bg-center rounded-xl grayscale group-hover:grayscale-0 transition-all duration-700" 
                    style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBVtjYc9uubu8y1HU5LnMv6Y45gLEm9qqz5ln1rSCwGo2AXjZKyOc9BjfxXEPpcCq-Pf4qtQkOzmQB5JsGASLxOsOweMmsHWB4N250o8CYfEHmn4tDh1N17qpJ1Dm_ou-5knnb9EAv1rnZg4Cy_8nhSSrGk-qfPosrkA2PlU9qI7eFUuZ_NNc3schyy0OgUjj2xG4s1BKfYMahKuWVuFqxBDOzbMn2v-GYr-YIILXFeR4AqiAKIh3fLnt5-ZAoKCcilDlgWm7etbzYf")' }}
                  ></div>
                  <div className="mt-4 text-center text-sm text-on-surface-muted italic font-medium">
                    Fig 1.1: Cross-section analysis of wheel centerline vs. mounting surface.
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-medium text-secondary-brand mb-6">Positive vs. Negative Offset</h2>
                <p className="text-lg text-on-surface-muted mb-6 leading-relaxed">
                  Understanding the polarity of your offset is crucial for choosing the right look for your build.
                </p>
                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="p-8 border border-white/5 rounded-2xl bg-surface-highest/30 transition-colors hover:bg-surface-highest/50">
                    <h3 className="text-2xl font-medium text-primary-brand mb-3">Positive Offset</h3>
                    <p className="text-on-surface-muted leading-relaxed">The hub-mounting surface is toward the front or street side of the wheel. Common on modern front-wheel-drive cars.</p>
                  </div>
                  <div className="p-8 border border-white/5 rounded-2xl bg-surface-highest/30 transition-colors hover:bg-surface-highest/50">
                    <h3 className="text-2xl font-medium text-secondary-brand mb-3">Negative Offset</h3>
                    <p className="text-on-surface-muted leading-relaxed">The hub-mounting surface is toward the back or brake side of the wheel. Typical for "deep dish" wheels on off-road or classic muscle cars.</p>
                  </div>
                </div>
              </section>

              <section className="mb-12">
                <h2 className="text-3xl font-medium text-primary-brand mb-6">How it Affects Fitment</h2>
                <p className="text-lg text-on-surface-muted mb-6 leading-relaxed">
                  Changing your offset doesn't just change the look; it alters the vehicle's handling characteristics. An incorrect offset can increase the load on your bearings, change the steering's "scrub radius," and lead to premature tire wear.
                </p>
                <ul className="space-y-6 text-on-surface-muted mt-8">
                  <li className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary-brand shrink-0 mt-0.5" />
                    <div className="leading-relaxed"><strong className="text-on-surface font-semibold block mb-1">Fender Clearance:</strong> Low offset pushes the wheel out, potentially causing it to rub the fender lip during compression.</div>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary-brand shrink-0 mt-0.5" />
                    <div className="leading-relaxed"><strong className="text-on-surface font-semibold block mb-1">Suspension Integrity:</strong> High offset tucks the wheel in, which might interfere with brake calipers or strut towers.</div>
                  </li>
                  <li className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary-brand shrink-0 mt-0.5" />
                    <div className="leading-relaxed"><strong className="text-on-surface font-semibold block mb-1">Turning Radius:</strong> Significant changes can alter the geometry of your steering, making the car feel heavy or twitchy.</div>
                  </li>
                </ul>
              </section>

              <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center">
                <div className="flex gap-3">
                  <span className="px-4 py-1.5 bg-background/50 border border-white/5 rounded-full text-xs font-bold text-on-surface-muted tracking-wide">#Engineering</span>
                  <span className="px-4 py-1.5 bg-background/50 border border-white/5 rounded-full text-xs font-bold text-on-surface-muted tracking-wide">#WheelGuide</span>
                </div>
                <div className="flex gap-4">
                  <button className="w-10 h-10 rounded-full bg-background/50 border border-white/5 flex items-center justify-center text-on-surface-muted hover:text-primary-brand hover:bg-background transition-all">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button className="w-10 h-10 rounded-full bg-background/50 border border-white/5 flex items-center justify-center text-on-surface-muted hover:text-primary-brand hover:bg-background transition-all">
                    <Bookmark className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4 space-y-6">
              
              {/* Related Articles */}
              <div className="bg-surface-high/60 backdrop-blur-md rounded-2xl p-6 border border-white/5">
                <h3 className="text-xl font-medium text-on-surface mb-6 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary-brand" /> Related Articles
                </h3>
                <div className="space-y-2">
                  <a href="#" className="group block p-4 rounded-xl hover:bg-white/5 transition-all">
                    <span className="text-xs font-bold text-primary-brand uppercase tracking-wider mb-1.5 block">Fitment Basics</span>
                    <p className="text-sm font-medium text-on-surface group-hover:text-primary-brand transition-colors leading-snug">Bolt Pattern Guide: Everything You Need to Know</p>
                  </a>
                  <a href="#" className="group block p-4 rounded-xl hover:bg-white/5 transition-all">
                    <span className="text-xs font-bold text-primary-brand uppercase tracking-wider mb-1.5 block">Tire Science</span>
                    <p className="text-sm font-medium text-on-surface group-hover:text-primary-brand transition-colors leading-snug">Rim Width vs Tire Size: Finding the Sweet Spot</p>
                  </a>
                  <a href="#" className="group block p-4 rounded-xl hover:bg-white/5 transition-all">
                    <span className="text-xs font-bold text-primary-brand uppercase tracking-wider mb-1.5 block">Performance</span>
                    <p className="text-sm font-medium text-on-surface group-hover:text-primary-brand transition-colors leading-snug">Unsprung Weight: The Hidden Performance Killer</p>
                  </a>
                </div>
              </div>

              {/* CTA / Community */}
              <div className="bg-surface-high/60 backdrop-blur-md rounded-2xl p-8 border border-primary-brand/20 relative overflow-hidden group">
                <div className="relative z-10">
                  <h3 className="text-2xl font-medium text-primary-brand mb-2">Join the Community</h3>
                  <p className="text-sm text-on-surface-muted mb-6 leading-relaxed">Share your build and get fitment advice from wheel experts.</p>
                  <Link to="/community" className="w-full bg-primary-brand text-on-primary py-3 rounded-xl text-sm font-bold tracking-widest hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary-brand/20 flex justify-center">
                    VIEW GALLERY
                  </Link>
                </div>
                <div className="absolute -right-6 -bottom-6 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                  <Users className="w-48 h-48" />
                </div>
              </div>

              {/* Technical Illustration Widget */}
              <div className="bg-surface-high/60 backdrop-blur-md rounded-2xl overflow-hidden border border-white/5 group cursor-pointer">
                <div 
                  className="h-48 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
                  style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCLRcDfvdnGIOJCb_lxQ9Ft-0PMKfFmdP8GxQOfNkaU-5Ij8vT7uYM8QutyvWiPU5TTCxTBTDGUq5vCDvXzr1zxDD3X7-O3sR1aylyqnMcoB2efFSheJJ79oR97NAuqywZSM3SvW60uZKL_Hrh7Dl2c84iQtj8xI3FpH5uLB0McbEbGmSjhRrn3lHtQiw7aEnzvC3gHpOmXx4quLgDiEXluhWUHAiIB8YMYeuaXAJYfC49M2Ng-6tfxscs6jevq545odXppScbVlsg0")' }}
                ></div>
                <div className="p-6 relative z-10 bg-surface-highest/80 backdrop-blur-sm -mt-4 rounded-t-2xl border-t border-white/5">
                  <h4 className="text-base font-bold text-on-surface mb-2 group-hover:text-primary-brand transition-colors">Visual Offset Calculator</h4>
                  <p className="text-xs font-medium text-on-surface-muted mb-4 leading-relaxed">Visualize how different offsets change your wheel position.</p>
                  <button className="flex items-center gap-2 text-primary-brand text-xs font-bold tracking-widest group-hover:gap-3 transition-all">
                    LAUNCH TOOL <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </aside>
          </div>
        </section>
      </div>
    </div>
  );
}
