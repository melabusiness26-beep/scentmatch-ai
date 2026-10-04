-- Auressa: Charge 24 – Zusätzliche kuratierte Düfte (Designer & Alternativen).
-- Ausgewogene Mischung: beliebte Designer-Düfte, hochwertige günstige
-- Alternativen, verschiedene Kategorien. Faktenbasiert, eigene Texte/Daten.
-- Enthält NEUE Marken (werden via on conflict (name) do nothing mit angelegt).
-- Gegen Bestand geprüft: alle slugs/Namen sind neu.
-- Im Supabase SQL Editor ausführen. Wiederholbar.

-- ============ 1) Neue Marken (bestehende werden ignoriert) ============
insert into public.brands (name, slug, country) values
  ('Tom Ford',              'tom-ford',              'USA'),
  ('Maison Martin Margiela','maison-martin-margiela','Belgien'),
  ('Jo Malone',             'jo-malone',             'Großbritannien'),
  ('Zara',                  'zara',                  'Spanien'),
  ('Dossier',               'dossier',               'USA'),
  ('Atelier Cologne',       'atelier-cologne',       'Frankreich'),
  ('Estée Lauder',          'estee-lauder',          'USA'),
  ('Lancôme',               'lancome',               'Frankreich'),
  ('Guerlain',              'guerlain',              'Frankreich'),
  ('Thierry Mugler',        'thierry-mugler',        'Frankreich'),
  ('Burberry',              'burberry',              'Großbritannien'),
  ('Acqua di Parma',        'acqua-di-parma',        'Italien'),
  ('Penhaligon''s',         'penhaligons',           'Großbritannien'),
  ('Creed',                 'creed',                 'USA'),
  ('Heeley',                'heeley',                'Großbritannien')
on conflict (name) do nothing;

