'use client';

import { useEffect, useState, type ReactNode } from 'react';

// Fixierte Kauf-Leiste fürs Handy: erscheint erst, wenn die Kauf-Buttons
// oben aus dem Bild gescrollt sind – so verdeckt sie nie den Inhalt darunter.
export function StickyBuyBar({ targetId, children }: { targetId: string; children: ReactNode }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(([entry]) => {
      setShow(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    io.observe(el);
    return () => io.disconnect();
  }, [targetId]);

  return <div className={`dp-sticky${show ? ' is-shown' : ''}`}>{children}</div>;
}
