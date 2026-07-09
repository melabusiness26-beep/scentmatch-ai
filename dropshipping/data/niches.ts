/**
 * Kuratierte Nischen für den Schweizer Markt.
 * Wird vom Nischen-Finder, dem Store-Planer und den Produktseiten genutzt.
 */

export type Niche = {
  slug: string;
  name: string;
  emoji: string;
  short: string;
  audience: string;
  competition: "niedrig" | "mittel" | "hoch";
  beginnerScore: number; // 1–5: Wie einsteigerfreundlich ist die Nische?
  marginHint: string;
  whySwitzerland: string;
  risks: string;
  storeNameIdeas: string[];
  videoAngles: string[];
};

export const NICHES: Niche[] = [
  {
    slug: "haustiere",
    name: "Haustiere",
    emoji: "🐶",
    short: "Hunde- und Katzenzubehör – emotionale Käufe mit treuer Zielgruppe.",
    audience: "Hunde- und Katzenbesitzer:innen 25–55, kaufen aus Liebe zum Tier – oft impulsiv.",
    competition: "mittel",
    beginnerScore: 5,
    marginHint: "Typisch 3–5× Aufschlag möglich (Einkauf CHF 3–10, Verkauf CHF 15–40).",
    whySwitzerland:
      "In der Schweiz leben über 1,7 Mio. Katzen und rund 570'000 Hunde. Tierbesitzer:innen geben überdurchschnittlich viel aus, und Schweizer Kundschaft zahlt für Qualität gern etwas mehr.",
    risks:
      "Futter und Pflegeprodukte sind heikel (Gesundheit, Vorschriften) – starte mit Zubehör statt mit Futter oder Snacks.",
    storeNameIdeas: ["PfotenPost", "Bello & Co", "SwissPfote", "Miau Market", "Fellfreund"],
    videoAngles: [
      "Vorher/Nachher: Problem des Tiers (z. B. Haare überall) → Produkt löst es",
      "POV aus Sicht des Hundes/der Katze (sehr hohe Teilraten)",
      "«Dinge, die dein Hund liebt, von denen du nichts wusstest»-Listen",
    ],
  },
  {
    slug: "home-living",
    name: "Home & Living",
    emoji: "🏠",
    short: "Deko, Licht und Ordnung – visuell starke Produkte, perfekt für Social Media.",
    audience: "18–35, richtet die erste eigene Wohnung ein, inspiriert von TikTok/Pinterest.",
    competition: "hoch",
    beginnerScore: 4,
    marginHint: "Aufschlag 3–4× üblich; Lampen und Deko haben starke wahrgenommene Wertigkeit.",
    whySwitzerland:
      "Hohe Kaufkraft und viel Umzugsbewegung (Mietwohnungen). «Cozy Home»-Content funktioniert in der DACH-Region hervorragend.",
    risks:
      "Sehr viele Anbieter – du brauchst gutes Video-Marketing statt nur Produktfotos. Elektroartikel brauchen CH-kompatible Stecker/Netzteile (Typ J beachten!).",
    storeNameIdeas: ["Wohnglanz", "Casa Lumen", "Hyggli", "RaumZeit Living", "Nordform Home"],
    videoAngles: [
      "Room-Makeover in 15 Sekunden (Zeitraffer)",
      "«Aesthetic»-Videos mit Musik-Trend – Licht an/aus als Wow-Moment",
      "«3 Dinge, die deine Wohnung sofort gemütlicher machen»",
    ],
  },
  {
    slug: "beauty-selfcare",
    name: "Beauty & Selfcare",
    emoji: "✨",
    short: "Tools statt Kosmetik: Massage, Haarstyling, Skincare-Zubehör.",
    audience: "Frauen 18–45, stark auf Instagram/TikTok unterwegs, Routinen-orientiert.",
    competition: "hoch",
    beginnerScore: 3,
    marginHint: "Aufschlag 3–5×; Sets und Bundles erhöhen den Warenkorb.",
    whySwitzerland:
      "Selfcare boomt, und Schweizer Kund:innen bestellen Beauty-Tools gerne online. Wichtig: Tools (Bürsten, Roller) statt Cremes – Kosmetik-Inhaltsstoffe unterliegen strengen Vorschriften.",
    risks:
      "KEINE Cremes/Seren/Kosmetika dropshippen (Melde- und Kennzeichnungspflichten). Elektrische Geräte mit Heilversprechen (z. B. «Anti-Aging-Laser») meiden – Heilversprechen sind rechtlich riskant.",
    storeNameIdeas: ["Glowerie", "SoftGlow Studio", "Velva Beauty", "PureRoutine", "Lumessa"],
    videoAngles: [
      "Get-ready-with-me mit dem Produkt als Held der Routine",
      "Vorher/Nachher (ehrlich bleiben, nichts versprechen, was das Tool nicht kann)",
      "«Ich habe X 30 Tage getestet»-Erfahrungsformat",
    ],
  },
  {
    slug: "fitness-sport",
    name: "Fitness & Sport",
    emoji: "💪",
    short: "Home-Workout, Regeneration und Outdoor – saisonstark im Januar und Frühling.",
    audience: "20–45, trainiert zuhause oder draussen, kauft Ausrüstung in Schüben (Neujahr!).",
    competition: "mittel",
    beginnerScore: 4,
    marginHint: "Aufschlag 3–4×; Zubehör-Sets (z. B. Bänder) sind leicht und günstig zu versenden.",
    whySwitzerland:
      "Die Schweiz ist eines der sportlichsten Länder Europas. Home-Fitness und Wandern/Outdoor sind riesige, stabile Märkte.",
    risks:
      "Grosse/schwere Geräte (Hanteln) lohnen sich im Dropshipping nicht (Versandkosten). Produkte mit Akku (Massagepistolen) haben Versandauflagen – Lieferant genau prüfen.",
    storeNameIdeas: ["AlpenFit", "MoveLab", "Trainly", "PeakForm", "HomeGym Helden"],
    videoAngles: [
      "3 Übungen mit dem Produkt in 20 Sekunden",
      "«Das benutze ich statt Fitnessstudio»-Story",
      "Regenerations-Routine nach dem Sport (sehr gute Watchtime)",
    ],
  },
  {
    slug: "kueche-haushalt",
    name: "Küche & Haushalt",
    emoji: "🍳",
    short: "Praktische Helfer mit sofort sichtbarem Nutzen – ideal für Demo-Videos.",
    audience: "25–60, sehr breit – jeder kocht. Problemlösende Gadgets verkaufen sich ganzjährig.",
    competition: "mittel",
    beginnerScore: 5,
    marginHint: "Aufschlag 3–4×; kleine Helfer unter CHF 30 sind typische Impulskäufe.",
    whySwitzerland:
      "Breiteste Zielgruppe überhaupt, kein Saisonrisiko. Demo-Videos («so schnell geht das») erklären den Nutzen ohne viele Worte – perfekt für TikTok.",
    risks:
      "Produkte mit Lebensmittelkontakt sollten unbedenkliches Material haben (z. B. lebensmittelechtes Silikon, BPA-frei) – beim Lieferanten Zertifikate (LFGB/FDA) verlangen.",
    storeNameIdeas: ["Küchenheld", "CookNest", "Praktiko", "Löffelwerk", "SwissKitchen Tools"],
    videoAngles: [
      "Satisfying-Demo: Produkt löst Problem in 5 Sekunden (Schneiden, Schälen, Reinigen)",
      "«Küchen-Gadgets, die du wirklich brauchst»-Ranking",
      "Rezept-Video, in dem das Gadget beiläufig glänzt",
    ],
  },
  {
    slug: "baby-kids",
    name: "Baby & Kids",
    emoji: "🧸",
    short: "Eltern kaufen ständig – aber Sicherheit und Vorschriften ernst nehmen.",
    audience: "Eltern 25–40, kaufen häufig und wiederholt; Geschenke von Grosseltern/Gotti/Götti.",
    competition: "mittel",
    beginnerScore: 2,
    marginHint: "Aufschlag 3–4×; personalisierte Produkte (Print-on-Demand) mit Extra-Marge.",
    whySwitzerland:
      "Rund 80'000 Geburten pro Jahr, hohe Ausgaben pro Kind. Meilenstein-/Erinnerungsprodukte sind beliebte Geschenke.",
    risks:
      "Achtung: Spielzeug braucht CE-/Sicherheitskonformität, verschluckbare Kleinteile sind tabu. Starte mit Deko/Erinnerungsprodukten (z. B. Meilenstein-Decken) statt mit Spielzeug oder Schnullern.",
    storeNameIdeas: ["Zwergenpost", "MiniMoments", "BärenLiebe", "KleinUndFein", "Storchennest"],
    videoAngles: [
      "Emotionale Meilenstein-Momente (Monat 1–12) mit Musik",
      "Geschenkideen zur Geburt – Listenformat",
      "Alltags-Hacks für frische Eltern",
    ],
  },
  {
    slug: "tech-gadgets",
    name: "Tech & Gadgets",
    emoji: "📱",
    short: "Handy-Zubehör und smarte Helfer – hohe Nachfrage, schnelle Trends.",
    audience: "16–45, technikaffin, kauft Zubehör mehrmals pro Jahr.",
    competition: "hoch",
    beginnerScore: 3,
    marginHint: "Aufschlag 2.5–4×; Trends drehen schnell – Timing ist alles.",
    whySwitzerland:
      "Sehr hohe Smartphone-Dichte und Kaufkraft. Zubehör (Halterungen, Ladegeräte, Finder) wird ständig nachgekauft.",
    risks:
      "Elektronik: CH-Stecker (Typ J) bzw. USB-Ladung bevorzugen, CE-Kennzeichnung verlangen. Akkus haben Versandauflagen. Keine Markenimitate (AirPods-Klone etc.) – rechtlich gefährlich.",
    storeNameIdeas: ["Gadgetory", "TechAlp", "Plug & Wow", "Smartkram", "Voltera"],
    videoAngles: [
      "«Das Gadget, von dem du nicht wusstest, dass du es brauchst»",
      "Problem-Demo: Kabelsalat/leerer Akku → Lösung in 3 Sekunden",
      "Setup-/Desk-Makeover-Videos (Pinterest & TikTok)",
    ],
  },
];

