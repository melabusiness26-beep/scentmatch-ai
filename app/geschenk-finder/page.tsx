import { Metadata } from 'next';
import { getPerfumes } from '@/lib/perfumes';
import GiftFinder from '@/app/components/GiftFinder';
import SiteHeader from '@/app/SiteHeader';

export const revalidate = 3600; // ISR: revalidate hourly

export const metadata: Metadata = {
  title: 'Parfum Geschenk finden: der Geschenk-Finder für Weihnachten | Auressa',
  description:
    'Den perfekten Duft als Geschenk finden: Unser Quiz zeigt dir in 4 Fragen die besten Parfüm-Empfehlungen. Für Frauen, Männer und jedes Budget.',
  openGraph: {
    title: 'Parfum Geschenk finden | Auressa',
    description: 'Den perfekten Duft als Geschenk entdecken – schnell, einfach und für jedes Budget.',
    type: 'website',
  },
};

export default async function GiftFinderPage() {
  const perfumes = await getPerfumes();

  return (
    <main>
      <SiteHeader />
      <section className="page-hero gift-finder-hero">
        <div className="hero-content">
          <h1>Parfum-Geschenk finden</h1>
          <p className="hero-subtitle">
            Der richtige Duft für die richtige Person – in 4 Fragen. Unser Geschenk-Finder zeigt dir die
            besten Empfehlungen für Frauen, Männer und jedes Budget.
          </p>
        </div>
      </section>

      <section className="section-content">
        <GiftFinder allPerfumes={perfumes} />
      </section>

      <section className="section-faq-gift">
        <div className="container">
          <h2>Häufig gefragt</h2>
          <div className="faq-items">
            <div className="faq-item">
              <h3>Kann ich einen Geschenk-Gutschein kaufen?</h3>
              <p>
                Gerne! Du kannst auf unserer Seite einen Link zu einem Duft kopieren und als Geschenk weitergeben.
                Die Person kann dann den Duft über unseren Affiliate-Link kaufen.
              </p>
            </div>
            <div className="faq-item">
              <h3>Was ist, wenn ich den Lieblings-Duft der Person nicht kenne?</h3>
              <p>
                Kein Problem! Der Lieblings-Duft ist optional. Nutze stattdessen den Stil der Person – unsere
                vier Kategorien (frisch, elegant, warm, auffällig) helfen dir, die richtige Richtung zu finden.
              </p>
            </div>
            <div className="faq-item">
              <h3>Sind die günstigen Alternativen echte Dupes?</h3>
              <p>
                Ja, unsere günstigen Alternativen sind echte „Dupes" – also Düfte, die dem Original sehr ähnlich
                riechen. Nicht 100 % identisch, aber für den Preis verblüffend ähnlich. Mehr erfährst du in
                unserem <a href="/ratgeber#guenstige-alternativen-zu-teuren-dueften">Dupe-Ratgeber</a>.
              </p>
            </div>
            <div className="faq-item">
              <h3>Kann ich einen Duft umtauschen, wenn er nicht passt?</h3>
              <p>
                Das hängt vom Shop ab – aber gute Shops bieten Umtausch innerhalb von 14 Tagen an. Schau auf der
                Produktseite nach.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
