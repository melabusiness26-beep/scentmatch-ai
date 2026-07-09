/**
 * Lieferanten & Plattformen, über die man Dropshipping-Produkte bezieht –
 * bewertet aus Schweizer Sicht (Lieferzeit, Zoll, Eignung für Anfänger:innen).
 */

export type Supplier = {
  slug: string;
  name: string;
  url: string;
  /** Such-URL-Vorlage; {q} wird durch den Produkt-Suchbegriff ersetzt. */
  searchTemplate?: string;
  type: "Marktplatz" | "Dropshipping-Agent" | "EU-Grosshandel" | "Print-on-Demand";
  deliveryToCh: string;
  costs: string;
  beginnerFriendly: number; // 1–5
  pros: string[];
  cons: string[];
  bestFor: string;
};

/** Baut den direkten Such-Link eines Lieferanten für einen Produkt-Suchbegriff. */
export function supplierSearchUrl(s: Supplier, term: string): string | null {
  if (!s.searchTemplate) return null;
  const q = s.searchTemplate.includes("wholesale-{q}")
    ? term.trim().toLowerCase().replace(/\s+/g, "-")
    : encodeURIComponent(term.trim());
  return s.searchTemplate.replace("{q}", q);
}

export const SUPPLIERS: Supplier[] = [
  {
    slug: "aliexpress",
    name: "AliExpress",
    url: "https://www.aliexpress.com",
    searchTemplate: "https://www.aliexpress.com/w/wholesale-{q}.html",
    type: "Marktplatz",
    deliveryToCh: "ca. 10–20 Tage (AliExpress Standard Shipping)",
    costs: "Keine Grundgebühr – du zahlst nur Produkt + Versand pro Bestellung.",
    beginnerFriendly: 4,
    pros: [
      "Riesige Auswahl – fast jedes Trendprodukt ist hier zu finden",
      "Keine Fixkosten, ideal zum Testen mit kleinem Budget",
      "Bewertungen + Verkaufszahlen zeigen, was wirklich gefragt ist",
      "Einfache Anbindung an Shop-Systeme (z. B. via DSers für Shopify)",
    ],
    cons: [
      "Lange Lieferzeiten in die Schweiz – muss im Shop ehrlich kommuniziert werden",
      "Qualität schwankt stark je Händler – immer erst Muster bestellen",
      "Verpackung wirkt oft billig (China-Beutel), kein Branding",
      "Retouren nach China sind praktisch nicht machbar – Erstattungskulanz einplanen",
    ],
    bestFor: "Produkt-Recherche und erste Testbestellungen mit minimalem Risiko.",
  },
  {
    slug: "cj-dropshipping",
    name: "CJ Dropshipping",
    url: "https://cjdropshipping.com",
    searchTemplate: "https://www.cjdropshipping.com/search?keyword={q}",
    type: "Dropshipping-Agent",
    deliveryToCh: "ca. 6–14 Tage; mit EU-Lager teils 3–8 Tage",
    costs: "Kein Abo nötig; Produkt + Versand pro Bestellung, optionale Extras (Branding, Fulfillment).",
    beginnerFriendly: 4,
    pros: [
      "Professioneller als AliExpress: Qualitätskontrolle vor dem Versand möglich",
      "EU-Lager für viele Produkte → deutlich kürzere Lieferzeiten",
      "Eigenes Branding möglich (Logo auf Verpackung/Beileger) – wirkt seriöser",
      "Sourcing-Service: findet auf Anfrage Produkte inkl. besserem Preis",
    ],
    cons: [
      "Oberfläche wirkt anfangs überladen – kleine Lernkurve",
      "Nicht jedes Produkt liegt im EU-Lager – Lieferzeit pro Produkt prüfen",
      "Support-Qualität hängt vom zugewiesenen Agenten ab",
    ],
    bestFor: "Der beste Allrounder, sobald du regelmässig Bestellungen hast.",
  },
  {
    slug: "bigbuy",
    name: "BigBuy",
    url: "https://www.bigbuy.eu",
    searchTemplate: "https://www.bigbuy.eu/en/search?controller=search&s={q}",
    type: "EU-Grosshandel",
    deliveryToCh: "ca. 3–7 Tage (Versand aus Spanien/EU)",
    costs: "Abo-Modell (Dropshipping-Paket kostenpflichtig, ab ca. 70 €/Monat) + Produktkosten.",
    beginnerFriendly: 3,
    pros: [
      "Schnelle Lieferung aus Europa – grosser Vertrauensvorteil bei Schweizer Kundschaft",
      "Europäische Produktstandards (CE) und saubere Produktdaten",
      "Grosses Sortiment inkl. Markenware",
    ],
    cons: [
      "Monatliche Fixkosten – lohnt sich erst mit laufenden Verkäufen",
      "Einkaufspreise höher als in China – kleinere Marge",
      "Schweiz ist Nicht-EU: Zoll/Einfuhrabwicklung pro Sendung beachten",
    ],
    bestFor: "Skalieren mit schnellen Lieferzeiten, wenn der Shop bereits läuft.",
  },
  {
    slug: "spocket",
    name: "Spocket",
    url: "https://www.spocket.co",
    type: "Marktplatz",
    deliveryToCh: "je nach Lieferant ca. 4–10 Tage (viele EU-/US-Lieferanten)",
    costs: "Abo-Modell (ab ca. 40 $/Monat für sinnvollen Funktionsumfang).",
    beginnerFriendly: 4,
    pros: [
      "Kuratierte EU-/US-Lieferanten mit kürzeren Lieferwegen",
      "Sehr einfache Bedienung und Shop-Anbindung",
      "Automatische Bestellabwicklung",
    ],
    cons: [
      "Abo-Kosten von Tag 1",
      "Auswahl kleiner als AliExpress/CJ",
      "Margen oft knapper wegen höherer Einkaufspreise",
    ],
    bestFor: "Wer bewusst auf kurze Lieferzeiten setzt und dafür Fixkosten akzeptiert.",
  },
  {
    slug: "nihaojewelry",
    name: "Nihaojewelry",
    url: "https://www.nihaojewelry.com",
    type: "Marktplatz",
    deliveryToCh: "ca. 8–15 Tage; Dropshipping-Versand direkt an Kundschaft möglich",
    costs: "Keine Grundgebühr; sehr tiefe Stückpreise, kleine Mindestmengen (teils ab 1–3 Stück).",
    beginnerFriendly: 4,
    pros: [
      "DER Spezialist für Mode-Schmuck & Accessoires – riesige Auswahl, ständig neue Trends",
      "Grosshandels-Preise schon bei kleinen Mengen – ideal fürs Hybrid-Modell (Bestseller auf Vorrat)",
      "Gute Filter nach Material (Edelstahl, 925er Silber, vergoldet)",
    ],
    cons: [
      "Qualität schwankt je Artikel – Materialangaben prüfen und Muster tragen (Anlauf-Test!)",
      "Oberfläche auf Englisch, an Grosshandel orientiert – kleine Lernkurve",
      "Retouren praktisch nicht machbar – Erstattungskulanz einplanen",
    ],
    bestFor: "Die erste Adresse für Schmuck & Accessoires – Qualität über Materialfilter, Menge über Grosshandelspreise.",
  },
  {
    slug: "printful",
    name: "Printful / Printify",
    url: "https://www.printful.com",
    type: "Print-on-Demand",
    deliveryToCh: "ca. 5–10 Tage (Produktion 2–5 Tage + Versand, EU-Produktionsstandorte)",
    costs: "Keine Grundgebühr – du zahlst Produktion + Versand pro verkauftem Artikel.",
    beginnerFriendly: 5,
    pros: [
      "Eigene Designs auf T-Shirts, Tassen, Postern, Decken – einzigartige Produkte statt Massenware",
      "Kein Lager, keine Mindestmenge, kein Risiko",
      "Perfekt kombinierbar mit Nischen (z. B. personalisierte Haustier- oder Baby-Produkte)",
    ],
    cons: [
      "Marge pro Stück kleiner als bei China-Sourcing",
      "Du brauchst gute Designs (Canva reicht für den Start)",
      "Qualität je Druckpartner unterschiedlich – Muster bestellen",
    ],
    bestFor: "Personalisierte Produkte und Marken-Aufbau ohne Startkapital.",
  },
];

