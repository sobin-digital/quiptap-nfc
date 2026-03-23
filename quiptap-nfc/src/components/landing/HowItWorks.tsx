import SectionHeading from "./SectionHeading";

export default function HowItWorks() {
  const steps = [
    { step: "01", title: "Choose card", description: "Select your NFC card finish." },
    { step: "02", title: "Customize profile", description: "Update your details anytime." },
    { step: "03", title: "Tap and share", description: "Scan the card. Open instantly." },
  ] as const;

  return (
    <section id="how-it-works" className="mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8">
      <SectionHeading
        eyebrow="HOW IT WORKS"
        title="One journey. Infinite updates."
        description="Build once, evolve freely. Your public link stays the same after every edit."
      />

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
        {steps.map((s) => (
          <div
            key={s.step}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.18)] transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/25"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.18),transparent_60%)] blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
            <div className="relative">
              <p className="text-xs font-semibold tracking-[0.22em] text-amber-400/80">
                {s.step}
              </p>
              <h3 className="mt-3 text-lg font-semibold text-white">
                {s.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/70">
                {s.description}
              </p>
              <div className="mt-6 h-px w-full bg-gradient-to-r from-amber-400/0 via-amber-400/30 to-amber-400/0" />
              <p className="mt-5 text-xs font-semibold tracking-widest text-white/45">
                PREMIUM FLOW
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

