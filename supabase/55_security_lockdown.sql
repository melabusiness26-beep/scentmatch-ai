-- 55_security_lockdown.sql
--
-- SICHERHEITS-FIX (dringend):
-- Die Funktionen delete_all_perfumes() und delete_all_brands() laufen mit
-- SECURITY DEFINER (umgehen RLS) und waren per GRANT für "anon" freigegeben.
-- Damit konnte JEDER Besucher mit dem öffentlichen Publishable-Key den
-- gesamten Katalog löschen (supabase.rpc('delete_all_perfumes')).
--
-- Dieses Skript:
--   1. entzieht anon/authenticated/PUBLIC das Ausführungsrecht
--      (nur noch die Server-Route mit Service-Role-Key darf sie aufrufen,
--       und diese prüft jetzt zusätzlich den Admin-Login),
--   2. beschränkt die Lösch-Policy auf perfumes auf eingeloggte Nutzer.
--
-- Ausführen: Supabase → SQL Editor → Inhalt einfügen → Run.
-- Mehrfaches Ausführen ist unschädlich.

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

-- Lösch-Policy: vorher "USING (true)" für alle Rollen → jetzt nur authenticated.
DROP POLICY IF EXISTS "admin_delete_perfumes" ON public.perfumes;
CREATE POLICY "admin_delete_perfumes"
ON public.perfumes
FOR DELETE
TO authenticated
USING (true);

REVOKE DELETE ON public.perfumes FROM anon;
REVOKE DELETE ON public.brands FROM anon;

-- Kontrolle: Hier darf bei "anon" KEINE Zeile mehr erscheinen.
SELECT routine_name, grantee, privilege_type
FROM information_schema.routine_privileges
WHERE routine_schema = 'public'
  AND routine_name IN ('delete_all_perfumes', 'delete_all_brands')
ORDER BY routine_name, grantee;
