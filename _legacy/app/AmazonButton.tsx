import { type Perfume } from '@/lib/perfumes';

export function AmazonButton({ perfume }: { perfume: Perfume }) {
  const brand = perfume.brands?.name || '';
  const name = perfume.perfume_name || '';
  const searchQuery = `${brand} ${name}`.trim();
  const amazonUrl = `https://www.amazon.de/s?k=${encodeURIComponent(searchQuery)}&tag=auressa-2-21`;

  return (
    <>
      <a className="button amazon-button" href={amazonUrl} target="_blank" rel="nofollow noopener noreferrer">
        Bei Amazon kaufen →
      </a>
      <p className="small buy-note amazon-note">
        <span className="affiliate-note-icon" aria-hidden="true">ⓘ</span>
        Partner-Link – für dich kein Mehrpreis.
      </p>
    </>
  );
}
