-- Auressa: Extended Catalog – 200 weitere Düfte
-- Nischen, Drugstore-Hits, Arabische Düfte, weitere Bestseller

-- ─── ADDITIONAL CHANEL ────────────────────────────────────────────────────────
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Chanel'), 'Gabrielle', 'chanel-gabrielle', 'Women', 'floral', 155, 7, 7, 88, 'Ganzjährig', 'Alltag', ARRAY['Grapefruit','Schwarze Johannisbeere','Mandarine'], ARRAY['Jasmin','Ylang-Ylang','Tuberose'], ARRAY['Sandelholz','Moschus','Amber'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Chanel'), 'Allure', 'chanel-allure', 'Women', 'floral', 130, 7, 6, 86, 'Ganzjährig', 'Büro', ARRAY['Mandarine','Bergamotte','Peach'], ARRAY['Rose','Jasmin','Vanille'], ARRAY['Sandelholz','Amber','Moschus'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Chanel'), 'Égoïste', 'chanel-egoiste', 'Men', 'woody', 115, 7, 6, 83, 'Herbst', 'Abend', ARRAY['Basilikum','Neroli','Koriander'], ARRAY['Rose','Geranium','Sandelholz'], ARRAY['Zimt','Vanille','Moschus'])
  on conflict (slug) do nothing;

-- ─── ADDITIONAL DIOR ──────────────────────────────────────────────────────────
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Dior'), 'Dior Homme', 'dior-homme', 'Men', 'floral', 115, 8, 6, 89, 'Herbst', 'Büro', ARRAY['Bergamotte','Lavendel','Salbei'], ARRAY['Iris','Kakao','Patchouli'], ARRAY['Vetiver','Sandelholz','Zeder'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Dior'), 'Fahrenheit', 'dior-fahrenheit', 'Men', 'woody', 110, 8, 7, 87, 'Herbst', 'Abend', ARRAY['Bergamotte','Zitrone','Mandarine'], ARRAY['Veilchen','Leder','Jasmin'], ARRAY['Vetiver','Ambra','Moschus'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Dior'), 'Eau Sauvage', 'dior-eau-sauvage', 'Men', 'fresh', 95, 6, 5, 82, 'Sommer', 'Alltag', ARRAY['Bergamotte','Lemon','Basilikum'], ARRAY['Jasmin','Vetiver','Rosenholz'], ARRAY['Moschus','Eichenmoos','Ambra'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Dior'), 'Hypnotic Poison', 'dior-hypnotic-poison', 'Women', 'oriental', 120, 9, 8, 90, 'Herbst', 'Abend', ARRAY['Bittermandel','Bergamotte','Neroli'], ARRAY['Jasmin','Rose','Sandelholz'], ARRAY['Moschus','Vanille','Amber'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Dior'), 'Addict', 'dior-addict', 'Women', 'oriental', 125, 8, 7, 88, 'Winter', 'Abend', ARRAY['Mandarine','Bergamotte','Blutorange'], ARRAY['Rose','Jasmin','Nachtblume'], ARRAY['Vanille','Tonkabohne','Sandelholz'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Dior'), 'J''adore L''Or', 'dior-jadore-lor', 'Women', 'floral', 185, 9, 7, 92, 'Abend', 'Abend', ARRAY['Ylang-Ylang','Jasmin','Rose'], ARRAY['Peach','Magnolia','Orchidee'], ARRAY['Sandelholz','Moschus','Amber'])
  on conflict (slug) do nothing;

-- ─── ADDITIONAL YSL ───────────────────────────────────────────────────────────
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Yves Saint Laurent'), 'Opium', 'ysl-opium', 'Women', 'oriental', 115, 9, 9, 88, 'Winter', 'Abend', ARRAY['Aldehyden','Mandarine','Pepper'], ARRAY['Rose','Jasmin','Lilie'], ARRAY['Patchouli','Amber','Vanille'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Yves Saint Laurent'), 'Libre', 'ysl-libre', 'Women', 'floral', 130, 8, 8, 91, 'Ganzjährig', 'Alltag', ARRAY['Mandarine','Lavendel','Bergamotte'], ARRAY['Lavendel','Jasmin','Orangenblüte'], ARRAY['Vanille','Zeder','Moschus'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Yves Saint Laurent'), 'L''Homme', 'ysl-lhomme', 'Men', 'fresh', 105, 7, 6, 86, 'Sommer', 'Büro', ARRAY['Bergamotte','Ingwer','Basilikum'], ARRAY['Iris','Violette','Vetiver'], ARRAY['Zeder','Weißes Holz','Tonka'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Yves Saint Laurent'), 'Mon Paris', 'ysl-mon-paris', 'Women', 'floral', 120, 8, 7, 89, 'Frühling', 'Alltag', ARRAY['Erdbeere','Birne','Cassis'], ARRAY['Pfingstrose','Jasmin','Rose'], ARRAY['Weißer Moschus','Patchouli','Sandelholz'])
  on conflict (slug) do nothing;

