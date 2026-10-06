import FallbackImage from "../components/FallbackImage";
import { ArrowLeft, Verified, Eye, ChevronUp, ChevronDown, Reply, Share2, Flag, ThumbsUp, Paperclip, Image as ImageIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function DiscussionThread() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow pt-32 pb-16 px-4 md:px-12 max-w-[1024px] mx-auto w-full">
        
        {/* Thread Header */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4 text-sm font-medium">
            <Link to="/community" className="flex items-center text-on-surface-muted hover:text-primary-brand transition-colors">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to Community
            </Link>
            <span className="text-outline-subtle">•</span>
            <span className="text-on-surface-muted">Tech & Mechanics</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-on-surface mb-4 tracking-tight">
            Fitment Help: Rubbing on full lock with 19x9.5 ET22?
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5 bg-surface-high px-3 py-1 rounded-full border border-white/5">
              <Verified className="w-4 h-4 text-secondary-brand" />
              <span className="font-semibold text-on-surface">Urgent</span>
            </div>
            <div className="text-on-surface-muted font-medium">
              Started 2 hours ago by <span className="text-primary-brand font-bold">@StanceBoi</span>
            </div>
            <div className="text-on-surface-muted font-medium flex items-center gap-1">
              <Eye className="w-4 h-4" /> 1.2k views
            </div>
          </div>
        </section>

        {/* Discussion Feed */}
        <div className="space-y-4">
          
          {/* Original Post */}
          <article className="bg-surface-high/60 backdrop-blur-md rounded-xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 relative overflow-hidden border border-white/5 shadow-lg">
            <div className="hidden md:flex flex-col items-center gap-2 w-20 flex-shrink-0">
              <div className="w-16 h-16 rounded-xl overflow-hidden border border-outline-subtle">
                <FallbackImage className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVzo7yHUn2ljIJqRNZlZVjIdzF3WlLE7aD85foDRvob54XsRi9dJc1YmH-ZB8Hwf1BrF88hu5Gml8O7YRX5rkVa8e0nuH-fNKu_qt0CyZ2MqRQ0ctxqtCre-mox194aZkSzSS97tCExSzBtJUxDW2IpVU5sFjzsKKtjPNZPDNSuC1gxWUvIcY0jfVg5QQQ-S76p_VV8oQj0dpYqRUZ2UxNk4mLeqzUNou6G5krZIpnW-jwNb5nF-LiliqKnU1FZYe0tu-WL8VIHDnh" alt="StanceBoi" />
              </div>
              <div className="text-center">
                <div className="text-xs font-bold text-primary-brand">@StanceBoi</div>
                <div className="text-[10px] text-on-surface-muted uppercase tracking-widest font-bold mt-0.5">Member</div>
              </div>
              <div className="mt-4 flex flex-col items-center gap-1 bg-background/50 rounded-full p-2 border border-white/5">
                <button className="text-on-surface-muted hover:text-primary-brand transition-colors"><ChevronUp className="w-5 h-5" /></button>
                <span className="font-bold text-on-surface text-lg">14</span>
                <button className="text-on-surface-muted hover:text-error transition-colors"><ChevronDown className="w-5 h-5" /></button>
              </div>
            </div>
            
            <div className="flex-grow">
              <div className="prose prose-invert max-w-none mb-6">
                <p className="text-on-surface-muted leading-relaxed mb-4 text-[15px]">
                  Yo everyone! Just finished installing my new setup: 19x9.5 ET22 squared. Everything looked perfect until I hit the first corner. I'm getting some serious rubbing on full lock, specifically on the inner liner.
                </p>
                <p className="text-on-surface-muted leading-relaxed text-[15px]">
                  Running 255/35 tires and lowered about 1.5 inches on coilovers. Does anyone have experience with this offset? Should I look into spacers or is a fender roll inevitable?
                </p>
              </div>
              
              {/* Images Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="aspect-[4/3] rounded-xl overflow-hidden border border-white/10 group cursor-zoom-in relative">
                  <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors z-10"></div>
                  <FallbackImage className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 relative z-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBA0yfJiSwXYQEQFORxvHtBS0OI7_XT6ovVHnU_3HjajzSD-01k8rx1g_A0WKJhLfUxDDXT66QtS8f-49A7-muAsVdiqDKuhHwbNiicaXEDVpDEVC8aa2Zq9ugXVBtyLlDiyDGVm3llM6uh1hnuy78499t8wOLKCBZcA__RCfgFqF0QKcT-CUh7KHOuqxVfKVUwgBeCbSmuaHA_jdpg_fZsU6DLxwylSjdP5ovWjpONv-Y5ukRGM45hMfiCQDcXkExejRcbiv_vJQd3" alt="Rubbing 1" />
                </div>
                <div className="aspect-[4/3] rounded-xl overflow-hidden border border-white/10 group cursor-zoom-in relative">
                  <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors z-10"></div>
                  <FallbackImage className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 relative z-0" src="https://lh3.googleusercontent.com/aida-public/AB6AXuD6_d-O-19u3EFtRSuacRwN_GOAFmTCOyBxdCsUqQhO6bkZ8PETUIp2leYyPfN62yFpiQdJlFMuTZOGWw4A55X7SgMbBRg9aUrs94egv28-Z-ErxMM3e9nazuyZSef9AHnURog8LSaAKkeAvIXF_pSmVBAKIgu-1FZiBeR68xQivOwcRz_SkNs6dUlfkxkDr8DtwY___f48-AzQ-Gv2Dxg0V-dnG1tQfJyrpVYtZyt91IGP3gy18eC0gVqSFQyDZam0ES7_5VM2kKez" alt="Rubbing 2" />
                </div>
              </div>
              
              <div className="flex items-center gap-6 pt-4 border-t border-white/5">
                <button className="flex items-center gap-1.5 text-sm font-semibold text-on-surface-muted hover:text-primary-brand transition-colors">
                  <Reply className="w-4 h-4" /> Reply
                </button>
                <button className="flex items-center gap-1.5 text-sm font-semibold text-on-surface-muted hover:text-primary-brand transition-colors">
                  <Share2 className="w-4 h-4" /> Share
                </button>
                <button className="flex items-center gap-1.5 text-sm font-semibold text-on-surface-muted hover:text-error transition-colors ml-auto">
                  <Flag className="w-4 h-4" /> Report
                </button>
              </div>
            </div>
          </article>

          {/* Response 1 (Expert) */}
          <article className="bg-surface-high/60 backdrop-blur-md rounded-xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 border border-primary-brand/30 shadow-[0_0_20px_rgba(171,207,178,0.1)] relative">
            <div className="hidden md:flex flex-col items-center gap-2 w-20 flex-shrink-0">
              <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-primary-brand relative">
                <FallbackImage className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEIwjjWlzDA1qIjqoPRGtel4gOU_Eg7UFTBOVZ3qMXS5NVGazMgOEy5rLVTw0hQRlEcQtt-pJ-MulIxXKa9S3YIOz-daqf8NETwUZQQBM_9lTmtB9jtrnMYECfAJXKbD6WHnVWnNjVBDrR6mSoIlhmvquVJa5uNfiQp69vQS8kqIdkugiOkMT_zWtNRlkOBNLA-ybDSqkt8X_7TqmDDLm-M1QzTwjE7liH89qSrag5BkQ-v1Gp34_s_9FuCSn6OUwtsc9oYvaGwBsr" alt="FitmentExpert" />
                <div className="absolute bottom-0 right-0 bg-primary-brand text-on-primary p-0.5 rounded-tl-md">
                  <Verified className="w-3 h-3" />
                </div>
              </div>
              <div className="text-center">
                <div className="text-xs font-bold text-secondary-brand">@FitmentExpert</div>
                <div className="text-[10px] text-primary-brand uppercase tracking-widest font-bold mt-0.5">Expert</div>
              </div>
              <div className="mt-4 flex flex-col items-center gap-1 bg-primary-brand/10 rounded-full p-2 border border-primary-brand/20">
                <button className="text-primary-brand"><ChevronUp className="w-5 h-5 fill-primary-brand" /></button>
                <span className="font-bold text-primary-brand text-lg">82</span>
                <button className="text-on-surface-muted hover:text-error transition-colors"><ChevronDown className="w-5 h-5" /></button>
              </div>
            </div>
            
            <div className="flex-grow">
              <div className="mb-3 text-[11px] text-primary-brand font-bold uppercase tracking-widest flex items-center gap-1">
                <Verified className="w-3 h-3" /> Solution Suggested
              </div>
              <div className="prose prose-invert max-w-none mb-6">
                <p className="text-on-surface leading-relaxed text-[15px] font-medium">
                  ET22 on a 9.5" wheel is pretty aggressive for a squared setup. You're likely hitting the front part of the wheel well liner. 
                </p>
                <ul className="list-disc ml-5 mt-4 space-y-2 text-on-surface-muted text-[15px]">
                  <li><strong className="text-on-surface font-semibold">Camber:</strong> Are you running stock camber? Adding -1.5 to -2.0 degrees will tilt the top of the tire in and likely clear the fender.</li>
                  <li><strong className="text-on-surface font-semibold">Spacers:</strong> NO. Do not add spacers, that will make it worse by pushing the wheel further out.</li>
                  <li><strong className="text-on-surface font-semibold">Heat Gun:</strong> You can slightly reshape the plastic liner with a heat gun to gain 5-8mm of clearance.</li>
                </ul>
              </div>
              
              <div className="flex items-center gap-6 pt-4 border-t border-white/5">
                <button className="flex items-center gap-1.5 text-sm font-semibold text-on-surface-muted hover:text-primary-brand transition-colors">
                  <Reply className="w-4 h-4" /> Reply
                </button>
                <button className="flex items-center gap-1.5 text-sm font-semibold text-primary-brand transition-colors">
                  <ThumbsUp className="w-4 h-4 fill-primary-brand/20" /> Helpful (12)
                </button>
              </div>
            </div>
          </article>
          
          {/* Response 2 (Normal) */}
          <article className="bg-surface-high/40 backdrop-blur-md rounded-xl p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 border border-white/5 opacity-90">
            <div className="hidden md:flex flex-col items-center gap-2 w-20 flex-shrink-0">
              <div className="w-16 h-16 rounded-xl overflow-hidden border border-outline-subtle">
                <FallbackImage className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVCmgnBHGzTgem-J3NVRAnuO9PIXHz2OP4jhe6JjtPSsK_hD62MXjQ5CrJp60Ofaly8aBOR0XGQ0hZOs6ZjGJNm6v6CGm_S13ptJxdBgKv5c_0gK3V50TLegfw8GNF98kFIL-AwZHc1sXytGVG2yghyKkCbPNFDZYxeiYrBBmgmWOHjkwFch4DMFFeVBtuByg-KWy87ZhJRdzX9bCSW5ehBTg42v9MuUtdTUXZ5XCeEQQuB3ITqXGlWvWqJJXDL_fvlUXV5IisBKBN" alt="DriftKing99" />
              </div>
              <div className="text-center">
                <div className="text-xs font-bold text-on-surface">@DriftKing99</div>
              </div>
              <div className="mt-4 flex flex-col items-center gap-1 bg-background/30 rounded-full p-2 border border-white/5">
                <button className="text-on-surface-muted hover:text-primary-brand transition-colors"><ChevronUp className="w-5 h-5" /></button>
                <span className="font-bold text-on-surface text-lg">5</span>
                <button className="text-on-surface-muted hover:text-error transition-colors"><ChevronDown className="w-5 h-5" /></button>
              </div>
            </div>
            
            <div className="flex-grow">
              <p className="text-on-surface-muted leading-relaxed text-[15px]">
                I had the exact same issue on my F80. I ended up switching to 245/35 tires. That slight stretch was enough to stop the rubbing completely on full lock. It's not ideal for grip but solved the annoyance.
              </p>
              <div className="flex items-center gap-6 pt-4 border-t border-white/5 mt-6">
                <button className="flex items-center gap-1.5 text-sm font-semibold text-on-surface-muted hover:text-primary-brand transition-colors">
                  <Reply className="w-4 h-4" /> Reply
                </button>
              </div>
            </div>
          </article>

        </div>

        {/* Quick Reply Box */}
        <section className="mt-12">
          <div className="bg-surface-high/60 backdrop-blur-md rounded-xl p-8 border border-white/5">
            <h3 className="text-xl font-medium text-on-surface mb-6">Join the Discussion</h3>
            <div className="relative">
              <textarea 
                className="w-full bg-background border border-outline-subtle rounded-xl p-4 min-h-[120px] focus:ring-1 focus:ring-primary-brand focus:border-primary-brand transition-all text-on-surface placeholder:text-on-surface-muted/50 resize-none shadow-inner" 
                placeholder="Write your technical advice or question here..."
              ></textarea>
              <div className="absolute bottom-4 right-4 flex items-center gap-2">
                <button className="text-on-surface-muted hover:text-primary-brand p-2 transition-colors bg-surface-high rounded-lg border border-white/5"><ImageIcon className="w-5 h-5" /></button>
                <button className="text-on-surface-muted hover:text-primary-brand p-2 transition-colors bg-surface-high rounded-lg border border-white/5"><Paperclip className="w-5 h-5" /></button>
              </div>
            </div>
            <div className="flex justify-between items-center mt-6">
              <p className="text-xs font-medium text-on-surface-muted">Be respectful and provide technical data where possible.</p>
              <button className="bg-primary-brand text-on-primary px-8 py-3 rounded-xl text-sm font-bold hover:brightness-110 active:scale-95 transition-all shadow-lg hover:shadow-primary-brand/20">
                Post Reply
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
