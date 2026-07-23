"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

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

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-blueprint blueprint-grid flex items-center justify-center px-6">
      <div className="w-full max-w-sm bg-paper rounded p-8">
        <div className="font-mono text-[11px] tracking-[0.16em] uppercase text-brass mb-3 flex items-center gap-2">
          <span className="w-[18px] h-px bg-brass" />
          Admin
        </div>
        <h1 className="font-serif font-semibold text-2xl mb-6">Beig Estates</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block font-mono text-[11px] uppercase tracking-wide text-ink-soft mb-2">
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
            <label className="block font-mono text-[11px] uppercase tracking-wide text-ink-soft mb-2">
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

          {error && <p className="text-sm text-[#B5533C]">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded bg-ink text-paper font-mono text-[13px] tracking-wide uppercase hover:bg-blueprint-deep transition-colors disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