-- ─── GIVENCHY ERWEITERT ───────────────────────────────────────────────────────
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Givenchy'), 'Ange ou Démon', 'givenchy-ange-ou-demon', 'Women', 'floral', 115, 8, 8, 88, 'Herbst', 'Abend', ARRAY['Litsea','Bergamotte','Mandarine'], ARRAY['Weißer Lilie','Heliotrope','Iris'], ARRAY['Vetiver','Tonka','Moschus'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Givenchy'), 'Pi', 'givenchy-pi', 'Men', 'oriental', 100, 9, 8, 85, 'Winter', 'Abend', ARRAY['Bergamotte','Mandarine','Anissamen'], ARRAY['Rosmarin','Geranium','Rose'], ARRAY['Vanille','Amber','Sandelholz'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Givenchy'), 'Irresistible', 'givenchy-irresistible', 'Women', 'floral', 105, 7, 7, 86, 'Frühling', 'Alltag', ARRAY['Bergamotte','Rhabarber','Apfel'], ARRAY['Rose','Pfingstrose','Zeder'], ARRAY['Moschus','Sandelholz','Amber'])
  on conflict (slug) do nothing;

-- ─── LANCÔME ERWEITERT ────────────────────────────────────────────────────────
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Lancôme'), 'Trésor', 'lancome-tresor', 'Women', 'floral', 110, 8, 7, 85, 'Herbst', 'Abend', ARRAY['Aprikose','Peach','Bergamotte'], ARRAY['Rose','Iris','Lilie'], ARRAY['Moschus','Amber','Vanille'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Lancôme'), 'Miracle', 'lancome-miracle', 'Women', 'floral', 95, 6, 6, 82, 'Frühling', 'Alltag', ARRAY['Litsea','Bergamotte','Ingwer'], ARRAY['Magnolia','Jasmin','Rose'], ARRAY['Ambra','Moschus','Sandelholz'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Lancôme'), 'Hypnôse', 'lancome-hypnose', 'Women', 'floral', 100, 8, 7, 84, 'Ganzjährig', 'Abend', ARRAY['Bergamotte','Mandarine','Lemon'], ARRAY['Jasmin','Lilie','Iris'], ARRAY['Sandelholz','Vanille','Moschus'])
  on conflict (slug) do nothing;

-- ─── VERSACE ERWEITERT ────────────────────────────────────────────────────────
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Versace'), 'Yellow Diamond', 'versace-yellow-diamond', 'Women', 'floral', 90, 6, 6, 82, 'Sommer', 'Alltag', ARRAY['Bergamotte','Zitrone','Grapefruit'], ARRAY['Freesie','Ambrettia','Neroli'], ARRAY['Amber','Moschus','Sandelholz'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Versace'), 'Crystal Noir', 'versace-crystal-noir', 'Women', 'oriental', 95, 8, 7, 86, 'Herbst', 'Abend', ARRAY['Pfeffer','Ingwer','Kardamom'], ARRAY['Gardenie','Kokos','Neroli'], ARRAY['Amber','Sandelholz','Moschus'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Versace'), 'Man Eau Fraiche', 'versace-man-eau-fraiche', 'Men', 'aquatic', 85, 5, 6, 78, 'Sommer', 'Sport', ARRAY['Zitrone','Bergamotte','Wasser'], ARRAY['Rosenholz','Salbei','Zeder'], ARRAY['Moschus','Amber','Labdanum'])
  on conflict (slug) do nothing;

-- ─── GUCCI ERWEITERT ──────────────────────────────────────────────────────────
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Gucci'), 'Flora Gorgeous Gardenia', 'gucci-flora-gorgeous-gardenia', 'Women', 'floral', 110, 7, 6, 85, 'Frühling', 'Alltag', ARRAY['Rotes Berries','Mandarine','Pfirsich'], ARRAY['Gardenie','Rose','Frangipani'], ARRAY['Patchouli','Sandelholz','Moschus'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Gucci'), 'Guilty', 'gucci-guilty', 'Women', 'floral', 105, 7, 7, 86, 'Herbst', 'Abend', ARRAY['Mandarine','Pinker Pfeffer','Lila Veilchen'], ARRAY['Geranium','Lila Veilchen','Rose'], ARRAY['Amber','Patchouli','Moschus'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Gucci'), 'Guilty Pour Homme', 'gucci-guilty-homme', 'Men', 'woody', 100, 7, 6, 84, 'Herbst', 'Büro', ARRAY['Zitrone','Lavendel','Pinker Pfeffer'], ARRAY['Leder','Iris','Patchouli'], ARRAY['Amber','Zeder','Moschus'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Gucci'), 'Bamboo', 'gucci-bamboo', 'Women', 'floral', 95, 7, 6, 83, 'Ganzjährig', 'Büro', ARRAY['Bergamotte','Mandarine','Cassis'], ARRAY['Rose','Lilie','Ylang-Ylang'], ARRAY['Sandelholz','Amber','Moschus'])
  on conflict (slug) do nothing;

