import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/app/Breadcrumb';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export const metadata: Metadata = {
  title: 'Haltbarkeit und Sillage: Wie lange hält ein Parfum?',
  description:
    'Haltbarkeit und Ausstrahlung verstehen: Wie lange hält ein Duft, wie weit trägt er, und wie wählst du den richtigen für deine Situation.',
  alternates: { canonical: `${SITE_URL}/duftlaenge` },
  openGraph: {
      images: ['/opengraph-image'],
    title: 'Haltbarkeit und Sillage erklärt | Auressa',
    description: 'Alles über Duft-Haltbarkeit, Projektion und wie du den richtigen Duft für deine Situation wählst.',
    url: `${SITE_URL}/duftlaenge`,
    type: 'website'
  }
};

export default function DuftlaengePage() {
  return (
    <main style={{ backgroundColor: '#faf7f2' }}>
      <Breadcrumb items={[{ label: 'Duftlänge & Sillage', href: '/duftlaenge' }]} />

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
            Wissen
          </p>
          <h1 style={{
            fontSize: 'clamp(24px, 6vw, 40px)',
            fontFamily: "var(--font-display), Georgia, serif",
            fontWeight: 700,
            marginBottom: '1rem',
            lineHeight: 1.15,
            color: '#faf7f2',
          }}>
            Haltbarkeit und Sillage verstehen
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(250,247,242,0.7)', margin: 0 }}>
            Zwei der wichtigsten Faktoren bei der Duft-Wahl – erklärt, bewertet und anwendbar.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '3rem 1.25rem' }}>

        {/* Longevity */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: '1.75rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.5rem' }}>
            ⏱️ Haltbarkeit: Wie lange hält der Duft?
          </h2>

          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728', marginBottom: '1.5rem' }}>
            Die Haltbarkeit ist eine der häufigsten Fragen beim Duftkauf. Es ist frustrierend, wenn ein CHF 100-Duft nach 2 Stunden weg ist. Die Zeiten unten sind grobe Richtwerte: Haut, Wetter, Menge und Zusammensetzung machen viel aus – Basisnoten wie Hölzer, Harze oder Moschus halten am längsten. Die Konzentration allein sagt nicht alles.
          </p>

          {/* Longevity Scale */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#2a1d12', marginBottom: '1rem' }}>
              Die Haltbarkeits-Skala (0–10)
            </h3>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {[
                { range: 'unter ca. 2 h', score: '1–2', title: 'Sehr kurz', desc: 'Typisch für viele Eau de Cologne (ca. 2–5 % Duftöl). Angenehm für zwischendurch, verfliegt aber schnell.' },
                { range: 'ca. 2–4 h', score: '3–4', title: 'Kurz', desc: 'Häufig bei leichten Eau de Toilette (ca. 5–15 % Duftöl). Für einen ganzen Tag musst du oft nachsprühen.' },
                { range: 'ca. 4–6 h', score: '5–6', title: 'Mittel', desc: 'Hier liegen viele Eau de Toilette und Eau de Parfum (ca. 15–20 % Duftöl). Reicht oft für einen halben bis ganzen Arbeitstag.' },
                { range: 'ca. 6–10 h', score: '7–8', title: 'Lang', desc: 'Häufig bei intensiven Eau de Parfum und Extrait/Parfum (ca. 20–30 % Duftöl). Morgens aufgetragen, oft am Abend noch wahrnehmbar.' },
                { range: 'über ca. 10 h', score: '9–10', title: 'Sehr lang', desc: 'Sehr ausdauernde Düfte, oft mit schweren Basisnoten wie Harzen, Hölzern oder Amber. Sparsam dosieren, sonst wirkt es schnell erdrückend.' }
              ].map((item) => (
                <div key={item.title} style={{
                  background: '#fff',
                  border: '1px solid rgba(212,175,55,0.2)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr',
                  gap: '1rem',
                  alignItems: 'start'
                }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #d4af37, #c9a227)',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    textAlign: 'center',
                    minWidth: '80px',
                    fontWeight: 700,
                    fontSize: '0.9rem'
                  }}>
                    {item.score}
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, color: '#2a1d12', marginBottom: '0.25rem', margin: 0 }}>
                      {item.title} ({item.range})
                    </p>
                    <p style={{ fontSize: '0.9rem', color: '#6b5344', margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728', background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.03))', borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem' }}>
            💡 <strong>Praktischer Tipp:</strong> Für Büro und Alltag: 5–7. Für Abends/Parties: 6–8. Für Reisen/Tasche: 7+.
          </p>
        </section>

        {/* Sillage */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: '1.75rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.5rem' }}>
            👃 Sillage: Wie weit trägt der Duft?
          </h2>

          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728', marginBottom: '1.5rem' }}>
            Sillage (französisch für „Kielwasser") beschreibt die Duftspur, die du hinterlässt – also wie deutlich dein Duft um dich herum und hinter dir wahrnehmbar ist. Eng verwandt, aber nicht dasselbe ist die Projektion: wie weit der Duft von deiner Haut abstrahlt.
          </p>

          {/* Sillage Scale */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#2a1d12', marginBottom: '1rem' }}>
              Die Sillage-Skala (0–10)
            </h3>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {[
                { score: '1–2', title: 'Hautnah', desc: 'Fast nur du selbst riechst ihn. Gut für Büro oder enge Kontakte.' },
                { score: '3–4', title: 'Leise', desc: 'Leute in unmittelbarer Nähe riechen ihn.' },
                { score: '5–6', title: 'Moderat', desc: 'Der Raum riecht leicht nach dir. Für soziale Ereignisse gut, nicht erdrückend.' },
                { score: '7–8', title: 'Stark', desc: 'Menschen im Raum riechen dich deutlich. Kann zu viel sein für Büro. Gut für Parties.' },
                { score: '9–10', title: 'Sehr stark', desc: 'Dein Duft erfüllt den Raum und hinterlässt eine deutliche Spur. Wenige Sprühstösse reichen. Kann dominant wirken.' }
              ].map((item) => (
                <div key={item.score} style={{
                  background: '#fff',
                  border: '1px solid rgba(212,175,55,0.2)',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  display: 'grid',
                  gridTemplateColumns: 'auto 1fr',
                  gap: '1rem',
                  alignItems: 'start'
                }}>
                  <div style={{
                    background: 'linear-gradient(135deg, #d4af37, #c9a227)',
                    color: 'white',
                    padding: '0.5rem 1rem',
                    borderRadius: '8px',
                    textAlign: 'center',
                    minWidth: '80px',
                    fontWeight: 700,
                    fontSize: '0.9rem'
                  }}>
                    {item.score}
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, color: '#2a1d12', marginBottom: '0.25rem', margin: 0 }}>
                      {item.title}
                    </p>
                    <p style={{ fontSize: '0.9rem', color: '#6b5344', margin: 0 }}>
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728', background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.03))', borderRadius: '12px', padding: '1rem', marginBottom: '1.5rem' }}>
            💡 <strong>Praktischer Tipp:</strong> Für Büro: 3–5. Für Alltag: 4–6. Für Abends: 6–8. Mehr Ausstrahlung heisst nicht automatisch besser.
          </p>
        </section>

        {/* Matrix */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: '1.75rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.5rem' }}>
            Die perfekte Kombination finden
          </h2>

          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728', marginBottom: '1.5rem' }}>
            Ein passender Duft kombiniert die richtige Haltbarkeit UND Ausstrahlung für deine Situation – unsere Richtwerte:
          </p>

          <div style={{ display: 'grid', gap: '1rem' }}>
            {[
              { situation: 'Büro/Alltag', longevity: '5–6', sillage: '3–5', warum: 'Du brauchst Präsenz den ganzen Arbeitstag, aber nicht zu dominant.' },
              { situation: 'Reisen/Mobile', longevity: '7–8', sillage: '5–6', warum: 'Must-have: Lange Haltbarkeit, damit du nicht mehrmals täglich auftragen musst.' },
              { situation: 'Abendparty', longevity: '6–8', sillage: '6–8', warum: 'Hier darfst du stärker sein. Lust auf Projektion.' },
              { situation: 'Heimwerkertag', longevity: '3–4', sillage: '3–4', warum: 'Kurz und leise. Du wäschst dich sowieso am Ende des Tages ab.' },
              { situation: 'Sporttag', longevity: '4–5', sillage: '3–4', warum: 'Beim Sport wirken starke Düfte schnell aufdringlich. Leise ist besser.' }
            ].map((combo) => (
              <div key={combo.situation} style={{
                background: '#fff',
                border: '1px solid rgba(212,175,55,0.2)',
                borderRadius: '12px',
                padding: '1.25rem',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#2a1d12', margin: 0 }}>
                    {combo.situation}
                  </h3>
                  <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem' }}>
                    <span style={{ background: 'rgba(212,175,55,0.1)', padding: '0.25rem 0.75rem', borderRadius: '4px', fontWeight: 600 }}>
                      📍 Sillage: {combo.sillage}
                    </span>
                    <span style={{ background: 'rgba(212,175,55,0.1)', padding: '0.25rem 0.75rem', borderRadius: '4px', fontWeight: 600 }}>
                      ⏱️ Länge: {combo.longevity}
                    </span>
                  </div>
                </div>
                <p style={{ fontSize: '0.9rem', color: '#6b5344', margin: 0 }}>
                  {combo.warum}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: '3rem', background: 'linear-gradient(135deg, #2a1d12 0%, #3d2b1a 100%)', borderRadius: '16px', padding: '2rem 1.5rem', color: '#faf7f2' }}>
          <h2 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.25rem', marginTop: 0 }}>
            ❓ Häufige Fragen
          </h2>

          {[
            {
              q: 'Kann ich Ausstrahlung und Haltbarkeit erhöhen?',
              a: 'Etwas, ja. Auf eingecremte, unparfümierte Haut sprühen – auf sehr trockener Haut verfliegt Duft oft schneller. Ein Sprühstoss mehr hilft (aber nicht zu viel – das wirkt schnell aufdringlich). Die Ausstrahlung ist meist in den ersten Stunden am stärksten und lässt danach nach.'
            },
            {
              q: 'Warum hält mein teurer Duft nur kurz?',
              a: 'Teuer heisst nicht automatisch länger haltbar. Manche Düfte sind bewusst leicht komponiert, etwa viele Zitrus-Düfte. Oft riechst du ihn auch selbst nicht mehr: Die Nase gewöhnt sich innerhalb von Minuten an einen Duft, andere nehmen ihn dann noch wahr. Schau auf die Haltbarkeit, nicht auf den Preis.'
            },
            {
              q: 'Ist ein Duft mit hoher Sillage immer besser?',
              a: 'Nein. Im Büro kann eine starke Sillage störend wirken. Auf Partys passt sie eher, aber nicht überall.'
            },
            {
              q: 'Manche Menschen sagen, sie riechen meine Duft-Wolke. Ist das schlecht?',
              a: 'Nein, das ist normal bei starker Sillage. Wenn es zu viel ist, kannst du weniger auftragen oder auf einen Duft mit moderater Sillage wechseln.'
            }
          ].map((faq) => (
            <div key={faq.q} style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(212,175,55,0.2)' }}>
              <p style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.5rem', margin: 0 }}>
                {faq.q}
              </p>
              <p style={{ fontSize: '0.9rem', color: 'rgba(250,247,242,0.85)', lineHeight: 1.6, margin: 0 }}>
                {faq.a}
              </p>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section style={{ textAlign: 'center', paddingTop: '2rem', borderTop: '1px solid rgba(212,175,55,0.2)' }}>
          <h2 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: '1.25rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1rem' }}>
            Die richtigen Düfte für dich finden
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728', marginBottom: '1.5rem' }}>
            Nutze unser Quiz, um Düfte zu finden, die zu deinen Wünschen bei Haltbarkeit und Ausstrahlung passen.
          </p>
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
        </section>

      </div>
    </main>
  );
}
