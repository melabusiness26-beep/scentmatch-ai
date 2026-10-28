import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/app/Breadcrumb';

export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export const metadata: Metadata = {
  title: 'Duft als Geschenk: Der ultimative Guide für das perfekte Parfum-Geschenk | Auressa',
  description:
    'Wie wählst du ein Duft-Geschenk richtig? Guide für alle Gelegenheiten: Budget, Geschlecht, Alter, Dufttyp und was Duft-Empfänger wirklich wollen.',
  alternates: { canonical: `${SITE_URL}/duft-geschenk` },
  openGraph: {
    title: 'Duft als Geschenk: Perfekte Parfum-Geschenke | Auressa',
    description: 'Der komplette Guide für das perfekte Duft-Geschenk – wie du es richtig wählst und präsentierst.',
    type: 'website',
    url: `${SITE_URL}/duft-geschenk`,
  },
};

export default function FragranceGiftPage() {
  return (
    <main style={{ backgroundColor: '#faf7f2' }}>
      <Breadcrumb items={[{ label: 'Duft als Geschenk', href: '/duft-geschenk' }]} />

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
            Geschenke-Guide
          </p>
          <h1 style={{
            fontSize: 'clamp(28px, 6vw, 48px)',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            marginBottom: '1.5rem',
            lineHeight: 1.15,
            color: '#faf7f2',
          }}>
            Duft als Geschenk – Der perfekte Weg
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(250,247,242,0.8)', margin: 0 }}>
            Dein Leitfaden zum perfekten Duft-Geschenk – für jeden Menschen und jede Gelegenheit.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 1.25rem' }}>

        {/* Intro */}
        <section style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4a3020', marginBottom: '1.5rem' }}>
            Ein Duft-Geschenk ist eines der besten Geschenke, die du machen kannst – wenn du es richtig machst.
            Es ist persönlich, sinnlich, praktisch und zeigt, dass du dir Zeit genommen hast zu verstehen,
            wer diese Person ist. Diese Anleitung führt dich durch alle Entscheidungen, damit du ein Geschenk
            machst, das wirklich begeistert.
          </p>
        </section>

        {/* Vor dem Kauf */}
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
            🎯 Vor dem Kauf: 5 Fragen, die du dir stellen solltest
          </h2>
          <div style={{
            background: '#fff',
            border: '2px solid rgba(212,175,55,0.2)',
            borderRadius: '16px',
            padding: '2rem',
            display: 'grid',
            gap: '1.5rem',
          }}>
            {[
              {
                q: 'Wer erhält das Geschenk?',
                answer: [
                  '👩 Frau/Feminin: Klassisch floraler oder süsser Dufte. Sie tragen auch Unisex-Düfte.',
                  '👨 Mann/Maskulin: Klassisch holzig oder würzig. Sie tragen auch Unisex-Düfte.',
                  '🌈 Unisex/Keine Annahme: Unisex-Düfte sind die sicherste Wahl – sie funktionieren für alle.',
                  '👵 Alter: Älter → klassisch und konservativ. Jung → experimentell und trendy.'
                ]
              },
              {
                q: 'Was ist mein Budget?',
                answer: [
                  '💰 CHF 20–40: Günstige, aber gute Marken (Lattafa, Armaf, Zara). Klein aber durchdacht.',
                  '💰💰 CHF 40–80: Solides Mittelfeld. Designer-Düfte mit guter Qualität.',
                  '💰💰💰 CHF 80–150: Premium-Düfte. Shows, dass dir die Person wichtig ist.',
                  '💰💰💰💰 CHF 150+: Luxus-Nischendüfte. Für echte Duft-Liebhaber oder spezielle Anlässe.'
                ]
              },
              {
                q: 'Kenne ich die Duft-Vorlieben der Person?',
                answer: [
                  '✅ Ja, sie trägt schon einen Lieblingsduft → Finde einen ähnlichen oder die gleiche Marke in günstiger (EdT statt EdP).',
                  '❓ Halbwegs → Finde einen universell beliebten Duft (Creed Aventus, Dior Sauvage, Black Opium).',
                  '❌ Nein → Wähle einen sicheren, universellen Duft. Oder beschenke mit einem Duft-Set mit mehreren Noten.'
                ]
              },
              {
                q: 'Was ist der Anlass?',
                answer: [
                  '❤️ Romantisch (Partner): Intensiver, persönlicher Duft. Was gefällt dir an ihr/ihm?',
                  '👥 Freundschaft: Ein beliebter, universeller Duft. Nichts zu Persönliches.',
                  '👨‍👩‍👧 Familie: Ein klassischer, zeitloser Duft. Nicht zu experimentell.',
                  '🎓 Karriere/Anzug: Ein professioneller, subtiler Duft. Nichts zu Intensives.'
                ]
              },
              {
                q: 'Will ich noch Rat geben oder nur Duft?',
                answer: [
                  '💌 Duft + Guide: Packe eine Notiz bei, die erklärt, warum du diesen Duft gewählt hast.',
                  '📦 Duft + Set: Kauf ein Duft-Set mit Körperpflege (Deo, Lotion). Zeigt extra Gedanken.',
                  '🎁 Duft allein: Klassisch. Verpacke es schön – die Präsentation zählt.',
                  '❓ Unsicher: Verschenk einen Gutschein + Auressa Quiz-Link. Lass sie selbst wählen.'
                ]
              }
            ].map((item, idx) => (
              <div key={idx} style={{ paddingBottom: idx < 4 ? '1.5rem' : 0, borderBottom: idx < 4 ? '1px solid rgba(212,175,55,0.1)' : 'none' }}>
                <h3 style={{ color: '#2a1d12', fontWeight: 700, marginBottom: '1rem', fontSize: '1.05rem' }}>
                  {item.q}
                </h3>
                <div style={{ display: 'grid', gap: '0.75rem' }}>
                  {item.answer.map((a, aidx) => (
                    <p key={aidx} style={{ color: '#6b5344', margin: 0, lineHeight: 1.5, fontSize: '0.95rem' }}>
                      {a}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Duft-Geschenk-Ideen */}
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
            💝 Klassische Duft-Geschenk-Kombinationen (nach Person)
          </h2>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {[
              {
                person: 'Für die Freundin / Ehefrau',
                top: 'Floral, Süss oder Würzig',
                popular: 'Dior Miss Dior, Yves Saint Laurent Black Opium, Lancôme La Vie Est Belle',
                preis: '💰💰–💰💰💰💰 (CHF 60–150)',
                extra: 'Körpercreme oder Dusch-Set dazu machen es persönlicher.'
              },
              {
                person: 'Für den Freund / Ehemann',
                top: 'Woody, Würzig oder Frisch',
                popular: 'Creed Aventus, Dior Sauvage, Tom Ford Black Opium Men',
                preis: '💰💰–💰💰💰 (CHF 60–120)',
                extra: 'Ein klassischer, zeitloser Duft is eine sichere Wahl.'
              },
              {
                person: 'Für die beste Freundin',
                top: 'Was sie mag – Frage nach, wenn du nicht weisst',
                popular: 'Ihr Lieblingsduft in EdT-Form (günstiger), oder ein ähnlicher von günstiger Marke',
                preis: '💰–💰💰 (CHF 20–60)',
                extra: 'Persönliche Note: "Ich weiss, du liebst X – hier ist etwas Ähnliches"'
              },
              {
                person: 'Für die Mutter / Grossmutter',
                top: 'Klassisch, elegant, zeitlos',
                popular: 'Chanel No. 5, Dior J\'adore, Lancôme Trésor',
                preis: '💰💰–💰💰💰 (CHF 60–120)',
                extra: 'Klassische Düfte sind zeitlos – sie werden geliebt und lange getragen.'
              },
              {
                person: 'Für einen jungen Partner (16–25)',
                top: 'Trendy, modern, Social-Media-kompatibel',
                popular: 'Billie Eilish Eau de Parfum, Celine Dion Colour Me, Urban Decay All Nighter',
                preis: '💰💰–💰💰💰 (CHF 40–100)',
                extra: 'Der Duft sollte cool und Instagram-würdig sein.'
              },
              {
                person: 'Für einen Duft-Sammler (schwierig!)',
                top: 'Ein seltener oder Nischen-Duft, den er/sie noch nicht hat',
                popular: 'Heeley, Frapin, Penhaligons – Nischendüfte mit Geschichte',
                preis: '💰💰💰–💰💰💰💰 (CHF 100–200+)',
                extra: 'Recherchiere, welche Marken und Noten sie mögen. Ein Fehler ist teuer.'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.04))',
                  border: '1px solid rgba(212,175,55,0.15)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                }}
              >
                <h3 style={{ color: '#2a1d12', fontWeight: 700, marginBottom: '0.75rem', fontSize: '1.05rem' }}>
                  {item.person}
                </h3>
                <div style={{ display: 'grid', gap: '0.75rem', fontSize: '0.9rem', color: '#6b5344' }}>
                  <p style={{ margin: 0 }}>
                    <strong style={{ color: '#8a6a20' }}>Duft-Typ:</strong> {item.top}
                  </p>
                  <p style={{ margin: 0 }}>
                    <strong style={{ color: '#8a6a20' }}>Beliebte Wahl:</strong> {item.popular}
                  </p>
                  <p style={{ margin: 0 }}>
                    <strong style={{ color: '#8a6a20' }}>Budget:</strong> {item.preis}
                  </p>
                  <p style={{ margin: 0, fontWeight: 600, color: '#8a6a20' }}>
                    💡 {item.extra}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Häufige Fehler */}
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
            ⚠️ Die häufigsten Duft-Geschenk-Fehler
          </h2>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {[
              {
                fehler: 'Einen Duft kaufen, den die Person nie getestet hat',
                resultat: 'Risiko: Der Duft gefällt nicht. Es ist teuer und peinlich.',
                lösung: 'Frage nach Vorlieben oder wähle einen universell beliebten Duft (Creed Aventus, Dior Sauvage).'
              },
              {
                fehler: 'Einen sehr teuren Duft ohne zu wissen, ob die Person ihn mag',
                resultat: 'Budget vergeudet. Dankbarkeit trotz Missmatch ist unangenehm.',
                lösung: 'Kauf günstiger und teste zuerst. Oder beschenk mit einem Set aus mehreren Mini-Düften.'
              },
              {
                fehler: 'Annahmen über Geschlecht treffen (\"Männer mögen Holz\", \"Frauen mögen Blüten\")',
                resultat: 'Der Duft passt nicht. Schaut nach Stereotyp-Gift aus.',
                lösung: 'Frag die Person oder wähle einen Unisex-Duft (funktioniert für alle).'
              },
              {
                fehler: 'Die leere Flasche als \"grosszügig\" verpacken',
                resultat: 'Wirkt billig und gedankenlos – auch wenn das nicht so gemeint ist.',
                lösung: 'Verpacke schön, oder erkläre in einer Notiz, warum du diesen Duft wählst.'
              },
              {
                fehler: 'Einen Online-Duft kaufen, ohne die Grösse zu prüfen',
                resultat: 'Zu kleine Flasche → wirkt nicht wie ein echtes Geschenk. Zu grosse → kann nicht verwendet werden.',
                lösung: 'Kaufe 30–50ml für ein \"echtes\" Geschenk. 5–10ml ist zu klein.'
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
                  ❌ {item.fehler}
                </h3>
                <p style={{ color: '#6b5344', fontSize: '0.9rem', marginBottom: '0.75rem', margin: '0 0 0.75rem 0', lineHeight: 1.6 }}>
                  <strong>Das Problem:</strong> {item.resultat}
                </p>
                <p style={{ color: '#8a6a20', fontWeight: 600, fontSize: '0.9rem', margin: 0, lineHeight: 1.6 }}>
                  <strong>Die Lösung:</strong> {item.lösung}
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
            💡 Pro-Tipps für das perfekte Duft-Geschenk
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
                title: 'Die persönliche Notiz',
                tip: 'Schreib 2–3 Sätze, warum du diesen Duft gewählt hast: \"Du liebst Vanille und Wärme – dieser Duft hat beides.\" Das macht das Geschenk persönlich und zeigt Gedanken.'
              },
              {
                title: 'EdT statt EdP sparen',
                tip: 'Wenn du das Budget sparen möchtest: Kauf die EdT-Version statt EdP. Sie ist günstiger, hält immer noch gut, und die meisten lieben EdT in warmen Jahreszeiten sowieso.'
              },
              {
                title: 'Das Duft-Set-Geschenk',
                tip: 'Kauf ein Duft-Set mit Körpercreme oder Dusch-Gel dazu. Zeigt extra Gedanken, ist kompletter und wirkt hochwertiger – ohne teurer zu sein.'
              },
              {
                title: 'Der Gutschein-Smart-Move',
                tip: 'Unsicher? Gib einen Gutschein mit einem Link zu unserem Quiz (Auressa). Personalisiert, praktisch, und die Person wählt selbst. Keine Risiken.'
              },
              {
                title: 'Zeitpunkt: Nicht zu spät kaufen',
                tip: 'Duft-Geschenke brauchen Zeit zum Verschenken. Kauf nicht einen Tag vor dem Termin – versandprobleme, keine Zeit zum Verpacken.'
              },
              {
                title: 'Die Probe-Strategie',
                tip: 'Kennst die Person nicht gut? Kauf einen günstigen, beliebten Duft + einen 5ml-Tester eines teureren Dufts. Gibt mehrere Optionen zum Probieren.'
              }
            ].map((pro, idx) => (
              <div key={idx}>
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
            Bereit zum schenken?
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 700, color: '#faf7f2', marginBottom: '1rem' }}>
            Finde das perfekte Duft-Geschenk
          </h2>
          <p style={{ color: 'rgba(250,247,242,0.75)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            Mit deinem neuen Wissen wirst du ein Duft-Geschenk auswählen, das begeistert.
            Nutze unser Quiz oder stöbere durch unseren Katalog.
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
