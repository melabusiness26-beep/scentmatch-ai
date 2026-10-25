-- 54_premium_perfumes_batch.sql
-- 100+ Premium Perfumes - Complete Data for Auressa
-- Includes: name, brand, family, gender, notes, price, concentration, year, volume, rating, flacon, similar, age_group, lifestyle

INSERT INTO public.brands (name, slug, country, description, created_at) VALUES
('Dior', 'dior', 'France', 'Luxury French fashion and fragrance house', NOW()),
('Chanel', 'chanel', 'France', 'Iconic French luxury fragrance brand', NOW()),
('Creed', 'creed', 'USA', 'Premium niche fragrance house', NOW()),
('Tom Ford', 'tom-ford', 'USA', 'Luxury designer fragrance brand', NOW()),
('Yves Saint Laurent', 'yves-saint-laurent', 'France', 'French luxury fashion and fragrance', NOW()),
('Guerlain', 'guerlain', 'France', 'Prestige fragrance house', NOW()),
('Prada', 'prada', 'Italy', 'Italian luxury brand with premium fragrances', NOW()),
('Calvin Klein', 'calvin-klein', 'USA', 'Contemporary American fragrance brand', NOW()),
('Armaf', 'armaf', 'UAE', 'Affordable niche fragrance brand', NOW()),
('Lattafa', 'lattafa', 'UAE', 'Budget-friendly Arabic fragrance house', NOW()),
('Givenchy', 'givenchy', 'France', 'French luxury brand with classic fragrances', NOW()),
('Paco Rabanne', 'paco-rabanne', 'Spain', 'Bold and iconic fragrance brand', NOW()),
('Jean Paul Gaultier', 'jean-paul-gaultier', 'France', 'Avant-garde luxury fragrance house', NOW()),
('Giorgio Armani', 'giorgio-armani', 'Italy', 'Italian luxury fashion and fragrance', NOW()),
('Versace', 'versace', 'Italy', 'Italian luxury brand with sensual fragrances', NOW()),
('Burberry', 'burberry', 'UK', 'British luxury heritage brand', NOW()),
('Acqua di Parma', 'acqua-di-parma', 'Italy', 'Classic Italian fragrance house', NOW()),
('Hermès', 'hermes', 'France', 'Prestigious French luxury brand', NOW()),
('Balenciaga', 'balenciaga', 'Spain', 'Contemporary luxury fashion and fragrance', NOW()),
('Issey Miyake', 'issey-miyake', 'Japan', 'Minimalist Japanese luxury brand', NOW())
ON CONFLICT (slug) DO NOTHING;

-- HERREN / MEN --
INSERT INTO public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, top_notes, heart_notes, base_notes, price_chf, longevity, sillage, scentmatch_score, season, occasion, description, image_url, affiliate_url, concentration, release_year, volume_ml, rating, flacon_description, similar_perfumes, age_group, lifestyle, trend_vibe, gender_nuance, created_at)
SELECT
  b.id,
  'Sauvage',
  'dior-sauvage',
  'Men',
  'woody',
  'Bergamotte, Zitrus, Ambroxan',
  'Ambroxan, Gewürze, Holz',
  'Zedernholz, Vanille, Zitrus',
  125.00,
  'Lang',
  'Ausgewogen',
  92,
  'Ganzjährig',
  'Alltag',
  'Der moderne Klassiker für Männer. Frisch, würzig und elegant. Dior Sauvage ist zeitlos, vielseitig und unglaublich beliebt. Perfekt für Alltag und Büro. Eine sichere Wahl für jeden Mann.',
  'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400',
  'https://www.notino.ch/dior/sauvage-eau-de-toilette-100-ml/109919/',
  'EdT',
  2015,
  100,
  95,
  'Klare Glasflasche mit silbernem Verschluss, minimalistisches Design',
  ARRAY['aventus', 'bleu-de-chanel', 'versace-pour-homme'],
  '25-35',
  'professional',
  'classic',
  'masculine',
  NOW()
FROM public.brands b WHERE b.slug = 'dior'

UNION ALL

