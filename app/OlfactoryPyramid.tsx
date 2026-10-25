'use client';

import type { Perfume } from '@/lib/perfumes';

export function OlfactoryPyramide({ perfume }: { perfume: Perfume }) {
  const hasAnyNotes = (perfume.top_notes?.length ?? 0) > 0 ||
                      (perfume.heart_notes?.length ?? 0) > 0 ||
                      (perfume.base_notes?.length ?? 0) > 0;

  if (!hasAnyNotes) return null;

  const NotePill = ({ note, color }: { note: string; color: string }) => (
    <span style={{
      display: 'inline-block',
      background: color,
      padding: '8px 14px',
      borderRadius: '8px',
      fontSize: '14px',
      fontWeight: '600',
      color: '#1F1410',
      border: '1px solid rgba(212,175,55,0.2)',
    }}>
      {note}
    </span>
  );

  return (
    <div style={{ marginTop: '0', padding: '0' }}>
      <h2 style={{
        fontSize: 'clamp(28px, 4.5vw, 40px)',
        fontWeight: 700,
        fontFamily: "'Playfair Display', serif",
        color: '#1F1410',
        margin: '0 0 48px 0',
        letterSpacing: '-0.015em',
        textAlign: 'center',
      }}>
        👃 Die Duftpyramide
      </h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '24px',
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        {/* KOPFNOTEN */}
        {perfume.top_notes && perfume.top_notes.length > 0 && (
          <div style={{
            background: 'linear-gradient(135deg, #FFF5E6, #FFEAD0)',
            padding: '28px 20px',
            borderRadius: '14px',
            border: '2px solid #FFD89B',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>⚡</div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#D4AF37', marginBottom: '6px', margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Kopfnoten</h3>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '14px', margin: '0 0 14px 0' }}>0–15 Min</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
              {perfume.top_notes.map((note) => (
                <NotePill key={note} note={note} color='rgba(212,175,55,0.15)' />
              ))}
            </div>
          </div>
        )}

        {/* HERZNOTEN */}
        {perfume.heart_notes && perfume.heart_notes.length > 0 && (
          <div style={{
            background: 'linear-gradient(135deg, #F0E6FF, #E8D4FF)',
            padding: '28px 20px',
            borderRadius: '14px',
            border: '2px solid #D9C2FF',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>💜</div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#9966FF', marginBottom: '6px', margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Herznoten</h3>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '14px', margin: '0 0 14px 0' }}>15 Min – 2 Std</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
              {perfume.heart_notes.map((note) => (
                <NotePill key={note} note={note} color='rgba(153,102,255,0.15)' />
              ))}
            </div>
          </div>
        )}

        {/* BASISNOTEN */}
        {perfume.base_notes && perfume.base_notes.length > 0 && (
          <div style={{
            background: 'linear-gradient(135deg, #E6D7C3, #D4BEA8)',
            padding: '28px 20px',
            borderRadius: '14px',
            border: '2px solid #BFA58F',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '32px', marginBottom: '12px' }}>🌳</div>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#8B6F47', marginBottom: '6px', margin: '0 0 12px 0', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Basisnoten</h3>
            <p style={{ fontSize: '12px', color: '#666', marginBottom: '14px', margin: '0 0 14px 0' }}>2+ Stunden</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', justifyContent: 'center' }}>
              {perfume.base_notes.map((note) => (
                <NotePill key={note} note={note} color='rgba(139,111,71,0.15)' />
              ))}
            </div>
          </div>
        )}
      </div>

      <p style={{
        marginTop: '32px',
        fontSize: '14px',
        color: '#666',
        textAlign: 'center',
        fontStyle: 'italic',
      }}>
        ✨ Die Duftpyramide zeigt, wie sich der Duft entwickelt: schnelle Kopfnoten, mittlere Herznoten und lange anhaltende Basisnoten.
      </p>
    </div>
  );
}
