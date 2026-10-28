import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/app/Breadcrumb';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export const metadata: Metadata = {
  title: 'Duftpersönlichkeit: Welcher Duft passt zu deinem Charakter?',
  description:
    'Entdecke, wie deine Persönlichkeit deinen idealen Duft formt. Von klassischen bis modernen Typen – finde heraus, welche Duftfamilien zu dir passen.',
  alternates: { canonical: `${SITE_URL}/duftpersoenlichkeit` },
  openGraph: {
    title: 'Duftpersönlichkeit | Auressa',
    description: 'Finde deinen Duft basierend auf deinem Persönlichkeitstyp.',
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
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            marginBottom: '1rem',
            lineHeight: 1.15,
            color: '#faf7f2',
          }}>
            Duftpersönlichkeit
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(250,247,242,0.75)', margin: 0, lineHeight: 1.6 }}>
            Dein Duft ist eine Erweiterung deiner Persönlichkeit. Lerne, wie dein Charakter deine ideale Duftfamilie formt – und warum ein scheinbar „zufälliger" Lieblingsduft eigentlich sehr logisch ist.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '3.5rem 1.25rem' }}>

        {/* The Philosophy */}
        <section style={{ marginBottom: '3.5rem' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Die Grundidee
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.5rem' }}>
            Dein Duft ist nicht Zufall, sondern Ausdruck
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4a3728', marginBottom: '1.2rem' }}>
            Es gibt einen tiefen Grund, warum manche Menschen Creed Aventus lieben (klassisch, selbstvertrauend, zeitlos) und andere Xerjoff Naxos bevorzugen (unkonventionell, künstlerisch, mutig). Ein Duft ist nicht nur Chemie – er ist auch eine subtile Aussage über wer du bist.
          </p>
          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4a3728', marginBottom: '1.2rem' }}>
            Forschung zeigt: Die Duftpräferenz korreliert stark mit Persönlichkeitsmerkmalen wie Risikobereitschaft, Kreativität, Tradition und sozialer Ausrichtung. Ein konservativer, zuverlässiger Mensch wird sich oft zu klassischen, bewährten Düften hingezogen fühlen. Ein kreativer, experimentierfreudiger Mensch sucht unkonventionelle Nischenmarken und komplexe Kompositionen.
          </p>
          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4a3728' }}>
            Das ist nicht Aberglaube – es ist Psychologie. Diese Seite zeigt die acht Duftpersönlichkeitstypen und welche Düfte sie typischerweise bevorzugen.
          </p>
        </section>

        {/* The 8 Types */}
        <section style={{ marginBottom: '3.5rem' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Die acht Typen
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.5rem' }}>
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
              <strong>Persönlichkeit:</strong> Du schätzt Tradition und Bewährtes. Du traust neuen Trends nicht automatisch und präferierst Düfte, die seit Jahrzehnten bekannt sind. Eleganz ist dir wichtiger als Originalität. Du möchtest einen Duft, der zeitlos ist, nicht ein saisonales Trend-Ding.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Lieblingsfamilien:</strong> Woody (Sandelholz, Vetiver), Floral-Klassiker (Rose, Jasmin), Chypre. Du magst Struktur und Eleganz.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Ikonische Düfte:</strong> Creed Aventus, Bleu de Chanel, Dior Sauvage, Chanel No. 5, Opium, Acqua di Parma Colonia.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#6b5344' }}>
              <strong>Warum das passt:</strong> Diese Düfte haben sich bewährt, weil sie echte Qualität sind – nicht weil sie neu oder trendy sind. Ein klassischer Mensch erkennt das.
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
              <strong>Lieblingsfamilien:</strong> Floral (Rosen, Orchideen, Gardenias), Gourmand, Leicht-Holzige mit weichen Noten. Süsse Nuancen ohne Aufdringlichkeit.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Ikonische Düfte:</strong> Hypnotic Poison, L'Artisan Parfumeur Timbuktu, Diptyque L'Eau Rose, Juicy Couture, Chloe.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#6b5344' }}>
              <strong>Warum das passt:</strong> Diese Düfte sind sinnlich und emotional – sie arbeiten mit Gefühlen, nicht nur mit Logik.
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
              <strong>Persönlichkeit:</strong> Du liebst es, neue Düfte zu entdecken. Du kaufst blind, testest experimentell und brauchst ständig etwas Neues. Du langweilst dich schnell und liebst es, andere mit unerwarteten Duftpicks zu überraschen. Mainstream ist für dich zu vorhersehbar.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Lieblingsfamilien:</strong> Alles, was unkonventionell ist – Nische-Marken, unerwartete Kombinationen, experimentelle Noten. Oud, grüne Noten, aromatische Bizarre.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Ikonische Düfte:</strong> Niche-Marken wie Xerjoff, Heeley, Orto Parisi, Carlisle, Givenchy Gentleman Reserve Privée.
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
              <strong>Persönlichkeit:</strong> Für dich ist ein Duft eine subtile Ergänzung, keine Aussage. Du magst Understatement und legst Wert darauf, dass dein Duft nicht aufdringlich ist. Ein zu starker oder zu süsser Duft ist für dich unmöglich. Du brauchst etwas Transparentes, Luftiges, kaum Wahrnehmbar für andere, aber präsent für dich.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Lieblingsfamilien:</strong> Aquatische, grüne, zitrus-basierte Düfte. Jo Malone-Style (unisex, leicht, transparent). Minimal Sillage.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Ikonische Düfte:</strong> Jo Malone (alle), Heeley Sel Marin, Davidoff Cool Water, Acqua di Parma Blu Mediterraneo, L'Eau de Tisserand.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#6b5344' }}>
              <strong>Warum das passt:</strong> Diese Düfte respektieren Raum und Unterstatement – perfekt für Menschen, denen weniger mehr ist.
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
              <strong>Persönlichkeit:</strong> Du liebst intensive, reichhaltige Düfte, die dich umhüllen und deine Sinne erobern. Für dich ist ein Duft ein sinnliches Erlebnis – am liebsten warm, süss, orientalisch oder würzig. Subtilität ist nicht dein Ding; du möchtest, dass der Duft präsent ist, auch 8 Stunden später.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Lieblingsfamilien:</strong> Gourmand, Orientalisch, Amber, Oud, würzig-warme Noten. Vanille, Moschus, Karamell, Schokolade.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Ikonische Düfte:</strong> Hypnotic Poison, Black Opium, Tobacco Vanille, Angel, Opium, Xerjoff Naxos.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#6b5344' }}>
              <strong>Warum das passt:</strong> Diese Düfte sind nicht zu schüchtern – sie sind vorhanden, präsent und unwiderstehlich sinnlich.
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
              <strong>Persönlichkeit:</strong> Für dich ist ein Duft funktional. Er muss „gut aussehen" in einem Geschäftsumfeld, darf nicht zu extravagant sein, aber auch nicht zu fade. Du brauchst etwas, das dich den ganzen Tag frisch hält – im Büro, in Meetings, ohne zu absorbierend zu sein. Es geht weniger um persönlichen Ausdruck und mehr um professionelle Kompetenz.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Lieblingsfamilien:</strong> Aromatisch, Frisch-Holzig, klassische Männerdüfte (für alle Geschlechter). Unisex ist dein idealer Standard.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Ikonische Düfte:</strong> Dior Sauvage, Bleu de Chanel, Allure Homme, Heeley Sel Marin, Creed Aventus.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#6b5344' }}>
              <strong>Warum das passt:</strong> Diese Düfte sind „sauber" im Sinne von professionell und subtil – perfekt für jemanden, der sein Duftprofil im Geschäftsumfeld sorgfältig kuratiert.
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
              <strong>Lieblingsfamilien:</strong> Alle, je nach Sammlung – es geht um Wissen und Vielfalt. Du brauchst einen Duft pro Jahreszeit, pro Anlass, pro Stimmung.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Ikonische Düfte:</strong> Creed-Kollektion, Xerjoff-Kollektion, nische-spezialisierte Marken, Raritäten, limitierte Editionen.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#6b5344' }}>
              <strong>Warum das passt:</strong> Diese Düfte erfordern Wissen und Appreciation – perfekt für jemanden, der Duft als ein tiefes Hobby sieht.
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
              Modebewusst, einflussreich, immer einen Schritt voraus
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Persönlichkeit:</strong> Du magst es, das zu haben, was andere noch nicht kennen – aber du wirst auch schnell ungeduldig und wechselst zu etwas Neuem. Für dich ist ein Duft ein Mode-Statement, ein Signal deiner zeitlichen Position. Es geht weniger um persönliche Vorliebe und mehr um kulturelle Relevanz.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Lieblingsfamilien:</strong> Was gerade im Moment ist – könnte alles sein. Du folgst Influencern, Celebrity-Düften und Niche-Marken, die gerade im Trend sind.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Ikonische Düfte:</strong> Ariana Grande Cloud, The Weeknd XO, Hailey Bieber Rhode, aktuelle Niche-Releases, Celebrity-Düfte.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#6b5344' }}>
              <strong>Warum das passt:</strong> Diese Düfte haben einen kulturellen Moment – und das ist genau das, was für dich wichtig ist.
            </p>
          </div>
        </section>

        {/* Blending Types */}
        <section style={{ marginBottom: '3.5rem' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Die Realität
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.5rem' }}>
            Du bist wahrscheinlich eine Mischung
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4a3728', marginBottom: '1.2rem' }}>
            Die acht Typen sind Archetypen – kaum jemand ist 100% ein Typ. Die meisten Menschen sind eine Mischung aus 2-3 Typen. Ein „Klassiker mit Adventure-Tendenzen" liebt Creed Aventus, experimentiert aber auch gerne mit Niche-Marken. Ein „Romantiker mit Sensualist-Zügen" trägt hauptsächlich Gourmand-Düfte, mag aber manchmal etwas Roses &amp; Jasmin für die emotionale Komponente.
          </p>
          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4a3728', marginBottom: '1.2rem' }}>
            Das ist vollkommen normal. Deine Duftpersönlichkeit entwickelt sich auch – mit Alter, Lebensphasen und Erfahrungen ändern sich deine Vorlieben. Ein Typ, der mit 20 Jahren „Trendsetter" war, wird mit 35 Jahren möglicherweise zum „Klassiker".
          </p>
          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4a3728' }}>
            Das Quiz auf Auressa funktioniert auf dieser Ebene: Es versucht zu verstehen, nicht zu kategorisieren. Je besser du deine eigene Duftpersönlichkeit verstehst, desto besser wirst du Düfte wählen, die wirklich zu dir passen – nicht zu einer Kategorie, sondern zu dir als Individuum.
          </p>
        </section>

        {/* Using This */}
        <section style={{ marginBottom: '3.5rem' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Praktische Nutzung
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.5rem' }}>
            Wie du deine Duftpersönlichkeit für bessere Entscheidungen nutzt
          </h2>
          <div style={{ background: '#fff', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '14px', padding: '1.8rem', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#2a1d12', fontWeight: 700, marginBottom: '1rem' }}>
              1. Erkenne dich selbst
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#4a3728', margin: 0 }}>
              Lese die acht Typen und frage dich: Welcher bin ich hauptsächlich? (Nicht: Welcher möchte ich sein?) Das ist wichtig – wähle basierend auf wer du bist, nicht wer du sein möchtest.
            </p>
          </div>
          <div style={{ background: '#fff', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '14px', padding: '1.8rem', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#2a1d12', fontWeight: 700, marginBottom: '1rem' }}>
              2. Vertraue nicht blind auf Tests
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#4a3728', margin: 0 }}>
              Online-„Welcher Duft passt zu dir?"-Tests sind oft oberflächlich. Verwende diesen Rahmen stattdessen als Leitfaden: Wenn du ein Sammler bist, lies Rezensionen und recherchiere. Wenn du ein Klassiker bist, vertraue auf bewährte Bestseller. Wenn du ein Abenteurer bist, probiere unbekannte Marken.
            </p>
          </div>
          <div style={{ background: '#fff', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '14px', padding: '1.8rem', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#2a1d12', fontWeight: 700, marginBottom: '1rem' }}>
              3. Nutze das Auressa-Quiz strategisch
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#4a3728', margin: 0 }}>
              Das Auressa-Quiz ist so gestaltet, dass es deine Vorlieben mathematisch abbildet, nicht deine Persönlichkeit zu erraten versucht. Aber jetzt, da du weisst, wer du bist, kannst du die Quiz-Antworten gezielter geben. Ein Klassiker wählt „bewährte Duftfamilien"; ein Abenteurer wählt „alle unkonventionellen Optionen".
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
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.5rem' }}>
            FAQ
          </h2>

          <details style={{ marginBottom: '1rem', padding: '1.2rem', background: '#fff', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '10px' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 700, color: '#2a1d12', fontSize: '0.95rem' }}>
              Was ist, wenn ich in keine der Kategorien passe?
            </summary>
            <p style={{ fontSize: '0.9rem', color: '#4a3728', lineHeight: 1.7, marginTop: '0.8rem', margin: '0.8rem 0 0 0' }}>
              Das ist völlig normal. Die acht Typen sind Archetypen, nicht eine vollständige Klassifikation aller Menschen. Du bist wahrscheinlich eine Mischung. Versuche, zwei oder drei Typen zu kombinieren, die dir entsprechen, und nutze diese kombinierten Perspektiven.
            </p>
          </details>

          <details style={{ marginBottom: '1rem', padding: '1.2rem', background: '#fff', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '10px' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 700, color: '#2a1d12', fontSize: '0.95rem' }}>
              Ändert sich meine Duftpersönlichkeit mit der Zeit?
            </summary>
            <p style={{ fontSize: '0.9rem', color: '#4a3728', lineHeight: 1.7, marginTop: '0.8rem', margin: '0.8rem 0 0 0' }}>
              Ja, definitiv. Mit Alter, Erfahrung und Lebensphasen entwickelt sich deine Persönlichkeit – und damit auch deine Duftvorlieben. Ein Trendsetter mit 18 Jahren könnte mit 30 Jahren ein Klassiker sein. Das ist nicht widersprüchlich, es ist Wachstum.
            </p>
          </details>

          <details style={{ marginBottom: '1rem', padding: '1.2rem', background: '#fff', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '10px' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 700, color: '#2a1d12', fontSize: '0.95rem' }}>
              Kann mein Duft meine Persönlichkeit ändern?
            </summary>
            <p style={{ fontSize: '0.9rem', color: '#4a3728', lineHeight: 1.7, marginTop: '0.8rem', margin: '0.8rem 0 0 0' }}>
              Ein Duft kann deine Wahrnehmung von dir selbst subtil beeinflussen – ein Phänomen, das Psychologen „Enclothed Cognition" nennen. Wenn du dich einen Monat lang wie ein Klassiker riechst, wirst du wahrscheinlich auch klassischer denken. Aber deine Grundpersönlichkeit ändert sich nicht. Ein Duft ist eine Erweiterung, nicht eine Transformation.
            </p>
          </details>

          <details style={{ marginBottom: '1rem', padding: '1.2rem', background: '#fff', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '10px' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 700, color: '#2a1d12', fontSize: '0.95rem' }}>
              Ist meine Duftpersönlichkeit geschlechtsspezifisch?
            </summary>
            <p style={{ fontSize: '0.9rem', color: '#4a3728', lineHeight: 1.7, marginTop: '0.8rem', margin: '0.8rem 0 0 0' }}>
              Nein. Ein Mann kann ein Romantiker sein (und trägt dann floral-süssliche Düfte), eine Frau kann ein Klassiker sein (und trägt zeitlose Woody-Düfte). Duftpersönlichkeit ist völlig orthogonal zu Geschlecht. Die beste Guideline: Ignoriere das Marketing. Wenn deine Persönlichkeit sagt, dass du einen Duft magst, trag ihn – unabhängig davon, wie er vermarktet wird.
            </p>
          </details>

          <details style={{ marginBottom: '1rem', padding: '1.2rem', background: '#fff', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '10px' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 700, color: '#2a1d12', fontSize: '0.95rem' }}>
              Wie nutze ich das für das Auressa-Quiz?
            </summary>
            <p style={{ fontSize: '0.9rem', color: '#4a3728', lineHeight: 1.7, marginTop: '0.8rem', margin: '0.8rem 0 0 0' }}>
              Nimm das Quiz und beantworte die Fragen ehrlich – nicht basierend auf dieser Seite, sondern basierend auf deinen echten Vorlieben. Nachdem du dein Ergebnis bekommst, nutze dein Verständnis der Duftpersönlichkeit, um die Ergebnisse zu interpretieren. Wenn das Top-Match zu deiner Persönlichkeit passt, grossartig. Wenn nicht, versuche, die Alternative zu verstehen, die besser passt.
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
