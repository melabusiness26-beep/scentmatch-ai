-- Auressa: Charge 14 – zwei Oud-Düfte (Tom Ford Oud Wood + Lattafa Oud for Glory).
-- Faktenbasiert kuratiert. Im Supabase SQL Editor ausfuehren.
-- Marken (Tom Ford, Lattafa) existieren bereits.
-- Wiederholbar: perfumes -> on conflict (slug) do nothing.
-- Hinweise zu den Werten:
--   price_chf  = ungefaehrer, oeffentlich bekannter Richtpreis (kann je nach Shop abweichen).
--   longevity/sillage = allgemein dokumentierte Duftcharakteristik, keine Nutzerbewertungen.
--   scentmatch_score = interner Auressa-Kuratierungswert (wie bei allen Katalog-Eintraegen).
--   image_url / affiliate_url bleiben leer (NULL), bis echte Daten vorliegen.

insert into public.perfumes
  (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Tom Ford'), 'Oud Wood',       'tom-ford-oud-wood',     'Unisex', 'woody', 250, 7, 6, 90, 'Herbst/Winter', 'Abend', ARRAY['Roséholz','Kardamom','Pfeffer'], ARRAY['Oud','Sandelholz','Vetiver'], ARRAY['Tonkabohne','Vanille','Amber']),
  ((select id from public.brands where name='Lattafa'),  'Oud for Glory',  'lattafa-oud-for-glory', 'Unisex', 'woody',  35, 8, 8, 84, 'Herbst/Winter', 'Abend', ARRAY['Safran','Muskatnuss'], ARRAY['Oud','Patchouli'], ARRAY['Amber','Rauchiges Holz'])
on conflict (slug) do nothing;
