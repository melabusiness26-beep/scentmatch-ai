-- 49_fix_delete_function.sql
--
-- FIX: delete_all_perfumes RLS issue
-- Recreate the function with proper SECURITY DEFINER setup
-- and add DELETE RLS policy

-- First, drop the old function if it exists
DROP FUNCTION IF EXISTS public.delete_all_perfumes() CASCADE;

-- Create the function again with SECURITY DEFINER
-- This makes it run with the creator's (postgres) privileges, bypassing RLS
CREATE OR REPLACE FUNCTION public.delete_all_perfumes()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO public
AS $$
DECLARE
  deleted_count INT;
BEGIN
  DELETE FROM public.perfumes;
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN 'Alle ' || deleted_count || ' Düfte wurden gelöscht!';
END;
$$;

-- Grant EXECUTE to authenticated users and service_role
GRANT EXECUTE ON FUNCTION public.delete_all_perfumes() TO authenticated;
GRANT EXECUTE ON FUNCTION public.delete_all_perfumes() TO service_role;
GRANT EXECUTE ON FUNCTION public.delete_all_perfumes() TO anon;

-- Also grant INSERT permissions to service_role (in case needed for rebuilding)
GRANT DELETE ON public.perfumes TO service_role;
GRANT DELETE ON public.perfumes TO authenticated;

-- Verify the function
SELECT routine_name, routine_type
FROM information_schema.routines
WHERE routine_name = 'delete_all_perfumes'
  AND routine_schema = 'public';