export function getSupplier(slug: string): Supplier | undefined {
  return SUPPLIERS.find((s) => s.slug === slug);
}

// Weitere Plattformen: Grosshandel & Alternativen
SUPPLIERS.push(
  {
    slug: "alibaba",
    name: "Alibaba",
    url: "https://www.alibaba.com",
    searchTemplate: "https://www.alibaba.com/trade/search?SearchText={q}",
    type: "Marktplatz",
    deliveryToCh: "je nach Versandart 10–30 Tage (Grosshandels-Sendungen)",
    costs: "Keine Grundgebühr; Grosshandelspreise mit Mindestmengen (MOQ, oft ab 10–100 Stück).",
    beginnerFriendly: 2,
    pros: [
      "Die tiefsten Preise überhaupt – direkt von den Herstellern",
      "Verhandeln ist normal und erwünscht (Preis, Menge, Branding)",
      "«Trade Assurance» schützt deine Zahlung",
    ],
    cons: [
      "Mindestmengen: nichts für einzelne Dropshipping-Bestellungen",
      "Kommunikation auf Englisch mit Herstellern nötig",
      "Import-Abwicklung liegt bei dir (ab gewissen Mengen Verzollung beachten)",
    ],
    bestFor: "Der Schritt NACH dem Testen: Bestseller in Menge einkaufen (Hybrid-Modell) und die Marge verdoppeln.",
  },
  {
    slug: "dhgate",
    name: "DHgate",
    url: "https://www.dhgate.com",
    type: "Marktplatz",
    deliveryToCh: "ca. 10–20 Tage",
    costs: "Keine Grundgebühr; Klein-Grosshandel (oft ab 2–10 Stück günstiger).",
    beginnerFriendly: 3,
    pros: [
      "Zwischending aus AliExpress und Alibaba: kleine Mengen zu fast Grosshandelspreisen",
      "Käuferschutz ähnlich wie AliExpress",
    ],
    cons: [
      "Qualität schwankt stärker – Muster-Pflicht gilt doppelt",
      "Achtung Markenfälschungen: strikt meiden (rechtlich gefährlich!)",
    ],
    bestFor: "Kleine Vorrats-Käufe deiner Bestseller, bevor sich Alibaba-Mengen lohnen.",
  },
  {
    slug: "eprolo",
    name: "EPROLO",
    url: "https://www.eprolo.com",
    type: "Dropshipping-Agent",
    deliveryToCh: "ca. 7–15 Tage",
    costs: "Kostenlos (kein Abo!); du zahlst Produkt + Versand pro Bestellung.",
    beginnerFriendly: 4,
    pros: [
      "Gratis-Alternative zu CJ Dropshipping (kein Abo, keine Fixkosten)",
      "Branding-Service (eigenes Etikett/Verpackung) schon bei kleinen Mengen",
      "Einfache Shopify-Anbindung",
    ],
    cons: [
      "Kleinere Auswahl als CJ/AliExpress",
      "Support-Qualität schwankt",
    ],
    bestFor: "Zweite Meinung zum CJ-Preis: dieselben Produkte anfragen und vergleichen – kostet nichts.",
  },
  {
    slug: "zendrop",
    name: "Zendrop",
    url: "https://zendrop.com",
    type: "Dropshipping-Agent",
    deliveryToCh: "ca. 8–15 Tage (je nach Produkt)",
    costs: "Gratis-Basisplan; sinnvoller Funktionsumfang ab ca. 50 $/Monat.",
    beginnerFriendly: 3,
    pros: [
      "Sehr einfache, aufgeräumte Bedienung + Automatisierung",
      "Eigenes Branding und schnelle Bestellabwicklung",
    ],
    cons: [
      "Voller Nutzen erst im Bezahlplan",
      "Auf US-Markt optimiert – Lieferzeiten in die Schweiz pro Produkt prüfen",
    ],
    bestFor: "Wer maximale Einfachheit will und Fixkosten akzeptiert – für den CH-Start ist CJ/EPROLO meist sinnvoller.",
  },
  {
    slug: "faire",
    name: "Faire",
    url: "https://www.faire.com",
    type: "EU-Grosshandel",
    deliveryToCh: "ca. 3–10 Tage (echte Marken, oft aus Europa)",
    costs: "Keine Grundgebühr; Grosshandels-Einkauf mit kleinen Mindestbestellwerten, oft 60 Tage Zahlungsziel.",
    beginnerFriendly: 3,
    pros: [
      "Echte Boutique-Marken statt Massenware – sofort höhere Wertigkeit",
      "Erstbestellungen oft mit Rückgaberecht und Zahlungsziel (risikoarm testen)",
      "Perfekt für Nachhaltigkeit, Geschenke, Schmuck und Deko mit Premium-Anspruch",
    ],
    cons: [
      "Kein klassisches Dropshipping: du lagerst und verschickst selbst (Hybrid-Modell)",
      "Höhere Einkaufspreise als China – dafür Premium-Verkaufspreise möglich",
    ],
    bestFor: "Der Qualitäts-Weg: aus dem Dropshipping-Test einen Marken-Shop mit echten Produkten machen.",
  },
  {
    slug: "ankorstore",
    name: "Ankorstore",
    url: "https://www.ankorstore.com",
    type: "EU-Grosshandel",
    deliveryToCh: "ca. 3–10 Tage (europäische Marken)",
    costs: "Keine Grundgebühr; kleine Mindestbestellwerte pro Marke, Zahlungsziele möglich.",
    beginnerFriendly: 3,
    pros: [
      "Tausende europäische Marken (Deko, Papeterie, Geschenke, Kids) mit kleinen Mengen",
      "«Made in Europe» als Verkaufsargument für Schweizer Kundschaft",
    ],
    cons: [
      "Wie Faire: selbst lagern und verschicken (Hybrid-Modell)",
      "Margen kleiner als bei China-Ware – Premium-Positionierung nötig",
    ],
    bestFor: "Europäische Qualität für Geschenk-, Deko- und Kids-Sortimente – die seriöse Alternative zur Massenware.",
  }
);

