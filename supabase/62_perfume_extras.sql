-- 62_perfume_extras.sql
-- Zusatzangaben pro Duft für die Duft-Seite (alle freiwillig):
--   sizes            – Grössen & Richtpreise, z. B. [{"ml": 40, "price_chf": 14.99}, …]
--   alternative_to   – „bekannte günstige Alternative zu …", z. B. [{"name": "…", "brand": "…"}]
--   flacon_designer  – wer den Flakon gestaltet hat
-- similar_perfumes und flacon_description gibt es schon – sie bekommen hier nur Leserechte.
-- Wichtig (gelernt bei SQL 59): anon hat Leserechte pro Spalte – neue Spalten
-- brauchen ein eigenes GRANT SELECT, sonst sieht die öffentliche Seite sie nicht.
-- Schreiben bleibt wie bisher nur für Admins (Policies mit public.is_admin()).

ALTER TABLE public.perfumes
  ADD COLUMN IF NOT EXISTS sizes JSONB,
  ADD COLUMN IF NOT EXISTS alternative_to JSONB,
  ADD COLUMN IF NOT EXISTS flacon_designer TEXT;

GRANT SELECT (sizes, alternative_to, flacon_designer, similar_perfumes, flacon_description)
  ON public.perfumes TO anon, authenticated;

NOTIFY pgrst, 'reload schema';

-- Kontrolle: sollte dreimal "true" zeigen.
SELECT
  has_column_privilege('anon', 'public.perfumes', 'sizes', 'SELECT') AS groessen_lesbar,
  has_column_privilege('anon', 'public.perfumes', 'alternative_to', 'SELECT') AS alternative_lesbar,
  has_column_privilege('anon', 'public.perfumes', 'flacon_designer', 'SELECT') AS flakon_design_lesbar;
