import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/app/Breadcrumb';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export const metadata: Metadata = {
  title: 'Duftpersönlichkeit: Welcher Duft passt zu deinem Charakter?',
  description:
    'Spielerische Orientierung: acht Duft-Typen von klassisch bis modern – finde heraus, welche Duftfamilien zu dir passen könnten.',
  alternates: { canonical: `${SITE_URL}/duftpersoenlichkeit` },
  openGraph: {
      images: ['/opengraph-image'],
    title: 'Duftpersönlichkeit | Auressa',
    description: 'Spielerische Duft-Typen als Orientierung bei der Duftwahl.',
    url: `${SITE_URL}/duftpersoenlichkeit`,
    type: 'website',
  },
};

export default function Duftpersoenlichkeit() {
  return (
    <main style={{ backgroundColor: '#faf7f2' }}>
      <Breadcrumb items={[{ label: 'Duftpersönlichkeit', href: '/duftpersoenlichkeit' }]} />

      {/* Hero */}
      <section
        style={{
          backgroundImage: 'linear-gradient(rgba(26,18,9,0.82), rgba(26,18,9,0.82)), url(/hero-auressa-2.jpg)',
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
            ✨ Selbstverständnis durch Duft ✨
          </p>
          <h1 style={{
            fontSize: 'clamp(28px, 6vw, 44px)',
            fontFamily: "var(--font-display), Georgia, serif",
            fontWeight: 700,
            marginBottom: '1rem',
            lineHeight: 1.15,
            color: '#faf7f2',
          }}>
            Duftpersönlichkeit
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(250,247,242,0.75)', margin: 0, lineHeight: 1.6 }}>
            Viele erleben ihren Duft als Teil ihrer Persönlichkeit. Diese spielerische Orientierung zeigt, welche Duftfamilien zu welchem Typ passen könnten – ohne Anspruch auf wissenschaftliche Genauigkeit.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '3.5rem 1.25rem' }}>

        {/* The Philosophy */}
        <section style={{ marginBottom: '3.5rem' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Die Grundidee
          </p>
          <h2 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: '1.8rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.5rem' }}>
            Dein Duft als Ausdruck
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4a3728', marginBottom: '1.2rem' }}>
            Manche Menschen lieben Creed Aventus, andere bevorzugen Xerjoff Naxos. Ein Duft ist nicht nur Chemie – viele nutzen ihn auch, um etwas über sich auszudrücken.
          </p>
          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4a3728', marginBottom: '1.2rem' }}>
            Ob und wie stark Duftvorlieben mit Persönlichkeitsmerkmalen zusammenhängen, ist wissenschaftlich nicht eindeutig geklärt. Als grobe Faustregel: Wer Bewährtes mag, greift vielleicht eher zu Klassikern. Wer gern experimentiert, sucht vielleicht eher unkonventionelle Nischenmarken und komplexe Kompositionen.
          </p>
          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4a3728' }}>
            Die acht Typen auf dieser Seite sind kein wissenschaftlicher Test, sondern eine spielerische Orientierung – mit Duft-Beispielen, die zu jedem Typ passen könnten.
          </p>
        </section>

        {/* The 8 Types */}
        <section style={{ marginBottom: '3.5rem' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Die acht Typen
          </p>
          <h2 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: '1.8rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.5rem' }}>
            Welcher bist du?
          </h2>

          {/* Type 1: The Classicist */}
          <div style={{
            background: '#fff',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '14px',
            padding: '2rem',
            marginBottom: '1.5rem',
          }}>
            <h3 style={{ fontSize: '1.3rem', color: '#d4af37', fontWeight: 700, marginBottom: '0.5rem' }}>
              1. Der Klassiker
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#6b5344', marginBottom: '1rem', fontStyle: 'italic' }}>
              Zeitlos, zuverlässig, bewährt
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Persönlichkeit:</strong> Du schätzt Tradition und Bewährtes. Du traust neuen Trends nicht automatisch und magst Düfte, die seit Jahrzehnten bekannt sind. Eleganz ist dir wichtiger als Originalität. Du möchtest einen Duft, der zeitlos ist, nicht ein saisonales Trend-Ding.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Lieblingsfamilien:</strong> Woody (Sandelholz, Vetiver), Floral-Klassiker (Rose, Jasmin), Chypre. Du magst Struktur und Eleganz.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Beispiel-Düfte:</strong> Chanel No. 5, Guerlain Shalimar, Dior Eau Sauvage, Yves Saint Laurent Opium, Acqua di Parma Colonia.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#6b5344' }}>
              <strong>Warum das passt:</strong> Diese Düfte gibt es seit Jahrzehnten, und sie gelten bis heute als Klassiker – nicht weil sie neu oder trendy sind.
            </p>
          </div>

          {/* Type 2: The Romantic */}
          <div style={{
            background: '#fff',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '14px',
            padding: '2rem',
            marginBottom: '1.5rem',
          }}>
            <h3 style={{ fontSize: '1.3rem', color: '#d4af37', fontWeight: 700, marginBottom: '0.5rem' }}>
              2. Der Romantiker
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#6b5344', marginBottom: '1rem', fontStyle: 'italic' }}>
              Sensibel, emotional, gefühlsbetont
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Persönlichkeit:</strong> Für dich ist ein Duft nicht rational – er muss ein Gefühl erzeugen. Du wählst Düfte basierend auf Nostalgie, Erinnerungen oder emotionalen Assoziationen. Ein Duft kann dich an einen Moment, einen Menschen, einen Ort zurückbringen – und das ist wertvoll.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Lieblingsfamilien:</strong> Floral (Rose, Orchidee, Gardenie), Gourmand, Leicht-Holzige mit weichen Noten. Süsse Nuancen ohne Aufdringlichkeit.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Beispiel-Düfte:</strong> Dior Hypnotic Poison, Lancôme La Vie Est Belle, Diptyque Eau Rose, Juicy Couture Viva La Juicy, Chloé Eau de Parfum.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#6b5344' }}>
              <strong>Warum das passt:</strong> Diese Düfte werden oft als sinnlich und gefühlvoll empfunden.
            </p>
          </div>

          {/* Type 3: The Adventurer */}
          <div style={{
            background: '#fff',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '14px',
            padding: '2rem',
            marginBottom: '1.5rem',
          }}>
            <h3 style={{ fontSize: '1.3rem', color: '#d4af37', fontWeight: 700, marginBottom: '0.5rem' }}>
              3. Der Abenteurer
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#6b5344', marginBottom: '1rem', fontStyle: 'italic' }}>
              Mutig, experimentierfreudig, neugierig
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Persönlichkeit:</strong> Du liebst es, neue Düfte zu entdecken. Du probierst gern Unbekanntes aus und suchst oft etwas Neues. Du langweilst dich schnell und liebst es, andere mit unerwarteten Duftpicks zu überraschen. Mainstream ist für dich zu vorhersehbar.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Lieblingsfamilien:</strong> Alles, was unkonventionell ist – Nische-Marken, unerwartete Kombinationen, experimentelle Noten. Oud, grüne Noten, ungewöhnliche aromatische Akkorde.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Beispiel-Marken:</strong> Nischenmarken wie Xerjoff, Heeley oder Orto Parisi.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#6b5344' }}>
              <strong>Warum das passt:</strong> Diese Düfte sind nicht für jeden – sie sind für Menschen, die sich trauen, anders zu riechen.
            </p>
          </div>

          {/* Type 4: The Minimalist */}
          <div style={{
            background: '#fff',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '14px',
            padding: '2rem',
            marginBottom: '1.5rem',
          }}>
            <h3 style={{ fontSize: '1.3rem', color: '#d4af37', fontWeight: 700, marginBottom: '0.5rem' }}>
              4. Der Minimalist
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#6b5344', marginBottom: '1rem', fontStyle: 'italic' }}>
              Schlicht, funktional, dezent
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Persönlichkeit:</strong> Für dich ist ein Duft eine subtile Ergänzung, keine Aussage. Du magst Understatement und legst Wert darauf, dass dein Duft nicht aufdringlich ist. Ein zu starker oder zu süsser Duft ist nichts für dich. Du magst etwas Transparentes, Luftiges – kaum wahrnehmbar für andere, aber präsent für dich.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Lieblingsfamilien:</strong> Aquatische, grüne, zitrus-basierte Düfte. Im Stil von Jo Malone (unisex, leicht, transparent). Dezente Ausstrahlung.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Beispiel-Düfte:</strong> viele Jo-Malone-Düfte, Heeley Sel Marin, Davidoff Cool Water, Acqua di Parma Blu Mediterraneo.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#6b5344' }}>
              <strong>Warum das passt:</strong> Diese Düfte sind eher zurückhaltend – passend für Menschen, für die weniger mehr ist.
            </p>
          </div>

          {/* Type 5: The Sensationalist */}
          <div style={{
            background: '#fff',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '14px',
            padding: '2rem',
            marginBottom: '1.5rem',
          }}>
            <h3 style={{ fontSize: '1.3rem', color: '#d4af37', fontWeight: 700, marginBottom: '0.5rem' }}>
              5. Der Sensualist
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#6b5344', marginBottom: '1rem', fontStyle: 'italic' }}>
              Sinnlich, intensiv, verführerisch
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Persönlichkeit:</strong> Du liebst intensive, reichhaltige Düfte, die dich umhüllen und deine Sinne erobern. Für dich ist ein Duft ein sinnliches Erlebnis – am liebsten warm, süss, orientalisch oder würzig. Subtilität ist nicht dein Ding; du möchtest, dass der Duft präsent ist, auch noch viele Stunden später.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Lieblingsfamilien:</strong> Gourmand, Orientalisch, Amber, Oud, würzig-warme Noten. Vanille, Moschus, Karamell, Schokolade.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Beispiel-Düfte:</strong> Dior Hypnotic Poison, Yves Saint Laurent Black Opium, Tom Ford Tobacco Vanille, Mugler Angel, Yves Saint Laurent Opium, Xerjoff Naxos.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#6b5344' }}>
              <strong>Warum das passt:</strong> Diese Düfte sind nicht schüchtern – sie sind präsent und werden oft als besonders sinnlich empfunden.
            </p>
          </div>

          {/* Type 6: The Professional */}
          <div style={{
            background: '#fff',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '14px',
            padding: '2rem',
            marginBottom: '1.5rem',
          }}>
            <h3 style={{ fontSize: '1.3rem', color: '#d4af37', fontWeight: 700, marginBottom: '0.5rem' }}>
              6. Der Profi
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#6b5344', marginBottom: '1rem', fontStyle: 'italic' }}>
              Praktisch, pragmatisch, zuverlässig
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Persönlichkeit:</strong> Für dich ist ein Duft funktional. Er muss „gut aussehen" in einem Geschäftsumfeld, darf nicht zu extravagant sein, aber auch nicht zu fade. Du brauchst etwas, das dich den ganzen Tag frisch hält – im Büro, in Meetings, ohne aufdringlich zu sein. Es geht weniger um persönlichen Ausdruck und mehr um einen professionellen Auftritt.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Lieblingsfamilien:</strong> Aromatisch, Frisch-Holzig, klassische Herrendüfte (tragbar für alle Geschlechter). Unisex-Düfte passen oft gut.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Beispiel-Düfte:</strong> Dior Sauvage, Bleu de Chanel, Chanel Allure Homme, Heeley Sel Marin, Creed Aventus.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#6b5344' }}>
              <strong>Warum das passt:</strong> Diese Düfte wirken auf viele „sauber" und gepflegt – passend für jemanden, der im Geschäftsumfeld einen dezenten Eindruck machen möchte.
            </p>
          </div>

          {/* Type 7: The Collector */}
          <div style={{
            background: '#fff',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '14px',
            padding: '2rem',
            marginBottom: '1.5rem',
          }}>
            <h3 style={{ fontSize: '1.3rem', color: '#d4af37', fontWeight: 700, marginBottom: '0.5rem' }}>
              7. Der Sammler
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#6b5344', marginBottom: '1rem', fontStyle: 'italic' }}>
              Leidenschaftlich, kenntnisreich, obsessiv
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Persönlichkeit:</strong> Für dich ist Duft nicht ein Produkt, sondern eine Passion. Du kennst die Unterschiede zwischen Eau de Toilette und Eau de Parfum, du verstehst Akkordfamilien, und deine Sammlung ist ein Portfolio deines Geschmacks. Du liebst es zu recherchieren, zu vergleichen und die „beste" Version jeder Kategorie zu finden.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Lieblingsfamilien:</strong> Alle, je nach Sammlung – es geht um Wissen und Vielfalt. Du hast gern einen Duft pro Jahreszeit, pro Anlass, pro Stimmung.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Beispiele:</strong> Düfte von Creed oder Xerjoff, weitere Nischenmarken, Raritäten, limitierte Editionen.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#6b5344' }}>
              <strong>Warum das passt:</strong> Diese Düfte belohnen Wissen und Neugier – passend für jemanden, der Duft als intensives Hobby sieht.
            </p>
          </div>

          {/* Type 8: The Trendsetter */}
          <div style={{
            background: '#fff',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '14px',
            padding: '2rem',
            marginBottom: '1.5rem',
          }}>
            <h3 style={{ fontSize: '1.3rem', color: '#d4af37', fontWeight: 700, marginBottom: '0.5rem' }}>
              8. Der Trendsetter
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#6b5344', marginBottom: '1rem', fontStyle: 'italic' }}>
              Modebewusst, neugierig, gern vorne mit dabei
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Persönlichkeit:</strong> Du magst es, das zu haben, was andere noch nicht kennen – aber du wirst auch schnell ungeduldig und wechselst zu etwas Neuem. Für dich ist ein Duft auch ein Mode-Statement. Es geht dir oft auch darum, was gerade aktuell ist.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Lieblingsfamilien:</strong> Was gerade im Moment ist – könnte alles sein. Du interessierst dich für Influencer-Tipps, Celebrity-Düfte und Nischenmarken, die gerade im Trend sind.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Beispiel-Düfte:</strong> Ariana Grande Cloud, Billie Eilish Eilish, aktuelle Nischen-Neuheiten, weitere Celebrity-Düfte.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#6b5344' }}>
              <strong>Warum das passt:</strong> Diese Düfte sind gerade im Gespräch – und genau das reizt dich.
            </p>
          </div>
        </section>

        {/* Blending Types */}
        <section style={{ marginBottom: '3.5rem' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Die Realität
          </p>
          <h2 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: '1.8rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.5rem' }}>
            Du bist wahrscheinlich eine Mischung
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4a3728', marginBottom: '1.2rem' }}>
            Die acht Typen sind vereinfachte Archetypen – kaum jemand passt genau in einen Typ. Viele erkennen sich in zwei oder drei Typen wieder. Ein „Klassiker mit Abenteurer-Zügen" trägt gern Bewährtes, experimentiert aber auch mit Nischenmarken. Ein „Romantiker mit Sensualist-Zügen" trägt hauptsächlich Gourmand-Düfte, mag aber manchmal etwas Rose und Jasmin.
          </p>
          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4a3728', marginBottom: '1.2rem' }}>
            Das ist vollkommen normal. Auch Vorlieben können sich mit Alter, Lebensphasen und Erfahrungen verändern. Ein Typ, der mit 20 Jahren „Trendsetter" war, wird mit 35 Jahren möglicherweise zum „Klassiker".
          </p>
          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4a3728' }}>
            Das Auressa-Quiz fragt deshalb nicht nach einem Typ, sondern nach deinen konkreten Vorlieben – etwa Duftfamilie, Lieblingsnote, Anlass, Jahreszeit und Budget. Je besser du deinen Geschmack kennst, desto leichter findest du Düfte, die zu dir passen.
          </p>
        </section>

        {/* Using This */}
        <section style={{ marginBottom: '3.5rem' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Praktische Nutzung
          </p>
          <h2 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: '1.8rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.5rem' }}>
            Wie du deine Duftpersönlichkeit für bessere Entscheidungen nutzt
          </h2>
          <div style={{ background: '#fff', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '14px', padding: '1.8rem', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#2a1d12', fontWeight: 700, marginBottom: '1rem' }}>
              1. Erkenne dich selbst
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#4a3728', margin: 0 }}>
              Lies die acht Typen und frage dich: In welchem erkenne ich mich am ehesten wieder? Das ist nur ein Anhaltspunkt – entscheidend ist, was dir gefällt.
            </p>
          </div>
          <div style={{ background: '#fff', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '14px', padding: '1.8rem', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#2a1d12', fontWeight: 700, marginBottom: '1rem' }}>
              2. Vertraue nicht blind auf Tests
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#4a3728', margin: 0 }}>
              Online-„Welcher Duft passt zu dir?"-Tests sind oft oberflächlich. Auch diese Typen sind nur eine grobe Orientierung. Ein paar Ideen: Wenn du ein Sammler bist, lies Rezensionen und recherchiere. Wenn du ein Klassiker bist, schau dir bewährte Klassiker an. Wenn du ein Abenteurer bist, probiere unbekannte Marken.
            </p>
          </div>
          <div style={{ background: '#fff', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '14px', padding: '1.8rem', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#2a1d12', fontWeight: 700, marginBottom: '1rem' }}>
              3. Nutze das Auressa-Quiz strategisch
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#4a3728', margin: 0 }}>
              Das Auressa-Quiz berechnet aus deinen Antworten zu Vorlieben (z. B. Duftfamilie, Noten, Anlass, Budget) eine Übereinstimmung mit den Düften im Katalog – es versucht nicht, deine Persönlichkeit zu erraten. Die Typen auf dieser Seite können dir aber helfen, deine Antworten bewusster zu geben.
            </p>
          </div>
          <div style={{ background: '#fff', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '14px', padding: '1.8rem' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#2a1d12', fontWeight: 700, marginBottom: '1rem' }}>
              4. Erlaube dir, mehrere Düfte zu haben
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#4a3728', margin: 0 }}>
              Deine Duftpersönlichkeit ist nicht monolithisch. Ein Klassiker kann einen Abend-Duft vom Abenteurer haben. Ein Sammler kann einen „professionellen Alltags-Duft" für das Büro haben. Es ist völlig ok, verschiedene Seiten deiner Persönlichkeit mit verschiedenen Düften auszudrücken.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Häufig gefragt
          </p>
          <h2 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: '1.8rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.5rem' }}>
            FAQ
          </h2>

          <details style={{ marginBottom: '1rem', padding: '1.2rem', background: '#fff', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '10px' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 700, color: '#2a1d12', fontSize: '0.95rem' }}>
              Was ist, wenn ich in keine der Kategorien passe?
            </summary>
            <p style={{ fontSize: '0.9rem', color: '#4a3728', lineHeight: 1.7, marginTop: '0.8rem', margin: '0.8rem 0 0 0' }}>
              Das ist völlig normal. Die acht Typen sind vereinfachte Archetypen, keine vollständige Einteilung aller Menschen. Vermutlich bist du eine Mischung. Versuche, zwei oder drei Typen zu kombinieren, die dir entsprechen, und nutze diese kombinierten Perspektiven.
            </p>
          </details>

          <details style={{ marginBottom: '1rem', padding: '1.2rem', background: '#fff', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '10px' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 700, color: '#2a1d12', fontSize: '0.95rem' }}>
              Ändert sich meine Duftpersönlichkeit mit der Zeit?
            </summary>
            <p style={{ fontSize: '0.9rem', color: '#4a3728', lineHeight: 1.7, marginTop: '0.8rem', margin: '0.8rem 0 0 0' }}>
              Das ist gut möglich. Bei vielen verändern sich die Duftvorlieben mit Alter, Erfahrung und Lebensphasen. Ein Trendsetter mit 18 Jahren könnte mit 30 Jahren eher Klassiker mögen. Das ist nicht widersprüchlich.
            </p>
          </details>

          <details style={{ marginBottom: '1rem', padding: '1.2rem', background: '#fff', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '10px' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 700, color: '#2a1d12', fontSize: '0.95rem' }}>
              Kann mein Duft meine Persönlichkeit ändern?
            </summary>
            <p style={{ fontSize: '0.9rem', color: '#4a3728', lineHeight: 1.7, marginTop: '0.8rem', margin: '0.8rem 0 0 0' }}>
              Manche Menschen fühlen sich mit einem bestimmten Duft wohler oder selbstbewusster – das ist ein persönliches Empfinden. Dass ein Duft deine Persönlichkeit verändert, ist nicht belegt. Ein Duft ist eine Ergänzung, keine Verwandlung.
            </p>
          </details>

          <details style={{ marginBottom: '1rem', padding: '1.2rem', background: '#fff', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '10px' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 700, color: '#2a1d12', fontSize: '0.95rem' }}>
              Ist meine Duftpersönlichkeit geschlechtsspezifisch?
            </summary>
            <p style={{ fontSize: '0.9rem', color: '#4a3728', lineHeight: 1.7, marginTop: '0.8rem', margin: '0.8rem 0 0 0' }}>
              Nein. Ein Mann kann ein Romantiker sein (und trägt dann floral-süssliche Düfte), eine Frau kann ein Klassiker sein (und trägt zeitlose Woody-Düfte). Die Typen sind nicht an ein Geschlecht gebunden. Ein guter Tipp: Lass dich nicht vom Marketing einschränken. Wenn dir ein Duft gefällt, trag ihn – unabhängig davon, wie er vermarktet wird.
            </p>
          </details>

          <details style={{ marginBottom: '1rem', padding: '1.2rem', background: '#fff', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '10px' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 700, color: '#2a1d12', fontSize: '0.95rem' }}>
              Wie nutze ich das für das Auressa-Quiz?
            </summary>
            <p style={{ fontSize: '0.9rem', color: '#4a3728', lineHeight: 1.7, marginTop: '0.8rem', margin: '0.8rem 0 0 0' }}>
              Nimm das Quiz und beantworte die Fragen ehrlich – nicht basierend auf dieser Seite, sondern basierend auf deinen echten Vorlieben. Wenn du dein Ergebnis hast, können dir die Typen helfen, die Vorschläge einzuordnen. Wenn das Top-Match zu dir passt, grossartig. Wenn nicht, schau dir die weiteren Treffer an – vielleicht passt einer davon besser.
            </p>
          </details>
        </section>

        {/* CTA */}
        <section style={{ marginBottom: '2rem', textAlign: 'center' }}>
          <Link href="/quiz" style={{
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
            Zu deinem Duft-Quiz →
          </Link>
        </section>
      </div>
    </main>
  );
}
