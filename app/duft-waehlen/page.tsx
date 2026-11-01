import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/app/Breadcrumb';

export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export const metadata: Metadata = {
  title: 'Wie wählt man einen Parfum? Der komplette Guide für deine Wahl',
  description:
    'Dein umfassender Guide zur Auswahl des perfekten Parfums: Budget, Dufttyp, Konzentration, Saison, Anlass und deine persönlichen Vorlieben – Schritt für Schritt.',
  alternates: { canonical: `${SITE_URL}/duft-waehlen` },
  openGraph: {
      images: ['/opengraph-image'],
    title: 'Wie wählt man einen Parfum? | Auressa',
    description: 'Der komplette Guide zur Parfum-Auswahl: Finde deinen perfekten Duft mit System.',
    type: 'website',
    url: `${SITE_URL}/duft-waehlen`,
  },
};

export default function FragranceSelectionPage() {
  return (
    <main style={{ backgroundColor: '#faf7f2' }}>
      <Breadcrumb items={[{ label: 'Duft wählen', href: '/duft-waehlen' }]} />

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
            Der komplette Leitfaden
          </p>
          <h1 style={{
            fontSize: 'clamp(28px, 6vw, 48px)',
            fontFamily: "var(--font-display), Georgia, serif",
            fontWeight: 700,
            marginBottom: '1.5rem',
            lineHeight: 1.15,
            color: '#faf7f2',
          }}>
            Wie wählt man seinen perfekten Duft?
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(250,247,242,0.8)', margin: 0 }}>
            Schritt für Schritt zum Signature-Duft – mit Budget, Jahreszeit, Noten und Anlass.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 1.25rem' }}>

        {/* Intro */}
        <section style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4a3020', marginBottom: '1.5rem' }}>
            Die perfekte Duft-Wahl zu treffen fühlt sich überwältigend an – zu viele Optionen, zu viele Begriffe,
            zu viel Marketing. Aber es gibt ein System. Diese Anleitung führt dich Schritt für Schritt durch die
            Entscheidung – und am Ende wirst du genau wissen, welchen Duft du kaufen solltest.
          </p>
        </section>

        {/* Die 7-Schritte */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontFamily: "var(--font-display), Georgia, serif",
            fontSize: '1.8rem',
            fontWeight: 700,
            color: '#d4af37',
            marginBottom: '1.5rem',
            paddingBottom: '0.5rem',
            borderBottom: '2px solid rgba(212,175,55,0.3)',
          }}>
            🎯 Die 7-Schritte-Formel zur perfekten Duft-Wahl
          </h2>

          <div style={{
            background: '#fff',
            border: '2px solid rgba(212,175,55,0.2)',
            borderRadius: '16px',
            padding: '2rem',
            display: 'grid',
            gap: '2rem',
          }}>
            {[
              {
                step: 1,
                title: 'Budget bestimmen',
                questions: [
                  '💰 Einsteiger: CHF 20–50 → Nutze günstige Premium-Marken wie Lattafa oder Armaf',
                  '💰💰 Mittel: CHF 50–100 → Beste Preis-Leistungs-Verhältnis für EdP-Qualität',
                  '💰💰💰 Premium: CHF 100–150 → Designer-Düfte mit exzellenter Haltbarkeit',
                  '💰💰💰💰 Luxus: CHF 150+ → Nischendüfte und Extraits – das Beste vom Besten'
                ],
                action: 'Entscheide dich für eine Kategorie. Nicht überschreiten – das erspart Überraschungen beim Checkout.'
              },
              {
                step: 2,
                title: 'Dufttyp wählen (was magst du riechen?)',
                questions: [
                  'Frisch & leicht → Zitrus, Minz, Bergamotte (Top-Noten-fokussiert)',
                  'Blumig & elegant → Rose, Jasmin, Nelke (Heart-Noten-fokussiert)',
                  'Warm & süss → Vanille, Karamell, Amber (Heart/Base-Noten)',
                  'Holzig & maskulin → Oud, Sandelholz, Zedernholz (Base-Noten-fokussiert)',
                  'Gewürzig & würzig → Zimt, Pfeffer, Kardamom (intensiv und präsent)'
                ],
                action: 'Wähle eine oder zwei Kategorien. Das ist dein „Duft-Profil".',
                link: 'Mehr über Duftnoten erfahren →'
              },
              {
                step: 3,
                title: 'Die richtige Konzentration (EdP, EdT?)',
                questions: [
                  'EdP (15–20%): Der Standard. 6–12 Stunden Haltbarkeit. Beste Wahl für Anfänger.',
                  'EdT (5–15%): Leichter, günstiger. 3–6 Stunden. Ideal für Sommer.',
                  'Extrait (meist 20–30%): Am teuersten, länger haltbar. Für Duft-Liebhaber.'
                ],
                action: 'Für die erste Wahl: EdP. Es ist das beste Gleichgewicht.',
                link: 'Duftarten im Detail →'
              },
              {
                step: 4,
                title: 'Jahreszeit & Anlass',
                questions: [
                  '🌞 Sommer: EdT, frische Top-Noten, leichte Düfte (Zitrus, Minz)',
                  '🍂 Herbst: EdP, Gewürz-fokussiert, warme Noten (Karamell, Holz)',
                  '❄️ Winter: EdP/Extrait, schwere Base-Noten, intensive Düfte (Oud, Vanilla)',
                  '🎉 Spezielle Anlässe: Intensiver und präsenter (EdP oder Extrait)'
                ],
                action: 'Wähle eine Jahreszeit und einen Anlass. Das wird dein „Kontext".'
              },
              {
                step: 5,
                title: 'Teste die Top-Kandidaten',
                questions: [
                  'Finde 2–3 Düfte, die zu deinem Profil passen (Budget + Typ + Konzentration + Saison)',
                  'Probe: Bestelle online oder kaufe eine 5–10ml Miniatur',
                  'Test: Trag die Probe für 3–5 Tage täglich. Nicht täglich in einem Geschäft riechen.',
                  'Regel: Nach 5 Tagen: Liebst du ihn noch? Ja → Kaufe die grosse Flasche. Nein → Weiter suchen.'
                ],
                action: 'Die 5-Tage-Regel ist Gold. Nicht im Geschäft kaufen – Zuhause testen.',
                link: 'Unser Quiz starten →'
              },
              {
                step: 6,
                title: 'Lagerung & Anwendung optimieren',
                questions: [
                  '🌡️ Lagerung: Kühl, dunkel, ohne Temperaturschwankungen (Kühlschrank ist nicht nötig, nicht auf der Fensterbank)',
                  '🎯 Anwendung: Nach dem Duschen auftragen. 2–3 Sprühstösse auf Puls-Punkte.',
                  '⏰ Retouch: Nach 4–5 Stunden wenn nötig (der Duft hält länger mit richtigem Auftrag)',
                  '🧴 Sorge für: Richtige Lagerung verdoppelt die Duft-Lebensdauer'
                ],
                action: 'Investiere in die richtige Lagerung und Anwendung. Das maximiert deinen Genuss.',
                link: 'Lagerung & Anwendung lernen →'
              },
              {
                step: 7,
                title: 'Baue deine Sammlung auf',
                questions: [
                  '👑 Signature-Duft: Dein 1. Duft ist dein Lieblings-Duft – den trägst du überall',
                  '📚 Sammlung: Mit Zeit kaufst du 2–3 weitere Düfte für verschiedene Jahreszeiten/Anlässe',
                  '🎨 Layering: Du kombinierst Düfte für persönliche Kreativität und Längere Haltbarkeit',
                  '💰 Smart kaufen: Nutze Proben/Miniaturen für neue Entdeckungen – nicht sofort grosse Flaschen'
                ],
                action: 'Beginne mit 1. Dann, wenn du ihn liebst, erweitere deine Sammlung langsam.'
              }
            ].map((item) => (
              <div key={item.step} style={{ borderBottom: item.step === 7 ? 'none' : '1px solid rgba(212,175,55,0.1)', paddingBottom: item.step === 7 ? 0 : '2rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div
                    style={{
                      minWidth: '40px',
                      width: '40px',
                      height: '40px',
                      background: '#d4af37',
                      color: '#2a1d12',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      flexShrink: 0,
                    }}
                  >
                    {item.step}
                  </div>
                  <h3 style={{ color: '#2a1d12', fontWeight: 700, margin: '0', fontSize: '1.1rem' }}>
                    {item.title}
                  </h3>
                </div>

                <div style={{ display: 'grid', gap: '0.75rem', marginBottom: '1rem', fontSize: '0.9rem', color: '#6b5344' }}>
                  {item.questions.map((q, idx) => (
                    <p key={idx} style={{ margin: 0, lineHeight: 1.5 }}>
                      {q}
                    </p>
                  ))}
                </div>

                <div style={{
                  background: 'rgba(212,175,55,0.08)',
                  border: '1px solid rgba(212,175,55,0.15)',
                  borderRadius: '8px',
                  padding: '1rem',
                  marginBottom: '1rem',
                }}>
                  <p style={{ color: '#2a1d12', fontWeight: 600, margin: 0, fontSize: '0.95rem' }}>
                    ✓ {item.action}
                  </p>
                </div>

                {item.link && (
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#d4af37', fontWeight: 600 }}>
                    📖 {item.link}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Häufige Fehler */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontFamily: "var(--font-display), Georgia, serif",
            fontSize: '1.8rem',
            fontWeight: 700,
            color: '#d4af37',
            marginBottom: '1.5rem',
            paddingBottom: '0.5rem',
            borderBottom: '2px solid rgba(212,175,55,0.3)',
          }}>
            ⚠️ Die 5 häufigsten Fehler bei der Duft-Wahl
          </h2>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {[
              {
                error: 'Im Geschäft kaufen, ohne zu Hause zu testen',
                why: 'Deine Nase ist überfordert von allen Düften. Du riechst nur die Top-Noten. Nach Hause gehst du und der Duft gefällt dir nicht mehr.',
                solution: 'Teste immer zu Hause für 3–5 Tage. Die 5-Tage-Regel ist König.'
              },
              {
                error: 'Zu viel Duft auftragen',
                why: 'Wenn du zu viel aufträgst, kann deine Nase den Duft nicht geniessen. Es wirkt aufdringlich und hält künstlich kurz.',
                solution: '2–3 Sprühstösse auf Puls-Punkte reichen. Weniger ist mehr.'
              },
              {
                error: 'Teuer = Besser',
                why: 'Ein 20-Franken-Duft kann genauso gut riechen wie ein 150-Franken-Duft. Der Preis ist oft Marketing, nicht Qualität.',
                solution: 'Vertrau auf Bewertungen und Duftprofil, nicht auf Preis. Kauf smart.'
              },
              {
                error: 'Keine Lagerung beachten',
                why: 'Wenn dein Duft in der Sonne lagert oder zu warm wird, degradiert er. Die Noten verändern sich negativ.',
                solution: 'Lagere kühl, dunkel und stabil. Das verdoppelt die Lebensdauer.'
              },
              {
                error: 'Zu schnell aufgeben',
                why: 'Nach einem Tag denkst du \"dieser Duft ist nichts für mich\". Aber nach 5 Tagen liebst du ihn. Die Nase gewöhnt sich an – das ist normal.',
                solution: 'Gib jedem neuen Duft mindestens 5 Tage Zeit. Deine Nase braucht das.'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: '#fff',
                  border: '1px solid rgba(212,175,55,0.15)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  borderLeft: '4px solid #d4af37',
                }}
              >
                <h3 style={{ color: '#2a1d12', fontWeight: 700, marginBottom: '0.75rem', fontSize: '1.05rem' }}>
                  {item.error}
                </h3>
                <p style={{ color: '#6b5344', fontSize: '0.9rem', marginBottom: '0.75rem', lineHeight: 1.6, margin: '0 0 0.75rem 0' }}>
                  <strong>Warum das schlecht ist:</strong> {item.why}
                </p>
                <p style={{ color: '#8a6a20', fontWeight: 600, fontSize: '0.9rem', margin: 0, lineHeight: 1.6 }}>
                  <strong>Die Lösung:</strong> {item.solution}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Weitere Ressourcen */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontFamily: "var(--font-display), Georgia, serif",
            fontSize: '1.8rem',
            fontWeight: 700,
            color: '#d4af37',
            marginBottom: '1.5rem',
            paddingBottom: '0.5rem',
            borderBottom: '2px solid rgba(212,175,55,0.3)',
          }}>
            📚 Weitere hilfreiche Ressourcen
          </h2>
          <div style={{
            background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.04))',
            border: '2px solid rgba(212,175,55,0.2)',
            borderRadius: '16px',
            padding: '2rem',
          }}>
            <p style={{ fontSize: '0.95rem', color: '#6b5344', marginBottom: '1.5rem', margin: '0 0 1.5rem 0' }}>
              Wir haben umfangreiche Guides zu jedem Aspekt der Duft-Wahl. Hier sind die wichtigsten:
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '1rem',
            }}>
              {[
                {
                  title: '🔺 Duftnoten verstehen',
                  desc: 'Wie die Top-, Heart- und Base-Noten funktionieren',
                  href: '/duftnoten-guide'
                },
                {
                  title: '🎯 Duftarten erklärt',
                  desc: 'EdP, EdT, Extrait – Was ist der Unterschied?',
                  href: '/duftarten'
                },
                {
                  title: '💡 Richtig auftragen',
                  desc: 'Techniken für längere Haltbarkeit',
                  href: '/parfum-auftragen'
                },
                {
                  title: '🧴 Richtig lagern',
                  desc: 'Lagerung für maximale Haltbarkeit',
                  href: '/duft-lagerung'
                },
                {
                  title: '🎨 Duftkombinationen',
                  desc: 'Layering und Duft-Mixing',
                  href: '/duefte-kombinieren'
                },
                {
                  title: '❌ Mythen & Fakten',
                  desc: '20 Duft-Mythen im Faktencheck',
                  href: '/duft-mythen'
                }
              ].map((resource, idx) => (
                <Link
                  key={idx}
                  href={resource.href}
                  style={{
                    display: 'block',
                    background: '#fff',
                    border: '1px solid rgba(212,175,55,0.2)',
                    borderRadius: '12px',
                    padding: '1.25rem',
                    textDecoration: 'none',
                  }}
                >
                  <h3 style={{ color: '#2a1d12', fontWeight: 700, margin: '0 0 0.5rem 0', fontSize: '0.95rem' }}>
                    {resource.title}
                  </h3>
                  <p style={{ color: '#6b5344', fontSize: '0.85rem', margin: 0, lineHeight: 1.5 }}>
                    {resource.desc}
                  </p>
                </Link>
              ))}
            </div>
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
            Bereit zum Einkaufen?
          </p>
          <h2 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: '1.6rem', fontWeight: 700, color: '#faf7f2', marginBottom: '1rem' }}>
            Finde jetzt deine perfekte Duft
          </h2>
          <p style={{ color: 'rgba(250,247,242,0.75)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            Mit dem Wissen aus diesem Guide wirst du die richtige Wahl treffen. Vertrau auf dein neues System.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/quiz" style={{
              background: '#d4af37',
              color: '#2a1d12',
              fontWeight: 700,
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '0.95rem',
              display: 'inline-block',
            }}>Quiz starten</Link>
            <Link href="/duefte" style={{
              background: 'transparent',
              color: '#faf7f2',
              fontWeight: 600,
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '0.95rem',
              border: '1px solid rgba(250,247,242,0.3)',
              display: 'inline-block',
            }}>Alle Düfte durchsuchen</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
