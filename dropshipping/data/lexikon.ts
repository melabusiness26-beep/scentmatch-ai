/**
 * Begriffs-Lexikon: Jeder Fachbegriff in einfachen Worten erklärt –
 * für Einsteiger:innen ganz ohne Vorwissen.
 */

export type LexikonEintrag = {
  begriff: string;
  erklaerung: string;
};

export const LEXIKON: LexikonEintrag[] = [
  { begriff: "A/B-Test", erklaerung: "Zwei Varianten gegeneinander testen (z. B. zwei verschiedene Video-Anfänge) und schauen, welche besser funktioniert. So entscheidest du mit Zahlen statt mit Bauchgefühl." },
  { begriff: "AGB", erklaerung: "Allgemeine Geschäftsbedingungen – die «Spielregeln» deines Shops: Lieferzeiten, Rückgabe, Zahlung. Schützen dich und schaffen Vertrauen bei der Kundschaft." },
  { begriff: "Affiliate", erklaerung: "Du empfiehlst Produkte anderer Shops über spezielle Links und bekommst eine Provision, wenn jemand kauft. Ein anderes Geschäftsmodell als Dropshipping – ohne eigenen Verkauf." },
  { begriff: "AliExpress", erklaerung: "Riesiger Online-Marktplatz mit Händlern vor allem aus China. Für Dropshipper die einfachste Quelle, um Produkte günstig einzukaufen und Trends zu erkennen." },
  { begriff: "Bundle", erklaerung: "Mehrere Produkte im Paket verkaufen (z. B. Bürste + Schleckmatte als «Fellpflege-Set»). Erhöht den Bestellwert und hebt dich von Einzelanbietern ab." },
  { begriff: "CJ Dropshipping", erklaerung: "Ein Dienstleister, der für Dropshipper einkauft, prüft und versendet – professioneller als AliExpress, teils mit Lagern in Europa (= schnellere Lieferung in die Schweiz)." },
  { begriff: "Conversion", erklaerung: "Wenn aus einem Besucher ein Käufer wird. Die Conversion-Rate sagt, wie viel Prozent der Besucher kaufen – 1–3 % sind im E-Commerce normal." },
  { begriff: "Dropshipping", erklaerung: "Du verkaufst Produkte in deinem Online-Shop, aber der Lieferant verschickt sie direkt an deine Kundschaft. Du brauchst kein Lager und kaufst nichts auf Vorrat – du verdienst an der Differenz zwischen Einkaufs- und Verkaufspreis." },
  { begriff: "E-Commerce", erklaerung: "Der Oberbegriff für jedes Verkaufen im Internet – egal ob mit eigenem Lager, Dropshipping oder Print-on-Demand." },
  { begriff: "Fulfillment", erklaerung: "Alles, was nach der Bestellung passiert: verpacken, verschicken, Retouren. Beim Dropshipping übernimmt das der Lieferant für dich." },
  { begriff: "Hook", erklaerung: "Die ersten 1–2 Sekunden eines Videos, die entscheiden, ob jemand dranbleibt oder weiterwischt. Der wichtigste Teil jedes Werbevideos." },
  { begriff: "Impressum", erklaerung: "Die gesetzlich vorgeschriebene «Visitenkarte» deines Shops: Wer steckt dahinter, wo erreichbar. In der Schweiz Pflicht für jeden Online-Shop." },
  { begriff: "Lieferant / Supplier", erklaerung: "Die Firma, bei der du einkaufst und die deine Bestellungen versendet (z. B. ein Händler auf AliExpress oder CJ Dropshipping)." },
  { begriff: "Marge", erklaerung: "Was dir von einem Verkauf übrig bleibt, nachdem Einkauf, Gebühren und Werbung bezahlt sind. Die wichtigste Zahl deines Geschäfts – unser Gewinn-Rechner rechnet sie dir aus." },
  { begriff: "Muster / Sample", erklaerung: "Ein Testexemplar, das du an dich selbst bestellst, BEVOR du ein Produkt verkaufst. Die günstigste Versicherung gegen schlechte Qualität und schlechte Bewertungen." },
  { begriff: "MWST", erklaerung: "Mehrwertsteuer. In der Schweiz musst du sie erst ab CHF 100'000 Jahresumsatz auf deine Verkäufe abrechnen – für den Start also kein Thema." },
  { begriff: "Nische", erklaerung: "Ein klar abgegrenzter Themenbereich, auf den sich dein Shop spezialisiert (z. B. Haustiere statt «alles»). Spezialisierte Shops wirken glaubwürdiger und sind leichter zu bewerben." },
  { begriff: "Organische Reichweite", erklaerung: "Besucher, die gratis über deine Videos und Beiträge kommen – ohne bezahlte Werbung. Auf TikTok kann auch ein Konto mit 0 Followern viral gehen." },
  { begriff: "Print-on-Demand (POD)", erklaerung: "Produkte mit deinem Design (T-Shirts, Tassen, Decken) werden erst gedruckt, wenn jemand bestellt. Kein Lager, kein Risiko – ideal für personalisierte Produkte." },
  { begriff: "Retoure", erklaerung: "Eine Rücksendung. In der Schweiz gibt es kein gesetzliches Rückgaberecht beim Online-Kauf – ein freiwilliges Rückgaberecht schafft aber Vertrauen und mehr Verkäufe." },
  { begriff: "Score", erklaerung: "Unsere Bewertung von 0–100 pro Produkt: Wie gut eignet es sich für Einsteiger:innen im Schweizer Markt (Marge, Nachfrage, Versand, Risiken)." },
  { begriff: "SEO", erklaerung: "Suchmaschinen-Optimierung: dafür sorgen, dass deine Seite bei Google gefunden wird. Kostenlos, wirkt aber erst nach Wochen bis Monaten – der Marathon neben dem TikTok-Sprint." },
  { begriff: "Shopify", erklaerung: "Das beliebteste Baukasten-System für eigene Online-Shops (ab ca. CHF 30/Monat). Du brauchst keine Programmierkenntnisse." },
  { begriff: "TWINT", erklaerung: "Die beliebteste Bezahl-App der Schweiz. Für Schweizer Shops fast Pflicht im Checkout – viele Kund:innen suchen zuerst nach dem TWINT-Knopf." },
  { begriff: "UGC", erklaerung: "«User Generated Content» – Videos, die aussehen, als hätte sie eine echte Kundin mit dem Handy gedreht (nicht wie Hochglanz-Werbung). Der erfolgreichste Werbestil auf TikTok & Instagram." },
  { begriff: "Upsell", erklaerung: "Der Kundschaft beim Kauf etwas Passendes dazu anbieten («Kund:innen kauften auch …»). Erhöht den Bestellwert fast ohne Mehraufwand." },
  { begriff: "Warenkorbwert", erklaerung: "Wie viel eine Kundin pro Bestellung ausgibt. Mit Bundles und Upsells steigerst du ihn – und machst aus demselben Besucher mehr Umsatz." },
  { begriff: "Zoll / Einfuhrsteuer", erklaerung: "Abgaben beim Import in die Schweiz. Gute Nachricht: Zölle auf typische Produkte sind seit 2024 abgeschafft, und Kleinsendungen bis ca. CHF 60 bleiben steuerfrei (5-Franken-Regel)." },
];