-- ─── BURBERRY ERWEITERT ───────────────────────────────────────────────────────
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Burberry'), 'Her', 'burberry-her', 'Women', 'floral', 95, 7, 7, 85, 'Frühling', 'Alltag', ARRAY['Cassis','Erdbeere','Blaubeere'], ARRAY['Jasmin','Veilchen','Rose'], ARRAY['Amber','Moschus','Sandelholz'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Burberry'), 'Touch for Men', 'burberry-touch-men', 'Men', 'woody', 85, 6, 5, 78, 'Sommer', 'Büro', ARRAY['Wacholderbeere','Mandarine','Koriander'], ARRAY['Geranium','Moschus','Zeder'], ARRAY['Amber','Sandelholz','Moschus'])
  on conflict (slug) do nothing;

-- ─── PRADA ERWEITERT ──────────────────────────────────────────────────────────
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Prada'), 'Luna Rossa Ocean', 'prada-luna-rossa-ocean', 'Men', 'aquatic', 105, 7, 7, 85, 'Sommer', 'Sport', ARRAY['Bergamotte','Limette','Lavendel'], ARRAY['Lavendel','Ambrette','Iris'], ARRAY['Moschus','Amber','Sandelholz'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Prada'), 'Infusion d''Iris', 'prada-infusion-iris', 'Women', 'floral', 130, 6, 5, 84, 'Frühling', 'Büro', ARRAY['Mandarine','Galbanum','Zitrone'], ARRAY['Iris','Neroli','Orangenblüte'], ARRAY['Weißer Moschus','Zeder','Benzoe'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Prada'), 'Candy', 'prada-candy', 'Women', 'gourmand', 110, 8, 7, 87, 'Winter', 'Abend', ARRAY['Caramel','Muskovado'], ARRAY['Muskovado','Caramel'], ARRAY['Benzoe','Weiße Moschus','Vanille'])
  on conflict (slug) do nothing;

-- ─── HERMÈS ERWEITERT ─────────────────────────────────────────────────────────
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Hermès'), 'Twilly d''Hermès', 'hermes-twilly', 'Women', 'floral', 115, 7, 6, 85, 'Frühling', 'Alltag', ARRAY['Ingwer','Tuberose','Sandelholz'], ARRAY['Tuberose','Rose','Ingwer'], ARRAY['Sandelholz','Moschus','Amber'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Hermès'), 'Voyage d''Hermès', 'hermes-voyage', 'Men', 'woody', 115, 7, 6, 86, 'Sommer', 'Büro', ARRAY['Grapefruit','Bergamotte','Ficus'], ARRAY['Kardamom','Zeder','Vetiver'], ARRAY['Amber','Moschus','Sandelholz'])
  on conflict (slug) do nothing;

