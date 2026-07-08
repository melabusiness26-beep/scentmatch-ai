/**
 * Schweiz-Wissen: Ratgeber-Artikel rund um E-Commerce & Dropshipping in der Schweiz.
 * Alle Zahlen sind sorgfältig recherchierte Richtwerte – vor wichtigen Entscheidungen
 * immer die offizielle Quelle prüfen (im Text jeweils genannt).
 */

export type KnowledgeSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type KnowledgeArticle = {
  slug: string;
  title: string;
  emoji: string;
  teaser: string;
  readMinutes: number;
  sections: KnowledgeSection[];
};

export const KNOWLEDGE: KnowledgeArticle[] = [
  {
    slug: "verpackungsmaterial-schweiz",
    title: "Verpackungsmaterial in der Schweiz kaufen: Die besten Quellen",
    emoji: "📦",
    teaser:
      "Wo du Kartons, Polstermaterial und Versandtaschen günstig bekommst – und was du für den Start wirklich brauchst.",
    readMinutes: 5,
    sections: [
      {
        heading: "Brauche ich beim Dropshipping überhaupt Verpackung?",
        paragraphs: [
          "Beim klassischen Dropshipping verschickt der Lieferant direkt an deine Kundschaft – du brauchst dann kein eigenes Verpackungsmaterial. Verpackung wird für dich relevant, sobald du (a) Retouren selbst annimmst, (b) Bestseller auf Vorrat in die Schweiz holst und selbst verschickst («Hybrid-Modell») oder (c) Beileger wie Dankeskarten über einen Agenten wie CJ Dropshipping beilegen lässt.",
          "Das Hybrid-Modell lohnt sich oft schon früh: Deine 2–3 Bestseller als kleine Menge (z. B. 20–50 Stück) in die Schweiz bestellen und selbst per Post verschicken. Vorteil: Lieferung in 1–2 Tagen, eigenes Branding, bessere Bewertungen.",
        ],
      },
      {
        heading: "Die besten Bezugsquellen in der Schweiz",
        paragraphs: ["Für kleine Mengen (Start) und grössere Mengen (Wachstum) gibt es unterschiedliche Anlaufstellen:"],
        bullets: [
          "Die Post (post.ch/shop): Kartons, gepolsterte Couverts, Kleber – praktisch, in jeder Filiale oder online, aber nicht die günstigste Quelle.",
          "Brack.ch / Galaxus.ch: Versandtaschen und Kartons in Kleinmengen, schnelle Lieferung, gute Preise für den Start.",
          "Ratioform.ch: Der Verpackungs-Profi (grosse Auswahl, Staffelpreise) – lohnt sich ab mittleren Mengen.",
          "Verpackung24.ch / Packbox.ch: Günstige Staffelpreise für Kartons und Polstermaterial.",
          "Lokal fragen: Migros/Coop geben oft gratis stabile Gebrauchskartons ab – für Retouren-Handling völlig okay (nicht für Kundensendungen).",
        ],
      },
      {
        heading: "Die Start-Einkaufsliste (unter CHF 100)",
        paragraphs: ["Wenn du selbst verschickst, reicht für den Anfang:"],
        bullets: [
          "50 gepolsterte Versandtaschen in 2 Grössen (ca. CHF 25–40)",
          "20 Faltkartons klein (ca. CHF 20–30)",
          "Packpapier oder Seidenpapier statt Plastik-Füllmaterial (nachhaltig, wirkt hochwertig, ca. CHF 10)",
          "Klebeband + Abroller (ca. CHF 10)",
          "Dankeskarten mit deinem Logo (z. B. via Vistaprint/Canva drucken, ca. CHF 20) – kleiner Aufwand, riesiger Eindruck",
        ],
      },
      {
        heading: "Profi-Tipp: Verpackung als Marketing",
        paragraphs: [
          "Unboxing ist ein Content-Format! Schönes Seidenpapier, ein Sticker und eine handgeschriebene Karte kosten unter CHF 1 pro Sendung – aber genau davon machen Kund:innen Videos und Stories. In der Schweiz, wo viele Pakete nüchtern ankommen, hebst du dich damit sofort ab.",
        ],
      },
    ],
  },
  {
    slug: "zoll-mwst-dropshipping",
    title: "Zoll & Mehrwertsteuer: Was beim Import in die Schweiz gilt",
    emoji: "🛃",
    teaser:
      "Die Schweiz ist nicht in der EU – das hat Vor- und Nachteile. Die wichtigsten Regeln einfach erklärt.",
    readMinutes: 7,
    sections: [
      {
        heading: "Die gute Nachricht zuerst",
        paragraphs: [
          "Seit dem 1. Januar 2024 hat die Schweiz die Industriezölle abgeschafft. Für fast alle typischen Dropshipping-Produkte (Gadgets, Deko, Zubehör, Textilien) fallen beim Import keine Zollgebühren mehr an. Was bleibt, ist die Einfuhr-Mehrwertsteuer.",
        ],
      },
      {
        heading: "Einfuhr-Mehrwertsteuer: Die 5-Franken-Regel",
        paragraphs: [
          "Beim Import wird die Schweizer Mehrwertsteuer fällig: 8.1 % Normalsatz (Stand 2026). Aber: Beträgt der Steuerbetrag weniger als CHF 5, wird er gar nicht erhoben. Das heisst praktisch: Sendungen bis ca. CHF 60 Warenwert (inkl. Versandkosten) kommen in der Regel abgabenfrei durch.",
          "Genau deshalb funktionieren typische Dropshipping-Produkte (Einkaufswert CHF 3–20) so reibungslos: Sie bleiben unter der Grenze, und deine Kundschaft bekommt keine böse Zoll-Überraschung.",
          "Achtung bei teureren Produkten: Über der Grenze verlangen Post/Kuriere zusätzlich eine Verzollungsgebühr (je nach Dienstleister mehrere Franken bis über CHF 15) – die zahlt im Zweifel deine Kundschaft und ärgert sich. Teure Produkte deshalb besser über EU-/CH-Lager (CJ, BigBuy) lösen oder die Gebühren einkalkulieren.",
        ],
      },
      {
        heading: "Wer ist eigentlich der Importeur?",
        paragraphs: [
          "Beim klassischen Dropshipping aus China ist formal deine Kundschaft der Importeur – das Paket geht direkt an sie. Sei transparent: Ein Hinweis in den AGB und auf der Versandseite («Versand aus internationalem Lager, alle Abgaben im Preis inbegriffen» – nur schreiben, wenn es stimmt!) schafft Vertrauen und beugt Beschwerden vor.",
        ],
      },
      {
        heading: "Ab wann brauche ich eine eigene MWST-Nummer?",
        paragraphs: [
          "Mehrwertsteuerpflichtig wirst du grundsätzlich ab CHF 100'000 weltweitem Jahresumsatz. Darunter musst du keine MWST auf deine Verkäufe abrechnen – für den Start also kein Thema.",
          "Wichtig zu wissen für später (Versandhandelsregelung): Wer pro Jahr für mehr als CHF 100'000 Kleinsendungen in die Schweiz liefert, gilt als inländischer Versandhändler und muss sich registrieren. Das betrifft dich erst bei richtig grossem Erfolg – dann lohnt sich sowieso eine Treuhand-Beratung.",
          "Offizielle Infos: Bundesamt für Zoll und Grenzsicherheit (bazg.admin.ch) und Eidg. Steuerverwaltung (estv.admin.ch).",
        ],
      },
    ],
  },
  {
    slug: "lieferzeiten-ehrlich-loesen",
    title: "Lieferzeiten: Das grösste Dropshipping-Problem ehrlich lösen",
    emoji: "🚚",
    teaser:
      "10–20 Tage aus China sind der häufigste Grund für Beschwerden. So gehst du professionell damit um.",
    readMinutes: 6,
    sections: [
      {
        heading: "Warum Lieferzeit über deinen Erfolg entscheidet",
        paragraphs: [
          "Schweizer Kundschaft ist von Galaxus, Zalando & Co. Lieferung am nächsten Tag gewohnt. Wenn dein Paket 15 Tage braucht und das niemand vorher wusste, bekommst du Beschwerden, Rückbuchungen und schlechte Bewertungen – selbst wenn das Produkt super ist.",
        ],
      },
      {
        heading: "Die 4 Lösungs-Stufen (vom Start bis zur Skalierung)",
        paragraphs: ["So verbessern erfolgreiche Shops ihre Lieferzeit Schritt für Schritt:"],
        bullets: [
          "Stufe 1 – Transparenz (ab Tag 1, gratis): Lieferzeit gross und ehrlich anzeigen («Lieferung in 8–15 Werktagen»), auf der Produktseite UND im Checkout. Versandbestätigung mit Tracking-Link automatisch verschicken.",
          "Stufe 2 – Bessere Versandwege: Bei AliExpress «AliExpress Standard Shipping» statt billigster Option wählen; bei CJ Dropshipping Produkte mit EU-Lager bevorzugen (3–8 Tage).",
          "Stufe 3 – Hybrid-Modell: Deine 2–3 Bestseller in kleiner Menge (20–50 Stück) selbst lagern und per A-Post verschicken. Lieferzeit 1–2 Tage für 80 % deiner Bestellungen.",
          "Stufe 4 – EU-Grosshandel: Mit stabilem Umsatz zu BigBuy & Co. wechseln (3–7 Tage) oder ein Fulfillment-Lager nutzen.",
        ],
      },
      {
        heading: "Kommunikations-Vorlagen, die Beschwerden verhindern",
        paragraphs: [
          "Auf der Produktseite: «🚚 Kostenloser Versand · Lieferung in 8–15 Werktagen · Sendungsverfolgung inklusive». In der Bestellbestätigung: «Dein Paket ist unterwegs zu dir! Da wir direkt ab Herstellerlager verschicken, dauert die Lieferung 8–15 Werktage – dafür sparst du beim Preis. Hier verfolgst du dein Paket: [Link]».",
          "Ehrlichkeit kostet ein paar Spontankäufe, verhindert aber Rückbuchungen (die richtig weh tun) und baut eine Marke auf, der man vertraut.",
        ],
      },
    ],
  },
  {
    slug: "recht-schweiz-onlineshop",
    title: "Rechtliches für Schweizer Onlineshops: Die Pflichten im Überblick",
    emoji: "⚖️",
    teaser:
      "Impressum, Datenschutz, AGB, Preisangaben – was wirklich Pflicht ist und was du einfach umsetzen kannst.",
    readMinutes: 7,
    sections: [
      {
        heading: "Impressum (Pflicht)",
        paragraphs: [
          "Wer in der Schweiz online Waren anbietet, muss klar erkennbar sein: Name bzw. Firma, Adresse und eine E-Mail-Adresse gehören in ein Impressum (Grundlage: Bundesgesetz gegen den unlauteren Wettbewerb, UWG). Ein Postfach allein reicht nicht. Das Impressum gehört gut sichtbar verlinkt in den Footer.",
        ],
      },
      {
        heading: "Datenschutz (Pflicht)",
        paragraphs: [
          "Seit September 2023 gilt das neue Schweizer Datenschutzgesetz (nDSG). Du brauchst eine Datenschutzerklärung, die sagt: welche Daten du sammelst (Bestelldaten, Analyse-Tools, Newsletter), wozu, und an wen sie gehen (z. B. Zahlungsanbieter, Versanddienstleister, Meta/TikTok-Pixel).",
          "Verkaufst du auch an Kundschaft in der EU, gilt zusätzlich die DSGVO – die meisten Shop-Systeme und Generatoren decken beides ab. Es gibt gute kostenlose Generatoren für Schweizer Datenschutzerklärungen (z. B. von Schweizer Anwaltskanzleien) – einmal ausfüllen, einfügen, fertig.",
        ],
      },
      {
        heading: "AGB & Widerruf (dringend empfohlen)",
        paragraphs: [
          "Überraschung: In der Schweiz gibt es – anders als in der EU – kein gesetzliches Widerrufsrecht beim Online-Kauf. Trotzdem erwarten Kund:innen ein Rückgaberecht. Empfehlung: Biete freiwillig 14 oder 30 Tage Rückgabe an und regle es klar in den AGB. Das steigert das Vertrauen (und die Conversion) mehr, als es kostet.",
          "In die AGB gehören ausserdem: Lieferzeiten, Zahlungsarten, Eigentumsvorbehalt, Gewährleistung (gesetzlich 2 Jahre) und der Hinweis, von wo versendet wird.",
        ],
      },
      {
        heading: "Preisangaben & Werbung",
        paragraphs: [
          "Preise müssen in CHF und inklusive allfälliger MWST angegeben werden (Preisbekanntgabeverordnung). Durchgestrichene Vergleichspreise («statt CHF 59») nur verwenden, wenn der Preis vorher wirklich verlangt wurde – Fantasie-Streichpreise sind unlauter.",
          "Keine Heilversprechen bei Beauty-/Gesundheitsprodukten («heilt Rückenschmerzen») und keine Markenimitate verkaufen – beides kann teuer werden.",
        ],
      },
      {
        heading: "Brauche ich eine Firma?",
        paragraphs: [
          "Nein, für den Start nicht. Als Einzelunternehmerin darfst du sofort loslegen; ein Handelsregistereintrag wird erst ab CHF 100'000 Jahresumsatz Pflicht. Einnahmen gibst du in der privaten Steuererklärung an. Mehr dazu im Artikel «Steuern & AHV einfach erklärt».",
        ],
      },
    ],
  },
  {
    slug: "zahlungsmethoden-schweiz",
    title: "Zahlungsmethoden: Was Schweizer Kundschaft im Checkout erwartet",
    emoji: "💳",
    teaser: "Ohne TWINT verlierst du Verkäufe. Die richtige Zahlungs-Kombination für den Start.",
    readMinutes: 5,
    sections: [
      {
        heading: "Die «grossen Drei» für Schweizer Shops",
        paragraphs: ["Diese Kombination deckt über 90 % der Erwartungen ab:"],
        bullets: [
          "TWINT: Die beliebteste Zahlungsapp der Schweiz (über 5 Mio. Nutzer:innen). Für viele Kund:innen inzwischen das Erste, wonach sie im Checkout suchen. Über Zahlungsanbieter wie Stripe, Payrexx oder Wallee einbindbar.",
          "Kreditkarte / Debitkarte (Visa, Mastercard): Der Standard – läuft am einfachsten über Stripe.",
          "Apple Pay / Google Pay: Ein-Klick-Zahlung am Handy – gerade bei TikTok-/Instagram-Traffic (fast alles Mobile!) ein echter Conversion-Booster. Bei Stripe automatisch dabei.",
        ],
      },
      {
        heading: "Was kostet das?",
        paragraphs: [
          "Zahlungsanbieter verlangen keine Fixkosten, sondern Gebühren pro Transaktion – typisch rund 1.5–3 % plus ein kleiner Fixbetrag (ca. CHF 0.30). Bei einem Verkauf von CHF 29 zahlst du also grob CHF 1 – das rechnest du einfach in deine Marge ein.",
          "Kauf auf Rechnung ist in der Schweiz zwar beliebt, für den Start aber nicht nötig (Ausfallrisiko, Aufwand). Später über Anbieter wie CembraPay möglich.",
        ],
      },
      {
        heading: "Praktisch: So richtest du es ein",
        paragraphs: [
          "Shopify: Payments aktivieren (Karten, Apple/Google Pay) und TWINT über eine App/Payrexx ergänzen. WooCommerce: Stripe-Plugin plus TWINT-fähiges Schweizer Gateway (z. B. Payrexx). Wichtig: Preise in CHF anzeigen – Schweizer Kundschaft bricht bei EUR-Preisen überdurchschnittlich oft ab.",
        ],
      },
    ],
  },
  {
    slug: "versand-schweiz",
    title: "Versand innerhalb der Schweiz: Tarife, Tricks und Retouren",
    emoji: "✉️",
    teaser:
      "Sobald du selbst verschickst (Hybrid-Modell), zählt jeder Franken – so versendest du clever.",
    readMinutes: 5,
    sections: [
      {
        heading: "Die wichtigsten Post-Optionen (Richtwerte)",
        paragraphs: [
          "Die Preise ändern sich gelegentlich – aktuelle Tarife immer auf post.ch prüfen. Als Orientierung:",
        ],
        bullets: [
          "Grossbrief bis 2 cm Dicke: ab ca. CHF 2–4 – perfekt für flache Produkte (Heatless-Curls-Band, Silikondeckel, Bänder!)",
          "PostPac Economy bis 2 kg: ca. CHF 8–9, Lieferung in 2 Werktagen",
          "PostPac Priority bis 2 kg: ca. CHF 10–11, Lieferung am nächsten Werktag",
          "Login/Geschäftskonto der Post: Etiketten online drucken, Abholung möglich, kleine Rabatte",
        ],
      },
      {
        heading: "Der 2-cm-Trick",
        paragraphs: [
          "Der Preissprung vom Brief zum Paket ist gross. Produkte, die flacher als 2 cm verpackt werden können, sparen dir pro Sendung mehrere Franken – bei 100 Sendungen sind das mehrere hundert Franken. Bei der Produktauswahl lohnt es sich also, auch an die Verpackungsdicke zu denken.",
        ],
      },
      {
        heading: "Retouren smart regeln",
        paragraphs: [
          "Biete Rückgabe an (Vertrauen!), aber mach es effizient: Kundschaft meldet Retoure per E-Mail → du entscheidest je nach Warenwert. Bei Billigprodukten (Einkauf CHF 3–8) ist «Behalte das Produkt, wir erstatten dir den Betrag» oft günstiger als Rückversand plus Bearbeitung – und macht aus verärgerten Kund:innen Fans.",
          "Für Dropshipping-Sendungen aus China gilt: Rückversand nach China lohnt sich praktisch nie. Erstattungskulanz von Anfang an in die Marge einrechnen (ca. 2–5 % der Bestellungen).",
        ],
      },
    ],
  },
  {
    slug: "shop-plattform-waehlen",
    title: "Shopify, WooCommerce oder Wix? Die richtige Shop-Plattform",
    emoji: "🛒",
    teaser: "Der ehrliche Vergleich für die Schweiz – mit klarer Empfehlung je nach Budget.",
    readMinutes: 6,
    sections: [
      {
        heading: "Shopify – der Standard fürs Dropshipping",
        paragraphs: [
          "Shopify (ab ca. CHF 30/Monat + Transaktionsgebühren) ist die meistgenutzte Dropshipping-Plattform: riesiges App-Angebot (DSers für AliExpress, CJ-Anbindung), professionelle Vorlagen, alles auf Deutsch, TWINT einbindbar. Nachteil: monatliche Fixkosten ab Tag 1.",
          "Empfehlung: Die beste Wahl, sobald du es ernst meinst und ein kleines Monatsbudget einplanen kannst. Der Zeitgewinn gegenüber Bastellösungen ist den Preis meist wert.",
        ],
      },
      {
        heading: "WooCommerce – günstig, aber technischer",
        paragraphs: [
          "WooCommerce ist ein Gratis-Plugin für WordPress; du zahlst nur Hosting (ca. CHF 10–20/Monat, z. B. bei Hostpoint). Volle Freiheit und tiefe Fixkosten – aber du kümmerst dich selbst um Updates, Sicherheit und die Dropshipping-Anbindung. Ohne Technik-Lust wird das schnell mühsam.",
        ],
      },
      {
        heading: "Wix / Squarespace – schön, aber nicht fürs Dropshipping gebaut",
        paragraphs: [
          "Toll für einfache Websites, aber die Dropshipping-Automatisierung (Lieferanten-Anbindung, Bestell-Weiterleitung) ist schwächer. Für unser Vorhaben keine Empfehlung.",
        ],
      },
      {
        heading: "Klare Empfehlung",
        paragraphs: [
          "Mit Monatsbudget: Shopify Basic. Praktisch ohne Budget: erst Produkte und Content testen (TikTok/Instagram aufbauen), dann mit den ersten Einnahmen Shopify starten. Alternativ WooCommerce, wenn jemand mit Technik-Erfahrung hilft.",
          "Tipp: Shopify bietet meist eine günstige Testphase (z. B. erster Monat für wenige Franken) – ideal, um den Shop in Ruhe aufzubauen, bevor die vollen Kosten starten.",
        ],
      },
    ],
  },
  {
    slug: "steuern-ahv-einfach",
    title: "Steuern & AHV einfach erklärt: Was gilt für dein Business",
    emoji: "🧾",
    teaser: "Keine Panik: Für den Start ist es simpel. Die Pflichten kommen erst mit dem Erfolg.",
    readMinutes: 5,
    sections: [
      {
        heading: "Einnahmen = in die Steuererklärung",
        paragraphs: [
          "Gewinne aus deinem Shop (Einnahmen minus Ausgaben wie Wareneinkauf, Werbung, Abos) gibst du als selbstständiges Einkommen in der privaten Steuererklärung an. Belege sammeln (einfaches Spreadsheet reicht am Anfang) und fertig. Eine Firma zu gründen ist dafür nicht nötig.",
        ],
      },
      {
        heading: "AHV: ab wann melden?",
        paragraphs: [
          "Wer selbstständig erwerbend ist, meldet sich grundsätzlich bei der kantonalen Ausgleichskasse (SVA) an – diese beurteilt den Status und rechnet AHV/IV/EO-Beiträge auf den Gewinn ab. Bei einem kleinen Nebenerwerb ist das unbürokratischer, als es klingt. Praxis-Tipp: Sobald regelmässige Gewinne fliessen (nicht bei den ersten CHF 100), bei der SVA deines Kantons melden – die helfen freundlich weiter.",
        ],
      },
      {
        heading: "MWST & Handelsregister: erst ab CHF 100'000",
        paragraphs: [
          "Mehrwertsteuerpflicht und Handelsregister-Pflicht (Einzelfirma) greifen erst ab CHF 100'000 Jahresumsatz. Wenn du diese Marke knackst, gönn dir eine Treuhand-Beratung (ca. CHF 150–300) – ab dem Umsatz lohnt sie sich locker.",
        ],
      },
      {
        heading: "Die einfache Buchhaltungs-Routine",
        paragraphs: [
          "Einmal pro Monat 30 Minuten: Einnahmen (Auszahlungen von Stripe/PayPal), Ausgaben (Lieferanten, Werbung, Abos) und Belege in eine Tabelle. Mehr braucht es unter CHF 100'000 Umsatz nicht (Milchbüchlein-Rechnung ist erlaubt). So hast du auch immer im Blick, ob du wirklich Gewinn machst.",
        ],
      },
    ],
  },
  {
    slug: "produktqualitaet-testen",
    title: "Produktqualität testen wie ein Profi: Die Muster-Methode",
    emoji: "🔍",
    teaser:
      "Nie ungetestet verkaufen! Mit dieser Checkliste erkennst du in 24 Stunden, ob ein Produkt shop-tauglich ist.",
    readMinutes: 6,
    sections: [
      {
        heading: "Die eiserne Regel",
        paragraphs: [
          "Bestelle IMMER zuerst ein Muster an dich selbst, bevor ein Produkt in den Shop kommt – am besten beim selben Lieferanten und mit derselben Versandart, die auch deine Kundschaft bekommt. Kosten: meist CHF 5–20. Das ist die günstigste Versicherung deines Business: Ein schlechtes Produkt kostet dich sonst Bewertungen, Rückbuchungen und deinen Ruf.",
        ],
      },
      {
        heading: "Der 5-Punkte-Mustertest",
        paragraphs: ["Wenn das Muster ankommt, prüfe systematisch:"],
        bullets: [
          "1. Lieferung: Wie lange hat es WIRKLICH gedauert? Wie sah das Paket aus (zerknautscht, China-Beutel)? Genau das erlebt deine Kundschaft.",
          "2. Erster Eindruck: Würdest du dich freuen, das als Geschenk zu bekommen? Riecht es chemisch? Wirkt es billig?",
          "3. Funktion: Produkt 15 Minuten intensiv benutzen, wie es die Kundschaft täte – inkl. Grenzfälle (voll beladen, nass, kalt).",
          "4. Haltbarkeit: Den «Schwiegermutter-Test» machen – ziehen, drücken, fallen lassen (aus Tischhöhe). Übersteht es den Alltag?",
          "5. Foto-/Video-Check: Sieht das Produkt in DEINEM Handyvideo so gut aus wie beim Lieferanten? (Du brauchst eigenen Content!)",
        ],
      },
      {
        heading: "Zertifikate & Sicherheit",
        paragraphs: [
          "Bei Elektronik CE-Kennzeichnung verlangen, bei Lebensmittelkontakt (Küche) LFGB-/FDA-Zertifikat, bei Baby-/Kinderprodukten besonders streng sein. Seriöse Lieferanten schicken Zertifikate auf Anfrage im Chat – wer ausweicht, fliegt raus.",
        ],
      },
      {
        heading: "Bewertungs-Trick für die Lieferantenwahl",
        paragraphs: [
          "Auf AliExpress: Nur Händler mit 95 %+ positiven Bewertungen und dem Produkt-Tag «1000+ verkauft» wählen. Lies gezielt die 1-Stern-Bewertungen MIT FOTOS – dort siehst du die echten Schwachstellen (kaputte Nähte, schwache Akkus), bevor du sie selbst entdeckst.",
        ],
      },
    ],
  },
];

export function getArticle(slug: string): KnowledgeArticle | undefined {
  return KNOWLEDGE.find((a) => a.slug === slug);
}
