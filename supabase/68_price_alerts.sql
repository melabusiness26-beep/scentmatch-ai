-- Auressa: Preis-Alarm („Sag mir Bescheid, wenn der Duft günstiger wird“).
-- Im Supabase SQL Editor ausführen. Wiederholbar.
--
-- Datenschutz: Die Tabelle ist für Besucher komplett gesperrt (kein Lesen, kein Schreiben).
-- Eintragen, Bestätigen, Abmelden und Versand laufen nur über die Website-Server mit dem
-- Server-Schlüssel (SUPABASE_SERVICE_ROLE_KEY) – E-Mail-Adressen sind nie öffentlich.

create extension if not exists pgcrypto;

create table if not exists public.price_alerts (
  id               uuid primary key default gen_random_uuid(),
  email            text not null,
  perfume_slug     text not null,
  -- Preis und Grösse beim Eintragen (Vergleichsbasis)
  base_price       numeric not null,
  base_ml          numeric,
  confirmed        boolean not null default false,
  confirmed_at     timestamptz,
  unsubscribed     boolean not null default false,
  unsubscribed_at  timestamptz,
  -- Zuletzt gemeldeter Preis: Benachrichtigt wird nur, wenn er noch tiefer fällt.
  notified_price   numeric,
  last_notified_at timestamptz,
  created_at       timestamptz not null default now()
);

-- Pro E-Mail und Duft nur ein Alarm (Gross-/Kleinschreibung egal).
create unique index if not exists price_alerts_email_slug_unique
  on public.price_alerts (lower(email), perfume_slug);
create index if not exists price_alerts_slug_idx on public.price_alerts (perfume_slug);

alter table public.price_alerts enable row level security;

-- Keine Policies für anon/authenticated = kein Zugriff für Besucher.
revoke all on public.price_alerts from anon, authenticated;
grant all on public.price_alerts to service_role;
