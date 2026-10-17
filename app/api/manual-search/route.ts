import { NextRequest, NextResponse } from 'next/server';
import { getPerfumes } from '@/lib/perfumes';

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  try {
    const body = await request.json();
    const { perfumeName, brandName } = body;

    if (!perfumeName || !brandName) {
      return NextResponse.json(
        { success: false, error: 'Marke und Name erforderlich' },
        { status: 400 }
      );
    }

    const allPerfumes = await getPerfumes();

    const brandLower = brandName.toLowerCase();
    const perfumeLower = perfumeName.toLowerCase();

    const matches = allPerfumes.filter((p) => {
      const pBrandName = p.brands?.name || '';
      const pBrandNameLower = pBrandName.toLowerCase();
      const pPerfumeNameLower = p.perfume_name.toLowerCase();

      return (
        pPerfumeNameLower.includes(perfumeLower) ||
        perfumeLower.includes(pPerfumeNameLower) ||
        (pBrandNameLower.includes(brandLower) && pPerfumeNameLower.includes(perfumeLower.split(' ')[0]))
      );
    });

    if (matches.length === 0) {
      return NextResponse.json({
        success: false,
        error: `Duft "${brandName} ${perfumeName}" konnte nicht gefunden werden. Versuche andere Schreibweisen oder Namen-Varianten.`,
      });
    }

    const topMatch = matches[0];
    const displayBrandName = topMatch.brands?.name || brandName;
    const totalTime = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      data: {
        perfumeName: topMatch.perfume_name,
        brandName: displayBrandName,
        confidence: matches.length === 1 ? 'high' : 'medium',
        concentration: null,
        gender: (topMatch.gender as 'woman' | 'man' | 'unisex') || 'unisex',
        notes: {
          top: (topMatch.top_notes || []) as string[],
          heart: (topMatch.heart_notes || []) as string[],
          base: (topMatch.base_notes || []) as string[],
        },
        development: {
          opening: (topMatch.top_notes || [''])[0] || 'Frische Öffnung',
          middleGame: (topMatch.heart_notes || [''])[0] || 'Warme Herznote',
          drydown: (topMatch.base_notes || [''])[0] || 'Eleganter Abgang',
        },
        family: topMatch.fragrance_family || 'Klassisch',
        usageRecommendations: {
          occasions: topMatch.occasion ? [topMatch.occasion] : ['Alltag'],
          seasons: topMatch.season ? [topMatch.season] : ['Ganzjährig'],
          timeOfDay: ['Tagsüber', 'Abends'],
          skinType: [],
        },
        intensity: 'medium',
        generalDescription: topMatch.description || '',
        rating: topMatch.scentmatch_score ? topMatch.scentmatch_score / 10 : 7,
        sillage: topMatch.sillage || 6,
        longevity: topMatch.longevity || 7,
        bottleDescription: topMatch.image_url ? 'Flakon aus Datenbank' : '',
        seasonRecommendation: topMatch.season || 'Ganzjährig',
        occasionList: (topMatch.occasion ? [topMatch.occasion] : []) as string[],
        characterTags: [],
        mood: '',
      },
      _timing: totalTime,
      _method: 'manual',
    });
  } catch (error) {
    console.error('[manual-search] Fehler:', error);
    return NextResponse.json(
      { success: false, error: 'Server-Fehler bei Suche' },
      { status: 500 }
    );
  }
}
