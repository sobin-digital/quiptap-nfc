import { createSupabaseServerClient } from "@/lib/supabase/serverClient";
import { redirect } from "next/navigation";
import type { ReactNode } from "react";

export default async function CheckoutLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createSupabaseServerClient();
  if (!supabase) {
    redirect(`/login?returnTo=${encodeURIComponent("/checkout")}`);
    return null;
  }
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect(`/login?returnTo=${encodeURIComponent("/checkout")}`);
  }

  return children;
}

