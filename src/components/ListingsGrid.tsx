"use client";

import { useState, useMemo } from "react";
import type { Property } from "@/lib/types";
import Link from "next/link";
import Image from "next/image";

const TYPE_TABS = ["All", "Flat", "Villa", "Plot", "Rent", "Interior"];

export default function ListingsGrid({
  properties,
  initialType,
}: {
  properties: Property[];
  initialType?: string;
}) {
  const [keyword, setKeyword] = useState("");
  const [activeType, setActiveType] = useState(initialType || "All");
  const [bedrooms, setBedrooms] = useState("Any");

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (activeType !== "All" && p.property_type !== activeType) return false;
      if (bedrooms !== "Any" && p.bedrooms !== bedrooms) return false;
      if (keyword.trim()) {
        const q = keyword.trim().toLowerCase();
        const haystack = `${p.title} ${p.location}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [properties, activeType, bedrooms, keyword]);

  return (
    <div>
      {/* Filter bar */}
      <div className="mb-8 space-y-4">
        <div className="flex gap-2 flex-wrap">
          {TYPE_TABS.map((t) => (
            <button
              key={t}
              onClick={() => setActiveType(t)}
              className={`px-4 py-2 rounded-full font-mono text-[11px] uppercase tracking-wide border transition-colors ${
                activeType === t
                  ? "bg-ink text-paper border-ink"
                  : "border-ink/20 text-ink-soft hover:border-brass hover:text-brass"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="flex gap-4 flex-wrap items-center">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search by title or location..."
            className="flex-1 min-w-[200px] border-0 border-b-[1.5px] border-ink/25 bg-transparent py-2 outline-none focus:border-brass text-sm"
          />
          <select
            value={bedrooms}
            onChange={(e) => setBedrooms(e.target.value)}
            className="border-0 border-b-[1.5px] border-ink/25 bg-transparent py-2 outline-none focus:border-brass text-sm font-mono"
          >
            <option>Any</option>
            <option value="1">1 Bed</option>
            <option value="2">2 Bed</option>
            <option value="3">3 Bed</option>
            <option value="4">4 Bed</option>
            <option value="5">5+ Bed</option>
          </select>
        </div>
      </div>

      {filtered.length === 0 ? (
        <p className="text-ink-soft text-sm">
          No properties match your filters right now.{" "}
          <button
            onClick={() => {
              setActiveType("All");
              setBedrooms("Any");
              setKeyword("");
            }}
            className="text-brass"
          >
            Clear filters
          </button>
        </p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((p) => {
            const cover =
              p.images && p.images.length > 0 ? p.images[0] : p.image_url;
            return (
              <Link href={`/property/${p.id}`} key={p.id} className="group block">
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
  );
}
