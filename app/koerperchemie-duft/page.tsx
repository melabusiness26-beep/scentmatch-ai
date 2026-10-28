import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/app/Breadcrumb';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export const metadata: Metadata = {
  title: 'Körperchemie & Duft: Warum ein Parfum auf dir anders riecht',
  description:
    'Verstehe, wie Körperchemie, pH-Wert, Hauttyp und Hormonzyklus beeinflussen, wie ein Duft auf dir riecht – und warum der gleiche Duft auf unterschiedlichen Menschen unterschiedlich wirkt.',
  alternates: { canonical: '/koerperchemie-duft' },
  openGraph: {
    title: 'Körperchemie & Duft | Auressa',
    description:
      'Wie Körperchemie und Hauttyp beeinflussen, wie Düfte auf dir riechen – mit praktischen Tipps für das perfekte Match.',
    type: 'website',
    url: `${SITE_URL}/koerperchemie-duft`
  }
};

export default function KoerperchemieDuftPage() {
  return (
    <main>
      <Breadcrumb items={[{ label: 'Körperchemie & Duft', href: '/koerperchemie-duft' }]} />
      <div className="container">
        <section className="section">
          <p className="eyebrow">Wissen</p>
          <h1 className="detail-title">Körperchemie & Duft</h1>
          <p className="lead">
            Du findest einen Duft online wunderbar, aber wenn du ihn trägst, riecht er komisch? Das liegt nicht am Duft –
            das liegt an dir. Oder genauer: an deiner Körperchemie.
          </p>
          <p className="lead">
            Der gleiche Duft riecht auf zehn verschiedenen Menschen zehn verschiedene Arten. Was auf deiner Freundin
            blumig und frisch wirkt, kann auf dir süsslich und schwer werden. Das ist nicht schlecht – es ist Chemie.
          </p>

          <h2>Die 5 Faktoren, die beeinflussen, wie ein Duft auf dir riecht</h2>

          <h3>1. pH-Wert deiner Haut</h3>
          <p>
            Der pH-Wert deiner Haut ist wie ein „Verstärker" für die Duftmoleküle. Hautoberflächen sind unterschiedlich sauer
            oder alkalisch – das beinflusst, wie schnell die Duftstoffe verdunsten und welche Noten stärker hervortreten.
          </p>
          <ul style={{ marginBottom: '1.5rem' }}>
            <li><strong>Saure Haut (pH 4,5–5,5)</strong> – typisch für Frauen, südliche Ethnien – verstärkt meist die Bassnoten (Holz, Moschus, Vanille)</li>
            <li><strong>Neutrale Haut (pH ~7)</strong> – der Duft riecht am „ausgewogensten"</li>
            <li><strong>Alkalische Haut (pH 7,5+)</strong> – verstärkt oft die oberen/mittleren Noten (Zitrus, Blüten)</li>
          </ul>
          <p style={{ fontSize: '0.9rem', color: '#6b5344', marginBottom: '1.5rem' }}>
            💡 <strong>Praktisch:</strong> Wenn dir ein Duft zu schwer vorkommt, könnte deine Haut zu sauer sein.
            Teste ihn nach einer feuchtigkeitscreme – das kann den Eindruck verändern.
          </p>

          <h3>2. Hauttyp (trocken, normal, ölig)</h3>
          <p>
            Auch der Feuchtigkeitszustand deiner Haut spielt eine Rolle:
          </p>
          <ul style={{ marginBottom: '1.5rem' }}>
            <li><strong>Trockene Haut</strong> – Düfte halten kürzer und wirken schneller intensiv (weil der Duft schneller verdunstet). Schwere, cremige Düfte fühlen sich besser an.</li>
            <li><strong>Normale Haut</strong> – Düfte entfalten sich vorhersehbar und halten gut</li>
            <li><strong>Ölige Haut</strong> – Düfte halten länger (bis zu 8+ Stunden) und wirken intensiver. Schwere Düfte können überwältigend wirken.</li>
          </ul>
          <p style={{ fontSize: '0.9rem', color: '#6b5344', marginBottom: '1.5rem' }}>
            💡 <strong>Praktisch:</strong> Trockenhaut-Träger sollten stärkere Konzentrationen (EdP/Eau de Parfum) wählen;
            ölige Haut verträgt auch leichte EdT-Versionen.
          </p>

          <h3>3. Körpertemperatur & Hormonhaushalt</h3>
          <p>
            Deine Körpertemperatur und Hormonfluktuationen beeinflussen ständig, wie Düfte auf dir wirken:
          </p>
          <ul style={{ marginBottom: '1.5rem' }}>
            <li><strong>Höhere Körpertemperatur</strong> (z. B. nach Sport, in der Sonne, oder bei hohem Östrogen-Level) → Duft wird schneller frei und riecht intensiver</li>
            <li><strong>Menstruationszyklus</strong> (bei Frauen) – In der Follikelphase (ca. 5–14 Tage nach Menstruationsbeginn) riechst du schärfer; in der Lutealphase (nach Eisprung) nimmt die Riechschärfe ab. Manche Düfte gefallen dir deshalb in manchen Phasen besser als in anderen.</li>
            <li><strong>Schwangerschaft</strong> – Der Hormonfluss kann Duftpräferenzen komplett verändern. Ein Lieblingduft kann plötzlich übel riechen.</li>
          </ul>
          <p style={{ fontSize: '0.9rem', color: '#6b5344', marginBottom: '1.5rem' }}>
            💡 <strong>Praktisch:</strong> Teste Düfte zu verschiedenen Tageszeiten und in verschiedenen Phasen deines Zyklus.
            Ein „Nicht-Treffer" ist vielleicht einfach nur schlechtes Timing.
          </p>

          <h3>4. Ernährung & Stoffwechsel</h3>
          <p>
            Was du isst und wie dein Körper Nährstoffe verstoffwechselt, beeinflusst deine natürliche Körperausdünstung:
          </p>
          <ul style={{ marginBottom: '1.5rem' }}>
            <li>Stark gewürzte Speisen (Knoblauch, Zwiebel, Curry) und Alkohol ändern temporär deinen Körpergeruch → Düfte riechen anders</li>
            <li>Vitamin B12-Mangel und bestimmte Diäten können einen „süsslicheren" oder „saueren" Gesamteindruck erzeugen</li>
            <li>Niedriger Blutdruck/Stresslevel ändert Körpertemperatur und damit die Duftentwicklung</li>
          </ul>
          <p style={{ fontSize: '0.9rem', color: '#6b5344', marginBottom: '1.5rem' }}>
            💡 <strong>Praktisch:</strong> Wenn ein Duft dir heute nicht gefällt, probiere ihn in ein paar Tagen noch mal.
            Deine innere Chemie ändert sich ständig.
          </p>

          <h3>5. Genetik & ethnische Herkunft</h3>
          <p>
            Deine genetische Abstammung beeinflusst deinen Hauttyp und pH-Wert:
          </p>
          <ul style={{ marginBottom: '1.5rem' }}>
            <li><strong>Südeuropäer / Afrikanische Abstammung</strong> – typisch saurere Haut → stärkere Basisnoten, schwerer wirkende Düfte</li>
            <li><strong>Nordeuropäer</strong> – tendenziell etwas alkalischere Haut → obere Noten bleiben länger präsent</li>
            <li><strong>Menschen mit Apokriner Schweissdrüsen-Aktivität</strong> (höher in tropischen Gegenden) – intensivere Körperchemie-Reaktion auf Duftmoleküle</li>
          </ul>
          <p style={{ fontSize: '0.9rem', color: '#6b5344', marginBottom: '1.5rem' }}>
            💡 <strong>Praktisch:</strong> Das bedeutet nicht „dieser Duft ist nicht für dich da". Es bedeutet nur:
            Teste ihn länger und merke dir, wie ER speziell auf DEINER Körperchemie wirkt.
          </p>

          <h2>Warum riecht der gleiche Duft auf dir anders als auf Instagram?</h2>
          <p>
            Influencer und Beauty-YouTuber loben einen Duft, aber bei dir riecht er völlig anders? Das ist völlig normal:
          </p>
          <ol style={{ marginBottom: '1.5rem' }}>
            <li><strong>Andere Körperchemie</strong> – Ihre Haut hat einen anderen pH-Wert, anderen Feuchtigkeitszustand</li>
            <li><strong>Andere Hautoberfläche</strong> – Sie tragen vielleicht andere Körpercremes, die mit dem Duft interagieren</li>
            <li><strong>Andere Anwendung</strong> – Menge, Anwendungsort, Zeit seit dem Auftragen – alles ändert den Eindruck</li>
            <li><strong>Andere Umgebung</strong> – Temperatur, Luftfeuchtigkeit, Licht beeinflussen die Wahrnehmung</li>
            <li><strong>Andere Erwartung</strong> – Du erwartest, dass er wie in der Video riecht. Das ist die grösste Falle.</li>
          </ol>

          <h2>6 praktische Tipps: Deinen perfekten Duft trotz Körperchemie finden</h2>

          <div style={{
            background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.04))',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '2rem'
          }}>
            <ol style={{ marginBottom: 0 }}>
              <li style={{ marginBottom: '1.2rem' }}>
                <strong>Teste Düfte auf DEINER Haut, nicht im Laden auf der Teststreifen-Papier.</strong>
                Papier hat keine Körperchemie. Sprüh den Duft auf dein Handgelenk oder die Halsbeuge und warte 5–10 Minuten.
              </li>
              <li style={{ marginBottom: '1.2rem' }}>
                <strong>Trage keine anderen Düfte, Cremes oder Parfüms bei der Testung.</strong>
                Das verfälscht die Reaktion. Hole dir eine „saubere" Testprobe nach Hause.
              </li>
              <li style={{ marginBottom: '1.2rem' }}>
                <strong>Teste zu verschiedenen Tageszeiten – Morgens, abends, nach Sport.</strong>
                Deine Körperchemie ändert sich. Ein Duft kann morgens „zu schwer" wirken, abends aber perfekt.
              </li>
              <li style={{ marginBottom: '1.2rem' }}>
                <strong>Wenn die Bassnoten nicht passen, versuche eine leichtere Konzentration.</strong>
                EdT statt EdP, oder ein EdT einer ähnlichen Duftfamilie. Die leichteren Noten könnten dir besser passen.
              </li>
              <li style={{ marginBottom: '1.2rem' }}>
                <strong>Trage eine gute, duftfreie Feuchtigkeitscreme auf, bevor du Parfüm aufträgst.</strong>
                Feuchtigkeitscreme beeinflusst die pH-Balance minimal und kann helfen, dass schwerere Düfte nicht so überwältigend wirken.
              </li>
              <li style={{ marginBottom: 0 }}>
                <strong>Gib einem Duft eine echte Chance – mindestens 1–2 Wochen Tragezeit.</strong>
                In den ersten Tagen duftet deine Nase nicht genau (Olfactory Adaptation). Nach einer Woche merkst du, wie der Duft wirklich auf dir ist.
              </li>
            </ol>
          </div>

          <h2>Die 6 häufigsten Körperchemie-Probleme (und ihre Lösungen)</h2>

          <div style={{
            display: 'grid',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {[
              {
                problem: 'Der Duft riecht auf mir viel schwerer als auf YouTube',
                grund: 'Deine Haut hat wahrscheinlich einen niedrigeren pH-Wert (sauer) → verstärkt die Bassnoten',
                lösung: 'Versuche leichtere Konzentrationen (EdT), oder wähle Düfte mit leichteren Bassnoten (z. B. Moschus statt Sandelholz). Test: Trage den Duft auf die Kleidung statt die Haut – das abschwächt die Reaktion.'
              },
              {
                problem: 'Der Duft verfliegt viel zu schnell bei mir',
                grund: 'Trockene Haut oder sehr aktives Apokrin-System. Der Duft verdunstet schneller.',
                lösung: 'Wähle stärkere Konzentrationen (EdP oder Eau de Parfum). Feuchte deine Haut vor dem Auftragen leicht an (mit Feuchtigkeitscreme). Trage Duft auf die Haare oder Kleidung auf – das hält länger.'
              },
              {
                problem: 'Der Duft wird auf mir wahnsinnig intensiv und kopflastig',
                grund: 'Ölige Haut oder höhere Körpertemperatur. Der Duft hält und verstärkt sich.',
                lösung: 'Nutze nur 1–2 Sprüher statt 3–4. Trage den Duft auf Punkte auf, wo es kühler ist (Innenseite der Unterarme, nicht Hals). Wähle EdT-Versionen statt EdP.'
              },
              {
                problem: 'Dieser Duft gefällt mir manchmal, manchmal überhaupt nicht',
                grund: 'Menstruationszyklus, Stresslevel, Ernährung oder Schlaf beeinflussen deine Körperchemie täglich.',
                lösung: 'Merke dir, in welcher Situation dir der Duft gefallen hat (Tageszeit, Zyklusphase, Mahlzeit). Trage ihn gezielt in diesen Momenten. Ein „Nicht-Treffer" ist manchmal nur schlechtes Timing.'
              },
              {
                problem: 'Der Duft vermischt sich komisch mit meinem natürlichen Körpergeruch',
                grund: 'Deine Körperpflege-Produkte (Seife, Deo, Körperlotion) interagieren mit dem Duft.',
                lösung: 'Nutze unduftierte oder sehr neutrale Körperpflege. Oder: Träge den Duft auf Stellen auf, wo du weniger schwitzt (Innenseite der Unterarme, Hals, hinter den Ohren).'
              },
              {
                problem: 'Teuer-Düfte riechen auf mir nicht besser als günstige',
                grund: 'Der Preis ändert nichts an deiner Körperchemie. Manche teureren Düfte sind für andere Hauttypen optimiert.',
                lösung: 'Vertrau deiner Nase, nicht dem Preis. Wenn dir ein günstiger Duft auf deiner Haut besser gefällt, ist das die richtige Wahl. Qualität ist, wie es AUF DIR riecht – nicht auf jeder Haut gleich.'
              }
            ].map((item, i) => (
              <div key={i} style={{
                background: 'linear-gradient(135deg, rgba(212,175,55,0.05), rgba(212,175,55,0.02))',
                border: '1px solid rgba(212,175,55,0.1)',
                borderRadius: '8px',
                padding: '1.25rem'
              }}>
                <p style={{ margin: '0 0 0.5rem 0', fontWeight: 600, fontSize: '0.95rem' }}>
                  🔸 <strong>{item.problem}</strong>
                </p>
                <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.9rem', color: '#6b5344' }}>
                  <strong>Grund:</strong> {item.grund}
                </p>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#5b4d40' }}>
                  <strong>Lösung:</strong> {item.lösung}
                </p>
              </div>
            ))}
          </div>

          <h2>FAQ: Körperchemie & Duft</h2>

          <div style={{
            display: 'grid',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            {[
              {
                frage: 'Kann ich meinen pH-Wert ändern?',
                antwort: 'Kurzfristig: Ja – durch Feuchtigkeitscreme, richtige Körperpflege und Ernährung. Langfristig: Dein natürlicher pH-Wert ist genetisch bedingt. Aber du kannst lernen, welche Düfte auf DEINEM pH-Wert am besten wirken.'
              },
              {
                frage: 'Warum riecht mein Partner den Duft anders?',
                antwort: 'Weil ihr unterschiedliche Körperchemie habt. Auch die Nase riecht unterschiedlich – was dir intensiv vorkommt, könnte ihm kaum auffallen. Das ist normal.'
              },
              {
                frage: 'Kann ich meine Körperchemie mit Sonnencreme verändern?',
                antwort: 'Ja, manche Sonnencremes können die Duftentwicklung beeinflussen. Am besten: Warte 10 Minuten nach der Sonnencreme, bevor du Duft aufträgst – oder trage Duft zuerst auf, dann Sonnencreme auf andere Körperteile.'
              },
              {
                frage: 'Wird ein Duft auf meiner Haut nach 2 Jahren anders riechen?',
                antwort: 'Deine Körperchemie kann sich mit Alter, Hormonen und Lebensstil verändern – ja. Aber auch Düfte verändern sich über Zeit (Oxidation, Verdunstung flüchtiger Noten). Das Zusammenspiel beider ist eine Reise.'
              },
              {
                frage: 'Ist meine Körperchemie schuld, wenn mir der Duft nicht gefällt?',
                antwort: 'Teilweise ja. Aber es kann auch sein, dass dir der Duft einfach nicht gefällt – unabhängig von Körperchemie. Vertrau deinem Bauchgefühl. Körperchemie erklärt Unterschiede, ersetzt aber nicht deinen Geschmack.'
              }
            ].map((qa, i) => (
              <div key={i}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem' }}>{qa.frage}</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#5b4d40', lineHeight: 1.6 }}>{qa.antwort}</p>
              </div>
            ))}
          </div>

          <div style={{
            background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.04))',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '2rem',
            marginTop: '2rem'
          }}>
            <p style={{ margin: '0 0 0.75rem 0', color: '#2a1d12', fontWeight: 600 }}>
              🔑 <strong>Kurzfassung: Warum riecht mein Duft auf mir anders?</strong>
            </p>
            <p style={{ margin: 0, color: '#6b5344', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Deine Körperchemie – dein pH-Wert, Hauttyp, Hormonhaushalt, Temperatur und Genetik – ist wie ein persönlicher
              „Übersetzer" für jeden Duft. Der gleiche Duft wird auf jeder Haut anders „übersetzt". Das ist nicht schlecht – es ist einzigartig.
              Lerne, wie DEINE Körperchemie mit Düften spricht, und finde Düfte, die speziell für deine Chemie gemacht sind. Das ist der Weg zu deinem Signature-Duft.
            </p>
          </div>

          <div style={{
            background: '#f0e6d2',
            borderLeft: '4px solid #d4af37',
            padding: '1.5rem',
            borderRadius: '0 8px 8px 0',
            marginBottom: '2rem'
          }}>
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 600, color: '#2a1d12' }}>
              🎯 Nächster Schritt: Finde den perfekten Duft für DEINE Körperchemie
            </p>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#5b4d40' }}>
              Du kennst jetzt deine Körperchemie besser. Der nächste Schritt ist, Düfte zu finden, die speziell auf deinem pH-Wert und deinem Hauttyp grossartig wirken.
              Nutze <Link href="/quiz" style={{ color: '#d4af37', fontWeight: 600, textDecoration: 'none' }}>das Auressa-Quiz</Link> – es berücksichtigt deine
              Duftpräferenzen und findet Matches, die speziell für dich funktionieren. Oder <Link href="/duefte" style={{ color: '#d4af37', fontWeight: 600, textDecoration: 'none' }}>durchsuche unseren Katalog</Link> nach Düften,
              die du testen kannst.
            </p>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(212,175,55,0.2)', margin: '3rem 0' }} />

          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ marginTop: 0 }}>Weitere Ratgeber zum Thema Duft</h3>
            <ul style={{ fontSize: '0.95rem', lineHeight: 1.8 }}>
              <li><Link href="/duftnoten-guide" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Duftnoten verstehen</Link> – wie die Duftnoten-Pyramide funktioniert und wie Noten sich über den Tag verändern</li>
              <li><Link href="/duftarten" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Duftarten erklärt</Link> – EdP, EdT, Cologne & Co.: welche Konzentration für wen</li>
              <li><Link href="/duft-waehlen" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Duft wählen – Anleitung</Link> – schritt-für-schritt anleitung zum perfekten Duft</li>
              <li><Link href="/parfum-auftragen" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Parfum richtig auftragen</Link> – die goldenen Regeln für maximale Haltbarkeit und Präsenz</li>
              <li><Link href="/duft-lagerung" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Duft-Lagerung</Link> – wie du deine Düfte richtig lagerst und die Qualität erhältst</li>
              <li><Link href="/duefte-kombinieren" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Duftkombinationen</Link> – wie du mehrere Düfte kombinierst für personalisierte Scents</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
