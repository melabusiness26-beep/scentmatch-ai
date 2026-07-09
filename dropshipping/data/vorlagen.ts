/**
 * Fertige Text-Vorlagen für Kundenservice & Lieferanten-Kontakt.
 * Platzhalter in [ECKIGEN KLAMMERN] werden vor dem Senden ersetzt.
 */

export type Vorlage = {
  id: string;
  titel: string;
  emoji: string;
  wann: string;
  betreff?: string;
  text: string;
};

export const VORLAGEN: Vorlage[] = [
  {
    id: "wo-ist-paket",
    titel: "«Wo ist mein Paket?»",
    emoji: "📦",
    wann: "Die häufigste Kundenanfrage überhaupt. Schnell, freundlich und mit Tracking-Link antworten – das verhindert 90 % aller Eskalationen.",
    betreff: "Deine Bestellung ist unterwegs 🚚",
    text: `Liebe/r [NAME]

Danke für deine Nachricht – ich habe sofort nachgeschaut!

Dein Paket ist unterwegs und hier kannst du es live verfolgen:
[TRACKING-LINK]

Da wir direkt ab Herstellerlager verschicken, dauert die Lieferung 8–15 Werktage. Dein Paket liegt aktuell gut im Zeitplan – die Sendungsverfolgung aktualisiert sich manchmal erst mit 1–2 Tagen Verzögerung, das ist normal.

Falls es bis am [DATUM: Bestelldatum + 15 Werktage] nicht da ist, melde dich einfach direkt bei mir – dann kümmere ich mich persönlich darum.

Herzliche Grüsse
[DEIN NAME] von [SHOP-NAME]`,
  },
  {
    id: "verspaetung-proaktiv",
    titel: "Verspätung – proaktiv melden",
    emoji: "⏰",
    wann: "Wenn du siehst, dass eine Sendung länger braucht: Melde dich, BEVOR die Kundin fragt. Das verwandelt Frust in Vertrauen.",
    betreff: "Kurzes Update zu deiner Bestellung",
    text: `Liebe/r [NAME]

Ich möchte ehrlich mit dir sein: Deine Bestellung braucht etwas länger als geplant – aktuell rechne ich mit Ankunft um den [DATUM].

Das passiert selten, aber ich wollte, dass du es von mir erfährst und nicht warten musst, ohne Bescheid zu wissen. Hier ist dein aktueller Sendungsstand: [TRACKING-LINK]

Als kleine Entschuldigung lege ich dir einen Rabatt-Code für deine nächste Bestellung bei: [CODE] (10 %).

Danke für deine Geduld!
[DEIN NAME] von [SHOP-NAME]`,
  },
  {
    id: "retoure-kulanz",
    titel: "Rückgabe-Wunsch (Kulanz-Lösung)",
    emoji: "↩️",
    wann: "Bei günstigen Produkten ist «behalten + erstatten» oft billiger als Rückversand – und macht aus Verärgerten Fans.",
    betreff: "Deine Rückgabe – so machen wir das",
    text: `Liebe/r [NAME]

Schade, dass das Produkt nicht deinen Erwartungen entspricht – danke, dass du es mich wissen lässt!

Ich mache es dir so einfach wie möglich: Du musst nichts zurückschicken. Ich erstatte dir den vollen Betrag von CHF [BETRAG] innert 3–5 Werktagen auf dein Zahlungsmittel, und du darfst das Produkt behalten oder verschenken.

Magst du mir noch kurz sagen, was dich gestört hat? Das hilft mir, besser zu werden.

Herzliche Grüsse
[DEIN NAME] von [SHOP-NAME]`,
  },
  {
    id: "defektes-produkt",
    titel: "Produkt kam beschädigt an",
    emoji: "🔧",
    wann: "Bei Defekt sofort Ersatz oder Erstattung anbieten – nie diskutieren. Ein Foto genügt als Nachweis.",
    betreff: "Das tut mir leid – hier ist die Lösung",
    text: `Liebe/r [NAME]

Das tut mir wirklich leid – so soll ein Produkt von uns nicht ankommen!

Damit ich das sofort für dich lösen kann, schick mir bitte ein Foto vom Produkt und der Verpackung. Danach hast du die Wahl:

1. Ich schicke dir kostenlos ein neues Exemplar, oder
2. Ich erstatte dir den vollen Betrag.

Du musst nichts zurückschicken. Sag mir einfach, was dir lieber ist.

Herzliche Grüsse und entschuldige die Umstände
[DEIN NAME] von [SHOP-NAME]`,
  },
  {
    id: "bewertung-bitten",
    titel: "Um Bewertung bitten",
    emoji: "⭐",
    wann: "5–7 Tage nach Zustellung senden. Bewertungen sind dein wertvollstes Marketing – aber nur, wenn man freundlich fragt.",
    betreff: "Wie gefällt dir dein [PRODUKT]?",
    text: `Liebe/r [NAME]

Dein [PRODUKT] ist jetzt ein paar Tage bei dir – ich hoffe, es macht dir Freude!

Als kleines Ein-Personen-Business bedeutet jede Bewertung enorm viel für mich. Wenn du 30 Sekunden hast, würde mich deine ehrliche Meinung riesig freuen: [BEWERTUNGS-LINK]

Und falls irgendetwas nicht passt: Antworte einfach auf diese E-Mail – ich kümmere mich persönlich darum, bevor du auch nur einen Stern abziehen musst. 😊

Herzliche Grüsse
[DEIN NAME] von [SHOP-NAME]`,
  },
  {
    id: "dm-antwort",
    titel: "Instagram/TikTok-DM: «Ist das seriös?»",
    emoji: "💬",
    wann: "Skeptische Nachfragen unter Videos oder per DM – ehrlich und locker beantworten, nie werblich.",
    text: `Hey [NAME]! 😊

Verstehe die Frage total – gibt leider viele unseriöse Shops da draussen.

Bei uns: Schweizer Shop mit Impressum (schau gern auf die Website), Zahlung per TWINT/Karte über gesicherte Anbieter, und wenn was nicht passt, bekommst du dein Geld zurück – ohne Diskussion.

Die Lieferung dauert 8–15 Werktage, weil wir direkt ab Herstellerlager verschicken – dafür zahlst du deutlich weniger als im Laden. Steht aber auch alles transparent im Shop.

Wenn du noch Fragen hast: immer her damit! 🙌`,
  },
  {
    id: "lieferant-muster",
    titel: "Lieferanten-Anfrage: Muster bestellen (Englisch)",
    emoji: "🏭",
    wann: "An AliExpress-/CJ-Händler vor der ersten Bestellung. Englisch, kurz, konkret – so wirst du ernst genommen.",
    text: `Hello!

I run an online store in Switzerland and I'm interested in selling this product. Before I start, I would like to order 1-2 samples to check the quality.

A few questions:
1. What is your fastest shipping option to Switzerland, and how many days does it take?
2. Can you confirm the product has CE marking / relevant certificates? (Please send documents.)
3. Do you offer any branding options (custom packaging or logo) for regular orders?
4. What discount can you offer at 10-50 orders per month?

If the samples are good, I plan to order regularly. Thank you!

Best regards
[DEIN NAME]`,
  },
  {
    id: "lieferant-problem",
    titel: "Lieferanten-Reklamation (Englisch)",
    emoji: "⚠️",
    wann: "Wenn eine Kundensendung beschädigt/falsch ankam – der Lieferant soll die Kosten tragen, nicht du.",
    text: `Hello,

Order [BESTELLNUMMER] arrived damaged / incorrect (photos attached).

My customer received: [WAS ANKAM]
Ordered was: [WAS BESTELLT WAR]

Please send a free replacement with expedited shipping OR refund this order. I ship several orders with you per month, so I trust we can solve this quickly.

Thank you!
[DEIN NAME]`,
  },
];
