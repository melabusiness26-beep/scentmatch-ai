-- 48_service_role_delete_permissions.sql
--
-- Grant DELETE permission to service_role for perfumes and brands tables
-- Required for admin API endpoints that need to delete data

-- Grant DELETE to service_role on perfumes
GRANT DELETE ON public.perfumes TO service_role;

-- Grant DELETE to service_role on brands (in case needed)
GRANT DELETE ON public.brands TO service_role;

-- Verify grants
SELECT grantee, privilege_type, table_name
FROM information_schema.role_table_grants
WHERE table_name IN ('perfumes', 'brands')
  AND grantee = 'service_role'
ORDER BY table_name, privilege_type;
