import { createPublicClient } from "@/lib/supabase/public";
import { SectionLabel } from "./ProblemSolution";
import type { Property } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";

export default async function Listings({ filterType }: { filterType?: string }) {
  const supabase = createPublicClient();
  const { data: allProperties } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false })
    .returns<Property[]>();

  const properties = filterType
    ? (allProperties ?? []).filter((p) => p.property_type === filterType)
    : allProperties;

  return (
    <section id="listings" className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-6">
        <SectionLabel>Current Listings</SectionLabel>
        <h2 className="font-serif font-semibold text-3xl mb-4 max-w-xl">
          Properties we&apos;re currently handling.
        </h2>
        <p className="text-ink-soft max-w-xl leading-relaxed mb-6">
          A look at what&apos;s available right now. Reach out for full
          details, site visits, or to list your own property with us.
        </p>

        {filterType && (
          <div className="mb-8 flex items-center gap-2">
            <span className="font-mono text-[11px] uppercase tracking-wide bg-brass/10 text-brass px-3 py-1.5 rounded-full">
              {filterType}
            </span>
            <a href="/listings" className="font-mono text-[11px] uppercase tracking-wide text-ink-soft hover:text-ink">
              Clear filter ×
            </a>
          </div>
        )}

        {!properties || properties.length === 0 ? (
          <p className="text-ink-soft text-sm">
            {filterType
              ? `No ${filterType.toLowerCase()} listings right now — check back soon or `
              : "No listings yet — check back soon."}
            {filterType && <a href="/listings" className="text-brass">view all listings</a>}
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map((p) => {
              const cover =
                p.images && p.images.length > 0 ? p.images[0] : p.image_url;
              return (
                <Link
                  href={`/property/${p.id}`}
                  key={p.id}
                  className="group block"
                >
                  <div className="h-[280px] relative bg-[#e8e2d4] overflow-hidden rounded-sm">
                    {cover && (
                      <Image
                        src={cover}
                        alt={`${p.title} in ${p.location} — ${p.price}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <div className="font-serif font-semibold text-2xl text-paper">
                        {p.price}
                      </div>
                    </div>
                    <div className="absolute top-4 right-4 font-mono text-[10px] uppercase tracking-wide bg-paper/90 text-ink px-2.5 py-1 rounded">
                      {p.property_type}
                    </div>
                  </div>
                  <div className="pt-4">
                    <h4 className="text-[16px] font-semibold mb-1.5 group-hover:text-brass transition-colors">
                      {p.title} — {p.location}
                    </h4>
                    <p className="text-xs text-ink-soft">
                      {[p.area, p.bedrooms && `${p.bedrooms} Bed`, p.bathrooms && `${p.bathrooms} Bath`, p.status]
                        .filter(Boolean)
                        .join(" · ")}
                    </p>
                    <span className="inline-block mt-2 font-mono text-[11px] uppercase tracking-wide text-brass border-b border-brass/40 group-hover:border-brass">
                      View Property →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
