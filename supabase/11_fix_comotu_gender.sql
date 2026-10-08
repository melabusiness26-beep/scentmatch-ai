-- Fix gender field for Comotù THE ROSE
-- Should be 'Women' not 'Unisex'

UPDATE public.perfumes
SET gender = 'Women'
WHERE slug = 'the-rose-comotu' AND perfume_name = 'THE ROSE';
