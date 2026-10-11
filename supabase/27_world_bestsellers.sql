-- Auressa: World Bestsellers – Part 1 (Chanel, Dior, YSL, Armani)
-- ~100 most-photographed perfumes worldwide

-- CHANEL
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Chanel'), 'N°5', 'chanel-no5', 'Women', 'floral', 145, 8, 7, 92, 'Ganzjährig', 'Abend', ARRAY['Neroli','Ylang-Ylang','Aldehyde'], ARRAY['Rose','Jasmin','Lilie'], ARRAY['Sandelholz','Vetiver','Moschus'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Chanel'), 'Coco Mademoiselle', 'chanel-coco-mademoiselle', 'Women', 'floral', 140, 8, 8, 94, 'Ganzjährig', 'Alltag', ARRAY['Orange','Bergamotte','Grapefruit'], ARRAY['Rose','Jasmin','Mimose'], ARRAY['Patchouli','Vetiver','Moschus'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Chanel'), 'Bleu de Chanel', 'chanel-bleu-de-chanel', 'Men', 'woody', 145, 8, 7, 93, 'Ganzjährig', 'Büro', ARRAY['Grapefruit','Zitrone','Minze'], ARRAY['Ingwer','Nutmeg','Jasmin'], ARRAY['Sandelholz','Zeder','Weißer Moschus'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Chanel'), 'Chance Eau Tendre', 'chanel-chance-eau-tendre', 'Women', 'floral', 135, 7, 6, 88, 'Frühling', 'Alltag', ARRAY['Grapefruit','Quitte','Bergamotte'], ARRAY['Jasmin','Rose','Hyazinthe'], ARRAY['Weiße Moschus','Zeder','Amber'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Chanel'), 'Chance', 'chanel-chance', 'Women', 'floral', 135, 7, 7, 87, 'Ganzjährig', 'Alltag', ARRAY['Ananas','Grapefruit','Hyazinthe'], ARRAY['Jasmin','Iris','Rose'], ARRAY['Patchouli','Amber','Moschus'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Chanel'), 'Chance Eau Fraîche', 'chanel-chance-eau-fraiche', 'Women', 'clean', 135, 6, 6, 84, 'Sommer', 'Alltag', ARRAY['Zitrone','Wassermelone','Bergamotte'], ARRAY['Jasmin','Iris','Rose'], ARRAY['Teak','Amber','Moschus'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Chanel'), 'N°19', 'chanel-no19', 'Women', 'floral', 140, 7, 6, 85, 'Frühling', 'Büro', ARRAY['Galbanum','Neroli','Bergamotte'], ARRAY['Iris','Rose','Jasmin'], ARRAY['Eichenmoos','Sandelholz','Moschus'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Chanel'), 'Coco Noir', 'chanel-coco-noir', 'Women', 'woody', 145, 8, 7, 89, 'Herbst', 'Abend', ARRAY['Bergamotte','Grapefruit','Neroli'], ARRAY['Rose','Jasmin','Geranium'], ARRAY['Patchouli','Sandelholz','Weißer Moschus'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Chanel'), 'Allure Homme Sport', 'chanel-allure-homme-sport', 'Men', 'clean', 120, 6, 6, 84, 'Sommer', 'Sport', ARRAY['Zitrus','Mandarine','Bergamotte'], ARRAY['Neroli','Leder','Lavendel'], ARRAY['Tonka','Weißer Moschus','Sandelholz'])
  on conflict (slug) do nothing;

-- DIOR
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Dior'), 'Sauvage', 'dior-sauvage', 'Men', 'woody', 130, 9, 8, 96, 'Ganzjährig', 'Alltag', ARRAY['Bergamotte','Pfeffer'], ARRAY['Sichuan-Pfeffer','Geranium','Lavendel'], ARRAY['Ambroxan','Zeder','Labdanum'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Dior'), 'Miss Dior', 'dior-miss-dior', 'Women', 'floral', 130, 7, 7, 91, 'Frühling', 'Alltag', ARRAY['Blutorange','Bergamotte'], ARRAY['Rose','Pfingstrose','Maiglöckchen'], ARRAY['Weißer Moschus','Patchouli','Vetiver'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Dior'), 'Miss Dior Blooming Bouquet', 'dior-miss-dior-blooming-bouquet', 'Women', 'floral', 125, 6, 6, 87, 'Frühling', 'Alltag', ARRAY['Mandarine','Grapefruit','Blutorange'], ARRAY['Pfingstrose','Rose','Magnolia'], ARRAY['Weißer Moschus','Zeder'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Dior'), 'J''adore', 'dior-jadore', 'Women', 'floral', 135, 7, 7, 90, 'Ganzjährig', 'Abend', ARRAY['Birne','Melone','Bergamotte'], ARRAY['Rose','Jasmin','Ylang-Ylang'], ARRAY['Moschus','Zeder','Amber'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Dior'), 'Fahrenheit', 'dior-fahrenheit', 'Men', 'woody', 110, 8, 7, 88, 'Herbst', 'Abend', ARRAY['Zitrone','Bergamotte','Hawthorn'], ARRAY['Veilchen','Moschus','Nutmeg'], ARRAY['Leder','Amber','Zeder'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Dior'), 'Poison Girl', 'dior-poison-girl', 'Women', 'gourmand', 115, 8, 7, 87, 'Winter', 'Abend', ARRAY['Bitterorange','Bergamotte','Grapefruit'], ARRAY['Grasse Rose','Geranium'], ARRAY['Sandelholz','Vanille','Tonka'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Dior'), 'Dior Homme Intense', 'dior-homme-intense', 'Men', 'floral', 120, 9, 7, 90, 'Herbst', 'Büro', ARRAY['Lavendel','Bergamotte','Iris'], ARRAY['Iris','Veilchen','Weihrauch'], ARRAY['Ambrette','Zeder','Vanille'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Dior'), 'Hypnotic Poison', 'dior-hypnotic-poison', 'Women', 'gourmand', 115, 9, 8, 89, 'Winter', 'Abend', ARRAY['Bittermandel','Aprikose','Bergamotte'], ARRAY['Jasmin','Pflaume','Rose'], ARRAY['Moschus','Vanille','Sandelholz'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Dior'), 'Sauvage Elixir', 'dior-sauvage-elixir', 'Men', 'woody', 195, 10, 9, 95, 'Winter', 'Abend', ARRAY['Grapefruit','Nutmeg','Kardamom'], ARRAY['Lavendel','Geranium','Pfeffer'], ARRAY['Amber','Sandelholz','Zeder'])
  on conflict (slug) do nothing;

-- YSL
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Yves Saint Laurent'), 'Black Opium', 'ysl-black-opium', 'Women', 'gourmand', 120, 8, 8, 93, 'Herbst', 'Abend', ARRAY['Pink Pfeffer','Birne','Mandarine'], ARRAY['Kaffee','Jasmin','Bittermandel'], ARRAY['Patchouli','Zeder','Vanille','Kaschmir'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Yves Saint Laurent'), 'Libre', 'ysl-libre', 'Women', 'floral', 120, 8, 8, 92, 'Ganzjährig', 'Alltag', ARRAY['Mandarine','Schwarze Johannisbeere','Lavendel'], ARRAY['Orangenblüte','Jasmin','Lavendel'], ARRAY['Vanille','Amber','Zeder','Moschus'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Yves Saint Laurent'), 'Mon Paris', 'ysl-mon-paris', 'Women', 'floral', 110, 7, 7, 88, 'Frühling', 'Date', ARRAY['Erdbeer','Birne','Himbeere'], ARRAY['Pfingstrose','Rose','Jasmin'], ARRAY['Weißer Moschus','Patchouli','Amber'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Yves Saint Laurent'), 'L''Homme', 'ysl-lhomme', 'Men', 'woody', 100, 7, 7, 88, 'Ganzjährig', 'Büro', ARRAY['Bergamotte','Ingwer','Zitronen'], ARRAY['Basilikum','Veilchen','Ingwer'], ARRAY['Zeder','Weiße Tonne','Vetiver'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Yves Saint Laurent'), 'Y Eau de Parfum', 'ysl-y-edp', 'Men', 'woody', 115, 8, 8, 90, 'Ganzjährig', 'Alltag', ARRAY['Bergamotte','Apfel','Ingwer'], ARRAY['Salbei','Moschus','Geranium'], ARRAY['Amber','Zeder','Vetiver'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Yves Saint Laurent'), 'Opium', 'ysl-opium', 'Women', 'woody', 105, 9, 8, 86, 'Winter', 'Abend', ARRAY['Mandarine','Pflaume','Bergamotte'], ARRAY['Rose','Jasmin','Lily'], ARRAY['Pathouli','Vetiver','Amber','Sandelholz'])
  on conflict (slug) do nothing;

