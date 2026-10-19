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
  scentmatch_score: null;
  season: string | null;
  occasion: string | null;
  top_notes: string | null;
  heart_notes: string | null;
  base_notes: string | null;
  image_url: null;
  affiliate_url: null;
  sources: string[];
  notes_confidence: 'high' | 'medium' | 'low';
  data_quality?: DataQuality;
  // Pro Status Fields (Scanner)
  concentration?: string | null;
  long_description?: string | null;
  bottle_description?: string | null;
  intensity?: string | null;
  scent_dna?: string[];
  rating?: number | null;
  confidence_level?: string | null;
  data_sources?: Record<string, boolean>;
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

    const searchPrompt = `Du recherchierst das Parfum "${brand} - ${name}" für auressa.ch — eine Premium-Duft-Beratungsplattform mit professionellem Scanner-Status.

MISSION: Extrahiere ALLE verfügbaren, wahrheitsgemässen Informationen für PROFI-STATUS-Daten.

QUELLEN (Priorität):
1. **Fragrantica.com** → Noten, Community-Scores, Flakon-Bilder, Bewertungen
2. **Parfumo.com** → Verifizierte Bewertungen, Longevity/Sillage
3. **Douglas.ch** → Schweizer Preis CHF, Konzentration
4. **Notino.ch / Flaconi.de** → Alternative Preise, Konzentration
5. **Basenotes.net** → Experten-Bewertung, Intensität
6. **Offizieller Hersteller** → Korrekte Info, Flakon-Design, Launch-Jahr

OUTPUT: Vollständiges JSON mit dieser EXAKTEN Struktur:

{
  "perfume_name": "Exakte offizielle Schreibweise",
  "brand": "Korrekte Marke",
  "fragrance_family": "clean | gourmand | woody | floral",
  "gender": "Women | Men | Unisex",
  "concentration": "EDP | EDT | Extrait | Cologne | oder null",
  "top_notes": "Bergamotte, Grapefruit, Zitrone (DEUTSCH, Komma-getrennt)",
  "heart_notes": "Jasmin, Veilchen, Gardenie (DEUTSCH, Komma-getrennt)",
  "base_notes": "Zedernholz, Moschus, Sandelholz (DEUTSCH, Komma-getrennt)",
  "longevity": 6 oder null (1-10),
  "sillage": 7 oder null (1-10),
  "intensity": "Leicht | Mittel | Intensiv (basierend auf Sillage + Community)",
  "season": "Frühling | Sommer | Herbst/Winter | Winter | Ganzjährig",
  "occasion": "Alltag | Büro | Date | Abend (Komma-getrennt)",
  "price_chf": "39.50" oder null,
  "rating": 7.5 oder null (0-10 basierend auf Community oder berechnet)",
  "long_description": "Ausführliche, poetic deutsche Beschreibung (3-4 Sätze). Beispiel: 'Ein frischer Duft, der Eleganz und Modernität vereint. Die Kopfnoten öffnen mit zitronigen Akkorden, während die Herznoten subtile Blütennoten zeigen. Im Basisakkord sorgen holzige Noten für Tiefe und Standfestigkeit.'",
  "bottle_description": "Beschreibung des Flakons und Design. Beispiel: 'Ein klassischer Flakon mit klarem, rechteckigem Design. Das durchsichtige Glas zeigt die helle, bernsteinfarbene Flüssigkeit. Die weiße Kappe kontrastiert elegant mit dem Glas.'",
  "scent_dna": ["Ähnlicher Duft 1", "Ähnlicher Duft 2", "Ähnlicher Duft 3"],
  "sources": ["Fragrantica: ...", "Douglas.ch: ...", ...],
  "notes_confidence": "high | medium | low",
  "confidence_level": "high | medium | low",
  "data_sources": {
    "fragrantica": true,
    "parfumo": false,
    "douglas": true,
    "notino": false,
    "basenotes": true,
    "official": false
  },
  "data_quality": {
    "noten_verifiziert": true,
    "preis_aktuell": true,
    "longevity_quelle": "Fragrantica Community (100+ Bewertungen)",
    "fehlende_daten": []
  }
}

REGELN (NICHT VERHANDELBAR):
✅ Nur ECHTE Daten aus verifizierten Quellen
✅ Noten MÜSSEN auf Deutsch sein (Bergamotte, nicht Bergamot)
✅ Concentration: EDP ist Standard, sonst recherchieren
✅ Intensity: Berechne aus Sillage (≤3=Leicht, 4-7=Mittel, ≥8=Intensiv)
✅ Rating: Von Community oder Durchschnitt von Fragrantica/Parfumo (0-10)
✅ long_description: Poetisch, natürlich, 3-4 Sätze, auf Deutsch
✅ bottle_description: Faktisch, Design-fokussiert
✅ scent_dna: Max 3 ähnliche Düfte (Names mit exakter Schreibweise)
✅ Bei unsicherem Wert → null (NICHT erfunden)
✅ data_sources: Nur true für recherchierte Quellen

WENN DUFT NICHT GEFUNDEN:
→ error: "Duft nicht auf Fragrantica/Parfumo verfügbar"

PRIORITÄT: Wahrheit > Vollständigkeit. Lieber null als erfunden.`;

    const messages: Anthropic.Messages.MessageParam[] = [
      { role: 'user', content: searchPrompt }
    ];

    let result_text = '';
    let stop_reason = '';

    while (true) {
      const response = await client.messages.create({
        model: 'claude-opus-4-5',
        max_tokens: 4096,
        tools: [
          {
            type: 'web_search_20250305',
            name: 'web_search'
          }
        ],
        messages
      });

      stop_reason = response.stop_reason;

      for (const block of response.content) {
        if (block.type === 'text') {
          result_text += block.text;
        }
      }

      if (stop_reason !== 'tool_use') {
        break;
      }

      const toolResults: Anthropic.Messages.ToolResultBlockParam[] = [];
      for (const block of response.content) {
        if (block.type === 'tool_use') {
          toolResults.push({
            type: 'tool_result',
            tool_use_id: block.id,
            content: ''
          });
        }
      }

      messages.push({ role: 'assistant', content: response.content });
      if (toolResults.length > 0) {
        messages.push({ role: 'user', content: toolResults });
      }
    }

    const jsonMatch = result_text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return NextResponse.json(
        {
          error: 'No valid JSON found in response',
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

    // Validate fragrance family
    const validFamilies = ['clean', 'gourmand', 'woody', 'floral'];
    let family = rawData.fragrance_family?.toLowerCase() || null;
    if (family && !validFamilies.includes(family)) {
      family = null;
    }

    // Validate gender
    const validGenders = ['Women', 'Men', 'Unisex'];
    let gender = rawData.gender || null;
    if (gender && !validGenders.includes(gender)) {
      gender = null;
    }

    // Validate concentration
    const validConcentrations = ['EDP', 'EDT', 'Extrait', 'Cologne', 'EDC', 'Spray'];
    let concentration = rawData.concentration || 'EDP';
    if (concentration && !validConcentrations.includes(concentration)) {
      concentration = null;
    }

    // Validate intensity
    const validIntensities = ['Leicht', 'Mittel', 'Intensiv'];
    let intensity = rawData.intensity || null;
    if (intensity && !validIntensities.includes(intensity)) {
      intensity = null;
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

    // Validate longevity/sillage
    let longevity: number | null = null;
    if (rawData.longevity && typeof rawData.longevity === 'number') {
      longevity = Math.max(1, Math.min(10, rawData.longevity));
    }

    let sillage: number | null = null;
    if (rawData.sillage && typeof rawData.sillage === 'number') {
      sillage = Math.max(1, Math.min(10, rawData.sillage));
    }

    // Validate rating
    let rating: number | null = null;
    if (rawData.rating && typeof rawData.rating === 'number') {
      rating = Math.max(0, Math.min(10, rawData.rating));
    }

    // Parse scent_dna
    let scent_dna: string[] = [];
    if (Array.isArray(rawData.scent_dna)) {
      scent_dna = rawData.scent_dna.filter((s: any) => typeof s === 'string').slice(0, 3);
    }

    // Build result
    const result: ResearchResult = {
      perfume_name: (rawData.perfume_name && typeof rawData.perfume_name === 'string') ? rawData.perfume_name.trim() : null,
      brand: (rawData.brand && typeof rawData.brand === 'string') ? rawData.brand.trim() : null,
      fragrance_family: family,
      gender: gender,
      price_chf: (rawData.price_chf && typeof rawData.price_chf === 'string') ? rawData.price_chf.trim() : null,
      longevity: longevity,
      sillage: sillage,
      scentmatch_score: null,
      season: season,
      occasion: occasion,
      top_notes: (rawData.top_notes && typeof rawData.top_notes === 'string') ? rawData.top_notes.trim() : null,
      heart_notes: (rawData.heart_notes && typeof rawData.heart_notes === 'string') ? rawData.heart_notes.trim() : null,
      base_notes: (rawData.base_notes && typeof rawData.base_notes === 'string') ? rawData.base_notes.trim() : null,
      image_url: null,
      affiliate_url: null,
      sources: Array.isArray(rawData.sources) ? rawData.sources.filter((s: any) => typeof s === 'string') : [],
      notes_confidence: ['high', 'medium', 'low'].includes(rawData.notes_confidence) ? rawData.notes_confidence : 'low',
      data_quality: rawData.data_quality || {
        noten_verifiziert: !!rawData.top_notes && !!rawData.heart_notes && !!rawData.base_notes,
        preis_aktuell: !!rawData.price_chf,
        longevity_quelle: rawData.data_quality?.longevity_quelle || undefined,
        fehlende_daten: rawData.data_quality?.fehlende_daten || []
      },
      // Pro fields
      concentration: concentration,
      long_description: (rawData.long_description && typeof rawData.long_description === 'string') ? rawData.long_description.trim() : null,
      bottle_description: (rawData.bottle_description && typeof rawData.bottle_description === 'string') ? rawData.bottle_description.trim() : null,
      intensity: intensity,
      scent_dna: scent_dna.length > 0 ? scent_dna : undefined,
      rating: rating,
      confidence_level: ['high', 'medium', 'low'].includes(rawData.confidence_level) ? rawData.confidence_level : 'low',
      data_sources: rawData.data_sources || {}
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
