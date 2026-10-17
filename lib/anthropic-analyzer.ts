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
        max_tokens: 600,
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
                text: `Erkenne diesen Parfüm-Flakon schnell und genau.

1. Lese ALLE sichtbaren Texte: Markenname, Produktname, Konzentration (EDP/EDT/Parfum)
2. Achte auf Geschlechtshints: "Pour Homme"→man, "Pour Femme"→woman, sonst unisex
3. Analysiere Form, Farbe und Design des Flakons
4. Antworte NUR mit gültigem JSON (keine Erklärung):

{
  "perfumeName": "Produktname vom Flakon",
  "brandName": "Markenname",
  "confidence": "high|medium|low",
  "concentration": "EDP|EDT|Parfum|null",
  "gender": "woman|man|unisex",
  "notes": {
    "top": ["Bergamotte", "Zitrone"],
    "heart": ["Rose", "Jasmin"],
    "base": ["Sandelholz", "Moschus"]
  },
  "poeticDescription": "Kurze emotionale Beschreibung",
  "generalDescription": "Sachliche 1-2 Satz Einführung",
  "rating": 7,
  "sillage": 6,
  "longevity": 7,
  "occasionList": ["Alltag", "Büro"],
  "characterTags": ["Frisch", "Elegant", "Leicht"],
  "mood": "Beschreibung der Stimmung",
  "seasonRecommendation": "Ganzjährig|Sommer|Winter|Frühling|Herbst",
  "bottleDescription": "Farbe und Form des Flakons"
}

REGELN:
- perfumeName & brandName: IMMER, auch educated guess
- Noten NUR auf Deutsch
- Keine Duplikate zwischen top/heart/base
- occasionList: IMMER Array
- gender: "high"→voll lesbar, "medium"→unsicher, "low"→visueller Guess
- NUR JSON, kein Text`,
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

    // Normaliserung der Gender-Werte falls nötig
    if (analysis.gender && typeof analysis.gender === 'string') {
      const genderMap: Record<string, string> = {
        'women': 'woman',
        'female': 'woman',
        'men': 'man',
        'male': 'man',
        'both': 'unisex',
      };
      analysis.gender = genderMap[analysis.gender.toLowerCase()] || analysis.gender;
    }

    // SICHERHEITS-CHECK: Parfümname und Marke auf Gender-Keywords prüfen.
    // Dieser Code überschreibt die KI-Antwort – verhindert falsche Gender-Labels.
    const nameToCheck = `${analysis.perfumeName || ''} ${analysis.brandName || ''}`.toLowerCase();
    const MAN_KEYWORDS = [
      'pour homme', 'for men', 'for him', 'homme', ' man ', 'men\'s',
      ' him ', 'herren', 'masculin', 'masculine', 'uomo', 'hombre',
    ];
    const WOMAN_KEYWORDS = [
      'pour femme', 'for women', 'for her', 'femme', ' woman ', 'women\'s',
      ' her ', 'damen', 'féminin', 'feminine', 'donna', 'mujer', 'elle ',
    ];
    const isManByName  = MAN_KEYWORDS.some(kw => nameToCheck.includes(kw));
    const isWomanByName = WOMAN_KEYWORDS.some(kw => nameToCheck.includes(kw));
    if (isManByName && !isWomanByName) {
      analysis.gender = 'man';
    } else if (isWomanByName && !isManByName) {
      analysis.gender = 'woman';
    }
    // Wenn kein Keyword gefunden und gender noch null/ungültig → sicherer Fallback
    if (!['man', 'woman', 'unisex'].includes(analysis.gender)) {
      analysis.gender = 'unisex';
    }

    // Noten auf Deutsch normalisieren & Duplikate entfernen
    const NOTE_TRANSLATIONS: Record<string, string> = {
      // Spanisch
      'frambuesa': 'Himbeere', 'rosa': 'Rose', 'vainilla': 'Vanille', 'bergamota': 'Bergamotte',
      'limon': 'Zitrone', 'limon amarillo': 'Zitrone', 'naranja': 'Orange', 'almizcle': 'Moschus',
      'madera': 'Holz', 'musgo': 'Moos', 'ambar': 'Amber', 'incienso': 'Weihrauch',
      'ylang ylang': 'Ylang-Ylang', 'jazmin': 'Jasmin', 'jazmín': 'Jasmin',
      'lirio': 'Lilie', 'sandalo': 'Sandelholz', 'sándalo': 'Sandelholz',
      'pachuli': 'Patchouli', 'mandarina': 'Mandarine',
      'melocoton': 'Pfirsich', 'melocotón': 'Pfirsich',
      // Englisch
      'raspberry': 'Himbeere', 'vanilla': 'Vanille', 'musk': 'Moschus',
      'bergamot': 'Bergamotte', 'lemon': 'Zitrone', 'orange': 'Orange',
      'amber': 'Amber', 'rose': 'Rose', 'jasmine': 'Jasmin', 'lily': 'Lilie',
      'cedar': 'Zeder', 'cedarwood': 'Zeder', 'sandalwood': 'Sandelholz',
      'peach': 'Pfirsich', 'mandarin': 'Mandarine', 'incense': 'Weihrauch',
      'iris': 'Iris', 'violet': 'Veilchen', 'lavender': 'Lavendel',
      'blackcurrant': 'Schwarze Johannisbeere', 'patchouli': 'Patchouli',
      'vetiver': 'Vetiver', 'oakmoss': 'Eichenmoos', 'tonka bean': 'Tonkabohne',
      'white musk': 'Weißer Moschus', 'pink pepper': 'Rosa Pfeffer',
      // Französisch
      'ambre': 'Amber', 'bergamote': 'Bergamotte', 'musc': 'Moschus',
      'cedre': 'Zeder', 'cèdre': 'Zeder', 'framboise': 'Himbeere',
      'vanille': 'Vanille', 'jasmin': 'Jasmin',
    };

    function normalizeNoteName(note: string): string {
      const lower = note.toLowerCase().trim();
      return NOTE_TRANSLATIONS[lower] || note;
    }

    function deduplicateNotes(notes: string[]): string[] {
      if (!Array.isArray(notes)) return [];
      const normalized = notes.map(normalizeNoteName);
      // Entferne Duplikate (case-insensitive)
      const seen = new Set<string>();
      return normalized.filter(n => {
        const key = n.toLowerCase();
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      });
    }

    if (analysis.notes) {
      analysis.notes.top = deduplicateNotes(analysis.notes.top || []);
      analysis.notes.heart = deduplicateNotes(analysis.notes.heart || []);
      analysis.notes.base = deduplicateNotes(analysis.notes.base || []);
    }

    // Validiere dass confidence einer der erwarteten Werte ist
    if (!['high', 'medium', 'low'].includes(analysis.confidence)) {
      analysis.confidence = 'medium';
    }

    // Validiere intensity
    const validIntensities = ['very_light', 'light', 'medium', 'strong', 'very_strong'];
    if (analysis.intensity && !validIntensities.includes(analysis.intensity)) {
      analysis.intensity = 'medium';
    }

    // occasionList-Bug: KI gibt manchmal 'occasion' (Array) statt 'occasionList' zurück
    if (!analysis.occasionList && Array.isArray(analysis.occasion)) {
      analysis.occasionList = analysis.occasion;
    }
    if (!Array.isArray(analysis.occasionList)) {
      analysis.occasionList = [];
    }

    // climate: sicherstellen dass es ein Array ist
    if (!Array.isArray(analysis.climate)) {
      analysis.climate = analysis.climate ? [analysis.climate] : [];
    }

    // characterTags: sicherstellen dass es ein Array ist
    if (!Array.isArray(analysis.characterTags)) {
      analysis.characterTags = [];
    }

    // Zahlen-Felder validieren (1–10 Bereich)
    const numericFields = ['rating', 'sillage', 'longevity', 'projection', 'uniqueness', 'priceValue'];
    for (const field of numericFields) {
      if (analysis[field] !== undefined && analysis[field] !== null) {
        const val = Number(analysis[field]);
        if (isNaN(val) || val < 1 || val > 10) {
          analysis[field] = null;
        } else {
          analysis[field] = Math.round(val * 10) / 10; // auf 1 Dezimalstelle runden
        }
      }
    }

    logTime('Complete');
    return {
      success: true,
      data: analysis,
    };
  } catch (error) {
    console.error('[anthropic-analyzer] Fehler:', error);
    return {
      success: false,
      error: 'Fehler bei der Bildanalyse',
    };
  }
}
