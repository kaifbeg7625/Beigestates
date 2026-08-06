// Prices are stored as free text ("₹42,00,000", "₹28,000 / month") because
// the column is a text field. Until that becomes a numeric column, this pulls
// a number out so budget filtering and sorting can work at all. It's a stopgap
// — anything typed in a format other than digits-and-separators won't parse,
// and those rows are treated as "unknown" rather than silently filtered out.
export function parsePrice(price: string): number | null {
  const digits = price.replace(/[^0-9]/g, "");
  if (!digits) return null;
  const n = Number(digits);
  return Number.isFinite(n) && n > 0 ? n : null;
}

export const SALE_BUDGETS = [
  { label: "Any budget", max: null },
  { label: "Under ₹30 L", max: 3_000_000 },
  { label: "₹30 L – ₹50 L", max: 5_000_000, min: 3_000_000 },
  { label: "₹50 L – ₹1 Cr", max: 10_000_000, min: 5_000_000 },
  { label: "₹1 Cr – ₹2 Cr", max: 20_000_000, min: 10_000_000 },
  { label: "Above ₹2 Cr", max: null, min: 20_000_000 },
] as const;

export const RENT_BUDGETS = [
  { label: "Any budget", max: null },
  { label: "Under ₹15,000", max: 15_000 },
  { label: "₹15,000 – ₹30,000", max: 30_000, min: 15_000 },
  { label: "₹30,000 – ₹50,000", max: 50_000, min: 30_000 },
  { label: "Above ₹50,000", max: null, min: 50_000 },
] as const;

export function budgetMatches(
  price: string,
  min?: number | null,
  max?: number | null
) {
  if (min == null && max == null) return true;
  const value = parsePrice(price);
  if (value == null) return true; // unparseable price — don't hide it
  if (min != null && value < min) return false;
  if (max != null && value > max) return false;
  return true;
}
