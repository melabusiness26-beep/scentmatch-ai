-- ScentMatch AI: Geheimtipp-Charge – 14 neue Nischen-Marken + 22 seltene Duefte (inkl. Noten).
-- Bewusst weniger bekannte Nischenduefte ("nicht jeder hat sie"). Faktenbasiert kuratiert.
-- Im Supabase SQL Editor ausfuehren. Wiederholbar (on conflict do nothing).

-- ============ 1) Neue Nischen-Marken ============
insert into public.brands (name, slug, country) values
  ('Marc-Antoine Barrois',        'marc-antoine-barrois',  'Frankreich'),
  ('BDK Parfums',                 'bdk-parfums',           'Frankreich'),
  ('Maison Crivelli',             'maison-crivelli',       'Frankreich'),
  ('Imaginary Authors',           'imaginary-authors',     'USA'),
  ('Zoologist',                   'zoologist',             'Kanada'),
  ('Stéphane Humbert Lucas 777',  'shl-777',               'Frankreich'),
  ('Mind Games',                  'mind-games',            'UK'),
  ('Memo Paris',                  'memo-paris',            'Frankreich'),
  ('Frederic Malle',              'frederic-malle',        'Frankreich'),
  ('Nasomatto',                   'nasomatto',             'Italien'),
  ('Orto Parisi',                 'orto-parisi',           'Italien'),
  ('Vilhelm Parfumerie',          'vilhelm-parfumerie',    'USA'),
  ('Masque Milano',               'masque-milano',         'Italien'),
  ('Roja Parfums',                'roja-parfums',          'UK')
on conflict (name) do nothing;

