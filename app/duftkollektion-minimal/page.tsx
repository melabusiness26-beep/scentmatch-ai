import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/app/Breadcrumb';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export const metadata: Metadata = {
  title: 'Minimalistische Duftkollektion: Das 3er-Framework',
  description:
    'Wie viele Düfte brauchst du wirklich? Das 3er-Framework: ein Alltags-Duft, ein Abend-Duft, ein Saison-Duft. Für viele reicht das.',
  alternates: { canonical: `${SITE_URL}/duftkollektion-minimal` },
  openGraph: {
      images: ['/opengraph-image'],
    title: 'Minimalistische Duftkollektion | Auressa',
    description: 'Weniger ist mehr: Wie du mit nur 3 Düften die meisten Situationen abdeckst.',
    url: `${SITE_URL}/duftkollektion-minimal`,
    type: 'website',
  },
};

export default function DuftkolektionMinimal() {
  return (
    <main style={{ backgroundColor: '#faf7f2' }}>
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
            Weniger ist Mehr </p>
          <h1 style={{
            fontSize: 'clamp(28px, 6vw, 44px)',
            fontFamily: "var(--font-display), Georgia, serif",
            fontWeight: 700,
            marginBottom: '1rem',
            lineHeight: 1.15,
            color: '#faf7f2',
          }}>
            Minimalistische Duftkollektion
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(250,247,242,0.75)', margin: 0, lineHeight: 1.6 }}>
            Du brauchst nicht 50 Düfte, um gut zu riechen. Drei gut gewählte Düfte können ausreichen – wenn du weisst, welche drei. Das 3er-Framework.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '3.5rem 1.25rem' }}>

        {/* The Philosophy */}
        <section style={{ marginBottom: '3.5rem' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Die Philosophie
          </p>
          <h2 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: '1.8rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.5rem' }}>
            Warum weniger besser ist
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4a3728', marginBottom: '1.2rem' }}>
            Es gibt zwei Arten von Duft-Sammlern: Minimalisten und Enthusiasten. Ein Enthusiast hat oft 20 oder mehr Düfte – einen für jede Stimmung, jeden Tag, jede Jahreszeit. Ein Minimalist hat vielleicht 3. Beides ist vollkommen in Ordnung. Der Minimalist hat aber einen Vorteil: Er kennt seine Düfte gut. Er weiss, wann welcher Duft passt, und trägt jeden davon regelmässig.
          </p>
          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4a3728', marginBottom: '1.2rem' }}>
            Viele Duft-Fans kennen das: Du kaufst einen neuen Duft, bist begeistert, trägst ihn zwei Wochen lang, dann kommt eine neue Obsession, und der erste Duft steht in der Ecke. Irgendwann stehen viele Flakons im Regal, von denen du nur wenige regelmässig trägst.
          </p>
          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4a3728' }}>
            Ein minimalistisches 3er-Framework bedeutet: Du hast genug für jeden Kontext, aber nicht so viel, dass es überwältigend wird. Du brauchst nicht mehr auszuwählen. Du weisst einfach: Montag im Büro = Duft #1. Freitagabend = Duft #2. Juli = Duft #3. Das ist Klarheit.
          </p>
        </section>

        {/* The 3-Fragrance Framework */}
        <section style={{ marginBottom: '3.5rem' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Das Framework
          </p>
          <h2 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: '1.8rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.5rem' }}>
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
              Büro, Einkaufen, Alltag – der grösste Teil deiner Tage
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              Das ist der Duft, den du am häufigsten trägst. Der sollte dezent, angenehm und nicht zu auffällig sein. Er sollte möglichst mehrere Stunden halten und in vielen Situationen passen: Büro, Coffee-Shop, Supermarkt. Nicht zu süss, nicht zu würzig – einfach unkompliziert.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Frauen-Beispiele:</strong> Chanel Allure, Dolce&amp;Gabbana Light Blue, Jo Malone Wood Sage &amp; Sea Salt.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Männer-Beispiele:</strong> Bleu de Chanel, Giorgio Armani Acqua di Giò, Heeley Sel Marin.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#6b5344' }}>
              <strong>Das Budget:</strong> CHF 100–150 für einen guten Alltags-Duft ist realistisch. Hier lohnt sich die Investition am ehesten, weil du ihn am häufigsten trägst.
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
              Dates, Party, wichtige Momente – die besonderen Gelegenheiten
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              Das ist dein „Wow"-Duft. Intensiver, sinnlicher, präsenter. Ein Duft, der im Büro zu viel wäre, aber beim Date perfekt. Das kann gourmand, orientalisch, intensiv-holzig sein – etwas mit Präsenz und Charakter. Er darf gern lange halten.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Frauen-Beispiele:</strong> Yves Saint Laurent Black Opium, Dior Hypnotic Poison, Yves Saint Laurent Mon Paris.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Männer-Beispiele:</strong> Tom Ford Ombré Leather, Dior Homme Intense, Yves Saint Laurent La Nuit de L’Homme.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#6b5344' }}>
              <strong>Das Budget:</strong> CHF 80–200. Dieser Duft wird weniger häufig getragen, also darfst du hier etwas mehr ausgeben – aber nicht zu viel.
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
              <strong>Sommer-Beispiele:</strong> Davidoff Cool Water, Jo Malone Grapefruit, Giorgio Armani Acqua di Giò, Diptyque Eau Rose.
            </p>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', marginBottom: '0.8rem' }}>
              <strong>Winter-Beispiele:</strong> Viktor&amp;Rolf Spicebomb, Lancôme La Nuit Trésor, Dior Hypnotic Poison (reichhaltiger).
            </p>
            <p style={{ fontSize: '0.95rem', color: '#6b5344' }}>
              <strong>Das Budget:</strong> CHF 60–120. Dieser Duft wird saisonal getragen – nicht das ganze Jahr über.
            </p>
          </div>
        </section>

        {/* The Concept */}
        <section style={{ marginBottom: '3.5rem' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Das Konzept
          </p>
          <h2 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: '1.8rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.5rem' }}>
            Wie die drei Düfte zusammenarbeiten
          </h2>

          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4a3728', marginBottom: '1.5rem' }}>
            Hier ist das Schöne am 3er-Framework: Die Düfte sind völlig unterschiedlich in Charakter, aber zusammen decken sie die meisten Situationen ab. Die drei sollten NICHT ähnlich sein – sie sollten verschiedene Rollen erfüllen.
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
                Alltag: Chanel Allure (klassisch, blumig, zeitlos)
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
                Warum: Ganz anders – kaffeeig, süss, sinnlich. Gut für den Abend. Kaum Überlappung mit Allure.
              </p>
            </div>
            <div>
              <p style={{ fontSize: '0.9rem', color: '#d4af37', fontWeight: 700, marginBottom: '0.2rem' }}>
                Sommer: Jo Malone Grapefruit (frisch, minimal, erfrischend)
              </p>
              <p style={{ fontSize: '0.9rem', color: 'rgba(250,247,242,0.8)', lineHeight: 1.6, margin: '0.2rem 0 0 0' }}>
                Warum: Ganz leicht, komplett anders. Ideal für heisse Tage. Kaum Überlappung.
              </p>
            </div>
          </div>

          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4a3728', marginBottom: '1.2rem' }}>
            Das Schöne hier: Diese drei Düfte haben kaum etwas gemeinsam. Sie fühlen sich wie drei völlig unterschiedliche Wahlen an. Aber zusammen decken sie viele Bedürfnisse ab.
          </p>

          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4a3728' }}>
            Die Alternative wäre: Alle drei sind ähnlich (z. B. drei verschiedene Blumendüfte). Das ist eher redundant. Eine gute 3er-Kollektion hat Vielfalt – mit Plan.
          </p>
        </section>

        {/* Building Your Collection */}
        <section style={{ marginBottom: '3.5rem' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Praktisch
          </p>
          <h2 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: '1.8rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.5rem' }}>
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
              Bist du ein Klassiker (zeitlos), Romantiker (emotional), Abenteurer (experimentell)? Das Auressa-Quiz und die Duftpersönlichkeit-Seite können dir dabei als spielerische Orientierung helfen. Deine 3er-Kollektion sollte zu deinem Geschmack passen.
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
              Magst du Florals, Woody, Clean, oder Gourmand? Dein Alltags-Duft sollte in deiner Lieblingsfamilie sein – dann trägst du ihn gerne. Die anderen zwei können variabler sein, aber auch sie sollten dir wirklich gefallen.
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
              Besuche eine Parfümerie und teste alle drei, bevor du kaufst. Trag sie auf der Haut und warte mindestens 20–30 Minuten, besser einige Stunden. Der erste Eindruck täuscht oft – du willst auch Herz- und Basisnoten kennenlernen. Und kaufe immer Proben/Samples zuerst, wenn möglich.
            </p>
          </div>

          <div style={{
            background: '#fff',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '14px',
            padding: '1.8rem',
          }}>
            <h3 style={{ fontSize: '1.1rem', color: '#2a1d12', fontWeight: 700, marginBottom: '1rem' }}>
              Schritt 4: Beim Alltags-Duft ruhig zum Eau de Parfum greifen
            </h3>
            <p style={{ fontSize: '0.95rem', lineHeight: 1.7, color: '#4a3728', margin: 0 }}>
              Der Alltags-Duft wird am häufigsten getragen, also kann sich ein Eau de Parfum lohnen (höhere Konzentration, hält oft länger). Die anderen zwei können Eau de Toilette sein, wenn du sparen möchtest. Und: Lieber 3 Düfte, die du wirklich trägst, als 5, die nur im Regal stehen.
            </p>
          </div>
        </section>

        {/* Common Mistakes */}
        <section style={{ marginBottom: '3.5rem' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Vermeiden
          </p>
          <h2 style={{ fontFamily: "var(--font-display), Georgia, serif", fontSize: '1.8rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.5rem' }}>
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
              Alle drei sind ähnlich
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', margin: 0 }}>
              Drei süsse Blumendüfte = Redundanz. Oft trägst du dann nur einen und vergisst die anderen zwei. Eine gute 3er-Kollektion hat Kontrast.
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
              Die Alltags-Wahl ist zu intensiv
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', margin: 0 }}>
              Ein intensiver, sinnlicher Duft ist für den Büroalltag oft zu viel. Der Alltags-Duft sollte dezent und universell angenehm sein.
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
              Du wählst basierend auf Trend, nicht Vorliebe
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
              Du fragst nicht nach deinem Typ
            </h3>
            <p style={{ fontSize: '0.95rem', color: '#4a3728', margin: 0 }}>
              Männlich, weiblich, unisex sind vor allem Marketing-Kategorien. Ein Duft kann zu dir passen, unabhängig davon, wie er vermarktet wird. Ignoriere das Geschlecht und wähle nach Charakter.
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
              Reichen 3 Düfte wirklich aus?
            </summary>
            <p style={{ fontSize: '0.9rem', color: '#4a3728', lineHeight: 1.7, marginTop: '0.8rem', margin: '0.8rem 0 0 0' }}>
              Für viele: ja. Wenn du gerne experimentierst, möchtest du vielleicht mehr. Aber 3 gut gewählte Düfte (Alltag, Abend, Saison) decken die meisten Alltagssituationen ab.
            </p>
          </details>

          <details style={{ marginBottom: '1rem', padding: '1.2rem', background: '#fff', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '10px' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 700, color: '#2a1d12', fontSize: '0.95rem' }}>
              Kann der Alltags-Duft auch der Abend-Duft sein?
            </summary>
            <p style={{ fontSize: '0.9rem', color: '#4a3728', lineHeight: 1.7, marginTop: '0.8rem', margin: '0.8rem 0 0 0' }}>
              Ja, das geht – ist aber nicht immer ideal. Ein guter Alltags-Duft ist eher dezent. Am Abend möchtest du oft präsenter sein. Wenn du sparen möchtest, könnte der Alltags-Duft in Eau de Parfum (intensiver dosiert) auch abends funktionieren. Wer mag, trennt die beiden.
            </p>
          </details>

          <details style={{ marginBottom: '1rem', padding: '1.2rem', background: '#fff', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '10px' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 700, color: '#2a1d12', fontSize: '0.95rem' }}>
              Sollte ich Winter UND Sommer haben oder nur Sommer?
            </summary>
            <p style={{ fontSize: '0.9rem', color: '#4a3728', lineHeight: 1.7, marginTop: '0.8rem', margin: '0.8rem 0 0 0' }}>
              Das 3er-Framework bietet Flexibilität. Wenn du in einem Klima mit echten Jahreszeiten lebst (Schweiz), könnten 4 Düfte sinnvoll sein: Alltag+Abend+Sommer+Winter. Viele kommen aber mit 3 aus, wenn sie ihren Alltags-Duft gut wählen.
            </p>
          </details>

          <details style={{ marginBottom: '1rem', padding: '1.2rem', background: '#fff', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '10px' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 700, color: '#2a1d12', fontSize: '0.95rem' }}>
              Was ist, wenn ich nur einen Duft mag?
            </summary>
            <p style={{ fontSize: '0.9rem', color: '#4a3728', lineHeight: 1.7, marginTop: '0.8rem', margin: '0.8rem 0 0 0' }}>
              Das ist grossartig. Manche Menschen haben einen „Signature-Duft" – einen, den sie immer tragen. Wenn das dich glücklich macht, brauchst du nicht mehr. Das 3er-Framework ist für Menschen, die Vielfalt mögen, aber keine Überflutung.
            </p>
          </details>

          <details style={{ marginBottom: '1rem', padding: '1.2rem', background: '#fff', border: '1px solid rgba(212,175,55,0.15)', borderRadius: '10px' }}>
            <summary style={{ cursor: 'pointer', fontWeight: 700, color: '#2a1d12', fontSize: '0.95rem' }}>
              Wie viel sollte ich insgesamt ausgeben?
            </summary>
            <p style={{ fontSize: '0.9rem', color: '#4a3728', lineHeight: 1.7, marginTop: '0.8rem', margin: '0.8rem 0 0 0' }}>
              Das Budget hängt von deiner Priorität ab. Als grobe Orientierung: Ein bescheidenes 3er-Set: CHF 150–250 (ein Alltags-Duft + zwei günstigere). Ein mittleres Set: CHF 250–500. Ein Premium-Set: über CHF 400. Es muss nicht teuer sein – es geht um Qualität statt Quantität.
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
            Finde passende Düfte im Quiz →
          </Link>
        </section>
      </div>
    </main>
  );
}
