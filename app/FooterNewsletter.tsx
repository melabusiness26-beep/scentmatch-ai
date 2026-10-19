'use client';

import { usePathname } from 'next/navigation';
import NewsletterForm from '@/app/NewsletterForm';
import { useEffect, useState } from 'react';

export default function FooterNewsletter() {
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (isMounted && pathname?.startsWith('/duft-detektiv')) {
    return null;
  }

  if (!isMounted) {
    return (
      <div className="container footer-newsletter">
        <NewsletterForm source="footer" />
      </div>
    );
  }

  return (
    <div className="container footer-newsletter">
      <NewsletterForm source="footer" />
    </div>
  );
}
