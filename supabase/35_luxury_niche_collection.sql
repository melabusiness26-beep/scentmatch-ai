-- Luxury & Niche Collection 2026
-- 15 exklusive und schwer zu findende Premium-Düfte für Sammler

-- Ensure required brands exist
INSERT INTO brands (name, slug, country) VALUES
('Olfactory Stories', 'olfactory-stories', 'Greece'),
('Xerjoff', 'xerjoff', 'Italy'),
('Orto Parisi', 'orto-parisi', 'Italy'),
('Tauer Perfumes', 'tauer-perfumes', 'Switzerland'),
('Slumberhouse', 'slumberhouse', 'USA'),
('Kurkdjian', 'maison-francis-kurkdjian', 'France'),
('Perfume Parlour', 'perfume-parlour', 'UK'),
('Kilian', 'kilian', 'France'),
('Akro', 'akro', 'Russia'),
('Moth & Rabbit', 'moth-and-rabbit', 'Germany'),
('Carner Barcelona', 'carner-barcelona', 'Spain'),
('Bon Parfumeur', 'bon-parfumeur', 'France'),
('Maison Alhambra', 'maison-alhambra', 'France'),
('Nishane', 'nishane', 'Turkey')
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
    ('Olympic Orchids', 'olfactory-stories', 'floral', 'Women', 195, 8, 7, 85, 'Ganzjährig', 'Abend', '{Orchid, Lilac, Green Notes}', '{Orchid, Tuberose, Jasmine}', '{Amber, Sandalwood, Musk}', 'Seltene Orchideen aus Griechenland: elegant, mysteriös, raffiniert. Nur für Kenner.', 'olfactory-stories-olympia'),
    ('Naxos', 'xerjoff', 'woody', 'Men', 215, 9, 8, 87, 'Herbst/Winter', 'Abend', '{Leather, Oud, Spices}', '{Oud, Agarwood, Incense}', '{Leather, Tobacco, Musk}', 'Mythische Insel Naxos: oud-schwer, exotisch, zeitlos. Ein Meisterwerk für Oud-Liebhaber.', 'xerjoff-naxos'),
    ('Megamare', 'orto-parisi', 'woody', 'Unisex', 185, 8, 8, 86, 'Sommer', 'Abend', '{Ambroxan, Seaweed, Salt}', '{Marine Notes, Amber, Wood}', '{Sandalwood, Musk, Tobacco}', 'Meer unter dem Mond: mineralisch, salzig, intensiv. Für Künstler und Träumer.', 'orto-parisi-megamare'),
    ('La Via della Seta', 'tauer-perfumes', 'floral', 'Unisex', 168, 8, 7, 84, 'Ganzjährig', 'Abend', '{Incense, Spices, Rose}', '{Rose, Oud, Incense}', '{Leather, Sandalwood, Musk}', 'Die Seidestraße in Blüten: würzig, orientalisch, zeitlos. Schweizer Qualität.', 'tauer-perfumes-seta'),
    ('Tundra', 'slumberhouse', 'woody', 'Unisex', 172, 8, 7, 83, 'Herbst/Winter', 'Abend', '{Oakmoss, Tobacco, Leather}', '{Tobacco, Leather, Woods}', '{Leather, Vetiver, Patchouli}', 'Gefrorene Tundra: dunkel, würzig, meditativ. Für dunkle Abende am Lagerfeuer.', 'slumberhouse-tundra'),
    ('À la rose', 'maison-francis-kurkdjian', 'floral', 'Women', 175, 8, 7, 85, 'Ganzjährig', 'Alltag', '{Rose, Violet, Bergamot}', '{Rose, Peony, Geranium}', '{Sandalwood, Amber, Musk}', 'Rose in vollster Blüte: weiblich, elegant, modern. Für Rosenliebhaberinnen.', 'kurkdjian-rose-absolute'),
    ('Nr. 4 Forest', 'perfume-parlour', 'green', 'Unisex', 142, 7, 6, 81, 'Frühling', 'Alltag', '{Green Notes, Moss, Herbs}', '{Forest Floor, Greenery, Earthy}', '{Vetiver, Cedarwood, Musk}', 'Waldspaziergang: moosig, grün, natürlich. Für Natur-Liebhaber.', 'perfume-parlour-forest'),
    ('Intoxicated', 'kilian', 'gourmand', 'Unisex', 188, 9, 8, 86, 'Herbst/Winter', 'Abend', '{Vanilla, Tonka, Cocoa}', '{Vanilla, Amber, Tonka}', '{Sandalwood, Musk, Woods}', 'Betörendes Vanille-Aroma: süß, warm, addiktiv. Ein Geheimtipp.', 'kilian-intoxicated'),
    ('Dark Whisper', 'akro', 'woody', 'Men', 158, 8, 7, 83, 'Herbst/Winter', 'Abend', '{Oud, Leather, Pepper}', '{Oud, Incense, Amber}', '{Musk, Leather, Tobacco}', 'Dunkles Geflüster: intensiv, oud-fokussiert, exklusiv. Ein Nischen-Meisterwerk.', 'akro-dark-whisper'),
    ('Nordic Storm', 'moth-and-rabbit', 'aromatic', 'Unisex', 165, 8, 7, 83, 'Herbst/Winter', 'Alltag', '{Incense, Spices, Ozonic}', '{Pine, Woods, Aromatic}', '{Vetiver, Cedarwood, Musk}', 'Nordischer Sturm: würzig-würzig, intensiv, atmosphärisch. Skandinavische Tiefe.', 'moth-rabbit-storm'),
    ('Juniper Breeze', 'carner-barcelona', 'woody', 'Unisex', 148, 7, 6, 81, 'Ganzjährig', 'Alltag', '{Juniper, Green Notes, Citrus}', '{Juniper, Woods, Herbal}', '{Cedarwood, Vetiver, Musk}', 'Wacholder-Wind: aromatisch, würzig, erfrischend. Für Abenteuerlustige.', 'carner-barcelona-juniper'),
    ('101 Eau de Parfum', 'bon-parfumeur', 'floral', 'Women', 128, 7, 6, 80, 'Ganzjährig', 'Alltag', '{Jasmine, Gardenia, Bergamot}', '{Jasmine, Tuberose, Rose}', '{Sandalwood, Musk}', 'Minimalistische Blüten: rein, elegant, konzentriert. Französische Perfektion.', 'bon-parfumeur-101'),
    ('Alhambra', 'maison-alhambra', 'floral', 'Women', 172, 8, 7, 84, 'Ganzjährig', 'Abend', '{Orange Blossom, Rose, Lemon}', '{Orange Blossom, Jasmine, Rose}', '{Amber, Sandalwood, Musk}', 'Alhambras Blüten: Andalusisch, blumig, sinnlich. Spanisches Meisterwerk.', 'maison-alhambra-alhambra'),
    ('Nuit', 'nishane', 'woody', 'Unisex', 182, 9, 8, 86, 'Herbst/Winter', 'Abend', '{Oud, Leather, Spices}', '{Oud, Agarwood, Incense}', '{Leather, Musk, Sandalwood}', 'Nacht ohne Ende: dunkel, oud-dominiert, mystisch. Ein Nischenjuwel.', 'nishane-nuit'),
    ('Vetiver Royal', 'tauer-perfumes', 'woody', 'Men', 165, 8, 7, 83, 'Ganzjährig', 'Alltag', '{Vetiver, Citrus, Spices}', '{Vetiver, Cedar, Woody}', '{Sandalwood, Musk, Tobacco}', 'König des Vetiver: trocken, elegant, aromatisch. Für Vetiver-Puristen.', 'tauer-vetiver-royal')
) AS t(perfume_name, brand_slug, fragrance_family, gender, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes, description, slug);

-- Grant read access for public viewing
GRANT SELECT ON perfumes TO anon, authenticated;
