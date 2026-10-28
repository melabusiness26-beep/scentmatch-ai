import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/app/Breadcrumb';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export const metadata: Metadata = {
  title: 'Testing & Transparenz – So arbeitet Auressa | Auressa',
  description:
    'Melanie testet jeden Duft persönlich. Lerne, wie Auressa arbeitet, welche Düfte wirklich getestet sind und wie wir absolut ehrlich bleiben – ohne Kompromisse.',
  alternates: { canonical: `${SITE_URL}/testing-und-transparenz` },
  openGraph: {
    title: 'Testing & Transparenz | Auressa',
    description: 'Wie Auressa testet, bewertet und absolut ehrlich bleibt.',
    url: `${SITE_URL}/testing-und-transparenz`,
    type: 'website',
  },
};

export default function TestingPage() {
  return (
    <main style={{ backgroundColor: '#faf7f2' }}>
      <Breadcrumb items={[{ label: 'Testing & Transparenz', href: '/testing-und-transparenz' }]} />

      {/* Hero */}
      <section
        style={{
          backgroundImage: 'linear-gradient(rgba(26,18,9,0.88), rgba(26,18,9,0.88)), url(/hero-auressa-2.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '240px',
          padding: '2.5rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '600px' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
            Testing & Transparenz
          </p>
          <h1 style={{
            fontSize: 'clamp(24px, 6vw, 40px)',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            marginBottom: '1rem',
            lineHeight: 1.15,
            color: '#faf7f2',
          }}>
            Wie Auressa testet und urteilt
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(250,247,242,0.72)', margin: 0 }}>
            Absolut ehrlich, persönlich getestet, ohne versteckte Agenden.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '3rem 1.25rem' }}>

        {/* Melanie's Approach */}
        <section style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Wie ich teste
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.25rem' }}>
            Jeder Duft wird persönlich auf der Haut getestet
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728', marginBottom: '1rem' }}>
            Ich trage keinen Duft in die Auressa-Datenbank ein, den ich nicht selbst getestet habe. Punkt.
            Das bedeutet: Ich sprühe ihn auf, trage ihn mindestens eine Stunde, beobachte, wie er sich entwickelt,
            wie er auf meiner Haut riecht, und was anderen Menschen davon sagen.
          </p>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728', marginBottom: '1rem' }}>
            Ein Duft ist nicht einfach ein Duft. Ein Duft ist ein Erlebnis:
            Wie riecht er in den ersten 5 Minuten? Wie verändert er sich nach 30 Minuten?
            Hält er bis zum Abend, oder verfliegt er nach zwei Stunden?
            Wie reagiert meine Haut auf ihn – angenehm warm oder aufdringlich?
            Passt er zum Büro, zum Date oder nur zum Abend?
          </p>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728' }}>
            Ich mache keine „schnelle Noten-Recherche" und gebe dann ein Score ab. Ich teste wirklich.
            Das ist zeitaufwändig. Das ist auch der Grund, warum der Katalog von Auressa Schritt für Schritt wächst
            und nicht zehntausende Düfte hat wie kommerzielle Plattformen. Qualität vor Quantität.
          </p>
        </section>

        {/* Scoring System */}
        <section style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Der Auressa-Score
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.25rem' }}>
            0 bis 100 – was das wirklich bedeutet
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728', marginBottom: '1.5rem' }}>
            Der Auressa-Score ist <strong>nicht</strong> ein Nutzer-Rating und auch <strong>nicht</strong> eine Bewertung
            danach, ob mir der Duft persönlich gefällt. Es ist eine <strong>redaktionelle Gesamteinschätzung</strong>:
          </p>
          <div style={{
            background: '#fff',
            border: '1px solid rgba(212,175,55,0.2)',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '1.5rem',
          }}>
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.9rem', color: '#6b5344', margin: '0 0 0.4rem 0' }}>
                <strong style={{ color: '#d4af37' }}>80–100:</strong> Herausragende Düfte mit hoher Qualität, starkem Charakter und/oder exzellentem Preis-Leistungs-Verhältnis.
              </p>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.9rem', color: '#6b5344', margin: '0 0 0.4rem 0' }}>
                <strong style={{ color: '#d4af37' }}>60–79:</strong> Gute Düfte mit erkennbarem Charakter, guter Haltbarkeit und solider Komposition. Standard für den Katalog.
              </p>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.9rem', color: '#6b5344', margin: '0 0 0.4rem 0' }}>
                <strong style={{ color: '#d4af37' }}>40–59:</strong> Interessante Düfte mit besonderen Merkmalen, aber mit Schwächen (zu kurz haltbar, zu eintönig, teureres Preisschild für weniger Qualität).
              </p>
            </div>
            <div>
              <p style={{ fontSize: '0.9rem', color: '#6b5344', margin: '0' }}>
                <strong style={{ color: '#d4af37' }}>Unter 40:</strong> Düfte, die ich nicht empfehle. Entweder schlechte Komposition, zu kurze Haltbarkeit oder ungerechtes Preis-Leistungs-Verhältnis.
              </p>
            </div>
          </div>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728' }}>
            <em>Wichtig:</em> Ein hoher Score heisst nicht, dass dir der Duft automatisch gefällt.
            Ein Duft mit Score 50 kann dir persönlich besser gefallen als einer mit 85 – das ist vollkommen normal.
            Der Score ist ein objektives Qualitäts-Werkzeug, nicht dein persönlicher Geschmack.
            Für deinen persönlichen Geschmack nutze das Quiz – das ist dafür da.
          </p>
        </section>

        {/* Transparency */}
        <section style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Absolut ehrlich
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.25rem' }}>
            Keine versteckten Agenden
          </h2>
          <div style={{
            background: 'linear-gradient(135deg, #2a1d12 0%, #3d2b1a 100%)',
            borderRadius: '16px',
            padding: '2rem 1.5rem',
            color: '#faf7f2',
            marginBottom: '1.5rem',
          }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '0.9rem', color: '#d4af37', fontWeight: 700, marginBottom: '0.4rem' }}>
                ✓ Affiliate-Links sind deutlich gekennzeichnet
              </p>
              <p style={{ fontSize: '0.9rem', color: 'rgba(250,247,242,0.8)', lineHeight: 1.6 }}>
                Wenn ein „Jetzt ansehen"-Button eine Provision bringt, steht das dabei.
                Immer. Manchmal in Worten, immer im HTML-Code (rel=&quot;sponsored&quot;).
              </p>
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '0.9rem', color: '#d4af37', fontWeight: 700, marginBottom: '0.4rem' }}>
                ✓ Ein hoher Score ist nicht automatisch ein Affiliate-Duft
              </p>
              <p style={{ fontSize: '0.9rem', color: 'rgba(250,247,242,0.8)', lineHeight: 1.6 }}>
                Ich vergebe hohe Scores für Qualität, nicht weil ein Affiliate-Programm dahinter steckt.
                Im Gegenteil: Einige meiner liebsten High-Score-Düfte haben gar keine Affiliate-Links.
              </p>
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '0.9rem', color: '#d4af37', fontWeight: 700, marginBottom: '0.4rem' }}>
                ✓ Keine versteckten Marketing-Claims
              </p>
              <p style={{ fontSize: '0.9rem', color: 'rgba(250,247,242,0.8)', lineHeight: 1.6 }}>
                Wenn ich schreibe „dieser Duft hält lange", habe ich das persönlich getestet und kann es belegen.
                Keine ungefundenen Behauptungen aus Marketing-Texten.
              </p>
            </div>
            <div>
              <p style={{ fontSize: '0.9rem', color: '#d4af37', fontWeight: 700, marginBottom: '0.4rem' }}>
                ✓ Preise sind Richtpreise – die gültige Version im Shop entscheidet
              </p>
              <p style={{ fontSize: '0.9rem', color: 'rgba(250,247,242,0.8)', lineHeight: 1.6 }}>
                Ich aktualisiere Preise regelmässig, aber der letzte gültige Preis im Schweizer Shop ist entscheidend.
                Ich habe keinen Einfluss auf Shop-Preise.
              </p>
            </div>
          </div>
        </section>

        {/* Personal Voice */}
        <section style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Meine Stimme
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.25rem' }}>
            Du liest meine echten Gedanken, nicht KI-Text
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728', marginBottom: '1rem' }}>
            Ich schreibe persönlich. Das heisst: Das sind meine Meinungen, meine Perspektive, meine Art zu sprechen.
            Du findest auf Auressa gelegentlich Gedankenstrich – die mögen Sprachmodelle nicht besonders.
            Du findest Klammern (für Nebensätze), Umgangssprache und echte Persönlichkeit.
            Du findest <strong>nicht</strong> jeden Satz mit einem Keywords-Trigger optimiert.
          </p>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728', marginBottom: '1rem' }}>
            Die Ratgeber-Artikel, die Reviews, die Quiz-Texte – das schreibe ich alle selbst.
            Dass eine Website mit KI geschrieben wurde, sieht man daran, dass alle Sätze gleich strukturiert sind,
            dass jeder Absatz genau 3–4 Sätze hat, und dass die Sprache überoptimiert wirkt.
            Das ist hier nicht der Fall.
          </p>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728' }}>
            Wenn ich einen Fehler mache – ein Wort falsch schreibe oder eine Grammatik-Schnitzer habe – dann ist das menschlich.
            Das ist Teil von authentischer Kommunikation. Ich korrigiere es später, wenn es mir auffällt, aber ich schreibe nicht wie ein Bot.
          </p>
        </section>

        {/* Data Sources */}
        <section style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Datenquellen
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.25rem' }}>
            Woher die Infos kommen
          </h2>
          <div style={{
            background: '#fff',
            border: '1px solid rgba(212,175,55,0.2)',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '1.5rem',
          }}>
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.9rem', color: '#6b5344', fontWeight: 600, marginBottom: '0.3rem' }}>
                🧪 Persönliche Tests
              </p>
              <p style={{ fontSize: '0.9rem', color: '#6b5344', lineHeight: 1.6, margin: 0 }}>
                Mein eigenes Testen auf der Haut. Das ist die Primärquelle für alles in Auressa.
              </p>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.9rem', color: '#6b5344', fontWeight: 600, marginBottom: '0.3rem' }}>
                📖 Offizielle Markenangaben
              </p>
              <p style={{ fontSize: '0.9rem', color: '#6b5344', lineHeight: 1.6, margin: 0 }}>
                Noten, Haltbarkeit und Beschreibungen von Chanel, Dior, Lattafa & Co. – direkt von der Website.
              </p>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.9rem', color: '#6b5344', fontWeight: 600, marginBottom: '0.3rem' }}>
                💬 Feedback von echten Nutzern
              </p>
              <p style={{ fontSize: '0.9rem', color: '#6b5344', lineHeight: 1.6, margin: 0 }}>
                Wenn Nutzer mir sagen „für mich hat dieser Duft überhaupt nicht funktioniert", dann ist das auch wertvoll.
                Ich erwähne solche Perspektiven, wenn sie häufig vorkommen.
              </p>
            </div>
            <div>
              <p style={{ fontSize: '0.9rem', color: '#6b5344', fontWeight: 600, marginBottom: '0.3rem' }}>
                🚫 Was ich NICHT nutze
              </p>
              <p style={{ fontSize: '0.9rem', color: '#6b5344', lineHeight: 1.6, margin: 0 }}>
                Gescrapte Review-Plattformen, KI-generierte Vergleiche, Affiliate-Produktbeschreibungen von Amazon oder ebay.
                Das wäre Manipulation statt Recherche.
              </p>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section style={{
          background: 'linear-gradient(135deg, #2a1d12 0%, #3d2b1a 100%)',
          borderRadius: '16px',
          padding: '2rem 1.5rem',
          textAlign: 'center',
          color: '#faf7f2',
        }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Fragen?
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            Ich beantworte gern Fragen
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'rgba(250,247,242,0.8)', marginBottom: '1rem' }}>
            Wenn du Fragen zur Methodik hast, zu einem Duft, zu den Daten – oder wenn du einen Fehler gefunden hast:
            Schreib mir.
          </p>
          <p style={{ fontSize: '0.9rem', color: '#d4af37', margin: 0 }}>
            <strong>E-Mail:</strong> <a href="mailto:melanie@auressa.ch" style={{ color: '#d4af37', textDecoration: 'none', borderBottom: '1px solid #d4af37' }}>melanie@auressa.ch</a>
          </p>
        </section>

        {/* Breadcrumb */}
        <nav aria-label="Brotkrümel" style={{ marginTop: '2.5rem', fontSize: '0.8rem', color: '#6b5344' }}>
          <Link href="/" style={{ color: '#6b5344', textDecoration: 'none' }}>Start</Link>
          <span style={{ margin: '0 0.35rem' }}>›</span>
          <span>Testing & Transparenz</span>
        </nav>

      </div>
    </main>
  );
}
