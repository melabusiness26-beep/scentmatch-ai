-- Auressa: Das Build-Skript darf Preise bestehender Düfte aktualisieren.
-- Im Supabase SQL Editor ausführen. Wiederholbar.
--
-- Bisher (SQL 63) durfte der Server-Schlüssel nur LESEN und HINZUFÜGEN. Darum kamen
-- geänderte Preise, Grössen und Shop-Links aus den Katalog-Dateien nie in die Datenbank
-- (z. B. fehlte der „Bei Notino ansehen“-Knopf). Erlaubt wird bewusst NUR das Ändern der
-- drei Preis-Spalten – nichts anderes, kein Löschen.

GRANT UPDATE (price_chf, volume_ml, sizes) ON public.perfumes TO service_role;

-- Einmalige Korrektur: Boss Bottled Beyond for Her passt laut Parfumo-Diagramm im Frühling
-- (36 %) UND Herbst (31 %), für Alltag und Büro (Daily/Leisure 23 %, Business 20 %).
UPDATE public.perfumes
SET season = 'Frühling, Herbst', occasion = 'Alltag, Büro'
WHERE slug = 'boss-bottled-beyond-for-her';

NOTIFY pgrst, 'reload schema';

-- Kontrolle: sollte „true“ und die neue Saison zeigen.
SELECT
  has_column_privilege('service_role', 'public.perfumes', 'sizes', 'UPDATE') AS preise_aendern_erlaubt,
  (SELECT season || ' · ' || occasion FROM public.perfumes WHERE slug = 'boss-bottled-beyond-for-her') AS bottled_beyond;
