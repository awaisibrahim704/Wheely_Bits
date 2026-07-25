import { useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Wrench, Search, Star, ArrowRight } from 'lucide-react';

export default function VendorDirectory() {
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedService, setSelectedService] = useState('');

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow pt-32 pb-16 px-4 md:px-12 max-w-[1280px] mx-auto w-full">
        
        {/* Hero Section */}
        <section className="mb-16 text-center md:text-left relative rounded-3xl overflow-hidden bg-surface-high/60 backdrop-blur-md p-8 md:p-16 border border-white/5 shadow-2xl group">
          <div className="absolute inset-0 z-0">
            <div 
              className="w-full h-full bg-cover bg-center opacity-30 mix-blend-luminosity group-hover:opacity-40 transition-opacity duration-700"
              style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAMeJTXcRKG8M5v5pt2RrmWOTQ2FJN8Y1i9oYBDS7mEhAQwdsn4dfSbvVTbjUiSH7N2l8LaMhyTtoDQjgkSmOQXz4ImW12zLKo7IsNWPazorSAOee_vyCZa2_OBIDxmwp-J_maZWtrBf6ePMrgXIINmBUCT18FCihyzX_m4U5_5VMunRPo0ObyB0EsSrFc2D_qrFBur-uoVrs-rAtpPAr1IDzM9HLGb-Wm4bFceh_hOvekMPQc0XkjKH6I3djf3f_hcfNeeSSOp495f')" }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-transparent"></div>
          </div>
          
          <div className="relative z-10 max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-medium text-on-surface mb-4 tracking-tight drop-shadow-lg">
              Verified Partners
            </h1>
            <p className="text-lg text-on-surface-muted mb-8 leading-relaxed">
              Connect with industry-leading specialists. Find the perfect artisan for your rim, wrap, and tint projects, curated for excellence and precision.
            </p>
            
            {/* Search & Filter Bar */}
            <div className="flex flex-col md:flex-row gap-2 bg-surface-highest/80 p-2 rounded-xl border border-white/5">
              <div className="flex-grow flex items-center bg-background rounded-lg px-4 py-2 border border-white/10 focus-within:border-primary-brand focus-within:ring-1 focus-within:ring-primary-brand transition-all">
                <MapPin className="w-5 h-5 text-on-surface-muted mr-2" />
                <input 
                  type="text" 
                  placeholder="City or Postal Code" 
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="bg-transparent border-none focus:outline-none text-on-surface w-full placeholder:text-on-surface-muted/50" 
                />
              </div>
              <div className="flex-grow flex items-center bg-background rounded-lg px-4 py-2 border border-white/10 focus-within:border-primary-brand focus-within:ring-1 focus-within:ring-primary-brand transition-all">
                <Wrench className="w-5 h-5 text-on-surface-muted mr-2" />
                <select 
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="bg-transparent border-none focus:outline-none text-on-surface w-full appearance-none cursor-pointer"
                >
                  <option className="bg-surface-high text-on-surface" value="">All Services</option>
                  <option className="bg-surface-high text-on-surface" value="rims">Rims & Wheels</option>
                  <option className="bg-surface-high text-on-surface" value="wraps">Vinyl Wraps</option>
                  <option className="bg-surface-high text-on-surface" value="tints">Window Tints</option>
                  <option className="bg-surface-high text-on-surface" value="builds">Full Builds</option>
                </select>
              </div>
              <button className="bg-primary-brand/20 text-primary-brand font-bold px-6 py-3 rounded-lg hover:bg-primary-brand hover:text-on-primary transition-colors flex items-center justify-center min-h-[48px]">
                <Search className="w-5 h-5 mr-2" />
                Search
              </button>
            </div>
          </div>
        </section>

        {/* Featured Vendor */}
        <section className="mb-16">
          <div className="flex items-center gap-2 mb-6">
            <Star className="w-6 h-6 text-secondary-brand fill-secondary-brand" />
            <h2 className="text-2xl font-medium text-on-surface">Featured Partner</h2>
          </div>
          
          <div className="bg-surface-high/60 backdrop-blur-md rounded-2xl overflow-hidden flex flex-col md:flex-row group border border-white/5 shadow-2xl hover:-translate-y-1 transition-transform duration-300">
            <div className="md:w-2/5 h-64 md:h-auto relative overflow-hidden">
              <img 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCct7n1INzAxZfo5Oy9Lt_54w2Tyx0Xa-dnKQh0wJNm7cA5cmhsQe34X5K2vK2oaiIwEFpYP7-lowUK-2VC3s30au5zCwkXSFd7gb5L1sEky64-zYekZbykaPqjVr0YacMXO4bqEIKsCOpvgpPdO7UNpzBERUFFm5UsKaPE7j4e7xtb3s7_MfzKhf0rfjT-kbbGw9cSlyJqPy9atYDMPhOfsb8CBcnXNErTnrwvt4i5wMr1d1pOVty71huma8T1SNbuPfr0T6nwGUDy" 
                alt="Apex Auto Wraps" 
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent md:bg-gradient-to-r md:from-transparent md:to-background/90"></div>
            </div>
            
            <div className="p-8 md:w-3/5 flex flex-col justify-center relative">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-3xl font-medium text-on-surface mb-1">Aura Custom Studio</h3>
                  <div className="flex items-center gap-1 text-sm text-on-surface-muted">
                    <MapPin className="w-4 h-4" />
                    <span>Silverstone Technopark, CA</span>
                  </div>
                </div>
                <div className="bg-background/50 px-3 py-1 rounded-full border border-white/10 flex items-center gap-1">
                  <Star className="w-4 h-4 text-secondary-brand fill-secondary-brand" />
                  <span className="font-bold text-on-surface">4.9</span>
                  <span className="text-on-surface-muted text-xs">(128 reviews)</span>
                </div>
              </div>
              
              <p className="text-on-surface-muted mb-6 line-clamp-3 leading-relaxed">
                Specializing in premium color-change wraps, paint protection film (PPF), and ceramic coatings. Aura brings over a decade of meticulous craftsmanship to every build, ensuring a flawless finish that protects and stuns.
              </p>
              
              <div className="flex gap-2 mb-6 flex-wrap">
                <span className="px-3 py-1 rounded-full bg-secondary-brand/10 text-secondary-brand border border-secondary-brand/20 text-xs font-bold uppercase tracking-wider">Premium Wraps</span>
                <span className="px-3 py-1 rounded-full bg-surface-highest text-on-surface-muted border border-white/5 text-xs font-bold uppercase tracking-wider">PPF</span>
                <span className="px-3 py-1 rounded-full bg-surface-highest text-on-surface-muted border border-white/5 text-xs font-bold uppercase tracking-wider">Ceramic</span>
              </div>
              
              <div className="mt-auto">
                <Link to="/vendors/aura-custom-studio" className="bg-transparent border border-white/10 text-primary-brand hover:bg-surface-highest hover:text-primary-brand transition-colors font-bold px-6 py-3 rounded-lg flex items-center gap-2 w-fit">
                  View Profile
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Vendor Grid */}
        <section>
          <h2 className="text-2xl font-medium text-on-surface mb-6">Explore Partners</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* Vendor Card 1 */}
            <div className="bg-surface-high rounded-2xl overflow-hidden border border-white/5 group hover:shadow-2xl hover:shadow-black/50 transition-all duration-300 hover:-translate-y-1 flex flex-col">
              <div className="h-48 relative overflow-hidden">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBNlm9yovoNkIy9CC19JsZXHS3rUXia8agVXCe9f6xYB39UMkBn3EEhZ3hNWenSsLzXhO1tPBwE9yzQMj-1-raOm343wvg8Lmo9SKfmMLzwFkJskxVuMBLA3pOjlwpQbfGzd-c0pSXPn3olaOASzQxvRg__Qc9QrKDzFaoqbF5l2eiKLPuYRNx-OVtS-9-VuoZPp1jAzSdWYMHD-HDcghlV4z9fTAbduVfJnv5rqwSU3ekSTpMgg4rmtGUaEVcYkqD2bAX0Or1yR8Va" 
                  alt="Velocity Tint" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md border border-white/10 flex items-center gap-1">
                  <Star className="w-3 h-3 text-secondary-brand fill-secondary-brand" />
                  <span className="text-xs font-bold text-on-surface">4.8</span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-medium text-on-surface mb-1">Velocity Tint & Protection</h3>
                <div className="flex items-center gap-1 text-sm text-on-surface-muted mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>Austin, TX</span>
                </div>
                <div className="flex gap-2 mb-6 flex-wrap">
                  <span className="px-2 py-1 rounded-md bg-surface-highest text-on-surface-muted border border-white/5 text-xs font-bold">Window Tint</span>
                  <span className="px-2 py-1 rounded-md bg-surface-highest text-on-surface-muted border border-white/5 text-xs font-bold">Clear Bra</span>
                </div>
                <div className="mt-auto pt-4 border-t border-white/5">
                  <Link to="/vendors/velocity" className="block w-full text-center text-primary-brand font-bold hover:brightness-110 transition-colors py-2">
                    View Details
                  </Link>
                </div>
              </div>
            </div>

            {/* Vendor Card 2 */}
            <div className="bg-surface-high rounded-2xl overflow-hidden border border-white/5 group hover:shadow-2xl hover:shadow-black/50 transition-all duration-300 hover:-translate-y-1 flex flex-col">
              <div className="h-48 relative overflow-hidden">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCShRpBpoToeMc9dWkKYTpB4VG1fFm8EgBgDCf8nHIC3b9wt_VS5DcleSUGVI9-dn75J4rrZigMnF0Sp5ZcSK2h3trM_AroHEWPhQXn74NRLThDilU-ZVRGJ8PvGSgTlyp85bJE92vkSaq4-Ta8uWWZBULq6fnVOXQh52LFFIqO8Fbhes0xjHAPM5TXzyCvnldlqqQrEjp2bPVAn4zrgSl1chvQEd69I0J78g3WEHANgQUJ4-0uuLaE6cQMGrFXHkW2WUuXaR0WbHj7" 
                  alt="Forged Dynamics" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md border border-white/10 flex items-center gap-1">
                  <Star className="w-3 h-3 text-secondary-brand fill-secondary-brand" />
                  <span className="text-xs font-bold text-on-surface">4.7</span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-medium text-on-surface mb-1">Forged Dynamics</h3>
                <div className="flex items-center gap-1 text-sm text-on-surface-muted mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>Miami, FL</span>
                </div>
                <div className="flex gap-2 mb-6 flex-wrap">
                  <span className="px-2 py-1 rounded-md bg-surface-highest text-on-surface-muted border border-white/5 text-xs font-bold">Custom Wheels</span>
                  <span className="px-2 py-1 rounded-md bg-surface-highest text-on-surface-muted border border-white/5 text-xs font-bold">Powder Coating</span>
                </div>
                <div className="mt-auto pt-4 border-t border-white/5">
                  <Link to="/vendors/forged-dynamics" className="block w-full text-center text-primary-brand font-bold hover:brightness-110 transition-colors py-2">
                    View Details
                  </Link>
                </div>
              </div>
            </div>

            {/* Vendor Card 3 */}
            <div className="bg-surface-high rounded-2xl overflow-hidden border border-white/5 group hover:shadow-2xl hover:shadow-black/50 transition-all duration-300 hover:-translate-y-1 flex flex-col">
              <div className="h-48 relative overflow-hidden">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBhEzi9EuJmUgY8xMtNgBPbhHT5Vjyt7jUdbqSWaqH8j6P58cekR4O8Yj2cbq0bVS2qqKs1NEXXyvjxkfNU_2oRndM9_YnDbF8FW18qPHEmhy3tRXG0W-dyBmXW46rHVmM3SDeKGRD1Eb8_c7xG6oZK7qG0zYaTcMHRd-Mxl5qw0b6Zk56qgWa6GePiP5CTGnhDaaWhUo1xUt1IyhhJDQ5sj-8wAtBmBkwDeFlQLt1NxQrrUfQqYnqG4LYQrclFGasbZV5smo26WbY_" 
                  alt="Elite Auto Atelier" 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-4 right-4 bg-background/80 backdrop-blur-sm px-2 py-1 rounded-md border border-white/10 flex items-center gap-1">
                  <Star className="w-3 h-3 text-secondary-brand fill-secondary-brand" />
                  <span className="text-xs font-bold text-on-surface">5.0</span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-medium text-on-surface mb-1">Elite Auto Atelier</h3>
                <div className="flex items-center gap-1 text-sm text-on-surface-muted mb-4">
                  <MapPin className="w-4 h-4" />
                  <span>New York, NY</span>
                </div>
                <div className="flex gap-2 mb-6 flex-wrap">
                  <span className="px-2 py-1 rounded-md bg-surface-highest text-on-surface-muted border border-white/5 text-xs font-bold">Full Builds</span>
                  <span className="px-2 py-1 rounded-md bg-surface-highest text-on-surface-muted border border-white/5 text-xs font-bold">Interior Retrim</span>
                </div>
                <div className="mt-auto pt-4 border-t border-white/5">
                  <Link to="/vendors/elite-auto" className="block w-full text-center text-primary-brand font-bold hover:brightness-110 transition-colors py-2">
                    View Details
                  </Link>
                </div>
              </div>
            </div>

          </div>
          
          <div className="mt-12 flex justify-center">
            <button className="bg-surface-high border border-white/10 text-on-surface hover:bg-surface-highest transition-colors font-bold px-8 py-3 rounded-lg min-h-[48px]">
              Load More Partners
            </button>
          </div>
        </section>

      </div>
    </div>
  );
}
