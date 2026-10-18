'use client';

import Link from 'next/link';
import { useState } from 'react';
import type { Guide } from '@/lib/guides';

export default function GuideTile({ guide, emoji }: { guide: Guide; emoji?: string }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href={`/ratgeber/${guide.slug}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.7rem',
        background: 'rgba(253,251,248,0.92)',
        border: '1.5px solid rgba(212,175,55,0.20)',
        borderRadius: '14px',
        padding: '1.5rem',
        textDecoration: 'none',
        color: 'inherit',
        boxShadow: isHovered ? '0 20px 50px rgba(32,24,16,0.12)' : '0 8px 24px rgba(32,24,16,0.06)',
        transform: isHovered ? 'translateY(-4px)' : 'translateY(0)',
        borderColor: isHovered ? 'rgba(212,175,55,0.35)' : 'rgba(212,175,55,0.20)',
        transition: 'all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1)',
        cursor: 'pointer',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span style={{ fontSize: '1.6rem', lineHeight: 1 }}>{emoji ?? '📖'}</span>
      <h3 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '0.95rem',
        fontWeight: 700,
        color: '#1F1410',
        margin: 0,
        lineHeight: 1.35,
      }}>{guide.title}</h3>
      <p style={{
        fontSize: '0.8rem',
        color: '#6b5344',
        lineHeight: 1.55,
        margin: '0 0 auto 0',
      }}>{guide.description}</p>
      <span style={{
        fontSize: '0.72rem',
        fontWeight: 700,
        color: '#D4AF37',
        letterSpacing: '0.04em',
        textTransform: 'uppercase',
        marginTop: '0.5rem',
      }}>Lesen →</span>
    </Link>
  );
}
