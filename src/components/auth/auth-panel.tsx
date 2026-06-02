"use client";

import type { User } from "@supabase/supabase-js";
import { LogIn, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabase/browser";

export type AuthState = {
  user: User | null;
  accessToken: string | null;
};

type AuthHookState = AuthState & {
  ready: boolean;
  error: string | null;
};

export function useAuthState(): AuthHookState {
  const [auth, setAuth] = useState<AuthState>({ user: null, accessToken: null });
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let supabase;
    try {
      supabase = getSupabaseBrowser();
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : "Supabase is not configured.");
      setReady(true);
      return;
    }

    supabase.auth.getSession().then(({ data }) => {
      setAuth({
        user: data.session?.user ?? null,
        accessToken: data.session?.access_token ?? null
      });
      setReady(true);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setAuth({
        user: session?.user ?? null,
        accessToken: session?.access_token ?? null
      });
      setReady(true);
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  return { ...auth, ready, error };
}

export function AuthPanel({ onAuth }: { onAuth?: (auth: AuthState) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const auth = useAuthState();

  useEffect(() => {
    onAuth?.({ user: auth.user, accessToken: auth.accessToken });
  }, [auth.user, auth.accessToken, onAuth]);

  async function signIn() {
    setMessage("");
    try {
      const supabase = getSupabaseBrowser();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setMessage(error.message);
    } catch (caught) {
      setMessage(caught instanceof Error ? caught.message : "Unable to sign in.");
    }
  }

  async function sendMagicLink() {
    setMessage("");
    try {
      const supabase = getSupabaseBrowser();
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: typeof window !== "undefined" ? window.location.href : undefined
        }
      });
      setMessage(error ? error.message : "Magic link sent. Check your email.");
    } catch (caught) {
      setMessage(caught instanceof Error ? caught.message : "Unable to send magic link.");
    }
  }

  async function signOut() {
    try {
      const supabase = getSupabaseBrowser();
      await supabase.auth.signOut();
    } catch (caught) {
      setMessage(caught instanceof Error ? caught.message : "Unable to sign out.");
    }
  }

  if (!auth.ready) {
    return <p className="rounded-md bg-white p-4 text-sm text-scrub-graphite">Checking sign-in...</p>;
  }

  if (auth.error) {
    return (
      <section className="mx-auto mb-4 max-w-xl rounded-lg bg-white p-5 shadow-premium">
        <p className="text-sm font-semibold uppercase text-scrub-graphite">Configuration required</p>
        <h1 className="mt-2 text-2xl font-semibold text-scrub-ink">Supabase is not connected yet</h1>
        <p className="mt-3 text-sm text-scrub-graphite">
          Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in Vercel to enable sign-in, booking
          storage, and admin access.
        </p>
      </section>
    );
  }

  if (auth.user) {
    return (
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-md bg-white p-4 shadow-premium">
        <p className="text-sm font-medium text-scrub-ink">Signed in as {auth.user.email}</p>
        <button
          type="button"
          onClick={() => void signOut()}
          className="focus-ring inline-flex items-center gap-2 rounded-md border border-scrub-graphite/30 px-3 py-2 text-sm font-semibold"
        >
          <LogOut size={16} />
          Sign out
        </button>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-xl rounded-lg bg-white p-5 shadow-premium">
      <p className="text-sm font-semibold uppercase text-scrub-graphite">Secure booking</p>
      <h1 className="mt-2 text-2xl font-semibold text-scrub-ink">Sign in to request a quote</h1>
      <div className="mt-5 grid gap-3">
        <input
          className="focus-ring rounded-md border border-scrub-graphite/25 px-3 py-2 text-sm"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          className="focus-ring rounded-md border border-scrub-graphite/25 px-3 py-2 text-sm"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void signIn()}
            className="focus-ring inline-flex items-center gap-2 rounded-md bg-scrub-ink px-4 py-2 text-sm font-semibold text-white"
          >
            <LogIn size={16} />
            Sign in
          </button>
          <button
            type="button"
            onClick={() => void sendMagicLink()}
            className="focus-ring rounded-md border border-scrub-graphite/30 px-4 py-2 text-sm font-semibold"
          >
            Send magic link
          </button>
        </div>
        {message && <p className="text-sm text-scrub-graphite">{message}</p>}
      </div>
    </section>
  );
}
