import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import SiteHeader from '@/app/SiteHeader';
import {
  getPerfumeBySlug,
  getAllPerfumeSlugs,
  getPerfumes,
  findSimilarPerfumes,
  findCheaperAlternatives,
  buyUrl,
  describePerfume,
  type Perfume
} from '@/lib/perfumes';

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
    return { title: 'Duft nicht gefunden – ScentMatch' };
  }

  const brand = perfume.brands?.name ? ` von ${perfume.brands.name}` : '';
  const title = `${perfume.perfume_name}${brand} – Duftprofil & Bewertung | ScentMatch`;
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

function Cover({ perfume, large }: { perfume: Perfume; large?: boolean }) {
  const className = `cover${large ? ' cover-large' : ''} cover-${perfume.fragrance_family || ''}`;
  if (perfume.image_url) {
    return <div className={className} style={{ backgroundImage: `url(${perfume.image_url})` }} />;
  }
  return (
    <div className={className}>
      <div className="cover-label">
        {perfume.brands?.name && <span className="cover-label-brand">{perfume.brands.name}</span>}
        <span className="cover-label-name">{perfume.perfume_name}</span>
      </div>
    </div>
  );
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
      `${perfume.perfume_name} – Duftprofil auf ScentMatch.`,
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

  // Ähnliche Düfte aus dem gesamten Katalog ermitteln (gleiche Familie,
  // geteilte Noten, ähnliche Intensität). Nur Treffer mit echter Ähnlichkeit zeigen.
  const pool = (await getPerfumes(500)).filter((p) => p.slug);
  const cheaper = findCheaperAlternatives(perfume, pool, 3);
  const cheaperIds = new Set(cheaper.map((c) => c.perfume.id));
  // In den allgemeinen "ähnlich"-Vorschlägen die guenstigen Alternativen nicht doppelt zeigen.
  const similar = findSimilarPerfumes(perfume, pool, 4)
    .filter((s) => s.similarity >= 30 && !cheaperIds.has(s.perfume.id));

  return (
    <main>
      <SiteHeader />
      <div className="container">
        <div className="backlink"><Link className="badge" href="/duefte">← Alle Düfte</Link></div>

        <section className="detail-hero">
          <div>
            <Cover perfume={perfume} large />
            <p className="small">{brandName}</p>
            <h1 className="detail-title">{perfume.perfume_name}</h1>
            <p className="lead">{perfume.description || describePerfume(perfume)}</p>
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
            <a
              className="button buy-button"
              href={buyUrl(perfume)}
              target="_blank"
              rel="sponsored nofollow noopener noreferrer"
            >
              Jetzt ansehen →
            </a>
            {perfume.affiliate_url && (
              <p className="small buy-note">
                Affiliate-Link – beim Kauf erhalten wir ggf. eine kleine Provision. Für dich ändert sich der Preis nicht.
              </p>
            )}
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

        {cheaper.length > 0 && (
          <section className="section">
            <h2>Günstige Alternativen zu {perfume.perfume_name}</h2>
            <p className="small">
              Ähnlich riechende Düfte, die deutlich weniger kosten – ideal, wenn du den Stil magst,
              aber sparen möchtest.
            </p>
            <div className="perfume-list">
              {cheaper.map(({ perfume: c, similarity }) => {
                const saving =
                  perfume.price_chf != null && c.price_chf != null
                    ? perfume.price_chf - c.price_chf
                    : null;
                return (
                  <Link className="tile tile-link" href={`/duft/${c.slug}`} key={c.id}>
                    <Cover perfume={c} />
                    <div className="match-badge">{c.price_chf != null ? `ca. CHF ${c.price_chf}` : 'Preis offen'}</div>
                    <h3>{c.perfume_name}</h3>
                    <p className="small">
                      {c.brands?.name || 'Marke offen'} · {familyLabel(c.fragrance_family)}
                    </p>
                    <p className="small">
                      {similarity}% ähnlich
                      {saving != null && saving > 0 ? ` · spart ~CHF ${saving}` : ''}
                    </p>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        {similar.length > 0 && (
          <section className="section">
            <h2>Riecht ähnlich wie …</h2>
            <p className="small">
              Düfte aus unserem Katalog, die {perfume.perfume_name} im Charakter am nächsten kommen.
            </p>
            <div className="perfume-list">
              {similar.map(({ perfume: s, similarity }) => (
                <Link className="tile tile-link" href={`/duft/${s.slug}`} key={s.id}>
                  <Cover perfume={s} />
                  <div className="match-badge">{similarity}% ähnlich</div>
                  <h3>{s.perfume_name}</h3>
                  <p className="small">
                    {s.brands?.name || 'Marke offen'} · {familyLabel(s.fragrance_family)}
                  </p>
                  <p className="small">
                    Saison: {s.season || 'offen'}
                    <br />
                    Anlass: {s.occasion || 'offen'}
                  </p>
                </Link>
              ))}
            </div>
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
