import type { Metadata } from 'next';
import Link from 'next/link';
import SiteHeader from '@/app/SiteHeader';
import Breadcrumb from '@/app/Breadcrumb';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export const metadata: Metadata = {
  title: 'Parfum richtig lagern: Anleitung für lange Haltbarkeit | Auressa',
  description:
    'Wie lagert man Parfum richtig? Temperatur, Licht, Feuchtigkeit – alle Tipps für optimale Lagerung und maximal lange Haltbarkeit deines Lieblingsdufts.',
  alternates: { canonical: `${SITE_URL}/duft-lagerung` },
  openGraph: {
    title: 'Parfum richtig lagern | Auressa',
    description: 'Kompletter Guide: Korrekte Lagerung für maximale Duft-Haltbarkeit und Qualität.',
    url: `${SITE_URL}/duft-lagerung`,
    type: 'website'
  }
};

export default function DuftLagerungPage() {
  return (
    <main style={{ backgroundColor: '#faf7f2' }}>
      <SiteHeader />
      <Breadcrumb items={[{ label: 'Duft-Lagerung', href: '/duft-lagerung' }]} />

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
            Duft-Pflege
          </p>
          <h1 style={{
            fontSize: 'clamp(24px, 6vw, 40px)',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            marginBottom: '1rem',
            lineHeight: 1.15,
            color: '#faf7f2',
          }}>
            Parfum richtig lagern – so hält es Jahre
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(250,247,242,0.7)', margin: 0 }}>
            Lagern ist einfacher als du denkst – und entscheidend für lange Haltbarkeit. Wir zeigen dir, wie dein Duft in Topform bleibt.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '3rem 1.25rem' }}>

        {/* Intro */}
        <section style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1rem' }}>
            Warum die Lagerung so wichtig ist
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728', maxWidth: '600px', margin: '0 auto' }}>
            Ein Duft ist ein fein ausbalanciertes Kunstwerk aus flüchtigen Duftmolekülen. Falsche Lagerung (zu viel Hitze, Licht oder Feuchtigkeit) zerstört diese Moleküle und lässt deinen Lieblingsduft „umkippen". Die gute Nachricht: Mit den richtigen Bedingungen hält ein gutes Parfum 3–5 Jahre oder länger – manche Düfte verbessern sich sogar mit der Zeit.
          </p>
        </section>

        {/* Lagerungsfaktoren */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.5rem' }}>
            Die vier Feinde deines Dufts
          </h2>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {[
              {
                emoji: '🌡️',
                title: 'Wärme & Temperatur-Schwankungen',
                desc: 'Ideal: 15–20°C, konstant. Zu warm (über 25°C) und dein Duft altert schneller. Temperatur-Schwankungen (Bad- oder Küchenschrank!) sind noch schlimmer – sie dehnen und kontrahieren die Duftöle. Das Badezimmer ist der schlechteste Ort, weil Dampf eindringt.'
              },
              {
                emoji: '☀️',
                title: 'Licht (besonders UV-Strahlung)',
                desc: 'UV-Strahlung baut Duftmoleküle ab. Deshalb sind viele Flakons dunkel getönt. Lagere im Original-Karton oder in einem dunklen Schrank – direkte Sonne ist Gift. Durchsichtige Gläser können über Zeit erblassen (das heißt nicht, dass der Duft schlecht ist, aber die Qualität kann leiden).'
              },
              {
                emoji: '💧',
                title: 'Feuchtigkeit & Luft',
                desc: 'Feuchtigkeit verändert die Zusammensetzung. Lagere nicht neben der Dusche, neben Wasserflaschen oder im Keller. Luft (Sauerstoff) oxidiert Duftöle langsam. Ein fest verschlossener Deckel ist wichtig – wenn der Verschluss nicht mehr gut sitzt, überleg dir, den Duft in eine kleinere Flasche umzufüllen.'
              },
              {
                emoji: '👃',
                title: 'Starke Gerüche in der Nähe',
                desc: 'Obwohl weniger bekannt: Dufte können Gerüche von anderen Flakons oder Materialien aufnehmen. Lagere Parfüms in einem eigenen Bereich, nicht neben Reinigungsmitteln oder anderen Kosmetika mit starkem Duft.'
              }
            ].map((factor) => (
              <div key={factor.title} style={{
                background: '#fff',
                border: '1px solid rgba(212,175,55,0.2)',
                borderRadius: '12px',
                padding: '1.5rem',
                display: 'flex',
                gap: '1rem'
              }}>
                <div style={{ fontSize: '1.8rem', flexShrink: 0 }}>{factor.emoji}</div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#2a1d12', marginBottom: '0.5rem', marginTop: 0 }}>
                    {factor.title}
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: '#6b5344', lineHeight: 1.6, margin: 0 }}>
                    {factor.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Die optimale Lagerung */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.5rem' }}>
            So lagerst du Parfum perfekt
          </h2>
          <div style={{
            background: 'linear-gradient(135deg, #2a1d12 0%, #3d2b1a 100%)',
            borderRadius: '16px',
            padding: '2rem 1.5rem',
            color: '#faf7f2'
          }}>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem', marginTop: 0 }}>
              Schritt-für-Schritt-Anleitung
            </h3>
            <ol style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {[
                {
                  num: '1',
                  title: 'Der richtige Ort',
                  text: 'Ein kühler, dunkler Schrank im Schlafzimmer oder Wohnzimmer ist ideal. Nicht: Badezimmer, Küche, Fensterbrett oder Balkon. Ein einfacher Schrank mit geschlossener Tür ist völlig ausreichend.'
                },
                {
                  num: '2',
                  title: 'Im Original-Karton',
                  text: 'Der Karton isoliert vor Licht und Temperatur-Schwankungen. Wenn du den Karton verloren hast, wickle den Flakon in Seidenpapier oder Baumwolltuch und stell ihn in eine Schachtel.'
                },
                {
                  num: '3',
                  title: 'Stehend, nicht liegend',
                  text: 'Lagere Flakons aufrecht, nicht liegend. Das verhindert, dass Duftöle in Kontakt mit dem Verschluss kommen (was zu Korrosion führt).'
                },
                {
                  num: '4',
                  title: 'Konstante Temperatur',
                  text: 'Halte die Temperatur konstant zwischen 15–20°C. Ein Keller mit stabiler Temperatur ist besser als ein Schlafzimmer, das im Sommer warm wird.'
                },
                {
                  num: '5',
                  title: 'Fest verschlossen',
                  text: 'Stelle sicher, dass der Deckel oder Sprühkopf fest sitzt. Wenn er nicht mehr dicht ist, überlege dir, den Duft in ein kleineres luftdichtes Behältnis umzufüllen.'
                }
              ].map((step, i) => (
                <li key={step.num} style={{ marginBottom: i < 4 ? '1.5rem' : 0, paddingLeft: '2rem', position: 'relative' }}>
                  <span style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    width: '28px',
                    height: '28px',
                    background: '#D4AF37',
                    color: '#2a1d12',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '0.9rem'
                  }}>
                    {step.num}
                  </span>
                  <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: '0 0 0.5rem 0', color: '#faf7f2' }}>
                    {step.title}
                  </h4>
                  <p style={{ fontSize: '0.95rem', margin: 0, color: 'rgba(250,247,242,0.85)', lineHeight: 1.6 }}>
                    {step.text}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1.5rem' }}>
            Häufige Fragen zur Lagerung
          </h2>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {[
              {
                q: 'Kann ich meinen Duft im Kühlschrank lagern?',
                a: 'Ja, wenn es trocken ist und du ihn in einem luftdichten Behälter aufbewahrst. Der Kühlschrank ist konstant kühl, was gut ist – aber Feuchtigkeit ist dein Feind. Nicht neben Lebensmitteln lagern.'
              },
              {
                q: 'Wie lang hält ein Duft, wenn ich ihn richtig lagere?',
                a: 'Typischerweise 3–5 Jahre oder länger, je nach Inhaltsstoffen. Orientalische und Holz-Düfte halten länger (bis 7+ Jahre), während Zitrus- und frische Düfte schneller alt werden (2–3 Jahre). Manche teureren Düfte (Creed, Niche-Marken) können sich mit der Zeit sogar verbessern.'
              },
              {
                q: 'Kann mein Duft „verderben"?',
                a: 'Ja, aber es dauert lange. Du wirst es riechen: Der Duft riecht flach, es gibt Verfärbungen oder er riecht völlig anders. Eine leichte Verfärbung ist normal und bedeutet nicht immer, dass der Duft schlecht ist – aber starke Verfärbung oder Trübung deutet auf Oxidation hin.'
              },
              {
                q: 'Ist es okay, meinen Duft aus der Original-Flasche in eine kleine Flasche umzufüllen?',
                a: 'Ja, wenn du ihn selten nutzt und längerfristig lagern willst. Kleinere Flakons reduzieren die Luftoberfläche und damit Oxidation. Nutze luftdichte, dunkel getönte Flakons und lagere sie kühl.'
              },
              {
                q: 'Kann ich mehrere Düfte nebeneinander lagern?',
                a: 'Ja, solange sie fest verschlossen sind. Düfte können Gerüche aufnehmen, aber nur wenn sie auslaufen. Mit fest verschlossenen Deckeln ist das kein Problem.'
              }
            ].map((item, i) => (
              <div key={i} style={{
                background: '#fff',
                border: '1px solid rgba(212,175,55,0.15)',
                borderRadius: '12px',
                padding: '1.25rem',
              }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#2a1d12', marginBottom: '0.5rem', marginTop: 0 }}>
                  {item.q}
                </h3>
                <p style={{ fontSize: '0.95rem', color: '#6b5344', lineHeight: 1.6, margin: 0 }}>
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Praktische Lagerungslösungen */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1rem' }}>
            Praktische Lagerungslösungen
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728', marginBottom: '1.5rem' }}>
            Du brauchst keine teure Spezial-Ausrüstung. Hier sind 5 einfache Optionen:
          </p>
          <div style={{ display: 'grid', gap: '1rem' }}>
            {[
              {
                icon: '📦',
                title: 'Option 1: Original-Karton',
                text: 'Schrank/Schublade in Schlafzimmer oder Wohnzimmer. Kostenlos, einfach, sehr effektiv.'
              },
              {
                icon: '🗄️',
                title: 'Option 2: Schachteln/Boxen',
                text: 'Kaufe im Schreibwarengeschäft kleine kartonierte Boxen (ca. CHF 2–5). Stell deine Flakons rein, stapel sie. Dunkel und geschützt.'
              },
              {
                icon: '🛏️',
                title: 'Option 3: Nachttisch-Schrank',
                text: 'Perfekt – normalerweise dunkel, kühl, konstante Temperatur. Flakons aufrecht nebeneinander oder in einer kleine Box.'
              },
              {
                icon: '❄️',
                title: 'Option 4: Wein-Kühlschrank (Luxus)',
                text: 'Wenn du viele Düfte hast und den Platz/Budget hast: Ein Mini-Wein-Kühlschrank hält konstant 15–18°C. Aber optional – nicht nötig.'
              },
              {
                icon: '🌳',
                title: 'Option 5: Dunkelklammer-Box',
                text: 'Online: kleine dunkel getönte Boxen (z. B. \"Duft-Organizer\"). Schön und praktisch, ca. CHF 10–30.'
              }
            ].map((option) => (
              <div key={option.title} style={{
                background: 'linear-gradient(135deg, rgba(212,175,55,0.05), rgba(212,175,55,0.02))',
                border: '1px solid rgba(212,175,55,0.15)',
                borderRadius: '12px',
                padding: '1.25rem',
                display: 'flex',
                gap: '1rem'
              }}>
                <div style={{ fontSize: '1.5rem' }}>{option.icon}</div>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#2a1d12', marginBottom: '0.25rem', marginTop: 0 }}>
                    {option.title}
                  </h3>
                  <p style={{ fontSize: '0.9rem', color: '#6b5344', margin: 0 }}>
                    {option.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Zusammenfassung */}
        <section style={{
          background: 'linear-gradient(135deg, #2a1d12 0%, #3d2b1a 100%)',
          borderRadius: '16px',
          padding: '2rem 1.5rem',
          color: '#faf7f2',
          marginBottom: '3rem'
        }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.25rem', marginTop: 0 }}>
            💡 Die Kurz-Fassung
          </h2>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {[
              '✓ Kühl lagern (15–20°C), dunkel (Original-Karton), konstante Temperatur',
              '✓ Nicht: Badezimmer, Fenster, neben Wärmequellen',
              '✓ Fest verschlossen, aufrecht, weg von starken Gerüchen',
              '✓ Mit dieser Pflege: 3–5 Jahre oder länger (manche auch 7+ Jahre)',
              '✓ Verfärbung ist normal, aber Trübung oder Umkippen = nicht mehr nutzen'
            ].map((tip, i) => (
              <li key={i} style={{ marginBottom: '0.75rem', fontSize: '1rem', lineHeight: 1.5 }}>
                {tip}
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <section style={{ textAlign: 'center', paddingTop: '2rem', borderTop: '1px solid rgba(212,175,55,0.2)' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', fontWeight: 700, color: '#2a1d12', marginBottom: '1rem' }}>
            Du hast deinen Duft – jetzt lagere ihn richtig
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.75, color: '#4a3728', marginBottom: '1.5rem' }}>
            Mit den Tipps aus diesem Guide hält dein Lieblingsduft Jahre. Noch keinen gefunden? Nutze unser Quiz, um deinen Signature-Duft zu entdecken.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/#quiz"
              style={{
                display: 'inline-block',
                background: '#d4af37',
                color: '#2a1d12',
                fontWeight: 700,
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontSize: '0.9rem',
                letterSpacing: '0.04em'
              }}
            >
              Quiz starten
            </Link>
            <Link
              href="/duefte"
              style={{
                display: 'inline-block',
                background: 'transparent',
                color: '#2a1d12',
                fontWeight: 600,
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                border: '2px solid #d4af37',
                textDecoration: 'none',
                fontSize: '0.9rem',
                letterSpacing: '0.04em'
              }}
            >
              Katalog durchsuchen
            </Link>
          </div>
        </section>

      </div>
    </main>
  );
}
