-- 60_good_to_know.sql
-- „Gut zu wissen": 1–2 echte, belegbare Fakten pro Duft (je Zeile einer),
-- erscheinen als kleiner Kasten auf der Duft-Seite. Freiwillig.
-- Wichtig (gelernt bei SQL 59): anon hat Leserechte pro Spalte – neue Spalten
-- brauchen ein eigenes GRANT SELECT, sonst sieht die öffentliche Seite sie nicht.
-- Schreiben bleibt wie bisher nur für Admins (Policies mit public.is_admin()).

ALTER TABLE public.perfumes
  ADD COLUMN IF NOT EXISTS good_to_know TEXT;

GRANT SELECT (good_to_know) ON public.perfumes TO anon, authenticated;

NOTIFY pgrst, 'reload schema';

-- Kontrolle: sollte "true" zeigen.
SELECT has_column_privilege('anon', 'public.perfumes', 'good_to_know', 'SELECT') AS gut_zu_wissen_lesbar;
