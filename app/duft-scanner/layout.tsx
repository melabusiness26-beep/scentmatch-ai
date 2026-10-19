import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <style>{`.footer-newsletter { display: none !important; }`}</style>
      {children}
    </>
  );
}
