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
    const response = await fetch('https://api.anthropic.com/v1/messages/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
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
                text: `Analysiere das Parfüm-Flakon-Bild gründlich und antworte mit AUSSCHLIESSLICH ein gültiges JSON (keine Markdown, kein Text davor/danach).

Extrahiere folgende Informationen:
- perfumeName: Der genaue Name des Parfüms (aus dem Etikett lesbar)
- brandName: Der Markenname
- confidence: "high" wenn du sicher bist, "medium" wenn möglich aber unklar, "low" wenn sehr unsicher
- notes: Ein Objekt mit top (Array), heart (Array), base (Array) - die Duftnoten falls sichtbar oder gut erkennbar
- development: Wie das Parfüm sich entwickelt: opening (erste Minuten), middleGame (nach 1-2h), drydown (Ende des Tages)
- family: Die Duftfamilie (z.B. "Floral", "Woody", "Clean", "Gourmand")
- origin: Das Herkunftsland oder die Region
- usageRecommendations: Ein Objekt mit:
  - occasions: Array von Anlässen (z.B. ["Alltag", "Büro", "Abend"])
  - seasons: Array von Jahreszeiten (z.B. ["Frühling", "Sommer"])
  - timeOfDay: Array von Tageszeiten (z.B. ["Morgens", "Abends"])
  - skinType: Optional Array von Hauttypen
- intensity: Die Intensität/Sillage: "very_light", "light", "medium", "strong" oder "very_strong"
- gender: "woman", "man", "unisex" oder null
- bottleDescription: Beschreibung des Flakons/der Verpackung
- generalDescription: 1-2 Sätze allgemeine Beschreibung des Parfüms

Antworte AUSSCHLIESSLICH mit JSON:
{
  "perfumeName": "...",
  "brandName": "...",
  "confidence": "high|medium|low",
  "notes": {"top": [...], "heart": [...], "base": [...]},
  "development": {"opening": "...", "middleGame": "...", "drydown": "..."},
  "family": "...",
  "origin": "...",
  "usageRecommendations": {"occasions": [...], "seasons": [...], "timeOfDay": [...], "skinType": [...]},
  "intensity": "...",
  "gender": "woman|man|unisex|null",
  "bottleDescription": "...",
  "generalDescription": "..."
}`,
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
