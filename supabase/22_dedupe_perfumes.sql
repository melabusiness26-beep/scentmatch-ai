-- Auressa: Charge 22 – Duplikate bereinigen.
-- Grund: Einige bekannte Bestseller waren bereits direkt in der DB vorhanden
-- (frueherer Direkt-Import im SQL-Editor, NICHT in den Code-SQL-Dateien).
-- Die Duplikat-Pruefung der Chargen 19-21 konnte nur die Code-Dateien sehen,
-- daher sind ein paar Doppel-Eintraege entstanden (z. B. "La Vie Est Belle").
--
-- Dieses Skript loescht je Marke + identischem Namen den NEUEREN Doppel-Eintrag
-- und behaelt den AELTESTEN (das Original, das auch in Ratgebern verlinkt ist).
-- Es vergleicht Gross-/Kleinschreibung und Leerzeichen unabhaengig.
-- Ungefaehrlich & wiederholbar. Im Supabase SQL Editor ausfuehren.

-- Optional vorher pruefen, welche Doppelten existieren:
--   select brand_id, lower(btrim(perfume_name)) as name, count(*)
--   from public.perfumes
--   group by 1, 2 having count(*) > 1;

delete from public.perfumes p
using public.perfumes q
where p.brand_id = q.brand_id
  and lower(btrim(p.perfume_name)) = lower(btrim(q.perfume_name))
  and (
    p.created_at > q.created_at
    or (p.created_at = q.created_at and p.id > q.id)
  );
