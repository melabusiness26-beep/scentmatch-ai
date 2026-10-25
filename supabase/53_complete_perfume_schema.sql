-- 53_complete_perfume_schema.sql
-- Complete Perfume Database Schema with Premium Fields
-- Adds concentration, year, volume, rating, flacon description, similar perfumes, age group, lifestyle

-- Add new columns to perfumes table
ALTER TABLE public.perfumes
ADD COLUMN IF NOT EXISTS concentration VARCHAR(50), -- EdP, EdT, EdC, Parfum, EDP, EDT
ADD COLUMN IF NOT EXISTS release_year INT,
ADD COLUMN IF NOT EXISTS volume_ml INT,
ADD COLUMN IF NOT EXISTS rating INT, -- 0-100 score
ADD COLUMN IF NOT EXISTS flacon_description TEXT,
ADD COLUMN IF NOT EXISTS similar_perfumes TEXT[], -- Array of perfume slugs
ADD COLUMN IF NOT EXISTS age_group VARCHAR(50), -- 18-25, 25-35, 35-40, all
ADD COLUMN IF NOT EXISTS lifestyle VARCHAR(100), -- student, professional, party, casual, sporty
ADD COLUMN IF NOT EXISTS trend_vibe VARCHAR(50), -- trendy, classic, niche, popular
ADD COLUMN IF NOT EXISTS gender_nuance VARCHAR(100); -- masculine, feminine, androgynous, sporty-feminine

-- Ensure grants for these columns
GRANT SELECT ON public.perfumes TO anon, authenticated;
GRANT INSERT, UPDATE ON public.perfumes TO authenticated;

-- Verify schema
SELECT column_name, data_type FROM information_schema.columns
WHERE table_name = 'perfumes'
ORDER BY ordinal_position;
