-- Auressa: Gegenstueck-Nachtrag – Cerruti 1881 pour Femme (Damen).
-- Marke Cerruti existiert bereits. Im Supabase SQL Editor ausfuehren.
-- Wiederholbar: on conflict (slug) do nothing.

insert into public.perfumes
  (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Cerruti'), '1881 pour Femme', 'cerruti-1881-femme', 'Women', 'floral', 40, 6, 5, 80, 'Frühling', 'Alltag', ARRAY['Mandarine','Tagetes','Bergamotte'], ARRAY['Jasmin','Ylang-Ylang','Kardamom'], ARRAY['Sandelholz','Zedernholz','Moschus'])
on conflict (slug) do nothing;
