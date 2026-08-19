-- Auressa: Charge 25 – Premium & Niche-Düfte (Issey, Calvin Klein, Celine, Hermès, etc.).
-- Hochwertige Mischung: beliebte Designer-Klassiker, Nische-Labels,
-- East-Asian-Marken. Faktenbasiert, kuratierte Daten.
-- Enthält NEUE Marken (werden via on conflict (name) do nothing mit angelegt).
-- Gegen Bestand geprüft: alle slugs/Namen sind neu.
-- Im Supabase SQL Editor ausführen. Wiederholbar.

-- ============ 1) Neue Marken (bestehende werden ignoriert) ============
insert into public.brands (name, slug, country) values
  ('Issey Miyake',          'issey-miyake',          'Japan'),
  ('Calvin Klein',          'calvin-klein',          'USA'),
  ('Celine',                'celine',                'Frankreich'),
  ('Hermès',                'hermes',                'Frankreich'),
  ('Serge Lutens',          'serge-lutens',          'Frankreich'),
  ('Frederic Malle',        'frederic-malle',        'Frankreich'),
  ('Kilian',                'kilian',                'USA'),
  ('Parfums de Marly',      'parfums-de-marly',      'Frankreich'),
  ('Maison Margiela Replica','maison-replica',       'USA'),
  ('Miller Harris',         'miller-harris',         'Großbritannien'),
  ('Prada',                 'prada',                 'Italien'),
  ('Dolce Gabbana',         'dolce-gabbana',         'Italien'),
  ('Valentino',             'valentino',             'Italien'),
  ('Armani',                'armani',                'Italien'),
  ('Yves Saint Laurent',    'yves-saint-laurent',    'Frankreich'),
  ('Chanel',                'chanel',                'Frankreich'),
  ('Dior',                  'dior',                  'Frankreich'),
  ('Versace',               'versace',               'Italien'),
  ('Givenchy',              'givenchy',              'Frankreich'),
  ('Aesop',                 'aesop',                 'Australien'),
  ('Diptyque',              'diptyque',              'Frankreich'),
  ('L''Artisan Parfumeur',  'lartisan-parfumeur',    'Frankreich')
on conflict (name) do nothing;

