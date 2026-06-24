-- Auressa: Charge 21 – Notino-Bestseller (Lücken im Katalog), Durchgang 3.
-- Ausgewogene Mischung: günstige Klone (Afnan/Al Haramain/Rasasi), Designer,
-- Promi-Düfte und Nischen-Highlights. Faktenbasiert, eigene Texte/Daten.
-- Enthält NEUE Marken (werden via on conflict (name) do nothing mit angelegt).
-- Gegen Bestand inkl. Charge 19+20 geprüft: alle slugs/Namen sind neu.
-- Im Supabase SQL Editor ausführen. Wiederholbar.

-- ============ 1) Neue Marken (bestehende werden ignoriert) ============
insert into public.brands (name, slug, country) values
  ('Afnan',                'afnan',                'VAE'),
  ('Al Haramain',          'al-haramain',          'VAE'),
  ('Rasasi',               'rasasi',               'VAE'),
  ('Bottega Veneta',       'bottega-veneta',       'Italien'),
  ('Trussardi',            'trussardi',            'Italien'),
  ('Salvatore Ferragamo',  'salvatore-ferragamo',  'Italien'),
  ('Lalique',              'lalique',              'Frankreich'),
  ('Boucheron',            'boucheron',            'Frankreich'),
  ('Van Cleef & Arpels',   'van-cleef-arpels',     'Frankreich'),
  ('Jennifer Lopez',       'jennifer-lopez',       'USA'),
  ('Antonio Banderas',     'antonio-banderas',     'Spanien')
on conflict (name) do nothing;

