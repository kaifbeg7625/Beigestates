import { createClient } from "@/lib/supabase/server";
import PropertiesManager from "@/components/PropertiesManager";
import type { Property } from "@/lib/types";

export default async function PropertiesPage() {
  const supabase = await createClient();
  const { data: properties } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<Property[]>();

  return (
    <div>
      <h1 className="font-serif font-semibold text-2xl mb-8">Properties</h1>
      <PropertiesManager initialProperties={properties ?? []} />
    </div>
  );
}
