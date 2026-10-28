import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/app/Breadcrumb';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export const metadata: Metadata = {
  title: 'Günstige Duft-Alternativen & Klone: Teuer-Düfte billiger',
  description:
    'Finde günstige Alternativen zu teuren Düften – legale Klone, Budget-Marken & ähnliche Düfte. Spare bis zu 80% ohne Qualitätsverlust.',
  alternates: { canonical: '/guenstige-alternativen' },
  openGraph: {
    title: 'Günstige Duft-Alternativen | Auressa',
    description:
      'Hochwertige Düfte für weniger Geld: Duft-Klone, Budget-Marken und ähnliche Alternativen zu Premium-Parfums.',
    type: 'website',
    url: `${SITE_URL}/guenstige-alternativen`
  }
};

export default function GuenstigeAlternativenPage() {
  return (
    <main>
      <Breadcrumb items={[{ label: 'Günstige Duft-Alternativen', href: '/guenstige-alternativen' }]} />
      <div className="container">
        <section className="section">
          <p className="eyebrow">Wissen</p>
          <h1 className="detail-title">Günstige Duft-Alternativen & Klone</h1>
          <p className="lead">
            Du liebst Chanel No. 5, Dior Sauvage oder Tom Ford Black Orchid – magst aber nicht 150€+ dafür zahlen?
            Gute Nachricht: Es gibt legale, qualitativ hochwertige Alternativen, die 70–80% günstiger sind
            und fast genauso riechen.
          </p>
          <p className="lead">
            Dieser Guide erklärt dir, wie du legitime Duft-Klone erkennst, wo du sie kaufst und wie du
            grossartige Düfte für ein Drittel des Preises bekommst – ohne Qualität oder Gewissen zu opfern.
          </p>

          <h2>Was ist ein Duft-Klon? Und ist das legal?</h2>

          <p style={{ marginBottom: '1.5rem' }}>
            Ein <strong>Duft-Klon</strong> (oder „Inspired by"-Duft) ist ein Parfum, das dem Duft eines bekannten,
            teuren Marken-Parfums sehr ähnlich riecht – aber es ist eine separate Kreation mit eigenem Namen und anderer Zusammensetzung.
          </p>

          <div style={{
            background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.04))',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '2rem'
          }}>
            <p style={{ margin: '0 0 0.75rem 0', fontWeight: 600, color: '#2a1d12' }}>
              ✅ <strong>Das ist LEGAL und ok:</strong>
            </p>
            <ul style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', color: '#5b4d40' }}>
              <li>Duftstoffe können nicht patentiert werden (nur Zusammensetzung, nicht einzelne Komponenten)</li>
              <li>Marken schützen Namen, Logo, Flakon – nicht den Duftcharakter selbst</li>
              <li>Budget-Marken dürfen „ähnlich wie X riechen" machen – solange sie nicht sagen „Das IST X" oder X's Logo kopieren</li>
              <li>Es ist wie: Generika-Medikamente vs. Brand-Medikamente – gleiche Wirkung, anderer Name, günstig</li>
            </ul>
            <p style={{ margin: '0 0 0.75rem 0', fontWeight: 600, color: '#2a1d12' }}>
              ❌ <strong>Das ist NICHT ok:</strong>
            </p>
            <ul style={{ margin: 0, fontSize: '0.9rem', color: '#5b4d40' }}>
              <li>Fälschungen (Fake-Chanel mit Chanel-Logo) – das ist Betrug</li>
              <li>Dufte, die sagen „Dies ist ein Chanel No. 5 Clone" (Namensmissbrauch)</li>
              <li>Schnäppchen-Websites, die „Original Chanel für 20€" verkaufen – das sind 100% Fakes</li>
            </ul>
          </div>

          <h2>Die 4 Arten von günstigen Duff-Alternativen</h2>

          <div style={{
            display: 'grid',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {[
              {
                titel: '1. Legitime Budget-Klone (die besten)',
                beschreibung: 'Marken wie Armaf, Lattafa, Fragrance du Bois kreieren Düfte, die bekannten Luxus-Düften ähneln – aber unter ihrem eigenen Namen und mit guter Qualität.',
                beispiele: 'Armaf Club de Nuit Intense (wie Creed Aventus), Lattafa Intense Dream (wie Tom Ford Black Orchid), Maison Anthony Marwood (wie Dior Sauvage)',
                preis: '€15–35',
                haltbarkeit: '4–8 Stunden',
                qualitaet: '80–90% des Original, dafür 70–80% günstiger',
                tipp: 'Das ist dein Sweet Spot. Legitim, günstig, gut. Kaufe hier zuerst.'
              },
              {
                titel: '2. Nische-Brands mit ähnlicher DNA',
                beschreibung: 'Unabhängige Parfümeure & Nische-Marken, die nicht versuchen, einen bekannten Duft zu klonen – aber die ähnliche Noten & Charaktere haben.',
                beispiele: 'Wenn du Creed Aventus liebst (Pfirsich, Zeder) → probiere Heeley Sel Marin (maritime Zeder). Wenn du Tom Ford Black Orchid magst (würzig, warm) → probiere Miu Miu L\'Eau Rosée (würzig, floral)',
                preis: '€40–80',
                haltbarkeit: '5–8 Stunden',
                qualitaet: '85–95% (oft unterschätzte Marken)',
                tipp: 'Weniger bekannt, oft bessere Qualität. Probiere diese für Entdeckungen.'
              },
              {
                titel: '3. EdT-Versionen von Luxus-Düften',
                beschreibung: 'Der gleiche Duft vom Original-Hersteller – aber in EdT (eau de toilette) statt EdP. Gleiche Zusammensetzung, aber leichter & billiger.',
                beispiele: 'Chanel No. 5 EdP (€90) vs. Chanel No. 5 EdT (€65). Dior Sauvage EdP (€110) vs. Dior Sauvage EdT (€75)',
                preis: '€40–80',
                haltbarkeit: '4–6 Stunden',
                qualitaet: '100% (es ist das echte Ding, nur leichter)',
                tipp: 'Bester Kompromiss: Original-Qualität, niedrigerer Preis, etwas kürzere Haltbarkeit.'
              },
              {
                titel: '4. Outlet & Sale-Düfte (Glücksspiel)',
                beschreibung: 'Originalmarken-Düfte auf Sale, aus früheren Serien, oder in Outlet-Stores massiv reduziert.',
                beispiele: 'Notino.ch, Flaconi, Breuninger – regelmässig 30–60% Rabatt auf Premium-Marken.',
                preis: '€30–70 (je nach Sale)',
                haltbarkeit: '6–10+ Stunden',
                qualitaet: '100% authentisch',
                tipp: 'Black Friday, Summer Sales – hier lohnt es sich, zu warten. Aber weniger vorhersehbar.'
              }
            ].map((item, i) => (
              <div key={i} style={{
                background: 'linear-gradient(135deg, rgba(212,175,55,0.05), rgba(212,175,55,0.02))',
                border: '1px solid rgba(212,175,55,0.1)',
                borderRadius: '8px',
                padding: '1.5rem'
              }}>
                <h3 style={{ margin: '0 0 0.75rem 0', fontSize: '0.95rem' }}>{item.titel}</h3>
                <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.9rem', color: '#6b5344' }}>
                  {item.beschreibung}
                </p>
                <div style={{ fontSize: '0.85rem', color: '#5b4d40', marginBottom: '0.75rem' }}>
                  <p style={{ margin: '0 0 0.5rem 0' }}><strong>Beispiele:</strong> {item.beispiele}</p>
                  <p style={{ margin: '0 0 0.5rem 0' }}><strong>💰 Preis:</strong> {item.preis}</p>
                  <p style={{ margin: '0 0 0.5rem 0' }}><strong>⏱ Haltbarkeit:</strong> {item.haltbarkeit}</p>
                  <p style={{ margin: '0 0 0.5rem 0' }}><strong>⭐ Qualität:</strong> {item.qualitaet}</p>
                </div>
                <p style={{ margin: 0, padding: '0.75rem', background: 'rgba(212,175,55,0.05)', borderRadius: '4px', fontSize: '0.85rem', color: '#5b4d40', fontStyle: 'italic' }}>
                  💡 {item.tipp}
                </p>
              </div>
            ))}
          </div>

          <h2>Die besten Budget-Marken: Wer macht die besten Klone?</h2>

          <div style={{
            display: 'grid',
            gap: '1.2rem',
            marginBottom: '2rem'
          }}>
            {[
              {
                marke: 'Armaf (Dubai)',
                spezialisierung: 'Orientalische & würzige Düfte; sehr beliebte Creed-Aventus-Klone',
                populaer: 'Club de Nuit Intense, Club de Nuit Milestone, Craze Pour Homme',
                preis: '€15–25',
                qualitaet: '⭐⭐⭐⭐⭐ (sehr hochwertig, viele schwören drauf statt Creed)'
              },
              {
                marke: 'Lattafa (Kuwait)',
                spezialisierung: 'Oud, Blüten, orientalisch; bekannt für Tom Ford & Dior Klone',
                populaer: 'Intense Dream, Qaa\'eed, Salaam',
                preis: '€12–28',
                qualitaet: '⭐⭐⭐⭐ (günstig + gut, weniger „exact" als Armaf, aber nah dran)'
              },
              {
                marke: 'Maison Anthony Marwood (Frankreich)',
                spezialisierung: 'Klassiker & zeitlose Düfte; sehr Dior Sauvage & Bleu de Chanel Nähe',
                populaer: 'Dior Sauvage Inspired, Bleu de Chanel Inspired',
                preis: '€20–35',
                qualitaet: '⭐⭐⭐⭐ (französische Qualität, etwas teurer aber auch besser)'
              },
              {
                marke: 'Fragrance Oil House (Unabhängig)',
                spezialisierung: 'Inspirierende Düfte in mini-Grössen; gut zum Testen vor grossem Kauf',
                populaer: '5ml Minis von populären Klonen, Natur-Düfte',
                preis: '€2–5 pro Sample',
                qualitaet: '⭐⭐⭐ (okay für Tests, nicht für Alltag)'
              },
              {
                marke: 'Jasamalı (Türkei)',
                spezialisierung: 'Oud & orientalische Düfte; bekannt für Niche-Düfte',
                populaer: 'Oud-Kreationen, TOM FORD Black Orchid Inspired',
                preis: '€8–20',
                qualitaet: '⭐⭐⭐⭐ (überraschend gut für den Preis)'
              },
              {
                marke: 'MFK (Parfum König – verschiedene Länder)',
                spezialisierung: 'Vielfalt; bekannt für „Inspired by" Versionen von allem',
                populaer: 'Mehrere hundert Klone & Inspirationen',
                preis: '€10–30',
                qualitaet: '⭐⭐⭐ (sehr variabel, manche Hits, manche Misses)'
              }
            ].map((item, i) => (
              <div key={i} style={{
                background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.04))',
                border: '1px solid rgba(212,175,55,0.15)',
                borderRadius: '8px',
                padding: '1.25rem'
              }}>
                <p style={{ margin: '0 0 0.5rem 0', fontWeight: 600, fontSize: '0.95rem' }}>
                  {item.marke}
                </p>
                <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.85rem', color: '#6b5344' }}>
                  <strong>Spezialisierung:</strong> {item.spezialisierung}
                </p>
                <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', color: '#6b5344' }}>
                  <strong>Populäre Düfte:</strong> {item.populaer}
                </p>
                <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', color: '#6b5344' }}>
                  <strong>💰 Preisklasse:</strong> {item.preis}
                </p>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#5b4d40' }}>
                  <strong>⭐ Qualität:</strong> {item.qualitaet}
                </p>
              </div>
            ))}
          </div>

          <h2>Wo kaufe ich günstige Duft-Alternativen?</h2>

          <div style={{
            display: 'grid',
            gap: '1.2rem',
            marginBottom: '2rem'
          }}>
            {[
              {
                shop: 'FragranceBuy.de / FragranceBuy.com',
                schwerpunkt: 'Spezialist für Budget-Marken (Armaf, Lattafa) in der Schweiz/EU',
                vorteile: 'Grosse Auswahl, günstig, oft Bundles',
                nachteil: 'Versand kann teuer sein',
                tipp: 'Beste Wahl für Schweizer'
              },
              {
                shop: 'eBay.de / eBay.ch',
                schwerpunkt: 'Verkäufer aus Mittlerer Osten (wo Klone populär sind)',
                vorteile: 'Sehr günstig, Käuferschutz bei eBay',
                nachteil: 'Manchmal Fakes, lange Versandzeit',
                tipp: 'Nur bei verifiziertem Seller kaufen'
              },
              {
                shop: 'Amazon.de / Amazon.ch',
                schwerpunkt: 'Budget-Marken, aber teuer überkauft',
                vorteile: 'Versand schnell, Rückgaberecht klar',
                nachteil: 'Oft teurer als spezialisierte Shops',
                tipp: 'Nutze Preis-Vergleich'
              },
              {
                shop: 'Notino.ch (Sales)',
                schwerpunkt: 'Original-Luxus-Düfte in EdT, oft im Sale',
                vorteile: 'Authentisch, schneller Versand',
                nachteil: 'Nicht günstiger als Budget-Klone',
                tipp: 'Nutze für Sales & Outlet'
              },
              {
                shop: 'ArabicPerfumes.ch (wenn verfügbar)',
                schwerpunkt: 'Arabische Budget-Marken direkt',
                vorteile: 'Sehr günstig, Original',
                nachteil: 'Kleine Auswahl, teils unzuverlässig',
                tipp: 'Riskiert, aber möglich'
              }
            ].map((item, i) => (
              <div key={i} style={{
                background: 'linear-gradient(135deg, rgba(212,175,55,0.05), rgba(212,175,55,0.02))',
                border: '1px solid rgba(212,175,55,0.1)',
                borderRadius: '8px',
                padding: '1.25rem'
              }}>
                <p style={{ margin: '0 0 0.5rem 0', fontWeight: 600 }}>
                  {item.shop}
                </p>
                <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#6b5344' }}>
                  <strong>Schwerpunkt:</strong> {item.schwerpunkt}
                </p>
                <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.85rem', color: '#5b4d40' }}>
                  <strong>✅ Vorteile:</strong> {item.vorteile}
                </p>
                <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.85rem', color: '#5b4d40' }}>
                  <strong>❌ Nachteile:</strong> {item.nachteil}
                </p>
                <p style={{ margin: 0, padding: '0.5rem', background: 'rgba(212,175,55,0.05)', borderRadius: '4px', fontSize: '0.85rem', color: '#5b4d40' }}>
                  💡 {item.tipp}
                </p>
              </div>
            ))}
          </div>

          <h2>5 beliebte Teuer-Düfte & ihre günstigen Alternativen</h2>

          <div style={{
            display: 'grid',
            gap: '1.2rem',
            marginBottom: '2rem'
          }}>
            {[
              {
                original: 'Creed Aventus (€300–450)',
                charaktere: 'Pfirsich, Zeder, würzig, maskulin',
                klon: 'Armaf Club de Nuit Intense (€20)',
                kostet: '€280 Ersparnis',
                aendigkeit: '85–90% gleich – viele schwören darauf',
              },
              {
                original: 'Tom Ford Black Orchid (€150–200)',
                charaktere: 'Würzig, dunkle Orchidee, warm, sinnlich',
                klon: 'Lattafa Intense Dream (€18)',
                kostet: '€132 Ersparnis',
                aendigkeit: '80–85% ähnlich – sehr populärer Klon',
              },
              {
                original: 'Dior Sauvage (€110–130)',
                charaktere: 'Ambroxan, Pepper, sauber, frisch',
                klon: 'Maison Anthony Marwood Sauvage Inspired (€28)',
                kostet: '€82 Ersparnis',
                aendigkeit: '80–88% ähnlich – gut zum Testen',
              },
              {
                original: 'Bleu de Chanel (€100–140)',
                charaktere: 'Zitrus, Zedernholz, muskulin, zeitlos',
                klon: 'Lattafa Blue Uranos (€15)',
                kostet: '€85 Ersparnis',
                aendigkeit: '75–80% ähnlich – etwas leichter',
              },
              {
                original: 'Chanel No. 5 (€80–120)',
                charaktere: 'Klassisch, blumig, aldehydisch, zeitlos',
                klon: 'Armaf Aristocrat (€22)',
                kostet: '€58 Ersparnis',
                aendigkeit: '70–75% ähnlich – charakteristisch anders, aber gut',
              }
            ].map((item, i) => (
              <div key={i} style={{
                background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.04))',
                border: '1px solid rgba(212,175,55,0.15)',
                borderRadius: '8px',
                padding: '1.25rem'
              }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '0.75rem' }}>
                  <div>
                    <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.85rem', fontWeight: 600, color: '#8b7d74' }}>ORIGINAL</p>
                    <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600 }}>{item.original}</p>
                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: '#6b5344' }}>
                      {item.charaktere}
                    </p>
                  </div>
                  <div>
                    <p style={{ margin: '0 0 0.25rem 0', fontSize: '0.85rem', fontWeight: 600, color: '#d4af37' }}>KLON</p>
                    <p style={{ margin: 0, fontSize: '0.95rem', fontWeight: 600, color: '#d4af37' }}>{item.klon}</p>
                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: '#6b5344' }}>
                      <strong>Spart:</strong> {item.kostet}
                    </p>
                  </div>
                </div>
                <p style={{ margin: 0, padding: '0.75rem', background: 'rgba(212,175,55,0.05)', borderRadius: '4px', fontSize: '0.9rem', color: '#5b4d40', fontStyle: 'italic' }}>
                  ✅ {item.aendigkeit}
                </p>
              </div>
            ))}
          </div>

          <h2>5 Tipps zum Smart-Kaufen von günstigen Alternativen</h2>

          <div style={{
            background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.04))',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '2rem'
          }}>
            <ol style={{ marginBottom: 0 }}>
              <li style={{ marginBottom: '1.2rem' }}>
                <strong>Teste IMMER zuerst mit einer kleinen Grösse.</strong>
                Ein 50ml Klon (€20) dir nicht passt, verlierst du 20€.
                Wenn der Original (€150) dir nicht passt, verlierst du 150€. Die Risikominderung lohnt sich.
              </li>
              <li style={{ marginBottom: '1.2rem' }}>
                <strong>Kauf nicht die „exakteste" Kopie – kauf die, die DIR am meisten gefällt.</strong>
                Vielleicht magst du den Klon sogar besser als das Original. Das ist ok! Deine Nase entscheidet, nicht die Ähnlichkeitsquote.
              </li>
              <li style={{ marginBottom: '1.2rem' }}>
                <strong>Erkenne Fakes: Preise unter €5, unglaubliche Namen, Schreibfehler = FAKE.</strong>
                Ein legitimer Klon kostet €12–30. Alles darunter ist wahrscheinlich gefälscht.
              </li>
              <li style={{ marginBottom: '1.2rem' }}>
                <strong>Vergleiche nicht bloss Preis – vergleiche auch Haltbarkeit & Sillage.</strong>
                Ein 4-Stunden-Klon ist nicht das gleiche wie ein 8-Stunden-Original. Manchmal ist es ok, manchmal brauchst du den Original.
              </li>
              <li style={{ marginBottom: 0 }}>
                <strong>Mixe: Kauf zwei gute Klone + einen Original-Favoriten.</strong>
                Du bekommst Vielfalt & Qualität ohne riesiges Budget. 2× €20 + 1× €100 = grosse Sammlung für weniger Geld.
              </li>
            </ol>
          </div>

          <h2>FAQ: Günstige Duft-Alternativen</h2>

          <div style={{
            display: 'grid',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            {[
              {
                frage: 'Sind Duft-Klone illegal?',
                antwort: 'Nein. Duftöle können nicht patentiert werden. Legale Klone (unter eigenem Namen) sind ok. Fälschungen (mit gefälschtem Original-Logo/Namen) sind illegal.'
              },
              {
                frage: 'Halten günstige Klone genauso lange?',
                antwort: 'Meist 4–6 Stunden statt 8+. Manche Klone halten überraschend lang. Haltbarkeit variiert. Teste selbst.'
              },
              {
                frage: 'Sind alle Klone gleich gut?',
                antwort: 'Nein. Armaf ist meist besser als Lattafa, die sind beide besser als random eBay-Verkäufer. Marke & Seller zählen.'
              },
              {
                frage: 'Kann ich Fakes erkennen?',
                antwort: 'Ja: Preis <€5 = Fake. Seller aus unglaubwürdiger Quelle = Fake. Schlechte Verpackung/Schreibfehler = wahrscheinlich Fake. Legitime Budget-Marken haben professionelle Verpackung.'
              },
              {
                frage: 'Warum sollte ich nicht immer einen Klon kaufen?',
                antwort: 'Manche Düfte sind es wert, original zu kaufen: wenn Haltbarkeit kritisch ist, wenn du einen absoluten Favoriten hast, oder wenn die EdT-Version des Originals günstiger ist als ein Klon.'
              },
              {
                frage: 'Ist es moralisch ok, Klone zu kaufen?',
                antwort: 'Ja, sofern es legale Klone sind (nicht Fälschungen). Generika-Medikamente sind auch ok – das ist das gleiche Prinzip. Marken-Häuser könnten günstiger anbieten, tun es aber nicht.'
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
              🎯 <strong>Zusammenfassung: Smart mit günstigen Alternativen kaufen</strong>
            </p>
            <p style={{ margin: 0, color: '#6b5344', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Düfte zu finden, die dir gefallen, ist wichtiger als Geld auszugeben. Legale Budget-Klone (Armaf, Lattafa) sind
              intelligente Wahl: Sie halten was sie versprechen, kosten 80% weniger, und du kannst experimentieren, ohne dein
              Budget zu sprengen. Starte mit einem 20€-Klon, nicht mit einem 150€-Original. Wenn der Duft dir passt, kaufe
              dann vielleicht später den Original – oder bleib beim Klon. Beide sind ok.
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
              💰 Budget aufbauen mit günstigen Alternativen
            </p>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#5b4d40' }}>
              Du willst eine Sammlung mit kleinerem Budget aufbauen? Lese unseren <Link href="/duftsammlung" style={{ color: '#d4af37', fontWeight: 600, textDecoration: 'none' }}>Duftsammlung-Ratgeber</Link> –
              dort lernst du Strategien, wie du für 200–300€ eine grossartige Sammlung bekommst.
              Oder nutze <Link href="/quiz" style={{ color: '#d4af37', fontWeight: 600, textDecoration: 'none' }}>das Auressa-Quiz</Link>, um Düfte zu finden, die zu dir passen – wir zeigen dir auch günstige Alternativen an.
            </p>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(212,175,55,0.2)', margin: '3rem 0' }} />

          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ marginTop: 0 }}>Weitere Ratgeber zum Budget & Auswahl</h3>
            <ul style={{ fontSize: '0.95rem', lineHeight: 1.8 }}>
              <li><Link href="/duftsammlung" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Duftsammlung aufbauen</Link> – Strategien zum günstigen Aufbau einer grossen Sammlung</li>
              <li><Link href="/duft-waehlen" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Duft wählen – Anleitung</Link> – Schritt-für-Schritt zum perfekten Duft</li>
              <li><Link href="/duftarten" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Duftarten erklärt</Link> – EdP, EdT, Cologne: Was kostet was und warum</li>
              <li><Link href="/koerperchemie-duft" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Körperchemie & Duft</Link> – Warum ein Duft auf dir anders riecht</li>
              <li><Link href="/duftnoten-guide" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Duftnoten verstehen</Link> – Die Noten-Pyramide erklärt</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
