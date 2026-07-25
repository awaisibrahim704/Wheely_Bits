import { useState } from 'react';
import { Camera, ArrowRight, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
const RIMS = [
  { id: 'vossen-hf5', brand: 'Vossen', model: 'HF-5', type: 'Hybrid Forged', finish: 'Gloss Gunmetal', price: '$850 /ea', rating: 4.9, image: 'https://images.unsplash.com/photo-1582596521319-3c35f793b8f6?auto=format&fit=crop&w=600&q=80' },
  { id: 'bbs-lm', brand: 'BBS', model: 'LM', type: 'Multi-Piece', finish: 'Diamond Black', price: '$1,200 /ea', rating: 5.0, image: 'https://images.unsplash.com/photo-1600712242805-9f72877b0492?auto=format&fit=crop&w=600&q=80' },
  { id: 'rotiform-las-r', brand: 'Rotiform', model: 'LAS-R', type: 'Monoblock', finish: 'Matte Black', price: '$350 /ea', rating: 4.7, image: 'https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=600&q=80' },
];
export default function RimSelection() {
  const [filter, setFilter] = useState('All');
  const [selectedRim, setSelectedRim] = useState('vossen-hf5');
  const navigate = useNavigate();
  const filteredRims = filter === 'All' ? RIMS : RIMS.filter(r => r.type.includes(filter));
  return (
    <div className="min-h-screen bg-surface text-on-surface p-6 md:p-12">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Rim Selection</h1>
            <p className="text-on-surface-muted text-sm mt-1">Choose your preferred wheels or match via AI scan.</p>
          </div>
          <button 
            onClick={() => navigate('/ai-recognition')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-brand text-on-primary font-bold text-sm shadow-lg hover:opacity-90 transition-all"
          >
            <Camera className="w-4 h-4" /> AI Rim Scan
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 border-b border-white/10">
          {['All', 'Hybrid Forged', 'Multi-Piece', 'Monoblock'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className="px-6 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all"
            >
              {f}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredRims.map((rim) => (
            <div
              key={rim.id}
              onClick={() => setSelectedRim(rim.id)}
              className={`bg-surface-high/60 backdrop-blur-md rounded-3xl overflow-hidden transition-all duration-300 cursor-pointer group flex flex-col ${selectedRim === rim.id ? 'border-primary-brand shadow-[0_0_0_2px_rgba(110,231,183,0.25)]' : 'border-white/10'}`}
            >
              <div className="relative h-64 overflow-hidden bg-surface-highest">
                <img 
                  src={rim.image} 
                  alt={rim.brand + ' ' + rim.model}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute top-4 right-4 bg-surface/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" /> {rim.rating}
                </div>
              </div>
              <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
                <div>
                  <span className="text-xs font-semibold text-primary-brand uppercase tracking-wider">{rim.brand}</span>
                  <h3 className="text-xl font-bold mt-0.5">{rim.model}</h3>
                  <p className="text-sm text-on-surface-muted mt-1">{rim.finish} • {rim.type}</p>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                  <span className="text-lg font-extrabold text-primary-brand">{rim.price}</span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); navigate(`/rim/detail/${rim.id}`); }}
                    className="flex items-center gap-1 text-sm font-bold text-on-surface hover:text-primary-brand transition-colors"
                  >
                    Details <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
