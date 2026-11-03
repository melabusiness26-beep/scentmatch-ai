import Link from 'next/link';
import { getAllSizes, getPerfumes } from '@/lib/perfumes';
import CompareClient from './CompareClient';

// Stündlich neu: neue Düfte und Preise erscheinen ohne neues Deployment.
export const revalidate = 3600;

export default async function PerfumeComparePage() {
  const [perfumes, sizes] = await Promise.all([getPerfumes(2000), getAllSizes()]);
  // Schlank an den Browser: ohne lange Beschreibungen.
  const list = perfumes.filter((p) => p.slug).map((p) => ({ ...p, description: null }));

  return (
    <main className="cmp-page">
      <div className="container">
        <nav className="breadcrumb small" aria-label="Navigation">
          <Link href="/">Start</Link>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">Duft-Vergleich</span>
        </nav>
        <header className="cmp-head">
          <p className="dp-kicker">Duft-Vergleich</p>
          <h1>Welcher passt besser zu dir?</h1>
          <p>
            Bis zu drei Düfte nebeneinander: Preis, Haltbarkeit, Ausstrahlung, Jahreszeit und Noten. Gemeinsame Noten sind
            golden markiert – so siehst du sofort, wie ähnlich sie sich sind.
          </p>
        </header>
        <CompareClient perfumes={list} sizesById={sizes} />
      </div>
    </main>
  );
}
