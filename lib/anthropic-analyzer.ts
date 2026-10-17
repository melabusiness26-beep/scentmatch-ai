import { ImageAnalysisResult } from '@/types/image-analysis';
import { getPerfumes } from './perfumes';

const ANTHROPIC_API_KEY = (process.env.ANTHROPIC_API_KEY || '').trim();

export const isAnthropicConfigured = ANTHROPIC_API_KEY.length > 0;

export async function extractTextFromImage(
  base64Image: string,
  mediaType: string = 'image/jpeg'
): Promise<{ brandName: string; perfumeName: string } | null> {
  if (!isAnthropicConfigured) {
    return null;
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 100,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: {
                  type: 'base64',
                  media_type: mediaType,
                  data: base64Image,
                },
              },
              {
                type: 'text',
                text: `Lese ALLEN sichtbaren Text auf dieser Parfüm-Flasche oder Verpackung.
Antworte NUR mit JSON:
{
  "brandName": "Markenname",
  "perfumeName": "Produktname"
}
Keine Erklärung, nur JSON.`,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    if (!data.content || !data.content[0] || data.content[0].type !== 'text') {
      return null;
    }

    let textContent = data.content[0].text.trim();

    if (textContent.startsWith('```')) {
      const jsonMatch = textContent.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (jsonMatch) {
        textContent = jsonMatch[1].trim();
      }
    }

    const extracted = JSON.parse(textContent);
    if (extracted.brandName && extracted.perfumeName) {
      return {
        brandName: extracted.brandName,
        perfumeName: extracted.perfumeName,
      };
    }

    return null;
  } catch (err) {
    console.error('[extractTextFromImage] Fehler:', err);
    return null;
  }
}

export async function findPerfumeByExtractedText(
  brandName: string,
  perfumeName: string
): Promise<ImageAnalysisResult> {
  try {
    const allPerfumes = await getPerfumes();

    const brandNameLower = brandName.toLowerCase();
    const perfumeNameLower = perfumeName.toLowerCase();

    const matches = allPerfumes.filter((p) => {
      const pBrandName = p.brands?.name || '';
      const pBrandNameLower = pBrandName.toLowerCase();
      const pPerfumeNameLower = p.perfume_name.toLowerCase();

      return (
        pPerfumeNameLower.includes(perfumeNameLower) ||
        perfumeNameLower.includes(pPerfumeNameLower) ||
        (pBrandNameLower.includes(brandNameLower) &&
          pPerfumeNameLower.includes(perfumeNameLower.split(' ')[0]))
      );
    });

    if (matches.length === 0) {
      return {
        success: false,
        error: `Duft nicht in der Datenbank gefunden: ${brandName} ${perfumeName}`,
      };
    }

    const topMatch = matches[0];
    const brandDisplayName = topMatch.brands?.name || brandName;

    const poeticDescription = `Ein ${topMatch.gender === 'Women' ? 'eleganter Damenduft' : topMatch.gender === 'Men' ? 'klassischer Herrenduft' : 'vielseitiger Unisex-Duft'} mit ${topMatch.heart_notes && topMatch.heart_notes[0] ? topMatch.heart_notes[0].toLowerCase() : 'soften Noten'}.`;

    return {
      success: true,
      data: {
        perfumeName: topMatch.perfume_name,
        brandName: brandDisplayName,
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
        poeticDescription,
        generalDescription: topMatch.description || '',
        rating: topMatch.scentmatch_score ? topMatch.scentmatch_score / 10 : 7,
        sillage: topMatch.sillage || 6,
        longevity: topMatch.longevity || 7,
        occasionList: (topMatch.occasion ? [topMatch.occasion] : []) as string[],
        characterTags: [],
        mood: '',
        seasonRecommendation: topMatch.season || 'Ganzjährig',
        bottleDescription: topMatch.image_url ? 'Flakon aus Datenbank' : '',
      },
    };
  } catch (error) {
    console.error('[findPerfumeByExtractedText] Fehler:', error);
    return {
      success: false,
      error: 'Fehler bei der Datenbankabfrage',
    };
  }
}

export async function analyzeImageWithAnthropic(
  base64Image: string,
  mediaType: string = 'image/jpeg'
): Promise<ImageAnalysisResult> {
  if (!isAnthropicConfigured) {
    return {
      success: false,
      error: 'Anthropic API nicht konfiguriert. Bitte kontaktiere den Support.',
    };
  }

  const startTime = Date.now();
  const logTime = (stage: string) => {
    const elapsed = Date.now() - startTime;
    console.log(`[anthropic-analyzer] ${stage}: ${elapsed}ms`);
  };

  try {
    logTime('Start');
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 50,
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                source: {
                  type: 'base64',
                  media_type: mediaType,
                  data: base64Image,
                },
              },
              {
                type: 'text',
                text: `Marke und Duftname vom Flakon. JSON: {"brandName":"...","perfumeName":"..."}`,
              },
            ],
          },
        ],
      }),
    });

    logTime('API Response received');

    if (!response.ok) {
      const errorData = await response.json();
      console.error('[anthropic-analyzer] API-Fehler:', errorData);
      return {
        success: false,
        error: `API-Fehler: ${response.status}`,
      };
    }

    const data = await response.json();
    logTime('JSON parsed');

    if (!data.content || !data.content[0] || data.content[0].type !== 'text') {
      console.error('[anthropic-analyzer] Unerwartete Antwort:', data);
      return {
        success: false,
        error: 'Unerwartete API-Antwort',
      };
    }

    let analysisText = data.content[0].text.trim();

    // Falls Markdown-Code-Block dabei ist, extrahiere JSON
    if (analysisText.startsWith('```')) {
      const jsonMatch = analysisText.match(/```(?:json)?\s*([\s\S]*?)\s*```/);
      if (jsonMatch) {
        analysisText = jsonMatch[1].trim();
      }
    }

    let analysis;
    try {
      analysis = JSON.parse(analysisText);
    } catch (parseError) {
      console.error('[anthropic-analyzer] JSON-Parse-Fehler:', analysisText);
      return {
        success: false,
        error: 'Analyse konnte nicht verarbeitet werden',
      };
    }

    logTime('Vision analysis complete');

    if (!analysis.brandName || !analysis.perfumeName) {
      return {
        success: false,
        error: 'Marke oder Name konnte nicht erkannt werden',
      };
    }

    // Nutze die extrahierte Marke/Name um in DB zu suchen
    return await findPerfumeByExtractedText(analysis.brandName, analysis.perfumeName);
  } catch (error) {
    console.error('[anthropic-analyzer] Fehler:', error);
    return {
      success: false,
      error: 'Fehler bei der Bildanalyse',
    };
  }
}
