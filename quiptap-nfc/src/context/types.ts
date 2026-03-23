import type { NfcCardId, TemplateId } from "@/lib/catalog";

export type ProfileDataDraft = {
  name: string;
  bio: string;
  imageUrl: string;
  twitter: string;
  instagram: string;
  linkedin: string;
  website: string;
};

export const defaultProfileData: ProfileDataDraft = {
  name: "",
  bio: "",
  imageUrl: "",
  twitter: "",
  instagram: "",
  linkedin: "",
  website: "",
};

export function normalizeProfileData(
  maybe: Partial<ProfileDataDraft> | undefined
): ProfileDataDraft {
  const m = maybe ?? {};
  return {
    name: typeof m.name === "string" ? m.name : "",
    bio: typeof m.bio === "string" ? m.bio : "",
    imageUrl: typeof m.imageUrl === "string" ? m.imageUrl : "",
    twitter: typeof m.twitter === "string" ? m.twitter : "",
    instagram: typeof m.instagram === "string" ? m.instagram : "",
    linkedin: typeof m.linkedin === "string" ? m.linkedin : "",
    website: typeof m.website === "string" ? m.website : "",
  };
}

export type { NfcCardId, TemplateId };

