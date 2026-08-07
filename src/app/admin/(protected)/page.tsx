import { createClient } from "@/lib/supabase/server";
import { ButtonLink } from "@/components/Button";

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
