-- 61_saved_at.sql
-- „Zuletzt gespeichert": Zeitpunkt der letzten Änderung pro Duft, damit der
-- Admin sieht, wann ein Duft angelegt bzw. zuletzt gespeichert wurde.
-- Wird von der Datenbank selbst gesetzt (Trigger) – niemand muss daran denken.
-- Nur für eingeloggte Admins lesbar; die öffentliche Seite braucht es nicht.

ALTER TABLE public.perfumes
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ;

-- Bestehende Düfte: Startwert = Erstellungszeitpunkt.
UPDATE public.perfumes SET updated_at = COALESCE(created_at, now()) WHERE updated_at IS NULL;

ALTER TABLE public.perfumes ALTER COLUMN updated_at SET DEFAULT now();

CREATE OR REPLACE FUNCTION public.set_perfume_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at := now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS perfumes_set_updated_at ON public.perfumes;
CREATE TRIGGER perfumes_set_updated_at
  BEFORE UPDATE ON public.perfumes
  FOR EACH ROW EXECUTE FUNCTION public.set_perfume_updated_at();

GRANT SELECT (updated_at) ON public.perfumes TO authenticated;

NOTIFY pgrst, 'reload schema';

-- Kontrolle: sollte "true" zeigen.
SELECT has_column_privilege('authenticated', 'public.perfumes', 'updated_at', 'SELECT') AS gespeichert_lesbar;
