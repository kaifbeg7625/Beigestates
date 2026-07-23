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
  description: string | null;
  created_at: string;
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