-- GIORGIO ARMANI
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Giorgio Armani'), 'Acqua di Gioia', 'armani-acqua-di-gioia', 'Women', 'clean', 105, 7, 6, 87, 'Sommer', 'Alltag', ARRAY['Limette','Zitrone','Minze'], ARRAY['Pfingstrose','Jasmin','Lagunenwasser'], ARRAY['Zeder','Brasilianischer Labradorit','Moschus'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Giorgio Armani'), 'Si', 'armani-si', 'Women', 'floral', 115, 7, 7, 90, 'Ganzjährig', 'Büro', ARRAY['Schwarze Johannisbeere','Bergamotte','Mandarine'], ARRAY['Rose','Freesie','Rosenholz'], ARRAY['Patchouli','Amber','Moschus','Vanille'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Giorgio Armani'), 'Si Passione', 'armani-si-passione', 'Women', 'floral', 120, 8, 7, 89, 'Herbst', 'Date', ARRAY['Schwarze Johannisbeere','Birne','Pfirsich'], ARRAY['Rose','Pfingstrose','Jasmin'], ARRAY['Patchouli','Amber','Vanille'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Giorgio Armani'), 'Acqua di Gio', 'armani-acqua-di-gio', 'Men', 'clean', 100, 6, 6, 87, 'Sommer', 'Alltag', ARRAY['Zitrusfrüchte','Bergamotte','Meeresnoten'], ARRAY['Jasmin','Geranium','Calycanthus'], ARRAY['Zeder','Moschus','Amber'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Giorgio Armani'), 'Acqua di Gio Profumo', 'armani-acqua-di-gio-profumo', 'Men', 'woody', 120, 8, 7, 90, 'Sommer', 'Büro', ARRAY['Bergamotte','Zitrus','Meersalz'], ARRAY['Geranium','Weihrauch'], ARRAY['Patchouli','Vetiver','Moschus'])
  on conflict (slug) do nothing;

-- PACO RABANNE
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Paco Rabanne'), '1 Million', 'paco-rabanne-1-million', 'Men', 'woody', 105, 8, 9, 93, 'Herbst', 'Abend', ARRAY['Blutorange','Grapefruit','Minze'], ARRAY['Rose','Zimt','Gewürznelke'], ARRAY['Leder','Patchouli','Amber'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Paco Rabanne'), 'Olympéa', 'paco-rabanne-olympea', 'Women', 'gourmand', 105, 8, 8, 91, 'Ganzjährig', 'Alltag', ARRAY['Grüner Mandarine','Ingwer','Salz'], ARRAY['Jasmin','Sandelholz','Cashmere'], ARRAY['Vanille','Amber','Weißer Moschus'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Paco Rabanne'), 'Lady Million', 'paco-rabanne-lady-million', 'Women', 'floral', 100, 7, 8, 89, 'Herbst', 'Abend', ARRAY['Grapefruit','Himbeer','Bergamotte'], ARRAY['Arabische Jasmin','Gardenie','Orange Blossom'], ARRAY['Honig','Patchouli','Amber'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Paco Rabanne'), 'Invictus', 'paco-rabanne-invictus', 'Men', 'clean', 100, 7, 8, 89, 'Sommer', 'Sport', ARRAY['Grapefruit','Meeresluft','Minze'], ARRAY['Lorbeer','Jasmin','Hedione'], ARRAY['Eiche','Moschus','Amber'])
  on conflict (slug) do nothing;

-- VIKTOR & ROLF
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Viktor & Rolf'), 'Flowerbomb', 'viktor-rolf-flowerbomb', 'Women', 'floral', 130, 9, 9, 95, 'Ganzjährig', 'Abend', ARRAY['Bergamotte','Tee','Osmanthus'], ARRAY['Orchidee','Jasmin','Freesie','Cattleya Orchidee'], ARRAY['Moschus','Patchouli','Amber','Vanille'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Viktor & Rolf'), 'Spicebomb', 'viktor-rolf-spicebomb', 'Men', 'woody', 110, 8, 7, 88, 'Winter', 'Abend', ARRAY['Pink Pfeffer','Grapefruit'], ARRAY['Vetyver','Safran','Tabak'], ARRAY['Leder','Chili','Elemi'])
  on conflict (slug) do nothing;

-- MUGLER
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Mugler'), 'Angel', 'mugler-angel', 'Women', 'gourmand', 115, 10, 9, 92, 'Winter', 'Abend', ARRAY['Melone','Kokosnuss','Schwarze Johannisbeere'], ARRAY['Honig','Schokolade','Pfingstrose'], ARRAY['Vanille','Caramel','Patchouli'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Mugler'), 'Alien', 'mugler-alien', 'Women', 'woody', 120, 10, 9, 91, 'Winter', 'Abend', ARRAY['Jasmin'], ARRAY['Cashmeran','Weiße Amber'], ARRAY['Weißer Moschus'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Mugler'), 'Angel Nova', 'mugler-angel-nova', 'Women', 'gourmand', 110, 8, 8, 87, 'Herbst', 'Abend', ARRAY['Bergamotte','Rhabarber'], ARRAY['Rose','Cassia','Ylang-Ylang'], ARRAY['Patchouli','Vanille','Amber'])
  on conflict (slug) do nothing;

-- CAROLINA HERRERA
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Carolina Herrera'), 'Good Girl', 'carolina-herrera-good-girl', 'Women', 'gourmand', 115, 9, 8, 92, 'Herbst', 'Abend', ARRAY['Kaffeebohne','Mandel'], ARRAY['Jasmin','Tuberose'], ARRAY['Tonka','Kakao','Moschus'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Carolina Herrera'), '212 NYC', 'carolina-herrera-212-nyc', 'Women', 'floral', 95, 6, 6, 84, 'Frühling', 'Alltag', ARRAY['Holunder','Magnolia','Meeresluft'], ARRAY['Gardenie','Maiglöckchen','Veilchen'], ARRAY['Weißer Moschus','Sandelholz'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Carolina Herrera'), '212 Sexy', 'carolina-herrera-212-sexy', 'Women', 'woody', 100, 7, 7, 86, 'Herbst', 'Date', ARRAY['Pink Pfeffer','Bergamotte'], ARRAY['Rote Johannisbeere','Maiglöckchen','Litschi'], ARRAY['Amber','Moschus','Sandelholz'])
  on conflict (slug) do nothing;

-- VALENTINO
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Valentino'), 'Donna Born in Roma', 'valentino-donna-born-in-roma', 'Women', 'gourmand', 120, 8, 7, 90, 'Herbst', 'Alltag', ARRAY['Schwarze Johannisbeere','Bergamotte'], ARRAY['Jasmin','Geranium','Rosenholz'], ARRAY['Vanille','Moschus','Zeder'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Valentino'), 'Voce Viva', 'valentino-voce-viva', 'Women', 'floral', 115, 7, 7, 87, 'Frühling', 'Alltag', ARRAY['Bergamotte','Zitrone'], ARRAY['Freesie','Jasmin','Iris'], ARRAY['Moschus','Amber','Vanille'])
  on conflict (slug) do nothing;

