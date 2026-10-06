'use client';

import { DetektivAnswers } from '@/lib/duft-detektiv-storage';

interface QuestionProps {
  answers: DetektivAnswers;
  handleAnswer: (key: keyof DetektivAnswers, value: any) => void;
}

export default function Question3Gender({ answers, handleAnswer }: QuestionProps) {
  const options: Array<{ value: any; label: string; description: string }> = [
    { value: 'woman', label: 'Für mich – eine Frau', description: 'Ich selbst bin weiblich' },
    { value: 'man', label: 'Für mich – einen Mann', description: 'Ich selbst bin männlich' },
    { value: 'woman', label: 'Für jemand anderen – eine Frau', description: 'Als Geschenk für eine Frau' },
    { value: 'man', label: 'Für jemand anderen – einen Mann', description: 'Als Geschenk für einen Mann' },
    { value: 'unisex', label: 'Unisex, egal', description: 'Egal wer ihn trägt' },
    { value: 'unknown', label: 'Ich weiss es nicht', description: 'Diese Info wird übersprungen' },
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
        Für wen suchst du den Duft?
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
