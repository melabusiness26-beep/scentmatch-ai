-- ScentMatch AI: Erdbeer-Charge – weitere Duefte mit Erdbeere als gelisteter Note.
-- Alle Noten sind faktenbasiert (Quelle: Fragrantica). Passt zur Erdbeer-Kampagne.
-- Im Supabase SQL Editor ausfuehren. Wiederholbar (on conflict do nothing).

-- ============ 1) Neue Marke ============
insert into public.brands (name, slug, country) values
  ('Aquolina', 'aquolina', 'Italien')
on conflict (name) do nothing;

-- ============ 2) Erdbeer-Duefte (Escada & Kayali existieren bereits) ============
insert into public.perfumes
  (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Aquolina'), 'Pink Sugar', 'aquolina-pink-sugar', 'Women', 'gourmand', 40, 7, 7, 84, 'Ganzjährig', 'Alltag', ARRAY['Himbeere','Orange','Feigenblatt','Bergamotte'], ARRAY['Zuckerwatte','Lakritz','Rote Früchte','Erdbeere','Maiglöckchen'], ARRAY['Karamell','Vanille','Moschus','Tonkabohne','Sandelholz']),
  ((select id from public.brands where name='Escada'), 'Sorbetto Rosso', 'escada-sorbetto-rosso', 'Women', 'gourmand', 50, 5, 5, 82, 'Sommer', 'Alltag', ARRAY['Birne','Calone','Mandarine'], ARRAY['Wassermelone','Wässrige Noten','Erdbeere','Apfel','Meersalz','Tiaré','Rose'], ARRAY['Praline','Moschus','Amber']),
  ((select id from public.brands where name='Kayali'), 'Yum Boujee Marshmallow 81', 'kayali-boujee-marshmallow-81', 'Women', 'gourmand', 130, 8, 7, 86, 'Ganzjährig', 'Date', ARRAY['Pink Lady Apfel','Zitrone','Freesie','Nektarinenblüte'], ARRAY['Orangenblüte','Marshmallow','Erdbeere','Kokosflocken'], ARRAY['Vanille','Himbeerzucker','Pink Moschus','Ambroxan'])
on conflict (slug) do nothing;
