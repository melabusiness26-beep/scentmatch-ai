import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  // false, wenn die Seite ihre eigene (ausführlichere) BreadcrumbList für Google ausgibt.
  withSchema?: boolean;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export default function Breadcrumb({ items, withSchema = true }: BreadcrumbProps) {
  // Wie die sichtbare Navigation: immer mit „Startseite" als erstem Schritt.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [{ label: 'Startseite', href: '' }, ...items].map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${SITE_URL}${item.href}`
    }))
  };

  return (
    <>
      {withSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
      )}
      <nav
        aria-label="Breadcrumb"
        style={{
          padding: '0.75rem 1.25rem',
          backgroundColor: '#faf7f2',
          borderBottom: '1px solid rgba(212,175,55,0.1)',
          fontSize: '0.85rem'
        }}
      >
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <ol
            style={{
              listStyle: 'none',
              padding: 0,
              margin: 0,
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              alignItems: 'center'
            }}
          >
            <li>
              <Link href="/" style={{ color: '#2a1d12', textDecoration: 'none' }}>
                Startseite
              </Link>
            </li>
            {items.map((item, index) => (
              <li key={item.href} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ color: '#d4af37' }}>›</span>
                {index === items.length - 1 ? (
                  <span style={{ color: '#6b5344' }}>{item.label}</span>
                ) : (
                  <Link href={item.href} style={{ color: '#2a1d12', textDecoration: 'none' }}>
                    {item.label}
                  </Link>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
}
