import CookieBanner from '@/app/CookieBanner';
import ConsentedAnalytics from '@/app/ConsentedAnalytics';
import SiteHeader from '@/app/SiteHeader';

export default function DuftDetektivLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteHeader />
      {children}
      <CookieBanner />
      <ConsentedAnalytics />
    </>
  );
}
