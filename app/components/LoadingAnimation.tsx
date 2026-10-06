'use client';

export default function LoadingAnimation() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '400px',
      gap: '2rem',
    }}>
      <div style={{
        position: 'relative',
        width: '60px',
        height: '60px',
      }}>
        <div style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          border: '3px solid rgba(176, 139, 79, 0.2)',
          borderTop: '3px solid #b08b4f',
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
        }} />
      </div>

      <div style={{ textAlign: 'center' }}>
        <h3 style={{
          fontSize: '18px',
          fontFamily: "'Playfair Display', serif",
          fontWeight: 700,
          color: '#2a1d12',
          marginBottom: '0.5rem',
        }}>
          Auf der Suche nach deinem Duft...
        </h3>
        <p style={{
          fontSize: '14px',
          color: '#6b5a4e',
          margin: 0,
        }}>
          Wir analysieren deine Antworten und finden die besten Treffer.
        </p>
      </div>

      <style>{`
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
