-- Luxury Niche 2026 Collection
-- 15 premium & exclusive fragrances for connoisseurs

-- Ensure required brands exist
INSERT INTO brands (name, slug, country) VALUES
('Roja Parfums', 'roja-parfums', 'UK'),
('Kilian', 'kilian', 'Germany'),
('Francesca Bianchi', 'francesca-bianchi', 'Italy'),
('Perfumer''s Library', 'perfumers-library', 'UK'),
('SHL', 'shl', 'France'),
('DS & Durga', 'ds-durga', 'USA'),
('Parfum d''Empire', 'parfum-empire', 'France'),
('Slumberhouse', 'slumberhouse', 'USA'),
('Pia Longueville', 'pia-longueville', 'France'),
('Olfactive Studio', 'olfactive-studio', 'France')
ON CONFLICT (slug) DO NOTHING;

-- Insert luxury niche fragrances
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
    ('Roja Creation-R', 'roja-parfums', 'woody', 'Unisex', 215, 9, 9, 88, 'Ganzjährig', 'Evening', '{Rum, Violet, Incense}', '{Leather, Vetiver, Oud}', '{Sandalwood, Musk, Tobacco}', 'Ein Meisterwerk: dunkle Würzigkeit mit lederner Geheimnis. Für Puristen des Guten.', 'roja-creation-r'),
    ('Kilian Intoxicated', 'kilian', 'floral', 'Women', 195, 9, 8, 87, 'Ganzjährig', 'Evening', '{Gardenia, Tuberose, Orchid}', '{Heliotrope, Jasmine, Rose}', '{Sandalwood, Oud, Musk}', 'Berauschende Blüten: intensiv-floral mit hypnotischer Süße. Ein Bijoux.', 'kilian-intoxicated'),
    ('Francesca Bianchi Extrait di Profumo', 'francesca-bianchi', 'floral', 'Women', 185, 9, 8, 86, 'Ganzjährig', 'Evening', '{Orange Blossom, Bergamot, Neroli}', '{Rose, Jasmine, Ylang-Ylang}', '{Sandalwood, Amber, Vanilla}', 'Italienische Blütenessenz: kostbar und zart, mit orientalischer Süße. Ein Traum.', 'francesca-bianchi-estrait'),
    ('Perfumer''s Library 4711', 'perfumers-library', 'floral', 'Unisex', 142, 7, 7, 81, 'Ganzjährig', 'Büro', '{Lemon, Neroli, Bergamot}', '{Lavender, Rosemary, Geranium}', '{Sandalwood, Musk, Oak Moss}', 'Klassische Herbal-Eleganz: würzig-frisch mit geistiger Klarheit. Ein Erbstück.', 'perfumers-lib-4711'),
    ('SHL De Musk', 'shl', 'gourmand', 'Unisex', 168, 8, 7, 83, 'Ganzjährig', 'Evening', '{Oud, Spices, Incense}', '{Musk, Ambroxan, Tonka}', '{Leather, Tobacco, Cedar}', 'Orientalisches Geheimnis: würzig-süß mit moschusartiger Tiefe. Für Kenner.', 'shl-de-musk'),
    ('DS & Durga Radio Bombay', 'ds-durga', 'floral', 'Unisex', 158, 8, 8, 84, 'Ganzjährig', 'Evening', '{Cardamom, Rose, Oud}', '{Jasmine, Tuberose, Florals}', '{Oud, Leather, Tobacco}', 'Indische Mystik: würzig-blumig mit orientalischem Flair. Ein Abenteuer.', 'ds-durga-radio-bombay'),
    ('Parfum d''Empire Eau Suave', 'parfum-empire', 'floral', 'Unisex', 128, 7, 6, 79, 'Frühling', 'Büro', '{Bergamot, Neroli, Lemon}', '{Hyacinth, Narcissus, Freesia}', '{Sandalwood, Musk}', 'Französische Eleganz: hell und transparent, wie Versailles-Gärten. Ein Klassiker.', 'parfum-empire-eau-suave'),
    ('Slumberhouse Giallo Zafferano', 'slumberhouse', 'floral', 'Women', 145, 8, 7, 82, 'Herbst/Winter', 'Evening', '{Saffron, Lemon, Pepper}', '{Osmanthus, Rose, Tuberose}', '{Sandalwood, Vetiver, Musk}', 'Orientalische Duftpalette: würzig-blumig mit Safran-Raffinesse. Für Künstler.', 'slumberhouse-giallo'),
    ('Pia Longueville Signature', 'pia-longueville', 'woody', 'Unisex', 175, 9, 8, 85, 'Ganzjährig', 'Evening', '{Oud, Leather, Incense}', '{Iris, Violet, Sandalwood}', '{Oud, Musk, Tobacco}', 'Handgemacht & exklusiv: dunkle Raffinesse mit lederner Eleganz. Ein Statement.', 'pia-longueville-sig'),
    ('Olfactive Studio Lumière Noire', 'olfactive-studio', 'floral', 'Women', 162, 8, 7, 83, 'Ganzjährig', 'Evening', '{Violet, Heliotrope, Rose}', '{Osmanthus, Tuberose, Jasmine}', '{Sandalwood, Oud, Musk}', 'Dunkles Licht: blumig-mystisch mit violetten Untertönen. Für Poetinnen.', 'olfactive-lumiere-noire'),
    ('Roja Enigma Pour Homme', 'roja-parfums', 'woody', 'Men', 195, 9, 8, 87, 'Ganzjährig', 'Evening', '{Leather, Tobacco, Incense}', '{Oud, Cedar, Sandalwood}', '{Musk, Leather, Tobacco}', 'Männliche Mystik: düster-würzig mit lederner Tiefe. Ein Meisterwerk.', 'roja-enigma-homme'),
    ('Kilian Good Girl Gone Bad', 'kilian', 'floral', 'Women', 188, 9, 8, 86, 'Ganzjährig', 'Evening', '{Gardenia, Tuberose, White Flowers}', '{Rose, Jasmine, Oud}', '{Sandalwood, Amber, Musk}', 'Wilde Verführung: überladenfloral mit ätherischer Süße. Für Rebellinnen.', 'kilian-good-girl-bad'),
    ('Francesca Bianchi The Aroma of Venus', 'francesca-bianchi', 'gourmand', 'Women', 192, 9, 8, 87, 'Ganzjährig', 'Evening', '{Cinnamon, Vanilla, Tonka}', '{Rose, Honey, Amber}', '{Sandalwood, Vanilla, Musk}', 'Göttliche Süße: berauschend-vanillig mit rosenduftiger Tiefe. Ein Liebeselixier.', 'francesca-venus'),
    ('DS & Durga Penhaligon Elisir', 'ds-durga', 'woody', 'Unisex', 152, 8, 8, 84, 'Ganzjährig', 'Evening', '{Ginger, Cinnamon, Pepper}', '{Frankincense, Sandalwood, Leather}', '{Oud, Musk, Vetiver}', 'Magisches Elixier: würzig-aromatisch mit lederner Präsenz. Für Mystiker.', 'ds-durga-elisir'),
    ('Olfactive Studio Monumental', 'olfactive-studio', 'woody', 'Men', 158, 8, 8, 84, 'Ganzjährig', 'Evening', '{Oud, Pepper, Incense}', '{Leather, Cedar, Sandalwood}', '{Oud, Musk, Tobacco}', 'Monumentale Kraft: düster-würzig mit lederner Herrschaft. Ein Denkmal.', 'olfactive-monumental')
) AS t(perfume_name, brand_slug, fragrance_family, gender, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes, description, slug);

-- Grant read access for public viewing
GRANT SELECT ON perfumes TO anon, authenticated;