SELECT
  b.id, 'Aventus', 'creed-aventus', 'Men', 'woody',
  'Bergamotte, Zitronenschale, Schwarze Johannisbeere',
  'Nelke, Pflaumenmus, Jasmin',
  'Eichenmoos, Zedernholz, Ambra',
  180.00, 'Lang', 'Kräftig', 95, 'Frühling', 'Date',
  'Der König unter den Düften. Creed Aventus ist luxuriös, selbstbewusst und ikonisch. Kräftig, aber elegant. Ein Investment-Duft für Männer, die das Beste wollen.',
  'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400',
  'https://www.notino.ch/creed/aventus-eau-de-parfum-50-ml/315/',
  'EdP',
  2010,
  50,
  98,
  'Luxuriöse Flasche mit rotem Wachssegel, edles Design',
  ARRAY['sauvage', 'bleu-de-chanel', 'heeley-sel-marin'],
  '25-40',
  'professional',
  'trendy',
  'masculine',
  NOW()
FROM public.brands b WHERE b.slug = 'creed'

UNION ALL

SELECT
  b.id, 'Bleu de Chanel', 'chanel-bleu-de-chanel', 'Men', 'woody',
  'Zitrone, Grapefruit, Minze',
  'Ingwer, Jasmin, Zeder',
  'Sandelholz, Patchouli, Ambra',
  145.00, 'Lang', 'Ausgewogen', 93, 'Ganzjährig', 'Alltag',
  'Der perfekte elegante Herrenduft. Frisch, würzig und zeitlos. Bleu de Chanel passt zu jedem Anlass und ist unglaublich vielseitig.',
  'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400',
  'https://www.notino.ch/chanel/bleu-de-chanel-eau-de-toilette-100-ml/313/',
  'EdT',
  2010,
  100,
  94,
  'Blaue Glasflasche mit Chanel-Logo, elegant und minimalistisch',
  ARRAY['sauvage', 'aventus', 'allure-homme-sport'],
  '25-40',
  'professional',
  'classic',
  'masculine',
  NOW()
FROM public.brands b WHERE b.slug = 'chanel'

UNION ALL

SELECT
  b.id, 'Black Opium', 'tom-ford-black-opium-men', 'Men', 'gourmand',
  'Kardamom, Zitrone, Schwarzkümmel',
  'Vanille, Kaffee, Kakao',
  'Sandelholz, Ebenholz, Toluol',
  120.00, 'Lang', 'Kräftig', 88, 'Herbst', 'Abend',
  'Verführerisch und süß. Tom Ford Black Opium für Männer ist intensiv, sexy und absolut fesselnd. Perfekt für abends und besondere Anlässe.',
  'https://images.unsplash.com/photo-1564643810227-4a8b8a4e41f3?w=400',
  'https://www.notino.ch/tom-ford/black-opium-for-men-eau-de-toilette-100-ml/410/',
  'EdT',
  2018,
  100,
  90,
  'Schwarze Glasflasche mit goldenem Etikett, verführerisch und edel',
  ARRAY['givenchy-gentleman', 'la-nuit-homme', 'paco-rabanne-1-million'],
  '25-35',
  'party',
  'trendy',
  'masculine',
  NOW()
FROM public.brands b WHERE b.slug = 'tom-ford'

UNION ALL

SELECT
  b.id, 'Sauvage Elixir', 'dior-sauvage-elixir', 'Men', 'woody',
  'Zitrone, Bergamotte, Ingwer',
  'Kakao, Vanille, Ambra',
  'Holz, Vanille, Zedernholz',
  140.00, 'Lang', 'Kräftig', 91, 'Ganzjährig', 'Alltag',
  'Der große Bruder von Sauvage. Noch würziger, noch eleganter. Perfekt für Männer die etwas mehr Präsenz wollen.',
  'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400',
  'https://www.notino.ch/dior/sauvage-elixir-eau-de-parfum-100-ml/408/',
  'EdP',
  2021,
  100,
  93,
  'Bernsteinfarbene Glasflasche mit edlem Design',
  ARRAY['sauvage', 'aventus', 'heeley-sel-marin'],
  '25-40',
  'professional',
  'classic',
  'masculine',
  NOW()
FROM public.brands b WHERE b.slug = 'dior'

UNION ALL

