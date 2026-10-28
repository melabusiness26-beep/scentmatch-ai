import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/app/Breadcrumb';

export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export const metadata: Metadata = {
  title: 'Duftarten erklärt: EdP, EdT, Parfum und Cologne – Was ist der Unterschied? | Auressa',
  description:
    'Verstehe den Unterschied zwischen Eau de Parfum, Eau de Toilette, Extrait und Cologne: Konzentration, Haltbarkeit, Intensität und Preis im direkten Vergleich.',
  alternates: { canonical: `${SITE_URL}/duftarten` },
  openGraph: {
    title: 'Duftarten: EdP, EdT, Parfum & Cologne | Auressa',
    description: 'Kompletter Guide zu Duftkonzentrationen: Unterschiede, Haltbarkeit, Preise und wie du die richtige Duftart wählst.',
    type: 'website',
    url: `${SITE_URL}/duftarten`,
  },
};

export default function FragranceTypesPage() {
  return (
    <main style={{ backgroundColor: '#faf7f2' }}>
      <Breadcrumb items={[{ label: 'Duftarten', href: '/duftarten' }]} />

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
            Wissen & Auswahl
          </p>
          <h1 style={{
            fontSize: 'clamp(28px, 6vw, 48px)',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            marginBottom: '1.5rem',
            lineHeight: 1.15,
            color: '#faf7f2',
          }}>
            Duftarten erklärt – EdP, EdT, Parfum und Co.
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(250,247,242,0.8)', margin: 0 }}>
            Verstehe den Unterschied zwischen Duftkonzentrationen – und wähle die richtige für deine Bedürfnisse.
          </p>
        </div>
      </section>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '3rem 1.25rem' }}>

        {/* Intro */}
        <section style={{ marginBottom: '3rem' }}>
          <p style={{ fontSize: '1rem', lineHeight: 1.8, color: '#4a3020', marginBottom: '1.5rem' }}>
            Die Begriffe EdP, EdT, Cologne und Extrait sind nicht nur Marketing – sie bezeichnen die
            <strong> Konzentration der Duftöle </strong> in der Flüssigkeit. Das beeinflusst direkt die
            Haltbarkeit, Intensität und den Preis. Diese Anleitung hilft dir, die richtige Duftart
            für deine Situation zu wählen.
          </p>
        </section>

        {/* Vergleichstabelle */}
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
            📊 Übersicht: Die 5 Duftarten im Vergleich
          </h2>
          <div style={{
            overflowX: 'auto',
            marginBottom: '2rem',
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '0.85rem',
            }}>
              <thead>
                <tr style={{ background: 'rgba(212,175,55,0.1)', borderBottom: '2px solid rgba(212,175,55,0.3)' }}>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, color: '#2a1d12' }}>Duftart</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, color: '#2a1d12' }}>Konzentration</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, color: '#2a1d12' }}>Haltbarkeit</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, color: '#2a1d12' }}>Intensität</th>
                  <th style={{ padding: '1rem', textAlign: 'left', fontWeight: 700, color: '#2a1d12' }}>Preis (ca.)</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Extrait / Parfum', '20–40%', '8–24h', '⭐⭐⭐⭐⭐', '💰💰💰💰💰'],
                  ['Eau de Parfum (EdP)', '15–20%', '6–12h', '⭐⭐⭐⭐', '💰💰💰'],
                  ['Eau de Toilette (EdT)', '5–15%', '3–6h', '⭐⭐⭐', '💰💰'],
                  ['Eau de Cologne', '2–5%', '1–2h', '⭐⭐', '💰'],
                  ['Eau Fraîche', '1–3%', '30min–1h', '⭐', '💰']
                ].map((row, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid rgba(212,175,55,0.1)' }}>
                    {row.map((cell, cidx) => (
                      <td key={cidx} style={{
                        padding: '1rem',
                        color: cidx === 0 ? '#2a1d12' : '#6b5344',
                        fontWeight: cidx === 0 ? 600 : 400,
                      }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Detaillierte Beschreibung */}
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
            🔍 Duftarten im Detail
          </h2>
          <div style={{ display: 'grid', gap: '2rem' }}>
            {[
              {
                name: 'Extrait de Parfum (Parfum) – Das Königreich',
                conc: '20–40% Duftöl-Konzentration',
                icon: '👑',
                desc: 'Dies ist das teuerste und intensivste Format. Ein Tropfen Extrait ist oft genug für den ganzen Tag. Die Haltbarkeit ist legendär – 8–24 Stunden oder sogar mehr.',
                haltbar: '8–24 Stunden',
                intensität: 'Extrem intensiv',
                preis: '💰💰💰💰💰 (oft CHF 150+)',
                wann: 'Für spezielle Anlässe, abends, formale Events. Ideal für Liebhaber, die nicht regelmässig nachsprühen wollen.',
                achtung: '⚠️ Vorsicht: Wegen der hohen Konzentration genügen 1–2 Sprühstösse. Zu viel wirkt schnell überwältigend. Auch teuer – man möchte es nicht verschwenden.',
                beispiele: 'Creed Royal Oud, Heeley Sel Marin, Jo Malone Extrait-Serie'
              },
              {
                name: 'Eau de Parfum (EdP) – Das Gleichgewicht',
                conc: '15–20% Duftöl-Konzentration',
                icon: '⚖️',
                desc: 'Der Standard für hochwertige Düfte. EdP bietet ein perfektes Gleichgewicht zwischen Intensität und Preis. Das Beste für den Alltag und formale Anlässe.',
                haltbar: '6–12 Stunden',
                intensität: 'Stark – deutlich spürbar',
                preis: '💰💰💰 (CHF 60–150)',
                wann: 'Der Allrounder. Ideal für täglich, spezielle Events, längere Ereignisse (Arbeitstag, Abend).',
                achtung: '✅ Das beliebteste Format für Qualitäts-Düfte. Gutes Preis-Leistungs-Verhältnis. Meist nach 4–5 Stunden ein Retouch empfohlen.',
                beispiele: 'Creed Aventus, Tom Ford Black Opium, Dior Sauvage'
              },
              {
                name: 'Eau de Toilette (EdT) – Der Leichte',
                conc: '5–15% Duftöl-Konzentration',
                icon: '🌊',
                desc: 'Leichter, frischer und günstiger. Ideal für warme Jahreszeiten und subtile Duftwirkung. Hält kürzer, darum braucht man häufiger Retouches.',
                haltbar: '3–6 Stunden',
                intensität: 'Moderat – subtil und frisch',
                preis: '💰💰 (CHF 20–80)',
                wann: 'Sommer, warme Tage, Büro/subtile Umgebung, leichte tägliche Anwendung. Wenn du nicht intensiv riechen möchtest.',
                achtung: '💡 EdT verdampft schneller – es ist die häufigste Kaufoption. Nach 3–4 Stunden ist oft ein Retouch nötig.',
                beispiele: 'Acqua di Parma Blu Mediterraneo, Hermès Eau de Gentiane Blanche, Issey Miyake L\'Eau d\'Issey'
              },
              {
                name: 'Eau de Cologne – Der Klassiker',
                conc: '2–5% Duftöl-Konzentration',
                icon: '💨',
                desc: 'Ein historisches Format mit starker Tradition. Sehr leicht und frisch, ideal für schnelle „Erfrischungen". Sehr kurze Haltbarkeit.',
                haltbar: '1–2 Stunden',
                intensität: 'Sehr leicht – kaum zu riechen nach kurzer Zeit',
                preis: '💰 (CHF 10–30)',
                wann: 'Eine schnelle Erfrischung, nicht als Hauptduft. Ideal für heisse Tage oder wenn du viel schwitzest.',
                achtung: '⚠️ Kurze Haltbarkeit – nicht ideal als Alltagsduft. Aber sehr erfrischend und wirtschaftlich.',
                beispiele: '4711 Eau de Cologne, Hermès Eau de Gentiane Blanche (Cologne-Konzentration)'
              },
              {
                name: 'Eau Fraîche – Die Leichteste',
                conc: '1–3% Duftöl-Konzentration',
                icon: '☁️',
                desc: 'Das leichteste Format. Kaum wahrnehmbar, aber sehr erfrischend. Fast wie duftiertes Wasser. Praktisch keine Haltbarkeit.',
                haltbar: '30 Minuten–1 Stunde',
                intensität: 'Kaum spürbar – Hauch von Duft',
                preis: '💰 (CHF 5–20)',
                wann: 'Schnelle Erfrischung im Büro, nach dem Duschen, als „Duftwasser" zwischendurch.',
                achtung: '⚠️ Sehr kurze Haltbarkeit – nicht als Hauptduft. Eher ein Erfrischungs-Spray.',
                beispiele: 'Viele „Duft-Sprays" von günstigen Marken, auch Körper-Sprays von Premium-Häusern'
              }
            ].map((type, idx) => (
              <div
                key={idx}
                style={{
                  background: '#fff',
                  border: '2px solid rgba(212,175,55,0.15)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                  overflow: 'hidden',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                  <div style={{ fontSize: '2rem' }}>{type.icon}</div>
                  <div>
                    <h3 style={{ color: '#2a1d12', fontWeight: 700, margin: 0, fontSize: '1.2rem' }}>
                      {type.name}
                    </h3>
                    <p style={{ color: '#8a6a20', fontWeight: 600, margin: '0.25rem 0 0 0', fontSize: '0.9rem' }}>
                      {type.conc}
                    </p>
                  </div>
                </div>

                <p style={{ color: '#6b5344', lineHeight: 1.6, margin: '1rem 0', fontSize: '0.95rem' }}>
                  {type.desc}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', margin: '1rem 0', fontSize: '0.9rem' }}>
                  <div>
                    <p style={{ color: '#8a6a20', fontWeight: 600, margin: '0 0 0.25rem 0' }}>⏰ Haltbarkeit</p>
                    <p style={{ color: '#6b5344', margin: 0 }}>{type.haltbar}</p>
                  </div>
                  <div>
                    <p style={{ color: '#8a6a20', fontWeight: 600, margin: '0 0 0.25rem 0' }}>📈 Intensität</p>
                    <p style={{ color: '#6b5344', margin: 0 }}>{type.intensität}</p>
                  </div>
                  <div>
                    <p style={{ color: '#8a6a20', fontWeight: 600, margin: '0 0 0.25rem 0' }}>💰 Preis</p>
                    <p style={{ color: '#6b5344', margin: 0 }}>{type.preis}</p>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(212,175,55,0.1)', paddingTop: '1rem', marginTop: '1rem', display: 'grid', gap: '0.75rem', fontSize: '0.9rem' }}>
                  <p style={{ color: '#6b5344', margin: 0 }}>
                    <strong style={{ color: '#2a1d12' }}>Beste Verwendung:</strong> {type.wann}
                  </p>
                  <p style={{ color: '#6b5344', margin: 0 }}>
                    {type.achtung}
                  </p>
                  <p style={{ color: '#8a6a20', fontWeight: 600, margin: 0 }}>
                    Beispiele: {type.beispiele}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Auswahl-Guide */}
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
            🎯 Wie du die richtige Duftart für dich wählst
          </h2>
          <div style={{
            background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.04))',
            border: '2px solid rgba(212,175,55,0.2)',
            borderRadius: '16px',
            padding: '2rem',
            display: 'grid',
            gap: '1.5rem',
          }}>
            <div>
              <h3 style={{ color: '#2a1d12', fontWeight: 700, marginBottom: '0.75rem', fontSize: '1.05rem' }}>
                ❓ Fragefragen zur richtigen Auswahl
              </h3>
              <div style={{ display: 'grid', gap: '1rem', fontSize: '0.95rem', color: '#6b5344' }}>
                <p style={{ margin: 0, paddingBottom: '0.75rem', borderBottom: '1px solid rgba(212,175,55,0.1)' }}>
                  <strong style={{ color: '#2a1d12' }}>Frage 1: Wie lange möchte dein Duft halten?</strong><br/>
                  Ganzer Tag ohne Retouch → Extrait oder EdP. Halbtag ok → EdT. Schnelle Erfrischung → Cologne.
                </p>
                <p style={{ margin: 0, paddingBottom: '0.75rem', borderBottom: '1px solid rgba(212,175,55,0.1)' }}>
                  <strong style={{ color: '#2a1d12' }}>Frage 2: Wie intensiv möchte dein Duft wirken?</strong><br/>
                  Sehr präsent → Extrait oder EdP. Moderat → EdT. Subtil → EdT oder Cologne.
                </p>
                <p style={{ margin: 0, paddingBottom: '0.75rem', borderBottom: '1px solid rgba(212,175,55,0.1)' }}>
                  <strong style={{ color: '#2a1d12' }}>Frage 3: Was ist dein Budget?</strong><br/>
                  Unlimited → Extrait. Premium (CHF 60+) → EdP. Budget (CHF 20–60) → EdT. Sparen → Cologne.
                </p>
                <p style={{ margin: 0, paddingBottom: '0.75rem', borderBottom: '1px solid rgba(212,175,55,0.1)' }}>
                  <strong style={{ color: '#2a1d12' }}>Frage 4: Jahreszeit & Klima?</strong><br/>
                  Warm/Sommer → EdT oder Cologne. Kühl/Winter → EdP oder Extrait. Ganzjährig → EdP.
                </p>
                <p style={{ margin: 0 }}>
                  <strong style={{ color: '#2a1d12' }}>Frage 5: Wie oft möchtest du nachsprühen?</strong><br/>
                  Selten → Extrait oder EdP. Gerne → EdT. Häufig → Cologne (ist ohnehin kurz).
                </p>
              </div>
            </div>
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
            💡 Profi-Tipps zum Kauf
          </h2>
          <div style={{
            display: 'grid',
            gap: '1.5rem',
          }}>
            {[
              {
                title: 'Gleicher Duft, verschiedene Konzentrationen',
                tip: 'Viele Premium-Düfte gibt es in mehreren Konzentrationen – z. B. Dior Sauvage in EdP und EdT. EdT riecht ähnlich, aber leichter und günstiger. Test beide, wenn der Preis zählt.'
              },
              {
                title: 'EdP ist der Sweet-Spot',
                tip: 'Für die meisten Menschen ist EdP das beste Verhältnis zwischen Preis, Intensität und Haltbarkeit. Starte hier, bevor du zu teurerem Extrait oder leichterem EdT wechselst.'
              },
              {
                title: 'EdT für Anfänger',
                tip: 'Nicht sicher, ob dir ein Duft wirklich gefällt? Kaufe zuerst die EdT-Version (günstiger). Wenn du sie liebst, upgrader auf EdP oder Extrait. Spart Geld bei falschen Käufen.'
              },
              {
                title: 'Extrait für Liebhaber',
                tip: 'Wenn du einen Duft SEHR liebst und einen Favoriten hast, lohnt sich ein Extrait. Die Haltbarkeit und Intensität sind unschlagbar – und du verbrauchst weniger pro Tag.'
              },
              {
                title: 'Sommer = EdT, Winter = EdP',
                tip: 'Eine einfache Regel: Im Sommer EdT (frischer, leichter, nicht zu intensiv). Im Winter EdP (präsenter, wärmer). So maximierst du den Genuss je nach Jahreszeit.'
              },
              {
                title: 'Retouch-Spray kaufen',
                tip: 'Bei EdT oder Cologne: Kaufe einen günstigen Retouch-Spray (oder die gleiche EdT in mini). Nach 3–4 Stunden ein Sprühstoss = neuer Duft den ganzen Tag.'
              }
            ].map((pro, idx) => (
              <div
                key={idx}
                style={{
                  background: '#fff',
                  border: '1px solid rgba(212,175,55,0.15)',
                  borderRadius: '12px',
                  padding: '1.5rem',
                }}
              >
                <h3 style={{ color: '#2a1d12', fontWeight: 700, marginBottom: '0.5rem', fontSize: '1.05rem' }}>
                  {pro.title}
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
                q: 'Kann ich EdP wie EdT auftragen?',
                a: 'Ja, aber sparsamer. EdP ist konzentrierter – 2–3 Sprühstösse statt 4–5. Zu viel EdP wirkt aufdringlich.'
              },
              {
                q: 'Ist EdT wirklich billig-Duft?',
                a: 'Nein. Viele Premium-EdT-Düfte sind grossartig. Der Unterschied ist Haltbarkeit, nicht Qualität. EdT braucht nur häufiger Retouch.'
              },
              {
                q: 'Sollte ich immer die teuerste Konzentration kaufen?',
                a: 'Nein. Kauf nach Budget und Bedarf. Wenn EdP perfekt für dich ist, gibt es keinen Grund zu Extrait. Sparen ist smart.'
              },
              {
                q: 'Warum kostet Extrait so viel mehr?',
                a: 'Höhere Duftöl-Konzentration = mehr Rohstoffe + längere Haltbarkeit + längerer Produktionsprozess. Aber auch viel Marketing.'
              },
              {
                q: 'Kann ich EdP und EdT mischen?',
                a: 'Nicht ideal. EdP + EdP = super intensiv. EdP + EdT = mittelmässig. Besser: Layering mit verschiedenen Düften.'
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
            Bereit zum Kaufen?
          </p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', fontWeight: 700, color: '#faf7f2', marginBottom: '1rem' }}>
            Finde deine perfekte Duftart
          </h2>
          <p style={{ color: 'rgba(250,247,242,0.75)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            Mit dem Wissen über Duftkonzentrationen kannst du jetzt smartere Kaufentscheidungen treffen –
            die richtige Balance zwischen Preis, Intensität und Haltbarkeit für DEINE Situation.
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
            }}>Düfte durchsuchen</Link>
          </div>
        </section>
      </div>
    </main>
  );
}
