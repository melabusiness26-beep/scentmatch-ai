-- Budget & Affordable Collection 2026
-- 15 hochwertige Düfte im günstigen bis moderaten Preissegment

-- Ensure required brands exist
INSERT INTO brands (name, slug, country) VALUES
('Armaf', 'armaf', 'United Arab Emirates'),
('Lattafa', 'lattafa', 'United Arab Emirates'),
('Dior', 'dior', 'France'),
('Givenchy', 'givenchy', 'France'),
('Dolce Gabbana', 'dolce-gabbana', 'Italy'),
('Polo Ralph Lauren', 'polo-ralph-lauren', 'USA'),
('Calvin Klein', 'calvin-klein', 'USA'),
('Lacoste', 'lacoste', 'France'),
('Nautica', 'nautica', 'USA'),
('Mont Blanc', 'mont-blanc', 'Germany'),
('Dunhill', 'dunhill', 'UK'),
('Jean Paul Gaultier', 'jean-paul-gaultier', 'France'),
('Paco Rabanne', 'paco-rabanne', 'Spain')
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
    ('Club de Nuit Intense', 'armaf', 'woody', 'Men', 48, 8, 8, 78, 'Ganzjährig', 'Abend', '{Cardamom, Pepper, Cinnamon}', '{Ambroxan, Cedarwood, Agarwood}', '{Sandalwood, Musk, Tobacco}', 'Günstige Alternative zu Creed Royal Oud: dunkel, intensiv, haltbar. Ein Schnäppchen.', 'armaf-club-intense'),
    ('Opulent Musk', 'lattafa', 'gourmand', 'Women', 42, 7, 7, 76, 'Ganzjährig', 'Alltag', '{Vanilla, Amber, Musk}', '{Tonka, Amber, Musk}', '{Sandalwood, Musk, Woody}', 'Süße Sinnlichkeit zu Budget-Preis: cremig, warm, verführerisch. Sehr haltbar.', 'lattafa-opulent-musk'),
    ('J''adore', 'dior', 'floral', 'Women', 95, 7, 6, 80, 'Ganzjährig', 'Alltag', '{Bergamot, Orange, Lemon}', '{Tuberose, Rose, Jasmine}', '{Amber, Sandalwood, Musk}', 'Ikonischer Klassiker: elegante Blüten, zeitlos, zuverlässig. Jederzeit gut.', 'dior-jadore'),
    ('Allure', 'dior', 'floral', 'Women', 92, 6, 6, 79, 'Ganzjährig', 'Alltag', '{Mandarin, Bergamot, Lemon}', '{Peony, Rose, Iris}', '{Sandalwood, Amber, Musk}', 'Raffinierte Verführung: blumig, elegant, mysteriös. Ein Klassiker zu fairem Preis.', 'dior-allure'),
    ('Sauvage', 'dior', 'clean', 'Men', 98, 8, 7, 81, 'Ganzjährig', 'Alltag', '{Ambroxan, Spicy Notes}', '{Ambroxy, Woody}', '{Ambroxan, Sandalwood}', 'Der beliebteste Herrenduft: frisch, würzig, massenhaft getragen. Für jeden Tag.', 'dior-sauvage'),
    ('Givenchy Gentleman Reserve', 'givenchy', 'woody', 'Men', 85, 7, 6, 78, 'Ganzjährig', 'Alltag', '{Cinnamon, Ginger, Cardamom}', '{Amber, Iris, Woody}', '{Sandalwood, Cedarwood, Musk}', 'Eleganter Gentleman: würzig, warm, zuverlässig. Ein solider Alltags-Duft.', 'givenchy-gentleman-reserve'),
    ('Light Blue Eau Intense', 'dolce-gabbana', 'citrus', 'Women', 78, 6, 5, 77, 'Sommer', 'Alltag', '{Lemon, Orange, Citrus}', '{Tuberose, Neroli, Green Notes}', '{Musk, Woody Notes}', 'Sommerliches Inselgefühl: frisch, leuchtend, bezahlbar. Perfekt für heiße Tage.', 'dolce-gabbana-light-blue'),
    ('Polo Blue', 'polo-ralph-lauren', 'aqua', 'Men', 68, 6, 5, 76, 'Sommer', 'Alltag', '{Grapefruit, Yuzu, Amalfi Lemon}', '{Aquatic, Sage, Mimosa}', '{Driftwood, Ambroxan, Musk}', 'Aquatisch und preiswert: frisch, marinig, erfrischend. Ein Sommer-Klassiker.', 'polo-ralph-lauren-blue'),
    ('CK One', 'calvin-klein', 'unisex', 'Unisex', 55, 5, 4, 74, 'Ganzjährig', 'Alltag', '{Bergamot, Lemon, Cardamom}', '{Galbanum, Jasmine, Lily}', '{Musk, Cedar, Sandalwood}', 'Ikonisches Unisex-Aroma: frisch, androgyn, zeitlos. Ein 90er-Klassiker.', 'calvin-klein-ck-one'),
    ('Lacoste L.12.12', 'lacoste', 'aromatic', 'Men', 62, 6, 5, 75, 'Ganzjährig', 'Alltag', '{Bergamot, Grapefruit, Clary Sage}', '{Aromatic, Spicy Notes}', '{Sandalwood, Cedarwood, Musk}', 'Sportlich und dezent: frisch, würzig, verlässlich. Für aktive Männer.', 'lacoste-l1212'),
    ('Nautica Voyage', 'nautica', 'aqua', 'Men', 45, 5, 4, 72, 'Sommer', 'Alltag', '{Grapefruit, Bergamot, Citrus}', '{Aquatic, Marine Notes, Sage}', '{Musk, Cedarwood}', 'Maritimes Abenteuer: frisch, aquatisch, bezahlbar. Perfekt für den Strand.', 'nautica-voyage'),
    ('Legend', 'mont-blanc', 'woody', 'Men', 75, 7, 6, 77, 'Ganzjährig', 'Alltag', '{Ginger, Cinnamon, Cardamom}', '{Cedar, Amber, Woody}', '{Sandalwood, Vanilla, Musk}', 'Klassischer Herrenduft: würzig, warm, leger. Ein zuverlässiger Begleiter.', 'mont-blanc-legend'),
    ('Icon Racing', 'dunhill', 'woody', 'Men', 82, 7, 6, 78, 'Ganzjährig', 'Alltag', '{Pepper, Cinnamon, Ginger}', '{Opoponax, Tobacco, Leather}', '{Sandalwood, Cedarwood, Musk}', 'Rennwagen-Vibes: würzig, maskulin, sportlich. Für Abenteuer-Liebhaber.', 'dunhill-icon-racing'),
    ('La Belle', 'jean-paul-gaultier', 'floral', 'Women', 88, 7, 6, 79, 'Ganzjährig', 'Abend', '{Pear, Bergamot, Lemon}', '{Tuberose, Peony, Orange Blossom}', '{Amber, Sandalwood, Musk}', 'Die schöne Femme: elegant, blumig, zeitlos. Zu fairem Preis zugänglich.', 'jean-paul-gaultier-bella'),
    ('1 Million Eau de Toilette', 'paco-rabanne', 'gourmand', 'Men', 72, 6, 5, 76, 'Ganzjährig', 'Alltag', '{Cardamom, Cinnamon, Ginger}', '{Amber, Vanilla, Tonka}', '{Sandalwood, Cedarwood, Musk}', 'Million-Dollar-Süße: warm, würzig, gönnerhaft. Für selbstbewusste Träger.', 'paco-rabanne-million')
) AS t(perfume_name, brand_slug, fragrance_family, gender, price_chf, longevity, sillage, scentmatch_score, season, occasion, top_notes, heart_notes, base_notes, description, slug);

-- Grant read access for public viewing
GRANT SELECT ON perfumes TO anon, authenticated;
