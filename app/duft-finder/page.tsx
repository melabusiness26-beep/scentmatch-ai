import type { Metadata } from 'next';
import { getPerfumes } from '@/lib/perfumes';
import DuftFinder from '@/app/components/DuftFinder';

export const metadata: Metadata = {
  robots: 'noindex, nofollow',
  title: 'Duft-Finder – Welchen Duft suchst du? | Auressa',
  description: 'Beschreib den Duft, den du suchst – wir finden ihn aus 409 Düften.',
};

export default async function DuftFinderPage() {
  let perfumes = [];

  try {
    perfumes = await getPerfumes(2000);
  } catch (error) {
    console.error('[DuftFinder Page] Failed to load perfumes:', error);
  }

  return (
    <main className="page-container">
      <section className="page-hero">
        <div className="hero-content">
          <h1 style={{
            fontSize: 'clamp(32px, 8vw, 48px)',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            marginBottom: '1rem',
            lineHeight: 1.1,
          }}>
            Welchen Duft suchst du?
          </h1>
          <p className="hero-subtitle" style={{
            fontSize: '16px',
            color: 'var(--dt-text-secondary, #d4cfc3)',
            maxWidth: '600px',
          }}>
            Beschreib ihn in eigenen Worten – wir finden ihn aus 409 Düften.
          </p>
        </div>
      </section>

      <div className="container">
        <section className="section">
          <DuftFinder allPerfumes={perfumes} />
        </section>
      </div>
    </main>
  );
}
