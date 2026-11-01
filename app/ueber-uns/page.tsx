import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/app/Breadcrumb';
import { OPERATOR } from '@/lib/operator';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export const metadata: Metadata = {
  title: 'Über Auressa – Die Geschichte hinter der Plattform',
  description:
    'Auressa entstand aus einer persönlichen Frustration: Zu viele Parfüms gekauft, die nicht gepasst haben. Melanie aus der Schweiz hat das geändert – ehrlich, auf Deutsch, mit echten Empfehlungen.',
  alternates: { canonical: `${SITE_URL}/ueber-uns` },
  openGraph: {
      images: ['/opengraph-image'],
    title: 'Über Auressa | Auressa',
    description: 'Die Geschichte hinter einer ehrlichen Duft-Plattform aus der Schweiz.',
    url: `${SITE_URL}/ueber-uns`,
    type: 'website',
  },
};

const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'Über Auressa',
  url: `${SITE_URL}/ueber-uns`,
  description:
    'Auressa ist eine unabhängige Duft-Findungs-Plattform aus der Schweiz – gegründet von Melanie Viele, mit Duft-Quiz und ehrlichen Ratgebern.',
};

export default function UeberUnsPage() {
  return (
    <main style={{ backgroundColor: '#faf7f2' }}>
      <Breadcrumb items={[{ label: 'Über Auressa', href: '/ueber-uns' }]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd).replace(/</g, "\\u003c") }}
      />

      {/* Hero */}
      <section
        style={{
          backgroundImage: 'linear-gradient(rgba(26,18,9,0.85), rgba(26,18,9,0.85)), url(/hero-auressa-2.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '280px',
          padding: '2.5rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '600px' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
            Über Auressa
          </p>
          <h1 style={{
            fontSize: 'clamp(28px, 7vw, 44px)',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            marginBottom: '1rem',
            lineHeight: 1.15,
            color: '#faf7f2',
          }}>
            Eine Schweizerin. Eine Leidenschaft für Düfte. Eine ehrliche Plattform.
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(250,247,242,0.7)', margin: 0 }}>
            Auressa entstand nicht im Büro, sondern aus echter Frustration beim Parfüm-Kauf.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '3rem 1.25rem' }}>

        {/* Die Geschichte */}
        <section style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Die Geschichte
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.25rem' }}>
            Warum ich Auressa gegründet habe
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728', marginBottom: '1rem' }}>
            Ich bin Melanie – und ich habe in meinem Leben schon zu viele Parfüms gekauft, die dann
            ungeöffnet im Schrank standen. Nicht weil sie schlecht waren, sondern weil ich beim Kauf
            keine Ahnung hatte, ob sie wirklich zu mir passen.
          </p>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728', marginBottom: '1rem' }}>
            Ein Flakon für 150 Franken. Zwei Sprühstösse. Und dann: Enttäuschung.
            Das kennen viele. Ich wollte das ändern.
          </p>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728' }}>
            Auressa ist meine Antwort darauf – gebaut in der Schweiz, auf Deutsch, für echte Menschen
            die einen Duft suchen, der wirklich zu ihnen passt. Ohne Hype, ohne versteckte Werbung,
            mit ehrlichen Empfehlungen.
          </p>
        </section>

        {/* Was Auressa bietet — als auffällige Karten */}
        <section style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Was wir bieten
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.5rem' }}>
            Mehr als eine Duftliste
          </h2>
          <div style={{ display: 'grid', gap: '1rem', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            {[
              { icon: '🎯', title: 'Duft-Quiz', text: 'Beantworte 10 Fragen – wir berechnen deinen persönlichen Match-Score für jeden Duft im Katalog.' },
              { icon: '🕵️', title: 'Duft-Detektiv', text: '12 tiefe Fragen zu Persönlichkeit, Stil und Anlass. Für Menschen, die ihren Signature Duft noch nicht kennen.' },
              { icon: '📸', title: 'Duft-Scanner (bald verfügbar)', text: 'Foto hochladen, Parfüm erkennen lassen – die KI soll Flakon, Noten und Charakter erkennen.' },
              { icon: '💸', title: 'Günstige Dupes', text: 'Keine Lust auf 200-Franken-Flakons? Wir zeigen dir Alternativen, die ähnlich riechen – für einen Bruchteil des Preises.' },
              { icon: '📖', title: 'Ehrliche Ratgeber', text: 'Kein Fachjargon. Klare Erklärungen zu Duftnoten, Ausstrahlung, Haltbarkeit und saisonalen Empfehlungen.' },
              { icon: '🇨🇭', title: 'Schweizer Perspektive', text: 'Alle Preise in CHF, Texte in Schweizer Schreibweise.' },
            ].map(item => (
              <div key={item.title} style={{
                background: '#fff',
                border: '1px solid rgba(212,175,55,0.2)',
                borderRadius: '12px',
                padding: '1.25rem',
              }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{item.icon}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1rem', fontWeight: 700, color: '#2a1d12', marginBottom: '0.4rem' }}>{item.title}</h3>
                <p style={{ fontSize: '0.875rem', color: '#6b5344', lineHeight: 1.6, margin: 0 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Werte */}
        <section style={{ marginBottom: '3rem', background: 'linear-gradient(135deg, #2a1d12 0%, #3d2b1a 100%)', borderRadius: '16px', padding: '2rem 1.5rem', color: '#faf7f2' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Meine Grundsätze
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: '#faf7f2', marginBottom: '1.25rem' }}>
            Worauf ich bei Auressa bestehe
          </h2>
          <div style={{ display: 'grid', gap: '0.75rem' }}>
            {[
              { label: 'Ehrlichkeit', text: 'Kein Duft bekommt eine bessere Bewertung weil ein Affiliate-Programm dahintersteckt. Punkt.' },
              { label: 'Transparenz', text: 'Wenn ein Link Provision bringt, steht das dabei. Immer. Die Preise im Shop gelten, nicht meine.' },
              { label: 'Kein Fachjargon', text: 'Akkorde, Chypre, Animalisch – ich erkläre was das bedeutet, statt damit zu imponieren.' },
            ].map(v => (
              <div key={v.label} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <span style={{ color: '#d4af37', fontWeight: 700, fontSize: '1rem', flexShrink: 0, marginTop: '2px' }}>→</span>
                <div>
                  <span style={{ fontWeight: 700, color: '#faf7f2' }}>{v.label}: </span>
                  <span style={{ color: 'rgba(250,247,242,0.75)', fontSize: '0.9rem' }}>{v.text}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Wie die Empfehlungen entstehen */}
        <section style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Methode
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1rem' }}>
            Wie die Match-Engine funktioniert
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728', marginBottom: '1rem' }}>
            Hinter jedem Ergebnis steckt ein Scoring-System: Duftfamilie, Lieblingsnoten,
            Budget, Anlass, Saison und Intensität werden gewichtet und mit jedem Duft im
            Katalog verglichen. Das ergibt einen Match-Score von 0 bis 100.
          </p>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728' }}>
            Keine Black Box. Kein Algorithmus der mir gefällt was er empfiehlt. Sondern klare
            Kriterien, die du selbst angibst – und ein Ergebnis, das ich dir erklären kann.
          </p>
        </section>

        {/* Kontakt */}
        <section style={{ marginBottom: '3rem', borderTop: '1px solid rgba(212,175,55,0.2)', paddingTop: '2rem' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: '#2a1d12', marginBottom: '0.75rem' }}>
            Schreib mir
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728', marginBottom: '1rem' }}>
            Fehlt ein Duft im Katalog? Hast du einen Verbesserungsvorschlag? Oder willst du einfach
            wissen, welcher Duft zu einer besonderen Situation passt?
          </p>
          <a
            href={`mailto:${OPERATOR.email}`}
            style={{
              display: 'inline-block',
              background: '#d4af37',
              color: '#2a1d12',
              fontWeight: 700,
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '0.9rem',
              letterSpacing: '0.04em',
            }}
          >
            {OPERATOR.email}
          </a>
        </section>

        {/* CTA */}
        <section style={{
          background: '#fff',
          border: '1px solid rgba(212,175,55,0.25)',
          borderRadius: '16px',
          padding: '2rem',
          textAlign: 'center',
        }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: '#2a1d12', marginBottom: '0.75rem' }}>
            Bereit, deinen Duft zu finden?
          </h2>
          <p style={{ color: '#6b5344', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            In wenigen Minuten weisst du, welcher Duft wirklich zu dir passt.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link
              href="/quiz"
              style={{
                background: '#d4af37',
                color: '#2a1d12',
                fontWeight: 700,
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '0.9rem',
              }}
            >
              Quiz starten
            </Link>
            <Link
              href="/duft-detektiv"
              style={{
                background: 'transparent',
                color: '#2a1d12',
                fontWeight: 600,
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '0.9rem',
                border: '1px solid rgba(42,29,18,0.2)',
              }}
            >
              Duft-Detektiv ausprobieren
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