-- HUGO BOSS
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Hugo Boss'), 'Boss Bottled', 'hugo-boss-boss-bottled', 'Men', 'woody', 80, 7, 6, 86, 'Herbst', 'Büro', ARRAY['Apfel','Pflaume','Bergamotte'], ARRAY['Geranium','Cinnamon','Cardamom'], ARRAY['Sandelholz','Vanille','Zeder'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Hugo Boss'), 'Hugo', 'hugo-boss-hugo-edt', 'Men', 'clean', 75, 6, 6, 82, 'Sommer', 'Alltag', ARRAY['Minze','Apfel','Lavendel'], ARRAY['Jasmin','Geranium','Rüster'], ARRAY['Eiche','Moschus','Zeder'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Hugo Boss'), 'Boss The Scent', 'hugo-boss-the-scent', 'Men', 'woody', 95, 8, 7, 88, 'Herbst', 'Date', ARRAY['Ingwer','Pfirsich'], ARRAY['Maniguette Pfeffer','Birkenblätter'], ARRAY['Leder','Moschus'])
  on conflict (slug) do nothing;

-- LANCOME
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Lancome'), 'La Vie Est Belle', 'lancome-la-vie-est-belle', 'Women', 'gourmand', 120, 8, 8, 93, 'Ganzjährig', 'Alltag', ARRAY['Schwarze Johannisbeere','Birne'], ARRAY['Iris','Jasmin','Orange Blossom'], ARRAY['Pralinen-Amber','Patchouli','Vanille','Tonka'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Lancome'), 'Idôle', 'lancome-idole', 'Women', 'floral', 110, 7, 7, 88, 'Frühling', 'Büro', ARRAY['Bergamotte','Birne'], ARRAY['Rose','Jasmin','Veilchen'], ARRAY['Moschus','Amber','Sandelholz'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Lancome'), 'Trésor', 'lancome-tresor', 'Women', 'floral', 110, 8, 7, 87, 'Ganzjährig', 'Abend', ARRAY['Pfirsich','Aprikose','Bergamotte'], ARRAY['Rose','Pfingstrose','Iris','Lilie'], ARRAY['Sandelholz','Amber','Moschus','Vanille'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Lancome'), 'Miracle', 'lancome-miracle', 'Women', 'floral', 100, 6, 6, 84, 'Frühling', 'Alltag', ARRAY['Litschi','Grapefruit','Ingwer'], ARRAY['Magnolia','Jasmin','Rose'], ARRAY['Moschus','Amber','Sandelholz'])
  on conflict (slug) do nothing;


-- GIVENCHY
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Givenchy'), 'Irresistible', 'givenchy-irresistible', 'Women', 'floral', 110, 7, 7, 88, 'Ganzjährig', 'Alltag', ARRAY['Bergamotte','Rhabarber'], ARRAY['Damaszenerrose','Freesie','Muskatblüte'], ARRAY['Weißer Moschus','Amber','Zeder'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Givenchy'), 'L''Interdit', 'givenchy-linterdit', 'Women', 'floral', 115, 8, 7, 90, 'Ganzjährig', 'Abend', ARRAY['Birne','Orange','Bergamotte'], ARRAY['Orangenblüte','Jasmin','Tuberose'], ARRAY['Patchouli','Vetiver','Weißer Moschus'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Givenchy'), 'Gentleman Givenchy', 'givenchy-gentleman', 'Men', 'woody', 105, 8, 7, 87, 'Herbst', 'Büro', ARRAY['Bergamotte','Zitrone','Pfeffer'], ARRAY['Iris','Lavendel','Pfingstrose'], ARRAY['Sandelholz','Vetiver','Amber'])
  on conflict (slug) do nothing;

-- VERSACE
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Versace'), 'Eros', 'versace-eros', 'Men', 'woody', 95, 9, 8, 90, 'Sommer', 'Abend', ARRAY['Minze','Grüner Apfel','Zitrone'], ARRAY['Tonkabohne','Geranium','Ambroxan'], ARRAY['Vanille','Vetiver','Eiche','Moschus'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Versace'), 'Bright Crystal', 'versace-bright-crystal', 'Women', 'floral', 90, 6, 6, 84, 'Frühling', 'Alltag', ARRAY['Granatapfel','Yuzu','Eis'], ARRAY['Pfingstrose','Magnolia','Lotusblüte'], ARRAY['Amber','Mahagoni','Moschus'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Versace'), 'Dylan Blue', 'versace-dylan-blue', 'Men', 'woody', 95, 8, 7, 87, 'Ganzjährig', 'Büro', ARRAY['Wasser Akkord','Grapefruit','Feige'], ARRAY['Veilchenblatt','Papyrus','Patchouli'], ARRAY['Moschus','Amber','Inkens'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Versace'), 'Crystal Noir', 'versace-crystal-noir', 'Women', 'floral', 90, 8, 7, 87, 'Herbst', 'Abend', ARRAY['Pfeffer','Ingwer','Kardamom'], ARRAY['Gardenie','Kokosnuss','Orange'], ARRAY['Amber','Sandelholz','Moschus'])
  on conflict (slug) do nothing;

-- GUCCI
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Gucci'), 'Bloom', 'gucci-bloom', 'Women', 'floral', 110, 7, 7, 89, 'Frühling', 'Alltag', ARRAY['Saftiger Aprikose'], ARRAY['Tuberose','Jasmin','Rangoon Creeper'], ARRAY['Weißer Moschus'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Gucci'), 'Guilty', 'gucci-guilty', 'Women', 'floral', 105, 7, 7, 87, 'Ganzjährig', 'Alltag', ARRAY['Pink Pfeffer','Mandarine','Litschi'], ARRAY['Geranium','Flieder','Jasmin'], ARRAY['Patchouli','Amber','Moschus'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Gucci'), 'Gucci Guilty Pour Homme', 'gucci-guilty-homme', 'Men', 'woody', 105, 7, 7, 86, 'Ganzjährig', 'Büro', ARRAY['Lavendel','Lemon','Rosa Pfeffer'], ARRAY['Orangenblüte','Zeder','Iris'], ARRAY['Patchouli','Amber','Leder'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Gucci'), 'Flora by Gucci', 'gucci-flora', 'Women', 'floral', 95, 6, 6, 84, 'Frühling', 'Alltag', ARRAY['Zitrus','Pink Pfeffer'], ARRAY['Pfingstrose','Rose','Jasmin'], ARRAY['Sandelholz','Moschus','Patchouli'])
  on conflict (slug) do nothing;

