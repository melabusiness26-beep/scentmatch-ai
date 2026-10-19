-- Budget & Affordable 2026 Collection
-- 15 great-quality fragrances for budget-conscious collectors

-- Ensure required brands exist
INSERT INTO brands (name, slug, country) VALUES
('Zara', 'zara', 'Spain'),
('H&M', 'hm', 'Sweden'),
('Avon', 'avon', 'USA'),
('Oriflame', 'oriflame', 'Sweden'),
('Armaf', 'armaf', 'UAE'),
('Lattafa', 'lattafa', 'UAE'),
('UNIQ Designs', 'uniq-designs', 'UAE'),
('Dior', 'dior', 'France'),
('Paco Rabanne', 'paco-rabanne', 'Spain'),
('Prestige Fragrances', 'prestige-fragrances', 'USA')
ON CONFLICT (slug) DO NOTHING;

-- Insert budget-friendly fragrances
INSERT INTO perfumes (
  perfume_name,
  brand_id,
  fragrance_family,
  gender,
  price_chf,
  longevity,
  sillage,
  scentmatch_score,
  season,
  occasion,
  top_notes,
  heart_notes,
  base_notes,
  description,
  slug
)
SELECT
  perfume_name,
  (SELECT id FROM brands WHERE slug = brand_slug),
  fragrance_family,
  gender,
  price_chf,
  longevity,
  sillage,
  scentmatch_score,
  season,
  occasion,
  top_notes,
  heart_notes,
  base_notes,
  description,
  slug