/**
 * Empfehlenswerte Händler/Marken AUF AliExpress – bekannte Hersteller mit
 * offiziellen Stores, die seit Jahren zuverlässig liefern. Im AliExpress-Suchfeld
 * den Store-Namen eingeben oder in den Suchergebnissen nach dem Store filtern.
 */
export type AliStoreTip = {
  stores: string;
  niche: string;
  why: string;
};

export const ALIEXPRESS_TOP_STORES: AliStoreTip[] = [
  {
    stores: "Baseus · UGREEN · Essager · INIU",
    niche: "Tech, Laden & Handy-Zubehör",
    why: "Die grossen Zubehör-Marken: Ladegeräte, Powerbanks, Halterungen und Ständer in Marken-Qualität mit CE – millionenfach verkauft, offizielle Stores.",
  },
  {
    stores: "Vention · Orico",
    niche: "Kabel, Hubs & Desk-Setup",
    why: "Die Spezialisten für Kabel, USB-Hubs und Docking – solide Verarbeitung, klare Spezifikationen, ideal für Home-Office- und Gaming-Setups.",
  },
  {
    stores: "ROCKBROS · WEST BIKING · Rhinowalk · NEWBOLER",
    niche: "Velo & E-Bike",
    why: "Die Velo-Spezialisten: ROCKBROS/WEST BIKING fürs volle Sortiment, Rhinowalk für Taschen, NEWBOLER für Flaschen & Zubehör – Qualität nahe am Fachhandel.",
  },
  {
    stores: "Naturehike · Widesea · 3F UL Gear · Fire-Maple",
    niche: "Outdoor & Camping",
    why: "Etablierte Outdoor-Marken (Fire-Maple für Kocher) mit erstaunlich guter Verarbeitung – auch in der europäischen Outdoor-Community anerkannt.",
  },
  {
    stores: "Truelove · Benepaw · PETKIT",
    niche: "Haustiere",
    why: "Truelove/Benepaw für Premium-Geschirre und Zubehör, PETKIT (offizieller Store) für Trinkbrunnen & Pet-Tech – echte Marken-Hersteller statt No-Name.",
  },
  {
    stores: "Yhpup · Joolim · eManco",
    niche: "Schmuck (Edelstahl, 18K vergoldet)",
    why: "Die etablierten Edelstahl-Schmuck-Stores für den «Waterproof Jewelry»-Trend: 316L-Edelstahl, 18K-Vergoldung, saubere Materialangaben.",
  },
  {
    stores: "17KM · CANNER · Vnox · U7",
    niche: "Schmuck (Mode / Silber / Herren)",
    why: "17KM für trendigen Mode-Schmuck, CANNER für echtes 925er Silber, Vnox und U7 (offizielle Stores) für Herren-Schmuck aus Edelstahl.",
  },
  {
    stores: "ANLAN · CkeyiN",
    niche: "Beauty-Geräte & Haar-Tools",
    why: "Spezialisten für Beauty-Tools mit CE-Kennzeichnung – deutlich konstanter als No-Name-Geräte.",
  },
  {
    stores: "WORTHBUY · GIANXI · Xiaomi-Ökosystem-Stores",
    niche: "Küche & Haushalt",
    why: "WORTHBUY für Küchenhelfer mit Materialangaben, GIANXI (offizieller Store) für Pfannen & Küchenwerkzeug, Xiaomi/Mijia für schlichte Haushalts-Gadgets.",
  },
  {
    stores: "Huacan · GATYZTORY · RUOPOTY",
    niche: "Kreativ & DIY",
    why: "DIE Adressen für Diamond Painting (Huacan) und Malen nach Zahlen (GATYZTORY, RUOPOTY) – riesige Motiv-Auswahl, vollständige Kits, offizielle Stores.",
  },
  {
    stores: "QCY · Edifier",
    niche: "Audio-Zubehör (falls du dahin erweiterst)",
    why: "Etablierte Audio-Marken mit offiziellen Stores – falls du Kopfhörer & Co. ins Sortiment nimmst.",
  },
];

