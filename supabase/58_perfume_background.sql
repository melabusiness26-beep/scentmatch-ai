-- 58_perfume_background.sql
-- Hintergrund-Infos für den automatischen Duft-Text (Detailseite):
-- Parfümeur und Inspiration. Das Erscheinungsjahr (release_year) gibt es schon.
-- Beide Felder sind freiwillig; leer = der Satz entfällt einfach.
-- Rechte: Die bestehenden Tabellen-Rechte und Policies (Lesen für alle,
-- Schreiben nur für Admins über public.is_admin()) gelten automatisch auch
-- für neue Spalten – hier ist nichts weiter nötig.

ALTER TABLE public.perfumes
  ADD COLUMN IF NOT EXISTS perfumer TEXT,
  ADD COLUMN IF NOT EXISTS inspiration TEXT;

-- Kontrolle: sollte 3 Zeilen zeigen (inspiration, perfumer, release_year).
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'perfumes'
  AND column_name IN ('perfumer', 'inspiration', 'release_year')
ORDER BY column_name;
