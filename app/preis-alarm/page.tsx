import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Preis-Alarm',
  robots: { index: false, follow: true }
};

const TEXTS: Record<string, { title: string; text: string }> = {
  bestaetigt: {
    title: 'Dein Preis-Alarm ist aktiv 🔔',
    text: 'Sobald der Duft spürbar günstiger wird, bekommst du eine E-Mail von uns. In jeder E-Mail findest du einen Link, um den Alarm wieder abzustellen.'
  },
  abgemeldet: {
    title: 'Preis-Alarm abgestellt',
    text: 'Du bekommst für diesen Duft keine Preis-Alarme mehr. Du kannst ihn auf der Duft-Seite jederzeit wieder einschalten.'
  },
  ungueltig: {
    title: 'Dieser Link funktioniert leider nicht',
    text: 'Vielleicht wurde er schon benutzt oder beim Kopieren abgeschnitten. Trag dich auf der Duft-Seite einfach nochmals ein.'
  }
};

export default async function PriceAlertStatusPage({ searchParams }: { searchParams: Promise<{ status?: string }> }) {
  const { status } = await searchParams;
  const t = TEXTS[status || ''] || TEXTS.ungueltig;
  return (
    <main className="container" style={{ padding: '60px 16px', maxWidth: 640 }}>
      <section className="dp-card">
        <p className="dp-kicker">Preis-Alarm</p>
        <h1 style={{ fontFamily: 'var(--font-display), Georgia, serif', fontSize: 'clamp(28px, 5vw, 40px)', margin: '6px 0 12px' }}>{t.title}</h1>
        <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--ink-700)', margin: '0 0 20px' }}>{t.text}</p>
        <div className="cta">
          <Link className="button" href="/duefte">Düfte entdecken</Link>
          <Link className="button secondary" href="/quiz">Duft-Quiz</Link>
        </div>
      </section>
    </main>
  );
}
