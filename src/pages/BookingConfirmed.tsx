import { Link, useLocation } from 'react-router-dom';
import {
  CheckCircle2,
  Calendar,
  MapPin,
  Map,
  CalendarPlus,
  CarFront,
  Star,
  ThumbsUp,
  Check,
  AlertCircle,
  ExternalLink,
  Edit,
  Sparkles,
  Store,
} from 'lucide-react';
import { useEffect, useState, useCallback, useMemo } from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  getSellerRatings,
  getMyRating,
  submitRating,
  type RatingSummary,
  type SellerRating,
} from '../lib/sellerApi';

const starLabels: Record<number, string> = {
  1: '1 Star — Needs Improvement',
  2: '2 Stars — Fair Experience',
  3: '3 Stars — Good Fitment & Service',
  4: '4 Stars — Very Good / Highly Satisfied',
  5: '5 Stars — Exceptional / Flawless Service',
};

const quickTags = [
  'Laser Alignment',
  'Flawless Fitment',
  'Clean Workshop Bay',
  'On-Time Service',
  'Knowledgeable Staff',
  'Wheel Protection',
];

export default function BookingConfirmed() {
  const { user } = useAuth();
  const location = useLocation();
  const [show, setShow] = useState(false);

  // Dynamic seller detection (supports state from previous booking flows or defaults to Aura Custom Studio)
  const sellerId = (location.state as { sellerId?: string })?.sellerId || 'aura-custom';
  const sellerName = (location.state as { sellerName?: string })?.sellerName || 'Aura Custom Studio';
  const studioAddress = (location.state as { sellerAddress?: string })?.sellerAddress || '42nd Design Way, Suite 8';
  const studioVendorSlug = sellerId === 'automax-wheels' ? 'automax-wheels' : 'aura-custom';

  // ── Rating State ────────────────────────────────────────────────────────────
  const [ratingSummary, setRatingSummary] = useState<RatingSummary | null>(null);
  const [allRatings, setAllRatings] = useState<SellerRating[]>([]);
  const [selectedStars, setSelectedStars] = useState<number>(0);
  const [hoverStars, setHoverStars] = useState<number>(0);
  const [guestName, setGuestName] = useState('');
  const [car, setCar] = useState('');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [hasRated, setHasRated] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Persistent user / guest identifier
  const effectiveUserId = useMemo(() => {
    if (user?.uid) return user.uid;
    try {
      let stored = localStorage.getItem('wheelybits:client_id');
      if (!stored) {
        stored = `guest_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
        localStorage.setItem('wheelybits:client_id', stored);
      }
      return stored;
    } catch {
      return `guest_${Date.now()}`;
    }
  }, [user?.uid]);

  useEffect(() => {
    setShow(true);
  }, []);

  const loadRatings = useCallback(async () => {
    try {
      const data = await getSellerRatings(sellerId);
      setRatingSummary({
        averageRating: data.averageRating,
        totalRatings: data.totalRatings,
        breakdown: data.breakdown,
      });
      setAllRatings(data.ratings);
    } catch {
      // ignore
    }
  }, [sellerId]);

  useEffect(() => {
    loadRatings();
    if (effectiveUserId) {
      getMyRating(sellerId, effectiveUserId)
        .then((res) => {
          if (res?.rating) {
            setSelectedStars(res.rating.stars);
            setComment(res.rating.comment || '');
            if (res.rating.car) setCar(res.rating.car);
            setHasRated(true);
          }
        })
        .catch(() => {});
    }
  }, [effectiveUserId, loadRatings, sellerId]);

  const handleRatingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStars === 0) {
      setSubmitError('Please tap the stars above to select your rating (1 to 5).');
      return;
    }

    const authorName =
      user?.displayName ||
      user?.email?.split('@')[0] ||
      guestName.trim() ||
      'Verified Customer';

    setSubmitting(true);
    setSubmitError('');
    try {
      const res = await submitRating({
        sellerId,
        userId: effectiveUserId,
        userName: authorName,
        stars: selectedStars,
        comment: comment.trim(),
        car: car.trim(),
      });

      setRatingSummary({
        averageRating: res.averageRating,
        totalRatings: res.totalRatings,
        breakdown: res.breakdown,
      });
      setSubmitSuccess('Thank you! Your seller rating has been recorded and is now live on the seller profile & dashboard.');
      setHasRated(true);
      setIsEditing(false);
      await loadRatings();
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Failed to submit rating. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const currentAverage = useMemo(() => {
    if (ratingSummary?.averageRating) return ratingSummary.averageRating.toFixed(1);
    if (allRatings.length > 0) {
      const sum = allRatings.reduce((acc, r) => acc + r.stars, 0);
      return (sum / allRatings.length).toFixed(1);
    }
    return '4.9';
  }, [allRatings, ratingSummary?.averageRating]);

  const totalReviewsCount = ratingSummary?.totalRatings ?? allRatings.length;

  return (
    <div className="flex flex-col min-h-screen relative overflow-hidden bg-background">
      {/* Background Layer */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] scale-105 hover:scale-110"
          style={{
            backgroundImage:
              "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDOIW4SQG7XoFuGNO7iAS7hAZYzAeqUfNIUPQYdrGeGPxjejM4Yoc6ZBvsWs808ukIVHId0S2kceDm152q80F3mJ5WhtMXKLIIZZ8zXHdeqtWkIxBzXvneQyXHCfNvdWEf83POL3NpIjRsnRRqS5bHDpZnGOKXZ1O4oSPoBfiVOiicxxtpyMnpM-bDv7PJJ-PeTqrGuLA2j7N0spJTeSHmeiiT0b-z40t2ACt3_6alZBPH9nMK_O-9bdhAZh3nXj3_j-mbz7gs3mDUy')",
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/60 to-background/90"></div>
      </div>

      {/* Main Content */}
      <main className="relative z-10 flex-grow flex items-center justify-center px-4 md:px-12 py-24 sm:py-32">
        <div className="w-full max-w-2xl flex flex-col items-center">
          {/* Animated Success Icon */}
          <div
            className={`transition-all duration-700 ease-out transform ${
              show ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
            } mb-10`}
          >
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-primary-brand/20 blur-3xl rounded-full"></div>
              <div className="relative w-28 h-28 md:w-36 md:h-36 rounded-full bg-surface-high/40 backdrop-blur-md flex items-center justify-center border border-primary-brand/30 shadow-[0_0_50px_rgba(171,207,178,0.2)]">
                <CheckCircle2 className="w-16 h-16 md:w-20 md:h-20 text-primary-brand" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          {/* Confirmation Text */}
          <div
            className={`text-center transition-all duration-700 delay-200 ease-out transform ${
              show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <h1 className="text-3xl md:text-5xl font-medium text-on-surface mb-3 tracking-tight drop-shadow-md">
              Booking Confirmed!
            </h1>
            <p className="text-base md:text-lg text-on-surface-muted max-w-md mx-auto leading-relaxed">
              Your appointment at <span className="text-primary-brand font-bold">{sellerName}</span> is set for June 15th.
            </p>
          </div>

          {/* Detail Card */}
          <div
            className={`w-full mt-8 bg-surface-high/60 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10 shadow-2xl transition-all duration-700 delay-300 ease-out transform ${
              show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Date & Time */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-background/80 flex items-center justify-center text-primary-brand border border-white/5 shadow-inner shrink-0">
                  <Calendar className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <p className="text-xs font-bold text-on-surface-muted uppercase tracking-widest mb-1">Date & Time</p>
                  <p className="text-lg font-medium text-on-surface">June 15th, 2024</p>
                  <p className="text-sm text-on-surface-muted">10:00 AM — 12:30 PM</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-background/80 flex items-center justify-center text-primary-brand border border-white/5 shadow-inner shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="flex flex-col">
                  <p className="text-xs font-bold text-on-surface-muted uppercase tracking-widest mb-1">Studio Location</p>
                  <p className="text-lg font-medium text-on-surface">{sellerName}</p>
                  <p className="text-sm text-on-surface-muted">{studioAddress}</p>
                </div>
              </div>
            </div>

            <div className="my-6 border-t border-white/10 w-full"></div>

            {/* Booking Meta */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-on-surface-muted uppercase tracking-widest">CONFIRMATION ID:</span>
                <span className="text-sm font-mono text-on-surface tracking-widest bg-background/50 px-2 py-1 rounded border border-white/5">
                  WB-9902-AUR
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="px-3 py-1 bg-primary-brand/10 rounded-full border border-primary-brand/30">
                  <span className="text-xs font-bold text-primary-brand uppercase tracking-widest">STATUS: SECURED</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── SELLER RATING & FEEDBACK SECTION ── */}
          <div
            className={`w-full mt-6 bg-[#161a18]/90 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/[0.08] shadow-2xl transition-all duration-700 delay-400 ease-out transform ${
              show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            {/* Header: Overall Seller Rating */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/[0.08] pb-5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded-full bg-[#8fb397]/20 border border-[#8fb397]/30 p-1.5 text-primary-brand">
                    <Store className="w-4 h-4" />
                  </span>
                  <h2 className="text-base font-bold text-white flex items-center gap-2">
                    Rate Your Experience with {sellerName}
                  </h2>
                </div>
                <p className="mt-1 text-xs text-[#c2c8c0]">
                  Help other enthusiasts on Wheely Bits by rating this merchant’s fitment, bay service, and communication.
                </p>
              </div>

              {/* Overall Score Badge */}
              <div className="flex items-center gap-3 self-start sm:self-auto rounded-xl bg-[#141618] border border-white/10 px-3.5 py-2">
                <div className="text-right">
                  <div className="flex items-center justify-end gap-1 text-[#d4a373]">
                    <Star className="w-4 h-4 fill-[#d4a373]" />
                    <span className="text-sm font-bold text-white">{currentAverage}</span>
                    <span className="text-[10px] text-[#c2c8c0]">/ 5.0</span>
                  </div>
                  <span className="text-[9px] text-[#c2c8c0] block">
                    {totalReviewsCount} Verified {totalReviewsCount === 1 ? 'Review' : 'Reviews'}
                  </span>
                </div>
                <Link
                  to={`/vendors/${studioVendorSlug}#reviews-section`}
                  className="rounded-lg bg-[#282a2c] p-2 text-white hover:bg-[#abcfb2] hover:text-[#163722] transition"
                  title="View all customer reviews for this seller"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Notification messages */}
            {submitSuccess && (
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-[#063a32] border border-[#55d6a7]/40 p-3 text-xs text-[#55d6a7]">
                <Check className="h-4 w-4 shrink-0" />
                <span>{submitSuccess}</span>
              </div>
            )}
            {submitError && (
              <div className="mt-4 flex items-center gap-2 rounded-xl bg-red-950/70 border border-red-500/40 p-3 text-xs text-red-300">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            {/* Interactive Rating Form or Already Rated Card */}
            {hasRated && !isEditing ? (
              <div className="mt-5 rounded-xl border border-[#8fb397]/30 bg-[#121915] p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#abcfb2]">
                      <Sparkles className="w-3 h-3" /> Your Verified Seller Rating
                    </span>
                    <div className="mt-2 flex items-center gap-1.5">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-5 h-5 ${
                            s <= selectedStars ? 'fill-[#d4a373] text-[#d4a373]' : 'text-white/20'
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-xs font-semibold text-white">
                        {starLabels[selectedStars] || `${selectedStars} Stars`}
                      </span>
                    </div>
                    {car && <p className="mt-1 text-xs text-[#abcfb2]">🏎 Vehicle: {car}</p>}
                    {comment && <p className="mt-2 text-xs text-[#e2e2e5] italic">&ldquo;{comment}&rdquo;</p>}
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="inline-flex items-center gap-1 text-xs text-[#abcfb2] hover:underline"
                  >
                    <Edit className="w-3.5 h-3.5" /> Edit Rating
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleRatingSubmit} className="mt-5 space-y-4">
                {/* Star Rating Picker */}
                <div>
                  <label className="block text-xs font-bold text-white uppercase tracking-wider mb-2">
                    How was your experience? <span className="text-[#abcfb2]">*</span>
                  </label>
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-1.5 bg-[#121416] p-2 rounded-xl border border-white/10">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const active = (hoverStars || selectedStars) >= star;
                        return (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setSelectedStars(star)}
                            onMouseEnter={() => setHoverStars(star)}
                            onMouseLeave={() => setHoverStars(0)}
                            className="p-1 transition-transform hover:scale-125 focus:outline-none"
                            aria-label={`Rate ${star} Stars`}
                          >
                            <Star
                              className={`w-6 h-6 transition ${
                                active ? 'fill-[#d4a373] text-[#d4a373]' : 'text-white/20 hover:text-[#d4a373]/60'
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                    <span className="text-xs font-semibold text-[#d4a373]">
                      {starLabels[hoverStars || selectedStars] || 'Tap stars to rate seller'}
                    </span>
                  </div>
                </div>

                {/* Name Input if not logged in */}
                {!user && (
                  <div>
                    <label className="block text-xs font-medium text-[#c2c8c0] mb-1">
                      Your Name <span className="text-[#abcfb2]">*</span>
                    </label>
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="e.g. Danyal Khan"
                      className="w-full rounded-xl border border-white/10 bg-[#121416] px-3.5 py-2.5 text-xs text-white placeholder:text-[#c2c8c0]/40 focus:border-[#abcfb2] focus:outline-none"
                    />
                  </div>
                )}

                {/* Vehicle Model Input */}
                <div>
                  <label className="block text-xs font-medium text-[#c2c8c0] mb-1">
                    Your Car / Project Vehicle <span className="text-white/40 text-[10px]">(Optional)</span>
                  </label>
                  <input
                    type="text"
                    value={car}
                    onChange={(e) => setCar(e.target.value)}
                    placeholder="e.g. Honda Civic RS, BMW M340i, Golf R..."
                    className="w-full rounded-xl border border-white/10 bg-[#121416] px-3.5 py-2.5 text-xs text-white placeholder:text-[#c2c8c0]/40 focus:border-[#abcfb2] focus:outline-none"
                  />
                </div>

                {/* Quick Chips */}
                <div>
                  <span className="text-[10px] text-[#c2c8c0] block mb-1.5">Add feedback highlights:</span>
                  <div className="flex flex-wrap gap-1.5">
                    {quickTags.map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => {
                          if (!comment.includes(tag)) {
                            setComment((prev) => (prev ? `${prev} · ${tag}` : tag));
                          }
                        }}
                        className="rounded-full bg-[#1c221e] hover:bg-[#28322c] border border-[#8fb397]/30 px-2.5 py-1 text-[10px] text-[#abcfb2] transition"
                      >
                        + {tag}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Comment Textarea */}
                <div>
                  <label className="block text-xs font-medium text-[#c2c8c0] mb-1">
                    Your Review & Bay Feedback <span className="text-white/40 text-[10px]">(Optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Share your thoughts on installation timing, fitment accuracy, or technical expertise..."
                    className="w-full rounded-xl border border-white/10 bg-[#121416] p-3 text-xs text-white placeholder:text-[#c2c8c0]/40 focus:border-[#abcfb2] focus:outline-none"
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1.5 text-[11px] text-[#c2c8c0]">
                    <ThumbsUp className="w-3.5 h-3.5 text-[#55d6a7]" />
                    <span>Your rating updates the seller&apos;s score immediately.</span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isEditing && (
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="rounded-xl bg-[#282a2c] px-4 py-2 text-xs text-[#c2c8c0] hover:text-white transition"
                      >
                        Cancel
                      </button>
                    )}
                    <button
                      type="submit"
                      disabled={submitting || selectedStars === 0}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary-brand text-on-primary font-bold text-xs hover:brightness-110 transition active:scale-95 disabled:opacity-50 shadow-md shadow-primary-brand/20"
                    >
                      {submitting ? 'Submitting...' : hasRated ? 'Update Rating' : 'Submit Rating'}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Actions */}
          <div
            className={`mt-8 w-full grid grid-cols-1 md:grid-cols-3 gap-4 transition-all duration-700 delay-500 ease-out transform ${
              show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <button className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl bg-primary-brand text-on-primary font-bold hover:brightness-110 transition-all active:scale-95 shadow-lg shadow-primary-brand/20">
              <CalendarPlus className="w-5 h-5" />
              Add to Calendar
            </button>
            <button className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-white/10 bg-surface-high/40 backdrop-blur-md text-on-surface font-bold hover:bg-surface-highest transition-all active:scale-95">
              <Map className="w-5 h-5" />
              View Directions
            </button>
            <Link
              to="/garage"
              className="flex items-center justify-center gap-2 px-6 py-4 rounded-xl border border-white/10 bg-surface-high/40 backdrop-blur-md text-on-surface font-bold hover:bg-surface-highest transition-all active:scale-95"
            >
              <CarFront className="w-5 h-5" />
              Back to Garage
            </Link>
          </div>

          {/* Support Link */}
          <p
            className={`mt-10 text-sm text-on-surface-muted transition-all duration-700 delay-700 ease-out transform ${
              show ? 'opacity-100' : 'opacity-0'
            }`}
          >
            Need to reschedule?{' '}
            <a className="text-primary-brand font-bold hover:underline" href="#">
              Contact Support
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
