-- 67_zeilenumbrueche.sql
-- Beim Kopieren von SQL 66 unter Windows wurden die Zeilenumbrüche zu „\r\n“.
-- Das vereinheitlicht sie wieder (ändert nur unsichtbare Zeichen, keinen Text).

UPDATE public.perfumes
SET description = replace(description, E'\r\n', E'\n')
WHERE description LIKE E'%\r%';

UPDATE public.perfumes
SET flacon_description = replace(flacon_description, E'\r\n', E'\n')
WHERE flacon_description LIKE E'%\r%';

-- Kontrolle: sollte 0 zeigen.
SELECT count(*) AS noch_mit_windows_umbruch
FROM public.perfumes
WHERE description LIKE E'%\r%' OR flacon_description LIKE E'%\r%';
