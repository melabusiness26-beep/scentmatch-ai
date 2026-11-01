import type { Metadata } from 'next';
import { getPerfumes } from '@/lib/perfumes';
import DuftDetektiv from '@/app/components/DuftDetektiv';
import Breadcrumb from '@/app/Breadcrumb';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export const metadata: Metadata = {
  title: 'Duft-Detektiv – Finde deinen Signature Duft',
  description: 'Beantworte 12 einfache Fragen und finde den passenden Duft aus unserem kuratierten Katalog. Dein persönlicher Duft-Detektiv.',
  alternates: { canonical: `${SITE_URL}/duft-detektiv` },
  openGraph: {
      images: ['/opengraph-image'],
    title: 'Duft-Detektiv | Auressa',
    description: 'Beantworte 12 Fragen und finde deinen Signature Duft – aus unserem kuratierten Katalog.',
    url: `${SITE_URL}/duft-detektiv`,
    type: 'website',
  },
};

export default async function DuftDetektivPage() {
  let perfumes: Awaited<ReturnType<typeof getPerfumes>> = [];

  try {
    perfumes = await getPerfumes(2000);
  } catch (error) {
    console.error('[DuftDetektiv Page] Failed to load perfumes:', error);
  }

  return (
    <main style={{ backgroundColor: '#faf7f2' }}>
      <Breadcrumb items={[{ label: 'Duft-Detektiv', href: '/duft-detektiv' }]} />
      <section
        style={{
          backgroundImage: 'linear-gradient(rgba(26,18,9,0.80), rgba(26,18,9,0.80)), url(/hero-auressa-2.jpg)',
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
            Duft-Detektiv
          </p>
          <h1 style={{
            fontSize: 'clamp(32px, 8vw, 48px)',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            marginBottom: '1rem',
            lineHeight: 1.1,
            color: '#faf7f2',
          }}>
            Finde deinen Signature Duft
          </h1>
          <p style={{
            fontSize: '16px',
            color: 'rgba(250,247,242,0.65)',
            margin: 0,
          }}>
            Beantworte 12 einfache Fragen – wir finden deinen Signature Duft in unserem Katalog.
          </p>
        </div>
      </section>

      <div style={{ padding: '2rem 1.25rem', maxWidth: '800px', margin: '0 auto' }}>
        <section>
          <DuftDetektiv allPerfumes={perfumes} />
        </section>
      </div>
    </main>
  );
}
