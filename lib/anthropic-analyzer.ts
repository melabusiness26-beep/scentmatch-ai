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

KRITISCH – TEXT LESEN VOR RATEN:
- Wenn du Text/Noten auf der Box/Flakon siehst → LIES und NUTZE diese exakt (nicht raten!)
- Wenn "Notas de Salida / Kopfnoten" sichtbar sind → nimm diese, nicht dein Wissen
- Kleinere/europäische/spanische Marken → recherchiere genauestens, nicht ignorieren
- Geschlecht: Achte auf Farbe, Design, Formensprache (z.B. rosa/zart = Woman, eckig/dunkel = Man)

AUFGABE: Erkenne das Parfüm und extrahiere ALLES als reines JSON (keine Markdown):

Basis-Infos:
- perfumeName, brandName, year (null ok), parfumeur (null ok), originCountry
- concentration: "Parfum"|"EDP"|"EDT"|"Eau de Cologne"|null
- family: Duftfamilie
- gender: "woman"|"man"|"unisex"|null (WICHTIG: Basierend auf Geschlechtsmarkierungen im Design)

Bewertungen (1-10 Skala):
- rating, sillage, longevity, projection, uniqueness, priceValue

Noten (ZUERST auf Box lesen, dann ergänzen):
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
- intensity, confidence

WICHTIG:
- TEXT auf Box/Flakon hat PRIORITÄT über Wissen
- Es ist OK, educated guesses zu machen, ABER nur wenn Text nicht sichtbar
- Nutze null nur wenn unmöglich
- Leere Arrays sind OK
- Sei großzügig – auch unscharfe Fotos/Screenshots zählen
- confidence: "high" wenn Text lesbar, "medium" wenn zu erkennen aber unklar, "low" wenn unsicher
- Klein-/Nischemarken NICHT ignorieren – recherchiere genau

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

    // Post-Processing: Dedupliziere und normalisiere Noten (Übersetzungen entfernen)
    if (analysis.notes && typeof analysis.notes === 'object') {
      const translationMap: Record<string, string> = {
        // Spanisch → Deutsch
        'frambuesa': 'Himbeere',
        'fresa': 'Erdbeere',
        'rosa': 'Rose',
        'violeta': 'Veilchen',
        'jazmín': 'Jasmin',
        'vainilla': 'Vanille',
        'almíbar': 'Sirup',
        'caramelo': 'Karamell',
        'chocolate': 'Schokolade',
        'café': 'Kaffee',
        'pimienta': 'Pfeffer',
        'canela': 'Zimt',
        'ginger': 'Ingwer',
        'jengibre': 'Ingwer',
        'limón': 'Zitrone',
        'naranja': 'Orange',
        'bergamota': 'Bergamotte',
        'neroli': 'Neroli',
        'limona': 'Zitrone',
        'sándalo': 'Sandelholz',
        'cedro': 'Zeder',
        'palisander': 'Palisander',
        'musgo': 'Moos',
        'almíbar de miel': 'Honig',
        'miel': 'Honig',
        'ámbar': 'Amber',
        // Englisch → Deutsch
        'raspberry': 'Himbeere',
        'strawberry': 'Erdbeere',
        'rose': 'Rose',
        'violet': 'Veilchen',
        'jasmine': 'Jasmin',
        'vanilla': 'Vanille',
        'caramel': 'Karamell',
        'chocolate': 'Schokolade',
        'coffee': 'Kaffee',
        'pepper': 'Pfeffer',
        'cinnamon': 'Zimt',
        'ginger': 'Ingwer',
        'lemon': 'Zitrone',
        'orange': 'Orange',
        'bergamot': 'Bergamotte',
        'sandalwood': 'Sandelholz',
        'cedar': 'Zeder',
        'moss': 'Moos',
        'honey': 'Honig',
        'amber': 'Amber',
        // Französisch → Deutsch
        'framboise': 'Himbeere',
        'fraise': 'Erdbeere',
        'rose': 'Rose',
        'violette': 'Veilchen',
        'jasmin': 'Jasmin',
        'vanille': 'Vanille',
        'caramel': 'Karamell',
        'chocolat': 'Schokolade',
        'café': 'Kaffee',
        'poivre': 'Pfeffer',
        'cannelle': 'Zimt',
        'gingembre': 'Ingwer',
        'citron': 'Zitrone',
        'orange': 'Orange',
        'bergamote': 'Bergamotte',
        'bois de santal': 'Sandelholz',
        'cèdre': 'Zeder',
        'miel': 'Honig',
        'ambre': 'Amber',
      };

      const normalizeNote = (note: string): string => {
        const normalized = note.toLowerCase().trim();
        return translationMap[normalized] || note;
      };

      const deduplicateNotes = (notes: string[]): string[] => {
        if (!Array.isArray(notes)) return notes;

        // Normalize alle Noten (übersetze zu Deutsch)
        const normalized = notes.map(normalizeNote);

        // Entferne Duplikate (case-insensitive)
        const seen = new Set<string>();
        return normalized.filter(note => {
          const lower = note.toLowerCase();
          if (seen.has(lower)) return false;
          seen.add(lower);
          return true;
        });
      };

      if (Array.isArray(analysis.notes.top)) {
        analysis.notes.top = deduplicateNotes(analysis.notes.top);
      }
      if (Array.isArray(analysis.notes.heart)) {
        analysis.notes.heart = deduplicateNotes(analysis.notes.heart);
      }
      if (Array.isArray(analysis.notes.base)) {
        analysis.notes.base = deduplicateNotes(analysis.notes.base);
      }
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
