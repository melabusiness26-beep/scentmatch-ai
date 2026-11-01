import Link from 'next/link';
import { catalogCountLabel } from '@/lib/perfumes';
import LineIcon from '@/app/LineIcon';

// „3 Wege zur Entdeckung" – einheitliche, edle Karten (Elfenbein, feine Linie, goldene
// Linien-Symbole). Jede Karte ist ein echter Link. Der Scanner erscheint hier erst,
// wenn er fertig ist.
export default function ThreeWaysSection({ catalogCount }: { catalogCount?: number | null }) {
  const countLabel = catalogCountLabel(catalogCount);

  const cards = [
    {
      href: '/quiz',
      icon: 'compass',
      title: 'Duft-Quiz',
      description: 'Beantworte 10 kurze Fragen – wir berechnen, welche Düfte am besten zu dir passen.',
      cta: 'Quiz starten'
    },
    {
      href: '/dupes',
      icon: 'bottles',
      title: 'Dupe-Finder',
      description: 'Du liebst einen teuren Duft? Finde ähnlich riechende, günstigere Alternativen.',
      cta: 'Alternativen finden'
    },
    {
      href: '/duefte',
      icon: 'search',
      title: 'Düfte entdecken',
      description: `Stöbere durch ${countLabel ? `${countLabel} Düfte` : 'unseren geprüften Katalog'} – nach Familie, Note, Saison und Anlass.`,
      cta: 'Katalog öffnen'
    }
  ];

  return (
    <section className="ways">
      <div className="ways-inner">
        <div className="ways-head">
          <p className="ways-kicker">3 Wege zur Entdeckung</p>
          <h2 className="ways-title">Wähle deinen Weg</h2>
          <p className="ways-lead">
            Je nachdem, wie du deinen Duft am liebsten findest – geführt, gezielt oder frei stöbernd.
          </p>
        </div>

        <div className="ways-grid">
          {cards.map((card) => (
            <Link key={card.href} href={card.href} className="ways-card">
              <span className="ways-icon">
                <LineIcon name={card.icon} size={30} />
              </span>
              <h3 className="ways-card-title">{card.title}</h3>
              <p className="ways-card-text">{card.description}</p>
              <span className="ways-card-cta">
                {card.cta} <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