NICHES.push({
  slug: "outdoor-reisen",
  name: "Outdoor & Reisen",
  emoji: "🏔️",
  short: "Wandern, Camping, Reisen – die Schweiz ist der perfekte Heimmarkt dafür.",
  audience: "20–55, wandert, campt, reist – plant Ausflüge am Handy und kauft Ausrüstung online.",
  competition: "mittel",
  beginnerScore: 4,
  marginHint: "Aufschlag 3–4×; leichtes, faltbares Zubehör ist ideal zu versenden.",
  whySwitzerland:
    "Wandern ist Volkssport Nr. 1 in der Schweiz, dazu Seen, Camping und viel Reiselust. Outdoor-Content (Berge, Seen) produziert sich hier fast von selbst – dein Umfeld ist die Kulisse.",
  risks:
    "Stark saisonal (April–Oktober am stärksten). Keine Sicherheitsausrüstung verkaufen (Klettergurte, Helme) – bei Versagen haftungskritisch. Bleib bei Komfort-Zubehör.",
  storeNameIdeas: ["AlpKit", "Wanderlust Basel", "GipfelGut", "TrailBuddy", "Seeluft Shop"],
  videoAngles: [
    "Produkt im echten Einsatz am Berg/See – die Schweizer Kulisse verkauft mit",
    "«Das nehme ich auf jede Wanderung mit»-Packlisten-Videos",
    "Vorher/Nachher: Kofferchaos → organisiert gepackt",
  ],
});

export function getNiche(slug: string): Niche | undefined {
  return NICHES.find((n) => n.slug === slug);
}
