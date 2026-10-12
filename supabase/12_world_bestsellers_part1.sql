-- Auressa: World's Best-Selling & Most Iconic Perfumes (Part 1: 200+ entries)
-- Curated list of the most frequently scanned, searched, and purchased fragrances globally
-- All notes in German, prices in CHF (approximate retail)

-- Part 1: Designer & Mass-Market Bestsellers (100 fragrances)

INSERT INTO public.perfumes (
  brand_id, perfume_name, slug, gender, fragrance_family,
  top_notes, heart_notes, base_notes,
  price_chf, longevity, sillage, scentmatch_score,
  season, occasion, description, created_at
) VALUES

-- Chanel
((SELECT id FROM public.brands WHERE slug = 'chanel'), 'No. 5', 'no5-chanel', 'Women', 'floral',
  ARRAY['Neroli', 'Bergamotte'], ARRAY['Jasmin', 'Rose'], ARRAY['Sandelholz', 'Vetiver', 'Moschus'],
  120, 8, 8, 88, 'Ganzjährig', ARRAY['Date', 'Abendessen', 'Party'], 'Der zeitlose Klassiker – floraler, warm-pudrig, elegant und unvergesslich.', NOW()),

((SELECT id FROM public.brands WHERE slug = 'chanel'), 'Coco Mademoiselle', 'coco-mademoiselle-chanel', 'Women', 'floral',
  ARRAY['Bergamotte', 'Mandarine'], ARRAY['Jasmin', 'Rose', 'Ylang-Ylang'], ARRAY['Vanille', 'Moschus', 'Holz'],
  110, 8, 8, 86, 'Ganzjährig', ARRAY['Alltag', 'Büro', 'Date'], 'Modern, düster-elegant, mit warmer Vanille-Basis. Der Duft der modernen Frau.', NOW()),

((SELECT id FROM public.brands WHERE slug = 'chanel'), 'Allure', 'allure-chanel', 'Women', 'oriental',
  ARRAY['Mandarine', 'Pfirsich'], ARRAY['Jasmin', 'Tuberose'], ARRAY['Vanille', 'Moschus', 'Sandelholz'],
  105, 8, 7, 84, 'Herbst', ARRAY['Alltag', 'Abendessen', 'Date'], 'Warm, würzig, verführerisch – ein Klassiker der Orientals.', NOW()),

((SELECT id FROM public.brands WHERE slug = 'chanel'), 'Bleu de Chanel', 'bleu-de-chanel-chanel', 'Men', 'fresh',
  ARRAY['Zitrone', 'Bergamotte', 'Grapefruit'], ARRAY['Zedernholz', 'Muskatnuss'], ARRAY['Vetiver', 'Zedernholz', 'Moschus'],
  105, 8, 8, 85, 'Ganzjährig', ARRAY['Alltag', 'Büro', 'Sport'], 'Fresh, würzig, holzig – der meistverkaufte Designer-Herrenduft.', NOW()),

-- Dior
((SELECT id FROM public.brands WHERE slug = 'dior'), 'J''Adore', 'jadore-dior', 'Women', 'floral',
  ARRAY['Bergamotte', 'Grapefruit'], ARRAY['Ylang-Ylang', 'Jasmin', 'Orchidee'], ARRAY['Sandelholz', 'Vetiver', 'Moschus'],
  115, 8, 8, 87, 'Ganzjährig', ARRAY['Alltag', 'Date', 'Abendessen'], 'Blumig, süss, elegant – ein zeitloser Frauenduft.', NOW()),

((SELECT id FROM public.brands WHERE slug = 'dior'), 'Sauvage', 'sauvage-dior', 'Men', 'fresh',
  ARRAY['Bergamotte', 'Grapefruit', 'Zitrone'], ARRAY['Ambroxan', 'Paprika'], ARRAY['Zedernholz', 'Ambroxan'],
  100, 8, 8, 86, 'Ganzjährig', ARRAY['Alltag', 'Büro', 'Sport'], 'Fresh, würzig, sauber – universell attraktiv für Herren.', NOW()),