-- BURBERRY
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Burberry'), 'Her', 'burberry-her', 'Women', 'floral', 100, 7, 7, 88, 'Herbst', 'Alltag', ARRAY['Rote Beeren','Schwarze Johannisbeere','Erdbeere'], ARRAY['Jasmin','Veilchen','Iris'], ARRAY['Amber','Moschus','Sandelholz'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Burberry'), 'Hero', 'burberry-hero-edp', 'Men', 'woody', 105, 8, 7, 88, 'Herbst', 'Büro', ARRAY['Bergamotte','Schwarzer Pfeffer'], ARRAY['Zeder','Wacholder','Vetiver'], ARRAY['Sandelholz','Amber','Moschus'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Burberry'), 'Mr. Burberry', 'burberry-mr-burberry', 'Men', 'woody', 95, 7, 7, 85, 'Herbst', 'Büro', ARRAY['Bergamotte','Ingwer','Kamille'], ARRAY['Pfeffer','Petersilie','Weihrauch'], ARRAY['Vetiver','Sandelholz','Eiche'])
  on conflict (slug) do nothing;

-- PRADA
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Prada'), 'Candy', 'prada-candy', 'Women', 'gourmand', 115, 8, 7, 88, 'Winter', 'Abend', ARRAY['Muskovado','Karamel'], ARRAY['Weißer Moschus','Benzoin'], ARRAY['Vanille','Benzoe','Karamell'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Prada'), 'Luna Rossa Ocean', 'prada-luna-rossa-ocean', 'Men', 'clean', 115, 8, 7, 88, 'Sommer', 'Sport', ARRAY['Bergamotte','Zitrone'], ARRAY['Rosmarin','Lavendel'], ARRAY['Amber','Moschus','Zeder'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Prada'), 'Infusion d''Iris', 'prada-infusion-diris', 'Women', 'floral', 130, 7, 5, 87, 'Frühling', 'Büro', ARRAY['Mandarine','Galbanum'], ARRAY['Iris','Orangenblüte'], ARRAY['Zeder','Weißer Moschus','Amber'])
  on conflict (slug) do nothing;

-- DOLCE & GABBANA
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Dolce & Gabbana'), 'Light Blue', 'dg-light-blue', 'Women', 'clean', 90, 6, 6, 87, 'Sommer', 'Alltag', ARRAY['Sizilianische Zitrone','Apfel','Blaubeere'], ARRAY['Jasmin','Weißer Rose','Bambus'], ARRAY['Zeder','Amber','Moschus'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Dolce & Gabbana'), 'Light Blue Homme', 'dg-light-blue-homme', 'Men', 'clean', 90, 6, 6, 85, 'Sommer', 'Alltag', ARRAY['Wacholderbeere','Grapefruit','Bergamotte'], ARRAY['Rosmarin','Bambus','Rosen'], ARRAY['Weißholz','Amber','Moschus'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Dolce & Gabbana'), 'The One', 'dg-the-one', 'Women', 'floral', 100, 8, 7, 89, 'Ganzjährig', 'Abend', ARRAY['Litschi','Mandarine','Bergamotte'], ARRAY['Jasmin','Pfingstrose','Lilie'], ARRAY['Amber','Vanille','Moschus'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Dolce & Gabbana'), 'The One for Men', 'dg-the-one-men', 'Men', 'woody', 100, 8, 7, 88, 'Herbst', 'Büro', ARRAY['Grapefruit','Basilikum','Koriander'], ARRAY['Ingwer','Kardamom','Orangenblüte'], ARRAY['Amber','Tabak','Zeder'])
  on conflict (slug) do nothing;


-- HERMES
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Hermes'), 'Twilly d''Hermès', 'hermes-twilly', 'Women', 'floral', 120, 7, 6, 87, 'Frühling', 'Alltag', ARRAY['Ingwer','Safran','Tuberose'], ARRAY['Tuberose','Rose','Iris'], ARRAY['Sandelholz','Moschus','Zeder'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Hermes'), 'H24', 'hermes-h24', 'Men', 'clean', 120, 7, 6, 86, 'Ganzjährig', 'Büro', ARRAY['Grüne Pflanze','Salbei'], ARRAY['Scharlachsalbei','Nelke'], ARRAY['Holz','Ambroxan','Vetiver'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Hermes'), 'Terre d''Hermès', 'hermes-terre', 'Men', 'woody', 130, 8, 7, 90, 'Herbst', 'Büro', ARRAY['Grapefruit','Orange','Zitrone'], ARRAY['Pfeffer','Vetiver','Weihrauchharz'], ARRAY['Benzoe','Silex','Zeder'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Hermes'), 'Un Jardin sur le Nil', 'hermes-jardin-nil', 'Unisex', 'floral', 120, 5, 5, 83, 'Sommer', 'Alltag', ARRAY['Grüne Tomate','Grapefruit','Bitterorange'], ARRAY['Lotus','Iris','Zeder'], ARRAY['Zeder','Moschus'])
  on conflict (slug) do nothing;

-- GUERLAIN
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Guerlain'), 'La Petite Robe Noire', 'guerlain-la-petite-robe-noire', 'Women', 'gourmand', 115, 7, 7, 88, 'Herbst', 'Abend', ARRAY['Schwarze Johannisbeere','Rote Berries','Bergamotte'], ARRAY['Rose','Iris'], ARRAY['Kaschmir','Moschus','Amber','Patschuli'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Guerlain'), 'Mon Guerlain', 'guerlain-mon-guerlain', 'Women', 'floral', 110, 7, 7, 88, 'Frühling', 'Alltag', ARRAY['Bergamotte','Lavendel'], ARRAY['Lavendel','Jasmin','Iris'], ARRAY['Vanille','Sandelholz','Tonka'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Guerlain'), 'Shalimar', 'guerlain-shalimar', 'Women', 'woody', 120, 9, 8, 88, 'Winter', 'Abend', ARRAY['Bergamotte','Zitrone','Iris'], ARRAY['Rose','Jasmin','Veilchen'], ARRAY['Amber','Opopanax','Vanille','Leder'])
  on conflict (slug) do nothing;

-- JO MALONE
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Jo Malone'), 'Wood Sage & Sea Salt', 'jo-malone-wood-sage-sea-salt', 'Unisex', 'clean', 150, 6, 5, 87, 'Sommer', 'Alltag', ARRAY['Meersalz','Ambrette'], ARRAY['Salbei'], ARRAY['Driftwood'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Jo Malone'), 'Peony & Blush Suede', 'jo-malone-peony-blush-suede', 'Women', 'floral', 155, 6, 5, 87, 'Frühling', 'Alltag', ARRAY['Rote Johannisbeere'], ARRAY['Pfingstrose','Apfelsine','Jasmin'], ARRAY['Wildrose','Amber','Velours'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Jo Malone'), 'Lime Basil & Mandarin', 'jo-malone-lime-basil-mandarin', 'Unisex', 'clean', 145, 5, 5, 84, 'Sommer', 'Alltag', ARRAY['Limette','Mandarine'], ARRAY['Basilikum','Weißer Thymian'], ARRAY['Amber','Patchouli'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Jo Malone'), 'English Pear & Freesia', 'jo-malone-english-pear-freesia', 'Unisex', 'floral', 155, 5, 5, 85, 'Herbst', 'Alltag', ARRAY['Birne','Calabrese Bergamotte'], ARRAY['Freesie','Rosenholz'], ARRAY['Patchouli','Rambutan','Amber'])
  on conflict (slug) do nothing;

-- NARCISO RODRIGUEZ
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Narciso Rodriguez'), 'For Her', 'narciso-rodriguez-for-her', 'Women', 'floral', 95, 7, 6, 87, 'Ganzjährig', 'Alltag', ARRAY['Moschus'], ARRAY['Rose','Veilchen','Amber'], ARRAY['Moschus','Sandelholz','Vetiver'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Narciso Rodriguez'), 'Bleu Noir', 'narciso-rodriguez-bleu-noir', 'Men', 'woody', 100, 8, 7, 87, 'Herbst', 'Büro', ARRAY['Bergamotte','Kardamom','Mandarine'], ARRAY['Iris','Amber','Vetiver'], ARRAY['Sandelholz','Moschus','Zeder'])
  on conflict (slug) do nothing;

