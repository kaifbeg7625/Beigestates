-- Run this entire file once in your Supabase project's SQL Editor
-- (Dashboard → SQL Editor → New Query → paste this → Run)

-- ============ PROPERTIES TABLE ============
create table if not exists properties (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  location text not null,
  price text not null,
  property_type text not null default 'Flat', -- Flat, Villa, Plot, Interior
  area text,
  bedrooms text,
  bathrooms text,
  status text default 'Ready to Move', -- Ready to Move, Under Construction
  image_url text,
  images jsonb default '[]'::jsonb, -- array of photo URLs for the gallery
  description text,
  created_at timestamptz default now()
);

alter table properties enable row level security;

-- Anyone (including anonymous website visitors) can read properties
create policy "Public can view properties"
  on properties for select
  using (true);

-- Only logged-in admin users can insert/update/delete
create policy "Authenticated users can manage properties"
  on properties for all
  using (auth.role() = 'authenticated')
  with check (auth.role() = 'authenticated');

-- ============ LEADS TABLE ============
create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  mobile text not null,
  service text not null,
  city text not null,
  budget text not null,
  timeline text not null,
  notes text,
  status text default 'New', -- New, Contacted, Closed, Rejected
  created_at timestamptz default now()
);

alter table leads enable row level security;

-- Anyone can submit a lead (public enquiry form)
create policy "Anyone can submit a lead"
  on leads for insert
  with check (true);

-- Only logged-in admin users can view/update/delete leads
create policy "Authenticated users can view leads"
  on leads for select
  using (auth.role() = 'authenticated');

create policy "Authenticated users can update leads"
  on leads for update
  using (auth.role() = 'authenticated');

create policy "Authenticated users can delete leads"
  on leads for delete
  using (auth.role() = 'authenticated');

-- ============ SAMPLE DATA (optional — delete rows later from admin panel) ============
insert into properties (title, location, price, property_type, area, bedrooms, bathrooms, status, image_url)
values
  ('2BHK Apartment', 'Gomti Nagar', '₹42,00,000', 'Flat', '1050 sq.ft', '2', '2', 'Ready to Move', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=60'),
  ('3BHK Villa', 'Sushant Golf City', '₹1,25,00,000', 'Villa', '2400 sq.ft', '3', '3', 'Under Construction', 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop&q=60'),
  ('Residential Plot', 'Sultanpur Road', '₹32,00,000', 'Plot', '1800 sq.ft', null, null, 'Ready to Move', 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=60');
