'use client';

import { Perfume } from '@/lib/perfumes';

interface SocialShareButtonsProps {
  perfume: Perfume;
  url: string;
}

export function SocialShareButtons({ perfume, url }: SocialShareButtonsProps) {
  const title = `${perfume.perfume_name}${perfume.brands?.name ? ` von ${perfume.brands.name}` : ''}`;
  const text = `Entdecke "${title}" auf Auressa – mit Bewertung, Noten & Affiliate-Links.`;
  const encodedUrl = encodeURIComponent(url);
  const encodedText = encodeURIComponent(text);

  return (
    <div style={{
      display: 'flex',
      gap: '0.75rem',
      marginTop: '1.5rem',
      alignItems: 'center',
      flexWrap: 'wrap'
    }}>
      <span style={{ fontSize: '0.85rem', color: '#8c7060', fontWeight: 600 }}>
        Teilen:
      </span>

      {/* WhatsApp */}
      <a
        href={`https://wa.me/?text=${encodedText}%20${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: '#25D366',
          color: '#fff',
          textDecoration: 'none',
          fontSize: '18px',
          transition: 'all 0.2s ease',
        }}
        title="Auf WhatsApp teilen"
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        💬
      </a>

      {/* Instagram */}
      <a
        href={`https://www.instagram.com/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
          color: '#fff',
          textDecoration: 'none',
          fontSize: '18px',
          transition: 'all 0.2s ease',
        }}
        title="Auf Instagram teilen"
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        📷
      </a>

      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: '#1877F2',
          color: '#fff',
          textDecoration: 'none',
          fontSize: '18px',
          transition: 'all 0.2s ease',
        }}
        title="Auf Facebook teilen"
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        👥
      </a>

      {/* Twitter/X */}
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: '#000',
          color: '#fff',
          textDecoration: 'none',
          fontSize: '18px',
          transition: 'all 0.2s ease',
        }}
        title="Auf X (Twitter) teilen"
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        𝕏
      </a>

      {/* Pinterest */}
      <a
        href={`https://pinterest.com/pin/create/button/?url=${encodedUrl}&description=${encodedText}`}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: '#E60023',
          color: '#fff',
          textDecoration: 'none',
          fontSize: '18px',
          transition: 'all 0.2s ease',
        }}
        title="Auf Pinterest speichern"
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        📌
      </a>

      {/* Copy Link */}
      <button
        onClick={() => {
          navigator.clipboard.writeText(url);
          alert('Link kopiert! 📋');
        }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: '#D4AF37',
          color: '#1F1410',
          border: 'none',
          textDecoration: 'none',
          fontSize: '18px',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
        }}
        title="Link kopieren"
        onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.1)')}
        onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
      >
        🔗
      </button>
    </div>
  );
}
