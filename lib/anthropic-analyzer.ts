import { ImageAnalysisResult } from '@/types/image-analysis';

const ANTHROPIC_API_KEY = (process.env.ANTHROPIC_API_KEY || '').trim();

export const isAnthropicConfigured = ANTHROPIC_API_KEY.length > 0;

export async function analyzeImageWithClaude(
  base64Image: string,
  includeProductInfo: boolean = false
): Promise<ImageAnalysisResult | null> {
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
                text: `Du bist ein Parfüm-Erkennungs-Assistent. Analysiere dieses Bild eines Parfüms und antworte mit AUSSCHLIESSLICH gültigem JSON (keine Markdown, kein Text davor/danach).

Das Bild kann sein:
- Ein echtes Flakon-Bild
- Ein Produktfoto vom Online-Shop
- Ein Marketing-Bild
- Ein Screenshot
- Eine Verpackung oder ein Label

AUFGABE: Erkenne das Parfüm so gut wie möglich und extrahiere:

- perfumeName: Name des Parfüms (egal ob vom Etikett, Logo, Verpackung, oder aus visuellen Hinweisen erkannt)
- brandName: Markenname (auch wenn nur erkannt, nicht gelesen)
- confidence: "high" für sicherer erkannte Parfüms, "medium" für educated guesses basierend auf visuellen Merkmalen, "low" nur für sehr unsicher
- notes: Duftnoten falls erkennbar, ansonsten leere Arrays. Format: {"top": ["Note1", "Note2"], "heart": [...], "base": [...]}
- development: Kurze Beschreibung wie sich das Parfüm entwickelt. Fallback: generische Beschreibung basierend auf Familie. Format: {"opening": "...", "middleGame": "...", "drydown": "..."}
- family: Duftfamilie (Clean, Floral, Woody, Gourmand, Oriental, Fruity, Aromatic, etc.)
- origin: Land oder Region wenn erkennbar, sonst "Unbekannt"
- usageRecommendations: Objekt mit Arrays. Fallback: generische Empfehlung. Format: {"occasions": ["Alltag", "Büro", ...], "seasons": ["Frühling", ...], "timeOfDay": ["Morgens", ...], "skinType": []}
- intensity: "light", "medium", oder "strong" - basierend auf visuellen Hinweisen oder Duftfamilie
- gender: "woman", "man", "unisex", oder null
- bottleDescription: Beschreibung des Flakons oder der Verpackung
- generalDescription: 1-2 Sätze allgemeine Beschreibung

WICHTIG:
- Es ist OK, educated guesses zu machen – erzähle nicht "ich kann nicht erkennen", sondern gib deine beste Einschätzung
- Leere Arrays sind OK wenn Informationen nicht verfügbar sind
- Nutze "medium" oder "low" Confidence wenn du dir nicht völlig sicher bist, aber antworte trotzdem
- Sei tolerant – auch unscharfe oder Produktfotos sind gültig

Antworte AUSSCHLIESSLICH mit JSON (keine Markdown-Blöcke):
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
