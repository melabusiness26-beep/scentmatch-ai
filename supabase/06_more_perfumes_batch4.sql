-- ScentMatch AI: kuratierte Charge 4 – 7 neue Marken + 28 bekannte Duefte (inkl. Noten).
-- Faktenbasiert kuratiert (keine gescrapten Fragmente). Im Supabase SQL Editor ausfuehren.
-- Wiederholbar (on conflict do nothing -> keine Duplikate).

-- ============ 1) Neue Marken ============
insert into public.brands (name, slug, country) values
  ('Bvlgari',           'bvlgari',           'Italien'),
  ('Armaf',             'armaf',             'VAE'),
  ('Mancera',           'mancera',           'Frankreich'),
  ('Montale',           'montale',           'Frankreich'),
  ('By Kilian',         'by-kilian',         'Frankreich'),
  ('Maison Margiela',   'maison-margiela',   'Frankreich'),
  ('Ariana Grande',     'ariana-grande',     'USA')
on conflict (name) do nothing;

-- ============ 2) 28 weitere Duefte (inkl. Noten) ============
insert into public.perfumes
  (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Dior'),                     'Dior Homme',                  'dior-homme',            'Men',    'woody',    100, 7, 6, 88, 'Ganzjährig',    'Büro',   ARRAY['Lavendel','Bergamotte'], ARRAY['Iris','Amber','Kakao'], ARRAY['Vetiver','Zedernholz','Leder']),
  ((select id from public.brands where name='Prada'),                    'L''Homme',                    'prada-lhomme',          'Men',    'woody',    90,  7, 6, 85, 'Ganzjährig',    'Büro',   ARRAY['Neroli','Pfeffer','Kardamom'], ARRAY['Iris','Veilchen','Geranie'], ARRAY['Amber','Patchouli','Sandelholz']),
  ((select id from public.brands where name='Versace'),                  'Versace Pour Homme',          'versace-pour-homme',    'Men',    'clean',    65,  6, 6, 84, 'Sommer',        'Alltag', ARRAY['Bergamotte','Neroli','Zitrone'], ARRAY['Hyazinthe','Salbei','Geranie'], ARRAY['Moschus','Zedernholz','Tonkabohne']),
  ((select id from public.brands where name='Bvlgari'),                  'Man in Black',                'bvlgari-man-in-black',  'Men',    'woody',    90,  8, 7, 87, 'Herbst/Winter', 'Abend',  ARRAY['Rum','Gewürze'], ARRAY['Tuberose','Leder','Iris'], ARRAY['Tonkabohne','Benzoe','Amber']),
  ((select id from public.brands where name='Armaf'),                    'Club de Nuit Intense Man',    'club-de-nuit-intense',  'Men',    'woody',    35,  8, 8, 88, 'Ganzjährig',    'Abend',  ARRAY['Zitrone','Ananas','Bergamotte','Apfel'], ARRAY['Birke','Jasmin','Rose'], ARRAY['Amber','Moschus','Vanille']),
  ((select id from public.brands where name='Mancera'),                  'Cedrat Boise',                'mancera-cedrat-boise',  'Unisex', 'woody',    120, 9, 8, 88, 'Ganzjährig',    'Alltag', ARRAY['Zitrone','Bergamotte','Schwarze Johannisbeere'], ARRAY['Patchouli','Jasmin'], ARRAY['Zedernholz','Moschus','Amber','Vanille']),
  ((select id from public.brands where name='Montale'),                  'Intense Cafe',                'montale-intense-cafe',  'Unisex', 'gourmand', 110, 9, 8, 88, 'Herbst/Winter', 'Date',   ARRAY['Kaffee','Bergamotte'], ARRAY['Rose','Orangenblüte'], ARRAY['Vanille','Amber','Moschus']),
  ((select id from public.brands where name='By Kilian'),                'Angels'' Share',              'kilian-angels-share',   'Unisex', 'gourmand', 270, 9, 8, 91, 'Herbst/Winter', 'Abend',  ARRAY['Cognac'], ARRAY['Zimt','Tonkabohne'], ARRAY['Vanille','Praline','Sandelholz']),
  ((select id from public.brands where name='Maison Margiela'),          'Replica Jazz Club',           'replica-jazz-club',     'Men',    'gourmand', 130, 7, 6, 88, 'Herbst/Winter', 'Abend',  ARRAY['Rosa Pfeffer','Neroli','Zitrone'], ARRAY['Rum','Salbei'], ARRAY['Tabak','Vanille','Vetiver']),
  ((select id from public.brands where name='Maison Margiela'),          'Replica By the Fireplace',    'replica-fireplace',     'Unisex', 'gourmand', 130, 7, 6, 89, 'Herbst/Winter', 'Abend',  ARRAY['Rosa Pfeffer','Orange','Gewürznelke'], ARRAY['Kastanie','Guajakholz'], ARRAY['Vanille','Cashmeran','Pfeffer']),
  ((select id from public.brands where name='Tom Ford'),                 'Ombre Leather',               'ombre-leather',         'Unisex', 'woody',    150, 8, 7, 88, 'Herbst/Winter', 'Abend',  ARRAY['Kardamom'], ARRAY['Leder','Jasmin'], ARRAY['Amber','Moschus','Patchouli']),
  ((select id from public.brands where name='Tom Ford'),                 'Noir Extreme',                'noir-extreme',          'Men',    'gourmand', 150, 9, 8, 89, 'Herbst/Winter', 'Abend',  ARRAY['Kardamom','Safran','Mandarine'], ARRAY['Kumquat','Orangenblüte','Jasmin'], ARRAY['Vanille','Amber','Sandelholz']),
  ((select id from public.brands where name='Azzaro'),                   'Wanted',                      'azzaro-wanted',         'Men',    'woody',    70,  7, 7, 84, 'Ganzjährig',    'Alltag', ARRAY['Zitrone','Ingwer','Lavendel'], ARRAY['Kardamom','Geranie','Apfel'], ARRAY['Vetiver','Tonkabohne','Holz']),
  ((select id from public.brands where name='Montblanc'),                'Legend',                      'montblanc-legend',      'Men',    'clean',    55,  6, 6, 84, 'Frühling',      'Büro',   ARRAY['Bergamotte','Lavendel','Ananas'], ARRAY['Apfel','Rose','Geranie'], ARRAY['Eichenmoos','Tonkabohne','Sandelholz']),
  ((select id from public.brands where name='Paco Rabanne'),             'Phantom',                     'paco-phantom',          'Men',    'clean',    80,  7, 6, 85, 'Ganzjährig',    'Alltag', ARRAY['Zitrone','Lavendel'], ARRAY['Apfel','Lavendel'], ARRAY['Vanille','Patchouli','Holz']),
  ((select id from public.brands where name='Jean Paul Gaultier'),       'Le Beau',                     'jpg-le-beau',           'Men',    'woody',    80,  7, 7, 85, 'Sommer',        'Date',   ARRAY['Bergamotte'], ARRAY['Kokosnuss','Tonkabohne'], ARRAY['Amberholz','Sandelholz']),
  ((select id from public.brands where name='Creed'),                    'Green Irish Tweed',           'creed-git',             'Men',    'woody',    270, 7, 7, 89, 'Frühling',      'Büro',   ARRAY['Zitrone','Veilchenblatt'], ARRAY['Veilchen','Iris'], ARRAY['Sandelholz','Ambergris']),
  ((select id from public.brands where name='Chanel'),                   'Chance Eau Tendre',           'chance-eau-tendre',     'Women',  'floral',   130, 7, 6, 88, 'Frühling',      'Date',   ARRAY['Grapefruit','Quitte'], ARRAY['Jasmin','Hyazinthe'], ARRAY['Weißer Moschus','Iris','Amber']),
  ((select id from public.brands where name='Dior'),                     'Poison Girl',                 'poison-girl',           'Women',  'gourmand', 110, 8, 7, 86, 'Herbst/Winter', 'Date',   ARRAY['Orange','Bitterorange'], ARRAY['Orangenblüte','Rose'], ARRAY['Vanille','Tonkabohne','Mandel']),
  ((select id from public.brands where name='Viktor & Rolf'),            'Bonbon',                      'vr-bonbon',             'Women',  'gourmand', 95,  7, 6, 84, 'Herbst/Winter', 'Date',   ARRAY['Mandarine','Orange','Pfirsich'], ARRAY['Karamell'], ARRAY['Sandelholz','Amber','Zedernholz']),
  ((select id from public.brands where name='Carolina Herrera'),         'Very Good Girl',              'very-good-girl',        'Women',  'floral',   110, 8, 7, 87, 'Winter',        'Abend',  ARRAY['Blutorange','Kirsche'], ARRAY['Rose','Jasmin'], ARRAY['Vanille','Tonkabohne','Kakao']),
  ((select id from public.brands where name='Mugler'),                   'Aura',                        'mugler-aura',           'Women',  'floral',   100, 8, 7, 84, 'Ganzjährig',    'Date',   ARRAY['Rhabarber','Bergamotte'], ARRAY['Orangenblüte','Tiarablüte'], ARRAY['Vanille','Bourbon','Moschus']),
  ((select id from public.brands where name='Gucci'),                    'Flora Gorgeous Gardenia',     'gucci-flora-gardenia',  'Women',  'floral',   105, 6, 6, 85, 'Frühling',      'Date',   ARRAY['Birne','Rote Beeren'], ARRAY['Gardenie','Jasmin'], ARRAY['Brauner Zucker','Patchouli']),
  ((select id from public.brands where name='Prada'),                    'Paradoxe',                    'prada-paradoxe',        'Women',  'floral',   110, 7, 6, 86, 'Ganzjährig',    'Date',   ARRAY['Neroli','Bergamotte'], ARRAY['Jasmin','Amber'], ARRAY['Moschus','Vanille']),
  ((select id from public.brands where name='Burberry'),                 'Goddess',                     'burberry-goddess',      'Women',  'gourmand', 110, 8, 7, 87, 'Herbst/Winter', 'Date',   ARRAY['Lavendel','Mandarine'], ARRAY['Vanillemark','Kakao'], ARRAY['Vanille','Karamell','Sandelholz']),
  ((select id from public.brands where name='Ariana Grande'),            'Cloud',                       'ariana-cloud',          'Women',  'gourmand', 45,  7, 6, 84, 'Ganzjährig',    'Alltag', ARRAY['Lavendel','Birne','Bergamotte'], ARRAY['Kokosnuss','Praline'], ARRAY['Vanille','Moschus','Holz']),
  ((select id from public.brands where name='Lattafa'),                  'Yara',                        'lattafa-yara',          'Women',  'gourmand', 30,  8, 7, 85, 'Ganzjährig',    'Date',   ARRAY['Orchidee','Heliotrop'], ARRAY['Tropische Früchte','Tuberose'], ARRAY['Vanille','Moschus','Sandelholz']),
  ((select id from public.brands where name='Lattafa'),                  'Asad',                        'lattafa-asad',          'Men',    'woody',    30,  8, 8, 85, 'Ganzjährig',    'Abend',  ARRAY['Bergamotte','Schwarzer Pfeffer','Ananas'], ARRAY['Tabak','Kaffee'], ARRAY['Vanille','Zedernholz','Patchouli'])
on conflict (slug) do nothing;
