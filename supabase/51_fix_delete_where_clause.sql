-- 51_fix_delete_where_clause.sql
--
-- FIX: Add WHERE clause to DELETE statement in delete_all_perfumes function
-- PostgreSQL requires WHERE clause even for deleting all rows

DROP FUNCTION IF EXISTS public.delete_all_perfumes() CASCADE;

CREATE OR REPLACE FUNCTION public.delete_all_perfumes()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO public
AS $$
DECLARE
  deleted_count INT;
BEGIN
  DELETE FROM public.perfumes WHERE 1=1;
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN 'Alle ' || deleted_count || ' Düfte wurden gelöscht!';
END;
$$;

-- Grant EXECUTE to all roles
GRANT EXECUTE ON FUNCTION public.delete_all_perfumes() TO authenticated;
GRANT EXECUTE ON FUNCTION public.delete_all_perfumes() TO service_role;
GRANT EXECUTE ON FUNCTION public.delete_all_perfumes() TO anon;

-- Verify
SELECT routine_name, routine_type
FROM information_schema.routines
WHERE routine_name = 'delete_all_perfumes'
  AND routine_schema = 'public';
