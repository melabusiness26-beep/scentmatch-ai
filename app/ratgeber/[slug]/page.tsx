import type { Metadata } from 'next';
import Link from 'next/link';
import { getGuideBySlug, getAllGuides } from '@/lib/guides';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const guides = getAllGuides();
  return guides.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    return {
      title: '404 | Auressa',
    };
  }

  return {
    title: guide.seoTitle,
    description: guide.seoDescription,
    keywords: guide.keywords,
    openGraph: {
      title: guide.seoTitle,
      description: guide.seoDescription,
      type: 'article',
      publishedTime: guide.publishedAt,
    },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  return (
    <article className="legal-page guide-page">
      <section className="page-hero">
        <div className="page-hero-inner">
          <span style={{ fontSize: '0.875rem', color: '#999', textTransform: 'uppercase' }}>
            Ratgeber
          </span>
          <h1>{guide.title}</h1>
          <p className="lead">{guide.description}</p>

          <div className="guide-meta-header">
            <span className="read-time">⏱ {guide.readTime} min Lesezeit</span>
            <span className="published-date">
              {new Date(guide.publishedAt).toLocaleDateString('de-CH', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>
        </div>
      </section>

      <section className="page-content guide-content">
        <div
          className="guide-body"
          dangerouslySetInnerHTML={{
            __html: guide.content
              .split('\n')
              .map((line) => {
                if (line.startsWith('# ')) {
                  return `<h1>${line.slice(2)}</h1>`;
                } else if (line.startsWith('## ')) {
                  return `<h2>${line.slice(3)}</h2>`;
                } else if (line.startsWith('### ')) {
                  return `<h3>${line.slice(4)}</h3>`;
                } else if (line.startsWith('- ')) {
                  return `<li>${line.slice(2)}</li>`;
                } else if (line.trim() === '') {
                  return '</ul><p></p>';
                } else if (line.startsWith('**') && line.endsWith('**')) {
                  return `<strong>${line.slice(2, -2)}</strong>`;
                } else if (line.trim()) {
                  return `<p>${line}</p>`;
                }
                return '';
              })
              .join('\n')
              .replace(/\n<li>/g, '<ul><li>')
              .replace(/<\/li>\n<\/ul>/g, '</li></ul>'),
          }}
        />

        <hr style={{ margin: '3rem 0' }} />

        <div className="guide-footer">
          <div>
            <p>
              <strong>Hat dir dieser Artikel geholfen?</strong>
            </p>
            <p>
              Teile ihn mit Freunden oder{' '}
              <a href="mailto:melanie.viele@auressa.ch">schreib uns deine Gedanken!</a>
            </p>
          </div>

          <div style={{ marginTop: '2rem' }}>
            <Link href="/ratgeber" className="button button-secondary">
              ← Alle Ratgeber
            </Link>
            <Link href="/" className="button button-primary" style={{ marginLeft: '1rem' }}>
              Quiz starten
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
