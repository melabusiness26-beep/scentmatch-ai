-- Upgrade: Perfume Table für Profi/Scanner-Status
-- Neue Felder für vollständige, professionelle Duft-Daten

-- 1. Concentration (EDP, EDT, Extrait, Cologne)
ALTER TABLE public.perfumes
ADD COLUMN concentration TEXT DEFAULT 'EDP';

-- 2. Long Description (ausführliche, poetic deutsche Beschreibung)
ALTER TABLE public.perfumes
ADD COLUMN long_description TEXT;

-- 3. Bottle Description (Flakon-Beschreibung)
ALTER TABLE public.perfumes
ADD COLUMN bottle_description TEXT;

-- 4. Intensity (Leicht, Mittel, Intensiv)
ALTER TABLE public.perfumes
ADD COLUMN intensity TEXT DEFAULT 'Mittel';

-- 5. Scent DNA (ähnliche Düfte)
ALTER TABLE public.perfumes
ADD COLUMN scent_dna TEXT[];

-- 6. Rating (Auressa-Score oder Community-Rating)
ALTER TABLE public.perfumes
ADD COLUMN rating NUMERIC(3,1);

-- 7. Confidence Level (High/Medium/Low basierend auf Datenquellen)
ALTER TABLE public.perfumes
ADD COLUMN confidence_level TEXT DEFAULT 'low';

-- 8. Data Sources (JSON mit Quellenangaben)
ALTER TABLE public.perfumes
ADD COLUMN data_sources JSONB;

-- Kommentar für Dokumentation
COMMENT ON TABLE public.perfumes IS 'Auressa Perfume Catalog - Extended with Professional/Scanner fields (v2)';
COMMENT ON COLUMN public.perfumes.concentration IS 'Concentration: EDP (Eau de Parfum), EDT (Eau de Toilette), Extrait, Cologne, etc.';
COMMENT ON COLUMN public.perfumes.long_description IS 'Ausführliche, poetic deutsche Beschreibung (3-4 Sätze)';
COMMENT ON COLUMN public.perfumes.bottle_description IS 'Beschreibung des Flakons, Verpackung, Design';
COMMENT ON COLUMN public.perfumes.intensity IS 'Intensität: Leicht, Mittel, Intensiv';
COMMENT ON COLUMN public.perfumes.scent_dna IS 'Array ähnlicher Düfte: ["Duft 1", "Duft 2", "Duft 3"]';
COMMENT ON COLUMN public.perfumes.rating IS 'Overall Rating 0-10 (z.B. 7.2)';
COMMENT ON COLUMN public.perfumes.confidence_level IS 'Datenqualität: high (3+ Quellen), medium (2 Quellen), low (1 Quelle)';
COMMENT ON COLUMN public.perfumes.data_sources IS 'JSON: {"fragrantica": true, "parfumo": true, "douglas": true, ...}';
