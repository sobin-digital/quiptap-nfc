"use client";

export default function StepLoadingState(props: { label?: string }) {
  return (
    <div className="min-h-screen bg-black lux-body-bg text-white">
      <div className="mx-auto flex max-w-7xl items-center px-4 pt-20 sm:px-6 lg:px-8">
        <div className="w-full max-w-md rounded-[2.25rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.25)]">
          <div className="flex items-center justify-between gap-4">
            <p className="text-xs font-semibold tracking-[0.22em] text-white/45">
              {props.label ?? "LOADING"}
            </p>
            <div
              aria-hidden="true"
              className="h-9 w-9 animate-spin rounded-full border border-amber-400/30 border-t-amber-400/90"
            />
          </div>

          <div className="mt-6 space-y-3">
            <div className="h-10 w-full rounded-2xl bg-white/5" />
            <div className="h-10 w-full rounded-2xl bg-white/5" />
            <div className="h-10 w-full rounded-2xl bg-white/5" />
          </div>

          <p className="mt-6 text-sm leading-relaxed text-white/60">
            Preparing your premium setup...
          </p>
        </div>
      </div>
    </div>
  );
}

