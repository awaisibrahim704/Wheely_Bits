import { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  X, Zap, CheckCircle2,
  Upload, RotateCcw, AlertCircle, Camera,
  FileText, Box, ArrowRight,
} from 'lucide-react';
import Footer from '../../../components/Footer';

// ── Types ─────────────────────────────────────────────────────────────────────
type ScanState = 'idle' | 'scanning' | 'results' | 'error';

interface RimMatch {
  rank: number;
  label: string;
  score: number;
  cosine_similarity?: number;
  image_url: string;
}

const API_BASE = 'http://localhost:8000';

const RANK_STYLES = [
  'bg-primary-brand text-on-primary shadow-[0_0_15px_rgba(171,207,178,0.6)] ring-1 ring-primary-brand/50',
  'bg-white/20 text-white ring-1 ring-white/30',
  'bg-white/10 text-white/70 ring-1 ring-white/20',
];
const RANK_LABELS = ['1st Match', '2nd Match', '3rd Match'];

// ── Component ─────────────────────────────────────────────────────────────────
export default function AIRecognition() {
  const [state, setState]       = useState<ScanState>('idle');
  const [preview, setPreview]   = useState<string | null>(null);
  const [file, setFile]         = useState<File | null>(null);
  const [matches, setMatches]   = useState<RimMatch[]>([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // ── File handling ────────────────────────────────────────────────────────
  const handleFile = useCallback((f: File) => {
    if (!f.type.startsWith('image/')) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setState('idle');
    setMatches([]);
    setErrorMsg('');
  }, []);

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
  };

  // ── Scan ─────────────────────────────────────────────────────────────────
  const handleScan = async () => {
    if (!file) return;
    setState('scanning');
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch(`${API_BASE}/scan`, { method: 'POST', body: form });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: `Server error ${res.status}` }));
        throw new Error(err.detail);
      }
      const data = await res.json();
      setMatches(data.matches ?? []);
      setState(data.matches?.length > 0 ? 'results' : 'error');
      if (!data.matches?.length) setErrorMsg('No matching rims found in the database.');
    } catch (err: unknown) {
      setState('error');
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMsg(
        msg.toLowerCase().includes('fetch') || msg.toLowerCase().includes('network')
          ? 'Cannot reach the AI server.\nRun: python ai_rim_scan/server.py'
          : msg,
      );
    }
  };

  const reset = () => {
    setState('idle');
    setPreview(null);
    setFile(null);
    setMatches([]);
    setErrorMsg('');
    if (inputRef.current) inputRef.current.value = '';
  };

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="relative min-h-screen flex flex-col justify-between overflow-x-hidden text-white bg-transparent">

      {/* ── Top Header Navigation ──────────────────────────────────────── */}
      <header className="relative z-20 w-full border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/rim"
            className="w-11 h-11 rounded-full border border-white/20 bg-white/10
                       flex items-center justify-center hover:bg-white/20 transition-all hover:scale-105"
            title="Back to Rims"
          >
            <X className="w-5 h-5 text-white" />
          </Link>

          <div className="flex items-center gap-2.5 bg-black/60 border border-white/15
                          rounded-full px-5 py-2.5 backdrop-blur-md shadow-lg">
            <Zap className="w-4 h-4 text-primary-brand animate-pulse" />
            <span className="text-xs font-bold tracking-widest uppercase text-white">AI Rim Scanner</span>
          </div>

          <Link
            to="/"
            className="text-xs font-semibold uppercase tracking-widest text-white/70 hover:text-primary transition-colors hidden sm:block"
          >
            Wheely Bits
          </Link>
          <div className="w-11 sm:hidden" /> {/* Spacer for balance on mobile */}
        </div>
      </header>

      {/* ── Main Content Container ─────────────────────────────────────── */}
      <main className="relative z-10 flex-1 flex flex-col items-center
                       px-4 md:px-8 py-10 w-full max-w-7xl mx-auto">

        {/* ══ IDLE — No photo uploaded yet ════════════════════════════════ */}
        {state === 'idle' && !preview && (
          <div className="w-full flex flex-col items-center gap-8 my-auto">
            <div className="text-center max-w-2xl">
              <h1 className="text-3xl md:text-5xl font-medium tracking-tight text-white mb-4">
                Instant Wheel Identification
              </h1>
              <p className="text-white/60 text-base md:text-lg">
                Upload or capture any rim photo. Our neural network analyzes spoke geometry and matches it directly to our verified catalog.
              </p>
            </div>

            {/* Expansive Drag & Drop Area */}
            <div
              onDragOver={e => { e.preventDefault(); setDragging(true); }}
              onDragLeave={() => setDragging(false)}
              onDrop={onDrop}
              onClick={() => inputRef.current?.click()}
              className={`w-full max-w-4xl min-h-[380px] md:min-h-[440px] rounded-3xl border-2 border-dashed
                          cursor-pointer flex flex-col items-center justify-center gap-6 p-8
                          bg-black/40 backdrop-blur-xl transition-all duration-300 shadow-2xl
                          ${dragging
                            ? 'border-primary-brand bg-primary-brand/15 scale-[1.01] shadow-[0_0_50px_rgba(171,207,178,0.2)]'
                            : 'border-white/20 hover:border-primary-brand/60 hover:bg-black/50 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)]'}`}
            >
              <div className="w-24 h-24 rounded-full bg-primary-brand/20 border border-primary-brand/40
                              flex items-center justify-center text-primary-brand transition-transform group-hover:scale-110">
                <Upload className="w-11 h-11" />
              </div>
              <div className="text-center px-4">
                <p className="text-white font-semibold text-2xl mb-2">Upload Rim Image</p>
                <p className="text-white/50 text-base">Drag & drop your file here, or click to browse</p>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-white/10 text-white/50 text-xs font-mono">JPG</span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-white/50 text-xs font-mono">PNG</span>
                  <span className="px-3 py-1 rounded-full bg-white/10 text-white/50 text-xs font-mono">WEBP</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══ IDLE — Photo Selected, Ready to Scan ═════════════════════════ */}
        {state === 'idle' && preview && (
          <div className="w-full flex flex-col items-center gap-8">
            <div className="text-center max-w-2xl">
              <h1 className="text-3xl md:text-4xl font-medium tracking-tight text-white mb-2">
                Photo Selected
              </h1>
              <p className="text-white/50 text-sm md:text-base">
                Ensure the wheel spokes are clearly visible, then start the AI scan.
              </p>
            </div>

            {/* Large Centered Image Preview Box */}
            <div className="w-full max-w-5xl rounded-3xl overflow-hidden border border-white/20
                            shadow-[0_12px_60px_rgba(0,0,0,0.8)] bg-black/60 backdrop-blur-xl p-4 md:p-6
                            flex items-center justify-center min-h-[400px] max-h-[70vh]">
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={preview}
                  alt="Selected rim"
                  className="max-h-[65vh] w-auto max-w-full object-contain block rounded-2xl"
                />
                <div className="absolute top-3 left-3 bg-black/75 backdrop-blur-md border border-white/15
                                rounded-full px-4 py-2 flex items-center gap-2 shadow-lg">
                  <Camera className="w-4 h-4 text-primary-brand" />
                  <span className="text-xs font-bold uppercase tracking-widest text-white">
                    Image Loaded
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons Row */}
            <div className="w-full max-w-5xl flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => inputRef.current?.click()}
                className="py-4 px-8 rounded-2xl border border-white/20 bg-white/10 text-white
                           font-semibold text-sm uppercase tracking-widest backdrop-blur-md
                           hover:bg-white/20 transition-all text-center"
              >
                Change Photo
              </button>
              <button
                onClick={handleScan}
                className="py-4 px-12 rounded-2xl bg-primary-brand text-on-primary
                           font-bold uppercase tracking-widest flex items-center justify-center gap-3
                           hover:brightness-110 active:scale-95 transition-all shadow-[0_0_30px_rgba(171,207,178,0.4)]"
              >
                <Zap className="w-5 h-5 fill-current" />
                Scan Rim Model
              </button>
            </div>
          </div>
        )}

        {/* ══ SCANNING — Neural Net Active ═════════════════════════════════ */}
        {state === 'scanning' && preview && (
          <div className="w-full flex flex-col items-center gap-8 my-auto">
            <div className="text-center">
              <h1 className="text-3xl font-medium tracking-tight text-white mb-2">Analyzing Spoke Geometry...</h1>
              <p className="text-primary-brand font-mono text-xs uppercase tracking-widest animate-pulse">
                EfficientNet-B0 Feature Extractor & FAISS Cosine Indexing
              </p>
            </div>

            {/* Scanning Viewport with Reticle */}
            <div className="w-full max-w-5xl rounded-3xl overflow-hidden border border-primary-brand/40
                            shadow-[0_0_60px_rgba(171,207,178,0.18)] bg-black/70 backdrop-blur-xl p-4 md:p-6
                            flex items-center justify-center min-h-[400px] max-h-[70vh]">
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={preview}
                  alt="Scanning"
                  className="max-h-[65vh] w-auto max-w-full object-contain block brightness-40 rounded-2xl"
                />

                {/* Centered Scanning Reticle Overlay */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="relative w-64 h-64 md:w-80 md:h-80">
                    <div className="absolute top-0 left-0 w-10 h-10 border-t-4 border-l-4 border-primary-brand rounded-tl-lg" />
                    <div className="absolute top-0 right-0 w-10 h-10 border-t-4 border-r-4 border-primary-brand rounded-tr-lg" />
                    <div className="absolute bottom-0 left-0 w-10 h-10 border-b-4 border-l-4 border-primary-brand rounded-bl-lg" />
                    <div className="absolute bottom-0 right-0 w-10 h-10 border-b-4 border-r-4 border-primary-brand rounded-br-lg" />
                    <div className="absolute inset-0 overflow-hidden flex flex-col justify-start">
                      <div className="w-full h-1 bg-primary-brand shadow-[0_0_20px_rgba(171,207,178,1)]
                                      animate-[scan_2s_ease-in-out_infinite]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ══ RESULTS — Side-by-Side: Input on Left, Results on Right ══════ */}
        {state === 'results' && matches.length > 0 && (
          <div className="w-full flex flex-col gap-8">

            {/* Top Status Banner */}
            <div className="w-full flex flex-col sm:flex-row sm:items-center justify-between gap-4
                            bg-primary-brand/10 border border-primary-brand/30 rounded-2xl px-6 py-4
                            backdrop-blur-xl shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary-brand/20 border border-primary-brand/40 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-primary-brand" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Visual Comparison & Identification</h3>
                  <p className="description-copy text-white/60">Compare your input image on the left directly against the top 3 AI-matched models on the right</p>
                </div>
              </div>
              <button
                onClick={reset}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/20
                           bg-white/10 backdrop-blur-md text-white font-bold text-xs
                           uppercase tracking-widest hover:bg-white/20 transition-all self-start sm:self-auto shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Scan Another Rim
              </button>
            </div>

            {/* Side-by-Side Layout Grid */}
            <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

              {/* ── LEFT COLUMN: User's Original Input Photo (Sticky on Desktop) ── */}
              <div className="lg:col-span-5 lg:sticky lg:top-24 flex flex-col gap-4">
                <div className="flex items-center justify-between px-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-white/60">
                    Your Scanned Photo
                  </span>
                  <span className="text-[11px] font-mono text-primary-brand bg-primary-brand/15 px-2.5 py-0.5 rounded-full border border-primary-brand/30">
                    Input Source
                  </span>
                </div>

                {/* Input Image Card */}
                <div className="w-full rounded-3xl overflow-hidden border border-white/20
                                bg-black/60 backdrop-blur-xl shadow-2xl p-4 md:p-6 flex flex-col items-center">
                  <div className="w-full h-72 sm:h-88 lg:h-[420px] rounded-2xl overflow-hidden bg-zinc-900/80 border border-white/10 flex items-center justify-center p-3">
                    <img
                      src={preview!}
                      alt="Your scanned rim"
                      className="w-full h-full object-contain block rounded-xl"
                    />
                  </div>

                  <div className="w-full mt-5 pt-4 border-t border-white/10 flex flex-col gap-3">
                    <div className="flex items-center justify-between text-xs text-white/50">
                      <span>Status</span>
                      <span className="text-primary-brand font-medium">Processed</span>
                    </div>
                    <button
                      onClick={reset}
                      className="w-full py-3 rounded-xl border border-white/20 bg-white/10 text-white
                                 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2
                                 hover:bg-white/20 transition-all"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Upload Different Photo
                    </button>
                  </div>
                </div>
              </div>

              {/* ── RIGHT COLUMN: 3 Matched Rim Results ── */}
              <div className="lg:col-span-7 flex flex-col gap-5">
                <div className="flex items-center justify-between px-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-white/60">
                    Top 3 Matched Rim Candidates
                  </span>
                  <span className="text-xs text-white/40">
                    Ranked by Similarity
                  </span>
                </div>

                {/* Vertical Stack of Result Cards */}
                <div className="flex flex-col gap-5">
                  {matches.map((match, i) => (
                    <div
                      key={match.rank}
                      className={`flex flex-col sm:flex-row gap-5 p-5 md:p-6 rounded-3xl border backdrop-blur-xl
                                  transition-all duration-300 shadow-2xl
                                  ${i === 0
                                    ? 'border-primary-brand/60 shadow-[0_0_40px_rgba(171,207,178,0.18)] bg-black/70 ring-1 ring-primary-brand/40'
                                    : 'border-white/15 bg-black/50 hover:border-white/30 hover:bg-black/60'}`}
                    >
                      {/* Left: Rim Display Image */}
                      <div className="w-full sm:w-48 sm:h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden bg-zinc-900/80 border border-white/10 flex items-center justify-center p-3 shrink-0 self-center sm:self-auto">
                        {match.image_url ? (
                          <img
                            src={`${API_BASE}${match.image_url}`}
                            alt={match.label}
                            className="w-full h-full object-contain block transition-transform duration-300 hover:scale-105"
                            onError={e => {
                              (e.target as HTMLImageElement).parentElement!.style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-white/30 gap-2">
                            <Camera className="w-8 h-8" />
                            <span className="text-xs">No reference image</span>
                          </div>
                        )}
                      </div>

                      {/* Right: Info, Score, and Action Buttons */}
                      <div className="flex-1 flex flex-col justify-between gap-4">
                        {/* Top: Rank Badge and Cosine Similarity Score */}
                        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-white/10">
                          <span className={`text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider
                                            ${RANK_STYLES[i]}`}>
                            {RANK_LABELS[i]}
                          </span>
                          <div className="text-right flex items-center gap-1.5 bg-black/40 border border-white/15 px-3 py-1 rounded-xl">
                            <span className="text-[11px] font-mono text-white/50 lowercase">cosine similarity score =</span>
                            <span className={`font-mono font-bold text-sm md:text-base
                                              ${i === 0 ? 'text-primary-brand' : 'text-white/90'}`}>
                              {Number(match.cosine_similarity ?? (match.score > 1 ? match.score / 100 : match.score)).toFixed(3)}
                            </span>
                          </div>
                        </div>

                        {/* Identified Model Name */}
                        <div>
                          <p className="text-[11px] font-bold uppercase tracking-widest text-primary-brand mb-1">
                            Identified Model
                          </p>
                          <h2 className={`font-bold leading-tight
                                         ${i === 0 ? 'text-white text-xl md:text-2xl' : 'text-white/90 text-lg md:text-xl'}`}>
                            {match.label}
                          </h2>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10">
                          {/* Specs Button */}
                          <Link
                            to="/rim/overview"
                            className="py-2.5 px-4 rounded-xl border border-white/20 bg-white/10
                                       text-white text-xs font-bold uppercase tracking-widest
                                       flex items-center justify-center gap-2
                                       hover:bg-white/20 transition-all text-center"
                          >
                            <FileText className="w-4 h-4 text-white/70" />
                            Specs
                          </Link>

                          {/* Visualize Button */}
                          <Link
                            to="/studio"
                            className={`py-2.5 px-4 rounded-xl text-xs font-bold uppercase
                                        tracking-widest flex items-center justify-center gap-2
                                        transition-all shadow-md text-center
                                        ${i === 0
                                          ? 'bg-primary-brand text-on-primary hover:brightness-110 shadow-primary-brand/20'
                                          : 'border border-white/20 bg-white/10 text-white hover:bg-white/20'}`}
                          >
                            <Box className="w-4 h-4" />
                            Visualize
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Bottom Browse Catalog Link */}
                <div className="pt-2 flex justify-center sm:justify-start">
                  <Link
                    to="/rim"
                    className="text-white/60 hover:text-white text-sm font-medium transition-colors flex items-center gap-2"
                  >
                    Browse Full Catalog Instead
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ══ ERROR State ══════════════════════════════════════════════════ */}
        {state === 'error' && (
          <div className="flex flex-col items-center gap-6 py-16 text-center max-w-lg mx-auto my-auto">
            <div className="w-20 h-20 rounded-3xl bg-red-500/15 border border-red-500/30
                            flex items-center justify-center text-red-400 shadow-xl">
              <AlertCircle className="w-10 h-10" />
            </div>
            <div>
              <h2 className="text-white font-semibold text-2xl mb-2">Scan Failed</h2>
              <p className="text-white/60 text-sm whitespace-pre-line leading-relaxed">
                {errorMsg}
              </p>
            </div>
            <button
              onClick={reset}
              className="px-8 py-3.5 rounded-2xl bg-primary-brand text-on-primary font-bold
                         uppercase tracking-widest hover:brightness-110 transition-all shadow-lg"
            >
              Try Again
            </button>
          </div>
        )}

      </main>

      {/* ── Standard Wheely Bits Footer ─────────────────────────────────── */}
      <div className="relative z-10 w-full mt-16">
        <Footer />
      </div>

      {/* Hidden File Input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={e => { if (e.target.files?.[0]) handleFile(e.target.files[0]); }}
      />
    </div>
  );
}
