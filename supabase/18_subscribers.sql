-- Auressa: Newsletter-Abonnenten.
-- Anonyme Besucher duerfen sich eintragen (nur INSERT), aber NICHT lesen (E-Mails privat).
-- Im Supabase SQL Editor ausfuehren. Wiederholbar.

create extension if not exists pgcrypto;

create table if not exists public.subscribers (
  id          uuid primary key default gen_random_uuid(),
  email       text not null,
  source      text,
  consent     boolean default true,
  created_at  timestamptz default now()
);

-- Verhindert doppelte Eintraege (Gross-/Kleinschreibung egal).
create unique index if not exists subscribers_email_unique on public.subscribers (lower(email));

-- Row Level Security: nur Eintragen erlaubt, kein oeffentliches Lesen.
alter table public.subscribers enable row level security;

drop policy if exists "Public can subscribe" on public.subscribers;
create policy "Public can subscribe" on public.subscribers
  for insert to anon, authenticated with check (true);

grant insert on public.subscribers to anon, authenticated;