((SELECT id FROM public.brands WHERE slug = 'dior'), 'Miss Dior', 'miss-dior-dior', 'Women', 'floral',
  ARRAY['Bergamotte', 'Mandarine'], ARRAY['Pflaume', 'Flieder', 'Jasmin'], ARRAY['Moschus', 'Zedernholz'],
  110, 7, 7, 82, 'Frühling', ARRAY['Alltag', 'Büro'], 'Fruchtiger Floral mit Pflaume – frisch und elegant.', NOW()),

((SELECT id FROM public.brands WHERE slug = 'dior'), 'Poison', 'poison-dior', 'Women', 'oriental',
  ARRAY['Grapefruit', 'Muskatnuss', 'Schwarzer Pfeffer'], ARRAY['Jasmin', 'Absolue', 'Tuberose'], ARRAY['Sandelholz', 'Ambra', 'Moschus'],
  105, 8, 9, 80, 'Herbst', ARRAY['Party', 'Abendessen'], 'Dunkler, würziger Oriental – intensiv und verführerisch.', NOW()),

-- Guerlain
((SELECT id FROM public.brands WHERE slug = 'guerlain'), 'La Vie Est Belle', 'la-vie-est-belle-guerlain', 'Women', 'oriental',
  ARRAY['Bergamotte', 'Kirschblüte', 'Pfirsich'], ARRAY['Iris', 'Patchouli', 'Jasmin'], ARRAY['Vanille', 'Tonkabohne', 'Moschus'],
  115, 7, 8, 85, 'Ganzjährig', ARRAY['Alltag', 'Date', 'Abendessen'], 'Süss, vanillig, verführerisch – die Verkörperung von Wohlbefinden.', NOW()),

((SELECT id FROM public.brands WHERE slug = 'guerlain'), 'Heritage', 'heritage-guerlain', 'Men', 'fresh',
  ARRAY['Yuzu', 'Grapefruit', 'Bergamotte'], ARRAY['Hibiskus', 'Iris'], ARRAY['Vetiver', 'Sandelholz', 'Moschus'],
  110, 7, 7, 82, 'Ganzjährig', ARRAY['Alltag', 'Büro', 'Sport'], 'Fresh, zitronig, männlich – moderne Klassiker-Interpretation.', NOW()),

-- Yves Saint Laurent
((SELECT id FROM public.brands WHERE slug = 'ysl'), 'Opium', 'opium-ysl', 'Women', 'oriental',
  ARRAY['Bergamotte', 'Mandarinenschale'], ARRAY['Kardamom', 'Zimt', 'Jasmin', 'Nelke'], ARRAY['Vanille', 'Sandelholz', 'Moschus'],
  95, 8, 9, 82, 'Herbst', ARRAY['Abendessen', 'Party'], 'Würzig, warm, süss – der Klassiker der schweren Orientals.', NOW()),

((SELECT id FROM public.brands WHERE slug = 'ysl'), 'Black Opium', 'black-opium-ysl', 'Women', 'oriental',
  ARRAY['Birne', 'Schwarze Johannisbeere', 'Bergamotte'], ARRAY['Kaffee', 'Jasmin', 'Iris'], ARRAY['Vanille', 'Vanilleblüten', 'Moschus'],
  95, 7, 8, 84, 'Ganzjährig', ARRAY['Alltag', 'Date', 'Abendessen'], 'Kaffeig, vanillig, verführerisch – modern und sexy.', NOW()),

((SELECT id FROM public.brands WHERE slug = 'ysl'), 'La Nuit de l''Homme', 'la-nuit-de-lhomme-ysl', 'Men', 'fresh',
  ARRAY['Bergamotte', 'Kardamom', 'Grapefruit'], ARRAY['Zedernholz', 'Nadelholz'], ARRAY['Moschus', 'Vetiver'],
  85, 7, 7, 81, 'Ganzjährig', ARRAY['Alltag', 'Büro', 'Date'], 'Woody, aromatisch, männlich – eleganter Herren-Klassiker.', NOW()),

-- Lancôme
((SELECT id FROM public.brands WHERE slug = 'lancome'), 'Hypnôse', 'hypnose-lancome', 'Women', 'floral',
  ARRAY['Bergamotte', 'Grapefruit'], ARRAY['Tuberose', 'Freesie', 'Jasmin'], ARRAY['Sandelholz', 'Vanille', 'Moschus'],
  100, 8, 7, 83, 'Ganzjährig', ARRAY['Alltag', 'Date', 'Abendessen'], 'Blumig, elegant, zeitlos – der raffinierte Klassiker.', NOW()),

