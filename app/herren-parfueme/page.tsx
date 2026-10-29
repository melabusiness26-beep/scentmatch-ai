import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/app/Breadcrumb';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export const metadata: Metadata = {
  title: 'Herren-Parfüme: Der komplette Guide zu Männer-Düften',
  description:
    'Finde das perfekte Herren-Parfum – von klassisch bis modern. Mit Tipps zu Duftfamilien, Occasions und konkreten Empfehlungen.',
  alternates: { canonical: '/herren-parfueme' },
  openGraph: {
    title: 'Herren-Parfüme | Auressa',
    description:
      'Der Komplette Guide zu Männer-Düften: Dufttypen, Occasions, Klassiker und moderne Alternativen.',
    type: 'website',
    url: `${SITE_URL}/herren-parfueme`
  }
};

export default function HerrenParfuemePage() {
  return (
    <main>
      <Breadcrumb items={[{ label: 'Herren-Parfüme', href: '/herren-parfueme' }]} />
      <div className="container">
        <section className="section">
          <p className="eyebrow">Wissen</p>
          <h1 className="detail-title">Herren-Parfüme: Der komplette Guide</h1>
          <p className="lead">
            Herren-Parfüme sind nicht „weniger kompliziert" als Frauendüfte – sie sind nur anders. Die Auswahlkriterien
            unterscheiden sich, die Duftfamilien sind oft andere, und was auf einem Mann „passt", ist sehr individuell.
          </p>
          <p className="lead">
            Ob klassisch, modern, würzig oder frisch – dieser Guide hilft dir, den perfekten Herrn-Duft für deine
            Persönlichkeit, dein Aussehen und deine Lebensweise zu finden.
          </p>

          <h2>Die 5 Haupt-Duftfamilien für Herren</h2>

          <div style={{
            display: 'grid',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {[
              {
                familie: 'Frisch / Zitrus',
                beschreibung: 'Zitrus-basiert, leicht, energisierend. Ideal für Anfänger und alltägliches Tragen.',
                charaktere: 'Bergamotte, Zitrone, Grapefruit, manchmal Minze oder Gras-Noten',
                occasions: 'Arbeit, Gym, Sommer, tagsüber, casual',
                beispiele: 'Acqua di Parma, Hermès Eau de Gentiane, Creed Green Irish Tweed',
                intensitaet: 'Leicht bis moderat (EdT ist Standard)',
                haltbarkeit: '4–6 Stunden',
                preis: 'CHF 40–120'
              },
              {
                familie: 'Aromatisch / Kräuter',
                beschreibung: 'Würzig, aromatisch, herb. Klassisch, elegant, zeitlos – der „Herren-Klassiker".',
                charaktere: 'Lavendel, Salbei, Rosmarin, würzige Gewürze, Zedernholz',
                occasions: 'Überall. Büro, Freizeit, formal, casual – passt überall.',
                beispiele: 'Bleu de Chanel, Dior Sauvage, Acqua di Gio (Herren)',
                intensitaet: 'Moderat (EdT bis EdP)',
                haltbarkeit: '5–8 Stunden',
                preis: 'CHF 70–140'
              },
              {
                familie: 'Holzig / Sandelholz',
                beschreibung: 'Warm, holzig, elegant. Für reife Männer oder solche, die Tiefe suchen.',
                charaktere: 'Sandelholz, Vetiver, Zeder, Oud, Tabak',
                occasions: 'Abends, smart-casual, Herbst/Winter, formell',
                beispiele: 'Tom Ford Ombré Leather, Creed Royal Oud, Givenchy Gentleman',
                intensitaet: 'Moderat bis stark (EdP)',
                haltbarkeit: '6–10 Stunden',
                preis: 'CHF 100–200'
              },
              {
                familie: 'Orientalisch / Amber',
                beschreibung: 'Warm, würzig, sinnlich. Für Männer, die es intensiver mögen.',
                charaktere: 'Vanille, Amber, Moschus, würzige Noten, Zedernholz',
                occasions: 'Abends, Ausgehen, formell, Winter',
                beispiele: 'Yves Saint Laurent La Nuit, Giorgio Armani Code, Calvin Klein Obsession',
                intensitaet: 'Stark (EdP, oft sehr intensiv)',
                haltbarkeit: '8+ Stunden',
                preis: 'CHF 60–150'
              },
              {
                familie: 'Fougère / aromatisch-würzig',
                beschreibung: 'Lavendel + Moschus + würzige Noten. Ein Klassiker, den viele kennen.',
                charaktere: 'Lavendel, Moschus, Coumarin, würzige Noten',
                occasions: 'Alltag, Arbeit, casual, Übergangsjahreszeiten',
                beispiele: 'Brut (Classic), Paco Rabanne 1 Million, Versace Pour Homme',
                intensitaet: 'Moderat bis stark',
                haltbarkeit: '5–8 Stunden',
                preis: 'CHF 20–80'
              }
            ].map((item, i) => (
              <div key={i} style={{
                background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.04))',
                border: '1px solid rgba(212,175,55,0.15)',
                borderRadius: '8px',
                padding: '1.5rem'
              }}>
                <h3 style={{ margin: '0 0 0.75rem 0', fontSize: '0.95rem' }}>{item.familie}</h3>
                <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.9rem', color: '#6b5344' }}>
                  {item.beschreibung}
                </p>
                <div style={{ fontSize: '0.85rem', color: '#5b4d40', marginTop: '0.75rem' }}>
                  <p style={{ margin: '0.5rem 0' }}><strong>Charaktere:</strong> {item.charaktere}</p>
                  <p style={{ margin: '0.5rem 0' }}><strong>Passt zu:</strong> {item.occasions}</p>
                  <p style={{ margin: '0.5rem 0' }}><strong>Klassische Beispiele:</strong> {item.beispiele}</p>
                  <p style={{ margin: '0.5rem 0' }}><strong>Intensität:</strong> {item.intensitaet}</p>
                  <p style={{ margin: '0.5rem 0' }}><strong>Haltbarkeit:</strong> {item.haltbarkeit}</p>
                  <p style={{ margin: '0.5rem 0 0 0' }}><strong>💰 Preis:</strong> {item.preis}</p>
                </div>
              </div>
            ))}
          </div>

          <h2>Welcher Dufttyp passt zu dir? 5 Männer-Typen</h2>

          <div style={{
            display: 'grid',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {[
              {
                typ: 'Der Klassiker',
                beschreibung: 'Zeitlos, elegant, unauffällig. Du magst es einfach & bewährt.',
                ideal: 'Aromatic/Herbal oder Fresh Citrus. Klassische Düfte, die es seit Jahren gibt.',
                empfehlung: 'Bleu de Chanel, Dior Sauvage, Creed Green Irish Tweed',
                vermeiden: 'Zu experimentell, zu modern, zu nischig'
              },
              {
                typ: 'Der Modern Man',
                beschreibung: 'Trendy, charaktervoll, modern. Du magst aktuelle, interessante Düfte.',
                ideal: 'Woody, moderne Aromatic oder frische Orientalisch. Neuere Kreationen.',
                empfehlung: 'Tom Ford Ombré Leather, Maison Margiela Replica, Byredo Gypsy Floral',
                vermeiden: 'Zu klassisch, zu konservativ, Mainstream-Everyman-Düfte'
              },
              {
                typ: 'Der Abenteurer',
                beschreibung: 'Experimentierfreudig, unkonventionell. Du traust dir Nisches zu.',
                ideal: 'Alles, was dich interessiert. Oud, ungewöhnliche Kombinationen, Nische-Marken.',
                empfehlung: 'Creed Royal Oud, Heeley Sel Marin, Zoologist Beaver',
                vermeiden: 'Nichts – trau dich!'
              },
              {
                typ: 'Der Minimalist',
                beschreibung: 'Einfach, clean, unauffällig. Weniger ist mehr.',
                ideal: 'Fresh, leichte Citrus, Aromatic leicht. Subtil & elegant.',
                empfehlung: 'Hermès Eau de Gentiane, Jo Malone Grapefruit, Acqua di Parma',
                vermeiden: 'Schwer, würzig, intensiv, sehr süss'
              },
              {
                typ: 'Der Intensiver',
                beschreibung: 'Selbstbewusst, präsent, dominant. Du möchtest, dass man dich riecht.',
                ideal: 'Oriental, Woody intensiv, würzige Fougère. Starke Präsenz.',
                empfehlung: 'Yves Saint Laurent La Nuit, Giorgio Armani Code, Calvin Klein Obsession',
                vermeiden: 'Zu leicht, zu subtil, zu frisch'
              }
            ].map((item, i) => (
              <div key={i} style={{
                background: 'linear-gradient(135deg, rgba(212,175,55,0.05), rgba(212,175,55,0.02))',
                border: '1px solid rgba(212,175,55,0.1)',
                borderRadius: '8px',
                padding: '1.25rem'
              }}>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem' }}>{item.typ}</h3>
                <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.9rem', color: '#6b5344' }}>
                  {item.beschreibung}
                </p>
                <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', color: '#5b4d40' }}>
                  <strong>Ideal:</strong> {item.ideal}
                </p>
                <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.85rem', color: '#5b4d40' }}>
                  <strong>Empfehlung:</strong> {item.empfehlung}
                </p>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#8b7d74', fontStyle: 'italic' }}>
                  ❌ {item.vermeiden}
                </p>
              </div>
            ))}
          </div>

          <h2>Düfte nach Occasion & Lebenssituation</h2>

          <h3>Für die Arbeit / Alltag</h3>
          <ul style={{ marginBottom: '1.5rem' }}>
            <li><strong>Bleu de Chanel</strong> – Der vielseitigste Duft. Passt überall, in jedem Setting.</li>
            <li><strong>Dior Sauvage</strong> – Der Klassiker. Jede:r kennt ihn, überall akzeptiert.</li>
            <li><strong>Hermès Eau de Gentiane Blanche</strong> – Frisch, würzig, subtil. Für formal konservativ.</li>
            <li><strong>Acqua di Gioia</strong> – Marine, frisch, leicht. Ideal für entspannte Arbeit.</li>
          </ul>

          <h3>Für Gym / Sport</h3>
          <ul style={{ marginBottom: '1.5rem' }}>
            <li><strong>Creed Green Irish Tweed</strong> – Frisch, grün, energisierend. Nach dem Gym toll.</li>
            <li><strong>Acqua di Parma</strong> – Leicht, citronig, perfekt für Aktivität.</li>
            <li><strong>Lacoste L.12.12</strong> – Günstig, frisch, sportlich. Ideal für jeden Tag.</li>
          </ul>

          <h3>Für Dating / Freizeit</h3>
          <ul style={{ marginBottom: '1.5rem' }}>
            <li><strong>Tom Ford Ombré Leather</strong> – Sinnlich, maskulin, attraktiv. Für Intimität gut.</li>
            <li><strong>Creed Aventus</strong> – Elegant, selbstsicher, attraktiv. Für Eindruck machen perfekt.</li>
            <li><strong>Versace Pour Homme</strong> – Warmer, würziger, sinnlich. Macht einen Eindruck.</li>
          </ul>

          <h3>Für Herbst / Winter</h3>
          <ul style={{ marginBottom: '1.5rem' }}>
            <li><strong>Tom Ford Ombré Leather</strong> – Warm, würzig, intensiv. Perfekt für Winter.</li>
            <li><strong>Creed Royal Oud</strong> – Oud, holzig, warm. Ultra-Winter.</li>
            <li><strong>Yves Saint Laurent La Nuit</strong> – Warm, würzig, elegant. Klassisch Winter.</li>
          </ul>

          <h2>Häufige Anfängerfehler beim Herren-Duft-Kauf</h2>

          <div style={{
            display: 'grid',
            gap: '1.2rem',
            marginBottom: '2rem'
          }}>
            {[
              {
                fehler: 'Nur nach Marke kaufen',
                lösung: 'Marke bedeutet nicht automatisch „richtig für dich". Ein günstiger Duft kann besser sein als ein teurer. Teste erst, DANN entscheide.'
              },
              {
                fehler: 'EdP/EdC nehmen, wenn EdT passt',
                lösung: 'Für alltägliche Herren-Düfte ist EdT Standard & ausreichend. EdP ist für Abends/Winter. EdC ist meist zu schwach. Halte dich an EdT.'
              },
              {
                fehler: 'Zu intensiv auftragen',
                lösung: 'Herren-Düfte wirken auf männlicher Haut oft intensiver. 2 Sprüher reichen. Nicht mehr.'
              },
              {
                fehler: 'Zu süss / zu mädchenhaft gehen',
                lösung: 'Viele moderne Herren-Düfte haben Vanille oder Süsse. Das ist ok. Aber wenn du es hässt, wähle würziger/frischer.'
              },
              {
                fehler: 'Nur einen Duft haben',
                lösung: 'Wie Frauen: Ein Duft für Sommer, einer für Winter, einer für Arbeit ist ideal. Abwechslung ist healthy.'
              }
            ].map((item, i) => (
              <div key={i} style={{
                background: 'linear-gradient(135deg, rgba(212,175,55,0.05), rgba(212,175,55,0.02))',
                border: '1px solid rgba(212,175,55,0.1)',
                borderRadius: '8px',
                padding: '1.25rem'
              }}>
                <p style={{ margin: '0 0 0.5rem 0', fontWeight: 600, fontSize: '0.95rem' }}>
                  ❌ {item.fehler}
                </p>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#5b4d40' }}>
                  ✅ {item.lösung}
                </p>
              </div>
            ))}
          </div>

          <h2>Die Top 10 Herren-Düfte (nach Popularität & Qualität)</h2>

          <ol style={{ marginBottom: '2rem', fontSize: '0.95rem', lineHeight: 2 }}>
            <li><strong>Bleu de Chanel</strong> – EdT & EdP. Der vielseitigste, universellste Männer-Duft.</li>
            <li><strong>Dior Sauvage</strong> – Der Klassiker. Jede:r trägt ihn, jede:r akzeptiert ihn.</li>
            <li><strong>Creed Aventus</strong> – Premium, modern, elegant. Der Status-Duft.</li>
            <li><strong>Acqua di Gioia</strong> – Marine, frisch, leicht. Perfekt für entspannt.</li>
            <li><strong>Tom Ford Ombré Leather</strong> – Sinnlich, maskulin, warm. Für Abends grossartig.</li>
            <li><strong>Versace Pour Homme</strong> – Klassisch, warm, würzig. Ein Klassiker seit Jahren.</li>
            <li><strong>Hermès Eau de Gentiane Blanche</strong> – Frisch, würzig, elegant. Für formal.</li>
            <li><strong>Yves Saint Laurent La Nuit</strong> – Warm, würzig, elegant. Der Abend-Klassiker.</li>
            <li><strong>Creed Green Irish Tweed</strong> – Frisch, grün, energisierend. Ein Klassiker seit Jahrzehnten.</li>
            <li><strong>Calvin Klein Obsession</strong> – Warm, würzig, sinnlich. Ein 80er-Klassiker, aber immer noch relevant.</li>
          </ol>

          <h2>Budget-Tipps: Herren-Düfte sparen</h2>

          <ul style={{ marginBottom: '2rem' }}>
            <li><strong>EdT statt EdP:</strong> Gleicher Duft, aber 40–50% günstiger & perfekt für alltäglich.</li>
            <li><strong>Budget-Marken:</strong> Armaf, Lattafa haben grosse Creed/Tom Ford Klone für CHF 20–30.</li>
            <li><strong>Nische-Marken testen:</strong> Heeley, Maison Margiela sind oft besser & günstiger als Luxus-Marken.</li>
            <li><strong>Outlet / Sales:</strong> Notino, Flaconi – oft 30–50% Rabatt auf Premium-Marken.</li>
            <li><strong>Grössere Flakons kaufen:</strong> 100ml ist günstiger pro ml als 50ml.</li>
          </ul>

          <div style={{
            background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.04))',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '2rem'
          }}>
            <p style={{ margin: '0 0 0.75rem 0', color: '#2a1d12', fontWeight: 600 }}>
              🎯 <strong>Zusammenfassung: Der perfekte Herren-Duft</strong>
            </p>
            <p style={{ margin: 0, color: '#6b5344', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Der perfekte Herren-Duft hängt von deinem Stil, deiner Persönlichkeit und deinen Vorlieben ab.
              Es gibt keine universelle Antwort – nur das, was zu DIR passt. Beginne mit einer der Top 10 Klassiker
              (Bleu de Chanel, Dior Sauvage) als Sicherheit, probiere dann andere Duftfamilien aus (Woody, Oriental)
              und finde deinen Signature-Duft. EdT ist dein Standard, 2 Sprüher sind ausreichend, und Abwechslung
              (2–3 Düfte) ist gesünder als nur einer.
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
              👃 Finde deinen Herren-Duft
            </p>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#5b4d40' }}>
              Nutze <Link href="/quiz" style={{ color: '#d4af37', fontWeight: 600, textDecoration: 'none' }}>das Auressa-Quiz</Link> und filtriere nach
              „Männer-Düfte" um personalisierte Empfehlungen zu bekommen. Oder durchsuche <Link href="/duefte" style={{ color: '#d4af37', fontWeight: 600, textDecoration: 'none' }}>unseren Katalog</Link> nach
              deiner bevorzugten Duftfamilie (Fresh, Aromatic, Woody, Oriental).
            </p>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(212,175,55,0.2)', margin: '3rem 0' }} />

          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ marginTop: 0 }}>Weitere Ratgeber zum Thema Männer-Düfte</h3>
            <ul style={{ fontSize: '0.95rem', lineHeight: 1.8 }}>
              <li><Link href="/duft-waehlen" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Duft wählen – Anleitung</Link> – Schritt-für-Schritt zum perfekten Duft (auch für Männer)</li>
              <li><Link href="/koerperchemie-duft" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Körperchemie & Duft</Link> – Wie männliche Körperchemie Düfte beeinflusst</li>
              <li><Link href="/dufte-nach-hauttyp" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Düfte nach Hauttyp</Link> – Duftauswahl nach deinem Hauttyp</li>
              <li><Link href="/duftarten" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Duftarten erklärt</Link> – EdP, EdT, Cologne: Welche Konzentration für Männer</li>
              <li><Link href="/dufte-fuer-die-arbeit" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Düfte für die Arbeit</Link> – Office-Düfte auch für Männer</li>
              <li><Link href="/guenstige-alternativen" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Günstige Duft-Alternativen</Link> – Budget-freundliche Herren-Düfte</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
