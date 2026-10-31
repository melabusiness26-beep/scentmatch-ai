-- 64_perfume_accords.sql
-- Duftrichtung pro Duft (freiwillig), wie sie die Parfumo-Community angibt,
-- nach Stärke geordnet, z. B. [{"code": "holzig"}, {"code": "erdig"}, …]
-- oder mit Prozentwerten [{"code": "frisch", "value": 22}, …].
-- Ist sie eingetragen, zeigt die Duft-Seite diese statt des aus den Noten
-- berechneten Duftcharakters.
-- Wichtig (gelernt bei SQL 59): anon hat Leserechte pro Spalte – die neue Spalte
-- braucht ein eigenes GRANT SELECT. Schreiben bleibt nur für Admins (public.is_admin()).

ALTER TABLE public.perfumes
  ADD COLUMN IF NOT EXISTS accords JSONB;

GRANT SELECT (accords) ON public.perfumes TO anon, authenticated;

NOTIFY pgrst, 'reload schema';

-- Kontrolle: sollte "true" zeigen.
SELECT has_column_privilege('anon', 'public.perfumes', 'accords', 'SELECT') AS duftrichtung_lesbar;
