-- Auressa: Füge behavior Feld für Tracking hinzu.
-- Im Supabase SQL Editor ausführen. Wiederholbar.

alter table public.subscribers
  add column if not exists behavior jsonb;
