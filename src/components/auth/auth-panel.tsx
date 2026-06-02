"use client";

import type { User } from "@supabase/supabase-js";
import { LogIn, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { getSupabaseBrowser } from "@/lib/supabase/browser";

export type AuthState = {
  user: User | null;
  accessToken: string | null;
};

export function useAuthState() {
  const [auth, setAuth] = useState<AuthState>({ user: null, accessToken: null });
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const supabase = getSupabaseBrowser();

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

  return { ...auth, ready };
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
    const supabase = getSupabaseBrowser();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setMessage(error.message);
  }

  async function sendMagicLink() {
    setMessage("");
    const supabase = getSupabaseBrowser();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: typeof window !== "undefined" ? window.location.href : undefined
      }
    });
    setMessage(error ? error.message : "Magic link sent. Check your email.");
  }

  async function signOut() {
    const supabase = getSupabaseBrowser();
    await supabase.auth.signOut();
  }

  if (!auth.ready) {
    return <p className="rounded-md bg-white p-4 text-sm text-scrub-graphite">Checking sign-in...</p>;
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