-- ============ 2) Düfte (inkl. Noten) ============
insert into public.perfumes
  (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  -- Tom Ford – Modern, edel, Promi-lieblinge
  ((select id from public.brands where name='Tom Ford'),             'Black Orchid',              'tom-ford-black-orchid',       'Women',  'floral',   120, 8, 8, 86, 'Herbst/Winter', 'Abend',  ARRAY['Schwarze Johannisbeere','Schwarze Orchidee','Gewürze'], ARRAY['Schwarze Orchidee','Gewürznelke'], ARRAY['Patchouli','Sandelholz','Vanille']),
  ((select id from public.brands where name='Tom Ford'),             'Noir Extreme',              'tom-ford-noir-extreme',       'Men',    'gourmand', 110, 8, 7, 85, 'Herbst/Winter', 'Abend',  ARRAY['Mandarine','Espresso','Gewürze'], ARRAY['Kardamom','Kakaobutter'], ARRAY['Vanille','Amber','Moschus']),
  ((select id from public.brands where name='Tom Ford'),             'Soleil Blanc',              'tom-ford-soleil-blanc',       'Women',  'gourmand', 115, 7, 8, 87, 'Sommer',        'Abend',  ARRAY['Bergamotte','Kokosnuss','Mandarine'], ARRAY['Tuberose','Gardenie'], ARRAY['Vanille','Musk','Sandelholz']),
  ((select id from public.brands where name='Tom Ford'),             'Grey Vetiver',              'tom-ford-grey-vetiver',       'Men',    'woody',    105, 7, 6, 84, 'Frühling',      'Date',   ARRAY['Bergamotte','Grapefruit','Grüne Noten'], ARRAY['Vetiver','Geranie'], ARRAY['Zedernholz','Moschus','Amber']),

  -- Maison Martin Margiela – Minimalistische Meisterwerke
  ((select id from public.brands where name='Maison Martin Margiela'),'Beach Walk',              'mmm-beach-walk',              'Unisex', 'clean',    85,  6, 5, 82, 'Sommer',        'Alltag', ARRAY['Bergamotte','Johannisbeere','Ambroxan'], ARRAY['Blüte','Gras'], ARRAY['Sandelholz','Moschus']),
  ((select id from public.brands where name='Maison Martin Margiela'),'By the Fireplace',       'mmm-by-fireplace',            'Unisex', 'woody',    95,  8, 7, 85, 'Herbst/Winter', 'Abend',  ARRAY['Gewürznelke','Anis'], ARRAY['Kaminfeuer'], ARRAY['Sandelholz','Vanille','Amber']),
  ((select id from public.brands where name='Maison Martin Margiela'),'Untitled',               'mmm-untitled',                'Unisex', 'woody',    90,  7, 6, 83, 'Ganzjährig',    'Alltag', ARRAY['Bergamotte','Neroli'], ARRAY['Geranie','Jasmin'], ARRAY['Zedernholz','Vetiver','Moschus']),

  -- Jo Malone – Layerbar, frisch, Klassiker
  ((select id from public.brands where name='Jo Malone'),            'Lime Basil & Mandarin',     'jo-malone-lime-basil',        'Unisex', 'clean',    65,  4, 4, 80, 'Sommer',        'Alltag', ARRAY['Mandarine','Limette','Basil'], ARRAY['Kardamom','Neroli'], ARRAY['Moschus','Ambra']),
  ((select id from public.brands where name='Jo Malone'),            'Wood Sage & Sea Salt',      'jo-malone-wood-sage-salt',    'Unisex', 'clean',    65,  4, 4, 80, 'Frühling',      'Alltag', ARRAY['Salzige Noten','Seeluft','Ambroxan'], ARRAY['Salbei','Lavendel'], ARRAY['Vetiver','Moschus']),
  ((select id from public.brands where name='Jo Malone'),            'Peony & Blush Suede',       'jo-malone-peony-blush',       'Women',  'floral',   65,  4, 4, 79, 'Frühling',      'Date',   ARRAY['Pfingstrose','Himbeere'], ARRAY['Pfingstrose','Magnolia'], ARRAY['Wildleder','Moschus']),

  -- Zara – Günstig, modern, Schnappschüsse
  ((select id from public.brands where name='Zara'),                 'Tender Rose',               'zara-tender-rose',            'Women',  'floral',   20,  5, 5, 79, 'Frühling',      'Alltag', ARRAY['Bergamotte','Zitrone'], ARRAY['Rose','Geranium'], ARRAY['Holznoten','Moschus']),
  ((select id from public.brands where name='Zara'),                 'Deep Dark Wood',            'zara-deep-dark-wood',         'Men',    'woody',    22,  6, 6, 80, 'Herbst/Winter', 'Alltag', ARRAY['Gewürze','Zitrus'], ARRAY['Labdanum','Patchouli'], ARRAY['Zedernholz','Vetiver','Moschus']),
  ((select id from public.brands where name='Zara'),                 'Amber Powder',              'zara-amber-powder',           'Women',  'gourmand', 20,  5, 5, 78, 'Herbst/Winter', 'Alltag', ARRAY['Mandarine','Vanille'], ARRAY['Honig','Puder'], ARRAY['Amber','Moschus']),

  -- Dossier – Premium-Look zu Budget-Preis
  ((select id from public.brands where name='Dossier'),              'Seductive Amber',           'dossier-seductive-amber',     'Unisex', 'gourmand', 45,  7, 7, 82, 'Herbst/Winter', 'Abend',  ARRAY['Karamell','Tonka'], ARRAY['Vanille','Amber'], ARRAY['Moschus','Patchouli','Holznoten']),
  ((select id from public.brands where name='Dossier'),              'Fresh Rhubarb',             'dossier-fresh-rhubarb',       'Unisex', 'floral',   40,  5, 5, 79, 'Frühling',      'Alltag', ARRAY['Rhabarber','Bergamotte'], ARRAY['Rose','Geranium'], ARRAY['Moschus','Amber']),
  ((select id from public.brands where name='Dossier'),              'Citrus Bloom',              'dossier-citrus-bloom',        'Women',  'clean',    40,  5, 5, 80, 'Sommer',        'Alltag', ARRAY['Grapefruit','Orange','Neroli'], ARRAY['Jasmin','Blüte'], ARRAY['Sandelholz','Moschus']),

  -- Atelier Cologne – Hochwertige Fresh-Fruity
  ((select id from public.brands where name='Atelier Cologne'),      'Pacific Lime',              'atelier-cologne-pacific-lime','Unisex', 'clean',    95,  6, 5, 81, 'Sommer',        'Alltag', ARRAY['Limette','Zitrone','Grapefruit'], ARRAY['Minze','Basilikum'], ARRAY['Moschus','Holznoten']),
  ((select id from public.brands where name='Atelier Cologne'),      'Orange Sanguine',          'atelier-cologne-orange-sang', 'Unisex', 'clean',    95,  6, 5, 81, 'Frühling',      'Alltag', ARRAY['Blutorange','Grapefruit','Neroli'], ARRAY['Blüte'], ARRAY['Zedernholz','Moschus']),

  -- Estée Lauder – Klassiker, großzügig, verführerisch
  ((select id from public.brands where name='Estée Lauder'),         'Beautiful',                 'estee-lauder-beautiful',      'Women',  'floral',   75,  7, 7, 83, 'Frühling',      'Date',   ARRAY['Bergamotte','Zitrone','Mandarine'], ARRAY['Tuberose','Rose','Freesie'], ARRAY['Sandelholz','Moschus','Vanille']),
  ((select id from public.brands where name='Estée Lauder'),         'Sensuous Nude',             'estee-lauder-sensuous-nude',  'Women',  'gourmand', 70,  7, 7, 82, 'Ganzjährig',    'Date',   ARRAY['Oranger Blüte','Neroli'], ARRAY['Vanille','Karamell'], ARRAY['Sandelholz','Moschus','Amber']),

  -- Lancôme – Luxus-Klassiker, elegant
  ((select id from public.brands where name='Lancôme'),              'La Vie est Belle',          'lancome-vie-belle',           'Women',  'gourmand', 80,  8, 8, 85, 'Herbst/Winter', 'Abend',  ARRAY['Pfirsich','Bergamotte','Zimtblüte'], ARRAY['Iris','Patchouli'], ARRAY['Vanille','Tonkabohne','Praline']),
  ((select id from public.brands where name='Lancôme'),              'Tresor',                    'lancome-tresor',              'Women',  'floral',   75,  8, 7, 84, 'Ganzjährig',    'Abend',  ARRAY['Bergamotte','Orange'], ARRAY['Rose','Osmanthus','Tuberose'], ARRAY['Sandelholz','Amber','Vanille']),

  -- Guerlain – Kunstvolle Luxus-Düfte
  ((select id from public.brands where name='Guerlain'),             'Mon Guerlain',              'guerlain-mon-guerlain',       'Women',  'gourmand', 105, 7, 8, 86, 'Herbst/Winter', 'Abend',  ARRAY['Bergamotte','Birne','Tonkabohne'], ARRAY['Lavendel','Tonkabohne'], ARRAY['Vanille','Amber','Sandelholz']),
  ((select id from public.brands where name='Guerlain'),             'L''Homme Ideal',            'guerlain-homme-ideal',        'Men',    'woody',    95,  7, 7, 84, 'Frühling',      'Date',   ARRAY['Bergamotte','Ambrette','Rosapfeffer'], ARRAY['Iris','Mandarine'], ARRAY['Zedernholz','Iris','Vanille']),
  ((select id from public.brands where name='Guerlain'),             'La Petite Robe Noire',      'guerlain-robe-noire',         'Women',  'gourmand', 95,  7, 7, 85, 'Herbst/Winter', 'Date',   ARRAY['Schwarze Johannisbeere','Bergamotte'], ARRAY['Kirsche','Mandarinenblüte'], ARRAY['Moschus','Venillin','Karamell']),

  -- Thierry Mugler – Dramatisch, sinnlich
  ((select id from public.brands where name='Thierry Mugler'),       'Angel',                     'thierry-mugler-angel',        'Women',  'gourmand', 90,  8, 8, 85, 'Herbst/Winter', 'Abend',  ARRAY['Mandarine','Bergamotte','Karambole'], ARRAY['Kakaobutter','Honig'], ARRAY['Patchouli','Amber','Moschus']),
  ((select id from public.brands where name='Thierry Mugler'),       'Alien',                     'thierry-mugler-alien',        'Women',  'floral',   95,  8, 8, 86, 'Herbst/Winter', 'Abend',  ARRAY['Sambac-Jasmin','Magnolie'], ARRAY['Sambac-Jasmin','Magnolie','Cashmeran'], ARRAY['Amber','Moschus','Kaschmir']),

  -- Burberry – Modern, noble, British
  ((select id from public.brands where name='Burberry'),             'Brit Sheer',                'burberry-brit-sheer',         'Women',  'floral',   60,  6, 6, 81, 'Frühling',      'Date',   ARRAY['Bergamotte','Freesie','Pfirsich'], ARRAY['Orchidee','Yuzu'], ARRAY['Moschus','Amber','Holznoten']),
  ((select id from public.brands where name='Burberry'),             'The Beat',                  'burberry-the-beat',           'Men',    'woody',    55,  6, 6, 80, 'Frühling',      'Alltag', ARRAY['Zitrusfrüchte','Nelke'], ARRAY['Kardamom','Gewürze'], ARRAY['Sandelholz','Vetiver','Patchouli']),

  -- Acqua di Parma – Elegant, klassisch, italienisch
  ((select id from public.brands where name='Acqua di Parma'),       'Blu Mediterraneo',          'acqua-di-parma-blu-med',      'Unisex', 'clean',    85,  6, 5, 82, 'Sommer',        'Alltag', ARRAY['Zitrone','Mandarine','Neroli'], ARRAY['Jasmin','Hyazinthe'], ARRAY['Sandelholz','Amber','Vetiver']),
  ((select id from public.brands where name='Acqua di Parma'),       'Colonia',                   'acqua-di-parma-colonia',      'Men',    'clean',    80,  6, 5, 81, 'Ganzjährig',    'Alltag', ARRAY['Zitrusfrüchte','Bergamotte','Orange'], ARRAY['Neroli','Lavender'], ARRAY['Zedernholz','Moschus']),

  -- Penhaligon''s – Klassische britische Nische
  ((select id from public.brands where name='Penhaligon''s'),        'Elisabethan Rose',          'penhaligons-elisabethan-rose','Women',  'floral',   70,  7, 6, 82, 'Frühling',      'Date',   ARRAY['Rose','Neroli','Bergamotte'], ARRAY['Rose','Geranium','Lily of the Valley'], ARRAY['Moschus','Zedernholz','Sandelholz']),
  ((select id from public.brands where name='Penhaligon''s'),        'Blenheim Bouquet',          'penhaligons-blenheim',        'Men',    'woody',    75,  7, 6, 82, 'Herbst/Winter', 'Alltag', ARRAY['Bergamotte','Koriander','Ginger'], ARRAY['Jasmin','Hyazinthe','Rose'], ARRAY['Zedernholz','Vetiver','Moschus']),

  -- Creed – Nische, Handwerk, Klassiker
  ((select id from public.brands where name='Creed'),               'Aventus',                   'creed-aventus',               'Men',    'woody',    280, 8, 8, 87, 'Frühling',      'Date',   ARRAY['Bergamotte','Schwarze Johannisbeere','Apfel'], ARRAY['Ambroxan','Gewürze'], ARRAY['Zedernholz','Sandelholz','Moschus']),
  ((select id from public.brands where name='Creed'),               'Green Irish Tweed',         'creed-green-irish-tweed',     'Men',    'woody',    270, 8, 8, 86, 'Frühling',      'Alltag', ARRAY['Bergamotte','Zitron','Ananas'], ARRAY['Kleeblatt','Gras','Iris'], ARRAY['Zedernholz','Vetiver','Moschus']),
  ((select id from public.brands where name='Creed'),               'Royal Water',               'creed-royal-water',           'Unisex', 'clean',    250, 7, 6, 84, 'Sommer',        'Alltag', ARRAY['Zitrusfrüchte','Bergamotte','Zitrone'], ARRAY['Neroli','Hyazinthe'], ARRAY['Sandelholz','Moschus']),

  -- Heeley – Niche/Indie, authentisch, hochwertig
  ((select id from public.brands where name='Heeley'),              'Sel Marin',                 'heeley-sel-marin',            'Unisex', 'woody',    160, 7, 6, 84, 'Sommer',        'Alltag', ARRAY['Seeluft','Salzige Noten','Ambroxan'], ARRAY['Seegras','Jasmin'], ARRAY['Zedernholz','Vetiver','Holznoten']),
  ((select id from public.brands where name='Heeley'),              'Fontainebleau',             'heeley-fontainebleau',        'Unisex', 'woody',    160, 8, 7, 85, 'Herbst/Winter', 'Abend',  ARRAY['Fichte','Tanne','Bergorange'], ARRAY['Rosmarin','Farn'], ARRAY['Eichenmoos','Vetiver','Holznoten'])
on conflict (slug) do nothing;