/**
 * Ehrlichkeit: In diesen Nischen gibt es KEINE dominanten Marken-Stores auf
 * AliExpress (Deko, Garten, Grill, Yoga, Baby, Winter, Geschenke). Dort gilt:
 * «Choice»-Filter nutzen und die Händler-Checkliste anwenden.
 */
export const ALIEXPRESS_NO_BRAND_NOTE =
  "Ehrlich gesagt: In manchen Nischen (Deko, Garten, Grill, Yoga, Baby, Winter) gibt es keine dominanten Marken-Stores – dort wechseln die besten Händler laufend. Nutze dann den «Choice»-Filter und die Checkliste unten; sie funktioniert in jeder Nische.";

/** Woran man gute AliExpress-Händler generell erkennt. */
export const ALIEXPRESS_STORE_CHECKS = [
  "«Official Store» oder «Choice»-Kennzeichnung – AliExpress prüft und versendet Choice-Artikel selbst (schneller + geprüfter).",
  "Store-Alter 3+ Jahre und 95 %+ positive Bewertungen (im Store-Profil sichtbar).",
  "Beim Produkt: 1000+ Bestellungen UND 4.7+ Sterne – lies gezielt die 1-Stern-Bewertungen mit Fotos.",
  "Antwortet der Händler im Chat innert 24 h auf deine Zertifikats-Frage? Wer ausweicht, fliegt raus.",
  "Fotos in den Bewertungen mit den Produktfotos vergleichen – grosse Abweichung = Finger weg.",
];

