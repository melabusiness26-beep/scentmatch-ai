# NexusPlay – Premium Game Finder (Next.js)

Eine moderne, mobile-first Gaming-Webseite: Spiele entdecken, vergleichen und
das passende Game finden. Ausführliche Spielprofile, starke Filter, ein
Game-Finder-Quiz und eine saubere Struktur, die später mit echten Gaming-APIs
und Monetarisierung wachsen kann.

> Diese App liegt im Unterordner `gaming/` und ist **komplett eigenständig** –
> unabhängig vom restlichen Repository. Sie funktioniert sofort mit Mock-Daten,
> **ohne** API-Keys.

---

## 1. So startest du die Seite (lokal)

Du brauchst **Node.js 22** (steht in `.nvmrc`).

```bash
cd gaming
npm install      # einmalig: lädt alle Bausteine
npm run dev      # startet die Seite
```

Dann im Browser öffnen: **http://localhost:3000**

Weitere Befehle:

```bash
npm run build    # baut die Produktionsversion (prüft auf Fehler)
npm start        # startet die gebaute Version
```

---

## 2. So bringst du sie online (Vercel)

1. Repository bei **Vercel** importieren.
2. **Wichtig:** Bei „Root Directory" den Ordner **`gaming`** auswählen
   (weil die Gaming-App in diesem Unterordner liegt).
3. Optional Umgebungsvariable setzen:
   - `NEXT_PUBLIC_SITE_URL` = deine spätere Domain (z. B. `https://deinedomain.ch`)
4. Deploy starten – fertig. Jeder Branch bekommt zusätzlich eine Vorschau-URL.

---

## 3. Projektstruktur (Überblick)

```
gaming/
├─ app/                      # Seiten (Next.js App Router)
│  ├─ page.tsx               # Startseite (Hero, Sektionen)
│  ├─ games/page.tsx         # Datenbank + Filter
│  ├─ game/[slug]/page.tsx   # Spielprofil (SEO, JSON-LD)
│  ├─ finder/page.tsx        # Game Finder (Quiz)
│  ├─ about|impressum|datenschutz/   # Infoseiten
│  ├─ sitemap.ts / robots.ts # SEO
│  ├─ layout.tsx             # Rahmen, Fonts, Header/Footer, Meta
│  └─ globals.css            # Design-Theme (dunkel, premium)
│
├─ components/               # Wiederverwendbare UI-Bausteine
│  ├─ SiteHeader / SiteFooter
│  ├─ GameCard / GameGrid / CoverArt
│  ├─ GamesExplorer          # Filter-Logik (Datenbankseite)
│  ├─ GameFinder             # Quiz-Logik
│  ├─ SearchForm / MoodGrid / TrailerEmbed
│  ├─ AffiliateButton / NewsletterSignup   # Monetarisierung (vorbereitet)
│  └─ SectionHeading
│
├─ data/
│  ├─ games.ts               # 👉 Die Spiele (Mock-Datenbank)
│  └─ taxonomy.ts            # Genres, Plattformen, Moods, Tags …
│
├─ lib/
│  ├─ types.ts               # Datenmodell (Game, Filter, Finder)
│  ├─ games.ts               # Suche, Filter, Finder-Engine
│  ├─ site.ts                # Seitenname & Navigation
│  └─ monetization.ts        # Affiliate-Logik (vorbereitet)
│
└─ services/                 # Anbindung externer Daten (vorbereitet)
   ├─ gamesService.ts        # fetchLatestGames / fetchGameDetails / updateGameData
   └─ providers/             # mock / igdb / rawg / steam
```

---

## 4. Spiele hinzufügen oder ändern

Alle Inhalte stehen in **`data/games.ts`**. Kopiere einen bestehenden Eintrag,
ändere die Felder (Titel, `slug`, Genres, Texte …) – fertig. Die Seite, die
Detailseite, die Filter und der Finder nutzen die Daten automatisch.

- `slug` = der Teil in der URL (`/game/elden-ring`). Klein, ohne Leerzeichen.
- `coverImage` leer lassen → es wird automatisch ein schickes Farb-Cover erzeugt.
- `accent` = zwei Farben für dieses Auto-Cover.

---

## 5. Später echte Gaming-APIs anbinden

Die Struktur ist schon vorbereitet. Du musst die UI **nicht** anfassen.

1. API-Key besorgen (am einfachsten **RAWG**: nur ein Key nötig).
2. In `gaming/.env.local` eintragen, z. B. `RAWG_API_KEY=...`
   (Vorlage steht in `.env.example`).
3. In `services/providers/rawgProvider.ts` die drei Funktionen mit echten
   `fetch`-Aufrufen füllen und die Antwort in den `Game`-Typ mappen
   (`mapRawgToGame`).
4. `services/providers/index.ts` wählt automatisch den konfigurierten Provider.

Quellen, die bereits als Gerüst vorhanden sind: **IGDB**, **RAWG**, **Steam**.

**Automatische Updates:** `updateGameData()` in `services/gamesService.ts` ist
der Platzhalter für einen späteren Cron-Job (z. B. Vercel Cron + ein Route
Handler `app/api/cron/update/route.ts`), der neue Spiele lädt und speichert.

---

## 6. Monetarisierung (vorbereitet, noch aus)

- **Affiliate:** `lib/monetization.ts` + `AffiliateButton`. Heute zeigt der
  Button die offizielle Seite / eine Suche. Sobald du Partner-Links hast, dort
  eintragen – die Buttons nutzen sie automatisch (`rel="sponsored"`).
- **Newsletter:** `NewsletterSignup` (Frontend fertig, Versand später anbinden).
- **Premium / Werbung / Preisalarm:** als klare Stellen im Code vorgesehen.

---

## 7. Was als Nächstes sinnvoll ist

1. **Mehr Spiele** in `data/games.ts` ergänzen (Ziel: Hunderte).
2. **Echte Cover-Bilder** (über eine API) – dann Bild-Hosts in `next.config.ts`
   freigeben.
3. **RAWG anbinden** für automatische Aktualisierung.
4. **Besucher gewinnen:** Google Search Console + Social Content.
5. **Monetarisierung scharfschalten**, sobald Reichweite da ist.

Viel Erfolg! 🎮
