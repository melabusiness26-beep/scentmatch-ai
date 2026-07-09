/**
 * Der Schweizer Verkaufskalender: Was sich in welchem Monat verkauft,
 * welche Anlässe anstehen – und was man JETZT für den Folgemonat vorbereitet.
 */

export type SaisonMonat = {
  monat: string;
  emoji: string;
  fokus: string;
  anlaesse: string[];
  nischen: string[]; // Nischen-Slugs
  produkte: string[]; // Produkt-Slugs
  contentIdee: string;
  jetztVorbereiten: string;
};

export const SAISON: SaisonMonat[] = [
  {
    monat: "Januar",
    emoji: "🏋️",
    fokus: "Neujahrsvorsätze: Fitness, Ordnung, Produktivität – der stärkste Kaufimpuls des Jahres.",
    anlaesse: ["Neujahrsvorsätze", "Fitness-Boom", "Organisations-Welle"],
    nischen: ["fitness-sport", "buero-homeoffice", "wellness-schlaf"],
    produkte: ["widerstandsbaender-set", "motivations-trinkflasche", "wuerfel-timer"],
    contentIdee: "«Neues Jahr, 19 Franken» – Vorsatz-Content mit ehrlichem Ton schlägt Druck-Content.",
    jetztVorbereiten: "Muster für Valentinstags-Produkte bestellen (Schmuck, personalisierte Geschenke) – der 14. Februar kommt schneller als die Lieferzeit.",
  },
  {
    monat: "Februar",
    emoji: "💝",
    fokus: "Valentinstag (14.2.) – Schmuck und personalisierte Geschenke haben Hochsaison.",
    anlaesse: ["Valentinstag", "Fasnacht"],
    nischen: ["schmuck-accessoires", "geschenke-personalisiert"],
    produkte: ["edelstahl-halsketten-set", "personalisierte-namenskette", "foto-mondlampe"],
    contentIdee: "Geschenk-Guides ab Ende Januar posten («Für sie / für ihn unter CHF 50») – Bestell-Deadline gross kommunizieren!",
    jetztVorbereiten: "Garten-Sortiment testen: Ab März startet die Balkon-Saison – jetzt Muster bestellen.",
  },
  {
    monat: "März",
    emoji: "🌱",
    fokus: "Frühlingsputz und Garten-Start – die Schweiz räumt auf und pflanzt an.",
    anlaesse: ["Frühlingsanfang", "Frühlingsputz", "Anzucht-Saison"],
    nischen: ["garten-balkon", "kueche-haushalt", "nachhaltig-leben"],
    produkte: ["mini-gewaechshaus-anzuchtset", "multi-gemueseschneider", "abschminkpads-wiederverwendbar"],
    contentIdee: "Frühlingsputz-Vorher/Nachher und erste Anzucht-Zeitraffer – die Garten-Community wacht auf.",
    jetztVorbereiten: "Velo- und Outdoor-Muster bestellen – im April beginnt die Saison.",
  },
  {
    monat: "April",
    emoji: "🚲",
    fokus: "Velosaison-Start und Ostern – die Schweiz kommt raus aus der Stube.",
    anlaesse: ["Ostern", "Velosaison-Start", "erste Grill-Tage"],
    nischen: ["velo-ebike", "garten-balkon", "outdoor-reisen"],
    produkte: ["velo-rahmentasche", "bewaesserungs-spikes", "solar-gartenleuchten"],
    contentIdee: "«Bereit für die erste Tour?»-Checklisten und Balkon-Makeover im Zeitraffer.",
    jetztVorbereiten: "Muttertags-Kampagne planen (2. Maisonntag): Geschenk-Produkte und Content jetzt vorbereiten.",
  },
  {
    monat: "Mai",
    emoji: "💐",
    fokus: "Muttertag (2. Sonntag) und Balkon-Hochsaison – Geschenke und Draussen-Leben.",
    anlaesse: ["Muttertag", "Balkon-Saison", "Grill-Start"],
    nischen: ["geschenke-personalisiert", "schmuck-accessoires", "garten-balkon"],
    produkte: ["foto-mondlampe", "gua-sha-set", "akku-tischlampe"],
    contentIdee: "Emotionale Muttertags-Reels (Reaktionen!) und laue-Abende-Ästhetik mit Licht-Produkten.",
    jetztVorbereiten: "Sommer-Sortiment komplett machen: Picknick, Reise, Hunde-Sommer – Muster jetzt testen.",
  },
  {
    monat: "Juni",
    emoji: "☀️",
    fokus: "Sommerstart: Grill, Badi, Seeabende – die stärkste Outdoor-Kaufzeit.",
    anlaesse: ["Grill-Hochsaison", "Badi-Start", "Vatertag-Geschenke"],
    nischen: ["grill-bbq", "outdoor-reisen", "haustiere"],
    produkte: ["grillmatten-set", "wasserdichte-picknickdecke", "hunde-trinkflasche"],
    contentIdee: "See- und Grill-Content mit Schweizer Kulisse – die Umgebung verkauft mit.",
    jetztVorbereiten: "Reise-Produkte für die Sommerferien pushen – die Ferienplanung läuft jetzt.",
  },
  {
    monat: "Juli",
    emoji: "🧳",
    fokus: "Sommerferien: Reisen, Packen, Unterwegs-Produkte.",
    anlaesse: ["Sommerferien", "Festivals", "Roadtrips"],
    nischen: ["outdoor-reisen", "auto-pendeln"],
    produkte: ["packwuerfel-set", "digitale-kofferwaage", "mikrofaser-reisehandtuch"],
    contentIdee: "Packlisten-Videos («Das nehme ich in die Ferien mit») und Koffer-Organisation im Zeitraffer.",
    jetztVorbereiten: "Back-to-School vorbereiten: Znüni-Boxen, Study-Produkte – Mitte August geht die Schule los.",
  },
  {
    monat: "August",
    emoji: "🎒",
    fokus: "1. August und Back-to-School – Schulstart ist ein unterschätzter Verkaufs-Peak.",
    anlaesse: ["1. August (Nationalfeiertag)", "Schulstart", "Semesterbeginn-Vorbereitung"],
    nischen: ["buero-homeoffice", "kueche-haushalt"],
    produkte: ["bento-lunchbox", "laptop-staender-alu", "mini-etikettendrucker"],
    contentIdee: "Znüni-Prep-Videos und Study-Setup-Makeover – Eltern UND Studierende kaufen jetzt.",
    jetztVorbereiten: "WICHTIG: Jetzt das Weihnachtsgeschäft planen! Geschenk-Produkte auswählen und Muster bestellen – im November ist es zu spät.",
  },
  {
    monat: "September",
    emoji: "📚",
    fokus: "Herbst-Reset: Semesterstart, Home-Office, zurück zur Routine.",
    anlaesse: ["Semesterstart", "Routine-Rückkehr", "erste kühle Abende"],
    nischen: ["buero-homeoffice", "home-living", "wellness-schlaf"],
    produkte: ["wuerfel-timer", "kabelmanagement-set", "mini-luftbefeuchter"],
    contentIdee: "Desk-Makeover und «Meine Herbst-Routine» – der Algorithmus liebt Neuanfänge.",
    jetztVorbereiten: "Weihnachts-Content JETZT produzieren (Geschenk-Guides drehen) – im November nur noch posten.",
  },
  {
    monat: "Oktober",
    emoji: "🕯️",
    fokus: "Zeitumstellung und Cozy-Saison: Licht- und Gemütlichkeits-Produkte explodieren.",
    anlaesse: ["Zeitumstellung (Licht!)", "Cozy Season", "Halloween"],
    nischen: ["home-living", "haustiere", "wellness-schlaf"],
    produkte: ["led-leuchthalsband", "sunset-lampe", "led-velolicht-set"],
    contentIdee: "«Es wird früh dunkel»-Problemlöser (Sichtbarkeit!) und Cozy-Home-Ästhetik.",
    jetztVorbereiten: "Black-Friday-Angebote festlegen und Weihnachts-Bestell-Deadlines berechnen (Lieferzeit!).",
  },
  {
    monat: "November",
    emoji: "🛍️",
    fokus: "Black Friday und Weihnachtsgeschäft-Start – der umsatzstärkste Monat im E-Commerce.",
    anlaesse: ["Black Friday / Cyber Monday", "Weihnachts-Einkauf beginnt", "Samichlaus-Vorbereitung"],
    nischen: ["geschenke-personalisiert", "schmuck-accessoires", "tech-gadgets", "kreativ-diy"],
    produkte: ["sternenhimmel-projektor", "3in1-ladestation", "malen-nach-zahlen-set"],
    contentIdee: "Geschenk-Guides im Wochentakt («Für Mama / für Gamer / unter CHF 30») + ehrliche Black-Friday-Angebote.",
    jetztVorbereiten: "Bestell-Deadline gross kommunizieren: China-Ware muss ca. Anfang Dezember bestellt sein, um vor Weihnachten anzukommen!",
  },
  {
    monat: "Dezember",
    emoji: "🎄",
    fokus: "Weihnachts-Endspurt (bis ~5.12. für China-Ware) – danach Wintersaison pur.",
    anlaesse: ["Weihnachten", "Wichteln", "Wintereinbruch"],
    nischen: ["geschenke-personalisiert", "winter-schnee", "kaffee-tee"],
    produkte: ["schuhspikes", "frostschutz-scheibenabdeckung", "pour-over-kaffeeset"],
    contentIdee: "Erst Last-Minute-Geschenke (EU-Lager/POD mit kurzer Lieferzeit!), ab Mitte Dezember Winter-Problemlöser.",
    jetztVorbereiten: "Januar-Fitness-Welle vorbereiten: Sortiment und Content für die Vorsätze-Saison bereitlegen.",
  },
];
