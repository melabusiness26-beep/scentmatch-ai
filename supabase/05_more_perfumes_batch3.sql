-- ScentMatch AI: kuratierte Charge 3 – 15 neue Marken + 28 bekannte Duefte (inkl. Noten).
-- Faktenbasiert kuratiert (keine gescrapten Fragmente). Im Supabase SQL Editor ausfuehren.
-- Wiederholbar (on conflict do nothing -> keine Duplikate).

-- ============ 1) Neue Marken ============
insert into public.brands (name, slug, country) values
  ('Parfums de Marly',   'parfums-de-marly',   'Frankreich'),
  ('Xerjoff',            'xerjoff',            'Italien'),
  ('Initio',             'initio',             'Frankreich'),
  ('Kayali',             'kayali',             'VAE'),
  ('Byredo',             'byredo',             'Schweden'),
  ('Le Labo',            'le-labo',            'USA'),
  ('Jo Malone',          'jo-malone',          'UK'),
  ('Narciso Rodriguez',  'narciso-rodriguez',  'USA'),
  ('Guerlain',           'guerlain',           'Frankreich'),
  ('Issey Miyake',       'issey-miyake',       'Japan'),
  ('Davidoff',           'davidoff',           'Schweiz'),
  ('Carolina Herrera',   'carolina-herrera',   'Venezuela'),
  ('Tom Ford',           'tom-ford',           'USA'),
  ('Amouage',            'amouage',            'Oman'),
  ('Dolce & Gabbana',    'dolce-gabbana',      'Italien')
on conflict (name) do nothing;

