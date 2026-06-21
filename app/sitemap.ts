import type { MetadataRoute } from 'next';
import { getAllPerfumeSlugs } from '@/lib/perfumes';
import { guides } from '@/lib/guides';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://scentmatch-ai.vercel.app';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllPerfumeSlugs();

  const perfumeUrls: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${SITE_URL}/duft/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8
  }));

  const guideUrls: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${SITE_URL}/ratgeber/${guide.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1
    },
    {
      url: `${SITE_URL}/ratgeber`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7
    },
    ...guideUrls,
    ...perfumeUrls
  ];
}
