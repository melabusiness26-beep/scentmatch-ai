/**
 * «Mein Weg»: Der komplette begleitete Weg von der Idee bis zum ersten Verkauf.
 * Jede Aufgabe verlinkt auf das passende Werkzeug bzw. die passende Anleitung
 * der Seite. Der Fortschritt wird im Browser gespeichert (components/MeinWeg.tsx).
 */

export type JourneyTask = {
  id: string;
  title: string;
  text: string;
  href: string;
  cta: string;
  zeit: string;
};

export type JourneyPhase = {
  id: string;
  emoji: string;
  title: string;
  goal: string;
  tasks: JourneyTask[];
};

export const JOURNEY: JourneyPhase[] = [
  {
    id: "verstehen",
    emoji: "📖",
    title: "Phase 1: Verstehen",
    goal: "Du weisst, wie das Geschäft funktioniert – und was dich realistisch erwartet.",
    tasks: [
      {
        id: "start-lesen",
        title: "Die Grundidee verstehen",
        text: "Lies auf der Einstiegs-Seite, wie Dropshipping in 3 Schritten funktioniert – inklusive der ehrlichen Erwartungen.",
        href: "/start",
        cta: "Einstieg lesen",
        zeit: "5 Min.",
      },
      {
        id: "lexikon-lesen",
        title: "Die wichtigsten Begriffe kennen",
        text: "Überfliege das Lexikon – danach verstehst du jedes Wort, das dir auf diesem Weg begegnet.",
        href: "/lexikon",
        cta: "Lexikon öffnen",
        zeit: "10 Min.",
      },
      {
        id: "recht-ueberblick",
        title: "Wissen, was in der Schweiz gilt",
        text: "Kein Detail-Studium nötig – nur den Rechts-Artikel einmal lesen, damit du weisst, was auf dich zukommt (Impressum, kein Firmen-Zwang, MWST erst ab 100'000).",
        href: "/wissen/recht-schweiz-onlineshop",
        cta: "Artikel lesen",
        zeit: "7 Min.",
      },
    ],
  },
  {
    id: "entscheiden",
    emoji: "🧭",
    title: "Phase 2: Idee finden",
    goal: "Du hast deine Nische und 1–3 Produkte, die sich rechnen.",
    tasks: [
      {
        id: "quiz-machen",
        title: "Nischen-Quiz machen",
        text: "5 Fragen zu Interessen, Budget und Content-Stil – das Quiz schlägt dir deine Nische vor.",
        href: "/nischen-quiz",
        cta: "Quiz starten",
        zeit: "1 Min.",
      },
      {
        id: "nische-pruefen",
        title: "Deine Nische ehrlich prüfen",
        text: "Lies im Nischen-Guide die Chancen UND Risiken deiner Nische – besonders die «Ehrlich gesagt»-Box.",
        href: "/nischen",
        cta: "Nischen-Guide öffnen",
        zeit: "5 Min.",
      },
      {
        id: "produkte-waehlen",
        title: "1 Held-Produkt + 2 Ergänzungen wählen",
        text: "Wähle im Produkt-Finder fokussiert aus: ein Hauptprodukt mit hohem Score, zwei passende Ergänzungen. Nicht mehr!",
        href: "/produkte",
        cta: "Produkte ansehen",
        zeit: "20 Min.",
      },
      {
        id: "gewinn-rechnen",
        title: "Gewinn durchrechnen",
        text: "Rechne dein Held-Produkt im Gewinn-Rechner durch. Unter 15 % Marge? Dann anderes Produkt oder höherer Preis.",
        href: "/rechner",
        cta: "Zum Rechner",
        zeit: "5 Min.",
      },
      {
        id: "plan-erstellen",
        title: "Deinen Store-Plan erstellen lassen",
        text: "Der Store-Planer baut dir Namensideen, Sortiment, Plattform-Empfehlung und deinen 4-Wochen-Fahrplan.",
        href: "/store-planer",
        cta: "Plan erstellen",
        zeit: "2 Min.",
      },
    ],
  },
  {
    id: "pruefen",
    emoji: "🧪",
    title: "Phase 3: Produkt prüfen",
    goal: "Du hast das Produkt selbst in der Hand gehabt und weisst, dass die Qualität stimmt.",
    tasks: [
      {
        id: "konkurrenz-checken",
        title: "Konkurrenz gratis auschecken",
        text: "Nutze den Shopify-Bestseller-Trick und die Werbebibliotheken, um zu sehen, wer dein Produkt schon verkauft – und wie.",
        href: "/wissen/konkurrenz-recherche-gratis",
        cta: "Tricks lernen",
        zeit: "20 Min.",
      },
      {
        id: "muster-bestellen",
        title: "Muster an dich selbst bestellen",
        text: "Bestelle dein Held-Produkt beim Lieferanten an deine eigene Adresse (CHF 5–20). Die englische Anfrage-Vorlage hilft dir dabei.",
        href: "/vorlagen",
        cta: "Vorlage nutzen",
        zeit: "15 Min.",
      },
      {
        id: "muster-testen",
        title: "Muster mit der Checkliste testen",
        text: "Wenn das Muster da ist: Arbeite die Qualitäts-Checkliste auf der Produktseite durch und mach den 5-Punkte-Mustertest.",
        href: "/wissen/produktqualitaet-testen",
        cta: "Muster-Methode öffnen",
        zeit: "30 Min.",
      },
    ],
  },
  {
    id: "aufbauen",
    emoji: "🏗️",
    title: "Phase 4: Shop aufbauen",
    goal: "Dein Shop ist online, rechtssicher und nimmt Zahlungen an.",
    tasks: [
      {
        id: "name-sichern",
        title: "Namen wählen & Konten sichern",
        text: "Entscheide dich für einen Shop-Namen (Ideen liefert dein Store-Plan) und sichere sofort: .ch-Domain, Instagram- und TikTok-Namen.",
        href: "/store-planer",
        cta: "Namensideen ansehen",
        zeit: "30 Min.",
      },
      {
        id: "shopify-einrichten",
        title: "Shop einrichten (Schritt für Schritt)",
        text: "Folge der kompletten Shopify-Anleitung: Grundeinstellungen, Design, Produktseiten – alles auf die Schweiz eingestellt.",
        href: "/wissen/shopify-einrichten-schritt-fuer-schritt",
        cta: "Anleitung öffnen",
        zeit: "3–4 Std.",
      },
      {
        id: "recht-einbauen",
        title: "Impressum, Datenschutz & AGB einfügen",
        text: "Die vier Rechtsseiten in den Footer – mit ehrlicher Lieferzeit-Angabe und freiwilligem Rückgaberecht.",
        href: "/wissen/recht-schweiz-onlineshop",
        cta: "Was reingehört",
        zeit: "45 Min.",
      },
      {
        id: "zahlungen",
        title: "Zahlungen einrichten (inkl. TWINT)",
        text: "Karten + Apple/Google Pay über Shopify Payments, TWINT über App/Payrexx. Ohne TWINT verlierst du Schweizer Kundschaft.",
        href: "/wissen/zahlungsmethoden-schweiz",
        cta: "Zahlungs-Guide",
        zeit: "30 Min.",
      },
      {
        id: "testbestellung",
        title: "Testbestellung bei dir selbst machen",
        text: "Der Schritt, den fast alle auslassen: Bestelle einmal selbst in deinem Shop und erlebe, was deine Kundschaft erlebt – vom Checkout bis zur E-Mail.",
        href: "/wissen/shopify-einrichten-schritt-fuer-schritt",
        cta: "Warum das zählt",
        zeit: "15 Min.",
      },
    ],
  },
  {
    id: "sichtbar",
    emoji: "📣",
    title: "Phase 5: Sichtbar werden",
    goal: "Deine ersten Videos sind online und bringen Besucher in den Shop.",
    tasks: [
      {
        id: "tiktok-aufsetzen",
        title: "TikTok-Kanal richtig aufsetzen",
        text: "Konto mit Shop-Name, Logo, Bio-Link – und dem 30-Tage-Plan aus der Anleitung.",
        href: "/wissen/tiktok-kanal-aufbauen",
        cta: "30-Tage-Plan öffnen",
        zeit: "30 Min.",
      },
      {
        id: "drehbuch-erstellen",
        title: "Erstes Drehbuch generieren",
        text: "Wähle dein Held-Produkt im Werbevideo-Studio – du bekommst Hook-Varianten, Szenenplan und Hashtags. Optional: KI-Prompt für die 0-Franken-Route.",
        href: "/videos",
        cta: "Drehbuch generieren",
        zeit: "10 Min.",
      },
      {
        id: "erste-videos",
        title: "Die ersten 5 Videos drehen & posten",
        text: "Mit Handy und CapCut nach Drehbuch. Dasselbe Video auf TikTok, Reels UND Shorts posten – dreifache Chance.",
        href: "/videos",
        cta: "Video-Regeln ansehen",
        zeit: "je 30 Min.",
      },
      {
        id: "pinterest",
        title: "Pinterest-Pins anlegen",
        text: "2–3 Pins mit Suchbegriffen im Titel, direkt auf deine Produktseiten verlinkt. Pins wirken monatelang.",
        href: "/videos",
        cta: "Pinterest-Tipps",
        zeit: "20 Min.",
      },
    ],
  },
  {
    id: "verkaufen",
    emoji: "💰",
    title: "Phase 6: Verkaufen & wachsen",
    goal: "Die erste Bestellung ist abgewickelt – und du weisst, wie es weitergeht.",
    tasks: [
      {
        id: "erste-bestellung",
        title: "Deine erste Bestellung abwickeln",
        text: "Der grosse Moment! Die Anleitung zeigt dir Klick für Klick, was jetzt zu tun ist – vom Weiterleiten an den Lieferanten bis zur Versandbestätigung.",
        href: "/wissen/erste-bestellung-abwickeln",
        cta: "Anleitung öffnen",
        zeit: "15 Min.",
      },
      {
        id: "kundenservice-bereit",
        title: "Kundenservice-Vorlagen bereitlegen",
        text: "Speichere dir die Vorlagen für «Wo ist mein Paket?», Retouren und Defekte – dann bringt dich keine Anfrage aus der Ruhe.",
        href: "/vorlagen",
        cta: "Vorlagen ansehen",
        zeit: "10 Min.",
      },
      {
        id: "bewertung-sammeln",
        title: "Erste Bewertungen sammeln",
        text: "5–7 Tage nach Zustellung freundlich um eine Bewertung bitten (Vorlage vorhanden). Bewertungen sind dein wertvollstes Verkaufsargument.",
        href: "/vorlagen",
        cta: "Bewertungs-Vorlage",
        zeit: "5 Min.",
      },
      {
        id: "zahlen-lernen",
        title: "Zahlen anschauen & nachlegen",
        text: "Einmal pro Woche: Welches Video lief am besten? Davon Varianten drehen. Monatlich: Einnahmen/Ausgaben in die Tabelle (Steuern & AHV im Blick).",
        href: "/wissen/steuern-ahv-einfach",
        cta: "Buchhaltungs-Routine",
        zeit: "30 Min./Woche",
      },
    ],
  },
];

export const JOURNEY_TASK_COUNT = JOURNEY.reduce((sum, p) => sum + p.tasks.length, 0);
