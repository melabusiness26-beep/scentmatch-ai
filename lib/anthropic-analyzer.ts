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
        model: 'claude-sonnet-4-5',
        max_tokens: 3000,
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
                text: `Du bist ein Premium-Parfüm-Analyse-Assistent. Analysiere dieses Bild eines Parfüms sorgfältig und erstelle ein ULTIMATIVES PREMIUM-STECKBRIEF mit maximalen Details.

Das Bild kann sein: echtes Flakon, Produktfoto, Marketing-Bild, Screenshot oder Verpackung.

AUFGABE: Erkenne das Parfüm und extrahiere ALLES als reines JSON (keine Markdown):

Basis-Infos:
- perfumeName, brandName, year (null ok), parfumeur (null ok), originCountry
- concentration: "Parfum"|"EDP"|"EDT"|"Eau de Cologne"|null
- family: Duftfamilie

Bewertungen (1-10 Skala):
- rating, sillage, longevity, projection, uniqueness, priceValue

Noten:
- notes: {top: [...], heart: [...], base: [...]}

Analyse:
- duftDNA: {blumig: %, holzig: %, frisch: %, süss: %, würzig: %} (Summe ~100)
- poeticDescription: 2-3 Sätze, emotional
- duftJourney: {morgen: "...", mittag: "...", abend: "...", nacht: "..."}

Charakter:
- characterTags: ["5-6 Wörter"], personalityType, mood

Anwendung:
- seasonRecommendation: "Frühling"|"Sommer"|"Herbst"|"Winter"|"Ganzjährig"
- occasion: ["Alltag", "Büro", "Date", "Abendessen", "Party", "Sport"]
- climate: ["warm", "kalt", "tropisch", "gemäßigt"]

Stories:
- perfectMoment: kurze emotionale Story
- comparisonPerfumes: [{name, reason}] (2-3 Düfte)
- funFacts: [...]
- famouswearers: [...] oder null
- history: kurze Geschichte oder null

KI-Empfehlungen:
- similarPerfumes: [{name, reason}] (5 Düfte aus KI-Wissen, NICHT aus DB)

Fallback-Daten:
- generalDescription: 1-2 Sätze
- development: {opening, middleGame, drydown}
- usageRecommendations: {occasions, seasons, timeOfDay, skinType}
- bottleDescription: Beschreibung des Flakons
- intensity, gender, confidence

WICHTIG:
- Es ist OK, educated guesses zu machen
- Nutze null nur wenn unmöglich
- Leere Arrays sind OK
- Sei großzügig – auch unscharfe Fotos/Screenshots zählen
- confidence: "high"|"medium"|"low"

Antworte NUR mit vollständigem JSON:`,
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
