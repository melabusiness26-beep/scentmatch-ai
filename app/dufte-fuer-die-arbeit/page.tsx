import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/app/Breadcrumb';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export const metadata: Metadata = {
  title: 'Düfte für die Arbeit: Der perfekte Office-Duft',
  description:
    'Finde den richtigen Duft für deine Arbeit – ob elegant, unauffällig oder fokussiert. Mit konkreten Empfehlungen für jeden Büro-Typ.',
  alternates: { canonical: '/dufte-fuer-die-arbeit' },
  openGraph: {
    title: 'Düfte für die Arbeit | Auressa',
    description:
      'Der perfekte Office-Duft: unauffällig, professionell, fokussierend – ohne deine Kolleg:innen zu stören.',
    type: 'website',
    url: `${SITE_URL}/dufte-fuer-die-arbeit`
  }
};

export default function DuefteFuerDieArbeitPage() {
  return (
    <main>
      <Breadcrumb items={[{ label: 'Düfte für die Arbeit', href: '/dufte-fuer-die-arbeit' }]} />
      <div className="container">
        <section className="section">
          <p className="eyebrow">Wissen</p>
          <h1 className="detail-title">Düfte für die Arbeit</h1>
          <p className="lead">
            Der Duft, der am Wochenende perfekt ist – zu Hause oder auf der Party – kann im Büro problematisch werden.
            Im engen Raum mit Kolleg:innen ist ein zu schwerer, zu starker oder zu süßer Duft nicht nur aufdringlich,
            sondern kann auch Kopfschmerzen verursachen.
          </p>
          <p className="lead">
            Ein guter Office-Duft ist da, aber nicht laut. Er gibt dir Selbstsicherheit ohne deine Umgebung zu überlasten.
            Dieser Guide hilft dir, den perfekten Arbeitsduft zu finden – je nachdem, ob dein Büro konservativ, kreativ oder casual ist.
          </p>

          <h2>Was macht einen guten Office-Duft aus?</h2>

          <div style={{
            background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.04))',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '2rem'
          }}>
            <ol style={{ marginBottom: 0 }}>
              <li style={{ marginBottom: '1rem' }}>
                <strong>Unauffällig:</strong> Deine Kolleg:innen sollten den Duft riechen, wenn sie dir nahe sind,
                aber nicht, wenn du den Raum verlässt. Nicht mehr als 2–3 Meter Radius.
              </li>
              <li style={{ marginBottom: '1rem' }}>
                <strong>Sauber & frisch:</strong> Schwere, würzige oder sehr süße Düfte wirken im Büro schnell überwältigend.
                Frische, helle, neutrale Düfte wirken professionell.
              </li>
              <li style={{ marginBottom: '1rem' }}>
                <strong>Konzentriert, nicht kopflastig:</strong> Der Duft sollte dich unterstützen, nicht ablenken oder Kopfschmerzen verursachen.
                Nach 30 Min sollte es sich „normal" für dich anfühlen.
              </li>
              <li style={{ marginBottom: '1rem' }}>
                <strong>Langlebig (aber nicht zu lange):</strong> 4–6 Stunden ist ideal. Nicht 10+ Stunden – danach riechst du falsch.
              </li>
              <li>
                <strong>Universell akzeptiert:</strong> Ein Duft, dem 90% der Menschen positive bis neutrale Reaktion haben.
                Nicht zu provokativ oder nischig.
              </li>
            </ol>
          </div>

          <h2>3 Office-Typen – Welcher passt zu dir?</h2>

          <div style={{
            display: 'grid',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {[
              {
                typ: 'Konservatives / Formales Büro',
                beschreibung: 'Banken, Anwaltskanzleien, klassische Unternehmen – eher formell, konservativ, etabliert.',
                ideal: 'Klassische, zeitlose, unaufdringliche Düfte. Eleganz zählt, nicht Innovation.',
                beispiele: 'Chanel No. 5, Dior J\'adore, Bleu de Chanel, Hermès eau de Gentiane Blanche',
                intensitaet: 'EdT oder sehr sparsam EdP (1–2 Sprüher)',
                noten: 'Citrus, leichte Floral, grüne Noten, klassische Holzer',
                vermeiden: 'Sehr süß, sehr würzig, sehr modern (Nischemarken), Gourmand'
              },
              {
                typ: 'Kreatives / Modernes Büro',
                beschreibung: 'Agenturen, Tech-Firmen, Startups, Design-Studios – eher innovativ, locker, modern.',
                ideal: 'Moderncere, charaktervolle Düfte sind ok. Etwas mehr Persönlichkeit ist willkommen.',
                beispiele: 'Diptyque L\'Eau Rose, Byredo Gypsy Floral, Heeley Sel Marin, Maison Francis Kurkdjian A la Rose',
                intensitaet: 'EdT oder moderate EdP (2–3 Sprüher)',
                noten: 'Frische Blüten, grüne Noten, würzig-floral, marine Noten',
                vermeiden: 'Sehr schwere Orientalisch, sehr Nischig (die Kollegen kennen die Marke nicht), sehr süß'
              },
              {
                typ: 'Casual / Remote-Büro',
                beschreibung: 'Startups, flexible Arbeitsplätze, Home Office, Hybrid – eher unkompliziert, persönlich, locker.',
                ideal: 'Fast alles geht, solange du dich selbst wohlfühlst. Persönlichkeit schlägt Konvention.',
                beispiele: 'Jedes Duft, das dir gefällt – auch etwas Nischigeres. Jo Malone, Maison Martin Margiela, Budget-Klone',
                intensitaet: 'EdT oder EdP nach Vorliebe',
                noten: 'Alles möglich – Citrus, Blüte, würzig, Gourmand, sogar Oud',
                vermeiden: 'Eigentlich nichts – dein Büro ist dein Raum'
              }
            ].map((item, i) => (
              <div key={i} style={{
                background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.04))',
                border: '1px solid rgba(212,175,55,0.15)',
                borderRadius: '8px',
                padding: '1.5rem'
              }}>
                <h3 style={{ margin: '0 0 0.75rem 0', fontSize: '0.95rem' }}>{item.typ}</h3>
                <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.9rem', color: '#6b5344' }}>
                  <strong>Umgebung:</strong> {item.beschreibung}
                </p>
                <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#5b4d40' }}>
                  <strong>Ideal:</strong> {item.ideal}
                </p>
                <p style={{ margin: '0 0 0.5rem 0', fontSize: '0.9rem', color: '#5b4d40' }}>
                  <strong>Beispiele:</strong> {item.beispiele}
                </p>
                <div style={{ fontSize: '0.85rem', color: '#6b5344', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid rgba(212,175,55,0.1)' }}>
                  <p style={{ margin: '0.5rem 0' }}><strong>EdT/EdP:</strong> {item.intensitaet}</p>
                  <p style={{ margin: '0.5rem 0' }}><strong>✅ Noten-Typ:</strong> {item.noten}</p>
                  <p style={{ margin: '0.5rem 0 0 0' }}><strong>❌ Vermeiden:</strong> {item.vermeiden}</p>
                </div>
              </div>
            ))}
          </div>

          <h2>5 Kategorien von Office-Düften</h2>

          <h3>1. Der Klassiker – Timeless & Safe</h3>
          <p style={{ marginBottom: '1rem' }}>
            Der „Keine-Fehler-Duft". Jede:r Kolleg:in kennt ihn, akzeptiert ihn. Langweiling? Ja. Effektiv? Absolut.
          </p>
          <ul style={{ marginBottom: '2rem' }}>
            <li><strong>Chanel No. 5</strong> – DER Klassiker. Über 100 Jahre, jede:r kennt ihn. Für formale Büros perfekt.</li>
            <li><strong>Dior J'adore</strong> – Modern-klassisch, zeitlos floral, nicht schwer. Super sicher.</li>
            <li><strong>Bleu de Chanel</strong> – Männer-Klassiker, aber jeder trägt ihn. Universell, unauffällig, zuverlässig.</li>
          </ul>

          <h3>2. Der Subtile – Frisch & Zurückhaltend</h3>
          <p style={{ marginBottom: '1rem' }}>
            Düfte, die kaum auffallen, aber dir jeden Tag gut tun. Wie eine „Stille Präsenz".
          </p>
          <ul style={{ marginBottom: '2rem' }}>
            <li><strong>Hermès Eau de Gentiane Blanche</strong> – Frisch, würzig, leicht bitter. Sehr professionell, bemerkt fast niemand.</li>
            <li><strong>L'Artisan Parfumeur Nuit de Tubérose</strong> – Blumig, aber leicht. Elegant, ohne aufdringlich zu sein.</li>
            <li><strong>Jo Malone Wood Sage & Sea Salt</strong> – Minimal, frisch, ätherisch. Perfekt für sensible Büros.</li>
          </ul>

          <h3>3. Der Fokus-Duft – Konzentrierend & Energisierend</h3>
          <p style={{ marginBottom: '1rem' }}>
            Düfte mit Noten, die Konzentration steigern. Zitrus, Minze, grüne Noten wirken mental belebend.
          </p>
          <ul style={{ marginBottom: '2rem' }}>
            <li><strong>Neroli & Petrichor</strong> – Zitrus mit Erde-Noten. Weckt dich auf, hält dich wach.</li>
            <li><strong>Diptyque Eau Rose</strong> – Leicht & frisch mit Minz-Touch. Belebend ohne aufdringlich.</li>
            <li><strong>Acqua di Parma Blu Mediterraneo Mandarin</strong> – Zitrus pur, energisierend, arbeitsgerecht.</li>
          </ul>

          <h3>4. Der Vertrauens-Duft – Sicherheit & Selbstbewusstsein</h3>
          <p style={{ marginBottom: '1rem' }}>
            Düfte, die dir Selbstsicherheit geben, ohne laut zu sein. Eleganz mit Charakter.
          </p>
          <ul style={{ marginBottom: '2rem' }}>
            <li><strong>Estée Lauder Beautiful</strong> – Klassisch, elegant, warm. Du riechst „ready" ohne zu schreien.</li>
            <li><strong>Maison Francis Kurkdjian À la rose</strong> – Raffiniert, klassisch, mit Gewicht. Macht dich selbstsicher.</li>
            <li><strong>Creed Aventus</strong> – Modern-elegant, selbstsicher. Ein bisschen laut, aber recht akzeptiert.</li>
          </ul>

          <h3>5. Der Unscheinbare – für sensible Büros</h3>
          <p style={{ marginBottom: '1rem' }}>
            Düfte so leicht, dass Kolleg:innen sie kaum bemerken. Für sehr dicht besiedelte oder sensible Büros.
          </p>
          <ul style={{ marginBottom: '2rem' }}>
            <li><strong>Diptyque Do Son Light</strong> – Wie No. 5, aber halb so stark. Eleganz mit Unsichtbarkeit.</li>
            <li><strong>L'Occitane Eau de Lavande</strong> – Lavendel, beruhigend, subtil. Auch sensible Kolleg:innen mögen es.</li>
            <li><strong>Un Jardin sur le Toit (Hermès)</strong> – Grünlich, leicht, alles ruhig.</li>
          </ul>

          <h2>Praktische Tipps für Office-Düfte</h2>

          <div style={{
            background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.04))',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '2rem'
          }}>
            <ol style={{ marginBottom: 0 }}>
              <li style={{ marginBottom: '1rem' }}>
                <strong>1–2 Sprüher, nicht 3–4.</strong> Im Büro ist weniger mehr. Dein Körper ist nah bei Kolleg:innen.
                Wenn du dich selbst kaum riechst, ist es wahrscheinlich richtig dosiert.
              </li>
              <li style={{ marginBottom: '1rem' }}>
                <strong>EdT, nicht EdP.</strong> EdT hält 4–6 Stunden, EdP 8+. Im Büro ist 4–6 Stunden perfekt – es verfliegt vor Feierabend.
                EdP ist zu lang & zu intensiv für enge Räume.
              </li>
              <li style={{ marginBottom: '1rem' }}>
                <strong>Auf Kleidung, nicht auf nackte Haut.</strong> Spray auf die Innenseite des Hemdes oder der Bluse.
                Das gibt dir einen angenehmeren, langsameren Release des Duftes.
              </li>
              <li style={{ marginBottom: '1rem' }}>
                <strong>Morgens kurz nach dem Duschen auftragen.</strong> Nach 30 Minuten riechst du „normal" & die Intensität ist perfekt für den Tag.
              </li>
              <li style={{ marginBottom: '1rem' }}>
                <strong>Teste zuerst einen Tag:</strong> Bevor du einen Büro-Duft kaufst, teste ihn einen kompletten Arbeitstag.
                Frag deine Kolleg:innen, ob der Duft ok ist. Ihre Antwort ist deine Realität.
              </li>
              <li style={{ marginBottom: '1rem' }}>
                <strong>Habe einen dezenten Duft als Reserve:</strong> etwas sehr Leichtes oder ein unparfümiertes Deo – für Tage, an denen du nicht sicher bist.
                Besser subtil als ein Fehler.
              </li>
              <li>
                <strong>Wechsel gelegentlich:</strong> Alle 2–3 Wochen einen anderen Duft probieren. Kolleg:innen bemerken Vielfalt & es hält deine Routine interessant.
              </li>
            </ol>
          </div>

          <h2>5 Fehler beim Duft-Tragen im Büro</h2>

          <div style={{
            display: 'grid',
            gap: '1.2rem',
            marginBottom: '2rem'
          }}>
            {[
              {
                fehler: 'Zu viel Duft auftragen (3+ Sprüher)',
                warum: 'Im kleinen Büro wird das schnell erdrückend. Deine Kolleg:innen fahren Kopfschmerzen. Reputationsschaden.',
                lösung: 'Max 1–2 Sprüher. Teste mit einer Kollegin: „Ist das ok?" Die Antwort ist dein Maßstab.'
              },
              {
                fehler: 'EdP statt EdT tragen',
                warum: 'EdP hält 8–10+ Stunden. Nach 6 Stunden Büro riechst du falsch & intensiv. Das ist unangenehm.',
                lösung: 'Nutz EdT (4–6 Stunden). Perfect für Büro. Der Duft verfliegt bis Feierabend.'
              },
              {
                fehler: 'Sehr süße oder sehr würzige Düfte tragen',
                warum: 'Gourmand (Vanille, Karamell) & starke Orientalisch wirken im Büro schnell überwältigend & ablenkend.',
                lösung: 'Wähle frische, saubere Düfte. Zitrus, grüne Noten, leichte Blüte. Bewährt im Büro.'
              },
              {
                fehler: 'Den gleichen Duft jeden Tag tragen',
                warum: 'Nach 2 Wochen „sieht" deine Nase ihn nicht mehr & setzt auf mehr Menge. Deine Kolleg:innen bemerken aber immer noch die Zunahme.',
                lösung: 'Habe 2–3 Office-Düfte & wechsele alle 2–3 Tage. Das hält alles interessant & balanced.'
              },
              {
                fehler: 'Auf das Feedback von Kolleg:innen nicht hören',
                warum: 'Wenn eine Kollegin sagt „Der Duft ist zu viel", ist er zu viel. Punkt. Auch wenn dir er selbst ok vorkommt.',
                lösung: 'Vertrau dem Feedback. Dein Büro ist dein Ecosystem. Ihre Komfortzone ist wichtiger als deine Lieblingsorientale.'
              }
            ].map((item, i) => (
              <div key={i} style={{
                background: 'linear-gradient(135deg, rgba(212,175,55,0.05), rgba(212,175,55,0.02))',
                border: '1px solid rgba(212,175,55,0.1)',
                borderRadius: '8px',
                padding: '1.25rem'
              }}>
                <p style={{ margin: '0 0 0.5rem 0', fontWeight: 600, fontSize: '0.95rem' }}>
                  ❌ {item.fehler}
                </p>
                <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.9rem', color: '#6b5344' }}>
                  <strong>Warum problematisch:</strong> {item.warum}
                </p>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#5b4d40' }}>
                  <strong>✅ Lösung:</strong> {item.lösung}
                </p>
              </div>
            ))}
          </div>

          <h2>FAQ: Office-Düfte</h2>

          <div style={{
            display: 'grid',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            {[
              {
                frage: 'Ist Duft im Büro eine gute Idee oder unhöflich?',
                antwort: 'Es ist höflich, wenn es subtil ist. Ein leichter, angenehmer Duft wirkt elegant & professionell. Ein zu starker ist unhöflich. Die Grenze ist sehr dünn – teste mit Kolleg:innen.'
              },
              {
                frage: 'Was ist, wenn mein Büro sehr klein oder open-office ist?',
                antwort: 'Noch subtiler. Open Office = sehr eng. EdT, max 1 Sprüher, nur auf Kleidung. Dein Duft sollte nur 1–2 Meter Radius haben, nicht weiter.'
              },
              {
                frage: 'Was, wenn Kolleg:innen allergisch auf Düfte reagieren?',
                antwort: 'Dann lieber gar kein Duft – oder höchstens ein unparfümiertes Deo. Die Gesundheit deiner Kolleg:innen geht vor deinem Lieblingsduft.'
              },
              {
                frage: 'Kann ich im Homeoffice jeden Duft tragen?',
                antwort: 'Ja! Dein Zuhause, deine Regeln. Aber wenn du hybrid arbeitest & manchmal ins Büro kommst – achte trotzdem auf deine Office-Düfte dort.'
              },
              {
                frage: 'Sollte ich einen unterschiedlichen Duft für Büro und Wochenende haben?',
                antwort: 'Nicht nötig. Aber es hilft: ein subtiler Office-Duft & ein intensiverer Party-Duft. So trennst du „professionell" von „Persönlichkeit".'
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
              🎯 <strong>Zusammenfassung: Der perfekte Office-Duft</strong>
            </p>
            <p style={{ margin: 0, color: '#6b5344', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Der beste Office-Duft ist einer, den du magst, der aber subtil ist. EdT-Versionen, 1–2 Sprüher, frisch & sauber,
              4–6 Stunden Haltbarkeit. Kenne dein Büro (formal, kreativ oder casual) und wähle danach. Ein klassischer Duft
              funktioniert überall. Wenn du mutiger sein willst, teste zuerst mit einer Kollegin. Respekt vor der Umgebung ist wichtiger als dein Lieblingduft.
              Ein leichter, durchdachter Duft gibt dir Selbstsicherheit und signalisiert Professionalism.
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
              💼 Finde deinen perfekten Office-Duft
            </p>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#5b4d40' }}>
              Du kennst jetzt, welche Düfte im Büro funktionieren. Nutze <Link href="/quiz" style={{ color: '#d4af37', fontWeight: 600, textDecoration: 'none' }}>das Auressa-Quiz</Link> und
              filtering nach „Arbeit/Office" um die perfekten Büro-Düfte für deinen Stil zu finden. Oder durchsuche <Link href="/duefte" style={{ color: '#d4af37', fontWeight: 600, textDecoration: 'none' }}>unseren Katalog</Link> nach
              freshen, subtilen Düften in EdT-Konzentrationen.
            </p>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(212,175,55,0.2)', margin: '3rem 0' }} />

          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ marginTop: 0 }}>Weitere Ratgeber zum Thema Duft & Anlässe</h3>
            <ul style={{ fontSize: '0.95rem', lineHeight: 1.8 }}>
              <li><Link href="/duft-waehlen" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Duft wählen – Anleitung</Link> – Schritt-für-Schritt zum perfekten Duft für jede Situation</li>
              <li><Link href="/duft-geschenk" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Duft als Geschenk</Link> – Düfte für verschiedene Anlässe und Menschen</li>
              <li><Link href="/duftarten" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Duftarten erklärt</Link> – EdT, EdP, Cologne: Was für welche Situation</li>
              <li><Link href="/parfum-auftragen" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Parfum richtig auftragen</Link> – Goldene Regeln für Dosierung & Anwendung</li>
              <li><Link href="/duefte-kombinieren" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Duftkombinationen</Link> – Layering-Strategien für unterschiedliche Momente</li>
              <li><Link href="/koerperchemie-duft" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Körperchemie & Duft</Link> – Warum Düfte auf verschiedenen Menschen unterschiedlich wirken</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
