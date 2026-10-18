'use client';

import { type Perfume } from '@/lib/perfumes';
import { PerfumeTile } from '@/app/PerfumeTile';
import Link from 'next/link';

interface FeaturedPerfumesProps {
  perfumes: Perfume[];
  title: string;
  description?: string;
  viewMoreLink?: string;
}

export function FeaturedPerfumes({ perfumes, title, description, viewMoreLink }: FeaturedPerfumesProps) {
  if (perfumes.length === 0) return null;

  return (
    <section style={{
      padding: 'clamp(2.5rem, 6vw, 4rem) 1.25rem',
      background: 'linear-gradient(180deg, transparent 0%, rgba(212,175,55,0.04) 100%)',
      borderTop: '1px solid rgba(212,175,55,0.1)',
      borderBottom: '1px solid rgba(212,175,55,0.1)',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ marginBottom: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
          <p style={{
            fontSize: '12px',
            color: '#d4af37',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            marginBottom: '0.5rem'
          }}>
            Highlights
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(24px, 5vw, 32px)',
            fontWeight: 700,
            color: '#2a1d12',
            marginBottom: description ? '0.75rem' : 0,
            margin: 0
          }}>
            {title}
          </h2>
          {description && (
            <p style={{
              fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
              color: '#4a3728',
              lineHeight: 1.6,
              marginTop: '0.75rem',
              maxWidth: '700px'
            }}>
              {description}
            </p>
          )}
        </div>

        <div className="perfume-list">
          {perfumes.slice(0, 4).map((p) => (
            <PerfumeTile perfume={p} key={p.id} />
          ))}
        </div>

        {viewMoreLink && perfumes.length > 4 && (
          <div style={{ marginTop: '2rem', textAlign: 'center' }}>
            <Link
              href={viewMoreLink}
              style={{
                display: 'inline-block',
                padding: '0.75rem 2rem',
                background: 'transparent',
                border: '2px solid #d4af37',
                borderRadius: '8px',
                color: '#2a1d12',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.2s ease',
                fontSize: '0.9rem',
                letterSpacing: '0.02em'
              }}
              onMouseEnter={(e) => {
                (e.target as HTMLElement).style.background = '#d4af37';
                (e.target as HTMLElement).style.color = '#2a1d12';
              }}
              onMouseLeave={(e) => {
                (e.target as HTMLElement).style.background = 'transparent';
                (e.target as HTMLElement).style.color = '#2a1d12';
              }}
            >
              Alle ansehen →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
