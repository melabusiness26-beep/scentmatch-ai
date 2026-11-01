'use client';

// Letzte Sicherung, falls sogar das Grundgerüst der Seite nicht lädt.
// Bewusst ohne gemeinsame Komponenten und mit eigenem <html>/<body>.
export default function GlobalError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <html lang="de-CH">
      <body style={{ margin: 0, fontFamily: 'Arial, sans-serif', background: '#FBF8F3', color: '#1F1612' }}>
        <main style={{ maxWidth: 560, margin: '0 auto', padding: '5rem 1.25rem', textAlign: 'center' }}>
          <p style={{ letterSpacing: '.2em', textTransform: 'uppercase', fontSize: 12, color: '#8A6D1A', fontWeight: 700 }}>Auressa</p>
          <h1 style={{ fontSize: 32, margin: '0 0 1rem' }}>Da ist etwas schiefgegangen.</h1>
          <p style={{ fontSize: 17, lineHeight: 1.6, marginBottom: '2rem' }}>
            Die Seite konnte gerade nicht geladen werden. Bitte versuche es gleich noch einmal.
          </p>
          <button
            type="button"
            onClick={() => reset()}
            style={{ background: '#1F1612', color: '#fff', border: 0, borderRadius: 999, padding: '14px 28px', fontSize: 16, fontWeight: 600, cursor: 'pointer', minHeight: 44 }}
          >
            Nochmals versuchen
          </button>
          <p style={{ marginTop: '1.5rem' }}>
            <a href="/" style={{ color: '#8A6D1A' }}>Zur Startseite</a>
          </p>
        </main>
      </body>
    </html>
  );
}
