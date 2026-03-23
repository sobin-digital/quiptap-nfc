import type { NfcCard, Template } from "@/lib/catalog";
import { formatMoney } from "@/lib/catalog";

export default function ProfilePreviewCard(props: {
  card: NfcCard | null;
  template: Template | null;
  profile: {
    name: string;
    bio: string;
    imageUrl: string;
    twitter: string;
    instagram: string;
    linkedin: string;
    website: string;
  };
  yearlySubscriptionCents: number;
}) {
  const { card, template, profile, yearlySubscriptionCents } = props;

  const accent = template?.accent ?? card?.accent ?? "#d4af37";
  const bg1 = template?.bg1 ?? card?.bg1 ?? "#0a0a0a";
  const bg2 = template?.bg2 ?? card?.bg2 ?? "#17110a";

  const displayName = profile.name.trim() || "Your Name";
  const displayBio = profile.bio.trim() || "A short bio that makes your card unforgettable.";

  const links = [
    profile.website.trim() ? { label: "Website", href: profile.website.trim() } : null,
    profile.twitter.trim() ? { label: "Twitter", href: profile.twitter.trim() } : null,
    profile.instagram.trim()
      ? { label: "Instagram", href: profile.instagram.trim() }
      : null,
    profile.linkedin.trim()
      ? { label: "LinkedIn", href: profile.linkedin.trim() }
      : null,
  ].filter(Boolean) as Array<{ label: string; href: string }>;

  return (
    <div className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/[0.03] p-4 shadow-[0_30px_120px_rgba(0,0,0,0.55)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-90"
        style={{
          background: `radial-gradient(700px circle at 15% 0%, rgba(212,175,55,0.18), transparent 55%), linear-gradient(180deg, ${bg1} 0%, ${bg2} 100%)`,
        }}
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="relative h-14 w-14 overflow-hidden rounded-2xl border border-white/15 bg-black/25"
              style={{ boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.03), 0 0 0 1px rgba(0,0,0,0.2)` }}
            >
              {profile.imageUrl.trim() ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={profile.imageUrl.trim()}
                  alt="Profile preview image"
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).style.display = "none";
                  }}
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center">
                  <span className="text-xs font-bold tracking-widest text-white/50">
                    IMG
                  </span>
                </div>
              )}
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background: `radial-gradient(60px circle at 20% 0%, ${accent}33, transparent 65%)`,
                }}
              />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] text-white/50">
                PROFILE
              </p>
              <p className="mt-1 text-lg font-semibold text-white">{displayName}</p>
            </div>
          </div>

          <div
            className="rounded-2xl border border-white/10 bg-black/25 px-3 py-2 text-right"
            style={{
              boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.03)",
            }}
          >
            <p className="text-[11px] font-medium text-white/55">Included</p>
            <p className="mt-0.5 text-sm font-bold text-white/90">
              {formatMoney(yearlySubscriptionCents)} / year
            </p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm leading-relaxed text-white/75">{displayBio}</p>

          <div className="mt-5 grid grid-cols-1 gap-2">
            {links.length ? (
              links.slice(0, 4).map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white/85 transition-colors hover:border-amber-400/25 hover:bg-white/8"
                >
                  <span className="text-white/80">{l.label}</span>
                  <span
                    className="text-xs font-semibold text-white/55 transition-colors group-hover:text-amber-200"
                    style={{ color: accent }}
                  >
                    Open
                  </span>
                </a>
              ))
            ) : (
              <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                <p className="text-xs font-semibold tracking-[0.18em] text-white/45">
                  ADD SOCIAL LINKS
                </p>
                <p className="mt-1 text-sm font-semibold text-white/65">
                  Your preview updates instantly.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 h-px w-full bg-gradient-to-r from-amber-400/0 via-amber-400/30 to-amber-400/0" />

        <div className="mt-4 flex items-center justify-between text-xs font-semibold tracking-widest text-white/45">
          <span>{template?.name ?? "Template"}</span>
          <span style={{ color: accent }}>TAP TO SHARE</span>
        </div>
      </div>
    </div>
  );
}

