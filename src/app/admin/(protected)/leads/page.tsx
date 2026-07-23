import { createClient } from "@/lib/supabase/server";
import LeadsManager from "@/components/LeadsManager";
import type { Lead } from "@/lib/types";

export default async function LeadsPage() {
  const supabase = await createClient();
  const { data: leads } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<Lead[]>();

  return (
    <div>
      <h1 className="font-serif font-semibold text-2xl mb-8">Leads</h1>
      <LeadsManager initialLeads={leads ?? []} />
    </div>
  );
}
