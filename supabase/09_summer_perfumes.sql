-- ScentMatch AI: Sommer-Charge – frische Sommerduefte mit Fokus auf Damenduefte.
-- Im Supabase SQL Editor ausfuehren. Wiederholbar (on conflict do nothing).

-- ============ 1) Neue Marken ============
insert into public.brands (name, slug, country) values
  ('Estée Lauder',    'estee-lauder',    'USA'),
  ('Acqua di Parma',  'acqua-di-parma',  'Italien')
on conflict (name) do nothing;

-- ============ 2) Sommerduefte (inkl. Noten) ============
insert into public.perfumes
  (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Chanel'),           'Chance Eau Fraiche',          'chance-eau-fraiche',     'Women',  'clean',  130, 6, 6, 87, 'Sommer', 'Alltag', ARRAY['Zitrone','Zeder'], ARRAY['Wasserjasmin','Teakholz'], ARRAY['Amber','Patchouli','Weißer Moschus']),
  ((select id from public.brands where name='Marc Jacobs'),      'Daisy Eau So Fresh',          'daisy-eau-so-fresh',     'Women',  'floral', 90,  6, 5, 86, 'Sommer', 'Alltag', ARRAY['Grapefruit','Himbeere','Birne'], ARRAY['Wildrose','Veilchen','Apfelblüte'], ARRAY['Moschus','Zedernholz','Pflaume']),
  ((select id from public.brands where name='Estée Lauder'),     'Bronze Goddess',              'bronze-goddess',         'Women',  'floral', 75,  6, 6, 86, 'Sommer', 'Alltag', ARRAY['Bergamotte','Mandarine'], ARRAY['Orangenblüte','Jasmin','Kokosnuss'], ARRAY['Amber','Vanille','Sandelholz']),
  ((select id from public.brands where name='Dolce & Gabbana'),  'Dolce Shine',                 'dolce-shine',            'Women',  'floral', 90,  6, 6, 84, 'Sommer', 'Date',   ARRAY['Mango','Neroli'], ARRAY['Frangipani','Wasserlilie'], ARRAY['Sandelholz','Moschus']),
  ((select id from public.brands where name='Versace'),          'Dylan Turquoise',             'dylan-turquoise',        'Women',  'clean',  75,  6, 6, 84, 'Sommer', 'Alltag', ARRAY['Zitrone','Rosa Pfeffer','Guave'], ARRAY['Freesie','Jasmin','Seerose'], ARRAY['Moschus','Holz','Amber']),
  ((select id from public.brands where name='Jo Malone'),        'Nectarine Blossom & Honey',   'jo-malone-nectarine-honey','Women', 'floral', 140, 6, 5, 85, 'Sommer', 'Alltag', ARRAY['Grüne Noten','Pfirsich','Nektarine'], ARRAY['Akazienhonig','Pflaume','Limette'], ARRAY['Pfingstrose','Moschus']),
  ((select id from public.brands where name='Carolina Herrera'), '212 Women',                   'ch-212-women',           'Women',  'floral', 80,  6, 6, 83, 'Sommer', 'Date',   ARRAY['Bergamotte','Gardenie'], ARRAY['Pfingstrose','Jasmin','Lilie'], ARRAY['Sandelholz','Moschus','Amber']),
  ((select id from public.brands where name='Maison Margiela'),  'Replica Beach Walk',          'replica-beach-walk',     'Unisex', 'clean',  130, 6, 6, 87, 'Sommer', 'Alltag', ARRAY['Bergamotte','Zitrone','Rosa Pfeffer'], ARRAY['Ylang-Ylang','Kokosmilch','Heliotrop'], ARRAY['Moschus','Zedernholz','Benzoe']),
  ((select id from public.brands where name='Prada'),            'Luna Rossa',                  'luna-rossa',             'Men',    'clean',  80,  7, 6, 85, 'Sommer', 'Alltag', ARRAY['Lavendel','Bitterorange'], ARRAY['Pfefferminze','Salbei'], ARRAY['Ambroxan','Vanille']),
  ((select id from public.brands where name='Acqua di Parma'),   'Colonia',                     'adp-colonia',            'Unisex', 'clean',  130, 6, 6, 86, 'Sommer', 'Büro',   ARRAY['Zitrone','Bergamotte','Orange','Neroli'], ARRAY['Lavendel','Rosmarin','Verbene'], ARRAY['Patchouli','Vetiver','Moschus']),
  ((select id from public.brands where name='Dolce & Gabbana'),  'Light Blue Pour Homme',       'light-blue-homme',       'Men',    'clean',  75,  6, 6, 85, 'Sommer', 'Alltag', ARRAY['Grapefruit','Bergamotte','Mandarine'], ARRAY['Pfeffer','Rosmarin','Palisander'], ARRAY['Moschus','Weihrauch','Eichenmoos'])
on conflict (slug) do nothing;
