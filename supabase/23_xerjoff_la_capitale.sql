-- ScentMatch AI: Einzel-Nachtrag – Xerjoff "La Capitale".
-- Beruehmter Erdbeer-Marmelade-Duft: Erdbeere ist offizielle Kopfnote
-- (Quelle: Fragrantica). Passt zur Erdbeer-/Suess-Duft-Kampagne.
-- Im Supabase SQL Editor ausfuehren. Wiederholbar (on conflict do nothing).
-- Marke "Xerjoff" existiert bereits (siehe 05_more_perfumes_batch3.sql).

insert into public.perfumes
  (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Xerjoff'), 'La Capitale', 'xerjoff-la-capitale', 'Unisex', 'gourmand', 210, 8, 8, 90, 'Ganzjährig', 'Date', ARRAY['Erdbeere','Karamell','Pfirsich','Labdanum'], ARRAY['Leder','Amber','Safran','Rose','Ingwer'], ARRAY['Bourbon-Vanille','Benzoe'])
on conflict (slug) do nothing;
