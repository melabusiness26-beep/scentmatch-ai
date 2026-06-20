-- ScentMatch AI: Duftnoten zu bestehenden Dueften + 16 weitere Duefte (mit Noten).
-- Im Supabase SQL Editor ausfuehren. Wiederholbar.

-- ============ 1) Neue Marken ============
insert into public.brands (name, slug, country) values
  ('Jean Paul Gaultier',        'jean-paul-gaultier', 'Frankreich'),
  ('Maison Francis Kurkdjian',  'mfk',                'Frankreich'),
  ('Hugo Boss',                 'hugo-boss',          'Deutschland'),
  ('Azzaro',                    'azzaro',             'Frankreich'),
  ('Lattafa',                   'lattafa',            'VAE'),
  ('Burberry',                  'burberry',           'UK'),
  ('Givenchy',                  'givenchy',           'Frankreich'),
  ('Hermes',                    'hermes',             'Frankreich'),
  ('Valentino',                 'valentino',          'Italien'),
  ('Montblanc',                 'montblanc',          'Deutschland')
on conflict (name) do nothing;

-- ============ 2) Duftnoten zu den bestehenden 24 Dueften ============
update public.perfumes set top_notes=ARRAY['Bergamotte','Neroli','Grüne Mandarine'], heart_notes=ARRAY['Jasmin','Rosmarin','Pfirsich'], base_notes=ARRAY['Weißer Moschus','Zedernholz','Patchouli'] where slug='acqua-di-gio';
update public.perfumes set top_notes=ARRAY['Zitrone','Apfel','Glockenblume'], heart_notes=ARRAY['Bambus','Jasmin','Weiße Rose'], base_notes=ARRAY['Zedernholz','Moschus','Amber'] where slug='light-blue';
update public.perfumes set top_notes=ARRAY['Bergamotte','Zitrone','Ananas','Mandarine'], heart_notes=ARRAY['Jasmin','Maiglöckchen','Muskatnuss'], base_notes=ARRAY['Moschus','Amber','Zedernholz'] where slug='ck-one';
update public.perfumes set top_notes=ARRAY['Rosa Pfeffer','Orangenblüte','Birne'], heart_notes=ARRAY['Kaffee','Jasmin'], base_notes=ARRAY['Vanille','Patchouli','Zedernholz'] where slug='black-opium';
update public.perfumes set top_notes=ARRAY['Schwarze Johannisbeere','Birne'], heart_notes=ARRAY['Iris','Jasmin','Orangenblüte'], base_notes=ARRAY['Praline','Vanille','Tonkabohne'] where slug='la-vie-est-belle';
update public.perfumes set top_notes=ARRAY['Mandel','Kaffee'], heart_notes=ARRAY['Tuberose','Jasmin'], base_notes=ARRAY['Tonkabohne','Kakao','Vanille'] where slug='good-girl';
update public.perfumes set top_notes=ARRAY['Bergamotte','Pfeffer'], heart_notes=ARRAY['Sichuanpfeffer','Lavendel','Rosa Pfeffer'], base_notes=ARRAY['Ambroxan','Zedernholz','Labdanum'] where slug='sauvage';
update public.perfumes set top_notes=ARRAY['Zitrone','Pink Pfeffer','Grapefruit'], heart_notes=ARRAY['Ingwer','Jasmin','Muskat'], base_notes=ARRAY['Sandelholz','Zedernholz','Weißer Moschus'] where slug='bleu-de-chanel';
update public.perfumes set top_notes=ARRAY['Oud','Palisander','Kardamom'], heart_notes=ARRAY['Sandelholz','Vetiver'], base_notes=ARRAY['Tonkabohne','Vanille','Amber'] where slug='oud-wood';
update public.perfumes set top_notes=ARRAY['Aldehyde','Ylang-Ylang','Neroli'], heart_notes=ARRAY['Jasmin','Rose','Maiglöckchen'], base_notes=ARRAY['Sandelholz','Vanille','Vetiver'] where slug='chanel-no-5';
update public.perfumes set top_notes=ARRAY['Birne','Melone','Magnolie'], heart_notes=ARRAY['Jasmin','Rose','Tuberose'], base_notes=ARRAY['Moschus','Zedernholz','Vanille'] where slug='jadore';
update public.perfumes set top_notes=ARRAY['Tee','Bergamotte'], heart_notes=ARRAY['Jasmin','Orchidee','Freesie','Rose'], base_notes=ARRAY['Patchouli','Moschus','Vanille'] where slug='flowerbomb';
update public.perfumes set top_notes=ARRAY['Ananas','Bergamotte','Schwarze Johannisbeere','Apfel'], heart_notes=ARRAY['Birke','Patchouli','Wacholder','Rose'], base_notes=ARRAY['Moschus','Eichenmoos','Ambergris','Vanille'] where slug='creed-aventus';
update public.perfumes set top_notes=ARRAY['Minze','Grüner Apfel','Zitrone'], heart_notes=ARRAY['Tonkabohne','Amber','Geranie'], base_notes=ARRAY['Vanille','Vetiver','Zedernholz'] where slug='versace-eros';
update public.perfumes set top_notes=ARRAY['Lavendel'], heart_notes=ARRAY['Iris','Ambrette'], base_notes=ARRAY['Vetiver','Zedernholz','Leder'] where slug='dior-homme-intense';
update public.perfumes set top_notes=ARRAY['Karamell'], heart_notes=ARRAY['Benzoe'], base_notes=ARRAY['Moschus','Vanille','Puder'] where slug='prada-candy';
update public.perfumes set top_notes=ARRAY['Bergamotte','Mandarine'], heart_notes=ARRAY['Honig','Rote Beeren','Pflaume'], base_notes=ARRAY['Schokolade','Karamell','Patchouli','Vanille'] where slug='mugler-angel';
update public.perfumes set top_notes=ARRAY['Grüne Mandarine','Ingwer','Wasserjasmin'], heart_notes=ARRAY['Salzige Vanille','Orangenblüte'], base_notes=ARRAY['Ambra','Sandelholz','Cashmeran'] where slug='olympea';
update public.perfumes set top_notes=ARRAY['Mandarine','Schwarze Johannisbeere'], heart_notes=ARRAY['Lavendel','Orangenblüte','Jasmin'], base_notes=ARRAY['Vanille','Moschus','Zedernholz'] where slug='ysl-libre';
update public.perfumes set top_notes=ARRAY['Pfingstrose','Freesie','Litchi'], heart_notes=ARRAY['Rose','Maiglöckchen','Magnolie'], base_notes=ARRAY['Zedernholz','Amber','Honig'] where slug='chloe-edp';
update public.perfumes set top_notes=ARRAY['Wildbeere','Grapefruit'], heart_notes=ARRAY['Veilchen','Jasmin','Gardenie'], base_notes=ARRAY['Moschus','Weißes Holz','Vanille'] where slug='marc-jacobs-daisy';
update public.perfumes set top_notes=ARRAY['Geißblatt'], heart_notes=ARRAY['Tuberose','Jasmin Sambac'], base_notes=ARRAY['Rangoon-Ranke','Iriswurzel','Sandelholz'] where slug='gucci-bloom';
update public.perfumes set top_notes=ARRAY['Bergamotte','Grapefruit','Feigenblatt'], heart_notes=ARRAY['Veilchenblatt','Schwarzer Pfeffer','Papyrus'], base_notes=ARRAY['Moschus','Patchouli','Ambrox'] where slug='versace-dylan-blue';
update public.perfumes set top_notes=ARRAY['Orange','Aldehyde','Mandarine'], heart_notes=ARRAY['Pfeffer','Neroli','Zedernholz'], base_notes=ARRAY['Tonkabohne','Weißer Moschus','Vetiver'] where slug='allure-homme-sport';

