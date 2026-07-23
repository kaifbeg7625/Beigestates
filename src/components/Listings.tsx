import { createClient } from "@/lib/supabase/server";
import { SectionLabel } from "./ProblemSolution";
import type { Property } from "@/lib/types";

export default async function Listings() {
  const supabase = await createClient();
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
        <p className="text-ink-soft max-w-xl leading-relaxed mb-12">
          A look at what&apos;s available right now. Reach out for full
          details, site visits, or to list your own property with us.
        </p>

        {!properties || properties.length === 0 ? (
          <p className="text-ink-soft text-sm">
            No listings yet — check back soon.
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {properties.map((p) => (
              <div
                key={p.id}
                className="rounded overflow-hidden border border-ink/10 bg-white"
              >
                <div
                  className="h-[170px] bg-cover bg-center bg-[#e8e2d4]"
                  style={{
                    backgroundImage: p.image_url
                      ? `url('${p.image_url}')`
                      : undefined,
                  }}
                />
                <div className="p-4.5">
                  <div className="font-serif font-semibold text-xl text-brass mb-2">
                    {p.price}
                  </div>
                  <h4 className="text-[15px] font-semibold mb-1.5">
                    {p.title} — {p.location}
                  </h4>
                  <p className="text-xs text-ink-soft">
                    {[p.area, p.bedrooms && `${p.bedrooms} Bed`, p.bathrooms && `${p.bathrooms} Bath`, p.status]
                      .filter(Boolean)
                      .join(" · ")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
