import { ImageAnalysisResult } from '@/types/image-analysis';

const ANTHROPIC_API_KEY = (process.env.ANTHROPIC_API_KEY || '').trim();

export const isAnthropicConfigured = ANTHROPIC_API_KEY.length > 0;

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

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 2000,
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
                text: `Du bist ein Weltklasse-Parfüm-Experte mit Zugang zu einer Datenbank von 410+ Düften. Analysiere das Bild PRÄZISE. Antworte NUR mit JSON (kein Markdown, keine Erklärungen).

ERKENNUNGS-PRIORITÄT:
1. Lies zuerst ALLES auf dem Flakon: Markenname, Duftname, Konzentration (EdP/EdT/Parfum), Jahrgang.
2. Achte auf Form, Farbe und Design des Flakons — viele Parfüms erkennst du allein daran.
3. Bekannte Flakons: Chanel N°5 = goldener eckiger Flakon; Dior Sauvage = blaue Flasche; YSL Black Opium = schwarzer Glitzer; La Vie Est Belle = geschwungener Flakon etc.

WICHTIGE REGELN:
1. "perfumeName": EXAKT wie auf dem Flakon. Z.B. "N°5" nicht "No.5", "La Vie Est Belle" nicht "La vie est belle".
2. "brandName": EXAKT wie auf dem Flakon. Z.B. "Yves Saint Laurent" nicht "YSL".
3. "confidence": "high" = >90% sicher (du liest es oder erkennst es eindeutig); "medium" = 60-90%; "low" = <60%.
4. Bei "medium" oder "low": rating, sillage, longevity, projection, uniqueness, priceValue = null.
5. Bei "high": Fülle ALLE Felder aus die du kennst — notes, history, characterTags, perfectMoment etc.
6. estimatedPrice: Schweizer Franken, nur wenn bekannt. Z.B. "ca. 120–160 CHF".
7. Noten NUR auf DEUTSCH. Keine erfundenen Noten. Bekannte Düfte = bekannte Noten.
8. "family": floral, woody, fresh, oriental, gourmand, chypre, fougere, aquatic, oder spicy.
9. generalDescription: Schreib einen echten, informativen Satz über diesen Duft.

JSON-Format (null = unbekannt/unsicher):
{"perfumeName":"Exakter Name","brandName":"Exakte Marke","confidence":"high","year":null,"parfumeur":null,"concentration":null,"family":"floral","gender":"woman","rating":null,"sillage":null,"longevity":null,"projection":null,"uniqueness":null,"priceValue":null,"estimatedPrice":null,"notes":{"top":[],"heart":[],"base":[]},"duftDNA":null,"poeticDescription":null,"duftJourney":null,"characterTags":[],"personalityType":null,"mood":null,"seasonRecommendation":null,"occasion":[],"climate":[],"perfectMoment":null,"comparisonPerfumes":null,"funFacts":[],"famouswearers":null,"history":null,"similarPerfumes":[],"generalDescription":"Informativer Satz über diesen Duft.","development":{"opening":"","middleGame":"","drydown":""},"usageRecommendations":{"occasions":[],"seasons":[],"timeOfDay":[]},"bottleDescription":"Was du siehst.","intensity":"medium"}

Wenn NICHT erkennbar: confidence="low", perfumeName="Unbekanntes Parfüm", brandName="Unbekannte Marke".`,
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('[anthropic-analyzer] API-Fehler:', errorData);
      return {
        success: false,
        error: `API-Fehler: ${response.status}`,
      };
    }

    const data = await response.json();

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

    // originCountry → origin (Feldname-Normalisierung)
    if (analysis.originCountry && !analysis.origin) {
      analysis.origin = analysis.originCountry;
    }

    // occasion → occasionList (Feldname-Normalisierung)
    if (analysis.occasion && !analysis.occasionList) {
      analysis.occasionList = Array.isArray(analysis.occasion) ? analysis.occasion : [analysis.occasion];
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