-- ISSEY MIYAKE
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Issey Miyake'), 'L''Eau d''Issey', 'issey-miyake-leau-dissey', 'Women', 'clean', 85, 6, 5, 83, 'Sommer', 'Alltag', ARRAY['Wasser','Lotosblüte','Zitrus'], ARRAY['Rose','Maiglöckchen','Cyclamen'], ARRAY['Sandelholz','Moschus'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Issey Miyake'), 'L''Eau d''Issey pour Homme', 'issey-miyake-homme', 'Men', 'clean', 85, 6, 6, 84, 'Sommer', 'Alltag', ARRAY['Meluzzo','Bergamotte','Zitrone'], ARRAY['Calone','Nutmeg','Lilie'], ARRAY['Moschus','Zeder','Vetiver'])
  on conflict (slug) do nothing;

-- CALVIN KLEIN
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Calvin Klein'), 'CK One', 'calvin-klein-ck-one', 'Unisex', 'clean', 65, 5, 5, 80, 'Sommer', 'Alltag', ARRAY['Bergamotte','Kardomom','Ananas'], ARRAY['Jasmin','Veilchen','Lilie'], ARRAY['Amber','Moschus','Sandelholz'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Calvin Klein'), 'Eternity', 'calvin-klein-eternity', 'Women', 'floral', 70, 6, 6, 82, 'Frühling', 'Alltag', ARRAY['Hyazinthe','Mandarine','Zitrone'], ARRAY['Maiglöckchen','Iris','Rose'], ARRAY['Amber','Sandelholz','Vetiver'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Calvin Klein'), 'Obsession', 'calvin-klein-obsession', 'Women', 'woody', 70, 9, 8, 85, 'Winter', 'Abend', ARRAY['Bergamotte','Mandarine','Grüne Akkord'], ARRAY['Jasmin','Orange Blossom','Sandelholz'], ARRAY['Amber','Moschus','Vanille'])
  on conflict (slug) do nothing;

-- DAVIDOFF
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Davidoff'), 'Cool Water', 'davidoff-cool-water', 'Men', 'clean', 55, 6, 7, 83, 'Sommer', 'Sport', ARRAY['Meeresfrische','Minze','Lavendel'], ARRAY['Jasmin','Geranium','Sandelholz'], ARRAY['Moschus','Amber','Tabak'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Davidoff'), 'Horizon', 'davidoff-horizon', 'Men', 'woody', 70, 7, 7, 84, 'Herbst', 'Büro', ARRAY['Bergamotte','Kardamom','Ananas'], ARRAY['Lavendel','Ingwer','Pfeffer'], ARRAY['Vetiver','Amber','Moschus'])
  on conflict (slug) do nothing;

-- MARC JACOBS
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Marc Jacobs'), 'Daisy', 'marc-jacobs-daisy', 'Women', 'floral', 85, 6, 6, 85, 'Frühling', 'Alltag', ARRAY['Wildbeere','Veilchenblatt'], ARRAY['Gardenie','Veilchen','Jasmin'], ARRAY['Sandelholz','Weiße Moschus','Vanille'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Marc Jacobs'), 'Daisy Dream', 'marc-jacobs-daisy-dream', 'Women', 'floral', 85, 6, 5, 84, 'Sommer', 'Alltag', ARRAY['Schwarze Johannisbeere','Birne','Grapefruit'], ARRAY['Jasmin','Lychee','Baumwollblüte'], ARRAY['Weiße Moschus','Kokosnuss','Driftwood'])
  on conflict (slug) do nothing;

-- AZZARO
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Azzaro'), 'Chrome', 'azzaro-chrome', 'Men', 'clean', 70, 6, 6, 82, 'Sommer', 'Alltag', ARRAY['Bergamotte','Koriander','Ananas'], ARRAY['Jasmin','Oakmoss','Lilie'], ARRAY['Tonka','Eiche','Amber'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Azzaro'), 'Wanted', 'azzaro-wanted', 'Men', 'woody', 85, 8, 7, 86, 'Herbst', 'Abend', ARRAY['Grapefruit','Kardamom','Bergamotte'], ARRAY['Wacholder','Salbei','Ambrette'], ARRAY['Vetiver','Leder','Zeder'])
  on conflict (slug) do nothing;


-- TOM FORD (Nische)
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Tom Ford'), 'Black Orchid', 'tom-ford-black-orchid', 'Unisex', 'woody', 195, 10, 9, 94, 'Winter', 'Abend', ARRAY['Trüffel','Gardenie','Schwarze Johannisbeere'], ARRAY['Schwarze Orchidee','Lotus','Ylang-Ylang'], ARRAY['Patchouli','Vanille','Amber','Sandelholz'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Tom Ford'), 'Lost Cherry', 'tom-ford-lost-cherry', 'Unisex', 'gourmand', 310, 9, 8, 93, 'Winter', 'Abend', ARRAY['Kirsche','Bittere Mandel'], ARRAY['Türkische Rose','Jasmin'], ARRAY['Tonka','Benzoe','Peru Balsam'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Tom Ford'), 'Oud Wood', 'tom-ford-oud-wood', 'Unisex', 'woody', 280, 9, 7, 91, 'Winter', 'Abend', ARRAY['Rosenholz','Kardamom','Chinesischer Pfeffer'], ARRAY['Oud','Sandelholz','Vetiver'], ARRAY['Amber','Tonka','Vanille'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Tom Ford'), 'Tobacco Vanille', 'tom-ford-tobacco-vanille', 'Unisex', 'woody', 310, 10, 9, 94, 'Winter', 'Abend', ARRAY['Tabakblüte','Gewürze'], ARRAY['Tabak','Vanille','Kakao'], ARRAY['Trockenfrüchte','Amber','Tonka'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Tom Ford'), 'Noir de Noir', 'tom-ford-noir-de-noir', 'Unisex', 'floral', 310, 9, 8, 92, 'Winter', 'Abend', ARRAY['Trüffel','Saffran','Schwarze Rose'], ARRAY['Schwarze Rose','Oud','Patchouli'], ARRAY['Amber','Vanille','Sandelholz'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Tom Ford'), 'Rose Prick', 'tom-ford-rose-prick', 'Unisex', 'floral', 310, 8, 7, 90, 'Ganzjährig', 'Abend', ARRAY['Damaszenerrose','Tükeische Rose'], ARRAY['Nelke','Wacholder','Schwarzer Pfeffer'], ARRAY['Oud','Amber','Weihrauch','Sandelholz'])
  on conflict (slug) do nothing;

-- CREED
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Creed'), 'Aventus', 'creed-aventus', 'Men', 'woody', 390, 9, 8, 96, 'Ganzjährig', 'Büro', ARRAY['Ananas','Bergamotte','Schwarze Johannisbeere','Apfel'], ARRAY['Birke','Patchouli','Jasmin','Rose'], ARRAY['Moschusambra','Eiche','Ambergris','Vanille'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Creed'), 'Green Irish Tweed', 'creed-green-irish-tweed', 'Men', 'clean', 360, 8, 7, 90, 'Frühling', 'Büro', ARRAY['Frenchisches Verbene','Iris','Zitrone'], ARRAY['Veilchenblatt','Cashmere'], ARRAY['Weißer Moschus','Sandelholz','Amber'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Creed'), 'Silver Mountain Water', 'creed-silver-mountain-water', 'Unisex', 'clean', 360, 7, 6, 89, 'Frühling', 'Alltag', ARRAY['Bergamotte','Mandarine','Grüner Tee'], ARRAY['Schwarzer Johannisbeere','Peony'], ARRAY['Moschus','Sandelholz','Cashmere'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Creed'), 'Aventus for Her', 'creed-aventus-for-her', 'Women', 'floral', 370, 8, 7, 90, 'Ganzjährig', 'Alltag', ARRAY['Ananas','Ingwer','Pink Pfeffer'], ARRAY['Rose','Ambrettekörner'], ARRAY['Birkenholz','Zibet','Moschus'])
  on conflict (slug) do nothing;

