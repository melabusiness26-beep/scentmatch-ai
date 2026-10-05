-- Zählt die Häufigkeit jeder Note im kompletten Katalog
-- Wird benötigt um noteRarityWeight() korrekt zu berechnen

WITH all_notes AS (
  SELECT unnest(top_notes) as note FROM perfumes WHERE top_notes IS NOT NULL
  UNION ALL
  SELECT unnest(heart_notes) as note FROM perfumes WHERE heart_notes IS NOT NULL
  UNION ALL
  SELECT unnest(base_notes) as note FROM perfumes WHERE base_notes IS NOT NULL
)
SELECT
  LOWER(REPLACE(note, 'ß', 'ss')) as normalized_note,
  note as original_note,
  COUNT(*) as frequency
FROM all_notes
GROUP BY normalized_note, original_note
ORDER BY frequency DESC;
