import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/app/Breadcrumb';

export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export const metadata: Metadata = {
  title: 'Duftkombinationen: Wie du Parfüme richtig kombinierst',
  description:
    'Lerne, wie du mehrere Düfte layerst und kombinierst – für einen einzigartigen, längeren und intensiveren Duft. Regeln, Techniken und professionelle Tipps.',
  alternates: { canonical: `${SITE_URL}/duefte-kombinieren` },
  openGraph: {
    title: 'Duftkombinationen: Parfüme schichten & layern | Auressa',
    description: 'Schichte mehrere Düfte professionell zusammen – für Originalität, Intensität und längere Haltbarkeit.',
    type: 'website',
    url: `${SITE_URL}/duefte-kombinieren`,
  },
};

export default function FragranceLayeringPage() {
  return (
    <main style={{ backgroundColor: '#faf7f2' }}>
      <Breadcrumb items={[{ label: 'Duftkombinationen', href: '/duefte-kombinieren' }]} />

      {/* Hero */}
      <section style={{
        backgroundImage: 'linear-gradient(rgba(26,18,9,0.88), rgba(26,18,9,0.88)), url(/hero-auressa-2.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '280px',
        padding: '3rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{ textAlign: 'center', maxWidth: '700px' }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
            Fortgeschrittene Techniken
          </p>
          <h1 style={{
            fontSize: 'clamp(28px, 6vw, 48px)',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            marginBottom: '1.5rem',
            lineHeight: 1.15,
            color: '#faf7f2',
          }}>
            Duftkombinationen – Schichte deine Düfte richtig
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(250,247,242,0.8)', margin: 0 }}>
            Schaffe mit Duftschichtung (Layering) einen einzigartigen Signature-Duft –
            intensiver, länger haltbar und völlig persönlich.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 1.25rem' }}>

        {/* Intro */}
        <section style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4a3020', marginBottom: '1.5rem' }}>
            <strong>Layering</strong> (Duftschichtung) ist eine Profitechnik der Duftindustrie –
            und du kannst sie zuhause anwenden, um deinen <strong>persönlichen Signature-Duft</strong> zu schaffen.
            Das Ergebnis: Dein Duft hält länger, riecht intensiver und ist absolut einzigartig.
          </p>
        </section>

        {/* Warum Layering */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.8rem',
            fontWeight: 700,
            color: '#d4af37',
            marginBottom: '1.5rem',
            paddingBottom: '0.5rem',
            borderBottom: '2px solid rgba(212,175,55,0.3)',
          }}>
            ✨ Warum ist Duftkombination so mächtig?
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
          }}>
            {[
              {
                icon: '📈',
                title: 'Intensität',
                desc: 'Zwei Düfte überlagern sich und verstärken die Wahrnehmung, ohne aufdringlich zu wirken.'
              },
              {
                icon: '⏰',
                title: 'Längere Haltbarkeit',
                desc: 'Mehrere Duftschichten können dafür sorgen, dass der Duft länger wahrnehmbar bleibt.'
              },
              {
                icon: '🎨',
                title: 'Einzigartigkeit',
                desc: 'Schaffe einen persönlichen Duft, den es kein zweites Mal gibt – dein eigener Signature-Duft.'
              },
              {
                icon: '💡',
                title: 'Kreativität',
                desc: 'Experimentiere mit deiner Duft-Sammlung und entdecke unerwartete, harmonische Kombinationen.'
              }
            ].map((point, idx) => (
              <div
                key={idx}
                style={{
                  background: '#fff',
                  border: '1px solid rgba(212,175,55,0.2)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{point.icon}</div>
                <h3 style={{ color: '#2a1d12', fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem' }}>
                  {point.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#6b5344', margin: 0 }}>
                  {point.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Layering-Strategien */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.8rem',
            fontWeight: 700,
            color: '#d4af37',
            marginBottom: '1.5rem',
            paddingBottom: '0.5rem',
            borderBottom: '2px solid rgba(212,175,55,0.3)',
          }}>
            🎯 5 bewährte Layering-Strategien
          </h2>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {[
              {
                strategy: 'Gleiche Duftfamilie (sicheres Layering)',
                desc: 'Kombiniere zwei Düfte aus der gleichen Familie – z. B. zwei Woody-Düfte oder zwei Floral-Noten.',
                why: 'Sie harmonieren natürlich und verstärken die Wahrnehmung, ohne zu kollidieren.',
                example: '💡 Beispiel: Creed Aventus (Woody) + Tom Ford Tobacco Vanille (Woody-Vanille) = tieferer, länger haltbarer Holz-Duft.'
              },
              {
                strategy: 'Komplementäre Noten (die Kunst)',
                desc: 'Kombiniere Düfte mit unterschiedlichen Top-, Heart- und Base-Noten, die sich ergänzen.',
                why: 'Dies erzeugt einen neuen, differenzierten Duft-Komplex – schwieriger, aber am kreativsten.',
                example: '💡 Beispiel: Floral-Duft (Rosenaromen) + Holzig-Orientalisch (Oud/Sandelholz) = Rosen-Holz Harmonie.'
              },
              {
                strategy: 'Basis + Akzent (das „Pedant-Rezept")',
                desc: 'Wähle einen starken Basis-Duft (deine Lieblingsduft) und einen kleinen Akzent-Duft (20 % Anteil).',
                why: 'Der Basis-Duft bleibt erkennbar, der Akzent verleiht ihm eine neue Facette – kontrolliert und elegant.',
                example: '💡 Beispiel: Black Opium (deine Lieblingsduft) + ein leichter Zitrus-Spritz (Neroli/Zitrone) = süss-frisch.'
              },
              {
                strategy: 'Jahreszeit-Layering',
                desc: 'Kombiniere einen schweren Winter-Duft mit einem leichten Sommer-Duft je nach Wetter und Laune.',
                why: 'Du nutzt deine ganze Sammlung und passt deinen Duft der Jahreszeit an – flexibel und smart.',
                example: '💡 Beispiel: Winter: Schwerer Oud + leichter Minz-Duft im Sommer für mehr Frische.'
              },
              {
                strategy: 'Der Signature-Mix (Zeit-basiert)',
                desc: 'Spray zwei verschiedene Düfte NACHEINANDER zu verschiedenen Zeiten – morgens 1, mittags 1.',
                why: 'Ohne sie zu „mischen", erzeugt die zeitliche Überlagerung einen neuen Duft-Eindruck je nach Tageszeit.',
                example: '💡 Beispiel: Morgens Aventus, mittags Black Opium = ein Tag mit zwei Duft-Phasen.'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: '#fff',
                  border: '1px solid rgba(212,175,55,0.15)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                }}
              >
                <h3 style={{ color: '#2a1d12', fontWeight: 700, marginBottom: '0.75rem', fontSize: '1.1rem' }}>
                  {item.strategy}
                </h3>
                <div style={{ display: 'grid', gap: '0.75rem', fontSize: '0.95rem', color: '#6b5344', lineHeight: 1.6 }}>
                  <p style={{ margin: 0 }}>
                    <strong>Wie:</strong> {item.desc}
                  </p>
                  <p style={{ margin: 0 }}>
                    <strong>Warum:</strong> {item.why}
                  </p>
                  <p style={{ margin: 0, color: '#8a6a20', fontWeight: 600 }}>
                    {item.example}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Praktische Anleitung */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.8rem',
            fontWeight: 700,
            color: '#d4af37',
            marginBottom: '1.5rem',
            paddingBottom: '0.5rem',
            borderBottom: '2px solid rgba(212,175,55,0.3)',
          }}>
            📋 Schritt-für-Schritt Layering-Anleitung
          </h2>
          <div style={{
            background: '#fff',
            border: '2px solid rgba(212,175,55,0.2)',
            borderRadius: '16px',
            padding: '2rem',
            display: 'grid',
            gap: '1.5rem',
          }}>
            {[
              {
                step: 1,
                title: 'Wähle deine Basis (den Hauptduft)',
                desc: 'Dies ist dein Anker-Duft. Er sollte die längste Haltbarkeit haben und dein Favorit sein.'
              },
              {
                step: 2,
                title: 'Wähle den Akzent-Duft (das Aroma)',
                desc: 'Dies ist 20–30 % des Layers. Er sollte harmonisch, aber erkennbar sein. Komplementär zu deiner Basis.'
              },
              {
                step: 3,
                title: 'Basis zuerst auftragen',
                desc: 'Sprüh deinen Basis-Duft an 2–3 Pulse Points wie gewohnt (Hals, Unterarm). Warte 30 Sekunden.'
              },
              {
                step: 4,
                title: 'Akzent hinzufügen',
                desc: 'Sprüh den Akzent-Duft LEICHT (nur 1 Sprühstoss) auf die gleiche Stelle oder ein anderes Pulse Point. Weniger ist mehr!'
              },
              {
                step: 5,
                title: 'Sanft verteilen (nicht reiben)',
                desc: 'Wende ganz sanft die inneren Unterarme aneinander, um die Duftstoffe zu vermischen. Keine Reibung – sanft!'
              },
              {
                step: 6,
                title: 'Testen & anpassen',
                desc: 'Warte 2–3 Minuten. Rieche selbst – und bitte einen Freund, sein Feedback zu geben. Zu intensiv? Nächstes Mal weniger Akzent.'
              }
            ].map((item) => (
              <div key={item.step} style={{ display: 'flex', gap: '1.5rem' }}>
                <div
                  style={{
                    minWidth: '40px',
                    width: '40px',
                    height: '40px',
                    background: '#d4af37',
                    color: '#2a1d12',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 700,
                    fontSize: '1.1rem',
                    flexShrink: 0,
                  }}
                >
                  {item.step}
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ color: '#2a1d12', fontWeight: 700, marginBottom: '0.5rem' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '0.95rem', color: '#6b5344', margin: 0, lineHeight: 1.6 }}>
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Häufige Kombinationen */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.8rem',
            fontWeight: 700,
            color: '#d4af37',
            marginBottom: '1.5rem',
            paddingBottom: '0.5rem',
            borderBottom: '2px solid rgba(212,175,55,0.3)',
          }}>
            💎 Bewährte Layering-Kombinationen
          </h2>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {[
              {
                combo: 'Süss & Minz (sommerlich)',
                basis: 'Black Opium oder ähnlich süss',
                accent: 'Leichter Minz-Duft oder Zitrus',
                result: 'Frische Süsse – perfekt für warme Tage'
              },
              {
                combo: 'Holz & Oud (elegant)',
                basis: 'Creed Aventus oder woody',
                accent: 'Oud-Duft oder Sandelholz-Note',
                result: 'Tiefe Eleganz mit Orientalischem Hauch'
              },
              {
                combo: 'Floral & Vanille (klassisch)',
                basis: 'Rosenduft oder floraler Duft',
                accent: 'Vanille oder Amber-Duft',
                result: 'Warme, feminine Süsse – zeitlos'
              },
              {
                combo: 'Zitrus & Gewürz (lebendig)',
                basis: 'Zitrus-basiert (Neroli, Bergamotte)',
                accent: 'Pfeffer oder Kardamom-Note',
                result: 'Frisch-würzig – energetisch'
              },
              {
                combo: 'Sanfte Gourmand (Herbst)',
                basis: 'Gourmand-Duft (Karamell, Schokolade)',
                accent: 'Leichter Vanille oder Mandel-Duft',
                result: 'Köstlicher Herbstduft – warm und süss'
              }
            ].map((item, idx) => (
              <div
                key={idx}
                style={{
                  background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.04))',
                  border: '1px solid rgba(212,175,55,0.15)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                }}
              >
                <h3 style={{ color: '#2a1d12', fontWeight: 700, marginBottom: '1rem', fontSize: '1.1rem' }}>
                  {item.combo}
                </h3>
                <div style={{ display: 'grid', gap: '0.75rem', fontSize: '0.95rem', color: '#6b5344', lineHeight: 1.6 }}>
                  <p style={{ margin: 0 }}>
                    <strong>Basis:</strong> {item.basis}
                  </p>
                  <p style={{ margin: 0 }}>
                    <strong>Akzent:</strong> {item.accent}
                  </p>
                  <p style={{ margin: 0, color: '#8a6a20', fontWeight: 600 }}>
                    {item.result}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pro-Tipps */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.8rem',
            fontWeight: 700,
            color: '#d4af37',
            marginBottom: '1.5rem',
            paddingBottom: '0.5rem',
            borderBottom: '2px solid rgba(212,175,55,0.3)',
          }}>
            🎨 Profi-Tipps zum Kreativen Layering
          </h2>
          <div style={{
            background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.04))',
            border: '2px solid rgba(212,175,55,0.2)',
            borderRadius: '16px',
            padding: '2rem',
            display: 'grid',
            gap: '1.5rem',
          }}>
            {[
              {
                title: 'Das „Sättigung"-Limit',
                tip: 'Nicht mehr als 3 Düfte gleichzeitig layern. Über 3 wird dein Geruchssystem „überfordert" – es wirkt verwirrend statt harmonisch.'
              },
              {
                title: 'Test-und-Fehler-Logbuch',
                tip: 'Notiere deine Kombinationen mit Noten: „Aventus + Minz = perfekt für Sommer". Nach einem Monat hast du ein Repertoire persönlicher Lieblings-Combos.'
              },
              {
                title: 'Duftkonzentration beachten',
                tip: 'EdP (stärker) + EdT (schwächer) = meist gut. EdP + EdP = oft zu intensiv. EdT + EdT = meist zu schwach. Teste zuerst im kleinen Rahmen.'
              },
              {
                title: 'Jahreszeiten-Shift',
                tip: 'Winter: schwerere Base + schwererer Akzent. Sommer: leichtere Base + noch leichterer Akzent. So bleibt es angenehm, nicht überwältigend.'
              },
              {
                title: 'Körperwärme nutzen',
                tip: 'Auftragen an verschiedenen Pulspunkten verlängert die Duftentwicklung über den Tag: Hals morgens, Unterarm mittags, hinter dem Ohr am Abend.'
              },
              {
                title: 'Der Hauch-Test',
                tip: 'Wenn der Akzent-Duft NICHT mit der Nase zu riechen ist, wenn du nicht aktiv daran riechst, ist die Dosis perfekt – andere riechen ihn, aber nicht aufdringlich.'
              }
            ].map((pro, idx) => (
              <div key={idx}>
                <h3 style={{ color: '#2a1d12', fontWeight: 700, marginBottom: '0.5rem' }}>
                  💡 {pro.title}
                </h3>
                <p style={{ fontSize: '0.95rem', color: '#6b5344', margin: 0, lineHeight: 1.6 }}>
                  {pro.tip}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.8rem',
            fontWeight: 700,
            color: '#d4af37',
            marginBottom: '1.5rem',
            paddingBottom: '0.5rem',
            borderBottom: '2px solid rgba(212,175,55,0.3)',
          }}>
            ❓ Häufig gestellte Fragen zum Layering
          </h2>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {[
              {
                q: 'Ist Layering schädlich für die Düfte oder meine Haut?',
                a: 'Nein. Deine Haut kann mehrere Duftöle verarbeiten. Jeder Duft ist bereits eine Mischung von 100+ Aromen. Das Layering von 2–3 Düften ist sicher und riskiert nicht mehr Reizung als ein einzelner starker Duft.'
              },
              {
                q: 'Kann ich jeden Duft mit jedem combinieren?',
                a: 'Theoretisch ja, praktisch nein. Stark unterschiedliche Duftfamilien (z. B. fruchtiger Floral + schwerer Oud) können „kämpfen". Starte mit ähnlichen Familien und experimentiere vorsichtig.'
              },
              {
                q: 'Wie erkenne ich, dass meine Layering-Combo nicht funktioniert?',
                a: 'Wenn es riechen lässt wie eine Mischung aus zwei verschiedenen Parfums – unkohärent, verwirrend – statt wie ein neuer, ganzheitlicher Duft. Zu viel Intensität ist auch ein Zeichen von Missverhältnis.'
              },
              {
                q: 'Sollte ich immer die teuereren Düfte als Basis nehmen?',
                a: 'Nicht zwingend. Nimm deinen Lieblings-Duft als Basis (egal wie teuer) und einen günstigen Akzent. Manchmal ist die beste Kombination sogar kostengünstiger als ein einzelner Premium-Duft.'
              },
              {
                q: 'Wie lange hält eine gelayerte Duftkombination?',
                a: 'Oft etwas länger als ein einzelner Duft – vor allem, wenn die Basis ein kräftiger, langanhaltender Duft ist. Wie lange genau, hängt von den Düften und deiner Haut ab.'
              },
              {
                q: 'Kann ich Layering auch mit Body Lotion oder Öl machen?',
                a: 'Ja! Duft-Lotion als Basis + Parfum als Akzent = noch längere Haltbarkeit und diffusere Duftentwicklung. Aber teste zuerst auf Verfärbung des Stoffs.'
              }
            ].map((faq, idx) => (
              <div
                key={idx}
                style={{
                  background: '#fff',
                  border: '1px solid rgba(212,175,55,0.15)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                }}
              >
                <h3 style={{ color: '#2a1d12', fontWeight: 700, marginBottom: '0.75rem', fontSize: '1.05rem' }}>
                  {faq.q}
                </h3>
                <p style={{ fontSize: '0.95rem', color: '#6b5344', margin: 0, lineHeight: 1.6 }}>
                  {faq.a}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section style={{
          background: 'linear-gradient(135deg, #2a1d12 0%, #3d2b1a 100%)',
          borderRadius: '16px',
          padding: '2rem',
          textAlign: 'center',
          color: '#faf7f2',
          marginTop: '3rem',
        }}>
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
            Bereit zum Experimentieren?
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 700, color: '#faf7f2', marginBottom: '1rem' }}>
            Baue deine Layering-Kollektion
          </h2>
          <p style={{ color: 'rgba(250,247,242,0.75)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            Starte mit deinem Lieblings-Duft und sammle komplementäre Aromen. Mit der Zeit wird dein Duftschrank deine persönliche Duft-Palette – kreativ und einzigartig.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/duefte" style={{
              background: '#d4af37',
              color: '#2a1d12',
              fontWeight: 700,
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '0.95rem',
              display: 'inline-block',
            }}>Düfte durchsuchen</Link>
            <Link href="/quiz" style={{
              background: 'transparent',
              color: '#faf7f2',
              fontWeight: 600,
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '0.95rem',
              border: '1px solid rgba(250,247,242,0.3)',
              display: 'inline-block',
            }}>Quiz für Basis-Duft</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
