"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  useRef,
  type ReactNode,
} from "react";
import type { NfcCardId, ProfileDataDraft, TemplateId } from "./types";
import {
  defaultProfileData,
  normalizeProfileData,
} from "./types";
import { getSupabaseBrowserClient } from "@/lib/supabase/browserClient";
import { getMyProfileRow, upsertMyProfile } from "@/lib/supabase/profileApi";
import type { AuthChangeEvent, Session } from "@supabase/supabase-js";

const STORAGE_KEY = "quiptap-nfc-flow:v1";

type NfcFlowState = {
  selectedCardId: NfcCardId | null;
  selectedTemplateId: TemplateId | null;
  profile: ProfileDataDraft;
};

type NfcFlowContextValue = {
  isHydrated: boolean;
  selectedCardId: NfcCardId | null;
  selectedTemplateId: TemplateId | null;
  profile: ProfileDataDraft;
  selectCard: (id: NfcCardId) => void;
  selectTemplate: (id: TemplateId) => void;
  updateProfile: (next: Partial<ProfileDataDraft>) => void;
  resetFlow: () => void;
};

const NfcFlowContext = createContext<NfcFlowContextValue | null>(null);

export function NfcFlowProvider({ children }: { children: ReactNode }) {
  const [isHydrated, setIsHydrated] = useState(false);
  const [state, setState] = useState<NfcFlowState>({
    selectedCardId: null,
    selectedTemplateId: null,
    profile: defaultProfileData,
  });

  const [userId, setUserId] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false);
  const hydratedFromSupabaseForUserRef = useRef<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw) as Partial<NfcFlowState>;

      setState({
        selectedCardId:
          (parsed.selectedCardId as NfcCardId | null | undefined) ?? null,
        selectedTemplateId:
          (parsed.selectedTemplateId as TemplateId | null | undefined) ?? null,
        profile: normalizeProfileData(parsed.profile),
      });
    } catch {
      // If localStorage fails (private mode, invalid JSON), just keep defaults.
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore persistence failures.
    }
  }, [isHydrated, state]);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const supabaseBrowser = getSupabaseBrowserClient();
        const { data } = await supabaseBrowser.auth.getUser();
        if (!mounted) return;
        setUserId(data.user?.id ?? null);
        setAuthChecked(true);
      } catch {
        // Ignore.
        setAuthChecked(true);
      }
    })();

    const { data: listener } = getSupabaseBrowserClient().auth.onAuthStateChange(
      (_event: AuthChangeEvent, session: Session | null) => {
        setUserId(session?.user?.id ?? null);
        setAuthChecked(true);
      }
    );

    return () => {
      mounted = false;
      listener.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (!isHydrated) return;
    if (!authChecked) return;
    if (!userId) {
      hydratedFromSupabaseForUserRef.current = null;
      setState({
        selectedCardId: null,
        selectedTemplateId: null,
        profile: defaultProfileData,
      });
      return;
    }

    if (hydratedFromSupabaseForUserRef.current === userId) return;
    hydratedFromSupabaseForUserRef.current = userId;

    (async () => {
      try {
        const row = await getMyProfileRow();
        if (!row) return;

        const rowData = (row.data ?? {}) as Partial<
          ProfileDataDraft & { cardId?: NfcCardId | null }
        >;

        setState((prev) => {
          const pickSupabase = (remoteValue: string, localValue: string) =>
            remoteValue.trim().length > 0 ? remoteValue : localValue;

          return {
            selectedCardId:
              (rowData.cardId as NfcCardId | null | undefined) ??
              prev.selectedCardId,
            selectedTemplateId: (row.template as TemplateId | null) ?? prev.selectedTemplateId,
            profile: normalizeProfileData({
              name: pickSupabase(String(rowData.name ?? ""), prev.profile.name),
              bio: pickSupabase(String(rowData.bio ?? ""), prev.profile.bio),
              imageUrl: pickSupabase(
                String(rowData.imageUrl ?? ""),
                prev.profile.imageUrl
              ),
              twitter: pickSupabase(
                String(rowData.twitter ?? ""),
                prev.profile.twitter
              ),
              instagram: pickSupabase(
                String(rowData.instagram ?? ""),
                prev.profile.instagram
              ),
              linkedin: pickSupabase(
                String(rowData.linkedin ?? ""),
                prev.profile.linkedin
              ),
              website: pickSupabase(
                String(rowData.website ?? ""),
                prev.profile.website
              ),
            }),
          };
        });
      } catch {
        // If profile can't be loaded, keep local state.
      }
    })();
  }, [isHydrated, authChecked, userId]);

  useEffect(() => {
    if (!isHydrated) return;
    if (!userId) return;

    const hasAny =
      Boolean(state.selectedCardId) ||
      Boolean(state.selectedTemplateId) ||
      Object.values(state.profile).some((v) => String(v ?? "").trim().length > 0);

    if (!hasAny) return;

    const t = window.setTimeout(() => {
      upsertMyProfile({
        selectedCardId: state.selectedCardId,
        selectedTemplateId: state.selectedTemplateId,
        profile: state.profile,
      }).catch(() => {
        // Ignore write failures for now; later steps can show UI errors.
      });
    }, 650);

    return () => window.clearTimeout(t);
  }, [isHydrated, userId, state.profile, state.selectedCardId, state.selectedTemplateId]);

  const value = useMemo<NfcFlowContextValue>(
    () => ({
      isHydrated,
      selectedCardId: state.selectedCardId,
      selectedTemplateId: state.selectedTemplateId,
      profile: state.profile,
      selectCard: (id) => {
        setState((s) => ({
          ...s,
          selectedCardId: id,
          // If the card changes, template can remain, but we keep flow clean by requiring reselect later if desired.
        }));
      },
      selectTemplate: (id) => {
        setState((s) => ({
          ...s,
          selectedTemplateId: id,
        }));
      },
      updateProfile: (next) => {
        setState((s) => ({
          ...s,
          profile: normalizeProfileData({ ...s.profile, ...next }),
        }));
      },
      resetFlow: () => {
        setState({
          selectedCardId: null,
          selectedTemplateId: null,
          profile: defaultProfileData,
        });
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {
          // Ignore.
        }
      },
    }),
    [isHydrated, state.profile, state.selectedCardId, state.selectedTemplateId]
  );

  return (
    <NfcFlowContext.Provider value={value}>{children}</NfcFlowContext.Provider>
  );
}

export function useNfcFlow() {
  const ctx = useContext(NfcFlowContext);
  if (!ctx) {
    throw new Error("useNfcFlow must be used within NfcFlowProvider");
  }
  return ctx;
}

