import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/app/Breadcrumb';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export const metadata: Metadata = {
  title: 'Anleitung: Wie wählt man ein Parfum? Schritt für Schritt erklärt',
  description:
    'Lerne, wie du das richtige Parfum für dich wählst: Duftfamilien verstehen, Haltbarkeit beurteilen, dein Budget planen und Fehlkäufe vermeiden.',
  alternates: { canonical: `${SITE_URL}/anleitung` },
  openGraph: {
    title: 'Wie wählt man ein Parfum? | Auressa',
    description: 'Die komplette Anleitung: Von Duftfamilien bis zur richtigen Lagerung.',
    url: `${SITE_URL}/anleitung`,
    type: 'website'
  }
};

export default function AnleitungPage() {
  return (
    <main style={{ backgroundColor: '#faf7f2' }}>
      <Breadcrumb items={[{ label: 'Anleitung', href: '/anleitung' }]} />

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
            Anleitung
          </p>
          <h1 style={{
            fontSize: 'clamp(24px, 6vw, 40px)',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            marginBottom: '1rem',
            lineHeight: 1.15,
            color: '#faf7f2',
          }}>
            Wie wählt man das richtige Parfum?
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(250,247,242,0.7)', margin: 0 }}>
            Schritt für Schritt zum Signature-Duft – für Menschen, die keine Fehlkäufe mehr machen möchten.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '3rem 1.25rem' }}>

        {/* Schritt 1 */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1rem' }}>
            Schritt 1: Lerne die vier Duftfamilien
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728', marginBottom: '1.5rem' }}>
            Alle Düfte lassen sich in vier Kategorien einteilen. Wenn du weisst, welche dir gefällt, wird die Auswahl viel kleiner:
          </p>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {[
              {
                title: '🌸 Floral / Blumig',
                desc: 'Klassisch, elegant, zeitlos. Für Menschen, die die Schönheit von Blumen lieben. Beispiel: Rose, Veilchen, Gardenie.'
              },
              {
                title: '🍫 Gourmand / Süss',
                desc: 'Warm, verführerisch, angenehm. Für Menschen, die süsse Noten mögen. Beispiel: Vanille, Karamell, Schokolade.'
              },
              {
                title: '🌲 Woody / Holzig',
                desc: 'Intensiv, maskulin, elegant. Für einen starken Eindruck. Beispiel: Zedernholz, Sandelholz, Oud.'
              },
              {
                title: '❄️ Fresh / Frisch',
                desc: 'Leicht, sportlich, modern. Für den Alltag und Büro. Beispiel: Zitrus, Bergamotte, Aquatisch.'
              }
            ].map((family) => (
              <div key={family.title} style={{
                background: '#fff',
                border: '1px solid rgba(212,175,55,0.2)',
                borderRadius: '12px',
                padding: '1.25rem',
              }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#2a1d12', marginBottom: '0.5rem', marginTop: 0 }}>
                  {family.title}
                </h3>
                <p style={{ fontSize: '0.95rem', color: '#6b5344', lineHeight: 1.6, margin: 0 }}>
                  {family.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Schritt 2 */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1rem' }}>
            Schritt 2: Teste in einem Geschäft – oder nutze unseren Quiz
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728' }}>
            Wenn möglich, teste den Duft an deiner Haut. Alle Haut ist unterschiedlich – ein Duft kann bei dir ganz anders riechen als bei der Verkäuferin. Sprüh ein wenig auf dein Handgelenk, warte ca. 15–30 Minuten (bis die Top-Noten verflogen sind), und rieche dann nochmal. Hier entsteht die echte Duftsignatur.
          </p>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728', marginTop: '1rem' }}>
            Keine Zeit? Nutze unser <Link href="/quiz" style={{ color: '#d4af37', fontWeight: 600, textDecoration: 'none' }}>Duft-Quiz</Link> – es berücksichtigt Duftfamilie, Budget, Anlass und persönliche Vorlieben.
          </p>
        </section>

        {/* Schritt 3 */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1rem' }}>
            Schritt 3: Achte auf Ausstrahlung (Sillage) und Haltbarkeit
          </h2>
          <div style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.03))', borderRadius: '12px', padding: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#2a1d12', marginBottom: '0.5rem' }}>
                📍 Sillage (Projektion): Wie weit trägt der Duft?
              </p>
              <p style={{ fontSize: '0.95rem', color: '#4a3728', lineHeight: 1.6, margin: 0 }}>
                1–4: Hautnah, nur du selbst riechst ihn. 5–7: Moderat, Leute in deiner Nähe riechen ihn. 8–10: Stark, dein Duft füllt den Raum. Für Büro brauchst du eher 4–6, für Parties kannst du auch 8–10 nehmen.
              </p>
            </div>
            <div>
              <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#2a1d12', marginBottom: '0.5rem' }}>
                ⏱️ Haltbarkeit: Wie lange hält der Duft?
              </p>
              <p style={{ fontSize: '0.95rem', color: '#4a3728', lineHeight: 1.6, margin: 0 }}>
                1–4h: Kurz (z. B. Eau de Cologne). 5–8h: Mittel (Eau de Toilette). 8–12h+: Lang (Eau de Parfum). Investier mehr in einen langlebigen Duft – am Ende sparst du.
              </p>
            </div>
          </div>
        </section>

        {/* Schritt 4 */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1rem' }}>
            Schritt 4: Wähle dein Budget weise
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728', marginBottom: '1.5rem' }}>
            Nicht immer heisst teuer = besser. Hier eine realistische Übersicht:
          </p>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {[
              { range: 'CHF 20–50', title: 'Budget-Dupes', desc: 'Marken wie Armaf, Lattafa, Zara. Überraschend gut für den Preis, aber kürzere Haltbarkeit.' },
              { range: 'CHF 50–100', title: 'Mid-Range', desc: 'Calvin Klein, Hugo Boss, Lancôme. Solides Preis-Leistungs-Verhältnis, gute Haltbarkeit.' },
              { range: 'CHF 100–150', title: 'Premium', desc: 'Chloé, Diptyque, Heeley. Hochwertige Inhaltsstoffe, anspruchsvolle Kompositionen.' },
              { range: 'CHF 150+', title: 'Luxus', desc: 'Tom Ford, Creed, Roja. Für echte Fans – lohnt sich nur, wenn du den Duft wirklich liebst.' }
            ].map((budget) => (
              <div key={budget.range} style={{ display: 'flex', gap: '1rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(212,175,55,0.1)' }}>
                <div style={{
                  flexShrink: 0,
                  minWidth: '90px',
                  fontWeight: 700,
                  color: '#d4af37',
                  fontSize: '0.9rem'
                }}>
                  {budget.range}
                </div>
                <div>
                  <p style={{ fontWeight: 600, color: '#2a1d12', marginBottom: '0.25rem', margin: 0 }}>
                    {budget.title}
                  </p>
                  <p style={{ fontSize: '0.9rem', color: '#6b5344', margin: 0 }}>
                    {budget.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Schritt 5 */}
        <section style={{ marginBottom: '3rem', background: 'linear-gradient(135deg, #2a1d12 0%, #3d2b1a 100%)', borderRadius: '16px', padding: '2rem 1.5rem', color: '#faf7f2' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.25rem', marginTop: 0 }}>
            ⚠️ Häufige Anfängerfehler
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              'Sich sofort in den Top-Noten verlieben – die verfliegen oft schon nach ca. 15–30 Minuten!',
              'Zu viel auftragen – weniger ist mehr. Ein bis zwei Sprühstösse reichen.',
              'Den Duft aufs Klopapier sprühen – sprüh ihn auf deine Haut!',
              'Mehrere Düfte hintereinander testen – warte zwischen den Tests 5–10 Min.',
              'Einen teuren Duft zu Hause nicht testen dürfen (online kaufen) – zu riskant.',
              'Einen Duft nach einem Trend kaufen – dein Geschmack ist wichtiger.'
            ].map((error, i) => (
              <li key={i} style={{ marginBottom: '0.75rem', paddingLeft: '1.75rem', position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: '#d4af37', fontWeight: 700 }}>→</span>
                {error}
              </li>
            ))}
          </ul>
        </section>

        {/* Schritt 6 */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1rem' }}>
            Schritt 6: Lagerung – damit dein Duft lange hält
          </h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {[
              { emoji: '🌡️', title: 'Kühle Lagerung', text: 'Dunkel und kühl (15–20°C). Nicht im Badezimmer – Dampf und Hitze schaden!' },
              { emoji: '🌞', title: 'Weg vom Licht', text: 'UV-Strahlung baut die Duftmoleküle ab. Lagern im Original-Karton oder dunkel.' },
              { emoji: '💧', title: 'Trocken halten', text: 'Feuchtigkeit verändert die Zusammensetzung. Nicht neben Wasser lagern.' },
              { emoji: '⏰', title: 'Geduld', text: 'Korrekt gelagert hält ein Duft 3–5 Jahre. Manche Qualitäten verbessern sich sogar!' }
            ].map((tip) => (
              <div key={tip.title} style={{
                background: '#fff',
                border: '1px solid rgba(212,175,55,0.2)',
                borderRadius: '12px',
                padding: '1.25rem',
                display: 'flex',
                gap: '1rem'
              }}>
                <div style={{ fontSize: '1.5rem' }}>{tip.emoji}</div>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, color: '#2a1d12', marginBottom: '0.25rem', marginTop: 0 }}>
                    {tip.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#6b5344', margin: 0 }}>
                    {tip.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{ textAlign: 'center', paddingTop: '2rem', borderTop: '1px solid rgba(212,175,55,0.2)' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1rem' }}>
            Bereit, deinen Signature-Duft zu finden?
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728', marginBottom: '1.5rem' }}>
            Nutze unser Quiz oder durchstöbere unseren kuratierten Duft-Katalog.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/quiz"
              style={{
                display: 'inline-block',
                background: '#d4af37',
                color: '#2a1d12',
                fontWeight: 700,
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '0.9rem',
                letterSpacing: '0.04em'
              }}
            >
              Quiz starten
            </Link>
            <Link
              href="/duefte"
              style={{
                display: 'inline-block',
                background: 'transparent',
                color: '#2a1d12',
                fontWeight: 600,
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                border: '2px solid #d4af37',
                textDecoration: 'none',
                fontSize: '0.9rem',
                letterSpacing: '0.04em'
              }}
            >
              Katalog durchsuchen
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
