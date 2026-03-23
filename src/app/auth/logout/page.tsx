"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import InlineAlert from "@/components/auth/InlineAlert";
import { getSupabaseBrowserClient } from "@/lib/supabase/browserClient";

export default function LogoutPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const supabaseBrowser = getSupabaseBrowserClient();
        await supabaseBrowser.auth.signOut();
        if (!mounted) return;
        router.replace("/");
      } catch (e) {
        if (!mounted) return;
        setError(e instanceof Error ? e.message : "Logout failed");
      }
    })();
    return () => {
      mounted = false;
    };
  }, [router]);

  return (
    <div className="min-h-screen bg-black lux-body-bg text-white">
      <div className="mx-auto w-full max-w-md px-4 pt-20">
        <div className="rounded-[2.25rem] border border-white/10 bg-white/[0.02] p-6">
          <p className="text-xs font-semibold tracking-[0.22em] text-white/45">
            SIGNING OUT
          </p>
          <p className="mt-3 text-sm text-white/70">
            Please wait…
          </p>
          {error ? <div className="mt-4"><InlineAlert type="error">{error}</InlineAlert></div> : null}
        </div>
      </div>
    </div>
  );
}

