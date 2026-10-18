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
        gap: '1rem',
        background: isHovered
          ? 'linear-gradient(135deg, rgba(253,251,248,0.98), rgba(243,239,233,0.98))'
          : 'rgba(253,251,248,0.92)',
        border: '2px solid ' + (isHovered ? 'rgba(212,175,55,0.4)' : 'rgba(212,175,55,0.18)'),
        borderRadius: '18px',
        padding: '2rem',
        textDecoration: 'none',
        color: 'inherit',
        boxShadow: isHovered
          ? '0 30px 80px rgba(32,24,16,0.18), inset 0 1px 0 rgba(255,255,255,0.8)'
          : '0 8px 24px rgba(32,24,16,0.06)',
        transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
        cursor: 'pointer',
        transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
        backdropFilter: 'blur(4px)',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Premium Background Glow */}
      {isHovered && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'radial-gradient(circle at 30% 50%, rgba(212,175,55,0.08), transparent 50%)',
            pointerEvents: 'none',
          }}
        />
      )}

      <span
        style={{
          fontSize: '2.2rem',
          lineHeight: 1,
          transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isHovered ? 'scale(1.15) rotate(5deg)' : 'scale(1) rotate(0deg)',
          display: 'inline-block',
          width: 'fit-content',
        }}
      >
        {emoji ?? '📖'}
      </span>

      <h3 style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: '1.1rem',
        fontWeight: 700,
        margin: 0,
        lineHeight: 1.35,
        letterSpacing: '-0.01em',
        transition: 'color 0.3s ease',
        color: isHovered ? '#D4AF37' : '#1F1410',
      }}>
        {guide.title}
      </h3>

      <p style={{
        fontSize: '0.9rem',
        lineHeight: 1.6,
        margin: '0 0 auto 0',
        transition: 'color 0.3s ease',
        color: isHovered ? '#5d4b40' : '#6b5344',
      }}>
        {guide.description}
      </p>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        fontSize: '0.75rem',
        fontWeight: 700,
        color: '#D4AF37',
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        marginTop: '0.8rem',
        transition: 'all 0.3s ease',
        opacity: isHovered ? 1 : 0.8,
        transform: isHovered ? 'translateX(4px)' : 'translateX(0)',
      }}>
        <span>Lesen mehr</span>
        <span style={{
          fontSize: '1.2rem',
          lineHeight: 1,
          transition: 'transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isHovered ? 'translateX(6px)' : 'translateX(0)',
        }}>
          →
        </span>
      </div>
    </Link>
  );
}
