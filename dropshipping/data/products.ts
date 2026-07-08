/**
 * Kuratierter Produktkatalog: bewährte und kommende Dropshipping-Produkte,
 * bewertet für den Schweizer Markt. Alle Angaben sind ehrliche Richtwerte
 * (Preise/Lieferzeiten schwanken je nach Lieferant und Saison).
 */

export type Trend = "Im Trend" | "Kommender Trend" | "Dauerbrenner";

export type Product = {
  slug: string;
  name: string;
  niche: string; // Nischen-Slug aus data/niches.ts
  emoji: string;
  short: string;
  description: string;
  trend: Trend;
  score: number; // 0–100: Gesamtbewertung für Einsteiger im CH-Markt
  buyPriceChf: [number, number]; // Einkauf inkl. Versand (Richtwert)
  sellPriceChf: [number, number]; // realistischer Verkaufspreis in CH
  deliveryDays: string;
  suppliers: string[]; // Slugs aus data/suppliers.ts
  pros: string[];
  cons: string[];
  qualityChecks: string[];
  videoIdea: string;
  season: string;
  targetAudience: string;
};

export const PRODUCTS: Product[] = [
  // ------------------------------------------------------------- Haustiere
  {
    slug: "led-leuchthalsband",
    name: "LED-Leuchthalsband für Hunde",
    niche: "haustiere",
    emoji: "🐕",
    short: "USB-aufladbares Leuchthalsband – Sicherheit beim Abendspaziergang.",
    description:
      "Ein wiederaufladbares Halsband, das im Dunkeln leuchtet. Löst ein echtes Problem (Sichtbarkeit im Winterhalbjahr), ist leicht zu versenden und in Demo-Videos sofort verständlich – der Wow-Effekt ist im Video in einer Sekunde erklärt.",
    trend: "Dauerbrenner",
    score: 88,
    buyPriceChf: [4, 8],
    sellPriceChf: [19, 29],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage (teils EU-Lager 3–8 Tage)",
    suppliers: ["aliexpress", "cj-dropshipping"],
    pros: [
      "Echtes Sicherheitsproblem wird gelöst – leichter Verkaufsanlass",
      "Klein und leicht: tiefe Versandkosten, kaum Bruchgefahr",
      "Saisonaler Nachfrage-Schub Oktober–Februar (früh dunkel)",
      "Starke Marge (3–5×) bei tiefem Einkaufspreis",
    ],
    cons: [
      "Viele Anbieter – du gewinnst über Video-Marketing, nicht über den Preis",
      "Billigvarianten haben schwache Akkus oder undichte Nähte",
      "Grössen (S/M/L) erhöhen Retouren-Risiko – Grössentabelle in den Shop!",
    ],
    qualityChecks: [
      "Muster bestellen und Akku testen: Leuchtdauer sollte 4+ Stunden sein",
      "USB-C statt Micro-USB bevorzugen (wirkt moderner, weniger Defekte)",
      "Verschluss und Naht kräftig ziehen – reisst nichts, ist es verkaufbar",
      "Auf IP-Angabe achten (mind. spritzwassergeschützt für Regen)",
    ],
    videoIdea:
      "Abendspaziergang gefilmt: erst Hund kaum sichtbar, dann Halsband an – sofortiger Wow-Moment. Text-Overlay: «Sicher durch den Winter 🐾»",
    season: "Herbst/Winter (ganzjährig verkaufbar)",
    targetAudience: "Hundebesitzer:innen, die früh morgens oder abends Gassi gehen",
  },
  {
    slug: "selbstreinigende-tierhaarbuerste",
    name: "Selbstreinigende Tierhaarbürste",
    niche: "haustiere",
    emoji: "🐱",
    short: "Bürste mit Knopf: Haare lösen sich auf Knopfdruck – befriedigend anzusehen.",
    description:
      "Eine Zupfbürste für Hunde und Katzen, bei der sich die gesammelten Haare per Knopfdruck lösen. Das Reinigungs-Video ist extrem «satisfying» und läuft auf TikTok hervorragend – ideale Kombination aus Alltagsproblem und Show-Effekt.",
    trend: "Dauerbrenner",
    score: 85,
    buyPriceChf: [3, 6],
    sellPriceChf: [15, 25],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage",
    suppliers: ["aliexpress", "cj-dropshipping"],
    pros: [
      "«Satisfying»-Faktor: der Knopfdruck-Moment trägt das ganze Video",
      "Jeder Katzen-/Hundehaushalt ist Zielgruppe – riesiger Markt",
      "Günstiger Einkauf, stabile 3–4× Marge",
      "Kein Verfallsdatum, keine Grössen, kaum Retouren",
    ],
    cons: [
      "Produkt ist bekannt – Differenzierung über Branding/Bundles nötig",
      "Sehr billige Kopien haben stumpfe Borsten (kratzt das Tier)",
    ],
    qualityChecks: [
      "Muster an eigenem Arm testen: Borsten dürfen nicht schmerzhaft kratzen",
      "Auslöse-Mechanik 50× drücken – klemmt nichts, passt die Qualität",
      "Griff auf Stabilität prüfen (kein Knarzen)",
    ],
    videoIdea:
      "Katze wird gebürstet, Kamera zoomt auf die volle Bürste, Knopfdruck – Haarballen fällt ab. Caption: «Warum wusste ich das nicht früher?»",
    season: "Ganzjährig (Fellwechsel Frühling/Herbst besonders stark)",
    targetAudience: "Katzen- und Hundebesitzer:innen mit Haar-Problem auf Sofa & Kleidung",
  },
  {
    slug: "hunde-trinkflasche",
    name: "2-in-1 Hunde-Trinkflasche für unterwegs",
    niche: "haustiere",
    emoji: "💧",
    short: "Flasche mit integrierter Trinkschale – für Wanderungen und Sommer.",
    description:
      "Eine tragbare Wasserflasche mit ausklappbarer Trinkschale für Hunde. In der wander-verrückten Schweiz ein perfektes Sommer- und Outdoor-Produkt mit klarer Zielgruppe.",
    trend: "Im Trend",
    score: 82,
    buyPriceChf: [4, 9],
    sellPriceChf: [19, 32],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage",
    suppliers: ["aliexpress", "cj-dropshipping"],
    pros: [
      "Passt perfekt zur Schweiz (Wandern, Seen, Sommer)",
      "Nutzen im Video in 3 Sekunden erklärt",
      "Gutes Bundle-Potenzial (z. B. mit faltbarem Napf)",
    ],
    cons: [
      "Stark saisonal (April–September)",
      "Dichtigkeit ist das Qualitätsrisiko Nr. 1",
      "Etwas grösser/schwerer im Versand als andere Pet-Produkte",
    ],
    qualityChecks: [
      "Muster gefüllt über Nacht kopfüber lagern – kein Tropfen darf austreten",
      "Material prüfen: BPA-frei sollte vom Lieferanten belegt sein",
      "Ventil/Knopf mehrfach betätigen – Wasserfluss muss dosierbar sein",
    ],
    videoIdea:
      "Wanderung mit Hund, Hund hechelt, Flasche raus, Knopf drücken, Hund trinkt – Text: «Der Sommer-Gamechanger für Hundebesitzer»",
    season: "Frühling/Sommer",
    targetAudience: "Aktive Hundebesitzer:innen (Wandern, Joggen, Reisen)",
  },

  // ---------------------------------------------------------- Home & Living
  {
    slug: "sunset-lampe",
    name: "Sunset-Lampe (Sonnenuntergangs-Projektor)",
    niche: "home-living",
    emoji: "🌅",
    short: "Projiziert warmes Sonnenuntergangslicht – der TikTok-Deko-Klassiker.",
    description:
      "Eine kleine Lampe, die einen goldenen Sonnenuntergangs-Kreis an die Wand projiziert. Extrem fotogen: Das Produkt IST der Content. Ideal für «Aesthetic»-Videos und als Geschenk.",
    trend: "Im Trend",
    score: 80,
    buyPriceChf: [5, 10],
    sellPriceChf: [25, 39],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage (teils EU-Lager)",
    suppliers: ["aliexpress", "cj-dropshipping"],
    pros: [
      "Visuell perfekt für TikTok/Instagram – Videos produzieren sich fast von selbst",
      "Hohe wahrgenommene Wertigkeit → gute Marge",
      "Starkes Geschenk-Produkt (Weihnachten, Geburtstage, Einzug)",
    ],
    cons: [
      "Trend läuft schon länger – Konkurrenz vorhanden",
      "Elektroartikel: USB-Betrieb wählen, damit kein CH-Steckerproblem entsteht",
      "Billigversionen haben wackelige Gelenke und schwache LEDs",
    ],
    qualityChecks: [
      "USB-betriebene Variante wählen (kein Netzstecker-Thema, Typ J)",
      "CE-Kennzeichnung beim Lieferanten bestätigen lassen",
      "Muster: Gelenk muss die Position halten, Lichtkreis scharf abbilden",
    ],
    videoIdea:
      "Zimmer normal beleuchtet → Lampe an → goldenes Licht + Musikwechsel. Caption: «POV: dein Zimmer um 19:00». Keine Worte nötig.",
    season: "Ganzjährig (stark im Herbst/Winter und vor Weihnachten)",
    targetAudience: "18–30, «Room Aesthetic»-Community, Geschenkkäufer:innen",
  },
  {
    slug: "sternenhimmel-projektor",
    name: "Sternenhimmel-/Galaxy-Projektor",
    niche: "home-living",
    emoji: "🌌",
    short: "Verwandelt das Schlafzimmer in eine Galaxie – Geschenk-Bestseller.",
    description:
      "Ein Projektor, der Sterne und Nebel an Decke und Wände wirft, oft mit Fernbedienung und Timer. Seit Jahren ein verlässlicher Seller mit Peak im Weihnachtsgeschäft.",
    trend: "Dauerbrenner",
    score: 78,
    buyPriceChf: [8, 15],
    sellPriceChf: [35, 55],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage · BigBuy 3–7 Tage",
    suppliers: ["aliexpress", "cj-dropshipping", "bigbuy"],
    pros: [
      "Bewährter Geschenk-Klassiker mit hohem Warenkorb (CHF 35–55)",
      "Beeindruckende Videos ohne Aufwand (dunkles Zimmer + Projektor)",
      "Zielgruppen: Teenager, Paare, Eltern (Kinderzimmer) – breit",
    ],
    cons: [
      "Höherer Einkaufspreis = mehr Kapital pro Testbestellung",
      "Technik kann ausfallen (Motor, Fernbedienung) – Händler sorgfältig wählen",
      "Weihnachts-Peak heisst: Lieferzeiten im Dezember einkalkulieren (bis Mitte Nov. bewerben)",
    ],
    qualityChecks: [
      "Muster 3 Stunden laufen lassen: kein Überhitzen, kein Lüfterlärm",
      "Fernbedienung + alle Modi durchtesten",
      "USB-Betrieb oder Netzteil? Bei Netzteil CH-kompatibel (Typ J/USB) klären",
    ],
    videoIdea:
      "«Ich habe das Zimmer meiner Tochter überrascht» – Tür auf, Galaxie an der Decke, Kind staunt. Emotion + Produkt in einem Take.",
    season: "Ganzjährig, Peak Oktober–Dezember",
    targetAudience: "Geschenkkäufer:innen, Eltern, 16–35 «Cozy Room»-Fans",
  },
  {
    slug: "kabellose-led-spots",
    name: "Kabellose LED-Spots mit Fernbedienung",
    niche: "home-living",
    emoji: "💡",
    short: "Aufklebbare Akku-Spots für Regale und Flure – Mietwohnungs-Hit.",
    description:
      "Batterie-/Akku-LED-Spots zum Aufkleben, dimmbar per Fernbedienung. Perfekt für die Schweiz als Mieterland: Licht ohne Bohren und ohne Elektriker.",
    trend: "Kommender Trend",
    score: 81,
    buyPriceChf: [6, 12],
    sellPriceChf: [25, 45],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage",
    suppliers: ["aliexpress", "cj-dropshipping"],
    pros: [
      "Löst echtes Mieter-Problem (kein Bohren) – starkes Verkaufsargument in CH",
      "Sets (3er/6er) erhöhen den Warenkorb",
      "Vorher/Nachher-Videos (dunkles Regal → beleuchtet) wirken stark",
    ],
    cons: [
      "Klebekraft ist das Reklamationsrisiko – Qualität entscheidend",
      "Batteriebetrieb kann Kund:innen abschrecken → USB-aufladbare Variante wählen",
    ],
    qualityChecks: [
      "Klebepads an Tapete/Holz testen: hält 1 Woche ohne Abfallen?",
      "Leuchtdauer pro Ladung messen (sollte 3+ Stunden Dauerlicht sein)",
      "Fernbedienungs-Reichweite durch eine Wand testen",
    ],
    videoIdea:
      "Zeitraffer: dunkle Vitrine/Regal → Spots aufkleben → Licht an, Raum wirkt hochwertig. Text: «Ohne Bohren. Ohne Elektriker.»",
    season: "Ganzjährig, stark im Herbst/Winter",
    targetAudience: "Mieter:innen 20–45, Deko-Fans, Wohnungs-Neueinrichter",
  },

  // -------------------------------------------------------- Beauty & Selfcare
  {
    slug: "heatless-curls-set",
    name: "Heatless Curls Set (Lockenband ohne Hitze)",
    niche: "beauty-selfcare",
    emoji: "🌀",
    short: "Locken über Nacht ohne Hitzeschäden – Social-Media-Dauertrend.",
    description:
      "Ein weiches Band plus Scrunchies: abends eindrehen, morgens Locken – ganz ohne Hitze. Das Vorher/Nachher-Format liefert das Video-Skript gratis mit.",
    trend: "Im Trend",
    score: 84,
    buyPriceChf: [2, 5],
    sellPriceChf: [15, 25],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage",
    suppliers: ["aliexpress", "cj-dropshipping"],
    pros: [
      "Sehr günstiger Einkauf → Marge 4–5×",
      "Vorher/Nachher-Content funktioniert immer wieder",
      "Leicht, unzerbrechlich, keine Elektronik – minimale Versandprobleme",
      "Kein Grössen-/Farbrisiko (2–3 Farben reichen)",
    ],
    cons: [
      "Ergebnis hängt vom Haartyp ab – ehrlich kommunizieren, sonst Retouren",
      "Markt ist sichtbar besetzt – Branding/Set-Idee (z. B. + Seidenhaube) hilft",
    ],
    qualityChecks: [
      "Material: Satin/Seidenimitat muss weich sein, keine kratzenden Nähte",
      "Selbst (oder Freundin) eine Nacht testen und Ergebnis fotografieren",
      "Scrunchies-Gummis auf Spannkraft prüfen",
    ],
    videoIdea:
      "Abendroutine: Haare eindrehen (Zeitraffer), Schnitt: morgens Band lösen – Locken fallen. Caption: «0 Grad Hitze. Dieses Ergebnis.»",
    season: "Ganzjährig",
    targetAudience: "Frauen 16–40 mit mittellangem/langem Haar, TikTok/IG-affin",
  },
  {
    slug: "gua-sha-set",
    name: "Gua Sha & Roller Set (Naturstein)",
    niche: "beauty-selfcare",
    emoji: "🪨",
    short: "Gesichtsmassage-Set – Selfcare-Ritual mit Geschenk-Potenzial.",
    description:
      "Massagestein und Roller aus Naturstein für die Gesichtspflege-Routine. Verkauft sich als Ritual und Geschenk – hochwertige Verpackung macht hier den Unterschied.",
    trend: "Dauerbrenner",
    score: 76,
    buyPriceChf: [3, 7],
    sellPriceChf: [19, 35],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage",
    suppliers: ["aliexpress", "cj-dropshipping"],
    pros: [
      "Etabliertes Selfcare-Produkt mit ruhiger, schöner Video-Ästhetik",
      "Sehr gutes Geschenk-Bundle (Set + Anleitung + schöne Box)",
      "Keine Elektronik, keine Grössen, leicht zu versenden",
    ],
    cons: [
      "Keine medizinischen Versprechen machen («strafft», «Anti-Aging» vorsichtig formulieren)",
      "Billige Sets kommen zerkratzt oder gebrochen an – Verpackung prüfen",
      "Markt gesättigt – Präsentation/Marke muss hochwertig wirken",
    ],
    qualityChecks: [
      "Muster: Stein auf Kratzer/Absplitterungen prüfen, Roller muss leise laufen",
      "Verpackung testweise schütteln – kommt es heil an?",
      "Beim Lieferanten fragen, ob echter Stein (z. B. Jade/Rosenquarz) oder Glas – ehrlich deklarieren",
    ],
    videoIdea:
      "Ruhige Morgenroutine-Ästhetik: Tageslicht, Serum, Gua-Sha-Züge am Kiefer. Text: «5 Minuten nur für dich.» Verkauft das Ritual, nicht den Stein.",
    season: "Ganzjährig, Peak vor Weihnachten & Muttertag",
    targetAudience: "Frauen 20–50, Selfcare- und Skincare-Community",
  },
  {
    slug: "kopfhaut-massageduscheburste",
    name: "Kopfhaut-Massagebürste (Shampoo-Bürste)",
    niche: "beauty-selfcare",
    emoji: "🚿",
    short: "Silikon-Massagebürste für die Dusche – günstig, nützlich, ASMR-tauglich.",
    description:
      "Eine Silikonbürste zur Kopfhautmassage beim Haarewaschen. Winziger Einkaufspreis, spürbarer Wohlfühl-Nutzen und ideal als Warenkorb-Ergänzung («Kund:innen kauften auch …»).",
    trend: "Dauerbrenner",
    score: 74,
    buyPriceChf: [1, 3],
    sellPriceChf: [9, 15],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage",
    suppliers: ["aliexpress", "cj-dropshipping"],
    pros: [
      "Extrem günstiger Einkauf – ideal als Zusatzprodukt zur Warenkorb-Erhöhung",
      "Unkaputtbar im Versand, keine Varianten, keine Retourengründe",
      "ASMR-/Satisfying-Videos (Schaum + Massage) laufen gut",
    ],
    cons: [
      "Als Einzelprodukt zu kleiner Warenkorb – besser im Bundle verkaufen",
      "Sehr austauschbar, kaum Markenbindung",
    ],
    qualityChecks: [
      "Borsten müssen fest, aber angenehm sein (am Unterarm testen)",
      "Griff nass testen – darf nicht aus der Hand rutschen",
    ],
    videoIdea:
      "ASMR-Duschszene (nur Haare + Schaum), Massage in Zeitlupe. Caption: «Der beste Teil vom Tag.» Als Bundle mit Heatless Curls bewerben.",
    season: "Ganzjährig",
    targetAudience: "Alle mit Haaren 😉 – primär Frauen 18–45",
  },

  // ---------------------------------------------------------- Fitness & Sport
  {
    slug: "widerstandsbaender-set",
    name: "Widerstandsbänder-Set (5 Stärken + Tasche)",
    niche: "fitness-sport",
    emoji: "🏋️",
    short: "Das Home-Workout-Basisprodukt – leicht, günstig, immer gefragt.",
    description:
      "Ein Set aus fünf Fitnessbändern in verschiedenen Stärken inkl. Tragebeutel. Der Klassiker für Home-Workouts: federleicht im Versand und mit riesiger, ständig nachwachsender Zielgruppe.",
    trend: "Dauerbrenner",
    score: 83,
    buyPriceChf: [3, 6],
    sellPriceChf: [19, 29],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage (oft EU-Lager)",
    suppliers: ["aliexpress", "cj-dropshipping", "bigbuy"],
    pros: [
      "Riesiger Dauermarkt + Neujahrs-Peak (Vorsätze!)",
      "Federleicht: minimale Versandkosten, keine Bruchgefahr",
      "Content unerschöpflich: jede Übung ist ein neues Video",
      "Set-Charakter rechtfertigt guten Preis",
    ],
    cons: [
      "Sehr viel Konkurrenz inkl. grosser Marken",
      "Billig-Latex kann reissen oder stark riechen",
    ],
    qualityChecks: [
      "Muster stark dehnen (3× Länge) – keine weissen Stressstellen, kein Riss",
      "Geruchstest: starker Chemiegeruch = schlechtes Latex, Finger weg",
      "Stärken-Beschriftung prüfen (light/medium/heavy korrekt?)",
    ],
    videoIdea:
      "«3 Übungen für zuhause, die das Fitnessstudio ersetzen» – 20-Sekunden-Demo mit Text-Overlays pro Übung. Januar-Version: «Neues Jahr, 19 Franken.»",
    season: "Ganzjährig, Peak Januar & Frühling",
    targetAudience: "Home-Workout-Einsteiger:innen 20–50",
  },
  {
    slug: "akupressur-matte",
    name: "Akupressur-Matte mit Kissen",
    niche: "fitness-sport",
    emoji: "🧘",
    short: "Entspannungs-Matte für Rücken & Nacken – Regeneration ist der neue Fitness-Trend.",
    description:
      "Eine Matte mit tausenden Kunststoff-Spitzen für Entspannung nach Sport oder Bürotag. Der Regenerations-/Recovery-Trend wächst stetig – und die Matte ist erklärungsfreundlicher Content («10 Minuten am Tag»).",
    trend: "Kommender Trend",
    score: 79,
    buyPriceChf: [8, 14],
    sellPriceChf: [35, 55],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage · BigBuy 3–7 Tage",
    suppliers: ["aliexpress", "cj-dropshipping", "bigbuy"],
    pros: [
      "Recovery/Entspannung wächst als Trend (Büro-Zielgruppe + Sportler)",
      "Hoher Warenkorb (CHF 35–55) bei moderatem Einkauf",
      "Erfahrungs-Content («7 Tage getestet») funktioniert stark",
    ],
    cons: [
      "Etwas grösser im Versand (Paket statt Grossbrief)",
      "Keine Heilversprechen machen (nur «Entspannung», nicht «heilt Rückenschmerzen»)",
      "Erklärungsbedürftiger als reine Gadgets",
    ],
    qualityChecks: [
      "Spitzen-Platten dürfen sich nicht vom Stoff lösen (Ecken testen)",
      "Bezug abnehmbar/waschbar? Grosses Verkaufsargument",
      "Selbst 10 Minuten testen – Intensität ehrlich beschreiben",
    ],
    videoIdea:
      "«Ich habe die Nadel-Matte 7 Tage getestet» – Tag 1 Skepsis (Gesicht!), Tag 7 Entspannung. Ehrliches Erfahrungsformat baut Vertrauen auf.",
    season: "Ganzjährig, Peak Januar & Herbst",
    targetAudience: "Sportler:innen + Büromenschen 25–55 mit Verspannungen",
  },
  {
    slug: "faszienrolle-set",
    name: "Faszienrollen-Set (Rolle + Ball + Band)",
    niche: "fitness-sport",
    emoji: "🌀",
    short: "Regenerations-Set für Sportler – Bundle mit gutem Warenkorb.",
    description:
      "Ein Set aus Faszienrolle, Massageball und Stretching-Band. Bewährtes Produkt mit Set-Vorteil: Als Bundle hebt es sich von Einzelrollen im Detailhandel ab.",
    trend: "Dauerbrenner",
    score: 75,
    buyPriceChf: [7, 12],
    sellPriceChf: [29, 45],
    deliveryDays: "AliExpress 12–20 Tage · CJ 8–15 Tage (voluminöser Artikel)",
    suppliers: ["aliexpress", "cj-dropshipping", "bigbuy"],
    pros: [
      "Set-Angebot differenziert vom Einzelprodukt im Laden",
      "Stabile Nachfrage von Läufer:innen, Gym-Gänger:innen, Wanderern",
      "Anleitung/Übungsplan als PDF-Beilage = Gratis-Mehrwert mit Wow-Effekt",
    ],
    cons: [
      "Voluminös → höhere Versandkosten, Marge genau rechnen",
      "Schaum-Qualität schwankt (zu weich = nutzlos, bröckelt)",
    ],
    qualityChecks: [
      "Rolle mit vollem Körpergewicht testen – darf sich nicht dauerhaft eindrücken",
      "Kanten/Noppen auf saubere Verarbeitung prüfen",
      "Geruchstest nach dem Auspacken",
    ],
    videoIdea:
      "«Nach dem Joggen: 5 Minuten, die deine Beine dir danken» – Rollen-Demo mit ehrlichem Verziehen des Gesichts (relatable = Kommentare).",
    season: "Ganzjährig, Peak Frühling (Laufsaison)",
    targetAudience: "Läufer:innen, Wanderer, Kraftsportler 20–55",
  },

  // -------------------------------------------------------- Küche & Haushalt
  {
    slug: "multi-gemueseschneider",
    name: "Multi-Gemüseschneider (12-in-1)",
    niche: "kueche-haushalt",
    emoji: "🥕",
    short: "Würfeln, hobeln, reiben in Sekunden – der Demo-Video-König.",
    description:
      "Ein Schneide-Set mit Wechselklingen und Auffangbehälter. Das Produkt lebt von der Demo: Zwiebel rein, Deckel drücken, perfekte Würfel – schneller lässt sich Nutzen nicht zeigen.",
    trend: "Dauerbrenner",
    score: 86,
    buyPriceChf: [6, 11],
    sellPriceChf: [29, 45],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage (teils EU-Lager)",
    suppliers: ["aliexpress", "cj-dropshipping", "bigbuy"],
    pros: [
      "Demo-Videos konvertieren extrem gut (sichtbare Zeitersparnis)",
      "Breiteste Zielgruppe: jeder Haushalt",
      "Set mit Zubehör rechtfertigt CHF 29–45",
      "Ganzjährige Nachfrage, Geschenk-tauglich",
    ],
    cons: [
      "Klingenqualität entscheidet über Bewertungen – billige Sets werden stumpf",
      "Viele Einzelteile = mehr potenzielle Bruch-/Fehlteile",
      "Bekanntes Produkt – gutes Video schlägt hier den Preis",
    ],
    qualityChecks: [
      "Härtetest: rohe Rüebli schneiden – Klinge darf nicht ausweichen oder splittern",
      "Material: BPA-frei/lebensmittelecht vom Lieferanten bestätigen lassen (LFGB-Zertifikat fragen)",
      "Alle Einsätze auf Passform prüfen (nichts darf wackeln)",
      "Spülmaschinentest mit dem Muster machen",
    ],
    videoIdea:
      "Split-Screen: links Zwiebel mit Messer (Tränen), rechts der Schneider (2 Sekunden). Text: «Warum weinst du noch?» – Humor + Nutzen.",
    season: "Ganzjährig, Peak vor Weihnachten",
    targetAudience: "Alle, die kochen – speziell Familien & Meal-Prep-Fans",
  },
  {
    slug: "elektrischer-milchaufschaeumer",
    name: "Elektrischer Milchaufschäumer (Akku)",
    niche: "kueche-haushalt",
    emoji: "☕",
    short: "Barista-Schaum zuhause – reitet auf der riesigen Kaffee-Welle.",
    description:
      "Ein USB-aufladbarer Aufschäumer für Milch und Proteinshakes. Die Home-Café-Bewegung (Dalgona, Iced Latte, Matcha) liefert unendlich Content-Anlässe.",
    trend: "Im Trend",
    score: 80,
    buyPriceChf: [4, 9],
    sellPriceChf: [19, 35],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage",
    suppliers: ["aliexpress", "cj-dropshipping"],
    pros: [
      "Home-Café-Trend ist gross und stabil (TikTok: #cafeathome)",
      "Ästhetischer Content: Schaum, Latte Art, Morgenroutine",
      "Klein, leicht, gute Marge",
    ],
    cons: [
      "Motorqualität schwankt – schwache Geräte schaffen keine Hafermilch",
      "Elektronik: Ladeanschluss und Akku sind Ausfallpunkte",
    ],
    qualityChecks: [
      "Muster mit kalter Hafermilch testen (härtester Fall) – fester Schaum in 30 Sek.?",
      "USB-C-Ladung bevorzugen, Akkulaufzeit prüfen",
      "Quirl-Aufsatz muss fest sitzen und rostfrei sein (Edelstahl)",
    ],
    videoIdea:
      "Morgenroutine-Ästhetik: Eiswürfel, Espresso, Schaum on top in Zeitlupe. Caption: «Dein Café verlangt 7 Franken dafür.»",
    season: "Ganzjährig (Iced-Drinks im Sommer, warm im Winter)",
    targetAudience: "Kaffee- & Matcha-Fans 18–40, Home-Café-Community",
  },
  {
    slug: "silikon-frischhaltedeckel",
    name: "Dehnbare Silikon-Frischhaltedeckel (Set)",
    niche: "kueche-haushalt",
    emoji: "🥗",
    short: "Zero-Waste-Alternative zu Frischhaltefolie – Nachhaltigkeit verkauft.",
    description:
      "Wiederverwendbare, dehnbare Deckel für Schüsseln, Gläser und angeschnittenes Gemüse. Das Nachhaltigkeits-Argument («nie wieder Folie») trifft den Zeitgeist – besonders in der Schweiz.",
    trend: "Kommender Trend",
    score: 77,
    buyPriceChf: [3, 6],
    sellPriceChf: [15, 25],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage",
    suppliers: ["aliexpress", "cj-dropshipping"],
    pros: [
      "Nachhaltigkeits-Story = Gratis-Marketing-Winkel",
      "Leicht, unzerbrechlich, Set-Charakter",
      "Demo (Deckel über halbe Melone ziehen) ist satisfying",
    ],
    cons: [
      "Kleiner Warenkorb – gut als Bundle mit anderen Küchenhelfern",
      "Material MUSS lebensmittelecht sein (Zertifikat verlangen)",
    ],
    qualityChecks: [
      "Dehnung über eckige Schüssel testen – dichtet es wirklich ab?",
      "Lebensmittelechtheit (LFGB/FDA-Zertifikat) beim Lieferanten anfordern",
      "Spülmaschinen- und Gefriertest mit dem Muster",
    ],
    videoIdea:
      "«Dinge in meiner Küche, die Abfall ersetzen» Teil 1: Folie in den Müll (symbolisch), Deckel über Schüssel ploppen. Nachhaltigkeits-Community taggt sich selbst.",
    season: "Ganzjährig",
    targetAudience: "Nachhaltigkeitsbewusste Haushalte 25–55",
  },

  // ------------------------------------------------------------- Baby & Kids
  {
    slug: "meilenstein-decke",
    name: "Baby-Meilenstein-Decke (personalisierbar)",
    niche: "baby-kids",
    emoji: "👶",
    short: "Foto-Decke für Monats-Bilder – emotionales Geschenk, ideal per Print-on-Demand.",
    description:
      "Eine Decke mit Monats-Markierungen für Baby-Fotos (Monat 1–12). Als Print-on-Demand-Produkt personalisierbar (Name des Babys) – das hebt dich komplett von Massenware ab und umgeht Spielzeug-Vorschriften.",
    trend: "Dauerbrenner",
    score: 82,
    buyPriceChf: [12, 20],
    sellPriceChf: [39, 59],
    deliveryDays: "Print-on-Demand: 5–10 Tage (EU-Produktion)",
    suppliers: ["printful", "cj-dropshipping"],
    pros: [
      "Personalisierung (Babyname) = Alleinstellung + Premium-Preis",
      "Emotionales Geschenk (Geburt, Babyshower) – wird stolz fotografiert & geteilt",
      "Kein Spielzeug → deutlich weniger Vorschriften-Risiko",
      "Kundinnen posten die Fotos → Gratis-Werbung mit deinem Produkt",
    ],
    cons: [
      "Höherer Einkaufspreis (POD) → Marge pro Stück kleiner",
      "Design muss hochwertig sein (Canva-Vorlagen helfen)",
      "Personalisierte Ware ist vom Umtausch ausgeschlossen – klar kommunizieren",
    ],
    qualityChecks: [
      "Muster drucken lassen: Stoff auf Weichheit und Druckschärfe prüfen",
      "Waschtest 40 Grad – Druck darf nicht verblassen",
      "Öko-Tex-/Materialangaben des Druckpartners prüfen (Babyhaut!)",
    ],
    videoIdea:
      "Zeitraffer: Baby Monat 1 → Monat 12 auf derselben Decke. Emotionale Musik. Caption: «Es geht so schnell vorbei 🥹» – Eltern markieren Eltern.",
    season: "Ganzjährig (Geburten kennen keine Saison)",
    targetAudience: "Frische Eltern + Geschenkkäufer:innen (Grosseltern, Gotti/Götti)",
  },
  {
    slug: "tragbarer-flaschenwaermer",
    name: "Tragbarer USB-Flaschenwärmer",
    niche: "baby-kids",
    emoji: "🍼",
    short: "Wärmt Fläschchen unterwegs – löst ein echtes Eltern-Problem.",
    description:
      "Ein akku-/USB-betriebener Wärmer, der Babyfläschchen unterwegs auf Temperatur bringt. Eltern-Problemlöser mit klarer Video-Story (Ausflug, Auto, nachts).",
    trend: "Im Trend",
    score: 74,
    buyPriceChf: [8, 15],
    sellPriceChf: [29, 49],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage",
    suppliers: ["aliexpress", "cj-dropshipping"],
    pros: [
      "Echter Problemlöser → dankbare, kaufbereite Zielgruppe",
      "Eltern empfehlen einander Produkte aktiv weiter",
      "Guter Warenkorb (CHF 29–49)",
    ],
    cons: [
      "Technik + Babynähe = höchste Qualitätsansprüche (nur Top-Lieferanten)",
      "Temperaturgenauigkeit unbedingt selbst testen",
      "Akku-Versandauflagen beim Lieferanten klären",
    ],
    qualityChecks: [
      "Mit Thermometer nachmessen: erreicht und hält es die angezeigte Temperatur?",
      "Passform auf gängige Flaschen (Avent, NUK etc.) testen",
      "CE-Kennzeichnung zwingend bestätigen lassen",
      "Abschaltautomatik vorhanden? (Sicherheits-Verkaufsargument)",
    ],
    videoIdea:
      "Auto-Szene nachts: Baby weint, Fläschchen im Wärmer, Countdown-Text «3 Minuten später», Baby trinkt zufrieden. Jedes Elternteil fühlt dieses Video.",
    season: "Ganzjährig",
    targetAudience: "Eltern mit Babys 0–18 Monate, viel unterwegs",
  },

  // ------------------------------------------------------------ Tech & Gadgets
  {
    slug: "3in1-ladestation",
    name: "3-in-1 Ladestation (Handy, Watch, Kopfhörer)",
    niche: "tech-gadgets",
    emoji: "🔌",
    short: "Faltbare kabellose Ladestation – räumt den Nachttisch auf.",
    description:
      "Eine faltbare Station, die Smartphone, Smartwatch und Ear-Buds gleichzeitig kabellos lädt. Löst das Kabelsalat-Problem und sieht im Desk-Setup-Content hervorragend aus.",
    trend: "Im Trend",
    score: 79,
    buyPriceChf: [9, 16],
    sellPriceChf: [35, 55],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage",
    suppliers: ["aliexpress", "cj-dropshipping"],
    pros: [
      "Hoher Warenkorb, Premium-Anmutung",
      "Desk-Setup-/Nachttisch-Content ist eine aktive Community",
      "Reise-Format (faltbar) als zweites Verkaufsargument",
    ],
    cons: [
      "Kompatibilität (iPhone/Android/Watch-Modelle) exakt angeben – sonst Retouren",
      "Billige Module laden langsam oder werden heiss",
      "Kein Netzteil beilegen oder nur USB-C-Kabel (CH-Stecker-Thema umgehen)",
    ],
    qualityChecks: [
      "Ladeleistung real messen (Watt-Messgerät ~CHF 15) – hält es die Angabe?",
      "Wärmetest: nach 1 Stunde Laden darf nichts unangenehm heiss sein",
      "Mit iPhone UND Android testen, Watch-Kompatibilität klären",
      "CE-Kennzeichnung bestätigen lassen",
    ],
    videoIdea:
      "Nachttisch voller Kabel (Chaos) → alles weg, Station hin, drei Geräte drauf. Text: «Erwachsen werden heisst: Ordnung am Nachttisch.»",
    season: "Ganzjährig, Peak Weihnachten",
    targetAudience: "Apple-/Samsung-Nutzer:innen 20–45 mit mehreren Geräten",
  },
  {
    slug: "smarter-schluesselfinder",
    name: "Smarter Schlüsselfinder (Bluetooth-Tag)",
    niche: "tech-gadgets",
    emoji: "🔑",
    short: "Nie mehr Schlüssel suchen – App zeigt, wo er liegt.",
    description:
      "Ein Bluetooth-Anhänger, der verlegte Schlüssel per App piepen lässt. Universelles Problem, günstiger Preis, gutes Geschenk – und die Video-Story schreibt sich von selbst.",
    trend: "Dauerbrenner",
    score: 76,
    buyPriceChf: [4, 8],
    sellPriceChf: [19, 29],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage",
    suppliers: ["aliexpress", "cj-dropshipping"],
    pros: [
      "Jeder kennt das Problem – maximal breite Zielgruppe",
      "Klein und leicht im Versand",
      "Gutes «Wichteli»-/Weihnachtsgeschenk unter CHF 30",
    ],
    cons: [
      "App-Qualität der Billig-Tags schwankt stark – unbedingt selbst testen",
      "Batterietyp (Knopfzelle) angeben; Wechselbarkeit prüfen",
      "Apple AirTag ist bekannte Konkurrenz – Preisvorteil klar kommunizieren",
    ],
    qualityChecks: [
      "App selbst installieren: Verbindung, Reichweite (min. 20 m frei), Lautstärke testen",
      "Knopfzelle wechselbar? Laufzeit?",
      "Funktioniert es mit iOS UND Android?",
    ],
    videoIdea:
      "Morgens spät dran, Schlüssel weg, Panik (relatable!) → App drücken → Piepen aus der Jackentasche. Text: «Ich bin einfach nie wieder zu spät.»",
    season: "Ganzjährig, Peak Weihnachten",
    targetAudience: "Vergessliche 😄 – real: Pendler:innen, Familien, Senioren-Geschenk",
  },
  {
    slug: "magnetische-kfz-handyhalterung",
    name: "Magnetische Handy-Halterung fürs Auto",
    niche: "tech-gadgets",
    emoji: "🚗",
    short: "Ein Klick, Handy sitzt – Dauerbrenner mit Pendler-Zielgruppe.",
    description:
      "Eine starke Magnet-Halterung für Lüftung oder Armaturenbrett. In einem Pendlerland wie der Schweiz ein verlässlicher Dauerläufer mit einfacher Produkt-Demo.",
    trend: "Dauerbrenner",
    score: 73,
    buyPriceChf: [3, 7],
    sellPriceChf: [15, 29],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage",
    suppliers: ["aliexpress", "cj-dropshipping"],
    pros: [
      "Riesige Zielgruppe (Autofahrer:innen), ganzjährige Nachfrage",
      "Demo in 2 Sekunden: Klack – hält",
      "Klein, leicht, robust im Versand",
    ],
    cons: [
      "Sehr gesättigter Markt – nur mit starkem Video oder Bundle sinnvoll",
      "Haltekraft bei schweren Handys ist das Qualitätsrisiko",
    ],
    qualityChecks: [
      "Mit grossem Handy (z. B. iPhone Pro Max) über Kopfsteinpflaster testen",
      "Klebepad-Rückstände beim Entfernen prüfen (Mietauto-Argument)",
      "MagSafe-kompatibel? Falls ja, gross bewerben",
    ],
    videoIdea:
      "Schlagloch-Test: Kamera auf Halterung während holpriger Fahrt, Handy wackelt nicht. Text: «Der Härtetest.» Vertrauen durch Beweis.",
    season: "Ganzjährig",
    targetAudience: "Pendler:innen und Vielfahrer:innen 20–60",
  },
  {
    slug: "mini-etikettendrucker",
    name: "Mini-Etikettendrucker (Bluetooth)",
    niche: "tech-gadgets",
    emoji: "🏷️",
    short: "Taschendrucker für Etiketten & Sticker – Organisations-Trend trifft Gadget.",
    description:
      "Ein handlicher Thermodrucker, der per App Etiketten und kleine Sticker druckt. Trifft gleich zwei Communities: Organisations-Fans (#restock) und Studierende (Notizen, Planner).",
    trend: "Kommender Trend",
    score: 78,
    buyPriceChf: [10, 18],
    sellPriceChf: [35, 59],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage",
    suppliers: ["aliexpress", "cj-dropshipping"],
    pros: [
      "Organisations-/Restock-Content boomt seit Jahren stabil",
      "Folgekäufe! Etikettenrollen = wiederkehrender Umsatz",
      "Hoher Warenkorb, Geschenk-tauglich",
    ],
    cons: [
      "App-Qualität entscheidend (deutsche Sprache prüfen!)",
      "Thermopapier verblasst mit der Zeit – ehrlich für Deko/Orga positionieren, nicht für Dokumente",
      "Höherer Einkaufspreis für Testphase",
    ],
    qualityChecks: [
      "App auf Deutsch oder verständlichem Englisch? Selbst durchklicken",
      "Druckbild scharf? Muster mit kleinen Schriftgrössen testen",
      "Kompatible Ersatzrollen günstig verfügbar? (Folgegeschäft!)",
      "Akkulaufzeit und USB-C-Ladung prüfen",
    ],
    videoIdea:
      "Restock-&-Organize-Ästhetik: Vorratsgläser beschriften in Zeitraffer, befriedigendes End-Panorama. Caption: «Meine Küche > deine Küche.»",
    season: "Ganzjährig, Peak Back-to-School (August) & Januar",
    targetAudience: "Orga-Fans, Studierende, Bullet-Journal-Community 16–40",
  },
];

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function productsByNiche(nicheSlug: string): Product[] {
  return PRODUCTS.filter((p) => p.niche === nicheSlug).sort((a, b) => b.score - a.score);
}

export function topProducts(count: number): Product[] {
  return [...PRODUCTS].sort((a, b) => b.score - a.score).slice(0, count);
}

/** Durchschnittliche Marge als Text, z. B. «CHF 15–21 pro Verkauf». */
export function marginText(p: Product): string {
  const low = p.sellPriceChf[0] - p.buyPriceChf[1];
  const high = p.sellPriceChf[1] - p.buyPriceChf[0];
  return `ca. CHF ${low}–${high} pro Verkauf`;
}
