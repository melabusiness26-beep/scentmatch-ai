import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/app/Breadcrumb';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export const metadata: Metadata = {
  title: 'Testing & Transparenz – So arbeitet Auressa',
  description:
    'Woher die Duft-Angaben auf Auressa stammen, wie der Auressa-Score berechnet wird und wie wir mit Partner-Links umgehen.',
  alternates: { canonical: `${SITE_URL}/testing-und-transparenz` },
  openGraph: {
      images: ['/opengraph-image'],
    title: 'Testing & Transparenz | Auressa',
    description: 'Woher die Angaben stammen und wie der Auressa-Score berechnet wird.',
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
            fontFamily: "var(--font-display), Georgia, serif",
            fontWeight: 700,
            marginBottom: '1rem',
            lineHeight: 1.15,
            color: '#faf7f2',
          }}>
            Wie Auressa arbeitet
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(250,247,242,0.72)', margin: 0 }}>
            Geprüfte Daten statt Bauchgefühl.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '3rem 1.25rem' }}>

        {/* Woher die Angaben stammen */}
        <section style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Unsere Methode
          </p>
          <h2 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: '1.75rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.25rem' }}>
            Jede Angabe wird mit mehreren Quellen abgeglichen
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728', marginBottom: '1rem' }}>
            Ein Duft riecht auf jeder Haut etwas anders – darum verlässt sich Auressa nicht auf eine einzelne Meinung.
            Unsere Angaben stammen aus mehreren unabhängigen Quellen: den Angaben der Marken, grossen
            Duft-Datenbanken wie Parfumo mit den Erfahrungen tausender Duft-Liebhaber und Schweizer Online-Shops.
            Diese Quellen gleichen wir miteinander ab.
          </p>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728', marginBottom: '1rem' }}>
            Eine Angabe wie Duftnoten, Erscheinungsjahr oder Parfümeur tragen wir nur ein, wenn mehrere Quellen
            übereinstimmen. Widersprechen sich die Quellen, lassen wir das Feld lieber leer, als etwas zu raten.
          </p>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728' }}>
            Haltbarkeit und Ausstrahlung richten sich nach den Bewertungen der Parfumo-Community. Wo die Duftrichtung
            (z. B. „Frisch, Zitrisch, Aquatisch“) von Parfumo stammt, steht das auf der Duft-Seite dabei; sonst wird sie
            aus den Duftnoten berechnet. Darum wächst der
            Katalog Schritt für Schritt: lieber weniger Düfte mit stimmenden Angaben.
          </p>
        </section>

        {/* Scoring System */}
        <section style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Der Auressa-Score
          </p>
          <h2 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: '1.75rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.25rem' }}>
            0 bis 100 – was das wirklich bedeutet
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728', marginBottom: '1.5rem' }}>
            Der Auressa-Score ist <strong>kein</strong> Nutzer-Rating und <strong>keine</strong> persönliche Meinung.
            Er wird für jeden Duft nach denselben Regeln automatisch aus den erfassten Daten berechnet:
          </p>
          <div style={{
            background: '#fff',
            border: '1px solid rgba(212,175,55,0.2)',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '1.5rem',
          }}>
            <p style={{ fontSize: '0.9rem', color: '#6b5344', margin: '0 0 0.6rem 0' }}>
              <strong style={{ color: '#d4af37' }}>Preis-Leistung – 40 %:</strong> Preis pro 100 ml und Haltbarkeit zusammen – wie viel Duft du fürs Geld bekommst.
            </p>
            <p style={{ fontSize: '0.9rem', color: '#6b5344', margin: '0 0 0.6rem 0' }}>
              <strong style={{ color: '#d4af37' }}>Haltbarkeit – 25 %:</strong> wie lange der Duft laut Community-Bewertungen hält.
            </p>
            <p style={{ fontSize: '0.9rem', color: '#6b5344', margin: '0 0 0.6rem 0' }}>
              <strong style={{ color: '#d4af37' }}>Vielseitigkeit – 20 %:</strong> zu wie vielen Jahreszeiten und Anlässen er passt.
            </p>
            <p style={{ fontSize: '0.9rem', color: '#6b5344', margin: 0 }}>
              <strong style={{ color: '#d4af37' }}>Ausstrahlung – 15 %:</strong> eine ausgewogene Ausstrahlung zählt am meisten, sehr leise oder sehr laute Düfte etwas weniger.
            </p>
          </div>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728' }}>
            <em>Wichtig:</em> Der Score sagt nichts darüber, ob dir ein Duft gefällt. Ein Duft mit Score 50 kann dir
            besser gefallen als einer mit 85. Welche Düfte zu deinem Geschmack passen, zeigt dir das Quiz.
          </p>
        </section>

        {/* Transparency */}
        <section style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Absolut ehrlich
          </p>
          <h2 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: '1.75rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.25rem' }}>
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
                Wenn ein Knopf zu einem Shop eine Provision bringen kann, steht ein Hinweis dabei, und der Link ist
                im HTML-Code als Werbung gekennzeichnet (rel=&quot;sponsored&quot;).
              </p>
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '0.9rem', color: '#d4af37', fontWeight: 700, marginBottom: '0.4rem' }}>
                ✓ Partner-Links beeinflussen den Score nicht
              </p>
              <p style={{ fontSize: '0.9rem', color: 'rgba(250,247,242,0.8)', lineHeight: 1.6 }}>
                Der Score wird für alle Düfte gleich berechnet – ob es einen Partner-Link gibt oder nicht,
                spielt dafür keine Rolle.
              </p>
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '0.9rem', color: '#d4af37', fontWeight: 700, marginBottom: '0.4rem' }}>
                ✓ Keine erfundenen Angaben
              </p>
              <p style={{ fontSize: '0.9rem', color: 'rgba(250,247,242,0.8)', lineHeight: 1.6 }}>
                Keine erfundenen Bewertungen, Tester-Zahlen oder Verfügbarkeiten. Was wir nicht belegen können,
                schreiben wir nicht hin.
              </p>
            </div>
            <div>
              <p style={{ fontSize: '0.9rem', color: '#d4af37', fontWeight: 700, marginBottom: '0.4rem' }}>
                ✓ Preise sind Richtpreise – die gültige Version im Shop entscheidet
              </p>
              <p style={{ fontSize: '0.9rem', color: 'rgba(250,247,242,0.8)', lineHeight: 1.6 }}>
                Die Preise stammen aus Schweizer Online-Shops zum Zeitpunkt der Recherche. Massgebend ist immer der
                aktuelle Preis im Shop – darauf haben wir keinen Einfluss. Auressa verkauft selbst keine Düfte.
              </p>
            </div>
          </div>
        </section>

        {/* Texte */}
        <section style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Unsere Texte
          </p>
          <h2 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: '1.75rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.25rem' }}>
            Wie die Duft-Texte entstehen
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728' }}>
            Die Beschreibungen auf den Duft-Seiten werden aus den geprüften Daten erstellt – teils automatisch, teils
            mit Unterstützung von KI-Werkzeugen. Die Angaben, auf denen sie beruhen, werden vorher mit den Quellen
            abgeglichen. Bewertungen von Kundinnen und Kunden oder Testberichte gibt es auf Auressa nicht.
          </p>
        </section>

        {/* Data Sources */}
        <section style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Datenquellen
          </p>
          <h2 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: '1.75rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.25rem' }}>
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
                Duft-Datenbanken
              </p>
              <p style={{ fontSize: '0.9rem', color: '#6b5344', lineHeight: 1.6, margin: 0 }}>
                Vor allem Parfumo: Duftnoten, Erscheinungsjahr, Parfümeur sowie die Community-Bewertungen zu
                Haltbarkeit, Ausstrahlung und Duftrichtung.
              </p>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.9rem', color: '#6b5344', fontWeight: 600, marginBottom: '0.3rem' }}>
                Offizielle Markenangaben
              </p>
              <p style={{ fontSize: '0.9rem', color: '#6b5344', lineHeight: 1.6, margin: 0 }}>
                Duftnoten und Beschreibungen direkt von den Websites der Marken, wo vorhanden.
              </p>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.9rem', color: '#6b5344', fontWeight: 600, marginBottom: '0.3rem' }}>
                Schweizer Online-Shops
              </p>
              <p style={{ fontSize: '0.9rem', color: '#6b5344', lineHeight: 1.6, margin: 0 }}>
                Für Grössen und Richtpreise in Franken.
              </p>
            </div>
            <div>
              <p style={{ fontSize: '0.9rem', color: '#6b5344', fontWeight: 600, marginBottom: '0.3rem' }}>
                Was wir nicht tun
              </p>
              <p style={{ fontSize: '0.9rem', color: '#6b5344', lineHeight: 1.6, margin: 0 }}>
                Bewertungen erfinden, ganze Datensätze oder Rezensionen von anderen Seiten kopieren oder
                Werbetexte von Shops übernehmen.
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
          <h2 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            Fehler gefunden oder eine Frage?
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'rgba(250,247,242,0.8)', marginBottom: '1rem' }}>
            Wenn dir eine Angabe falsch vorkommt oder du eine Frage zu den Daten hast: Schreib uns, wir prüfen es.
          </p>
          <p style={{ fontSize: '0.9rem', color: '#d4af37', margin: 0 }}>
            <strong>E-Mail:</strong> <a href="mailto:mela.business26@gmail.com" style={{ color: '#d4af37', textDecoration: 'none', borderBottom: '1px solid #d4af37' }}>mela.business26@gmail.com</a>
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
