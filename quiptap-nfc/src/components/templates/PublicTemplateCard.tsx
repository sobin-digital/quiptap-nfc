import { getCardById } from "@/lib/catalog";
import { normalizeLinkUrl } from "@/lib/profile/normalizeSocial";
import type { PublicProfileData as PublicProfileDataFromApi } from "@/lib/supabase/publicProfileApi";

export type PublicProfileData = PublicProfileDataFromApi;

// Server-rendered public card (no private data).

function normalizeTrim(s: string) {
  return s.trim();
}

function SocialLink(props: { label: string; href: string; accent?: string }) {
  return (
    <a
      href={props.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white/85 transition-colors hover:border-amber-400/25 hover:bg-white/10"
    >
      <span className="text-white/80">{props.label}</span>
      <span
        className="text-xs font-semibold text-white/55 transition-colors group-hover:text-amber-200"
        style={props.accent ? { color: props.accent } : undefined}
      >
        Open
      </span>
    </a>
  );
}

export default function PublicTemplateCard(props: {
  templateId: string | null;
  profile: PublicProfileData;
  variant?: "minimal" | "business" | "luxury";
}) {
  const card = getCardById(props.profile.cardId);
  const resolvedTemplate =
    props.variant ??
    (props.templateId === "gilded-profile"
      ? "luxury"
      : props.templateId === "noir-executive"
        ? "business"
        : props.templateId === "aether-transparent"
          ? "minimal"
          : "minimal");

  const resolvedTemplateName =
    resolvedTemplate === "luxury"
      ? "Luxury"
      : resolvedTemplate === "business"
        ? "Business"
        : "Minimal";

  const accent =
    resolvedTemplate === "luxury"
      ? "#d4af37"
      : resolvedTemplate === "business"
        ? "#f5f5f5"
        : "#e5e7eb";

  const bg1 =
    resolvedTemplate === "luxury"
      ? "#0a0a0a"
      : resolvedTemplate === "business"
        ? "#070709"
        : "#0a0a0a";

  const bg2 =
    resolvedTemplate === "luxury"
      ? "#17110a"
      : resolvedTemplate === "business"
        ? "#15151a"
        : "#2a2a2a";

  const links = [
    props.profile.website.trim()
      ? {
          label: "Website",
          href: props.profile.website.trim().startsWith("http")
            ? props.profile.website.trim()
            : `https://${props.profile.website.trim()}`,
        }
      : null,
    props.profile.twitter.trim()
      ? {
          label: "Twitter",
          href: normalizeLinkUrl(props.profile.twitter, "twitter") ?? null,
        }
      : null,
    props.profile.instagram.trim()
      ? {
          label: "Instagram",
          href: normalizeLinkUrl(props.profile.instagram, "instagram") ?? null,
        }
      : null,
    props.profile.linkedin.trim()
      ? {
          label: "LinkedIn",
          href: normalizeLinkUrl(props.profile.linkedin, "linkedin") ?? null,
        }
      : null,
  ]
    .filter(Boolean)
    .map((l) => l as { label: string; href: string | null })
    .filter((l) => Boolean(l.href)) as Array<{ label: string; href: string }>;

  const displayName = normalizeTrim(props.profile.name) || "Your Name";
  const displayBio = normalizeTrim(props.profile.bio) || "A short bio that makes your card unforgettable.";

  return (
    <div
      className="relative overflow-hidden rounded-[2.25rem] border border-white/10 bg-white/[0.03] p-4 shadow-[0_30px_120px_rgba(0,0,0,0.55)]"
      style={{
        backgroundImage: `radial-gradient(700px circle at 15% 0%, rgba(212,175,55,0.18), transparent 55%), linear-gradient(180deg, ${bg1} 0%, ${bg2} 100%)`,
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0"
      />

      <div className="relative">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div
              className="relative h-14 w-14 overflow-hidden rounded-2xl border border-white/15 bg-black/25"
              style={{
                boxShadow:
                  "inset 0 0 0 1px rgba(255,255,255,0.03), 0 0 0 1px rgba(0,0,0,0.2)",
              }}
            >
              {props.profile.imageUrl.trim() ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={props.profile.imageUrl.trim()}
                  alt="Profile preview image"
                  className="h-full w-full object-cover"
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
                {resolvedTemplateName.toUpperCase()} PROFILE
              </p>
              <p className="mt-1 text-lg font-semibold text-white">
                {displayName}
              </p>
            </div>
          </div>

          <div className="hidden rounded-2xl border border-white/10 bg-black/25 px-3 py-2 text-right sm:block">
            <p className="text-[11px] font-medium text-white/55">NFC CARD</p>
            <p className="mt-0.5 text-sm font-bold text-white/90">
              {card?.name ?? "Your Card"}
            </p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-sm leading-relaxed text-white/75">{displayBio}</p>

          <div className="mt-5 grid grid-cols-1 gap-2">
            {links.length ? (
              links.slice(0, 4).map((l) => (
                <SocialLink
                  key={l.label}
                  label={l.label}
                  href={l.href}
                  accent={accent}
                />
              ))
            ) : (
              <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                <p className="text-xs font-semibold tracking-[0.18em] text-white/45">
                  ADD SOCIAL LINKS
                </p>
                <p className="mt-1 text-sm font-semibold text-white/65">
                  You can edit anytime.
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-5 h-px w-full bg-gradient-to-r from-amber-400/0 via-amber-400/30 to-amber-400/0" />

        <div className="mt-4 flex items-center justify-between text-xs font-semibold tracking-widest text-white/45">
          <span>QUIPTAP NFC</span>
          <span style={{ color: accent }}>TAP TO SHARE</span>
        </div>
      </div>
    </div>
  );
}

