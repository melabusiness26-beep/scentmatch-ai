import type { Metadata } from 'next';
import { getPerfumes } from '@/lib/perfumes';
import SavedPerfumes from '@/app/components/SavedPerfumes';

export const metadata: Metadata = {
  robots: 'noindex, nofollow',
  title: 'Meine Düfte – Gespeicherte Favoriten | Auressa',
  description: 'Deine gesammelten und favorisierten Düfte an einem Ort.',
};

export default async function MeineDueftePage() {
  let perfumes = [];

  try {
    perfumes = await getPerfumes(2000);
  } catch (error) {
    console.error('[MeineDuefte Page] Failed to load perfumes:', error);
  }

  return (
    <main style={{ backgroundColor: '#faf7f2' }}>
      <section
        style={{
          backgroundImage: 'linear-gradient(rgba(26,18,9,0.80), rgba(26,18,9,0.80)), url(https://images.unsplash.com/photo-1585707571895-b2b6cff95ba5?w=800)',
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
            Meine Düfte
          </h1>
          <p style={{
            fontSize: '16px',
            color: 'rgba(250,247,242,0.65)',
            margin: 0,
          }}>
            Deine gesammelten und favorisierten Düfte an einem Ort.
          </p>
        </div>
      </section>

      <div style={{ padding: '2rem 1.25rem', maxWidth: '800px', margin: '0 auto' }}>
        <section>
          <SavedPerfumes allPerfumes={perfumes} />
        </section>
      </div>
    </main>
  );
}
