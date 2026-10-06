import FallbackImage from "../components/FallbackImage";
import { Heart, Share2, ChevronRight, Eye, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BuildLog() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow pt-20">
        {/* Hero Section */}
        <section className="relative h-[600px] md:h-[819px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-transparent to-transparent z-10"></div>
          <div 
            className="absolute inset-0 w-full h-full bg-cover bg-center" 
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCnMahSZoSX9_RtRZRRVNh0ZVvvWk6vjP2epxuUzhgt3_OhXeqRuvmX2SWgCV57mWzOkhUJR1HVUcjS9BWUwlXOKBCU9oAc76unojlNDSuMpxZ0IiPpDfQTC9DQZ5D-J8RMBNUdKf2ZldujY7eSNLiAZHmIQyRrNdAhxPBoBy84JaatF-gRyX1YE3qH2oZ_BzWmaqjoKCKGa3IogZyrMNGQIvrx31sW80x9ts9xu6xBQAhagVARp414iWLqvXd6IRUKY66j3iGFIbwo")' }}
          ></div>
          <div className="absolute top-8 left-4 md:left-12 z-30">
            <Link to="/community" className="flex items-center gap-2 text-sm font-semibold text-white bg-background/40 hover:bg-background/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 transition-all shadow-lg hover:shadow-black/50">
              <ArrowLeft className="w-4 h-4" /> Back to Community
            </Link>
          </div>
          <div className="relative z-20 h-full flex flex-col justify-end px-4 md:px-12 pb-16 max-w-[1280px] mx-auto">
            <span className="inline-block bg-primary-brand/10 text-primary-brand text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-widest border border-primary-brand/20 backdrop-blur-md w-fit">
              ACTIVE PROJECT
            </span>
            <h1 className="text-5xl md:text-[64px] font-extrabold text-on-surface mb-4 tracking-tight leading-none" style={{ textShadow: '0 0 20px rgba(171, 207, 178, 0.3)' }}>
              Project Nightfall
            </h1>
            <p className="text-lg text-on-surface-muted max-w-2xl mb-8">
              A technical masterpiece focusing on stealth aesthetics and precision engineering. This Nissan GT-R R35 evolution prioritizes material quality and aggressive stance.
            </p>
            <div className="flex gap-4 flex-wrap">
              <button className="bg-primary-brand text-on-primary px-8 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 hover:brightness-110 transition-all shadow-lg hover:shadow-primary-brand/20">
                <Heart className="w-5 h-5" /> FOLLOW BUILD
              </button>
              <button className="border border-outline-subtle bg-white/5 backdrop-blur-md text-on-surface px-8 py-3 rounded-xl text-sm font-semibold hover:bg-white/10 transition-all flex items-center gap-2">
                <Share2 className="w-5 h-5" /> SHARE LOG
              </button>
            </div>
          </div>
        </section>

        {/* Content Grid */}
        <div className="max-w-[1280px] mx-auto px-4 md:px-12 py-16 grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Technical Specs (Bento Left) */}
          <div className="md:col-span-4 space-y-6">
            <div className="bg-surface-high/60 backdrop-blur-md rounded-xl p-8 border border-white/5">
              <h3 className="text-xl font-medium text-primary-brand mb-6">Technical Specs</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-on-surface-muted text-xs font-medium tracking-wide">ENGINE</span>
                  <span className="text-on-surface text-sm font-semibold">3.8L V6 Twin-Turbo</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-on-surface-muted text-xs font-medium tracking-wide">HORSEPOWER</span>
                  <span className="text-on-surface text-sm font-semibold">640 HP</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-on-surface-muted text-xs font-medium tracking-wide">EXTERIOR</span>
                  <span className="text-on-surface text-sm font-semibold">Matte Black Satin</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b border-white/5">
                  <span className="text-on-surface-muted text-xs font-medium tracking-wide">WHEELS</span>
                  <span className="text-on-surface text-sm font-semibold">HRE Custom Forged</span>
                </div>
              </div>
            </div>
            
            <div className="bg-surface-high/60 backdrop-blur-md rounded-xl p-8 overflow-hidden relative group border border-white/5 cursor-pointer">
              <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity duration-300 bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCgtaHRLzXmyC2zapmU1n843aJ2IdrZ_-2JfYf_zG7bGxQpKwM_qoqxE6vf5wUDDMWoyVPQFvQuO_-v4qa7XBnkWwmCXm4mwNrivIFYGkFHvn9wFtFr13TH8jkERlbpgWGTHwdNPKh5KkjSKNfqKXTvWnhC3bPlrDMjlxyikmqNMcXIjaAc4-hMf5BeT10aZMeAIN8l4PlTByGnz57JVYgkK0MKKczwjGSyPHo_rRbPH-wsyb2W08NUxaGtIraECQnE1UZyDzQB4aYX")' }}></div>
              <div className="relative z-10">
                <h4 className="text-xl font-medium text-white mb-2">Upcoming Mod</h4>
                <p className="text-on-surface-muted text-sm mb-4">Custom Carbon Intake System arriving next week.</p>
                <button className="text-primary-brand text-xs font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                  VIEW QUEUE <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Build Timeline (Bento Center) */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-surface-high/60 backdrop-blur-md rounded-xl p-8 border border-white/5">
              <div className="flex justify-between items-center mb-10">
                <h3 className="text-xl font-medium text-on-surface">Modification Log</h3>
                <span className="text-on-surface-muted text-xs font-bold tracking-wider">75% COMPLETE</span>
              </div>
              
              <div className="relative pl-8">
                {/* Vertical Line */}
                <div className="absolute left-3 top-2 bottom-2 w-[2px] bg-gradient-to-b from-transparent via-primary-brand to-transparent opacity-50"></div>
                
                {/* Timeline Item 1 */}
                <div className="relative mb-12">
                  <div className="absolute -left-[25px] top-0 w-4 h-4 rounded-full bg-primary-brand ring-4 ring-primary-brand/20"></div>
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold text-primary-brand tracking-widest uppercase">October 2023</span>
                    <h4 className="text-lg font-medium text-on-surface">Custom Forged Rims</h4>
                    <p className="text-sm text-on-surface-muted leading-relaxed">Installed HRE P101 Forged Monoblok wheels in Frozen Gold. Reduced unsprung weight by 12 lbs per corner.</p>
                    <div className="mt-4 rounded-lg overflow-hidden h-40 w-full bg-cover bg-center" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuCesJmY78mFm0lHVKO8azn_kP9Ngg3Aep8Vtdrt9lSY5jTsi4Fqnnym-IOgMol45DAW8D8lj2WfU7olcnGJ8WZYmqsuBs_AIB3sxQGmXDVbDc9OdutYQsUXqZVaWcyktx1eBJudX1wXrBB8bJLXHOZv31MeeO8I4vwhxxu8LjeGGNc4JQFS9gEMo9yfUzwhUtM7UX0p4qYqW5jwi9Qc4cZMUZR29mkn7KjjIfB-urAcHALzsZByO0DGVmF1StN0X7WUpas02tObHKL5")' }}></div>
                  </div>
                </div>

                {/* Timeline Item 2 */}
                <div className="relative mb-12">
                  <div className="absolute -left-[25px] top-0 w-4 h-4 rounded-full bg-primary-brand ring-4 ring-primary-brand/20"></div>
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold text-primary-brand tracking-widest uppercase">August 2023</span>
                    <h4 className="text-lg font-medium text-on-surface">Matte Black Full Wrap</h4>
                    <p className="text-sm text-on-surface-muted leading-relaxed">Avery Dennison Supreme Wrapping Film in Satin Black. Complete chrome delete and ceramic coating applied for maximum durability.</p>
                  </div>
                </div>

                {/* Timeline Item 3 */}
                <div className="relative">
                  <div className="absolute -left-[25px] top-0 w-4 h-4 rounded-full bg-primary-brand ring-4 ring-primary-brand/20"></div>
                  <div className="flex flex-col gap-2">
                    <span className="text-xs font-bold text-primary-brand tracking-widest uppercase">July 2023</span>
                    <h4 className="text-lg font-medium text-on-surface">Precision Tint</h4>
                    <p className="text-sm text-on-surface-muted leading-relaxed">XPEL Prime XR Plus ceramic tint. 20% all around for heat rejection and privacy.</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Community & Comments (Bento Right) */}
          <div className="md:col-span-3 space-y-6">
            <div className="bg-surface-high/60 backdrop-blur-md rounded-xl p-6 border border-white/5">
              <h3 className="text-lg font-medium text-on-surface mb-6">Comments</h3>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-surface-highest shrink-0 overflow-hidden">
                    <FallbackImage className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5a-pwqExixUKkOr60Hg4Q-gR6qSNpHXhens0aavIQ1JetHt4kWALJEeUZZzzKJnPQr_wokW0HWA7CB242mOagOVbrlswm8WuvrT8WpDfZE9mmLaVUbxKhpynKlhFg2_TDqc3LTmnqsw2S6-_nBgPGdIDdV6SLUe8_rVlwGV5vHJvX1B8LACWXZ8nvn9liA-xZuHViE7sjKa6WxbVNT5MQmee9T9yZmXQSvoLV6yMAOmdcDjkzTntHaG31RUW2e4vjoLXVU56lpXnH" alt="Marcus V." />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-on-surface">Marcus V.</p>
                    <p className="text-[13px] text-on-surface-muted leading-tight mt-1">That matte finish is absolute perfection. How was the ceramic coating process?</p>
                    <span className="text-[10px] font-bold text-primary-brand/60 mt-2 block tracking-wider">2 HOURS AGO</span>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-surface-highest shrink-0 overflow-hidden">
                    <FallbackImage className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRbH80wz8qLUdELqID0RlZCJiTDjLGBtzbwDvxjs9mMVNKU8T-Hk0us5E9_lF3narvQxyeGUr3cg4i4WJXKHeE5w7iTdbOuHPKCqMocLl8BZJJuSsvb-Hqjdc83FJEYS7XIOZOEIfbdpMm7v-6BjIozQyF0_Ev1sLxLNkusPbgrMo8xa661Pdkg0hS9FMB5WezVl_S4WqNAMd-2rm5sBlO3l77x3KGi2APT0ZbWjeUI-WsE6NALPdnj2spRmjGq2JQNsqeU-Jb7UbF" alt="Sarah Forge" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-on-surface">Sarah Forge</p>
                    <p className="text-[13px] text-on-surface-muted leading-tight mt-1">HRE wheels were the right choice for the R35 platform. Stance looks spot on.</p>
                    <span className="text-[10px] font-bold text-primary-brand/60 mt-2 block tracking-wider">5 HOURS AGO</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-white/5">
                <div className="relative">
                  <textarea 
                    className="w-full bg-background/50 border border-outline-subtle rounded-xl p-3 text-sm focus:ring-1 focus:ring-primary-brand focus:border-primary-brand transition-all resize-none h-24 placeholder:text-on-surface-muted/50" 
                    placeholder="Add to the discussion..."
                  ></textarea>
                </div>
              </div>
            </div>
            
            {/* Stats */}
            <div className="bg-surface-high/60 backdrop-blur-md rounded-xl p-8 flex flex-col items-center justify-center text-center py-12 border border-white/5">
              <Eye className="w-8 h-8 text-primary-brand mb-4 opacity-80" />
              <span className="text-4xl font-bold text-on-surface">12.4K</span>
              <span className="text-[11px] font-bold text-on-surface-muted tracking-widest mt-1">LOG VIEWS</span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
