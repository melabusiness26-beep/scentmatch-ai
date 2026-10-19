-- Summer 2026 Collection
-- 15 light & tropical fragrances for warm weather

-- Ensure required brands exist
INSERT INTO brands (name, slug, country) VALUES
('Acqua di Parma', 'acqua-di-parma', 'Italy'),
('Creed', 'creed', 'UK'),
('Hermès', 'hermes', 'France'),
('Byredo', 'byredo', 'Sweden'),
('Maison Alhambra', 'maison-alhambra', 'France'),
('Bond No. 9', 'bond-9', 'USA'),
('Serge Lutens', 'serge-lutens', 'France'),
('Orto Parisi', 'orto-parisi', 'Italy'),
('Susanne Lang', 'susanne-lang', 'Austria'),
('Yves Saint Laurent', 'yves-saint-laurent', 'France')
ON CONFLICT (slug) DO NOTHING;

-- Insert summer fragrances
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
    ('Blu Mediterraneo', 'acqua-di-parma', 'floral', 'Unisex', 105, 6, 6, 77, 'Sommer', 'Alltag', '{Lemon, Bitter Orange, Bergamot}', '{Hyacinth, Jasmine, Seaweed}', '{Musk, Muschio, Cedarwood}', 'Mittelmeer-Frische: zitronig-blumig, wie Urlaub im Glas. Pure Mittelmeer-Essenz.', 'acqua-parma-blu-med'),
    ('Virgin Island Water', 'creed', 'floral', 'Unisex', 145, 7, 7, 80, 'Sommer', 'Alltag', '{Lime, Coconut, Floral Notes}', '{Aquatic Florals, Seaweed, Musk}', '{Cedarwood, Musk, Sandalwood}', 'Tropen-Traum: fruchtiger Kokosnuss-Mix mit aquatischen Noten. Urlaubsfeeling.', 'creed-virgin-island'),
    ('Eau de Merveilles Bleue', 'hermes', 'floral', 'Women', 132, 6, 6, 78, 'Sommer', 'Alltag', '{Blue Cypress, Juniper, Bergamot}', '{Daphne, Iris, Jasmine}', '{Sandalwood, Musk, Cedar}', 'Blaue Wunder: kühl-blumig mit aquatischer Eleganz. Feenhafte Leichtigkeit.', 'hermes-merveilles-bleue'),
    ('Burning Rose', 'byredo', 'floral', 'Unisex', 148, 7, 7, 81, 'Sommer', 'Evening', '{Pink Pepper, Rose, Incense}', '{Orris, Tuberose, Oud}', '{Leather, Suede, Musk}', 'Leidenschaftliche Rose: würzig-blumig mit würziger Tiefe. Für Drama-Liebhaber.', 'byredo-burning-rose'),
    ('Heeley Sel Marin', 'heeley', 'clean', 'Unisex', 128, 7, 6, 79, 'Sommer', 'Büro', '{Sea Salt, Mineral, Citrus}', '{Seaweed, Iodine, White Florals}', '{Driftwood, Musk, Cedarwood}', 'Atlantik-Wasser: salzig-mineral, wie Brandung & Felsen. Für Strand-Liebhaber.', 'heeley-sel-marin'),
    ('Fleur Narcotique', 'bond-9', 'floral', 'Women', 132, 8, 7, 82, 'Sommer', 'Evening', '{Melon, Bergamot, Green Florals}', '{Narcissus, Jasmine, Tuberose}', '{Sandalwood, Amber, Musk}', 'Berauschende Narzisse: blumig-süßlich mit hypnotischer Tiefe. Für Nachts.', 'bond-9-fleur-narc'),
    ('A Scent by Issey Miyake', 'issey-miyake', 'floral', 'Women', 89, 6, 6, 76, 'Sommer', 'Alltag', '{Mandarin, Freesia, Grapefruit}', '{Hyacinth, Rose, Peony}', '{Musk, Sandalwood}', 'Minimalistische Essenz: frisch-blumig und transparent. Für Puristen.', 'issey-scent-women'),
    ('Aqua Allegoria Bergamote Calabria', 'guerlain', 'clean', 'Unisex', 98, 6, 5, 76, 'Sommer', 'Büro', '{Bergamote, Lemon, Pink Grapefruit}', '{White Flowers, Freesia}', '{Musk, Sandalwood}', 'Zitrus-Explosion: hell-fruchtiger Bergamotte-Mix. Für Citrus-Liebhaber.', 'guerlain-bergamote-calabria'),
    ('Serge Lutens À la nuit', 'serge-lutens', 'floral', 'Unisex', 142, 8, 7, 81, 'Sommer', 'Evening', '{Pepper, Clove, Incense}', '{Gardenias, White Florals, Jasmine}', '{Sandalwood, Oud, Vanilla}', 'Nächtliche Gärten: würzig-floral mit würziger Mystik. Für Nerven-geladene.', 'serge-lutens-nuit'),
    ('Orto Parisi Megamare', 'orto-parisi', 'aquatic', 'Unisex', 165, 7, 7, 82, 'Sommer', 'Alltag', '{Grapefruit, Sea Salt, Marine Notes}', '{Algae, Mineral, Aquatic}', '{Driftwood, Musk, Cedarwood}', 'Tiefes Meer: mineralisch-salztig, hypnotisch und belebend. Ozean-Erlebnis.', 'orto-parisi-megamare'),
    ('Susanne Lang Flor Nocturna', 'susanne-lang', 'floral', 'Women', 135, 7, 6, 79, 'Sommer', 'Evening', '{Saffron, Pink Pepper, Fruits}', '{Night Flowers, Jasmine, Rose}', '{Musk, Sandalwood, Incense}', 'Nächtliche Blüten: würzig-blumig mit geheimnisvollen Untertönen. Für Romantiker.', 'susanne-lang-flor-noct'),
    ('YSL Mon Paris', 'yves-saint-laurent', 'floral', 'Women', 92, 7, 7, 79, 'Sommer', 'Alltag', '{Strawberry, Blackcurrant, Raspberry}', '{Rose, Peony, Freesia}', '{Musk, Sandalwood, Vanilla}', 'Paris-Liebe: fruchtig-blumig mit romantischer Süße. Klassiker für alle.', 'ysl-mon-paris'),
    ('Creed Aventus For Her', 'creed', 'floral', 'Women', 152, 8, 8, 84, 'Sommer', 'Evening', '{Pineapple, Blackcurrant, Bergamot}', '{Rose, Jasmine, Peony}', '{Sandalwood, Amber, Musk}', 'Abenteuer-Geist: tropisch-fruchtig mit blumiger Raffinesse. Für Wildkatzen.', 'creed-aventus-her'),
    ('Acqua di Parma Blu Nobale', 'acqua-di-parma', 'floral', 'Men', 118, 7, 7, 80, 'Sommer', 'Büro', '{Lemon, Pink Pepper, Neroli}', '{Hyacinth, Lavender, Jasmine}', '{Sandalwood, Musk}', 'Italienische Adel: würzig-blumig mit mintiger Frische. Für kultivierte Herren.', 'acqua-parma-blu-nobile'),
    ('Serge Lutens Chergui', 'serge-lutens', 'woody', 'Unisex', 148, 8, 8, 83, 'Sommer', 'Evening', '{Anise, Caraway, Spices}', '{Labdanum, Tobacco, Honey}', '{Sandalwood, Cedar, Vanilla}', 'Wüsten-Wind: würzig-süß mit honigsüßer Tiefe. Für Abenteurer.', 'serge-lutens-chergui')
) AS t(perfume_name, brand_slug, fragrance_family, gender, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes, description, slug);

-- Grant read access for public viewing
GRANT SELECT ON perfumes TO anon, authenticated;
