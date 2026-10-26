import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/app/Breadcrumb';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export const metadata: Metadata = {
  title: 'Duftsammlung aufbauen: Vom ersten bis zum perfekten Duft-Schrank',
  description:
    'Wie du eine kuratierte Duftsammlung aufbaust – von der ersten Wahl über die Ergänzung bis zur 5, 10 oder 20+ Duft-Kollektion. Mit Strategien für jeden Budget und jede Gelegenheit.',
  alternates: { canonical: '/duftsammlung' },
  openGraph: {
    title: 'Duftsammlung aufbauen | Auressa',
    description:
      'Strategie, um eine durchdachte Duftsammlung zu entwickeln – ohne Impulsräufe, mit System und Zielen.',
    type: 'website',
    url: `${SITE_URL}/duftsammlung`
  }
};

export default function DuftsammlungPage() {
  return (
    <main>
      <Breadcrumb items={[{ label: 'Duftsammlung aufbauen', href: '/duftsammlung' }]} />
      <div className="container">
        <section className="section">
          <p className="eyebrow">Wissen</p>
          <h1 className="detail-title">Duftsammlung aufbauen</h1>
          <p className="lead">
            Dein erstes Lieblingsduft ist gefunden – und jetzt? Sollen es 2 Düfte sein oder 20? Wie baust du eine
            Sammlung auf, ohne blind rumzukaufen und später Düfte zu haben, die du nie trägst?
          </p>
          <p className="lead">
            Eine gute Duftsammlung ist wie ein gut organisierter Kleiderschrank: Sie funktioniert zusammen, jeder Duft
            hat seinen Zweck, und du trägst alles, was darin hängt.
          </p>

          <h2>Fünf Gründe, warum ein Duft allein nicht reicht</h2>

          <ul style={{ marginBottom: '2rem' }}>
            <li style={{ marginBottom: '1rem' }}>
              <strong>Olfactory Adaptation:</strong> Nach 15–30 Minuten riechst du deinen eigenen Duft nicht mehr
              (aber andere tun es noch). Mit mehreren Düften vermeidest du, dass du dich an einen gewöhnst.
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <strong>Jahreszeiten & Temperatur:</strong> Ein schwerer orientalischer Duft im Sommer ist überwältigend;
              ein frischer Zitrusduft im Winter wirkt dünn. Ein Duft pro Jahreszeit macht Sinn.
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <strong>Anlässe & Umgebung:</strong> Der Duft fürs Büro ist nicht der für die Party; der für einen Spaziergang
              ist nicht der für ein Date. Situation ändert, Duft auch.
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <strong>Körperchemie-Variabilität:</strong> Manchmal passt dir ein Duft, manchmal nicht – je nach Tageszeit,
              Hormonzyklus oder was du gegessen hast. Mit mehreren hast du Backup.
            </li>
            <li>
              <strong>Abwechslung ist gut für die Nase:</strong> Die menschliche Nase braucht Vielfalt, um länger engagiert
              zu bleiben. Das ist auch warum Perfumeurs mehrere Düfte in einer Serie machen.
            </li>
          </ul>

          <h2>Wie viele Düfte brauchst du wirklich?</h2>

          <div style={{
            display: 'grid',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {[
              {
                count: '1 Duft',
                typ: 'Der Anfänger',
                beschreibung: 'Du weißt, dass dich dieser Duft liebt – und du magst alles damit. Perfect.',
                min: '€30–80',
                max: '€150+',
                tipp: 'Das ist völlig ok. Ein großartiger Lieblingsduft ist besser als 10 mittelmäßige. Keine Pflicht, mehr zu haben.'
              },
              {
                count: '3 Düfte',
                typ: 'Die goldene Mitte',
                beschreibung: 'Du hast einen für Tag (frisch), einen für Abend (intensiv) und einen für Wochenende (dein Favorit).',
                min: '€150–250',
                max: '€400–600',
                tipp: 'Das ist für die meisten das ideale Setup. Du hast Abwechslung, aber es bleibt überschaubar. Ein Duft pro Jahreszeit ist auch eine gute Strategie.'
              },
              {
                count: '5–7 Düfte',
                typ: 'Der Enthusiast',
                beschreibung: 'Ein Duft pro Jahreszeit, plus deine absoluten Favoriten + ein Office-Duft + ein Statement-Duft.',
                min: '€400–800',
                max: '€1000+',
                tipp: 'Gute Balance zwischen Auswahl und Pflege. Du brauchst aber ein System (Kategorien, Rotation), sonst vergisst du die Hälfte.'
              },
              {
                count: '10+ Düfte',
                typ: 'Der Collector',
                beschreibung: 'Du hast für jede Mood, Jahreszeit, jeden Tag und jede Stunde den perfekten Duft. Das ist eine echte Hobby-Sammlung.',
                min: '€1000+',
                max: '€3000+',
                tipp: 'Jetzt brauchst du ein Lagersystem (cool, dunkel, vertikal) und eine Tracking-Liste. Sonst hast du einen Duft, merkst es aber nach 2 Jahren nicht.'
              }
            ].map((item, i) => (
              <div key={i} style={{
                background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.04))',
                border: '1px solid rgba(212,175,55,0.15)',
                borderRadius: '8px',
                padding: '1.5rem'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.75rem' }}>
                  <div>
                    <p style={{ margin: '0 0 0.25rem 0', fontWeight: 700, fontSize: '1.05rem' }}>{item.count}</p>
                    <p style={{ margin: 0, fontSize: '0.9rem', fontStyle: 'italic', color: '#d4af37' }}>{item.typ}</p>
                  </div>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#6b5344', textAlign: 'right' }}>
                    <strong>Budget:</strong><br/>{item.min} – {item.max}
                  </p>
                </div>
                <p style={{ margin: '0.75rem 0', fontSize: '0.95rem', color: '#5b4d40' }}>
                  {item.beschreibung}
                </p>
                <p style={{ margin: '0.75rem 0 0 0', padding: '0.75rem', background: 'rgba(212,175,55,0.05)', borderRadius: '4px', fontSize: '0.9rem', color: '#5b4d40' }}>
                  💡 {item.tipp}
                </p>
              </div>
            ))}
          </div>

          <h2>7 Strategien: Wie du deine Sammlung smart aufbaust</h2>

          <div style={{
            display: 'grid',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {[
              {
                strategie: 'Nach Jahreszeiten organisieren',
                warum: 'Sommer ≠ Winter. Ein Duft, der im Juli perfekt ist, wirkt im Januar dünn. Vier Düfte (einen pro Jahreszeit) sind a good starting point.',
                wie: 'Duft 1 = Zitrus, Grün (Frühling). Duft 2 = Leicht, Blütenweiß (Sommer). Duft 3 = Warm, Würzig (Herbst). Duft 4 = Tief, Holzig (Winter).',
                best_for: 'Anfänger bis Intermediate'
              },
              {
                strategie: 'Nach Zeit des Tages organisieren',
                warum: 'Ein Duft fürs Aufwachen (frisch, belebend), einer fürs Büro (unauffällig), einer fürs Ausgehen (intensiv), einer fürs Einschlafen (soft, warm).',
                wie: 'Kategorie 1 = Morgens (zitronig, energetisch). Kategorie 2 = Tagsüber (neutral, angepasst). Kategorie 3 = Abends (sinnlich, intensiv). Kategorie 4 = Nachts (cremig, sanft).',
                best_for: 'Wer gerne Routinen hat'
              },
              {
                strategie: 'Nach Anlass/Situation organisieren',
                warum: 'Office, Date, Sport, Freizeit, Feier, Reise – jede Situation braucht einen anderen Duft-Typ.',
                wie: 'Office = unauffällig, professional (EdT). Date = sinnlich, elegant (EdP). Sport = leicht, frisch (Body Spray). Feier = dramatisch, extrovertiert (Eau de Parfum). Reise = leicht, tragbar (5–10ml).',
                best_for: 'Wer verschieden Leben verschiedene Düfte will'
              },
              {
                strategie: 'Nach Duftfamilie organisieren',
                warum: 'Ähnliche Familien teilen Noten und Charakter – so lernst du deine Vorlieben. Eine Familie pro Jahreszeit ist ideal.',
                wie: 'Frühling = Floral leicht. Sommer = Citrus & Green. Herbst = Gourmand & Amber. Winter = Woody & Oriental. So hast du Vielfalt, aber struktur.',
                best_for: 'Wer deine Duftvorlieben verstehen will'
              },
              {
                strategie: 'Nach Budget aufbauen',
                warum: 'Statt ein 200€-Duft zu kaufen – kauf vier 50€-Düfte. Du gewinnst Abwechslung und lernst schneller, was dir gefällt.',
                wie: 'Budget 200€ = vier 50€-Düfte (oder: zwei 70€ + zwei 30€ günstige Klone). So hast du 4 komplett verschiedene Charaktere.',
                best_for: 'Anfänger, die herauskommen wollen, was ihnen gefällt'
              },
              {
                strategie: 'Die „Anker + Variationen" Methode',
                warum: 'Du hast einen Lieblingduft gefunden – kaufe jetzt verschiedene Versionen und ähnliche Düfte der gleichen Familie. Das ist sicherer als wild rumzutesten.',
                wie: 'Beispiel: Du liebst Chanel No. 5. Kaufe: 1) No. 5 EdP (Original), 2) No. 5 L\'Eau EdT (leichter), 3) Einen ähnlichen günstigen Klon, 4) Einen anderen Floral-Klassiker (Dior J\'adore).',
                best_for: 'Wer einen Lieblingduft hat und darauf aufbauen will'
              },
              {
                strategie: 'Die „Konzentration-Vielfalt" Methode',
                warum: 'Statt jeden Duft in EdP zu kaufen – kauf verschiedene Konzentrationen. EdP hält länger, EdT ist leichter – beide haben ihre Vorteile.',
                wie: 'Kaufe denen gleichen Duft in EdP und EdT. Oder: EdP im Winter, EdT im Sommer. So hast du „vier" Düfte (2 Düfte × 2 Konzentrationen).',
                best_for: 'Wer den gleichen Duft in verschiedenen Intensitäten mag'
              }
            ].map((item, i) => (
              <div key={i}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem' }}>
                  {i + 1}. {item.strategie}
                </h4>
                <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.9rem', color: '#6b5344' }}>
                  <strong>Warum:</strong> {item.warum}
                </p>
                <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.9rem', color: '#5b4d40', paddingLeft: '1rem', borderLeft: '3px solid #d4af37' }}>
                  <strong>Wie:</strong> {item.wie}
                </p>
                <p style={{ margin: 0, fontSize: '0.85rem', color: '#8b7d74', fontStyle: 'italic' }}>
                  👥 <strong>Passt für:</strong> {item.best_for}
                </p>
              </div>
            ))}
          </div>

          <h2>5 häufige Fehler beim Aufbau einer Duftsammlung (und wie du sie vermeidest)</h2>

          <div style={{
            display: 'grid',
            gap: '1.2rem',
            marginBottom: '2rem'
          }}>
            {[
              {
                fehler: 'Impulsiv kaufen, ohne einen Plan zu haben',
                warum: 'Du siehst einen schönen Duft, es ist gerade im Sale, und plötzlich hast du 10 Düfte, die nicht zusammenpassen.',
                lösung: 'Definiere zuerst dein Setup (3 oder 5 Düfte?), dann kauf gezielt. Mach eine Liste mit „Was brauche ich noch?" und halte dich daran. Warte auf Wunschlisten 2–3 Wochen, bevor du kaufst.'
              },
              {
                fehler: 'Teuer verwechseln mit Qualität',
                warum: 'Du denkst „Teurere Düfte sind besser", kaufst Duft X für 180€, magst ihn aber nicht. Deine Körperchemie passt nicht dazu.',
                lösung: 'Teste immer zuerst (Probe, Sample, Tester). Günstige Düfte können großartig sein. Preis = Marke + Flakon + Konzentration, nicht automatisch Qualität.'
              },
              {
                fehler: 'Zu viele ähnliche Düfte kaufen',
                warum: 'Du liebst Vanille, also kaufst du 6 Vanille-Düfte. Das ist langweilig und du brauchst sie nie alle.',
                lösung: 'Pro Familie (Vanille, Floral, Zitrus) maximal 2–3. Der Rest sollte anderswo sein. Vielfalt schlägt Tiefe.'
              },
              {
                fehler: 'Sammlung neglektieren',
                warum: 'Nach 6 Monaten hast du 5 Düfte, trägst aber immer nur 1. Die anderen gammeln im Schrank.',
                lösung: 'Mach eine Rotation: Jeden Monat ändert die Sammlung. Oder: jeden Wochentag ein anderer Duft. So vergisst du keinen.'
              },
              {
                fehler: 'Falsch lagern',
                warum: 'Sonnenlicht, Hitze und Feuchtigkeit zerstören Düfte. Nach einem Jahr riechen deine schönen Flakons nach Chemie.',
                lösung: 'Lagere kühl, dunkel, vertikal (nicht liegend). Kühlschrank oder kühle Ecke im Schlafzimmer. Nicht im Badezimmer (zu warm & feucht).'
              }
            ].map((item, i) => (
              <div key={i} style={{
                background: 'linear-gradient(135deg, rgba(212,175,55,0.05), rgba(212,175,55,0.02))',
                border: '1px solid rgba(212,175,55,0.1)',
                borderRadius: '8px',
                padding: '1.25rem'
              }}>
                <p style={{ margin: '0 0 0.5rem 0', fontWeight: 600, fontSize: '0.95rem' }}>
                  🔴 {item.fehler}
                </p>
                <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.9rem', color: '#6b5344' }}>
                  <strong>Warum problematisch:</strong> {item.warum}
                </p>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#5b4d40' }}>
                  <strong>✓ Lösung:</strong> {item.lösung}
                </p>
              </div>
            ))}
          </div>

          <h2>Budgettipps: Wie man eine Sammlung mit kleinerem Budget aufbaut</h2>

          <p style={{ marginBottom: '1.5rem' }}>
            Du willst eine Sammlung, hast aber nicht 1000€ zum Ausgeben? Kein Problem. Mit den richtigen Strategien
            baust du eine großartige Sammlung für unter 300€.
          </p>

          <ol style={{ marginBottom: '2rem' }}>
            <li style={{ marginBottom: '1rem' }}>
              <strong>Kauf Samples & Tester</strong> – 2–5€ für eine kleine Flasche. So testest du 10 Düfte für 30€ statt 10 × 80€.
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <strong>Nutze günstige Klone</strong> – Brands wie Armaf, Lattafa (20–30€) duplizieren teure Düfte zu 75% der Qualität. Legale Alternative.
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <strong>Kauf EdT statt EdP</strong> – Gleicher Duft, aber EdT kostet 40–60% weniger. Haltbarkeit ist 4–6 Stunden statt 8+ – für den Job völlig ok.
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <strong>Warte auf Sales</strong> – Notino.ch, Flaconi, Breuninger haben regelmäßig 30–50% Rabatt. Black Friday ist goldwert.
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <strong>Mixe Preisklassen</strong> – 1–2 teurer Lieblingsdüfte + 3–4 Budget-Düfte = vielfalt mit kleinerem Budget.
            </li>
            <li>
              <strong>Kauf Unisex/Niche-Düfte</strong> – Diese sind oft günstiger als Luxus-Düfte und überraschend gut.
            </li>
          </ol>

          <h2>Tracking & Pflege: Wie du deine Sammlung organisiert hältst</h2>

          <p style={{ marginBottom: '1.5rem' }}>
            Ab 5+ Düften brauchst du ein System, sonst verlierst du die Übersicht.
          </p>

          <h3>Option 1: Digitale Liste (Tabelle)</h3>
          <p style={{ marginBottom: '1rem' }}>
            Erstelle eine Excel/Google Sheets-Tabelle mit:
          </p>
          <ul style={{ marginBottom: '1.5rem' }}>
            <li>Duftname + Marke</li>
            <li>Konzentration (EdP/EdT/Cologne)</li>
            <li>Duftfamilie</li>
            <li>Wann trägst du ihn? (Jahreszeit, Anlass, Tageszeit)</li>
            <li>Kaufdatum + Budget</li>
            <li>Haltbarkeit auf deiner Haut</li>
            <li>Favorit? (⭐⭐⭐)</li>
          </ul>

          <h3>Option 2: Physische Sammlung</h3>
          <p style={{ marginBottom: '1rem' }}>
            Organisiere deine Düfte:
          </p>
          <ul style={{ marginBottom: '1.5rem' }}>
            <li>Nach Jahreszeit (separate Boxen)</li>
            <li>Nach Familie (Floral zusammen, Zitrus zusammen)</li>
            <li>Nach Größe (große Flakons unten, Samples oben)</li>
            <li>Im **Kühlschrank** (für Langzeitlagerung)</li>
            <li>Mit **Etiketten** – Kaufdatum, damit du weißt, wann es anfängt zu altern</li>
          </ul>

          <h3>Option 3: Rotation & Testing</h3>
          <p style={{ marginBottom: '1rem' }}>
            Vermeide, dass Düfte „neglektiert" werden:
          </p>
          <ul>
            <li><strong>Wöchentliche Rotation:</strong> Jeden Wochentag ein anderer Duft. Montag = Frisch, Dienstag = Blüte, ..., Freitag = Intensiv.</li>
            <li><strong>Monatlicher Test:</strong> Am 1. des Monats testst du einen Duft neu, den du lange nicht getragen hast.</li>
            <li><strong>Saison-Wechsel:</strong> Wenn die Jahreszeit wechselt, packst du „alte" Düfte weg und holst neue Sätze raus.</li>
          </ul>

          <h2>FAQ: Duftsammlung aufbauen</h2>

          <div style={{
            display: 'grid',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            {[
              {
                frage: 'Mit wie vielen Düften sollte ich anfangen?',
                antwort: 'Mit 1. Finde deinen Lieblingduft. Wenn du ihn 3+ Monate liebst, kaufe einen für den Kontrast (z. B. wenn er warm ist, kaufe einen kühlen). 3 ist die ideale Zahl für den Anfang.'
              },
              {
                frage: 'Ist eine Sammlung mit 20+ Düften sinnvoll?',
                antwort: 'Ja – wenn du sie alle wirklich trägst. Nein – wenn du sie sammelt wie Briefmarken. Eine große Sammlung braucht ein System und Discipline. Überleg zuerst: Trage ich wirklich 20 verschiedene Düfte?'
              },
              {
                frage: 'Sollte ich die gleichen Düfte in verschiedenen Konzentrationen kaufen?',
                antwort: 'Ja. Wenn du einen Duft liebst, kauf ihn in EdP (Abend, Wochenende) UND EdT (Arbeit, Sport). Du wirst beide tragen.'
              },
              {
                frage: 'Wie lange hält ein Duft im Schrank?',
                antwort: 'Bei richtiger Lagerung (kühl, dunkel, vertikal): 3–5 Jahre. Mit OK-Lagerung: 1–2 Jahre. Im heißen Badezimmer: 6 Monate. Lagere richtig und deine Sammlung hält lange.'
              },
              {
                frage: 'Sollte ich teure oder günstige Düfte kaufen?',
                antwort: 'Mix. Teuer = besondere Düfte, die du liebst. Günstig = Experimentieren und Alltagsträger. Teste günstig, bevor du teuer kaufst.'
              },
              {
                frage: 'Was ist der beste erste Kauf für eine neue Sammlung?',
                antwort: 'Ein Duft, den du SEHR magst (schon getestet) + einen, der komplett anders ist (um Vielfalt zu lernen) + einen günstigen Klon eines teuren Duftes (zum Testen). So lernst du deine Vorlieben schnell.'
              }
            ].map((qa, i) => (
              <div key={i}>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '0.95rem' }}>{qa.frage}</h4>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#5b4d40', lineHeight: 1.6 }}>{qa.antwort}</p>
              </div>
            ))}
          </div>

          <div style={{
            background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.04))',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '2rem',
            marginTop: '2rem'
          }}>
            <p style={{ margin: '0 0 0.75rem 0', color: '#2a1d12', fontWeight: 600 }}>
              🎯 <strong>Die perfekte Sammlung für dich</strong>
            </p>
            <p style={{ margin: 0, color: '#6b5344', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Es gibt keine universelle Antwort: Die richtige Sammlung ist die, die DU wirklich trägst. Drei großartige Düfte
              sind besser als zehn mittelmäßige. Beginne mit einem Lieblingduft, baue dann systematisch auf (Jahreszeiten,
              Anlässe, Duftfamilien), und bewahre deine Sammlung richtig auf. Eine gut gepflegte Sammlung wird dir
              Jahre lang Freude bereiten.
            </p>
          </div>

          <div style={{
            background: '#f0e6d2',
            borderLeft: '4px solid #d4af37',
            padding: '1.5rem',
            borderRadius: '0 8px 8px 0',
            marginBottom: '2rem'
          }}>
            <p style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', fontWeight: 600, color: '#2a1d12' }}>
              💌 Nächster Schritt: Baue deine persönliche Sammlung auf
            </p>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#5b4d40' }}>
              Du weißt jetzt, wie eine gute Sammlung aussieht. Brauchst du Hilfe bei der Auswahl? Nutze <Link href="/quiz" style={{ color: '#d4af37', fontWeight: 600, textDecoration: 'none' }}>das Auressa-Quiz</Link> –
              es hilft dir, Düfte zu finden, die zusammenpassen und auf deiner Körperchemie funktionieren.
              Oder <Link href="/dueft-waehlen" style={{ color: '#d4af37', fontWeight: 600, textDecoration: 'none' }}>lese unseren Duft-Wählen-Guide</Link> für einen systematischen Ansatz zum perfekten Duft.
            </p>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(212,175,55,0.2)', margin: '3rem 0' }} />

          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ marginTop: 0 }}>Ratgeber zum Thema: Duftsammlung & Auswahl</h3>
            <ul style={{ fontSize: '0.95rem', lineHeight: 1.8 }}>
              <li><Link href="/duft-waehlen" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Duft wählen – Anleitung</Link> – Systematischer Leitfaden zum Finden des perfekten Duftes</li>
              <li><Link href="/duftarten" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Duftarten erklärt</Link> – EdP, EdT, Cologne: Welche Konzentration für welche Sammlung</li>
              <li><Link href="/koerperchemie-duft" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Körperchemie & Duft</Link> – Warum Düfte auf verschiedenen Menschen unterschiedlich riechen</li>
              <li><Link href="/duftnoten-guide" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Duftnoten verstehen</Link> – Die Noten-Pyramide und wie Düfte sich entwickeln</li>
              <li><Link href="/duft-lagerung" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Duft-Lagerung</Link> – Wie du deine Sammlung richtig pflegst und lagert</li>
              <li><Link href="/duefte-kombinieren" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Duftkombinationen</Link> – Wie du Düfte kombinierst für noch mehr Möglichkeiten</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
