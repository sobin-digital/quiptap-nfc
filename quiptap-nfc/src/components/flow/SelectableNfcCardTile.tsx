"use client";

export default function SelectableNfcCardTile(props: {
  name: string;
  priceLabel: string;
  imageSrc: string;
  accent: string;
  isSelected: boolean;
  onSelect: () => void;
}) {
  const { name, priceLabel, imageSrc, accent, isSelected, onSelect } = props;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group relative overflow-hidden rounded-3xl border bg-white/[0.03] p-5 text-left shadow-[0_20px_70px_rgba(0,0,0,0.35)] transition-all duration-300 ${
        isSelected
          ? "border-amber-400/40 ring-1 ring-amber-400/30"
          : "border-white/10 hover:-translate-y-1 hover:border-amber-400/25 hover:bg-white/[0.05]"
      }`}
      aria-pressed={isSelected}
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 ${
          isSelected ? "opacity-100" : "group-hover:opacity-100"
        }`}
        style={{
          background:
            "radial-gradient(600px circle at 25% 0%, rgba(212,175,55,0.18), transparent 40%)",
        }}
      />

      <div className="relative flex flex-col gap-4">
        <div className="relative mx-auto h-[170px] w-full max-w-[280px]">
          <div className="absolute inset-0 -z-10 rounded-2xl bg-gradient-to-b from-amber-400/10 to-transparent blur-2xl" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt={name}
            className="h-full w-full object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.55)] transition-transform duration-300 group-hover:scale-[1.03]"
          />
        </div>

        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold tracking-wide text-white/80">
              NFC Card
            </p>
            <h3 className="mt-1 text-lg font-semibold text-white">{name}</h3>
          </div>
          <div
            className="rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-right"
            style={{ boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.03)" }}
          >
            <p className="text-xs font-medium text-white/55">From</p>
            <p className="mt-0.5 text-sm font-bold" style={{ color: accent }}>
              {priceLabel}
            </p>
          </div>
        </div>

        <div className="mt-1 flex items-center justify-between gap-3">
          <span className="text-xs font-semibold tracking-[0.18em] text-white/40">
            {isSelected ? "SELECTED" : "READY"}
          </span>
          <span
            className={`rounded-full border px-3 py-1 text-xs font-semibold transition-colors ${
              isSelected
                ? "border-amber-400/35 bg-amber-400/10 text-amber-200"
                : "border-white/15 bg-white/5 text-white/70 group-hover:border-amber-400/35"
            }`}
          >
            Select
          </span>
        </div>
      </div>
    </button>
  );
}

