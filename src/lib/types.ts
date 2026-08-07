export type Property = {
  id: string;
  title: string;
  location: string;
  price: string;
  property_type: string;
  area: string | null;
  bedrooms: string | null;
  bathrooms: string | null;
  status: string;
  image_url: string | null;
  images: string[] | null;
  videos: string[] | null;
  description: string | null;
  // Rental terms. Null on sale listings, which is why they're all optional
  // rather than defaulted — an empty deposit field would read as "₹0".
  deposit: string | null;
  maintenance: string | null;
  furnishing: string | null;
  available_from: string | null;
  /** Generated in Postgres from `price` — never write to it. */
  price_numeric: number | null;
  /** Type-specific details; the shape per type lives in lib/property-schema. */
  attributes: Record<string, unknown> | null;
  created_at: string;
};

/** A photo with the room it belongs to, so a gallery can group by space. */
export type PropertyImage = {
  id: string;
  property_id: string;
  url: string;
  room: string | null;
  caption: string | null;
  sort_order: number;
};

export type Lead = {
  id: string;
  name: string;
  mobile: string;
  service: string;
  city: string;
  budget: string;
  timeline: string;
  notes: string | null;
  status: string;
  created_at: string;
};

export type Visit = {
  id: string;
  property_id: string | null;
  property_title: string;
  name: string;
  mobile: string;
  preferred_date: string;
  preferred_slot: string;
  notes: string | null;
  status: string;
  created_at: string;
};