-- MAISON FRANCIS KURKDJIAN
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Maison Francis Kurkdjian'), 'Baccarat Rouge 540', 'mfk-baccarat-rouge-540', 'Unisex', 'floral', 310, 9, 9, 97, 'Ganzjährig', 'Abend', ARRAY['Jasmin','Safran'], ARRAY['Ambergris','Zeder'], ARRAY['Fir Resin','Moschus'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Maison Francis Kurkdjian'), 'Grand Soir', 'mfk-grand-soir', 'Unisex', 'woody', 290, 10, 8, 93, 'Winter', 'Abend', ARRAY['Benzoe','Vanille'], ARRAY['Amber','Labdanum'], ARRAY['Sandelholz','Tonka','Zeder'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Maison Francis Kurkdjian'), 'Oud Satin Mood', 'mfk-oud-satin-mood', 'Unisex', 'woody', 350, 10, 9, 94, 'Winter', 'Abend', ARRAY['Damaszenerrose'], ARRAY['Oud','Moschus'], ARRAY['Vanille','Sandelholz','Amber'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Maison Francis Kurkdjian'), 'Aqua Universalis', 'mfk-aqua-universalis', 'Unisex', 'clean', 220, 6, 5, 86, 'Frühling', 'Alltag', ARRAY['Bergamotte','Lemon','Neroli'], ARRAY['Jasmin','Rose','Aldehyden'], ARRAY['Moschus','Amber'])
  on conflict (slug) do nothing;

-- PARFUMS DE MARLY
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Parfums de Marly'), 'Delina', 'pdm-delina', 'Women', 'floral', 330, 9, 8, 95, 'Frühling', 'Ganzjährig', ARRAY['Rhabarber','Bergamotte','Pink Pfeffer'], ARRAY['Türkische Rose','Pfingstrose','Lychee','Jasmin'], ARRAY['Muschus','Amber','Kaschmir','Vanille'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Parfums de Marly'), 'Layton', 'pdm-layton', 'Men', 'woody', 330, 9, 8, 94, 'Ganzjährig', 'Büro', ARRAY['Apfel','Bergamotte','Lavendel'], ARRAY['Vanille','Geranium','Jasmin'], ARRAY['Sandelholz','Patchouli','Amber','Moschus'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Parfums de Marly'), 'Percival', 'pdm-percival', 'Unisex', 'floral', 330, 8, 7, 91, 'Frühling', 'Alltag', ARRAY['Bergamotte','Mandarine'], ARRAY['Lavendel','Pfingstrose'], ARRAY['Vanille','Sandelholz','Zeder'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Parfums de Marly'), 'Cassili', 'pdm-cassili', 'Women', 'floral', 330, 8, 7, 91, 'Ganzjährig', 'Alltag', ARRAY['Rhabarber','Bergamotte'], ARRAY['Pfingstrose','Lychee','Rose'], ARRAY['Amber','Zeder','Patchouli'])
  on conflict (slug) do nothing;

-- BYREDO
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Byredo'), 'Bal d''Afrique', 'byredo-bal-dafrique', 'Unisex', 'woody', 270, 8, 7, 90, 'Ganzjährig', 'Alltag', ARRAY['Bergamotte','Marigold','Neroli'], ARRAY['Veilchen','Jasmin','African Leluja'], ARRAY['Vetiver','Moschus','Amber'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Byredo'), 'Gypsy Water', 'byredo-gypsy-water', 'Unisex', 'woody', 260, 7, 5, 87, 'Ganzjährig', 'Alltag', ARRAY['Bergamotte','Zitrone','Pfeffer'], ARRAY['Wacholder','Orris','Kiefernnadeln'], ARRAY['Amber','Sandelholz','Vanille'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Byredo'), 'Mojave Ghost', 'byredo-mojave-ghost', 'Unisex', 'woody', 260, 7, 6, 88, 'Sommer', 'Alltag', ARRAY['Magnolia','Ambrette','Wasabi'], ARRAY['Juniper','Violet','Sandelholz'], ARRAY['Amber','Zeder','Moschus'])
  on conflict (slug) do nothing;

-- LE LABO
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Le Labo'), 'Santal 33', 'le-labo-santal-33', 'Unisex', 'woody', 280, 8, 7, 93, 'Herbst', 'Alltag', ARRAY['Kardamom','Iris','Papier'], ARRAY['Violet Accord','Amber','Moschus'], ARRAY['Sandelholz','Zeder','Leder'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Le Labo'), 'The Noir 29', 'le-labo-the-noir-29', 'Unisex', 'woody', 260, 7, 6, 88, 'Herbst', 'Büro', ARRAY['Bergamotte','Zitrone','Thé Noir'], ARRAY['Jasmin','Vetiver'], ARRAY['Moschus','Amber','Zeder'])
  on conflict (slug) do nothing;

-- XERJOFF
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Xerjoff'), 'Nio', 'xerjoff-nio', 'Unisex', 'woody', 220, 9, 8, 92, 'Ganzjährig', 'Alltag', ARRAY['Bergamotte','Zitrone'], ARRAY['Rose','Jasmin'], ARRAY['Sandelholz','Amber','Moschus'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Xerjoff'), 'Casamorati 1888', 'xerjoff-casamorati-1888', 'Unisex', 'floral', 240, 9, 8, 91, 'Ganzjährig', 'Abend', ARRAY['Bergamotte','Ingwer','Safran'], ARRAY['Iris','Rose','Amber'], ARRAY['Moschus','Sandelholz','Oud'])
  on conflict (slug) do nothing;

-- AMOUAGE
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Amouage'), 'Reflection Man', 'amouage-reflection-man', 'Men', 'floral', 290, 8, 7, 91, 'Frühling', 'Büro', ARRAY['Bergamotte','Neroli','Rosmarin'], ARRAY['Narcisse','Jasmin','Vetiver'], ARRAY['Sandelholz','Amber','Moschus'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Amouage'), 'Jubilation XXV', 'amouage-jubilation-xxv', 'Men', 'woody', 320, 9, 8, 92, 'Winter', 'Abend', ARRAY['Bergamotte','Zimt','Labdanum'], ARRAY['Oud','Rose','Myrrhe'], ARRAY['Amber','Sandelholz','Moschus'])
  on conflict (slug) do nothing;

-- MONTALE
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Montale'), 'Intense Café', 'montale-intense-cafe', 'Unisex', 'gourmand', 120, 9, 8, 91, 'Herbst', 'Abend', ARRAY['Kaffee','Bergamotte'], ARRAY['Rose','Jasmin','Kaffee'], ARRAY['Vanille','Patchouli','Amber'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Montale'), 'Roses Musk', 'montale-roses-musk', 'Women', 'floral', 110, 8, 7, 89, 'Frühling', 'Alltag', ARRAY['Bergamotte','Zitrone'], ARRAY['Rose','Jasmin','Magnolie'], ARRAY['Moschus','Amber','Sandelholz'])
  on conflict (slug) do nothing;

-- MANCERA
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Mancera'), 'Roses & Chocolate', 'mancera-roses-chocolate', 'Unisex', 'gourmand', 130, 9, 8, 91, 'Winter', 'Abend', ARRAY['Bergamotte','Zitrone','Erdbeer'], ARRAY['Rose','Jasmin','Kakao'], ARRAY['Patchouli','Amber','Moschus','Vanille'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Mancera'), 'Cedrat Boise', 'mancera-cedrat-boise', 'Unisex', 'woody', 130, 9, 8, 92, 'Ganzjährig', 'Alltag', ARRAY['Bergamotte','Zitrone','Grapefruit'], ARRAY['Zeder','Kardamom','Ingwer'], ARRAY['Patchouli','Amber','Moschus','Vanille'])
  on conflict (slug) do nothing;

