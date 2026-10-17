import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

interface DataQuality {
  noten_verifiziert: boolean;
  preis_aktuell: boolean;
  longevity_quelle?: string;
  fehlende_daten: string[];
}

interface ResearchResult {
  perfume_name: string | null;
  brand: string | null;
  fragrance_family: string | null;
  gender: string | null;
  price_chf: string | null;
  longevity: number | null;
  sillage: number | null;
  scentmatch_score: null; // Always null, admin calculates
  season: string | null;
  occasion: string | null;
  top_notes: string | null;
  heart_notes: string | null;
  base_notes: string | null;
  image_url: null; // Always null, user adds
  affiliate_url: null; // Always null, user adds
  sources: string[];
  notes_confidence: 'high' | 'medium' | 'low';
  data_quality?: DataQuality;
  error?: string;
}

export async function POST(req: NextRequest) {
  try {
    const { brand, name } = await req.json();

    if (!brand || !name) {
      return NextResponse.json(
        { error: 'Brand and name are required' },
        { status: 400 }
      );
    }

    const searchPrompt = `Du recherchierst das Parfum "${brand} - ${name}" für auressa.ch — eine Premium-Duft-Beratungsplattform.

MISSION: Extrahiere ALLE verfügbaren, wahrheitsgemässen Informationen aus den besten Quellen.

QUELLEN (in dieser Priorität):
1. **Fragrantica.com** → Offizielle Noten (Top/Heart/Base), Community-Scores (Longevity 1-10, Sillage 1-10), Userbewertungen
2. **Parfumo.com** → Verifizierte Community-Bewertungen, durchschnittliche Longevity/Sillage
3. **Douglas.ch** → Schweizer Preis CHF (aktuell)
4. **Flaconi.de / Notino.ch** → Preis EUR (für Vergleich/Umrechnung)
5. **Basenotes.net / Perfume Society** → Expertenbewertungen, Duftfamilie-Kategorisierung
6. **Offizieller Hersteller** → Korrekte Schreibweise, Launch-Jahr, offizielle Familie

OUTPUT: Vollständiges JSON mit dieser EXAKTEN Struktur:
{
  "perfume_name": "Exakte offizielle Schreibweise (z.B. 'Épisode Romantique Orchidée Sublime')",
  "brand": "Korrekte Marke",
  "fragrance_family": "MUSS SEIN: clean | gourmand | woody | floral (Singular, kleinbuchstaben)",
  "gender": "Women | Men | Unisex (genau diese Schreibweise)",
  "top_notes": "Bergamotte, Mandarine, Magnolie (DEUTSCH, Komma-getrennt, mind. 2 Noten)",
  "heart_notes": "Jasmin, Orchidee (DEUTSCH, Komma-getrennt, mind. 2 Noten)",
  "base_notes": "Patchouli, Amberholz, Vanille, Moschusduft (DEUTSCH, Komma-getrennt, mind. 2 Noten)",
  "longevity": 6 oder null (1-10 Skala, nur wenn Community/Fragrantica verfügbar)",
  "sillage": 7 oder null (1-10 Skala, nur wenn Community/Fragrantica verfügbar)",
  "season": "Frühling | Sommer | Herbst/Winter | Winter | Ganzjährig (genau diese Optionen)",
  "occasion": "Alltag | Büro | Date | Abend (nur diese, Komma-getrennt wenn mehrere)",
  "price_chf": "46.50" oder null (ZAHL nur, . statt , Trennzeichen, CHF)",
  "sources": [
    "Fragrantica: Top/Heart/Base Notes, Longevity 6/10, Sillage 7/10",
    "Douglas.ch: CHF 46.50",
    "Notino.ch: EUR 55.00 (als Vergleich)"
  ],
  "notes_confidence": "high | medium | low",
  "data_quality": {
    "noten_verifiziert": true,
    "preis_aktuell": true,
    "longevity_quelle": "Fragrantica Community (40+ Bewertungen)",
    "fehlende_daten": ["Bild-URL", "Affiliate-Link"]
  }
}

REGELN (NICHT VERHANDELBAR):
✅ Nur ECHTE Daten aus verifizierten Quellen
✅ Noten MÜSSEN auf Deutsch sein (Bergamotte, nicht Bergamot)
✅ Bei unsicherem Wert → null (NICHT erfunden/geschätzt)
✅ Longevity/Sillage NUR von Fragrantica/Parfumo Community (nicht erfunden)
✅ Saison/Occasion NUR aus der angegebenen Liste
✅ Preis: Schweiz bevorzugt, sonst EUR→CHF (aktueller Rate ~1.05)
✅ Alle Noten Komma+Leerzeichen getrennt
✅ Quellen dokumentieren (welche Informationen woher)
✅ Confidence-Level ehrlich bewerten: high (3+ Quellen), medium (2 Quellen), low (1 Quelle)

WENN DUFT NICHT GEFUNDEN:
→ Gib leeres/null-Objekt zurück mit error: "Duft nicht auf Fragrantica/Parfumo verfügbar"

PRIORITÄT: Wahrheit > Vollständigkeit. Lieber null als erfunden.`;

    const messages: Anthropic.Messages.MessageParam[] = [
      { role: 'user', content: searchPrompt }
    ];

    let result_text = '';
    let stop_reason = '';

    // Agentic loop for tool use
    while (true) {
      const response = await client.messages.create({
        model: 'claude-opus-4-5',
        max_tokens: 4096,
        tools: [
          {
            type: 'web_search_20250305',
            name: 'web_search',
            description: 'Search the web for information',
            input_schema: {
              type: 'object' as const,
              properties: {
                query: {
                  type: 'string',
                  description: 'The search query'
                }
              },
              required: ['query']
            }
          }
        ],
        messages
      });

      stop_reason = response.stop_reason;

      // Collect text from response
      for (const block of response.content) {
        if (block.type === 'text') {
          result_text += block.text;
        }
      }

      // If not tool use, we're done
      if (stop_reason !== 'tool_use') {
        break;
      }

      // Process tool uses and add to messages
      const toolResults: Anthropic.Messages.ToolResultBlockParam[] = [];
      for (const block of response.content) {
        if (block.type === 'tool_use') {
          // Web search results are handled by Claude automatically
          toolResults.push({
            type: 'tool_result',
            tool_use_id: block.id,
            content: ''
          });
        }
      }

      // Add assistant response and tool results
      messages.push({ role: 'assistant', content: response.content });
      if (toolResults.length > 0) {
        messages.push({ role: 'user', content: toolResults });
      }
    }

    // Parse JSON from response
    const jsonMatch = result_text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json(
        {
          error: 'No valid JSON found in response',
          raw_response: result_text.substring(0, 500),
          perfume_name: null,
          brand: null,
          fragrance_family: null,
          gender: null,
          price_chf: null,
          longevity: null,
          sillage: null,
          scentmatch_score: null,
          season: null,
          occasion: null,
          top_notes: null,
          heart_notes: null,
          base_notes: null,
          image_url: null,
          affiliate_url: null,
          sources: [],
          notes_confidence: 'low'
        } as ResearchResult,
        { status: 500 }
      );
    }

    const rawData = JSON.parse(jsonMatch[0]) as any;

    // Validate and normalize family
    const validFamilies = ['clean', 'gourmand', 'woody', 'floral'];
    let family = rawData.fragrance_family?.toLowerCase() || null;
    if (family && !validFamilies.includes(family)) {
      family = null; // Invalid, set to null
    }

    // Validate and normalize gender
    const validGenders = ['Women', 'Men', 'Unisex'];
    let gender = rawData.gender || null;
    if (gender && !validGenders.includes(gender)) {
      gender = null;
    }

    // Validate season
    const validSeasons = ['Frühling', 'Sommer', 'Herbst/Winter', 'Winter', 'Ganzjährig'];
    let season = rawData.season || null;
    if (season && !validSeasons.includes(season)) {
      season = null;
    }

    // Validate occasion
    const validOccasions = ['Alltag', 'Büro', 'Date', 'Abend'];
    let occasion = rawData.occasion || null;
    if (occasion) {
      const occasions = occasion.split(',').map((o: string) => o.trim());
      occasion = occasions.filter((o: string) => validOccasions.includes(o)).join(', ') || null;
    }

    // Validate longevity/sillage (1-10)
    let longevity: number | null = null;
    if (rawData.longevity && typeof rawData.longevity === 'number') {
      longevity = Math.max(1, Math.min(10, rawData.longevity));
    }

    let sillage: number | null = null;
    if (rawData.sillage && typeof rawData.sillage === 'number') {
      sillage = Math.max(1, Math.min(10, rawData.sillage));
    }

    // Normalize response to match admin form
    const result: ResearchResult = {
      perfume_name: (rawData.perfume_name && typeof rawData.perfume_name === 'string') ? rawData.perfume_name.trim() : null,
      brand: (rawData.brand && typeof rawData.brand === 'string') ? rawData.brand.trim() : null,
      fragrance_family: family,
      gender: gender,
      price_chf: (rawData.price_chf && typeof rawData.price_chf === 'string') ? rawData.price_chf.trim() : null,
      longevity: longevity,
      sillage: sillage,
      scentmatch_score: null, // Always null, admin calculates
      season: season,
      occasion: occasion,
      top_notes: (rawData.top_notes && typeof rawData.top_notes === 'string') ? rawData.top_notes.trim() : null,
      heart_notes: (rawData.heart_notes && typeof rawData.heart_notes === 'string') ? rawData.heart_notes.trim() : null,
      base_notes: (rawData.base_notes && typeof rawData.base_notes === 'string') ? rawData.base_notes.trim() : null,
      image_url: null, // User adds later
      affiliate_url: null, // User adds later
      sources: Array.isArray(rawData.sources) ? rawData.sources.filter((s: any) => typeof s === 'string') : [],
      notes_confidence: ['high', 'medium', 'low'].includes(rawData.notes_confidence) ? rawData.notes_confidence : 'low',
      data_quality: rawData.data_quality || {
        noten_verifiziert: !!rawData.top_notes && !!rawData.heart_notes && !!rawData.base_notes,
        preis_aktuell: !!rawData.price_chf,
        longevity_quelle: rawData.data_quality?.longevity_quelle || undefined,
        fehlende_daten: rawData.data_quality?.fehlende_daten || ['Bild-URL', 'Affiliate-Link']
      }
    };

    return NextResponse.json(result);
  } catch (error) {
    console.error('Research error:', error);
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Unknown error',
        perfume_name: null,
        brand: null,
        fragrance_family: null,
        gender: null,
        price_chf: null,
        longevity: null,
        sillage: null,
        scentmatch_score: null,
        season: null,
        occasion: null,
        top_notes: null,
        heart_notes: null,
        base_notes: null,
        image_url: null,
        affiliate_url: null,
        sources: [],
        notes_confidence: 'low'
      } as ResearchResult,
      { status: 500 }
    );
  }
}
