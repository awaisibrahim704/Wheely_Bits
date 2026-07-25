import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, MessageSquare, Heart, Share2, MoreHorizontal, User } from 'lucide-react';

export default function CommunityThread() {
  const { id } = useParams();

  // Mock post data
  const post = {
    id: id,
    author: 'ApexHunter_99',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
    time: '2 hours ago',
    title: 'GT3 RS Delivery Day - First Impressions & Break-in Process',
    content: `Finally took delivery of the 992 GT3 RS today after an 18-month wait. The sheer presence of this car in person cannot be captured in photos.\n\nThe initial drive home was a mix of terrifying and exhilarating. The suspension, even in normal mode, communicates every pebble on the road. Going to keep the revs under 7k for the first 1,000 miles, but even short shifting, the mechanical symphony from the 4.0L flat-six is intoxicating.\n\nFirst mods planned: \n1. Full body stealth PPF\n2. GMG center bypass exhaust\n3. Track alignment setup\n\nI'll be documenting the entire build process here. Let me know if you have any questions about the delivery process or initial impressions!`,
    images: [
      'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?q=80&w=1200&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503371476106-02685710f7a5?q=80&w=1200&auto=format&fit=crop'
    ],
    likes: 342,
    comments: 56
  };

  const comments = [
    {
      id: 1,
      author: 'TrackAddict',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=200&auto=format&fit=crop',
      time: '1 hour ago',
      content: 'Absolutely stunning spec. The wait must have been agonizing. Are you taking it to Laguna Seca anytime soon?',
      likes: 12
    },
    {
      id: 2,
      author: 'ApexHunter_99',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop',
      time: '45 mins ago',
      content: '@TrackAddict Thanks! And yes, aiming for the PCA event at Laguna in October once it\'s fully broken in and aligned.',
      likes: 8
    }
  ];

  return (
    <div className="flex flex-col min-h-full pb-32">
      {/* Header */}
      <div className="max-w-[800px] mx-auto w-full px-4 md:px-0 pt-8 mb-8 sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-white/5 pb-4">
        <Link to="/community" className="inline-flex items-center gap-2 text-on-surface-muted hover:text-on-surface transition-colors font-bold uppercase tracking-widest text-xs">
          <ArrowLeft className="w-4 h-4" />
          Back to Community
        </Link>
      </div>

      <div className="max-w-[800px] mx-auto w-full px-4 md:px-0">
        
        {/* Main Post */}
        <div className="bg-surface-high/40 rounded-3xl border border-white/10 p-6 md:p-8 mb-8">
          {/* Author Info */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-4">
              <img src={post.avatar} alt={post.author} className="w-12 h-12 rounded-full border-2 border-surface-highest object-cover" />
              <div>
                <h3 className="font-bold text-on-surface">{post.author}</h3>
                <p className="text-xs text-on-surface-muted">{post.time}</p>
              </div>
            </div>
            <button className="text-on-surface-muted hover:text-on-surface">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <h1 className="text-2xl md:text-3xl font-medium text-on-surface mb-6">{post.title}</h1>
          
          <div className="prose prose-invert max-w-none mb-8 text-on-surface-muted/90">
            {post.content.split('\\n').map((paragraph, idx) => (
              <p key={idx} className="mb-4">{paragraph}</p>
            ))}
          </div>

          {/* Media Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {post.images.map((img, idx) => (
              <div key={idx} className="aspect-square rounded-2xl overflow-hidden border border-white/5">
                <img src={img} alt="Post media" className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
              </div>
            ))}
          </div>

          {/* Interaction Bar */}
          <div className="flex items-center gap-6 border-t border-white/10 pt-6">
            <button className="flex items-center gap-2 text-primary-brand hover:text-primary transition-colors group">
              <Heart className="w-5 h-5 fill-primary-brand group-hover:scale-110 transition-transform" />
              <span className="font-bold">{post.likes}</span>
            </button>
            <button className="flex items-center gap-2 text-on-surface-muted hover:text-on-surface transition-colors group">
              <MessageSquare className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="font-bold">{post.comments}</span>
            </button>
            <button className="flex items-center gap-2 text-on-surface-muted hover:text-on-surface transition-colors ml-auto">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Comment Input */}
        <div className="flex gap-4 mb-12">
          <div className="w-10 h-10 rounded-full bg-surface-highest border border-white/10 flex items-center justify-center shrink-0">
            <User className="w-5 h-5 text-on-surface-muted" />
          </div>
          <div className="flex-grow">
            <textarea 
              placeholder="Add a comment..." 
              className="w-full bg-surface-high border border-white/10 rounded-2xl p-4 min-h-[100px] resize-none focus:outline-none focus:border-primary-brand focus:ring-1 focus:ring-primary-brand text-on-surface text-sm"
            ></textarea>
            <div className="flex justify-end mt-2">
              <button className="bg-primary-brand text-on-primary font-bold px-6 py-2 rounded-lg text-sm hover:brightness-110 transition-all shadow-lg shadow-primary-brand/20">
                Post Comment
              </button>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="space-y-8">
          <h3 className="text-sm font-bold uppercase tracking-widest text-on-surface-muted border-b border-white/10 pb-4">Responses ({comments.length})</h3>
          
          {comments.map((comment) => (
            <div key={comment.id} className="flex gap-4">
              <img src={comment.avatar} alt={comment.author} className="w-10 h-10 rounded-full border border-surface-highest object-cover shrink-0" />
              <div className="flex-grow">
                <div className="bg-surface-high/40 rounded-2xl rounded-tl-none border border-white/5 p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="font-bold text-on-surface text-sm mr-2">{comment.author}</span>
                      <span className="text-xs text-on-surface-muted">{comment.time}</span>
                    </div>
                  </div>
                  <p className="text-on-surface-muted text-sm leading-relaxed">{comment.content}</p>
                </div>
                <div className="flex items-center gap-4 mt-2 px-2">
                  <button className="flex items-center gap-1.5 text-xs font-bold text-on-surface-muted hover:text-primary-brand transition-colors">
                    <Heart className="w-3.5 h-3.5" />
                    {comment.likes}
                  </button>
                  <button className="text-xs font-bold text-on-surface-muted hover:text-on-surface transition-colors">
                    Reply
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
