import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPerfumeBySlug, getAllPerfumeSlugs, type Perfume } from '@/lib/perfumes';

// Detailseiten werden stündlich neu generiert (frische Daten, schnelle Auslieferung).
export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://scentmatch-ai.vercel.app';

const familyLabels: Record<string, string> = {
  clean: 'Clean / Frisch',
  gourmand: 'Gourmand / Süß',
  woody: 'Woody / Holzig',
  floral: 'Floral / Blumig'
};

function familyLabel(code: string | null): string {
  if (!code) return 'Duftfamilie offen';
  return familyLabels[code] || code;
}

// Erzeugt alle Duftseiten beim Build vor (gut für SEO und Tempo).
export async function generateStaticParams() {
  const slugs = await getAllPerfumeSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const perfume = await getPerfumeBySlug(slug);

  if (!perfume) {
    return { title: 'Duft nicht gefunden – ScentMatch AI' };
  }

  const brand = perfume.brands?.name ? ` von ${perfume.brands.name}` : '';
  const title = `${perfume.perfume_name}${brand} – Duftprofil & Bewertung | ScentMatch AI`;
  const description =
    perfume.description ||
    `${perfume.perfume_name}${brand}: Duftfamilie ${familyLabel(perfume.fragrance_family)}, ideal für ${perfume.occasion || 'jeden Anlass'} und die Saison ${perfume.season || 'ganzjährig'}. ScentMatch-Score ${perfume.scentmatch_score ?? '–'}/100.`;

  return {
    title,
    description,
    alternates: { canonical: `/duft/${slug}` },
    openGraph: {
      title,
      description,
      type: 'article',
      url: `${SITE_URL}/duft/${slug}`
    }
  };
}

function StatRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="stat-row">
      <span className="small">{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function Notes({ title, notes }: { title: string; notes: string[] | null }) {
  if (!notes || notes.length === 0) return null;
  return (
    <div className="notes-block">
      <div className="small">{title}</div>
      <div className="note-pills">
        {notes.map((note) => (
          <span className="note-pill" key={note}>
            {note}
          </span>
        ))}
      </div>
    </div>
  );
}

function jsonLd(perfume: Perfume) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: perfume.perfume_name,
    brand: perfume.brands?.name
      ? { '@type': 'Brand', name: perfume.brands.name }
      : undefined,
    category: familyLabel(perfume.fragrance_family),
    description:
      perfume.description ||
      `${perfume.perfume_name} – Duftprofil auf ScentMatch AI.`,
    image: perfume.image_url || undefined,
    aggregateRating: perfume.scentmatch_score
      ? {
          '@type': 'AggregateRating',
          ratingValue: (perfume.scentmatch_score / 20).toFixed(1),
          bestRating: '5',
          ratingCount: 1
        }
      : undefined,
    offers:
      perfume.price_chf != null
        ? {
            '@type': 'Offer',
            price: perfume.price_chf,
            priceCurrency: 'CHF'
          }
        : undefined
  };
}

export default async function PerfumeDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const perfume = await getPerfumeBySlug(slug);

  if (!perfume) notFound();

  const brandName = perfume.brands?.name || 'Marke offen';
  const hasNotes =
    (perfume.top_notes && perfume.top_notes.length > 0) ||
    (perfume.heart_notes && perfume.heart_notes.length > 0) ||
    (perfume.base_notes && perfume.base_notes.length > 0);

  return (
    <main>
      <div className="container">
        <nav className="nav">
          <Link className="logo" href="/">
            ScentMatch AI
          </Link>
          <Link className="badge" href="/#database">
            ← Alle Düfte
          </Link>
        </nav>

        <section className="detail-hero">
          <div>
            <p className="small">{brandName}</p>
            <h1 className="detail-title">{perfume.perfume_name}</h1>
            <p className="lead">
              {perfume.description ||
                `${perfume.perfume_name} von ${brandName} ist ein Duft aus der Familie ${familyLabel(
                  perfume.fragrance_family
                )}. Ideal für ${perfume.occasion || 'jeden Anlass'} und die Saison ${
                  perfume.season || 'ganzjährig'
                }.`}
            </p>
            <div className="badge-row">
              <span className="badge">{familyLabel(perfume.fragrance_family)}</span>
              {perfume.gender && <span className="badge">{perfume.gender}</span>}
              {perfume.scentmatch_score != null && (
                <span className="badge">ScentMatch {perfume.scentmatch_score}/100</span>
              )}
            </div>
          </div>

          <div className="card detail-stats">
            <h2>Auf einen Blick</h2>
            <StatRow label="ScentMatch-Score" value={`${perfume.scentmatch_score ?? '–'}/100`} />
            <StatRow label="Haltbarkeit" value={`${perfume.longevity ?? '–'}/10`} />
            <StatRow label="Sillage (Projektion)" value={`${perfume.sillage ?? '–'}/10`} />
            <StatRow label="Saison" value={perfume.season || 'ganzjährig'} />
            <StatRow label="Anlass" value={perfume.occasion || 'flexibel'} />
            <StatRow
              label="Richtpreis"
              value={perfume.price_chf != null ? `ca. CHF ${perfume.price_chf}` : '–'}
            />
          </div>
        </section>

        {hasNotes && (
          <section className="section card">
            <h2>Duftnoten</h2>
            <Notes title="Kopfnoten" notes={perfume.top_notes} />
            <Notes title="Herznoten" notes={perfume.heart_notes} />
            <Notes title="Basisnoten" notes={perfume.base_notes} />
          </section>
        )}

        <section className="section">
          <Link className="button" href="/#quiz">
            Passt dieser Duft zu dir? Mach das Quiz
          </Link>
        </section>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd(perfume)) }}
      />
    </main>
  );
}
