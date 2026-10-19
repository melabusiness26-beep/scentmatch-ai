'use client';

import NewsletterForm from '@/app/NewsletterForm';

export default function FooterNewsletter() {
  return (
    <div className="container footer-newsletter">
      <NewsletterForm source="footer" />
    </div>
  );
}
