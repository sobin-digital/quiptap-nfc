import { createSupabaseServerClient } from "@/lib/supabase/serverClient";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default async function SelectCardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    redirect(
      `/login?returnTo=${encodeURIComponent("/select-card")}`
    );
    return null;
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect(`/login?returnTo=${encodeURIComponent("/select-card")}`);
  }

  return children;
}

