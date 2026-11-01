import type { MetadataRoute } from 'next';
import { getAllPerfumeSlugs, getAllBrandSlugs, getPerfumes, rankByMood, MOODS } from '@/lib/perfumes';
import { DESTINATIONS, rankByDestination } from '@/lib/destinations';
import { guides } from '@/lib/guides';
import { hasEnoughVariety } from '@/lib/versions';
import { GUIDE_DATES } from '@/lib/guide-dates';
import { versionPairs } from '@/lib/version-compare';
import { scentNotes } from '@/lib/notes-glossary';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://auressa.ch';

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [slugs, brandSlugs, perfumes] = await Promise.all([
    getAllPerfumeSlugs(),
    getAllBrandSlugs(),
    getPerfumes(2000),
  ]);

  const perfumeUrls: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${SITE_URL}/duft/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8
  }));

  const guideUrls: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${SITE_URL}/ratgeber/${guide.slug}`,
    // Echtes Änderungsdatum des Artikels (statt „heute"), siehe lib/guide-dates.ts
    lastModified: GUIDE_DATES[guide.slug] ? new Date(`${GUIDE_DATES[guide.slug].updated}T12:00:00Z`) : undefined,
    changeFrequency: 'monthly',
    priority: 0.7
  }));

  const noteUrls: MetadataRoute.Sitemap = scentNotes.map((note) => ({
    url: `${SITE_URL}/duftnoten/${note.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.6
  }));

  // Stimmungen und Reiseziele mit weniger als 3 passenden Düften sind (noch) auf
  // noindex gesetzt und gehören deshalb nicht in die Sitemap.
  const moodUrls: MetadataRoute.Sitemap = MOODS.filter((mood) => hasEnoughVariety(rankByMood(perfumes, mood, '', 30))).map((mood) => ({
    url: `${SITE_URL}/stimmungen/${mood.code}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7
  }));

  const destinationUrls: MetadataRoute.Sitemap = DESTINATIONS.filter((dest) => hasEnoughVariety(rankByDestination(perfumes, dest, '', 30))).map((dest) => ({
    url: `${SITE_URL}/reiseduefte/${dest.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.7
  }));

  const brandUrls: MetadataRoute.Sitemap = brandSlugs.map((slug) => ({
    url: `${SITE_URL}/marke/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.75
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1
    },
    {
      url: `${SITE_URL}/duefte`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9
    },
    {
      url: `${SITE_URL}/marke`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${SITE_URL}/beste-damenduefte`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85
    },
    {
      url: `${SITE_URL}/beste-herrenduefte`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.85
    },
    // Nur aufnehmen, wenn es Unisex-Düfte im Katalog gibt (sonst ist die Seite noindex).
    ...(perfumes.some((p) => p.gender === 'Unisex')
      ? [{ url: `${SITE_URL}/beste-unisex-duefte`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.8 }]
      : []),
    {
      url: `${SITE_URL}/beste-duefte-unter-100`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${SITE_URL}/dupes`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${SITE_URL}/stimmungen`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${SITE_URL}/reiseduefte`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${SITE_URL}/ratgeber`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7
    },
    {
      url: `${SITE_URL}/duftnoten`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6
    },
    {
      url: `${SITE_URL}/geschenk-finder`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${SITE_URL}/duft-finder`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${SITE_URL}/duft-detektiv`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: `${SITE_URL}/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: `${SITE_URL}/ueber-uns`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.4
    },
    // Impressum und Datenschutz sind bewusst noindex – deshalb nicht in der Sitemap.
    {
      url: `${SITE_URL}/quiz`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9
    },
    {
      url: `${SITE_URL}/saisonal`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: `${SITE_URL}/nische-mainstream`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6
    },
    {
      url: `${SITE_URL}/duftpersoenlichkeit`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6
    },
    {
      url: `${SITE_URL}/duftchemie-grundlagen`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6
    },
    {
      url: `${SITE_URL}/duftkollektion-minimal`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6
    },
    {
      url: `${SITE_URL}/duftnoten-guide`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6
    },
    {
      url: `${SITE_URL}/duftsammlung`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6
    },
    {
      url: `${SITE_URL}/duft-lagerung`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6
    },
    {
      url: `${SITE_URL}/duft-mythen`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.6
    },
    {
      url: `${SITE_URL}/wie-auressa-funktioniert`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5
    },
    {
      url: `${SITE_URL}/testing-und-transparenz`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5
    },
    ...moodUrls,
    ...destinationUrls,
    ...guideUrls,
    ...noteUrls,
    ...brandUrls,
    // Vergleichsseiten „X vs. Y" (automatisch aus den Versionen im Katalog)
    ...versionPairs(perfumes).map((p) => ({
      url: `${SITE_URL}/unterschied/${p.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7
    })),
    ...perfumeUrls
  ];
}
