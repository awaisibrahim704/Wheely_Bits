import { useState } from 'react';
import { Search, ChevronDown, Headset, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const FAQ_DATA = [
  {
    category: "General",
    questions: [
      {
        q: "What is Wheely Bits?",
        a: "Wheely Bits is a premium community and marketplace dedicated to automotive aesthetics, specifically focusing on rims, wraps, and tints. We connect enthusiasts with top-tier vendors and provide tools for perfect fitment and styling."
      },
      {
        q: "How do I verify a vendor?",
        a: "Vendors on our platform go through a rigorous vetting process. Look for the 'Verified Vendor' badge on their profile, which indicates they have met our quality, authenticity, and customer service standards."
      }
    ]
  },
  {
    category: "Rim & Fitment",
    questions: [
      {
        q: "How do I know if a rim will fit my car?",
        a: "Use our Fitment Calculator tool. You'll need to input your vehicle's make, model, and year, along with the rim's diameter, width, offset (ET), and bolt pattern. The tool will simulate the clearance and provide a fitment rating."
      },
      {
        q: "What does offset mean?",
        a: "Offset is the distance from the hub mounting surface to the centerline of the wheel. Positive offset means the hub is closer to the street side, common in newer cars. Negative offset pushes the wheel outwards for a deeper dish look."
      }
    ]
  },
  {
    category: "Wrap & Tint",
    questions: [
      {
        q: "How long does a vinyl wrap last?",
        a: "A high-quality vinyl wrap professionally installed typically lasts between 3 to 5 years, depending on environmental factors and how well it is maintained (e.g., garaged vs. parked outside)."
      }
    ]
  }
];

function AccordionItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-surface-high rounded-lg border border-white/5 overflow-hidden transition-all hover:bg-surface-highest group">
      <button 
        className="w-full text-left px-6 py-4 flex justify-between items-center focus:outline-none" 
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-sm font-medium text-on-surface pr-4">{question}</span>
        <ChevronDown 
          className={`w-5 h-5 text-on-surface-muted shrink-0 group-hover:text-primary-brand transition-all duration-300 ${isOpen ? 'rotate-180' : ''}`} 
        />
      </button>
      <div 
        className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'}`}
      >
        <p className="text-base text-on-surface-muted pt-2 border-t border-outline-subtle/30 leading-relaxed">
          {answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQ() {
  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-12 py-16 flex flex-col items-center">
      
      {/* Header Section */}
      <div className="w-full max-w-3xl text-center mb-16 relative">
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
        <h1 className="text-4xl md:text-5xl text-on-surface font-medium mb-4">Frequently Asked Questions</h1>
        <p className="text-lg text-on-surface-muted max-w-2xl mx-auto">
          Find answers to common questions about fitment, materials, orders, and our community.
        </p>
      </div>

      {/* Search Bar Section */}
      <div className="w-full max-w-2xl mb-16 relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Search className="w-5 h-5 text-outline-subtle group-focus-within:text-primary-brand transition-colors" />
        </div>
        <input 
          type="text" 
          placeholder="Search FAQ (e.g., 'offset', 'shipping')" 
          className="w-full bg-surface-high border border-outline-subtle text-on-surface text-base rounded-lg py-4 pl-12 pr-4 transition-all outline-none placeholder:text-on-surface-muted focus:border-primary-brand focus:ring-1 focus:ring-primary-brand" 
        />
      </div>

      {/* FAQ Categories & Accordions */}
      <div className="w-full max-w-3xl flex flex-col gap-12">
        {FAQ_DATA.map((section, idx) => (
          <section key={idx}>
            <h2 className="text-2xl font-medium text-primary-brand mb-4 border-b border-white/5 pb-2">
              {section.category}
            </h2>
            <div className="flex flex-col gap-2">
              {section.questions.map((q, qIdx) => (
                <AccordionItem key={qIdx} question={q.q} answer={q.a} />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* Support CTA Section */}
      <div className="w-full max-w-3xl mt-16 pt-8 text-center bg-surface-low/30 rounded-xl p-8 backdrop-blur-sm border border-white/5 relative overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-brand/5 to-transparent opacity-50 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
        <h3 className="text-2xl font-medium text-on-surface mb-2 relative z-10">Still need help?</h3>
        <p className="text-base text-on-surface-muted mb-8 max-w-md mx-auto relative z-10">
          Our support team is ready to assist you with specific fitment queries or order issues.
        </p>
        <button className="relative z-10 bg-primary-brand text-on-primary text-sm px-8 py-4 rounded-lg hover:bg-primary transition-colors duration-300 font-medium inline-flex items-center gap-2">
          <Headset className="w-5 h-5" />
          Contact Support
        </button>
      </div>

    </div>
  );
}
