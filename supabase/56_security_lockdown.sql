-- 56_security_lockdown.sql
--
-- SICHERHEITS-FIX. Ersetzt das nie ausgeführte 55_security_lockdown.sql.
--
-- Problem vorher:
--   * delete_all_perfumes() / delete_all_brands() (SECURITY DEFINER, umgehen
--     RLS) waren für "anon" freigegeben → jeder Besucher konnte den Katalog
--     mit dem öffentlichen Publishable-Key löschen.
--   * Schreib-Policies auf perfumes/brands galten für JEDEN eingeloggten
--     Nutzer (bzw. DELETE sogar für alle Rollen). Sobald es später normale
--     Benutzerkonten gibt (Favoriten, Profile), wäre das eine Lücke.
--
-- Lösung:
--   * Echte Admin-Rolle in den app_metadata ({"role":"admin"}). Die kann ein
--     Nutzer NICHT selbst setzen – nur per SQL / Service-Role.
--   * public.is_admin() prüft diese Rolle; alle Schreib-Policies auf
--     perfumes/brands verlangen sie. Die Website prüft dieselbe Rolle
--     (lib/admin-auth.ts, lib/admin-role.ts).
--   * Löschfunktionen nur noch für service_role (Server-Route, die selbst
--     wieder den Admin-Login prüft).
--   * anon/authenticated verlieren alle Schreibrechte (INSERT/UPDATE/DELETE/
--     TRUNCATE …) auf allen public-Tabellen; danach werden NUR die nötigen
--     wieder vergeben: Newsletter-Eintrag (INSERT subscribers), Admin-Pflege
--     (perfumes/brands, durch Policies auf Admins beschränkt), Scan-Korrekturen.
--   * Lese-Rechte (SELECT) werden NICHT angefasst → die Website liest weiter.
--
-- Es werden KEINE Daten gelöscht oder geändert – ausser der Admin-Rolle in
-- deinem eigenen Benutzerkonto.
--
-- VORHER: Backup (Table Editor → perfumes / brands → Export CSV) und
--         55_security_diagnose.sql ausführen.
-- EINZIGE ANPASSUNG: deine Admin-E-Mail in Schritt 1 eintragen.
-- Alles läuft in EINER Transaktion: Tritt irgendwo ein Fehler auf, wird
-- nichts übernommen. Mehrfaches Ausführen ist unschädlich.
-- NACHHER: im Admin-Bereich einmal abmelden und neu anmelden (neues Token
--          mit der Admin-Rolle), dann 57_security_test.sql ausführen.

BEGIN;

-- ── Schritt 1: Admin-Rolle für dein Konto ───────────────────────────────────
DO $$
DECLARE
  admin_email text := 'HIER-DEINE-ADMIN-EMAIL-EINTRAGEN';  -- ← nur diese Zeile anpassen
  updated int;
BEGIN
  UPDATE auth.users
  SET raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb) || '{"role":"admin"}'::jsonb
  WHERE lower(email) = lower(admin_email);
  GET DIAGNOSTICS updated = ROW_COUNT;

  IF updated <> 1 THEN
    RAISE EXCEPTION 'Abbruch: Für "%" wurde % Konto/Konten gefunden (erwartet: genau 1). Nichts wurde geändert. Bitte E-Mail prüfen (Authentication → Users).', admin_email, updated;
  END IF;
END $$;

-- ── Schritt 2: Prüf-Funktion is_admin() ─────────────────────────────────────
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path = ''
AS $$
  SELECT coalesce((auth.jwt() -> 'app_metadata' ->> 'role') = 'admin', false);
$$;

REVOKE ALL ON FUNCTION public.is_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

-- ── Schritt 3: Löschfunktionen nur noch für service_role ────────────────────
DO $$
BEGIN
  IF to_regprocedure('public.delete_all_perfumes()') IS NOT NULL THEN
    REVOKE EXECUTE ON FUNCTION public.delete_all_perfumes() FROM PUBLIC, anon, authenticated;
    GRANT EXECUTE ON FUNCTION public.delete_all_perfumes() TO service_role;
  END IF;
  IF to_regprocedure('public.delete_all_brands()') IS NOT NULL THEN
    REVOKE EXECUTE ON FUNCTION public.delete_all_brands() FROM PUBLIC, anon, authenticated;
    GRANT EXECUTE ON FUNCTION public.delete_all_brands() TO service_role;
  END IF;
