# Website-Audit auressa.ch (Stand: 6. Juli 2026)

> Grundlage dieses Audits ist der **echte Quellcode** deiner Seite (im Repo),
> nicht ein Blick von aussen – deshalb sind die Punkte konkret und auf Dateien
> bezogen. Die Live-Seite selbst blockt automatische Zugriffe (Bot-Schutz, 403),
> was für die Sicherheit gut ist und hier nichts an der Bewertung ändert.

## Gesamtnote: 8 / 10

Auressa ist technisch **überdurchschnittlich sauber** gebaut (Next.js 16, echtes
SEO-Fundament, ehrliche Texte, DSGVO-/Datenschutz-konform). Das ist ein starkes
Fundament – die meisten Konkurrenten in dieser Preisklasse haben das nicht.
Die grössten Hebel liegen jetzt nicht mehr in der Technik, sondern in
**Vertrauen sichtbar machen**, **Social-Media-Anbindung** und **Quiz-Conversion**.

---

## Was schon richtig gut ist (nicht anfassen)

- **SEO-Fundament stark:** `app/layout.tsx` liefert Organization- und WebSite-
  JSON-LD, Canonical-Tags, OpenGraph, Twitter-Cards, `de-CH`-Locale und die
  Google-Search-Console-Verifizierung. Detailseiten (`app/duft/[slug]`) haben
  Product-JSON-LD und ISR (revalidate). Sitemap + robots.txt vorhanden.
- **Ladezeit-Basis gut:** Hero-Bild wird per `<link rel="preload">` vorgeladen
  (`app/page.tsx`), Schriften via `next/font` (kein Layout-Sprung), Turbopack.
- **Ehrliche Texte:** „riecht ähnlich" statt „identisch", echter Match-Score
  0–100, Affiliate-Transparenzhinweis im Footer, `rel="sponsored"`. Das zahlt
  exakt auf die Markenwerte „ehrlich / vertrauenswürdig" ein.
- **Rechtlich sauber (CH):** Impressum, Datenschutz, Cookie-Banner mit
  Consent-gesteuertem Analytics. Das ist für die Schweiz wichtig und oft
  vernachlässigt.
- **Conversion-Elemente da:** Affiliate-Button, Newsletter-Formular (Quiz +
  Footer), „günstige Alternativen".

---

## Die wichtigsten Baustellen (nach Priorität)

Bewertung: **Wirkung** (auf Wachstum/Umsatz) × **Aufwand**.

### 🔴 P1 – Social-Media-Verlinkung fehlt komplett (hohe Wirkung, minimaler Aufwand)
**Befund:** Weder `app/SiteHeader.tsx` noch der Footer in `app/layout.tsx`
enthalten einen einzigen Link zu Instagram, TikTok oder Pinterest.
**Warum kritisch:** Dein ganzer Wachstumsplan läuft über Social Media. Wenn
Besucher der Website deine Kanäle nicht finden (und Follower deiner Kanäle nicht
zurück zur Website), verschenkst du den Kreislauf. Umgekehrt braucht Instagram
in der Bio einen Link – der ist da, aber die Seite verlinkt nicht zurück.
**To-do:** Dezente Social-Icons in den Footer (und optional ins Menü). Erst
eintragen, wenn die Accounts final stehen (siehe Social-Audit). Passt optisch
zum „Discovery · Fragrance · Boutique"-Footer.

### 🔴 P2 – Quiz ist mit 14 Fragen zu lang (hohe Wirkung, mittlerer Aufwand)
**Befund:** `app/HomeClient.tsx` definiert **14 Quiz-Schritte**
(Geschlecht, Anker-Duft, 3× Duftfamilie, Süße, Lieblingsnote, No-Go-Note,
Anlass, Saison, Sillage, Haltbarkeit, Budget, Preis-Präferenz).
**Warum kritisch:** Die Überschrift verspricht „in 1 Minute" – 14 Fragen fühlen
sich länger an. Jede zusätzliche Frage kostet Abschluss-Rate (Drop-off). Genau
hier entstehen deine Empfehlungen und deine Affiliate-Klicks.
**To-do (Optionen, keine sofortige Umsetzung nötig):**
- **Kern-Quiz auf 7–8 Fragen kürzen** (Geschlecht, 2× Familie, Anlass, Saison,
  Sillage, Budget) und die restlichen Fragen als **optionale „Feinschliff"-
  Fragen** hinter einem „Ergebnis verfeinern"-Button verstecken.
