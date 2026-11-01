import { NextRequest, NextResponse } from 'next/server';
import { getPerfumes } from '@/lib/perfumes';

export async function POST(request: NextRequest) {
  const startTime = Date.now();
  try {
    const body = await request.json();
    const { barcode } = body;

    if (!barcode || typeof barcode !== 'string' || !/^\d{8,14}$/.test(barcode.trim())) {
      return NextResponse.json(
        { success: false, error: 'Ungültige Barcode-Anfrage' },
        { status: 400 }
      );
    }

    const allPerfumes = await getPerfumes();

    const match = allPerfumes.find((p) => {
      const ean = (p as any).ean_code || '';
      return ean && ean === barcode.trim();
    });

    if (!match) {
      return NextResponse.json({
        success: false,
        error: 'Barcode nicht in der Datenbank gefunden. Verwende die Foto- oder Texteingabe stattdessen.',
      });
    }

    const brandName = match.brands?.name || '';
    const totalTime = Date.now() - startTime;

    return NextResponse.json({
      success: true,
      data: {
        perfumeName: match.perfume_name,
        brandName,
        confidence: 'high',
        concentration: null,
        gender: (match.gender as 'woman' | 'man' | 'unisex') || 'unisex',
        notes: {
          top: (match.top_notes || []) as string[],
          heart: (match.heart_notes || []) as string[],
          base: (match.base_notes || []) as string[],
        },
        development: {
          opening: (match.top_notes || [''])[0] || 'Frische Öffnung',
          middleGame: (match.heart_notes || [''])[0] || 'Warme Herznote',
          drydown: (match.base_notes || [''])[0] || 'Eleganter Abgang',
        },
        family: match.fragrance_family || 'Klassisch',
        usageRecommendations: {
          occasions: match.occasion ? [match.occasion] : ['Alltag'],
          seasons: match.season ? [match.season] : ['Ganzjährig'],
          timeOfDay: ['Tagsüber', 'Abends'],
          skinType: [],
        },
        intensity: 'medium',
        generalDescription: match.description || '',
        rating: match.scentmatch_score ? match.scentmatch_score / 10 : 7,
        sillage: match.sillage || 6,
        longevity: match.longevity || 7,
        bottleDescription: match.image_url ? 'Flakon aus Datenbank' : '',
        seasonRecommendation: match.season || 'Ganzjährig',
        occasionList: (match.occasion ? [match.occasion] : []) as string[],
        characterTags: [],
        mood: '',
      },
      _timing: totalTime,
      _method: 'barcode',
    });
  } catch (error) {
    console.error('[barcode-lookup] Fehler:', error);
    return NextResponse.json(
      { success: false, error: 'Server-Fehler bei Barcode-Abfrage' },
      { status: 500 }
    );
  }
}
