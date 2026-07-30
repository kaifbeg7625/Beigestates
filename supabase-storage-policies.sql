-- Run this in Supabase SQL Editor AFTER creating the "property-photos"
-- bucket via Dashboard → Storage → New bucket (mark it Public).
-- This allows anyone to VIEW photos, but only logged-in admin users
-- to UPLOAD/DELETE them.

create policy "Public can view property photos"
  on storage.objects for select
  using (bucket_id = 'property-photos');

create policy "Authenticated users can upload property photos"
  on storage.objects for insert
  with check (bucket_id = 'property-photos' and auth.role() = 'authenticated');

create policy "Authenticated users can delete property photos"
  on storage.objects for delete
  using (bucket_id = 'property-photos' and auth.role() = 'authenticated');
