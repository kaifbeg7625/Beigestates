import { createClient } from "@/lib/supabase/server";
import { ButtonLink } from "@/components/Button";
import { redirect } from "next/navigation";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const { data: isOwner } = await supabase.rpc("is_owner");

  // This page shows counts across properties AND leads — cross-cutting
  // owner-level information. A Sales person landing here (an old bookmark,
  // a direct URL) gets sent to the one section they actually have, instead
  // of a dashboard built for a role they don't have.
  if (!isOwner) {
    const { data: canLeads } = await supabase.rpc("has_permission", {
      p_module: "leads",
      p_action: "view",
    });
    redirect(canLeads ? "/admin/leads" : "/admin/properties");
  }

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
      <h1 className="font-extrabold text-2xl mb-8">Dashboard</h1>

      <div className="grid sm:grid-cols-3 gap-5 mb-10">
        <StatCard label="Total properties" value={propertyCount ?? 0} />
        <StatCard label="Total leads" value={leadCount ?? 0} />
        <StatCard label="New leads" value={newLeadCount ?? 0} highlight />
      </div>

      <div className="flex gap-3">
        <ButtonLink href="/admin/properties" variant="secondary">
          Manage properties
        </ButtonLink>
        <ButtonLink href="/admin/leads" variant="ghost">
          View leads
        </ButtonLink>
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
    <div className={highlight ? "surface-tan rounded-xl p-6" : "surface rounded-xl p-6"}>
      <div className="font-extrabold text-3xl text-brass mb-1.5">{value}</div>
      <div className="label text-ink-soft">{label}</div>
    </div>
  );
}
