import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/app/SiteHeader';
import Breadcrumb from '@/app/Breadcrumb';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export const metadata: Metadata = {
  title: 'Minimalistische Duftkollektion: Das 3er-Framework',
  description:
    'Wie viele Düfte brauchst du wirklich? Das 3er-Framework: ein Alltags-Duft, ein Abend-Duft, ein Sommer-Duft. Das ist genug.',
  alternates: { canonical: `${SITE_URL}/duftkollektion-minimal` },
  openGraph: {
    title: 'Minimalistische Duftkollektion | Auressa',
    description: 'Weniger ist mehr: Wie du mit nur 3 Düften alles abdeckst.',
    url: `${SITE_URL}/duftkollektion-minimal`,
    type: 'website',
  },
};

export default function DuftkolektionMinimal() {
  return (
    <main style={{ backgroundColor: '#faf7f2' }}>
      <SiteHeader />
      <Breadcrumb items={[{ label: 'Minimalistische Duftkollektion', href: '/duftkollektion-minimal' }]} />

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
            ✨ Weniger ist Mehr ✨
          </p>
          <h1 style={{
            fontSize: 'clamp(28px, 6vw, 44px)',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            marginBottom: '1rem',
            lineHeight: 1.15,
            color: '#faf7f2',
          }}>
            Minimalistische Duftkollektion
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(250,247,242,0.75)', margin: 0, lineHeight: 1.6 }}>
            Du brauchst nicht 50 Düfte, um gut zu riechen. Drei großartige Düfte reichen aus – wenn du weißt, welche drei. Das 3er-Framework.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '3.5rem 1.25rem' }}>

        {/* The Philosophy */}
        <section style={{ marginBottom: '3.5rem' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Die Philosophie
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.5rem' }}>
            Warum weniger besser ist
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4a3728', marginBottom: '1.2rem' }}>
            Es gibt zwei Arten von Duft-Sammlern: Minimalisten und Enthusiasten. Ein Enthusiast hat 20+ Düfte – eine für jede Stimmung, jeden Tag, jede Jahreszeit. Ein Minimalist hat 3. Beide sind vollkommen valide. Aber der Minimalist hat einen großen Vorteil: Er kennt seine Düfte wirklich. Er weiß, wann welcher Duft passt. Er hat nicht zu viele, um sie regelmäßig zu tragen.
          </p>
          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4a3728', marginBottom: '1.2rem' }}>
            Die Realität: Die meisten Menschen haben zu viele Düfte und tragen sie nicht. Du kaufst einen neuen Duft, bist begeistert, trägst ihn zwei Wochen lang, dann kommt eine neue Obsession, und der erste Duft sitzt in der Ecke. Nach zwei Jahren hast du 20 Flakons, von denen du vielleicht 3 regelmäßig trägst.
          </p>
          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4a3728' }}>
            Ein minimalistisches 3er-Framework bedeutet: Du hast genug für jeden Kontext, aber nicht so viel, dass es überwältigend wird. Du brauchst nicht mehr auszuwählen. Du weißt einfach: Montag im Büro = Duft #1. Freitagabend = Duft #2. Juli = Duft #3. Das ist Klarheit.
          </p>
        </section>

        {/* The 3-Fragrance Framework */}
        <section style={{ marginBottom: '3.5rem' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Das Framework
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.5rem' }}>
            Die drei Kategorien
          </h2>

          {/* Category 1: The Daily Driver */}
          <div style={{
            background: '#fff',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '14px',
            padding: '2rem',
            marginBottom: '1.5rem',
          }}>
            <h3 style={{ fontSize: '1.3rem', color: '#d4af37', fontWeight: 700, marginBottom: '0.5rem' }}>
              1. Der Alltags-Duft (Daily Driver)
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#6b5344', marginBottom: '1rem', fontStyle: 'italic' }}>
              Büro, Einkaufen, Alltag – 80% deines Lebens
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              Das ist der Duft, den du am häufigsten trägst. Der sollte dezent, angenehm und nicht zu auffällig sein. Er sollte 6-8 Stunden halten und in jedem Kontext funktionieren: Büro, Coffee-Shop, Supermarkt. Nicht zu süß, nicht zu würzig – einfach immer richtig.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Frauen-Beispiele:</strong> Allure von Chanel, Dolce Gabbana Light Blue, Jo Malone Wood Sage Sea Salt.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Männer-Beispiele:</strong> Bleu de Chanel, Acqua di Gio, Heeley Sel Marin.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#6b5344' }}>
              <strong>Das Budget:</strong> CHF 100–150 für einen guten Alltags-Duft ist realistisch. Das ist die beste Investition, weil du ihn jeden Tag trägst.
            </p>
          </div>

          {/* Category 2: The Evening/Special Occasion */}
          <div style={{
            background: '#fff',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '14px',
            padding: '2rem',
            marginBottom: '1.5rem',
          }}>
            <h3 style={{ fontSize: '1.3rem', color: '#d4af37', fontWeight: 700, marginBottom: '0.5rem' }}>
              2. Der Abend-Duft (Special Occasion)
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#6b5344', marginBottom: '1rem', fontStyle: 'italic' }}>
              Dates, Party, wichtige Momente – 15% deines Lebens
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              Das ist dein „Wow"-Duft. Intensiver, sensueller, unvergesslicher. Ein Duft, der im Büro zu viel wäre, aber beim Date perfekt. Das kann gourmand, orientalisch, intensiv-holzig sein – etwas mit Präsenz und Charakter. Der sollte 8+ Stunden halten.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Frauen-Beispiele:</strong> Black Opium, Hypnotic Poison, Chloe, Yves Saint Laurent Mon Paris.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Männer-Beispiele:</strong> Tobacco Vanille, Creed Aventus, Tom Ford Ombré Leather, Dior Homme Intense.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#6b5344' }}>
              <strong>Das Budget:</strong> CHF 80–200. Dieser Duft wird weniger häufig getragen, also kannst du hier splurgen – aber nicht zu viel.
            </p>
          </div>

          {/* Category 3: The Seasonal Rotation */}
          <div style={{
            background: '#fff',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '14px',
            padding: '2rem',
            marginBottom: '1.5rem',
          }}>
            <h3 style={{ fontSize: '1.3rem', color: '#d4af37', fontWeight: 700, marginBottom: '0.5rem' }}>
              3. Der Saison-Duft (Seasonal)
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#6b5344', marginBottom: '1rem', fontStyle: 'italic' }}>
              Sommer oder Winter – Anpassung an die Temperatur
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              Im Sommer brauchst du etwas Frisches, Leichtes. Im Winter etwas Wärmeres, Schwereres. Statt zwei verschiedene „Alltags-Düfte" für Sommer und Winter zu haben, könntest du auch einfach deinen Alltags-Duft im Sommer leichter auftragen und im Winter ein bisschen intensiver. Aber die praktische Lösung ist: Ein leichter Sommer-Duft, der völlig anders ist als dein Winter-Alltags-Duft.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Sommer-Beispiele:</strong> Davidoff Cool Water, Jo Malone Grapefruit, Acqua di Gio, Diptyque L'Eau Rose.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Winter-Beispiele:</strong> Amber Solaire, Cinnamon Spice, Tobacco Vanille (warmer), Dior Hypnotic Poison (reichhaltiger).
            </p>
            <p style={{ fontSize: '0.95rem', color: '#6b5344' }}>
              <strong>Das Budget:</strong> CHF 60–120. Dieser Duft wird saisonal getragen – nicht den ganzen Jahr über.
            </p>
          </div>
        </section>

        {/* The Concept */}
        <section style={{ marginBottom: '3.5rem' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Das Konzept
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.5rem' }}>
            Wie die drei Düfte zusammenarbeiten
          </h2>

          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4a3728', marginBottom: '1.5rem' }}>
            Hier ist das Schöne am 3er-Framework: Die Düfte sind völlig unterschiedlich in Charakter, aber zusammen decken sie dein ganzes Leben ab. Die drei sollten NOT ähnlich sein – sie sollten verschiedene Rollen erfüllen.
          </p>

          <div style={{
            background: 'linear-gradient(135deg, #2a1d12 0%, #3d2b1a 100%)',
            borderRadius: '16px',
            padding: '2rem 1.5rem',
            color: '#faf7f2',
            marginBottom: '1.5rem',
          }}>
            <p style={{ fontSize: '0.95rem', color: '#d4af37', fontWeight: 700, marginBottom: '1rem', margin: '0 0 1rem 0' }}>
              Beispiel-Kombination für Frauen:
            </p>
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.9rem', color: '#d4af37', fontWeight: 700, marginBottom: '0.2rem' }}>
                Alltag: Allure Sensuelle (klassisch, süß, zeitlos)
              </p>
              <p style={{ fontSize: '0.9rem', color: 'rgba(250,247,242,0.8)', lineHeight: 1.6, margin: '0.2rem 0 0 0' }}>
                Warum: Dezent, angenehm, funktioniert überall. Tägliches Rückgrat.
              </p>
            </div>
            <div style={{ marginBottom: '1rem' }}>
              <p style={{ fontSize: '0.9rem', color: '#d4af37', fontWeight: 700, marginBottom: '0.2rem' }}>
                Abend: Black Opium (intensiv, gourmand, mutig)
              </p>
              <p style={{ fontSize: '0.9rem', color: 'rgba(250,247,242,0.8)', lineHeight: 1.6, margin: '0.2rem 0 0 0' }}>
                Warum: Völlig anders – würzig, kaffeeig, sinnlich. Perfect für Abend. Keine Überlappung mit Allure.
              </p>
            </div>
            <div>
              <p style={{ fontSize: '0.9rem', color: '#d4af37', fontWeight: 700, marginBottom: '0.2rem' }}>
                Sommer: Jo Malone Grapefruit (frisch, minimal, erfrischend)
              </p>
              <p style={{ fontSize: '0.9rem', color: 'rgba(250,247,242,0.8)', lineHeight: 1.6, margin: '0.2rem 0 0 0' }}>
                Warum: Völlig leicht, komplett anders. Im Juli brauchst du das. Keine Überlappung.
              </p>
            </div>
          </div>

          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4a3728', marginBottom: '1.2rem' }}>
            Die Magie hier ist: Diese drei Düfte teilen nichts. Sie fühlen sich wie drei völlig unterschiedliche Wahlen an. Aber zusammen decken sie alle deine Bedürfnisse ab.
          </p>

          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4a3728' }}>
            Die Alternative wäre: Alle drei sind ähnlich (z.B. drei verschiedene florals). Das ist langweilig und redundant. Die beste 3er-Kollektion hat Vielfalt, aber strategisch.
          </p>
        </section>

        {/* Building Your Collection */}
        <section style={{ marginBottom: '3.5rem' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Praktisch
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.5rem' }}>
            Wie du deine 3er-Kollektion aufbaust
          </h2>

          <div style={{
            background: '#fff',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '14px',
            padding: '1.8rem',
            marginBottom: '1.5rem',
          }}>
            <h3 style={{ fontSize: '1.1rem', color: '#2a1d12', fontWeight: 700, marginBottom: '1rem' }}>
              Schritt 1: Erkenne, wer du bist
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#4a3728', margin: 0 }}>
              Bist du ein Klassiker (zeitlos), Romantiker (emotional), Abenteurer (experimentell)? Nutze das Auressa-Quiz und die Duftpersönlichkeit-Seite, um dich selbst zu verstehen. Dieser Schritt ist wichtig – deine 3er-Kollektion sollte deine echte Persönlichkeit widerspiegeln.
            </p>
          </div>

          <div style={{
            background: '#fff',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '14px',
            padding: '1.8rem',
            marginBottom: '1.5rem',
          }}>
            <h3 style={{ fontSize: '1.1rem', color: '#2a1d12', fontWeight: 700, marginBottom: '1rem' }}>
              Schritt 2: Wähle deine Lieblingsduft-Familie
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#4a3728', margin: 0 }}>
              Magst du Florals, Woody, Clean, oder Gourmand? Dein Alltags-Duft sollte in deiner Lieblingsfamilie sein – dann trägst du ihn gerne. Die anderen zwei können variabler sein, aber mindestens einer sollte dich resonieren.
            </p>
          </div>

          <div style={{
            background: '#fff',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '14px',
            padding: '1.8rem',
            marginBottom: '1.5rem',
          }}>
            <h3 style={{ fontSize: '1.1rem', color: '#2a1d12', fontWeight: 700, marginBottom: '1rem' }}>
              Schritt 3: Teste vor dem Kauf
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#4a3728', margin: 0 }}>
              Besuche einen Parfümerie und teste alle drei, bevor du kaufst. Trag sie 20-30 Minuten auf verschiedenen Körperstellen. Der erste Eindruck ist nicht die Wahrheit – du brauchst die Herznoten zu spüren. Und kaufe immer Proben/Samples zuerst, wenn möglich.
            </p>
          </div>

          <div style={{
            background: '#fff',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '14px',
            padding: '1.8rem',
          }}>
            <h3 style={{ fontSize: '1.1rem', color: '#2a1d12', fontWeight: 700, marginBottom: '1rem' }}>
              Schritt 4: Kaufe Eau de Parfum, nicht Eau de Toilette
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#4a3728', margin: 0 }}>
              Der Alltags-Duft wird am häufigsten getragen, also lohnt sich die Investition in Eau de Parfum (bessere Haftung). Die anderen zwei können EDL sein, wenn du sparen möchtest. Aber: Lieber 3 gute EDPs als 5 billige EDLs.
            </p>
          </div>
        </section>

        {/* Common Mistakes */}
        <section style={{ marginBottom: '3.5rem' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Vermeiden
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.5rem' }}>
            Häufige Fehler
          </h2>

          <div style={{
            background: '#fff',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '14px',
            padding: '1.8rem',
            marginBottom: '1.5rem',
          }}>
            <h3 style={{ fontSize: '1.1rem', color: '#2a1d12', fontWeight: 700, marginBottom: '0.8rem' }}>
              ❌ Alle drei sind ähnlich
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', margin: 0 }}>
              Drei süße Florals = Redundanz. Du trägst den ersten und vergisst die anderen zwei. Die beste 3er-Kollektion hat Kontrast.
            </p>
          </div>

          <div style={{
            background: '#fff',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '14px',
            padding: '1.8rem',
            marginBottom: '1.5rem',
          }}>
            <h3 style={{ fontSize: '1.1rem', color: '#2a1d12', fontWeight: 700, marginBottom: '0.8rem' }}>
              ❌ Die Alltags-Wahl ist zu intensiv
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', margin: 0 }}>
              Ein intensiver, sinnlicher Duft funktioniert nicht für jeden Tag im Büro. Der Alltags-Duft sollte dezent und universell angenehm sein.
            </p>
          </div>

          <div style={{
            background: '#fff',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '14px',
            padding: '1.8rem',
            marginBottom: '1.5rem',
          }}>
            <h3 style={{ fontSize: '1.1rem', color: '#2a1d12', fontWeight: 700, marginBottom: '0.8rem' }}>
              ❌ Du wählst basierend auf Trend, nicht Vorliebe
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', margin: 0 }}>
              Der Duft, den dein Freund liebt, könnte für dich falsch sein. Deine 3er-Kollektion sollte DICH repräsentieren, nicht den Internet-Trend.
            </p>
          </div>

          <div style={{
            background: '#fff',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '14px',
            padding: '1.8rem',
          }}>
            <h3 style={{ fontSize: '1.1rem', color: '#2a1d12', fontWeight: 700, marginBottom: '0.8rem' }}>
              ❌ Du fragst nicht nach deinem Typ
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', margin: 0 }}>
              Männlich, weiblich, unisex sind Marketing-Kategorien. Ein großartiger Duft funktioniert für dich, unabhängig davon, wie er vermarktet wird. Ignoriere das Geschlecht und wähle nach Charakter.
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
              Reichen 3 Düfte wirklich aus?
            </summary>
            <p style={{ fontSize: '0.9rem', color: '#4a3728', lineHeight: 1.7, marginTop: '0.8rem', margin: '0.8rem 0 0 0' }}>
              Für die meisten Menschen: ja. Wenn du gerne experimentierst und Düfte kennst, möchtest du vielleicht mehr. Aber 3 gut gewählte Düfte (Alltag, Abend, Saison) decken 100% deiner praktischen Bedürfnisse ab.
            </p>
          </details>

          <details style={{ marginBottom: '1rem', padding: '1.2rem', background: '#fff', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '10px' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 700, color: '#2a1d12', fontSize: '0.95rem' }}>
              Kann der Alltags-Duft auch der Abend-Duft sein?
            </summary>
            <p style={{ fontSize: '0.9rem', color: '#4a3728', lineHeight: 1.7, marginTop: '0.8rem', margin: '0.8rem 0 0 0' }}>
              Technisch ja, aber nicht ideal. Ein großartiger Alltags-Duft ist dezent. Im Abend möchtest du oft präsenter sein. Wenn du sparen möchtest, könnte der Alltags-Duft in Eau de Parfum (intensiver dosiert) auch abends funktionieren. Aber ideal ist, sie zu separieren.
            </p>
          </details>

          <details style={{ marginBottom: '1rem', padding: '1.2rem', background: '#fff', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '10px' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 700, color: '#2a1d12', fontSize: '0.95rem' }}>
              Sollte ich Winter UND Sommer haben oder nur Sommer?
            </summary>
            <p style={{ fontSize: '0.9rem', color: '#4a3728', lineHeight: 1.7, marginTop: '0.8rem', margin: '0.8rem 0 0 0' }}>
              Das 3er-Framework bietet Flexibilität. Wenn du in einem Klima mit echten Jahreszeiten lebst (Schweiz), könnten 4 Düfte sinnvoll sein: Alltag+Abend+Sommer+Winter. Aber die meisten Menschen können mit 3 ausgehen, wenn sie ihr Alltags-Duft richtig wählen.
            </p>
          </details>

          <details style={{ marginBottom: '1rem', padding: '1.2rem', background: '#fff', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '10px' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 700, color: '#2a1d12', fontSize: '0.95rem' }}>
              Was ist, wenn ich nur einen Duft mag?
            </summary>
            <p style={{ fontSize: '0.9rem', color: '#4a3728', lineHeight: 1.7, marginTop: '0.8rem', margin: '0.8rem 0 0 0' }}>
              Das ist großartig. Manche Menschen haben einen „Signature-Duft" – einen, den sie immer tragen. Wenn das dich glücklich macht, brauchst du nicht mehr. Das 3er-Framework ist für Menschen, die Vielfalt mögen, aber keine Überflutung.
            </p>
          </details>

          <details style={{ marginBottom: '1rem', padding: '1.2rem', background: '#fff', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '10px' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 700, color: '#2a1d12', fontSize: '0.95rem' }}>
              Wie viel sollte ich insgesamt ausgeben?
            </summary>
            <p style={{ fontSize: '0.9rem', color: '#4a3728', lineHeight: 1.7, marginTop: '0.8rem', margin: '0.8rem 0 0 0' }}>
              Das Budget hängt von deiner Priorität ab. Ein bescheidenes 3er-Set: CHF 150–250 (ein Alltags-Duft + zwei billigere). Ein mittleres Set: CHF 250–500. Ein Premium-Set: CHF 400+. Es muss kein teures Geld sein – es geht um Qualität über Quantität.
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
            Finde deine 3 perfekten Düfte →
          </Link>
        </section>
      </div>
    </main>
  );
}