-- INITIO
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Initio Parfums Prives'), 'Oud for Greatness', 'initio-oud-for-greatness', 'Unisex', 'woody', 360, 10, 9, 93, 'Winter', 'Abend', ARRAY['Safran','Kardamom'], ARRAY['Oud','Jasmin'], ARRAY['Amber','Moschus','Patchouli'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Initio Parfums Prives'), 'Side Effect', 'initio-side-effect', 'Unisex', 'gourmand', 260, 9, 8, 91, 'Winter', 'Abend', ARRAY['Rum','Walnuss'], ARRAY['Karamel','Vanille'], ARRAY['Tonka','Moschus','Amber'])
  on conflict (slug) do nothing;


-- JEAN PAUL GAULTIER
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Jean Paul Gaultier'), 'Scandal', 'jpgaultier-scandal', 'Women', 'floral', 100, 8, 8, 90, 'Herbst', 'Abend', ARRAY['Blutorange','Bergamotte','Tangerine'], ARRAY['Gardenie','Honig','Jasmin'], ARRAY['Patchouli','Vetiver','Moschus'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Jean Paul Gaultier'), 'La Belle', 'jpgaultier-la-belle', 'Women', 'gourmand', 95, 8, 7, 89, 'Herbst', 'Abend', ARRAY['Bergamotte','Mandarine'], ARRAY['Jasmin','Pfingstrose','Vanille'], ARRAY['Vanille','Amber','Moschus'])
  on conflict (slug) do nothing;

-- MONTBLANC
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Montblanc'), 'Explorer', 'montblanc-explorer', 'Men', 'woody', 90, 8, 7, 87, 'Herbst', 'Büro', ARRAY['Bergamotte','Kardamom'], ARRAY['Vetiver','Patchouli'], ARRAY['Leder','Amber','Moschus'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Montblanc'), 'Legend', 'montblanc-legend', 'Men', 'woody', 75, 7, 7, 85, 'Ganzjährig', 'Alltag', ARRAY['Bergamotte','Lavendel','Ananas'], ARRAY['Rose','Geranium','Eichenholz'], ARRAY['Sandelholz','Tonka','Amber','Moschus'])
  on conflict (slug) do nothing;

-- EMPORIO ARMANI
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Emporio Armani'), 'Stronger With You', 'ea-stronger-with-you', 'Men', 'gourmand', 95, 8, 8, 90, 'Herbst', 'Abend', ARRAY['Pink Pfeffer','Salbei','Kardamom'], ARRAY['Violett','Iris'], ARRAY['Vanille','Kaschmir','Moschus'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Emporio Armani'), 'Because It''s You', 'ea-because-its-you', 'Women', 'floral', 90, 7, 7, 87, 'Ganzjährig', 'Alltag', ARRAY['Brombeere','Birne'], ARRAY['Pfingstrose','Rose'], ARRAY['Moschus','Amber','Sandelholz'])
  on conflict (slug) do nothing;

-- JIMMY CHOO
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Jimmy Choo'), 'Jimmy Choo EDP', 'jimmy-choo-edp', 'Women', 'floral', 90, 7, 7, 86, 'Herbst', 'Abend', ARRAY['Melone','Birne','Bergamotte'], ARRAY['Orchidee','Gardenie','Sambac Jasmin'], ARRAY['Patchouli','Toffee','Kaschmir'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Jimmy Choo'), 'I Want Choo', 'jimmy-choo-i-want-choo', 'Women', 'floral', 95, 7, 7, 87, 'Ganzjährig', 'Alltag', ARRAY['Mandarine','Ingwer'], ARRAY['Jasmin','Tuberose'], ARRAY['Sandelholz','Vanille','Amber'])
  on conflict (slug) do nothing;

-- LATTAFA (Budget Nische)
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Lattafa'), 'Khamrah', 'lattafa-khamrah', 'Unisex', 'gourmand', 35, 10, 9, 89, 'Winter', 'Abend', ARRAY['Bergamotte','Kardamom'], ARRAY['Rum','Vanille','Zimt'], ARRAY['Amber','Moschus','Holz'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Lattafa'), 'Yara Moi', 'lattafa-yara-moi', 'Women', 'floral', 30, 9, 8, 86, 'Ganzjährig', 'Alltag', ARRAY['Bergamotte','Brombeere'], ARRAY['Rose','Jasmin','Pfingstrose'], ARRAY['Vanille','Moschus','Amber'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Lattafa'), 'Raghba', 'lattafa-raghba', 'Unisex', 'gourmand', 30, 10, 9, 88, 'Winter', 'Abend', ARRAY['Bergamotte'], ARRAY['Oud','Zimt','Jasmin'], ARRAY['Amber','Vanille','Patchouli'])
  on conflict (slug) do nothing;

-- ARMAF (Budget-Dupes)
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Armaf'), 'Club de Nuit Intense Man', 'armaf-club-de-nuit-intense-man', 'Men', 'woody', 45, 10, 9, 92, 'Ganzjährig', 'Büro', ARRAY['Ananas','Schwarze Johannisbeere','Bergamotte','Apfel'], ARRAY['Birke','Jasmin','Rose'], ARRAY['Ambergris','Patschuli','Moschus','Zeder'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Armaf'), 'Club de Nuit Intense Woman', 'armaf-club-de-nuit-intense-woman', 'Women', 'floral', 40, 9, 8, 89, 'Ganzjährig', 'Alltag', ARRAY['Limette','Brombeere','Bergamotte'], ARRAY['Rose','Jasmin','Pfingstrose'], ARRAY['Moschus','Amber','Vanille'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Armaf'), 'Tres Nuit', 'armaf-tres-nuit', 'Men', 'clean', 40, 8, 7, 86, 'Sommer', 'Alltag', ARRAY['Minze','Apfel','Bergamotte'], ARRAY['Lavendel','Rose','Geranium'], ARRAY['Sandelholz','Amber','Moschus'])
  on conflict (slug) do nothing;

-- BURBERRY
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Burberry'), 'Brit for Men', 'burberry-brit-men', 'Men', 'woody', 85, 7, 6, 83, 'Herbst', 'Büro', ARRAY['Ingwer','Zeder'], ARRAY['Limette','Amber'], ARRAY['Guaiak-Holz','Amber','Moschus'])
  on conflict (slug) do nothing;

-- JEAN PAUL GAULTIER
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Jean Paul Gaultier'), 'Le Mâle', 'jpgaultier-le-male', 'Men', 'floral', 90, 8, 8, 91, 'Ganzjährig', 'Abend', ARRAY['Minze','Ingwer','Kardamom'], ARRAY['Lavendel','Kümmel','Orange Blossom'], ARRAY['Vanille','Sandelholz','Amber'])
  on conflict (slug) do nothing;

-- HUGO BOSS
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Hugo Boss'), 'Boss Alive', 'hugo-boss-alive', 'Women', 'floral', 90, 7, 7, 86, 'Frühling', 'Alltag', ARRAY['Pfirsich','Mandarine'], ARRAY['Jasmin','Ylang-Ylang'], ARRAY['Sandelholz','Vanille','Moschus'])
  on conflict (slug) do nothing;

-- VERSACE
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Versace'), 'Versense', 'versace-versense', 'Women', 'clean', 75, 5, 5, 79, 'Sommer', 'Alltag', ARRAY['Bergamotte','Zitrone','Yuzu'], ARRAY['Wasser Lily','Jasmin'], ARRAY['Weißer Moschus','Amber'])
  on conflict (slug) do nothing;

-- RABANNE (modern)
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Paco Rabanne'), 'Fame', 'paco-rabanne-fame', 'Women', 'gourmand', 105, 8, 8, 90, 'Herbst', 'Alltag', ARRAY['Mango','Mandarine'], ARRAY['Ylang-Ylang','Freesie'], ARRAY['Amber','Moschus','Vanille'])
  on conflict (slug) do nothing;

-- YSL
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Yves Saint Laurent'), 'Kouros', 'ysl-kouros', 'Men', 'woody', 95, 9, 8, 86, 'Winter', 'Abend', ARRAY['Aldehyden','Bergamotte','Lavendel'], ARRAY['Orchidee','Neroli','Jasmin'], ARRAY['Amber','Vetiver','Eichenmoos'])
  on conflict (slug) do nothing;


-- CHANEL (mehr)
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Chanel'), 'Allure', 'chanel-allure', 'Women', 'floral', 135, 7, 7, 88, 'Ganzjährig', 'Alltag', ARRAY['Mandarine','Bergamotte','Lemon'], ARRAY['Rose','Jasmin','Geranium'], ARRAY['Vanille','Moschus','Amber'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Chanel'), 'Coco', 'chanel-coco', 'Women', 'woody', 140, 8, 7, 88, 'Winter', 'Abend', ARRAY['Mandarine','Bergamotte','Aldehyde'], ARRAY['Rose','Jasmin','Mimosa'], ARRAY['Amber','Benzoe','Sandelholz','Patchouli'])
  on conflict (slug) do nothing;

