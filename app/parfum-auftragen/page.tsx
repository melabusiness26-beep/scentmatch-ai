import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/app/Breadcrumb';

export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export const metadata: Metadata = {
  title: 'Parfum richtig auftragen: Anleitung für maximale Wirkung',
  description:
    'Lerne, wie du Parfum richtig aufträgst, damit es länger hält und besser wirkt. Sprühtechniken, Auftrags-Punkte, Häufigkeit und Tipps für optimale Duftentwicklung.',
  alternates: { canonical: `${SITE_URL}/parfum-auftragen` },
  openGraph: {
      images: ['/opengraph-image'],
    title: 'Parfum richtig auftragen | Auressa',
    description: 'Anleitung für die perfekte Parfum-Anwendung: Sprühtechniken, Körperstellen, Häufigkeit und Pro-Tipps.',
    type: 'website',
    url: `${SITE_URL}/parfum-auftragen`,
  },
};

export default function PerfumeApplicationPage() {
  return (
    <main style={{ backgroundColor: '#faf7f2' }}>
      <Breadcrumb items={[{ label: 'Parfum richtig auftragen', href: '/parfum-auftragen' }]} />

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
            Anleitung & Tipps
          </p>
          <h1 style={{
            fontSize: 'clamp(28px, 6vw, 48px)',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            marginBottom: '1.5rem',
            lineHeight: 1.15,
            color: '#faf7f2',
          }}>
            Parfum richtig auftragen – so wirkt es am besten
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(250,247,242,0.8)', margin: 0 }}>
            Die richtige Anwendungstechnik ist genauso wichtig wie die Wahl des Dufts.
            Lerne die Profis-Tricks für maximale Haltbarkeit und optimale Duftentwicklung.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 1.25rem' }}>

        {/* Intro */}
        <section style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4a3020', marginBottom: '1.5rem' }}>
            Viele Menschen wissen nicht, dass die <strong>Auftragsart</strong> einen massiven Unterschied macht.
            Ein teurer Duft, der falsch aufgetragen wird, wirkt schwächer als ein günstiger, richtig angewendet.
            Diese Anleitung zeigt dir die Profitechniken, damit dein Duft länger hält, besser riecht und dir den ganzen Tag Freude bereitet.
          </p>
        </section>

        {/* Die 4 Faustregel */}
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
            Die 4 Goldregeln der Parfum-Anwendung
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem',
          }}>
            {[
              {
                icon: '🎯',
                title: 'Pulse Points',
                desc: 'Wärmestellen wie Hals, Innenseiten der Unterarme und Ohrläppchen nutzen – hier riecht der Duft intensiver.'
              },
              {
                icon: '💨',
                title: 'Sprühen, nicht reiben',
                desc: 'Immer sprühen! Reiben lässt die Top-Noten schneller verfliegen. 15–20 cm Abstand zur Haut halten.'
              },
              {
                icon: '🌡️',
                title: 'Weniger ist mehr',
                desc: '2–4 Sprühstösse genügen. Zu viel Duft wirkt aufdringlich und verkürzt die empfundene Haltbarkeit.'
              },
              {
                icon: '⏰',
                title: 'Regelmässigkeit',
                desc: 'Morgens nach dem Duschen auftragen. Deine feuchte Haut hilft, den Duft länger zu halten.'
              }
            ].map((rule, idx) => (
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
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{rule.icon}</div>
                <h3 style={{ color: '#2a1d12', fontWeight: 700, marginBottom: '0.5rem', fontSize: '1rem' }}>
                  {rule.title}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#6b5344', margin: 0 }}>
                  {rule.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Optimale Auftrags-Punkte */}
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
            🎯 Die besten Auftragsplätze
          </h2>
          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4a3020', marginBottom: '1.5rem' }}>
            Deine Körperwärme lässt den Duft voranschreiten. Diese Stellen sind ideal:
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
          }}>
            {[
              {
                location: 'Hals & Nacken',
                why: 'Höchste Wärmestelle nach dem Puls-Punkt. Der Duft steigt angenehm nach oben.',
                intensity: '⭐⭐⭐⭐⭐'
              },
              {
                location: 'Innenseite Unterarm',
                why: 'Klassischer Puls-Punkt. Hier ist die Haut dünner und die Körperwärme intensiv.',
                intensity: '⭐⭐⭐⭐⭐'
              },
              {
                location: 'Ohrläppchen & hinter dem Ohr',
                why: 'Sehr wärmestark. Perfekt für intensive Düfte und längere Haltbarkeit.',
                intensity: '⭐⭐⭐⭐⭐'
              },
              {
                location: 'Innenseite der Ellbogenfalte',
                why: 'Hohe Wärmestelle mit guter Haut-Oberfläche. Unterschätzt, aber sehr wirksam.',
                intensity: '⭐⭐⭐⭐'
              },
              {
                location: 'Brust & Dekolleté',
                why: 'Grosse, warme Fläche. Besonders für Damen ideal. Der Duft verteilt sich natürlich.',
                intensity: '⭐⭐⭐⭐'
              },
              {
                location: 'Innenseite Oberschenkel',
                why: 'Eine oft vergessene Wärmestelle. Gibt dem Duft eine zweite Wind am Nachmittag.',
                intensity: '⭐⭐⭐'
              },
            ].map((point, idx) => (
              <div
                key={idx}
                style={{
                  background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.04))',
                  border: '1px solid rgba(212,175,55,0.15)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                }}
              >
                <h3 style={{ color: '#2a1d12', fontWeight: 700, marginBottom: '0.5rem', fontSize: '1.05rem' }}>
                  {point.location}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#6b5344', marginBottom: '0.75rem' }}>
                  {point.why}
                </p>
                <p style={{ fontSize: '0.85rem', color: '#8a6a20', fontWeight: 600 }}>
                  Intensität: {point.intensity}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Schritt-für-Schritt Anleitung */}
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
            📋 Schritt-für-Schritt Anleitung
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
                title: 'Vorbereitung der Haut',
                desc: 'Trage deinen Duft direkt nach dem Duschen auf. Auf sauberer, gepflegter Haut hält der Duft besser.'
              },
              {
                step: 2,
                title: 'Flaschenentfernung',
                desc: 'Entferne den Verschluss.'
              },
              {
                step: 3,
                title: 'Abstand & Winkel',
                desc: 'Halte die Flasche 15–20 cm von deiner Haut entfernt. Der Winkel: leicht schräg (etwa 45°) auf die Pulse Points zielen.'
              },
              {
                step: 4,
                title: 'Sprühen',
                desc: 'Einmal auf den Hals, einmal auf jeder Innenseite des Unterarms oder eine Stelle am Ohr. Das sind 2–4 Sprühstösse – mehr nicht!'
              },
              {
                step: 5,
                title: 'Warten & nicht reiben',
                desc: 'Warte 30 Sekunden. NICHT reiben! Reiben erwärmt die Haut, dadurch verfliegen die Top-Noten schneller. Lass den Duft einfach trocknen.'
              },
              {
                step: 6,
                title: 'Zweischicht-Trick (Optional)',
                desc: 'Bei schwachen Düften oder für den ganzen Tag: Nach 2–3 Stunden eine zusätzliche leichte Schicht auf den Hals sprühen – frischt den Duft am Nachmittag auf.'
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
            ✨ Profi-Tipps für noch bessere Ergebnisse
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
                title: 'Feuchtigkeitscreme + Duft',
                tip: 'Trage vor dem Duft eine neutrale, ungeschmierte Feuchtigkeitscreme auf die Auftragsplätze. Auf gepflegter Haut hält der Duft meist besser als auf trockener.'
              },
              {
                title: 'Duftschicht-Technik',
                tip: 'Sprühe einen kurz vor dem Anziehen auf die Kleidung – aber nur leicht! Manche Stoffe können verfärben. Perfekt: dünner Stoff wie Seide oder Baumwolle am Hals/Ausschnitt.'
              },
              {
                title: 'Haare – ja oder nein?',
                tip: 'Haare sind ideal für schwache Düfte. Ein leichter Sprüh ins Haar hilft dem Duft, den ganzen Tag zu „diffundieren". Aber nur 1 Sprühstoss – zu viel wirkt aufdringlich.'
              },
              {
                title: 'Nicht-Pulvis-Düfte richtig aufbewahren',
                tip: 'Lagere deinen Duft kühl, dunkel und ohne Temperaturschwankungen – ein Kühlschrank ist nicht nötig. Wärme und Sonnenlicht können den Duft mit der Zeit verändern.'
              },
              {
                title: 'Übertragungs-Trick',
                tip: 'Nach dem Auftragen: Wende sanft die inneren Unterarme aneinander (ohne zu reiben). Das verteilt den Duft gleichmässig und verstärkt die Duftentwicklung.'
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
            ❓ Häufig gestellte Fragen
          </h2>
          <div style={{ display: 'grid', gap: '1.5rem' }}>
            {[
              {
                q: 'Wie oft sollte ich den Duft auftragen?',
                a: 'Einmal morgens reicht. Je nach Dufttyp und Haltbarkeit kann ein Retouch am Nachmittag nötig sein. Starte mit 2–4 Sprühstössen – du kannst immer noch nachlegen, aber nicht weniger werden.'
              },
              {
                q: 'Ist es schlecht, den Duft mehrmals täglich aufzutragen?',
                a: 'Nein, aber das Nasegeruchssystem „gewöhnt sich" daran – du riechst ihn selbst nicht mehr nach einer Stunde. Andere riechen ihn weiterhin. Achte auf die Reaktion anderer, um nicht zu viel zu sprühen.'
              },
              {
                q: 'Kann ich Duft auf nasse Haare sprühen?',
                a: 'Ja, ideal. Nasse Haare halten den Duft noch länger und helfen ihm zu diffundieren. Aber sehr sparsam – 1 leichter Sprüh auf den Haaransatz reicht.'
              },
              {
                q: 'Warum riecht mein Duft schwächer als früher?',
                a: 'Dein Geruchssinn hat sich „daran gewöhnt" (Olfaktorische Adaptation). Andere riechen ihn noch deutlich. Wenn der Duft älter als 5 Jahre ist, können die Duftmoleküle auch verblasst sein – lagere neu gekaufte Düfte kühl und dunkel.'
              },
              {
                q: 'Sollte ich den Duft mit Deodorant kombinieren?',
                a: 'Ja, aber nutze zuerst ein unparfümiertes Deo/Antitranspirant. Dann den Duft auftragen. Manche Deos können mit Duftölen reagieren – teste es vorher an einer kleinen Stelle.'
              },
              {
                q: 'Was ist besser: EdP, EdT oder Parfum?',
                a: 'Parfum (Extrait) ist am intensivsten und haltbarsten (8–24h). EdP (Eau de Parfum) ist ein gutes Mittelding (6–12h). EdT (Eau de Toilette) ist leichter und angenehmer an warmen Tagen (3–6h). Je konzentrierter, desto sparsamer auftragen.'
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
            Bereit für den richtigen Duft?
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 700, color: '#faf7f2', marginBottom: '1rem' }}>
            Finde deinen Signature-Duft
          </h2>
          <p style={{ color: 'rgba(250,247,242,0.75)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            Mit der richtigen Anwendungstechnik wirkst du optimal. Aber erst mit dem richtigen Duft – passend zu deinen Lieblingsnoten, dem Anlass, der Jahreszeit und deinem Budget.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/quiz" style={{
              background: '#d4af37',
              color: '#2a1d12',
              fontWeight: 700,
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '0.95rem',
              display: 'inline-block',
            }}>Quiz starten</Link>
            <Link href="/duefte" style={{
              background: 'transparent',
              color: '#faf7f2',
              fontWeight: 600,
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '0.95rem',
              border: '1px solid rgba(250,247,242,0.3)',
              display: 'inline-block',
            }}>Alle Düfte durchsuchen</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
