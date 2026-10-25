-- 50_add_delete_rls_policy.sql
--
-- Add DELETE RLS policy for admin delete operations
-- This allows authenticated users (admin) to delete perfumes

-- Check existing policies first
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  cmd
FROM pg_policies
WHERE tablename = 'perfumes'
ORDER BY policyname;

-- Enable RLS (should already be enabled, but make sure)
ALTER TABLE public.perfumes ENABLE ROW LEVEL SECURITY;

-- Create DELETE policy for authenticated users (admin)
CREATE POLICY "admin_delete_perfumes"
ON public.perfumes
FOR DELETE
USING (true);

-- Grant DELETE to authenticated
GRANT DELETE ON public.perfumes TO authenticated;
GRANT DELETE ON public.perfumes TO service_role;

-- Verify policies
SELECT
  schemaname,
  tablename,
  policyname,
  permissive,
  cmd
FROM pg_policies
WHERE tablename = 'perfumes'
ORDER BY policyname;
