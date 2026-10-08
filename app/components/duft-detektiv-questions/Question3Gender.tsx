'use client';

import { DetektivAnswers } from '@/lib/duft-detektiv-storage';

interface QuestionProps {
  answers: DetektivAnswers;
  handleAnswer: (key: keyof DetektivAnswers, value: any) => void;
}

export default function Question3Gender({ answers, handleAnswer }: QuestionProps) {
  const options: Array<{ value: any; label: string; description: string }> = [
    { value: 'self_woman', label: 'Für mich – eine Frau', description: 'Ich selbst bin weiblich' },
    { value: 'self_man', label: 'Für mich – einen Mann', description: 'Ich selbst bin männlich' },
    { value: 'gift_woman', label: 'Für jemand anderen – eine Frau', description: 'Als Geschenk für eine Frau' },
    { value: 'gift_man', label: 'Für jemand anderen – einen Mann', description: 'Als Geschenk für einen Mann' },
    { value: 'unisex', label: 'Unisex, egal', description: 'Egal wer ihn trägt' },
    { value: 'unknown', label: 'Ich weiss es nicht', description: 'Diese Info wird übersprungen' },
  ];

  return (
    <div style={{ marginBottom: '3rem' }}>
      <h2 style={{
        fontSize: 'clamp(20px, 4vw, 28px)',
        fontFamily: "'Playfair Display', serif",
        fontWeight: 700,
        color: '#2a1d12',
        marginBottom: '2.5rem',
        lineHeight: 1.3,
      }}>
        Für wen suchst du den Duft?
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer('gender', option.value)}
            style={{
              padding: '1.25rem 1.5rem',
              borderRadius: option.value === 'unknown' ? '12px' : '16px',
              border: answers.gender === option.value
                ? '2px solid #b08b4f'
                : option.value === 'unknown'
                  ? '2px dashed #d4c4b8'
                  : '1px solid #e8dcc8',
              backgroundColor: answers.gender === option.value
                ? 'rgba(176, 139, 79, 0.12)'
                : option.value === 'unknown'
                  ? 'rgba(232, 220, 200, 0.04)'
                  : '#ffffff',
              color: '#2a1d12',
              fontSize: '16px',
              fontWeight: 600,
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              if (answers.gender !== option.value) {
                e.currentTarget.style.backgroundColor = 'rgba(232, 220, 200, 0.1)';
                e.currentTarget.style.borderColor = 'rgba(176, 139, 79, 0.3)';
              }
            }}
            onMouseLeave={(e) => {
              if (answers.gender !== option.value) {
                e.currentTarget.style.backgroundColor = option.value === 'unknown' ? 'rgba(232, 220, 200, 0.04)' : '#ffffff';
                e.currentTarget.style.borderColor = option.value === 'unknown' ? '#d4c4b8' : '#e8dcc8';
              }
            }}
          >
            <div style={{ marginBottom: '0.5rem' }}>
              {option.label}
            </div>
            <div style={{ fontSize: '13px', color: '#6b5a4e', fontWeight: 400 }}>
              {option.description}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
