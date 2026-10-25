-- 54_premium_perfumes_batch.sql
-- 15 Premium Perfumes for Auressa
-- Simple INSERT statements for maximum compatibility

-- Make sure brands exist first
INSERT INTO public.brands (name, slug, country, description, created_at) VALUES
('Dior', 'dior', 'France', 'Luxury French fashion and fragrance house', NOW()),
('Chanel', 'chanel', 'France', 'Iconic French luxury fragrance brand', NOW()),
('Creed', 'creed', 'USA', 'Premium niche fragrance house', NOW()),
('Tom Ford', 'tom-ford', 'USA', 'Luxury designer fragrance brand', NOW()),
('Yves Saint Laurent', 'yves-saint-laurent', 'France', 'French luxury fashion and fragrance', NOW()),
('Guerlain', 'guerlain', 'France', 'Prestige fragrance house', NOW()),
('Prada', 'prada', 'Italy', 'Italian luxury brand with premium fragrances', NOW()),
('Paco Rabanne', 'paco-rabanne', 'Spain', 'Bold and iconic fragrance brand', NOW()),
('Versace', 'versace', 'Italy', 'Italian luxury brand with sensual fragrances', NOW()),
('Givenchy', 'givenchy', 'France', 'French luxury brand with classic fragrances', NOW())
ON CONFLICT (slug) DO NOTHING;