- Oder: ab Frage 8 einen Button **„Ergebnis jetzt anzeigen"** einblenden.
- Fortschrittstext ehrlich halten („Frage 5 von 8").
> Empfehlung: erst **messen** (siehe P6), dann kürzen. Aber die Länge ist der
> wahrscheinlichste Conversion-Killer auf der Seite.

### 🟠 P3 – Vertrauen/Social Proof sichtbar machen (hohe Wirkung, mittlerer Aufwand)
**Befund:** Es gibt „Warum Auressa?"-Karten, aber **keine echten Stimmen**
(Bewertungen, „von X Menschen genutzt", Gründerin-Gesicht auf der Startseite).
**Warum wichtig:** Premium + Vertrauen verkauft sich über Menschen. Gerade als
junge Marke ohne bekannten Namen.
**To-do (ehrlich, nichts erfinden):**
- **Gründerin-Story** kurz auf `/ueber-uns` prominenter + Foto (echte Person =
  Vertrauen). Von der Startseite dorthin verlinken.
- Sobald echte Nutzer da sind: **echte Kurz-Feedbacks** einsammeln (z. B. per
  Newsletter/Instagram) und mit Einverständnis zeigen. **Keine erfundenen
  Testimonials** – das widerspricht der Marke und ist rechtlich riskant.
- Neutrale Vertrauens-Fakten, die stimmen: „~400 kuratierte Düfte", „X Marken",
  „kuratiert in der Schweiz", „ehrlicher Match-Score statt bezahlter Platzierung".

### 🟠 P4 – Echte Duftbilder statt Platzhalter (mittlere Wirkung, höherer Aufwand)
**Befund:** `perfumes.image_url` existiert, ist aber grösstenteils leer →
Kacheln wirken ohne Produktbild weniger „Premium".
**Warnung (rechtlich):** Keine fremden Produktfotos einfach kopieren. Optionen:
(a) eigene, klar als Stilbild gekennzeichnete KI-/Studio-Bilder pro Duftfamilie,
(b) offiziell erlaubte Affiliate-/Herstellerbilder, wo die Programme das gestatten.
**To-do:** Zunächst **stimmige Duftfamilien-Motive** (Clean/Gourmand/Woody/Floral)
als Fallback-Bild – das hebt die Optik sofort, ohne Rechteproblem.

### 🟡 P5 – Interne Verlinkung & FAQ-Schema ausbauen (mittlere Wirkung, kleiner Aufwand)
**Befund:** Ratgeber (`lib/guides.ts`, 6 Artikel) und `lib/guide-faqs.ts` sind da.
**To-do:**
- **FAQ-JSON-LD** auf Ratgeber-/Detailseiten ausspielen (falls noch nicht) →
  Chance auf „Rich Results" bei Google, mehr Klicks.
- Mehr **interne Links**: von Duft-Detailseiten in passende Ratgeber und
  umgekehrt („Diese 5 Sommerdüfte …" → Guide). Das stärkt SEO und Verweildauer.
- **Breadcrumb-JSON-LD** ergänzen.

### 🟡 P6 – Messen, um zu entscheiden (Voraussetzung für alles)
**Befund:** Consent-Analytics ist eingebaut – gut. Für Wachstum brauchst du aber
gezielte **Ereignisse**: Quiz gestartet, Quiz-Frage X verlassen (Drop-off!),
Quiz abgeschlossen, Affiliate-Klick, Newsletter-Anmeldung.
**To-do:** Diese Events tracken (datenschutzkonform, nur mit Consent). Erst dann
weisst du, ob P2 (Quiz-Länge) wirklich das Problem ist, und wo Besucher abspringen.

### 🟢 P7 – Kleinere Politur
- **`utm`-fähige Links** für Social: eigene Zielseiten/Parameter, damit du in der
  Search Console/Analytics siehst, welcher Kanal Besucher bringt.
- **Newsletter-Doppel-Opt-in** (rechtlich sauber in CH/EU) prüfen.
- **404-/leere Zustände** freundlich gestalten (das Quiz macht das bei
  „kein Treffer" schon vorbildlich).

---

## Mobile & Performance – kurzer Check
- **Viewport** korrekt gesetzt, **auto-fit-Raster** → passt sich Handys an. Gut.
- **Fonts** über `next/font` (kein FOUT/Sprung). Gut.
- **Empfehlung:** Vor jeder grösseren Kampagne einmal **PageSpeed Insights /
  Lighthouse** (mobil) laufen lassen und auf **LCP < 2,5 s** und **CLS < 0,1**
  achten. Bilder als `next/image` mit Grössenangaben ausliefern (prüfen, ob in
  `PerfumeTile` schon so), sonst kostet es mobil Punkte.

---

## Konkrete Reihenfolge für die nächsten 2 Wochen
1. **Social-Icons in den Footer** (sobald Accounts final) – 30 Min.
2. **Quiz-Events tracken** (Start/Abschluss/Drop-off) – Basis für Entscheidungen.
3. **Gründerin-Foto + Story** auf `/ueber-uns` und Verlinkung von der Startseite.
4. **Quiz-Kürzung testen** (optionale Fragen ausblenden), sobald Daten da sind.
5. **Duftfamilien-Fallbackbilder** für schönere Kacheln.

> Merke: Die Website ist **nicht dein Engpass**. Dein Engpass sind **Besucher**.
> Das meiste hier ist Feinschliff – der grosse Hebel ist Social Media (nächste
> Dokumente). Deshalb: Website-To-dos klein halten, Energie in Reichweite stecken.
