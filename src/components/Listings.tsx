import { createPublicClient } from "@/lib/supabase/public";
import { SectionLabel } from "./ProblemSolution";
import type { Property } from "@/lib/types";
import ListingsGrid from "./ListingsGrid";

export default async function Listings({ filterType }: { filterType?: string }) {
  const supabase = createPublicClient();
  const { data: properties } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<Property[]>();

  return (
    <section id="listings" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <SectionLabel>Current Listings</SectionLabel>
        <h2 className="font-serif font-semibold text-3xl mb-4 max-w-xl">
          Properties we&apos;re currently handling.
        </h2>
        <p className="text-ink-soft max-w-xl leading-relaxed mb-8">
          A look at what&apos;s available right now. Reach out for full
          details, site visits, or to list your own property with us.
        </p>

        {!properties || properties.length === 0 ? (
          <p className="text-ink-soft text-sm">
            No listings yet — check back soon.
          </p>
        ) : (
          <ListingsGrid properties={properties} initialType={filterType} />
        )}
      </div>
    </section>
  );
}
