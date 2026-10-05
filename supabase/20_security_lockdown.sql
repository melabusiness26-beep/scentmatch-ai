-- AURESSA SECURITY HARDENING
-- Schreibrechte nur für Admin, öffentliches Lesen bleibt aktiviert.
-- Im Supabase SQL Editor ausführen.
-- WICHTIG: Ersetze 'ADMIN_USER_ID_HERE' mit der echten UUID des Admin-Kontos (siehe unten).

-- ============================================================================
-- SCHRITT 1: Admin-User-ID finden
-- ============================================================================
-- Kopiere diese Abfrage EINZELN aus und führe sie aus:
-- SELECT id, email FROM auth.users WHERE email = 'mela.business26@gmail.com';
-- Kopiere die UUID aus der Spalte "id" und ersetze damit 'ADMIN_USER_ID_HERE' in den Policies unten.

-- ============================================================================
-- TABELLE: perfumes (409 Düfte)
-- ============================================================================
-- ALT (UNSICHER): Alle authenticated Nutzer konnten schreiben
-- NEU (SICHER): Nur Admin kann schreiben, alle können lesen

-- Lese-Berechtigung bleibt erhalten (anon + authenticated)
drop policy if exists "Public read perfumes" on public.perfumes;
create policy "Public read perfumes" on public.perfumes
  for select using (true);

-- Schreib-Rechte: NUR Admin
drop policy if exists "Admins insert perfumes" on public.perfumes;
create policy "Admins insert perfumes" on public.perfumes
  for insert to authenticated
  with check (auth.uid() = 'ADMIN_USER_ID_HERE'::uuid);

drop policy if exists "Admins update perfumes" on public.perfumes;
create policy "Admins update perfumes" on public.perfumes
  for update to authenticated
  using (auth.uid() = 'ADMIN_USER_ID_HERE'::uuid)
  with check (auth.uid() = 'ADMIN_USER_ID_HERE'::uuid);

drop policy if exists "Admins delete perfumes" on public.perfumes;
create policy "Admins delete perfumes" on public.perfumes
  for delete to authenticated
  using (auth.uid() = 'ADMIN_USER_ID_HERE'::uuid);

-- GRANT: Nur Admin darf schreiben
revoke insert, update, delete on public.perfumes from authenticated;
grant select on public.perfumes to authenticated;
-- Wenn du NUR über SQL Editor änderst, nicht über die App:
-- revoke insert, update, delete on public.perfumes from authenticated;

-- ============================================================================
-- TABELLE: brands (Marken-Master)
-- ============================================================================
-- ALT (UNSICHER): Alle authenticated Nutzer konnten schreiben
-- NEU (SICHER): Nur Admin kann schreiben, alle können lesen

drop policy if exists "Public read brands" on public.brands;
create policy "Public read brands" on public.brands
  for select using (true);

drop policy if exists "Admins insert brands" on public.brands;
create policy "Admins insert brands" on public.brands
  for insert to authenticated
  with check (auth.uid() = 'ADMIN_USER_ID_HERE'::uuid);

drop policy if exists "Admins update brands" on public.brands;
create policy "Admins update brands" on public.brands
  for update to authenticated
  using (auth.uid() = 'ADMIN_USER_ID_HERE'::uuid)
  with check (auth.uid() = 'ADMIN_USER_ID_HERE'::uuid);

drop policy if exists "Admins delete brands" on public.brands;
create policy "Admins delete brands" on public.brands
  for delete to authenticated
  using (auth.uid() = 'ADMIN_USER_ID_HERE'::uuid);

revoke insert, update, delete on public.brands from authenticated;
grant select on public.brands to authenticated;

-- ============================================================================
-- TABELLE: subscribers (Newsletter)
-- ============================================================================
-- BLEIBT WIE GEHABT: Alle können eintragen (INSERT), aber nicht lesen.
-- Kein UPDATE/DELETE von außen. Admin ändert über SQL Editor.

drop policy if exists "Public can subscribe" on public.subscribers;
create policy "Public can subscribe" on public.subscribers
  for insert to anon, authenticated with check (true);

revoke insert, update, delete on public.subscribers from authenticated;
grant insert on public.subscribers to authenticated;

-- ============================================================================
-- ALLE ANDEREN TABELLEN (fragrance_notes, scent_profiles, etc.)
-- ============================================================================
-- Diese sind vorbereitet aber NICHT GENUTZT.
-- Alle Schreibrechte für authenticated entfernen. Lesen ist okay.

-- Lese-Rechte erhalten bleiben (falls Quiz oder Features später genutzt werden)
grant select on public.fragrance_notes to authenticated;
grant select on public.perfume_notes to authenticated;
grant select on public.scent_profiles to authenticated;
grant select on public.quiz_questions to authenticated;
grant select on public.quiz_answers to authenticated;
grant select on public.affiliate_links to authenticated;
grant select on public.layering_recipes to authenticated;

-- Schreib-Rechte entfernen (diese Tabellen änderst du NUR über SQL Editor)
revoke insert, update, delete on public.fragrance_notes from authenticated;
revoke insert, update, delete on public.perfume_notes from authenticated;
revoke insert, update, delete on public.scent_profiles from authenticated;
revoke insert, update, delete on public.quiz_questions from authenticated;
revoke insert, update, delete on public.quiz_answers from authenticated;
revoke insert, update, delete on public.affiliate_links from authenticated;
revoke insert, update, delete on public.layering_recipes from authenticated;

-- ============================================================================
-- RESULTS & TESTING
-- ============================================================================
-- Nach Ausführung kannst du testen:
-- 1. Öffentlicher Besucher (nicht angemeldet): Kann perfumes/brands/etc LESEN ✓
-- 2. Andere authenticated Nutzer: Können NICHT schreiben ✗
-- 3. Du (Admin): Kannst in der App schreiben (wenn du angemeldet bist)
-- 4. SQL Editor: Du kannst IMMER alles ändern (direkt in der DB)
