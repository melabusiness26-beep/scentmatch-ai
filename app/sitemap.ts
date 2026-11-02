import type { MetadataRoute } from 'next';
import { getAllPerfumeSlugs, getAllBrandSlugs, getPerfumes, rankByMood, MOODS } from '@/lib/perfumes';
import { DESTINATIONS, rankByDestination } from '@/lib/destinations';
import { guides } from '@/lib/guides';
import { hasEnoughVariety } from '@/lib/versions';
import { GUIDE_DATES } from '@/lib/guide-dates';
import { versionPairs } from '@/lib/version-compare';
import { scentNotes } from '@/lib/notes-glossary';
import { FLAVORS, flavorIndexable, perfumesForFlavor } from '@/lib/flavors';

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
    changeFrequency: 'monthly',
    priority: 0.6
  }));

  // Stimmungen und Reiseziele mit weniger als 3 passenden Düften sind (noch) auf
  // noindex gesetzt und gehören deshalb nicht in die Sitemap.
  const moodUrls: MetadataRoute.Sitemap = MOODS.filter((mood) => hasEnoughVariety(rankByMood(perfumes, mood, '', 30))).map((mood) => ({
    url: `${SITE_URL}/stimmungen/${mood.code}`,
    changeFrequency: 'weekly',
    priority: 0.7
  }));

  const destinationUrls: MetadataRoute.Sitemap = DESTINATIONS.filter((dest) => hasEnoughVariety(rankByDestination(perfumes, dest, '', 30))).map((dest) => ({
    url: `${SITE_URL}/reiseduefte/${dest.slug}`,
    changeFrequency: 'weekly',
    priority: 0.7
  }));

  // Geschmacks-Seiten erst ab 3 verschiedenen Düften (sonst noindex, siehe lib/flavors.ts).
  const flavorUrls: MetadataRoute.Sitemap = FLAVORS.filter((f) => flavorIndexable(perfumesForFlavor(perfumes, f))).map((f) => ({
    url: `${SITE_URL}/geschmack/${f.slug}`,
    changeFrequency: 'weekly',
    priority: 0.7
  }));

  const brandUrls: MetadataRoute.Sitemap = brandSlugs.map((slug) => ({
    url: `${SITE_URL}/marke/${slug}`,
    changeFrequency: 'weekly',
    priority: 0.75
  }));

  return [
    {
      url: SITE_URL,
      changeFrequency: 'daily',
      priority: 1
    },
    {
      url: `${SITE_URL}/duefte`,
      changeFrequency: 'daily',
      priority: 0.9
    },
    {
      url: `${SITE_URL}/marke`,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${SITE_URL}/beste-damenduefte`,
      changeFrequency: 'weekly',
      priority: 0.85
    },
    {
      url: `${SITE_URL}/beste-herrenduefte`,
      changeFrequency: 'weekly',
      priority: 0.85
    },
    // Nur aufnehmen, wenn es Unisex-Düfte im Katalog gibt (sonst ist die Seite noindex).
    ...(perfumes.some((p) => p.gender === 'Unisex')
      ? [{ url: `${SITE_URL}/beste-unisex-duefte`, changeFrequency: 'weekly' as const, priority: 0.8 }]
      : []),
    {
      url: `${SITE_URL}/beste-duefte-unter-100`,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${SITE_URL}/dupes`,
      changeFrequency: 'weekly',
      priority: 0.9
    },
    {
      url: `${SITE_URL}/stimmungen`,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${SITE_URL}/geschmack`,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${SITE_URL}/reiseduefte`,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${SITE_URL}/ratgeber`,
      changeFrequency: 'weekly',
      priority: 0.7
    },
    {
      url: `${SITE_URL}/duftnoten`,
      changeFrequency: 'monthly',
      priority: 0.6
    },
    {
      url: `${SITE_URL}/geschenk-finder`,
      changeFrequency: 'weekly',
      priority: 0.8
    },
    {
      url: `${SITE_URL}/duft-finder`,
      changeFrequency: 'monthly',
      priority: 0.8
    },
    {
      url: `${SITE_URL}/duft-detektiv`,
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: `${SITE_URL}/faq`,
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: `${SITE_URL}/ueber-uns`,
      changeFrequency: 'yearly',
      priority: 0.4
    },
    // Impressum und Datenschutz sind bewusst noindex – deshalb nicht in der Sitemap.
    {
      url: `${SITE_URL}/quiz`,
      changeFrequency: 'monthly',
      priority: 0.9
    },
    {
      url: `${SITE_URL}/saisonal`,
      changeFrequency: 'monthly',
      priority: 0.7
    },
    {
      url: `${SITE_URL}/nische-mainstream`,
      changeFrequency: 'monthly',
      priority: 0.6
    },
    {
      url: `${SITE_URL}/duftpersoenlichkeit`,
      changeFrequency: 'monthly',
      priority: 0.6
    },
    {
      url: `${SITE_URL}/duftchemie-grundlagen`,
      changeFrequency: 'monthly',
      priority: 0.6
    },
    {
      url: `${SITE_URL}/duftkollektion-minimal`,
      changeFrequency: 'monthly',
      priority: 0.6
    },
    {
      url: `${SITE_URL}/duftnoten-guide`,
      changeFrequency: 'monthly',
      priority: 0.6
    },
    {
      url: `${SITE_URL}/duftsammlung`,
      changeFrequency: 'monthly',
      priority: 0.6
    },
    {
      url: `${SITE_URL}/duft-lagerung`,
      changeFrequency: 'monthly',
      priority: 0.6
    },
    {
      url: `${SITE_URL}/duft-mythen`,
      changeFrequency: 'monthly',
      priority: 0.6
    },
    {
      url: `${SITE_URL}/wie-auressa-funktioniert`,
      changeFrequency: 'monthly',
      priority: 0.5
    },
    {
      url: `${SITE_URL}/testing-und-transparenz`,
      changeFrequency: 'monthly',
      priority: 0.5
    },
    ...moodUrls,
    ...flavorUrls,
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
