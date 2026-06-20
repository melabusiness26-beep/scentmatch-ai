-- ScentMatch AI: Schreibrechte fuer eingeloggte Admins.
-- Besucher (anon) duerfen weiterhin NUR lesen. Eingeloggte Nutzer (authenticated)
-- duerfen Duefte und Marken anlegen/bearbeiten.
-- Im Supabase SQL Editor ausfuehren.

-- Tabellen-Rechte (GRANT) fuer eingeloggte Nutzer
grant insert, update on public.perfumes to authenticated;
grant insert, update on public.brands   to authenticated;

-- RLS-Policies fuer Schreibzugriff
drop policy if exists "Admins insert perfumes" on public.perfumes;
create policy "Admins insert perfumes" on public.perfumes
  for insert to authenticated with check (true);

drop policy if exists "Admins update perfumes" on public.perfumes;
create policy "Admins update perfumes" on public.perfumes
  for update to authenticated using (true) with check (true);

drop policy if exists "Admins insert brands" on public.brands;
create policy "Admins insert brands" on public.brands
  for insert to authenticated with check (true);

drop policy if exists "Admins update brands" on public.brands;
create policy "Admins update brands" on public.brands
  for update to authenticated using (true) with check (true);
