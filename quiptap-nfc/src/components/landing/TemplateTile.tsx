export default function TemplateTile(props: {
  name: string;
  imageSrc: string;
  accent: string;
  href: string;
}) {
  const { name, imageSrc, accent, href } = props;

  return (
    <a
      href={href}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-4 shadow-[0_20px_70px_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/25"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(500px circle at 20% 0%, rgba(212,175,55,0.16), transparent 45%)",
        }}
      />

      <div className="relative z-10 flex flex-col gap-3">
        <div className="relative mx-auto h-[170px] w-full max-w-[280px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageSrc}
            alt={name}
            className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-[1.06]"
          />
        </div>

        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-[0.18em] text-white/45">
              TEMPLATE
            </p>
            <p
              className="mt-1 text-base font-semibold text-white/90"
              style={{ color: accent }}
            >
              {name}
            </p>
          </div>
          <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-semibold text-white/70">
            Preview
          </span>
        </div>
      </div>
    </a>
  );
}

