import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { requireAdmin } from '@/lib/admin-auth';

const client = new Anthropic();

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
  // Pro Status Fields
  concentration?: string | null;
  long_description?: string | null;
  bottle_description?: string | null;
  intensity?: string | null;
  scent_dna?: string[];
  rating?: number | null;
  confidence_level?: string | null;
  data_sources?: Record<string, boolean>;
  // EXTENDED FIELDS
  launch_year?: number | null;
  volume_ml?: number | null;
  niche_vs_mass_market?: string | null;
  awards?: string | null;
  official_website?: string | null;
  availability_status?: string | null;
  gender_nuance?: string | null;
  comparable_fragrances?: string | null;
  concentration_detail?: string | null;
  // PROGRESSION FIELD
  fragrance_progression?: string | null;
  error?: string;
}

export async function POST(req: NextRequest) {
  try {
    const denied = await requireAdmin(req);
    if (denied) return denied;

    const { brand, name } = await req.json();

    if (!brand || !name) {
      return NextResponse.json(
        { error: 'Brand and name are required' },
        { status: 400 }
      );
    }

    const searchPrompt = `Du recherchierst das Parfum "${brand} - ${name}" für auressa.ch — eine Premium-Duft-Beratungsplattform.

MISSION: Extrahiere ALLE verfügbaren, 100% KORREKT verifizierten Informationen.

QUELLEN (Priorität):
1. **Fragrantica.com** → Noten, Launch-Jahr, Community-Scores, Bewertungen, Awards
2. **Parfumo.com** → Verifizierte Bewertungen, Longevity/Sillage, Launch-Info
3. **Douglas.ch / Notino.ch** → Schweizer Preise CHF, Konzentration, Größe/ml
4. **Basenotes.net** → Experten-Info, Intensität, Vergleiche
5. **Offizielle Hersteller-Website** → Launch-Jahr, Volume, Niche/Mass-Info, Awards

WICHTIG: **Nur 100% KORREKTE Daten recherchieren. Lieber null als falsch!**

OUTPUT: Vollständiges JSON mit DIESER STRUKTUR:

{
  "perfume_name": "Exakte offizielle Schreibweise",
  "brand": "Korrekte Marke",
  "fragrance_family": "clean | gourmand | woody | floral",
  "gender": "Women | Men | Unisex",
  "gender_nuance": "feminine | masculine | androgynous | sporty-feminine | oder null",
  "concentration": "EDP | EDT | Extrait | Cologne | EDC | Spray | oder null",
  "concentration_detail": "z.B. 'Eau de Toilette Spray 100ml' - präzise Angabe",
  "top_notes": "Bergamotte, Grapefruit, Zitrone (DEUTSCH, Komma-getrennt)",
  "heart_notes": "Jasmin, Veilchen, Gardenie (DEUTSCH, Komma-getrennt)",
  "base_notes": "Zedernholz, Moschus, Sandelholz (DEUTSCH, Komma-getrennt)",
  "longevity": 6 oder null (1-10, verifiziert von Community),
  "sillage": 7 oder null (1-10, verifiziert von Community),
  "intensity": "Leicht | Mittel | Intensiv (basierend auf Sillage + Bewertungen)",
  "season": "Frühling | Sommer | Herbst/Winter | Winter | Ganzjährig",
  "occasion": "Alltag | Büro | Date | Abend (Komma-getrennt)",
  "price_chf": "74.92" oder null (aktueller Schweizer Preis),
  "rating": 7.5 oder null (0-10, Community-Durchschnitt oder Fragrantica-Score),
  "launch_year": 2001 oder null (JAHR der Lancierung, nicht null wenn auffindbar!),
  "volume_ml": 100 oder null (Größe des Standard-Flakons in ml),
  "niche_vs_mass_market": "niche | mass_market | prestige | direct_distribution",
  "awards": "Best Fragrance 2020, Fragrantica Award, oder null (Komma-getrennt)",
  "official_website": "https://www.dolceandgabbana.com/... oder null",
  "availability_status": "available | discontinued | limited_edition",
  "comparable_fragrances": "Versace Bright Crystal, Giorgio Armani Acqua di Gioia, oder null (Komma-getrennt, max 5)",
  "long_description": "Ausführliche, poetische deutsche Beschreibung (3-4 Sätze, 100-150 Wörter). Beispiel: 'Light Blue von Dolce & Gabbana ist ein sommerfrisches Eau de Toilette, das Eleganz und Leichtigkeit verkörpert. Die Kopfnoten öffnen mit zitronigen Akkorden, während die Herznoten subtile Blütennoten zeigen. Im Basisakkord sorgen holzige Noten für Tiefe. Der Duft ist zeitlos und perfekt für warme Jahreszeiten.'",
  "bottle_description": "Beschreibung des Flakons (Farbe, Material, Form). Beispiel: 'Ein ikonischer, rechteckiger Flakon aus klarem Glas. Die hellblaue Flüssigkeit ist sichtbar. Die weiße Kappe mit Aufschrift kontrastiert elegant. Das Design ist minimalistisch und modern.'",
  "scent_dna": ["Duft 1", "Duft 2", "Duft 3"] (max 3, exakte Namen),
  "sources": ["Fragrantica: ...", "Douglas.ch: ...", ...] (Quellen mit Links/Info),
  "notes_confidence": "high | medium | low",
  "confidence_level": "high | medium | low",
  "data_sources": {
    "fragrantica": true,
    "parfumo": false,
    "douglas": true,
    "notino": false,
    "basenotes": true,
    "official": false
  }
}

REGELN (NICHT VERHANDELBAR - ABSOLUT KRITISCH FÜR QUALITÄT):
✅ Nur ECHTE, verifizierte Daten aus Fragrantica, Parfumo, Douglas, Notino, Basenotes
✅ Noten MÜSSEN auf Deutsch sein
✅ launch_year: PRIORITÄT HOCH - searchiere Official Websites + Fragrantica!
✅ volume_ml: Der Standard-Flakon (meist 100ml, aber 75ml/50ml prüfen!)
✅ Bewertung (rating): Von Fragrantica Community-Score oder Parfumo-Durchschnitt
✅ Bei unsicheren Werten → null (NICHT erfunden!)
✅ comparable_fragrances: Nur bekannte, ähnliche Düfte
✅ availability_status: Aktueller Status - still selling oder discontinued?
✅ KRITISCH - awards: NUR ECHTE, VERIFIZIERTE AWARDS! Keine erfundenen! Prüfe Launch-Jahr!
✅ KRITISCH - gender_nuance: PRÄZISE basierend auf echten Community-Bewertungen! "feminine" oder "masculine" oder "androgynous" - NICHT mehrere zusammen!
✅ **ALLE DATEN 100% KORREKT ODER NULL - KEINE FEHLER ERLAUBT!**`;

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

    // Validate niche_vs_mass_market
    const validMarketTypes = ['niche', 'mass_market', 'prestige', 'direct_distribution'];
    let niche_vs_mass = rawData.niche_vs_mass_market || null;
    if (niche_vs_mass && !validMarketTypes.includes(niche_vs_mass.toLowerCase())) {
      niche_vs_mass = null;
    }

    // Validate availability_status
    const validAvailability = ['available', 'discontinued', 'limited_edition'];
    let availability = rawData.availability_status || 'available';
    if (availability && !validAvailability.includes(availability.toLowerCase())) {
      availability = 'available';
    }

    // Validate gender_nuance - MUST BE SINGULAR!
    const validGenderNuances = ['masculine', 'feminine', 'androgynous', 'sporty', 'fresh'];
    let gender_nuance = rawData.gender_nuance || null;
    if (gender_nuance && typeof gender_nuance === 'string') {
      const nuances = gender_nuance.split(',').map(n => n.trim().toLowerCase());
      gender_nuance = nuances.find(n => validGenderNuances.includes(n)) || null;
    }

    // Validate awards - filter suspicious data
    let awards = rawData.awards || null;
    if (awards && typeof awards === 'string') {
      awards = awards.trim();
      if (awards.length === 0) awards = null;
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

    // Validate launch_year
    let launch_year: number | null = null;
    if (rawData.launch_year && typeof rawData.launch_year === 'number') {
      if (rawData.launch_year > 1900 && rawData.launch_year <= new Date().getFullYear()) {
        launch_year = rawData.launch_year;
      }
    }

    // Validate volume_ml
    let volume_ml: number | null = null;
    if (rawData.volume_ml && typeof rawData.volume_ml === 'number') {
      if (rawData.volume_ml > 0 && rawData.volume_ml <= 500) {
        volume_ml = rawData.volume_ml;
      }
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
      // Pro fields
      concentration: concentration,
      long_description: (rawData.long_description && typeof rawData.long_description === 'string') ? rawData.long_description.trim() : null,
      bottle_description: (rawData.bottle_description && typeof rawData.bottle_description === 'string') ? rawData.bottle_description.trim() : null,
      intensity: intensity,
      scent_dna: scent_dna.length > 0 ? scent_dna : undefined,
      rating: rating,
      confidence_level: ['high', 'medium', 'low'].includes(rawData.confidence_level) ? rawData.confidence_level : 'low',
      data_sources: rawData.data_sources || {},
      // Extended fields
      launch_year: launch_year,
      volume_ml: volume_ml,
      niche_vs_mass_market: niche_vs_mass,
      awards: awards,
      official_website: (rawData.official_website && typeof rawData.official_website === 'string') ? rawData.official_website.trim() : null,
      availability_status: availability,
      gender_nuance: gender_nuance,
      comparable_fragrances: (rawData.comparable_fragrances && typeof rawData.comparable_fragrances === 'string') ? rawData.comparable_fragrances.trim() : null,
      concentration_detail: (rawData.concentration_detail && typeof rawData.concentration_detail === 'string') ? rawData.concentration_detail.trim() : null
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