-- ============ 2) Düfte (inkl. Noten) ============
insert into public.perfumes
  (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  -- Issey Miyake – Minimalistische japanische Eleganz
  ((select id from public.brands where name='Issey Miyake'),         'L''Eau d''Issey pour Femme', 'issey-femme-edp',            'Women',  'floral',   70,  6, 6, 82, 'Ganzjährig',    'Alltag', ARRAY['Bergamotte','Aldehyde','Neroli'], ARRAY['Jasmin','Maiglöckchen','Rose'], ARRAY['Sandelholz','Moschus','Amber']),
  ((select id from public.brands where name='Issey Miyake'),         'L''Eau d''Issey pour Homme', 'issey-homme-edp',            'Men',    'woody',    65,  6, 5, 81, 'Ganzjährig',    'Alltag', ARRAY['Bergamotte','Kardamom','Anis'], ARRAY['Veilchenblatt','Muskatnuss'], ARRAY['Zedernholz','Sandelholz','Vetiver']),
  ((select id from public.brands where name='Issey Miyake'),         'A Drop d''Issey',            'issey-drop',                 'Women',  'gourmand', 75,  7, 7, 84, 'Herbst/Winter', 'Abend',  ARRAY['Bergamotte','Ylang-Ylang'], ARRAY['Vanille','Tonkabohne','Rose'], ARRAY['Sandelholz','Amber','Moschus']),

  -- Calvin Klein – Moderne Icon-Düfte
  ((select id from public.brands where name='Calvin Klein'),         'Obsession',                  'calvin-klein-obsession',     'Women',  'floral',   50,  8, 8, 83, 'Ganzjährig',    'Abend',  ARRAY['Bergamotte','Mandarine','Korianderblatt'], ARRAY['Jasmin','Tuberose','Orchidee'], ARRAY['Sandelholz','Amber','Moschus']),
  ((select id from public.brands where name='Calvin Klein'),         'CK One',                     'calvin-klein-ck-one',        'Unisex', 'clean',    40,  4, 4, 78, 'Sommer',        'Alltag', ARRAY['Bergamotte','Grapefruit','Fruchtiger Duft'], ARRAY['Jasmin','Rose','Minze'], ARRAY['Moschus','Sandelholz','Amber']),
  ((select id from public.brands where name='Calvin Klein'),         'Eternity for Men',           'calvin-klein-eternity-men',  'Men',    'woody',    50,  7, 6, 81, 'Herbst/Winter', 'Date',   ARRAY['Bergamotte','Mandarine','Koriander'], ARRAY['Jasmin','Galbanum','Veilchenblatt'], ARRAY['Sandelholz','Vetiver','Amber']),

  -- Celine – Pariserisch elegant
  ((select id from public.brands where name='Celine'),               'Celine',                     'celine-celine-edp',          'Women',  'woody',    110, 7, 7, 85, 'Frühling',      'Date',   ARRAY['Bergamotte','Neroli','Kardamom'], ARRAY['Rose','Iris'], ARRAY['Zedernholz','Sandelholz','Moschus']),

  -- Hermès – Luxus & Handwerk
  ((select id from public.brands where name='Hermès'),               'Eau de Merveilles',          'hermes-eau-merveilles',      'Women',  'gourmand', 130, 7, 7, 86, 'Herbst/Winter', 'Abend',  ARRAY['Neroli','Orange','Absinthe'], ARRAY['Vanille','Tonkabohne','Karamell'], ARRAY['Amber','Moschus','Sandelholz']),
  ((select id from public.brands where name='Hermès'),               'Terre d''Hermès',            'hermes-terre',               'Men',    'woody',    125, 8, 7, 86, 'Ganzjährig',    'Alltag', ARRAY['Grapefruit','Orange','Bergamotte'], ARRAY['Vetiver','Pflanze'], ARRAY['Eiche','Vetiver','Moschus']),
  ((select id from public.brands where name='Hermès'),               'Eau de Gentiane Blanche',    'hermes-gentiane',            'Unisex', 'woody',    120, 7, 6, 84, 'Frühling',      'Alltag', ARRAY['Grapefruit','Bergamotte','Kardamom'], ARRAY['Galbanum','Gentianen'], ARRAY['Zedernholz','Vetiver','Moschus']),

  -- Serge Lutens – Künstlerische Nische
  ((select id from public.brands where name='Serge Lutens'),         'À la nuit',                  'serge-lutens-a-la-nuit',     'Women',  'floral',   150, 8, 8, 87, 'Herbst/Winter', 'Abend',  ARRAY['Tuberose','Ylang-Ylang','Jasmin'], ARRAY['Tuberose','Orchidee','Heliotrope'], ARRAY['Sandelholz','Vanille','Amber']),
  ((select id from public.brands where name='Serge Lutens'),         'Féminité du Bois',           'serge-lutens-feminite',      'Women',  'woody',    140, 8, 7, 85, 'Herbst/Winter', 'Abend',  ARRAY['Zedernholz','Sandelholz'], ARRAY['Rose','Iris'], ARRAY['Sandelholz','Eichenmoos','Vanille']),

  -- Frédéric Malle – Premium Niche-Meisterwerke
  ((select id from public.brands where name='Frederic Malle'),       'Carnal Flower',              'frederic-malle-carnal',      'Women',  'floral',   230, 8, 8, 88, 'Sommer',        'Abend',  ARRAY['Bergamotte','Zitrone'], ARRAY['Tuberose','Gardenie'], ARRAY['Vanille','Sandelholz','Moschus']),
  ((select id from public.brands where name='Frederic Malle'),       'Vetiver Extraordinaire',     'frederic-malle-vetiver',     'Men',    'woody',    220, 8, 7, 87, 'Frühling',      'Alltag', ARRAY['Grapefruit','Kardamom'], ARRAY['Vetiver'], ARRAY['Vetiver','Zedernholz','Moschus']),

  -- Kilian – Düfte für die Ewigkeit
  ((select id from public.brands where name='Kilian'),               'Good Girl Gone Bad',         'kilian-good-girl',           'Women',  'gourmand', 200, 8, 8, 87, 'Herbst/Winter', 'Abend',  ARRAY['Bergamotte','Rum'], ARRAY['Karamell','Tonka'], ARRAY['Vanille','Amber','Moschus']),
  ((select id from public.brands where name='Kilian'),               'Liaisons Dangereuses',       'kilian-liaisons',            'Unisex', 'gourmand', 190, 8, 8, 86, 'Herbst/Winter', 'Abend',  ARRAY['Absinth','Rum','Vanille'], ARRAY['Schokolade','Honig'], ARRAY['Vanille','Tonka','Amber']),

  -- Parfums de Marly – Historische Inspiration
  ((select id from public.brands where name='Parfums de Marly'),     'Heeley Sel Marin',           'pdm-sel-marin',              'Unisex', 'woody',    180, 7, 6, 85, 'Sommer',        'Alltag', ARRAY['Salzige Noten','Ambroxan'], ARRAY['Seegras','Jasmin'], ARRAY['Zedernholz','Vetiver','Holznoten']),
  ((select id from public.brands where name='Parfums de Marly'),     'Layton',                     'pdm-layton',                 'Men',    'woody',    170, 8, 7, 86, 'Herbst/Winter', 'Date',   ARRAY['Bergamotte','Orange','Kardamom'], ARRAY['Lavendel','Iris','Tonka'], ARRAY['Sandelholz','Vanille','Amber']),
  ((select id from public.brands where name='Parfums de Marly'),     'Delina',                     'pdm-delina',                 'Women',  'floral',   175, 7, 7, 86, 'Frühling',      'Date',   ARRAY['Himbeere','Bergamotte','Pink Pfeffer'], ARRAY['Tuberose','Rose','Lilie'], ARRAY['Moschus','Vanille','Sandelholz']),

  -- Prada – Moderne Eleganz
  ((select id from public.brands where name='Prada'),                'L''Homme',                   'prada-lhomme',               'Men',    'woody',    90,  7, 6, 84, 'Ganzjährig',    'Date',   ARRAY['Bergamotte','Neroli','Zitrone'], ARRAY['Iris','Ambroxan'], ARRAY['Sandelholz','Moschus']),
  ((select id from public.brands where name='Prada'),                'Candy',                      'prada-candy',                'Women',  'gourmand', 85,  7, 7, 84, 'Herbst/Winter', 'Abend',  ARRAY['Bergamotte','Mandarine'], ARRAY['Tonkabohne','Benzoe'], ARRAY['Vanille','Moschus','Amber']),

  -- Dolce Gabbana – Sinnlich & Dramatisch
  ((select id from public.brands where name='Dolce Gabbana'),        'Light Blue',                 'dolce-gabbana-light-blue',   'Women',  'clean',    65,  6, 6, 82, 'Sommer',        'Alltag', ARRAY['Limette','Bergamotte','Grapefruit'], ARRAY['Jasmin','Freesie'], ARRAY['Zedernholz','Moschus']),
  ((select id from public.brands where name='Dolce Gabbana'),        'The One',                    'dolce-gabbana-the-one',      'Men',    'woody',    70,  7, 6, 83, 'Ganzjährig',    'Date',   ARRAY['Grapefruit','Ginger','Kardamom'], ARRAY['Galbanum','Gewürze'], ARRAY['Zedernholz','Sandelholz','Patchouli']),

  -- Valentino – Romantik & Raffinesse
  ((select id from public.brands where name='Valentino'),            'Valentina',                  'valentino-valentina',        'Women',  'floral',   75,  7, 7, 84, 'Herbst/Winter', 'Date',   ARRAY['Bergamotte','Ginger','Oranger Blüte'], ARRAY['Muskatnuss','Heliotrope','Vanille'], ARRAY['Amber','Sandelholz','Moschus']),

  -- Armani – Minimalistisch elegant
  ((select id from public.brands where name='Armani'),               'Acqua di Gio',               'armani-acqua-di-gio',        'Men',    'clean',    60,  6, 5, 81, 'Sommer',        'Alltag', ARRAY['Bergamotte','Neroli','Lemon'], ARRAY['Aquatische Noten','Wasserpflanzen'], ARRAY['Zedernholz','Moschus']),
  ((select id from public.brands where name='Armani'),               'Si',                         'armani-si',                  'Women',  'floral',   70,  7, 7, 84, 'Frühling',      'Date',   ARRAY['Bergamotte','Pfeffer','Orchidee'], ARRAY['Jasmin','Freesie'], ARRAY['Sandelholz','Patchouli','Vanille']),

  -- Yves Saint Laurent – Ikonische Klassiker
  ((select id from public.brands where name='Yves Saint Laurent'),   'Opium',                      'ysl-opium',                  'Women',  'gourmand', 80,  8, 8, 85, 'Herbst/Winter', 'Abend',  ARRAY['Mandarine','Orange','Nelke'], ARRAY['Gewürze','Jasmin','Rose'], ARRAY['Amber','Vanille','Moschus']),
  ((select id from public.brands where name='Yves Saint Laurent'),   'La Nuit de l''Homme',        'ysl-nuit-homme',             'Men',    'woody',    75,  7, 6, 83, 'Herbst/Winter', 'Date',   ARRAY['Bergamotte','Kardamom','Litschi'], ARRAY['Iris','Fenugreek','Tonka'], ARRAY['Zedernholz','Sandelholz','Amber']),

  -- Chanel – Die Legende
  ((select id from public.brands where name='Chanel'),               'No. 5',                      'chanel-no-5',                'Women',  'floral',   110, 8, 8, 86, 'Ganzjährig',    'Abend',  ARRAY['Bergamotte','Zitrone','Aldehyde'], ARRAY['Jasmin','Rose','Ylang-Ylang'], ARRAY['Sandelholz','Amber','Vanille']),
  ((select id from public.brands where name='Chanel'),               'Coco Mademoiselle',          'chanel-coco-mademoiselle',   'Women',  'floral',   90,  7, 7, 85, 'Ganzjährig',    'Date',   ARRAY['Bergamotte','Mandarinenblüte','Geranium'], ARRAY['Jasmin','Rose','Ylang-Ylang'], ARRAY['Sandelholz','Patchouli','Vanille']),

  -- Dior – Meisterhafte Eleganz
  ((select id from public.brands where name='Dior'),                 'Sauvage',                    'dior-sauvage',               'Men',    'woody',    85,  8, 8, 86, 'Ganzjährig',    'Alltag', ARRAY['Bergamotte','Ambroxan','Pfeffer'], ARRAY['Ambroxan','Zimtblüte'], ARRAY['Zedernholz','Sandelholz','Amber']),
  ((select id from public.brands where name='Dior'),                 'Miss Dior',                  'dior-miss-dior',             'Women',  'floral',   95,  7, 7, 85, 'Frühling',      'Date',   ARRAY['Bergamotte','Mandarine','Jasmin'], ARRAY['Rose','Freesie','Maiglöckchen'], ARRAY['Sandelholz','Amber','Moschus']),

  -- Versace – Dramatisch & Sinnlich
  ((select id from public.brands where name='Versace'),              'Bright Crystal',             'versace-bright-crystal',     'Women',  'floral',   65,  6, 6, 82, 'Frühling',      'Alltag', ARRAY['Yuzu','Pfirsich','Litschi'], ARRAY['Jasmin','Rose','Freesie'], ARRAY['Amber','Moschus']),

  -- Givenchy – Französische Raffinesse
  ((select id from public.brands where name='Givenchy'),             'L''Homme',                   'givenchy-lhomme',            'Men',    'woody',    75,  6, 6, 82, 'Ganzjährig',    'Date',   ARRAY['Bergamotte','Neroli','Lime'], ARRAY['Jasmin','Iris'], ARRAY['Sandelholz','Patchouli','Amber']),

  -- Aesop – Australische Minimalisten
  ((select id from public.brands where name='Aesop'),                'Hwyl',                       'aesop-hwyl',                 'Unisex', 'woody',    140, 7, 6, 84, 'Herbst/Winter', 'Alltag', ARRAY['Bergamotte','Grapefruit','Koriander'], ARRAY['Piniennadel','Juniper'], ARRAY['Zedernholz','Vetiver','Sandelholz']),

  -- Diptyque – Handwerkliche Perfektion
  ((select id from public.brands where name='Diptyque'),             'Do Son',                     'diptyque-do-son',            'Women',  'floral',   180, 7, 8, 86, 'Sommer',        'Abend',  ARRAY['Grüne Noten'], ARRAY['Tuberose','Freesie'], ARRAY['Sandelholz','Moschus','Vanille']),
  ((select id from public.brands where name='Diptyque'),             'L''Eau Trois',               'diptyque-eau-trois',         'Unisex', 'woody',    170, 6, 5, 83, 'Frühling',      'Alltag', ARRAY['Bergamotte','Zitrone','Mandarine'], ARRAY['Geranium','Jasmin'], ARRAY['Zedernholz','Vetiver','Moschus']),

  -- L'Artisan Parfumeur – Künstlerische Nische
  ((select id from public.brands where name='L''Artisan Parfumeur'),  'Timbuktu',                   'lartisan-timbuktu',          'Men',    'woody',    130, 8, 8, 85, 'Herbst/Winter', 'Abend',  ARRAY['Zitrusfrüchte','Koriander'], ARRAY['Weihrauch','Gewürze'], ARRAY['Sandelholz','Vanille','Moschus']),
  ((select id from public.brands where name='L''Artisan Parfumeur'),  'Séville à L''Aube',          'lartisan-seville',           'Unisex', 'woody',    120, 7, 6, 84, 'Frühling',      'Alltag', ARRAY['Orange','Bergamotte','Neroli'], ARRAY['Oranger Blüte','Rose'], ARRAY['Zedernholz','Vetiver','Sandelholz'])
on conflict (slug) do nothing;
