-- Auressa: Charge 17 – zweiter Gegenstueck-Durchgang (gegen Bestand verifiziert).
-- Nur Duefte, die NACHWEISLICH noch nicht im Katalog sind. Alle Marken existieren.
-- Faktenbasiert nach oeffentlich dokumentierten Duftpyramiden.
-- Im Supabase SQL Editor ausfuehren. Wiederholbar: on conflict (slug) do nothing.

insert into public.perfumes
  (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Calvin Klein'),       'Euphoria Men',         'ck-euphoria-men',                 'Men',    'woody',     55, 7, 7, 84, 'Herbst/Winter', 'Abend',  ARRAY['Pfeffer','Ingwer'], ARRAY['Salbei','Basilikum'], ARRAY['Patchouli','Amber','Leder']),
  ((select id from public.brands where name='Gucci'),              'Guilty Pour Femme',    'gucci-guilty-femme',              'Women',  'floral',    90, 7, 6, 84, 'Ganzjährig',    'Date',   ARRAY['Mandarine','Rosa Pfeffer'], ARRAY['Flieder','Pfirsich','Geranie'], ARRAY['Patchouli','Amber']),
  ((select id from public.brands where name='Kenzo'),              'Kenzo Homme',          'kenzo-homme',                     'Men',    'clean',     60, 6, 5, 82, 'Sommer',        'Alltag', ARRAY['Meeresnoten','Minze'], ARRAY['Muskatnuss','Pfeffer'], ARRAY['Zedernholz','Moschus']),
  ((select id from public.brands where name='Lacoste'),            'Pour Femme',           'lacoste-pour-femme',              'Women',  'floral',    60, 6, 6, 82, 'Ganzjährig',    'Date',   ARRAY['Pflaume','Magnolie'], ARRAY['Jasmin','Rose'], ARRAY['Sandelholz','Vanille','Moschus']),
  ((select id from public.brands where name='Joop!'),              'Femme',                'joop-femme',                      'Women',  'gourmand',  45, 7, 7, 82, 'Herbst/Winter', 'Abend',  ARRAY['Orangenblüte','Mandarine'], ARRAY['Jasmin','Heliotrop'], ARRAY['Vanille','Sandelholz','Honig','Moschus']),
  ((select id from public.brands where name='Abercrombie & Fitch'),'First Instinct Woman', 'abercrombie-first-instinct-woman','Women',  'floral',    60, 6, 5, 80, 'Frühling',      'Alltag', ARRAY['Himbeere','Kirschblüte'], ARRAY['Lotusblüte','Pfingstrose'], ARRAY['Moschus','Zedernholz']),
  ((select id from public.brands where name='Laura Biagiotti'),    'Roma Uomo',            'laura-biagiotti-roma-uomo',       'Men',    'woody',     45, 7, 6, 82, 'Herbst/Winter', 'Abend',  ARRAY['Bergamotte','Zitrone','Salbei'], ARRAY['Wacholder','Gewürznelke'], ARRAY['Leder','Tabak','Vetiver']),
  ((select id from public.brands where name='Bvlgari'),            'Aqva pour Homme',      'bvlgari-aqva-pour-homme',         'Men',    'woody',     75, 6, 6, 83, 'Sommer',        'Alltag', ARRAY['Mandarine','Petitgrain'], ARRAY['Posidonia','Mineral-Amber'], ARRAY['Holznoten','Moschus']),
  ((select id from public.brands where name='Hermes'),             'Twilly d''Hermès',     'hermes-twilly',                   'Women',  'floral',   110, 7, 6, 85, 'Ganzjährig',    'Date',   ARRAY['Ingwer'], ARRAY['Tuberose','Jasmin'], ARRAY['Sandelholz'])
on conflict (slug) do nothing;
