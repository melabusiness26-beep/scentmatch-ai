-- Cleanup: Alle Duplikate entfernen, nur neueste Version behalten
-- Diese Datei löscht alle Perfumes, die durch Duplikat-Einträge entstanden sind
-- Strategie: Behalte die neueste ID (= zuletzt eingespielt), lösche die älteren

-- Zuerst: Analyse — wie viele Duplikate werden gelöscht?
-- SELECT
--   perfume_name,
--   COUNT(*) as anzahl,
--   MIN(id) as älteste_id,
--   MAX(id) as neueste_id
-- FROM public.perfumes
-- GROUP BY perfume_name, brand_id
-- HAVING COUNT(*) > 1
-- ORDER BY anzahl DESC;

-- DELETE: Alle Duplikate löschen (außer die neueste ID)
DELETE FROM public.perfumes
WHERE id IN (
  WITH numbered_perfumes AS (
    SELECT
      id,
      perfume_name,
      brand_id,
      ROW_NUMBER() OVER (PARTITION BY perfume_name, brand_id ORDER BY id DESC) as rn
    FROM public.perfumes
  )
  SELECT id FROM numbered_perfumes
  WHERE rn > 1
);

-- Verifikation: Alle verbleibenden Perfumes sollten eindeutig sein
-- SELECT
--   COUNT(*) as gesamt_perfumes,
--   COUNT(DISTINCT perfume_name || '_' || brand_id) as eindeutige_duplikate
-- FROM public.perfumes;
