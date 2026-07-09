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
