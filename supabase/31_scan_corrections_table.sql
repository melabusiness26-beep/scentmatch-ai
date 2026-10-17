-- Create scan_corrections table for learning from user corrections
CREATE TABLE IF NOT EXISTS public.scan_corrections (
  id BIGSERIAL PRIMARY KEY,
  original_perfume_name TEXT NOT NULL,
  original_brand_name TEXT NOT NULL,
  corrected_perfume_name TEXT NOT NULL,
  corrected_brand_name TEXT NOT NULL,
  confidence_level TEXT CHECK (confidence_level IN ('high', 'medium', 'low')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  user_ip TEXT,
  notes TEXT
);

-- Enable RLS
ALTER TABLE public.scan_corrections ENABLE ROW LEVEL SECURITY;

-- Policy: Öffentliches Lesen für Statistiken
CREATE POLICY "scan_corrections_public_read" ON public.scan_corrections
  FOR SELECT TO public
  USING (true);

-- Policy: Nur angemeldete können schreiben
CREATE POLICY "scan_corrections_insert" ON public.scan_corrections
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- Grant permissions
GRANT SELECT ON public.scan_corrections TO anon, authenticated;
GRANT INSERT ON public.scan_corrections TO authenticated;

-- Create index für schnelle Abfragen
CREATE INDEX idx_scan_corrections_created_at ON public.scan_corrections(created_at DESC);
CREATE INDEX idx_scan_corrections_original ON public.scan_corrections(original_perfume_name, original_brand_name);
