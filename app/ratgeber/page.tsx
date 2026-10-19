import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllGuides } from '@/lib/guides';

export const metadata: Metadata = {
  title: 'Ratgeber | Auressa',
  description: 'Duft-Ratgeber: Tipps, Tricks und alles über Düfte. Von Dupes bis zur Duftpyramide.',
  keywords: ['Duft-Ratgeber', 'Duft-Tipps', 'Parfüm-Guide', 'Fragrance Tips'],
};

export default function GuidesPage() {
  const guides = getAllGuides();
  const categories = ['dupe', 'seasonal', 'style', 'tips'] as const;
  const categoryLabels: Record<(typeof categories)[number], string> = {
    dupe: 'Dupes & Sparen',
    seasonal: 'Saisonale Düfte',
    style: 'Stil & Selbstausdruck',
    tips: 'Tipps & Tricks',
  };

  return (
    <article className="legal-page">
      <section className="page-hero">
        <div className="page-hero-inner">
          <h1>Duft-Ratgeber</h1>
          <p className="lead">Alles über Düfte — von Dupes bis zur Duftpyramide</p>
        </div>
      </section>

      <section className="page-content guides-content">
        <p>
          Willkommen in unserem Duft-Ratgeber! Hier findest du ausführliche Artikel zu Duft-Themen,
          Tipps zum Sparen, saisonale Empfehlungen und vieles mehr. Egal ob du Anfänger oder
          erfahrener Duft-Enthusiast bist — hier ist für jeden etwas dabei.
        </p>

        {categories.map((category) => {
          const categoryGuides = guides.filter((g) => g.category === category);
          if (categoryGuides.length === 0) return null;

          return (
            <div key={category} className="guides-category">
              <h2>{categoryLabels[category]}</h2>

              <div className="guides-grid">
                {categoryGuides.map((guide) => (
                  <article key={guide.id} className="guide-card">
                    <Link href={`/ratgeber/${guide.slug}`}>
                      <h3>{guide.title}</h3>
                    </Link>
                    <p className="guide-description">{guide.description}</p>

                    <div className="guide-meta">
                      <span className="read-time">⏱ {guide.readTime} min Lesezeit</span>
                      <span className="published-date">
                        {new Date(guide.publishedAt).toLocaleDateString('de-CH', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>

                    <Link href={`/ratgeber/${guide.slug}`} className="button button-primary small">
                      Artikel lesen
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          );
        })}

        <hr style={{ margin: '3rem 0' }} />

        <div style={{ marginTop: '3rem', padding: '2rem', backgroundColor: '#f8f8f8', borderRadius: '8px' }}>
          <h3>Hast du eine Frage, die nicht beantwortet wird?</h3>
          <p>
            Schreib uns:{' '}
            <a href="mailto:melanie.viele@auressa.ch">melanie.viele@auressa.ch</a>
          </p>
          <p>
            Oder beginne mit unserem{' '}
            <Link href="/" style={{ fontWeight: 'bold', color: '#D4AF37', textDecoration: 'underline' }}>
              Quiz
            </Link>
            {' '}— finde deinen perfekten Duft in 2 Minuten!
          </p>
        </div>
      </section>
    </article>
  );
}
