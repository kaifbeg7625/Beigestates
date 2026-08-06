"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const NOT_ADMIN =
  "This account doesn't have admin access. Ask the site owner to add your email.";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Middleware sends non-admins back here with ?denied=1. Drop the
  // session so they aren't left signed in as a dead-end account.
  useEffect(() => {
    if (!new URLSearchParams(window.location.search).has("denied")) return;
    setError(NOT_ADMIN);
    createClient().auth.signOut();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError("Invalid email or password.");
      setLoading(false);
      return;
    }

    const { data: isAdmin } = await supabase.rpc("is_admin");
    if (isAdmin !== true) {
      await supabase.auth.signOut();
      setError(NOT_ADMIN);
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-blueprint blueprint-grid flex items-center justify-center px-6">
      <div className="w-full max-w-sm bg-paper rounded p-8">
        <div className="label text-brass mb-3 flex items-center gap-2">
          <span className="w-[18px] h-px bg-brass" />
          Admin
        </div>
        <h1 className="font-extrabold text-2xl mb-6">Beig Estates</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block label text-ink-soft mb-2">
              Email
            </label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border-0 border-b-[1.5px] border-ink/25 bg-transparent py-2 text-base outline-none focus:border-brass"
            />
          </div>
          <div>
            <label className="block label text-ink-soft mb-2">
              Password
            </label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-0 border-b-[1.5px] border-ink/25 bg-transparent py-2 text-base outline-none focus:border-brass"
            />
          </div>

          {error && <p className="text-sm text-danger">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded bg-ink text-paper font-bold hover:bg-blueprint-deep transition-colors disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
