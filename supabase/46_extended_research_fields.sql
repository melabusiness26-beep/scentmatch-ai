-- 46_extended_research_fields.sql
--
-- ERWEITERTE RESEARCH-FELDER für vollständiges Pro-Status-Daten-System
-- Fügt alle wichtigen Felder für die Auto-Recherchiere hinzu
-- + Auto-Tagging basierend auf recherchierten Daten

-- Neue Spalten hinzufügen
ALTER TABLE public.perfumes
  ADD COLUMN IF NOT EXISTS launch_year INTEGER,
  ADD COLUMN IF NOT EXISTS volume_ml INTEGER,
  ADD COLUMN IF NOT EXISTS niche_vs_mass_market VARCHAR(50) DEFAULT 'mass_market',
  ADD COLUMN IF NOT EXISTS awards TEXT,
  ADD COLUMN IF NOT EXISTS official_website VARCHAR(500),
  ADD COLUMN IF NOT EXISTS availability_status VARCHAR(50) DEFAULT 'available',
  ADD COLUMN IF NOT EXISTS gender_nuance VARCHAR(100),
  ADD COLUMN IF NOT EXISTS comparable_fragrances TEXT,
  ADD COLUMN IF NOT EXISTS concentration_detail TEXT;

-- Indizes für Performance
CREATE INDEX IF NOT EXISTS idx_launch_year ON public.perfumes(launch_year);
CREATE INDEX IF NOT EXISTS idx_niche_vs_mass ON public.perfumes(niche_vs_mass_market);
CREATE INDEX IF NOT EXISTS idx_availability ON public.perfumes(availability_status);

-- RLS Policies für neue Felder (öffentliches Lesen)
ALTER POLICY "Public read on perfumes" ON public.perfumes USING (true);

-- Grants für anon user (Lesen)
GRANT SELECT ON public.perfumes TO anon;
GRANT SELECT ON public.perfumes TO authenticated;

-- Grants für authenticated user (Schreiben)
GRANT INSERT, UPDATE ON public.perfumes TO authenticated;

-- Verified check: Alle neuen Spalten existieren
SELECT
  column_name,
  data_type
FROM information_schema.columns
WHERE table_name = 'perfumes'
  AND column_name IN (
    'launch_year', 'volume_ml', 'niche_vs_mass_market',
    'awards', 'official_website', 'availability_status',
    'gender_nuance', 'comparable_fragrances', 'concentration_detail'
  )
ORDER BY ordinal_position;
