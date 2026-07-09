/**
 * Kuratierte Nischen für den Schweizer Markt.
 * Wird vom Nischen-Finder, dem Store-Planer und den Produktseiten genutzt.
 */

export type NicheTrend = "Im Trend" | "Kommender Trend" | "Dauerbrenner";

export type Niche = {
  slug: string;
  name: string;
  emoji: string;
  trend: NicheTrend;
  short: string;
  audience: string;
  competition: "niedrig" | "mittel" | "hoch";
  beginnerScore: number; // 1–5: Wie einsteigerfreundlich ist die Nische?
  marginHint: string;
  whySwitzerland: string;
  risks: string;
  storeNameIdeas: string[];
  videoAngles: string[];
  /** Wo man für diese Nische die beste Ware bekommt – Qualität UND Menge. */
  bestSources: string[];
};

export const NICHES: Niche[] = [
  {
    slug: "haustiere",
    name: "Haustiere",
    emoji: "🐶",
    trend: "Dauerbrenner",
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
    bestSources: [
      "CJ Dropshipping (Kategorie «Pet Supplies»): beste Balance aus Qualität und Preis, Qualitätskontrolle vor Versand möglich – ideal ab regelmässigen Bestellungen.",
      "AliExpress: Händler mit «Choice»-Label, 1000+ Bestellungen und 95 %+ Bewertung wählen – Marken-Tipp: «Truelove» für Geschirre & Premium-Zubehör.",
      "Qualitäts-Merkmal der Nische: Nähte, Verschlüsse und Materialgeruch – Tiere kauen an allem, also nur robuste Muster freigeben.",
    ],
  },
  {
    slug: "home-living",
    name: "Home & Living",
    emoji: "🏠",
    trend: "Im Trend",
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
    bestSources: [
      "AliExpress für Trends (riesige Auswahl an Lampen/Deko) – auf «Choice»-Versand achten, der ist schneller und geprüfter.",
      "BigBuy (EU-Lager) für die Bestseller, sobald sie sich beweisen: 3–7 Tage Lieferzeit und EU-Produktnormen.",
      "Qualitäts-Merkmal: USB-Strom statt Netzstecker (CH-Stecker-Problem!), CE-Kennzeichnung schriftlich bestätigen lassen.",
    ],
  },
  {
    slug: "beauty-selfcare",
    name: "Beauty & Selfcare",
    emoji: "✨",
    trend: "Im Trend",
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
    bestSources: [
      "CJ Dropshipping (Beauty Tools): saubere Verpackung und Qualitätskontrolle – bei Beauty zählt der erste Eindruck doppelt.",
      "AliExpress nur mit Muster-Test: Borsten, Nähte und Gerüche schwanken stark zwischen Händlern desselben Produkts.",
      "Qualitäts-Merkmal: Nur Tools, keine Kosmetik/Cremes (Vorschriften!). Bei Stein-Produkten (Gua Sha) Materialangabe verlangen.",
    ],
  },
  {
    slug: "fitness-sport",
    name: "Fitness & Sport",
    emoji: "💪",
    trend: "Dauerbrenner",
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
    bestSources: [
      "AliExpress für Bänder/Matten (einfache Produkte, kaum Ausfallrisiko) – Latex-Geruchstest am Muster machen.",
      "BigBuy für Markware und schnelle Lieferung, sobald Volumen da ist.",
      "Qualitäts-Merkmal: Belastungstests! Bänder 3× dehnen, Rollen mit Körpergewicht – Fitnessprodukte werden hart benutzt.",
    ],
  },
  {
    slug: "kueche-haushalt",
    name: "Küche & Haushalt",
    emoji: "🍳",
    trend: "Dauerbrenner",
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
    bestSources: [
      "AliExpress: riesige Auswahl an Küchenhelfern; nur Händler, die LFGB-/FDA-Zertifikate (Lebensmittelechtheit) im Chat belegen können.",
      "CJ Dropshipping für Bestseller mit Branding-Option (eigenes Logo auf der Verpackung wirkt in der Küche besonders wertig).",
      "Qualitäts-Merkmal: Lebensmittelkontakt = Zertifikat-Pflicht. Klingen am Rüebli testen, Deckel auf Dichtigkeit.",
    ],
  },
  {
    slug: "baby-kids",
    name: "Baby & Kids",
    emoji: "🧸",
    trend: "Dauerbrenner",
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
    bestSources: [
      "Print-on-Demand (Printful/Printify) für personalisierte Erinnerungsprodukte: EU-Produktion, Öko-Tex-Materialien, kein Vorschriften-Risiko wie bei Spielzeug.",
      "CJ Dropshipping nur mit strenger Prüfung: CE-Kennzeichnung und Materialnachweise zwingend anfordern.",
      "Qualitäts-Merkmal: Bei Baby gilt die härteste Regel – im Zweifel NICHT verkaufen. Keine Kleinteile, keine unbelegten Materialien.",
    ],
  },
  {
    slug: "tech-gadgets",
    name: "Tech & Gadgets",
    emoji: "📱",
    trend: "Im Trend",
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
    bestSources: [
      "AliExpress-Marken wie Baseus, Ugreen oder Hoco direkt in deren offiziellen Stores: Marken-Qualität zu Fabrikpreisen, riesige Mengen verfügbar.",
      "CJ Dropshipping für neutrale Gadgets mit Qualitätskontrolle vor Versand.",
      "Qualitäts-Merkmal: Ladeleistung nachmessen, CE bestätigen lassen, USB-C bevorzugen. Keine Marken-Klone!",
    ],
  },
];

