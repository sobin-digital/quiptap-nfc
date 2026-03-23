import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import PublicTemplateRenderer from "@/components/templates/PublicTemplateRenderer";
import { getPublicProfileBySlug } from "@/lib/supabase/publicProfileApi";
import type { PublicProfileData } from "@/lib/supabase/publicProfileApi";

export const dynamic = "force-dynamic";

function truncate(s: string, maxLen: number) {
  const v = s.trim();
  if (v.length <= maxLen) return v;
  return v.slice(0, maxLen - 1).trimEnd() + "…";
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const profile = await getPublicProfileBySlug(params.slug);
  const fallback = {
    title: "QuipTap NFC",
    description: "Premium NFC digital business cards via one tap.",
  };

  if (!profile) return fallback;

  const name = profile.data.name?.trim() || fallback.title;
  const bio = profile.data.bio?.trim() || fallback.description;

  return {
    title: `${name} • QuipTap NFC`,
    description: truncate(bio, 160),
    openGraph: {
      title: `${name} • QuipTap NFC`,
      description: truncate(bio, 160),
    },
  };
}

export default async function PublicProfilePage({
  params,
}: {
  params: { slug: string };
}) {
  const profile = await getPublicProfileBySlug(params.slug);
  if (!profile) notFound();

  const safeData: PublicProfileData = profile.data;

  return (
    <div className="min-h-screen bg-black text-white lux-body-bg">
      <header className="mx-auto w-full max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xs font-semibold tracking-widest text-white/55 hover:text-amber-400">
            QUIPTAP NFC
          </Link>
          <div className="hidden text-xs font-semibold tracking-widest text-white/40 sm:block">
            PUBLIC PROFILE
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">
        <PublicTemplateRenderer
          templateId={profile.template}
          profile={safeData}
        />
      </main>
    </div>
  );
}