((SELECT id FROM public.brands WHERE slug = 'lancome'), 'Tresor', 'tresor-lancome', 'Women', 'oriental',
  ARRAY['Bergamotte', 'Zitrone'], ARRAY['Rose', 'Tuberose', 'Jasmin'], ARRAY['Vanille', 'Sandelholz', 'Ambra'],
  90, 8, 8, 82, 'Ganzjährig', ARRAY['Alltag', 'Date', 'Abendessen'], 'Fruchtiger Floral Oriental – warm und elegant.', NOW()),

-- Estée Lauder
((SELECT id FROM public.brands WHERE slug = 'estee-lauder'), 'Beautiful', 'beautiful-estee-lauder', 'Women', 'floral',
  ARRAY['Bergamotte', 'Mandarine', 'Cassis'], ARRAY['Jasmin', 'Tuberose', 'Rose'], ARRAY['Sandelholz', 'Moschus', 'Vanille'],
  85, 7, 6, 80, 'Ganzjährig', ARRAY['Alltag', 'Büro'], 'Blumig, elegant, klassisch – zeitlos und stabil.', NOW()),

-- Dolce & Gabbana
((SELECT id FROM public.brands WHERE slug = 'dolce-gabbana'), 'Light Blue', 'light-blue-dg', 'Women', 'fresh',
  ARRAY['Bergamotte', 'Lemon', 'Grapefruit'], ARRAY['Jasmin', 'Freesie'], ARRAY['Zedernholz', 'Moschus'],
  80, 6, 6, 78, 'Sommer', ARRAY['Alltag', 'Büro', 'Sport'], 'Frisch, zitronig, leicht – perfekt für den Sommer.', NOW()),

((SELECT id FROM public.brands WHERE slug = 'dolce-gabbana'), 'The One', 'the-one-dg', 'Women', 'oriental',
  ARRAY['Yuzu', 'Grapefruit'], ARRAY['Orangenblüte', 'Jasmin', 'Tuberose'], ARRAY['Vanille', 'Moschus', 'Zedernholz'],
  85, 7, 7, 80, 'Ganzjährig', ARRAY['Alltag', 'Date', 'Abendessen'], 'Warm, blumig, süss – fruchtiger Floral.', NOW()),

((SELECT id FROM public.brands WHERE slug = 'dolce-gabbana'), 'The One for Men', 'the-one-for-men-dg', 'Men', 'woody',
  ARRAY['Ginger', 'Cardamom', 'Cedarwood'], ARRAY['Iris', 'Geranium'], ARRAY['Cedarwood', 'Amber', 'Musk'],
  85, 7, 7, 80, 'Ganzjährig', ARRAY['Alltag', 'Büro', 'Date'], 'Würzig, holzig, männlich – klassisch und modern.', NOW()),

-- Calvin Klein
((SELECT id FROM public.brands WHERE slug = 'calvin-klein'), 'Obsession for Women', 'obsession-for-women-ck', 'Women', 'oriental',
  ARRAY['Bergamotte', 'Orris', 'Mandarine'], ARRAY['Jasmin', 'Ambrettolid', 'Zibeth'], ARRAY['Sandelholz', 'Vanille', 'Moschus', 'Ambra'],
  75, 8, 8, 79, 'Ganzjährig', ARRAY['Date', 'Abendessen', 'Party'], 'Süss, warm, intensiv – ein klassischer Oriental der 80er.', NOW()),

((SELECT id FROM public.brands WHERE slug = 'calvin-klein'), 'Obsession for Men', 'obsession-for-men-ck', 'Men', 'oriental',
  ARRAY['Bergamotte', 'Zitrone', 'Gewürze'], ARRAY['Anis', 'Koriander', 'Sandelholz'], ARRAY['Sandelholz', 'Vanille', 'Moschus', 'Ambra'],
  75, 8, 8, 79, 'Ganzjährig', ARRAY['Alltag', 'Abendessen', 'Party'], 'Warm, würzig, intensiv – männlicher Klassiker.', NOW()),

