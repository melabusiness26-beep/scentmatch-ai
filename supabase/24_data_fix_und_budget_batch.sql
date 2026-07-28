-- Auressa: Charge 24 – Datenkorrektur + weitere günstige Düfte.
-- 1) Korrektur: "by Christina Aguilera" hatte fälschlich Iris in der Herznote.
--    Öffentliche Quellen (Fragrantica/The Perfume Shop, Juli 2026) listen:
--    Kopf: Fruchtsorbet, Mandarine, Johannisbeer-Tee / Herz: Pflaume,
--    Pfingstrose, Jasmin / Basis: Amber, Moschus, Vanille.
-- 2) Drei bekannte Budget-Düfte ergänzt (faktenbasiert, gegen Bestand geprüft:
--    slugs sind neu; Khamrah, Yara, Ana Abiyedh Rouge, 9PM etc. existieren schon).
-- Im Supabase SQL Editor ausführen. Wiederholbar.

-- ============ 1) Datenkorrektur Aguilera ============
update public.perfumes set
  top_notes   = ARRAY['Fruchtsorbet','Mandarine','Johannisbeer-Tee'],
  heart_notes = ARRAY['Pflaume','Pfingstrose','Jasmin'],
  base_notes  = ARRAY['Amber','Moschus','Vanille']
where slug = 'aguilera-signature';

-- ============ 2) Neue Marken (bestehende werden ignoriert) ============
insert into public.brands (name, slug, country) values
  ('Maison Alhambra', 'maison-alhambra', 'VAE'),
  ('Zara',            'zara',            'Spanien')
on conflict (name) do nothing;

-- ============ 3) Neue günstige Düfte (inkl. Noten) ============
insert into public.perfumes
  (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  -- TikTok-Liebling im Baccarat-Rouge-Stil, sehr günstig
  ((select id from public.brands where name='Zara'),            'Red Temptation',     'zara-red-temptation',      'Women',  'gourmand', 25, 7, 6, 84, 'Ganzjährig',    'Date',   ARRAY['Safran','Mandarine'], ARRAY['Jasmin','Rose'], ARRAY['Amberholz','Vanille','Moschus']),
  -- Frisch-cleaner Grüntee-Duft, günstige Alternative im Silver-Mountain-Stil
  ((select id from public.brands where name='Armaf'),           'Club de Nuit Sillage','armaf-cdn-sillage',       'Unisex', 'clean',    45, 7, 6, 84, 'Frühling',      'Büro',   ARRAY['Bergamotte','Zitrone','Neroli'], ARRAY['Grüner Tee','Jasmin'], ARRAY['Moschus','Amber','Zedernholz']),
  -- Warmer Cognac-Zimt-Gourmand (Angels'-Share-Stil), günstige Zimt-Option
  ((select id from public.brands where name='Maison Alhambra'), 'Kismet Angel',       'alhambra-kismet-angel',    'Unisex', 'gourmand', 35, 8, 7, 85, 'Herbst/Winter', 'Abend',  ARRAY['Cognac','Zimt'], ARRAY['Tonkabohne','Praline'], ARRAY['Vanille','Eichenholz','Amber']);
