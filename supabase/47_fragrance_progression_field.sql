-- 47_fragrance_progression_field.sql
--
-- Add fragrance progression/development field
-- Describes how the scent evolves over time (opening → heart → dry-down)

ALTER TABLE public.perfumes
  ADD COLUMN IF NOT EXISTS fragrance_progression TEXT;

-- Index for performance
CREATE INDEX IF NOT EXISTS idx_fragrance_progression ON public.perfumes(fragrance_progression);

-- RLS: public read
ALTER POLICY "Public read on perfumes" ON public.perfumes USING (true);

-- Grants
GRANT SELECT ON public.perfumes TO anon, authenticated;
GRANT UPDATE ON public.perfumes TO authenticated;

-- Verify column exists
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'perfumes' AND column_name = 'fragrance_progression';