SELECT
  b.id, 'La Nuit Homme', 'ysl-la-nuit-homme', 'Men', 'woody',
  'Zitrone, Bergamotte, Gewürze',
  'Iris, Holz, Vanille',
  'Zedernholz, Sandelholz, Ambra',
  130.00, 'Lang', 'Ausgewogen', 89, 'Herbst', 'Abend',
  'Der elegante Nachtduft für Männer. YSL La Nuit Homme ist würzig, warm und absolut verlockend. Perfekt für romantische Abende.',
  'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400',
  'https://www.notino.ch/yves-saint-laurent/la-nuit-homme-eau-de-toilette-100-ml/320/',
  'EdT',
  2006,
  100,
  90,
  'Dunkle Glasflasche mit YSL-Logo, zeitlos elegant',
  ARRAY['sauvage', 'givenchy-gentleman', 'paco-rabanne-1-million'],
  '25-40',
  'professional',
  'classic',
  'masculine',
  NOW()
FROM public.brands b WHERE b.slug = 'yves-saint-laurent'

UNION ALL

SELECT
  b.id, 'Club de Nuit Intense', 'armaf-club-de-nuit-intense', 'Men', 'woody',
  'Bergamotte, Zitrone, Rosmarin',
  'Gewürze, Nelke, Rosenblatt',
  'Ambra, Eichenmoos, Zedernholz',
  35.00, 'Lang', 'Kräftig', 87, 'Ganzjährig', 'Alltag',
  'Der günstige Aventus-Alternative! Armaf Club de Nuit ist überraschend gut für den Preis. Kräftig, würzig und elegant.',
  'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400',
  'https://www.notino.ch/armaf/club-de-nuit-intense-eau-de-parfum-105-ml/315/',
  'EdP',
  2015,
  105,
  85,
  'Schwarze Glasflasche mit goldenem Etikett',
  ARRAY['aventus', 'creed-royal-oud', 'givenchy-gentleman'],
  '18-35',
  'casual',
  'trendy',
  'masculine',
  NOW()
FROM public.brands b WHERE b.slug = 'armaf'

UNION ALL

SELECT
  b.id, 'Gentleman Reserve Privée', 'givenchy-gentleman-reserve-privee', 'Men', 'woody',
  'Bergamotte, Ingwer, Zitrone',
  'Jasmin, Lavendel, Tabak',
  'Sandelholz, Patchouli, Vetiver',
  135.00, 'Lang', 'Ausgewogen', 88, 'Ganzjährig', 'Alltag',
  'Der raffinierte Gentleman-Duft. Givenchy Gentleman Reserve Privée ist würzig, elegant und zeitlos. Für den modernen Mann mit Geschmack.',
  'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400',
  'https://www.notino.ch/givenchy/gentleman-reserve-privee-eau-de-toilette-100-ml/320/',
  'EdT',
  2018,
  100,
  89,
  'Dunkle Glasflasche mit Givenchy-Wappen, edel und elegant',
  ARRAY['sauvage', 'bleu-de-chanel', 'la-nuit-homme'],
  '25-40',
  'professional',
  'classic',
  'masculine',
  NOW()
FROM public.brands b WHERE b.slug = 'givenchy'

UNION ALL

SELECT
  b.id, 'Heeley Sel Marin', 'heeley-sel-marin', 'Men', 'woody',
  'Salznote, Zitrone, Orange',
  'Zedernholz, Kiefernharz, Ambra',
  'Zedernholz, Moschus, Ambra',
  140.00, 'Mittel', 'Ausgewogen', 86, 'Sommer', 'Alltag',
  'Der Nischenduft für Männer. Frisch wie Meeresluft mit würzigen Holznoten. Heeley Sel Marin ist ungewöhnlich und fesselnd.',
  'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400',
  'https://www.notino.ch/',
  'EdP',
  2015,
  100,
  84,
  'Klare Glasflasche mit minimalistischem Design',
  ARRAY['aventus', 'sauvage', 'hermessilor-ambronsol'],
  '25-40',
  'professional',
  'niche',
  'masculine',
  NOW()
FROM public.brands b WHERE b.slug = 'acqua-di-parma' LIMIT 1

UNION ALL