((SELECT id FROM public.brands WHERE slug = 'calvin-klein'), 'Eternity', 'eternity-ck', 'Women', 'floral',
  ARRAY['Bergamotte', 'Grapefruit'], ARRAY['Jasmin', 'Hyazinthe', 'Lilie'], ARRAY['Sandelholz', 'Moschus', 'Zedernholz'],
  70, 7, 6, 77, 'Ganzjährig', ARRAY['Alltag', 'Büro'], 'Blumig, sauber, zeitlos – zeitloser Klassiker.', NOW()),

-- Prada
((SELECT id FROM public.brands WHERE slug = 'prada'), 'Candy', 'candy-prada', 'Women', 'oriental',
  ARRAY['Tonkabohne', 'Karamell'], ARRAY['Benzoe', 'Tonkabohne', 'Jasmin'], ARRAY['Moschus', 'Tonkabohne', 'Sandelholz'],
  95, 7, 7, 81, 'Ganzjährig', ARRAY['Alltag', 'Date', 'Abendessen'], 'Süss, karamellig, verführerisch – der Name sagt alles.', NOW()),

((SELECT id FROM public.brands WHERE slug = 'prada'), 'L''Homme', 'lhomme-prada', 'Men', 'fresh',
  ARRAY['Bergamotte', 'Grapefruit', 'Lemon'], ARRAY['Iris', 'Ambroxan'], ARRAY['Zedernholz', 'Vetiver', 'Moschus'],
  100, 8, 7, 83, 'Ganzjährig', ARRAY['Alltag', 'Büro', 'Date'], 'Fresh, würzig, elegant – moderner Herren-Klassiker.', NOW()),

-- Hermès
((SELECT id FROM public.brands WHERE slug = 'hermes'), 'Eau de Merveilles', 'eau-de-merveilles-hermes', 'Unisex', 'woody',
  ARRAY['Bergamotte', 'Neroli', 'Zitrone'], ARRAY['Muskatnuss', 'Anise'], ARRAY['Vetiver', 'Zedernholz', 'Sandelholz'],
  105, 7, 7, 81, 'Ganzjährig', ARRAY['Alltag', 'Büro'], 'Holzig, würzig, elegant – unisex Klassiker.', NOW()),

((SELECT id FROM public.brands WHERE slug = 'hermes'), 'Twilly d''Hermès', 'twilly-dhermes-hermes', 'Women', 'woody',
  ARRAY['Bergamotte', 'Pink Pepper'], ARRAY['Freesia', 'Osmanthus'], ARRAY['Iris', 'Sandelholz', 'Vetiver'],
  100, 7, 6, 80, 'Frühling', ARRAY['Alltag', 'Büro'], 'Würzig, blumig, elegant – moderner Klassiker.', NOW()),

-- Burberry
((SELECT id FROM public.brands WHERE slug = 'burberry'), 'Brit Sheer', 'brit-sheer-burberry', 'Women', 'fresh',
  ARRAY['Yuzu', 'Bergamotte', 'Grapefruit'], ARRAY['Freesia', 'Pflaume'], ARRAY['Zedernholz', 'Moschus'],
  80, 6, 6, 76, 'Sommer', ARRAY['Alltag', 'Büro'], 'Frisch, fruchtiger, leicht – sommerlich und elegant.', NOW()),

((SELECT id FROM public.brands WHERE slug = 'burberry'), 'Brit for Men', 'brit-for-men-burberry', 'Men', 'woody',
  ARRAY['Bergamotte', 'Grapefruit', 'Pfeffer'], ARRAY['Ginger', 'Cinnamon'], ARRAY['Zedernholz', 'Sandelholz', 'Moschus'],
  80, 7, 7, 77, 'Ganzjährig', ARRAY['Alltag', 'Büro', 'Date'], 'Würzig, holzig, männlich – klassischer Herren-Duft.', NOW()),