NICHES.push({
  slug: "outdoor-reisen",
  name: "Outdoor & Reisen",
  emoji: "🏔️",
    trend: "Im Trend",
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
    bestSources: [
      "AliExpress-Stores von Outdoor-Spezialisten (Naturehike & Co.): erstaunlich gute Qualität, grosse Lager.",
      "BigBuy für schnelle Lieferung in der Hauptsaison (der Sommer wartet nicht auf 20 Tage Lieferzeit).",
      "Qualitäts-Merkmal: Wasserdichtigkeit und Nähte selbst testen – draussen zeigt sich jede Schwäche sofort.",
    ],
});

NICHES.push(
  {
    slug: "gaming-zubehoer",
    name: "Gaming & Streaming",
    emoji: "🎮",
    trend: "Im Trend",
    short: "Desk-Setups, RGB und Zubehör – eine kauffreudige Community, die Ästhetik liebt.",
    audience: "16–35, spielt am PC/Handy/Konsole, investiert laufend ins Setup; Geschenkkäufe durch Partner & Eltern.",
    competition: "mittel",
    beginnerScore: 4,
    marginHint: "Aufschlag 3–4×; Setup-Zubehör (Ständer, Pads, Licht) ist leicht und unkompliziert.",
    whySwitzerland:
      "Gaming ist längst Mainstream – über die Hälfte der Schweizer Bevölkerung spielt. Desk-Setup-Content (#battlestation) ist eine eigene, sehr aktive Video-Welt mit hoher Kauflust.",
    risks:
      "Keine Elektronik mit Markenbezug (Controller-Klone etc.) – rechtlich riskant und qualitativ heikel. Bleib bei Zubehör: Ständer, Pads, Beleuchtung, Organizer.",
    storeNameIdeas: ["SetupLab", "PixelNest", "LevelUp Store", "DeskArena", "LootBude"],
    videoAngles: [
      "Desk-Setup-Makeover: vorher chaotisch → nachher clean mit RGB",
      "«5 Dinge, die dein Setup sofort besser machen»-Listen",
      "Satisfying Kabelmanagement-Videos (laufen erstaunlich gut)",
    ],
    bestSources: [
      "AliExpress: Setup-Zubehör (Ständer, Pads, Licht) von Stores mit 4.8+ Bewertung – die Community ist anspruchsvoll und bewertet ehrlich.",
      "CJ Dropshipping für RGB-Produkte mit Qualitätskontrolle (Elektronik-Ausfälle vermeiden).",
      "Qualitäts-Merkmal: USB-Hubs und RGB real durchtesten; Verarbeitung im Video zeigen – Gamer erkennen Billigware sofort.",
    ],
  },
  {
    slug: "garten-balkon",
    name: "Garten & Balkon",
    emoji: "🌱",
    trend: "Im Trend",
    short: "Urban Gardening: Hochbeet, Balkon und Kräuter – wächst jedes Jahr weiter.",
    audience: "25–65, vom Balkon-Gärtner bis zur Schrebergarten-Familie; stark saisonale Kauffreude ab März.",
    competition: "niedrig",
    beginnerScore: 4,
    marginHint: "Aufschlag 3–4×; Bewässerung und Deko sind leichte, margenstarke Produkte.",
    whySwitzerland:
      "Urban Gardening boomt – Balkone, Hochbeete und Familiengärten überall. Weniger Dropshipping-Konkurrenz als in Beauty/Tech, und die Zielgruppe ist treu und begeisterungsfähig.",
    risks:
      "Stark saisonal (März–September) – im Winter mit Indoor-Produkten (Anzucht, Kräuter) überbrücken. Keine Samen/Pflanzen dropshippen (Einfuhrbestimmungen!) – nur Zubehör.",
    storeNameIdeas: ["Balkonglück", "GrünZeug", "Beetschwester", "Gartenpost", "Urban Gaertli"],
    videoAngles: [
      "Zeitraffer: Balkon-Makeover vom kahlen Balkon zur grünen Oase",
      "«Das giesst meine Pflanzen, wenn ich in den Ferien bin»-Problemlöser",
      "Ernte-Content: eigene Kräuter/Tomaten ernten (extrem hohe Interaktion)",
    ],
    bestSources: [
      "AliExpress im Spätwinter bestellen (Saisonware ist ab Februar top verfügbar, im Mai teils ausverkauft).",
      "BigBuy für die Hauptsaison: EU-Lager liefert schnell genug, wenn der Balkon-Boom losgeht.",
      "Qualitäts-Merkmal: UV- und Wetterfestigkeit erfragen; Solar-Produkte 1 Woche real testen.",
    ],
  },
  {
    slug: "wellness-schlaf",
    name: "Schlaf & Entspannung",
    emoji: "😴",
    trend: "Kommender Trend",
    short: "Sleep-Tech und Entspannung – der grosse Gesundheitstrend nach Fitness.",
    audience: "25–55, gestresst, schläft schlecht, gibt für besseren Schlaf gerne Geld aus.",
    competition: "niedrig",
    beginnerScore: 4,
    marginHint: "Aufschlag 3–4×; «Schlafqualität» rechtfertigt Premium-Preise.",
    whySwitzerland:
      "Schlaf ist das nächste grosse Gesundheitsthema («Sleepmaxxing» wächst stark). Gestresste Berufstätige sind kaufkräftig – und das Thema betrifft buchstäblich jeden.",
    risks:
      "Keine Heilversprechen («heilt Schlaflosigkeit») – nur Komfort und Wohlbefinden versprechen. Keine Nahrungsergänzung (Melatonin etc.) dropshippen – bleib bei Masken, Licht und Sound.",
    storeNameIdeas: ["Nachtruh", "SoftNacht", "Traumfabrik CH", "Ruhepol", "SchlafGut Studio"],
    videoAngles: [
      "Abendroutinen-Ästhetik: «Meine 9-Uhr-Routine für besseren Schlaf»",
      "«Ich habe 7 Tage lang X getestet» mit ehrlichem Schlaf-Tagebuch",
      "POV: Sonntagmorgen ausschlafen – Gemütlichkeits-Content",
    ],
    bestSources: [
      "CJ Dropshipping: Sleep-Tech mit Qualitätskontrolle (Klangqualität und Verarbeitung schwanken bei Schlafprodukten stark).",
      "AliExpress für Textilien (Masken, Bezüge) – Materialangaben verlangen und am eigenen Gesicht testen.",
      "Qualitäts-Merkmal: Alles selbst eine Woche benutzen – Schlafprodukte empfiehlt man nur, wenn man ihnen selbst vertraut.",
    ],
  },
  {
    slug: "auto-pendeln",
    name: "Auto & Pendeln",
    emoji: "🚗",
    trend: "Dauerbrenner",
    short: "Ordnung und Komfort im Auto – praktische Problemlöser für Vielfahrer.",
    audience: "25–60, pendelt täglich oder fährt Familie durch die Gegend; kauft Problemlöser sofort.",
    competition: "niedrig",
    beginnerScore: 4,
    marginHint: "Aufschlag 3–4×; Organizer und Reinigung sind bewährte Impulskäufe.",
    whySwitzerland:
      "Millionen Pendler:innen, hohe Autodichte, lange Arbeitswege – und kaum spezialisierte Schweizer Shops. Auto-Organisation ist ein unterschätzter, ruhiger Markt.",
    risks:
      "Nichts verkaufen, was die Sicherheit betrifft (Kindersitze, Warndreiecke – Normen!). Bleib bei Organisation, Reinigung und Komfort.",
    storeNameIdeas: ["Fahrwerk Shop", "CarOrdnung", "PendlerPro", "AutoNest", "Drivezeit"],
    videoAngles: [
      "Kofferraum-/Innenraum-Makeover in 30 Sekunden",
      "«Dinge, die in jedes Familienauto gehören»-Listen",
      "Satisfying Detailing-/Reinigungs-Videos",
    ],
    bestSources: [
      "AliExpress: Auto-Organizer und Reinigungsprodukte in riesiger Auswahl; Befestigungen an 2–3 Autos testen.",
      "CJ Dropshipping für Sauger & Elektronik (Qualitätskontrolle) und Branding auf den Bestsellern.",
      "Qualitäts-Merkmal: Alles unter realen Bedingungen testen (volle Ladung, Kurven, Hitze im Sommerauto).",
    ],
  },
  {
    slug: "buero-homeoffice",
    name: "Home-Office & Studium",
    emoji: "💻",
    trend: "Kommender Trend",
    short: "Desk-Setups, Ergonomie und Studytok – Arbeiten und Lernen zuhause bleibt.",
    audience: "20–50 im Home-Office plus Studierende (#studytok); kaufen für Produktivität und Ästhetik.",
    competition: "mittel",
    beginnerScore: 4,
    marginHint: "Aufschlag 3–4×; Ständer und Organizer wirken hochwertig bei tiefem Einkauf.",
    whySwitzerland:
      "Home-Office ist in der Schweiz fest etabliert, und die Study-Community wächst. Desk-Makeover-Content läuft auf TikTok UND Pinterest – doppelte Reichweite.",
    risks:
      "Grosse Möbel (Stühle, Tische) lohnen sich im Dropshipping nicht – bleib bei Zubehör. Ergonomie-Versprechen vorsichtig formulieren («entlastet» statt «heilt Rückenschmerzen»).",
    storeNameIdeas: ["Deskly", "StudySpot", "Pultwerk", "FokusZone", "Arbeitsplatz Studio"],
    videoAngles: [
      "Desk-Makeover: 3 Produkte, komplett neuer Arbeitsplatz",
      "Study-with-me-Ästhetik mit dem Produkt im Bild",
      "«Produktivitäts-Setup unter CHF 100»-Zusammenstellungen",
    ],
    bestSources: [
      "AliExpress-Stores von Desk-Marken (z. B. Baseus für Ständer/Hubs): Marken-Qualität, grosse Mengen, faire Preise.",
      "BigBuy für ergonomisches Zubehör mit EU-Normen und schneller Lieferung.",
      "Qualitäts-Merkmal: Stabilität unter Last (Laptop drauf, tippen!) und saubere Alu-/Kunststoff-Verarbeitung.",
    ],
  },
  {
    slug: "nachhaltig-leben",
    name: "Nachhaltig leben",
    emoji: "♻️",
    trend: "Kommender Trend",
    short: "Wiederverwendbar statt Wegwerf – Werte-getriebene Kundschaft mit Wiederkauf.",
    audience: "20–45, umweltbewusst, kauft lieber einmal gut als zehnmal billig; sehr community-getrieben.",
    competition: "niedrig",
    beginnerScore: 3,
    marginHint: "Aufschlag 3–4×; Sets («Zero-Waste-Starterset») heben den Warenkorb.",
    whySwitzerland:
      "Nachhaltigkeit ist in der Schweiz Kaufargument Nr. 1 geworden – und die Community teilt gute Produkte aktiv weiter. Wer hier ehrlich auftritt, baut eine treue Marke auf.",
    risks:
      "Die Zielgruppe merkt Greenwashing sofort: Lange Lieferwege aus China ehrlich kommunizieren oder EU-Lager nutzen. Materialien und Zertifikate sauber belegen.",
    storeNameIdeas: ["GrünGut", "NullAbfall", "Wiederschön", "EcoNest CH", "Kreislauf Shop"],
    videoAngles: [
      "«Dinge in meinem Haushalt, die Abfall ersetzen» – Serienformat",
      "Vorher/Nachher: Wegwerfprodukt vs. wiederverwendbare Alternative",
      "Ehrliche Ökobilanz-Erklärungen (baut enorm Vertrauen auf)",
    ],
    bestSources: [
      "EU-Quellen bevorzugen (BigBuy, europäische Etsy-/Faire-Anbieter): kurze Lieferwege gehören bei dieser Zielgruppe zur Glaubwürdigkeit.",
      "AliExpress nur mit belegten Materialien (Bambus, Bio-Baumwolle, lebensmittelechtes Wachs) – Zertifikate anfordern.",
      "Qualitäts-Merkmal: Waschbarkeit und Langlebigkeit selbst testen – ein Zero-Waste-Produkt, das nach 5 Wäschen kaputt ist, zerstört dein Image.",
    ],
  }
);

