"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Field, TextInput } from "@/components/Field";
import { Button } from "@/components/Button";

// Reached by clicking the invite link the owner sent. Supabase's browser
// client picks the session up from the URL automatically on load — this
// page's only job is to let the person set the password they'll actually
// use, since nobody types someone else's password for them.
export default function AcceptInvitePage() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const [validSession, setValidSession] = useState(false);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    createClient()
      .auth.getSession()
      .then(({ data }) => {
        setValidSession(!!data.session);
        setChecking(false);
      });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (password.length < 8) {
      setError("Use at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords don't match.");
      return;
    }

    setSaving(true);
    const { error } = await createClient().auth.updateUser({ password });
    if (error) {
      setError(error.message);
      setSaving(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="min-h-screen bg-paper flex items-center justify-center px-6">
      <div className="w-full max-w-sm surface-raised rounded-xl p-8">
        <div className="label text-brass mb-3 flex items-center gap-2">
          <span className="w-[18px] h-px bg-brass" />
          Team invite
        </div>
        <h1 className="font-extrabold text-2xl mb-6">Set your password</h1>

        {checking ? (
          <p className="text-ink-soft">Checking your invite…</p>
        ) : !validSession ? (
          <p className="text-danger">
            This invite link is invalid or has expired. Ask the owner to send
            a new one.
          </p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <Field label="New password" htmlFor="new-password">
              <TextInput
                id="new-password"
                required
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 8 characters"
              />
            </Field>

            <Field label="Confirm password" htmlFor="confirm-password">
              <TextInput
                id="confirm-password"
                required
                type="password"
                autoComplete="new-password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </Field>

            {error && <p className="text-sm text-danger">{error}</p>}

            <Button type="submit" variant="secondary" disabled={saving} className="w-full">
              {saving ? "Saving…" : "Set password and continue"}
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
