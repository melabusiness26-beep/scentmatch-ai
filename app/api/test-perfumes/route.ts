import { getPerfumes } from '@/lib/perfumes';

export async function GET() {
  const perfumes = await getPerfumes(10);

  // Zeige die ersten 3 Düfte + ihre age_group/lifestyle Werte
  const sample = perfumes.slice(0, 3).map(p => ({
    name: p.perfume_name,
    age_group: p.age_group,
    lifestyle: p.lifestyle,
    trend_vibe: p.trend_vibe,
    allFields: Object.keys(p).sort()
  }));

  return Response.json({
    totalLoaded: perfumes.length,
    hasAgeGroupField: 'age_group' in (perfumes[0] || {}),
    hasLifestyleField: 'lifestyle' in (perfumes[0] || {}),
    sample,
    firstPerfumeAllKeys: perfumes[0] ? Object.keys(perfumes[0]) : []
  });
}
