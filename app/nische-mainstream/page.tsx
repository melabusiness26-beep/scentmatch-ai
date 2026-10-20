import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/app/Breadcrumb';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export const metadata: Metadata = {
  title: 'Nische vs. Mainstream Düfte: Unterschiede erklärt',
  description:
    'Verstehe den Unterschied zwischen Niche-Parfümen und Mainstream-Düften – Qualität, Einzigartigkeit, Preis und Verfügbarkeit.',
  alternates: { canonical: '/nische-mainstream' },
  openGraph: {
    title: 'Nische vs. Mainstream Düfte | Auressa',
    description:
      'Lerne, wann Niche-Parfüme lohnen und wann Mainstream-Klassiker reichen – ein fairer Vergleich.',
    type: 'website',
    url: `${SITE_URL}/nische-mainstream`
  }
};

export default function NischeMainstreamPage() {
  return (
    <main>
      <Breadcrumb items={[{ label: 'Nische vs. Mainstream', href: '/nische-mainstream' }]} />
      <div className="container">
        <section className="section">
          <p className="eyebrow">Wissen</p>
          <h1 className="detail-title">Nische vs. Mainstream Düfte</h1>
          <p className="lead">
            Der Duft-Markt ist aufgeteilt: Es gibt die großen Mainstream-Marken (Chanel, Dior, Guerlain)
            und die kleineren Nische-Perfumiers (Heeley, Maison Margiela, L'Artisan). Welcher ist besser?
            Das ist nicht einfach zu beantworten – es kommt darauf an, was du willst.
          </p>
          <p className="lead">
            Dieser Guide erklärt die Unterschiede, damit du eine informierte Wahl treffst.
          </p>

          <h2>Was ist Mainstream? Was ist Nische?</h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.04))',
              border: '1px solid rgba(212,175,55,0.15)',
              borderRadius: '8px',
              padding: '1.5rem'
            }}>
              <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem' }}>📊 MAINSTREAM</h3>
              <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.9rem', fontWeight: 600, color: '#2a1d12' }}>
                Große, bekannte Luxus-Marken
              </p>
              <ul style={{ margin: 0, fontSize: '0.85rem', color: '#5b4d40' }}>
                <li><strong>Marken:</strong> Chanel, Dior, Guerlain, Tom Ford, YSL, Calvin Klein, Prada</li>
                <li><strong>Distribution:</strong> Überall (Kaufhäuser, Flughafen, Online)</li>
                <li><strong>Marketing:</strong> Massive Ad-Kampagnen, Influencer, TV</li>
                <li><strong>Produktion:</strong> In Massenmengen, oft mit kleineren Labs</li>
                <li><strong>Preis:</strong> €60–200 (Standard)</li>
                <li><strong>Charaktere:</strong> Breit designt, mainstream Appeal</li>
              </ul>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.04))',
              border: '1px solid rgba(212,175,55,0.15)',
              borderRadius: '8px',
              padding: '1.5rem'
            }}>
              <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem' }}>🎨 NISCHE</h3>
              <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.9rem', fontWeight: 600, color: '#2a1d12' }}>
                Kleine, unabhängige Perfumeries
              </p>
              <ul style={{ margin: 0, fontSize: '0.85rem', color: '#5b4d40' }}>
                <li><strong>Marken:</strong> Heeley, Maison Margiela, L'Artisan Parfumeur, Diptyque, Byredo</li>
                <li><strong>Distribution:</strong> Spezialisierte Shops, Online, begrenzt</li>
                <li><strong>Marketing:</strong> Wenig oder gar nicht, Niche-Community</li>
                <li><strong>Produktion:</strong> In kleinen Mengen, oft von Hand</li>
                <li><strong>Preis:</strong> €80–250 (oft höher, aber qualitätsberechtigt)</li>
                <li><strong>Charaktere:</strong> Experimentell, künstlerisch, unkonventionell</li>
              </ul>
            </div>
          </div>

          <h2>Direkt Vergleich: 8 wichtige Unterschiede</h2>

          <div style={{
            display: 'grid',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {[
              {
                kriterium: 'Qualität der Duftstoffe',
                mainstream: 'Gut. Aber oft mit synthetischen Füllstoffen & Alkohol gestreckt, um Kosten zu sparen.',
                nische: 'Oft besser. Kleinere Marken nutzen hochwertigere ätherische Öle & natürliche Ingredienzien. Weniger Alkohol.',
                urteil: 'Vorteil: Nische'
              },
              {
                kriterium: 'Einzigartigkeit',
                mainstream: 'Weniger. Mainstream-Düfte sind designt, um großen Appeal zu haben. Daher sind sie ähnlicher untereinander.',
                nische: 'Höher. Nische-Marken experimentieren & trauen sich unkonventionell zu sein. Jeder Duft ist eigenwillig.',
                urteil: 'Vorteil: Nische'
              },
              {
                kriterium: 'Haltbarkeit & Sillage',
                mainstream: 'Exzellent. Diese Düfte sind designt, um 8+ Stunden zu halten & deutlich zu riechen.',
                nische: 'Variabel. Manche halten 8+ Stunden, manche nur 4–6. Dafür sind sie subtiler & eleganter.',
                urteil: 'Vorteil: Mainstream'
              },
              {
                kriterium: 'Verfügbarkeit',
                mainstream: 'Sehr einfach. Überall verfügbar, einfach zu kaufen, breite Distribution.',
                nische: 'Schwierig. Nur in spezialiserten Shops, oft online. Begrenzte Verfügbarkeit.',
                urteil: 'Vorteil: Mainstream'
              },
              {
                kriterium: 'Preis',
                mainstream: '€60–200 (meist €80–150). Massenproduktes, daher günstiger trotz großer Marken.',
                nische: 'Often €100–250+. Kleinere Mengen, hochwertigere Zutaten, höhere Kosten.',
                urteil: 'Vorteil: Mainstream (günstiger)'
              },
              {
                kriterium: 'Marketing & Hype',
                mainstream: 'Masiv. Ads überall, Celebrity-Endorsements, Social Media Kampagnen. Das Hype ist Teil des Kaufs.',
                nische: 'Minimal. Oft kaum Marketing, Wachstum durch Word-of-Mouth & Nische-Community.',
                urteil: 'Vorteil: Nische (authentischer)'
              },
              {
                kriterium: 'Auf verschiedenen Menschen unterschiedlich',
                mainstream: 'Weniger. Diese Düfte sind designt, auf den meisten Menschen „gut" zu riechen. Wenig Überraschungen.',
                nische: 'Mehr. Niche-Düfte können auf verschiedenen Menschen SEHR unterschiedlich wirken. Das ist Part des Charakters.',
                urteil: 'Vorteil: Mainstream (vorhersehbarer)'
              },
              {
                kriterium: 'Langzeitwert',
                mainstream: 'Gut. Der Duft bleibt beliebt, ist leicht zu resell, altert nicht.',
                nische: 'Variabel. Manche niche Düfte werden Klassiker (Heeley), andere verschwinden.',
                urteil: 'Vorteil: Mainstream'
              }
            ].map((item, i) => (
              <div key={i} style={{
                background: 'linear-gradient(135deg, rgba(212,175,55,0.05), rgba(212,175,55,0.02))',
                border: '1px solid rgba(212,175,55,0.1)',
                borderRadius: '8px',
                padding: '1.25rem'
              }}>
                <h4 style={{ margin: '0 0 0.75rem 0', fontSize: '0.95rem', color: '#2a1d12' }}>
                  {item.kriterium}
                </h4>
                <div style={{ fontSize: '0.85rem', color: '#5b4d40' }}>
                  <p style={{ margin: '0.5rem 0' }}>
                    <strong>📊 Mainstream:</strong> {item.mainstream}
                  </p>
                  <p style={{ margin: '0.5rem 0', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(212,175,55,0.1)' }}>
                    <strong>🎨 Nische:</strong> {item.nische}
                  </p>
                  <p style={{ margin: '0.5rem 0 0 0', fontStyle: 'italic', color: '#d4af37', fontWeight: 600 }}>
                    👉 {item.urteil}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <h2>Konkrete Beispiele: Mainstream vs. Nische</h2>

          <div style={{
            display: 'grid',
            gap: '1.2rem',
            marginBottom: '2rem'
          }}>
            {[
              {
                duft: 'Bleu de Chanel',
                typ: 'Mainstream',
                beschreibung: 'Der Klassiker. Auf jeder Haut großartig. 8+ Stunden. Überall verfügbar. €120.'
              },
              {
                duft: 'Heeley Sel Marin',
                typ: 'Nische',
                beschreibung: 'Marine, subtil, artistisch. Auf manchen Haut GRANDIOS, auf anderen ok. 5–6 Stunden. Schwer zu finden. €150. Aber einzigartig.'
              },
              {
                duft: 'Tom Ford Black Orchid',
                typ: 'Mainstream Luxury',
                beschreibung: 'Maskulin-sinnlich. 9+ Stunden. Überall verfügbar. €180. Jeder kennt ihn.'
              },
              {
                duft: 'Maison Margiela Replica Beach Walk',
                typ: 'Nische',
                beschreibung: 'Unkonventionell, wie ein Strandspaziergag. Auf dir anders. 5–7 Stunden. Spezialisierte Shops. €120. Einzigartig.'
              }
            ].map((item, i) => (
              <div key={i} style={{
                background: item.typ === 'Mainstream' || item.typ === 'Mainstream Luxury'
                  ? 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.04))'
                  : 'linear-gradient(135deg, rgba(150,100,200,0.08), rgba(150,100,200,0.04))',
                border: item.typ === 'Mainstream' || item.typ === 'Mainstream Luxury'
                  ? '1px solid rgba(212,175,55,0.15)'
                  : '1px solid rgba(150,100,200,0.15)',
                borderRadius: '8px',
                padding: '1.25rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                  <h4 style={{ margin: 0, fontSize: '0.95rem' }}>{item.duft}</h4>
                  <span style={{
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    padding: '0.25rem 0.75rem',
                    borderRadius: '12px',
                    background: item.typ === 'Mainstream' || item.typ === 'Mainstream Luxury' ? '#d4af37' : '#9664c8',
                    color: 'white'
                  }}>
                    {item.typ}
                  </span>
                </div>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#5b4d40', lineHeight: 1.6 }}>
                  {item.beschreibung}
                </p>
              </div>
            ))}
          </div>

          <h2>Wann Mainstream? Wann Nische?</h2>

          <h3>Wähle MAINSTREAM, wenn du...</h3>
          <ul style={{ marginBottom: '2rem' }}>
            <li>Einen zuverlässigen, vielseitigen Duft willst, der auf dir gut wirkt</li>
            <li>Maximale Haltbarkeit & Sillage möchtest (8+ Stunden)</li>
            <li>Einfache Verfügbarkeit brauchst (kaufen überall)</li>
            <li>Ein Budget hast & Qualität für Geld willst</li>
            <li>Einen Klassiker magst, der zeitlos bleibt</li>
            <li>Nicht experimentierfreudest bist</li>
          </ul>

          <h3>Wähle NISCHE, wenn du...</h3>
          <ul style={{ marginBottom: '2rem' }}>
            <li>Ein einzigartiges, nicht-mainstream Duft willst</li>
            <li>Bereit bist, für höhere Qualität mehr zu zahlen</li>
            <li>Experimentierfreudest & abenteuerlustig bist</li>
            <li>Die Nische-Community & Artists unterstützen willst</li>
            <li>Weniger Hype & mehr Authentizität magst</li>
            <li>Akzeptierst, dass Verfügbarkeit begrenzt ist</li>
          </ul>

          <div style={{
            background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.04))',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '2rem'
          }}>
            <p style={{ margin: '0 0 0.75rem 0', color: '#2a1d12', fontWeight: 600 }}>
              🎯 <strong>Die beste Strategie: Mix</strong>
            </p>
            <p style={{ margin: 0, color: '#6b5344', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Ideale Sammlung: 1–2 Mainstream-Klassiker (Bleu de Chanel, Dior Sauvage) für Zuverlässigkeit + 1–2 Niche-Düfte
              (Heeley, Maison Margiela) für Abenteuer. So hast du Sicherheit & Einzigartigkeit. Der beste Duft ist nicht unbedingt
              der teuerste oder der einzigartigste – es ist der, den du liebst.
            </p>
          </div>

          <h2>FAQ: Nische vs. Mainstream</h2>

          <div style={{
            display: 'grid',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            {[
              {
                frage: 'Sind Niche-Düfte immer besser?',
                antwort: 'Nein. Besser ist subjektiv. Niche-Düfte haben andere Qualitäten (Einzigartigkeit, Künstlerischer), aber nicht unbedingt bessere Qualität. Ein großartiger Mainstream-Duft kann besser für DICH sein.'
              },
              {
                frage: 'Sind Mainstream-Düfte immer schlechter?',
                antwort: 'Nein. Mainstream-Klassiker wie Bleu de Chanel oder Dior Sauvage sind großartig. Große Marken haben perfektionierte ihre Formulierungen über Jahrzehnte. Das ist keine schlechte Sache.'
              },
              {
                frage: 'Warum sind Niche-Düfte so teuer?',
                antwort: 'Weil: kleinere Produktion, höherer Overhead, keine Massenproduktion, hochwertigere Zutaten, kein großes Marketing-Budget. Die Kosten sind real, nicht nur Hype.'
              },
              {
                frage: 'Sollte ich einen Niche-Duft kaufen, wenn ich ein Budget habe?',
                antwort: 'Nein. Mainstream-EdT-Versionen sind günstiger & auf den meisten Haut bessere Wahl. Niche ist für wenn du: experimentieren, einzigartig sein, oder LIEBE Parfümerie-Kunst willst.'
              },
              {
                frage: 'Sind beliebte Mainstream-Düfte besser, nur weil alle sie tragen?',
                antwort: 'Nicht unbedingt. Mainstream-Düfte sind beliebt, WEIL sie gut funktionieren & vielen gefallen. Aber beliebt ≠ beste. Dein idealer Duft kann ein unbekannter sein.'
              }
            ].map((qa, i) => (
              <div key={i}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem' }}>{qa.frage}</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#5b4d40', lineHeight: 1.6 }}>{qa.antwort}</p>
              </div>
            ))}
          </div>

          <div style={{
            background: '#f0e6d2',
            borderLeft: '4px solid #d4af37',
            padding: '1.5rem',
            borderRadius: '0 8px 8px 0',
            marginBottom: '2rem'
          }}>
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 600, color: '#2a1d12' }}>
              🔍 Finde deinen idealen Duft: Mainstream oder Nische?
            </p>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#5b4d40' }}>
              Nutze <Link href="/#quiz" style={{ color: '#d4af37', fontWeight: 600, textDecoration: 'none' }}>das Auressa-Quiz</Link> und
              teste BEIDE Kategorien. Manchmal liebt man einen Mainstream-Klassiker, manchmal einen unbekannten Niche-Duft.
              Die beste Strategie ist zu experimentieren & zu entdecken, nicht zu urteilen.
            </p>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(212,175,55,0.2)', margin: '3rem 0' }} />

          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ marginTop: 0 }}>Weitere Ratgeber zum Thema Duftauswahl</h3>
            <ul style={{ fontSize: '0.95rem', lineHeight: 1.8 }}>
              <li><Link href="/duft-waehlen" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Duft wählen – Anleitung</Link> – Systematischer Leitfaden für die perfekte Duftauswahl</li>
              <li><Link href="/duftsammlung" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Duftsammlung aufbauen</Link> – Strategien zum Aufbau einer Sammlung (Mix aus Mainstream & Nische)</li>
              <li><Link href="/guenstige-alternativen" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Günstige Duft-Alternativen</Link> – Budget-Optionen bei Mainstream-Düften</li>
              <li><Link href="/herren-parfueme" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Herren-Parfüme</Link> – Männer-Klassiker (oft Mainstream)</li>
              <li><Link href="/damen-parfueme" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Damen-Parfüme</Link> – Frauen-Klassiker mit Mix aus Mainstream & Niche</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