-- DIOR (mehr)
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Dior'), 'Dior Homme', 'dior-homme', 'Men', 'floral', 115, 7, 6, 86, 'Ganzjährig', 'Büro', ARRAY['Bergamotte','Lavendel'], ARRAY['Iris','Kakao','Veilchen'], ARRAY['Zeder','Amber','Vetiver'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Dior'), 'Addict', 'dior-addict', 'Women', 'floral', 125, 8, 8, 88, 'Herbst', 'Abend', ARRAY['Mandarine','Sichuan Pfeffer'], ARRAY['Rose','Jasmin','Tuberose'], ARRAY['Vanille','Sandelholz','Amber'])
  on conflict (slug) do nothing;

-- VALENTINO
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Valentino'), 'Uomo Born in Roma', 'valentino-uomo-born-in-roma', 'Men', 'woody', 115, 8, 7, 88, 'Herbst', 'Büro', ARRAY['Bergamotte','Schwarze Johannisbeere'], ARRAY['Iris','Salbei'], ARRAY['Vetiver','Amber','Moschus'])
  on conflict (slug) do nothing;

-- TOM FORD (mehr)
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Tom Ford'), 'Soleil Blanc', 'tom-ford-soleil-blanc', 'Unisex', 'floral', 290, 8, 7, 90, 'Sommer', 'Alltag', ARRAY['Bergamotte','Mandarine'], ARRAY['Tuberose','Jasmin','Kardamom'], ARRAY['Sandelholz','Moschus','Kokosnuss'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Tom Ford'), 'Costa Azzurra', 'tom-ford-costa-azzurra', 'Unisex', 'woody', 260, 7, 6, 88, 'Sommer', 'Alltag', ARRAY['Zitrus','Meeresakkord'], ARRAY['Zeder','Mastic'], ARRAY['Amber','Moschus','Sandelholz'])
  on conflict (slug) do nothing;

-- BURBERRY (mehr)
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Burberry'), 'Goddess', 'burberry-goddess', 'Women', 'gourmand', 105, 8, 7, 89, 'Herbst', 'Abend', ARRAY['Lavendel'], ARRAY['Lavendel','Vanille','Vetiver'], ARRAY['Moschus','Amber','Zeder'])
  on conflict (slug) do nothing;

-- GUERLAIN (mehr)
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Guerlain'), 'Habit Rouge', 'guerlain-habit-rouge', 'Men', 'woody', 110, 8, 7, 87, 'Winter', 'Abend', ARRAY['Bergamotte','Zitrone','Lemon'], ARRAY['Nelke','Iris','Rose'], ARRAY['Amber','Sandelholz','Vanille','Leder'])
  on conflict (slug) do nothing;

-- AZZARO (mehr)
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Azzaro'), 'Pour Homme', 'azzaro-pour-homme', 'Men', 'floral', 65, 7, 7, 83, 'Herbst', 'Alltag', ARRAY['Basilikum','Zitrone','Lavendel'], ARRAY['Gewürze','Anisholz','Rose'], ARRAY['Vetiver','Eichenmoos','Moschus'])
  on conflict (slug) do nothing;

-- LANCOME (mehr)
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Lancome'), 'Hypnôse', 'lancome-hypnose', 'Women', 'floral', 110, 8, 7, 87, 'Herbst', 'Abend', ARRAY['Bergamotte','Pfirsich'], ARRAY['Jasmin','Magnolia','Lily'], ARRAY['Sandelholz','Amber','Vanille'])
  on conflict (slug) do nothing;

-- PARFUMS DE MARLY (mehr)
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Parfums de Marly'), 'Herod', 'pdm-herod', 'Men', 'woody', 330, 9, 8, 92, 'Winter', 'Abend', ARRAY['Pfeffer','Bergamotte'], ARRAY['Tabak','Vanille'], ARRAY['Patschuli','Zeder','Sandelholz'])
  on conflict (slug) do nothing;

insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Parfums de Marly'), 'Sedley', 'pdm-sedley', 'Unisex', 'clean', 300, 7, 6, 88, 'Sommer', 'Alltag', ARRAY['Minze','Bergamotte'], ARRAY['Lavendel','Weißer Moschus'], ARRAY['Amber','Sandelholz'])
  on conflict (slug) do nothing;

-- CREED (mehr)
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Creed'), 'Millesime Imperial', 'creed-millesime-imperial', 'Unisex', 'clean', 360, 7, 6, 89, 'Sommer', 'Alltag', ARRAY['Bergamotte','Mandarine','Yuzu'], ARRAY['Meeresakkord','Rose','Iris'], ARRAY['Amber','Moschus','Zeder'])
  on conflict (slug) do nothing;

-- BYREDO (mehr)
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Byredo'), 'Super Cedar', 'byredo-super-cedar', 'Unisex', 'woody', 260, 6, 5, 85, 'Herbst', 'Alltag', ARRAY['Rhabarber'], ARRAY['Rose','Zeder'], ARRAY['Vetiver','Moschus'])
  on conflict (slug) do nothing;

-- CAROLINA HERRERA (mehr)
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Carolina Herrera'), 'Bad Boy', 'carolina-herrera-bad-boy', 'Men', 'woody', 110, 8, 8, 90, 'Herbst', 'Abend', ARRAY['Bergamotte','Pfeffer','Salbei'], ARRAY['Kakao','Wacholderbeere'], ARRAY['Amber','Weißer Moschus','Sandelholz'])
  on conflict (slug) do nothing;

-- PRADA (mehr)
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Prada'), 'Paradoxe', 'prada-paradoxe', 'Women', 'floral', 130, 8, 7, 89, 'Ganzjährig', 'Alltag', ARRAY['Bergamotte','Neroli'], ARRAY['Ambrettekörner','Jasmin'], ARRAY['Moschus','Sandelholz','Amber'])
  on conflict (slug) do nothing;

-- GIVENCHY (mehr)
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes)
values
  ((select id from public.brands where name='Givenchy'), 'Ange ou Démon', 'givenchy-ange-ou-demon', 'Women', 'floral', 105, 8, 8, 88, 'Herbst', 'Abend', ARRAY['Zitrone','Bergamotte','Ingwer'], ARRAY['Weißlilie','Iris','Flieder'], ARRAY['Weißes Holz','Vetiver','Moschus'])
  on conflict (slug) do nothing;