-- ─── TOM FORD ERWEITERT ───────────────────────────────────────────────────────
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Tom Ford'), 'Rose Prick', 'tom-ford-rose-prick', 'Unisex', 'floral', 420, 8, 7, 91, 'Ganzjährig', 'Abend', ARRAY['Bergamotte','Türkische Rose','Sichuan Pepper'], ARRAY['Türkische Rose','Damaszener Rose','Bergamotte'], ARRAY['Oud','Moschus','Vetiver'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Tom Ford'), 'Soleil Blanc', 'tom-ford-soleil-blanc', 'Unisex', 'floral', 400, 7, 7, 89, 'Sommer', 'Urlaub', ARRAY['Bergamotte','Jasmin','Neroli'], ARRAY['Ylang-Ylang','Kokos','Jasmin'], ARRAY['Moschus','Amber','Sandelholz'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Tom Ford'), 'Tobacco Vanille', 'tom-ford-tobacco-vanille', 'Unisex', 'oriental', 420, 10, 9, 93, 'Winter', 'Abend', ARRAY['Tabakblatt','Gewürze'], ARRAY['Tabak Blossom','Jasmin','Rose'], ARRAY['Vanille','Kakaopulver','Benzoe'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Tom Ford'), 'Neroli Portofino', 'tom-ford-neroli-portofino', 'Unisex', 'fresh', 380, 6, 6, 88, 'Sommer', 'Urlaub', ARRAY['Bergamotte','Zitrone','Mandarine'], ARRAY['Neroli','Thymian','Rose'], ARRAY['Amber','Moschus','Eichenholz'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Tom Ford'), 'Grey Vetiver', 'tom-ford-grey-vetiver', 'Men', 'woody', 380, 8, 7, 89, 'Herbst', 'Büro', ARRAY['Grapefruit','Salbei','Orangenblüte'], ARRAY['Vetiver','Salbei','Eichenholz'], ARRAY['Amber','Moschus','Zeder'])
  on conflict (slug) do nothing;

-- ─── CREED ERWEITERT ──────────────────────────────────────────────────────────
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Creed'), 'Silver Mountain Water', 'creed-silver-mountain-water', 'Unisex', 'fresh', 390, 7, 7, 90, 'Frühling', 'Büro', ARRAY['Bergamotte','Mandarine','Schwarzer Johannisbeere'], ARRAY['Grüner Tee','Neroli','Pfingstrose'], ARRAY['Moschus','Sandelholz','Amber'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Creed'), 'Green Irish Tweed', 'creed-green-irish-tweed', 'Men', 'fresh', 380, 7, 7, 89, 'Frühling', 'Alltag', ARRAY['Zitronengras','Iris','Veilchenblatt'], ARRAY['Veilchenblatt','Rose','Jasmin'], ARRAY['Sandelholz','Amber','Moschus'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Creed'), 'Viking', 'creed-viking', 'Men', 'woody', 420, 8, 8, 91, 'Herbst', 'Abend', ARRAY['Bergamotte','Lavendel','Minze'], ARRAY['Rose','Geranium','Patchouli'], ARRAY['Sandelholz','Vetiver','Amber'])
  on conflict (slug) do nothing;

-- ─── MAISON FRANCIS KURKDJIAN ERWEITERT ───────────────────────────────────────
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Maison Francis Kurkdjian'), 'Grand Soir', 'mfk-grand-soir', 'Unisex', 'oriental', 350, 10, 8, 92, 'Winter', 'Abend', ARRAY['Benzoe','Amber','Tonka'], ARRAY['Benzoe','Leder','Amber'], ARRAY['Amber','Benzoe','Moschus'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Maison Francis Kurkdjian'), 'Aqua Universalis', 'mfk-aqua-universalis', 'Unisex', 'fresh', 280, 5, 5, 85, 'Sommer', 'Alltag', ARRAY['Bergamotte','Aldehyden','Zitrone'], ARRAY['Weißer Moschus','Jasmin','Maiglöckchen'], ARRAY['Weißer Moschus','Zeder','Amber'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Maison Francis Kurkdjian'), 'Oud Satin Mood', 'mfk-oud-satin-mood', 'Unisex', 'oriental', 420, 10, 9, 93, 'Winter', 'Abend', ARRAY['Schwarze Rose','Oud'], ARRAY['Rose','Oud','Iris'], ARRAY['Vanille','Amber','Moschus'])
  on conflict (slug) do nothing;

-- ─── BYREDO ERWEITERT ─────────────────────────────────────────────────────────
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Byredo'), 'Gypsy Water', 'byredo-gypsy-water', 'Unisex', 'woody', 230, 7, 6, 87, 'Ganzjährig', 'Alltag', ARRAY['Bergamotte','Lemon','Pepper'], ARRAY['Wacholderbeere','Orris','Vanille'], ARRAY['Sandelholz','Amber','Moschus'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Byredo'), 'Bal d''Afrique', 'byredo-bal-dafrique', 'Unisex', 'floral', 230, 7, 7, 88, 'Sommer', 'Abend', ARRAY['Bergamotte','Neroli','Zitronenblatt'], ARRAY['Violette','Afrikanische Orange','Jasmin'], ARRAY['Vetiver','Moschus','Amber'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Byredo'), 'Rose of No Man''s Land', 'byredo-rose-no-mans-land', 'Unisex', 'floral', 230, 6, 6, 85, 'Frühling', 'Alltag', ARRAY['Pinke Pfefferkörner','Türkische Rose'], ARRAY['Türkische Rose','Rhabarber'], ARRAY['Amber','Weißer Moschus','Papyrus'])
  on conflict (slug) do nothing;

-- ─── LE LABO ERWEITERT ────────────────────────────────────────────────────────
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Le Labo'), 'Another 13', 'le-labo-another-13', 'Unisex', 'fresh', 280, 7, 6, 88, 'Sommer', 'Alltag', ARRAY['Ambrox','Jasmin','Moschus'], ARRAY['Jasmin','Moschus','Ambrox'], ARRAY['Ambrox','Moschus','Sandelholz'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Le Labo'), 'Noir 29', 'le-labo-noir-29', 'Unisex', 'woody', 290, 8, 7, 88, 'Herbst', 'Abend', ARRAY['Schwarzer Tee','Bergamotte'], ARRAY['Moschus','Leder','Zeder'], ARRAY['Weißer Amber','Moschus','Vetiver'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Le Labo'), 'Bergamote 22', 'le-labo-bergamote-22', 'Unisex', 'fresh', 280, 6, 5, 84, 'Sommer', 'Alltag', ARRAY['Bergamotte','Grapefruit','Lemon'], ARRAY['Petitgrain','Zeder','Moschus'], ARRAY['Moschus','Amber','Sandelholz'])
  on conflict (slug) do nothing;

-- ─── PARFUMS DE MARLY ERWEITERT ───────────────────────────────────────────────
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Parfums de Marly'), 'Herod', 'pdm-herod', 'Men', 'woody', 320, 9, 8, 91, 'Herbst', 'Abend', ARRAY['Bergamotte','Zimt','Pepper'], ARRAY['Tabak','Vanille','Rose'], ARRAY['Sandelholz','Patchouli','Amber'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Parfums de Marly'), 'Layton', 'pdm-layton', 'Unisex', 'woody', 320, 9, 9, 93, 'Ganzjährig', 'Abend', ARRAY['Apfel','Bergamotte','Lavendel'], ARRAY['Jasmin','Geranium','Veilchen'], ARRAY['Vanille','Patchouli','Sandelholz'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Parfums de Marly'), 'Delina', 'pdm-delina', 'Women', 'floral', 320, 8, 8, 92, 'Frühling', 'Alltag', ARRAY['Rhabarber','Bergamotte','Litsea'], ARRAY['Türkische Rose','Pfingstrose','Muskatnuss'], ARRAY['Weißer Moschus','Cachemere','Vanille'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Parfums de Marly'), 'Percival', 'pdm-percival', 'Unisex', 'gourmand', 320, 8, 7, 88, 'Winter', 'Abend', ARRAY['Bergamotte','Lavendel','Lemon'], ARRAY['Iris','Jasmin','Patchouli'], ARRAY['Vanille','Moschus','Amber'])
  on conflict (slug) do nothing;

