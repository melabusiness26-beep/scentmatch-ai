-- 59_background_read_access.sql
-- Problem: Im Admin (angemeldet) liessen sich Parfümeur/Inspiration speichern,
-- die öffentliche Duft-Seite (Rolle anon) konnte sie aber nicht lesen – das
-- Erscheinungsjahr schon. Typische Ursache: Leserechte für anon sind pro Spalte
-- vergeben, neue Spalten bekommen dann kein Leserecht automatisch.
-- Lösung: genau diese zwei Spalten öffentlich lesbar machen (wie alle anderen
-- Duft-Infos auch). Schreiben bleibt unverändert nur für Admins.

GRANT SELECT (perfumer, inspiration) ON public.perfumes TO anon, authenticated;

-- Die Datenbank-Schnittstelle (PostgREST) soll die neuen Spalten sofort kennen.
NOTIFY pgrst, 'reload schema';

-- Kontrolle: Für anon sollte bei allen drei Spalten "true" stehen.
SELECT
  has_column_privilege('anon', 'public.perfumes', 'release_year', 'SELECT') AS jahr_lesbar,
  has_column_privilege('anon', 'public.perfumes', 'perfumer', 'SELECT')     AS parfuemeur_lesbar,
  has_column_privilege('anon', 'public.perfumes', 'inspiration', 'SELECT')  AS inspiration_lesbar;
