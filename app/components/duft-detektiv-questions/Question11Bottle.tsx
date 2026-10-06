'use client';

import { DetektivAnswers } from '@/lib/duft-detektiv-storage';

interface QuestionProps {
  answers: DetektivAnswers;
  handleAnswer: (key: keyof DetektivAnswers, value: any) => void;
}

export default function Question11Bottle({ answers, handleAnswer }: QuestionProps) {
  const options: Array<{ value: any; label: string; description: string }> = [
    { value: 'dark', label: 'Dunkel oder schwarz', description: 'Geheimnisvoll, edel' },
    { value: 'light', label: 'Hell oder transparent', description: 'Modern, minimalistisch' },
    { value: 'gold', label: 'Gold oder luxuriös', description: 'Glamourös, auffällig' },
    { value: 'small', label: 'Klein und kompakt', description: 'Praktisch, tragbar' },
    { value: 'large', label: 'Gross und auffällig', description: 'Statement-Piece' },
    { value: 'unknown', label: 'Ich weiss es nicht', description: 'Diese Info wird übersprungen' },
  ];

  return (
    <div style={{ marginBottom: '3rem' }}>
      <h2 style={{
        fontSize: 'clamp(20px, 4vw, 28px)',
        fontFamily: "'Playfair Display', serif",
        fontWeight: 700,
        color: '#2a1d12',
        marginBottom: '2.5rem', lineHeight: 1.3,
      }}>
        Wie sah die Flasche aus? (Optional)
      </h2>

      <p style={{
        fontSize: '14px',
        color: '#6b5a4e',
        marginBottom: '1rem',
      }}>
        Wähle eine Option – oder gib unten noch mehr Details:
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {options.map(option => (
          <button
            key={option.value}
            onClick={() => handleAnswer('bottle', option.value)}
            style={{
              padding: '1.25rem 1.5rem',
              borderRadius: '16px',
              border: answers.bottle === option.value ? '2px solid #b08b4f' : '1px solid #e8dcc8',
              backgroundColor: answers.bottle === option.value ? 'rgba(176, 139, 79, 0.08)' : '#ffffff',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (answers.bottle !== option.value) {
                e.currentTarget.style.backgroundColor = 'rgba(232, 220, 200, 0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (answers.bottle !== option.value) {
                e.currentTarget.style.backgroundColor = '#ffffff';
              }
            }}
          >
            <div style={{ fontWeight: 600, color: '#2a1d12', marginBottom: '0.25rem' }}>
              {option.label}
            </div>
            <div style={{ fontSize: '13px', color: '#6b5a4e' }}>
              {option.description}
            </div>
          </button>
        ))}
      </div>

      <div style={{ marginTop: '1rem' }}>
        <textarea
          value={answers.description}
          onChange={(e) => handleAnswer('description', e.target.value)}
          placeholder="z. B. ovale Flasche mit Leder, rechteckig mit goldenen Details, runde Flasche mit Schnörkel..."
          style={{
            width: '100%',
            minHeight: '80px',
            padding: '12px 16px',
            borderRadius: '16px',
            border: '1px solid #e8dcc8',
            fontSize: '14px',
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
          marginTop: '0.5rem',
          margin: '0.5rem 0 0 0',
        }}>
          Weitere Details helfen uns, den exakten Duft zu finden.
        </p>
      </div>
    </div>
  );
}
