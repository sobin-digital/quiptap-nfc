"use client";

import { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import AuthCard from "@/components/auth/AuthCard";
import TextField from "@/components/auth/TextField";
import InlineAlert from "@/components/auth/InlineAlert";
import { getSupabaseBrowserClient } from "@/lib/supabase/browserClient";

function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const returnTo = search.get("returnTo") ?? "/select-card";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = useMemo(
    () => email.trim().length > 3 && password.trim().length >= 6,
    [email, password]
  );

  return (
    <div className="min-h-screen bg-black lux-body-bg text-white">
      <AuthCard title="Log in">
        <form
          className="flex flex-col gap-5"
          onSubmit={async (e) => {
            e.preventDefault();
            setError(null);
            setSubmitting(true);
            try {
              const supabaseBrowser = getSupabaseBrowserClient();
              const { error: signInError } = await supabaseBrowser.auth.signInWithPassword(
                {
                  email: email.trim(),
                  password,
                }
              );

              if (signInError) throw signInError;

              router.replace(returnTo);
            } catch (err) {
              setError(err instanceof Error ? err.message : "Login failed");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          <TextField
            label="EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            type="email"
            autoComplete="email"
          />
          <TextField
            label="PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Your password"
            type="password"
            autoComplete="current-password"
          />

          <button
            type="submit"
            disabled={!canSubmit || submitting}
            className="mt-2 h-11 rounded-full bg-gradient-to-b from-amber-400/95 to-amber-600/80 px-6 text-sm font-semibold tracking-wide text-black shadow-[0_10px_30px_rgba(217,164,64,0.28)] transition-all duration-300 hover:from-amber-300/95 hover:to-amber-500/85 hover:shadow-[0_14px_40px_rgba(217,164,64,0.35)] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Signing in..." : "Log in"}
          </button>

          {error ? <InlineAlert type="error">{error}</InlineAlert> : null}

          <p className="text-xs font-semibold text-white/45">
            Need an account?{" "}
            <Link
              href={`/auth/signup?returnTo=${encodeURIComponent(returnTo)}`}
              className="text-amber-400 hover:text-amber-300 underline underline-offset-4"
            >
              Create one
            </Link>
          </p>
        </form>
      </AuthCard>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-black lux-body-bg text-white">
          <AuthCard title="Log in">
            <div className="h-10 w-24 animate-pulse rounded bg-white/5" />
          </AuthCard>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}

