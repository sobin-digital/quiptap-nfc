import LuxButton from "./LuxButton";
import { makeLuxuryCardSvg } from "@/lib/svgDataUri";

export default function HeroSection() {
  const mockupSrc = makeLuxuryCardSvg({
    label: "QUIPTAP",
    accent: "#d4af37",
    bg1: "#0b0b0f",
    bg2: "#0a0a0a",
  });

  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-48 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.20),transparent_60%)] blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-10 h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.14),transparent_55%)] blur-2xl"
      />

      <div className="mx-auto w-full max-w-7xl px-4 pb-14 pt-16 sm:px-6 sm:pb-20 sm:pt-24 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-12">
          <div className="text-center lg:text-left">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold tracking-widest text-white/70">
              PREMIUM NFC DIGITAL BUSINESS CARDS
              <span className="h-px w-6 bg-amber-400/50" />
              1 tap. instant share.
            </p>

            <h1 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-5xl">
              Your Identity. One Tap Away.
            </h1>

            <p className="mt-5 text-pretty text-base leading-relaxed text-white/70 sm:text-lg">
              Replace printed cards with a luxury NFC experience. Select your card,
              customize your profile, and share via a permanent link that never
              changes.
            </p>

            <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-start">
              <LuxButton href="/select-card">Get Your Card</LuxButton>
              <LuxButton variant="secondary" href="/select-template">
                View Templates
              </LuxButton>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-3 text-left sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs font-semibold tracking-[0.18em] text-white/45">
                  SECURITY
                </p>
                <p className="mt-1 text-sm font-semibold text-white/85">
                  Supabase Auth
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs font-semibold tracking-[0.18em] text-white/45">
                  PAYMENTS
                </p>
                <p className="mt-1 text-sm font-semibold text-white/85">
                  Stripe Yearly Plans
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <p className="text-xs font-semibold tracking-[0.18em] text-white/45">
                  SHARE
                </p>
                <p className="mt-1 text-sm font-semibold text-white/85">
                  Permanent Slug Link
                </p>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center">
            <div
              className="absolute inset-0 -z-10 rounded-[2.5rem] bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.20),transparent_60%)] opacity-70 blur-xl"
              aria-hidden="true"
            />

            <div className="relative w-full max-w-[420px]">
              <div
                className="absolute -inset-4 -z-10 rounded-[3rem] bg-gradient-to-b from-amber-400/10 to-transparent blur-2xl"
                aria-hidden="true"
              />

              <div
                className="relative aspect-[4/3] w-full rounded-[2.25rem] border border-white/10 bg-black/20 p-3 shadow-[0_30px_120px_rgba(0,0,0,0.55)] [transform-style:preserve-3d] [perspective:900px] transition-transform duration-700 hover:[transform:rotateY(8deg)_rotateX(3deg)]"
                style={{ transform: "rotateY(16deg) rotateX(10deg)" }}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 rounded-[1.8rem] bg-[radial-gradient(circle_at_20%_0%,rgba(212,175,55,0.22),transparent_45%)] opacity-90"
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={mockupSrc}
                  alt="3D-style NFC card mockup"
                  className="absolute left-1/2 top-1/2 h-[94%] w-[94%] -translate-x-1/2 -translate-y-1/2 rounded-[1.8rem] object-contain [transform:translateZ(32px)_rotateY(-16deg)]"
                />
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                  <p className="text-xs font-semibold tracking-[0.18em] text-white/45">
                    NFC TAP
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white/85">
                    Instant open
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-3">
                  <p className="text-xs font-semibold tracking-[0.18em] text-white/45">
                    PUBLIC LINK
                  </p>
                  <p className="mt-1 text-sm font-semibold text-white/85">
                    Never changes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