-- ============ 2) 28 weitere Duefte (inkl. Noten) ============
insert into public.perfumes
  (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Parfums de Marly'),  'Layton',                  'pdm-layton',                   'Men',    'gourmand', 240, 9,  8, 92, 'Ganzjährig',    'Abend',  ARRAY['Apfel','Bergamotte','Mandarine'], ARRAY['Lavendel','Geranie','Veilchen','Jasmin'], ARRAY['Vanille','Sandelholz','Pfeffer','Kardamom']),
  ((select id from public.brands where name='Parfums de Marly'),  'Delina',                  'pdm-delina',                   'Women',  'floral',   230, 8,  7, 91, 'Frühling',      'Date',   ARRAY['Litchi','Rhabarber','Bergamotte'], ARRAY['Türkische Rose','Pfingstrose','Maiglöckchen'], ARRAY['Vanille','Moschus','Zedernholz']),
  ((select id from public.brands where name='Parfums de Marly'),  'Pegasus',                 'pdm-pegasus',                  'Men',    'gourmand', 235, 9,  8, 90, 'Ganzjährig',    'Abend',  ARRAY['Bittermandel','Bergamotte'], ARRAY['Heliotrop','Jasmin','Kümmel'], ARRAY['Vanille','Sandelholz','Amber','Vetiver']),
  ((select id from public.brands where name='Xerjoff'),           'Naxos',                   'xerjoff-naxos',                'Unisex', 'gourmand', 280, 9,  8, 92, 'Herbst/Winter', 'Abend',  ARRAY['Bergamotte','Lavendel','Zitrone'], ARRAY['Honig','Zimt','Jasmin','Salbei'], ARRAY['Tabak','Vanille','Tonkabohne']),
  ((select id from public.brands where name='Xerjoff'),           'Erba Pura',               'xerjoff-erba-pura',            'Unisex', 'gourmand', 270, 9,  8, 90, 'Ganzjährig',    'Date',   ARRAY['Orange','Zitrone','Bergamotte'], ARRAY['Früchte','Weiße Blüten'], ARRAY['Vanille','Amber','Moschus','Holz']),
  ((select id from public.brands where name='Initio'),            'Oud for Greatness',       'initio-oud-greatness',         'Unisex', 'woody',    300, 10, 9, 91, 'Herbst/Winter', 'Abend',  ARRAY['Safran','Lavendel','Muskat'], ARRAY['Oud'], ARRAY['Patchouli','Moschus']),
  ((select id from public.brands where name='Kayali'),            'Vanilla 28',              'kayali-vanilla-28',            'Women',  'gourmand', 120, 8,  7, 86, 'Herbst/Winter', 'Date',   ARRAY['Brauner Zucker','Bergamotte'], ARRAY['Vanille','Tonkabohne','Jasmin'], ARRAY['Moschus','Amber','Sandelholz']),
  ((select id from public.brands where name='Byredo'),            'Gypsy Water',             'byredo-gypsy-water',           'Unisex', 'woody',    200, 6,  6, 87, 'Frühling',      'Alltag', ARRAY['Bergamotte','Zitrone','Pfeffer','Wacholderbeere'], ARRAY['Weihrauch','Kiefernnadeln','Iris'], ARRAY['Amber','Sandelholz','Vanille']),
  ((select id from public.brands where name='Le Labo'),           'Santal 33',               'le-labo-santal-33',            'Unisex', 'woody',    220, 8,  7, 90, 'Ganzjährig',    'Alltag', ARRAY['Kardamom','Iris','Veilchen'], ARRAY['Sandelholz','Papyrus'], ARRAY['Zedernholz','Leder','Moschus']),
  ((select id from public.brands where name='Jo Malone'),         'Wood Sage & Sea Salt',    'jo-malone-wood-sage-sea-salt', 'Unisex', 'clean',    140, 6,  5, 85, 'Sommer',        'Alltag', ARRAY['Meeresalz'], ARRAY['Salbei'], ARRAY['Ambrette','Rotalge']),
  ((select id from public.brands where name='Jo Malone'),         'English Pear & Freesia',  'jo-malone-pear-freesia',       'Women',  'floral',   140, 6,  5, 85, 'Frühling',      'Alltag', ARRAY['Birne','Melone'], ARRAY['Freesie','Rose'], ARRAY['Patchouli','Rhabarber','Amber']),
  ((select id from public.brands where name='Narciso Rodriguez'), 'For Her',                 'narciso-for-her',              'Women',  'floral',   110, 7,  6, 86, 'Ganzjährig',    'Date',   ARRAY['Orangenblüte','Osmanthus'], ARRAY['Moschus','Amber'], ARRAY['Vanille','Patchouli','Vetiver']),
  ((select id from public.brands where name='Guerlain'),          'Mon Guerlain',            'mon-guerlain',                 'Women',  'gourmand', 120, 8,  7, 87, 'Ganzjährig',    'Date',   ARRAY['Bergamotte','Lavendel'], ARRAY['Jasmin Sambac'], ARRAY['Vanille','Tonkabohne','Sandelholz']),
  ((select id from public.brands where name='Guerlain'),          'La Petite Robe Noire',    'petite-robe-noire',            'Women',  'gourmand', 110, 7,  6, 85, 'Herbst/Winter', 'Date',   ARRAY['Kirsche','Mandel','Bergamotte'], ARRAY['Rose','Lakritz'], ARRAY['Vanille','Tonkabohne','Patchouli']),
  ((select id from public.brands where name='Issey Miyake'),      'L''Eau d''Issey Homme',   'leau-dissey-homme',            'Men',    'clean',    75,  7,  6, 85, 'Sommer',        'Alltag', ARRAY['Yuzu','Mandarine','Zitrone'], ARRAY['Muskatblüte','Seerose','Zimt'], ARRAY['Sandelholz','Vetiver','Tabak','Moschus']),
  ((select id from public.brands where name='Davidoff'),          'Cool Water',              'davidoff-cool-water',          'Men',    'clean',    50,  6,  6, 84, 'Sommer',        'Alltag', ARRAY['Minze','Lavendel','Grüne Noten','Bergamotte'], ARRAY['Geranie','Sandelholz','Neroli'], ARRAY['Moschus','Zedernholz','Amber','Tabak']),
  ((select id from public.brands where name='Carolina Herrera'),  '212 VIP Men',             '212-vip-men',                  'Men',    'gourmand', 85,  7,  7, 84, 'Winter',        'Abend',  ARRAY['Limette','Pfeffer','Ingwer'], ARRAY['Wodka','Minze'], ARRAY['Amber','Leder','Holz']),
  ((select id from public.brands where name='Tom Ford'),          'Tobacco Vanille',         'tobacco-vanille',              'Unisex', 'gourmand', 280, 9,  9, 93, 'Herbst/Winter', 'Abend',  ARRAY['Tabak','Gewürze'], ARRAY['Vanille','Kakao','Tonkabohne'], ARRAY['Trockenfrüchte','Holz']),
  ((select id from public.brands where name='Tom Ford'),          'Lost Cherry',             'lost-cherry',                  'Unisex', 'gourmand', 320, 8,  8, 90, 'Herbst/Winter', 'Date',   ARRAY['Schwarzkirsche','Bittermandel'], ARRAY['Türkische Rose','Jasmin'], ARRAY['Tonkabohne','Vanille','Sandelholz']),
  ((select id from public.brands where name='Tom Ford'),          'Black Orchid',            'black-orchid',                 'Unisex', 'floral',   150, 9,  9, 89, 'Herbst/Winter', 'Abend',  ARRAY['Trüffel','Schwarze Johannisbeere','Bergamotte'], ARRAY['Orchidee','Gewürze'], ARRAY['Patchouli','Vanille','Weihrauch','Sandelholz']),
  ((select id from public.brands where name='Chanel'),            'Coco Mademoiselle',       'coco-mademoiselle',            'Women',  'floral',   130, 8,  7, 91, 'Ganzjährig',    'Date',   ARRAY['Orange','Bergamotte'], ARRAY['Rose','Jasmin','Litchi'], ARRAY['Patchouli','Vetiver','Vanille','Moschus']),
  ((select id from public.brands where name='Lancome'),           'Idole',                   'lancome-idole',                'Women',  'floral',   100, 6,  6, 85, 'Frühling',      'Alltag', ARRAY['Bergamotte','Birne'], ARRAY['Rose','Jasmin'], ARRAY['Vanille','Weißer Moschus','Zedernholz']),
  ((select id from public.brands where name='Paco Rabanne'),      'Invictus',                'invictus',                     'Men',    'clean',    75,  6,  7, 84, 'Sommer',        'Alltag', ARRAY['Grapefruit','Meeresnote','Mandarine'], ARRAY['Lorbeer','Jasmin'], ARRAY['Guajakholz','Eichenmoos','Amber','Patchouli']),
  ((select id from public.brands where name='Dolce & Gabbana'),   'The One for Men',         'dg-the-one-men',               'Men',    'woody',    80,  7,  6, 85, 'Herbst/Winter', 'Abend',  ARRAY['Grapefruit','Koriander','Basilikum'], ARRAY['Kardamom','Ingwer','Orangenblüte'], ARRAY['Tabak','Amber','Zedernholz']),
  ((select id from public.brands where name='Versace'),           'Bright Crystal',          'bright-crystal',               'Women',  'floral',   70,  6,  6, 84, 'Frühling',      'Alltag', ARRAY['Granatapfel','Yuzu'], ARRAY['Pfingstrose','Magnolie','Lotus'], ARRAY['Moschus','Mahagoni','Amber']),
  ((select id from public.brands where name='Amouage'),           'Interlude Man',           'amouage-interlude-man',        'Men',    'woody',    300, 10, 9, 89, 'Herbst/Winter', 'Abend',  ARRAY['Bergamotte','Oregano','Pfeffer'], ARRAY['Weihrauch','Amber','Leder'], ARRAY['Oud','Sandelholz','Patchouli','Moschus']),
  ((select id from public.brands where name='Prada'),             'Luna Rossa Carbon',       'luna-rossa-carbon',            'Men',    'clean',    90,  8,  7, 86, 'Ganzjährig',    'Büro',   ARRAY['Bergamotte','Lavendel'], ARRAY['Pfeffer','Salbei'], ARRAY['Ambroxan','Patchouli','Zedernholz'])
on conflict (slug) do nothing;
