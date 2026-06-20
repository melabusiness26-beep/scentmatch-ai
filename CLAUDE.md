# ScentMatch AI – Projekt-Kontext & Übergabe

> Dieses Dokument fasst alle bisherigen Entscheidungen und den Stand zusammen,
> damit ein neuer Chat nahtlos weitermachen kann. Bitte vor der Arbeit lesen.

## 1. Vision & Rahmen (von der Gründerin)
- Gründerin lebt in der **Schweiz**, **kein/kaum Startkapital**, **keine Programmierkenntnisse**.
- Ziel: **ScentMatch AI = modernste Duft-Findungs-Plattform Europas**. Start kostenlos.
- Spätere Einnahmen: **Affiliate**, Premium-Mitgliedschaft, Kooperationen, Werbung, Geschenkberater, Preisvergleich, personalisierte Empfehlungen.
- Arbeitsweise: **Schritt für Schritt, einfach erklären, keine Programmierkenntnisse voraussetzen.** Kommunikation auf **Deutsch**. Immer klare Empfehlung geben. Bei wirtschaftlich/technisch problematischen Ideen ehrlich sein.
- Code-Anspruch: vollständige Dateien, keine Platzhalter/TODOs, keine Build-/TypeScript-Fehler, Vercel- & Supabase-kompatibel, skalierbar.
- (Zweites, separates Projekt der Gründerin: ein Schmuck-Dropshipping-Shop – hier noch nicht begonnen.)

## 2. Tech-Stack & Live-Umgebung
- **Next.js 16 (App Router, Turbopack), React 19, TypeScript** – Versionen in package.json gepinnt, **Node 22** (engines + .nvmrc).
- **Supabase** (Postgres + Auth) als Datenbank/Backend.
- **Vercel** Hosting. Produktions-Branch ist `main` → Live: **https://scentmatch-ai.vercel.app**
- Deploy-Workflow: Entwicklung auf Branch `claude/vigilant-planck-sngm07` → PR nach `main` → Mergen → Vercel deployt automatisch. Jeder Branch bekommt eine Preview-URL.
- GitHub: `melabusiness26-beep/scentmatch-ai`.

## 3. Supabase
- Projekt-Ref: `hxzgakxxqxdfewyymvyl` · URL: `https://hxzgakxxqxdfewyymvyl.supabase.co`
- **Env-Variablen in Vercel** (Production+Preview):
  - `NEXT_PUBLIC_SUPABASE_URL` = die Projekt-URL
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = der **Publishable-Key** (`sb_publishable_...`). Hinweis: Variablenname ist „ANON_KEY", der Wert ist aber der neue Publishable-Key – funktioniert mit supabase-js.
- **Wichtig gelernt:** RLS-Policies allein reichen nicht – es braucht zusätzlich **GRANTs** (`grant select ... to anon, authenticated`), sonst „permission denied".

### Datenbank-Schema (Tabellen in `public`)
Kern (von der App genutzt):
- `brands` (id, name, slug, country, description, created_at)
- `perfumes` (id, brand_id→brands, perfume_name, slug, gender ['Women'|'Men'|'Unisex'], fragrance_family ['clean'|'gourmand'|'woody'|'floral'], top_notes/heart_notes/base_notes (text[]), price_chf, longevity, sillage, scentmatch_score, season, occasion, description, image_url, affiliate_url, created_at)

Vorbereitet, aber noch NICHT in der App verdrahtet:
- `fragrance_notes`, `perfume_notes`, `scent_profiles`, `quiz_questions`, `quiz_answers`, `recommendations`, `affiliate_links`, `layering_recipes`
- `scent_profiles`, `quiz_questions`, `quiz_answers` sind bereits mit Daten befüllt (für ein späteres DB-gesteuertes Quiz).

