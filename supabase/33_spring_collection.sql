-- Spring 2026 Collection
-- 15 fresh & floral fragrances for spring season

-- Ensure required brands exist
INSERT INTO brands (name, slug, country) VALUES
('Issey Miyake', 'issey-miyake', 'Japan'),
('Marc Jacobs', 'marc-jacobs', 'USA'),
('Jo Malone', 'jo-malone', 'UK'),
('Lancôme', 'lancome', 'France'),
('Clarins', 'clarins', 'France'),
('Dolce & Gabbana', 'dolce-gabbana', 'Italy'),
('Guerlain', 'guerlain', 'France'),
('Celine', 'celine', 'France'),
('Maison Margiela', 'maison-margiela', 'Belgium'),
('Vilhelm Parfumerie', 'vilhelm-parfumerie', 'Sweden')
ON CONFLICT (slug) DO NOTHING;

-- Insert spring fragrances
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
    ('L''Eau d''Issey', 'issey-miyake', 'floral', 'Women', 95, 7, 6, 78, 'Frühling', 'Büro', '{Bergamot, Violet, Watermelon}', '{Freesia, Lilac, Hyacinth}', '{Musk, Cedar, Sandalwood}', 'Ein klassisches Frischewunder: blumig-grün, natürlich verführerisch. Täglicher Klassiker für alle.', 'issey-leau-dissey'),
    ('Daisy Love', 'marc-jacobs', 'floral', 'Women', 88, 6, 6, 76, 'Frühling', 'Alltag', '{Pear, Bergamot, Grapefruit}', '{Daisy, Peach, White Tea}', '{Musk, Sandalwood, Almond Milk}', 'Sonnig-frech: Daisy-Leichtigkeit mit fruchtiger Ausstrahlung. Für unbeschwerte Tage.', 'marc-jacobs-daisy-love'),
    ('Wood Sage & Sea Salt', 'jo-malone', 'clean', 'Unisex', 92, 5, 5, 75, 'Frühling', 'Büro', '{Sea Salt, Grapefruit, Ambroxan}', '{Sage, Cedarwood}', '{Driftwood, Musk}', 'Meeresluft im Glas: würzig-salzig, kühl und erfrischend. Pure Natur.', 'jo-malone-wood-sage-sea-salt'),
    ('La Vie Est Belle Soleil Cristal', 'lancome', 'gourmand', 'Women', 102, 7, 7, 80, 'Frühling', 'Evening', '{Lemon, Vanilla, Jasmine}', '{Vanilla, Heliotrope, Almond}', '{Sandalwood, Bourbon Vanilla, Musk}', 'Sonnig-süß: zitronige Vanille-Süße mit blumigen Akzenten. Für lebenslustige Momente.', 'lancome-la-vie-soleil'),
    ('Maison Margiela Replica Springtime', 'maison-margiela', 'floral', 'Unisex', 128, 7, 6, 79, 'Frühling', 'Büro', '{Apple, Bergamot, Pear}', '{Magnolia, Lily of the Valley, Iris}', '{Sandalwood, Musk}', 'Frühlingsmorgen in der Stadt: frisch-blumig, subtle elegant. Für Minimalisten.', 'margiela-springtime'),
    ('Blue de Chanel', 'chanel', 'clean', 'Men', 98, 8, 7, 81, 'Ganzjährig', 'Büro', '{Lemon, Mint, Incense}', '{Ambroxan, Cedar, Cypress}', '{Musk, Sandalwood, Patchouli}', 'Klassische Frische: würzig-minzig mit holziger Tiefe. Der moderne Mann-Klassiker.', 'chanel-blue-de-chanel'),
    ('Chloe Nomade', 'chloe', 'woody', 'Women', 112, 8, 7, 82, 'Frühling', 'Evening', '{Pink Pepper, Freesia, Artemisia}', '{Rose, Mimosa, Freesia}', '{Musk, Sandalwood, Vetiver}', 'Unabhängige Eleganz: würzig-blumig mit cooler Raffinesse. Für selbstbewusste Frauen.', 'chloe-nomade'),
    ('Givenchy Gentleman Reserve Privée', 'givenchy', 'woody', 'Men', 125, 8, 8, 83, 'Ganzjährig', 'Evening', '{Iris, Pepper, Cardamom}', '{Nutmeg, Chocolate, Oud}', '{Leather, Musk, Tobacco}', 'Dunkle Eleganz: würzig-warm mit schokoladiger Tiefe. Ein Premium-Statement.', 'givenchy-gentleman-privee'),
    ('Vilhelm Parfumerie Pars, Austere', 'vilhelm-parfumerie', 'floral', 'Unisex', 135, 6, 5, 78, 'Frühling', 'Büro', '{Petrichor, Hyacinth, Iris}', '{Geranium, Clary Sage, Green Tea}', '{Iris, Sandalwood, Musk}', 'Frische Natur-Essenz: erdig-blumig, klar und transparent. Für Minimalisten.', 'vilhelm-pars-austere'),
    ('Clarins Eau de Soie', 'clarins', 'floral', 'Women', 95, 6, 6, 77, 'Frühling', 'Alltag', '{White Tea, Bergamot, Lemon}', '{Silk Flowers, Jasmine, Peony}', '{Musk, Sandalwood, Vanilla}', 'Seide & Licht: zart-blumig mit feuchter Eleganz. Für empfindliche Haut.', 'clarins-eau-soie'),
    ('Dolce & Gabbana Light Blue', 'dolce-gabbana', 'floral', 'Women', 85, 6, 6, 76, 'Frühling', 'Alltag', '{Lemon, Apple, Bergamot}', '{Freesia, Lilac, Jasmine}', '{Musk, Cedrat, Amber}', 'Italienisches Lebensgefühl: zitronig-frisch mit blumiger Süße. Alltags-Liebling.', 'dolce-gabbana-light-blue'),
    ('Guerlain La Petite Robe Noire', 'guerlain', 'gourmand', 'Women', 108, 7, 6, 79, 'Frühling', 'Evening', '{Berries, Lilac, Florals}', '{Cherry, Almond, Vanilla}', '{Tonka, Sandalwood, Iris}', 'Süße Versuchung: Kirsch-Vanilla-Traum mit blumiger Eleganz. Für Naschkätzchen.', 'guerlain-petite-robe'),
    ('Celine Knots Imperial', 'celine', 'woody', 'Women', 145, 8, 7, 83, 'Ganzjährig', 'Evening', '{Neroli, Saffron, Incense}', '{Iris, Rose, Oud}', '{Vetiver, Leather, Musk}', 'Würdevolle Tiefe: orientalisch-würzig mit eleganter Raffinesse. Ein Bijoux.', 'celine-knots-imperial'),
    ('Issey Miyake L''Eau d''Issey Sport', 'issey-miyake', 'clean', 'Men', 78, 6, 6, 75, 'Frühling', 'Büro', '{Bergamot, Mandarin, Mint}', '{Spices, Geranium}', '{Musk, Cedar}', 'Sportive Frische: minzig-würzig, leicht und unbeschlossen. Für aktive Typen.', 'issey-sport-men'),
    ('Jo Malone Orange Blossom', 'jo-malone', 'floral', 'Unisex', 96, 5, 5, 75, 'Frühling', 'Büro', '{Bright Orange, Neroli}', '{Orange Blossom, Jasmine}', '{Sandalwood, Musk}', 'Blütenduft pur: zitronig-blumig, zart und luftig. Für Duft-Minimalisten.', 'jo-malone-orange-blossom')
) AS t(perfume_name, brand_slug, fragrance_family, gender, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes, description, slug);

-- Grant read access for public viewing
GRANT SELECT ON perfumes TO anon, authenticated;