-- ============ 3) 16 weitere Duefte (inkl. Noten) ============
insert into public.perfumes
  (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Paco Rabanne'),             '1 Million',            '1-million',            'Men',    'woody',    85,  8, 8, 88, 'Winter',        'Abend',  ARRAY['Grapefruit','Minze','Blutorange'], ARRAY['Zimt','Rose','Würze'], ARRAY['Leder','Amber','Patchouli']),
  ((select id from public.brands where name='Jean Paul Gaultier'),       'Le Male',              'le-male',              'Men',    'gourmand', 80,  8, 7, 87, 'Ganzjährig',    'Abend',  ARRAY['Minze','Lavendel','Bergamotte'], ARRAY['Zimt','Kümmel','Orangenblüte'], ARRAY['Vanille','Tonkabohne','Sandelholz']),
  ((select id from public.brands where name='Maison Francis Kurkdjian'), 'Baccarat Rouge 540',   'baccarat-rouge-540',   'Unisex', 'gourmand', 320, 9, 9, 95, 'Ganzjährig',    'Abend',  ARRAY['Safran','Jasmin'], ARRAY['Amberholz','Ambergris'], ARRAY['Zedernholz','Tannenharz']),
  ((select id from public.brands where name='Yves Saint Laurent'),       'La Nuit de L''Homme',  'la-nuit-de-lhomme',    'Men',    'woody',    90,  7, 7, 90, 'Herbst/Winter', 'Date',   ARRAY['Kardamom'], ARRAY['Lavendel','Zedernholz','Kreuzkümmel'], ARRAY['Tonkabohne','Vetiver']),
  ((select id from public.brands where name='Hugo Boss'),                'Boss Bottled',         'boss-bottled',         'Men',    'woody',    70,  7, 6, 86, 'Ganzjährig',    'Büro',   ARRAY['Apfel','Bergamotte','Zitrone'], ARRAY['Zimt','Geranie','Nelke'], ARRAY['Sandelholz','Vetiver','Vanille']),
  ((select id from public.brands where name='Azzaro'),                   'The Most Wanted',      'azzaro-most-wanted',   'Men',    'gourmand', 85,  8, 8, 87, 'Winter',        'Abend',  ARRAY['Kardamom','Ingwer'], ARRAY['Bitterer Amber','Likör'], ARRAY['Tonkabohne','Holz']),
  ((select id from public.brands where name='Lattafa'),                  'Khamrah',              'khamrah',              'Unisex', 'gourmand', 35,  9, 8, 86, 'Winter',        'Abend',  ARRAY['Zimt','Bergamotte','Muskatnuss'], ARRAY['Dattel','Praline','Tuberose'], ARRAY['Vanille','Tonkabohne','Amber','Benzoe']),
  ((select id from public.brands where name='Burberry'),                 'Her',                  'burberry-her',         'Women',  'gourmand', 90,  7, 6, 84, 'Ganzjährig',    'Alltag', ARRAY['Schwarze Johannisbeere','Beeren'], ARRAY['Veilchen','Jasmin'], ARRAY['Moschus','Amber','Patchouli']),
  ((select id from public.brands where name='Givenchy'),                 'L''Interdit',          'linterdit',            'Women',  'floral',   95,  7, 7, 87, 'Ganzjährig',    'Date',   ARRAY['Birne','Bergamotte'], ARRAY['Tuberose','Orangenblüte','Jasmin'], ARRAY['Vetiver','Patchouli','Ambroxan']),
  ((select id from public.brands where name='Hermes'),                   'Terre d''Hermes',      'terre-dhermes',        'Men',    'woody',    110, 8, 7, 90, 'Ganzjährig',    'Büro',   ARRAY['Orange','Grapefruit'], ARRAY['Pfeffer','Pelargonie'], ARRAY['Vetiver','Zedernholz','Benzoe']),
  ((select id from public.brands where name='Mugler'),                   'Alien',                'mugler-alien',         'Women',  'floral',   105, 9, 8, 87, 'Herbst/Winter', 'Abend',  ARRAY['Mandarine'], ARRAY['Jasmin Sambac'], ARRAY['Cashmeran','Weißer Amber']),
  ((select id from public.brands where name='Valentino'),                'Born in Roma Donna',   'born-in-roma-donna',   'Women',  'floral',   100, 7, 7, 85, 'Ganzjährig',    'Date',   ARRAY['Schwarze Johannisbeere','Bergamotte'], ARRAY['Jasmin Sambac'], ARRAY['Vanille','Bourbon','Guajakholz']),
  ((select id from public.brands where name='Montblanc'),                'Explorer',             'montblanc-explorer',   'Men',    'woody',    65,  8, 8, 85, 'Ganzjährig',    'Alltag', ARRAY['Bergamotte','Rosa Pfeffer'], ARRAY['Vetiver','Leder'], ARRAY['Patchouli','Ambroxan','Akigalawood']),
  ((select id from public.brands where name='Giorgio Armani'),           'Si',                   'armani-si',            'Women',  'gourmand', 105, 8, 7, 88, 'Ganzjährig',    'Date',   ARRAY['Schwarze Johannisbeere'], ARRAY['Rose','Freesie'], ARRAY['Vanille','Patchouli','Moschus']),
  ((select id from public.brands where name='Yves Saint Laurent'),       'Y Eau de Parfum',      'ysl-y-edp',            'Men',    'woody',    95,  8, 7, 88, 'Ganzjährig',    'Büro',   ARRAY['Apfel','Ingwer','Bergamotte'], ARRAY['Salbei','Geranie'], ARRAY['Amberholz','Tonkabohne','Zedernholz']),
  ((select id from public.brands where name='Jean Paul Gaultier'),       'Scandal',              'jpg-scandal',          'Women',  'gourmand', 90,  8, 7, 85, 'Winter',        'Abend',  ARRAY['Blutorange','Mandarine'], ARRAY['Honig','Gardenie','Jasmin'], ARRAY['Karamell','Patchouli','Bienenwachs'])
on conflict (slug) do nothing;
