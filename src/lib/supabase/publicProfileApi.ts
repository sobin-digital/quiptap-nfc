import { createSupabaseServerClient } from "@/lib/supabase/serverClient";
import type { NfcCardId, TemplateId } from "@/context/types";

export type PublicProfileData = {
  name: string;
  bio: string;
  imageUrl: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  website: string;
  cardId?: NfcCardId | null;
};

export type PublicProfile = {
  template: TemplateId | null;
  data: PublicProfileData;
};

export async function getPublicProfileBySlug(slug: string) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) return null;

  const normalizedSlug = slug.trim().toLowerCase();
  if (!normalizedSlug) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("template, data")
    .eq("slug", normalizedSlug)
    .single();

  if (error) return null;
  if (!data) return null;

  const row = data as { template: TemplateId | null; data: unknown };
  const profileData =
    (row.data ?? {}) as Partial<PublicProfileData> | Record<string, unknown>;

  return {
    template: row.template ?? null,
    data: {
      name: typeof profileData.name === "string" ? profileData.name : "",
      bio: typeof profileData.bio === "string" ? profileData.bio : "",
      imageUrl:
        typeof profileData.imageUrl === "string" ? profileData.imageUrl : "",
      twitter:
        typeof profileData.twitter === "string" ? profileData.twitter : "",
      instagram:
        typeof profileData.instagram === "string"
          ? profileData.instagram
          : "",
      linkedin:
        typeof profileData.linkedin === "string" ? profileData.linkedin : "",
      website:
        typeof profileData.website === "string" ? profileData.website : "",
      cardId:
        (profileData.cardId as NfcCardId | null | undefined) ?? undefined,
    },
  } satisfies PublicProfile;
}