FROM (
  VALUES
    ('Zara Deep Blue', 'zara', 'floral', 'Women', 42, 5, 5, 72, 'Ganzjährig', 'Alltag', '{Bergamot, Citrus, White Florals}', '{Freesia, Jasmine, Rose}', '{Musk, Sandalwood}', 'Moderner Blue-Dupe: frisch-blumig und tragbar. Großes Budget-Abenteuer.', 'zara-deep-blue'),
    ('H&M Eau de Toilette 001', 'hm', 'clean', 'Unisex', 38, 4, 4, 70, 'Ganzjährig', 'Büro', '{Lemon, Bergamot, Green Notes}', '{Jasmine, Freesia}', '{Musk, Cedar}', 'Minimalistische Frische: unschlagbar für den Preis. Ein Allrounder.', 'hm-edt-001'),
    ('Avon Haiku', 'avon', 'floral', 'Women', 45, 5, 5, 71, 'Ganzjährig', 'Alltag', '{Gardenia, Tuberose, White Florals}', '{Jasmine, Rose}', '{Sandalwood, Musk}', 'Zarte Blüten: klassisch-blumig mit modernem Twist. Eine Ikone im Budget-Bereich.', 'avon-haiku'),
    ('Oriflame Tender Care', 'oriflame', 'floral', 'Women', 48, 5, 5, 72, 'Frühling', 'Alltag', '{Apple, Peach, Bergamot}', '{Rose, Violet, Freesia}', '{Sandalwood, Musk}', 'Frühlingsanfang: fruchtiger Klassiker mit Zartheit. Ein Liebling.', 'oriflame-tender-care'),
    ('Armaf Creed Aventus Clone', 'armaf', 'floral', 'Men', 52, 6, 6, 75, 'Ganzjährig', 'Alltag', '{Pineapple, Bergamot, Blackcurrant}', '{Jasmine, Rose, Birch}', '{Ambroxan, Sandalwood, Musk}', 'Der Aventus-Alternative: tropisch-fruchtig ohne Preis-Schock. Ein Champion-Clone.', 'armaf-aventus-clone'),
    ('Lattafa Opulent Ombre', 'lattafa', 'woody', 'Unisex', 48, 6, 6, 74, 'Herbst/Winter', 'Evening', '{Oud, Spices, Incense}', '{Leather, Sandalwood, Amber}', '{Oud, Musk, Tobacco}', 'Orientalisches Flair: würzig-dunkel mit Oud-Präsenz. Erstaunlich gut für den Preis.', 'lattafa-opulent-ombre'),
    ('UNIQ Designs Niche Clone', 'uniq-designs', 'floral', 'Women', 55, 6, 6, 76, 'Ganzjährig', 'Evening', '{Saffron, Rose, Oud}', '{Tuberose, Jasmine}', '{Sandalwood, Amber}', 'Nische-Inspiration zu Discount-Preis: blumig-würzig und edel. Ein Geheimtipp.', 'uniq-niche-clone'),
    ('Dior Eau Sauvage', 'dior', 'clean', 'Men', 78, 7, 7, 79, 'Ganzjährig', 'Büro', '{Bergamot, Lemon, Basil}', '{Lavender, Geranium, Iris}', '{Sandalwood, Cedar, Musk}', 'Ein echter Klassiker: würzig-frisch und zeitlos. Der ultimative Evergreen.', 'dior-eau-sauvage'),
    ('Paco Rabanne 1 Million', 'paco-rabanne', 'gourmand', 'Men', 65, 8, 8, 80, 'Ganzjährig', 'Evening', '{Cinnamon, Amber, Honey}', '{Cinnamon, Tonka, Vanilla}', '{Sandalwood, Amber, Tobacco}', 'Goldener Klassiker: würzig-süß mit kühlem Gold-Glanz. Ein Favorit.', 'paco-rabanne-1-million'),
    ('Prestige Fragrances Sofia', 'prestige-fragrances', 'floral', 'Women', 58, 6, 6, 74, 'Ganzjährig', 'Alltag', '{Lemon, Bergamot, Cassis}', '{Rose, Peony, Freesia}', '{Musk, Sandalwood, Cedar}', 'Romantische Rose: fruchtiger Einstieg mit blumiger Eleganz. Für Anfänger.', 'prestige-sofia'),
    ('Armaf Mega Niche Clone', 'armaf', 'floral', 'Women', 56, 7, 7, 76, 'Ganzjährig', 'Evening', '{Orange Blossom, Saffron, Pepper}', '{Rose, Tuberose, Oud}', '{Sandalwood, Amber, Musk}', 'Die nächste Stufe: würzig-blumig mit Oud-Drama. Premium-Qualität zum Budget-Preis.', 'armaf-mega-clone'),
    ('Lattafa Raghba', 'lattafa', 'woody', 'Men', 50, 7, 7, 75, 'Ganzjährig', 'Evening', '{Oud, Spices, Leather}', '{Sandalwood, Cedar, Amber}', '{Musk, Oud, Vetiver}', 'Orientalisches Meisterwerk: würzig-holzig mit Oud-Tiefe. Sensationell günstig.', 'lattafa-raghba'),
    ('Zara Warm Cashmere', 'zara', 'woody', 'Unisex', 44, 6, 6, 73, 'Herbst/Winter', 'Evening', '{Tonka, Vanilla, Amber}', '{Sandalwood, Cedar, Patchouli}', '{Musk, Sandalwood, Vetiver}', 'Warmer Klassiker: würzig-süß mit Kaschmir-Wärme. Ein Traum im Budget.', 'zara-warm-cashmere'),
    ('H&M Eau de Toilette 003', 'hm', 'gourmand', 'Women', 42, 5, 5, 71, 'Ganzjährig', 'Alltag', '{Vanilla, Caramel, Tonka}', '{Amber, Sandalwood}', '{Musk, Vanilla}', 'Süßes Vergnügen: vanillig-gourmand für kleines Geld. Ein Einstiegs-Klassiker.', 'hm-edt-003'),
    ('Avon Imari', 'avon', 'floral', 'Women', 48, 6, 6, 73, 'Ganzjährig', 'Alltag', '{Bergamot, Tuberose, Gardenia}', '{Rose, Jasmine, Peony}', '{Sandalwood, Musk, Amber}', 'Traditionelle Eleganz: blumig-warm mit nostalgischem Flair. Ein Klassiker.', 'avon-imari')
) AS t(perfume_name, brand_slug, fragrance_family, gender, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes, description, slug);

-- Grant read access for public viewing
GRANT SELECT ON perfumes TO anon, authenticated;