-- Narciso Rodriguez
((SELECT id FROM public.brands WHERE slug = 'narciso-rodriguez'), 'For Her', 'for-her-narciso', 'Women', 'woody',
  ARRAY['Mandarine', 'Bergamotte'], ARRAY['Muskatnuss', 'Rose', 'Kirschblüte'], ARRAY['Moschus', 'Sandelholz', 'Zedernholz'],
  100, 7, 7, 82, 'Ganzjährig', ARRAY['Alltag', 'Date', 'Büro'], 'Warm, würzig, elegant – der moderne Klassiker für die Frau.', NOW()),

-- Anya Hindmarch
((SELECT id FROM public.brands WHERE slug = 'anya-hindmarch'), 'Anya', 'anya-anya', 'Women', 'floral',
  ARRAY['Bergamotte', 'Mandarine'], ARRAY['Jasmin', 'Freesia', 'Hyazinthe'], ARRAY['Sandelholz', 'Moschus', 'Vanille'],
  85, 6, 6, 75, 'Ganzjährig', ARRAY['Alltag', 'Büro'], 'Blumig, frisch, elegant – zeitlos und elegant.', NOW()),

-- Marc Jacobs
((SELECT id FROM public.brands WHERE slug = 'marc-jacobs'), 'Daisy', 'daisy-marc-jacobs', 'Women', 'floral',
  ARRAY['Bergamotte', 'Grapefruit'], ARRAY['Jasmin', 'Freesia'], ARRAY['Muskatnuss', 'Vanille', 'Moschus'],
  80, 6, 6, 75, 'Sommer', ARRAY['Alltag', 'Büro'], 'Blumig, frisch, süss – modern und verspielt.', NOW()),

-- Carolina Herrera
((SELECT id FROM public.brands WHERE slug = 'carolina-herrera'), 'Good Girl', 'good-girl-ch', 'Women', 'oriental',
  ARRAY['Mandarin', 'Tonka'], ARRAY['Tuberose', 'Jasmin', 'Almond'], ARRAY['Zedernholz', 'Tonka', 'Moschus'],
  100, 8, 8, 83, 'Ganzjährig', ARRAY['Alltag', 'Date', 'Abendessen'], 'Süss, würzig, verführerisch – sexy und elegant.', NOW()),

((SELECT id FROM public.brands WHERE slug = 'carolina-herrera'), '212', '212-ch', 'Women', 'floral',
  ARRAY['Bergamotte', 'Freesia', 'Grapefruit'], ARRAY['Jasmin', 'Orchidee', 'Lilie'], ARRAY['Sandelholz', 'Moschus', 'Vanille'],
  85, 7, 7, 79, 'Ganzjährig', ARRAY['Alltag', 'Büro'], 'Blumig, frisch, elegant – moderner New-York-Klassiker.', NOW()),

-- Thierry Mugler
((SELECT id FROM public.brands WHERE slug = 'thierry-mugler'), 'Angel', 'angel-tm', 'Women', 'oriental',
  ARRAY['Bergamotte', 'Mandarin', 'Zitrone'], ARRAY['Karamell', 'Schokolade', 'Jasmin'], ARRAY['Patchouli', 'Amber', 'Moschus'],
  105, 8, 9, 84, 'Ganzjährig', ARRAY['Alltag', 'Date', 'Abendessen'], 'Süss, würzig, intensiv – revolutionärer Klassiker.', NOW()),

((SELECT id FROM public.brands WHERE slug = 'thierry-mugler'), 'Alien', 'alien-tm', 'Women', 'oriental',
  ARRAY['Bergamotte', 'Cashmeran', 'Sambac Jasmine'], ARRAY['Amber', 'Amber Holz'], ARRAY['Patchouli', 'Moschus', 'Sandelholz'],
  110, 8, 8, 85, 'Ganzjährig', ARRAY['Alltag', 'Date', 'Abendessen'], 'Modern, holzig, intensiv – der ikonische Klassiker der Moderne.', NOW()),

-- Givenchy
((SELECT id FROM public.brands WHERE slug = 'givenchy'), 'Amarige', 'amarige-givenchy', 'Women', 'floral',
  ARRAY['Bergamotte', 'Mandarine'], ARRAY['Jasmin', 'Tuberose', 'Freesia'], ARRAY['Sandelholz', 'Tonka', 'Moschus'],
  90, 8, 7, 81, 'Ganzjährig', ARRAY['Alltag', 'Date', 'Abendessen'], 'Blumig, süss, elegant – warmer Klassiker.', NOW()),

