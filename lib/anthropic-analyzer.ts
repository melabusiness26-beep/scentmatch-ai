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
        max_tokens: 4096,
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
                text: `Du bist der weltweit präziseste Parfüm-Erkennungsassistent mit Expertenwissen über tausende von Düften. Deine Aufgabe: Erkenne dieses Parfüm so genau wie möglich und erstelle ein vollständiges, korrektes Profil.

SCHRITT 1 – PRÄZISE TEXTERKENNUNG VOM FLAKON (KEINE VERPACKUNG NÖTIG):
🔍 NUR VOM FLAKON LESEN – Das ist der kritische Fokus:
- Etiketten-Text auf dem Glas: SEHR SORGFÄLTIG Buchstabe für Buchstabe lesen
- Text unter dem Etikett oder seitlich eingraviert/gedruckt
- Markenname: Oft oben großflächig sichtbar (z.B. "Cacharel", "La Rive")
- Produktname: Direkt unter oder über der Marke
- Konzentration: Oft unten auf dem Etikett oder Flakonboden
- Volumen: 50ml, 100ml etc. auf dem Label

KRITISCH – MARKEN NICHT VERWECHSELN (diese sind optisch ähnlich):
1. Cacharel Lou Lou:
   - Label: Elegante, sanfte Typographie mit „Cacharel" Premium-Look
   - Kappe: HELLBLAU mit ROTEM/BURGUNDROTEM dekorativen Ring
   - Flakon: Hellblau, konisch/klassische Form
   - Größe: Mittlere Flaschengröße
2. La Rive Blue Line:
   - Label: Einfachere, technischere Typographie
   - Kappe: Schlicht, einfarbig
   - Flakon: Hellblau aber verschiedene Form
   - Größe: Kompaktere Form

VERIFIZIERUNGSMETHODE:
- Lese Markenname 3x hintereinander von links nach rechts
- Lese Produktname 2x, achte auf alle Buchstaben
- Vergleiche mit bekannten ähnlichen Marken
- Bei Zweifel: Nenne beide Kandidaten mit confidence "medium"

Gender-Hinweise (Homme/Femme/Pour Homme/Pour Femme) → SOFORT erkennen

SCHRITT 2 – FLAKON-DESIGN (VISUELL-IDENTIFIKATION OHNE VERPACKUNG):
Diese visuellen Merkmale sind bei ähnlich aussehenden Flakons kritisch:

A) KAPPE/VERSCHLUSS:
- Material: Kunststoff, Metall, Holz
- Farbe: Exakte Farbe, Metallic ja/nein
- Dekorative Elemente: Bänder, Ringe, Gravuren
  * CACHAREL LOU LOU: Hellblaue Kappe mit dickem ROTEM/BURGUNDROTEM Ring
  * LA RIVE: Einfache, schlichte Kappe

B) FLAKONSFORM:
- Silhouette: Konisch, zylindrisch, bauchig, kantig
- Größe relativ zur Hand/Umgebung
- Schulter-Form: Breit, eng, abgerundet, eckig
- Basisform: Quadratisch, rund, sechseckig

C) FARBE & MATERIAL:
- Exakte Blauton (helles Hellblau vs. tieferes Blau vs. Petrol)
- Transparent vs. opak
- Glanz: Matt, halbmatt, hochglänzend

D) ETIKETT-POSITION & STIL:
- Oben, Mitte, unten auf dem Flakon
- Eingedruckt, aufgeklebt, eingraviert
- Farbe des Etiketts (weiß, beige, farbig)

SCHRITT 3 – FINALE VERIFIKATION (KRITISCH):
VIER-PUNKT-CHECK vor dem Antworten:
1. TEXT-VERIFIKATION: Markenname + Produktname 2x laut „lesen"
   ✓ La Rive Blue Line: "La" + "Rive" + "Blue" + "Line"
   ✓ Cacharel Lou Lou: "Cacharel" + "Lou" + "Lou"
   → Welches passt zum Bild?

2. KAPPEN-CHECK: Dekorative Elemente?
   ✓ Ist ein roter/burgunderroter RING sichtbar? → Cacharel Lou Lou
   ✓ Ist die Kappe schlicht? → Wahrscheinlich La Rive oder anderes

3. FORMVERGLEICH: Flakonsform korrekt identifiziert?
   - Konisch/spitz vs. kompakt?
   - Größe im Verhältnis zu Hand/Umgebung?

4. CONFIDENCE-BESTIMMUNG:
   - "high" (90-100%): Text völlig klar lesbar, Kappe + Form + Marke passen perfekt zusammen
   - "medium" (60-89%): Text lesbar aber ein Detail unklar, oder zwei Features passen sehr gut
   - "low" (<60%): Text verschwommen, oder mehrere Features passen nicht zusammen → NIEMALS raten!

⚠️ WICHTIG: Lieber confidence=low sagen, als falsch zu identifizieren!

ANTWORTE AUSSCHLIESSLICH mit gültigem JSON (kein Markdown, keine Erklärung davor/danach):

{
  "perfumeName": "exakter Produktname wie auf dem Flakon",
  "brandName": "Markenname",
  "confidence": "high|medium|low",
  "confidenceReason": "Kurze Begründung: was hat die Erkennung erschwert oder erleichtert",
  "year": null,
  "parfumeur": null,
  "originCountry": "Land",
  "concentration": "Parfum|EDP|EDT|Eau de Cologne|null",
  "family": "Duftfamilie auf Deutsch (z.B. Blumig-Fruchtig, Holzig-Orientalisch, Frisch-Aquatisch)",
  "gender": "woman|man|unisex — PFLICHT: Wenn 'Homme', 'Pour Homme', 'for Men', 'Man' auf dem Flakon steht → IMMER 'man'. Wenn 'Femme', 'Pour Femme', 'for Women', 'Woman' steht → IMMER 'woman'. Kein Raten: Falls kein Hinweis sichtbar → 'unisex'.",
  "intensity": "very_light|light|medium|strong|very_strong",
  "rating": 7.5,
  "sillage": 6,
  "longevity": 7,
  "projection": 6,
  "uniqueness": 5,
  "priceValue": 8,
  "notes": {
    "top": ["Deutsche Notennamen", "z.B. Bergamotte", "Zitrone"],
    "heart": ["Rose", "Jasmin"],
    "base": ["Sandelholz", "Moschus", "Vanille"]
  },
  "duftDNA": {"blumig": 35, "holzig": 20, "frisch": 25, "süss": 15, "würzig": 5},
  "poeticDescription": "2-3 emotionale Sätze auf Deutsch die den Duft lebendig beschreiben",
  "generalDescription": "1-2 sachliche Sätze zur Einführung",
  "duftJourney": {
    "morgen": "Wie trägt sich der Duft am Morgen?",
    "mittag": "Wie entwickelt er sich über den Tag?",
    "abend": "Abendliche Transformation",
    "nacht": "Nachtcharakter"
  },
  "development": {
    "opening": "Erste 10-30 Minuten auf der Haut",
    "middleGame": "Nach 1-2 Stunden",
    "drydown": "Trockene Basis nach mehreren Stunden"
  },
  "characterTags": ["5 bis 6 prägnante Schlagwörter"],
  "personalityType": "Welche Persönlichkeit passt zu diesem Duft?",
  "mood": "Stimmung in 2-3 Wörtern",
  "seasonRecommendation": "Frühling|Sommer|Herbst|Winter|Ganzjährig",
  "occasionList": ["Alltag", "Büro", "Date", "Abendessen", "Party"],
  "climate": ["warm", "kalt", "tropisch", "gemässigt"],
  "perfectMoment": "Eine kurze emotionale Geschichte: wann ist dieser Duft perfekt?",
  "bottleDescription": "Beschreibung des Flakons: Form, Farbe, Material, Besonderheiten",
  "comparisonPerfumes": [
    {"name": "Bekannter Duft 1", "reason": "Warum ähnlich"},
    {"name": "Bekannter Duft 2", "reason": "Warum ähnlich"},
    {"name": "Bekannter Duft 3", "reason": "Warum ähnlich"}
  ],
  "similarPerfumes": [
    {"name": "Empfehlung 1", "reason": "Warum empfohlen"},
    {"name": "Empfehlung 2", "reason": "Warum empfohlen"},
    {"name": "Empfehlung 3", "reason": "Warum empfohlen"},
    {"name": "Empfehlung 4", "reason": "Warum empfohlen"},
    {"name": "Empfehlung 5", "reason": "Warum empfohlen"}
  ],
  "funFacts": ["Interessanter Fakt 1", "Fakt 2", "Fakt 3"],
  "famouswearers": ["Prominente Person die diesen Duft trägt oder getragen hat"],
  "history": "Geschichte des Parfüms: Entstehung, Besonderheiten, kulturelle Bedeutung",
  "usageRecommendations": {
    "occasions": ["Anlass 1", "Anlass 2"],
    "seasons": ["Saison 1"],
    "timeOfDay": ["Morgen", "Abend"],
    "skinType": ["Trockene Haut", "Normale Haut"]
  }
}

PFLICHTREGELN:
- perfumeName und brandName: IMMER ausfüllen, auch wenn es nur ein educated guess ist
- Alle Duft-Noten (top/heart/base) IMMER auf Deutsch: "Bergamotte" nicht "Bergamot", "Vanille" nicht "Vanilla", "Moschus" nicht "Musk", "Zitrone" nicht "Lemon", "Rose" statt "Rosa"
- Jede Note NUR EINMAL (keine Duplikate zwischen top/heart/base)
- occasionList: IMMER als Array, nie null
- duftDNA-Werte müssen sich auf ~100 summieren
- confidence "high" = Text klar lesbar + Duft bekannt; "medium" = Duft erkannt aber unsicher; "low" = nur visueller Guess möglich
- Antworte NUR mit dem JSON-Objekt, kein Text davor oder danach`,
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

    // SICHERHEITS-CHECK: Parfümname und Marke auf Gender-Keywords prüfen.
    // Dieser Code überschreibt die KI-Antwort – verhindert falsche Gender-Labels.
    const nameToCheck = `${analysis.perfumeName || ''} ${analysis.brandName || ''}`.toLowerCase();
    const MAN_KEYWORDS = [
      'pour homme', 'for men', 'for him', 'homme', ' man ', 'men\'s',
      ' him ', 'herren', 'masculin', 'masculine', 'uomo', 'hombre',
    ];
    const WOMAN_KEYWORDS = [
      'pour femme', 'for women', 'for her', 'femme', ' woman ', 'women\'s',
      ' her ', 'damen', 'féminin', 'feminine', 'donna', 'mujer', 'elle ',
    ];
    const isManByName  = MAN_KEYWORDS.some(kw => nameToCheck.includes(kw));
    const isWomanByName = WOMAN_KEYWORDS.some(kw => nameToCheck.includes(kw));
    if (isManByName && !isWomanByName) {
      analysis.gender = 'man';
    } else if (isWomanByName && !isManByName) {
      analysis.gender = 'woman';
    }
    // Wenn kein Keyword gefunden und gender noch null/ungültig → sicherer Fallback
    if (!['man', 'woman', 'unisex'].includes(analysis.gender)) {
      analysis.gender = 'unisex';
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

    // occasionList-Bug: KI gibt manchmal 'occasion' (Array) statt 'occasionList' zurück
    if (!analysis.occasionList && Array.isArray(analysis.occasion)) {
      analysis.occasionList = analysis.occasion;
    }
    if (!Array.isArray(analysis.occasionList)) {
      analysis.occasionList = [];
    }

    // climate: sicherstellen dass es ein Array ist
    if (!Array.isArray(analysis.climate)) {
      analysis.climate = analysis.climate ? [analysis.climate] : [];
    }

    // characterTags: sicherstellen dass es ein Array ist
    if (!Array.isArray(analysis.characterTags)) {
      analysis.characterTags = [];
    }

    // Zahlen-Felder validieren (1–10 Bereich)
    const numericFields = ['rating', 'sillage', 'longevity', 'projection', 'uniqueness', 'priceValue'];
    for (const field of numericFields) {
      if (analysis[field] !== undefined && analysis[field] !== null) {
        const val = Number(analysis[field]);
        if (isNaN(val) || val < 1 || val > 10) {
          analysis[field] = null;
        } else {
          analysis[field] = Math.round(val * 10) / 10; // auf 1 Dezimalstelle runden
        }
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
