import type { Metadata } from 'next';
import { getPerfumes, getPerfumeCount } from '@/lib/perfumes';
import DuftFinder from '@/app/components/DuftFinder';
import Breadcrumb from '@/app/Breadcrumb';

// Stündlich neu erzeugen, damit neue Düfte ohne neues Deployment erscheinen.
export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export const metadata: Metadata = {
  title: 'Duft-Finder – Parfüm suchen und finden',
  description: 'Beschreib den Duft, den du suchst, und durchsuche den Auressa-Katalog nach Name, Note oder Beschreibung.',
  alternates: { canonical: `${SITE_URL}/duft-finder` },
  openGraph: {
      images: ['/opengraph-image'],
    title: 'Duft-Finder | Auressa',
    description: 'Parfüm nach Name, Note oder Beschreibung suchen – aus unserem kuratierten Katalog.',
    url: `${SITE_URL}/duft-finder`,
    type: 'website',
  },
};

export default async function DuftFinderPage() {
  let perfumes: Awaited<ReturnType<typeof getPerfumes>> = [];
  let count = 0;
  [perfumes, count] = await Promise.all([getPerfumes(2000), getPerfumeCount()]);

  return (
    <main style={{ backgroundColor: '#faf7f2' }}>
      <Breadcrumb items={[{ label: 'Duft-Finder', href: '/duft-finder' }]} />
      <section
        style={{
          backgroundImage: 'linear-gradient(rgba(26,18,9,0.85), rgba(26,18,9,0.85)), url(/hero-auressa-2.jpg)',
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
          <p style={{ fontSize: '12px', color: '#d4af37', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.75rem' }}>
            Duft-Finder
          </p>
          <h1 style={{
            fontSize: 'clamp(32px, 8vw, 48px)',
            fontFamily: "var(--font-display), Georgia, serif",
            fontWeight: 700,
            marginBottom: '1rem',
            lineHeight: 1.1,
            color: '#faf7f2',
          }}>
            Welchen Duft suchst du?
          </h1>
          <p style={{ fontSize: '16px', color: 'rgba(250,247,242,0.65)', margin: 0 }}>
            Name, Note oder Beschreibung eingeben – {count > 0 ? `aus ${count} kuratierten Parfüms im Auressa-Katalog` : 'aus unserem kuratierten Katalog'}.
          </p>
        </div>
      </section>

      <div style={{ padding: '2rem 1.25rem', maxWidth: '1200px', margin: '0 auto' }}>
        <DuftFinder allPerfumes={perfumes} />
      </div>
    </main>
  );
}
