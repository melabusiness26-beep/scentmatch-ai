-- Auressa: Charge 24 – Weitere Dupes zu beliebten Designer-Düften.
-- Schliesst Lücken: Versace Eros und JPG Le Male hatten noch keine
-- günstige Alternative im Katalog. Faktenbasiert nach öffentlich
-- dokumentierten Duftpyramiden (Recherche Juni 2026). Eigene Texte/Daten.
-- Marke 'Maison Alhambra' wird in Charge 23 angelegt; hier zur Sicherheit
-- nochmals mit on conflict (kein Duplikat).
-- Im Supabase SQL Editor ausführen. Wiederholbar (on conflict do nothing).
-- Hinweis: Für Paco Rabanne 1 Million wurde bewusst KEIN Dupe ergänzt,
-- da sich kein gut belegter, in der Schweiz erhältlicher Budget-Klon fand.

insert into public.brands (name, slug, country) values
  ('Maison Alhambra', 'maison-alhambra', 'VAE')
on conflict (name) do nothing;

insert into public.perfumes
  (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  -- Versace Eros (~75.-) -> Maison Alhambra Versencia Oro. Gilt als sehr naher
  -- Eros-Klon: frisch-minzig mit süsser Vanille und Tonka.
  ((select id from public.brands where name='Maison Alhambra'), 'Versencia Oro',   'maison-alhambra-versencia-oro', 'Men', 'woody',    30, 7, 7, 84, 'Ganzjährig',    'Date',  ARRAY['Minze','Zitrone','Apfel'], ARRAY['Geranie','Tonkabohne','Ambroxan'], ARRAY['Vanille','Zedernholz','Eichenmoos']),
  -- JPG Le Male (Le Parfum, ~110.-) -> Maison Alhambra Glacier Le Noir. Bekannter
  -- Klon der Le-Male-Reihe: würziger Kardamom, Lavendel und warme Vanille.
  ((select id from public.brands where name='Maison Alhambra'), 'Glacier Le Noir', 'maison-alhambra-glacier-le-noir', 'Men', 'gourmand', 30, 9, 8, 85, 'Herbst/Winter', 'Abend', ARRAY['Kardamom','Schwarzer Pfeffer'], ARRAY['Lavendel','Iris'], ARRAY['Vanille','Holznoten','Amber'])
on conflict (slug) do nothing;
