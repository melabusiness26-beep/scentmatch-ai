// Kurze Erklärung + häufige Fragen unter einem Werkzeug (Quiz, Dupe-Finder …).
// Wird auf dem Server ausgeliefert, damit Google versteht, worum es auf der Seite geht.
// Alle Aussagen entsprechen dem tatsächlichen Ablauf im Code.

type Faq = { q: string; a: string };

export type ToolText = { title: string; paragraphs: string[]; faq: Faq[] };

export default function ToolExplainer({ text }: { text: ToolText }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: text.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } }))
  };
  return (
    <section className="section container tool-explainer" aria-labelledby="so-funktioniert">
      <h2 id="so-funktioniert">{text.title}</h2>
      {text.paragraphs.map((p) => (
        <p className="lead" key={p.slice(0, 40)}>
          {p}
        </p>
      ))}
      {text.faq.length > 0 && (
        <>
          <h3>Häufige Fragen</h3>
          <div className="faq">
            {text.faq.map((f) => (
              <details className="faq-item" key={f.q}>
                <summary>{f.q}</summary>
                <p className="small">{f.a}</p>
              </details>
            ))}
          </div>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }} />
        </>
      )}
    </section>
  );
}

export const TOOL_TEXTS: Record<'quiz' | 'dupes' | 'geschenk' | 'finder' | 'detektiv', ToolText> = {
  quiz: {
    title: 'So funktioniert das Duft-Quiz',
    paragraphs: [
      'Das Auressa-Quiz stellt dir 10 kurze Fragen: für wen der Duft ist, welche Duftrichtung du magst, ob es schon einen Lieblingsduft gibt, welche Note du liebst und welche gar nicht geht, dazu Anlass, Jahreszeit, Ausstrahlung, Budget und Haltbarkeit.',
      'Daraus berechnen wir für jeden Duft im Katalog einen Match von 0 bis 100 %. Am stärksten zählt die Duftrichtung (30 %), danach deine Lieblingsnote (20 %), das Budget (15 %), der Anlass (13 %), die Jahreszeit (12 %) und die gewünschte Ausstrahlung (10 %). Eine Note, die du nicht magst, gibt einen deutlichen Abzug.',
      'Empfohlen werden Düfte bis CHF 180. Dein Ergebnis kannst du als Bild in deiner Instagram- oder TikTok-Story teilen.'
    ],
    faq: [
      { q: 'Wie lange dauert das Duft-Quiz?', a: 'Etwa zwei Minuten. Es sind 10 Fragen, einige davon kannst du überspringen.' },
      { q: 'Wie genau ist das Ergebnis?', a: 'Der Match zeigt, wie gut ein Duft zu deinen Antworten passt – nach Duftrichtung, Noten, Budget, Anlass, Jahreszeit und Ausstrahlung. Wie ein Duft auf deiner Haut riecht, kann trotzdem abweichen. Teste deinen Favoriten am besten vor dem Kauf.' },
      { q: 'Kann ich einen Duft angeben, den ich schon liebe?', a: 'Ja. Bei Frage 3 kannst du einen Lieblingsduft wählen. Dann werden Düfte bevorzugt, die ihm ähnlich sind; der Lieblingsduft selbst erscheint nicht im Ergebnis.' }
    ]
  },
  dupes: {
    title: 'So findest du günstige Alternativen',
    paragraphs: [
      'Gib einen Duft ein, den du liebst. Der Dupe-Finder vergleicht seine Kopf-, Herz- und Basisnoten sowie die Duftfamilie mit den Düften im Auressa-Katalog und zeigt, welche in eine ähnliche Richtung gehen.',
      'Als günstige Alternative zählt ein Duft nur, wenn er mindestens 30 % günstiger ist und als „sehr ähnlich" oder „ähnliche Richtung" eingestuft wird. Empfohlen werden Düfte bis CHF 180.',
      'Ehrlich gesagt: Keine Alternative riecht genau wie das Original. Teste am besten eine Probe auf der Haut, bevor du eine grosse Flasche kaufst.'
    ],
    faq: [
      { q: 'Was ist ein Parfum-Dupe?', a: 'Ein Dupe ist ein Duft, der in eine ähnliche Richtung geht wie ein bekanntes, meist teureres Parfum – zu einem tieferen Preis. Er ist keine exakte Kopie.' },
      { q: 'Warum finde ich zu meinem Duft keine Alternative?', a: 'Wir zeigen nur Düfte, die wirklich ähnlich sind und mindestens 30 % günstiger. Unser Katalog wächst laufend – schau später wieder vorbei oder stöbere in den Ratgebern zu Dupes.' }
    ]
  },
  geschenk: {
    title: 'So funktioniert der Geschenk-Finder',
    paragraphs: [
      'In vier Schritten zum passenden Duft-Geschenk: für wen das Geschenk ist, wie viel du ausgeben möchtest, welcher Duft-Typ die Person ist und – falls bekannt – ihr Lieblingsduft.',
      'Daraus wählen wir passende Düfte aus dem Auressa-Katalog. Tipp: Wenn du unsicher bist, sind frische, vielseitige Düfte die sicherste Wahl – oder ein Probenset zum Ausprobieren.'
    ],
    faq: [
      { q: 'Was, wenn ich den Lieblingsduft nicht kenne?', a: 'Kein Problem – der letzte Schritt ist freiwillig. Die Empfehlung richtet sich dann nach Person, Budget und Duft-Typ.' },
      { q: 'Welches Budget ist sinnvoll?', a: 'Gute Düfte gibt es in jeder Preisklasse. Im Geschenk-Finder wählst du dein Budget selbst – die Vorschläge richten sich danach.' }
    ]
  },
  finder: {
    title: 'So suchst du mit dem Duft-Finder',
    paragraphs: [
      'Tippe einen Duftnamen, eine Marke, eine Note oder eine Beschreibung ein – zum Beispiel „frisch holzig" oder „Vanille". Der Duft-Finder durchsucht den Auressa-Katalog und zeigt passende Düfte mit ihren wichtigsten Angaben.',
      'Du weisst schon, wie dein Wunschduft riechen soll, aber nicht, wie er heisst? Dann probiere auch das Duft-Quiz oder den Duft-Detektiv.'
    ],
    faq: [
      { q: 'Kann ich nach einzelnen Duftnoten suchen?', a: 'Ja. Gib einfach eine Note ein, zum Beispiel „Bergamotte" oder „Tonkabohne". Im Duftnoten-Lexikon findest du ausserdem Erklärungen zu jeder Note.' }
    ]
  },
  detektiv: {
    title: 'So funktioniert der Duft-Detektiv',
    paragraphs: [
      'Du hast einen Duft gerochen – bei jemandem, in einem Geschäft oder auf Reisen – und weisst nicht, wie er heisst? Der Duft-Detektiv stellt dir bis zu 12 Fragen: wo und wann du ihn gerochen hast, wie er gewirkt hat, wie stark er war, zu welchem Anlass er passte und was du über Marke oder Flakon noch weisst.',
      'Aus deinen Antworten sucht der Detektiv die wahrscheinlichsten Düfte im Auressa-Katalog. Je mehr Hinweise du gibst, desto treffsicherer wird das Ergebnis.'
    ],
    faq: [
      { q: 'Findet der Duft-Detektiv jeden Duft?', a: 'Nur Düfte, die im Auressa-Katalog erfasst sind. Der Katalog wächst laufend; findest du deinen Duft noch nicht, hilft dir vielleicht das Duft-Quiz bei ähnlichen Düften.' }
    ]
  }
};
