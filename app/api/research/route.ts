import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

interface ResearchResult {
  perfume_name: string | null;
  brand: string | null;
  fragrance_family: string | null;
  gender: string | null;
  price_chf: string | null;
  longevity: number | null;
  sillage: number | null;
  scentmatch_score: number | null;
  season: string | null;
  occasion: string | null;
  top_notes: string | null;
  heart_notes: string | null;
  base_notes: string | null;
  image_url: string | null;
  affiliate_url: string | null;
  sources: string[];
  notes_confidence: 'high' | 'medium' | 'low';
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

    const searchPrompt = `Du recherchierst das Parfum "${brand} - ${name}" für eine Schweizer Duft-Plattform (auressa.ch).

Suche auf folgenden Quellen und extrahiere ALLE verfügbaren, wahrheitsgemässen Informationen:
1. Fragrantica.com (Noten, Bewertungen, Accord, Longevity, Sillage)
2. Parfumo.com (Bewertungen, Longevity, Sillage)
3. Douglas.ch (Schweizer Preis CHF)
4. Weitere Shops (Flaconi, Notino, Parfumdreams.ch) für Preisvergleich

Gib die Antwort als JSON zurück mit dieser exakten Struktur:
{
  "perfume_name": "Exact Duftname",
  "brand": "Brand name",
  "fragrance_family": "clean / gourmand / woody / floral",
  "gender": "Women / Men / Unisex",
  "top_notes": "Note1, Note2, Note3 (auf Deutsch)",
  "heart_notes": "Note1, Note2, Note3 (auf Deutsch)",
  "base_notes": "Note1, Note2, Note3 (auf Deutsch)",
  "scentmatch_score": null,
  "longevity": number 1-10 oder null,
  "sillage": number 1-10 oder null,
  "season": "Frühling / Sommer / Herbst/Winter / Winter / Ganzjährig",
  "occasion": "Alltag / Büro / Date / Abend (comma-separated if multiple)",
  "price_chf": "XX.XX (nur Zahl, CHF)",
  "sources": ["Source1", "Source2"],
  "notes_confidence": "high / medium / low"
}

WICHTIG:
- Nur wahrheitsgemässe Daten, keine Erfindungen
- Bei unbekannten Werten: null eintragen
- Longevity und Sillage: Skala 1-10
- Noten MÜSSEN auf Deutsch sein (z.B. "Bergamotte, Zitrone, Neroli")
- Saison: nur aus der Liste wählen
- Occasion: nur aus der Liste wählen
- Preise bevorzugt von douglas.ch (Schweiz), sonst EUR→CHF umrechnen
- Alle Noten mit Komma trennen
- Scentmatch_score bleibt null (wird später von Admin berechnet)`;

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
          raw_response: result_text.substring(0, 500)
        } as ResearchResult,
        { status: 500 }
      );
    }

    const data = JSON.parse(jsonMatch[0]) as Partial<ResearchResult>;

    // Normalize response to match admin form
    const result: ResearchResult = {
      perfume_name: data.perfume_name || null,
      brand: data.brand || null,
      fragrance_family: data.fragrance_family || null,
      gender: data.gender || null,
      price_chf: data.price_chf || null,
      longevity: data.longevity || null,
      sillage: data.sillage || null,
      scentmatch_score: null, // Always null, admin calculates this
      season: data.season || null,
      occasion: data.occasion || null,
      top_notes: data.top_notes || null,
      heart_notes: data.heart_notes || null,
      base_notes: data.base_notes || null,
      image_url: null, // User adds later
      affiliate_url: null, // User adds later
      sources: data.sources || [],
      notes_confidence: data.notes_confidence || 'low'
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
