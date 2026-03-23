"use client";

import { getSupabaseBrowserClient } from "@/lib/supabase/browserClient";
import type { NfcCardId, TemplateId } from "@/context/types";
import type { ProfileDataDraft } from "@/context/types";

export type ProfileRow = {
  id: string;
  user_id: string;
  slug: string;
  template: TemplateId | null;
  data: unknown;
  created_at: string;
};

type ProfileDataJson = ProfileDataDraft & {
  cardId?: NfcCardId | null;
};

function toProfileDataJson(args: {
  profile: ProfileDataDraft;
  selectedCardId: NfcCardId | null;
}): ProfileDataJson {
  return {
    ...args.profile,
    cardId: args.selectedCardId,
  };
}

export async function getMyProfileRow() {
  const supabaseBrowser = getSupabaseBrowserClient();
  const {
    data: { user },
    error: userError,
  } = await supabaseBrowser.auth.getUser();

  if (userError) throw userError;
  if (!user) return null;

  const { data, error } = await supabaseBrowser
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error) {
    // If the trigger hasn't run yet after signup, return null and let caller retry.
    return null;
  }

  return data as ProfileRow;
}

export async function upsertMyProfile(args: {
  selectedCardId: NfcCardId | null;
  selectedTemplateId: TemplateId | null;
  profile: ProfileDataDraft;
}) {
  const supabaseBrowser = getSupabaseBrowserClient();
  const {
    data: { user },
    error: userError,
  } = await supabaseBrowser.auth.getUser();

  if (userError) throw userError;
  if (!user) throw new Error("Not authenticated");

  const payload = {
    template: args.selectedTemplateId,
    data: toProfileDataJson({
      profile: args.profile,
      selectedCardId: args.selectedCardId,
    }),
  };

  // First try update to avoid ever overwriting the permanent `slug`.
  const { data: updatedRows, error: updateError } = await supabaseBrowser
    .from("profiles")
    .update(payload)
    .eq("user_id", user.id)
    .select("*");

  if (updateError) throw updateError;
  if (updatedRows && updatedRows.length > 0) {
    return updatedRows[0] as ProfileRow;
  }

  // If the profile row doesn't exist yet (race with signup trigger), insert it.
  const base = makeSlugBase(args.profile.name || user.email || "user");
  const maxAttempts = 4;

  for (let i = 0; i < maxAttempts; i++) {
    const slugCandidate = i === 0 ? base : `${base}-${randomSuffix(i)}`;
    const { data: insertedRows, error: insertError } = await supabaseBrowser
      .from("profiles")
      .insert({
        user_id: user.id,
        slug: slugCandidate,
        template: args.selectedTemplateId,
        data: payload.data,
      })
      .select("*");

    if (!insertError && insertedRows && insertedRows.length > 0) {
      return insertedRows[0] as ProfileRow;
    }
  }

  return undefined;
}

function makeSlugBase(input: string) {
  const s = input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return s.length > 0 ? s : "user";
}

function randomSuffix(attempt: number) {
  const seed = `${attempt}-${Math.random()}-${Date.now()}`;
  // Simple non-crypto suffix: enough for a fallback slug.
  return Math.abs(
    Array.from(seed).reduce((acc, c) => acc + c.charCodeAt(0), 0)
  ).toString(16).slice(0, 8);
}

