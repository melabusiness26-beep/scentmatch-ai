-- 52_delete_all_brands_function.sql
--
-- Create delete_all_brands function (SECURITY DEFINER)
-- Deletes all brands from the database

DROP FUNCTION IF EXISTS public.delete_all_brands() CASCADE;

CREATE OR REPLACE FUNCTION public.delete_all_brands()
RETURNS TEXT
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO public
AS $$
DECLARE
  deleted_count INT;
BEGIN
  DELETE FROM public.brands WHERE 1=1;
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN 'Alle ' || deleted_count || ' Marken wurden gelöscht!';
END;
$$;

-- Grant EXECUTE to all roles
GRANT EXECUTE ON FUNCTION public.delete_all_brands() TO authenticated;
GRANT EXECUTE ON FUNCTION public.delete_all_brands() TO service_role;
GRANT EXECUTE ON FUNCTION public.delete_all_brands() TO anon;

-- Also ensure DELETE permission on brands table
GRANT DELETE ON public.brands TO service_role;
GRANT DELETE ON public.brands TO authenticated;

-- Add DELETE RLS policy if not exists
ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admin_delete_brands"
ON public.brands
FOR DELETE
USING (true);

-- Verify
SELECT routine_name, routine_type
FROM information_schema.routines
WHERE routine_name = 'delete_all_brands'
  AND routine_schema = 'public';
