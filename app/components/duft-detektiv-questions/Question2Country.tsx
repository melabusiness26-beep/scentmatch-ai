'use client';

import { DetektivAnswers } from '@/lib/duft-detektiv-storage';

interface QuestionProps {
  answers: DetektivAnswers;
  handleAnswer: (key: keyof DetektivAnswers, value: any) => void;
}

export default function Question2Country({ answers, handleAnswer }: QuestionProps) {
  return (
    <div style={{ marginBottom: '3rem' }}>
      <h2 style={{
        fontSize: 'clamp(20px, 4vw, 28px)',
        fontFamily: "'Playfair Display', serif",
        fontWeight: 700,
        color: '#2a1d12',
        marginBottom: '2.5rem', lineHeight: 1.3,
      }}>
        In welchem Land oder welcher Stadt hast du ihn gerochen? (Optional)
      </h2>

      <input
        type="text"
        value={answers.country}
        onChange={(e) => handleAnswer('country', e.target.value)}
        placeholder="z. B. Dubai, Paris, Zürich, New York, Türkei..."
        style={{
          width: '100%',
          padding: '12px 16px',
          borderRadius: '16px',
          border: '1px solid #e8dcc8',
          fontSize: '16px',
          fontFamily: 'inherit',
          backgroundColor: '#ffffff',
          color: '#2a1d12',
          boxSizing: 'border-box',
        }}
      />

      <p style={{
        fontSize: '13px',
        color: '#6b5a4e',
        marginTop: '0.75rem',
        margin: '0.75rem 0 0 0',
      }}>
        Dies hilft, wenn du einen französischen oder arabischen Duft magst.
      </p>
    </div>
  );
}
