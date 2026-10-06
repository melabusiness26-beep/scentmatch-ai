'use client';

import { DetektivAnswers } from '@/lib/duft-detektiv-storage';

interface QuestionProps {
  answers: DetektivAnswers;
  handleAnswer: (key: keyof DetektivAnswers, value: any) => void;
}

export default function Question5Timing({ answers, handleAnswer }: QuestionProps) {
  const options: Array<{ value: any; label: string; description: string }> = [
    { value: '<1year', label: 'Vor weniger als einer Woche', description: 'Noch ganz frisch in Erinnerung' },
    { value: '1-5years', label: 'Vor 1–6 Monaten', description: 'Immer noch präsent im Gedächtnis' },
    { value: '1-5years', label: 'Vor 1–3 Jahren', description: 'Schöne alte Erinnerung' },
    { value: '>5years', label: 'Vor mehr als 3 Jahren', description: 'Wie ein fernes Abenteuer' },
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
        Wann hast du diesen Duft zuletzt gerochen?
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        {options.map(option => (
          <button
            key={option.value}
            onClick={() => handleAnswer('timing', option.value)}
            style={{
              padding: '1rem',
              borderRadius: '8px',
              border: answers.timing === option.value ? '2px solid #b08b4f' : '1px solid #e8dcc8',
              backgroundColor: answers.timing === option.value ? 'rgba(176, 139, 79, 0.08)' : '#ffffff',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (answers.timing !== option.value) {
                e.currentTarget.style.backgroundColor = 'rgba(232, 220, 200, 0.1)';
              }
            }}
            onMouseLeave={(e) => {
              if (answers.timing !== option.value) {
                e.currentTarget.style.backgroundColor = '#ffffff';
              }
            }}
          >
            <div style={{ fontWeight: 600, color: '#2a1d12', marginBottom: '0.25rem' }}>
              {option.label}
            </div>
            <div style={{ fontSize: '12px', color: '#6b5a4e' }}>
              {option.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