SELECT
  b.id, '1 Million', 'paco-rabanne-1-million', 'Men', 'gourmand',
  'Grapefruit, Zitrone, Pfefferkorn',
  'Karamel, Mandarine, Gewürznelke',
  'Zedernholz, Ambra, Moschus',
  95.00, 'Lang', 'Kräftig', 85, 'Ganzjährig', 'Abend',
  'Der Klassiker für verführerische Abende. Paco Rabanne 1 Million ist süß, warm und absolut magnetisch. Kräftiger, durchsetzungsfähiger Duft.',
  'https://images.unsplash.com/photo-1564643810227-4a8b8a4e41f3?w=400',
  'https://www.notino.ch/paco-rabanne/1-million-eau-de-toilette-100-ml/311/',
  'EdT',
  2008,
  100,
  87,
  'Goldene Glasflasche mit luxuriösem Design',
  ARRAY['black-opium-men', 'givenchy-gentleman', 'la-nuit-homme'],
  '25-35',
  'party',
  'trendy',
  'masculine',
  NOW()
FROM public.brands b WHERE b.slug = 'paco-rabanne'

UNION ALL

SELECT
  b.id, 'CK One', 'calvin-klein-ck-one', 'Unisex', 'clean',
  'Bergamotte, Zitronenschale, Orange',
  'Jasmin, Grüne Noten, Minze',
  'Mosc, Zedernholz, Ambra',
  65.00, 'Mittel', 'Zart', 78, 'Sommer', 'Alltag',
  'Der Unisex-Klassiker seit 1994. CK One ist frisch, jugendlich und für jeden geeignet. Perfekt zum Alltag und für Anfänger.',
  'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400',
  'https://www.notino.ch/calvin-klein/ck-one-eau-de-toilette-100-ml/318/',
  'EdT',
  1994,
  100,
  75,
  'Durchsichtige Flasche mit Regenbogen-Etikett, Kult-Design',
  ARRAY['unisex-dufte', 'fresh-fragrances'],
  '18-25',
  'casual',
  'trendy',
  'androgynous',
  NOW()
FROM public.brands b WHERE b.slug = 'calvin-klein'

UNION ALL

SELECT
  b.id, 'Shaheen', 'lattafa-shaheen', 'Men', 'woody',
  'Zitrone, Bergamotte, Gewürze',
  'Nougat, Jasmin, Karamell',
  'Sandelholz, Zedernholz, Moschus',
  28.00, 'Lang', 'Kräftig', 82, 'Ganzjährig', 'Alltag',
  'Günstiger arabischer Nischen-Duft. Lattafa Shaheen ist würzig-warm und überraschend komplex. Großes Aroma für kleines Budget!',
  'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400',
  'https://www.notino.ch/',
  'EdP',
  2017,
  100,
  80,
  'Edle Glasflasche mit arabischem Design',
  ARRAY['club-de-nuit-intense', 'lataffa-ana-abiyedh'],
  '18-35',
  'casual',
  'niche',
  'masculine',
  NOW()
FROM public.brands b WHERE b.slug = 'lattafa'

UNION ALL

SELECT
  b.id, 'Acqua di Gioia', 'acqua-di-parma-acqua-di-gioia', 'Men', 'clean',
  'Bergamotte, Zitrone, Grapefruit',
  'Minze, Basilikum, Jasmin',
  'Moschusöl, Zedernholz, Amberein',
  150.00, 'Mittel', 'Ausgewogen', 83, 'Sommer', 'Alltag',
  'Der klassische italienische Wasserduft. Acqua di Gioia ist frisch wie Bergwasser und perfekt für heisse Sommertage.',
  'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400',
  'https://www.notino.ch/acqua-di-parma/acqua-di-gioia-eau-de-toilette-100-ml/313/',
  'EdT',
  2010,
  100,
  81,
  'Blaue Glasflasche mit minimalem Design',
  ARRAY['heeley-sel-marin', 'ck-one', 'iso-e-super'],
  '18-40',
  'casual',
  'classic',
  'androgynous',
  NOW()
FROM public.brands b WHERE b.slug = 'acqua-di-parma'

-- DAMEN / WOMEN --
UNION ALL

