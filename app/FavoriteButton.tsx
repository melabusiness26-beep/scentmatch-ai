'use client';

import { useFavorites } from '@/app/FavoritesContext';

export function FavoriteButton({ slug }: { slug: string | null | undefined }) {
  const { isFavorite, toggleFavorite } = useFavorites();

  if (!slug) return null;

  const favorite = isFavorite(slug);

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(slug);
      }}
      style={{
        position: 'absolute',
        top: '12px',
        right: '12px',
        background: favorite ? '#D4AF37' : 'rgba(255,255,255,0.8)',
        border: favorite ? 'none' : '1.5px solid rgba(212,175,55,0.3)',
        borderRadius: '50%',
        width: '38px',
        height: '38px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        fontSize: '18px',
        // Globale Button-Regeln (weisse Schrift, grosses Padding) hier aufheben
        color: favorite ? '#fff' : '#B8923A',
        padding: 0,
        lineHeight: 1,
        transition: 'all 0.25s ease',
        zIndex: 10,
        backdropFilter: 'blur(4px)',
      }}
      onMouseEnter={(e) => {
        const btn = e.currentTarget;
        btn.style.transform = 'scale(1.08)';
        btn.style.boxShadow = '0 8px 24px rgba(212,175,55,0.3)';
      }}
      onMouseLeave={(e) => {
        const btn = e.currentTarget;
        btn.style.transform = 'scale(1)';
        btn.style.boxShadow = favorite ? '0 4px 12px rgba(212,175,55,0.2)' : 'none';
      }}
      aria-label={favorite ? 'Aus Wunschliste entfernen' : 'Zur Wunschliste hinzufügen'}
      title={favorite ? 'Aus Wunschliste entfernen' : 'Zur Wunschliste hinzufügen'}
    >
      {favorite ? '♥' : '♡'}
    </button>
  );
}
