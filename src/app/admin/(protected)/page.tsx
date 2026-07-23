import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const { count: propertyCount } = await supabase
    .from("properties")
    .select("*", { count: "exact", head: true });

  const { count: leadCount } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true });

  const { count: newLeadCount } = await supabase
    .from("leads")
    .select("*", { count: "exact", head: true })
    .eq("status", "New");

  return (
    <div>
      <h1 className="font-serif font-semibold text-2xl mb-8">Dashboard</h1>

      <div className="grid sm:grid-cols-3 gap-5 mb-10">
        <StatCard label="Total Properties" value={propertyCount ?? 0} />
        <StatCard label="Total Leads" value={leadCount ?? 0} />
        <StatCard label="New (Unactioned) Leads" value={newLeadCount ?? 0} highlight />
      </div>

      <div className="flex gap-4">
        <Link
          href="/admin/properties"
          className="px-6 py-3 rounded bg-ink text-paper font-mono text-[13px] uppercase tracking-wide hover:bg-blueprint-deep transition-colors"
        >
          Manage Properties
        </Link>
        <Link
          href="/admin/leads"
          className="px-6 py-3 rounded border border-ink/25 font-mono text-[13px] uppercase tracking-wide hover:border-brass hover:text-brass transition-colors"
        >
          View Leads
        </Link>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  highlight,
}: {
  label: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded p-6 border ${
        highlight ? "border-brass bg-brass/5" : "border-ink/10 bg-white"
      }`}
    >
      <div className="font-serif text-3xl font-semibold text-brass mb-1">{value}</div>
      <div className="font-mono text-[11px] uppercase tracking-wide text-ink-soft">
        {label}
      </div>
    </div>
  );
}
