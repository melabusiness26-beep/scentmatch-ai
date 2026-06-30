-- Auressa: Charge 23 – Fehlende Dupes zu beliebten Designer-Düften.
-- Schliesst Lücken: Bleu de Chanel und Dior Sauvage hatten noch keine
-- günstige Alternative im Katalog. Faktenbasiert nach öffentlich
-- dokumentierten Duftpyramiden (Recherche Juni 2026). Eigene Texte/Daten.
-- Im Supabase SQL Editor ausführen. Wiederholbar:
--   brands  -> on conflict (name) do nothing
--   perfumes-> on conflict (slug) do nothing

-- 1) Fehlende Marke anlegen (Maison Alhambra = bekanntes Budget-Dufthaus, VAE).
insert into public.brands (name, slug, country) values
  ('Maison Alhambra', 'maison-alhambra', 'VAE')
on conflict (name) do nothing;

-- 2) Die Dupes.
insert into public.perfumes
  (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  -- Bleu de Chanel (~135.-) -> Armaf Club de Nuit Blue Iconic. Gilt als
  -- bester günstiger Bleu-de-Chanel-Klon: frisch-würzig mit Zitrus & Weihrauch.
  ((select id from public.brands where name='Armaf'),           'Club de Nuit Blue Iconic', 'armaf-cdn-blue-iconic', 'Men', 'woody', 45, 8, 8, 85, 'Ganzjährig', 'Büro',   ARRAY['Grapefruit','Zitrone'], ARRAY['Ingwer','Muskatnuss','Jasmin'], ARRAY['Weihrauch','Vetiver','Zedernholz']),
  -- Dior Sauvage (~110-125.-) -> Maison Alhambra Salvo. Inspiriert von Sauvage
  -- EdP: frisch-würzige Fougère mit Lavendel, Sichuan-Pfeffer und Ambroxan.
  ((select id from public.brands where name='Maison Alhambra'), 'Salvo',                    'maison-alhambra-salvo', 'Men', 'woody', 30, 8, 7, 84, 'Ganzjährig', 'Alltag', ARRAY['Bergamotte'], ARRAY['Lavendel','Sichuan-Pfeffer','Sternanis','Muskatnuss'], ARRAY['Ambroxan','Zedernholz','Amber'])
on conflict (slug) do nothing;
