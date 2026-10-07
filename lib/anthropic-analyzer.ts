import Anthropic from '@anthropic-ai/sdk';
import { ImageAnalysisResult } from '@/types/image-analysis';

const client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export async function analyzeImageWithClaude(
  imageBase64: string,
  includeProductInfo: boolean = false
): Promise<ImageAnalysisResult | null> {
  try {
    // Bestimme den MIME-Type aus dem Base64-String
    let mediaType: 'image/jpeg' | 'image/png' | 'image/gif' | 'image/webp' = 'image/jpeg';
    if (imageBase64.includes('image/png')) {
      mediaType = 'image/png';
    } else if (imageBase64.includes('image/webp')) {
      mediaType = 'image/webp';
    }

    // Entferne Data-URI-Präfix falls vorhanden
    const cleanBase64 = imageBase64.replace(/^data:[^;]+;base64,/, '');

    // Prompt für Duft-Analyse
    const basePrompt = `Analysiere dieses Bild. Es könnte ein Parfümflakon, ein Outfit, eine Stimmung oder ein Ort sein.
Gib mir folgende Informationen als JSON zurück (nutze null für unbekannte Werte):
{
  where: 'person' | 'store' | 'holiday' | 'hotel' | 'online' | null,
  gender: 'woman' | 'man' | 'unisex' | null,
  feeling: 'fresh' | 'warm' | 'woody' | 'floral' | 'oriental' | 'spicy' | null,
  intensity: 'very_light' | 'light' | 'medium' | 'strong' | 'very_strong' | null,
  occasion: 'daily' | 'office' | 'evening' | 'special' | null,
  bottleDescription: string | null,
  brandName: string | null,
  perfumeName: string | null,
  confidence: 'high' | 'medium' | 'low'
}
Antworte NUR mit dem JSON-Objekt, kein anderer Text.`;

    const productPrompt = includeProductInfo
      ? basePrompt
      : basePrompt; // Beide sind gleich, perfumeName wird optional verwendet

    const response = await client.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: mediaType,
                data: cleanBase64,
              },
            },
            {
              type: 'text',
              text: productPrompt,
            },
          ],
        },
      ],
    });

    // Extrahiere Text aus Response
    const responseText = response.content
      .filter((block) => block.type === 'text')
      .map((block) => (block as { type: 'text'; text: string }).text)
      .join('');

    // Parse JSON
    const jsonMatch = responseText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      console.error('[Analyzer] Kein JSON in Response:', responseText);
      return null;
    }

    const result = JSON.parse(jsonMatch[0]) as ImageAnalysisResult;

    // Validiere confidence
    if (!['high', 'medium', 'low'].includes(result.confidence)) {
      result.confidence = 'low';
    }

    return result;
  } catch (error) {
    console.error('[Analyzer] Fehler bei Bildanalyse:', error);
    return null;
  }
}