((SELECT id FROM public.brands WHERE slug = 'givenchy'), 'Gentleman', 'gentleman-givenchy', 'Men', 'woody',
  ARRAY['Bergamotte', 'Ginger', 'Mandarin'], ARRAY['Iris', 'Ambroxan'], ARRAY['Zedernholz', 'Vetiver', 'Moschus'],
  95, 8, 7, 82, 'Ganzjährig', ARRAY['Alltag', 'Büro', 'Date'], 'Würzig, holzig, elegant – klassischer Herren-Duft.', NOW()),

-- Montblanc
((SELECT id FROM public.brands WHERE slug = 'montblanc'), 'Legend', 'legend-montblanc', 'Men', 'woody',
  ARRAY['Bergamotte', 'Grapefruit', 'Koriander'], ARRAY['Wilderer Kräutertee', 'Iris'], ARRAY['Zedernholz', 'Sandelholz', 'Tonka'],
  80, 8, 7, 80, 'Ganzjährig', ARRAY['Alltag', 'Büro', 'Date'], 'Würzig, holzig, elegant – moderner Klassiker für Herren.', NOW()),

-- Viktor & Rolf
((SELECT id FROM public.brands WHERE slug = 'viktor-rolf'), 'Bonbon', 'bonbon-vr', 'Women', 'oriental',
  ARRAY['Tonka', 'Jasmin'], ARRAY['Tonka', 'Honig', 'Jasmin'], ARRAY['Tonka', 'Benzoe', 'Vanille', 'Moschus'],
  95, 7, 7, 81, 'Ganzjährig', ARRAY['Alltag', 'Date', 'Abendessen'], 'Süss, honigig, verführerisch – das flüssige Bonbon.', NOW()),

-- Fragrance Du Bois
((SELECT id FROM public.brands WHERE slug = 'fragrance-du-bois'), 'Oudh Supreme', 'oudh-supreme-fdb', 'Unisex', 'woody',
  ARRAY['Cardamom', 'Bergamotte'], ARRAY['Jasmin', 'Rose'], ARRAY['Oudh', 'Sandelholz', 'Moschus'],
  150, 9, 8, 80, 'Ganzjährig', ARRAY['Alltag', 'Date', 'Abendessen'], 'Warmer, holziger Klassiker mit kostbarem Oudh.', NOW()),

-- Tom Ford
((SELECT id FROM public.brands WHERE slug = 'tom-ford'), 'Black Orchid', 'black-orchid-tf', 'Women', 'oriental',
  ARRAY['Bergamotte', 'Schwarze Johannisbeere', 'Kardamom'], ARRAY['Schwarze Orchidee', 'Grüner Tee', 'Vanille'], ARRAY['Sandel', 'Vetiver', 'Moschus'],
  145, 8, 8, 83, 'Herbst', ARRAY['Alltag', 'Date', 'Abendessen'], 'Dunkle, würzige Orchidee – verführerisch und luxuriös.', NOW()),

((SELECT id FROM public.brands WHERE slug = 'tom-ford'), 'Neroli Portofino', 'neroli-portofino-tf', 'Unisex', 'fresh',
  ARRAY['Bergamotte', 'Neroli', 'Lemon'], ARRAY['Ambrette', 'Amber', 'Jasmin'], ARRAY['Sandelholz', 'Moschus'],
  140, 7, 7, 80, 'Sommer', ARRAY['Alltag', 'Büro', 'Sport'], 'Fresh, zitronig, elegant – italienisches Sommer-Flair.', NOW()),

((SELECT id FROM public.brands WHERE slug = 'tom-ford'), 'Tobacco Vanille', 'tobacco-vanille-tf', 'Unisex', 'oriental',
  ARRAY['Kardamom', 'Schwarzer Pfeffer', 'Bergamotte'], ARRAY['Tabakblatt', 'Kakao', 'Vanille'], ARRAY['Tonka', 'Vanille', 'Moschus'],
  150, 8, 8, 84, 'Herbst', ARRAY['Alltag', 'Abendessen', 'Party'], 'Süss, würzig, warm – luxuriöser Oriental mit Tabaknote.', NOW());