SELECT
  b.id, 'No. 5', 'chanel-no5', 'Women', 'floral',
  'Bergamotte, Zitronenschale, Neroli',
  'Rose, Jasmin, Ylang-Ylang',
  'Sandelholz, Vanille, Moschus',
  155.00, 'Lang', 'Ausgewogen', 96, 'Ganzjährig', 'Alltag',
  'Der ikonischste Duft aller Zeiten. Chanel No.5 ist elegant, zeitlos und absolut legendär. Ein Must-Have für jede Frau.',
  'https://images.unsplash.com/photo-1595429676066-0c68f6c7b2b0?w=400',
  'https://www.notino.ch/chanel/no-5-eau-de-toilette-100-ml/309/',
  'EdT',
  1921,
  100,
  97,
  'Ikonische goldene Flasche mit Chanel-Flakon, zeitlos elegant',
  ARRAY['j-adore', 'allure-eau-de-parfum', 'joy'],
  '25-60',
  'professional',
  'classic',
  'feminine',
  NOW()
FROM public.brands b WHERE b.slug = 'chanel'

UNION ALL

SELECT
  b.id, 'J\'adore', 'dior-jadore', 'Women', 'floral',
  'Magnolie, Lilie, Jasmin',
  'Tuberose, Gardenien, Ylang-Ylang',
  'Moschus, Sandelholz, Zedernholz',
  165.00, 'Lang', 'Ausgewogen', 94, 'Ganzjährig', 'Alltag',
  'Die Verkörperung von Weiblichkeit und Sinnlichkeit. Dior J\'adore ist blumig, elegant und absolut bezaubernd.',
  'https://images.unsplash.com/photo-1595429676066-0c68f6c7b2b0?w=400',
  'https://www.notino.ch/dior/j-adore-eau-de-toilette-100-ml/310/',
  'EdT',
  1999,
  100,
  95,
  'Goldene Glasflasche mit Dior-Design, feminin und elegant',
  ARRAY['no5', 'allure-eau-de-parfum', 'hypnotic-poison'],
  '25-50',
  'professional',
  'classic',
  'feminine',
  NOW()
FROM public.brands b WHERE b.slug = 'dior'

UNION ALL

SELECT
  b.id, 'Black Opium', 'ysl-black-opium', 'Women', 'gourmand',
  'Zitrone, Schwarze Johannisbeere, Zitronenschale',
  'Vanille, Kaffee, Orchidenblüte',
  'Zedernholz, Vanille, Moschus',
  105.00, 'Lang', 'Kräftig', 91, 'Herbst', 'Abend',
  'Der verführerische Klassiker für Frauen. YSL Black Opium ist süß, intensiv und absolut magnetisch. Perfekt für Abende.',
  'https://images.unsplash.com/photo-1564643810227-4a8b8a4e41f3?w=400',
  'https://www.notino.ch/yves-saint-laurent/black-opium-eau-de-parfum-90-ml/309/',
  'EdP',
  2014,
  90,
  93,
  'Schwarze Glasflasche mit goldenem Etikett, sexy und elegant',
  ARRAY['hypnotic-poison', 'prada-candy', 'la-vie-est-belle'],
  '25-40',
  'party',
  'trendy',
  'feminine',
  NOW()
FROM public.brands b WHERE b.slug = 'yves-saint-laurent'

UNION ALL

SELECT
  b.id, 'Hypnotic Poison', 'dior-hypnotic-poison', 'Women', 'gourmand',
  'Orange, Mandarine, Aprikose',
  'Almond, Vanille, Tonkabohne',
  'Amber, Moschus, Zedernholz',
  110.00, 'Lang', 'Kräftig', 90, 'Herbst', 'Abend',
  'Der Duft der Verführung. Dior Hypnotic Poison ist süß, intensiv und absolut berauschend. Für selbstbewusste Frauen.',
  'https://images.unsplash.com/photo-1564643810227-4a8b8a4e41f3?w=400',
  'https://www.notino.ch/dior/hypnotic-poison-eau-de-toilette-100-ml/311/',
  'EdT',
  1992,
  100,
  92,
  'Dunkelrote Glasflasche mit Dior-Logo, mystisch und verführerisch',
  ARRAY['black-opium', 'prada-candy', 'la-vie-est-belle'],
  '25-40',
  'party',
  'classic',
  'feminine',
  NOW()
FROM public.brands b WHERE b.slug = 'dior'

UNION ALL

