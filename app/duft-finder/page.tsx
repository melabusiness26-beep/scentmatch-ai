import type { Metadata } from 'next';
import { getPerfumes, getPerfumeCount } from '@/lib/perfumes';
import DuftFinder from '@/app/components/DuftFinder';
import SiteHeader from '@/app/SiteHeader';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://scentmatch-ai.vercel.app';

function approxCount(n: number): number {
  return Math.floor(n / 50) * 50;
}

export async function generateMetadata(): Promise<Metadata> {
  const count = approxCount(await getPerfumeCount());
  return {
    title: 'Duft-Finder – Welchen Duft suchst du? | Auressa',
    description: `Beschreib den Duft, den du suchst – wir finden ihn aus über ${count} Düften.`,
    openGraph: {
      title: 'Duft-Finder | Auressa',
      description: `Finde deinen Duft aus über ${count} Parfüms.`,
      url: `${SITE_URL}/duft-finder`,
    },
  };
}

export default async function DuftFinderPage() {
  const [perfumes, count] = await Promise.all([
    getPerfumes(2000).catch(() => []),
    getPerfumeCount().catch(() => 0),
  ]);
  const approx = approxCount(count);

  return (
    <main style={{ backgroundColor: '#faf7f2' }}>
      <SiteHeader />
      <section
        style={{
          background: 'linear-gradient(135deg, #2a1d12 0%, #1a1209 100%)',
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
            Gib einen Duftnamen oder eine Beschreibung ein – wir finden ihn aus über {approx || '400'} Düften.
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
