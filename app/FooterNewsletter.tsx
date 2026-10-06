'use client';

import { usePathname } from 'next/navigation';
import NewsletterForm from '@/app/NewsletterForm';

export default function FooterNewsletter() {
  const pathname = usePathname();

  if (pathname.startsWith('/duft-detektiv')) {
    return null;
  }

  return (
    <div className="container footer-newsletter">
      <NewsletterForm source="footer" />
    </div>
  );
}