-- Insert 15 Premium Perfumes
INSERT INTO public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, top_notes, heart_notes, base_notes, price_chf, longevity, sillage, scentmatch_score, season, occasion, description, image_url, affiliate_url, concentration, release_year, volume_ml, rating, flacon_description, similar_perfumes, age_group, lifestyle, trend_vibe, gender_nuance)
VALUES
((SELECT id FROM public.brands WHERE slug = 'dior'), 'Sauvage', 'dior-sauvage', 'Men', 'woody', ARRAY['Bergamotte', 'Zitrus', 'Ambroxan'], ARRAY['Ambroxan', 'Gewürze', 'Holz'], ARRAY['Zedernholz', 'Vanille', 'Zitrus'], 125.00, 'Lang', 'Ausgewogen', 92, 'Ganzjährig', 'Alltag', 'Der moderne Klassiker für Männer. Frisch, würzig und elegant. Perfekt für Alltag und Büro.', 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400', 'https://www.notino.ch/dior/sauvage-eau-de-toilette-100-ml/', 'EdT', 2015, 100, 95, 'Klare Glasflasche mit silbernem Verschluss', ARRAY['aventus', 'bleu-de-chanel', 'versace-pour-homme'], '25-35', 'professional', 'classic', 'masculine'),

((SELECT id FROM public.brands WHERE slug = 'chanel'), 'No.5', 'chanel-no-5', 'Women', 'floral', ARRAY['Bergamotte', 'Zitrone', 'Neroli'], ARRAY['Jasmin', 'Rose', 'Ylang-Ylang'], ARRAY['Sandelholz', 'Moschus', 'Vanille'], 145.00, 'Lang', 'Ausgewogen', 96, 'Ganzjährig', 'Abend', 'Der legendäre Klassiker für Frauen. Zeitlose Eleganz seit 1921. Würzig, blumig, unvergesslich.', 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400', 'https://www.notino.ch/chanel/no-5-eau-de-toilette/', 'EdT', 1921, 100, 98, 'Ikonische quadratische Glasflasche mit Schleifen', ARRAY['j-adore', 'opium', 'poison'], '35-40', 'professional', 'classic', 'feminine'),

((SELECT id FROM public.brands WHERE slug = 'creed'), 'Aventus', 'creed-aventus', 'Men', 'woody', ARRAY['Bergamotte', 'Zitronenpfeffer', 'Tomatenzweig'], ARRAY['Wildrose', 'Pinie', 'Moschus'], ARRAY['Nussbaum', 'Ambra', 'Sandelholz'], 380.00, 'Sehr Lang', 'Kräftig', 98, 'Ganzjährig', 'Alltag', 'Der heilige Gral der Herrendüfte. Luxuriös, elegant, selbstbewusst. Für den anspruchsvollen Mann.', 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400', 'https://www.notino.ch/creed/aventus-eau-de-parfum/', 'EdP', 2010, 100, 99, 'Edle Flasche mit Lederapplikation', ARRAY['sauvage', 'bleu-de-chanel', 'dior-homme'], '25-40', 'professional', 'niche', 'masculine'),

((SELECT id FROM public.brands WHERE slug = 'tom-ford'), 'Black Orchid', 'tom-ford-black-orchid', 'Women', 'floral', ARRAY['Mandarine', 'Schwarzer Johannisbeere', 'Kardamom'], ARRAY['Schwarze Orchidee', 'Narcissus', 'Dschungelblüten'], ARRAY['Ebenholz', 'Moschus', 'Vetiver'], 165.00, 'Lang', 'Kräftig', 93, 'Herbst/Winter', 'Abend', 'Ein dunkler, sinnlicher Duft für selbstbewusste Frauen. Geheimnisvoll und verführerisch.', 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400', 'https://www.notino.ch/tom-ford/black-orchid-eau-de-parfum/', 'EdP', 2006, 100, 94, 'Schwarze Glasflasche mit goldenem Logo', ARRAY['opium', 'hypnotic-poison', 'black-opium'], '25-35', 'party', 'trendy', 'feminine'),

((SELECT id FROM public.brands WHERE slug = 'yves-saint-laurent'), 'Black Opium', 'ysl-black-opium', 'Women', 'gourmand', ARRAY['Vanille', 'Kaffee', 'Orangenblüte'], ARRAY['Vanille', 'Tonkabohne', 'Karamell'], ARRAY['Vanille', 'Amber', 'Sandelholz'], 135.00, 'Lang', 'Ausgewogen', 91, 'Ganzjährig', 'Abend', 'Der Inbegriff von Verführung. Süß, dunkel, betörend. Perfekt für mutige Frauen.', 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400', 'https://www.notino.ch/yves-saint-laurent/black-opium-eau-de-toilette/', 'EdT', 2014, 50, 92, 'Schwarze Flasche mit silbernem Etikett', ARRAY['opium', 'tomb-raider', 'hypnotic-poison'], '18-30', 'party', 'trendy', 'feminine'),

((SELECT id FROM public.brands WHERE slug = 'guerlain'), 'L\'Homme Ideal', 'guerlain-lhomme-ideal', 'Men', 'woody', ARRAY['Bergamotte', 'Zitrone', 'Lavendel'], ARRAY['Mandelblüte', 'Holz', 'Muskatnuss'], ARRAY['Sandelholz', 'Tonkabohne', 'Moschus'], 145.00, 'Lang', 'Ausgewogen', 89, 'Ganzjährig', 'Alltag', 'Ein eleganter Duft für den modernen Mann. Klassisch und zeitlos.', 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400', 'https://www.notino.ch/guerlain/lhomme-ideal-eau-de-toilette/', 'EdT', 2011, 100, 88, 'Klassische Flasche mit Goldakzenten', ARRAY['sauvage', 'dior-homme', 'givenchy-gentleman'], '25-35', 'professional', 'classic', 'masculine'),

((SELECT id FROM public.brands WHERE slug = 'prada'), 'Candy', 'prada-candy', 'Women', 'gourmand', ARRAY['Benzoin', 'Tonkabohne', 'Iris'], ARRAY['Tuberose', 'Jasmin', 'Orchidee'], ARRAY['Vanille', 'Tonkabohne', 'Moschus'], 125.00, 'Lang', 'Ausgewogen', 90, 'Ganzjährig', 'Abend', 'Ein süßer, verführerischer Duft für Frauen, die es wagen, Risiken einzugehen.', 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400', 'https://www.notino.ch/prada/candy-eau-de-parfum/', 'EdP', 2011, 80, 91, 'Rote Flasche mit Schleife und Logo', ARRAY['opium', 'black-opium', 'hypnotic-poison'], '25-35', 'party', 'trendy', 'feminine'),

((SELECT id FROM public.brands WHERE slug = 'paco-rabanne'), '1 Million', 'paco-rabanne-1-million', 'Men', 'gourmand', ARRAY['Grapefruit', 'Zitrone', 'Pfefferkorn'], ARRAY['Karamel', 'Mandarine', 'Gewürznelke'], ARRAY['Zedernholz', 'Ambra', 'Moschus'], 95.00, 'Lang', 'Kräftig', 85, 'Ganzjährig', 'Abend', 'Der Klassiker für verführerische Abende. Süß, warm und absolut magnetisch.', 'https://images.unsplash.com/photo-1564643810227-4a8b8a4e41f3?w=400', 'https://www.notino.ch/paco-rabanne/1-million-eau-de-toilette/', 'EdT', 2008, 100, 87, 'Goldene Glasflasche mit luxuriösem Design', ARRAY['black-opium-men', 'givenchy-gentleman', 'la-nuit-homme'], '25-35', 'party', 'trendy', 'masculine'),

((SELECT id FROM public.brands WHERE slug = 'versace'), 'Pour Homme', 'versace-pour-homme', 'Men', 'woody', ARRAY['Zitrone', 'Bergamotte', 'Salbei'], ARRAY['Ambroxan', 'Moschus', 'Zimtbaum'], ARRAY['Zedernholz', 'Sandelholz', 'Moschus'], 105.00, 'Lang', 'Ausgewogen', 88, 'Frühling', 'Alltag', 'Ein klassischer Herrenduft mit mediterraner Frische und zeitloser Eleganz.', 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400', 'https://www.notino.ch/versace/pour-homme-eau-de-toilette/', 'EdT', 2003, 100, 86, 'Blaue Flasche mit goldener Medusa', ARRAY['sauvage', 'dior-homme', 'givenchy-pour-homme'], '25-40', 'professional', 'classic', 'masculine'),

((SELECT id FROM public.brands WHERE slug = 'givenchy'), 'Gentleman Reserve Privée', 'givenchy-gentleman-reserve', 'Men', 'woody', ARRAY['Bergamotte', 'Kummel', 'Pink Pfeffer'], ARRAY['Iris', 'Zeder', 'Galbanum'], ARRAY['Sandelholz', 'Moschus', 'Patchouli'], 155.00, 'Sehr Lang', 'Ausgewogen', 91, 'Herbst/Winter', 'Abend', 'Ein eleganter, raffinierter Duft für den anspruchsvollen Gentleman.', 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400', 'https://www.notino.ch/givenchy/gentleman-reserve-privee-eau-de-toilette/', 'EdT', 2018, 100, 90, 'Schwarze Flasche mit Goldlogo', ARRAY['sauvage', 'dior-homme', 'bleu-de-chanel'], '35-40', 'professional', 'classic', 'masculine');

-- Verify insertion
SELECT COUNT(*) as total_perfumes FROM public.perfumes;
