import { Metadata } from 'next';
import QuizContainer from '@/app/QuizContainer';

export const metadata: Metadata = {
  title: 'Duft-Quiz - Finde deinen Signature Duft | Auressa',
  description: 'Beantworte 10 einfache Fragen und finde deinen perfekten Duft. Unser intelligentes Matching-System berücksichtigt deine Vorlieben, Saison, Budget und Anlass.',
  openGraph: {
    title: 'Duft-Quiz - Finde deinen Signature Duft | Auressa',
    description: 'Beantworte 10 einfache Fragen und finde deinen perfekten Duft. Unser intelligentes Matching-System berücksichtigt deine Vorlieben, Saison, Budget und Anlass.',
    type: 'website',
  },
};

export default function QuizPage() {
  return (
    <main>
      <QuizContainer />
    </main>
  );
}
