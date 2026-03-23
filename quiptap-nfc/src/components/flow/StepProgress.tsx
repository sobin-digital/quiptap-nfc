"use client";

export default function StepProgress(props: { currentStep: 1 | 2 | 3; total?: 3 }) {
  const total = props.total ?? 3;
  const steps: Array<{ n: 1 | 2 | 3; label: string }> = [
    { n: 1, label: "Card" },
    { n: 2, label: "Template" },
    { n: 3, label: "Customize" },
  ];

  return (
    <div className="mt-6">
      <div
        aria-hidden="true"
        className="mx-auto flex w-full max-w-md items-center gap-3"
      >
        {steps.map((s, idx) => {
          const stepIndex = idx + 1;
          const isActive = s.n === props.currentStep;
          const isDone = stepIndex < props.currentStep;
          return (
            <div key={s.n} className="flex min-w-0 flex-1 items-center gap-3">
              <div className="flex min-w-0 flex-1 flex-col items-center">
                <div
                  className={[
                    "relative flex h-10 w-10 items-center justify-center rounded-full border bg-white/[0.03] text-xs font-bold transition-colors",
                    isDone
                      ? "border-amber-400/35 text-amber-200"
                      : isActive
                        ? "border-amber-400/60 text-amber-100"
                        : "border-white/10 text-white/40",
                  ].join(" ")}
                >
                  <span>{s.n}</span>
                </div>
                <p className="mt-2 truncate text-[11px] font-semibold text-white/40">
                  {s.label}
                </p>
              </div>

              {s.n !== (total as 1 | 2 | 3) ? (
                <div
                  aria-hidden="true"
                  className={[
                    "h-px flex-1 bg-white/10 transition-colors",
                    isDone || isActive ? "bg-amber-400/35" : "bg-white/10",
                  ].join(" ")}
                />
              ) : null}
            </div>
          );
        })}
      </div>
      <p className="sr-only">
        Step {props.currentStep} of {total}
      </p>
    </div>
  );
}

