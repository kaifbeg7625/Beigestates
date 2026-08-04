import Link from "next/link";
import Image from "next/image";
import type { Property } from "@/lib/types";

export default function PropertyCard({ p }: { p: Property }) {
  const cover = p.images && p.images.length > 0 ? p.images[0] : p.image_url;

  return (
    <Link href={`/property/${p.id}`} className="group block">
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
}
