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
    <main style={{ backgroundColor: '#faf7f2' }}>
      <section
        style={{
          backgroundImage: 'linear-gradient(rgba(26,18,9,0.80), rgba(26,18,9,0.80)), url(https://images.unsplash.com/photo-1549049950-48d5887197a0?w=800)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          minHeight: '280px',
          padding: '2.5rem 1.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '600px' }}>
          <h1 style={{
            fontSize: 'clamp(32px, 8vw, 48px)',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            marginBottom: '1rem',
            lineHeight: 1.1,
            color: '#faf7f2',
          }}>
            Welchen Duft suchst du?
          </h1>
          <p style={{
            fontSize: '16px',
            color: 'rgba(250,247,242,0.65)',
            margin: 0,
          }}>
            Gib einen Duftnamen oder eine Beschreibung ein – wir finden ihn aus 409 Düften.
          </p>
        </div>
      </section>

      <div style={{ padding: '2rem 1.25rem', maxWidth: '1200px', margin: '0 auto' }}>
        <section>
          <DuftFinder allPerfumes={perfumes} />
        </section>
      </div>
    </main>
  );
}
