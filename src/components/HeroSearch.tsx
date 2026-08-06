"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SALE_BUDGETS, RENT_BUDGETS } from "@/lib/price";

const TYPES = ["Any type", "Flat", "Villa", "Plot", "Rent", "Interior"];
const BEDS = ["Any", "1", "2", "3", "4", "5"];

// The Buy/Rent pills are gone. Rent was already one of the property types, so
// the toggle was a second control saying the same thing — picking "Rent" up
// top and "Flat" below it was a contradiction the form couldn't answer.
// One type dropdown, and the budget brackets follow it.
export default function HeroSearch() {
  const router = useRouter();
  const [type, setType] = useState(TYPES[0]);
  const [where, setWhere] = useState("");
  const [beds, setBeds] = useState(BEDS[0]);
  const [budget, setBudget] = useState(0);

  const isRent = type === "Rent";
  const budgets = isRent ? RENT_BUDGETS : SALE_BUDGETS;

  function selectType(t: string) {
    setType(t);
    setBudget(0); // monthly rent and sale price aren't the same scale
  }

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (type !== TYPES[0]) params.set("type", type);
    if (where.trim()) params.set("q", where.trim());
    if (beds !== BEDS[0]) params.set("beds", beds);
    if (budget > 0) params.set("budget", String(budget));
    router.push(`/listings${params.toString() ? `?${params}` : ""}`);
  }

  return (
    // One continuous bar with hairline dividers, the way every major property
    // and travel site does it. The previous version was four grey filled
    // boxes in a row, which reads as a form you have to fill in rather than
    // a search you can just fire.
    <form
      onSubmit={submit}
      className="surface-tan rounded-xl p-3 sm:p-4 grid gap-3
                 sm:grid-cols-2 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)_minmax(0,0.85fr)_minmax(0,1.1fr)_auto]"
    >
      <Field label="Locality" className="">
        <input
          value={where}
          onChange={(e) => setWhere(e.target.value)}
          placeholder="Gomti Nagar, Sushant Golf City…"
          aria-label="Locality or area"
          className="w-full bg-transparent outline-none placeholder:text-ink-soft/50"
        />
      </Field>

      <Field label="Type" className="">
        <Select value={type} onChange={selectType} options={TYPES} label="Property type" />
      </Field>

      <Field label="Bedrooms" className="">
        <Select
          value={beds}
          onChange={setBeds}
          options={BEDS}
          label="Bedrooms"
          render={(b) => (b === "Any" ? "Any" : `${b} BHK`)}
        />
      </Field>

      <Field label={isRent ? "Monthly rent" : "Budget"} className="">
        <Select
          value={String(budget)}
          onChange={(v) => setBudget(Number(v))}
          options={budgets.map((_, i) => String(i))}
          label="Budget"
          render={(i) => budgets[Number(i)].label}
        />
      </Field>

      {/* Solid dark, like the reference's Sign-up button sitting in its tan
          search container. */}
      <button
        type="submit"
        className="group shrink-0 flex items-center justify-center gap-3
                   px-10 rounded-lg py-5 bg-ink text-paper font-semibold text-lg
                   transition-colors duration-300 hover:bg-[#1C1009]
                   focus-visible:outline-none focus-visible:ring-2
                   focus-visible:ring-offset-2 focus-visible:ring-offset-paper-dim
                   focus-visible:ring-ink"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          aria-hidden="true"
          className="transition-transform duration-300 group-hover:scale-110"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        Search
      </button>
    </form>
  );
}

function Field({
  label,
  className = "",
  children,
}: {
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    // White pills inside the tan panel — the reference's field treatment.
    <label
      className={`min-w-0 flex flex-col justify-center gap-1 bg-shell rounded-lg
                  px-6 py-4 cursor-text transition-shadow duration-200
                  focus-within:shadow-e2 ${className}`}
    >
      <span className="label text-[0.625rem] text-ink-soft/70 truncate">
        {label}
      </span>
      {children}
    </label>
  );
}

function Select({
  value,
  onChange,
  options,
  label,
  render = (v: string) => v,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  label: string;
  render?: (v: string) => string;
}) {
  return (
    <div className="relative min-w-0">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label}
        className="w-full appearance-none bg-transparent pr-6 font-medium outline-none cursor-pointer truncate"
      >
        {options.map((o) => (
          <option key={o} value={o}>
            {render(o)}
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