-- ─── AMOUAGE ERWEITERT ────────────────────────────────────────────────────────
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Amouage'), 'Interlude Man', 'amouage-interlude-man', 'Men', 'oriental', 380, 10, 9, 93, 'Winter', 'Abend', ARRAY['Oregano','Bergamotte','Labdanum'], ARRAY['Rose','Oud','Weihrauch'], ARRAY['Patchouli','Sandelholz','Amber'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Amouage'), 'Fate Woman', 'amouage-fate-woman', 'Women', 'floral', 380, 10, 8, 91, 'Herbst', 'Abend', ARRAY['Bergamotte','Rum','Patchouli'], ARRAY['Rose','Moschus','Weihrauch'], ARRAY['Sandelholz','Amber','Vetiver'])
  on conflict (slug) do nothing;

-- ─── INITIO ERWEITERT ─────────────────────────────────────────────────────────
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Initio'), 'Atomic Rose', 'initio-atomic-rose', 'Unisex', 'floral', 280, 8, 8, 89, 'Ganzjährig', 'Abend', ARRAY['Rose','Bergamotte'], ARRAY['Rose','Jasmin','Ambrette'], ARRAY['Amber','Moschus','Sandelholz'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Initio'), 'Side Effect', 'initio-side-effect', 'Unisex', 'oriental', 280, 9, 8, 90, 'Winter', 'Abend', ARRAY['Rum','Vanille','Moschus'], ARRAY['Rum','Tonka','Moschus'], ARRAY['Vanille','Amber','Moschus'])
  on conflict (slug) do nothing;

-- ─── JEAN PAUL GAULTIER ERWEITERT ─────────────────────────────────────────────
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Jean Paul Gaultier'), 'Ultra Male', 'jpg-ultra-male', 'Men', 'oriental', 95, 9, 9, 90, 'Herbst', 'Abend', ARRAY['Birne','Lavendel','Bergamotte'], ARRAY['Iris','Rose','Lavendel'], ARRAY['Vanille','Amber','Moschus'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Jean Paul Gaultier'), 'Scandal', 'jpg-scandal', 'Women', 'floral', 100, 8, 8, 88, 'Herbst', 'Abend', ARRAY['Blut-Orange','Honig','Patchouli'], ARRAY['Gardenie','Rose','Honig'], ARRAY['Patchouli','Vanilla','Amber'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Jean Paul Gaultier'), 'Classique', 'jpg-classique', 'Women', 'floral', 90, 8, 7, 87, 'Ganzjährig', 'Abend', ARRAY['Bergamotte','Rosenholz','Orange'], ARRAY['Ingwer','Iris','Rose'], ARRAY['Vanille','Amber','Sandelholz'])
  on conflict (slug) do nothing;

-- ─── NARCISO RODRIGUEZ ERWEITERT ──────────────────────────────────────────────
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Narciso Rodriguez'), 'Narciso Fleur Musc', 'narciso-fleur-musc', 'Women', 'floral', 110, 7, 6, 85, 'Frühling', 'Alltag', ARRAY['Bergamotte','Gardenie','Rose'], ARRAY['Gardenie','Rose','Jasmin'], ARRAY['Weißer Moschus','Amber','Sandelholz'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Narciso Rodriguez'), 'Pure Musc', 'narciso-pure-musc', 'Women', 'floral', 120, 7, 6, 86, 'Sommer', 'Alltag', ARRAY['Rose','Moschus'], ARRAY['Rose','Moschus','Gardenie'], ARRAY['Weißer Moschus','Sandelholz','Amber'])
  on conflict (slug) do nothing;

-- ─── VALENTINO ERWEITERT ──────────────────────────────────────────────────────
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Valentino'), 'Donna Born in Roma', 'valentino-donna-born-in-roma', 'Women', 'floral', 115, 7, 7, 87, 'Frühling', 'Alltag', ARRAY['Pfeffer','Bergamotte','Mandarine'], ARRAY['Jasmin','Rose','Ylang-Ylang'], ARRAY['Vanille','Amber','Sandelholz'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Valentino'), 'Uomo', 'valentino-uomo', 'Men', 'oriental', 105, 8, 7, 85, 'Herbst', 'Abend', ARRAY['Bergamotte','Zitrone','Iris'], ARRAY['Iris','Leder','Patchouli'], ARRAY['Amber','Sandelholz','Moschus'])
  on conflict (slug) do nothing;

