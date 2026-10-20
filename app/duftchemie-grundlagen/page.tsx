import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/app/Breadcrumb';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export const metadata: Metadata = {
  title: 'Duftchemie Grundlagen: Wie Düfte funktionieren',
  description:
    'Verstehe die Chemie hinter Düften: Noten, Konzentration, Pyramiden und Moleküle. Wissenschaft einfach erklärt für jeden Duft-Fan.',
  alternates: { canonical: `${SITE_URL}/duftchemie-grundlagen` },
  openGraph: {
    title: 'Duftchemie Grundlagen | Auressa',
    description: 'Die Wissenschaft hinter Düften – verständlich erklärt.',
    url: `${SITE_URL}/duftchemie-grundlagen`,
    type: 'website',
  },
};

export default function DuftchemieGrundlagen() {
  return (
    <main style={{ backgroundColor: '#faf7f2' }}>
      <Breadcrumb items={[{ label: 'Duftchemie Grundlagen', href: '/duftchemie-grundlagen' }]} />

      {/* Hero */}
      <section
        style={{
          backgroundImage: 'linear-gradient(rgba(26,18,9,0.84), rgba(26,18,9,0.84)), url(/hero-auressa-2.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '280px',
          padding: '3.5rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '620px' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
            🧪 Die Wissenschaft
          </p>
          <h1 style={{
            fontSize: 'clamp(28px, 6vw, 44px)',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            marginBottom: '1rem',
            lineHeight: 1.15,
            color: '#faf7f2',
          }}>
            Duftchemie Grundlagen
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(250,247,242,0.75)', margin: 0, lineHeight: 1.6 }}>
            Verstehe die Wissenschaft hinter deinem Lieblingduft – von Molekülen bis zu Noten. Keine komplizierten Formeln, nur reale Chemie einfach erklärt.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '3.5rem 1.25rem' }}>

        {/* Why Chemistry Matters */}
        <section style={{ marginBottom: '3.5rem' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Die Wissenschaft
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.5rem' }}>
            Warum Chemie deine Duftentscheidungen beeinflusst
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4a3728', marginBottom: '1.2rem' }}>
            Ein Duft ist eine chemische Mischung aus flüchtigen aromatischen Molekülen, die mit deinen Olfaktor-Rezeptoren interagieren. Das ist nicht Mystik – es ist Chemie. Die gleiche Wissenschaft, die erklärt, warum Zucker süß schmeckt, erklärt auch, warum Vanille warm riecht.
          </p>
          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4a3728', marginBottom: '1.2rem' }}>
            Das Verständnis dieser Grundlagen hilft dir, bessere Duftentscheidungen zu treffen. Du wirst verstehen, warum manche Düfte schnell verdampfen (flüchtige Noten), während andere stundenlang bleiben (schwere Basen). Du wirst wissen, warum ein Duft im Winter anders riecht als im Sommer. Du wirst erkennen, warum zwei Düfte sehr ähnlich riechen können, aber unterschiedlich lange halten.
          </p>
          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4a3728' }}>
            Diese Seite ist Chemie ohne das Biochemie-Lehrbuch – nur die praktischen Konzepte, die dir helfen, Düfte intelligenter zu verstehen.
          </p>
        </section>

        {/* The Fragrance Pyramid */}
        <section style={{ marginBottom: '3.5rem' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Die Struktur
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.5rem' }}>
            Die Duftpyramide: Top, Heart, Base
          </h2>

          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4a3728', marginBottom: '1.5rem' }}>
            Ein Duft ist in drei „Ebenen" unterteilt, die auf unterschiedliche Art funktionieren. Das ist nicht willkürlich – es ist eine chemische Realität, die darauf basiert, wie flüchtig jede Note ist.
          </p>

          {/* Top Notes */}
          <div style={{
            background: '#fff',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '14px',
            padding: '2rem',
            marginBottom: '1.5rem',
          }}>
            <h3 style={{ fontSize: '1.3rem', color: '#d4af37', fontWeight: 700, marginBottom: '0.5rem' }}>
              🌬️ Kopfnoten (Top Notes)
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#6b5344', marginBottom: '1rem', fontStyle: 'italic' }}>
              Flüchtig, frisch, schnell vorbei (5–15 Minuten)
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              Die ersten Sekunden nach dem Sprühen – das ist, was dich anzieht oder abstoßt. Kopfnoten sind die leichtesten, flüchtigsten Moleküle: Zitrus (Bergamotte, Zitrone), Minze, Grapefruit, Ananas. Sie verdampfen schnell, weil ihre Moleküle klein sind und niedrige Siedepunkte haben.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Die Chemie:</strong> Kleine Moleküle mit hoher Flüchtigkeit. Der Dampfdruck ist hoch – die Moleküle wollen verdampfen. In wenigen Minuten sind sie in der Luft, und dein Duft riecht anders.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#6b5344' }}>
              <strong>Warum das wichtig ist:</strong> Kopfnoten sind oft „Köder". Eine großartige Top-Note zieht dich an, aber sie ist nicht das echte Aroma des Dufts. Nach 10 Minuten verschwindet sie, und der Duft entfaltet sich vollständig. Das ist völlig normal – nicht jeder Duft muss in den ersten Sekunden gut riechen.
            </p>
          </div>

          {/* Heart Notes */}
          <div style={{
            background: '#fff',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '14px',
            padding: '2rem',
            marginBottom: '1.5rem',
          }}>
            <h3 style={{ fontSize: '1.3rem', color: '#d4af37', fontWeight: 700, marginBottom: '0.5rem' }}>
              💎 Herznoten (Heart/Middle Notes)
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#6b5344', marginBottom: '1rem', fontStyle: 'italic' }}>
              Der Kern, die „wahre" Essenz (20 Minuten bis 4 Stunden)
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              Das ist der echte Duft. Nach die Kopfnoten weg sind, was bleibt, sind die Herznoten – die Blüten, Gewürze, Früchte, Aromen. Rose, Jasmin, Nelke, Pfeffer, Kardamom. Das sind mittelschwere Moleküle, die länger bleiben als die Top-Notes, aber noch verdampfen.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Die Chemie:</strong> Mittlere Molekülgröße, mittlere Flüchtigkeit. Langsamer verdampfend als Top-Notes, aber immer noch flüchtig. Diese Noten geben einem Duft seinen Charakter.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#6b5344' }}>
              <strong>Warum das wichtig ist:</strong> Die Herznoten sind, wofür du einen Duft kaufst. Der erste Eindruck ist schön, aber wenn die Herznoten nicht gut riechen, ist es nichts wert. Immer mindestens 10–20 Minuten warten, bevor du über einen Duft entscheidest.
            </p>
          </div>

          {/* Base Notes */}
          <div style={{
            background: '#fff',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '14px',
            padding: '2rem',
            marginBottom: '1.5rem',
          }}>
            <h3 style={{ fontSize: '1.3rem', color: '#d4af37', fontWeight: 700, marginBottom: '0.5rem' }}>
              ⚓ Basisnoten (Base Notes)
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#6b5344', marginBottom: '1rem', fontStyle: 'italic' }}>
              Der Anker, der Duft, der bleibt (4–24+ Stunden)
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              Die schwersten Moleküle – Sandelholz, Vetiver, Moschus, Ambra, Vanille. Diese Noten verdampfen kaum. Sie bleiben an deiner Haut, in deinen Haaren, auf deiner Kleidung. Ein großartiger Duft braucht eine großartige Basis – ohne sie ist alles nur Marketing.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Die Chemie:</strong> Schwere Moleküle mit niedrigem Dampfdruck. Sie wollen nicht verdampfen. Die Seitenketten sind lang, die Molekulargewichte sind hoch. Das ist, warum Moschus oder Ambra noch nach 12 Stunden auf deiner Haut sind.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#6b5344' }}>
              <strong>Warum das wichtig ist:</strong> Eine schwache Basis ist ein schlechtes Zeichen für Duftqualität. Ein Duft, der nach 2 Stunden weg ist, hat wahrscheinlich keine Basis (oder eine sehr schwache). Gute Basis = gute Haftung = gute Qualität.
            </p>
          </div>
        </section>

        {/* Concentration */}
        <section style={{ marginBottom: '3.5rem' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Konzentration
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.5rem' }}>
            Warum die gleiche Marke in verschiedenen Konzentrationen unterschiedlich ist
          </h2>

          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4a3728', marginBottom: '1.5rem' }}>
            Ein Duft namens „Dior Sauvage" ist nicht immer das gleiche Produkt. Je nachdem, ob es Eau de Toilette (EDT), Eau de Parfum (EDP) oder Parfum (Pure Fragrance) ist, ist die chemische Konzentration völlig unterschiedlich.
          </p>

          <div style={{
            background: 'linear-gradient(135deg, #2a1d12 0%, #3d2b1a 100%)',
            borderRadius: '16px',
            padding: '2rem 1.5rem',
            color: '#faf7f2',
            marginBottom: '1.5rem',
          }}>
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '0.95rem', color: '#d4af37', fontWeight: 700, marginBottom: '0.3rem' }}>
                Eau de Toilette (EDT) – 5–15% Duftkonzentration
              </p>
              <p style={{ fontSize: '0.9rem', color: 'rgba(250,247,242,0.8)', lineHeight: 1.6, margin: 0 }}>
                Die leichteste Version. Der Rest ist hauptsächlich Alkohol und Wasser. Holt sich schnell weg, hält 3–4 Stunden. Das ist die „schnelle, frische" Option. Preis: ~CHF 50–80.
              </p>
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '0.95rem', color: '#d4af37', fontWeight: 700, marginBottom: '0.3rem' }}>
                Eau de Parfum (EDP) – 15–20% Duftkonzentration
              </p>
              <p style={{ fontSize: '0.9rem', color: 'rgba(250,247,242,0.8)', lineHeight: 1.6, margin: 0 }}>
                Der Standard für „gute Düfte". Mittlere Konzentration, bessere Haftung, hält 6–8 Stunden. Das ist, was die meisten Luxus-Düfte sind. Preis: ~CHF 120–180.
              </p>
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <p style={{ fontSize: '0.95rem', color: '#d4af37', fontWeight: 700, marginBottom: '0.3rem' }}>
                Eau de Cologne (EDC) – 3–5% Duftkonzentration
              </p>
              <p style={{ fontSize: '0.9rem', color: 'rgba(250,247,242,0.8)', lineHeight: 1.6, margin: 0 }}>
                Super leicht, fast nur Alkohol. Sehr erfrischend, aber kurz. Hält 1–2 Stunden. Für den schnellen „Frische-Kick" nach dem Duschen.
              </p>
            </div>
            <div>
              <p style={{ fontSize: '0.95rem', color: '#d4af37', fontWeight: 700, marginBottom: '0.3rem' }}>
                Parfum (Pure Fragrance/Extrait) – 20–40%+ Duftkonzentration
              </p>
              <p style={{ fontSize: '0.9rem', color: 'rgba(250,247,242,0.8)', lineHeight: 1.6, margin: 0 }}>
                Das stärkste Zeug. Reines Duftkaufen, minimal verdünnt. Hält 12–24 Stunden mit nur 1–2 Sprühstösse. Das ist Luxus mit hohem Preis: ~CHF 200+.
              </p>
            </div>
          </div>

          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4a3728', marginBottom: '1.2rem' }}>
            <strong>Die Chemie dahinter:</strong> Die Duftmoleküle werden mit Alkohol (normalerweise 85–90% Alkohol im Duftstoff selbst) verdünnt. Je weniger Alkohol, desto höher die Konzentration. Ein Duft mit höherer Konzentration hält länger, weil mehr „echte" Duftmoleküle vorhanden sind, um zu verdampfen.
          </p>

          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4a3728' }}>
            <strong>Praktischer Tipp:</strong> Wenn dein Lieblingsduft in EDT nicht lang genug hält, versuche die EDP Version. Oft ist es der gleiche Duft, nur konzentrierter. Das Riechen wird nicht so unterschiedlich sein wie Tag und Nacht, aber die Haftung ist deutlich besser.
          </p>
        </section>

        {/* Volatile vs Fixed */}
        <section style={{ marginBottom: '3.5rem' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Molekulare Physik
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.5rem' }}>
            Flüchtige vs. feste Noten: Warum manche Düfte schneller verschwinden
          </h2>

          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4a3728', marginBottom: '1.5rem' }}>
            Die Flüchtigkeit einer Duftmolekül ist nicht Zufall – es ist reine Chemie. Kleine, leichte Moleküle verdampfen schnell. Große, schwere Moleküle bleiben.
          </p>

          <div style={{
            background: '#fff',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '14px',
            padding: '2rem',
            marginBottom: '1.5rem',
          }}>
            <h3 style={{ fontSize: '1.2rem', color: '#2a1d12', fontWeight: 700, marginBottom: '1rem' }}>
              Bergamotte (Kopfnote)
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              Kleine, leichte Moleküle (Limonene). Hoher Dampfdruck. Verdampfen in wenigen Minuten in die Luft. Riecht fantastisch bei der ersten Anwendung, aber nicht dauer. Das ist, warum Zitrus-Düfte schnell vorbei sind – nicht weil der Duft schlecht ist, sondern weil die Chemie es so erzwingt.
            </p>
          </div>

          <div style={{
            background: '#fff',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '14px',
            padding: '2rem',
            marginBottom: '1.5rem',
          }}>
            <h3 style={{ fontSize: '1.2rem', color: '#2a1d12', fontWeight: 700, marginBottom: '1rem' }}>
              Sandelholz (Basisnote)
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              Große, schwere Moleküle (Santol, Alpha-Santalol). Niedriger Dampfdruck. Wollen nicht verdampfen. Bleiben an deiner Haut, in deinen Haaren – 12+ Stunden später ist immer noch da. Das ist, warum holzige Düfte so „klebrig" sind. Die Chemie zwingt diese Noten, zu bleiben.
            </p>
          </div>

          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4a3728', marginBottom: '1.2rem' }}>
            <strong>Praktischer Hinweis:</strong> Ein großartiger Duft braucht Balance. Nur Kopfnoten = 10 Minuten Spaß und dann weg. Nur Basisnoten = ein schwerer Duft, der dich stundenlang verfolgst. Ein gutes Gleichgewicht = mehrere Stunden angenehmes Riechen.
          </p>
        </section>

        {/* Perception & Chemistry */}
        <section style={{ marginBottom: '3.5rem' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Psychophysik
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.5rem' }}>
            Wie deine Nase getäuscht wird (und warum das wichtig ist)
          </h2>

          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4a3728', marginBottom: '1.5rem' }}>
            Das Interessante an Duft ist, dass die Chemie nicht alles erklärt. Deine Wahrnehmung – wie du einen Duft erlebst – ist auch Neurobiologie.
          </p>

          <div style={{
            background: '#fff',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '14px',
            padding: '2rem',
            marginBottom: '1.5rem',
          }}>
            <h3 style={{ fontSize: '1.2rem', color: '#2a1d12', fontWeight: 700, marginBottom: '1rem' }}>
              Olfactory Fatigue (Duft-Gewöhnung)
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              Nach 15–30 Minuten „riechst" du deinen eigenen Duft nicht mehr. Deine Nase ist daran gewöhnt. Der Duft ist immer noch da – biochemisch verdampft – aber psychologisch hast du ihn nicht mehr wahrgenommen. Das ist, warum Freunde dir sagen können „hey, du riechst großartig", aber du selbst es nicht merkst. Deine Nase hat sich daran gewöhnt.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#6b5344' }}>
              <strong>Tipp:</strong> Das ist völlig normal und ein Zeichen, dass der Duft gut dosiert ist. Ein zu starker Duft kann dieser Gewöhnung nicht unterliegen – du bleibst geruchlich überfordert.
            </p>
          </div>

          <div style={{
            background: '#fff',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '14px',
            padding: '2rem',
            marginBottom: '1.5rem',
          }}>
            <h3 style={{ fontSize: '1.2rem', color: '#2a1d12', fontWeight: 700, marginBottom: '1rem' }}>
              Top Note Illusion
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              Der erste Eindruck von einem Duft ist oft übertrieben – nicht weil der Duft falsch ist, sondern weil die Kopfnoten dich täuschen. Die Kopfnoten sind sehr flüchtig und konzentriert, also riechen sie übertrieben stark. Wenn die Herznoten anfangen, treten die Kopfnoten in den Hintergrund, und der Duft wird „schwächer". Das ist nicht schlecht – der Duft wird einfach dein echtes Profil.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#6b5344' }}>
              <strong>Tipp:</strong> Immer mindestens 20 Minuten warten, bevor du über einen Duft entscheidest. Der erste Eindruck ist es nicht.
            </p>
          </div>

          <div style={{
            background: '#fff',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '14px',
            padding: '2rem',
            marginBottom: '1.5rem',
          }}>
            <h3 style={{ fontSize: '1.2rem', color: '#2a1d12', fontWeight: 700, marginBottom: '1rem' }}>
              Körperwärme und Haut-pH
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              Der gleiche Duft riecht auf jedem Menschen anders – nicht weil der Duft unterschiedlich ist, sondern weil deine Haut-Chemie es verändert. Höhere Körpertemperatur = schnellere Verdampfung = intensiverer Duft. Höherer pH-Wert der Haut = andere chemische Reaktion mit den Duftmolekülen. Ein Duft auf Person A kann süßer sein, auf Person B würziger.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#6b5344' }}>
              <strong>Tipp:</strong> Wenn ein Duft auf deinem Freund fantastisch riecht, aber auf dir seltsam, ist nicht einer von euch „falsch". Das ist nur Chemie.
            </p>
          </div>
        </section>

        {/* Season Chemistry */}
        <section style={{ marginBottom: '3.5rem' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Temperatur & Chemie
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.5rem' }}>
            Warum Düfte im Sommer anders riechen als im Winter
          </h2>

          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4a3728', marginBottom: '1.5rem' }}>
            Ein Duft ist nicht stabil – es ist eine chemische Mischung, die auf Temperatur reagiert.
          </p>

          <div style={{
            background: '#fff',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '14px',
            padding: '2rem',
            marginBottom: '1.5rem',
          }}>
            <h3 style={{ fontSize: '1.2rem', color: '#2a1d12', fontWeight: 700, marginBottom: '1rem' }}>
              Sommer (Hitze)
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              Higher Temperatur = schnellere Verdampfung. Die Duftmoleküle verdampfen schneller. Das heißt: Der Duft wird intensiver und kürzer. Ein Duft, der im März subtil ist, wird im Juli laut. Die leichten Noten (Kopfnoten) verdampfen noch schneller, und die Basisnoten werden prominenter. Ein schwerer Duft wird unerträglich.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#6b5344' }}>
              <strong>Konsequenz:</strong> Im Sommer brauchst du leichtere Düfte oder weniger Sprühstösse desselben Dufts.
            </p>
          </div>

          <div style={{
            background: '#fff',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '14px',
            padding: '2rem',
          }}>
            <h3 style={{ fontSize: '1.2rem', color: '#2a1d12', fontWeight: 700, marginBottom: '1rem' }}>
              Winter (Kälte)
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              Niedrigere Temperatur = langsamere Verdampfung. Der Duft bleibt näher an deiner Haut. Das heißt: Ein Duft wird subtiler, aber auch länger. Eine leichte Kopfnote kann in der Kälte kaum wahrnehmbar sein. Du brauchst oft einen stärkeren Duft im Winter.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#6b5344' }}>
              <strong>Konsequenz:</strong> Im Winter ist ein schwererer, intensiverer Duft ideal.
            </p>
          </div>
        </section>

        {/* Quality Markers */}
        <section style={{ marginBottom: '3.5rem' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Qualität erkennen
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.5rem' }}>
            Wie du an der Chemie gute von schlechten Düften unterscheidest
          </h2>

          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4a3728', marginBottom: '1.5rem' }}>
            Die Chemie eines Dufts verrät viel über Qualität.
          </p>

          <div style={{
            background: '#fff',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '14px',
            padding: '2rem',
            marginBottom: '1.5rem',
          }}>
            <h3 style={{ fontSize: '1.1rem', color: '#2a1d12', fontWeight: 700, marginBottom: '1rem' }}>
              Sillage ist nicht gleich Qualität
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', margin: 0 }}>
              Ein Duft, der dich und den ganzen Raum umgibt, ist nicht automatisch besser. Ein großartiger Duft hat Balance – präsent, aber nicht überwältigend. Ein billiger Duft mit schlechtem Akkord versucht oft, laut zu sein, um aufzufallen. Ein qualitativ hochwertiger Duft braucht nicht zu schreien.
            </p>
          </div>

          <div style={{
            background: '#fff',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '14px',
            padding: '2rem',
            marginBottom: '1.5rem',
          }}>
            <h3 style={{ fontSize: '1.1rem', color: '#2a1d12', fontWeight: 700, marginBottom: '1rem' }}>
              Haftung spricht Bände
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', margin: 0 }}>
              Ein Duft, der nach 2 Stunden weg ist, hat wahrscheinlich keine hochwertige Basis. Gute Düfte halten 6–8 Stunden oder mehr. Die Basis ist teuer – es braucht echte Sandelholz, echte Ambra, echte Moschus, um einen Duft zu verankern. Billige Düfte sparen an der Basis.
            </p>
          </div>

          <div style={{
            background: '#fff',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '14px',
            padding: '2rem',
          }}>
            <h3 style={{ fontSize: '1.1rem', color: '#2a1d12', fontWeight: 700, marginBottom: '1rem' }}>
              Entwicklung ist komplex
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', margin: 0 }}>
              Ein einfacher Duft (nur eine Note, die immer gleich bleibt) ist oft ein Zeichen niedriger Qualität. Ein qualitativ hochwertiger Duft entwickelt sich – erste 10 Minuten anders, 30 Minuten anders, 2 Stunden anders. Das ist, weil verschiedene Noten in verschiedenen Geschwindigkeiten verdampfen. Komplexe Komposition = Qualität.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Häufig gefragt
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.5rem' }}>
            FAQ
          </h2>

          <details style={{ marginBottom: '1rem', padding: '1.2rem', background: '#fff', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '10px' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 700, color: '#2a1d12', fontSize: '0.95rem' }}>
              Ist natürlicher Duft besser als synthetischer?
            </summary>
            <p style={{ fontSize: '0.9rem', color: '#4a3728', lineHeight: 1.7, marginTop: '0.8rem', margin: '0.8rem 0 0 0' }}>
              Chemisch? Nein. Ein synthetisches Duftmolekül ist identisch mit einem natürlichen – gleiche Struktur, gleiche Funktion. Der Unterschied ist der Preis und die Nachhaltigkeit. Natürliche Düfte sind teurer und schwächer. Synthetische sind konsistent und stärker. Beide können großartig sein.
            </p>
          </details>

          <details style={{ marginBottom: '1rem', padding: '1.2rem', background: '#fff', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '10px' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 700, color: '#2a1d12', fontSize: '0.95rem' }}>
              Warum riechen teure Düfte anders als billige?
            </summary>
            <p style={{ fontSize: '0.9rem', color: '#4a3728', lineHeight: 1.7, marginTop: '0.8rem', margin: '0.8rem 0 0 0' }}>
              Chemisch: bessere Inhaltsstoffe (hochwertige Basen), bessere Komposition (mehr Schichten), bessere Haftung. Ein billiger Duft spart an der Basis und verwendet billigere Noten. Teurere Düfte verwenden seltenere, komplexere Zutaten.
            </p>
          </details>

          <details style={{ marginBottom: '1rem', padding: '1.2rem', background: '#fff', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '10px' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 700, color: '#2a1d12', fontSize: '0.95rem' }}>
              Kann ich einen Duft verbessern, wenn ich ihn mit Öl mische?
            </summary>
            <p style={{ fontSize: '0.9rem', color: '#4a3728', lineHeight: 1.7, marginTop: '0.8rem', margin: '0.8rem 0 0 0' }}>
              Technisch: ja, aber mit Vorsicht. Öl verlängert die Haftung (schwere Moleküle verdampfen langsamer auf Öl). Aber Öl verändert auch die Balance des Dufts und kann ihn dumpf machen. Wenn du ein Duft-Öl-Mix magst, versuche es auf einem Teststoff, nicht direkt auf Haut.
            </p>
          </details>

          <details style={{ marginBottom: '1rem', padding: '1.2rem', background: '#fff', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '10px' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 700, color: '#2a1d12', fontSize: '0.95rem' }}>
              Ist Designer-Duft wirklich besser als Niche-Duft?
            </summary>
            <p style={{ fontSize: '0.9rem', color: '#4a3728', lineHeight: 1.7, marginTop: '0.8rem', margin: '0.8rem 0 0 0' }}>
              Chemisch: nein. Ein Designer-Duft ist oft einfacher – breite Anziehung. Ein Niche-Duft ist oft komplexer – tiefere Komposition. Beide können großartig sein. Designer ist besser im Marketing, Niche oft besser in Komplexität. Aber es gibt Ausnahmen in beide Richtungen.
            </p>
          </details>
        </section>

        {/* CTA */}
        <section style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <Link href="/#quiz" style={{
            display: 'inline-block',
            background: 'linear-gradient(135deg, #D4AF37 0%, #E5C158 100%)',
            color: '#1F1410',
            fontWeight: 700,
            padding: 'clamp(12px, 2.5vw, 15px) clamp(28px, 5vw, 36px)',
            borderRadius: '12px',
            textDecoration: 'none',
            fontSize: 'clamp(14px, 2.2vw, 16px)',
            letterSpacing: '0.05em',
            transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
            boxShadow: '0 8px 24px rgba(212,175,55,0.2)',
            border: 'none',
            cursor: 'pointer',
          }}>
            Starte dein Duft-Quiz →
          </Link>
        </section>
      </div>
    </main>
  );
}
