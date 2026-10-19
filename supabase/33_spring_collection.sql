-- Premium Spring 2026 Collection
-- 15 neue kuratierte Düfte für den Schweizer Markt

-- Ensure required brands exist
INSERT INTO brands (name, slug, country) VALUES
('Maison Margiela', 'maison-margiela', 'Belgium'),
('Jo Malone', 'jo-malone', 'UK'),
('Byredo', 'byredo', 'Sweden'),
('Creed', 'creed', 'USA'),
('Miller Harris', 'miller-harris', 'UK'),
('Nishane', 'nishane', 'Turkey'),
('Atelier Cologne', 'atelier-cologne', 'France'),
('Acqua di Parma', 'acqua-di-parma', 'Italy'),
('Maison Francis Kurkdjian', 'maison-francis-kurkdjian', 'France'),
('Heeley', 'heeley', 'UK')
ON CONFLICT (slug) DO NOTHING;

-- Insert new fragrances
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
    ('Replica Springtime in Paris', 'maison-margiela', 'floral', 'Unisex', 132, 6, 6, 79, 'Frühling', 'Alltag', '{Hyacinth, Violet Leaf, Green Notes}', '{Hyacinth, Freesia, Violet}', '{Musk, Soft Woods}', 'Pariser Frühjahr: grün, blumig, luftig. Ein Spaziergang durch die blühenden Gärten des Quartier Latin.', 'maison-margiela-springtime'),
    ('Wood Sage & Sea Salt', 'jo-malone', 'clean', 'Unisex', 95, 5, 5, 77, 'Frühling', 'Alltag', '{Sage, Grapefruit, Ambrette}', '{Sea Salt, Driftwood}', '{Ambroxan, Soft Musks}', 'Meeresluft trifft Küstenkräuter: frisch, sauber, minimalistisch. Perfekt für den Morgen.', 'jo-malone-wood-sage'),
    ('Blanche', 'byredo', 'floral', 'Unisex', 148, 7, 6, 80, 'Frühling', 'Büro', '{Orange Blossom, Bergamot, Lemon}', '{Tuberose, Neroli, Jasmine}', '{Amber, Musk}', 'Weiße Blüten in klarer Luft: leuchtend, sauber, elegant. Für präsente Momente.', 'byredo-blanche'),
    ('Green Irish Tweed', 'creed', 'clean', 'Men', 165, 8, 7, 82, 'Frühling', 'Alltag', '{Lemon, Galbanum, Tarragon}', '{Violet Leaf, Iris}', '{Sandalwood, Cedarwood, Oakmoss}', 'Grüne Irische Wiesen: knackig, grün, erfrischend. Ein Klassiker für den modernen Mann.', 'creed-green-irish-tweed'),
    ('Pear Incense', 'miller-harris', 'fruity', 'Unisex', 155, 7, 6, 80, 'Frühling', 'Abend', '{Pear, Pink Pepper, Cardamom}', '{Incense, Amber, Lily}', '{Sandalwood, Vetiver, Musk}', 'Birne trifft räuchrige Wärme: süß, würzig, meditativ. Für kontemplative Stunden.', 'miller-harris-pear-incense'),
    ('Hacivat', 'nishane', 'woody', 'Men', 158, 8, 7, 81, 'Frühling', 'Abend', '{Pink Pepper, Ginger, Cardamom}', '{Oud, Agarwood, Amber}', '{Leather, Musk, Sandalwood}', 'Orientalische Frühjahrs-Wärme: würzig, elegant, zeitlos. Ein Meisterwerk der Balance.', 'nishane-hacivat'),
    ('Bergamote Soleil', 'atelier-cologne', 'citrus', 'Unisex', 128, 6, 6, 78, 'Frühling', 'Alltag', '{Bergamot, Lemon, Neroli}', '{Galbanum, Petitgrain, Basil}', '{Grapefruit, Light Woods}', 'Sonnige Zitrusfrische: leuchtend, lebendig, unbeschwert. Für Sommertage im Frühling.', 'atelier-cologne-bergamote-soleil'),
    ('Blu Mediterraneo', 'acqua-di-parma', 'citrus', 'Unisex', 142, 7, 6, 80, 'Frühling', 'Alltag', '{Lemon, Orange, Bergamot}', '{Neroli, Grapefruit, Petitgrain}', '{Woody Notes, Musk}', 'Mittelmeer-Küste: hell, erfrischend, elegant. Wie ein Tag an der Côte d''Azur.', 'acqua-di-parma-blu-mediterraneo'),
    ('À la rose', 'maison-francis-kurkdjian', 'floral', 'Women', 152, 7, 6, 81, 'Frühling', 'Alltag', '{Rose, Pink Pepper, Bergamot}', '{Rose, Geranium, Peony}', '{Amber, Musk, Sandalwood}', 'Zeitlose Roseneleganz: weiblich, raffiniert, unbegrenzt. Für die moderne Frau.', 'maison-francis-kurkdjian-rose'),
    ('Esprit du Tigre', 'heeley', 'woody', 'Unisex', 138, 7, 6, 79, 'Frühling', 'Abend', '{Ginger, Black Pepper, Cardamom}', '{Agarwood, Tobacco, Amber}', '{Leather, Musk, Sandalwood}', 'Tiger-Geist im Frühling: würzig, kraftvoll, meditativ. Für selbstbewusste Träger.', 'heeley-esprit-tigre'),
    ('Neroli Natura', 'atelier-cologne', 'floral', 'Unisex', 125, 5, 5, 77, 'Frühling', 'Büro', '{Neroli, Orange Blossom, Bergamot}', '{Petitgrain, Green Tea}', '{Light Musks}', 'Neroliblüten in reiner Form: leuchtend, leicht, natürlich. Für klare Gedanken.', 'atelier-cologne-neroli-natura'),
    ('Orris Cake', 'byredo', 'floral', 'Women', 148, 6, 5, 79, 'Frühling', 'Alltag', '{Iris, Violet, Lemon}', '{Orris Root, Geranium, Violet}', '{Sandalwood, Tonka, Musk}', 'Iris und Violett-Kuchen: süß, blumig, elegant. Für wunderliche, weibliche Momente.', 'byredo-orris-cake'),
    ('Fleur de Feu', 'creed', 'floral', 'Women', 168, 8, 7, 83, 'Frühling', 'Abend', '{Lilac, Orange Blossom, Lemon}', '{Peony, Jasmine, Rose}', '{Amber, Sandalwood, Musk}', 'Blume aus Feuer: intensiv, blumig, feurig. Für mutige, leidenschaftliche Frauen.', 'creed-fleur-de-feu'),
    ('Spring Forest', 'jo-malone', 'green', 'Unisex', 98, 5, 5, 76, 'Frühling', 'Alltag', '{Green Notes, Fern, Moss}', '{Grass, Greenery, Leaf}', '{Soft Woods, Musk}', 'Frühjahrswald nach Regen: grün, natürlich, erfrischend. Die Natur erwacht.', 'jo-malone-spring-forest'),
    ('Cis', 'nishane', 'floral', 'Women', 162, 8, 7, 82, 'Frühling', 'Abend', '{Iris, Pink Pepper, Bergamot}', '{Violet, Iris, Freesia}', '{Sandalwood, Amber, Musk}', 'Iris-Symphonie: pudrig, blumig, feminim. Ein moderner Klassiker für Iris-Liebhaberinnen.', 'nishane-cis')
) AS t(perfume_name, brand_slug, fragrance_family, gender, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes, description, slug);

-- Grant read access for public viewing
GRANT SELECT ON perfumes TO anon, authenticated;
