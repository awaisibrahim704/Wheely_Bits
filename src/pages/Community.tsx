import { Link } from 'react-router-dom';
import { User, Heart, MessageSquare, Plus, Settings2, Trophy, Image, Palette } from 'lucide-react';

const FEATURED_BUILDS = [
  {
    id: 1,
    author: "@ApexTuner",
    projectName: "Project 'Nightfall'",
    desc: "Just finished the air ride installation and fitted the new 3-piece forged wheels. Fitment is finally dialed in.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCG98QpnQwW3k0N7oe9cjAQVZh27Y59VVL08NRwXImEixSitqen22eqN9CcHTa0mzYVqAYl_EY6qbNM-lLW4Ay8fDZlWXdMaYTkxI7hUnkaUgH2QORguMi_B3ADIXDkmL-W5rqCMt6U5M1WPHrCDiMtDddS0XmN0wrucUQSqyFtGZV6zDxajV-hS6pbbo_CJg6Io4_C6qqiELG0hBChW5J23MwblXqaoI8upEmRThti3vb-XBvqrnLNnF_DqwGJtGvyvAx5RY4EEVTo",
    tags: ["Matte Wrap", "Stance"],
    likes: 342,
    comments: 45
  },
  {
    id: 2,
    author: "@TrackDayKing",
    projectName: "The Green Machine",
    desc: "Testing out the new semi-slicks and upgraded brake cooling ducts. The sage green wrap is holding up perfectly against track debris.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCdxNQVeNgmLnKvG7RDL6WXxwj7zbWx0uxo_bC4EU4QseLWq7hHV4xSsIjuKb-w4YR5GemysqN088Aw3QtIKs7is79KO_eB4GaeUHX6y3tsOIR0ysy1NHXjtDoXaB89hcqPpmOCfzp7DJg7GZa5mQVg8YTkXrls-snEwsl6ycny3JH9DeE0veMn2V1U_SjLRUeo3WrTa14KU5mdenuv1UJg3l2Nj5fZsP08LcVBwJGoP80dMdCHh9WtengK5ySducevPZHSR_HpGYWb",
    tags: ["Gloss Wrap", "Track Prep"],
    likes: 891,
    comments: 112
  }
];

const DISCUSSIONS = [
  {
    id: 1,
    icon: <Settings2 className="w-5 h-5" />,
    title: "Fitment Help: Rubbing on full lock with 19x9.5 ET22?",
    meta: "Started by @StanceBoi • Wheels & Suspension • 2 hours ago",
    replies: 24
  },
  {
    id: 2,
    icon: <Palette className="w-5 h-5" />,
    title: "Wrap Color Ideas: Satin Black vs. Nardo Grey for a daily driver?",
    meta: "Started by @DailyDriven • Exterior Styling • 5 hours ago",
    replies: 56
  },
  {
    id: 3,
    icon: <Image className="w-5 h-5" />,
    title: "Show & Shine: Weekend meetup photos drop",
    meta: "Started by @ShutterSpeed • Media & Events • Yesterday",
    replies: 128
  }
];

const LEADERBOARD = [
  {
    rank: 1,
    title: "Widebody Weekend",
    author: "by @AeroKits",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDzRDCYLILGzs93_xCZt0LrYjwha8B6fOBPQczUbI9XNW_dAthrCWni3ynCumSBEgoKRI-s8PvigOeDKGMmwf8qG12pzwaLBFuCNxv9wJJL9Hu-4YjzytTOCVg_4rRtTf_IRQVomJh362Nfrtq4WvsNP3AMXXIF6nBA8kbhKxuO4awr4VCCpq4mGF5KjOmgfZgRF3yOMujFaPAmTvkZkibRe6u4q0m-d9Cbu8xOdGK3w-MktWNgfq6UQNu6rPxsFYnu1qF3KsM61U_h"
  },
  {
    rank: 2,
    title: "VIP Style Sedan",
    author: "by @SlammedLux",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDGkpAoAfqkH_YD5ox2H1srWmCPRhcdMdOnJshnUR78zvkXMroIEleRoL4bjWE4g-N6KfSNF3bNWVRAtT3xDwNfnpHyE4r1isMbFGmMe49s85CblJXiUq9CIxsAHVCIRAeIbqFNaK8moK0Ygsi1sh5EBv_xYyaImk6-zXHW39MOBITebHPaLkHAl9YR0MSA8a76_fbHJKj5dKNDS8OMGw0U4DPQ-AfK8Hs71F5BIyCThZTigNXi2T58ONksoQ8EltFRbFaenc0KHp3c"
  },
  {
    rank: 3,
    title: "Clean Bay Build",
    author: "by @BoostedLife",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjjfjZzz8PXkFc2XIYXWO5zgBN-biV9tEXY9St2qOHfU9sHiEQA-M2gFvHUhKcZYnOm49OXWPh62nsu9_0tM2BFlkxDykKoJ4F3SypVb-THI6xeYi2UCIg2_W4oJ1E9Ik5pdT_srVJLRIM2_8cYWnMNwkCLYvSs2bOpzVsoQ59mJovspAhCD5vkLbnEapZMvSFb2RAJnwYNYN2RltEub-X-INs_7nD2isPMLKcsxcA_0DHKIYrpsJ2TtptSDtna-0Im0rrVXu_ExeG"
  }
];

