export default function RecoveryBrandPanel() {
  return (
    <div className="relative hidden min-h-full items-center justify-center overflow-hidden border-l border-outline-subtle/60 bg-surface px-12 text-center md:flex">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "linear-gradient(to right, #424842 1px, transparent 1px), linear-gradient(to bottom, #424842 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
      <div className="relative z-10">
        <h2 className="mb-6 text-5xl font-bold tracking-tight text-primary">
          Wheely Bits
        </h2>
        <p className="mx-auto max-w-sm text-lg leading-relaxed text-on-surface-muted">
          Precision engineering meets organic design. A sophisticated platform
          for automotive enthusiasts who demand clarity and performance.
        </p>
        <div className="mt-7 flex justify-center gap-4 text-xs text-on-surface-muted/70">
          <span>◉ End-to-end Encrypted</span>
          <span>•</span>
          <span>◉ Zero Data Sharing</span>
        </div>
      </div>
    </div>
  );
}
