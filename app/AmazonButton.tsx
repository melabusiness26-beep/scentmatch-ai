import { type Perfume } from '@/lib/perfumes';

export function AmazonButton({ perfume, secondary = false }: { perfume: Perfume; secondary?: boolean }) {
  // Eingestellte Düfte kann man nicht mehr kaufen – kein Kauf-Knopf.
  if (perfume.discontinued) return null;
  const brand = perfume.brands?.name || '';
  const name = perfume.perfume_name || '';
  const searchQuery = `${brand} ${name}`.trim();
  const amazonUrl = `https://www.amazon.de/s?k=${encodeURIComponent(searchQuery)}&tag=auressa-2-21`;

  return (
    <>
      <a
        className={`button amazon-button${secondary ? ' amazon-button-secondary' : ''}`}
        href={amazonUrl}
        target="_blank"
        rel="sponsored nofollow noopener noreferrer"
      >
        {secondary ? 'Auch bei Amazon ansehen →' : 'Bei Amazon ansehen →'}
      </a>
      <p className="small buy-note amazon-note">
        <span className="affiliate-note-icon" aria-hidden="true">ⓘ</span>
        Partner-Link, für dich ohne Mehrkosten.
      </p>
    </>
  );
}
