-- Auressa: Add email confirmation fields für Double-Opt-In
-- Im Supabase SQL Editor ausführen. Wiederholbar.

alter table public.subscribers
  add column if not exists confirmed boolean default false;

alter table public.subscribers
  add column if not exists confirmed_at timestamp with time zone;
