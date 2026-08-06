"use client";

import { useState, useMemo } from "react";
import type { Property } from "@/lib/types";
import PropertyCard from "./PropertyCard";
import Reveal from "./Reveal";
import { Button } from "./Button";
import { SALE_BUDGETS, RENT_BUDGETS, budgetMatches, parsePrice } from "@/lib/price";

const TYPE_TABS = ["All", "Flat", "Villa", "Plot", "Rent", "Interior"];
const SORTS = ["Newest", "Price: low to high", "Price: high to low"] as const;
type Sort = (typeof SORTS)[number];

export default function ListingsGrid({
  properties,
  initialType,
  initialKeyword,
  initialBeds,
  initialBudget,
}: {
  properties: Property[];
  initialType?: string;
  initialKeyword?: string;
  initialBeds?: string;
  initialBudget?: number;
}) {
  const [keyword, setKeyword] = useState(initialKeyword ?? "");
  const [activeType, setActiveType] = useState(initialType || "All");
  const [bedrooms, setBedrooms] = useState(initialBeds || "Any");
  const [budgetIdx, setBudgetIdx] = useState(initialBudget ?? 0);
  const [sort, setSort] = useState<Sort>(SORTS[0]);

  // Rent is priced per month, everything else is a sale price, so the two
  // need different brackets.
  const budgets = activeType === "Rent" ? RENT_BUDGETS : SALE_BUDGETS;
  const budget = budgets[Math.min(budgetIdx, budgets.length - 1)];

  function selectType(t: string) {
    setActiveType(t);
    setBudgetIdx(0); // sale and rent brackets aren't interchangeable
  }

  function clearAll() {
    setActiveType("All");
    setBedrooms("Any");
    setKeyword("");
    setBudgetIdx(0);
  }

  const filtered = useMemo(() => {
    const rows = properties.filter((p) => {
      if (activeType !== "All" && p.property_type !== activeType) return false;
      if (bedrooms !== "Any" && p.bedrooms !== bedrooms) return false;
      if (!budgetMatches(p.price, "min" in budget ? budget.min : null, budget.max))
        return false;
      if (keyword.trim()) {
        const q = keyword.trim().toLowerCase();
        const haystack = `${p.title} ${p.location}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });

    if (sort === "Newest") return rows;

    // Rows with an unparseable price sink to the bottom rather than sorting
    // as if they were free.
    return [...rows].sort((a, b) => {
      const x = parsePrice(a.price);
      const y = parsePrice(b.price);
      if (x == null && y == null) return 0;
      if (x == null) return 1;
      if (y == null) return -1;
      return sort === "Price: low to high" ? x - y : y - x;
    });
  }, [properties, activeType, bedrooms, keyword, budget, sort]);

  const activeFilters =
    (activeType !== "All" ? 1 : 0) +
    (bedrooms !== "Any" ? 1 : 0) +
    (budgetIdx > 0 ? 1 : 0) +
    (keyword.trim() ? 1 : 0);

  return (
    <div>
      <div className="mb-12 space-y-5">
        <div className="flex gap-2.5 flex-wrap">
          {TYPE_TABS.map((t) => (
            <button
              key={t}
              onClick={() => selectType(t)}
              className={`px-6 py-3 rounded-full font-bold border-[1.5px] transition-all duration-300 ${
                activeType === t
                  ? "bg-ink text-paper border-ink"
                  : "bg-shell border-ink/15 text-ink-soft hover:border-ink hover:text-ink"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Same tan panel and white pill fields as the homepage search, so
            the two don't look like they came off different sites. */}
        <div className="surface-tan rounded-xl p-3 sm:p-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)_minmax(0,1.1fr)_minmax(0,1.1fr)]">
          <FilterField label="Search">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Title or location…"
              className="w-full bg-transparent outline-none placeholder:text-ink-soft/50"
            />
          </FilterField>

          <FilterField label="Bedrooms">
            <FilterSelect
              value={bedrooms}
              onChange={setBedrooms}
              ariaLabel="Bedrooms"
              options={["Any", "1", "2", "3", "4", "5"].map((b) => ({
                value: b,
                label: b === "Any" ? "Any" : `${b} BHK`,
              }))}
            />
          </FilterField>

          <FilterField label={activeType === "Rent" ? "Monthly rent" : "Budget"}>
            <FilterSelect
              value={String(budgetIdx)}
              onChange={(v) => setBudgetIdx(Number(v))}
              ariaLabel="Budget"
              options={budgets.map((b, i) => ({
                value: String(i),
                label: b.label,
              }))}
            />
          </FilterField>

          <FilterField label="Sort by">
            <FilterSelect
              value={sort}
              onChange={(v) => setSort(v as Sort)}
              ariaLabel="Sort by"
              options={SORTS.map((s) => ({ value: s, label: s }))}
            />
          </FilterField>
        </div>

        <div className="flex items-center justify-between gap-4 flex-wrap pt-1">
          <p className="text-sm text-ink-soft">
            {filtered.length}{" "}
            {filtered.length === 1 ? "property" : "properties"}
            {activeFilters > 0 && " matching your filters"}
          </p>
          {activeFilters > 0 && (
            <button
              onClick={clearAll}
              className="text-sm text-brass hover:text-brass-bright transition-colors"
            >
              Clear all filters
            </button>
          )}
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="surface rounded-lg p-12 text-center">
          <p className="font-extrabold text-2xl mb-3">Nothing matches that yet.</p>
          <p className="text-ink-soft mb-6 max-w-md mx-auto">
            Try widening the budget or clearing a filter — or tell us what
            you&apos;re after and we&apos;ll go looking for it.
          </p>
          <Button onClick={clearAll}>Clear filters</Button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((p, i) => (
            <Reveal key={p.id} delay={Math.min(i, 5) * 70}>
              <PropertyCard p={p} />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}

// Shares its look with the homepage hero search — white pill on the tan
// panel, small mono label above the value.
function FilterField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="min-w-0 flex flex-col justify-center gap-1 bg-shell rounded-lg px-6 py-4 cursor-text transition-shadow duration-200 focus-within:shadow-e2">
      <span className="label text-[0.625rem] text-ink-soft/70 truncate">
        {label}
      </span>
      {children}
    </label>
  );
}

function FilterSelect({
  value,
  onChange,
  options,
  ariaLabel,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  ariaLabel: string;
}) {
  return (
    <div className="relative min-w-0">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={ariaLabel}
        className="w-full appearance-none bg-transparent pr-6 font-medium outline-none cursor-pointer truncate"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <svg
        width="11"
        height="11"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        aria-hidden="true"
        className="absolute right-0 top-1/2 -translate-y-1/2 text-ink-soft pointer-events-none"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
  );
}
