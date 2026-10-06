import type { Metadata } from 'next';
import { getPerfumes } from '@/lib/perfumes';
import DuftDetektiv from '@/app/components/DuftDetektiv';

export const metadata: Metadata = {
  robots: 'noindex, nofollow',
  title: 'Duft-Detektiv – Finde deinen Signature Duft | Auressa',
  description: 'Beantworte 12 einfache Fragen und finde den perfekten Duft aus über 400 Düften.',
};

export default async function DuftDetektivPage() {
  let perfumes = [];

  try {
    perfumes = await getPerfumes(2000);
  } catch (error) {
    console.error('[DuftDetektiv Page] Failed to load perfumes:', error);
  }

  return (
    <main style={{ backgroundColor: '#faf7f2' }}>
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
          <h1 style={{
            fontSize: 'clamp(32px, 8vw, 48px)',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            marginBottom: '1rem',
            lineHeight: 1.1,
            color: '#faf7f2',
          }}>
            Duft-Detektiv
          </h1>
          <p style={{
            fontSize: '16px',
            color: 'rgba(250,247,242,0.65)',
            margin: 0,
          }}>
            Beantworte 12 einfache Fragen – wir finden deinen Signature Duft aus über 400 Düften.
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
