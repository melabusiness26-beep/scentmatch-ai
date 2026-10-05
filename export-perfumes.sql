-- SELECT-Abfrage für Test der Ähnlichkeits-Logik
-- Nur die Spalten, die computeSimilarity() und findCheaperAlternativesV2() wirklich brauchen

SELECT
  -- Identifikation
  id,                      -- lib/similarity.ts:188, :256 (Filter p.id !== target.id)
  perfume_name,            -- Für Debugging + Anzeige
  slug,                    -- lib/similarity.ts:256 (indirekt über Perfume-Typ)

  -- Noten (Kern der Ähnlichkeits-Berechnung)
  top_notes,               -- lib/similarity.ts:215-216 (consolidateNotes(anchor.top_notes), consolidateNotes(target.top_notes))
  heart_notes,             -- lib/similarity.ts:216-217, 220-221 (consolidateNotes())
  base_notes,              -- lib/similarity.ts:217-218, 221-222 (consolidateNotes())

  -- Duftfamilie
  fragrance_family,        -- lib/similarity.ts:260-261 (Bonus +5 wenn gleich)

  -- Preis (für findCheaperAlternativesV2)
  price_chf,               -- lib/similarity.ts:335 (targetPrice = target.price_chf), :342 (price_chf <= targetPrice * 0.7)

  -- Marke (für Anzeige)
  brand_id                 -- Für Foreign Key / JOIN mit brands-Tabelle (optional)

FROM perfumes
ORDER BY slug
LIMIT 2000;
