import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/app/Breadcrumb';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export const metadata: Metadata = {
  title: 'Häufige Fragen (FAQ) zu Parfüm & Auressa | Auressa',
  description:
    'Antworten auf die häufigsten Fragen rund um Parfüm, Duft-Findung und Auressa: Was ist ein Auressa-Score? Wie funktioniert das Quiz? Was sind Dupes? Ehrliche Antworten, kein Fachjargon.',
  alternates: { canonical: `${SITE_URL}/faq` },
  openGraph: {
    title: 'Häufige Fragen zu Parfüm | Auressa',
    description: 'Antworten auf die häufigsten Parfüm-Fragen: Duftnoten, Haltbarkeit, Dupes, Auressa-Score und mehr.',
    type: 'website',
    url: `${SITE_URL}/faq`
  }
};

const faqGroups: {
  title: string;
  icon: string;
  faqs: { q: string; a: string | React.ReactNode }[];
}[] = [
  {
    title: 'Über Auressa',
    icon: '✦',
    faqs: [
      {
        q: 'Was ist Auressa und wie funktioniert die Plattform?',
        a: 'Auressa ist eine unabhängige Duft-Findungs-Plattform aus der Schweiz. Mit unserem Quiz (10 kurze Fragen zu Duftvorlieben, Anlass, Saison und Budget) berechnen wir einen persönlichen Match-Score für jeden Duft im Katalog – von 0 bis 100. So findest du Düfte, die wirklich zu dir passen, ohne stundenlang in Parfümerien zu suchen.'
      },
      {
        q: 'Brauche ich ein Konto, um Auressa zu nutzen?',
        a: 'Nein. Das Quiz, der Dupe-Finder, der Duft-Scanner, alle Ratgeber und der gesamte Duft-Katalog sind ohne Konto oder App zugänglich. Einige Links zu Shops sind Affiliate-Links (erkennbar an „Jetzt ansehen"-Buttons); wenn du darüber kaufst, erhalten wir eine kleine Provision, ohne dass du mehr bezahlst.'
      },
      {
        q: 'Wer steht hinter Auressa?',
        a: 'Auressa wurde von Melanie – einer Schweizerin mit zu vielen falsch gekauften Parfüms – gegründet. Die Plattform ist unabhängig, ohne Investoren, ohne versteckte Werbung. Mehr dazu auf der Über-uns-Seite.'
      },
      {
        q: 'Woher stammen die Duftbeschreibungen und -daten?',
        a: 'Alle Duftdaten (Noten, Haltbarkeit, Ausstrahlung, Saison, Anlass) werden sorgfältig recherchiert und kuratiert – aus offiziellen Markenangaben, Fachquellen und redaktioneller Einschätzung. Wir erfinden keine Bewertungen und verweisen klar darauf, wenn es sich um eine Einschätzung handelt.'
      }
    ]
  },
  {
    title: 'Parfüm-Grundlagen',
    icon: '🌸',
    faqs: [
      {
        q: 'Was sind Duftnoten – Kopf-, Herz- und Basisnoten?',
        a: 'Ein Parfüm entfaltet sich in drei Phasen: Kopfnoten (die ersten 15–30 Minuten nach dem Auftragen), Herznoten (das Herzstück des Dufts, 2–4 Stunden) und Basisnoten (der Langzeit-Eindruck, oft viele Stunden oder sogar Tage). Was du im Laden erschnupperst, sind meist nur die Kopfnoten – darum lohnt es sich, einen Duft mindestens 30 Minuten zu tragen, bevor du kaufst.'
      },
      {
        q: 'Was ist der Unterschied zwischen Eau de Parfum (EdP), Eau de Toilette (EdT) und Parfum?',
        a: 'Es geht um die Konzentration des Duftöls im Alkohol: Parfum / Extrait (20–30 %) ist am intensivsten und hält am längsten; Eau de Parfum (15–20 %) ist der häufigste Standard; Eau de Toilette (8–12 %) ist leichter und kürzer haltbar; Eau de Cologne (2–5 %) ist frisch und sparsam. Mehr EdP bedeutet nicht immer „besser" – es kommt auf den Stil und Anlass an.'
      },
      {
        q: 'Was bedeutet Sillage bei Parfüm?',
        a: 'Sillage (franz. „Kielwasser") ist die Projektion eines Dufts – wie weit er um dich herum riechbar ist. Hohe Sillage = der Duft ist im ganzen Raum wahrnehmbar. Niedrige Sillage = hautnaher, intimer Duft, den nur Leute in deiner Nähe riechen. Im Büro ist niedrige Sillage meist angenehmer; für eine Party darf es mehr sein.'
      },
      {
        q: 'Wie lange hält ein Parfüm wirklich?',
        a: 'Das hängt von der Konzentration, dem Typ der Duftstoffe und deiner Haut ab. Trockene Haut verliert Düfte schneller – eincremen hilft. Als Faustregel: EdT 3–5 Stunden, EdP 6–9 Stunden, Parfum/Extrait 10+ Stunden. Orientalische und holzige Düfte halten generell länger als frische oder Zitrusdüfte. Auf unserem Auressa-Score siehst du eine Einschätzung der Haltbarkeit pro Duft.'
      },
      {
        q: 'Was sind Duftfamilien?',
        a: 'Parfüms werden oft in Familien eingeteilt: Floral (blumig, romantisch), Frisch/Clean (sauber, aquatisch, zitrusartig), Holzig/Woody (warm, erdig, rauchig), Gourmand (süss, vanillig, köstlich), Oriental (würzig, warm, exotisch), Chypre (moosig, herb, klassisch). Das Auressa-Quiz nutzt vereinfachte Kategorien (Floral, Clean, Woody, Gourmand) für den Einstieg.'
      }
    ]
  },
  {
    title: 'Auressa-Score & Quiz',
    icon: '🎯',
    faqs: [
      {
        q: 'Was bedeutet der Auressa-Score?',
        a: 'Der Auressa-Score (0–100) ist unsere redaktionelle Gesamteinschätzung eines Dufts – basierend auf Qualität, Vielseitigkeit, Preis-Leistung und Originalität. Er ist KEIN Nutzer-Rating und KEIN Match-Score. Für deinen persönlichen Match (wie gut passt der Duft zu deinen Quiz-Antworten) berechnen wir separat einen Match-Prozentsatz.'
      },
      {
        q: 'Wie berechnet das Quiz meinen Match-Prozentsatz?',
        a: 'Nach dem Quiz vergleichen wir deine Antworten (Duftfamilie, Lieblingsnoten, Budget, Anlass, Saison, Intensität, Geschlecht) mit jedem Duft im Katalog und berechnen einen Match-Score von 0–100 %. Duftfamilie zählt 30 %, Lieblingsnoten 20 %, Budget 15 %, Anlass 13 %, Saison 12 %, Intensität 10 %. Wenn du eine Note explizit ausschliessen willst, zieht das stark ab.'
      },
      {
        q: 'Ist das Quiz wirklich besser als eine Duftberatung im Laden?',
        a: 'Anderes, nicht automatisch schlechter. Im Laden riechst du echte Proben – das ist durch nichts zu ersetzen. Das Quiz hilft dir aber, gezielt in die richtigen Regale zu schauen: Du weisst vorab, welche Duftfamilien zu dir passen, was dein Budget ist, und welche Noten du liebst oder meidest. Kombi-Tipp: Quiz machen → 2–3 Top-Treffer merken → im Laden gezielt testen.'
      },
      {
        q: 'Kann ich das Quiz mehrmals machen?',
        a: 'Ja, so oft du möchtest – es wird nichts gespeichert. Du kannst auch mit verschiedenen Profilen spielen (z. B. für ein Geschenk für jemand anderen).'
      }
    ]
  },
  {
    title: 'Dupes & Alternativen',
    icon: '💸',
    faqs: [
      {
        q: 'Was ist ein Parfüm-Dupe?',
        a: 'Ein Dupe (kurz für „Duplikat") ist ein Parfüm, das einem teureren Duft riecht oder von ihm inspiriert ist – aber zu einem Bruchteil des Preises. Kein Dupe ist 100 % identisch, weil Originalformeln geschützt sind. Gute Dupes fangen aber Charakter und Noten so gut ein, dass sie für den Alltag kaum zu unterscheiden sind.'
      },
      {
        q: 'Sind günstige Dupes wirklich gut?',
        a: 'Kommt auf den Duft an. Armaf, Lattafa und ähnliche Marken haben einige echte Überraschungen – zum Teil mit besserer Haltbarkeit als das Original. Andere Dupes enttäuschen im Vergleich. Unser Dupe-Finder zeigt dir konkrete Paare mit Einschätzung. Fazit: Probieren lohnt sich immer, vor allem für unter 30 Franken.'
      },
      {
        q: 'Ist es illegal, Dupes zu kaufen oder zu verkaufen?',
        a: 'Nein – so lange es keine gefälschten Flakons mit nachgemachten Logos und Verpackungen sind. Dupes sind legale, eigenständige Düfte, die von einer Komposition inspiriert sind. Fälschungen (gefälschte Chanel-Flakons etc.) sind hingegen illegal und gesundheitlich riskant.'
      }
    ]
  },
  {
    title: 'Kauf & Preise',
    icon: '🛍️',
    faqs: [
      {
        q: 'Wo kaufe ich Parfüm in der Schweiz?',
        a: 'Offizielle Händler in der Schweiz: Douglas, Manor, Migros Beauty, Flaconi.ch (Online). Für Dupes und Nischenmarken: Lattafa, Armaf u. a. auf Amazon (achtung: CH-Zoll auf DE-Bestellungen) oder über spezialisierte Online-Shops. Alle Preise auf Auressa sind in CHF angegeben – wir prüfen regelmässig aktuelle Richtpreise.'
      },
      {
        q: 'Lohnt sich ein Parfüm-Abonnement oder Probenservice?',
        a: 'Für Experimentierfreudige ja. Probensets (Flaconi, Notino etc.) kosten 5–20 CHF und lassen dich Düfte zu Hause über mehrere Tage testen – das ist realistischer als ein Schnuppern im Laden. Abonnements wie Scentbird (US) sind in der Schweiz kaum verfügbar; besser direkt Proben kaufen.'
      },
      {
        q: 'Warum kosten manche Parfüms 200+ Franken?',
        a: 'Nischenparfüms und Luxusdüfte haben oft teurere Rohstoffe (natürliche Öle, seltene Extrakte), aufwändigere Flakongestaltung und kleinere Produktionsmengen. Ein Teil des Preises ist aber auch Markenprestige. Es gibt excellent riechende Düfte für 30–80 CHF – Auressa zeigt dir auch solche.'
      }
    ]
  },
  {
    title: 'Pflege & Lagerung',
    icon: '🧴',
    faqs: [
      {
        q: 'Wie lagere ich Parfüm richtig?',
        a: 'Kühl, dunkel und trocken – weg von Fensterbrettern, Badezimmerschränken und direkter Sonneneinstrahlung. Wärme und Licht bauen Duftstoffe ab. Ideal: im Originalkarton aufbewahren. So hält ein Parfüm 3–5 Jahre oder länger.'
      },
      {
        q: 'Wie trage ich Parfüm richtig auf?',
        a: 'Auf Pulsadern (Handgelenke, Hals, innere Ellenbogen) – dort ist die Haut warm und verstärkt die Projektion. Nicht einreiben nach dem Auftragen (zerstört die Kopfnoten). Für längere Haltbarkeit vorher eincremen oder unparfümierte Feuchtigkeitscreme verwenden. In die Haare funktioniert auch gut – vorsichtig mit Alkohol-Gehalt.'
      },
      {
        q: 'Was tun, wenn ein Parfüm auf meiner Haut plötzlich anders riecht?',
        a: 'Das ist normal – dein pH-Wert, Hauttyp und Ernährung beeinflussen, wie ein Duft sich auf deiner Haut entwickelt. Was im Laden gut riecht, kann zu Hause anders sein. Darum empfehlen wir, Proben mitzunehmen und den Duft mindestens 2–3 Stunden im Alltag zu tragen, bevor du kaufst.'
      }
    ]
  }
];

