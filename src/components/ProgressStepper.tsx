export default function ProgressStepper({ steps, currentStep }: { steps: string[], currentStep: number }) {
  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8 mt-24">
      <div className="flex items-center justify-between relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-outline-subtle -z-10"></div>
        {steps.map((step, idx) => {
          const isActive = idx === currentStep;
          const isCompleted = idx < currentStep;
          return (
            <div key={step} className="flex flex-col items-center gap-2">
              <div 
                className={`w-4 h-4 rounded-full transition-colors ${
                  isActive ? 'bg-primary-brand shadow-[0_0_12px_rgba(143,179,151,0.5)]' 
                  : isCompleted ? 'bg-primary border-2 border-primary-brand' 
                  : 'bg-surface-high border-2 border-outline-subtle'
                }`}
              ></div>
              <span className={`text-xs font-medium ${isActive ? 'text-primary-brand' : isCompleted ? 'text-on-surface' : 'text-on-surface-muted'}`}>
                {step}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
