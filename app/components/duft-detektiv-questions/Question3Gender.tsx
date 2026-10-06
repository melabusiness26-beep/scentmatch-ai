'use client';

import { DetektivAnswers } from '@/lib/duft-detektiv-storage';

interface QuestionProps {
  answers: DetektivAnswers;
  handleAnswer: (key: keyof DetektivAnswers, value: any) => void;
}

export default function Question3Gender({ answers, handleAnswer }: QuestionProps) {
  const options: Array<{ value: any; label: string }> = [
    { value: 'woman', label: 'Für Frauen' },
    { value: 'man', label: 'Für Männer' },
    { value: 'unisex', label: 'Unisex' },
  ];

  return (
    <div style={{ marginBottom: '2rem' }}>
      <h2 style={{
        fontSize: '20px',
        fontFamily: "'Playfair Display', serif",
        fontWeight: 700,
        color: '#2a1d12',
        marginBottom: '1.5rem',
      }}>
        Für wen ist dieser Duft?
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {options.map(option => (
          <button
            key={option.value}
            onClick={() => handleAnswer('gender', option.value)}
            style={{
              padding: '1rem',
              borderRadius: '8px',
              border: answers.gender === option.value ? '2px solid #b08b4f' : '1px solid #e8dcc8',
              backgroundColor: answers.gender === option.value ? 'rgba(176, 139, 79, 0.08)' : '#ffffff',
              color: '#2a1d12',
              fontSize: '15px',
              fontWeight: 600,
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (answers.gender !== option.value) {
                e.currentTarget.style.backgroundColor = 'rgba(232, 220, 200, 0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (answers.gender !== option.value) {
                e.currentTarget.style.backgroundColor = '#ffffff';
              }
            }}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
}