// FAQ-JSON-LD für Google
function faqJsonLd() {
  const allFaqs = faqGroups.flatMap((g) => g.faqs);
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: allFaqs
      .filter((f) => typeof f.a === 'string')
      .map((f) => ({
        '@type': 'Question',
        name: f.q,
        acceptedAnswer: { '@type': 'Answer', text: f.a as string }
      }))
  };
}

// Wir brauchen React nur für die JSX-Typannotation im Schema
import type React from 'react';

export default function FaqPage() {
  return (
    <main style={{ backgroundColor: '#faf7f2' }}>
      <Breadcrumb items={[{ label: 'FAQ', href: '/faq' }]} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd()) }}
      />

      {/* Hero */}
      <section
        style={{
          backgroundImage: 'linear-gradient(rgba(26,18,9,0.88), rgba(26,18,9,0.88)), url(/hero-auressa-2.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '240px',
          padding: '2.5rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '600px' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
            FAQ
          </p>
          <h1 style={{
            fontSize: 'clamp(24px, 6vw, 40px)',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            marginBottom: '1rem',
            lineHeight: 1.15,
            color: '#faf7f2',
          }}>
            Häufige Fragen
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(250,247,242,0.72)', margin: 0 }}>
            Antworten zu Parfüm, Duftnoten, Dupes, dem Auressa-Quiz und allem, was dich interessiert.
          </p>
        </div>
      </section>

      {/* Inhaltsverzeichnis (Desktop) */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '2rem 1.25rem 0' }}>
        <nav aria-label="Themenübersicht" style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '0.5rem',
          marginBottom: '2.5rem',
        }}>
          {faqGroups.map((g) => (
            <a
              key={g.title}
              href={`#${encodeURIComponent(g.title)}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                background: '#fff',
                border: '1px solid rgba(212,175,55,0.25)',
                borderRadius: '20px',
                padding: '0.4rem 0.9rem',
                fontSize: '0.8rem',
                fontWeight: 600,
                color: '#2a1d12',
                textDecoration: 'none',
              }}
            >
              <span>{g.icon}</span>
              {g.title}
            </a>
          ))}
        </nav>
      </div>

      {/* FAQ-Gruppen */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 1.25rem 4rem' }}>
        {faqGroups.map((group) => (
          <section
            key={group.title}
            id={encodeURIComponent(group.title)}
            style={{ marginBottom: '3.5rem', scrollMarginTop: '5rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
              <span style={{ fontSize: '1.3rem' }}>{group.icon}</span>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 'clamp(20px, 4vw, 26px)',
                fontWeight: 700,
                color: '#2a1d12',
                margin: 0,
              }}>
                {group.title}
              </h2>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {group.faqs.map((faq, i) => (
                <details
                  key={i}
                  style={{
                    background: '#fff',
                    border: '1px solid rgba(212,175,55,0.18)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                  }}
                >
                  <summary style={{
                    padding: '1.1rem 1.25rem',
                    cursor: 'pointer',
                    fontWeight: 700,
                    color: '#2a1d12',
                    fontSize: '0.95rem',
                    lineHeight: 1.4,
                    listStyle: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '1rem',
                    userSelect: 'none',
                  }}>
                    <span>{faq.q}</span>
                    <span style={{
                      color: '#d4af37',
                      fontSize: '1.1rem',
                      flexShrink: 0,
                      lineHeight: 1,
                    }}>+</span>
                  </summary>
                  <div style={{
                    padding: '0 1.25rem 1.1rem',
                    fontSize: '0.9rem',
                    lineHeight: 1.7,
                    color: '#4a3728',
                    borderTop: '1px solid rgba(212,175,55,0.12)',
                    paddingTop: '1rem',
                    marginTop: '0',
                  }}>
                    {typeof faq.a === 'string' ? <p style={{ margin: 0 }}>{faq.a}</p> : faq.a}
                  </div>
                </details>
              ))}
            </div>
          </section>
        ))}

        {/* CTA-Block */}
        <section style={{
          background: 'linear-gradient(135deg, #2a1d12 0%, #3d2b1a 100%)',
          borderRadius: '16px',
          padding: '2rem',
          textAlign: 'center',
          color: '#faf7f2',
        }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
            Noch Fragen?
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.4rem', fontWeight: 700, color: '#faf7f2', marginBottom: '0.75rem' }}>
            Probier das Quiz oder schreib uns
          </h2>
          <p style={{ color: 'rgba(250,247,242,0.7)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            Das Duft-Quiz findet in unter 1 Minute deinen persönlichen Match. Oder schreib uns direkt – wir antworten gern.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <Link href="/quiz" style={{
              background: '#d4af37',
              color: '#2a1d12',
              fontWeight: 700,
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '0.9rem',
            }}>Quiz starten</Link>
            <Link href="/ueber-uns" style={{
              background: 'transparent',
              color: '#faf7f2',
              fontWeight: 600,
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '0.9rem',
              border: '1px solid rgba(250,247,242,0.3)',
            }}>Über Auressa</Link>
          </div>
        </section>

        {/* Breadcrumb */}
        <nav aria-label="Brotkrümel" style={{ marginTop: '2.5rem', fontSize: '0.8rem', color: '#6b5344' }}>
          <Link href="/" style={{ color: '#6b5344', textDecoration: 'none' }}>Start</Link>
          <span style={{ margin: '0 0.35rem' }}>›</span>
          <span>FAQ</span>
        </nav>
      </div>
    </main>
  );
}
