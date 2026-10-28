import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/app/Breadcrumb';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export const metadata: Metadata = {
  title: 'Düfte für deine Hauttyp: Perfekte Parfüme je nach Haut',
  description:
    'Finde die perfekten Düfte für deine Haut – Tipps für trockene, normale, ölige und sensible Hauttypen. Mit Duft-Empfehlungen für jede Haut.',
  alternates: { canonical: '/dufte-nach-hauttyp' },
  openGraph: {
    title: 'Düfte für deinen Hauttyp | Auressa',
    description:
      'Die richtige Duft-Auswahl für trockene, normale, ölige und sensible Haut – damit der Duft auf dir perfekt wirkt.',
    type: 'website',
    url: `${SITE_URL}/dufte-nach-hauttyp`
  }
};

export default function DufteNachHauttypPage() {
  return (
    <main>
      <Breadcrumb items={[{ label: 'Düfte nach Hauttyp', href: '/dufte-nach-hauttyp' }]} />
      <div className="container">
        <section className="section">
          <p className="eyebrow">Wissen</p>
          <h1 className="detail-title">Düfte für deinen Hauttyp</h1>
          <p className="lead">
            Ein Duft, der auf deiner Freundin wunderbar hält, verfliegt bei dir nach 2 Stunden. Oder er wird auf dir
            wahnsinnig intensiv, während er auf ihr normal wirkt. Das liegt an deinem Hauttyp.
          </p>
          <p className="lead">
            Deine Hautstruktur bestimmt, wie Duftstoffe auf dir haften, wie schnell sie verdunsten und wie intensiv sie wirken.
            Mit den richtigen Düften für deinen Hauttyp, bekommst du die beste Performance und die längste Haltbarkeit.
          </p>

          <h2>Wie dein Hauttyp die Duftentwicklung beeinflusst</h2>

          <div style={{
            background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.04))',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '2rem'
          }}>
            <p style={{ margin: '0 0 1rem 0', color: '#2a1d12', fontWeight: 600 }}>
              Schnelle Übersicht: Dein Hauttyp & ideale Duftstrategie
            </p>
            <div style={{ fontSize: '0.85rem', color: '#5b4d40', lineHeight: 1.8 }}>
              <p><strong>🌵 Trockene Haut:</strong> Düfte halten kürzer, wirken intensiv. → Wähle stärkere Konzentrationen (EdP), schwere & cremige Düfte.</p>
              <p><strong>😊 Normale Haut:</strong> Düfte wirken ausgewogen. → Alle Duftarten funktionieren gut. Du hast die grösste Auswahl.</p>
              <p><strong>💧 Ölige Haut:</strong> Düfte halten länger, wirken sehr intensiv. → Wähle leichte Konzentrationen (EdT), frische & zitronige Düfte.</p>
              <p><strong>🪶 Sensible Haut:</strong> Düfte können reizend wirken. → Nutze leichte EdT, teste zuerst, vermeide sehr starke Konzentrationen.</p>
            </div>
          </div>

          <h2>Detailguide: Düfte für jeden Hauttyp</h2>

          <h3>1. Trockene Haut: Schwere, cremige Düfte</h3>

          <p>
            Trockene Haut hat weniger Öl, daher verdunsten Duftstoffe schneller. Der Duft wird auf dir intensiver, aber nicht länger.
          </p>

          <h4>Was funktioniert gut:</h4>
          <ul style={{ marginBottom: '1.5rem' }}>
            <li><strong>Schwere, cremige Düfte</strong> – Orientalisch, Vanille, Bernstein, Moschus. Sie haften besser auf trockener Haut.</li>
            <li><strong>EdP-Versionen (Eau de Parfum)</strong> – 15–20% Duftkomplex statt EdT (5–15%). Das Extra an Öl bleibt länger auf deiner Haut.</li>
            <li><strong>Düfte mit Öl-basierten Basisnoten</strong> – Sandelholz, Vetiver, Moschus haften besser als Zitrusnoten.</li>
            <li><strong>Düfte mit starker Haltbarkeit</strong> (8+ Stunden) – bei dir werden 6–8 Stunden draus, aber immer noch gut.</li>
          </ul>

          <h4>Was du vermeiden solltest:</h4>
          <ul style={{ marginBottom: '1.5rem' }}>
            <li><strong>Leichte Zitrus-Düfte</strong> – Sie verfliegen in 2–3 Stunden, ohne dass die Basisnoten kommen.</li>
            <li><strong>EdC & EdT auf trockener Haut</strong> – Die schwächere Konzentration wird bei dir null.</li>
            <li><strong>Sehr frische, grüne Düfte</strong> – Die oberen Noten sind dein ganzes Erlebnis, dann nichts mehr.</li>
          </ul>

          <h4>💡 Pro-Tipps für trockene Haut:</h4>
          <ul style={{ marginBottom: '1.5rem' }}>
            <li><strong>Feuchte deine Haut vor dem Auftragen:</strong> Wende eine leichte Feuchtigkeitscreme an, bevor du Duft sprühst. Das gibt dem Duft mehr „Grip".</li>
            <li><strong>Duft auf Haare sprühen:</strong> Haare halten Düfte länger als Haut. Ideal für deine Trockenhaut.</li>
            <li><strong>Duft auf Kleidung:</strong> Auch Stoff hält länger als deine Haut. Spray auf die Innenseite des Ärmels.</li>
            <li><strong>Kauf grosse Flakons:</strong> Du brauchst mehrere Sprüher statt einen. Mit 2–3 Sprühern werden auch leichte Düfte auf dir ok.</li>
          </ul>

          <h3>2. Normale Haut: Alles funktioniert</h3>

          <p>
            Du hast Glück – normale Haut ist wie „Universalplattform". Düfte wirken, wie sie gedacht sind. Du kannst experimentieren.
          </p>

          <h4>Was funktioniert:</h4>
          <ul style={{ marginBottom: '1.5rem' }}>
            <li>Alle Duftfamilien – Frisch, Blüten, Würzig, Holzig, Orientalisch. Alles geht.</li>
            <li>Alle Konzentrationen – EdP, EdT, sogar EdC funktioniert anständig.</li>
            <li>Alle Stärken – Light bis Very Strong. Deine Haut mildert extremes aus.</li>
          </ul>

          <h4>Deine Superkraft:</h4>
          <p style={{ marginBottom: '1.5rem' }}>
            Du kannst günstig experimentieren. Kaufe diverse Samples, teste alles, und finde deinen Favoriten ohne
            Kompromisse. Normale Haut verzeiht Fehlkäufe – bei dir wird jeder Duft ganz anständig wirken.
          </p>

          <h4>💡 Pro-Tipps für normale Haut:</h4>
          <ul style={{ marginBottom: '1.5rem' }}>
            <li><strong>Nutze deine Flexibilität:</strong> Teste auch Düfte, die sich riskant anhören. Bei normaler Haut funktionieren sie vielleicht grossartig.</li>
            <li><strong>Experimentiere mit Konzentrationen:</strong> Kaufe den gleichen Duft in EdP UND EdT. Nutze beide je nach Situation.</li>
            <li><strong>Profitiere von Aktionen:</strong> Wenn ein Duft im Angebot ist und dich reizt, probiere ihn – deine Haut zeigt ihn so, wie er wirklich ist.</li>
          </ul>

          <h3>3. Ölige Haut: Leichte, frische Düfte</h3>

          <p>
            Ölige Haut speichert Duftstoffe länger. Düfte wirken intensiver und halten 8+ Stunden – oft zu lange.
            Das ist ein Segen und eine Herausforderung zugleich.
          </p>

          <h4>Was funktioniert gut:</h4>
          <ul style={{ marginBottom: '1.5rem' }}>
            <li><strong>Leichte Konzentrationen (EdT, EdC)</strong> – Weniger ist mehr bei dir. EdT wird auf ölige Haut wie EdP wirken.</li>
            <li><strong>Frische Zitrus-Düfte</strong> – Bergamotte, Zitrone, Orange, Grapefruit. Sie wirken ausgewogen und nicht kopflastig.</li>
            <li><strong>Grüne, marine, kühle Düfte</strong> – Rasenduft, Ozean, Minze – Sie sind perfekt für ölige Haut.</li>
            <li><strong>Düfte mit kürzerer Haltbarkeit</strong> (4–6 Stunden) – Bei dir werden das 6–8, was perfekt ist.</li>
            <li><strong>Sehr blumig & frisch</strong> – Weisse Blüten, Wildrose – Sie werden intensiver, aber nicht schwer.</li>
          </ul>

          <h4>Was du vermeiden solltest:</h4>
          <ul style={{ marginBottom: '1.5rem' }}>
            <li><strong>Schwere Orientalisch-Düfte</strong> – Sie werden auf dir überwältigend nach 4 Stunden.</li>
            <li><strong>Sehr süsse Gourmand-Düfte</strong> – Vanille, Karamell, Schokolade werden zu intensiv & klebrig.</li>
            <li><strong>Sehr starke Konzentrationen (EdP+)</strong> – Es sei denn, du magst wirklich kopflastige Düfte.</li>
          </ul>

          <h4>💡 Pro-Tipps für ölige Haut:</h4>
          <ul style={{ marginBottom: '1.5rem' }}>
            <li><strong>Nutze deine Superkraft – Haltbarkeit:</strong> Bei dir halten 4-Stunden-Düfte den ganzen Tag. Auch günstige Düfte wirken bei dir hochwertig.</li>
            <li><strong>Experimentiere mit EdT/EdC:</strong> Das sind deine Freunde. EdT auf ölige Haut = EdP auf normaler Haut. Spare 50% ohne Qualitätsverlust.</li>
            <li><strong>Weniger ist mehr:</strong> Du brauchst weniger Sprüher. 1–2 Sprüher auf ölige Haut = 3–4 auf normaler Haut.</li>
            <li><strong>Probiere Unisex & male Düfte:</strong> Sie sind oft frischer, zitroniger, würziger. Bei ölige Haut sind die grossartig.</li>
          </ul>

          <h3>4. Sensible Haut: Vorsicht, richtige Auswahl</h3>

          <p>
            Sensible Haut reagiert auf Parfumöle, Konservierungsstoffe oder Alkohol mit Rötung, Juckreiz oder Reizung.
            Das bedeutet nicht, dass du keinen Duft tragen kannst – nur dass du wählerisch sein musst.
          </p>

          <h4>Was funktioniert:</h4>
          <ul style={{ marginBottom: '1.5rem' }}>
            <li><strong>Leichte EdT & EdC</strong> – Weniger Duftkomplex = weniger Chemikalien = weniger Reizung.</li>
            <li><strong>Hypoallergene & naturbasierte Düfte</strong> – Marken wie Osm, Farfalla, oder zertifizierte Bio-Düfte.</li>
            <li><strong>Frische, helle Düfte</strong> – Zitrus, grüne Noten, hell floral. Weniger reizend als dunkle, würzige Düfte.</li>
            <li><strong>Bekannte, etablierte Düfte</strong> – Je älter & bekannter (Chanel, Dior), desto besser getestet & weniger wahrscheinlich Reizungen.</li>
          </ul>

          <h4>Was du vermeiden solltest:</h4>
          <ul style={{ marginBottom: '1.5rem' }}>
            <li><strong>Sehr starke Konzentrationen</strong> – EdP & Eau de Parfum haben höhere Öl-Konzentration = höheres Reizungsrisiko.</li>
            <li><strong>Neue, ungetestete Nischemarken</strong> – Dein Risiko ist höher. Stick zu Klassikern, die Millionen Menschen tragen.</li>
            <li><strong>Düfte mit bekannten Reiz-Noten</strong> – Zimmetaldehyde, Moschus-Synthesen, Oakmoss können reizen.</li>
            <li><strong>Spray auf direkter Haut</strong> – Spray auf Kleidung oder Haare statt Haut, um Kontakt zu minimieren.</li>
          </ul>

          <h4>💡 Pro-Tipps für sensible Haut:</h4>
          <ul style={{ marginBottom: '1.5rem' }}>
            <li><strong>Immer testen:</strong> Teste 2–3 Tage, bevor du kaufst. Sensible Haut hat verzögerte Reaktionen manchmal.</li>
            <li><strong>Trage Duft auf Kleidung, nicht auf Haut:</strong> Das minimiert Kontakt und damit Reizungsrisiko.</li>
            <li><strong>Finde deine persönlichen Trigger-Noten:</strong> Manche sensible Haut mag keine Musks, andere haben kein Problem. Merke dir, was dich reizt.</li>
            <li><strong>Nutze Duftöle statt Spray:</strong> Duftöle haben weniger Alkohol, daher weniger trocknend und reizend. Verdünne in Trägeröl (Jojoba, Kokosnuss).</li>
          </ul>

          <h2>Spezielle Herausforderungen & Lösungen</h2>

          <div style={{
            display: 'grid',
            gap: '1.2rem',
            marginBottom: '2rem'
          }}>
            {[
              {
                problem: 'Ich habe Akne / sehr gereizte Haut',
                lösung: 'Vermeide EdP, nutze nur EdC/EdT auf Kleidung. Oder: Duftöle verdünnt in Trägeröl. Spray kann Alkohol-bedingt austrocknend wirken. Behandle deine Haut zuerst – wenn die beruhigt ist, verträgst du mehr.'
              },
              {
                problem: 'Ich habe Ekzeme oder Dermatitis',
                lösung: 'Sprich mit deinem Dermatologen. Manche Menschen mit Ekzemen reagieren auf Duftstoffe gar nicht, andere auf fast alles. Teste nur auf gesunder Haut, nicht auf Ekzem-Stellen. Hypoallergene Düfte sind deine Chance.'
              },
              {
                problem: 'Meine Haut ist tagsüber ölig, abends trocken',
                lösung: 'Du hast kombinierte Haut. Nutze morgens leichte EdT (für ölige Phase), abends schwerere EdP (für trockene Phase). Oder: ein Duft, der moderat wirkt.'
              },
              {
                problem: 'Ich bin schwanger oder hormonell verändert',
                lösung: 'Deine Vorlieben ändern sich – das ist normal. Düfte, die dir früher gefallen, können auf einmal übel wirken. Nutze leichte EdT statt EdP. Nach dem Hormonumbruch normalisiert es sich wieder.'
              },
              {
                problem: 'Ich bin in den Wechseljahren & meine Haut ist sehr trocken',
                lösung: 'Deine Haut wird trockener & deine Thermoregulation verändert sich. Nutze schwere, öl-basierte Düfte (EdP), aber teste auf Verträglichkeit. Die trockene Haut braucht mehr Duft, nicht weniger.'
              }
            ].map((item, i) => (
              <div key={i} style={{
                background: 'linear-gradient(135deg, rgba(212,175,55,0.05), rgba(212,175,55,0.02))',
                border: '1px solid rgba(212,175,55,0.1)',
                borderRadius: '8px',
                padding: '1.25rem'
              }}>
                <p style={{ margin: '0 0 0.75rem 0', fontWeight: 600, fontSize: '0.95rem' }}>
                  ❓ {item.problem}
                </p>
                <p style={{ margin: 0, fontSize: '0.9rem', color: '#5b4d40' }}>
                  ✅ {item.lösung}
                </p>
              </div>
            ))}
          </div>

          <h2>Düfte-Empfehlungen nach Hauttyp (Konkrete Beispiele)</h2>

          <h3>Für trockene Haut – Die besten Düfte:</h3>
          <ul style={{ marginBottom: '2rem', fontSize: '0.95rem' }}>
            <li><strong>Tom Ford Black Orchid</strong> – Schwer, würzig, warm. Ideal für trockene Haut. Hält 8+ Stunden.</li>
            <li><strong>Yves Saint Laurent Opium</strong> – Klassisch, würzig, orientalisch, cremig. Designed für Langzeittrags.</li>
            <li><strong>Estée Lauder Beautiful</strong> – Floral süss, warm. Leicht schwer, hält lange auf trockener Haut.</li>
            <li><strong>Carolina Herrera Bad Boy (Herren)</strong> – Warm, würzig, holzig. Auch für Frauen grossartig auf Trockenhaut.</li>
          </ul>

          <h3>Für normale Haut – Die meisten Düfte funktionieren:</h3>
          <ul style={{ marginBottom: '2rem', fontSize: '0.95rem' }}>
            <li><strong>Chanel No. 5</strong> – Der Klassiker, funktioniert überall.</li>
            <li><strong>Dior J'adore</strong> – Zeitlos, nicht zu schwer, nicht zu leicht.</li>
            <li><strong>Creed Aventus</strong> – Modern, frisch, elegant. Auf normaler Haut optimal.</li>
            <li><strong>Bleu de Chanel</strong> – Unisex, zeitlos, funktioniert jeden Tag.</li>
          </ul>

          <h3>Für ölige Haut – Die besten Düfte:</h3>
          <ul style={{ marginBottom: '2rem', fontSize: '0.95rem' }}>
            <li><strong>Hermès Eau de Gentiane Blanche</strong> – Frisch, würzig, leicht. Ideal für ölige Haut.</li>
            <li><strong>Acqua di Gioia (Giorgio Armani)</strong> – Marine, frisch, leicht. 100% für ölige Haut designed.</li>
            <li><strong>L'Artisan Parfumeur Nuit de Tubérose</strong> – Blumig, nicht süss, frisch. Wunderbar auf ölige Haut.</li>
            <li><strong>Heeley Sel Marin (Niche)</strong> – Meerwasser, zedernholz, frisch. Ideal für ölige Haut, günstiger Preis.</li>
          </ul>

          <h3>Für sensible Haut – Die sichersten Düfte:</h3>
          <ul style={{ marginBottom: '2rem', fontSize: '0.95rem' }}>
            <li><strong>Aveeno Pure Renewal (Niche)</strong> – Hypoallergene Linie, extra getestet für sensible Haut.</li>
            <li><strong>L'Occitane Eau de Lavande</strong> – Natürliche Lavender, beruhigend, hypoallergen.</li>
            <li><strong>Clarins Eau Ressourçante</strong> – Light, frisch, speziell für sensible Haut formuliert.</li>
            <li><strong>Diptyque L'Eau Trois</strong> – Niche, hochwertig, leicht, auf sensitiver Haut getestet.</li>
          </ul>

          <h2>FAQ: Hauttyp & Duftauswahl</h2>

          <div style={{
            display: 'grid',
            gap: '1rem',
            marginBottom: '2rem'
          }}>
            {[
              {
                frage: 'Kann mein Hauttyp sich ändern?',
                antwort: 'Ja. Mit Alter, Hormonen, Jahreszeit, Bewegung, Ernährung. Deine Haut ist dynamisch. Wenn sich dein Hauttyp ändert, müssen deine Düfte eventuell auch wechseln.'
              },
              {
                frage: 'Ist Feuchtigkeitscreme vor dem Duft eine gute Idee?',
                antwort: 'Ja – besonders für trockene Haut. Eine leichte, duftfreie Feuchtigkeitscreme gibt der Duft mehr Grip. Für ölige Haut: Nutze sehr leichte Formeln oder spray direkt auf die Haut.'
              },
              {
                frage: 'Sollte ich einen Duft auf meinem Unterarm testen oder auf dem Hals?',
                antwort: 'Beides ist ok. Unterarm ist einfacher zu kontrollieren. Hals ist näher an der Nase – du schätzt die Intensität besser ein. Bei sensible Haut: teste zuerst auf Unterarm, nicht im Gesicht.'
              },
              {
                frage: 'Ist EdT-Version sicherer für sensible Haut?',
                antwort: 'Ja, meistens. Weniger Duftkomplex = weniger Potenzial für Reizung. Aber es hängt vom einzelnen Duft ab – manche EdP sind hypoallergener als manche EdT. Test ist wichtig.'
              },
              {
                frage: 'Kann ich meine Körperpflege mit der Duft-Wahl koordinieren?',
                antwort: 'Absolut. Wenn deine Körperlotion duftfrei ist, hast du vollständige Kontrolle über den Duft. Wenn deine Lotion duft hat, kann sie mit deinem Duft kollidieren oder ihn verstärken – je nachdem, ob die Noten kompatibel sind.'
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
              🎯 <strong>Zusammenfassung: Der richtige Duft für deine Haut</strong>
            </p>
            <p style={{ margin: 0, color: '#6b5344', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Dein Hauttyp ist nicht der einzige Faktor – aber er ist einer der wichtigsten. Wenn du trockene Haut hast,
              brauche schwere EdP, nicht leichte EdT. Wenn du ölige Haut hast, wähle EdT oder EdC, sonst wird es zu viel.
              Sensible Haut braucht Vorsicht & Tests. Normale Haut hat Glück – vieles funktioniert. Kenne deinen Hauttyp,
              wähle deine Düfte danach aus, und du wirst viel bessere Ergebnisse sehen als wenn du blind nach der Duftfamilie
              wählst.
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
              🔍 Nächster Schritt: Finde den perfekten Duft für deine Haut
            </p>
            <p style={{ margin: 0, fontSize: '0.9rem', color: '#5b4d40' }}>
              Jetzt, da du deinen Hauttyp kennst und weisst, welche Düfte dafür ideal sind, nutze <Link href="/quiz" style={{ color: '#d4af37', fontWeight: 600, textDecoration: 'none' }}>das Auressa-Quiz</Link> –
              es berücksichtigt deine Duftpräferenzen UND Haut-Gegebenheiten für den perfekten Match.
              Oder durchsuche <Link href="/duefte" style={{ color: '#d4af37', fontWeight: 600, textDecoration: 'none' }}>unseren Katalog</Link> nach Düften, die für deinen Hauttyp gedacht sind.
            </p>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid rgba(212,175,55,0.2)', margin: '3rem 0' }} />

          <div style={{ marginTop: '2rem' }}>
            <h3 style={{ marginTop: 0 }}>Verwandte Ratgeber: Hauttyp & Duftauswahl</h3>
            <ul style={{ fontSize: '0.95rem', lineHeight: 1.8 }}>
              <li><Link href="/koerperchemie-duft" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Körperchemie & Duft</Link> – Wie pH-Wert, Hormonen und Körperwärme beeinflussen, wie ein Duft auf dir riecht</li>
              <li><Link href="/duft-waehlen" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Duft wählen – Anleitung</Link> – Schritt-für-Schritt zur perfekten Duft-Auswahl</li>
              <li><Link href="/duftarten" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Duftarten erklärt</Link> – EdP, EdT, Cologne: Welche Konzentration für welchen Hauttyp</li>
              <li><Link href="/parfum-auftragen" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Parfum richtig auftragen</Link> – Tipps zum Auftragen, die deinen Hauttyp berücksichtigen</li>
              <li><Link href="/duft-lagerung" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Duft-Lagerung</Link> – Wie du deine Düfte lagert, um ihre Haltbarkeit zu schützen</li>
              <li><Link href="/guenstige-alternativen" style={{ color: '#d4af37', textDecoration: 'none', fontWeight: 500 }}>Günstige Duft-Alternativen</Link> – Für deinen Hauttyp die perfekten Budget-Düfte finden</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
