"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Lead } from "@/lib/types";
import { Pill, Select, Detail } from "./Field";
import { Button } from "./Button";

const STATUS_OPTIONS = ["New", "Contacted", "Closed", "Rejected"];

// Palette-native status colours rather than raw bg-blue-100/bg-green-100,
// which were the one place in the admin still using stock Tailwind colours
// instead of the site's own tokens.
const STATUS_COLORS: Record<string, string> = {
  New: "bg-brass/15 text-brass",
  Contacted: "bg-ink/10 text-ink",
  Closed: "bg-[#3F6B4A]/12 text-[#3F6B4A]",
  Rejected: "bg-danger/12 text-danger",
};

export default function LeadsManager({ initialLeads }: { initialLeads: Lead[] }) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [filter, setFilter] = useState<string>("All");
  const supabase = createClient();

  async function updateStatus(id: string, status: string) {
    const { error } = await supabase.from("leads").update({ status }).eq("id", id);
    if (!error) {
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this lead permanently?")) return;
    const { error } = await supabase.from("leads").delete().eq("id", id);
    if (!error) {
      setLeads((prev) => prev.filter((l) => l.id !== id));
    }
  }

  const filtered = filter === "All" ? leads : leads.filter((l) => l.status === filter);

  return (
    <div>
      <div className="flex gap-2 mb-6 flex-wrap">
        {["All", ...STATUS_OPTIONS].map((s) => (
          <Pill key={s} active={filter === s} onClick={() => setFilter(s)}>
            {s}
          </Pill>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((lead) => (
          <div key={lead.id} className="surface rounded-xl p-6">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <p className="font-bold text-lg">{lead.name}</p>
                <a href={`tel:${lead.mobile}`} className="text-sm text-brass">
                  {lead.mobile}
                </a>
              </div>
              <span
                className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide shrink-0 ${
                  STATUS_COLORS[lead.status] ?? "bg-ink/10 text-ink-soft"
                }`}
              >
                {lead.status}
              </span>
            </div>

            <div className="grid sm:grid-cols-4 gap-4 mb-4">
              <Detail label="Service" value={lead.service} />
              <Detail label="City" value={lead.city} />
              <Detail label="Budget" value={lead.budget} />
              <Detail label="Timeline" value={lead.timeline} />
            </div>

            {lead.notes && (
              <p className="text-sm text-ink-soft mb-4 surface-tan rounded-lg p-4">
                {lead.notes}
              </p>
            )}

            <div className="flex items-center gap-3 flex-wrap">
              <Select
                value={lead.status}
                onChange={(e) => updateStatus(lead.id, e.target.value)}
                options={STATUS_OPTIONS}
                aria-label="Lead status"
                className="w-auto"
              />
              <Button
                variant="ghost"
                size="md"
                className="!px-4 !py-2"
                onClick={() =>
                  window.open(`https://wa.me/91${lead.mobile}`, "_blank")
                }
              >
                WhatsApp
              </Button>
              <button
                onClick={() => handleDelete(lead.id)}
                className="text-sm font-bold text-danger ml-auto hover:underline"
              >
                Delete
              </button>
            </div>

            <p className="text-xs text-ink-soft/60 mt-4">
              {new Date(lead.created_at).toLocaleString("en-IN")}
            </p>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-sm text-ink-soft">No leads in this category yet.</p>
        )}
      </div>
    </div>
  );
}
