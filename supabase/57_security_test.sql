-- 57_security_test.sql
--
-- ECHTER RECHTE-TEST nach 56_security_lockdown.sql.
--
-- Spielt drei Personen durch, so wie Supabase sie bei echten Anfragen sieht:
--   1. anonymer Besucher (anon)
--   2. normaler eingeloggter Nutzer OHNE Admin-Rolle (wie spätere Kundenkonten)
--   3. Admin (deine Rolle)
-- und versucht jeweils zu schreiben/löschen.
--
-- SICHERHEIT DES TESTS:
--   * Die Löschfunktionen delete_all_* werden NICHT aufgerufen, nur ihre
--     Rechte abgefragt.
--   * Der Admin-Test macht nur ein "UPDATE ohne Änderung" (Name = Name).
--   * Der ganze Test endet IMMER mit einer absichtlichen Fehlermeldung.
--     Dadurch macht Postgres ALLES im Test rückgängig – selbst wenn ein
--     Schreibversuch wider Erwarten durchkäme, bleibt die Datenbank unverändert.
--
-- So liest du das Ergebnis: Supabase zeigt eine rote Meldung
-- "TEST-ERGEBNIS …". Das ist gewollt. Erwartet:
--   anon:          alles "blockiert", Funktionen "nein"
--   normaler User: Funktionen "nein", löschen 0, ändern 0, anlegen "blockiert"
--   admin:         ändern = Anzahl aller Düfte (beweist: Admin-Pflege geht)

DO $$
DECLARE
  n_total        bigint;
  n              bigint;
  r_anon_fn      text;
  r_anon_del     text;
  r_anon_upd     text;
  r_anon_trunc   text;
  r_user_fn      text;
  r_user_del     text;
  r_user_upd     text;
  r_user_ins     text;
  r_admin_upd    text;
BEGIN
  SELECT count(*) INTO n_total FROM public.perfumes;

  -- Rechte auf die Löschfunktionen (ohne sie aufzurufen)
  r_anon_fn := CASE
    WHEN to_regprocedure('public.delete_all_perfumes()') IS NULL THEN 'nicht vorhanden'
    WHEN has_function_privilege('anon', 'public.delete_all_perfumes()', 'EXECUTE') THEN '⚠️ JA'
    ELSE 'nein' END;
  r_user_fn := CASE
    WHEN to_regprocedure('public.delete_all_perfumes()') IS NULL THEN 'nicht vorhanden'
    WHEN has_function_privilege('authenticated', 'public.delete_all_perfumes()', 'EXECUTE') THEN '⚠️ JA'
    ELSE 'nein' END;
  r_anon_trunc := CASE WHEN has_table_privilege('anon', 'public.perfumes', 'TRUNCATE') THEN '⚠️ JA' ELSE 'blockiert' END;

  -- 1) Anonymer Besucher
  PERFORM set_config('request.jwt.claims', '{"role":"anon"}', true);
  EXECUTE 'SET LOCAL ROLE anon';
  BEGIN
    DELETE FROM public.perfumes;
    GET DIAGNOSTICS n = ROW_COUNT;
    r_anon_del := CASE WHEN n = 0 THEN '0 Zeilen' ELSE '⚠️ ' || n || ' Zeilen' END;
  EXCEPTION WHEN insufficient_privilege THEN r_anon_del := 'blockiert';
  END;
  BEGIN
    UPDATE public.perfumes SET perfume_name = perfume_name;
    GET DIAGNOSTICS n = ROW_COUNT;
    r_anon_upd := CASE WHEN n = 0 THEN '0 Zeilen' ELSE '⚠️ ' || n || ' Zeilen' END;
  EXCEPTION WHEN insufficient_privilege THEN r_anon_upd := 'blockiert';
  END;
  EXECUTE 'RESET ROLE';

  -- 2) Normaler eingeloggter Nutzer ohne Admin-Rolle
  PERFORM set_config('request.jwt.claims',
    '{"role":"authenticated","sub":"00000000-0000-0000-0000-000000000000","app_metadata":{}}', true);
  EXECUTE 'SET LOCAL ROLE authenticated';
  BEGIN
    DELETE FROM public.perfumes;
    GET DIAGNOSTICS n = ROW_COUNT;
    r_user_del := CASE WHEN n = 0 THEN '0 Zeilen' ELSE '⚠️ ' || n || ' Zeilen' END;
  EXCEPTION WHEN insufficient_privilege THEN r_user_del := 'blockiert';
  END;
  BEGIN
    UPDATE public.perfumes SET perfume_name = perfume_name;
    GET DIAGNOSTICS n = ROW_COUNT;
    r_user_upd := CASE WHEN n = 0 THEN '0 Zeilen' ELSE '⚠️ ' || n || ' Zeilen' END;
  EXCEPTION WHEN insufficient_privilege THEN r_user_upd := 'blockiert';
  END;
  BEGIN
    INSERT INTO public.brands (name, slug) VALUES ('__sicherheitstest__', '__sicherheitstest__');
    r_user_ins := '⚠️ MÖGLICH';
  EXCEPTION
    WHEN insufficient_privilege THEN r_user_ins := 'blockiert';
    WHEN others THEN r_user_ins := 'anderer Fehler: ' || SQLERRM;
  END;
  EXECUTE 'RESET ROLE';

  -- 3) Admin (Rolle in app_metadata) – nur UPDATE ohne Änderung
  PERFORM set_config('request.jwt.claims',
    '{"role":"authenticated","sub":"00000000-0000-0000-0000-000000000000","app_metadata":{"role":"admin"}}', true);
  EXECUTE 'SET LOCAL ROLE authenticated';
  BEGIN
    UPDATE public.perfumes SET perfume_name = perfume_name;
    GET DIAGNOSTICS n = ROW_COUNT;
    r_admin_upd := n || ' von ' || n_total || CASE WHEN n = n_total THEN ' ✅' ELSE ' ⚠️' END;
  EXCEPTION WHEN insufficient_privilege THEN r_admin_upd := '⚠️ blockiert (Admin kann nicht pflegen)';
  END;
  EXECUTE 'RESET ROLE';

  -- Absichtlicher Abbruch → alles oben wird rückgängig gemacht.
  RAISE EXCEPTION E'TEST-ERGEBNIS (absichtlich als Fehler, damit nichts gespeichert wird)\n'
    '[anon] Löschfunktion: %, löschen: %, ändern: %, TRUNCATE: %\n'
    '[normaler User] Löschfunktion: %, löschen: %, ändern: %, Marke anlegen: %\n'
    '[admin] ändern: %',
    r_anon_fn, r_anon_del, r_anon_upd, r_anon_trunc,
    r_user_fn, r_user_del, r_user_upd, r_user_ins,
    r_admin_upd;
END $$;