-- ============ 2) 22 seltene Nischen-Duefte (inkl. Noten) ============
insert into public.perfumes
  (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Marc-Antoine Barrois'),       'Ganymede',            'barrois-ganymede',         'Unisex', 'woody',    230, 9,  8, 91, 'Ganzjährig',    'Abend',  ARRAY['Mandarine','Safran'], ARRAY['Veilchen','Leder'], ARRAY['Ambrette','Holz','Mineralnoten']),
  ((select id from public.brands where name='Marc-Antoine Barrois'),       'B683',                'barrois-b683',             'Men',    'woody',    230, 9,  8, 90, 'Herbst/Winter', 'Abend',  ARRAY['Pfeffer','Kardamom'], ARRAY['Leder','Zedernholz'], ARRAY['Amber','Patchouli','Moschus']),
  ((select id from public.brands where name='BDK Parfums'),                'Gris Charnel',        'bdk-gris-charnel',         'Unisex', 'woody',    180, 8,  7, 89, 'Ganzjährig',    'Date',   ARRAY['Schwarzer Tee','Bergamotte'], ARRAY['Kardamom','Sesam','Feige'], ARRAY['Sandelholz','Vetiver','Tonkabohne']),
  ((select id from public.brands where name='BDK Parfums'),                'Rouge Smoking',       'bdk-rouge-smoking',        'Women',  'gourmand', 180, 8,  7, 88, 'Herbst/Winter', 'Date',   ARRAY['Brombeere','Bergamotte'], ARRAY['Iris','Mandel'], ARRAY['Vanille','Moschus','Tonkabohne']),
  ((select id from public.brands where name='Nishane'),                    'Ani',                 'nishane-ani',              'Unisex', 'gourmand', 200, 9,  8, 89, 'Ganzjährig',    'Date',   ARRAY['Bergamotte','Kardamom'], ARRAY['Jasmin','Orangenblüte'], ARRAY['Vanille','Tonkabohne','Sandelholz','Moschus']),
  ((select id from public.brands where name='Maison Crivelli'),            'Hibiscus Mahajad',    'crivelli-hibiscus-mahajad','Unisex', 'floral',   190, 8,  7, 88, 'Frühling',      'Date',   ARRAY['Hibiskus','Rosa Pfeffer','Birne'], ARRAY['Rose','Osmanthus'], ARRAY['Oud','Patchouli','Amber']),
  ((select id from public.brands where name='Imaginary Authors'),          'Saint Julep',         'imaginary-saint-julep',    'Unisex', 'clean',    110, 6,  5, 86, 'Sommer',        'Alltag', ARRAY['Minze','Limette'], ARRAY['Bourbon','Grünes Gras'], ARRAY['Zedernholz','Moschus']),
  ((select id from public.brands where name='Imaginary Authors'),          'A City on Fire',      'imaginary-city-on-fire',   'Unisex', 'woody',    120, 8,  7, 87, 'Herbst/Winter', 'Abend',  ARRAY['Schwarzer Pfeffer','Lorbeer'], ARRAY['Rauch','Birke'], ARRAY['Vetiver','Patchouli','Leder']),
  ((select id from public.brands where name='Zoologist'),                  'Tyrannosaurus Rex',   'zoologist-trex',           'Unisex', 'gourmand', 180, 9,  8, 87, 'Winter',        'Abend',  ARRAY['Honig','Eisen'], ARRAY['Vanille','Amber'], ARRAY['Moschus','Holz','Mineralnoten']),
  ((select id from public.brands where name='Stéphane Humbert Lucas 777'), 'O Hira',              'shl-o-hira',               'Unisex', 'gourmand', 320, 10, 9, 89, 'Herbst/Winter', 'Abend',  ARRAY['Safran','Pflaume'], ARRAY['Rose','Vanille'], ARRAY['Amber','Moschus','Sandelholz']),
  ((select id from public.brands where name='Mind Games'),                 'King',                'mind-games-king',          'Men',    'woody',    250, 9,  8, 88, 'Herbst/Winter', 'Abend',  ARRAY['Bergamotte','Safran'], ARRAY['Oud','Rose'], ARRAY['Amber','Leder','Patchouli']),
  ((select id from public.brands where name='Memo Paris'),                 'African Leather',     'memo-african-leather',     'Unisex', 'woody',    230, 9,  8, 88, 'Herbst/Winter', 'Abend',  ARRAY['Safran','Kardamom','Karotte'], ARRAY['Leder','Geranie','Oud'], ARRAY['Moschus','Holz']),
  ((select id from public.brands where name='Memo Paris'),                 'Lalibela',            'memo-lalibela',            'Women',  'floral',   230, 8,  7, 87, 'Ganzjährig',    'Date',   ARRAY['Mandarine','Veilchenblatt'], ARRAY['Tuberose','Jasmin','Ylang-Ylang'], ARRAY['Benzoe','Tonkabohne','Vanille']),
  ((select id from public.brands where name='Frederic Malle'),             'Portrait of a Lady',  'malle-portrait-lady',      'Women',  'floral',   290, 10, 9, 92, 'Herbst/Winter', 'Abend',  ARRAY['Schwarze Johannisbeere','Himbeere','Nelke'], ARRAY['Türkische Rose','Patchouli'], ARRAY['Sandelholz','Weihrauch','Amber','Moschus']),
  ((select id from public.brands where name='Frederic Malle'),             'Musc Ravageur',       'malle-musc-ravageur',      'Unisex', 'gourmand', 270, 9,  8, 89, 'Herbst/Winter', 'Abend',  ARRAY['Bergamotte','Mandarine','Lavendel'], ARRAY['Zimt','Gewürznelke'], ARRAY['Vanille','Moschus','Amber','Sandelholz']),
  ((select id from public.brands where name='Nasomatto'),                  'Black Afgano',        'nasomatto-black-afgano',   'Unisex', 'woody',    180, 10, 9, 88, 'Winter',        'Abend',  ARRAY['Cannabis','Grüne Noten'], ARRAY['Oud','Harze'], ARRAY['Tabak','Kaffee','Patchouli']),
  ((select id from public.brands where name='Orto Parisi'),                'Megamare',            'orto-megamare',            'Unisex', 'clean',    190, 9,  8, 89, 'Sommer',        'Date',   ARRAY['Meeresalge','Salz'], ARRAY['Amber','Mineralnoten'], ARRAY['Moschus','Holz']),
  ((select id from public.brands where name='Vilhelm Parfumerie'),         'Mango Skin',          'vilhelm-mango-skin',       'Unisex', 'gourmand', 170, 7,  6, 87, 'Sommer',        'Date',   ARRAY['Mango','Cassis','Bergamotte'], ARRAY['Rose','Osmanthus'], ARRAY['Sandelholz','Moschus','Amber']),
  ((select id from public.brands where name='Masque Milano'),              'Russian Tea',         'masque-russian-tea',       'Unisex', 'woody',    180, 8,  7, 87, 'Herbst/Winter', 'Date',   ARRAY['Schwarzer Tee','Bergamotte','Ingwer'], ARRAY['Tabak','Gewürze'], ARRAY['Leder','Weihrauch','Moschus']),
  ((select id from public.brands where name='Roja Parfums'),               'Elysium',             'roja-elysium',             'Men',    'clean',    320, 9,  8, 90, 'Sommer',        'Date',   ARRAY['Grapefruit','Zitrone','Schwarze Johannisbeere'], ARRAY['Zypresse','Vetiver','Jasmin'], ARRAY['Amber','Moschus','Zedernholz']),
  ((select id from public.brands where name='Parfums de Marly'),           'Greenley',            'pdm-greenley',             'Men',    'woody',    230, 8,  7, 89, 'Frühling',      'Büro',   ARRAY['Apfel','Grüne Noten','Bergamotte'], ARRAY['Veilchen','Lavendel'], ARRAY['Vetiver','Patchouli','Moschus']),
  ((select id from public.brands where name='Imaginary Authors'),          'Whisper',             'imaginary-whisper',        'Unisex', 'gourmand', 110, 7,  6, 86, 'Herbst/Winter', 'Date',   ARRAY['Birne','Karamell'], ARRAY['Tabak','Honig'], ARRAY['Vanille','Sandelholz','Moschus'])
on conflict (slug) do nothing;
