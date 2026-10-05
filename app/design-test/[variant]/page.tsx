import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getPerfumes, getPerfumeCount, getBrandCount } from '@/lib/perfumes';
import DesignTestVariant from '@/app/components/DesignTestVariant';

export const metadata: Metadata = {
  robots: 'noindex, nofollow',
};

const VALID_VARIANTS = ['a', 'b', 'c'];
const HIGHLIGHT_SLUGS = ['baccarat-rouge-540', 'black-opium', 'tobacco-vanille', '1-million'];

export const generateStaticParams = () => {
  return VALID_VARIANTS.map((variant) => ({ variant }));
};

export default async function DesignTestPage({
  params,
}: {
  params: Promise<{ variant: string }>;
}) {
  const { variant } = await params;

  if (!VALID_VARIANTS.includes(variant)) {
    notFound();
  }

  let perfumes: Awaited<ReturnType<typeof getPerfumes>> = [];
  let catalogCount = 0;
  let brandCount = 0;
  let highlightPerfumes = [];

  try {
    const [count, brands] = await Promise.all([getPerfumeCount(), getBrandCount()]);
    catalogCount = count;
    brandCount = brands;

    perfumes = await getPerfumes(2000);

    highlightPerfumes = perfumes
      .filter((p) => HIGHLIGHT_SLUGS.includes(p.slug || ''))
      .slice(0, 4);

    if (highlightPerfumes.length < 4) {
      const topPerfumes = perfumes
        .sort((a, b) => (b.scentmatch_score || 0) - (a.scentmatch_score || 0))
        .slice(0, 6 - highlightPerfumes.length);
      highlightPerfumes = [...highlightPerfumes, ...topPerfumes];
    }
  } catch (error) {
    console.error('Failed to load design test data:', error);
  }

  return (
    <DesignTestVariant
      variant={variant as 'a' | 'b' | 'c'}
      initialCatalogCount={catalogCount}
      initialBrandCount={brandCount}
      initialHighlights={highlightPerfumes}
      allPerfumes={perfumes}
    />
  );
}