END $$;

-- ── Schritt 4: Alte Schreib-Policies auf perfumes/brands entfernen ──────────
-- Entfernt ALLE Policies für INSERT/UPDATE/DELETE/ALL auf diesen beiden
-- Tabellen – auch solche, die evtl. direkt im Dashboard angelegt wurden.
-- Lese-Policies (SELECT) bleiben bestehen.
DO $$
DECLARE
  pol record;
BEGIN
  FOR pol IN
    SELECT tablename, policyname
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename IN ('perfumes', 'brands')
      AND cmd IN ('INSERT', 'UPDATE', 'DELETE', 'ALL')
  LOOP
    EXECUTE format('DROP POLICY %I ON public.%I', pol.policyname, pol.tablename);
  END LOOP;
END $$;

ALTER TABLE public.perfumes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.brands   ENABLE ROW LEVEL SECURITY;

-- Sicherheitsnetz: Öffentliches Lesen garantiert erhalten (falls es bisher
-- nur über eine ALL-Policy lief, die oben entfernt wurde).
DROP POLICY IF EXISTS "auressa_public_read_perfumes" ON public.perfumes;
CREATE POLICY "auressa_public_read_perfumes" ON public.perfumes
  FOR SELECT TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auressa_public_read_brands" ON public.brands;
CREATE POLICY "auressa_public_read_brands" ON public.brands
  FOR SELECT TO anon, authenticated USING (true);

-- ── Schritt 5: Neue Schreib-Policies – nur Admins ───────────────────────────
CREATE POLICY "auressa_admin_insert_perfumes" ON public.perfumes
  FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "auressa_admin_update_perfumes" ON public.perfumes
  FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "auressa_admin_delete_perfumes" ON public.perfumes
  FOR DELETE TO authenticated USING (public.is_admin());

CREATE POLICY "auressa_admin_insert_brands" ON public.brands
  FOR INSERT TO authenticated WITH CHECK (public.is_admin());
CREATE POLICY "auressa_admin_update_brands" ON public.brands
  FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
CREATE POLICY "auressa_admin_delete_brands" ON public.brands
  FOR DELETE TO authenticated USING (public.is_admin());

-- ── Schritt 6: Tabellenrechte – erst alles Schreiben weg, dann gezielt erlauben
REVOKE INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER
  ON ALL TABLES IN SCHEMA public FROM PUBLIC, anon, authenticated;

-- Admin-Pflege (die Policies oben lassen nur Admins durch)
GRANT INSERT, UPDATE, DELETE ON public.perfumes TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.brands   TO authenticated;

-- Newsletter-Anmeldung (nur Eintragen; Lesen bleibt gesperrt)
DO $$
BEGIN
  IF to_regclass('public.subscribers') IS NOT NULL THEN
    GRANT INSERT ON public.subscribers TO anon, authenticated;
    REVOKE SELECT ON public.subscribers FROM PUBLIC, anon, authenticated;
  END IF;
  IF to_regclass('public.scan_corrections') IS NOT NULL THEN
    GRANT INSERT ON public.scan_corrections TO authenticated;
  END IF;
END $$;

-- Künftige Tabellen: TRUNCATE nie automatisch an anon/authenticated vergeben.
ALTER DEFAULT PRIVILEGES IN SCHEMA public REVOKE TRUNCATE ON TABLES FROM anon, authenticated;

COMMIT;

-- Kontrolle: Schreibrechte, die anon/authenticated jetzt noch haben.
-- Erwartet: anon nur INSERT auf subscribers; authenticated nur
-- perfumes/brands (DELETE, INSERT, UPDATE), subscribers (INSERT),
-- scan_corrections (INSERT).
SELECT table_name, grantee, string_agg(privilege_type, ', ' ORDER BY privilege_type) AS rechte
FROM information_schema.role_table_grants
WHERE table_schema = 'public'
  AND grantee IN ('anon', 'authenticated')
  AND privilege_type <> 'SELECT'
GROUP BY table_name, grantee
ORDER BY table_name, grantee;
