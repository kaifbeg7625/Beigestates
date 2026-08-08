"use client";

import { useState } from "react";
import { Field, TextInput, Select } from "./Field";
import { Button } from "./Button";

export default function InviteTeamMemberForm({
  roles,
}: {
  roles: { id: string; name: string }[];
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [roleId, setRoleId] = useState(roles[0]?.id ?? "");
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    try {
      const res = await fetch("/api/team/invite", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, roleId }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Could not send the invite.");

      setStatus("done");
      setName("");
      setEmail("");
      setPhone("");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <div className="surface rounded-xl p-6">
      <p className="font-bold text-lg mb-1">Add a team member</p>
      <p className="text-sm text-ink-soft mb-5">
        They&apos;ll get an email to set their own password — nobody types it
        for them, including you.
      </p>

      <form onSubmit={handleSubmit} className="grid sm:grid-cols-2 gap-4">
        <Field label="Full name" htmlFor="tm-name">
          <TextInput
            id="tm-name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Field>

        <Field label="Email" htmlFor="tm-email">
          <TextInput
            id="tm-email"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Field>

        <Field label="Phone (optional)" htmlFor="tm-phone">
          <TextInput
            id="tm-phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </Field>

        <Field label="Department" htmlFor="tm-role">
          <Select
            id="tm-role"
            value={roleId}
            onChange={(e) => setRoleId(e.target.value)}
            options={roles.map((r) => ({ value: r.id, label: r.name }))}
          />
        </Field>

        {status === "error" && (
          <p className="sm:col-span-2 text-sm text-danger">{error}</p>
        )}
        {status === "done" && (
          <p className="sm:col-span-2 text-sm text-[#3F6B4A]">
            Invite sent. They&apos;ll show up below once they accept it.
          </p>
        )}

        <Button
          type="submit"
          variant="secondary"
          disabled={status === "sending" || !roleId}
          className="sm:col-span-2 w-full sm:w-auto"
        >
          {status === "sending" ? "Sending…" : "Send invite"}
        </Button>
      </form>
    </div>
  );
}
