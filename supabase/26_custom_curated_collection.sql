-- Auressa: Charge 26 – Kuratierte Custom-Kollektion (24 neue Düfte).
-- Benutzer-spezifische Auswahl: romantische, florale und elegante Düfte,
-- mehrheitlich für Damen. Budget-freundliche Preise, hochwertige Kompositionen.
-- Neue Marken werden via on conflict (name) do nothing angelegt.
-- Im Supabase SQL Editor ausführen. Wiederholbar.

-- ============ 1) Neue Marken (bestehende werden ignoriert) ============
insert into public.brands (name, slug, country) values
  ('Bies',                  'bies',                  'VAE'),
  ('Aurelia',               'aurelia',               'Schweiz'),
  ('Blossom Fragrances',    'blossom-fragrances',    'Schweiz')
on conflict (name) do nothing;

-- ============ 2) Düfte (inkl. Noten) ============
insert into public.perfumes
  (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  -- Bies Collection
  ((select id from public.brands where name='Bies'),                 'Ti Amo',                    'bies-ti-amo',                'Women',  'floral',   35,  6, 6, 81, 'Ganzjährig',    'Date',   ARRAY['Bergamotte','Mandarine','Freesie'], ARRAY['Rose','Jasmin','Lilie'], ARRAY['Sandelholz','Moschus','Vanille']),
  ((select id from public.brands where name='Bies'),                 'La Vanille',                'bies-la-vanille',            'Women',  'gourmand', 32,  7, 6, 80, 'Herbst/Winter', 'Alltag', ARRAY['Bergamotte','Pfirsich','Apfel'], ARRAY['Vanille','Tonkabohne','Karamell'], ARRAY['Vanille','Amber','Moschus']),

  -- Aurelia Collection – Romantisch & Elegant
  ((select id from public.brands where name='Aurelia'),              'Love Affair',               'aurelia-love-affair',        'Women',  'floral',   35,  6, 6, 81, 'Frühling',      'Date',   ARRAY['Bergamotte','Cassis','Erdbeere'], ARRAY['Rose','Jasmin','Orchidee'], ARRAY['Sandelholz','Amber','Moschus']),
  ((select id from public.brands where name='Aurelia'),              'Wish',                      'aurelia-wish',               'Women',  'floral',   33,  6, 6, 80, 'Frühling',      'Alltag', ARRAY['Bergamotte','Zitrone','Neroli'], ARRAY['Rose','Freesie','Jasmin'], ARRAY['Sandelholz','Moschus','Amber']),
  ((select id from public.brands where name='Aurelia'),              'Miss Viviane',              'aurelia-miss-viviane',       'Women',  'floral',   34,  6, 6, 80, 'Ganzjährig',    'Date',   ARRAY['Mandarine','Bergamotte','Neroli'], ARRAY['Rose','Jasmin','Maiglöckchen'], ARRAY['Sandelholz','Moschus','Vanille']),
  ((select id from public.brands where name='Aurelia'),              'Floral',                    'aurelia-floral',             'Women',  'floral',   32,  5, 5, 79, 'Frühling',      'Alltag', ARRAY['Bergamotte','Zitrone'], ARRAY['Rose','Jasmin','Geranium'], ARRAY['Moschus','Holznoten']),
  ((select id from public.brands where name='Aurelia'),              'Olivia',                    'aurelia-olivia',             'Women',  'floral',   35,  6, 6, 81, 'Ganzjährig',    'Date',   ARRAY['Bergamotte','Mandarine','Orange'], ARRAY['Rose','Jasmin','Tuberose'], ARRAY['Sandelholz','Vanille','Moschus']),
  ((select id from public.brands where name='Aurelia'),              'Sexy Girl',                 'aurelia-sexy-girl',          'Women',  'gourmand', 36,  7, 7, 82, 'Herbst/Winter', 'Abend',  ARRAY['Bergamotte','Pflaume','Cassis'], ARRAY['Tonkabohne','Karamell','Jasmin'], ARRAY['Vanille','Amber','Moschus']),
  ((select id from public.brands where name='Aurelia'),              'Love Forever',              'aurelia-love-forever',       'Women',  'floral',   35,  6, 6, 81, 'Ganzjährig',    'Date',   ARRAY['Bergamotte','Pink Pfeffer','Litschi'], ARRAY['Rose','Jasmin','Tuberose'], ARRAY['Sandelholz','Vanille','Moschus']),
  ((select id from public.brands where name='Aurelia'),              'Black Night',               'aurelia-black-night',        'Unisex', 'woody',    38,  7, 7, 82, 'Herbst/Winter', 'Abend',  ARRAY['Bergamotte','Gewürze','Kardamom'], ARRAY['Amber','Patchouli','Labdanum'], ARRAY['Zedernholz','Sandelholz','Moschus']),
  ((select id from public.brands where name='Aurelia'),              'Tree Belle',                'aurelia-tree-belle',         'Women',  'floral',   34,  6, 6, 80, 'Frühling',      'Alltag', ARRAY['Bergamotte','Neroli','Zitrone'], ARRAY['Maiglöckchen','Freesie','Jasmin'], ARRAY['Zedernholz','Moschus','Vanille']),
  ((select id from public.brands where name='Aurelia'),              'Cecile',                    'aurelia-cecile',             'Women',  'floral',   33,  6, 6, 80, 'Ganzjährig',    'Date',   ARRAY['Mandarine','Bergamotte','Grapefruit'], ARRAY['Jasmin','Rose','Lilie'], ARRAY['Sandelholz','Moschus','Amber']),
  ((select id from public.brands where name='Aurelia'),              'Selfie Girl',               'aurelia-selfie-girl',        'Women',  'floral',   35,  6, 6, 81, 'Frühling',      'Alltag', ARRAY['Bergamotte','Erdbeere','Cassis'], ARRAY['Jasmin','Rose','Veilchen'], ARRAY['Moschus','Vanille','Amber']),
  ((select id from public.brands where name='Aurelia'),              'Never Again',               'aurelia-never-again',        'Unisex', 'woody',    37,  7, 7, 82, 'Herbst/Winter', 'Abend',  ARRAY['Bergamotte','Schwarzer Pfeffer','Ginger'], ARRAY['Gewürze','Amber','Iris'], ARRAY['Patchouli','Zedernholz','Vanille']),
  ((select id from public.brands where name='Aurelia'),              'Moi',                       'aurelia-moi',                'Women',  'floral',   34,  6, 6, 80, 'Ganzjährig',    'Date',   ARRAY['Bergamotte','Mandarine','Neroli'], ARRAY['Rose','Jasmin','Maiglöckchen'], ARRAY['Sandelholz','Moschus','Vanille']),
  ((select id from public.brands where name='Aurelia'),              'La Rouge de Paris',         'aurelia-rouge-paris',        'Women',  'floral',   36,  7, 7, 82, 'Herbst/Winter', 'Date',   ARRAY['Bergamotte','Cassis','Freesie'], ARRAY['Rose','Jasmin','Tuberose'], ARRAY['Sandelholz','Vanille','Amber']),
  ((select id from public.brands where name='Aurelia'),              'Golden Woman',              'aurelia-golden-woman',       'Women',  'gourmand', 35,  6, 6, 81, 'Herbst/Winter', 'Abend',  ARRAY['Orange','Mandarine','Kardamom'], ARRAY['Tonkabohne','Vanille','Karamell'], ARRAY['Amber','Sandelholz','Moschus']),
  ((select id from public.brands where name='Aurelia'),              'Eau de Silcily',            'aurelia-eau-silcily',        'Unisex', 'clean',    32,  5, 5, 79, 'Sommer',        'Alltag', ARRAY['Zitrone','Bergamotte','Neroli'], ARRAY['Neroli','Blüte','Kräuter'], ARRAY['Zedernholz','Moschus','Vanille']),
  ((select id from public.brands where name='Aurelia'),              'Crystal',                   'aurelia-crystal',            'Women',  'floral',   33,  5, 5, 79, 'Ganzjährig',    'Alltag', ARRAY['Bergamotte','Zitrone','Lemon'], ARRAY['Rose','Jasmin','Freesie'], ARRAY['Moschus','Amber']),

  -- Blossom Fragrances Collection
  ((select id from public.brands where name='Blossom Fragrances'),   'Blossom Garten',            'blossom-garten',             'Women',  'floral',   34,  6, 6, 81, 'Frühling',      'Alltag', ARRAY['Bergamotte','Neroli','Grapefruit'], ARRAY['Rose','Freesie','Geranium'], ARRAY['Sandelholz','Moschus','Vanille']),
  ((select id from public.brands where name='Blossom Fragrances'),   'Blossom Roses',             'blossom-roses',              'Women',  'floral',   35,  6, 6, 81, 'Frühling',      'Date',   ARRAY['Bergamotte','Pink Pfeffer','Mandarine'], ARRAY['Rose','Jasmin','Orchidee'], ARRAY['Sandelholz','Vanille','Moschus']),
  ((select id from public.brands where name='Blossom Fragrances'),   'Diamond',                   'blossom-diamond',            'Women',  'floral',   36,  7, 7, 82, 'Ganzjährig',    'Abend',  ARRAY['Bergamotte','Mandarine','Neroli'], ARRAY['Jasmin','Rose','Tuberose'], ARRAY['Sandelholz','Amber','Vanille']),
  ((select id from public.brands where name='Blossom Fragrances'),   'Blossom Avenue',            'blossom-avenue',             'Women',  'floral',   34,  6, 6, 80, 'Frühling',      'Alltag', ARRAY['Bergamotte','Zitrone','Neroli'], ARRAY['Lilie','Maiglöckchen','Freesie'], ARRAY['Moschus','Sandelholz','Amber']),
  ((select id from public.brands where name='Blossom Fragrances'),   'Blossom Hills',             'blossom-hills',              'Women',  'floral',   33,  6, 6, 80, 'Frühling',      'Date',   ARRAY['Mandarine','Bergamotte','Neroli'], ARRAY['Jasmin','Rose','Freesie'], ARRAY['Sandelholz','Moschus','Vanille'])
on conflict (slug) do nothing;
