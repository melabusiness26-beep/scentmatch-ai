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

        {/* SEO-Text für Google */}
        <section style={{
          marginTop: '4rem',
          padding: '2.5rem',
          backgroundColor: '#fff',
          borderRadius: '16px',
          border: '1px solid #e8dcc8',
        }}>
          <h2 style={{
            fontSize: 'clamp(1.3rem, 4vw, 1.7rem)',
            fontFamily: "'Playfair Display', serif",
            color: '#2a1d12',
            marginBottom: '1.25rem',
            marginTop: 0,
          }}>
            Parfüm per Foto erkennen – so funktioniert der Auressa Duft-Scanner
          </h2>
          <p style={{ fontSize: '1rem', color: '#5a4a3e', lineHeight: 1.75, marginBottom: '1rem' }}>
            Du hast einen Parfümflakon vor dir und willst wissen: Welche Noten stecken darin? Wie lange hält er? Passt er zu mir? Der <strong>Auressa Duft-Scanner</strong> beantwortet all das in Sekunden – einfach fotografieren, KI analysieren lassen, fertig.
          </p>
          <p style={{ fontSize: '1rem', color: '#5a4a3e', lineHeight: 1.75, marginBottom: '1rem' }}>
            Unsere KI erkennt über <strong>400 Parfüms</strong> aus der Auressa-Datenbank – darunter Bestseller von Chanel, Dior, YSL, Paco Rabanne, Tom Ford, Creed und vielen mehr. Bei bekannten Düften erhältst du <strong>verifizierte Daten</strong>: echte Noten, Sillage, Haltbarkeit und den Schweizer Marktpreis.
          </p>
          <p style={{ fontSize: '1rem', color: '#5a4a3e', lineHeight: 1.75, marginBottom: '1.5rem' }}>
            Der Scanner zeigt dir ausserdem <strong>ähnliche Düfte</strong> die dir gefallen könnten – perfekt um einen Signature Scent zu finden oder günstige Alternativen zu entdecken.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            {[
              { emoji: '📸', title: 'Foto aufnehmen', text: 'Halte die Kamera auf den Flakon – Front oder Rücken, beides funktioniert.' },
              { emoji: '🤖', title: 'KI analysiert', text: 'Unsere KI erkennt Marke, Namen, Konzentration und gleicht mit der DB ab.' },
              { emoji: '✨', title: 'Vollprofil erhalten', text: 'Noten, Charakter, Geschichte, ähnliche Düfte und Kauflinks – alles auf einen Blick.' },
            ].map((item) => (
              <div key={item.title} style={{ padding: '1.25rem', backgroundColor: '#faf6ef', borderRadius: '12px', border: '1px solid #e8dcc8' }}>
                <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{item.emoji}</div>
                <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#2a1d12', marginBottom: '0.4rem' }}>{item.title}</div>
                <div style={{ fontSize: '0.85rem', color: '#7a6a5e', lineHeight: 1.6 }}>{item.text}</div>
              </div>
            ))}
          </div>

          <h3 style={{ fontSize: '1.15rem', fontFamily: "'Playfair Display', serif", color: '#2a1d12', marginBottom: '0.75rem' }}>
            Welche Parfüms erkennt der Scanner?
          </h3>
          <p style={{ fontSize: '0.95rem', color: '#5a4a3e', lineHeight: 1.75, marginBottom: '0' }}>
            Besonders zuverlässig erkennt der Scanner bekannte Düfte wie <strong>Chanel N°5</strong>, <strong>Dior Sauvage</strong>, <strong>YSL Black Opium</strong>, <strong>La Vie Est Belle</strong>, <strong>Paco Rabanne 1 Million</strong>, <strong>Viktor &amp; Rolf Flowerbomb</strong>, <strong>Creed Aventus</strong>, <strong>Baccarat Rouge 540</strong> und hunderte weitere. Auch Nischen-Düfte von Tom Ford, Byredo, Le Labo und Amouage sind in unserer Datenbank.
          </p>
        </section>
      </div>
    </main>
  );
}
