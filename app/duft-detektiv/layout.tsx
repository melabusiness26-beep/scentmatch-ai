import CookieBanner from '@/app/CookieBanner';
import ConsentedAnalytics from '@/app/ConsentedAnalytics';

export default function DuftDetektivLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <style>{`
        /* Hide footer newsletter on Duft-Detektiv route */
        .footer-newsletter {
          display: none !important;
        }
      `}</style>
      {children}
      <CookieBanner />
      <ConsentedAnalytics />
    </>
  );
}