NICHES.push(
  {
    slug: "schmuck-accessoires",
    name: "Schmuck & Accessoires",
    emoji: "💍",
    trend: "Im Trend",
    short: "Wasserfester Edelstahl-Schmuck & Personalisiertes – kleine Pakete, grosse Margen.",
    audience: "Frauen 16–45 (Selbstkauf + Geschenke von Partnern); kauft mehrmals pro Jahr, folgt Trends.",
    competition: "hoch",
    beginnerScore: 4,
    marginHint: "Aufschlag 4–6× möglich (Einkauf CHF 2–8, Verkauf CHF 19–49) – eine der margenstärksten Nischen überhaupt.",
    whySwitzerland:
      "Schmuck ist federleicht (Brief-Versand!), lagerfähig und emotional. Der Trend zu wasserfestem Edelstahl-Schmuck («waterproof jewelry») löst das alte Anlauf-Problem – und personalisierte Stücke (Namensketten) sind perfekte Geschenke mit Premium-Preis.",
    risks:
      "Billige Legierungen laufen an und färben Haut grün – das ruiniert Bewertungen. Nur Edelstahl (316L), 925er Silber oder 18K-vergoldeten Edelstahl verkaufen. Nickel-Grenzwerte beachten (Nickel-Allergie!) – Materialnachweis vom Lieferanten verlangen.",
    storeNameIdeas: ["Goldstück Studio", "Véla Bijoux", "Aurelia Schmuck", "Klunkerliebe", "Lueur"],
    videoAngles: [
      "«Wasserfest?»-Beweis: Schmuck unter dem Wasserhahn, im See, beim Sport – der Trend-Winkel schlechthin",
      "Styling-Videos: 1 Kette, 3 Outfits (Get-ready-with-me)",
      "Unboxing der eigenen hübschen Verpackung – bei Schmuck kaufentscheidend",
    ],
    bestSources: [
      "Nihaojewelry: DER Spezialist für Mode-Schmuck im Grosshandel – riesige Auswahl, tiefe Preise, kleine Mindestmengen; ideal, sobald du Bestseller auf Vorrat holst (Hybrid-Modell).",
      "AliExpress: Gezielt nach «316L stainless steel» / «18K gold plated stainless steel» filtern und nur Stores mit 4.8+ und zehntausenden Verkäufen – Muster 2 Wochen im Alltag tragen (Duschen!).",
      "CJ Dropshipping (Jewelry): gute Mitte mit Qualitätskontrolle und eigenem Branding (Schmuckbeutel mit Logo = Premium-Gefühl).",
      "Für Personalisiertes (Namensketten, Gravuren): CJ-Print-on-Demand oder Etsy-Grosshändler – Premium-Preise ab CHF 39 möglich.",
      "Qualitäts-Merkmal: 2-Wochen-Trage-Test (Wasser, Schweiss, Parfüm). Läuft nichts an und färbt nichts ab → shop-tauglich. Materialzertifikat (nickelfrei) schriftlich geben lassen.",
    ],
  },
  {
    slug: "kaffee-tee",
    name: "Kaffee & Tee",
    emoji: "☕",
    trend: "Im Trend",
    short: "Home-Café-Zubehör – die Genuss-Community investiert laufend in ihr Ritual.",
    audience: "20–45, zelebriert Kaffee/Matcha/Tee als Ritual; kauft Zubehör schrittweise nach.",
    competition: "mittel",
    beginnerScore: 4,
    marginHint: "Aufschlag 3–4×; ästhetisches Zubehör (Glas, Holz) wirkt teurer als es kostet.",
    whySwitzerland:
      "Die Schweiz gehört zu den grössten Kaffee-Nationen der Welt (Konsum pro Kopf!). Die Home-Café-Bewegung liefert unerschöpflichen Content – und Zubehör wird ständig ergänzt.",
    risks:
      "Alles mit Lebensmittelkontakt braucht belegte Materialien (Borosilikatglas, Edelstahl, LFGB). Elektrische Geräte (Wasserkocher) wegen CH-Stecker meiden – manuelles Zubehör ist einfacher.",
    storeNameIdeas: ["Brühzeit", "Café Zuhause", "TassenGlück", "Röstliebe", "Teemoment"],
    videoAngles: [
      "Morgenroutine-Ästhetik: Aufguss in Zeitlupe, Dampf im Gegenlicht",
      "«Dein Café verlangt 7 Franken dafür»-Vergleiche",
      "Latte-Art-/Aufguss-Versuche mit ehrlichem Lerneffekt",
    ],
    bestSources: [
      "AliExpress: grosses Angebot an Drippern, Kannen und Zubehör – nur mit Borosilikat-/Edelstahl-Nachweis und LFGB-Zertifikat.",
      "BigBuy: europäische Kaffee-Accessoires mit schneller Lieferung – gut für die Geschenk-Saison.",
      "Qualitäts-Merkmal: Hitzetest mit kochendem Wasser (Glas!), Geschmacksneutralität prüfen, Dichtungen kontrollieren.",
    ],
  },
  {
    slug: "yoga-achtsamkeit",
    name: "Yoga & Achtsamkeit",
    emoji: "🧘",
    trend: "Im Trend",
    short: "Matten, Kissen & Ruhe-Zubehör – kaufkräftige Community mit Werten.",
    audience: "Frauen 25–55 (80 % der Yoga-Community), praktiziert regelmässig, achtet auf Material und Nachhaltigkeit.",
    competition: "mittel",
    beginnerScore: 4,
    marginHint: "Aufschlag 3–4×; hochwertig anmutende Materialien (Kork, Bio-Baumwolle) rechtfertigen Premium-Preise.",
    whySwitzerland:
      "Yoga ist in der Schweiz fest etabliert (Studios in jeder Stadt) und wächst weiter Richtung Achtsamkeit/Meditation. Die Zielgruppe überschneidet sich mit Nachhaltigkeit – doppeltes Content-Potenzial.",
    risks:
      "Die Community erkennt Billig-Material sofort (rutschende Matten sind der Klassiker). Keine spirituellen Heilsversprechen – Ruhe und Komfort verkaufen, nicht Erleuchtung.",
    storeNameIdeas: ["Stillpunkt", "Asana Studio Shop", "Matte & Mehr", "Ruhewerk", "Om Collective"],
    videoAngles: [
      "Ruhige Flow-Videos bei Morgenlicht mit dem Produkt im Einsatz",
      "«Meine 10-Minuten-Abendroutine gegen Stress»",
      "Ehrlicher Matten-Rutsch-Test (Community liebt ehrliche Tests)",
    ],
    bestSources: [
      "AliExpress: Kork- und TPE-Matten von Spezial-Stores (4.8+) – Rutsch-Test mit feuchten Händen am Muster ist Pflicht.",
      "BigBuy: EU-Yoga-Zubehör, gut für schwerere Produkte (Kissen, Bolster) mit kürzerem Versandweg.",
      "Qualitäts-Merkmal: Geruchstest (TPE-Matten dürfen nicht chemisch stinken), Ökotex/Materialnachweise für Textilien.",
    ],
  },
  {
    slug: "grill-bbq",
    name: "Grill & BBQ",
    emoji: "🔥",
    trend: "Dauerbrenner",
    short: "Grill-Zubehör für die halbe Schweiz, die im Sommer draussen steht.",
    audience: "Männer 25–60 als Kern (Geschenke: Partnerinnen!), Familien mit Garten/Balkon.",
    competition: "niedrig",
    beginnerScore: 4,
    marginHint: "Aufschlag 3–4×; Zubehör-Sets und Gadgets sind beliebte Geschenke («Grill-Papi»).",
    whySwitzerland:
      "Grillieren ist Schweizer Sommer-Kultur (Cervelat!) – vom Balkon bis zur Feuerstelle am See. Wenig spezialisierte Dropshipping-Konkurrenz und klare Geschenk-Anlässe (Vatertag, Geburtstage, Einweihung).",
    risks:
      "Saisonal (April–September) – mit Indoor-/Geschenkprodukten überbrücken. Alles mit Lebensmittelkontakt braucht Zertifikate; bei Thermometern Genauigkeit testen.",
    storeNameIdeas: ["Glutwerk", "GrillGut", "Feuer & Rost", "BBQ Bude", "Rauchzeichen"],
    videoAngles: [
      "Satisfying Grill-Content: Anzünden, Brutzeln, perfekte Streifen",
      "«Gadgets, die jeder Grill-Fan braucht»-Rankings vor der Saison",
      "Vorher/Nachher: eingebrannter Rost vs. sauber (Reinigungsprodukte)",
    ],
    bestSources: [
      "AliExpress: riesiges BBQ-Zubehör-Sortiment – bei allem mit Fleischkontakt LFGB-/FDA-Zertifikat verlangen.",
      "BigBuy: EU-Grillzubehör für die Hauptsaison (schnelle Lieferung, wenn der Sommer da ist).",
      "Qualitäts-Merkmal: Hitzetest am echten Grill, Thermometer gegen Referenz messen, Edelstahl-Qualität prüfen.",
    ],
  },
  {
    slug: "velo-ebike",
    name: "Velo & E-Bike",
    emoji: "🚲",
    trend: "Im Trend",
    short: "Zubehör für das Land der Velowege – vom Pendler bis zur E-Bike-Familie.",
    audience: "20–65, pendelt oder töfft am Wochenende durchs Land; E-Bike-Boom bringt neue, kaufkräftige Kundschaft.",
    competition: "niedrig",
    beginnerScore: 4,
    marginHint: "Aufschlag 3–4×; Taschen, Halterungen und Licht sind bewährte Dauerläufer.",
    whySwitzerland:
      "Die Schweiz erlebt einen anhaltenden Velo- und E-Bike-Boom (jedes 2. verkaufte Velo ist elektrisch). Zubehör wird laufend nachgekauft – und Schweizer Velowege liefern die Video-Kulisse.",
    risks:
      "Keine sicherheitskritischen Teile (Bremsen, Helme – Normen & Haftung!). Bleib bei Komfort: Taschen, Halterungen, Licht, Schutz.",
    storeNameIdeas: ["Velofreund", "Kettenglück", "RadWerk Shop", "Sattelfest", "Bike Bijou"],
    videoAngles: [
      "Pendler-POV: Problem unterwegs (Regen, Handy, Gepäck) → Zubehör löst es",
      "«Das hat mein Velo-Pendeln verändert»-Listen",
      "Anbau-/Montage-Videos in 30 Sekunden (zeigt die Einfachheit)",
    ],
    bestSources: [
      "AliExpress-Stores der Velo-Spezialisten (Rockbros, West Biking u. ä.): Marken-Qualität zu Fabrikpreisen, riesige Auswahl.",
      "CJ Dropshipping für Elektronik (Licht!) mit Qualitätskontrolle.",
      "Qualitäts-Merkmal: Halterungen auf Rüttelpisten testen, Licht-Akkulaufzeit messen, Wasserdichtigkeit prüfen (IP-Angabe).",
    ],
  },
  {
    slug: "winter-schnee",
    name: "Winter & Schnee",
    emoji: "❄️",
    trend: "Dauerbrenner",
    short: "Winter-Problemlöser für das Alpenland – von Eisglätte bis Frostscheibe.",
    audience: "25–65, ganz normale Schweizer Haushalte, die 4–5 Monate mit Schnee, Eis und Kälte leben.",
    competition: "niedrig",
    beginnerScore: 4,
    marginHint: "Aufschlag 3–4×; Problemlöser-Produkte werden bei Wintereinbruch impulsiv gekauft.",
    whySwitzerland:
      "Kaum ein Land lebt so intensiv mit dem Winter: Eisglätte, gefrorene Scheiben, kalte Füsse – jedes Problem ist ein Produkt. Beim ersten Schneefall explodiert die Nachfrage planbar.",
    risks:
      "Stark saisonal (November–März) – als Zweit-Sortiment oder saisonalen Shop führen. Keine Sicherheitsversprechen bei Glätte-Produkten übertreiben.",
    storeNameIdeas: ["Winterfest CH", "Eiszeit Shop", "SchneeGut", "Frostfrei", "Alpenwinter"],
    videoAngles: [
      "Der erste Schneefall-Tag: Produkt löst das Chaos (Timing ist alles!)",
      "Vorher/Nachher: 10 Minuten Eiskratzen vs. Abdeckung wegziehen",
      "«Winter-Hacks, die jeder in der Schweiz kennen sollte»",
    ],
    bestSources: [
      "AliExpress: Winterartikel ab September bestellen und testen – im November sind gute Angebote teils ausverkauft.",
      "BigBuy: EU-Lager rettet dich in der Hochsaison (bei -5 °C wartet niemand 20 Tage auf Schuhspikes).",
      "Qualitäts-Merkmal: ALLES real bei Kälte testen – Materialien verhalten sich bei Frost anders (spröde Gummis, schwache Akkus).",
    ],
  },
  {
    slug: "geschenke-personalisiert",
    name: "Personalisierte Geschenke",
    emoji: "🎁",
    trend: "Im Trend",
    short: "Namen, Fotos, Gravuren – Geschenke mit Bedeutung zu Premium-Preisen.",
    audience: "Geschenksuchende 20–60 zu planbaren Anlässen: Weihnachten, Geburtstage, Muttertag, Hochzeiten, Geburt.",
    competition: "mittel",
    beginnerScore: 3,
    marginHint: "Aufschlag 3–5×; Personalisierung rechtfertigt CHF 20–40 Aufpreis gegenüber Massenware.",
    whySwitzerland:
      "Personalisiert schlägt teuer: Ein Geschenk mit Namen wirkt durchdachter als ein teures von der Stange. Print-on-Demand macht das ohne Lager möglich – und die Anlässe (Weihnachten!) sind planbar.",
    risks:
      "Personalisierte Ware ist vom Umtausch ausgeschlossen (klar kommunizieren) und braucht 1–2 Tage längere Produktion – Bestellfristen vor Feiertagen gross anschreiben. Schreibfehler-Kontrolle einbauen!",
    storeNameIdeas: ["Herzstück Geschenke", "Mit Namen", "Unikat Studio", "Schenkbar", "Liebevoll & Persönlich"],
    videoAngles: [
      "Reaktions-Videos: Beschenkte:r packt personalisiertes Geschenk aus (Emotion!)",
      "«Geschenkideen für Menschen, die schon alles haben»",
      "Herstellungs-/Gravur-Prozess als Satisfying-Content",
    ],
    bestSources: [
      "Printful/Printify: EU-Produktion für Tassen, Decken, Poster mit Namen/Fotos – beste Qualität im POD-Bereich, keine Mindestmengen.",
      "CJ Dropshipping POD: grosse Auswahl an personalisierbaren Produkten (Schmuck, Lampen, Puzzles) mit Foto-Upload.",
      "Qualitäts-Merkmal: IMMER ein personalisiertes Muster mit langem Namen und Umlauten (ä/ö/ü!) bestellen – Umlaut-Fehler sind der Killer Nr. 1.",
    ],
  },
  {
    slug: "kreativ-diy",
    name: "Kreativ & DIY",
    emoji: "🎨",
    trend: "Im Trend",
    short: "Malen nach Zahlen, Diamond Painting & Bastel-Kits – Entspannung zum Selbermachen.",
    audience: "Frauen 25–65, sucht entspannende Feierabend-Beschäftigung ohne Bildschirm; verschenkt Kits auch gern.",
    competition: "mittel",
    beginnerScore: 5,
    marginHint: "Aufschlag 3–4×; Kits (alles drin) sind perfekte Impulskäufe und Geschenke.",
    whySwitzerland:
      "Der «Digital Detox»-Wunsch wächst – kreative Kits sind die Antwort. Fertige Werke werden stolz gepostet (Gratis-Werbung), und die Community tauscht sich aktiv aus. Zeitraffer-Videos vom Entstehen sind Content-Gold.",
    risks:
      "Motive/Designs müssen lizenzfrei sein (keine Disney-Motive etc. – Urheberrecht!). Farben/Kleinteile: vollständige Kits prüfen, fehlende Farbe = sichere Reklamation.",
    storeNameIdeas: ["Farbmoment", "Kreativkiste", "Pinsel & Pause", "Funkelwerk", "Machwerk Studio"],
    videoAngles: [
      "Zeitraffer: von leerer Leinwand zum fertigen Bild (extrem hohe Watchtime)",
      "ASMR: Diamond-Painting-Steinchen setzen",
      "«Mein Feierabend ohne Handy»-Entspannungs-Content",
    ],
    bestSources: [
      "AliExpress: Malen-nach-Zahlen- und Diamond-Painting-Spezialisten mit zehntausenden Verkäufen – Vollständigkeit des Kits am Muster prüfen.",
      "CJ Dropshipping: eigene Motive/Fotos als Kit produzieren lassen (Personalisierungs-Option = Alleinstellung!).",
      "Qualitäts-Merkmal: Ein Kit selbst anfangen! Leinwand-Nummern lesbar? Farben deckend? Genug Material? Das merkt man nur beim Machen.",
    ],
  }
);

export function getNiche(slug: string): Niche | undefined {
  return NICHES.find((n) => n.slug === slug);
}