-- ============ 2) Düfte (inkl. Noten) ============
insert into public.perfumes
  (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Afnan'),              '9PM',                       'afnan-9pm',                   'Men',    'gourmand', 35,  7, 7, 84, 'Herbst/Winter', 'Abend',  ARRAY['Apfel','Lavendel','Zimt'], ARRAY['Tonkabohne','Orangenblüte'], ARRAY['Vanille','Amber','Holznoten']),
  ((select id from public.brands where name='Afnan'),              'Supremacy Not Only Intense','afnan-supremacy-not-only',    'Men',    'woody',    40,  8, 8, 84, 'Herbst/Winter', 'Abend',  ARRAY['Apfel','Zimt','Bergamotte'], ARRAY['Amberholz','Patchouli'], ARRAY['Amber','Vanille','Moschus']),
  ((select id from public.brands where name='Afnan'),              '9AM',                       'afnan-9am',                   'Men',    'woody',    35,  7, 6, 83, 'Frühling',      'Büro',   ARRAY['Bergamotte','Grapefruit','Lavendel'], ARRAY['Geranie','Muskatnuss'], ARRAY['Tonkabohne','Amber','Patchouli']),
  ((select id from public.brands where name='Al Haramain'),        'Amber Oud Gold Edition',    'al-haramain-amber-oud-gold',  'Unisex', 'woody',    55,  8, 7, 85, 'Ganzjährig',    'Abend',  ARRAY['Zitrusfrüchte','Bergamotte'], ARRAY['Amber','Gewürze'], ARRAY['Oud','Moschus','Holznoten']),
  ((select id from public.brands where name='Al Haramain'),        'L''Aventure',               'al-haramain-laventure',       'Men',    'woody',    45,  8, 7, 84, 'Herbst/Winter', 'Date',   ARRAY['Bergamotte','Zimt','Apfel'], ARRAY['Zedernholz','Patchouli'], ARRAY['Amber','Tonkabohne','Moschus']),
  ((select id from public.brands where name='Rasasi'),             'Hawas for Him',             'rasasi-hawas-him',            'Men',    'clean',    50,  7, 7, 85, 'Sommer',        'Alltag', ARRAY['Apfel','Zimt','Bergamotte'], ARRAY['Wassernoten','Pflaume','Muskatnuss'], ARRAY['Amber','Moschus','Holznoten']),
  ((select id from public.brands where name='Rasasi'),             'Hawas for Her',             'rasasi-hawas-her',            'Women',  'floral',   50,  7, 6, 83, 'Frühling',      'Date',   ARRAY['Birne','Mandarine','Cassis'], ARRAY['Jasmin','Magnolie','Maiglöckchen'], ARRAY['Vanille','Moschus','Amber']),
  ((select id from public.brands where name='Lattafa'),            'Eclaire',                   'lattafa-eclaire',             'Women',  'gourmand', 35,  7, 6, 83, 'Herbst/Winter', 'Date',   ARRAY['Erdbeere','Litschi'], ARRAY['Karamell','Jasmin'], ARRAY['Vanille','Tonkabohne','Moschus']),
  ((select id from public.brands where name='Lattafa'),            'Yara Moi',                  'lattafa-yara-moi',            'Women',  'gourmand', 30,  7, 6, 82, 'Frühling',      'Alltag', ARRAY['Tropische Früchte','Bergamotte'], ARRAY['Orchidee','Heliotrop'], ARRAY['Vanille','Sandelholz','Moschus']),
  ((select id from public.brands where name='Bottega Veneta'),     'Bottega Veneta',            'bottega-veneta-edp',          'Women',  'woody',    100, 7, 6, 84, 'Herbst/Winter', 'Abend',  ARRAY['Bergamotte','Pflaume','Pfeffer'], ARRAY['Jasmin'], ARRAY['Leder','Eichenmoos','Patchouli']),
  ((select id from public.brands where name='Trussardi'),          'Donna',                     'trussardi-donna',             'Women',  'floral',   55,  6, 6, 81, 'Frühling',      'Date',   ARRAY['Bergamotte','Birne'], ARRAY['Jasmin','Orangenblüte'], ARRAY['Vanille','Sandelholz','Moschus']),
  ((select id from public.brands where name='Salvatore Ferragamo'),'Signorina',                 'ferragamo-signorina',         'Women',  'floral',   65,  6, 6, 82, 'Frühling',      'Date',   ARRAY['Johannisbeere','Pink Pfeffer'], ARRAY['Pannacotta','Jasmin'], ARRAY['Patchouli','Moschus']),
  ((select id from public.brands where name='Salvatore Ferragamo'),'Uomo',                      'ferragamo-uomo',              'Men',    'gourmand', 60,  7, 6, 82, 'Herbst/Winter', 'Date',   ARRAY['Schwarzer Pfeffer','Mandarine'], ARRAY['Tonkabohne','Iris'], ARRAY['Sandelholz','Amber','Holznoten']),
  ((select id from public.brands where name='Lalique'),            'Encre Noire',               'lalique-encre-noire',         'Men',    'woody',    45,  8, 7, 85, 'Herbst/Winter', 'Büro',   ARRAY['Zypresse'], ARRAY['Vetiver','Holznoten'], ARRAY['Cashmeran','Moschus']),
  ((select id from public.brands where name='Boucheron'),          'Jaipur Homme',              'boucheron-jaipur-homme',      'Men',    'gourmand', 50,  7, 7, 82, 'Herbst/Winter', 'Abend',  ARRAY['Bergamotte','Zimt','Kardamom'], ARRAY['Gewürznelke','Pflaume'], ARRAY['Amber','Vanille','Sandelholz']),
  ((select id from public.brands where name='Van Cleef & Arpels'), 'First',                     'van-cleef-first',             'Women',  'floral',   85,  7, 6, 83, 'Ganzjährig',    'Abend',  ARRAY['Aldehyde','Bergamotte','Pfirsich'], ARRAY['Jasmin','Rose','Narzisse'], ARRAY['Sandelholz','Amber','Moschus']),
  ((select id from public.brands where name='Jennifer Lopez'),     'Glow',                      'jennifer-lopez-glow',         'Women',  'clean',    30,  5, 5, 80, 'Sommer',        'Alltag', ARRAY['Grapefruit','Orange'], ARRAY['Rose','Jasmin','Neroli'], ARRAY['Moschus','Amber','Sandelholz']),
  ((select id from public.brands where name='Antonio Banderas'),   'The Secret',                'antonio-banderas-the-secret', 'Men',    'woody',    25,  6, 6, 80, 'Herbst/Winter', 'Alltag', ARRAY['Apfel','Minze','Basilikum'], ARRAY['Veilchenblatt','Kaffee'], ARRAY['Leder','Patchouli','Moschus']),
  ((select id from public.brands where name='Ariana Grande'),      'Sweet Like Candy',          'ariana-grande-sweet-candy',   'Women',  'gourmand', 45,  6, 6, 81, 'Herbst/Winter', 'Date',   ARRAY['Birne','Bergamotte'], ARRAY['Marshmallow','Jasmin'], ARRAY['Vanille','Tonkabohne','Cashmeran']),
  ((select id from public.brands where name='Ariana Grande'),      'Thank U, Next',             'ariana-grande-thank-u-next',  'Women',  'floral',   45,  6, 6, 81, 'Frühling',      'Date',   ARRAY['Pink Pfeffer','Birne'], ARRAY['Macaron','Rose'], ARRAY['Moschus','Sandelholz','Vanille']),
  ((select id from public.brands where name='Ariana Grande'),      'God Is a Woman',            'ariana-grande-god-is-a-woman','Women',  'floral',   50,  6, 6, 82, 'Frühling',      'Date',   ARRAY['Bergamotte','Pflaume'], ARRAY['Ambrette','Türkische Rose'], ARRAY['Zedernholz','Moschus','Vanille']),
  ((select id from public.brands where name='Maison Francis Kurkdjian'),'Baccarat Rouge 540 Extrait','mfk-br540-extrait',     'Unisex', 'gourmand', 380, 9, 9, 90, 'Herbst/Winter', 'Abend',  ARRAY['Safran','Jasmin'], ARRAY['Amberholz','Zedernholz'], ARRAY['Moschus','Oud','Tannenharz']),
  ((select id from public.brands where name='Maison Francis Kurkdjian'),'Oud Satin Mood',       'mfk-oud-satin-mood',          'Unisex', 'gourmand', 330, 9, 8, 88, 'Herbst/Winter', 'Abend',  ARRAY['Veilchen'], ARRAY['Rose','Oud'], ARRAY['Vanille','Benzoe','Amber']),
  ((select id from public.brands where name='Maison Francis Kurkdjian'),'Amyris Homme',         'mfk-amyris-homme',            'Men',    'woody',    220, 7, 7, 86, 'Frühling',      'Date',   ARRAY['Mandarine','Bergamotte'], ARRAY['Iris','Amyrisholz','Tonkabohne'], ARRAY['Vetiver','Vanille','Zedernholz']),
  ((select id from public.brands where name='Amouage'),            'Reflection Man',            'amouage-reflection-man',      'Men',    'woody',    280, 8, 7, 88, 'Frühling',      'Date',   ARRAY['Rosmarin','Bergamotte','Pfeffer'], ARRAY['Jasmin','Iris','Neroli'], ARRAY['Sandelholz','Vetiver','Patchouli']),
  ((select id from public.brands where name='Amouage'),            'Jubilation XXV',            'amouage-jubilation-xxv',      'Men',    'woody',    320, 9, 8, 88, 'Herbst/Winter', 'Abend',  ARRAY['Orange','Beeren','Koriander'], ARRAY['Weihrauch','Honig','Gewürznelke'], ARRAY['Myrrhe','Patchouli','Holznoten']),
  ((select id from public.brands where name='Byredo'),             'Bal d''Afrique',            'byredo-bal-dafrique',         'Unisex', 'woody',    200, 7, 6, 86, 'Frühling',      'Alltag', ARRAY['Bergamotte','Zitrone','Neroli'], ARRAY['Veilchen','Jasmin','Ringelblume'], ARRAY['Zedernholz','Vetiver','Moschus']),
  ((select id from public.brands where name='Byredo'),             'Mojave Ghost',              'byredo-mojave-ghost',         'Unisex', 'woody',    200, 7, 6, 85, 'Frühling',      'Date',   ARRAY['Ambrette','Veilchen'], ARRAY['Sandelholz','Magnolie'], ARRAY['Zedernholz','Amber','Moschus']),
  ((select id from public.brands where name='Le Labo'),            'Another 13',                'le-labo-another-13',          'Unisex', 'woody',    220, 8, 7, 86, 'Ganzjährig',    'Alltag', ARRAY['Ambrette','Moschus'], ARRAY['Jasmin'], ARRAY['Amberholz','Moschus','Cetalox']),
  ((select id from public.brands where name='Le Labo'),            'The Noir 29',               'le-labo-the-noir-29',         'Unisex', 'woody',    230, 8, 7, 86, 'Herbst/Winter', 'Abend',  ARRAY['Bergamotte','Schwarzer Tee'], ARRAY['Feige','Vetiver'], ARRAY['Tabak','Holznoten','Moschus']),
  ((select id from public.brands where name='Mancera'),            'Instant Crush',             'mancera-instant-crush',       'Unisex', 'gourmand', 120, 8, 8, 85, 'Herbst/Winter', 'Abend',  ARRAY['Tagetes','Rum'], ARRAY['Iris','Tabak','Rose'], ARRAY['Vanille','Amber','Moschus']),
  ((select id from public.brands where name='Montale'),            'Black Aoud',                'montale-black-aoud',          'Unisex', 'woody',    110, 9, 9, 85, 'Herbst/Winter', 'Abend',  ARRAY['Mandarine','Bergamotte'], ARRAY['Rose','Patchouli'], ARRAY['Oud','Holznoten','Amber']),
  ((select id from public.brands where name='Xerjoff'),            'Accento',                   'xerjoff-accento',             'Unisex', 'floral',   250, 8, 7, 86, 'Frühling',      'Date',   ARRAY['Bergamotte','Pink Pfeffer','Ananas'], ARRAY['Rose','Jasmin','Veilchen'], ARRAY['Eichenmoos','Patchouli','Amber']),
  ((select id from public.brands where name='Swiss Arabian'),      'Layali',                    'swiss-arabian-layali',        'Women',  'gourmand', 40,  7, 7, 82, 'Herbst/Winter', 'Abend',  ARRAY['Pflaume','Pfirsich','Orange'], ARRAY['Jasmin','Tuberose','Honig'], ARRAY['Vanille','Amber','Patchouli']),
  ((select id from public.brands where name='Lattafa'),            'Ameer Al Oudh',             'lattafa-ameer-al-oudh',       'Unisex', 'woody',    35,  8, 8, 84, 'Herbst/Winter', 'Abend',  ARRAY['Safran','Pflaume','Gewürze'], ARRAY['Rose','Oud','Patchouli'], ARRAY['Amber','Moschus','Holznoten'])
on conflict (slug) do nothing;