export default function Community() {
  return (
    <div className="w-full relative min-h-screen">
      {/* Ambient Background Graphic */}
      <div 
        className="fixed inset-0 pointer-events-none -z-10 opacity-20 mix-blend-screen" 
        style={{ backgroundImage: 'radial-gradient(circle at 50% -20%, #8fb397 0%, transparent 70%)' }}
      ></div>

      <div className="max-w-[1280px] mx-auto px-4 md:px-12 py-12 flex flex-col gap-16">
        
        {/* Hero Section */}
        <section className="flex flex-col items-center text-center space-y-4">
          <span className="text-[12px] font-semibold text-primary-brand uppercase tracking-widest bg-primary-brand/10 px-4 py-1 rounded-full border border-primary-brand/20">
            The Enthusiast Collective
          </span>
          <h1 className="text-4xl md:text-5xl font-medium text-on-surface max-w-3xl">
            Connect, share, and find inspiration for your next build.
          </h1>
          <p className="text-lg text-on-surface-muted max-w-2xl">
            Join a community of dedicated automotive artists. From subtle aesthetic tweaks to full performance rebuilds, explore the garage of ideas.
          </p>
        </section>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Left Column: Featured Builds & Discussions */}
          <div className="lg:col-span-8 flex flex-col gap-12">
            
            {/* Featured Builds */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-medium text-on-surface">Featured Builds</h2>
                <button className="text-sm font-medium text-primary-brand hover:text-primary transition-colors">
                  View Gallery &rarr;
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {FEATURED_BUILDS.map((build) => (
                  <article key={build.id} className="bg-surface-high/60 backdrop-blur-md rounded-xl border border-white/5 overflow-hidden group transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/50 cursor-pointer flex flex-col">
                    <div className="h-64 overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent z-10"></div>
                      <img 
                        src={build.image} 
                        alt={build.projectName} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute bottom-4 left-4 z-20 flex gap-2">
                        {build.tags.map((tag, idx) => (
                          <span key={idx} className="bg-background/80 backdrop-blur-sm border border-white/10 px-3 py-1 rounded-full text-[12px] font-semibold text-on-surface">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-6 flex flex-col flex-grow bg-surface-high/40">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 rounded-full bg-surface-highest flex items-center justify-center border border-white/10 text-on-surface-muted">
                          <User className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-on-surface leading-tight">{build.author}</span>
                          <span className="text-[12px] text-on-surface-muted">{build.projectName}</span>
                        </div>
                      </div>
                      
                      <p className="text-sm text-on-surface-muted mb-6 flex-grow leading-relaxed">
                        {build.desc}
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto pt-4 border-t border-outline-subtle/30">
                        <div className="flex gap-4">
                          <button className="flex items-center gap-1 text-on-surface-muted hover:text-primary-brand transition-colors">
                            <Heart className="w-5 h-5" />
                            <span className="text-xs font-semibold">{build.likes}</span>
                          </button>
                          <button className="flex items-center gap-1 text-on-surface-muted hover:text-primary-brand transition-colors">
                            <MessageSquare className="w-5 h-5" />
                            <span className="text-xs font-semibold">{build.comments}</span>
                          </button>
                        </div>
                        <Link to="/community/build-log" className="bg-primary-brand/10 text-primary-brand border border-primary-brand/20 hover:bg-primary-brand/20 px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center">
                          View Build
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Discussions Hub */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-medium text-on-surface">Latest Discussions</h2>
                <button className="bg-primary-brand text-on-primary hover:brightness-110 px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex items-center gap-2 h-10 shadow-lg hover:shadow-primary-brand/20">
                  <Plus className="w-4 h-4" /> New Topic
                </button>
              </div>
              
              <div className="bg-surface-high/60 backdrop-blur-md rounded-xl border border-white/5 overflow-hidden flex flex-col">
                {DISCUSSIONS.map((disc, idx) => (
                  <Link to="/community/discussion" key={disc.id} className={`p-4 hover:bg-white/5 transition-colors cursor-pointer flex gap-4 items-start ${idx !== DISCUSSIONS.length - 1 ? 'border-b border-outline-subtle/30' : ''}`}>
                    <div className="w-10 h-10 rounded-lg bg-surface-highest border border-white/10 flex items-center justify-center flex-shrink-0 mt-1 text-on-surface-muted">
                      {disc.icon}
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-sm font-semibold text-on-surface mb-1">{disc.title}</h3>
                      <div className="text-[12px] font-medium text-on-surface-muted">
                        {disc.meta}
                      </div>
                    </div>
                    <div className="flex flex-col items-end flex-shrink-0">
                      <span className="text-sm font-bold text-primary-brand">{disc.replies}</span>
                      <span className="text-[12px] font-medium text-on-surface-muted">replies</span>
                    </div>
                  </Link>
                ))}
                <div className="p-3 bg-background/30 border-t border-outline-subtle/30 text-center">
                  <button className="text-xs font-semibold text-primary-brand hover:text-primary transition-colors">
                    View All Discussions
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Sidebar */}
          <aside className="lg:col-span-4 flex flex-col gap-8">
            
            {/* Leaderboard Widget */}
            <div className="bg-surface-high/60 backdrop-blur-md rounded-xl border border-white/5 p-6 flex flex-col gap-4">
              <div className="flex items-center gap-2 mb-2">
                <Trophy className="w-5 h-5 text-secondary-brand" />
                <h2 className="text-xl font-medium text-on-surface">Top Builds of the Month</h2>
              </div>
              <ul className="flex flex-col gap-4">
                {LEADERBOARD.map((item) => (
                  <li key={item.rank} className="flex items-center gap-4 group cursor-pointer">
                    <div className="w-12 h-12 rounded-lg overflow-hidden border border-white/10 flex-shrink-0">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                    </div>
                    <div className="flex flex-col flex-grow">
                      <span className="text-sm font-semibold text-on-surface group-hover:text-primary-brand transition-colors">{item.title}</span>
                      <span className="text-[12px] font-medium text-on-surface-muted">{item.author}</span>
                    </div>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${item.rank === 1 ? 'bg-primary-brand/10 text-primary-brand border border-primary-brand/20' : 'bg-surface-highest text-on-surface-muted border border-white/10'}`}>
                      #{item.rank}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Card Widget */}
            <div className="rounded-xl overflow-hidden relative p-6 flex flex-col items-start justify-center h-48 border border-white/10 group cursor-pointer">
              <div className="absolute inset-0 z-0">
                <img 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAg1R-Y7mV1lFkzcV4RsUIyH0yzVg63ELrhDJpkxz6wJxPjQYtXqiSZ-l-jsJ2j33rGxLB43pkClrWsiSV-2vqK2afKuxFUr3zf9-TOQqlYHYhGu9MHCnGMYNeNvN9Yla3kYh4PGF93kHy5QYJVyY9_0EbsYTrZ3CNQhSmaKOF7yeDUCAFiHV7c2Ozo6ZWfu8hCXcteczEKoTVcQb22_Ppy6KUqqbcSqEGmxrqMZMqbNkUISY2ivBubbbMwqMsldfxYFeb9iYvZutRa" 
                  alt="Background Texture" 
                  className="w-full h-full object-cover opacity-50 group-hover:opacity-60 transition-opacity duration-300" 
                />
                <div className="absolute inset-0 bg-background/60 backdrop-blur-[2px]"></div>
              </div>
              <div className="relative z-10 flex flex-col gap-2">
                <h3 className="text-xl font-medium text-white group-hover:text-primary-brand transition-colors">Ready to share your project?</h3>
                <p className="text-xs font-medium text-on-surface-muted mb-2">Create a build log and track your progress.</p>
                <Link to="/community/create-build-log" className="bg-primary-brand text-on-primary hover:brightness-110 px-6 rounded-lg text-sm font-semibold transition-colors w-fit h-10 flex items-center justify-center shadow-lg hover:shadow-primary-brand/20">
                  Start Build Log
                </Link>
              </div>
            </div>

          </aside>

        </div>
      </div>
    </div>
  );
}
