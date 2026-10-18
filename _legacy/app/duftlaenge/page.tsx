import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/app/SiteHeader';
import Breadcrumb from '@/app/Breadcrumb';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export const metadata: Metadata = {
  title: 'Haltbarkeit und Sillage: Wie lange hält ein Parfum? | Auressa',
  description:
    'Verstehe Longevity und Sillage: Wie lange hält ein Duft, wie weit trägt er, und wie wählst du den richtigen für deine Situation.',
  alternates: { canonical: `${SITE_URL}/duftlaenge` },
  openGraph: {
    title: 'Haltbarkeit und Sillage erklärt | Auressa',
    description: 'Alles über Duft-Haltbarkeit, Projektion und wie du den richtigen Duft für deine Situation wählst.',
    url: `${SITE_URL}/duftlaenge`,
    type: 'website'
  }
};

export default function DuftlaengePage() {
  return (
    <main style={{ backgroundColor: '#faf7f2' }}>
      <SiteHeader />
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
            fontFamily: "'Playfair Display', serif",
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
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.5rem' }}>
            ⏱️ Longevity: Wie lange hält der Duft?
          </h2>

          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728', marginBottom: '1.5rem' }}>
            Longevity ist die wichtigste Frage beim Duftkauf. Es ist frustrierend, wenn ein CHF 100-Duft nach 2 Stunden weg ist. Hier erfährst du, wie lange verschiedene Dufttypen halten.
          </p>

          {/* Longevity Scale */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#2a1d12', marginBottom: '1rem' }}>
              Die Longevity-Skala (0–10)
            </h3>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {[
                { range: '1–2h', score: '1–2', title: 'Eau de Cologne', desc: 'Sehr kurz. Angenehm für zwischendurch, aber schnell weg.' },
                { range: '2–4h', score: '3–4', title: 'Eau de Toilette', desc: 'Kurz. Beliebte Einsteiger-Option. Brauchst mehrmals täglich auftragen.' },
                { range: '4–8h', score: '5–6', title: 'Eau de Parfum / EdP', desc: 'Mittel bis lang. Der Standard. Hält den ganzen Tag mit 1–2 Anwendungen.' },
                { range: '8–12h+', score: '7–8', title: 'Extrait / Parfum', desc: 'Sehr lange. Premium-Option. Ein Sprühstoß am Morgen, oft noch am Abend.' },
                { range: '12h+', score: '9–10', title: 'Beast-Mode', desc: 'Extremes Monster. Duftköpfe lieben es. Kann erdrückend wirken.' }
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
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.5rem' }}>
            👃 Sillage: Wie weit trägt der Duft?
          </h2>

          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728', marginBottom: '1.5rem' }}>
            Sillage (französisch: „Kielwasser") beschreibt, wie weit dein Duft trägt. Ist er nur auf deiner Haut zu riechen, oder füllt er den ganzen Raum?
          </p>

          {/* Sillage Scale */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#2a1d12', marginBottom: '1rem' }}>
              Die Sillage-Skala (0–10)
            </h3>
            <div style={{ display: 'grid', gap: '0.75rem' }}>
              {[
                { score: '1–2', title: 'Kaum Projektion', desc: 'Nur du selbst riechst ihn. Perfekt für Büro oder enge Kontakte. Verbrauchst viel.' },
                { score: '3–4', title: 'Leise / Hautnah', desc: 'Leute in unmittelbarer Nähe riechen ihn. Standard für die meisten.' },
                { score: '5–6', title: 'Moderat', desc: 'Der Raum riecht leicht nach dir. Für soziale Ereignisse gut, nicht erdrückend.' },
                { score: '7–8', title: 'Stark', desc: 'Menschen im Raum riechen dich deutlich. Kann zu viel sein für Büro. Gut für Parties.' },
                { score: '9–10', title: 'Projektil-Modus', desc: 'Dein Duft erfüllt den Raum. Alle riechen ihn. Brauchst nur wenig. Kann dominant wirken.' }
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
            💡 <strong>Praktischer Tipp:</strong> Für Büro: 3–5. Für Alltag: 4–6. Für Abends: 6–8. Brauchst nicht mehr Sillage, um einen teuren Duft zu rechtfertigen.
          </p>
        </section>

        {/* Matrix */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.75rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.5rem' }}>
            Die perfekte Kombination finden
          </h2>

          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728', marginBottom: '1.5rem' }}>
            Der beste Duft kombiniert die richtige Longevity UND Sillage für deine Situation:
          </p>

          <div style={{ display: 'grid', gap: '1rem' }}>
            {[
              { situation: 'Büro/Alltag', longevity: '5–6', sillage: '3–5', warum: 'Du brauchst Präsenz den ganzen Arbeitstag, aber nicht zu dominant.' },
              { situation: 'Reisen/Mobile', longevity: '7–8', sillage: '5–6', warum: 'Must-have: Lange Haltbarkeit, damit du nicht mehrmals täglich auftragen musst.' },
              { situation: 'Abendparty', longevity: '6–8', sillage: '6–8', warum: 'Hier darfst du stärker sein. Lust auf Projektion.' },
              { situation: 'Heimwerkertag', longevity: '3–4', sillage: '3–4', warum: 'Kurz und leise. Du wäschst dich sowieso am Ende des Tages ab.' },
              { situation: 'Sporttag', longevity: '4–5', sillage: '3–4', warum: 'Nicht zu lang, weil Schweiß den Duft verändert. Leise ist besser.' }
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
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.25rem', marginTop: 0 }}>
            ❓ Häufige Fragen
          </h2>

          {[
            {
              q: 'Kann ich Sillage und Longevity erhöhen?',
              a: 'Ja! Mehr auftragen (aber nicht zu viel – Overkill wirkt billig). Auf feuchte Haut sprühen. Sillage sinkt mit der Zeit, Longevity auch. Nach 4–5 Stunden ist die Projektion meist halber.'
            },
            {
              q: 'Warum hält mein teurer Duft nur kurz?',
              a: 'Teure heißt nicht automatisch länger haltbar. Manche High-End-Düfte sind bewusst leise und kurz (Nische-Appeal). Schau auf die Longevity-Bewertung, nicht den Preis.'
            },
            {
              q: 'Ist ein Duft mit hoher Sillage immer besser?',
              a: 'Nein! Im Büro kann hohes Sillage störend wirken. Im Schlafzimmer? Auch nicht. Hohe Sillage ist cool auf Partys, aber nicht überall.'
            },
            {
              q: 'Manche Menschen sagen, sie riechen meine Duft-Wolke. Ist das schlecht?',
              a: 'Nein, das ist normal bei hohem Sillage. Wenn es zu viel ist, kannst du weniger auftragen oder auf einen mit moderaterem Sillage wechseln.'
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
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1rem' }}>
            Die richtigen Düfte für dich finden
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728', marginBottom: '1.5rem' }}>
            Nutze unser Quiz, um Düfte zu finden, die zu deinen Longevity- und Sillage-Anforderungen passen.
          </p>
          <Link
            href="/#quiz"
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