-- ─── CAROLINA HERRERA ERWEITERT ───────────────────────────────────────────────
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Carolina Herrera'), 'Very Good Girl', 'ch-very-good-girl', 'Women', 'floral', 100, 7, 7, 86, 'Frühling', 'Alltag', ARRAY['Lychee','Rote Beeren','Cassis'], ARRAY['Rose','Freesia','Iris'], ARRAY['Sandelholz','Moschus','Amber'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Carolina Herrera'), 'CH Men', 'ch-men', 'Men', 'woody', 85, 7, 6, 81, 'Herbst', 'Büro', ARRAY['Bergamotte','Grapefruit','Wacholderbeere'], ARRAY['Minze','Salbei','Geranium'], ARRAY['Leder','Amber','Moschus'])
  on conflict (slug) do nothing;

-- ─── HUGO BOSS ERWEITERT ──────────────────────────────────────────────────────
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Hugo Boss'), 'Boss The Scent', 'boss-the-scent', 'Men', 'oriental', 80, 7, 7, 83, 'Herbst', 'Abend', ARRAY['Ingwer','Grapefruit','Maniguette Pfeffer'], ARRAY['Birke','Osmanthus'], ARRAY['Leder','Moschus','Amber'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Hugo Boss'), 'Boss Alive', 'boss-alive', 'Women', 'floral', 75, 6, 6, 80, 'Frühling', 'Alltag', ARRAY['Mandarine','Pflaume'], ARRAY['Jasmin','Rose'], ARRAY['Vanille','Sandelholz','Moschus'])
  on conflict (slug) do nothing;

-- ─── MONTBLANC ERWEITERT ──────────────────────────────────────────────────────
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Montblanc'), 'Explorer Platinum', 'montblanc-explorer-platinum', 'Men', 'woody', 80, 7, 6, 82, 'Sommer', 'Alltag', ARRAY['Bergamotte','Pfeffer','Ingwer'], ARRAY['Vetiver','Geranium','Petitgrain'], ARRAY['Amber','Moschus','Sandelholz'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Montblanc'), 'Individuel', 'montblanc-individuel', 'Men', 'floral', 70, 7, 6, 79, 'Sommer', 'Büro', ARRAY['Bergamotte','Mandarine','Ananas'], ARRAY['Rose','Jasmin','Neroli'], ARRAY['Sandelholz','Amber','Moschus'])
  on conflict (slug) do nothing;

-- ─── AZZARO ERWEITERT ─────────────────────────────────────────────────────────
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Azzaro'), 'Chrome', 'azzaro-chrome', 'Men', 'aquatic', 65, 6, 6, 78, 'Sommer', 'Sport', ARRAY['Bergamotte','Ananas','Zitrone'], ARRAY['Salbei','Coriander','Rosewood'], ARRAY['Tonka','Moschus','Amber'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Azzaro'), 'Wanted', 'azzaro-wanted', 'Men', 'woody', 75, 7, 7, 82, 'Herbst', 'Abend', ARRAY['Zitrone','Kardamom','Minze'], ARRAY['Salbei','Oud','Vetiver'], ARRAY['Amberholz','Moschus','Patchouli'])
  on conflict (slug) do nothing;

-- ─── ISSEY MIYAKE ERWEITERT ───────────────────────────────────────────────────
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Issey Miyake'), 'L''Eau d''Issey Pour Homme', 'issey-pour-homme', 'Men', 'aquatic', 80, 6, 6, 80, 'Sommer', 'Alltag', ARRAY['Yuzu','Bergamotte','Mandarine'], ARRAY['Salbei','Lilie','Koriander'], ARRAY['Vetiver','Sandelholz','Moschus'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Issey Miyake'), 'Nuit d''Issey', 'issey-nuit', 'Men', 'oriental', 85, 8, 7, 83, 'Herbst', 'Abend', ARRAY['Pfeffer','Bergamotte','Lemon'], ARRAY['Leder','Vetiver','Patchouli'], ARRAY['Amber','Sandelholz','Moschus'])
  on conflict (slug) do nothing;

-- ─── MARC JACOBS ERWEITERT ────────────────────────────────────────────────────
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Marc Jacobs'), 'Dot', 'marc-jacobs-dot', 'Women', 'floral', 90, 6, 6, 82, 'Frühling', 'Alltag', ARRAY['Drachenfrucht','Erdbeere','Grapefruit'], ARRAY['Gardenie','Jasmin','Honeysuckle'], ARRAY['Kokos','Rote Holunder','Moschus'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Marc Jacobs'), 'Honey', 'marc-jacobs-honey', 'Women', 'floral', 85, 6, 6, 80, 'Sommer', 'Alltag', ARRAY['Birne','Honig','Grapefruit'], ARRAY['Orange Blossom','Honig','Peach'], ARRAY['Vanille','Holz','Moschus'])
  on conflict (slug) do nothing;

