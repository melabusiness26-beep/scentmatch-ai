import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/app/Breadcrumb';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export const metadata: Metadata = {
  title: 'Günstige Duft-Alternativen: Dupes, Klone & clever sparen',
  description:
    'Was ist ein Dupe, was ist eine Fälschung – und wie zahlst du für deinen Lieblingsduft weniger? Ehrliche Tipps ohne Wunderversprechen.',
  alternates: { canonical: '/guenstige-alternativen' },
  openGraph: {
    title: 'Günstige Duft-Alternativen | Auressa',
    description:
      'Dupes, leichtere Versionen, grössere Flaschen, Proben: ehrliche Wege, für einen guten Duft weniger zu zahlen.',
    type: 'website',
    url: `${SITE_URL}/guenstige-alternativen`
  }
};

const box: React.CSSProperties = {
  background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.04))',
  border: '1px solid rgba(212,175,55,0.15)',
  borderRadius: '12px',
  padding: '1.5rem',
  marginBottom: '2rem'
};

const card: React.CSSProperties = {
  background: 'linear-gradient(135deg, rgba(212,175,55,0.05), rgba(212,175,55,0.02))',
  border: '1px solid rgba(212,175,55,0.1)',
  borderRadius: '8px',
  padding: '1.25rem'
};

const link: React.CSSProperties = { color: '#d4af37', fontWeight: 600, textDecoration: 'none' };

// Nur allgemein gültige Hinweise und breit belegte Beispiele – keine erfundenen
// Prozentzahlen, Marken oder Preise.
const WAYS = [
  {
    titel: '1. Dupes von günstigeren Marken',
    text:
      'Manche Marken bieten Düfte an, die bekannten Luxus-Düften ähneln – unter eigenem Namen und zu einem deutlich tieferen Preis. Bekannt dafür sind zum Beispiel Armaf und Lattafa. Das bekannteste Beispiel: Armaf Club de Nuit Intense Man wird in der Duft-Community seit Jahren als Alternative zu Creed Aventus genannt.',
    hinweis: 'Ein Dupe riecht ähnlich, aber nie identisch. Haltbarkeit, Ausstrahlung und einzelne Noten können abweichen.'
  },
  {
    titel: '2. Eine leichtere Version desselben Dufts',
    text:
      'Viele Düfte gibt es als Eau de Toilette und als Eau de Parfum. Das Eau de Toilette ist meist günstiger und leichter. Oft unterscheidet sich nur die Konzentration, manchmal aber auch die Rezeptur – die beiden Versionen können also etwas anders riechen.',
    hinweis: 'Beide Versionen vorher testen. Auf unseren Duft-Seiten siehst du die Versionen im Vergleich.'
  },
  {
    titel: '3. Die grössere Flasche',
    text:
      'Grosse Flaschen sind pro Milliliter oft deutlich günstiger als kleine. Wenn du einen Duft schon kennst und liebst, lohnt sich ein Blick auf den Preis pro 100 ml.',
    hinweis: 'Auf unseren Duft-Seiten zeigt die Tabelle „Grössen & Preise" die günstigste Grösse an, wenn wir die Preise erfasst haben.'
  },
  {
    titel: '4. Proben und Aktionen',
    text:
      'Mit einer Probe oder Abfüllung findest du heraus, ob dir ein Duft auf deiner Haut gefällt, bevor du eine ganze Flasche kaufst. Und bei bekannten Shops gibt es regelmässig Aktionen – wer nicht sofort kaufen muss, spart mit etwas Geduld.',
    hinweis: 'Ein Fehlkauf ist am teuersten. Zuerst testen spart oft mehr als jeder Rabatt.'
  }
];

const FAKE_SIGNS = [
  'Original-Name und Logo einer Luxusmarke zu einem Preis, der viel zu tief ist',
  'Unbekannter Verkäufer ohne Impressum, Adresse oder Bewertungen',
  'Rechtschreibfehler, schiefe Etiketten oder fehlende Angaben auf der Verpackung',
  'Keine Inhaltsstoffliste auf der Packung'
];

const FAQ = [
  {
    frage: 'Ist ein Dupe eine Fälschung?',
    antwort:
      'Nein. Ein Dupe ist ein eigener Duft unter eigenem Namen, der einem bekannten Duft ähnlich riecht. Eine Fälschung dagegen trägt unerlaubt den Namen oder das Logo der Originalmarke – das ist verboten.'
  },
  {
    frage: 'Darf ein Dupe mit dem Namen des Originals werben?',
    antwort:
      'Hier ist Vorsicht geboten. In der EU hat der Europäische Gerichtshof 2009 im Fall L\'Oréal gegen Bellure entschieden, dass Listen nach dem Muster „riecht wie …" mit fremden Markennamen gegen das Markenrecht verstossen können. Seriöse Anbieter verkaufen ihre Düfte deshalb meist unter eigenem Namen, ohne direkten Bezug auf das Original.'
  },
  {
    frage: 'Hält ein Dupe genauso lange wie das Original?',
    antwort:
      'Das ist sehr unterschiedlich – manche halten kürzer, manche erstaunlich lang. Eine allgemeine Regel gibt es nicht. Am besten testest du den Duft auf deiner eigenen Haut.'
  },
  {
    frage: 'Woher weiss Auressa, welche Düfte ähnlich riechen?',
    antwort:
      'Auf unseren Duft-Seiten vergleichen wir Duftfamilie, Noten und Intensität der Düfte in unserem Katalog. Bekannte Alternativen nennen wir nur, wenn mehrere unabhängige Quellen sie bestätigen.'
  }
];

