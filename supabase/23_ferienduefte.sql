-- Auressa: Charge 23 – Ferien-/Sommerdüfte ("riecht nach Sommerurlaub").
-- Für das Ranking-Video "Düfte, die riechen wie teure Sommerferien" (Nr. 1 = günstiger Geheimtipp).
-- Noten faktenbasiert geprüft (Fragrantica), eigene Daten/Texte. Preise ca. (CHF, gerundet).
-- Neue Marken werden via on conflict (name) do nothing mit angelegt; bestehende ignoriert.
-- HINWEIS: Tom Ford 'Soleil Blanc' (slug tf-soleil-blanc, Charge 12) und
-- Estée Lauder 'Bronze Goddess' (slug bronze-goddess, Charge 09) existieren BEREITS
-- und wurden hier bewusst WEGGELASSEN, um Duplikate zu vermeiden. Neu sind nur die 3 unten.
-- Im Supabase SQL Editor ausführen. Wiederholbar (on conflict do nothing).

-- ============ 1) Marken (bestehende werden ignoriert) ============
insert into public.brands (name, slug, country) values
  ('Tom Ford',       'tom-ford',       'USA'),
  ('Guerlain',       'guerlain',       'Frankreich'),
  ('Estée Lauder',   'estee-lauder',   'USA'),
  ('Sol de Janeiro', 'sol-de-janeiro', 'Brasilien'),
  ('Rayhaan',        'rayhaan',        'VAE')
on conflict (name) do nothing;

-- ============ 2) Düfte (inkl. Noten) ============
insert into public.perfumes
  (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Guerlain'),       'Terracotta le Parfum',   'guerlain-terracotta-le-parfum','Women',  'floral',   85,  6, 6, 85, 'Sommer', 'Alltag', ARRAY['Tiaré-Blüte','Kokosnuss','Bergamotte'], ARRAY['Jasmin','Ylang-Ylang','Orangenblüte'], ARRAY['Vanille','Moschus']),
  ((select id from public.brands where name='Sol de Janeiro'), 'Cheirosa 39',            'sol-de-janeiro-cheirosa-39', 'Women',  'gourmand', 35,  5, 5, 83, 'Sommer', 'Alltag', ARRAY['Kokosnuss'], ARRAY['Tropische Orchidee'], ARRAY['Praline','Vanille']),
  ((select id from public.brands where name='Rayhaan'),        'Aquatica',               'rayhaan-aquatica',           'Unisex', 'gourmand', 30,  7, 6, 84, 'Sommer', 'Alltag', ARRAY['Limette','Kokosmilch','Bergamotte','Mandarine'], ARRAY['Zuckerrohr','Jasmin','Hibiskus','Gardenie'], ARRAY['Rum','Moschus','Tonkabohne','Patchouli'])
on conflict (slug) do nothing;
