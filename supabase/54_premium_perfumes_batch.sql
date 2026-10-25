-- 54_premium_perfumes_batch.sql
-- 10 Premium Perfumes for Auressa - SIMPLE & RELIABLE

INSERT INTO public.brands (name, slug, country, description, created_at) VALUES
('Dior', 'dior', 'France', 'Luxury French fashion and fragrance house', NOW()),
('Chanel', 'chanel', 'France', 'Iconic French luxury fragrance brand', NOW()),
('Creed', 'creed', 'USA', 'Premium niche fragrance house', NOW()),
('Tom Ford', 'tom-ford', 'USA', 'Luxury designer fragrance brand', NOW()),
('YSL', 'ysl', 'France', 'French luxury fashion and fragrance', NOW()),
('Prada', 'prada', 'Italy', 'Italian luxury brand with premium fragrances', NOW()),
('Paco Rabanne', 'paco-rabanne', 'Spain', 'Bold and iconic fragrance brand', NOW()),
('Versace', 'versace', 'Italy', 'Italian luxury brand with sensual fragrances', NOW())
ON CONFLICT (slug) DO NOTHING;

INSERT INTO public.perfumes (brand_id, perfume_name, slug, gender, fragrance_family, top_notes, heart_notes, base_notes, price_chf, longevity, sillage, scentmatch_score, season, occasion, description, image_url, affiliate_url, concentration, release_year, volume_ml, rating, flacon_description, similar_perfumes, age_group, lifestyle, trend_vibe, gender_nuance)
VALUES
((SELECT id FROM public.brands WHERE slug = 'dior'), 'Sauvage', 'dior-sauvage', 'Men', 'woody', ARRAY['Bergamotte', 'Zitrus', 'Ambroxan'], ARRAY['Ambroxan', 'Gewurze', 'Holz'], ARRAY['Zedernholz', 'Vanille', 'Zitrus'], 125.00, 8, 7, 92, 'Ganzjahrig', 'Alltag', 'Der moderne Klassiker fur Manner. Frisch, wurzig und elegant. Perfekt fur Alltag und Buro.', 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400', 'https://www.notino.ch/dior/sauvage-eau-de-toilette-100-ml/', 'EdT', 2015, 100, 95, 'Klare Glasflasche mit silbernem Verschluss', ARRAY['aventus', 'bleu-de-chanel'], '25-35', 'professional', 'classic', 'masculine'),

((SELECT id FROM public.brands WHERE slug = 'chanel'), 'No. 5', 'chanel-no-5', 'Women', 'floral', ARRAY['Bergamotte', 'Zitrone', 'Neroli'], ARRAY['Jasmin', 'Rose', 'Ylang-Ylang'], ARRAY['Sandelholz', 'Moschus', 'Vanille'], 145.00, 9, 8, 96, 'Ganzjahrig', 'Abend', 'Der legendare Klassiker fur Frauen. Zeitlose Eleganz seit 1921.', 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400', 'https://www.notino.ch/chanel/no-5-eau-de-toilette/', 'EdT', 1921, 100, 98, 'Ikonische quadratische Glasflasche', ARRAY['opium', 'poison'], '35-40', 'professional', 'classic', 'feminine'),

((SELECT id FROM public.brands WHERE slug = 'creed'), 'Aventus', 'creed-aventus', 'Men', 'woody', ARRAY['Bergamotte', 'Zitronenpfeffer'], ARRAY['Rose', 'Pinie', 'Moschus'], ARRAY['Ambra', 'Sandelholz'], 380.00, 10, 9, 98, 'Ganzjahrig', 'Alltag', 'Der heilige Gral der Herrendufte. Luxurios, elegant, selbstbewusst.', 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400', 'https://www.notino.ch/creed/aventus-eau-de-parfum/', 'EdP', 2010, 100, 99, 'Edle Flasche mit Lederapplikation', ARRAY['sauvage', 'dior-homme'], '25-40', 'professional', 'niche', 'masculine'),

((SELECT id FROM public.brands WHERE slug = 'tom-ford'), 'Black Orchid', 'tom-ford-black-orchid', 'Women', 'floral', ARRAY['Mandarine', 'Kardamom'], ARRAY['Orchidee', 'Narcissus'], ARRAY['Ebenholz', 'Moschus'], 165.00, 8, 8, 93, 'Herbst/Winter', 'Abend', 'Ein dunkler, sinnlicher Duft fur selbstbewusste Frauen.', 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400', 'https://www.notino.ch/tom-ford/black-orchid-eau-de-parfum/', 'EdP', 2006, 100, 94, 'Schwarze Glasflasche mit goldenem Logo', ARRAY['opium', 'poison'], '25-35', 'party', 'trendy', 'feminine'),

((SELECT id FROM public.brands WHERE slug = 'ysl'), 'Black Opium', 'ysl-black-opium', 'Women', 'gourmand', ARRAY['Vanille', 'Kaffee'], ARRAY['Tonkabohne', 'Karamell'], ARRAY['Amber', 'Sandelholz'], 135.00, 8, 7, 91, 'Ganzjahrig', 'Abend', 'Der Inbegriff von Verfuhrung. Suss, dunkel, betorend.', 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400', 'https://www.notino.ch/yves-saint-laurent/black-opium-eau-de-toilette/', 'EdT', 2014, 50, 92, 'Schwarze Flasche mit silbernem Etikett', ARRAY['opium'], '18-30', 'party', 'trendy', 'feminine'),

((SELECT id FROM public.brands WHERE slug = 'prada'), 'Candy', 'prada-candy', 'Women', 'gourmand', ARRAY['Benzoin', 'Tonkabohne'], ARRAY['Tuberose', 'Jasmin'], ARRAY['Vanille', 'Moschus'], 125.00, 7, 6, 90, 'Ganzjahrig', 'Abend', 'Ein suesser, verfuhrerischer Duft fur Frauen.', 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400', 'https://www.notino.ch/prada/candy-eau-de-parfum/', 'EdP', 2011, 80, 91, 'Rote Flasche mit Schleife und Logo', ARRAY['opium'], '25-35', 'party', 'trendy', 'feminine'),

((SELECT id FROM public.brands WHERE slug = 'paco-rabanne'), '1 Million', 'paco-rabanne-1-million', 'Men', 'gourmand', ARRAY['Grapefruit', 'Zitrone'], ARRAY['Karamel', 'Mandarine'], ARRAY['Zedernholz', 'Ambra'], 95.00, 8, 8, 85, 'Ganzjahrig', 'Abend', 'Der Klassiker fur verfuhrerische Abende. Suss, warm und magnetisch.', 'https://images.unsplash.com/photo-1564643810227-4a8b8a4e41f3?w=400', 'https://www.notino.ch/paco-rabanne/1-million-eau-de-toilette/', 'EdT', 2008, 100, 87, 'Goldene Glasflasche mit luxuriösem Design', ARRAY['givenchy-gentleman'], '25-35', 'party', 'trendy', 'masculine'),

((SELECT id FROM public.brands WHERE slug = 'versace'), 'Pour Homme', 'versace-pour-homme', 'Men', 'woody', ARRAY['Zitrone', 'Bergamotte'], ARRAY['Ambroxan', 'Moschus'], ARRAY['Zedernholz', 'Sandelholz'], 105.00, 7, 6, 88, 'Fruhling', 'Alltag', 'Ein klassischer Herrenduft mit mediterraner Frische und zeitloser Eleganz.', 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400', 'https://www.notino.ch/versace/pour-homme-eau-de-toilette/', 'EdT', 2003, 100, 86, 'Blaue Flasche mit goldener Medusa', ARRAY['sauvage'], '25-40', 'professional', 'classic', 'masculine');

SELECT COUNT(*) as total_perfumes FROM public.perfumes;