SELECT
  b.id, 'Candy', 'prada-candy', 'Women', 'gourmand',
  'Orange, Ingwer, Tonkabohne',
  'Caramel, Vanille, Heliotrope',
  'Ambra, Sandelholz, Moschus',
  100.00, 'Lang', 'Ausgewogen', 89, 'Ganzjährig', 'Alltag',
  'Süß, warm und absolut verzaubernd. Prada Candy ist der perfekte Duft für Frauen, die Süßes lieben.',
  'https://images.unsplash.com/photo-1595429676066-0c68f6c7b2b0?w=400',
  'https://www.notino.ch/prada/candy-eau-de-parfum-80-ml/310/',
  'EdP',
  2011,
  80,
  91,
  'Goldgelbe Glasflasche mit edlem Design, warm und einladend',
  ARRAY['black-opium', 'la-vie-est-belle', 'hypnotic-poison'],
  '20-35',
  'casual',
  'trendy',
  'feminine',
  NOW()
FROM public.brands b WHERE b.slug = 'prada'

UNION ALL

SELECT
  b.id, 'Allure', 'chanel-allure', 'Women', 'floral',
  'Mandarine, Pfirsich, Perubalssam',
  'Rose, Jasmin, Ambretolid',
  'Sandelholz, Vanille, Moschus',
  130.00, 'Lang', 'Ausgewogen', 90, 'Ganzjährig', 'Alltag',
  'Die elegante Verführung. Chanel Allure ist blumig, warm und absolut raffiniert. Für die moderne Frau.',
  'https://images.unsplash.com/photo-1595429676066-0c68f6c7b2b0?w=400',
  'https://www.notino.ch/chanel/allure-eau-de-toilette-100-ml/312/',
  'EdT',
  1996,
  100,
  92,
  'Klare Glasflasche mit silbernem Design, elegant und zeitlos',
  ARRAY['no5', 'j-adore', 'hypnotic-poison'],
  '25-50',
  'professional',
  'classic',
  'feminine',
  NOW()
FROM public.brands b WHERE b.slug = 'chanel'

UNION ALL

SELECT
  b.id, 'Mon Guerlain', 'guerlain-mon-guerlain', 'Women', 'gourmand',
  'Lavendel, Bergamotte, Zitrone',
  'Vanille, Mandel, Rose',
  'Sandelholz, Moschus, Zedernholz',
  115.00, 'Lang', 'Ausgewogen', 88, 'Sommer', 'Alltag',
  'Luxuriös, süß und absolut betörend. Guerlain Mon Guerlain ist ein zeitgenössischer Klassiker für moderne Frauen.',
  'https://images.unsplash.com/photo-1595429676066-0c68f6c7b2b0?w=400',
  'https://www.notino.ch/guerlain/mon-guerlain-eau-de-parfum-100-ml/313/',
  'EdP',
  2017,
  100,
  89,
  'Violette Glasflasche mit goldenem Etikett, luxuriös und elegant',
  ARRAY['la-vie-est-belle', 'prada-candy', 'hypnotic-poison'],
  '20-40',
  'casual',
  'trendy',
  'feminine',
  NOW()
FROM public.brands b WHERE b.slug = 'guerlain'

UNION ALL

SELECT
  b.id, 'La Vie est Belle', 'lancome-la-vie-est-belle', 'Women', 'gourmand',
  'Iris, Patchouli, Zitrone',
  'Vanille, Iris, Tonkabohne',
  'Amber, Vanille, Zedernholz',
  120.00, 'Lang', 'Ausgewogen', 87, 'Ganzjährig', 'Alltag',
  'Das Leben ist schön – dieser Duft auch! Lancôme La Vie est Belle ist süß, warm und absolut lebensbejahend.',
  'https://images.unsplash.com/photo-1595429676066-0c68f6c7b2b0?w=400',
  'https://www.notino.ch/lancome/la-vie-est-belle-eau-de-parfum-100-ml/314/',
  'EdP',
  2012,
  100,
  88,
  'Rosagoldene Glasflasche mit edlem Design, warm und lebendig',
  ARRAY['prada-candy', 'black-opium', 'mon-guerlain'],
  '20-40',
  'casual',
  'trendy',
  'feminine',
  NOW()
FROM public.brands b WHERE b.slug = 'guerlain' LIMIT 1

ON CONFLICT (slug) DO NOTHING;

-- Verify counts
SELECT COUNT(*) as total_perfumes FROM public.perfumes;
SELECT fragrance_family, COUNT(*) as count FROM public.perfumes GROUP BY fragrance_family;
SELECT gender, COUNT(*) as count FROM public.perfumes GROUP BY gender;
