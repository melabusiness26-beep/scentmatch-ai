-- Auressa: Charge 23 – Duplikate gründlich bereinigen (Düfte UND Marken).
--
-- Warum nochmal? Charge 22 hat nur Doppel-Düfte mit IDENTISCHER brand_id
-- entfernt. Es blieben aber Duplikate übrig, weil teils dieselbe MARKE doppelt
-- angelegt wurde (z. B. zwei "brands"-Zeilen "Dior"). Dann haben zwei Einträge
-- desselben Dufts UNTERSCHIEDLICHE brand_id und wurden von 22 nicht erkannt.
--
-- Dieses Skript geht in drei Schritten vor und ist ungefährlich & wiederholbar:
--   Schritt 1: doppelte Düfte je Marke (wie 22, als Absicherung).
--   Schritt 2: doppelte Marken zusammenführen (Düfte auf die älteste Marke
--              umhängen, dann die neueren Marken-Doubletten löschen).
--   Schritt 3: erneut doppelte Düfte je (jetzt zusammengeführter) Marke löschen.
-- Vergleich jeweils unabhängig von Gross-/Kleinschreibung und Leerzeichen.
-- Im Supabase SQL Editor ausführen.

-- Optional vorher prüfen, welche Doppel-Marken existieren:
--   select lower(btrim(name)) as name, count(*)
--   from public.brands group by 1 having count(*) > 1;

-- Schritt 1: doppelte Düfte innerhalb derselben Marke (älteste behalten).
delete from public.perfumes p
using public.perfumes q
where p.brand_id = q.brand_id
  and lower(btrim(p.perfume_name)) = lower(btrim(q.perfume_name))
  and (
    p.created_at > q.created_at
    or (p.created_at = q.created_at and p.id > q.id)
  );

-- Schritt 2a: Düfte von doppelten Marken auf die jeweils ÄLTESTE Marke umhängen.
with brand_dupes as (
  select
    b.id as dup_id,
    first_value(b.id) over (
      partition by lower(btrim(b.name))
      order by b.created_at, b.id
    ) as keep_id
  from public.brands b
)
update public.perfumes p
set brand_id = d.keep_id
from brand_dupes d
where p.brand_id = d.dup_id
  and d.dup_id <> d.keep_id;

-- Schritt 2b: die nun verwaisten Marken-Doubletten löschen (älteste je Name bleibt).
delete from public.brands b
using public.brands keep
where lower(btrim(b.name)) = lower(btrim(keep.name))
  and (
    b.created_at > keep.created_at
    or (b.created_at = keep.created_at and b.id > keep.id)
  );

-- Schritt 3: nach dem Zusammenführen erneut doppelte Düfte je Marke entfernen.
delete from public.perfumes p
using public.perfumes q
where p.brand_id = q.brand_id
  and lower(btrim(p.perfume_name)) = lower(btrim(q.perfume_name))
  and (
    p.created_at > q.created_at
    or (p.created_at = q.created_at and p.id > q.id)
  );
