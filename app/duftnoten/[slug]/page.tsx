import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteHeader from '@/app/SiteHeader';
import { PerfumeTile } from '@/app/PerfumeTile';
import { getPerfumes, type Perfume } from '@/lib/perfumes';
import { getScentNote, scentNotes, type ScentNote } from '@/lib/notes-glossary';

export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://scentmatch-ai.vercel.app';

export async function generateStaticParams() {
  return scentNotes.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const note = getScentNote(slug);
  if (!note) return { title: 'Duftnote nicht gefunden – Auressa' };

  return {
    title: note.metaTitle,
    description: note.metaDescription,
    alternates: { canonical: `/duftnoten/${slug}` },
    openGraph: {
      title: note.metaTitle,
      description: note.metaDescription,
      type: 'article',
      url: `${SITE_URL}/duftnoten/${slug}`,
      images: [{ url: `${SITE_URL}${note.image}`, width: 1200, alt: `${note.name} – Duftnote` }]
    }
  };
}

// Düfte, die diese Note (oder eine Schreibvariante) in den Duftnoten führen.
function perfumesWithNote(note: ScentNote, pool: Perfume[]): Perfume[] {
  const terms = [note.name.toLowerCase(), ...(note.synonyms || [])];
  return pool.filter((p) => {
    const notes = [...(p.top_notes || []), ...(p.heart_notes || []), ...(p.base_notes || [])]
      .join(' ')
      .toLowerCase();
    return terms.some((t) => notes.includes(t));
  });
}

function jsonLd(note: ScentNote) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: note.metaTitle,
    description: note.metaDescription,
    about: { '@type': 'Thing', name: `${note.name} (Duftnote)` },
    mainEntityOfPage: `${SITE_URL}/duftnoten/${note.slug}`,
    publisher: { '@type': 'Organization', name: 'Auressa' }
  };
}

export default async function ScentNotePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = getScentNote(slug);
  if (!note) notFound();

  const pool = (await getPerfumes(2000)).filter((p) => p.slug);
  const matches = perfumesWithNote(note, pool).slice(0, 8);
  const catalogHref = `/duefte?q=${encodeURIComponent(note.name)}`;
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Startseite', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Duftnoten', item: `${SITE_URL}/duftnoten` },
      { '@type': 'ListItem', position: 3, name: note.name, item: `${SITE_URL}/duftnoten/${note.slug}` }
    ]
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <SiteHeader />
      <div className="container">
        <nav className="breadcrumb small" aria-label="Brotkrümel-Navigation">
          <Link href="/">Startseite</Link>
          <span className="breadcrumb-sep" aria-hidden="true">›</span>
          <Link href="/duftnoten">Duftnoten</Link>
          <span className="breadcrumb-sep" aria-hidden="true">›</span>
          <span aria-current="page">{note.name}</span>
        </nav>

        <section className="section legal">
          <p className="eyebrow">Duftnote</p>
          <h1 className="detail-title">{note.name}</h1>
          <div
            className="cover cover-large note-hero"
            role="img"
            aria-label={`${note.name} – Duftnote`}
            style={{ backgroundImage: `url(${note.image})` }}
          />
          <p className="lead">{note.intro}</p>

          <h2>Wie riecht {note.name}?</h2>
          <p>{note.smell}</p>

          <h2>Herkunft &amp; Herstellung</h2>
          <p>{note.origin}</p>

          <h2>Typische Duftfamilie</h2>
          <p>{note.family}</p>

          <h2>Typische Wirkung</h2>
          <p>{note.effect}</p>

          <h2>Welche Noten passen zu {note.name}?</h2>
          <p>{note.pairsWith}</p>
        </section>

        <section className="section">
          <h2>Düfte mit {note.name}</h2>
          {matches.length > 0 ? (
            <>
              <p className="small">
                Diese Düfte aus unserem Katalog führen {note.name} in ihrer Duftpyramide.
              </p>
              <div className="perfume-list">
                {matches.map((p) => (
                  <PerfumeTile perfume={p} key={p.id} />
                ))}
              </div>
              <div className="cta">
                <Link className="button secondary" href={catalogHref}>
                  Alle Düfte mit {note.name} ansehen
                </Link>
              </div>
            </>
          ) : (
            <p className="small">
              Aktuell sind noch keine Düfte mit {note.name} im Katalog erfasst.{' '}
              <Link href="/duefte">Stöbere im gesamten Duftkatalog</Link> oder mach das{' '}
              <Link href="/#quiz">Duft-Quiz</Link>.
            </p>
          )}
        </section>

        <section className="section">
          <Link className="button" href="/#quiz">
            Welcher Duft passt zu dir? Mach das Quiz
          </Link>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(note)) }}
      />
    </main>
  );
}
