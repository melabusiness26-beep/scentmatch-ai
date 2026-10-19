-- Premium Summer 2026 Collection
-- 15 neue kuratierte Düfte für den Schweizer Markt

-- Ensure required brands exist
INSERT INTO brands (name, slug, country) VALUES
('Maison Solange', 'maison-solange', 'France'),
('Hermès', 'hermes', 'France'),
('L''Occitane', 'loccitane', 'France'),
('Heeley', 'heeley', 'UK'),
('Olympic Orchids', 'olympic-orchids', 'USA'),
('Prada', 'prada', 'Italy'),
('Issey Miyake', 'issey-miyake', 'Japan'),
('Vilhelm Parfumerie', 'vilhelm-parfumerie', 'Sweden'),
('Eight & Bob', 'eight-and-bob', 'France'),
('Maison Margiela', 'maison-margiela', 'Belgium')
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
    ('Eau de Mandarine Ambrée', 'maison-solange', 'citrus', 'Unisex', 118, 6, 6, 79, 'Sommer', 'Alltag', '{Mandarin, Yuzu, Grapefruit}', '{Neroli, Amber, Tonka}', '{Sandalwood, Musk}', 'Sommer in Südfrankreich: frisch, süß, sonnig. Ein Gutes-Laune-Duft.', 'maison-solange-mandarine'),
    ('Eau de Gentiane Blanche', 'hermes', 'floral', 'Women', 148, 7, 6, 80, 'Sommer', 'Büro', '{Bergamot, Lemon, Neroli}', '{Gentian, White Flowers, Jasmine}', '{White Musk, Cedar, Oakmoss}', 'Zarte Eleganz in hellstem Licht: mineralsauber, blumig, frisch. Für helle Tage.', 'hermes-gentiane-blanche'),
    ('Aqua Allegoria Bergamote Calabria', 'guerlain', 'citrus', 'Unisex', 108, 5, 5, 77, 'Sommer', 'Alltag', '{Bergamot, Yuzu, Lemon}', '{Petitgrain, Green Notes}', '{Musks, Light Woods}', 'Italienischer Sommer: Bergamot-reich, leuchtend, erfrischend. Minimal aber effektiv.', 'guerlain-bergamote-calabria'),
    ('Cologne Bigarade', 'loccitane', 'citrus', 'Unisex', 65, 4, 4, 75, 'Sommer', 'Alltag', '{Bitter Orange, Citrus, Basil}', '{Orange Blossom, Geranium}', '{Amber, Woody Notes}', 'Französisches Sommer-Klassiker: bitter-süß, kraftvoll, bezahlbar. Für Purist:innen.', 'loccitane-bigarade'),
    ('Jasmine Field', 'heeley', 'floral', 'Women', 135, 7, 6, 80, 'Sommer', 'Abend', '{Jasmine, Orange Blossom, Lily}', '{Jasmine, Tuberose, Gardenia}', '{Sandalwood, Amber, Musk}', 'Jasmin-Feld im Mondschein: intens, sinnlich, floral. Für leidenschaftliche Sommerabende.', 'heeley-jasmine-field'),
    ('Cattleya Australis', 'olympic-orchids', 'floral', 'Women', 142, 6, 5, 78, 'Sommer', 'Alltag', '{Orchid, Citrus, Green Notes}', '{Orchid, Hyacinth, Tuberose}', '{Sandalwood, Musk}', 'Orchideen im tropischen Paradies: blumig-grün, elegant, exotisch. Eine Reise.', 'olympic-orchids-cattleya'),
    ('Femme', 'prada', 'floral', 'Women', 132, 7, 6, 79, 'Sommer', 'Alltag', '{Lilac, Orange Blossom, Bergamot}', '{Jasmine, Tuberose, Lily}', '{Amber, Sandalwood, Musk}', 'Pure Weiblichkeit: blumig-frisch, elegant, minimal. Ein Sommerwunder.', 'prada-femme'),
    ('L''Eau D''Issey Pour Homme', 'issey-miyake', 'aqua', 'Men', 88, 5, 5, 76, 'Sommer', 'Alltag', '{Calone, Yuzu, Clary Sage}', '{Calone, Aquatic Notes}', '{Musk, Cedarwood}', 'Wasserspiegel im Morgenwind: frisch, sauber, zeitlos. Der Sommer-Klassiker.', 'issey-miyake-eau-dissey'),
    ('Mano', 'vilhelm-parfumerie', 'fruity', 'Unisex', 155, 7, 6, 81, 'Sommer', 'Alltag', '{Mango, Peach, Citrus}', '{Passion Fruit, Mango, Floral}', '{Tonka, Sandalwood, Musk}', 'Tropische Früchte im Sommer: süß, fruchtbar, vergnüglich. Ein Sonnenschein-Duft.', 'vilhelm-mano'),
    ('Original', 'eight-and-bob', 'citrus', 'Men', 145, 7, 6, 80, 'Sommer', 'Alltag', '{Bergamot, Lemon, Grapefruit}', '{Neroli, Orange Blossom, Petitgrain}', '{Vetiver, Cedarwood, Musk}', 'Reines Zitrus-Vergnügen: frisch, würzig, nostalgisch. Ein Sommer-Klassiker.', 'eight-and-bob-original'),
    ('Sunscreen', 'maison-margiela', 'aromatic', 'Unisex', 128, 5, 5, 77, 'Sommer', 'Alltag', '{Coconut, Ozonic Notes, Citrus}', '{Heliotrope, Floral}', '{Musk, Sandalwood}', 'Sommerurlaub im Flakon: kokosig, sonnig, erinnert an Strand. Unkonventionell.', 'maison-margiela-sunscreen'),
    ('Neroli Extrait', 'eight-and-bob', 'floral', 'Unisex', 168, 8, 7, 82, 'Sommer', 'Abend', '{Neroli, Orange Blossom, Bergamot}', '{Neroli, Jasmine, Orange Blossom}', '{Amber, Sandalwood}', 'Pure Neroliblüten-Kraft: Intensiv, blumig, elegant. Für Fans von Neroliöl.', 'eight-and-bob-neroli-extrait'),
    ('Malle', 'olympic-orchids', 'aqua', 'Unisex', 138, 6, 5, 78, 'Sommer', 'Alltag', '{Water Lily, Aquatic, Citrus}', '{Water Lily, Lotus, Floral}', '{Driftwood, Musk}', 'Seenlandschaft im Sommer: wassrig, blumig, erfrischend. Für Aqua-Fans.', 'olympic-orchids-malle'),
    ('Eaux de Gentian', 'loccitane', 'green', 'Unisex', 72, 5, 4, 75, 'Sommer', 'Alltag', '{Gentian, Herbs, Citrus}', '{Green Notes, Herbaceous}', '{Light Woods, Musk}', 'Kräutergarten im Sommer: frisch, grün, natürlich. Für Kräuter-Liebhaber.', 'loccitane-gentian'),
    ('Aqua Allegoria Mandarine Ambrée', 'guerlain', 'citrus', 'Unisex', 105, 5, 5, 76, 'Sommer', 'Alltag', '{Mandarin, Bergamot, Petitgrain}', '{Neroli, Amber}', '{Musks}', 'Sommerliche Mandarine mit Wärme: süß, leuchtend, bezahlbar. Moderner Klassiker.', 'guerlain-mandarine-ambree')
) AS t(perfume_name, brand_slug, fragrance_family, gender, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes, description, slug);

-- Grant read access for public viewing
GRANT SELECT ON perfumes TO anon, authenticated;
