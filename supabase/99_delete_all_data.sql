-- 99_delete_all_data.sql
--
-- NUCLEAR OPTION: Delete ALL data from database
-- Keeps table structure, deletes all rows
-- Use ONLY when complete reset is needed!

-- Delete all data (respecting foreign keys)
DELETE FROM public.recommendations;
DELETE FROM public.layering_recipes;
DELETE FROM public.affiliate_links;
DELETE FROM public.quiz_answers;
DELETE FROM public.quiz_questions;
DELETE FROM public.scent_profiles;
DELETE FROM public.perfume_notes;
DELETE FROM public.fragrance_notes;
DELETE FROM public.perfumes;
DELETE FROM public.brands;

-- Verify all tables are empty
SELECT
  'brands' as table_name, COUNT(*) as row_count FROM public.brands
UNION ALL
SELECT 'perfumes', COUNT(*) FROM public.perfumes
UNION ALL
SELECT 'fragrance_notes', COUNT(*) FROM public.fragrance_notes
UNION ALL
SELECT 'perfume_notes', COUNT(*) FROM public.perfume_notes
UNION ALL
SELECT 'scent_profiles', COUNT(*) FROM public.scent_profiles
UNION ALL
SELECT 'quiz_questions', COUNT(*) FROM public.quiz_questions
UNION ALL
SELECT 'quiz_answers', COUNT(*) FROM public.quiz_answers
UNION ALL
SELECT 'affiliate_links', COUNT(*) FROM public.affiliate_links
UNION ALL
SELECT 'layering_recipes', COUNT(*) FROM public.layering_recipes
UNION ALL
SELECT 'recommendations', COUNT(*) FROM public.recommendations
ORDER BY table_name;
