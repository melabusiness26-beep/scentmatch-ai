export interface Guide {
  id: string;
  slug: string;
  title: string;
  description: string;
  category: 'tips' | 'dupe' | 'seasonal' | 'style';
  image?: string;
  content: string;
  seoTitle: string;
  seoDescription: string;
  publishedAt: string;
  readTime: number;
  keywords: string[];
}

export const guides: Guide[] = [
  {
    id: 'dupes-sparen',
    slug: 'dupes-sparen',
    title: 'Die besten Duft-Dupes: Luxus-Düfte zum kleinen Preis',
    description: 'Entdecke hochwertige Duft-Dupes, die genauso riechen wie teure Luxus-Düfte — aber nur ein Bruchteil kosten.',
    category: 'dupe',
    content: `
# Die besten Duft-Dupes: Luxus-Düfte zum kleinen Preis

Du liebst die teuren Düfte von Dior, Chanel oder Tom Ford, möchtest aber nicht CHF 150+ pro Flasche ausgeben? Das verstehen wir!

Gute Nachrichten: Es gibt hochwertige **Duft-Dupes**, die den Original-Düften sehr ähnlich riechen — und kosten oft nur CHF 20–40.

## Was ist ein Duft-Dupe?

Ein **Dupe** (englisch für „Duplikat") ist ein günstiger Duft, der einem teureren Original sehr ähnlich riecht. Dupes ahmen die Duftpyramide (Kopfnoten, Herznoten, Basisnoten) nach, ohne dabei eine identische Formel zu sein.

### Wichtig:
- Dupes sind **legal** und nicht gefälscht
- Sie sind oft von anderen Marken (z.B. Armaf, Lattafa, Fragrance World)
- Sie riechen **sehr ähnlich**, sind aber nicht zu 100% identisch
- Die Haltbarkeit kann etwas kürzer sein

## Die besten Dupes 2024

### Dupe für Dior Sauvage
**Original**: Dior Sauvage (Herren) – CHF 140+
**Dupe**: Armaf Club de Nuit Intense – CHF 35
**Ähnlichkeit**: 95% (Ambroxan-basiert, würzig-frisch)

**Warum der Dupe genial ist:**
- Fast identische Duftpyramide
- Längere Haltbarkeit (bis 10 Stunden)
- Ein Drittel des Preises

---

### Dupe für Chanel N°5
**Original**: Chanel N°5 (Damen) – CHF 180+
**Dupe**: Fragrance World Paris Hilton Dupe – CHF 25
**Ähnlichkeit**: 90% (blumig-würzig, klassisch)

**Warum der Dupe genial ist:**
- Ähnliche Kopfnoten (Aldehyden, Bergamotte)
- Robuste Herznoten (Rose, Jasmin)
- Perfekt für den täglichen Gebrauch

---

### Dupe für Tom Ford Black Orchid
**Original**: Tom Ford Black Orchid – CHF 160+
**Dupe**: Lattafa Perfumes Badee Al Oud – CHF 30
**Ähnlichkeit**: 92% (dunkel, würzig-orientalisch)

**Warum der Dupe genial ist:**
- Ähnliche Tiefe und Sinnlichkeit
- Ausgezeichnete Sillage (Raumspieler)
- Ein absoluter Geheimtipp

---

## Tipps zum Dupes Kaufen

### 1. Vertrauenswürdige Marken
Einige Dupe-Hersteller sind berühmt für hohe Qualität:
- **Armaf** (Nahe Osten) – Exzellente Qualität, viele Dupes
- **Lattafa** (Vereinigte Arabische Emirate) – Orientalische Düfte
- **Fragrance World** – Budget-Dupes mit hohem Standard

### 2. Wo Dupes kaufen?
- **Notino.ch** – Große Auswahl, zuverlässig
- **Flaconi.de** – Gute Preise, schneller Versand
- Lokale Parfümerie (frag nach „Budget-Alternativen")

### 3. Dupe-Test: Wie erkennst du einen guten Dupe?
- **Duftpyramide vergleichen**: Sind die top/heart/base notes ähnlich?
- **Bewertungen lesen**: Was sagen andere Käufer?
- **Haltbarkeit testen**: Hält es mindestens 6–8 Stunden?
- **Sillage prüfen**: Verbreitet sich der Duft im Raum?

---

## Ist ein Dupe besser als das Original?

**Nein, aber:**
- Der Original ist oft komplexer und hochwertiger
- Der Dupe ist aber für den Preis **unschlagbar**
- Für den täglichen Gebrauch reicht ein Dupe völlig aus

**Unser Tipp**: Kauf einen teuren Original, den du wirklich liebst (z.B. für spezielle Anlässe), und nimm einen Dupe für den Alltag. So sparst du Geld und die Original-Flasche hält länger!

---

## Fazit

Dupes sind eine **geniale Möglichkeit**, deine Lieblingsdüfte günstiger zu genießen. Mit den richtigen Marken (Armaf, Lattafa) bekommst du großartige Qualität für einen Bruchteil des Preises.

**Beginne mit unserem Quiz** — finde deinen Lieblings-Duft-Typ, und wir zeigen dir die besten Dupes!
    `,
    seoTitle: 'Die besten Duft-Dupes 2024: Luxus-Düfte zum kleinen Preis',
    seoDescription: 'Entdecke hochwertige Duft-Dupes von Armaf & Lattafa. Sparen Sie CHF 100+ pro Flasche und genießen Sie Düfte, die wie Dior, Chanel und Tom Ford riechen.',
    publishedAt: '2024-01-15',
    readTime: 8,
    keywords: ['Duft-Dupe', 'günstige Düfte', 'Armaf', 'Lattafa', 'Parfüm-Klon'],
  },
  {
    id: 'sommerduefte',
    slug: 'sommerduefte',
    title: 'Die besten Sommerdüfte 2024: Frisch, leicht, erfrischend',
    description: 'Entdecke die perfekten Düfte für den Sommer — frisch, leicht und langlebig. Von Zitrusfrüchten bis Ozean-Noten.',
    category: 'seasonal',
    content: `
# Die besten Sommerdüfte 2024: Frisch, leicht, erfrischend

Der Sommer ist die perfekte Zeit, um deine Duft-Routine zu erneuern. Schwere, dunkle Düfte wie Oud oder Musk mögen im Winter wunderschön sein, im Sommer aber wirken sie erdrückend.

Sommerdüfte sollten **frisch, leicht und belebend** sein — Düfte, die dich und andere um dich herum erfreuen, ohne zu überwältigend zu wirken.

## Was macht einen guten Sommermduft?

### 1. Kopfnoten sind wichtig
Gute Sommerdüfte haben **spritzige Kopfnoten**:
- Zitrusfrüchte (Zitrone, Limette, Grapefruit, Orange)
- Bergamotte (klassisch, erfrischend)
- Grüne Noten (Minze, Basilikum, Galbanum)
- Tropische Früchte (Kokosnuss, Ananas)

### 2. Leichte Herznoten
- Grüne / herbale Noten (Galbanum, Kräuter)
- Blumige Noten (Jasmin, Maiglöckchen — aber dezent)
- Fruchtbombe vermeiden (zu penetrant)

### 3. Kurze bis mittlere Haltbarkeit
- Eau de Toilette (3–5 Stunden) ist perfekt für Sommer
- Eau de Parfum (5–8 Stunden) auch ok
- Langlebige Düfte wie Eau de Parfum könnten zu schwer wirken

---

## Top 10 Sommerdüfte

### Für Frauen

**1. Heeley Sel Marin (Unisex)**
*Ozean-frisch, salzig, maritim*
- Sillage: Moderat
- Haltbarkeit: 6–8 Stunden
- Vibe: Strand, Salz, Meer

**2. Maison Margiela Beach Walk**
*Kokosnuss, Vanille, Ozean*
- Sillage: Leicht
- Haltbarkeit: 5–7 Stunden
- Vibe: Tropical, sonnig, entspannt

**3. Issey Miyake L'Eau d'Issey Pour Femme**
*Klassischer Frauensommer-Duft*
- Sillage: Moderat
- Haltbarkeit: 6–8 Stunden
- Vibe: Eleganz, Frische, Timeless

---

### Für Herren

**1. Heeley Sel Marin (Unisex)**
*Ozean-frisch, salzig, maritim*

**2. Acqua di Parma Blu Mediterraneo**
*Zitrus, Limette, Meer-Spray*
- Sillage: Moderat
- Haltbarkeit: 5–7 Stunden
- Vibe: Luxuriös, Italien, Küste

**3. Hermès Eau de Gentianelle**
*Bergamotte, grün, frisch*
- Sillage: Leicht bis Moderat
- Haltbarkeit: 6–8 Stunden
- Vibe: Klassisch, erfrischend, elegant

---

### Budget-Favoriten

**Armaf Club de Nuit Lumière** – CHF 35
*Zitrus, Ambroxan, frisch*

**Lattafa Raed** – CHF 30
*Frisch, würzig, erfrischend*

---

## Tipps für Sommerdüfte

### 1. Anwendung im Sommer
- **Weniger ist mehr**: Im Sommer benötigst du weniger Spray-Hübe
- **Halte Abstand**: Sprühe 15–20cm von deiner Haut entfernt
- **Hals + Handgelenke**: Klassische Anwendungsstellen

### 2. Lagerung
- **Kühl und trocken**: Direkte Sonne kann Düfte zersetzen
- **Dunkle Flasche**: Schützt vor UV-Strahlen
- **Im Kühlschrank?**: Nicht nötig, aber es kann die Duft-Erfahrung enhancen

### 3. Combine mit anderen Produkten
- **Körperlotion**: Trägt den Duft länger
- **Deodorant**: Neutral halten, nicht zu stark
- **Duschen**: Frischer Duft hält länger auf sauberer Haut

---

## Fazit

Die besten Sommerdüfte sind **frisch, leicht und belebend** — Düfte, die dich und deine Umgebung erfreuen. Von klassischen Zitrus-Düften bis zu ozeanischen Kompositionen: Im Sommer ist Vielfalt erlaubt!

**Beginne mit unserem Quiz** — finde deinen perfekten Sommermduft!
    `,
    seoTitle: 'Die besten Sommerdüfte 2024 — Frisch, leicht & erfrischend',
    seoDescription: 'Die Top Sommerdüfte für Frauen, Herren & Budget. Zitrus, Ozean, Tropisch — finde deinen perfekten Sommer-Duft.',
    publishedAt: '2024-06-01',
    readTime: 10,
    keywords: ['Summerdüfte', 'frische Düfte', 'Zitrus-Düfte', 'Eau de Toilette'],
  },
  {
    id: 'unisex-duefte',
    slug: 'unisex-duefte',
    title: 'Die besten Unisex-Düfte: Für alle Geschlechter geeignet',
    description: 'Moderne Unisex-Düfte, die für jeden geeignet sind. Keine Grenzen, nur großartige Dufte.',
    category: 'style',
    content: `
# Die besten Unisex-Düfte: Für alle Geschlechter geeignet

Der Parfüm-Markt ändert sich. Immer mehr Menschen tragen **Unisex-Düfte** — Düfte, die nicht in rosa oder blaue Flaschen passen, sondern einfach nur gut riechen.

Unisex-Düfte sind **moderner, inklusiv und progressiv**. Sie brechen mit alten Konventionen und ermöglichen es jedem, den Duft zu tragen, der am besten zu ihrer Persönlichkeit passt.

## Was macht einen Duft „Unisex"?

Ein Unisex-Duft hat folgende Merkmale:

### 1. Ausgewogene Duftpyramide
- Keine extreme Weiblichkeit oder Männlichkeit
- Kombiniert typischerweise maskuline und feminine Noten
- Z.B. würzige + blumige Noten zusammen

### 2. Moderate Sillage
- Nicht zu durchdringend (wie viele männliche Düfte)
- Aber auch nicht zu dezent (wie viele weibliche Düfte)
- Angenehm für dich und deine Umgebung

### 3. Zeitloses Design
- Einfache, minimalistische Flaschen
- Kein Geschlechtermerkmal im Design
- Oft in neutralen Farben (Grau, Schwarz, Weiß, Natur)

---

## Top 10 Unisex-Düfte

### Minimalistische Klassiker

**1. Heeley Sel Marin**
*Ozean, Salz, Meer*
- Familie: Frisch-aquatisch
- Geschlecht: Wirklich Unisex
- Vibe: Küstenluft, nackig, genderless

**2. Maison Margiela Beach Walk**
*Kokosnuss, Vanille, Ozean*
- Familie: Fruchtbar-frisch
- Vibe: Boho, entspannt, natürlich

**3. Nez Facéties**
*Grüne Noten, Kräuter, Erde*
- Familie: Grün-herbal
- Vibe: Botanisch, minimalistisch

---

### Würzig + Blumig

**4. Maison Margiela When the Rain Stops**
*Grün, nass, Erde*
- Familie: Grün-aromatisch
- Vibe: Post-Regen, Natur, genderless

**5. Hermès Eau de Gentianelle**
*Bergamotte, Enzian, grün*
- Familie: Zitrus-aromatisch
- Vibe: Luxuriös, elegant, offen

---

### Holzig + Soft

**6. Aesop Tacit**
*Weihrauch, Holz, Gewürze*
- Familie: Orientalisch-holzig
- Vibe: Geheimnisvoll, introspektiv

**7. Lab on Fire Tempête**
*Sandelholz, Veilchen, Paprika*
- Familie: Holzig-würzig
- Vibe: Modern, rebellisch, genderless

---

### Budget-Favoriten (Unisex)

**Armaf Club de Nuit Urban Unisex** – CHF 40
*Würzig, Ambroxan, elegant*

**Lattafa Raed** – CHF 30
*Frisch, würzig, für alle*

---

## Warum Unisex-Düfte?

### 1. Authentizität
Du trägst den Duft, der dir gefällt — nicht den, den „dein Geschlecht" tragen soll.

### 2. Modernes Denken
Unisex-Düfte repräsentieren eine moderne Sicht auf Gender und Ausdruck.

### 3. Vielfalt in deiner Duft-Sammlung
Wenn du mehrere Düfte trägst, ermöglichen Unisex-Düfte grenzenlose Kombinationen.

### 4. Kosten sparen
Eine Unisex-Flasche kann von mehreren Personen geteilt werden!

---

## Fazit

Unisex-Düfte sind nicht ein Marketing-Gimmick — sie sind eine **echte Kategorie** mit einzigartigen, wunderschönen Düften. Sie riechen großartig, brechen mit Konventionen und erlauben Ausdruck.

Wenn du auf der Suche nach einem Duft bist, der kein Geschlecht „hat", probiere ein paar Unisex-Klassiker aus. Du wirst überrascht sein!

**Beginne mit unserem Quiz** — wir zeigen dir Unisex-Düfte, die zu dir passen!
    `,
    seoTitle: 'Die besten Unisex-Düfte — Modern, inklusiv, zeitlos',
    seoDescription: 'Entdecke moderne Unisex-Düfte für alle Geschlechter. Minimalistische, würzige & holzige Klassiker — ohne Grenzen.',
    publishedAt: '2024-02-20',
    readTime: 7,
    keywords: ['Unisex-Düfte', 'Genderneutral', 'moderne Düfte', 'inklusive Parfüme'],
  },
  {
    id: 'winterduefte',
    slug: 'winterduefte',
    title: 'Die besten Winterdüfte: Warm, würzig, tiefenwirkend',
    description: 'Schwere, warme Düfte für die kalte Jahreszeit. Von Amber bis Oud — die besten Winterdüfte.',
    category: 'seasonal',
    content: `
# Die besten Winterdüfte: Warm, würzig, tiefenwirkend

Wenn die Temperaturen fallen, ist es Zeit, deine Duft-Garde zu wechseln. **Winterdüfte** sind schwerer, wärmer und sinnlicher als ihre Sommer-Cousins.

Während Sommerdüfte leicht und erfrischend sind, umarmen Winterdüfte dich wie eine warme Decke. Sie sind perfekt, um sich in der kalten Jahreszeit tröstlich und luxuriös zu fühlen.

## Was macht einen guten Wintermduft?

### 1. Schwere Kopfnoten
- Würzige Noten (Zimt, Pfeffer, Nelke, Kardamom)
- Wald-Noten (Zedernholz, Fichte, Tannennadel)
- Animalische Noten (Moschus, Ambra)
- Keine Zitrusfrüchte (zu leicht)

### 2. Reichhaltige Herznoten
- Blumig-würzig (Rose + Zimt, Jasmin + Nelke)
- Orientalische Noten (Sandelholz, Vanille, Kakaobutter)
- Tabak, Räuchernoten (Weihrauch, Myrrhe)

### 3. Tiefe und Langlebigkeit
- Eau de Parfum (5–8 Stunden) oder höher
- Intensive Sillage (der Duft soll den Raum füllen)
- Bass-Noten, die den ganzen Tag halten

---

## Top 10 Winterdüfte

### Klassisch-würzig

**1. Givenchy Gentleman Reserve Privée**
*Tabak, Mandarine, Amber*
- Sillage: Stark
- Haltbarkeit: 8–10 Stunden
- Vibe: Elegant, warm, maskulin

**2. Tom Ford Black Orchid**
*Schwarze Orchidee, Zimt, Gewürze*
- Sillage: Sehr stark
- Haltbarkeit: 10+ Stunden
- Vibe: Sinnlich, mysteriös, tiefenwirkend

---

### Orientalisch & Sinnlich

**3. Yves Saint Laurent La Nuit de L'Homme**
*Kardamom, Zedernholz, Muskat*
- Sillage: Moderat bis Stark
- Haltbarkeit: 8–9 Stunden
- Vibe: Warm, würzig, luxuriös

**4. Prada L'Homme Versace Eros**
*Mint, Grüne Noten, Vanille*
- Sillage: Stark
- Haltbarkeit: 8–10 Stunden
- Vibe: Tiefenwirkend, frech, sinnlich

---

### Oud & Amber

**5. Creed Royal Oud**
*Oud, Sandelholz, Vanille*
- Sillage: Sehr stark
- Haltbarkeit: 12+ Stunden
- Vibe: Luxus, tiefenwirkend, anhaltend

**6. Amouage Dia Man**
*Amber, Weihrauch, Muskat*
- Sillage: Sehr stark
- Haltbarkeit: 10–12 Stunden
- Vibe: Orientalisch, tiefenwirkend

---

### Budget-Favoriten (Winter)

**Armaf Club de Nuit Intense Man** – CHF 35
*Würzig, Ambroxan, elegant*

**Lattafa Badee Al Oud** – CHF 30
*Oud, würzig, orientalisch*

---

## Tipps für Winterdüfte

### 1. Lagern für Haltbarkeit
- **Kühl lagern**: Winter ist perfekt, da Düfte von Natur aus kühl gelagert werden
- **Dunkel**: Fern von direkter Sonne
- **Fest verschlossen**: Verhindert Verdunstung

### 2. Anwendung im Winter
- **Großzügiger sprühen**: Winterdüfte können intensiv sein, aber die Kälte schwächt ihre Projektion
- **Schichten**: Körperlotion + Duft = längere Haltbarkeit
- **Layering**: Kombiniere verschiedene Düfte (z.B. Spray auf Hemd + Puls)

### 3. Warme Umgebung = Stärkere Projektion
- In warmen Räumen riechen Winterdüfte intensiver
- Das ist beabsichtigt — nutze das!

---

## Winterdüfte vs. Sommerdüfte: Das Experiment

| Aspekt | Sommer | Winter |
|--------|--------|--------|
| **Duftfamilie** | Frisch, Zitrus, Wässrig | Orientalisch, Würzig, Holzig |
| **Kopfnoten** | Hell, spritzig | Dunkel, würzig |
| **Haltbarkeit** | 3–5 Stunden | 8–12 Stunden |
| **Sillage** | Leicht | Stark |
| **Tragezeit** | Tagsüber | Tagsüber + Abend |

---

## Fazit

Winterdüfte sind nicht nur saisonale Gimmicks — sie sind **wichtige Teile einer ausgewogenen Duft-Garde**. Sie umarmen dich, wärmen dich emotional und verleihen Vertrauen in der kalten Jahreszeit.

Wenn du noch keinen Wintermduft hast, ist jetzt die perfekte Zeit zu experimentieren. Von klassischem Tabak bis zu orientalischem Oud: Es gibt für jeden einen perfekten Wintermduft.

**Beginne mit unserem Quiz** — finde deinen Wintermduft!
    `,
    seoTitle: 'Die besten Winterdüfte 2024 — Warm, würzig, tiefenwirkend',
    seoDescription: 'Die Top Winterdüfte für Herren & Damen. Von Oud bis Amber — warme, würzige Düfte für die kalte Jahreszeit.',
    publishedAt: '2024-10-01',
    readTime: 9,
    keywords: ['Winterdüfte', 'warme Düfte', 'Oud', 'Orientalische Düfte', 'würzige Parfüme'],
  },
  {
    id: 'duefte-anlaesse',
    slug: 'duefte-anlaesse',
    title: 'Der richtige Duft für jeden Anlass: Büro, Date, Party, Hochzeit',
    description: 'Welcher Duft passt zu welchem Anlass? Der komplette Guide für perfekte Duft-Entscheidungen.',
    category: 'tips',
    content: `
# Der richtige Duft für jeden Anlass: Büro, Date, Party, Hochzeit

Ein großer Fehler, den viele machen: Sie tragen **den gleichen Duft überall** — zur Arbeit, zum Date, zur Party, zur Hochzeit.

Das ist ineffizient. **Jeder Anlass braucht einen anderen Duft**. In diesem Ratgeber zeigen wir dir, welcher Duft zu welchem Anlass passt.

## Das Geheimnis: Sillage + Intensität

Die wichtigsten Faktoren bei der Wahl eines Dufts für einen Anlass sind:

### 1. Sillage (Projektion)
- **Schwach (2/5)**: Nur du selbst riechst den Duft — perfekt für Büro
- **Moderat (3/5)**: Andere in deiner Nähe riechen ihn — perfekt für Alltag
- **Stark (4/5)**: Der ganze Raum riecht es — perfekt für Party
- **Sehr stark (5/5)**: Zu intensiv für die meisten Anlässe

### 2. Duftfamilie
- **Frisch**: Tagsüber, Büro, Sport
- **Blumig**: Romantisch, Date, elegant
- **Würzig**: Abend, Event, Glamour
- **Orientalisch**: Spezielle Anlässe, Abend, Nacht
- **Holzig**: Vielseitig, Geschäft, Alltag

---

## Dein Duft-Guide nach Anlass

### Im Büro oder bei der Arbeit

**Anforderungen:**
- Schwache bis moderate Sillage (nicht zu dominant)
- Frisch oder holzig (nicht zu sinnlich)
- Beruhigend, konzentrationssupport (nicht ablenkend)

**Perfekte Düfte:**
- **Hermès Eau de Gentianelle** – Frisch, elegant, professionell
- **Creed Virgin Island Water** – Frisch, diskret, elegant
- **Armaf Club de Nuit Urban** – Würzig, unaufdringlich

**Tipp:** Wähle Eau de Toilette statt Eau de Parfum — schwächer, aber langlebig

---

### Für ein romantisches Date

**Anforderungen:**
- Moderate Sillage (nah genug zum anderen)
- Blumig oder fruchtig (einladend, sinnlich)
- Angenehm, nicht zu schwer

**Perfekte Düfte:**
- **Issey Miyake L'Eau d'Issey Pour Femme** – Klassisch, romantisch
- **Marc Jacobs Daisy** – Fruchtig, frisch, flirtend
- **Heeley Sel Marin** – Ozean, salzig, verführerisch

**Tipp:** Wähle einen Duft, der dich selbst macht, dich vertraut und glücklich macht. Das ist das beste Aphrodisiakum!

---

### Auf einer Party oder Nachtclub

**Anforderungen:**
- Starke Sillage (Präsenz, Auffälligkeit)
- Würzig oder orientalisch (sinnlich, dramatisch)
- Langlebig (mindestens 8 Stunden)

**Perfekte Düfte:**
- **Tom Ford Black Orchid** – Dunkel, sinnlich, hypnotisierend
- **Givenchy Gentleman Reserve Privée** – Warm, würzig, charismatisch
- **Armaf Club de Nuit Intense** – Würzig, präsent, intensiv

**Tipp:** Im Nachtclub riechen Menschen stärker schwitzen. Wähle einen Duft, der mit Körperwärme gut interagiert (würzig, orientalisch).

---

### Zur Hochzeit oder einem formellen Event

**Anforderungen:**
- Elegante, reichhaltige Duftfamilie (blumig, würzig)
- Moderate bis starke Sillage (Respekt)
- Zeitlos, nicht trendig

**Perfekte Düfte:**
- **Chanel N°5** – Zeitlos, legendär, elegant (für Damen)
- **Dior Sauvage** – Klassisch, elegant, universell anerkannt (für Herren)
- **Tom Ford Velvet Orchid** – Elegant, sinnlich, beeindruckend

**Tipp:** Vermeide zu experimental oder trendy Düfte bei formellen Events. Bleibe klassisch und elegant.

---

### Für den Alltag & Freizeit

**Anforderungen:**
- Moderate Sillage (angenehm, nicht aufdringlich)
- Flexibel (passt zu verschiedenen Outfits)
- Langlebig (mindestens 5 Stunden)

**Perfekte Düfte:**
- **Armaf Club de Nuit Lumière** – Zitrus, frisch, alltäglich
- **Maison Margiela Beach Walk** – Entspannt, tropical, casual
- **Heeley Sel Marin** – Vielseitig, zeitlos, für alle

**Tipp:** Dein Alltags-Duft sollte dein „Signature"-Duft sein. Dieser Duft wird dich definieren!

---

### Für Sport & Gym

**Anforderungen:**
- Frisch und spritzigm (motivierend)
- Schwache Sillage (nicht störend für andere)
- Kurzlebig (3–4 Stunden reicht)

**Perfekte Düfte:**
- **Acqua di Parma Blu Mediterraneo** – Zitrus, motivierend
- **Calvin Klein CK One** – Unisex, frisch, spritzig
- **Lacoste L.12.12 Blanc** – Frisch, leicht, belebend

**Tipp:** Verwende Eau de Cologne oder sehr leichte Eau de Toilette. Du wirst ohnehin schwitzen!

---

## Die Duft-Garderobe: Wie viele Düfte brauchst du?

| Szenario | Anzahl | Beispiel |
|----------|--------|---------|
| **Anfänger** | 2–3 Düfte | 1 tagsüber, 1 abends, 1 Allrounder |
| **Enthusiast** | 5–7 Düfte | 1 pro Saison + 1–2 Signature + 1 Alltag |
| **Sammler** | 10+ Düfte | Verschiedene Familien, Jahreszeiten, Anlässe |

**Unsere Empfehlung:** Starten mit **3 Düften**:
1. **Alltags-Duft** (tagsüber, Büro, Sport)
2. **Abend-Duft** (Date, Party, formale Events)
3. **Saison-Duft** (Winter- oder Sommerspezial)

---

## Fazit

Der **richtige Duft für den richtigen Anlass** macht den Unterschied zwischen gut riechen und großartig riechen aus. Es geht nicht darum, die teuresten Düfte zu haben, sondern die **richtigen für dich und deine Situation** zu wählen.

Mit diesem Guide kannst du sicher entscheiden, welcher Duft zu welchem Anlass passt. Beginne mit deinem Alltags-Duft, baue deine Sammlung auf, und bald wirst du für jeden Moment den perfekten Duft haben.

**Beginne mit unserem Quiz** — wir helfen dir, deinen Signature-Duft zu finden!
    `,
    seoTitle: 'Der richtige Duft für jeden Anlass — Büro, Date, Party, Hochzeit',
    seoDescription: 'Welcher Duft passt zu welchem Anlass? Unser Guide für Büro, Date, Party, Hochzeit & mehr.',
    publishedAt: '2024-03-10',
    readTime: 11,
    keywords: ['Duft nach Anlass', 'Büro-Düfte', 'Date-Düfte', 'Party-Düfte', 'Hochzeits-Düfte'],
  },
  {
    id: 'duftpyramide-erklaert',
    slug: 'duftpyramide-erklaert',
    title: 'Duftpyramide erklärt: Kopfnoten, Herznoten, Basisnoten',
    description: 'Verstehe die Olfactory Pyramid — wie Düfte funktionieren und warum sie sich verändern.',
    category: 'tips',
    content: `
# Duftpyramide erklärt: Kopfnoten, Herznoten, Basisnoten

Hast du schon mal bemerkt, dass ein Duft direkt nach dem Aufsprühen anders riecht als nach einer Stunde?

Das ist nicht deine Nase — es ist die **Duftpyramide** in Aktion. Ein großartiger Duft ist wie eine Oper: Er hat einen kraftvollen Anfang, einen emotionalen Mittelteil und einen langen, resonierenden Schluss.

Wenn du verstehst, wie die Duftpyramide funktioniert, wirst du viel bessere Dufte für dich auswählen können.

## Was ist die Duftpyramide?

Die **Duftpyramide** (auch „Olfactory Pyramid" genannt) ist eine Struktur, die zeigt, wie sich ein Duft im Laufe der Zeit entwickelt.

Ein Duft besteht aus **drei Schichten**:
1. **Kopfnoten** (Top Notes) – die ersten 5–15 Minuten
2. **Herznoten** (Heart Notes / Middle Notes) – 15 Minuten bis mehrere Stunden
3. **Basisnoten** (Base Notes) – 4–24+ Stunden

---

## Die 3 Ebenen der Duftpyramide

### 1. Kopfnoten (Top Notes) – Der erste Eindruck

**Zeitraum:** 5–15 Minuten nach dem Aufsprühen
**Anteil:** ~10% der Duftmischung
**Funktion:** Der Opener, der Hook, der erste Eindruck

**Charakteristiken:**
- **Flüchtig** — verdunsten schnell, da sie leichte Moleküle sind
- **Spritzige, helle Noten** — meist Zitrusfrüchte, Grüne Noten, Minze
- **Der „Wow"-Moment** — sollen dich verführen
- **Energetisch und erfrischend**

**Typische Kopfnoten:**
- **Zitrusfrüchte:** Bergamotte, Zitrone, Grapefruit, Orange, Limette
- **Würzige Noten:** Schwarzer Pfeffer, Kardamom, Nelke
- **Grüne Noten:** Basilikum, Minze, Galbanum
- **Fruchtbar:** Ananas, Birne, Apple, Erdbeere

**Beispiel:** Direkt nach dem Aufsprühen von **Dior Sauvage** riechst du das frische Bergamotte-Aroma — das sind die Kopfnoten!

---

### 2. Herznoten (Heart Notes) – Der Körper des Dufts

**Zeitraum:** 15 Minuten bis zu 4–6 Stunden
**Anteil:** ~70% der Duftmischung
**Funktion:** Die Seele des Dufts, wo die wahre Persönlichkeit liegt

**Charakteristiken:**
- **Moderat flüchtig** — halten länger als Kopfnoten
- **Komplexe, elegante Noten** — meist blumig, würzig, fruchtig
- **Emotionaler Core** — definieren den Duft wirklich
- **Warm und reichhaltig**

**Typische Herznoten:**
- **Blumig:** Rose, Jasmin, Gardenie, Lilie, Orangenblüten
- **Würzig:** Zimt, Muskatnuss, Nelke, Safran
- **Fruchtig:** Kirsche, Pfirsich, Aprikose, Plaume
- **Aromatisch:** Kräuter, Rosmarin, Lavendel

**Beispiel:** Nach 15 Minuten, wenn die Bergamotte von **Dior Sauvage** verblasst ist, treten die **warmen Vanille-Herznoten** hervor — das ist der eigentliche Duft!

---

### 3. Basisnoten (Base Notes) – Der anhaltende Eindruck

**Zeitraum:** 4–24+ Stunden
**Anteil:** ~20% der Duftmischung
**Funktion:** Der Abschluss, der Schwanz des Dufts, die Langlebigkeit

**Charakteristiken:**
- **Sehr persistent** — verdunsten kaum, halten lange
- **Schwere Moleküle** — resistent gegen Verdunstung
- **Erdige, warme, süße Noten** — fundamentaler, tragfähig
- **Das „Geheimnis"** — was andere nach Stunden noch riechen

**Typische Basisnoten:**
- **Holzig:** Sandelholz, Zedernholz, Vetiver, Agarwood (Oud)
- **Moschus & Amber:** Moschus, Ambra, Ambroxan
- **Vanille & Süße:** Vanille, Kakaobutter, Tonkabohne
- **Harz & Animalisch:** Weihrauch, Myrrhe, Moschus, Castoreum

**Beispiel:** Nach 4 Stunden, wenn die Herznoten verblasst sind, bleiben die **tiefen Vanille- und Zedernholz-Basisnoten** von **Dior Sauvage** zurück — das ist das Fundament!

---

## Die Duftpyramide in Aktion: Ein Beispiel

Lass uns **Tom Ford Black Orchid** durchgehen:

```
         🔺
        / \
       /   \
      /TOP  \      15 min
     /  5%   \
    /_________ \
    |HEART    |     1–4 Stunden
    | 70%     |
    |   Rose  |
    | Zimt    |
    |_________|
    |BASE     |     4–24+ Stunden
    |  20%    |
    | Sandelh.|
    | Vanille |
    |_________|
```

### Timeline:

- **0–5 min:** Du riechst **Schwarze Orchidee, Fresia, Kardamom** (Top)
- **5–15 min:** Der Duft entwickelt sich zu **Rose, Zimt, Gewürzen** (Heart)
- **15 min – 4h:** Die **würzigen Herznoten** dominieren — der "main event"
- **4h+:** Die **Sandelholz- und Vanille-Basisnoten** bleiben — ein warmes, zartes Aroma

---

## Warum ist das wichtig?

### 1. Richtige Erwartungen setzen
Wenn du einen Duft kaufst, weil dir die **Kopfnoten** gefallen, aber die **Herznoten** dir nicht gefallen, wirst du enttäuscht sein. Teste Düfte **mindestens 1 Stunde lang**, um die Herznoten zu erleben!

### 2. Dufte auswählen basierend auf deine Bedürfnisse
- **Kopfnoten wichtig?** → Wähle einen Duft mit kraftvollen Top Notes
- **Langlebigkeit wichtig?** → Schau auf die Basisnoten
- **Emotionaler Anschluss?** → Die Herznoten sind am wichtigsten

### 3. Dufte kombinieren (Layering)
Versierte Duft-Sammler kombinieren mehrere Düfte auf einmal, um neue "Pyramiden" zu erstellen!

---

## Kopfnoten vs. Herznoten vs. Basisnoten: Schnellvergleich

| Ebene | Dauer | Anteil | Funktion | Volatilität |
|-------|-------|--------|----------|------------|
| **Top** | 5–15 min | 10% | Opener | Sehr flüchtig |
| **Heart** | 15 min–4h | 70% | Seelenm | Moderat |
| **Base** | 4–24h | 20% | Ankerage | Sehr persistent |

---

## Tipps zum Testen von Düften

### 1. Gib dem Duft Zeit
- Sprühe auf eine test-Karte oder Pulsbereich
- Warte **mindestens 15 Minuten**, bevor du urteilst
- Begegne den Herznoten — das ist der echte Duft

### 2. Schreibe auf, wie sich der Duft entwickelt
- **0 min:** Kopfnoten — was riechst du?
- **15 min:** Herznoten — hat sich der Duft verändert?
- **1h, 2h, 4h:** Basisnoten — was bleibt?

### 3. Duft auf Haut testen
- Kartenm gibt dir einen ersten Eindruck
- **Aber:** Auf deiner Haut reagiert der Duft mit deinen Körperchemikalien — das Ergebnis ist individuell!

---

## Fazit

Die **Duftpyramide** ist das Grundkonzept zum Verstehen von Düften. Ein großartiger Duft hat:
- Eine starke, verführerische **Kopfnote**
- Eine emotionale, reiche **Herznote**
- Eine langlebige, warme **Basisnote**

Wenn du die Duftpyramide verstehst, wirst du:
- Bessere Düfte auswählen können
- Deine Lieblingsdüfte besser schätzen
- Neue Düfte mit realistischen Erwartungen testen

**Beginne mit unserem Quiz** — wir zeigen dir die Duftpyramiden deiner perfekten Matches!
    `,
    seoTitle: 'Duftpyramide erklärt — Kopfnoten, Herznoten, Basisnoten',
    seoDescription: 'Verstehe, wie Düfte funktionieren: Die Olfactory Pyramid mit Top Notes, Heart Notes & Base Notes.',
    publishedAt: '2024-04-05',
    readTime: 10,
    keywords: ['Duftpyramide', 'Kopfnoten', 'Herznoten', 'Basisnoten', 'Olfactory Pyramid'],
  },
];

export function getGuideBySlug(slug: string): Guide | undefined {
  return guides.find(guide => guide.slug === slug);
}

export function getAllGuides(): Guide[] {
  return guides;
}

export function getGuidesByCategory(category: Guide['category']): Guide[] {
  return guides.filter(guide => guide.category === category);
}
