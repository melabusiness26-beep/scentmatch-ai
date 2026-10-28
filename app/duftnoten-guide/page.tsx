import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/app/Breadcrumb';

export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export const metadata: Metadata = {
  title: 'Duftnoten verstehen: Top, Heart und Base-Notes erklärt | Auressa',
  description:
    'Lerne, wie Duftnoten funktionieren: Was sind Top-Noten, Heart-Noten und Base-Noten? Wie du Duftkombinationen verstehst und deine Duft-Vorlieben findest.',
  alternates: { canonical: `${SITE_URL}/duftnoten-guide` },
  openGraph: {
    title: 'Duftnoten: Top, Heart & Base-Notes | Auressa',
    description: 'Verstehe die Pyramide von Duftnoten und warum ein Duft sich über den Tag verändert.',
    type: 'website',
    url: `${SITE_URL}/duftnoten-guide`,
  },
};

export default function FragranceNotesGuidePage() {
  return (
    <main style={{ backgroundColor: '#faf7f2' }}>
      <Breadcrumb items={[{ label: 'Duftnoten verstehen', href: '/duftnoten-guide' }]} />

      {/* Hero */}
      <section style={{
        backgroundImage: 'linear-gradient(rgba(26,18,9,0.88), rgba(26,18,9,0.88)), url(/hero-auressa-2.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '280px',
        padding: '3rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{ textAlign: 'center', maxWidth: '700px' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
            Grundlagen & Wissen
          </p>
          <h1 style={{
            fontSize: 'clamp(28px, 6vw, 48px)',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            marginBottom: '1.5rem',
            lineHeight: 1.15,
            color: '#faf7f2',
          }}>
            Duftnoten verstehen – Die Pyramide des Dufts
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(250,247,242,0.8)', margin: 0 }}>
            Warum riecht dein Duft in der ersten Minute anders als nach einer Stunde?
            Lerne die Wissenschaft der Duftnoten – und verstehe deinen Duft endlich.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 1.25rem' }}>

        {/* Intro */}
        <section style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4a3020', marginBottom: '1.5rem' }}>
            Jeder Duft besteht aus <strong>drei Ebenen von Noten</strong>, die sich im Laufe des Tages offenbaren.
            Dies nennt sich die <strong>Duftnoten-Pyramide</strong>. Wenn du verstehst, wie diese Noten funktionieren,
            wirst du nicht nur deinen Duft besser geniessen – du wirst auch WARUM ein Duft an dir riecht, wie er riecht.
          </p>
        </section>

        {/* Die Pyramide */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.8rem',
            fontWeight: 700,
            color: '#d4af37',
            marginBottom: '1.5rem',
            paddingBottom: '0.5rem',
            borderBottom: '2px solid rgba(212,175,55,0.3)',
          }}>
            🔺 Die Duftnoten-Pyramide
          </h2>
          <div style={{
            background: '#fff',
            border: '2px solid rgba(212,175,55,0.2)',
            borderRadius: '16px',
            padding: '2rem',
            marginBottom: '2rem',
          }}>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}>
              {/* Top Notes */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(212,175,55,0.15), rgba(212,175,55,0.08))',
                border: '2px solid rgba(212,175,55,0.3)',
                borderRadius: '12px',
                padding: '1.5rem',
                textAlign: 'center',
              }}>
                <h3 style={{ color: '#d4af37', fontWeight: 700, margin: '0 0 0.5rem 0', fontSize: '1.3rem' }}>
                  ✨ TOP-NOTEN (Kopfnoten)
                </h3>
                <p style={{ color: '#8a6a20', fontWeight: 600, margin: '0 0 1rem 0', fontSize: '0.95rem' }}>
                  Dauer: 5–15 Minuten | Intensität: Sehr frisch & lebhaft
                </p>
                <p style={{ color: '#6b5344', margin: 0, lineHeight: 1.6, fontSize: '0.95rem' }}>
                  Die ersten Eindrücke, die deine Nase nach dem Auftragen riecht. Top-Noten sind flüchtig und verdampfen schnell – aber sie sind der „Hook", der dich sofort anzieht oder abstosst.
                </p>
              </div>

              {/* Heart Notes */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(212,175,55,0.2), rgba(212,175,55,0.1))',
                border: '2px solid rgba(212,175,55,0.35)',
                borderRadius: '12px',
                padding: '1.5rem',
                textAlign: 'center',
              }}>
                <h3 style={{ color: '#d4af37', fontWeight: 700, margin: '0 0 0.5rem 0', fontSize: '1.3rem' }}>
                  💖 HEART-NOTEN (Herznoten)
                </h3>
                <p style={{ color: '#8a6a20', fontWeight: 600, margin: '0 0 1rem 0', fontSize: '0.95rem' }}>
                  Dauer: 30 Minuten–4 Stunden | Intensität: Die „Persönlichkeit" des Dufts
                </p>
                <p style={{ color: '#6b5344', margin: 0, lineHeight: 1.6, fontSize: '0.95rem' }}>
                  Das Herz eines Dufts. Hier entwickelt sich dein Lieblingsduft zu seiner vollständigen Persönlichkeit. Die Heart-Noten sind das, wofür du den Duft wirklich kaufst – und sie halten am längsten.
                </p>
              </div>

              {/* Base Notes */}
              <div style={{
                background: 'linear-gradient(135deg, rgba(212,175,55,0.25), rgba(212,175,55,0.12))',
                border: '2px solid rgba(212,175,55,0.4)',
                borderRadius: '12px',
                padding: '1.5rem',
                textAlign: 'center',
              }}>
                <h3 style={{ color: '#d4af37', fontWeight: 700, margin: '0 0 0.5rem 0', fontSize: '1.3rem' }}>
                  🌳 BASE-NOTEN (Basisnoten)
                </h3>
                <p style={{ color: '#8a6a20', fontWeight: 600, margin: '0 0 1rem 0', fontSize: '0.95rem' }}>
                  Dauer: 3–24+ Stunden | Intensität: Tief, warm, persistent
                </p>
                <p style={{ color: '#6b5344', margin: 0, lineHeight: 1.6, fontSize: '0.95rem' }}>
                  Das Fundament deines Dufts – warm, tief und langlebig. Base-Noten sind schwere, langsam verdampfende Aromen wie Holz, Moschus und Amber. Sie halten den ganzen Tag und bestimmen die Dauer.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Beispiel-Reise */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.8rem',
            fontWeight: 700,
            color: '#d4af37',
            marginBottom: '1.5rem',
            paddingBottom: '0.5rem',
            borderBottom: '2px solid rgba(212,175,55,0.3)',
          }}>
            ⏰ Ein Beispiel: Die 12-Stunden-Reise eines Dufts
          </h2>
          <div style={{
            background: '#fff',
            border: '2px solid rgba(212,175,55,0.15)',
            borderRadius: '16px',
            padding: '2rem',
            display: 'grid',
            gap: '1.5rem',
          }}>
            <p style={{ fontSize: '0.95rem', color: '#6b5344', margin: 0, lineHeight: 1.6, textAlign: 'center', fontStyle: 'italic' }}>
              Schauen wir uns an, wie ein Duft über einen Tag verläuft (Beispiel: Black Opium von Yves Saint Laurent).
            </p>

            {[
              {
                time: '8:00 AM - Gerade aufgetragen',
                notes: 'Top-Noten',
                desc: 'Coffee & Almond – frisch, belebend, leicht süss. Das erste, was du und andere riechen.',
                intensity: '⭐⭐⭐⭐⭐'
              },
              {
                time: '8:15 AM - Nach 15 Minuten',
                notes: 'Top-Noten verabschieden sich',
                desc: 'Der Coffee-Punch verschwindet. Der süsse, warme Kern tritt hervor.',
                intensity: '⭐⭐⭐⭐'
              },
              {
                time: '8:30 AM–1:00 PM - 30 Min – 5 Stunden',
                notes: 'Heart-Noten (die beste Stunde)',
                desc: 'Vanilla, Licorice & Bourbon – warm, süss, sinnlich. Das ist der Peak – warum du den Duft liebst.',
                intensity: '⭐⭐⭐⭐⭐'
              },
              {
                time: '1:00 PM–4:00 PM - 5–8 Stunden',
                notes: 'Heart-Noten langsam verdunkelnd',
                desc: 'Die Süsse wird subtiler. Holz- und Moschus-Noten treten auf. Der Duft wird älter, erwachsener.',
                intensity: '⭐⭐⭐⭐'
              },
              {
                time: '4:00 PM–8:00 PM - 8–12 Stunden',
                notes: 'Base-Noten dominieren',
                desc: 'Cedar & Tonka Bean – warm, dunkel, würzig. Ein unterschwelliger Duft, aber deutlich spürbar.',
                intensity: '⭐⭐⭐'
              },
              {
                time: '8:00 PM onwards',
                notes: 'Letzte Reste der Base-Noten',
                desc: 'Ein warmer, pudrig-holziger Hauch. Andere riechen ihn noch, du selbst nicht mehr.',
                intensity: '⭐⭐'
              }
            ].map((stage, idx) => (
              <div
                key={idx}
                style={{
                  background: 'linear-gradient(135deg, rgba(212,175,55,0.06), rgba(212,175,55,0.03))',
                  border: '1px solid rgba(212,175,55,0.1)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  borderLeft: '4px solid #d4af37',
                }}
              >
                <h4 style={{ color: '#2a1d12', fontWeight: 700, margin: '0 0 0.25rem 0', fontSize: '1rem' }}>
                  {stage.time}
                </h4>
                <p style={{ color: '#8a6a20', fontWeight: 600, margin: '0 0 0.5rem 0', fontSize: '0.9rem' }}>
                  {stage.notes}
                </p>
                <p style={{ color: '#6b5344', margin: '0 0 0.5rem 0', lineHeight: 1.5, fontSize: '0.9rem' }}>
                  {stage.desc}
                </p>
                <p style={{ color: '#8a6a20', fontWeight: 600, margin: 0, fontSize: '0.85rem' }}>
                  Intensität: {stage.intensity}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Wichtige Duft-Familien */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.8rem',
            fontWeight: 700,
            color: '#d4af37',
            marginBottom: '1.5rem',
            paddingBottom: '0.5rem',
            borderBottom: '2px solid rgba(212,175,55,0.3)',
          }}>
            🎨 Häufige Duft-Noten erklärt
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {[
              {
                category: 'TOP-NOTEN (Frische)',
                examples: ['Bergamotte', 'Zitrone', 'Grapefruit', 'Minz', 'Ginger'],
                desc: 'Frisch, lebhaft, zitrusartig. Geben dem Duft einen schnellen Kick. Verdunsten in Minuten.'
              },
              {
                category: 'HEART-NOTEN (Blüten)',
                examples: ['Rose', 'Jasmin', 'Gardenie', 'Nelke', 'Veilchen'],
                desc: 'Blumig, elegant, weiblich/neutral. Der Kern des Dufts. Halten 1–4 Stunden.'
              },
              {
                category: 'HEART-NOTEN (Gewürz)',
                examples: ['Zimt', 'Vanille', 'Amber', 'Karamell', 'Kakao'],
                desc: 'Warm, süss, würzig. Geben Weichheit und Wärme. Halten lange.'
              },
              {
                category: 'BASE-NOTEN (Holz)',
                examples: ['Sandelholz', 'Zedernholz', 'Oud', 'Vetiver', 'Moschus'],
                desc: 'Tief, warm, natürlich. Das Fundament. Halten 8+ Stunden.'
              },
              {
                category: 'BASE-NOTEN (Kräuter)',
                examples: ['Labdanum', 'Benzoe', 'Tonka', 'Patchouli', 'Räucherwerk'],
                desc: 'Dunkel, würzig, harzig. Verleihen Tiefe und Langlebigkeit.'
              },
              {
                category: 'ALLROUNDER',
                examples: ['Neroli', 'Linalool', 'Aldehyde', 'Duftalkohole'],
                desc: 'Unterstützen andere Noten. Erzeugen Heligkeit und Abgang. Je nach Kontext Top, Heart oder Base.'
              }
            ].map((family, idx) => (
              <div
                key={idx}
                style={{
                  background: '#fff',
                  border: '1px solid rgba(212,175,55,0.2)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                }}
              >
                <h3 style={{ color: '#2a1d12', fontWeight: 700, marginBottom: '0.75rem', fontSize: '1.05rem' }}>
                  {family.category}
                </h3>
                <p style={{ color: '#6b5344', fontSize: '0.9rem', marginBottom: '1rem', lineHeight: 1.5 }}>
                  {family.desc}
                </p>
                <p style={{ fontSize: '0.85rem', color: '#8a6a20', fontWeight: 600, margin: 0 }}>
                  Beispiele: {family.examples.join(', ')}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Wie du Duftnoten für Matching nutzt */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.8rem',
            fontWeight: 700,
            color: '#d4af37',
            marginBottom: '1.5rem',
            paddingBottom: '0.5rem',
            borderBottom: '2px solid rgba(212,175,55,0.3)',
          }}>
            🎯 Nutze Duftnoten, um Düfte zu finden, die dir gefallen
          </h2>
          <div style={{
            background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.04))',
            border: '2px solid rgba(212,175,55,0.2)',
            borderRadius: '16px',
            padding: '2rem',
            display: 'grid',
            gap: '1.5rem',
          }}>
            {[
              {
                question: 'Du magst einen Duft – wie findest du Ähnliches?',
                answer: 'Achte auf die Duftnoten deines Lieblings. Magst du die Kopfnoten (Frische)? Suche andere Düfte mit ähnlichen Top-Noten. Magst du die Wärme (Heart/Base)? Suche nach ähnlichen Holz- oder Gewürz-Basen. Ähnliche Noten = ähnliche Wirkung.'
              },
              {
                question: 'Du kennst deinen liebsten „Duft-Typ", aber nicht den Namen?',
                answer: 'Beschreibe die Noten: „Warme Vanille + Holz" (Heart + Base-fokussiert) oder „Zitrus + Minz" (Top-fokussiert). Duft-Datenbanken wie Auressa erlauben dir, nach Noten zu suchen – das ist schneller als Markennamen zu erraten.'
              },
              {
                question: 'Du möchtest einen Duft, der sich tagsüber verändert?',
                answer: 'Wähle einen Duft mit unterschiedlichen Noten-Schichten. Ein Duft mit starken Top-, Heart- und Base-Noten bietet eine „Reise" über den Tag – nicht monoton. Ideal zum Entdecken: Düfte mit kontrastreichen Noten (z. B. Zitrus-Top + süsser Heart + würziger Base).'
              },
              {
                question: 'Du willst immer den gleichen Duft, ohne Veränderung?',
                answer: 'Suche Düfte, wo alle Ebenen ähnlich sind – z. B. komplett süss (süsse Top + süsse Heart + süsse Base). Oder komplett holzig (bergamotte-Top + waldiger Heart + tiefholziger Base). Konsistenz in den Noten = konsistenter Duft über den Tag.'
              }
            ].map((item, idx) => (
              <div key={idx}>
                <h3 style={{ color: '#2a1d12', fontWeight: 700, marginBottom: '0.75rem', fontSize: '1.05rem' }}>
                  ❓ {item.question}
                </h3>
                <p style={{ fontSize: '0.95rem', color: '#6b5344', margin: 0, lineHeight: 1.6 }}>
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Pro-Tipps */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.8rem',
            fontWeight: 700,
            color: '#d4af37',
            marginBottom: '1.5rem',
            paddingBottom: '0.5rem',
            borderBottom: '2px solid rgba(212,175,55,0.3)',
          }}>
            💡 Professionelle Tipps mit Duftnoten
          </h2>
          <div style={{
            display: 'grid',
            gap: '1.5rem',
          }}>
            {[
              {
                title: 'Der Retouch-Trick',
                tip: 'Nach 3–4 Stunden sprühst du den gleichen Duft erneut. Dies „resettet" die Top-Noten – du riechst die frischen Kopfnoten erneut, ohne aufdringlich zu wirken. Ein kleiner Spray-Rucksack ist Gold wert.'
              },
              {
                title: 'Top-Noten überspringen?',
                tip: 'Manche Düfte haben nicht-grossartige Top-Noten. Tipp: Frag im Geschäft, ob du eine Probe nehmen kannst und diese 15 Min zu Hause probierst – so erlebst du direkt die Heart-Noten und sparst Zeit.'
              },
              {
                title: 'Duftnoten-Jahreszeiten',
                tip: 'Sommer: Top-Noten-fokussiert (frische Kopfnoten, leichte Hearts). Winter: Base-Noten-fokussiert (warme, schwere Basen). So harmoniert dein Duft mit der Jahreszeit.'
              },
              {
                title: 'Die 30-Minuten-Regel',
                tip: 'Kaufe einen Duft NICHT, wenn du ihn direkt im Geschäft riechst. Warte 15–30 Min und rieche ihn erneut. Jetzt hast du die Heart-Noten erlebt – das ist, was zählt.'
              },
              {
                title: 'Noten vergleichen',
                tip: 'Schreib die Duftnoten deiner Top 3 Lieblings-Düfte auf. Findest du ein Muster? Z. B. alle haben Jasmin oder Sandelholz. Das ist dein persönlicher Duft-Fingerabdruck – such danach in neuen Düften.'
              }
            ].map((pro, idx) => (
              <div
                key={idx}
                style={{
                  background: '#fff',
                  border: '1px solid rgba(212,175,55,0.15)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                }}
              >
                <h3 style={{ color: '#2a1d12', fontWeight: 700, marginBottom: '0.5rem', fontSize: '1.05rem' }}>
                  {pro.title}
                </h3>
                <p style={{ fontSize: '0.95rem', color: '#6b5344', margin: 0, lineHeight: 1.6 }}>
                  {pro.tip}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{
          background: 'linear-gradient(135deg, #2a1d12 0%, #3d2b1a 100%)',
          borderRadius: '16px',
          padding: '2rem',
          textAlign: 'center',
          color: '#faf7f2',
          marginTop: '3rem',
        }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
            Mit Noten-Wissen
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 700, color: '#faf7f2', marginBottom: '1rem' }}>
            Finde Düfte, die zu deinen Lieblings-Noten passen
          </h2>
          <p style={{ color: 'rgba(250,247,242,0.75)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            Jetzt, wo du die Duftnoten-Pyramide verstehst, kannst du intelligente Duft-Entscheidungen treffen.
            Nutze dein Wissen – in unserem Quiz oder unserer Datenbank.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/duftnoten" style={{
              background: '#d4af37',
              color: '#2a1d12',
              fontWeight: 700,
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '0.95rem',
              display: 'inline-block',
            }}>Duftnoten durchsuchen</Link>
            <Link href="/quiz" style={{
              background: 'transparent',
              color: '#faf7f2',
              fontWeight: 600,
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '0.95rem',
              border: '1px solid rgba(250,247,242,0.3)',
              display: 'inline-block',
            }}>Quiz starten</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
