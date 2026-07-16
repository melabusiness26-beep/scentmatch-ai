'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TYP_QUESTIONS, evaluateTyp } from '@/lib/dufttyp';

// Der eigentliche Persönlichkeitstest: 7 Fragen, am Ende geht es direkt zur
// Ergebnis-Seite des ermittelten Dufttyps (/dufttyp/[slug]) – die ist teilbar
// und zeigt die passenden Düfte.
export default function DufttypQuiz() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<Partial<Record<string, number>>[]>([]);
  const [finished, setFinished] = useState(false);

  const question = TYP_QUESTIONS[step];

  function answer(points: Partial<Record<string, number>>) {
    const next = [...picked, points];
    if (step + 1 < TYP_QUESTIONS.length) {
      setPicked(next);
      setStep(step + 1);
      return;
    }
    // Letzte Frage beantwortet: Gewinner ermitteln und zur Ergebnis-Seite.
    setFinished(true);
    const winner = evaluateTyp(next);
    router.push(`/dufttyp/${winner.code}`);
  }

  function goBack() {
    if (step === 0) return;
    setPicked(picked.slice(0, -1));
    setStep(step - 1);
  }

  return (
    <section id="test" className="section card quiz">
      <p className="eyebrow">Dufttyp-Test</p>
      {finished ? (
        <div className="result">
          <h2>Dein Ergebnis wird geladen …</h2>
          <p className="small">Einen kleinen Moment – wir stellen deinen Dufttyp zusammen.</p>
        </div>
      ) : (
        <>
          <p className="small">Frage {step + 1} von {TYP_QUESTIONS.length}</p>
          <div className="scorebar quiz-progress">
            <span style={{ width: `${(step / TYP_QUESTIONS.length) * 100}%` }} />
          </div>
          <div className="quiz-step" key={step}>
            <div className="question">{question.q}</div>
            <div className="answers">
              {question.answers.map((a) => (
                <button className="answer" key={a.label} onClick={() => answer(a.points)}>
                  {a.label}
                </button>
              ))}
            </div>
          </div>
          {step > 0 && (
            <button className="quiz-back" onClick={goBack}>← Zurück</button>
          )}
        </>
      )}
    </section>
  );
}
