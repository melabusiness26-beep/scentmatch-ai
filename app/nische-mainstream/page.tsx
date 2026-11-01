import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/app/Breadcrumb';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export const metadata: Metadata = {
  title: 'Nische vs. Mainstream Düfte: Unterschiede erklärt',
  description:
    'Verstehe den Unterschied zwischen Nischen-Parfums und Mainstream-Düften – Qualität, Einzigartigkeit, Preis und Verfügbarkeit.',
  alternates: { canonical: '/nische-mainstream' },
  openGraph: {
      images: ['/opengraph-image'],
    title: 'Nische vs. Mainstream Düfte | Auressa',
    description:
      'Lerne, wann Nischen-Parfums lohnen und wann Mainstream-Klassiker reichen – ein fairer Vergleich.',
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
            Grob gesagt gibt es die grossen Mainstream-Marken (Chanel, Dior, Guerlain)
            und die spezialisierten Nischen-Parfumhäuser (Heeley, L'Artisan Parfumeur, Diptyque). Welche sind besser?
            Das ist nicht einfach zu beantworten – es kommt darauf an, was du willst.
          </p>
          <p className="lead">
            Dieser Guide erklärt die Unterschiede, damit du eine informierte Wahl triffst.
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
              <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem' }}>MAINSTREAM</h3>
              <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.9rem', fontWeight: 600, color: '#2a1d12' }}>
                Grosse, bekannte Designer- und Modemarken
              </p>
              <ul style={{ margin: 0, fontSize: '0.85rem', color: '#5b4d40' }}>
                <li><strong>Marken:</strong> Chanel, Dior, Guerlain, Tom Ford, YSL, Calvin Klein, Prada</li>
                <li><strong>Distribution:</strong> Überall (Kaufhäuser, Flughafen, Online)</li>
                <li><strong>Marketing:</strong> Massive Ad-Kampagnen, Influencer, TV</li>
                <li><strong>Produktion:</strong> In grossen Stückzahlen</li>
                <li><strong>Preis:</strong> häufig ca. CHF 60–200</li>
                <li><strong>Charaktere:</strong> Auf breiten Geschmack ausgelegt</li>
              </ul>
            </div>
            <div style={{
              background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.04))',
              border: '1px solid rgba(212,175,55,0.15)',
              borderRadius: '8px',
              padding: '1.5rem'
            }}>
              <h3 style={{ margin: '0 0 1rem 0', fontSize: '0.95rem' }}>NISCHE</h3>
              <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.9rem', fontWeight: 600, color: '#2a1d12' }}>
                Spezialisierte Parfumhäuser – teils unabhängig, teils im Besitz grösserer Konzerne
              </p>
              <ul style={{ margin: 0, fontSize: '0.85rem', color: '#5b4d40' }}>
                <li><strong>Marken:</strong> Heeley, L'Artisan Parfumeur, Diptyque, Byredo</li>
                <li><strong>Distribution:</strong> Spezialisierte Shops, Online, begrenzt</li>
                <li><strong>Marketing:</strong> Meist kleinere Budgets, viel über Fachhandel & Mundpropaganda</li>
                <li><strong>Produktion:</strong> Meist in kleineren Stückzahlen</li>
                <li><strong>Preis:</strong> oft über CHF 150, nicht selten über CHF 200</li>
                <li><strong>Charaktere:</strong> Oft experimenteller und ungewöhnlicher</li>
              </ul>
            </div>
          </div>

          <h2>Direkter Vergleich: 8 wichtige Unterschiede</h2>

          <div style={{
            display: 'grid',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {[
              {
                kriterium: 'Qualität der Duftstoffe',
                mainstream: 'Solide. Fast alle modernen Parfums kombinieren natürliche und synthetische Duftstoffe – Synthetik ist Standard, kein Qualitätsmangel. Alkohol ist das übliche Lösungsmittel.',
                nische: 'Teils mit seltenen Rohstoffen oder höherer Konzentration – aber nicht automatisch. Der Preis allein sagt wenig über die Qualität.',
                urteil: 'Unentschieden – kommt auf den einzelnen Duft an'
              },
              {
                kriterium: 'Einzigartigkeit',
                mainstream: 'Weniger. Mainstream-Düfte sollen möglichst vielen gefallen. Daher ähneln sich viele untereinander.',
                nische: 'Höher. Nischen-Marken experimentieren öfter & trauen sich, unkonventionell zu sein.',
                urteil: 'Vorteil: Nische'
              },
              {
                kriterium: 'Haltbarkeit & Sillage',
                mainstream: 'Meist solide und gut wahrnehmbar – je nach Konzentration (EdT, EdP, Parfum).',
                nische: 'Sehr unterschiedlich – von hautnah und leise bis sehr kräftig.',
                urteil: 'Kommt auf den einzelnen Duft an'
              },
              {
                kriterium: 'Verfügbarkeit',
                mainstream: 'Sehr einfach. Überall verfügbar, einfach zu kaufen, breite Distribution.',
                nische: 'Eingeschränkter. Oft nur in Boutiquen, spezialisierten Shops oder online.',
                urteil: 'Vorteil: Mainstream'
              },
              {
                kriterium: 'Preis',
                mainstream: 'Häufig ca. CHF 60–200, je nach Grösse und Konzentration. Grosse Stückzahlen halten die Kosten pro Flasche tiefer.',
                nische: 'Oft deutlich teurer, nicht selten über CHF 200. Kleinere Stückzahlen und Luxus-Positionierung treiben den Preis.',
                urteil: 'Vorteil: Mainstream (günstiger)'
              },
              {
                kriterium: 'Marketing & Hype',
                mainstream: 'Gross. Werbung, Promi-Gesichter, Social-Media-Kampagnen. Der Hype ist oft Teil des Kaufs.',
                nische: 'Meist zurückhaltender. Vieles läuft über Boutiquen, Fachhandel und Mundpropaganda.',
                urteil: 'Geschmackssache'
              },
              {
                kriterium: 'Auf verschiedenen Menschen unterschiedlich',
                mainstream: 'Jeder Duft riecht auf jeder Haut etwas anders. Mainstream-Düfte sind aber auf breiten Geschmack ausgelegt und gelten als „sichere" Wahl.',
                nische: 'Ungewöhnliche Duftprofile polarisieren eher – manche lieben sie, andere gar nicht.',
                urteil: 'Vorteil: Mainstream (vorhersehbarer)'
              },
              {
                kriterium: 'Langzeitwert',
                mainstream: 'Bekannte Klassiker bleiben oft lange im Sortiment, werden aber gelegentlich neu formuliert.',
                nische: 'Variabel. Manche Nischendüfte bleiben lange erhältlich, andere werden eingestellt.',
                urteil: 'Eher Mainstream'
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
                    <strong>Mainstream:</strong> {item.mainstream}
                  </p>
                  <p style={{ margin: '0.5rem 0', paddingBottom: '0.75rem', borderBottom: '1px solid rgba(212,175,55,0.1)' }}>
                    <strong>Nische:</strong> {item.nische}
                  </p>
                  <p style={{ margin: '0.5rem 0 0 0', fontStyle: 'italic', color: '#d4af37', fontWeight: 600 }}>
                    {item.urteil}
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
                beschreibung: 'Holzig-aromatischer Herrenduft von Chanel (2010). Sehr bekannt und fast überall erhältlich.'
              },
              {
                duft: 'Heeley Sel Marin',
                typ: 'Nische',
                beschreibung: 'Salzig-maritimer Duft des Nischenhauses Heeley. Eher leise und eigenwillig, vor allem im Fachhandel oder online erhältlich.'
              },
              {
                duft: 'Tom Ford Black Orchid',
                typ: 'Mainstream Luxury',
                beschreibung: 'Dunkel, blumig und süss-würzig (2006), heute oft unisex getragen. Breit im Handel erhältlich, eher in der oberen Preisklasse.'
              },
              {
                duft: 'Diptyque Philosykos',
                typ: 'Nische',
                beschreibung: 'Grüner Feigen-Duft mit Feigenblatt und Holz. Ungewöhnlich und eher leise, vor allem in Boutiquen und spezialisierten Shops erhältlich.'
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
            <li>Einen gut wahrnehmbaren Duft ohne grosses Risiko möchtest</li>
            <li>Einfache Verfügbarkeit brauchst (fast überall erhältlich)</li>
            <li>Ein begrenztes Budget hast</li>
            <li>Einen Klassiker magst, der zeitlos bleibt</li>
            <li>Nicht so experimentierfreudig bist</li>
          </ul>

          <h3>Wähle NISCHE, wenn du...</h3>
          <ul style={{ marginBottom: '2rem' }}>
            <li>Einen ungewöhnlichen Duft abseits des Mainstreams willst</li>
            <li>Bereit bist, für Seltenheit und ungewöhnliche Ideen mehr zu zahlen</li>
            <li>Experimentierfreudig & abenteuerlustig bist</li>
            <li>Kleinere Parfumhäuser unterstützen willst</li>
            <li>Weniger Massen-Marketing magst</li>
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
              <strong>Unser Tipp: Mix</strong>
            </p>
            <p style={{ margin: 0, color: '#6b5344', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Eine mögliche Sammlung: 1–2 Mainstream-Klassiker (z. B. Bleu de Chanel, Dior Sauvage) als sichere Wahl + 1–2 Nischendüfte
              (z. B. von Heeley oder Diptyque) für Abenteuer. So hast du Sicherheit & Einzigartigkeit. Der beste Duft ist nicht unbedingt
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
                antwort: 'Nein. Besser ist subjektiv. Nischendüfte haben andere Stärken (Eigenständigkeit, ungewöhnliche Ideen), aber nicht automatisch bessere Qualität. Ein Mainstream-Duft kann besser zu DIR passen.'
              },
              {
                frage: 'Sind Mainstream-Düfte immer schlechter?',
                antwort: 'Nein. Mainstream-Klassiker wie Bleu de Chanel oder Dior Sauvage sind sehr beliebt und für viele eine sichere Wahl. Grosse Häuser arbeiten mit erfahrenen Parfümeur:innen – das ist keine schlechte Sache.'
              },
              {
                frage: 'Warum sind Niche-Düfte so teuer?',
                antwort: 'Kleinere Stückzahlen bedeuten höhere Kosten pro Flasche; dazu kommen teils seltene Rohstoffe, eigene Boutiquen und die Positionierung als Luxusprodukt. Ein Teil des Preises sind echte Kosten, ein Teil ist Marke.'
              },
              {
                frage: 'Sollte ich einen Niche-Duft kaufen, wenn ich ein Budget habe?',
                antwort: 'Nicht unbedingt. Mainstream-Düfte (oft als EdT) sind meist günstiger und eine sichere Wahl. Wenn dich Nische reizt, teste zuerst eine Probe, bevor du eine ganze Flasche kaufst.'
              },
              {
                frage: 'Sind beliebte Mainstream-Düfte besser, nur weil alle sie tragen?',
                antwort: 'Nicht unbedingt. Mainstream-Düfte sind oft beliebt, weil sie vielen gefallen. Aber beliebt ≠ beste für dich. Dein idealer Duft kann ein unbekannter sein.'
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
              Finde deinen idealen Duft: Mainstream oder Nische?
            </p>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#5b4d40' }}>
              Nutze <Link href="/quiz" style={{ color: '#d4af37', fontWeight: 600, textDecoration: 'none' }}>das Auressa-Quiz</Link> als
              Startpunkt und probiere dann BEIDE Kategorien selbst aus. Manchmal liebt man einen Mainstream-Klassiker, manchmal einen unbekannten Nischenduft.
              Am meisten lernst du durch Ausprobieren.
            </p>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(212,175,55,0.2)', margin: '3rem 0' }} />

          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ marginTop: 0 }}>Weitere Ratgeber zum Thema Duftauswahl</h3>
            <ul style={{ fontSize: '0.95rem', lineHeight: 1.8 }}>
              <li><Link href="/ratgeber/parfum-fuer-einsteiger-erster-signature-duft" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Duft wählen – Anleitung</Link> – Systematischer Leitfaden für die perfekte Duftauswahl</li>
              <li><Link href="/duftsammlung" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Duftsammlung aufbauen</Link> – Strategien zum Aufbau einer Sammlung (Mix aus Mainstream & Nische)</li>
              <li><Link href="/ratgeber/guenstige-alternativen-zu-teuren-dueften" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Günstige Duft-Alternativen</Link> – Budget-Optionen bei Mainstream-Düften</li>
              <li><Link href="/beste-herrenduefte" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Herren-Parfüme</Link> – Männer-Klassiker (oft Mainstream)</li>
              <li><Link href="/beste-damenduefte" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Damen-Parfüme</Link> – Frauen-Klassiker mit Mix aus Mainstream & Niche</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
