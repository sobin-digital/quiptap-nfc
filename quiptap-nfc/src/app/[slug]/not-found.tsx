import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white lux-body-bg">
      <main className="mx-auto w-full max-w-2xl px-4 pb-16 pt-16 sm:px-6 lg:px-8">
        <div className="rounded-[2.25rem] border border-white/10 bg-white/[0.02] p-6 shadow-[0_30px_120px_rgba(0,0,0,0.45)]">
          <p className="text-xs font-semibold tracking-[0.22em] text-amber-400/70">
            PROFILE NOT FOUND
          </p>
          <h1 className="mt-4 text-balance text-2xl font-semibold">
            That slug doesn&apos;t belong to a QuipTap card.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-white/70">
            Double-check the link or return home to create your own NFC
            business card.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-3 text-sm font-semibold text-white/90 transition-colors hover:border-amber-400/35 hover:bg-white/8"
            >
              Back Home
            </Link>
            <Link
              href="/select-card"
              className="inline-flex items-center justify-center rounded-full bg-gradient-to-b from-amber-400/95 to-amber-600/80 px-6 py-3 text-sm font-semibold tracking-wide text-black shadow-[0_10px_30px_rgba(217,164,64,0.28)] transition-all duration-300 hover:from-amber-300/95 hover:to-amber-500/85 hover:shadow-[0_14px_40px_rgba(217,164,64,0.35)]"
            >
              Create a Card
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