-- ─── GUERLAIN ERWEITERT ───────────────────────────────────────────────────────
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Guerlain'), 'Mon Guerlain', 'guerlain-mon-guerlain', 'Women', 'floral', 110, 7, 7, 86, 'Ganzjährig', 'Alltag', ARRAY['Bergamotte','Lavendel','Mandarine'], ARRAY['Lavendel','Jasmin','Pfingstrose'], ARRAY['Vanille','Sandelholz','Moschus'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Guerlain'), 'L''Homme Idéal', 'guerlain-lhomme-ideal', 'Men', 'oriental', 105, 8, 7, 86, 'Herbst', 'Abend', ARRAY['Bergamotte','Lavendel','Mandarine'], ARRAY['Almond','Iris','Vetiver'], ARRAY['Tonka','Sandelholz','Amber'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Guerlain'), 'Aqua Allegoria Bergamote Calabria', 'guerlain-aqua-bergamote', 'Unisex', 'fresh', 95, 4, 5, 78, 'Sommer', 'Alltag', ARRAY['Bergamotte','Limette','Zitrone'], ARRAY['Magnolia','Jasmin','Rose'], ARRAY['Moschus','Amber','Vetiver'])
  on conflict (slug) do nothing;

-- ─── DOLCE & GABBANA ERWEITERT ────────────────────────────────────────────────
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Dolce & Gabbana'), 'Pour Homme', 'dg-pour-homme', 'Men', 'fresh', 85, 6, 6, 80, 'Sommer', 'Alltag', ARRAY['Bergamotte','Zitrone','Lavendel'], ARRAY['Thymian','Salbei','Lavendel'], ARRAY['Tabak','Amber','Moschus'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Dolce & Gabbana'), 'Velvet Rose', 'dg-velvet-rose', 'Women', 'floral', 195, 8, 7, 86, 'Herbst', 'Abend', ARRAY['Bergamotte','Pfeffer'], ARRAY['Rose','Vanille','Iris'], ARRAY['Moschus','Amber','Sandelholz'])
  on conflict (slug) do nothing;

-- ─── CALVIN KLEIN ERWEITERT ───────────────────────────────────────────────────
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Calvin Klein'), 'CK One', 'ck-one', 'Unisex', 'fresh', 55, 5, 5, 77, 'Sommer', 'Alltag', ARRAY['Ananas','Papaya','Mandarine'], ARRAY['Jasmin','Rose','Lilie'], ARRAY['Moschus','Amber','Sandelholz'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Calvin Klein'), 'Euphoria', 'ck-euphoria', 'Women', 'floral', 75, 7, 7, 82, 'Herbst', 'Abend', ARRAY['Granatapfel','Persimmon','Lotus'], ARRAY['Schwertlilie','Jasmin','Schwarze Orchidee'], ARRAY['Amber','Leder','Mokka'])
  on conflict (slug) do nothing;

-- ─── JIMMY CHOO ERWEITERT ─────────────────────────────────────────────────────
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Jimmy Choo'), 'I Want Choo', 'jimmy-choo-i-want-choo', 'Women', 'floral', 80, 7, 7, 83, 'Herbst', 'Abend', ARRAY['Mandarine','Orange','Bergamotte'], ARRAY['Jasmin','Rose','Ylang-Ylang'], ARRAY['Amber','Sandelholz','Moschus'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Jimmy Choo'), 'Fever', 'jimmy-choo-fever', 'Women', 'floral', 85, 7, 7, 82, 'Abend', 'Abend', ARRAY['Rote Beeren','Bergamotte','Lemon'], ARRAY['Rose','Pfingstrose','Jasmin'], ARRAY['Patchouli','Sandelholz','Amber'])
  on conflict (slug) do nothing;

-- ─── MANCERA ERWEITERT ────────────────────────────────────────────────────────
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Mancera'), 'Aoud Exclusif', 'mancera-aoud-exclusif', 'Unisex', 'oriental', 185, 10, 9, 91, 'Winter', 'Abend', ARRAY['Oud','Rose','Amber'], ARRAY['Oud','Rose','Moschus'], ARRAY['Oud','Amber','Sandelholz'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Mancera'), 'Cedrat Boise', 'mancera-cedrat-boise', 'Unisex', 'woody', 185, 9, 8, 91, 'Herbst', 'Alltag', ARRAY['Bergamotte','Schwarze Johannisbeere','Zitrone'], ARRAY['Vetiver','Patchouli','Moschus'], ARRAY['Amber','Leder','Sandelholz'])
  on conflict (slug) do nothing;

-- ─── DAVIDOFF ERWEITERT ───────────────────────────────────────────────────────
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Davidoff'), 'The Game', 'davidoff-the-game', 'Men', 'woody', 65, 6, 6, 76, 'Herbst', 'Alltag', ARRAY['Grapefruit','Ingwer','Lemon'], ARRAY['Vetiver','Kardamom','Patchouli'], ARRAY['Amber','Moschus','Sandelholz'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Davidoff'), 'Champion', 'davidoff-champion', 'Men', 'aquatic', 55, 5, 5, 73, 'Sommer', 'Sport', ARRAY['Zitrone','Grapefruit','Minze'], ARRAY['Lavendel','Geranium','Kaktus'], ARRAY['Eichenholz','Moschus','Amber'])
  on conflict (slug) do nothing;