/** Kostenlose Recherche-Tools, mit denen man aktuelle & kommende Trendprodukte findet. */
export const RESEARCH_TOOLS = [
  {
    name: "TikTok Creative Center",
    url: "https://ads.tiktok.com/business/creativecenter",
    what: "Zeigt kostenlos die erfolgreichsten Werbevideos und Trend-Produkte nach Land und Branche – die wichtigste Quelle für «was kommt als Nächstes».",
  },
  {
    name: "Google Trends",
    url: "https://trends.google.ch",
    what: "Prüfe, ob die Nachfrage nach einem Produkt steigt oder fällt (Region: Schweiz einstellen). Steigende Kurve = kommender Trend.",
  },
  {
    name: "AliExpress Bestseller",
    url: "https://www.aliexpress.com",
    what: "Sortiere Kategorien nach Bestellungen: Produkte mit tausenden Bestellungen und 4.5+ Sternen sind bewährte Gewinner.",
  },
  {
    name: "Amazon Bestseller & «Movers and Shakers»",
    url: "https://www.amazon.de/gp/movers-and-shakers",
    what: "Zeigt, welche Produkte gerade stark im Rang steigen – ein Frühindikator für Trends im DACH-Raum.",
  },
  {
    name: "Pinterest Trends",
    url: "https://trends.pinterest.com",
    what: "Pinterest-Nutzer:innen planen Käufe Wochen im Voraus – ideal, um kommende Saison-Trends (Deko, Geschenke) früh zu erkennen.",
  },
];
