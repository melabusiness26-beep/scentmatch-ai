import type { Metadata } from 'next';
import Link from 'next/link';
import Breadcrumb from '@/app/Breadcrumb';
import { scentNotes } from '@/lib/notes-glossary';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export const metadata: Metadata = {
  title: 'Duftnoten-Lexikon: Parfumnoten einfach erklärt',
  description:
    'Das Auressa Duftnoten-Lexikon erklärt die wichtigsten Parfumnoten – von Bergamotte bis Oud: wie sie riechen, woher sie kommen und welche Düfte zu dir passen.',
  alternates: { canonical: '/duftnoten' },
  openGraph: {
    title: 'Duftnoten-Lexikon | Auressa',
    description:
      'Die wichtigsten Parfumnoten verständlich erklärt – Duft, Herkunft, Wirkung und passende Düfte.',
    type: 'website',
    url: `${SITE_URL}/duftnoten`
  }
};

export default function DuftnotenPage() {
  return (
    <main>
      <Breadcrumb items={[{ label: 'Duftnoten-Lexikon', href: '/duftnoten' }]} />
      <div className="container">
        <section className="section">
          <p className="eyebrow">Wissen</p>
          <h1 className="detail-title">Duftnoten-Lexikon</h1>
          <p className="lead">
            Ein Parfum besteht aus vielen einzelnen Duftnoten – sie bestimmen, ob ein Duft
            frisch, süss, holzig oder blumig wirkt. Wer die wichtigsten Noten kennt, versteht
            schneller, warum ein Duft gefällt und welche anderen Düfte ähnlich riechen.
          </p>
          <p className="lead">
            Hier erklären wir die bekanntesten Parfumnoten verständlich: wie sie riechen, woher
            sie kommen und welche Düfte aus unserem Katalog dazu passen.
          </p>

          <div style={{
            background: 'linear-gradient(135deg, rgba(212,175,55,0.08), rgba(212,175,55,0.04))',
            border: '1px solid rgba(212,175,55,0.15)',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '2rem',
            marginTop: '1.5rem'
          }}>
            <p style={{ margin: '0 0 0.75rem 0', color: '#2a1d12', fontWeight: 600 }}>
              🔺 <strong>Neu hier?</strong> Verstehe zuerst die Grundlagen:
            </p>
            <p style={{ margin: 0, color: '#6b5344', fontSize: '0.9rem', lineHeight: 1.6 }}>
              Lerne, wie die Duftnoten-Pyramide funktioniert und warum ein Duft sich über den Tag verändert.
              Lies unseren <Link href="/duftnoten-guide" style={{ color: '#d4af37', fontWeight: 600, textDecoration: 'none' }}>Duftnoten-Guide</Link>.
            </p>
          </div>

          <h2>Die wichtigsten Duftnoten im Überblick</h2>
          <div className="grid">
            {scentNotes.map((note) => (
              <Link className="tile tile-link" href={`/duftnoten/${note.slug}`} key={note.slug}>
                <img
                  className="cover note-cover"
                  src={note.image}
                  alt={`${note.name} – Duftnote in der Parfümerie`}
                  width={400}
                  height={160}
                  loading="lazy"
                />
                <h3>{note.name}</h3>
                <p className="small">{note.short}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