### RLS & Rechte (Stand)
- **Öffentliches Lesen** auf allen Inhalts-Tabellen (Policies „Public read ...") + `grant select to anon, authenticated`.
- **Schreiben** (insert/update) auf `perfumes` & `brands` nur für `authenticated` (Policies „Admins ..." + `grant insert,update to authenticated`).
- Versionierte SQL-Skripte liegen in `/supabase` (01… nicht vorhanden, ab 02): `02_more_perfumes.sql`, `03_notes_and_more.sql`, `04_admin_write_access.sql`. (Eine Charge ~24 Düfte wurde zusätzlich direkt im SQL-Editor importiert.)
- Katalog aktuell: **~64 Düfte**.

## 4. App-Struktur
- `app/page.tsx` (Client) – Startseite mit **Quiz** + Duftdatenbank (Suche, Match-Anzeige). **Quiz ist aktuell im Code gepflegt** (noch nicht DB-gesteuert).
- `app/duft/[slug]/page.tsx` (Server, SSG/ISR) – **SEO-Detailseite pro Duft**: generateMetadata, generateStaticParams (revalidate 3600), Product-JSON-LD, Duftpyramide.
- `app/admin/page.tsx` (Client) – **Login (Supabase Auth)** + Formular zum Düfte-Hinzufügen (Marke via datalist, slug auto). „Passwort vergessen?" vorhanden.
- `app/admin/reset/page.tsx` – neues Passwort setzen (Recovery-Link).
- `app/sitemap.ts`, `app/robots.ts` (robots sperrt /admin).
- `app/layout.tsx` – Root-SEO-Metadaten (metadataBase, OpenGraph). `NEXT_PUBLIC_SITE_URL` default `https://scentmatch-ai.vercel.app`.
- `lib/supabase.ts` – Supabase-Client, `isSupabaseConfigured` (build-sicher mit Fallback-Werten, validiert URL).
- `lib/perfumes.ts` – Typen, Datenabfragen **und die Match-Engine**.

## 5. Match-Engine (`lib/perfumes.ts`)
Pro Duft Score 0–100, Summe der Gewichte = 100:
- **Duftrichtung 30** = `30 × (Stimmen der Familie ÷ Gesamtstimmen)`
- **Lieblingsnote 20** (Treffer 20, sonst 4; ohne Angabe 12) – via `NOTE_THEMES` (Stichwort-Abgleich gegen Noten)
- **Budget 15** (im Budget 15, bis +30 % 7, sonst 0)
- **Anlass 13**, **Saison 12**, **Intensität/Sillage 10**
- **No-Go-Note: −25** Abzug, wenn die Note vorkommt
- **Geschlecht**: harter Filter (Damen→Women+Unisex, Herren→Men+Unisex)
- **Anker-Duft** („welchen Duft magst du schon?"): Ranking = `0,55 × Ähnlichkeit + 0,45 × Score`. Ähnlichkeit = gleiche Familie (35) + geteilte Noten (max 45) + Geschlecht (10) + ähnliche Sillage (10). Anker wird aus den Ergebnissen ausgeblendet.

### Quiz-Schritte (11), im Code in `app/page.tsx`
gender → anchor (optional, Dropdown) → 3× family → lovedNote → dislikedNote → occasion → season → sillage → budget. Fortschrittsbalken vorhanden.

## 6. Admin-Einrichtung (bereits erledigt)
- Schreibrechte-SQL ausgeführt (`04_admin_write_access.sql`).
- Admin-Benutzer in Supabase angelegt (Authentication → Users) und per SQL bestätigt (`email_confirmed_at`).
- Öffentliche Sign-ups in Supabase deaktiviert (nur die Gründerin hat Zugang).
- **Offen/optional:** Für „Passwort vergessen" die Redirect-URL in Supabase eintragen:
  Authentication → URL Configuration → Redirect URLs → `https://scentmatch-ai.vercel.app/admin/reset`.

## 7. Konventionen / Stolperfallen
- UI-Texte **auf Deutsch**.
- Markennamen teils ASCII gespeichert (`Chloe`, `Hermes`) – Anzeige ok.
- Saison-Werte mit Umlauten vereinheitlicht: `Frühling`, `Ganzjährig`, `Büro`.
- Slug-Erzeugung: lowercase, Umlaute→ae/oe/ue/ss, Sonderzeichen→`-`.
- Nach Code-Änderungen auf der Live-Seite ggf. **Strg+F5** (Cache).
- `NEXT_PUBLIC_*`-Variablen werden beim **Build** eingebacken → nach Änderung **Redeploy ohne Build-Cache** nötig.
- Bei „mehr Düften": **keine gescrapten Fragmente-Datensätze** (rechtlich riskant) – stattdessen kuratierte, faktenbasierte Chargen.

## 8. Fahrplan / nächste sinnvolle Schritte
1. **Katalog weiter wachsen** – weitere kuratierte Chargen (Ziel: hunderte Düfte). Admin-Formular existiert für manuelle Ergänzungen.
2. **Affiliate-Links** – `perfumes.affiliate_url` und Tabelle `affiliate_links` sind vorbereitet; „Jetzt ansehen"-Button auf Detailseiten + Startseite einbauen → Einnahmen.
3. **Design/Optik** aufwerten (Bilder pro Duft via `image_url`, mobiles Feintuning, Premium-Look).
4. **Quiz DB-gesteuert** machen (Tabellen `quiz_questions`/`quiz_answers`/`scent_profiles` nutzen), damit Fragen ohne Code änderbar sind.
5. Später: KI-Ähnlichkeit (Embeddings) für „riecht ähnlich wie …".

## 9. So macht ein neuer Chat weiter
- Auf demselben Repo (`melabusiness26-beep/scentmatch-ai`) eine neue Claude-Code-Session starten – diese Datei wird automatisch gelesen.
- Entwicklung weiterhin auf einem Feature-Branch → PR nach `main`.
