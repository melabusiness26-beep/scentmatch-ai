import type { Metadata } from 'next';
import { getPerfumes } from '@/lib/perfumes';
import DuftScannerClient from './client';

export const metadata: Metadata = {
  title: 'Duft-Scanner – Parfüm per Foto erkennen | Auressa',
  description: 'Fotografiere einen Parfümflakon und lass die KI den Duft sofort identifizieren: Noten, Sillage, Charakter, Geschichte und ähnliche Düfte – alles in Sekunden.',
  keywords: ['Parfüm erkennen', 'Duft Scanner', 'Parfüm Foto', 'Duft identifizieren', 'KI Parfüm', 'Parfüm App'],
  openGraph: {
    title: 'Duft-Scanner – Parfüm per Foto erkennen',
    description: 'Fotografiere einen Parfümflakon und erhalte sofort das komplette Duftprofil: Noten, Charakter, Geschichte und ähnliche Empfehlungen.',
    url: 'https://auressa.ch/duft-scanner',
    type: 'website',
  },
  alternates: {
    canonical: 'https://auressa.ch/duft-scanner',
  },
};

export default async function DuftScannerPage() {
  let perfumes = [];

  try {
    perfumes = await getPerfumes(2000);
    console.log('[DuftScanner Page] Loaded perfumes:', perfumes.length);
  } catch (error) {
    console.error('[DuftScanner Page] Failed to load perfumes:', error);
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
            Duft-Scanner
          </h1>
          <p style={{
            fontSize: '16px',
            color: 'rgba(250,247,242,0.65)',
            margin: 0,
          }}>
            Fotografiere einen Flakon – wir identifizieren den Duft.
          </p>
        </div>
      </section>

      <div style={{ padding: '2rem 1.25rem', maxWidth: '800px', margin: '0 auto' }}>
        <section>
          <DuftScannerClient allPerfumes={perfumes} />
        </section>
      </div>
    </main>
  );
}
