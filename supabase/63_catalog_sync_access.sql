-- 63_catalog_sync_access.sql
-- „Mergen = fertig": Das Build-Skript (scripts/sync-catalog.mts) trägt neue Düfte
-- mit dem Server-Schlüssel (service_role) ein. Seit dem Security-Lockdown (SQL 56)
-- fehlten dieser Rolle die Tabellen-Rechte → „permission denied for table perfumes".
-- Bewusst nur LESEN und HINZUFÜGEN – kein UPDATE, kein DELETE.

GRANT SELECT, INSERT ON public.perfumes TO service_role;
GRANT SELECT, INSERT ON public.brands   TO service_role;

NOTIFY pgrst, 'reload schema';

-- Kontrolle: sollte viermal "true" zeigen.
SELECT
  has_table_privilege('service_role', 'public.perfumes', 'SELECT') AS duefte_lesen,
  has_table_privilege('service_role', 'public.perfumes', 'INSERT') AS duefte_hinzufuegen,
  has_table_privilege('service_role', 'public.brands',   'SELECT') AS marken_lesen,
  has_table_privilege('service_role', 'public.brands',   'INSERT') AS marken_hinzufuegen;
