'use client';

import { DetektivAnswers } from '@/lib/duft-detektiv-storage';

interface QuestionProps {
  answers: DetektivAnswers;
  handleAnswer: (key: keyof DetektivAnswers, value: any) => void;
}

export default function Question12Description({ answers, handleAnswer }: QuestionProps) {
  return (
    <div style={{ marginBottom: '3rem' }}>
      <h2 style={{
        fontSize: 'clamp(20px, 4vw, 28px)',
        fontFamily: "'Playfair Display', serif",
        fontWeight: 700,
        color: '#2a1d12',
        marginBottom: '2.5rem', lineHeight: 1.3,
      }}>
        Beschreib den Duft – welche Noten oder Eindrücke magst du? (Optional)
      </h2>

      <textarea
        value={answers.description}
        onChange={(e) => handleAnswer('description', e.target.value)}
        placeholder="z. B. frisch, zitronig, vanillig, würzig, holzig, blumig, süßlich..."
        style={{
          width: '100%',
          minHeight: '120px',
          padding: '12px 16px',
          borderRadius: '16px',
          border: '1px solid #e8dcc8',
          fontSize: '16px',
          fontFamily: 'inherit',
          backgroundColor: '#ffffff',
          color: '#2a1d12',
          resize: 'vertical',
          boxSizing: 'border-box',
        }}
      />

      <p style={{
        fontSize: '13px',
        color: '#6b5a4e',
        marginTop: '0.75rem',
        margin: '0.75rem 0 0 0',
      }}>
        Je genauer deine Beschreibung, desto bessere Vorschläge bekommen wir.
      </p>
    </div>
  );
}
