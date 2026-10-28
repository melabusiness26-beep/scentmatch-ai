import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/app/Breadcrumb';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export const metadata: Metadata = {
  title: 'Wie Auressa funktioniert – Die Matching-Philosophie | Auressa',
  description:
    'Verstehe die Logik hinter Auressa: Wie das Quiz deine Vorlieben erkennt und wie der Match-Score berechnet wird – ohne Zauberei, mit echter Mathematik.',
  alternates: { canonical: `${SITE_URL}/wie-auressa-funktioniert` },
  openGraph: {
    title: 'Wie Auressa funktioniert | Auressa',
    description: 'Die Matching-Algorithmen und Philosophie hinter Auressa, einfach erklärt.',
    url: `${SITE_URL}/wie-auressa-funktioniert`,
    type: 'website',
  },
};

export default function WieAuressaFunktioniert() {
  return (
    <main style={{ backgroundColor: '#faf7f2' }}>
      <Breadcrumb items={[{ label: 'Wie Auressa funktioniert', href: '/wie-auressa-funktioniert' }]} />

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
            Wie es funktioniert
          </p>
          <h1 style={{
            fontSize: 'clamp(24px, 6vw, 40px)',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            marginBottom: '1rem',
            lineHeight: 1.15,
            color: '#faf7f2',
          }}>
            Die Auressa-Matching-Logik
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(250,247,242,0.72)', margin: 0 }}>
            Das Quiz, die Berechnung, die Magie – alles erklärt.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '3rem 1.25rem' }}>

        {/* The Philosophy */}
        <section style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Die Grundidee
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.25rem' }}>
            Was Auressa anders macht
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728', marginBottom: '1rem' }}>
            Viele Duft-Websites sind Listen: 200 Düfte, alle mit 5-Stern-Ratings von Nutzern.
            Das ist nicht hilfreich, weil 5 Sterne für einen Menschen Müll sein können und für einen anderen Perfektion.
            Ein Duft, der mir gefällt, gefällt dir nicht automatisch.
          </p>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728', marginBottom: '1rem' }}>
            Auressa macht etwas anderes: Statt dir die 200 besten Düfte zu zeigen, zeige ich dir
            die Düfte, die zu <strong>deinen</strong> Vorlieben passen – basierend auf dem, was du im Quiz sagst.
            Das ist viel hilfreicher.
          </p>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728' }}>
            Das Quiz ist nicht Psychologie – es ist mathematisch. Ich sammle Daten über deine Vorlieben
            und gleiche sie gegen hunderte von Düften ab. Das funktioniert überraschend gut.
          </p>
        </section>

        {/* The Quiz */}
        <section style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Das Quiz
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.25rem' }}>
            10 Fragen, 10 Kriterien
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728', marginBottom: '1.5rem' }}>
            Das Quiz sammelt 10 Angaben über deine Duft-Vorlieben:
          </p>
          <div style={{
            background: '#fff',
            border: '1px solid rgba(212,175,55,0.2)',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '1.5rem',
          }}>
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.9rem', color: '#d4af37', fontWeight: 700, marginBottom: '0.3rem' }}>
                1. Geschlecht (Damen, Herren, Unisex)
              </p>
              <p style={{ fontSize: '0.9rem', color: '#6b5344', lineHeight: 1.6, margin: 0 }}>
                So filtern wir nicht-relevante Düfte heraus. Ein Herren-Duft ist nicht schlecht, wenn du Damen suchst – es ist nur nicht dein Fokus.
              </p>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.9rem', color: '#d4af37', fontWeight: 700, marginBottom: '0.3rem' }}>
                2. Anker-Duft (optional – ein Duft, den du magst)
              </p>
              <p style={{ fontSize: '0.9rem', color: '#6b5344', lineHeight: 1.6, margin: 0 }}>
                Das ist mächtig: Wenn du einen Duft nennst, den du liebst, können wir Düfte mit ähnlichen Noten oder Familien gewichten.
              </p>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.9rem', color: '#d4af37', fontWeight: 700, marginBottom: '0.3rem' }}>
                3. Duftfamilie (Clean, Gourmand, Woody, Floral)
              </p>
              <p style={{ fontSize: '0.9rem', color: '#6b5344', lineHeight: 1.6, margin: 0 }}>
                Du wählst deine Lieblingsrichtung. Sie ist der wichtigste Faktor für deinen Match.
              </p>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.9rem', color: '#d4af37', fontWeight: 700, marginBottom: '0.3rem' }}>
                4. Lieblingsnote
              </p>
              <p style={{ fontSize: '0.9rem', color: '#6b5344', lineHeight: 1.6, margin: 0 }}>
                Düfte mit dieser Note bekommen einen Bonus im Ranking. Wenn du „Vanille" sagst, gewinnen Vanille-Düfte.
              </p>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.9rem', color: '#d4af37', fontWeight: 700, marginBottom: '0.3rem' }}>
                5. No-Go-Note
              </p>
              <p style={{ fontSize: '0.9rem', color: '#6b5344', lineHeight: 1.6, margin: 0 }}>
                Düfte mit dieser Note werden nach unten gewichtet. Wenn du „Moschus" nicht magst, wird das respektiert.
              </p>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.9rem', color: '#d4af37', fontWeight: 700, marginBottom: '0.3rem' }}>
                6. Anlass (Alltag, Date, Abend)
              </p>
              <p style={{ fontSize: '0.9rem', color: '#6b5344', lineHeight: 1.6, margin: 0 }}>
                Düfte werden je nach Intensität/Charakter bewertet. Ein Abend-Duft ist nicht für Büro gemacht.
              </p>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.9rem', color: '#d4af37', fontWeight: 700, marginBottom: '0.3rem' }}>
                7. Jahreszeit
              </p>
              <p style={{ fontSize: '0.9rem', color: '#6b5344', lineHeight: 1.6, margin: 0 }}>
                Sommerdüfte im Winter funktionieren anders. Ein schwerer Oud im Juli ist erdrückend.
              </p>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.9rem', color: '#d4af37', fontWeight: 700, marginBottom: '0.3rem' }}>
                8. Ausstrahlung (Sillage)
              </p>
              <p style={{ fontSize: '0.9rem', color: '#6b5344', lineHeight: 1.6, margin: 0 }}>
                Wie weit soll der Duft dich umgeben? Hautnah oder im ganzen Raum?
              </p>
            </div>
            <div>
              <p style={{ fontSize: '0.9rem', color: '#d4af37', fontWeight: 700, marginBottom: '0.3rem' }}>
                9. Budget
              </p>
              <p style={{ fontSize: '0.9rem', color: '#6b5344', lineHeight: 1.6, margin: 0 }}>
                Keine Verschwendung auf Düfte, die du dir nicht leisten möchtest.
              </p>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.9rem', color: '#d4af37', fontWeight: 700, marginBottom: '0.3rem' }}>
                10. Haltbarkeit
              </p>
              <p style={{ fontSize: '0.9rem', color: '#6b5344', lineHeight: 1.6, margin: 0 }}>
                Ein paar Stunden, solide durch den Tag oder möglichst lange? Das fliesst leicht in deine Empfehlung ein.
              </p>
            </div>
          </div>
        </section>

        {/* The Match Score */}
        <section style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Der Match-Score
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.25rem' }}>
            Wie wir berechnen, wie gut ein Duft zu dir passt
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728', marginBottom: '1.5rem' }}>
            Der Match-Score ist eine Zahl von 0–100, die anzeigt, wie gut ein bestimmter Duft zu deinen Quiz-Antworten passt.
            Das ist eine mathematische Berechnung, nicht subjektiv. Hier die Gewichtung:
          </p>
          <div style={{
            background: 'linear-gradient(135deg, #2a1d12 0%, #3d2b1a 100%)',
            borderRadius: '16px',
            padding: '2rem 1.5rem',
            color: '#faf7f2',
            marginBottom: '1.5rem',
          }}>
            <div style={{ marginBottom: '1.2rem' }}>
              <p style={{ fontSize: '0.9rem', color: '#d4af37', fontWeight: 700, marginBottom: '0.3rem' }}>
                Duftfamilie: 30%
              </p>
              <p style={{ fontSize: '0.9rem', color: 'rgba(250,247,242,0.8)', lineHeight: 1.6, margin: 0 }}>
                Das ist der Hauptfaktor. Wenn der Duft in deiner Lieblings-Familie ist, bekommen wir das richtig.
              </p>
            </div>
            <div style={{ marginBottom: '1.2rem' }}>
              <p style={{ fontSize: '0.9rem', color: '#d4af37', fontWeight: 700, marginBottom: '0.3rem' }}>
                Lieblingsnote: 20%
              </p>
              <p style={{ fontSize: '0.9rem', color: 'rgba(250,247,242,0.8)', lineHeight: 1.6, margin: 0 }}>
                Wenn deine Lieblingsnote drin ist: +20 Punkte. Wenn nicht, aber eine ähnliche Note: +4 Punkte.
              </p>
            </div>
            <div style={{ marginBottom: '1.2rem' }}>
              <p style={{ fontSize: '0.9rem', color: '#d4af37', fontWeight: 700, marginBottom: '0.3rem' }}>
                Budget: 15%
              </p>
              <p style={{ fontSize: '0.9rem', color: 'rgba(250,247,242,0.8)', lineHeight: 1.6, margin: 0 }}>
                Passt der Preis? Im Budget? +15. Bis +30%: +7. Über Budget: 0.
              </p>
            </div>
            <div style={{ marginBottom: '1.2rem' }}>
              <p style={{ fontSize: '0.9rem', color: '#d4af37', fontWeight: 700, marginBottom: '0.3rem' }}>
                Anlass: 13%
              </p>
              <p style={{ fontSize: '0.9rem', color: 'rgba(250,247,242,0.8)', lineHeight: 1.6, margin: 0 }}>
                Ist der Duft für deinen Anlass passend? (Alltag = dezent, Abend = intensiv).
              </p>
            </div>
            <div style={{ marginBottom: '1.2rem' }}>
              <p style={{ fontSize: '0.9rem', color: '#d4af37', fontWeight: 700, marginBottom: '0.3rem' }}>
                Jahreszeit: 12%
              </p>
              <p style={{ fontSize: '0.9rem', color: 'rgba(250,247,242,0.8)', lineHeight: 1.6, margin: 0 }}>
                Sommer und Winter Düfte – das System kennt da Unterschiede.
              </p>
            </div>
            <div style={{ marginBottom: '1.2rem' }}>
              <p style={{ fontSize: '0.9rem', color: '#d4af37', fontWeight: 700, marginBottom: '0.3rem' }}>
                Sillage/Intensität: 10%
              </p>
              <p style={{ fontSize: '0.9rem', color: 'rgba(250,247,242,0.8)', lineHeight: 1.6, margin: 0 }}>
                Möchtest du dezent oder präsent? Das wird gewichtet.
              </p>
            </div>
            <div>
              <p style={{ fontSize: '0.9rem', color: '#d4af37', fontWeight: 700, marginBottom: '0.3rem' }}>
                No-Go-Note: −25
              </p>
              <p style={{ fontSize: '0.9rem', color: 'rgba(250,247,242,0.8)', lineHeight: 1.6, margin: 0 }}>
                Wenn der Duft deine No-Go-Note enthält: grosser Abzug.
              </p>
            </div>
          </div>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728' }}>
            <strong>Wichtig:</strong> Das ist mathematisch – kein Zauberei, kein KI-Voodoo.
            Die Ergebnisse funktionieren überraschend gut, weil diese Faktoren echte Geschmack-Prädiktoren sind.
          </p>
        </section>

        {/* Ranking */}
        <section style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Das Ranking
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.25rem' }}>
            Warum manche Düfte höher stehen als andere
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728', marginBottom: '1rem' }}>
            Nach dem Quiz berechnen wir für <strong>jeden</strong> Duft in unserem Katalog einen Match-Score.
            Die Düfte werden dann absteigend von höchster zu niedrigster Match sortiert.
            Der Duft ganz oben ist nicht automatisch „der beste Duft der Welt" – er ist der beste für <strong>dich</strong>.
          </p>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728', marginBottom: '1rem' }}>
            Die Top-Matches sind oft Düfte, die mit allen deinen Antworten übereinstimmen.
            Je tiefer du schaust, desto mehr „aber"-Faktoren spielen rein: nicht 100% deine Familie,
            oder etwas teurer, oder für einen anderen Anlass. Das bedeutet nicht, dass sie schlecht sind –
            nur dass sie weniger perfekt zu deinen Antworten passen.
          </p>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728' }}>
            Manchmal ist der 8. Platz besser für dich als der 1., weil es etwas gibt, das dir besser gefällt
            (eleganter Preis, berühmte Marke, Duft, den du bereits kennst). Das Quiz ist eine Richtlinie, nicht ein Gesetz.
          </p>
        </section>

        {/* Why It Works */}
        <section style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Warum es funktioniert
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.25rem' }}>
            Die Wissenschaft hinter dem Match
          </h2>
          <ul style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728', margin: 0, paddingLeft: '1.5rem' }}>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>Familie ist der stärkste Prädiktor.</strong> Ein Mensch, der „Woody" liebt, wird ein Floral-Duft selten lieben. Das ist psychologisch validiert.
            </li>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>Lieblingsnoten funktionieren.</strong> Wenn dir Vanille nicht gefällt, brauchst du keinen reinen Vanille-Duft.
            </li>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>Kontext ist entscheidend.</strong> Ein Duft im Büro vs. beim Date funktioniert völlig anders.
            </li>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>Die Gewichte sind empirisch.</strong> Diese Prozentsätze (30% Familie, 20% Noten) kommen nicht aus der Luft – das sind reale Beobachtungen darüber, was Geschmack vorhersagt.
            </li>
          </ul>
        </section>

        {/* CTA */}
        <section style={{
          background: 'linear-gradient(135deg, #2a1d12 0%, #3d2b1a 100%)',
          borderRadius: '16px',
          padding: '2rem 1.5rem',
          textAlign: 'center',
          color: '#faf7f2',
        }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Bereit?
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.75rem' }}>
            Mach das Quiz und finde deinen Match
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'rgba(250,247,242,0.8)', marginBottom: '1.5rem' }}>
            10 Fragen, 2 Minuten. Dein persönlicher Match wartet.
          </p>
          <Link href="/quiz" style={{
            display: 'inline-block',
            background: '#d4af37',
            color: '#2a1d12',
            fontWeight: 700,
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            textDecoration: 'none',
            fontSize: '0.9rem',
          }}>Quiz starten</Link>
        </section>

        {/* Breadcrumb */}
        <nav aria-label="Brotkrümel" style={{ marginTop: '2.5rem', fontSize: '0.8rem', color: '#6b5344' }}>
          <Link href="/" style={{ color: '#6b5344', textDecoration: 'none' }}>Start</Link>
          <span style={{ margin: '0 0.35rem' }}>›</span>
          <span>Wie Auressa funktioniert</span>
        </nav>

      </div>
    </main>
  );
}
