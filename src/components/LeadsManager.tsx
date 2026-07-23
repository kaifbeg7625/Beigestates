"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Lead } from "@/lib/types";

const STATUS_OPTIONS = ["New", "Contacted", "Closed", "Rejected"];

const STATUS_COLORS: Record<string, string> = {
  New: "bg-brass/15 text-brass",
  Contacted: "bg-blue-100 text-blue-700",
  Closed: "bg-green-100 text-green-700",
  Rejected: "bg-red-100 text-red-700",
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
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-4 py-2 rounded font-mono text-xs uppercase tracking-wide border ${
              filter === s
                ? "bg-ink text-paper border-ink"
                : "border-ink/20 text-ink-soft hover:border-brass hover:text-brass"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((lead) => (
          <div key={lead.id} className="bg-white rounded border border-ink/10 p-5">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <p className="font-semibold">{lead.name}</p>
                <a href={`tel:${lead.mobile}`} className="text-sm text-brass font-mono">
                  {lead.mobile}
                </a>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-mono uppercase shrink-0 ${
                  STATUS_COLORS[lead.status] ?? "bg-gray-100 text-gray-600"
                }`}
              >
                {lead.status}
              </span>
            </div>

            <div className="grid sm:grid-cols-4 gap-3 text-sm mb-4">
              <Detail label="Service" value={lead.service} />
              <Detail label="City" value={lead.city} />
              <Detail label="Budget" value={lead.budget} />
              <Detail label="Timeline" value={lead.timeline} />
            </div>

            {lead.notes && (
              <p className="text-sm text-ink-soft mb-4 bg-paper rounded p-3">{lead.notes}</p>
            )}

            <div className="flex items-center gap-3 flex-wrap">
              <select
                value={lead.status}
                onChange={(e) => updateStatus(lead.id, e.target.value)}
                className="border border-ink/20 rounded px-3 py-1.5 text-sm font-mono"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <a
                href={`https://wa.me/91${lead.mobile}`}
                target="_blank"
                className="font-mono text-xs uppercase text-brass"
              >
                WhatsApp
              </a>
              <button
                onClick={() => handleDelete(lead.id)}
                className="font-mono text-xs uppercase text-[#B5533C] ml-auto"
              >
                Delete
              </button>
            </div>

            <p className="text-xs text-ink-soft/60 mt-3 font-mono">
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

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="font-mono text-[10px] uppercase tracking-wide text-ink-soft/70">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  );
}
