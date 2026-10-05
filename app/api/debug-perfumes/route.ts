import { debugPerfumeCount, getPerfumeCount, getPerfumes } from '@/lib/perfumes';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export async function GET() {
  const debug: Record<string, any> = {};

  if (!isSupabaseConfigured) {
    return Response.json({ error: 'Supabase not configured' }, { status: 500 });
  }

  try {
    // 1. Total count
    const { count: totalCount } = await supabase
      .from('perfumes')
      .select('id', { count: 'exact', head: true });
    debug.totalInDb = totalCount;

    // 2. Load without filter, just IDs
    const { data: idsOnly } = await supabase
      .from('perfumes')
      .select('id')
      .order('scentmatch_score', { ascending: false })
      .limit(2000);
    debug.idsOnly = idsOnly?.length || 0;

    // 3. With brand fields
    const { data: withBrands, error: brandError } = await supabase
      .from('perfumes')
      .select('id, perfume_name, slug, gender, fragrance_family, price_chf, longevity, sillage, scentmatch_score, season, occasion, description, image_url, affiliate_url, top_notes, heart_notes, base_notes, brands(name, slug, country)')
      .order('scentmatch_score', { ascending: false })
      .limit(2000);
    debug.withBrandJoin = withBrands?.length || 0;
    if (brandError) debug.brandJoinError = brandError.message;

    // 4. Check what getPerfumeCount returns
    const countViaFunction = await getPerfumeCount();
    debug.getPerfumeCountResult = countViaFunction;

    // 5. Check what getPerfumes returns
    const perfumesViaFunction = await getPerfumes(2000);
    debug.getPerfumesResult = perfumesViaFunction.length;

    // 6. Sample some perfumes that were loaded
    if (withBrands && withBrands.length > 0) {
      debug.samplePerfumesWithBrand = withBrands.slice(0, 3).map((p: any) => ({
        id: p.id,
        name: p.perfume_name,
        brand: p.brands?.name || null,
        slug: p.slug
      }));
    }

    // 7. Check for nulls or empty values that might filter results
    if (withBrands) {
      const nullBrands = withBrands.filter((p: any) => p.brands === null).length;
      const nullSlugs = withBrands.filter((p: any) => p.slug === null).length;
      debug.withBrands_nullBrands = nullBrands;
      debug.withBrands_nullSlugs = nullSlugs;
    }

    return Response.json(debug, { status: 200 });
  } catch (error) {
    return Response.json({ error: String(error) }, { status: 500 });
  }
}
