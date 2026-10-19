-- Auressa: Erweitere subscribers Tabelle um Name und Interest für Personalisierung.
-- Im Supabase SQL Editor ausführen. Wiederholbar.

-- Füge Name-Feld hinzu (optional)
alter table public.subscribers
  add column if not exists name text;

-- Füge Interest-Feld hinzu (optional: women, men, unisex)
alter table public.subscribers
  add column if not exists interest text;
