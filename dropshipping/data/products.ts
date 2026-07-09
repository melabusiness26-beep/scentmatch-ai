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
    slug: "schleckmatte",
    name: "Schleckmatte für Hunde & Katzen",
    niche: "haustiere",
    emoji: "🐾",
    short: "Beschäftigt das Tier beim Baden, Krallenschneiden oder als Snack-Spiel.",
    description:
      "Eine Silikonmatte mit Saugnäpfen, auf die Leckpaste gestrichen wird – das Tier ist minutenlang beschäftigt und entspannt. Löst echte Probleme (Baden, Tierarzt-Stress, Alleinsein) und liefert herzige Video-Momente.",
    trend: "Im Trend",
    score: 83,
    buyPriceChf: [2, 5],
    sellPriceChf: [12, 19],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage",
    suppliers: ["aliexpress", "cj-dropshipping"],
    pros: [
      "Sehr günstiger Einkauf, gute Marge, unkaputtbar im Versand",
      "Videos vom schleckenden Hund/Katze sind Klick-Magneten",
      "Perfektes Bundle-Produkt (z. B. mit Tierhaarbürste)",
    ],
    cons: [
      "Kleiner Warenkorb – besser im Set oder als Zusatzartikel",
      "Material muss lebensmittelecht sein (Zertifikat verlangen)",
    ],
    qualityChecks: [
      "Saugnäpfe an Duschwand testen – hält die Matte bei Zug?",
      "Lebensmittelechtes Silikon (LFGB/FDA) beim Lieferanten bestätigen lassen",
      "Spülmaschinentest mit dem Muster",
    ],
    videoIdea:
      "Hund beim Baden – vorher Panik, dann Schleckmatte an die Wand: Hund schleckt seelenruhig. Text: «Der Baden-Hack, den dein Hund liebt.»",
    season: "Ganzjährig",
    targetAudience: "Hunde- und Katzenbesitzer:innen, deren Tier Pflege stresst",
  },
  {
    slug: "katzen-trinkbrunnen",
    name: "Leiser Katzen-Trinkbrunnen",
    niche: "haustiere",
    emoji: "⛲",
    short: "Fliessendes Wasser animiert Katzen zum Trinken – Gesundheits-Argument inklusive.",
    description:
      "Ein leiser Wasserbrunnen mit Filter, der Katzen zum Trinken animiert (viele Katzen trinken zu wenig). Höherer Warenkorb, klarer Nutzen und laufende Folgekäufe durch Ersatzfilter.",
    trend: "Dauerbrenner",
    score: 78,
    buyPriceChf: [10, 18],
    sellPriceChf: [39, 59],
    deliveryDays: "AliExpress 12–20 Tage · CJ 8–15 Tage · BigBuy 3–7 Tage",
    suppliers: ["aliexpress", "cj-dropshipping", "bigbuy"],
    pros: [
      "Hoher Warenkorb (CHF 39–59) und echtes Gesundheits-Argument",
      "Folgegeschäft mit Ersatzfiltern (wiederkehrender Umsatz)",
      "ASMR-taugliche Videos (plätscherndes Wasser + Katze)",
    ],
    cons: [
      "Elektronik + Wasser = höchste Qualitätsansprüche, nur Top-Lieferanten",
      "Pumpe kann laut werden – Lautstärke selbst testen",
      "Grösseres Paket, höhere Versandkosten",
    ],
    qualityChecks: [
      "Pumpe 24 Stunden laufen lassen: leise? kein Leck?",
      "USB-Betrieb bevorzugen, CE-Kennzeichnung bestätigen lassen",
      "Ersatzfilter-Verfügbarkeit und -Preis beim Lieferanten klären",
      "Material BPA-frei bestätigen lassen",
    ],
    videoIdea:
      "Katze ignoriert Wassernapf → Brunnen wird hingestellt → Katze trinkt sofort. Text: «Katzen trinken zu wenig. Das löst es.»",
    season: "Ganzjährig, stark im Sommer",
    targetAudience: "Katzenbesitzer:innen, die sich um die Gesundheit sorgen",
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

  {
    slug: "mini-luftbefeuchter",
    name: "Mini-Luftbefeuchter mit Licht (USB)",
    niche: "home-living",
    emoji: "💨",
    short: "Leiser Tisch-Luftbefeuchter mit sanftem Licht – Winter- und Büro-Liebling.",
    description:
      "Ein kompakter USB-Luftbefeuchter mit Nebel-Effekt und dezentem Licht. In der Heizperiode (trockene Luft!) ein Problemlöser, im Video ein Ästhetik-Produkt – der Nebel filmt sich wunderschön.",
    trend: "Dauerbrenner",
    score: 77,
    buyPriceChf: [5, 10],
    sellPriceChf: [25, 39],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage",
    suppliers: ["aliexpress", "cj-dropshipping"],
    pros: [
      "Klarer Saison-Peak Oktober–März (Heizungsluft)",
      "Nebel + Licht = hypnotisch schöne Videos",
      "Büro-Zielgruppe als zweiter Markt (Geschenk unter Kolleg:innen)",
    ],
    cons: [
      "Billige Geräte verkalken oder werden laut – Muster lange testen",
      "Wassertank-Grösse ehrlich angeben (kleine Tanks = häufiges Nachfüllen)",
    ],
    qualityChecks: [
      "48-Stunden-Test: Lautstärke, Kalkränder, Abschaltautomatik bei leerem Tank",
      "USB-C-Anschluss und CE-Kennzeichnung prüfen",
      "Reinigung testen: Kommt man gut an alle Teile?",
    ],
    videoIdea:
      "Cozy-Abend-Szene: Kerze, Buch, Befeuchter-Nebel im Gegenlicht. Text: «Heizungsluft? Nicht in meiner Wohnung.»",
    season: "Herbst/Winter",
    targetAudience: "Cozy-Home-Fans, Büromenschen, Allergiker:innen 20–50",
  },
  {
    slug: "akku-tischlampe",
    name: "Dimmbare Akku-Tischlampe (Restaurant-Look)",
    niche: "home-living",
    emoji: "🕯️",
    short: "Kabellose Designer-Lampe für Esstisch & Balkon – der Gastro-Trend fürs Zuhause.",
    description:
      "Elegante, aufladbare Tischlampen im Stil moderner Restaurants – dimmbar, kabellos, drinnen wie draussen nutzbar. Der Look wirkt deutlich teurer als der Einkaufspreis, ein klassisches «Premium-Anmutung»-Produkt.",
    trend: "Kommender Trend",
    score: 80,
    buyPriceChf: [8, 15],
    sellPriceChf: [35, 59],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage",
    suppliers: ["aliexpress", "cj-dropshipping"],
    pros: [
      "Hohe wahrgenommene Wertigkeit → starke Marge",
      "Balkon-/Garten-Saison UND Weihnachtsgeschäft (zwei Peaks)",
      "2er-/3er-Sets erhöhen den Warenkorb deutlich",
    ],
    cons: [
      "Akkulaufzeit ist das Reklamationsrisiko Nr. 1",
      "Metall-Look-Varianten können zerkratzt ankommen – Verpackung prüfen",
    ],
    qualityChecks: [
      "Akkulaufzeit auf höchster + niedrigster Stufe messen (sollte 8+ Std. gedimmt sein)",
      "Dimm-Mechanik (Touch/Drehen) 50× bedienen",
      "IP-Schutzklasse für Aussenbereich klären, USB-C-Ladung bevorzugen",
    ],
    videoIdea:
      "Tisch decken im Zeitraffer, letzter Handgriff: Lampe an, Licht dimmen – Restaurant-Stimmung. Text: «Date-Night zuhause > Restaurant.»",
    season: "Frühling/Sommer (Balkon) + Winter (cozy)",
    targetAudience: "Paare & Gastgeber:innen 25–50, Design-affin",
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

  {
    slug: "ice-roller",
    name: "Ice Roller / Gesichts-Kühlroller",
    niche: "beauty-selfcare",
    emoji: "🧊",
    short: "Kühl-Roller gegen müde Haut am Morgen – fester Bestandteil vieler Routinen.",
    description:
      "Ein Roller mit Kühlkopf für Gesicht und Augenpartie – abschwellend und erfrischend am Morgen. Günstig im Einkauf, etabliert in Skincare-Routinen und ideal als Bundle mit Gua Sha.",
    trend: "Im Trend",
    score: 79,
    buyPriceChf: [3, 6],
    sellPriceChf: [15, 25],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage",
    suppliers: ["aliexpress", "cj-dropshipping"],
    pros: [
      "Fester Platz in Morgenroutine-Content (riesiges Format auf TikTok)",
      "Günstig, leicht, robust – kaum Versandrisiko",
      "Starkes Bundle mit Gua Sha/Skincare-Zubehör",
    ],
    cons: [
      "Keine Wunder versprechen (nur «erfrischt/kühlt», keine Anti-Aging-Claims)",
      "Griff-Mechanik billiger Modelle wackelt",
    ],
    qualityChecks: [
      "Rollkopf nach 2 Std. Gefrierfach testen: gleichmässig kalt, läuft rund?",
      "Griff auf Spiel/Wackeln prüfen",
      "Material rostfrei? (nach 3× Einfrieren kontrollieren)",
    ],
    videoIdea:
      "5-Uhr-Morgen-POV: verschlafenes Gesicht, Ice Roller aus dem Gefrierfach, sichtbares Aufwachen. Text: «Der 10-Sekunden-Wachmacher.»",
    season: "Ganzjährig, stark im Sommer",
    targetAudience: "Skincare-Community 18–40, Frühaufsteher:innen",
  },
  {
    slug: "seiden-schlafhaube",
    name: "Satin-Schlafhaube + Kissenbezug (Set)",
    niche: "beauty-selfcare",
    emoji: "🌙",
    short: "Schützt Haare über Nacht – perfekte Ergänzung zum Heatless-Curls-Trend.",
    description:
      "Ein Set aus Satin-Haube und Satin-Kissenbezug gegen Haarbruch und Frizz über Nacht. Die «Hair-Care-Nacht-Routine» ist ein wachsender Content-Trend – und das Set hebt den Warenkorb.",
    trend: "Kommender Trend",
    score: 76,
    buyPriceChf: [3, 7],
    sellPriceChf: [19, 32],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage",
    suppliers: ["aliexpress", "cj-dropshipping", "printful"],
    pros: [
      "Wachsender Trend mit treuer Community (Hair Care, Curly Girls)",
      "Leicht, unzerbrechlich, keine Elektronik",
      "Ideal im Bundle mit Heatless Curls (gleiche Zielgruppe!)",
    ],
    cons: [
      "«Satin» ist nicht «Seide» – ehrlich deklarieren, sonst Beschwerden",
      "Einzeln kleiner Warenkorb, als Set verkaufen",
    ],
    qualityChecks: [
      "Nähte und Gummizug der Haube prüfen (drückt nichts an der Stirn?)",
      "Waschtest 30 Grad: bleibt der Stoff glatt und glänzend?",
      "Materialangabe des Lieferanten klären und korrekt deklarieren",
    ],
    videoIdea:
      "Nacht-Routine: Haube auf, schlafen, morgens glatte glänzende Haare vs. «vorher»-Frizz. Text: «Dein Haar repariert sich nachts – wenn du es lässt.»",
    season: "Ganzjährig",
    targetAudience: "Frauen 16–45 mit Fokus auf Haarpflege",
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

  {
    slug: "smart-springseil",
    name: "Smart-Springseil mit Zähler",
    niche: "fitness-sport",
    emoji: "⏱️",
    short: "Zählt Sprünge und Kalorien im Griff – Cardio für kleine Wohnungen (auch seillos).",
    description:
      "Ein Springseil mit digitalem Zähler im Griff, oft mit seillosem Modus für drinnen (keine Deckenhöhe nötig!). Der Zähler macht Fortschritt sichtbar – und Fortschritt macht süchtig.",
    trend: "Im Trend",
    score: 77,
    buyPriceChf: [5, 10],
    sellPriceChf: [22, 35],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage",
    suppliers: ["aliexpress", "cj-dropshipping"],
    pros: [
      "Seilloser Modus = Training in der Mietwohnung (starkes CH-Argument)",
      "Zahlen/Fortschritt liefern Content («1000 Sprünge am Tag»-Challenge)",
      "Leicht und günstig zu versenden",
    ],
    cons: [
      "Zähler-Genauigkeit schwankt bei Billigmodellen",
      "Januar-Peak, danach flacher – mit anderen Produkten kombinieren",
    ],
    qualityChecks: [
      "100 Sprünge machen und mitzählen – stimmt der Zähler (±5)?",
      "Kugellager der Griffe: dreht das Seil flüssig?",
      "Seillänge verstellbar? Batterie wechselbar?",
    ],
    videoIdea:
      "«30 Tage je 1000 Sprünge»-Challenge, Tag 1 vs. Tag 30, Zähler im Bild. Ehrliches Format mit Wiederkehr-Effekt (Follower bleiben dran).",
    season: "Ganzjährig, Peak Januar",
    targetAudience: "Cardio-Fans und Abnehm-Community 18–45 in Wohnungen",
  },
  {
    slug: "motivations-trinkflasche",
    name: "Motivations-Trinkflasche mit Zeitmarkierungen",
    niche: "fitness-sport",
    emoji: "🥤",
    short: "Zeitmarken zeigen, wie viel du bis wann trinken solltest – simpel und wirksam.",
    description:
      "Eine grosse Trinkflasche (1–2 l) mit aufgedruckten Uhrzeiten und Motivationssprüchen. Das «Genug-Wasser-trinken»-Problem kennt jeder – die Flasche macht die Lösung sichtbar.",
    trend: "Dauerbrenner",
    score: 75,
    buyPriceChf: [4, 8],
    sellPriceChf: [19, 32],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage · BigBuy 3–7 Tage",
    suppliers: ["aliexpress", "cj-dropshipping", "bigbuy"],
    pros: [
      "Universelles Vorsatz-Produkt (Fitness, Büro, Gesundheit)",
      "Ästhetische Farben = Pinterest-tauglich",
      "Personalisierbar via Print-on-Demand (Name drauf) als Premium-Variante",
    ],
    cons: [
      "Markt sichtbar besetzt – über Design/Farben und Bundles differenzieren",
      "Dichtigkeit und BPA-frei sind Pflicht",
    ],
    qualityChecks: [
      "Gefüllt kopfüber schütteln und über Nacht liegen lassen – absolut dicht?",
      "BPA-frei-Zertifikat verlangen, Geruchstest nach erster Füllung",
      "Aufdruck-Test: hält die Beschriftung 20 Spülgänge?",
    ],
    videoIdea:
      "Zeitraffer eines Arbeitstags: Bei jeder Uhrzeit-Marke ein Schluck, abends leere Flasche + Glow-Kommentar. Text: «Trink-Ziel erreicht ohne nachzudenken.»",
    season: "Ganzjährig, Peak Januar & Sommer",
    targetAudience: "Büro- und Fitness-Zielgruppe 18–50",
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

  {
    slug: "portabler-mixer",
    name: "Kabelloser Mini-Standmixer (USB)",
    niche: "kueche-haushalt",
    emoji: "🥤",
    short: "Smoothies direkt im Becher mixen – unterwegs, im Büro, im Gym.",
    description:
      "Ein akkubetriebener Mixer in Flaschenform: Zutaten rein, Knopf drücken, aus demselben Behälter trinken. Trifft Fitness-, Büro- und Gesundheits-Zielgruppe gleichzeitig – ein bewährter Social-Commerce-Bestseller.",
    trend: "Im Trend",
    score: 81,
    buyPriceChf: [8, 15],
    sellPriceChf: [29, 49],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage",
    suppliers: ["aliexpress", "cj-dropshipping"],
    pros: [
      "Drei Zielgruppen in einem Produkt (Fitness, Büro, Reisen)",
      "Demo-Video erklärt sich selbst: mixen → trinken",
      "Guter Warenkorb (CHF 29–49)",
    ],
    cons: [
      "Motorleistung entscheidend: Billige schaffen kein gefrorenes Obst",
      "Akku + Klingen = Qualität und Sicherheit streng prüfen",
      "Dichtung muss zu 100 % dicht sein (Tasche!)",
    ],
    qualityChecks: [
      "Härtetest mit gefrorenen Beeren + Banane – schafft er es ohne Stocken?",
      "Dichtigkeitstest: gefüllt in Tasche legen (über Stunden)",
      "Sicherheitsabschaltung ohne Deckel vorhanden? CE bestätigen lassen",
      "USB-C-Ladung, Akkuladung reicht für 8+ Mixvorgänge?",
    ],
    videoIdea:
      "Gym-Bag-Check: Mixer raus, Beeren + Wasser, 20 Sekunden mixen, direkt trinken. Text: «Proteinshake ohne Klumpen. Überall.»",
    season: "Ganzjährig, Peak Januar & Sommer",
    targetAudience: "Fitness- und Büro-Zielgruppe 18–45, Smoothie-Fans",
  },
  {
    slug: "bento-lunchbox",
    name: "Bento-Lunchbox mit Fächern & Besteck",
    niche: "kueche-haushalt",
    emoji: "🍱",
    short: "Auslaufsichere Lunchbox mit Fächern – Meal-Prep-Trend trifft Büroalltag.",
    description:
      "Eine Lunchbox im Bento-Stil mit getrennten Fächern, Besteck und teils Mikrowellen-Eignung. «Lunchbox-Content» (was ich heute mitnehme) ist ein eigenes, stabiles Videoformat.",
    trend: "Im Trend",
    score: 78,
    buyPriceChf: [6, 11],
    sellPriceChf: [25, 39],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage · BigBuy 3–7 Tage",
    suppliers: ["aliexpress", "cj-dropshipping", "bigbuy"],
    pros: [
      "Meal-Prep- und Spar-Trend (auswärts essen ist teuer in der Schweiz!)",
      "«What's in my lunchbox»-Videos laufen konstant gut",
      "Eltern als Zweitzielgruppe (Schul-Znüni)",
    ],
    cons: [
      "Dichtungen billiger Boxen verlieren nach Wochen – Muster hart testen",
      "Mikrowellen-/Spülmaschinen-Angaben exakt übernehmen",
    ],
    qualityChecks: [
      "Mit Sauce gefüllt schräg transportieren – bleibt alles im Fach?",
      "Lebensmittelecht (LFGB) bestätigen lassen, Geruchstest",
      "Verschluss-Clips 100× öffnen/schliessen",
    ],
    videoIdea:
      "«Znüni-Prep in 5 Minuten»: Fächer füllen im Zeitraffer, befriedigendes Schliess-Klicken am Ende. Text: «Nie wieder 15 Franken für Mittagessen.»",
    season: "Ganzjährig, Peak August (Back-to-School) & Januar",
    targetAudience: "Pendler:innen, Meal-Prep-Fans, Eltern 20–50",
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

  {
    slug: "wickelrucksack",
    name: "Wickelrucksack mit Wickelunterlage",
    niche: "baby-kids",
    emoji: "🎒",
    short: "Der organisierte Eltern-Rucksack – hoher Warenkorb und Geschenk-Klassiker.",
    description:
      "Ein Rucksack mit durchdachten Fächern (isolierte Flaschentasche, Nasstasche, ausklappbare Wickelunterlage). Löst das tägliche Chaos-Problem junger Eltern und rechtfertigt Preise um CHF 60–90.",
    trend: "Dauerbrenner",
    score: 79,
    buyPriceChf: [15, 25],
    sellPriceChf: [59, 89],
    deliveryDays: "AliExpress 12–20 Tage · CJ 8–15 Tage",
    suppliers: ["aliexpress", "cj-dropshipping"],
    pros: [
      "Hoher Warenkorb (CHF 59–89) bei solider Marge",
      "Beliebtes Geschenk zur Geburt (Babyshower-Listen!)",
      "«What's in my bag»-Videos zeigen jedes Fach = langer Watchtime",
    ],
    cons: [
      "Höherer Einkaufspreis → Muster-Test kostet mehr",
      "Reissverschlüsse und Nähte sind die Schwachstellen",
      "Grösseres Paket, Versandkosten einrechnen",
    ],
    qualityChecks: [
      "Voll bepackt tragen: Nähte, Träger und Reissverschlüsse unter Last testen",
      "Wasserabweisend? Aussen mit Wasser besprühen",
      "Isolierfach: hält es eine Flasche 2–3 Std. warm?",
    ],
    videoIdea:
      "«Alles, was in den Eltern-Rucksack passt»: Fach für Fach auspacken, am Ende erstaunte Reaktion. Text: «Mary Poppins, aber für Eltern.»",
    season: "Ganzjährig",
    targetAudience: "Werdende & frische Eltern, Geschenkkäufer:innen",
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
    slug: "retro-digitalkamera",
    name: "Retro-Digitalkamera (Y2K-Style)",
    niche: "tech-gadgets",
    emoji: "📷",
    short: "Kompaktkamera mit Nostalgie-Look – der Foto-Trend der Gen Z.",
    description:
      "Kleine digitale Kompaktkameras im 2000er-Look für den «Digicam-Ästhetik»-Trend: leicht überbelichtete, nostalgische Fotos statt perfekter Handy-Bilder. Grosse Nachfrage bei 16–25-Jährigen.",
    trend: "Im Trend",
    score: 76,
    buyPriceChf: [15, 28],
    sellPriceChf: [49, 79],
    deliveryDays: "AliExpress 12–20 Tage · CJ 8–15 Tage",
    suppliers: ["aliexpress", "cj-dropshipping"],
    pros: [
      "Starker Ästhetik-Trend mit sehr aktiver Community (#digicam)",
      "Hoher Warenkorb (CHF 49–79)",
      "Content entsteht automatisch: Die Fotos SIND der Content",
    ],
    cons: [
      "Qualität der Billigmodelle schwankt stark (Muster zwingend!)",
      "Erwartungsmanagement: bewusst «retro», keine Profi-Kamera – ehrlich beschreiben",
      "Akku/Speicherkarte: Lieferumfang exakt angeben",
    ],
    qualityChecks: [
      "Testfotos bei Tageslicht UND abends mit Blitz machen – trifft es den Retro-Look?",
      "Akkulaufzeit und Ladeanschluss (USB-C?) prüfen",
      "Speicherkarte dabei? Übertragung aufs Handy testen",
      "CE-Kennzeichnung bestätigen lassen",
    ],
    videoIdea:
      "Nebeneinander: Handy-Foto vs. Digicam-Foto vom selben Moment. Text: «Warum alle wieder mit Digicams fotografieren.» Die Kommentare diskutieren von selbst.",
    season: "Ganzjährig, Peaks Sommer (Festivals) & Weihnachten",
    targetAudience: "Gen Z 16–28, Festival- und Party-Fotografie",
  },
  {
    slug: "ringlicht-stativ",
    name: "Ringlicht mit Stativ & Handyhalterung",
    niche: "tech-gadgets",
    emoji: "💡",
    short: "Das Werkzeug der Creator – verkauft sich an alle, die selbst Content machen.",
    description:
      "Ein dimmbares Ringlicht mit Stativ und Handyhalterung für Videos und Videocalls. Cleverer Doppelnutzen: Du verkaufst es – und nutzt es selbst für deine eigenen Produktvideos.",
    trend: "Dauerbrenner",
    score: 74,
    buyPriceChf: [8, 14],
    sellPriceChf: [29, 49],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage",
    suppliers: ["aliexpress", "cj-dropshipping"],
    pros: [
      "Creator-Wirtschaft wächst – ständig neue Käufer:innen",
      "Auch Homeoffice-Zielgruppe (gutes Licht im Videocall)",
      "Eigennutzen: verbessert deine eigenen Produktvideos sofort",
    ],
    cons: [
      "Stativ-Stabilität ist die Schwachstelle billiger Sets",
      "Markt gut besetzt – über Set-Umfang (Fernauslöser etc.) differenzieren",
    ],
    qualityChecks: [
      "Stativ voll ausgezogen mit Handy: kippelt oder wackelt nichts?",
      "Alle Lichtmodi (warm/kalt/dimmen) durchschalten",
      "Handyhalterung mit grossem Handy testen, Fernauslöser koppeln",
    ],
    videoIdea:
      "Vorher/Nachher-Selfievideo: dunkles Zimmerlicht vs. Ringlicht an. Text: «Der Unterschied, den dein Content verdient.»",
    season: "Ganzjährig",
    targetAudience: "Content-Creator, Homeoffice, Hobby-Verkäufer:innen 16–45",
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

// ---------------------------------------------------------- Outdoor & Reisen
PRODUCTS.push(
  {
    slug: "wasserdichte-picknickdecke",
    name: "Wasserdichte Falt-Picknickdecke",
    niche: "outdoor-reisen",
    emoji: "🧺",
    short: "Faltet auf Handtaschengrösse, unten wasserdicht – der See-Sommer-Klassiker.",
    description:
      "Eine grosse Picknickdecke mit wasserdichter Unterseite, die sich auf Handtaschen-Format falten lässt. In einem Land voller Seen und Grillplätze ein sicherer Sommer-Seller mit schöner Video-Kulisse gratis dazu.",
    trend: "Dauerbrenner",
    score: 79,
    buyPriceChf: [6, 11],
    sellPriceChf: [25, 39],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage",
    suppliers: ["aliexpress", "cj-dropshipping"],
    pros: [
      "Perfekt für den Schweizer Sommer (Seen, Grillplätze, Openairs)",
      "Leicht und flach im Versand, keine Elektronik",
      "Schöne Videos fast ohne Aufwand (Bergsee + Decke + Znüni)",
    ],
    cons: [
      "Stark saisonal (Mai–September)",
      "Billige Decken haben undichte Nähte an der Unterseite",
    ],
    qualityChecks: [
      "Wassertest: Decke auf nasse Wiese legen, 30 Min. draufsitzen – bleibt es trocken?",
      "Falt-Test: 20× falten – leiern Gummizug/Verschluss aus?",
      "Grösse nachmessen (Angaben weichen oft ab)",
    ],
    videoIdea:
      "Zeitraffer am See: Decke aus der Tasche, ausrollen, Picknick aufbauen, Sonnenuntergang. Text: «Der Schweizer Sommer in einem Video.»",
    season: "Frühling/Sommer",
    targetAudience: "Picknick-, See- und Festival-Gänger:innen 18–45",
  },
  {
    slug: "packwuerfel-set",
    name: "Packwürfel-Set (Koffer-Organizer)",
    niche: "outdoor-reisen",
    emoji: "🧳",
    short: "7-teiliges Set bringt Ordnung in jeden Koffer – der Reise-Orga-Trend.",
    description:
      "Leichte Stoffwürfel in verschiedenen Grössen, die Kleider und Zubehör im Koffer sortieren. Vorher/Nachher-Videos (Chaos → perfekt gepackt) sind ein bewährtes Erfolgsformat.",
    trend: "Im Trend",
    score: 81,
    buyPriceChf: [7, 12],
    sellPriceChf: [29, 45],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage",
    suppliers: ["aliexpress", "cj-dropshipping"],
    pros: [
      "Orga-Content läuft ganzjährig, Reise-Peaks im Frühling/Herbst",
      "Set-Charakter = guter Warenkorb (CHF 29–45)",
      "Federleicht im Versand, unkaputtbar",
    ],
    cons: [
      "Viele Anbieter – über Farben/Set-Grösse und gutes Video differenzieren",
      "Reissverschlüsse sind die Schwachstelle billiger Sets",
    ],
    qualityChecks: [
      "Jeden Reissverschluss 50× auf- und zuziehen",
      "Nähte bei vollgestopftem Würfel prüfen",
      "Gewicht nachwiegen (Angabe «ultraleicht» stimmt nicht immer)",
    ],
    videoIdea:
      "Split-Screen: Koffer-Chaos vs. Packwürfel-Ordnung, dann der «Alles-passt-rein»-Moment. Text: «Warum hab ich das nicht früher gekannt?»",
    season: "Ganzjährig, Peaks vor Ferienzeiten",
    targetAudience: "Reisende, Familien, Orga-Fans 20–55",
  },
  {
    slug: "solar-campinglampe",
    name: "Faltbare Solar-Campinglampe",
    niche: "outdoor-reisen",
    emoji: "🏕️",
    short: "Lädt per Sonne und USB, faltet flach – Camping- und Balkon-Liebling.",
    description:
      "Eine faltbare LED-Laterne mit Solarpanel und USB-Ladung. Funktioniert fürs Camping genauso wie für Balkon und Garten – zwei Zielgruppen mit einem Produkt.",
    trend: "Kommender Trend",
    score: 77,
    buyPriceChf: [6, 12],
    sellPriceChf: [25, 42],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage",
    suppliers: ["aliexpress", "cj-dropshipping"],
    pros: [
      "Camping boomt in der Schweiz, plus Balkon-Zielgruppe im Sommer",
      "Solar-Argument = Nachhaltigkeits-Story gratis",
      "Flach faltbar = günstiger Versand",
    ],
    cons: [
      "Solarladung ist langsam – ehrlich kommunizieren (USB ist die Hauptladung)",
      "Elektronik: Akku- und Verarbeitungsqualität streng prüfen",
    ],
    qualityChecks: [
      "Leuchtdauer nach voller USB-Ladung messen (sollte 4+ Std. hell sein)",
      "Solartest: 1 Tag Fensterbank – wie viel Ladung kommt real dazu?",
      "Faltmechanik 50× betätigen, CE-Kennzeichnung bestätigen lassen",
    ],
    videoIdea:
      "Abend am Zeltplatz/Balkon: Lampe entfalten, warmes Licht, Sternenhimmel. Text: «Aufgeladen von der Sonne heute Nachmittag.»",
    season: "Frühling–Herbst",
    targetAudience: "Camper, Festival-Gänger, Balkon-Besitzer:innen 20–50",
  },
  {
    slug: "faltbarer-tagesrucksack",
    name: "Ultraleichter faltbarer Rucksack",
    niche: "outdoor-reisen",
    emoji: "🎒",
    short: "Passt zusammengefaltet in die Jackentasche – für Ausflüge und als Reserve.",
    description:
      "Ein Tagesrucksack, der sich auf Faustgrösse zusammenfalten lässt. Ideal als Zweitrucksack auf Reisen, für spontane Wanderungen und als Einkaufs-Reserve – kleiner Preis, breiter Nutzen.",
    trend: "Dauerbrenner",
    score: 75,
    buyPriceChf: [4, 8],
    sellPriceChf: [19, 32],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage",
    suppliers: ["aliexpress", "cj-dropshipping"],
    pros: [
      "Der «Wow, so klein!»-Moment trägt das ganze Video",
      "Günstiger Einkauf, leicht im Versand",
      "Gutes Zusatzprodukt im Bundle mit Packwürfeln",
    ],
    cons: [
      "Tragekomfort ist begrenzt – ehrlich als Zweit-/Faltrucksack positionieren",
      "Nähte an den Trägern sind die Schwachstelle",
    ],
    qualityChecks: [
      "Mit 6–8 kg beladen 1 Stunde tragen – halten Nähte und Träger?",
      "Falten/Entfalten 30× testen",
      "Wasserabweisung mit Sprühflasche prüfen",
    ],
    videoIdea:
      "Hand öffnet sich: winziges Päckchen → entfaltet sich zum Rucksack → wird am Bergweg getragen. Text: «Immer dabei. Nie im Weg.»",
    season: "Frühling–Herbst",
    targetAudience: "Wanderer, Städtereisende, Pendler:innen 18–55",
  },
  {
    slug: "mikrofaser-reisehandtuch",
    name: "Mikrofaser-Reisehandtuch (schnelltrocknend)",
    niche: "outdoor-reisen",
    emoji: "🏖️",
    short: "Trocknet in Stunden statt Tagen, packt auf Buchgrösse – See, Gym, Reise.",
    description:
      "Ein leichtes Mikrofaser-Handtuch mit Packbeutel, das extrem schnell trocknet. Drei Märkte in einem: Badi/See, Fitnessstudio und Reisen.",
    trend: "Dauerbrenner",
    score: 74,
    buyPriceChf: [4, 8],
    sellPriceChf: [19, 29],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage · BigBuy 3–7 Tage",
    suppliers: ["aliexpress", "cj-dropshipping", "bigbuy"],
    pros: [
      "Drei Zielgruppen (Badi, Gym, Reise) = ganzjährige Nachfrage",
      "Leicht, flach, unkaputtbar im Versand",
      "Personalisierbar via Print-on-Demand als Premium-Variante",
    ],
    cons: [
      "Mikrofaser fühlt sich anders an als Frottee – ehrlich zeigen, sonst Retouren",
      "Sehr preisgetriebener Markt – über Set/Farben differenzieren",
    ],
    qualityChecks: [
      "Trocknungstest: nass aufhängen, Zeit stoppen (sollte unter 2–3 Std. sein)",
      "Waschtest 40 Grad: Farbe und Saugkraft nach 5 Wäschen",
      "Grösse nachmessen",
    ],
    videoIdea:
      "Zeitraffer: normales Handtuch vs. Mikrofaser nebeneinander an der Leine – Uhr läuft mit. Text: «3 Stunden vs. 2 Tage.»",
    season: "Ganzjährig, Peak Sommer",
    targetAudience: "Badi-Gänger, Gym-Besucher, Reisende 16–55",
  },
  {
    slug: "digitale-kofferwaage",
    name: "Digitale Kofferwaage",
    niche: "outdoor-reisen",
    emoji: "⚖️",
    short: "Nie mehr Übergepäck-Gebühren – winziger Preis, klarer Nutzen.",
    description:
      "Eine Handwaage, an die man den Koffer hängt. Löst eine echte Angst (Übergepäck-Gebühren am Flughafen) für unter CHF 20 – ideales Zusatzprodukt für jede Reise-Bestellung.",
    trend: "Dauerbrenner",
    score: 72,
    buyPriceChf: [2, 5],
    sellPriceChf: [12, 19],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage",
    suppliers: ["aliexpress", "cj-dropshipping"],
    pros: [
      "Löst eine konkrete Geld-Angst (Airline-Gebühren von CHF 50+)",
      "Sehr günstiger Einkauf, winzig im Versand",
      "Perfektes Upsell-Produkt zu Packwürfeln & Rucksack",
    ],
    cons: [
      "Als Einzelprodukt kleiner Warenkorb – im Bundle verkaufen",
      "Messgenauigkeit billiger Modelle schwankt",
    ],
    qualityChecks: [
      "Gegen Personenwaage gegenprüfen (±0.2 kg akzeptabel)",
      "Haken und Gurt mit 20+ kg belasten",
      "Batterietyp prüfen (gängige Knopfzelle?)",
    ],
    videoIdea:
      "Flughafen-Drama nachgestellt: Koffer zu schwer, CHF 60 Gebühr – Schnitt: Zuhause wiegen, umpacken, entspannt. Text: «CHF 15 statt CHF 60.»",
    season: "Ganzjährig, Peaks vor Ferienzeiten",
    targetAudience: "Flugreisende, Familien 20–60",
  }
);

// Neue Nischen: Gaming, Garten, Schlaf, Auto, Home-Office, Nachhaltig leben
PRODUCTS.push(
  {
    slug: "headset-staender-rgb",
    name: "Headset-Ständer mit RGB & USB-Hub",
    niche: "gaming-zubehoer",
    emoji: "🎧",
    short: "Setup-Upgrade: Kopfhörer-Halter mit Licht und USB-Anschlüssen.",
    description:
      "Ein Ständer, der das Headset aufräumt, per RGB das Setup aufwertet und nebenbei USB-Ports liefert. Drei Nutzen in einem Produkt – und im Desk-Setup-Video sofort sichtbar.",
    trend: "Im Trend",
    score: 78,
    buyPriceChf: [7, 13],
    sellPriceChf: [29, 45],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage",
    suppliers: ["aliexpress", "cj-dropshipping"],
    pros: ["Sichtbares Setup-Upgrade für wenig Geld", "Desk-Setup-Community sehr kauffreudig", "Guter Warenkorb (CHF 29–45)"],
    cons: ["RGB-Qualität schwankt – Muster prüfen", "USB-Hub-Geschwindigkeit ehrlich angeben"],
    qualityChecks: [
      "Standfestigkeit mit schwerem Headset testen",
      "Alle USB-Ports mit Geräten durchtesten",
      "RGB-Modi und Abschaltbarkeit prüfen (CE bestätigen lassen)",
    ],
    videoIdea:
      "Desk-Makeover: Headset lag auf dem Tisch → Ständer hin, RGB an, Kabel weg. Text: «Dein Setup verdient das.»",
    season: "Ganzjährig, Peak Weihnachten",
    targetAudience: "Gamer & Streamer 16–35",
  },
  {
    slug: "handy-gaming-controller",
    name: "Ansteckbarer Handy-Gaming-Controller",
    niche: "gaming-zubehoer",
    emoji: "🕹️",
    short: "Macht das Smartphone zur Konsole – Mobile Gaming wächst rasant.",
    description:
      "Ein Controller, der links und rechts ans Handy klemmt und Mobile Games präzise steuerbar macht. Mobile Gaming ist der grösste Gaming-Markt – und wächst weiter.",
    trend: "Im Trend",
    score: 76,
    buyPriceChf: [9, 16],
    sellPriceChf: [35, 55],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage",
    suppliers: ["aliexpress", "cj-dropshipping"],
    pros: ["Riesiger, wachsender Markt (Mobile Gaming)", "Hoher Warenkorb", "Demo-Video erklärt sich selbst"],
    cons: ["Kompatibilität (Handy-Grössen, iOS/Android) exakt angeben", "Keine Marken-Optik kopieren (rechtlich riskant)"],
    qualityChecks: [
      "Mit grossem UND kleinem Handy testen (Klemmbereich)",
      "Eingabeverzögerung in einem schnellen Spiel prüfen",
      "Akku-/Verbindungsart (Bluetooth/USB-C) dokumentieren, CE bestätigen",
    ],
    videoIdea:
      "Split-Screen: Daumen rutschen auf dem Touchscreen vs. präzise mit Controller. Text: «Unfairer Vorteil.»",
    season: "Ganzjährig, Peak Weihnachten",
    targetAudience: "Mobile-Gamer 14–35 (Geschenk: Eltern & Partner)",
  },
  {
    slug: "xxl-schreibtischunterlage",
    name: "XXL-Schreibtischunterlage (Desk Pad)",
    niche: "gaming-zubehoer",
    emoji: "🖱️",
    short: "Ein Griff und der ganze Tisch wirkt aufgeräumt – der einfachste Setup-Trick.",
    description:
      "Eine grosse Unterlage für Tastatur und Maus, die dem Setup sofort einen cleanen Look gibt. Günstig, unkaputtbar, und in jedem Desk-Video prominent im Bild.",
    trend: "Dauerbrenner",
    score: 77,
    buyPriceChf: [5, 10],
    sellPriceChf: [22, 35],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage",
    suppliers: ["aliexpress", "cj-dropshipping", "printful"],
    pros: ["Sofort sichtbarer Effekt im Video", "Keine Elektronik, keine Grössenprobleme", "Print-on-Demand-Variante mit eigenen Designs möglich"],
    cons: ["Rollt sich billig verarbeitet an den Ecken auf", "Farben/Muster brauchen Geschmackssicherheit"],
    qualityChecks: [
      "Kanten vernäht? Ecken bleiben flach nach dem Ausrollen?",
      "Wasserfestigkeit testen (Kaffee-Unfall-Szenario)",
      "Maus-Tracking auf der Oberfläche prüfen",
    ],
    videoIdea:
      "Vorher: nackter Tisch, Kratzer, Chaos → Unterlage ausrollen → alles wirkt hochwertig. Text: «1 Produkt. Neuer Tisch.»",
    season: "Ganzjährig",
    targetAudience: "Gamer, Home-Office, Studierende 16–45",
  },
  {
    slug: "bewaesserungs-spikes",
    name: "Automatische Bewässerungs-Spikes (Set)",
    niche: "garten-balkon",
    emoji: "💧",
    short: "Giesst Topfpflanzen tagelang von selbst – der Ferien-Retter.",
    description:
      "Verstellbare Tropf-Spikes, die auf Flaschen geschraubt in die Erde kommen und Pflanzen über Tage bewässern. Löst das Ferien-Problem jedes Pflanzen-Haushalts.",
    trend: "Im Trend",
    score: 80,
    buyPriceChf: [4, 8],
    sellPriceChf: [19, 32],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage",
    suppliers: ["aliexpress", "cj-dropshipping"],
    pros: ["Konkretes Problem mit Termin (Ferien!) – hohe Kaufbereitschaft", "Set-Charakter, leicht, unkaputtbar", "Funktioniert für Balkon UND Zimmerpflanzen (ganzjährig)"],
    cons: ["Tropfgeschwindigkeit schwankt – ehrlich erklären und einstellen zeigen", "Saisonaler Peak vor Sommerferien"],
    qualityChecks: [
      "7-Tage-Test an einer echten Pflanze mit Flasche",
      "Verstellventil: von Tropfen bis Rinnsal regelbar?",
      "Passt auf gängige PET-Flaschen?",
    ],
    videoIdea:
      "Zeitraffer: 7 Tage weg – Pflanze mit Spike bleibt frisch, Pflanze ohne hängt. Text: «Ferien ohne schlechtes Gewissen.»",
    season: "Frühling/Sommer, Peak vor Ferien",
    targetAudience: "Pflanzen-Fans & Balkon-Gärtner 25–60",
  },
  {
    slug: "solar-gartenleuchten",
    name: "Solar-Gartenleuchten (6er-Set)",
    niche: "garten-balkon",
    emoji: "🔆",
    short: "Stimmungslicht ohne Kabel und Stromkosten – Balkon-Sommer-Klassiker.",
    description:
      "Solarbetriebene Steckleuchten für Beet, Topf und Balkonkasten. Kein Kabel, keine Stromkosten, warmes Abendlicht – die Abend-Ästhetik verkauft das Produkt im Video von selbst.",
    trend: "Dauerbrenner",
    score: 76,
    buyPriceChf: [8, 14],
    sellPriceChf: [29, 49],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage · BigBuy 3–7 Tage",
    suppliers: ["aliexpress", "cj-dropshipping", "bigbuy"],
    pros: ["Set = guter Warenkorb", "Solar-Argument (keine Stromkosten) zieht", "Abendliche Vorher/Nachher-Videos wirken stark"],
    cons: ["Winter-Schwäche (wenig Sonne) ehrlich kommunizieren", "Billige Modelle leuchten nur 2–3 Stunden"],
    qualityChecks: [
      "Nach 1 Tag Sonne: Leuchtdauer messen (4+ Std. Ziel)",
      "IP-Schutz (Regen!) bestätigen lassen",
      "Erdspiesse auf Bruchfestigkeit testen",
    ],
    videoIdea:
      "Balkon bei Dämmerung: Leuchten einstecken, Zeitraffer bis Nacht – alles glüht warm. Text: «Strom? Braucht's nicht.»",
    season: "Frühling–Herbst",
    targetAudience: "Balkon- & Gartenbesitzer:innen 25–65",
  },
  {
    slug: "mini-gewaechshaus-anzuchtset",
    name: "Mini-Gewächshaus Anzucht-Set (ohne Samen)",
    niche: "garten-balkon",
    emoji: "🌿",
    short: "Fensterbank-Gewächshaus für Kräuter & Setzlinge – Ernte-Content inklusive.",
    description:
      "Anzuchtschalen mit transparenten Hauben und Werkzeug fürs Vorziehen auf der Fensterbank. Wichtig: ohne Samen verkaufen (Einfuhrbestimmungen) – die kauft die Kundschaft lokal.",
    trend: "Kommender Trend",
    score: 74,
    buyPriceChf: [6, 11],
    sellPriceChf: [25, 39],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage",
    suppliers: ["aliexpress", "cj-dropshipping"],
    pros: ["Verlängert die Garten-Saison in den Winter (Anzucht ab Februar)", "Wachstums-Zeitraffer = perfekter Content", "Set mit Werkzeug wirkt hochwertig"],
    cons: ["KEINE Samen beilegen/dropshippen (Pflanzenschutz-Regeln)", "Dünnes Plastik bricht – Muster hart prüfen"],
    qualityChecks: [
      "Hauben-Klips und Belüftungsregler 30× betätigen",
      "Schalen auf Risse/Verzug prüfen",
      "Selbst etwas ansäen und den Zeitraffer für Content nutzen!",
    ],
    videoIdea:
      "14-Tage-Zeitraffer vom Samenkorn zum Setzling im Mini-Gewächshaus. Text: «Februar ist der neue Frühling.»",
    season: "Spätwinter–Frühling",
    targetAudience: "Hobby-Gärtner:innen & Selbstversorger-Fans 25–65",
  },
  {
    slug: "white-noise-geraet",
    name: "White-Noise-Gerät (Einschlafhilfe)",
    niche: "wellness-schlaf",
    emoji: "🌊",
    short: "Beruhigende Klänge statt Strassenlärm – der Sleep-Tech-Einstieg.",
    description:
      "Ein kleines Gerät mit Rauschen, Regen- und Naturklängen, Timer und sanftem Licht. Übertönt Lärm und gehört zur wachsenden «besser schlafen»-Bewegung.",
    trend: "Kommender Trend",
    score: 79,
    buyPriceChf: [8, 14],
    sellPriceChf: [32, 49],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage",
    suppliers: ["aliexpress", "cj-dropshipping"],
    pros: ["Wachsender Sleep-Trend mit kaufkräftiger Zielgruppe", "Auch für Baby-Eltern interessant (zweite Zielgruppe)", "Guter Warenkorb (CHF 32–49)"],
    cons: ["Klangqualität schwankt stark – Muster anhören!", "Keine Heilversprechen (nur «entspannend/überdeckt Lärm»)"],
    qualityChecks: [
      "Alle Klänge anhören: kein Loop-Knacken, kein Lautsprecher-Scheppern",
      "Timer und Lautstärke-Feinstufen testen",
      "USB-C-Ladung/Netzbetrieb klären, CE bestätigen",
    ],
    videoIdea:
      "POV nachts: Strassenlärm, Wälzen im Bett → Gerät an, Regen-Sound, Kamera wird ruhig. Text: «Seit dem schlafe ich durch.» (ehrlich bleiben!)",
    season: "Ganzjährig",
    targetAudience: "Schlecht Schlafende 25–55, Eltern von Babys",
  },
  {
    slug: "sonnenaufgang-lichtwecker",
    name: "Sonnenaufgangs-Lichtwecker",
    niche: "wellness-schlaf",
    emoji: "🌅",
    short: "Weckt mit langsam heller werdendem Licht statt Alarmton – Winter-Liebling.",
    description:
      "Ein Wecker, der 30 Minuten vor der Weckzeit einen Sonnenaufgang simuliert. Im dunklen Schweizer Winter ein spürbarer Lebensqualitäts-Kauf mit starkem Vorher/Nachher-Video.",
    trend: "Im Trend",
    score: 77,
    buyPriceChf: [12, 20],
    sellPriceChf: [45, 69],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage",
    suppliers: ["aliexpress", "cj-dropshipping"],
    pros: ["Hoher Warenkorb (CHF 45–69)", "Dunkler CH-Winter = 5 Monate Hauptsaison", "Morgenroutine-Content passt perfekt"],
    cons: ["Höherer Einkauf → Mustertest kostet mehr", "Bedienung mancher Modelle fummelig – App/Knöpfe selbst testen"],
    qualityChecks: [
      "Aufwach-Simulation real testen: Licht wirklich stufenlos?",
      "Bedienung ohne Anleitung verständlich? (Retourengrund Nr. 1)",
      "CH-taugliche Stromversorgung (USB bevorzugen), CE bestätigen",
    ],
    videoIdea:
      "Split: 6:30 im Dunkeln vom Handy-Alarm erschreckt vs. sanft im «Sonnenlicht» aufwachen. Text: «Der Schweizer Winter kann mich mal.»",
    season: "Herbst/Winter",
    targetAudience: "Berufstätige 25–50, die im Dunkeln aufstehen müssen",
  },
  {
    slug: "kofferraum-organizer",
    name: "Faltbarer Kofferraum-Organizer",
    niche: "auto-pendeln",
    emoji: "📦",
    short: "Schluss mit rollenden Einkäufen – Ordnung im Kofferraum in 10 Sekunden.",
    description:
      "Ein stabiler, faltbarer Organizer mit Fächern und Klett-Boden. Jede Familie kennt das rollende-Einkäufe-Problem – die Lösung ist im Video in Sekunden erklärt.",
    trend: "Dauerbrenner",
    score: 78,
    buyPriceChf: [8, 14],
    sellPriceChf: [32, 49],
    deliveryDays: "AliExpress 12–20 Tage · CJ 8–15 Tage",
    suppliers: ["aliexpress", "cj-dropshipping"],
    pros: ["Universelles Problem, breite Zielgruppe", "Guter Warenkorb, kaum Retourengründe", "Vorher/Nachher-Video trägt sich selbst"],
    cons: ["Etwas grösser im Versand", "Billige Modelle knicken unter Last ein"],
    qualityChecks: [
      "Mit vollem Wocheneinkauf beladen und Kurven fahren",
      "Klett-/Antirutsch-Boden auf Kofferraum-Teppich testen",
      "Nähte und Trennwände unter Zug prüfen",
    ],
    videoIdea:
      "Kurve gefahren: Äpfel rollen überall (relatable!) → Organizer rein, gleiche Kurve, alles bleibt. Text: «Warum hat mir das niemand früher gesagt?»",
    season: "Ganzjährig",
    targetAudience: "Familien & Pendler:innen 25–60",
  },
  {
    slug: "mini-autostaubsauger",
    name: "Kabelloser Mini-Autostaubsauger",
    niche: "auto-pendeln",
    emoji: "🌪️",
    short: "Krümel zwischen den Sitzen? In 2 Minuten weg – Satisfying-Content pur.",
    description:
      "Ein kompakter Akku-Sauger mit Düsen für Ritzen und Polster. Detailing-Videos (vorher dreckig, nachher sauber) gehören zu den verlässlichsten Formaten überhaupt.",
    trend: "Im Trend",
    score: 75,
    buyPriceChf: [10, 17],
    sellPriceChf: [35, 55],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage",
    suppliers: ["aliexpress", "cj-dropshipping"],
    pros: ["Satisfying-Reinigungsvideos laufen immer", "Auch für Sofa/Tastatur nutzbar (Zweitnutzen)", "Hoher Warenkorb"],
    cons: ["Saugkraft billiger Modelle enttäuscht – ehrlich testen", "Akku + Motor = Qualitäts- und Versandthema"],
    qualityChecks: [
      "Reis + Sand im Auto-Fussraum: saugt er alles in einem Zug?",
      "Laufzeit pro Ladung messen (15+ Min. Ziel)",
      "Filterreinigung einfach? Ersatzfilter verfügbar? CE bestätigen",
    ],
    videoIdea:
      "Nahaufnahme Krümel-Ritze → Düse drauf → sauber. 3× wiederholen mit befriedigendem Sound. Text: «Für alle, deren Auto ein zweites Zuhause ist.»",
    season: "Ganzjährig",
    targetAudience: "Pendler, Eltern, Hundebesitzer (Haare!) 25–60",
  },
  {
    slug: "ruecksitz-organizer",
    name: "Rücksitz-Organizer mit Tablet-Fach",
    niche: "auto-pendeln",
    emoji: "🧒",
    short: "Beschäftigte Kinder, aufgeräumtes Auto – der Familien-Reise-Retter.",
    description:
      "Ein Organizer für die Rückseite des Vordersitzes: Fächer für Spielzeug, Trinkflasche, Snacks und ein durchsichtiges Tablet-Fach für lange Fahrten.",
    trend: "Dauerbrenner",
    score: 73,
    buyPriceChf: [6, 11],
    sellPriceChf: [25, 39],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage",
    suppliers: ["aliexpress", "cj-dropshipping"],
    pros: ["Eltern kaufen Problemlöser für Autofahrten sofort", "Ferienzeit-Peaks planbar", "Bundle mit Kofferraum-Organizer naheliegend"],
    cons: ["Befestigung muss zu vielen Autositzen passen", "Tablet-Fach-Folie muss klar und stabil sein"],
    qualityChecks: [
      "An 2–3 verschiedenen Autos befestigen (Gurte lang genug?)",
      "Tablet-Touch durch die Folie bedienbar?",
      "Nähte mit gefüllten Taschen prüfen",
    ],
    videoIdea:
      "POV lange Ferienfahrt: «Mama, wie lange noch?» → Organizer bestückt, Kind versorgt, Ruhe. Text: «4 Stunden Fahrt. 0 Drama.»",
    season: "Ganzjährig, Peaks vor Ferien",
    targetAudience: "Eltern mit Kindern 2–10",
  },
  {
    slug: "laptop-staender-alu",
    name: "Faltbarer Alu-Laptopständer",
    niche: "buero-homeoffice",
    emoji: "💻",
    short: "Bildschirm auf Augenhöhe – das meistempfohlene Home-Office-Upgrade.",
    description:
      "Ein verstellbarer Ständer aus Aluminium, der den Laptop auf ergonomische Höhe bringt und zusammengefaltet in die Tasche passt. Wirkt teuer, kostet im Einkauf wenig.",
    trend: "Dauerbrenner",
    score: 79,
    buyPriceChf: [7, 13],
    sellPriceChf: [29, 45],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage · BigBuy 3–7 Tage",
    suppliers: ["aliexpress", "cj-dropshipping", "bigbuy"],
    pros: ["Premium-Anmutung (Alu) bei tiefem Einkauf", "Home-Office UND Studierende als Zielgruppen", "Klein und flach im Versand"],
    cons: ["Stabilität billiger Gelenke lässt nach – Muster testen", "«Ergonomisch» ja, aber keine Gesundheitsversprechen"],
    qualityChecks: [
      "Mit schwerem Laptop (16 Zoll) auf Wackeln testen, beim Tippen!",
      "Gelenke 50× verstellen – bleiben sie fest?",
      "Gummi-Pads: rutschfest und kratzfrei?",
    ],
    videoIdea:
      "Nacken-Blick nach unten (vorher) → Ständer aufklappen in 3 Sek. → aufrechte Haltung. Text: «Dein Nacken wird dir danken.»",
    season: "Ganzjährig, Peaks Januar & Semesterstart",
    targetAudience: "Home-Office & Studierende 20–50",
  },
  {
    slug: "kabelmanagement-set",
    name: "Kabelmanagement-Set (Box + Clips + Schläuche)",
    niche: "buero-homeoffice",
    emoji: "🔌",
    short: "Vom Kabel-Dschungel zum cleanen Desk – das befriedigendste Video-Format.",
    description:
      "Ein Komplett-Set aus Kabelbox, Klebe-Clips, Klett-Bindern und Spiralschläuchen. Kabelmanagement-Videos sind ein eigenes Satisfying-Genre mit riesiger Nachfrage.",
    trend: "Im Trend",
    score: 76,
    buyPriceChf: [6, 11],
    sellPriceChf: [25, 39],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage",
    suppliers: ["aliexpress", "cj-dropshipping"],
    pros: ["Satisfying-Transformation = Video-Selbstläufer", "Set deckt alle Bedürfnisse ab (Warenkorb!)", "Leicht, unkaputtbar, keine Grössen"],
    cons: ["Klebekraft der Clips ist das Qualitätsrisiko", "Kabelbox muss hitzefest sein (Steckerleiste!)"],
    qualityChecks: [
      "Clips 1 Woche an Wand/Tisch: fallen sie ab?",
      "Kabelbox: Material-Hitzetest mit Steckerleiste, Lüftungsschlitze?",
      "Klettbinder-Qualität nach 20× Öffnen",
    ],
    videoIdea:
      "Unterm Pult gefilmt: Kabelchaos → Zeitraffer Aufräumen → cleaner Schnitt. Text: «Das ASMR, das dein Büro braucht.»",
    season: "Ganzjährig",
    targetAudience: "Home-Office, Gamer, Ordnungs-Fans 20–50",
  },
  {
    slug: "wuerfel-timer",
    name: "Würfel-Timer (Produktivitäts-Timer)",
    niche: "buero-homeoffice",
    emoji: "⏲️",
    short: "Würfel drehen, Zeit läuft – die einfachste Fokus-Methode (#studytok).",
    description:
      "Ein Timer-Würfel: Auf die 25-Minuten-Seite drehen und die Fokus-Zeit läuft (Pomodoro-Methode). Auf StudyTok und in der Produktivitäts-Community ein Liebling.",
    trend: "Kommender Trend",
    score: 74,
    buyPriceChf: [5, 9],
    sellPriceChf: [22, 32],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage",
    suppliers: ["aliexpress", "cj-dropshipping"],
    pros: ["StudyTok/Produktivitäts-Trend wächst stabil", "Einfaches, sympathisches Produkt ohne App", "Gutes Geschenk (Studium, Büro-Wichteln)"],
    cons: ["Piepton muss angenehm & regelbar sein", "Als Einzelprodukt kleiner Warenkorb – mit Desk-Produkten bündeln"],
    qualityChecks: [
      "Alle Zeitseiten testen, Genauigkeit prüfen",
      "Lautstärke regelbar/Vibrationsmodus vorhanden?",
      "Display-Lesbarkeit und Batteriewechsel checken",
    ],
    videoIdea:
      "Study-with-me: Würfel auf 25 kippen, Fokus-Ästhetik, Timer klingelt, Pause-Dehnen. Text: «Die 25-Minuten-Regel hat mein Lernen verändert.»",
    season: "Ganzjährig, Peaks Semesterstart & Prüfungszeit",
    targetAudience: "Studierende & Wissensarbeiter 16–40",
  },
  {
    slug: "abschminkpads-wiederverwendbar",
    name: "Wiederverwendbare Abschminkpads (Set + Waschbeutel)",
    niche: "nachhaltig-leben",
    emoji: "🌸",
    short: "Ersetzt hunderte Wegwerfpads – der einfachste Zero-Waste-Einstieg.",
    description:
      "Waschbare Mikrofaser-/Bambuspads im Set mit Wäschebeutel und Aufbewahrung. Der perfekte erste Schritt für nachhaltigkeitsinteressierte Kundschaft – günstig, sinnvoll, ästhetisch.",
    trend: "Im Trend",
    score: 78,
    buyPriceChf: [3, 6],
    sellPriceChf: [17, 27],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage",
    suppliers: ["aliexpress", "cj-dropshipping"],
    pros: ["Doppelte Zielgruppe: Beauty UND Nachhaltigkeit", "Spar-Argument konkret vorrechenbar (CHF 50+/Jahr)", "Leicht, unkaputtbar, Set-Charakter"],
    cons: ["Muss Make-up wirklich gut entfernen – selbst testen", "Nach vielen Wäschen prüfen (verfilzt Billigware?)"],
    qualityChecks: [
      "Abschmink-Test mit wasserfester Mascara",
      "10× waschen: Form, Weichheit, Farbe danach?",
      "Materialangabe (Bambus/Mikrofaser) belegen lassen",
    ],
    videoIdea:
      "Jahres-Berg an Wegwerfpads aufgeschüttet vs. 12 waschbare Pads daneben. Text: «Das eine kostet CHF 60 im Jahr. Das andere einmal CHF 19.»",
    season: "Ganzjährig",
    targetAudience: "Beauty- & Nachhaltigkeits-Community 18–45",
  },
  {
    slug: "bienenwachstuecher",
    name: "Bienenwachstücher (3er-Set)",
    niche: "nachhaltig-leben",
    emoji: "🐝",
    short: "Die wiederverwendbare Frischhaltefolie – Zero-Waste-Klassiker mit Charme.",
    description:
      "Baumwolltücher mit Bienenwachs, die sich mit Handwärme um Schüsseln und Anschnitte schmiegen. Ersetzen Frischhaltefolie komplett und sehen dabei auch noch schön aus.",
    trend: "Dauerbrenner",
    score: 74,
    buyPriceChf: [4, 8],
    sellPriceChf: [19, 32],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage",
    suppliers: ["aliexpress", "cj-dropshipping"],
    pros: ["Etabliertes Zero-Waste-Produkt mit schöner Optik", "Demo (um Schüssel schmiegen) ist satisfying", "Gutes Bundle mit Silikondeckeln & Netzen (Starterset!)"],
    cons: ["Lebensmittelechtheit/Wachsqualität belegen lassen", "Nicht für Fleisch/Fisch geeignet – ehrlich dazusagen"],
    qualityChecks: [
      "Schmiegt es sich mit Handwärme wirklich dicht an?",
      "Geruchstest (angenehm wachsig, nicht chemisch)",
      "Zertifikat zur Lebensmitteltauglichkeit anfordern",
    ],
    videoIdea:
      "Hände formen das Tuch um eine Schüssel, es hält wie von Zauberhand. Text: «Frischhaltefolie? Kenn ich nicht mehr.»",
    season: "Ganzjährig",
    targetAudience: "Nachhaltige Haushalte 25–55",
  },
  {
    slug: "obst-gemuese-netze",
    name: "Wiederverwendbare Obst- & Gemüsenetze (Set)",
    niche: "nachhaltig-leben",
    emoji: "🥬",
    short: "Nie mehr Plastiksäckli beim Einkauf – klein, günstig, sinnvoll.",
    description:
      "Leichte Wäschenetze mit Zugband und Gewichtsangabe fürs Einkaufen von Obst und Gemüse. Das Einstiegsprodukt für den plastikfreien Einkauf – ideal als Bundle-Baustein.",
    trend: "Dauerbrenner",
    score: 72,
    buyPriceChf: [3, 5],
    sellPriceChf: [15, 22],
    deliveryDays: "AliExpress 10–20 Tage · CJ 6–14 Tage",
    suppliers: ["aliexpress", "cj-dropshipping"],
    pros: ["Kleiner Preis, grosse Sympathie – gutes Einstiegsprodukt", "Bundle-Baustein fürs «Zero-Waste-Starterset»", "Federleicht im Versand"],
    cons: ["Einzeln kleiner Warenkorb", "Nähte und Zugbänder sind die Schwachstellen"],
    qualityChecks: [
      "Mit 2 kg Äpfeln beladen und am Zugband tragen",
      "Waschtest: Form nach 5 Wäschen?",
      "Tara-Gewicht auf dem Etikett? (Kassen-Argument)",
    ],
    videoIdea:
      "Einkaufs-POV: Plastiksäckli-Rolle ignorieren, eigenes Netz zücken, Kassiererin lächelt. Text: «Der kleinste Schritt mit der grössten Wirkung.»",
    season: "Ganzjährig",
    targetAudience: "Nachhaltige Einkäufer:innen 20–60",
  }
);

/**
 * Englische Suchbegriffe pro Produkt – daraus baut die Seite direkte
 * Such-Links zu den Lieferanten (AliExpress & Co. funktionieren mit
 * englischen Begriffen am besten).
 */
export const SEARCH_TERMS: Record<string, string> = {
  "led-leuchthalsband": "led dog collar rechargeable",
  "selbstreinigende-tierhaarbuerste": "self cleaning slicker brush pet",
  schleckmatte: "dog lick mat suction",
  "katzen-trinkbrunnen": "cat water fountain quiet",
  "hunde-trinkflasche": "portable dog water bottle",
  "sunset-lampe": "sunset projection lamp",
  "sternenhimmel-projektor": "galaxy star projector",
  "kabellose-led-spots": "wireless led puck lights remote",
  "mini-luftbefeuchter": "mini usb humidifier light",
  "akku-tischlampe": "cordless rechargeable table lamp dimmable",
  "heatless-curls-set": "heatless curling rod satin",
  "gua-sha-set": "gua sha jade roller set",
  "kopfhaut-massageduscheburste": "scalp massager shampoo brush",
  "ice-roller": "ice roller face",
  "seiden-schlafhaube": "satin bonnet pillowcase set",
  "widerstandsbaender-set": "resistance bands set 5",
  "akupressur-matte": "acupressure mat pillow set",
  "faszienrolle-set": "foam roller massage set",
  "smart-springseil": "smart jump rope counter cordless",
  "motivations-trinkflasche": "motivational water bottle time marker",
  "multi-gemueseschneider": "vegetable chopper 12 in 1",
  "elektrischer-milchaufschaeumer": "electric milk frother rechargeable",
  "silikon-frischhaltedeckel": "silicone stretch lids set",
  "portabler-mixer": "portable blender usb rechargeable",
  "bento-lunchbox": "bento lunch box leakproof cutlery",
  "meilenstein-decke": "baby milestone blanket monthly",
  "tragbarer-flaschenwaermer": "portable bottle warmer baby usb",
  wickelrucksack: "diaper bag backpack changing pad",
  "3in1-ladestation": "3 in 1 foldable wireless charger",
  "smarter-schluesselfinder": "bluetooth key finder tracker",
  "magnetische-kfz-handyhalterung": "magnetic car phone holder vent",
  "mini-etikettendrucker": "mini label printer bluetooth",
  "retro-digitalkamera": "retro digital camera y2k",
  "ringlicht-stativ": "ring light tripod phone holder",
  "wasserdichte-picknickdecke": "waterproof picnic blanket foldable",
  "packwuerfel-set": "packing cubes set travel",
  "solar-campinglampe": "solar camping lantern foldable",
  "faltbarer-tagesrucksack": "packable foldable backpack lightweight",
  "mikrofaser-reisehandtuch": "microfiber travel towel quick dry",
  "digitale-kofferwaage": "digital luggage scale",
  "headset-staender-rgb": "headset stand rgb usb hub",
  "handy-gaming-controller": "mobile gaming controller phone",
  "xxl-schreibtischunterlage": "xxl desk pad mat large",
  "bewaesserungs-spikes": "automatic plant watering spikes adjustable",
  "solar-gartenleuchten": "solar garden lights set pathway",
  "mini-gewaechshaus-anzuchtset": "seed starter tray kit greenhouse",
  "white-noise-geraet": "white noise machine sleep",
  "sonnenaufgang-lichtwecker": "sunrise alarm clock wake up light",
  "kofferraum-organizer": "car trunk organizer foldable",
  "mini-autostaubsauger": "cordless car vacuum cleaner mini",
  "ruecksitz-organizer": "car backseat organizer tablet holder",
  "laptop-staender-alu": "aluminium laptop stand foldable adjustable",
  "kabelmanagement-set": "cable management box set",
  "wuerfel-timer": "cube timer productivity",
  "abschminkpads-wiederverwendbar": "reusable makeup remover pads bamboo",
  bienenwachstuecher: "beeswax food wraps set",
  "obst-gemuese-netze": "reusable produce bags mesh set",
};

/** Suchbegriff für Lieferanten-Links; Fallback: Slug in Worte umwandeln. */
export function searchTermFor(p: Product): string {
  return SEARCH_TERMS[p.slug] ?? p.slug.replace(/-/g, " ");
}

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

/** Marge in Prozent (Mittelwerte), z. B. 71. */
export function marginPercent(p: Product): number {
  const avgBuy = (p.buyPriceChf[0] + p.buyPriceChf[1]) / 2;
  const avgSell = (p.sellPriceChf[0] + p.sellPriceChf[1]) / 2;
  if (avgSell <= 0) return 0;
  return Math.round(((avgSell - avgBuy) / avgSell) * 100);
}

/**
 * Kennzahlen-Aufschlüsselung (0–100) – abgeleitet aus den Katalogdaten:
 * Marge aus den Preisen, Nachfrage aus Trend-Status + Gesamtscore,
 * Versand aus den Lieferwegen, Konkurrenz aus der Nischen-Einstufung.
 */
export type ScoreBreakdown = {
  label: string;
  value: number;
  hint: string;
}[];

export function scoreBreakdown(
  p: Product,
  nicheCompetition: "niedrig" | "mittel" | "hoch" | undefined
): ScoreBreakdown {
  const margePct = marginPercent(p);
  const marge = Math.min(100, Math.round((margePct / 80) * 100));

  const demand =
    p.trend === "Im Trend" ? 88 : p.trend === "Kommender Trend" ? 70 : 78;

  const delivery = p.deliveryDays.toLowerCase();
  const shipping = delivery.includes("eu-lager")
    ? 85
    : delivery.includes("bigbuy") || delivery.includes("print-on-demand")
      ? 78
      : 55;

  const competition =
    nicheCompetition === "niedrig" ? 85 : nicheCompetition === "mittel" ? 65 : 45;

  return [
    { label: "Marge", value: marge, hint: `${margePct} % vom Verkaufspreis bleiben vor Werbung übrig` },
    { label: "Nachfrage", value: demand, hint: `Einstufung: ${p.trend}` },
    { label: "Versand", value: shipping, hint: shipping >= 78 ? "Schnelle Lieferwege (EU/POD) verfügbar" : "Standard-Lieferwege aus Asien – Lieferzeit ehrlich kommunizieren" },
    { label: "Konkurrenz-Chance", value: competition, hint: `Konkurrenz in der Nische: ${nicheCompetition ?? "mittel"} (höher = leichter durchzukommen)` },
  ];
}
