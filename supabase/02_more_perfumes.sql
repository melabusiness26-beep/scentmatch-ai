-- ScentMatch AI: zusaetzliche Marken & Duefte + Bereinigung der Saison-Werte.
-- Im Supabase SQL Editor ausfuehren. Wiederholbar (keine Duplikate).

-- 1) Neue Marken
insert into public.brands (name, slug, country) values
  ('Creed',          'creed',          'Frankreich'),
  ('Versace',        'versace',        'Italien'),
  ('Prada',          'prada',          'Italien'),
  ('Mugler',         'mugler',         'Frankreich'),
  ('Paco Rabanne',   'paco-rabanne',   'Spanien'),
  ('Chloe',          'chloe',          'Frankreich'),
  ('Marc Jacobs',    'marc-jacobs',    'USA'),
  ('Gucci',          'gucci',          'Italien')
on conflict (name) do nothing;

-- 2) Neue Duefte
insert into public.perfumes
  (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion)
values
  ((select id from public.brands where name='Creed'),              'Aventus',               'creed-aventus',       'Men',    'woody',    280, 9, 8, 95, 'Ganzjährig',    'Abend'),
  ((select id from public.brands where name='Versace'),            'Eros',                  'versace-eros',        'Men',    'woody',    75,  8, 8, 89, 'Winter',        'Date'),
  ((select id from public.brands where name='Dior'),               'Dior Homme Intense',    'dior-homme-intense',  'Men',    'woody',    110, 8, 7, 90, 'Herbst/Winter', 'Abend'),
  ((select id from public.brands where name='Prada'),              'Candy',                 'prada-candy',         'Women',  'gourmand', 95,  7, 7, 86, 'Herbst/Winter', 'Date'),
  ((select id from public.brands where name='Mugler'),             'Angel',                 'mugler-angel',        'Women',  'gourmand', 105, 9, 9, 88, 'Winter',        'Abend'),
  ((select id from public.brands where name='Paco Rabanne'),       'Olympea',               'olympea',             'Women',  'gourmand', 98,  8, 7, 87, 'Ganzjährig',    'Date'),
  ((select id from public.brands where name='Yves Saint Laurent'), 'Libre',                 'ysl-libre',           'Women',  'floral',   115, 8, 7, 90, 'Ganzjährig',    'Date'),
  ((select id from public.brands where name='Chloe'),              'Chloe Eau de Parfum',   'chloe-edp',           'Women',  'floral',   105, 6, 6, 85, 'Frühling',      'Alltag'),
  ((select id from public.brands where name='Marc Jacobs'),        'Daisy',                 'marc-jacobs-daisy',   'Women',  'floral',   85,  6, 5, 83, 'Frühling',      'Alltag'),
  ((select id from public.brands where name='Gucci'),              'Bloom',                 'gucci-bloom',         'Women',  'floral',   110, 7, 7, 86, 'Frühling',      'Date'),
  ((select id from public.brands where name='Versace'),            'Dylan Blue',            'versace-dylan-blue',  'Men',    'clean',    80,  7, 7, 85, 'Sommer',        'Alltag'),
  ((select id from public.brands where name='Chanel'),             'Allure Homme Sport',    'allure-homme-sport',  'Men',    'clean',    120, 7, 6, 88, 'Sommer',        'Alltag')
on conflict (slug) do nothing;

-- 3) Saison-/Anlass-Werte mit Umlauten vereinheitlichen (alte ASCII-Schreibweise korrigieren)
update public.perfumes set season   = 'Ganzjährig' where season   = 'Ganzjaehrig';
update public.perfumes set season   = 'Frühling'   where season   = 'Fruehling';
update public.perfumes set occasion = 'Büro'       where occasion = 'Buero';
