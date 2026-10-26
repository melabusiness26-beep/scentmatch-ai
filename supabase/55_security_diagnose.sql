-- 55_security_diagnose.sql
--
-- NUR LESEN – verändert nichts. Vor 56_security_lockdown.sql ausführen und
-- das Ergebnis (Tabelle) sichern/teilen. Zeigt in EINER Tabelle:
--   rls        – welche Tabellen Row Level Security an/aus haben
--   policy     – alle Policies inkl. Rollen und Bedingung
--   grant      – alle Schreibrechte (alles ausser SELECT) für anon/authenticated
--   funktion   – SECURITY-DEFINER-Funktionen und wer sie ausführen darf
--
-- Ausführen: Supabase → SQL Editor → einfügen → Run.

SELECT 'rls' AS bereich,
       c.relname AS objekt,
       CASE WHEN c.relrowsecurity THEN 'RLS an' ELSE '⚠️ RLS AUS' END AS detail
FROM pg_class c
JOIN pg_namespace n ON n.oid = c.relnamespace
WHERE n.nspname = 'public' AND c.relkind = 'r'

UNION ALL

SELECT 'policy',
       tablename || ' · ' || policyname,
       cmd || ' für ' || array_to_string(roles, ',')
         || ' · using: ' || coalesce(qual, '–')
         || ' · check: ' || coalesce(with_check, '–')
FROM pg_policies
WHERE schemaname = 'public'

UNION ALL

SELECT 'grant',
       table_name,
       grantee || ': ' || string_agg(privilege_type, ', ' ORDER BY privilege_type)
FROM information_schema.role_table_grants
WHERE table_schema = 'public'
  AND grantee IN ('anon', 'authenticated')
  AND privilege_type <> 'SELECT'
GROUP BY table_name, grantee

UNION ALL

SELECT 'funktion',
       p.proname || '()',
       'SECURITY DEFINER · anon darf ausführen: '
         || CASE WHEN has_function_privilege('anon', p.oid, 'EXECUTE') THEN '⚠️ JA' ELSE 'nein' END
         || ' · authenticated darf ausführen: '
         || CASE WHEN has_function_privilege('authenticated', p.oid, 'EXECUTE') THEN '⚠️ JA' ELSE 'nein' END
FROM pg_proc p
JOIN pg_namespace n ON n.oid = p.pronamespace
WHERE n.nspname = 'public' AND p.prosecdef

ORDER BY 1, 2, 3;
