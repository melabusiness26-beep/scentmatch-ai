import { MetadataRoute } from 'next';
import { getAllGuides } from '@/lib/guides';
import { getPerfumes } from '@/lib/perfumes';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const guides = getAllGuides();
  const perfumes = await getPerfumes();

  const guideUrls: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${SITE_URL}/ratgeber/${guide.slug}`,
    lastModified: new Date(guide.publishedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const perfumeUrls: MetadataRoute.Sitemap = perfumes.map((perfume) => ({
    url: `${SITE_URL}/duft/${perfume.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const staticUrls: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${SITE_URL}/duefte`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/ratgeber`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/datenschutz`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${SITE_URL}/impressum`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
  ];

  return [...staticUrls, ...guideUrls, ...perfumeUrls];
}
