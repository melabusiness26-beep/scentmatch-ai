-- Premium Autumn/Winter 2026 Collection
-- 15 new curated fragrances for the Swiss market

-- Ensure required brands exist
INSERT INTO brands (name, slug, country) VALUES
('L'Artisan Parfumeur', 'lartisan-parfumeur', 'France'),
('Prada', 'prada', 'Italy'),
('Tom Ford', 'tom-ford', 'USA'),
('Xerjoff', 'xerjoff', 'Italy'),
('Heeley', 'heeley', 'UK'),
('Diptyque', 'diptyque', 'France'),
('Penhaligon''s', 'penhaligons', 'UK'),
('Givenchy', 'givenchy', 'France'),
('Hermès', 'hermes', 'France'),
('Amouage', 'amouage', 'Oman')
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
    ('Timbuktu', 'lartisan-parfumeur', 'woody', 'Unisex', 145, 8, 8, 82, 'Herbst/Winter', 'Abend', '{Cinnamon, Cardamom, Incense}', '{Sandalwood, Cedar, Amber}', '{Leather, Oakmoss, Musk}', 'Eine meditative Reise in die Wüste: würzig, erdig, geheimnisvoll. Perfekt für ruhige Abende.', 'lartisan-timbuktu'),
    ('La Femme', 'prada', 'floral', 'Women', 135, 8, 7, 81, 'Ganzjährig', 'Date', '{Bergamot, Neroli}', '{Gardenia, Osmanthus, Peony}', '{Amber, Sandalwood, Musk}', 'Eleganz in Blütenform: klassisch-femininer Duft mit modernen Akzenten. Ein Signature-Moment.', 'prada-la-femme'),
    ('Noir Extreme', 'tom-ford', 'woody', 'Men', 165, 9, 8, 84, 'Herbst/Winter', 'Abend', '{Oud, Leather, Spices}', '{Incense, Agarwood, Amber}', '{Musk, Sandalwood, Tobacco}', 'Intensive Männlichkeit: dunkel, würzig, unverwechselbar. Für selbstbewusste Momente.', 'tom-ford-noir-extreme'),
    ('Opera', 'xerjoff', 'floral', 'Women', 155, 9, 7, 83, 'Ganzjährig', 'Abend', '{Ginger, Cardamom, Bergamot}', '{Tuberose, Orange Blossom}', '{Amber, Oakmoss, Patchouli}', 'Ein dramatisches Abenteuer für mutige Frauen: blumig, würzig, unvergesslich.', 'xerjoff-opera'),
    ('Accord Végétal', 'heeley', 'clean', 'Unisex', 128, 7, 7, 79, 'Frühling', 'Büro', '{Green Notes, Cucumber, Bergamot}', '{Grass, Leaves, White Tea}', '{Musk, Cedar, Soft Woods}', 'Frische wie ein Morgenwald: grün, natürlich, beruhigend. Für klare Gedanken.', 'heeley-accord-vegetal'),
    ('Baies', 'diptyque', 'gourmand', 'Unisex', 135, 7, 6, 80, 'Herbst/Winter', 'Alltag', '{Raspberry, Blackcurrant, Citrus}', '{Peony, Rose, Freesia}', '{Musk, Cedar, Sandalwood}', 'Beerentraum: süßlich-fruchtiges Vergnügen mit subtiler Eleganz. Alltags-Klassiker.', 'diptyque-baies'),
    ('Elisir', 'penhaligons', 'woody', 'Unisex', 142, 8, 7, 81, 'Ganzjährig', 'Abend', '{Ginger, Cinnamon, Nutmeg}', '{Sandalwood, Incense, Amber}', '{Leather, Musk, Tobacco}', 'Ein Elixir der Macht: würzig, aromatisch, zeitlos elegant für alle.', 'penhaligons-elisir'),
    ('L''Homme Intense', 'givenchy', 'woody', 'Men', 95, 7, 7, 78, 'Ganzjährig', 'Alltag', '{Ginger, Cinnamon}', '{Amber, Iris, Vetiver}', '{Musk, Cedar, Sandalwood}', 'Subtile Intensität: würzig-warm für den modernen Mann. Tragbar bei Tag und Nacht.', 'givenchy-lhomme-intense'),
    ('Eau de Gentiane Blanche', 'hermes', 'floral', 'Women', 148, 7, 6, 80, 'Frühling', 'Büro', '{Bergamot, Lemon, Neroli}', '{Gentian, White Flowers}', '{White Musk, Cedar, Oakmoss}', 'Zarte Eleganz: helle Blüten in mineralischer Klarheit. Für feine Momente.', 'hermes-eau-gentiane'),
    ('Dia Man', 'amouage', 'woody', 'Men', 175, 9, 8, 85, 'Herbst/Winter', 'Abend', '{Black Pepper, Cardamom, Incense}', '{Oud, Amber, Sandalwood}', '{Leather, Musk, Oakmoss}', 'Königliche Würde: Oud-dominiert, exklusiv, zeitlos. Ein orientalisches Meisterwerk.', 'amouage-dia-man'),
    ('Nuit Noire', 'lartisan-parfumeur', 'gourmand', 'Women', 138, 8, 7, 81, 'Herbst/Winter', 'Abend', '{Rum, Vanilla, Cocoa}', '{Amber, Tonka, Patchouli}', '{Musk, Sandalwood, Vetiver}', 'Dunkle Versuchung: süß, warm, verführerisch. Für leidenschaftliche Nächte.', 'lartisan-nuit-noire'),
    ('Luna Rossa', 'prada', 'woody', 'Men', 125, 7, 7, 79, 'Ganzjährig', 'Alltag', '{Citrus, Pepper, Cardamom}', '{Ambroxan, Cedarwood, Vetiver}', '{Musk, Ambroxan, Vanilla}', 'Moderne Leuchte: frisch-würzig mit warmer Basis. Vielseitig und elegant.', 'prada-luna-rossa'),
    ('Tobacco Vanille', 'tom-ford', 'woody', 'Unisex', 155, 9, 8, 84, 'Herbst/Winter', 'Abend', '{Tobacco Leaf, Spices}', '{Vanilla, Tonka, Amber}', '{Sandalwood, Vetiver, Musk}', 'Klassiker: Tabak trifft Vanille in süß-würziger Balance. Für Liebhaber richer Düfte.', 'tom-ford-tobacco-vanille'),
    ('Nuit Nuit', 'heeley', 'woody', 'Unisex', 132, 8, 7, 80, 'Herbst/Winter', 'Abend', '{Incense, Cade Oil, Cardamom}', '{Leather, Opoponax, Amber}', '{Sandalwood, Vetiver, Musk}', 'Nächtlicher Wald: dunkel, räuchrig, meditativ. Für nachdenkliche Momente.', 'heeley-nuit-nuit'),
    ('Rose Absolute', 'diptyque', 'floral', 'Women', 140, 7, 6, 80, 'Ganzjährig', 'Alltag', '{Rose, Bergamot, Peach}', '{Rose, Geranium, Lily}', '{Sandalwood, Musk, Woody}', 'Reine Rosenpoesie: kraftvoll, elegant, zeitlos. Ein Klassiker für Rosen-Liebhaberinnen.', 'diptyque-rose-absolute')
) AS t(perfume_name, brand_slug, fragrance_family, gender, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes, description, slug);

-- Grant read access for public viewing
GRANT SELECT ON perfumes TO anon, authenticated;
