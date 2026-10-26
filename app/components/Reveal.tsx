'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

// Blendet Inhalte sanft ein, sobald sie ins Bild scrollen. Ohne JavaScript
// oder bei „Bewegung reduzieren" ist alles sofort sichtbar (siehe CSS).
export function Reveal({
  children,
  className = '',
  as: Tag = 'div'
}: {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'section';
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          io.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      className={`reveal${visible ? ' is-visible' : ''}${className ? ` ${className}` : ''}`}
    >
      {children}
    </Tag>
  );
}
