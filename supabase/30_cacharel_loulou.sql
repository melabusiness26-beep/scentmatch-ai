-- Add Cacharel Lou Lou to perfumes catalog

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
  description
) VALUES (
  (SELECT id FROM public.brands WHERE name = 'Cacharel'),
  'Lou Lou',
  'cacharel-lou-lou',
  'Women',
  'floral',
  ARRAY['Bergamotte', 'Pfirsich', 'Litschi'],
  ARRAY['Veilchen', 'Jasmin', 'Tulpe'],
  ARRAY['Moschus', 'Sandelholz', 'Amber'],
  35,
  7,
  6,
  82,
  'Ganzjährig',
  'Alltag, Date, Büro',
  'Ein frischer, mädchenhafter Duft mit fruchtigen Noten in florale Herznoten. Lou Lou ist verspielt, jugendlich und leicht - perfekt für Alltag und romantische Momente. Moschus und Sandelholz geben dem Duft Eleganz und Haltbarkeit.'
);
