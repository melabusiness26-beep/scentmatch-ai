# SwissDrop – E-Commerce & Dropshipping Schweiz

Eigenständige Next.js-App im Ordner `dropshipping/` dieses Repos
(getrennt von Auressa im Hauptordner und GameFinder in `gaming/`).

**SwissDrop** hilft beim Start in E-Commerce/Dropshipping in der Schweiz:

- **Produkt-Finder** (`/produkte`): kuratierte Produkte mit Score, Vor-/Nachteilen,
  Preisen, Margen, Lieferzeiten, Qualitäts-Checklisten und Bezugsquellen.
- **Nischen-Guide** (`/nischen`): 7 Nischen ehrlich verglichen (Konkurrenz, Marge, Risiken).
- **Store-Planer** (`/store-planer`): «Build your store»-Assistent – Nische + Budget + Zeit
  rein, kompletter Fahrplan raus (Namen, Sortiment, Plattform, 4-Wochen-Plan).
- **Werbevideo-Studio** (`/videos`): Drehbuch-Generator (Szene für Szene), Plattform-Guide
  (TikTok/Reels/Shorts/Pinterest) und ehrlicher Tool-Vergleich.
- **Schweiz-Wissen** (`/wissen`): 9 Ratgeber – Zoll & MWST, Verpackung, Recht,
  TWINT/Zahlungen, Post-Versand, Lieferzeiten, Plattform-Wahl, Steuern/AHV, Qualitätstests.

## Lokal starten

```bash
cd dropshipping
npm install
npm run dev
```

## Auf Vercel deployen (eigenes Projekt)

1. In Vercel **„Add New → Project“** und dieses GitHub-Repo wählen.
2. **Root Directory** auf `dropshipping` setzen (wichtig!).
3. Framework: Next.js (wird automatisch erkannt), Node 22.
4. Optional: Env-Variable `NEXT_PUBLIC_SITE_URL` auf die endgültige Domain setzen.

Der Markenname („SwissDrop“) ist ein Arbeitsname und wird zentral in
`lib/site.ts` geändert.

Alle Inhalte (Produkte, Nischen, Lieferanten, Artikel) liegen als gepflegte
Daten in `data/` – neue Produkte werden dort ergänzt, ohne Code zu ändern.
