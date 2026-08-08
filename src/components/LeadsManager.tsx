"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Lead } from "@/lib/types";
import { LEAD_STAGES } from "@/lib/types";
import { Pill } from "./Field";
import { Button } from "./Button";
import AddLeadForm from "./AddLeadForm";

// Palette-native stage colours rather than raw bg-blue-100/bg-green-100.
const STAGE_COLORS: Record<string, string> = {
  New: "bg-brass/15 text-brass",
  Contacted: "bg-ink/10 text-ink",
  "Ready to Visit": "bg-[#6B5E3F]/12 text-[#6B5E3F]",
  Visited: "bg-[#3F5E6B]/12 text-[#3F5E6B]",
  Negotiating: "bg-[#8A5A2E]/15 text-[#8A5A2E]",
  Won: "bg-[#3F6B4A]/12 text-[#3F6B4A]",
  Lost: "bg-danger/12 text-danger",
};

type TeamMember = { id: string; name: string; manager_id: string | null };

export default function LeadsManager({
  initialLeads,
  teamMembers,
}: {
  initialLeads: Lead[];
  teamMembers: TeamMember[];
}) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [filter, setFilter] = useState<string>("All");
  const [showAdd, setShowAdd] = useState(false);

  const nameOf = useMemo(() => {
    const map = new Map(teamMembers.map((m) => [m.id, m.name]));
    return (id: string | null) => (id ? map.get(id) ?? "Unassigned" : "Unassigned");
  }, [teamMembers]);

  const filtered = filter === "All" ? leads : leads.filter((l) => l.stage === filter);

  function addLeads(newLeads: Lead[]) {
    setLeads((prev) => [...newLeads, ...prev]);
    setShowAdd(false);
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4 flex-wrap mb-6">
        <div className="flex gap-2 flex-wrap">
          {["All", ...LEAD_STAGES].map((s) => (
            <Pill key={s} active={filter === s} onClick={() => setFilter(s)}>
              {s}
            </Pill>
          ))}
        </div>
        <Button size="md" className="!px-4 !py-2" onClick={() => setShowAdd((v) => !v)}>
          {showAdd ? "Close" : "Add lead"}
        </Button>
      </div>

      {showAdd && (
        <div className="mb-6">
          <AddLeadForm onAdded={addLeads} />
        </div>
      )}

      <div className="surface rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-ink/10 text-sm text-ink-soft">
                <th className="p-4 font-bold whitespace-nowrap">Name</th>
                <th className="p-4 font-bold whitespace-nowrap">Stage</th>
                <th className="p-4 font-bold whitespace-nowrap">Source</th>
                <th className="p-4 font-bold whitespace-nowrap">Assigned to</th>
                <th className="p-4 font-bold whitespace-nowrap">Received</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((lead) => (
                <tr key={lead.id} className="border-b border-ink/6 last:border-0 hover:bg-paper/60">
                  <td className="p-4">
                    <Link
                      href={`/admin/leads/${lead.id}`}
                      className="font-bold hover:text-brass hover:underline"
                    >
                      {lead.name}
                    </Link>
                    <p className="text-sm text-ink-soft">{lead.mobile}</p>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide whitespace-nowrap ${
                        STAGE_COLORS[lead.stage] ?? "bg-ink/10 text-ink-soft"
                      }`}
                    >
                      {lead.stage}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-ink-soft whitespace-nowrap">{lead.source}</td>
                  <td className="p-4 text-sm text-ink-soft whitespace-nowrap">
                    {nameOf(lead.assigned_to)}
                  </td>
                  <td className="p-4 text-sm text-ink-soft whitespace-nowrap">
                    {new Date(lead.created_at).toLocaleDateString("en-IN")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <p className="p-6 text-sm text-ink-soft">No leads in this category yet.</p>
        )}
      </div>
    </div>
  );
}
