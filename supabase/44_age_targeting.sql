-- 44_age_targeting.sql
--
-- Add age-group targeting columns to the perfumes table.
-- This enables filtering and matching by user age groups (18-25, 25-35, 35-40)
-- and lifestyle categories (student, professional, party, casual, sporty).

-- Add columns to perfumes table
ALTER TABLE public.perfumes ADD COLUMN IF NOT EXISTS age_group VARCHAR(50);
ALTER TABLE public.perfumes ADD COLUMN IF NOT EXISTS lifestyle VARCHAR(100);
ALTER TABLE public.perfumes ADD COLUMN IF NOT EXISTS trend_vibe VARCHAR(50);
ALTER TABLE public.perfumes ADD COLUMN IF NOT EXISTS gender_nuance VARCHAR(100);

-- Set default values (will be auto-tagged by application logic)
ALTER TABLE public.perfumes ALTER COLUMN age_group SET DEFAULT 'all';
ALTER TABLE public.perfumes ALTER COLUMN lifestyle SET DEFAULT 'all';
ALTER TABLE public.perfumes ALTER COLUMN trend_vibe SET DEFAULT 'classic';
ALTER TABLE public.perfumes ALTER COLUMN gender_nuance SET DEFAULT NULL;

-- Ensure grants for anonymous/authenticated users to read these new columns
GRANT SELECT ON public.perfumes TO anon, authenticated;

-- Allow admin (authenticated) to update these new columns
GRANT UPDATE (age_group, lifestyle, trend_vibe, gender_nuance) ON public.perfumes TO authenticated;

-- Create a simple index on age_group for faster filtering
CREATE INDEX IF NOT EXISTS idx_perfumes_age_group ON public.perfumes(age_group);
CREATE INDEX IF NOT EXISTS idx_perfumes_lifestyle ON public.perfumes(lifestyle);

-- Verify the table structure
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'perfumes'
ORDER BY ordinal_position;
