import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/app/Breadcrumb';

export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export const metadata: Metadata = {
  title: 'Duft-Mythen und Fakten: Was stimmt wirklich?',
  description:
    'Wir prüfen die 20 häufigsten Duft-Mythen: Warum teure Düfte nicht automatisch besser sind, ob du abhängig wirst, wie deine Nase funktioniert und mehr.',
  alternates: { canonical: `${SITE_URL}/duft-mythen` },
  openGraph: {
      images: ['/opengraph-image'],
    title: 'Duft-Mythen und Fakten | Auressa',
    description: 'Die Wahrheit über Parfums: Teure Düfte, Duft-Abhängigkeit, Haltbarkeit und mehr – wissenschaftlich erklärt.',
    type: 'website',
    url: `${SITE_URL}/duft-mythen`,
  },
};

export default function FragranceMythsPage() {
  return (
    <main style={{ backgroundColor: '#faf7f2' }}>
      <Breadcrumb items={[{ label: 'Duft-Mythen', href: '/duft-mythen' }]} />

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
            Wissen & Klarheit
          </p>
          <h1 style={{
            fontSize: 'clamp(28px, 6vw, 48px)',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            marginBottom: '1.5rem',
            lineHeight: 1.15,
            color: '#faf7f2',
          }}>
            Duft-Mythen und Fakten – Was stimmt wirklich?
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(250,247,242,0.8)', margin: 0 }}>
            Wir prüfen die 20 häufigsten Mythen über Parfum – von Duft-Abhängigkeit bis zur „Teuer = Besser"-Lüge.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 1.25rem' }}>

        {/* Intro */}
        <section style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4a3020', marginBottom: '1.5rem' }}>
            Die Duftindustrie ist voll von Mythen und Halbwahrheiten. Manche entstehen durch Marketingversprechen,
            andere durch schlicht falsche Informationen. In dieser umfassenden Liste entlarven wir die 20 häufigsten
            Duft-Mythen – mit wissenschaftlichen Fakten und praktischen Konsequenzen für dich.
          </p>
        </section>

        {/* Mythen */}
        <section style={{ marginBottom: '3rem' }}>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {[
              {
                myth: '💰 Mythos: Teure Düfte sind immer besser als günstige',
                fact: 'FALSCH. Der Preis hängt von Marketing, Verpackung und Marke ab – nicht von der Duftqualität. Ein 20-Franken-Duft von Lattafa kann genauso gut riechen wie ein CHF 150 Designer-Duft.',
                praktisch: 'Kaufe nach Duftprofil und Haltbarkeit, nicht nach Preis. Viele günstige Dufthäuser machen hervorragende Qualität.'
              },
              {
                myth: '👃 Mythos: Du wirst „abhängig" von deinem Lieblingsduft',
                fact: 'FALSCH (aber verständlich). Das, was du erlebst, heisst Duftgewöhnung (Fachwort: olfaktorische Adaptation) – deine Nase gewöhnt sich an konstante Reize. Das ist biologisch normal, nicht Abhängigkeit. Andere riechen deinen Duft weiterhin deutlich.',
                praktisch: 'Wechsle gelegentlich deine Düfte oder mache Duft-Pausen. Schon nach kurzer Zeit an frischer Luft oder ohne den Duft riechst du ihn wieder deutlicher.'
              },
              {
                myth: '🔬 Mythos: Alle Düfte enthalten schädliche Chemikalien',
                fact: 'FALSCH. Düfte bestehen aus natürlichen und synthetischen Duftstoffen – manche synthetischen Duftstoffe sind naturidentisch. In üblichen Mengen sind Düfte für die meisten gut verträglich. Bekannte allergene Duftstoffe müssen in der EU ab bestimmten Mengen auf der Verpackung angegeben werden.',
                praktisch: 'Natürliche Düfte sind nicht automatisch besser oder sicherer als synthetische. Vermeide jedoch Düfte mit reizenden Zusätzen – teste auf Allergien.'
              },
              {
                myth: '⏰ Mythos: Teure Düfte halten automatisch länger',
                fact: 'FALSCH. Die Haltbarkeit hängt von der Duftkonzentration (EdP vs EdT) ab, nicht vom Preis. Ein billiges EdP hält länger als ein teures EdT. Auch Körperchemie spielt eine Rolle – manche Menschen halten Düfte länger.',
                praktisch: 'Achte auf die Konzentration (Extrait > EdP > EdT > Cologne), nicht auf den Preis. Teste die Haltbarkeit, bevor du kaufst.'
              },
              {
                myth: '👃 Mythos: Wenn du deinen Duft nicht mehr riechen kannst, ist er leer',
                fact: 'FALSCH. Das ist wieder die Duftgewöhnung. Deine Nase ist gewöhnt – andere riechen ihn deutlich. Mach eine Duft-Pause für ein paar Stunden und du riechst ihn wieder.',
                praktisch: 'Bitte einen Freund, zu sagen, ob er/sie dich noch riecht. Das ist der beste Test – nicht deine eigene Nase.'
              },
              {
                myth: '🚿 Mythos: Duft vor dem Duschen auftragen ist besser',
                fact: 'FALSCH. Duft NACH dem Duschen auftragen ist besser. Saubere, gut gepflegte Haut ist ideal – sie hilft, dass der Duft besser hält. Vor dem Duschen aufgetragen wird er einfach abgewaschen.',
                praktisch: 'Immer nach dem Duschen auftragen – auf saubere, eingecremte Haut.'
              },
              {
                myth: '🧴 Mythos: Duft in den Haaren auftragen ist schlecht',
                fact: 'FALSCH (aber mit Bedacht). Haare sind ideal für schwache Düfte – sie verlängern die Duftentwicklung. Aber: Nur leicht sprühen (1–2 Sprühstösse max), da manche Düfte Haare austrocknen können. Auch Schweiss + Duft in den Haaren kann unangenehm werden.',
                praktisch: 'Sprüh leicht ins Haar am Haaransatz, nicht direkt in die Strähnen. Trockenöl danach hilft gegen Austrocknung.'
              },
              {
                myth: '❄️ Mythos: Duftlagerung im Kühlschrank ist besser',
                fact: 'FALSCH. Wichtig ist: kühl, dunkel und ohne Temperaturschwankungen lagern. Ein dunkler Schrank reicht – der Kühlschrank ist nicht nötig.',
                praktisch: 'Lagere Düfte an einem dunklen, kühlen Ort ohne Temperaturschwankungen – der Kühlschrank ist nicht nötig, die sonnige Fensterbank aber tabu.'
              },
              {
                myth: '🔄 Mythos: Du solltest einen Duft reiben, nachdem du ihn aufgetragen hast',
                fact: 'FALSCH. Reiben erwärmt die Haut, dadurch verfliegen die Top-Noten schneller. Sanftes Übereinander-Legen der Unterarme ist ok – aber NICHT reiben.',
                praktisch: 'Nach dem Auftragen: Hände weg. Lass den Duft verdunsten. Höchstens sanft die inneren Unterarme zusammenbringen.'
              },
              {
                myth: '🌡️ Mythos: Körpertemperatur und Körperchemie spielen keine Rolle',
                fact: 'FALSCH. Wärme lässt Duftstoffe schneller verdunsten – auf warmer Haut wirkt ein Duft oft intensiver. Auch Körperchemie (pH, Schweiss, Hormone) beeinflusst, wie ein Duft an dir riecht. Zwei Menschen riechen den gleichen Duft unterschiedlich.',
                praktisch: 'Teste Düfte immer an deiner Haut, nicht aus dem Tester im Geschäft. Deine Körperwärme ändert alles.'
              },
              {
                myth: '👗 Mythos: Duft auf die Kleidung sprühen ist besser als auf die Haut',
                fact: 'FALSCH (aber optional). Auf der Haut wirkt der Duft mit deiner Körperwärme und Körperchemie – das ist die beste Art. Auf Kleidung hält der Duft oft sogar länger, vermischt sich aber nicht mit dir – und kann empfindliche Stoffe verfärben. Nur für Stoff-Liebhaber: leicht auf Kleidung sprühen als ZUSATZ, nicht Ersatz.',
                praktisch: 'Immer zuerst auf der Haut auftragen. Nur leicht auf Kleidung, wenn du einen Hauch-Effekt magst.'
              },
              {
                myth: '🚭 Mythos: Starke Raucher riechen Düfte schlechter',
                fact: 'WAHR. Starker Raucher-Konsum beeinträchtigt den Geruchssinn. Raucher nehmen Düfte deshalb oft schwächer wahr als andere.',
                praktisch: 'Starke Raucher: teste Düfte mit jemandem, der nicht raucht – deine Wahrnehmung ist verzerrt.'
              },
              {
                myth: '💄 Mythos: Frauen-Düfte riechen besser bei Frauen, Herren-Düfte bei Herren',
                fact: 'FALSCH. Das ist reine Vermarktung. Viele „Herren-Düfte" riechen grossartig an Frauen, und umgekehrt. Deine Körperchemie spielt die Rolle, nicht dein Geschlecht. Unisex-Kategorisierung ist am sinnvollsten.',
                praktisch: 'Ignoriere die Gender-Labels. Wenn dir ein Duft gefällt, trag ihn – unabhängig vom Marketing-Label.'
              },
              {
                myth: '🎯 Mythos: Premium-Marken testen ihre Düfte länger',
                fact: 'FALSCH. Alle etablierten Duft-Hersteller (günstig oder teuer) testen ihre Formeln ausgiebig. Die Testingdauer ist ähnlich. Der Unterschied ist eher in der Stabilität der Formeln bei Lagerung – nicht bei der Sicherheit.',
                praktisch: 'Vertrau auf etablierte Marken mit guten Reviews – egal ob teuer oder günstig. Testing ist Standard.'
              },
              {
                myth: '🌍 Mythos: Düfte riechen überall auf der Welt gleich',
                fact: 'FALSCH (und interessant). Düfte riechen anders je nach Klima, Luftfeuchtigkeit und Umgebungstemperatur. Ein warmes Klima verstärkt Duftintensität. Luftfeuchtigkeit beeinflusst die Duftentwicklung. Auch kulturelle Vorlieben spielen eine Rolle.',
                praktisch: 'Kauf Düfte nicht online aus einem anderen Land – teste sie lokal, um dich an dein Klima anzupassen.'
              },
              {
                myth: '⏳ Mythos: Düfte verfallen nach einem Jahr',
                fact: 'FALSCH. Richtig gelagerte Düfte halten oft mehrere Jahre. Verfärbung oder Geruchsveränderung geschieht langsam. Das Symbol mit dem offenen Tiegel (z. B. „36M“) ist für die meisten Kosmetika in der EU vorgeschrieben und gibt an, wie lange ein Produkt nach dem Öffnen verwendet werden kann – ein Richtwert, der bei guter Lagerung oft übertroffen wird.',
                praktisch: 'Fühl dich nicht pressured, Düfte schnell aufzubrauchen. Mit guter Lagerung hast du Jahre Zeit.'
              },
              {
                myth: '🧪 Mythos: Synthetische Duftöle riechen „künstlich" und schlecht',
                fact: 'FALSCH. Manche synthetischen Duftstoffe sind naturidentisch – also das gleiche Molekül wie in der Natur. Die Qualität liegt im Duftdesign, nicht im Ursprung.',
                praktisch: 'Konzentriere dich auf die Duftqualität und Haltbarkeit, nicht darauf, ob sie natürlich oder synthetisch sind.'
              },
              {
                myth: '🔒 Mythos: Teuer = Exklusiv und nur für Reiche',
                fact: 'FALSCH. Viele grossartige Düfte kosten CHF 20–50. Exklusivität kommt von Qualität und Design, nicht vom Preis. Ausserdem helfen Ratgeber und Quiz (wie bei Auressa!), den passenden Duft zu finden – unabhängig von der Preisklasse.',
                praktisch: 'Suche nach deinem persönlichen Match, nicht nach Prestige. Der beste Duft ist derjenige, der an DIR grossartig riecht.'
              },
              {
                myth: '📱 Mythos: Online-Bewertungen sind alle echt',
                fact: 'VORSICHT. Manche Reviews sind gefälscht (von Konkurrenten oder Duft-Häusern). Achte auf Konkretheit – „riecht süss" ist weniger aussagekräftig als „erinnert an Vanille und Karamell mit feuchtem Holz-Ausklang". Verified-Purchase ist ein gutes Zeichen.',
                praktisch: 'Lese lange, detaillierte Reviews von Verified Purchases. Kurze, vage Reviews ignorieren.'
              },
              {
                myth: '🎁 Mythos: Je teuer das Geschenk-Set, desto überraschter ist der Empfänger',
                fact: 'FALSCH. Das beste Duft-Geschenk ist eines, das zur beschenkten Person passt – unabhängig von Preis. Ein günstiger, perfekt gewählter Duft freut mehr als ein teurer, falscher. Personalisierung schlägt Prestige.',
                praktisch: 'Nutze Quiz und Ratgeber (wie Auressa!), um einen perfekten Duft zu finden – egal welche Preisklasse. Das macht das beste Geschenk.'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: '#fff',
                  border: '2px solid rgba(212,175,55,0.15)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  overflow: 'hidden',
                }}
              >
                <h3 style={{ color: '#2a1d12', fontWeight: 700, marginBottom: '0.75rem', fontSize: '1.05rem' }}>
                  {item.myth}
                </h3>
                <div style={{ display: 'grid', gap: '0.75rem', fontSize: '0.95rem', color: '#6b5344', lineHeight: 1.6 }}>
                  <p style={{ margin: 0, paddingBottom: '0.75rem', borderBottom: '1px solid rgba(212,175,55,0.1)' }}>
                    <strong style={{ color: '#d4af37' }}>Die Wahrheit:</strong> {item.fact}
                  </p>
                  <p style={{ margin: 0, color: '#8a6a20', fontWeight: 600 }}>
                    <strong>Praktisch für dich:</strong> {item.praktisch}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Zusammenfassung */}
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
            📌 Die 5 wichtigsten Erkenntnisse
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
                num: 1,
                point: 'Preis ≠ Qualität. Ein günstiger Duft kann genauso gut riechen wie ein teurer. Achte auf Duftprofil und Haltbarkeit.',
              },
              {
                num: 2,
                point: 'Deine Nase gewöhnt sich – das ist nicht „Abhängigkeit", das ist Biologie. Andere riechen deinen Duft weiterhin.',
              },
              {
                num: 3,
                point: 'Richtige Lagerung und Anwendung helfen jedem Duft. Technik spielt eine grosse Rolle.',
              },
              {
                num: 4,
                point: 'Vertrau deiner Körperchemie und deinem persönlichen Geschmack, nicht Marketing-Labels oder Genderisierung.',
              },
              {
                num: 5,
                point: 'Der beste Duft ist nicht der teuerste – es ist der, der an DIR am besten riecht. Finde IHN mit dem Auressa-Quiz.',
              }
            ].map((item) => (
              <div key={item.num} style={{ display: 'flex', gap: '1rem' }}>
                <div
                  style={{
                    minWidth: '32px',
                    width: '32px',
                    height: '32px',
                    background: '#d4af37',
                    color: '#2a1d12',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '1rem',
                    flexShrink: 0,
                  }}
                >
                  {item.num}
                </div>
                <p style={{ fontSize: '0.95rem', color: '#2a1d12', margin: 0, lineHeight: 1.6 }}>
                  {item.point}
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
            Mythen durchschaut?
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 700, color: '#faf7f2', marginBottom: '1rem' }}>
            Finde jetzt DEINEN perfekten Duft
          </h2>
          <p style={{ color: 'rgba(250,247,242,0.75)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            Mit deinem neuen Wissen: Ignoriere Marketingmythen und wähle basierend auf DEINEM Geschmack,
            deinem Budget und deiner Körperchemie. Das ist die Formel für Erfolg.
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
