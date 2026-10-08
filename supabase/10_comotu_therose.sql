-- Add Comotù brand and THE ROSE perfume
-- Spanish brand, budget-friendly fruity-floral perfume

-- Insert brand if not exists
INSERT INTO public.brands (name, slug, country, description, created_at)
VALUES (
  'Comotù',
  'comotu',
  'Spanien',
  'Spanische Parfümerie mit fruchtigen und floralen Düften',
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- Get brand_id for Comotù
WITH brand_data AS (
  SELECT id FROM public.brands WHERE slug = 'comotu'
)
-- Insert THE ROSE perfume
INSERT INTO public.perfumes (
  brand_id,
  perfume_name,
  slug,
  gender,
  fragrance_family,
  top_notes,
  heart_notes,
  base_notes,
  price_chf,
  longevity,
  sillage,
  scentmatch_score,
  season,
  occasion,
  description,
  image_url,
  affiliate_url,
  created_at
)
SELECT
  bd.id,
  'THE ROSE',
  'the-rose-comotu',
  'Women',
  'floral',
  ARRAY['Himbeere', 'Frambuesa'],
  ARRAY['Rose', 'Rosa'],
  ARRAY['Vanille', 'Vainilla'],
  10,
  6,
  5,
  72,
  'Ganzjährig',
  ARRAY['Alltag', 'Date'],
  'THE ROSE von Comotù ist ein zartes fruchtiges Floral mit Himbeere in der Kopfnote, Rose im Herzen und wärmender Vanille in der Basis. Ein günstiger, alltäglicher Duft mit femininem Charakter und moderatem Ausstrahlung.',
  NULL,
  NULL,
  NOW()
FROM brand_data
ON CONFLICT (slug) DO NOTHING;