export default function GuenstigeAlternativenPage() {
  return (
    <main>
      <Breadcrumb items={[{ label: 'Günstige Duft-Alternativen', href: '/guenstige-alternativen' }]} />
      <div className="container">
        <section className="section">
          <p className="eyebrow">Wissen</p>
          <h1 className="detail-title">Günstige Duft-Alternativen &amp; Dupes</h1>
          <p className="lead">
            Du liebst einen teuren Duft, willst aber nicht so viel dafür zahlen? Es gibt mehrere ehrliche Wege,
            ähnlich gut zu riechen und weniger auszugeben. Hier erklären wir sie – ohne Wunderversprechen.
          </p>

          <h2>Dupe oder Fälschung – was ist der Unterschied?</h2>
          <div style={box}>
            <p style={{ margin: '0 0 0.75rem 0', fontWeight: 600, color: '#2a1d12' }}>✅ Dupe</p>
            <p style={{ margin: '0 0 1.25rem 0', fontSize: '0.9rem', color: '#5b4d40', lineHeight: 1.6 }}>
              Ein eigener Duft unter eigenem Namen und mit eigener Verpackung, der einem bekannten Duft ähnlich riecht.
              Dupes werden ganz normal im Handel verkauft.
            </p>
            <p style={{ margin: '0 0 0.75rem 0', fontWeight: 600, color: '#2a1d12' }}>❌ Fälschung</p>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#5b4d40', lineHeight: 1.6 }}>
              Ein Produkt, das unerlaubt den Namen, das Logo oder den Flakon der Originalmarke kopiert und so tut, als wäre es
              das Original. Das ist verboten – und du weisst nie, was wirklich in der Flasche ist.
            </p>
          </div>

          <h2>4 Wege, für einen guten Duft weniger zu zahlen</h2>
          <div style={{ display: 'grid', gap: '1.2rem', marginBottom: '2rem' }}>
            {WAYS.map((w) => (
              <div key={w.titel} style={card}>
                <h3 style={{ margin: '0 0 0.75rem 0', fontSize: '0.95rem' }}>{w.titel}</h3>
                <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.9rem', color: '#5b4d40', lineHeight: 1.6 }}>{w.text}</p>
                <p style={{ margin: 0, padding: '0.75rem', background: 'rgba(212,175,55,0.05)', borderRadius: '4px', fontSize: '0.85rem', color: '#5b4d40', fontStyle: 'italic' }}>
                  💡 {w.hinweis}
                </p>
              </div>
            ))}
          </div>

          <h2>So erkennst du eine Fälschung</h2>
          <div style={box}>
            <ul style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', color: '#5b4d40', lineHeight: 1.7 }}>
              {FAKE_SIGNS.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#5b4d40', lineHeight: 1.6 }}>
              Am sichersten kaufst du Originale bei bekannten Parfümerien und grossen Online-Shops.
            </p>
          </div>

          <h2>Häufige Fragen</h2>
          <div style={{ display: 'grid', gap: '1rem', marginBottom: '2rem' }}>
            {FAQ.map((qa) => (
              <div key={qa.frage}>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem' }}>{qa.frage}</h3>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#5b4d40', lineHeight: 1.6 }}>{qa.antwort}</p>
              </div>
            ))}
          </div>

          <div style={{ background: '#f0e6d2', borderLeft: '4px solid #d4af37', padding: '1.5rem', borderRadius: '0 8px 8px 0', marginBottom: '2rem' }}>
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 600, color: '#2a1d12' }}>
              💰 Günstige Alternativen in unserem Katalog finden
            </p>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#5b4d40', lineHeight: 1.6 }}>
              Im <Link href="/dupes" style={link}>Dupe-Finder</Link> gibst du deinen Lieblingsduft ein und siehst ähnlich
              riechende Düfte aus unserem Katalog, die weniger kosten. Oder mach{' '}
              <Link href="/quiz" style={link}>das Auressa-Quiz</Link>, um Düfte zu finden, die zu dir passen.
            </p>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(212,175,55,0.2)', margin: '3rem 0' }} />

          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ marginTop: 0 }}>Weitere Ratgeber zum Budget &amp; Auswahl</h3>
            <ul style={{ fontSize: '0.95rem', lineHeight: 1.8 }}>
              <li><Link href="/ratgeber/parfum-proben-abfuellungen-schweiz" style={link}>Parfum-Proben &amp; Abfüllungen</Link> – zuerst testen, dann kaufen</li>
              <li><Link href="/duftsammlung" style={link}>Duftsammlung aufbauen</Link> – Strategien für eine Sammlung mit kleinerem Budget</li>
              <li><Link href="/duftarten" style={link}>Duftarten erklärt</Link> – EdP, EdT, Cologne: worin sie sich unterscheiden</li>
              <li><Link href="/koerperchemie-duft" style={link}>Körperchemie &amp; Duft</Link> – warum ein Duft auf dir anders riecht</li>
              <li><Link href="/duftnoten-guide" style={link}>Duftnoten verstehen</Link> – die Duftpyramide erklärt</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
