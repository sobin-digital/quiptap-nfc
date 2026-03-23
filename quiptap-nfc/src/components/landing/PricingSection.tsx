import SectionHeading from "./SectionHeading";
import LuxButton from "./LuxButton";

export default function PricingSection() {
  const plans = [
    {
      name: "Basic",
      price: "$99",
      highlight: false,
      description: "Luxury presence, essential features.",
    },
    {
      name: "Pro",
      price: "$149",
      highlight: false,
      description: "More polish and flexibility for creators.",
    },
    {
      name: "Premium",
      price: "$249",
      highlight: true,
      description: "Best-in-class experience for brands.",
    },
  ] as const;

  return (
    <section
      id="pricing"
      className="relative mx-auto w-full max-w-7xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.18),transparent_62%)] blur-3xl"
      />

      <div className="relative">
        <SectionHeading
          eyebrow="PRICING"
          title="Choose your yearly plan"
          description="Switch templates and edit your profile anytime. Your slug link remains permanent."
        />

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-3">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`group relative overflow-hidden rounded-3xl border p-6 shadow-[0_20px_70px_rgba(0,0,0,0.22)] transition-all duration-300 ${
                p.highlight
                  ? "border-amber-400/35 bg-[linear-gradient(180deg,rgba(212,175,55,0.10),rgba(255,255,255,0.03))]"
                  : "border-white/10 bg-white/[0.03] hover:-translate-y-1 hover:border-amber-400/25"
              }`}
            >
              {p.highlight ? (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(700px circle at 20% 0%, rgba(212,175,55,0.22), transparent 45%)",
                  }}
                />
              ) : null}

              <div className="relative">
                <p className="text-xs font-semibold tracking-[0.22em] text-white/45">
                  {p.name.toUpperCase()}
                </p>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className="text-4xl font-semibold text-white">
                    {p.price}
                  </span>
                  <span className="text-sm font-semibold text-white/55">
                    /year
                  </span>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-white/70">
                  {p.description}
                </p>

                <div className="mt-6 h-px w-full bg-gradient-to-r from-amber-400/0 via-amber-400/25 to-amber-400/0" />

                <div className="mt-6 flex flex-col gap-3">
                  <LuxButton
                    variant={p.highlight ? "primary" : "secondary"}
                    href="#how-it-works"
                  >
                    {p.highlight ? "Get Premium" : "Choose Plan"}
                  </LuxButton>
                  <a
                    href="#"
                    className="text-center text-xs font-semibold text-white/50 underline-offset-4 hover:text-amber-400/70 hover:underline"
                  >
                    Learn more (coming soon)
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

