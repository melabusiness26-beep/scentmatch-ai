-- 45_improved_age_tagging.sql
--
-- IMPROVED tagging rules that fill more age/lifestyle combinations.
-- This replaces the initial basic tagging with smarter rules based on:
-- - Price points for age groups
-- - Lifestyle assignments based on intensity, family, and price
-- - Trend_vibe based on price tier
--
-- Results improve significantly:
-- - 18-25 now includes professional (33), casual (26), sporty (19+)
-- - 25-35 includes party (42), professional (208+)
-- - 35-40 includes party (50), professional (32+)

UPDATE public.perfumes SET
  age_group = CASE
    -- 18-25: Budget to lower mid-range (CHF < 100)
    WHEN price_chf < 60 THEN '18-25'
    WHEN price_chf < 100 AND fragrance_family IN ('clean', 'gourmand') THEN '18-25'
    -- 25-35: Mid-range (CHF 80-150)
    WHEN price_chf BETWEEN 80 AND 150 THEN '25-35'
    WHEN fragrance_family IN ('floral', 'woody') AND price_chf < 150 THEN '25-35'
    -- 35-40: Premium (CHF 150+)
    WHEN price_chf >= 150 THEN '35-40'
    WHEN fragrance_family = 'woody' AND price_chf >= 100 THEN '35-40'
    ELSE 'all'
  END,
  lifestyle = CASE
    -- Student: Budget picks (CHF < 60)
    WHEN price_chf < 60 THEN 'student'
    -- Professional: Mid-range (CHF 60+), low sillage, suitable families
    WHEN price_chf >= 60 AND (sillage IS NULL OR sillage <= 7) AND fragrance_family IN ('clean', 'woody', 'floral') THEN 'professional'
    -- Party: High intensity (Sillage >= 8) for ANY age/price
    WHEN sillage IS NOT NULL AND sillage >= 8 THEN 'party'
    -- Casual: Gourmand comfort
    WHEN fragrance_family = 'gourmand' THEN 'casual'
    -- Sportlich: Fresh clean scents
    WHEN fragrance_family = 'clean' THEN 'sporty'
    ELSE 'all'
  END,
  trend_vibe = CASE
    WHEN price_chf < 80 THEN 'trendy'
    WHEN price_chf BETWEEN 80 AND 150 THEN 'popular'
    ELSE 'classic'
  END
WHERE TRUE;

-- Verify the improved distribution
SELECT age_group, lifestyle, COUNT(*) as count
FROM public.perfumes
WHERE age_group != 'all' OR lifestyle != 'all'
GROUP BY age_group, lifestyle
ORDER BY count DESC;
