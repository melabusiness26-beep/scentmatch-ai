import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/app/Breadcrumb';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export const metadata: Metadata = {
  title: 'Damen-Parfüme: Der komplette Guide zu Frauendüften',
  description:
    'Finde das perfekte Damen-Parfum – von elegant bis verspielt. Mit Tipps zu Duftfamilien, Occasions und konkreten Empfehlungen.',
  alternates: { canonical: '/damen-parfueme' },
  openGraph: {
    title: 'Damen-Parfüme | Auressa',
    description:
      'Der komplette Guide zu Frauendüften: Dufttypen, Occasions, Klassiker und moderne Alternativen.',
    type: 'website',
    url: `${SITE_URL}/damen-parfueme`
  }
};

export default function DamenParfuemePage() {
  return (
    <main>
      <Breadcrumb items={[{ label: 'Damen-Parfüme', href: '/damen-parfueme' }]} />
      <div className="container">
        <section className="section">
          <p className="eyebrow">Wissen</p>
          <h1 className="detail-title">Damen-Parfüme: Der komplette Guide</h1>
          <p className="lead">
            Frauendüfte sind vielfältiger, frecher und experimentierfreudiger als Herrendüfte. Die Palette reicht von
            klassisch-elegant über verspielt-süß bis zu sinnlich-orientalisch – und es gibt viel Raum für Persönlichkeit.
          </p>
          <p className="lead">
            Ob du klassisch, modern, wild oder romantisch sein möchtest – dieser Guide hilft dir, einen Frauenduft zu
            finden, der deine Persönlichkeit perfekt ausdrückt.
          </p>

          <h2>Die 6 Haupt-Duftfamilien für Damen</h2>

          <div style={{
            display: 'grid',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {[
              {
                familie: 'Floral / Blumig',
                beschreibung: 'Die klassische Frauenduft-Familie. Von subtil bis dramatisch – Rosen, Pfirsich, Lilie, Tuberose.',
                charaktere: 'Rose, Pfirsich, Gardenie, Lilie, Violett, Hibiskus',
                occasions: 'Überall. Formal, casual, tagsüber, abends – Floral ist universell.',
                beispiele: 'Chanel No. 5, Dior J\'adore, Lancôme Trésor, Estée Lauder Beautiful',
                intensitaet: 'Leicht bis sehr stark (variabel)',
                haltbarkeit: '5–8 Stunden',
                preis: '€60–150'
              },
              {
                familie: 'Fruity / Fruchtig',
                beschreibung: 'Süßlich, verspielt, jung. Peach, Aprikose, Erdbeere, Kirsche kombiniert mit floralen Noten.',
                charaktere: 'Pfirsich, Aprikose, Erdbeere, Kirsche, manchmal Zitrus',
                occasions: 'Tagsüber, casual, Sommer, jung & frech',
                beispiele: 'Viktor & Rolf Bonbon, Lancôme La Vie Est Belle, Prada Candy',
                intensitaet: 'Moderat bis stark',
                haltbarkeit: '4–7 Stunden',
                preis: '€60–130'
              },
              {
                familie: 'Fruity Floral',
                beschreibung: 'Die moderne Mischung: Fruchtig + Blumig. Das beste aus beiden Welten.',
                charaktere: 'Frucht + Blüten, oft mit Vanille unten',
                occasions: 'Tagsüber & Abends, Sommer & Frühling, jung & elegant zugleich',
                beispiele: 'Dolce & Gabbana Light Blue, Miu Miu L\'Eau Rosée, Marc Jacobs Daisy',
                intensitaet: 'Moderat',
                haltbarkeit: '5–8 Stunden',
                preis: '€70–120'
              },
              {
                familie: 'Oriental / Amber',
                beschreibung: 'Warm, sinnlich, würzig. Die Drama-Queen Duft-Familie. Vanilla, Amber, Moschus, würzige Noten.',
                charaktere: 'Vanilla, Amber, Moschus, würzige Gewürze, Zedernholz',
                occasions: 'Abends, formal, Herbst & Winter, sinnlich',
                beispiele: 'Yves Saint Laurent Opium, Tom Ford Black Orchid, Givenchy Gentleman (ja, auch für Frauen großartig)',
                intensitaet: 'Stark bis sehr stark',
                haltbarkeit: '7–10+ Stunden',
                preis: '€80–180'
              },
              {
                familie: 'Gourmand / Dessert',
                beschreibung: 'Essbar, süß, verführerisch. Karamell, Schokolade, Toffee, Kekse – riecht wie Nachtisch.',
                charaktere: 'Vanille, Karamell, Schokolade, Toffee, Zucker, Mandel',
                occasions: 'Abends, Flirten, Herbst & Winter, sinnlich & verspielt',
                beispiele: 'Prada Candy, Viktor & Rolf Bonbon, Carolina Herrera Seduction',
                intensitaet: 'Moderat bis sehr stark',
                haltbarkeit: '5–8 Stunden',
                preis: '€60–140'
              },
              {
                familie: 'Chypre / Moschus',
                beschreibung: 'Elegant, zeitlos, subtil. Oak, Zedernholz, Moschus – softer als Oriental.',
                charaktere: 'Moschus, Zedernholz, subtile Blüten, grüne Noten',
                occasions: 'Überall. Formal, casual, Übergangsjahreszeiten, elegant',
                beispiele: 'Chloé, Lancôme Poème, Calvin Klein Euphoria',
                intensitaet: 'Leicht bis moderat',
                haltbarkeit: '5–7 Stunden',
                preis: '€70–120'
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
                  <p style={{ margin: '0.5rem 0' }}><strong>Best for:</strong> {item.occasions}</p>
                  <p style={{ margin: '0.5rem 0' }}><strong>Klassische Beispiele:</strong> {item.beispiele}</p>
                  <p style={{ margin: '0.5rem 0' }}><strong>Intensität:</strong> {item.intensitaet}</p>
                  <p style={{ margin: '0.5rem 0' }}><strong>Haltbarkeit:</strong> {item.haltbarkeit}</p>
                  <p style={{ margin: '0.5rem 0 0 0' }}><strong>💰 Preis:</strong> {item.preis}</p>
                </div>
              </div>
            ))}
          </div>

          <h2>Welche Dufttyp passt zu dir? 5 Frauen-Typen</h2>

          <div style={{
            display: 'grid',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {[
              {
                typ: 'Die Klassikerin',
                beschreibung: 'Zeitlos, elegant, traditionell. Du magst bewährte, klassische Düfte.',
                ideal: 'Floral klassisch (Rose, Gardenie) oder Chypré. Düfte, die es seit Jahren gibt.',
                empfehlung: 'Chanel No. 5, Dior J\'adore, Chloé, Lancôme Trésor',
                vermeiden: 'Zu modern, zu experimentell, zu süß'
              },
              {
                typ: 'Die Modern Woman',
                beschreibung: 'Trendy, charaktervoll, aktuell. Du magst moderne, überraschende Düfte.',
                ideal: 'Fruity Floral, moderne Orientalisch oder ungewöhnliche Kombinationen.',
                empfehlung: 'Dolce & Gabbana Light Blue, Miu Miu L\'Eau Rosée, Byredo Pulp, Maison Margiela Beach Walk',
                vermeiden: 'Zu klassisch, zu konservativ, zu mainstream'
              },
              {
                typ: 'Die Verspieldte',
                beschreibung: 'Jung, frech, unbeschwert. Du magst süßliche, verspielte Düfte.',
                ideal: 'Fruity, Gourmand oder leichte Fruity Floral. Süßlich & jung.',
                empfehlung: 'Prada Candy, Viktor & Rolf Bonbon, Marc Jacobs Daisy, Tommy Hilfiger Tommy Girl',
                vermeiden: 'Zu schwer, zu orientalisch, zu ernstaft'
              },
              {
                typ: 'Die Sinnliche',
                beschreibung: 'Mutig, sexy, selbstbewusst. Du magst intensive, fesselnde Düfte.',
                ideal: 'Oriental, Gourmand intensiv oder exotische Blüten. Drama & Sinnlichkeit.',
                empfehlung: 'Tom Ford Black Orchid, Yves Saint Laurent Opium, Givenchy L\'Homme Prada, Versace Eros für Damen',
                vermeiden: 'Zu leicht, zu frisch, zu unaufdringlich'
              },
              {
                typ: 'Die Minimaliste',
                beschreibung: 'Einfach, clean, subtil. Du magst leichte, elegante Düfte.',
                ideal: 'Chypré, leichte Floral oder frische Citrus. Subtil & raffiniert.',
                empfehlung: 'Jo Malone, Hermès Eau de Gentiane, L\'Artisan Parfumeur Nuit de Tubérose, Acqua di Parma',
                vermeiden: 'Zu schwer, zu süß, zu intensiv'
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

          <h2>Die Top 10 Damen-Düfte (nach Beliebtheit & Qualität)</h2>

          <ol style={{ marginBottom: '2rem', fontSize: '0.95rem', lineHeight: 2 }}>
            <li><strong>Chanel No. 5</strong> – Der Klassiker. Über 100 Jahre, jede Frau kennt ihn.</li>
            <li><strong>Dior J'adore</strong> – Modern-klassisch, zeitlos, auf jeder Haut großartig.</li>
            <li><strong>Chloé</strong> – Elegant, frisch-warm, universell geliebt.</li>
            <li><strong>Lancôme Trésor</strong> – Warm, blumig, elegant. Ein Klassiker mit Gewicht.</li>
            <li><strong>Prada Candy</strong> – Süß, verführerisch, modern. Die Gourmand-Königin.</li>
            <li><strong>Dolce & Gabbana Light Blue</strong> – Frisch, fruity-floral, für jeden Tag perfekt.</li>
            <li><strong>Estée Lauder Beautiful</strong> – Klassisch, elegant, warm-blumig.</li>
            <li><strong>Tom Ford Black Orchid</strong> – Sinnlich, exotisch, für mutige Frauen.</li>
            <li><strong>Marc Jacobs Daisy</strong> – Jung, verspieit, unbeschwert – für jeden Altersgruppe.</li>
            <li><strong>Yves Saint Laurent Opium</strong> – Drama, Wärme, Sinnlichkeit – für abends grandios.</li>
          </ol>

          <h2>Häufige Anfängerfehler bei Frauendüften</h2>

          <div style={{
            display: 'grid',
            gap: '1.2rem',
            marginBottom: '2rem'
          }}>
            {[
              {
                fehler: 'Zu süß gehen, ohne zu testen',
                lösung: 'Gourmand-Düfte riechen zu Hause wunderbar, aber im Körper- & Hormonkontext ganz anders. IMMER zuerst testen.'
              },
              {
                fehler: 'Nur einen Duft haben',
                lösung: 'Frauen: mindestens 2–3 Düfte sind ideal. Einer für tagsüber (leicht), einer für abends (intensiver), einer für Sommer (frisch).'
              },
              {
                fehler: 'Zu intensiv auftragen',
                lösung: 'Frauen-Düfte wirken oft stärker als Herren-Düfte. 1–2 Sprüher reichen. Nicht 3–4.'
              },
              {
                fehler: 'Einen „teuren" Duft kaufen, weil er teuer ist',
                lösung: 'Preis ist nicht alles. Ein günstiger Duft kann auf deiner Haut besser sein als ein Luxus-Duft. Teste immer zuerst.'
              },
              {
                fehler: 'Den gleichen Duft immer tragen (Olfactory Adaptation)',
                lösung: 'Nach 2–3 Wochen merkst du den Duft nicht mehr. Wechsel regelmäßig, sonst brauchst du mehr Menge.'
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

          <h2>Duftauswahl nach Jahreszeit</h2>

          <h3>Frühling & Sommer</h3>
          <ul style={{ marginBottom: '1.5rem' }}>
            <li><strong>Dolce & Gabbana Light Blue</strong> – Frisch, fruity, perfekt für wärme.</li>
            <li><strong>Jo Malone Lime Basil & Mandarin</strong> – Zitronig, grün, erfrischend.</li>
            <li><strong>Acqua di Gioia</strong> – Marine, wassrig, wie Ozean.</li>
            <li><strong>Lancôme La Vie Est Belle Soleil Cristal</strong> – Fruity-floral, sommerlich-süß.</li>
          </ul>

          <h3>Herbst & Winter</h3>
          <ul style={{ marginBottom: '1.5rem' }}>
            <li><strong>Tom Ford Black Orchid</strong> – Sinnlich, würzig, warm – ideal für Herbst/Winter.</li>
            <li><strong>Yves Saint Laurent Opium</strong> – Warm, würzig, dramatisch – klassisch Winter.</li>
            <li><strong>Prada Candy</strong> – Warm, süß, kuschelnd – wie Karamell.</li>
            <li><strong>Chloé Nomade</strong> – Warm, holzig, elegant – für reife Eleganz.</li>
          </ul>

          <div style={{
            background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.04))',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '2rem'
          }}>
            <p style={{ margin: '0 0 0.75rem 0', color: '#2a1d12', fontWeight: 600 }}>
              🎯 <strong>Zusammenfassung: Der perfekte Damen-Duft</strong>
            </p>
            <p style={{ margin: 0, color: '#6b5344', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Der perfekte Damen-Duft hängt von deinem Stil, deiner Persönlichkeit und deinen Vorlieben ab.
              Die Auswahl ist vielfältiger & experimentierfreudiger als bei Männern – nutze das! Beginne mit einem
              Klassiker (Chanel No. 5, Dior J'adore) als sichere Wahl, probiere dann andere Duftfamilien aus
              (Oriental, Gourmand) und finde deine Signature-Düfte. Habe mindestens 2–3 Düfte (tagsüber, abends, Saison),
              teste immer zuerst, und vertrau deiner Nase – nicht dem Preis.
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
              👃 Finde deinen Damen-Duft
            </p>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#5b4d40' }}>
              Nutze <Link href="/quiz" style={{ color: '#d4af37', fontWeight: 600, textDecoration: 'none' }}>das Auressa-Quiz</Link> und filtriere nach
              „Frauendüfte" um personalisierte Empfehlungen zu bekommen. Oder durchsuche <Link href="/duefte" style={{ color: '#d4af37', fontWeight: 600, textDecoration: 'none' }}>unseren Katalog</Link> nach
              deiner bevorzugten Duftfamilie (Floral, Fruity, Oriental, Gourmand).
            </p>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(212,175,55,0.2)', margin: '3rem 0' }} />

          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ marginTop: 0 }}>Weitere Ratgeber zum Thema Frauendüfte</h3>
            <ul style={{ fontSize: '0.95rem', lineHeight: 1.8 }}>
              <li><Link href="/duft-waehlen" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Duft wählen – Anleitung</Link> – Schritt-für-Schritt zum perfekten Duft (auch für Frauen)</li>
              <li><Link href="/koerperchemie-duft" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Körperchemie & Duft</Link> – Wie Hormonhaushalt & Körperchemie Düfte beeinflussen</li>
              <li><Link href="/dufte-nach-hauttyp" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Düfte nach Hauttyp</Link> – Duftauswahl nach deinem Hauttyp</li>
              <li><Link href="/duft-geschenk" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Duft als Geschenk</Link> – Damen-Düfte als Geschenke für Frauen</li>
              <li><Link href="/duftsammlung" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Duftsammlung aufbauen</Link> – Strategien zum Aufbau einer Frauenduftssammlung</li>
              <li><Link href="/guenstige-alternativen" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Günstige Duft-Alternativen</Link> – Budget-Optionen für beliebte Frauendüfte</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