-- ─── XERJOFF ERWEITERT ────────────────────────────────────────────────────────
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Xerjoff'), 'Casamorati 1888', 'xerjoff-casamorati-1888', 'Unisex', 'oriental', 280, 9, 8, 90, 'Winter', 'Abend', ARRAY['Bergamotte','Zitrone','Kardamom'], ARRAY['Rose','Jasmin','Lavendel'], ARRAY['Vanille','Amber','Moschus'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Xerjoff'), 'Naxos', 'xerjoff-naxos', 'Unisex', 'oriental', 320, 9, 8, 91, 'Winter', 'Abend', ARRAY['Bergamotte','Zitrone','Lavendel'], ARRAY['Honig','Tabak','Jasmin'], ARRAY['Tonka','Vanille','Sandelholz'])
  on conflict (slug) do nothing;

-- ─── ARMAF ERWEITERT ──────────────────────────────────────────────────────────
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Armaf'), 'Club de Nuit Intense Man', 'armaf-club-de-nuit-intense', 'Men', 'woody', 35, 9, 9, 85, 'Herbst', 'Abend', ARRAY['Ananas','Schwarze Johannisbeere','Apfel'], ARRAY['Rose','Jasmin','Birke'], ARRAY['Ambergris','Moschus','Patchouli'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Armaf'), 'Club de Nuit Woman', 'armaf-club-de-nuit-woman', 'Women', 'floral', 35, 8, 8, 83, 'Abend', 'Abend', ARRAY['Schwarze Johannisbeere','Bergamotte','Grapefruit'], ARRAY['Rose','Jasmin','Veilchen'], ARRAY['Amber','Moschus','Sandelholz'])
  on conflict (slug) do nothing;

-- ─── LATTAFA ERWEITERT ────────────────────────────────────────────────────────
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Lattafa'), 'Khamrah', 'lattafa-khamrah', 'Unisex', 'oriental', 30, 9, 9, 83, 'Winter', 'Abend', ARRAY['Cinnamon','Mace','Bergamotte'], ARRAY['Amber','Oud','Moschus'], ARRAY['Vanille','Sandelholz','Amber'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Lattafa'), 'Oud For Glory', 'lattafa-oud-for-glory', 'Unisex', 'oriental', 35, 10, 9, 82, 'Winter', 'Abend', ARRAY['Oud','Amber','Sandelholz'], ARRAY['Oud','Rose','Sandelholz'], ARRAY['Amber','Moschus','Vanille'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Lattafa'), 'Ana Abiyedh Rouge', 'lattafa-ana-abiyedh-rouge', 'Women', 'floral', 25, 8, 8, 80, 'Ganzjährig', 'Alltag', ARRAY['Rose','Bergamotte'], ARRAY['Rose','Amber','Moschus'], ARRAY['Oud','Sandelholz','Amber'])
  on conflict (slug) do nothing;

-- ─── JO MALONE ERWEITERT ──────────────────────────────────────────────────────
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Jo Malone'), 'Wood Sage & Sea Salt', 'jo-malone-wood-sage-sea-salt', 'Unisex', 'aquatic', 145, 6, 5, 85, 'Sommer', 'Alltag', ARRAY['Ambrette','Seetang','Meerssalz'], ARRAY['Salbei'], ARRAY['Driftwood','Moschus'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Jo Malone'), 'Velvet Rose & Oud', 'jo-malone-velvet-rose-oud', 'Unisex', 'floral', 200, 8, 7, 88, 'Herbst', 'Abend', ARRAY['Rose','Oud'], ARRAY['Türkische Rose','Oud'], ARRAY['Oud','Amber','Moschus'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Jo Malone'), 'Red Roses', 'jo-malone-red-roses', 'Unisex', 'floral', 145, 6, 5, 84, 'Frühling', 'Alltag', ARRAY['Zitrone','Bergamotte','Lychee'], ARRAY['Rote Rose','Rose'], ARRAY['Weißer Moschus','Patchouli'])
  on conflict (slug) do nothing;

-- ─── MONTALE ERWEITERT ────────────────────────────────────────────────────────
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Montale'), 'Intense Café', 'montale-intense-cafe', 'Unisex', 'oriental', 130, 9, 8, 90, 'Herbst', 'Abend', ARRAY['Bergamotte','Kaffee','Rose'], ARRAY['Kaffee','Rose','Jasmin'], ARRAY['Patchouli','Vanille','Moschus'])
  on conflict (slug) do nothing;
insert into public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes) values
  ((select id from public.brands where name='Montale'), 'Roses Musk', 'montale-roses-musk', 'Unisex', 'floral', 130, 8, 7, 87, 'Ganzjährig', 'Alltag', ARRAY['Bergamotte','Rose'], ARRAY['Rose','Moschus'], ARRAY['Weißer Moschus','Sandelholz','Amber'])
  on conflict (slug) do nothing;
