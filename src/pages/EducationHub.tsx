import FallbackImage from "../components/FallbackImage";
import { Link } from 'react-router-dom';
import { BookOpen, Search, ArrowRight, PlayCircle, FileText, ArrowLeft } from 'lucide-react';

const GUIDES = [
  {
    id: 'wheel-offset',
    title: 'Understanding Wheel Offset & Backspacing',
    category: 'Fitment 101',
    readTime: '8 min read',
    type: 'article',
    image: 'https://images.unsplash.com/photo-1620023602528-98e3b7db2eb2?q=80&w=800&auto=format&fit=crop',
    link: '/rim/fitment-101'
  },
  {
    id: 'ppf-vs-ceramic',
    title: 'PPF vs. Ceramic Coating: Which Do You Need?',
    category: 'Paint Protection',
    readTime: '6 min read',
    type: 'video',
    image: 'https://images.unsplash.com/photo-1603584173870-7f23fdae1b7a?q=80&w=800&auto=format&fit=crop',
    link: '/education/article/ppf-vs-ceramic'
  },
  {
    id: 'tint-laws',
    title: 'State-by-State Window Tint Laws (2024)',
    category: 'Legal & Compliance',
    readTime: '12 min read',
    type: 'article',
    image: 'https://images.unsplash.com/photo-1506527506979-994df5877c48?q=80&w=800&auto=format&fit=crop',
    link: '/education/article/tint-laws'
  }
];

export default function EducationHub() {
  return (
    <div className="flex flex-col min-h-full pb-24">
      
      {/* Hero Section */}
      <div className="relative pt-32 pb-20 px-4 md:px-12 overflow-hidden border-b border-white/10 bg-surface-highest text-center">
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-brand/10 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="absolute left-4 md:left-12 top-4 md:top-12 hidden md:block">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-on-surface-muted hover:text-primary-brand transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
        <div className="md:hidden absolute left-4 top-4">
          <Link to="/" className="inline-flex items-center gap-2 text-sm font-semibold text-on-surface-muted hover:text-primary-brand transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="w-16 h-16 rounded-2xl bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-8 h-8 text-primary-brand" />
          </div>
          <h1 className="text-4xl md:text-6xl font-medium text-on-surface tracking-tight mb-6">Wheely Bits Academy</h1>
          <p className="text-xl text-on-surface-muted mb-10">
            Master the technical details of automotive customization. Expert guides, calculators, and tutorials to help you build with confidence.
          </p>
          
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-muted" />
            <input 
              type="text" 
              placeholder="Search topics (e.g. 'Offset', 'Ceramic')" 
              className="w-full bg-background border border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-primary-brand focus:ring-1 focus:ring-primary-brand text-on-surface shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Featured Content */}
      <div className="max-w-[1280px] mx-auto w-full px-4 md:px-12 mt-16">
        <h2 className="text-2xl font-medium text-on-surface mb-8">Featured Guides</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {GUIDES.map((guide) => (
            <Link 
              key={guide.id}
              to={guide.link}
              className="group flex flex-col bg-surface-high/60 backdrop-blur-md rounded-3xl border border-white/5 overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-xl"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <FallbackImage
                  src={guide.image} 
                  alt={guide.title} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10 flex items-center gap-2">
                  {guide.type === 'video' ? <PlayCircle className="w-4 h-4 text-primary-brand" /> : <FileText className="w-4 h-4 text-primary-brand" />}
                  <span className="text-xs font-bold text-on-surface uppercase tracking-widest">{guide.category}</span>
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <h3 className="text-xl font-medium text-on-surface mb-4 group-hover:text-primary-brand transition-colors line-clamp-2">{guide.title}</h3>
                
                <div className="mt-auto flex items-center justify-between">
                  <span className="text-sm font-bold text-on-surface-muted">{guide.readTime}</span>
                  <ArrowRight className="w-5 h-5 text-on-surface-muted group-hover:text-primary-brand group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="max-w-[1280px] mx-auto w-full px-4 md:px-12 mt-20">
        <h2 className="text-2xl font-medium text-on-surface mb-8">Browse Categories</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Fitment Geometry', 'Suspension Tuning', 'Vinyl Wrapping', 'Paint Protection', 'Window Tinting', 'Detailing Basics', 'Track Prep', 'Maintenance'].map(cat => (
            <Link 
              key={cat}
              to="#"
              className="p-6 rounded-2xl bg-surface-high/40 border border-white/5 hover:bg-white/5 hover:border-white/20 transition-all text-center group"
            >
              <h4 className="font-bold text-on-surface group-hover:text-primary-brand transition-colors">{cat}</h4>
              <p className="text-sm text-on-surface-muted mt-2">12 Articles</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
