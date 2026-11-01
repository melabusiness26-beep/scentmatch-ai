import { Metadata } from 'next';
import QuizContainer from '@/app/QuizContainer';
import { getPerfumes } from '@/lib/perfumes';

// Stündlich neu erzeugen: neue Düfte erscheinen ohne neues Deployment im Quiz.
export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'Duft-Quiz – Finde deinen Signature-Duft',
  description: 'Beantworte 10 kurze Fragen und finde Düfte, die zu dir passen – abgestimmt auf Vorlieben, Saison, Budget und Anlass.',
  alternates: { canonical: '/quiz' },
  openGraph: {
      images: ['/opengraph-image'],
    title: 'Duft-Quiz – Finde deinen Signature-Duft | Auressa',
    description: 'Beantworte 10 kurze Fragen und finde Düfte, die zu dir passen – abgestimmt auf Vorlieben, Saison, Budget und Anlass.',
    type: 'website',
  },
};

export default async function QuizPage() {
  // Düfte auf dem Server laden und schlank (ohne lange Beschreibungen) mitgeben.
  const perfumes = (await getPerfumes(2000)).map((p) => ({ ...p, description: null }));
  return (
    <main>
      {/* Hauptüberschrift für Google & Screenreader; das Quiz zeigt seine Fragen selbst. */}
      <h1 className="sr-only">Duft-Quiz: Finde deinen Duft</h1>
      <QuizContainer initialPerfumes={perfumes} />
    </main>
  );
}
