-- 65_discontinued.sql
-- „Nicht mehr erhältlich": Düfte, die nicht mehr hergestellt werden (z. B. Rochas Macassar),
-- bleiben als Ausgangsduft im Katalog. Ihre Seite zeigt dann keinen Kauf-Knopf, sondern
-- „Das kannst du stattdessen kaufen". Empfohlen werden sie nirgends (Quiz, Listen, Geschenk-Finder).
-- Standard ist false: Alle bisherigen Düfte gelten weiter als erhältlich.
-- Wichtig (gelernt bei SQL 59): anon hat Leserechte pro Spalte – die neue Spalte
-- braucht ein eigenes GRANT SELECT. Schreiben bleibt nur für Admins (public.is_admin()).

ALTER TABLE public.perfumes
  ADD COLUMN IF NOT EXISTS discontinued BOOLEAN NOT NULL DEFAULT false;

GRANT SELECT (discontinued) ON public.perfumes TO anon, authenticated;

NOTIFY pgrst, 'reload schema';

-- Kontrolle: sollte "true" zeigen.
SELECT has_column_privilege('anon', 'public.perfumes', 'discontinued', 'SELECT') AS status_lesbar;
