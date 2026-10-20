// Brevo (Sendinblue) API Integration für Newsletter-Automation
// Dokumentation: https://developers.brevo.com/reference/

const BREVO_API_BASE = 'https://api.brevo.com/v3';

interface BrevoAttribute {
  [key: string]: string | number | boolean;
}

interface BrevoContact {
  email: string;
  attributes?: BrevoAttribute;
  listIds?: number[];
  updateEnabled?: boolean;
}

interface BrevoTransactionalEmail {
  email: string;
  templateId: number;
  params?: Record<string, string | string[]>;
  attributes?: BrevoAttribute;
}

interface PerfumeRecommendation {
  slug: string;
  name: string;
  brand: string;
  family: string;
  score: number;
}

export async function createOrUpdateContact(
  email: string,
  attributes: BrevoAttribute,
  listIds?: number[]
): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    console.warn('BREVO_API_KEY not configured');
    return { success: false, error: 'Brevo API key not configured' };
  }

  try {
    const contact: BrevoContact = {
      email,
      attributes,
      updateEnabled: true,
    };

    if (listIds && listIds.length > 0) {
      contact.listIds = listIds;
    }

    const response = await fetch(`${BREVO_API_BASE}/contacts`, {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(contact),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Brevo contact creation error:', response.status, error);
      return { success: false, error: `Brevo error: ${response.status}` };
    }

    return { success: true };
  } catch (error) {
    console.error('Brevo request error:', error);
    return { success: false, error: String(error) };
  }
}

export async function updateContactAttributes(
  email: string,
  attributes: BrevoAttribute
): Promise<{ success: boolean; error?: string }> {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    console.warn('BREVO_API_KEY not configured');
    return { success: false, error: 'Brevo API key not configured' };
  }

  try {
    const response = await fetch(`${BREVO_API_BASE}/contacts/${email}`, {
      method: 'PUT',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ attributes }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Brevo attribute update error:', response.status, error);
      return { success: false, error: `Brevo error: ${response.status}` };
    }

    return { success: true };
  } catch (error) {
    console.error('Brevo request error:', error);
    return { success: false, error: String(error) };
  }
}

export async function sendTransactionalEmail(
  email: string,
  templateId: number,
  params?: Record<string, string | string[]>,
  attributes?: BrevoAttribute
): Promise<{ success: boolean; messageId?: string; error?: string }> {
  const apiKey = process.env.BREVO_API_KEY;

  if (!apiKey) {
    console.warn('BREVO_API_KEY not configured');
    return { success: false, error: 'Brevo API key not configured' };
  }

  try {
    const payload: Record<string, any> = {
      to: [{ email }],
      templateId,
    };

    if (params && Object.keys(params).length > 0) {
      payload.params = params;
    }

    if (attributes && Object.keys(attributes).length > 0) {
      payload.attributes = attributes;
    }

    const response = await fetch(`${BREVO_API_BASE}/smtp/email`, {
      method: 'POST',
      headers: {
        'api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Brevo email send error:', response.status, error);
      return { success: false, error: `Brevo error: ${response.status}` };
    }

    const data = await response.json();
    return { success: true, messageId: data.messageId };
  } catch (error) {
    console.error('Brevo email request error:', error);
    return { success: false, error: String(error) };
  }
}

// Helper: Generiere Top 3-5 Duft-Empfehlungen basierend auf Verhalten
export async function generateRecommendedPerfumes(
  behavior: {
    viewedPerfumeIds?: string[];
    viewedCategories?: string[];
    viewedFamilies?: string[];
  },
  count: number = 3,
  allPerfumes?: any[]
): Promise<PerfumeRecommendation[]> {
  // Wenn Perfume-Daten übergeben werden, nutze diese
  if (allPerfumes && allPerfumes.length > 0) {
    // Scoring-Logik:
    // 1. Bevorzugte Familien höher bewerten
    // 2. Hohe scentmatch_score bevorzugen
    // 3. Schon angesehene Düfte ausschließen

    const viewedIds = new Set(behavior.viewedPerfumeIds || []);
    const preferredFamilies = new Set(behavior.viewedFamilies || []);

    const scored = allPerfumes
      .filter((p) => !viewedIds.has(p.slug)) // Schließe angesehene aus
      .map((p) => {
        let score = p.scentmatch_score || 70;

        // Bonus für bevorzugte Familien
        if (preferredFamilies.has(p.fragrance_family)) {
          score += 15;
        }

        // Bonus für gutes Base-Score
        if (p.scentmatch_score && p.scentmatch_score >= 85) {
          score += 10;
        }

        return {
          slug: p.slug,
          name: p.perfume_name,
          brand: p.brands?.name || 'Unknown',
          family: p.fragrance_family || 'Unknown',
          score: Math.min(score, 100), // Cap at 100
        };
      })
      .sort((a, b) => b.score - a.score)
      .slice(0, count);

    return scored;
  }

  // Fallback: Mock-Daten wenn keine Perfumes übergeben
  const recommendations: PerfumeRecommendation[] = [
    {
      slug: 'black-opium',
      name: 'Black Opium',
      brand: 'Yves Saint Laurent',
      family: 'Gourmand',
      score: 95,
    },
    {
      slug: 'la-vie-est-belle',
      name: 'La Vie Est Belle',
      brand: 'Lancôme',
      family: 'Floral',
      score: 90,
    },
    {
      slug: 'coco-mademoiselle',
      name: 'Coco Mademoiselle',
      brand: 'Chanel',
      family: 'Floral',
      score: 92,
    },
  ];

  return recommendations.slice(0, count);
}

// Helper: Formatiere Düfte-Liste für Email
export function formatPerfumesForEmail(
  perfumes: PerfumeRecommendation[]
): string {
  return perfumes
    .map(
      (p) =>
        `${p.name} von ${p.brand} (${p.family}) - Score: ${p.score}/100`
    )
    .join('\n');
}

// Helper: Konvertiere Gender-Code zu Deutsche Beschreibung
export function getInterestLabel(code?: string): string {
  if (!code) return 'Alle Düfte';
  const labels: Record<string, string> = {
    women: 'Frauendüfte',
    men: 'Männerdüfte',
    unisex: 'Unisex',
  };
  return labels[code] || 'Alle Düfte';
}

// Helper: Brevo Attribute aus Subscriber-Daten generieren
export function generateBrevoAttributes(data: {
  name?: string;
  interest?: string;
  source?: string;
  viewedPerfumeIds?: string[];
  viewedFamilies?: string[];
}): BrevoAttribute {
  const attributes: BrevoAttribute = {
    REGISTRATION_DATE: new Date().toISOString().split('T')[0],
  };

  if (data.name) {
    attributes.FIRSTNAME = data.name;
  }

  if (data.interest) {
    attributes.INTEREST = getInterestLabel(data.interest);
    attributes.INTEREST_CODE = data.interest; // For automation logic
  }

  if (data.source) {
    attributes.REGISTRATION_SOURCE = data.source;
  }

  if (data.viewedPerfumeIds && data.viewedPerfumeIds.length > 0) {
    attributes.VIEWED_PERFUMES_COUNT = data.viewedPerfumeIds.length;
    attributes.LAST_VIEWED_PERFUME = data.viewedPerfumeIds[
      data.viewedPerfumeIds.length - 1
    ] as string;
  }

  if (data.viewedFamilies && data.viewedFamilies.length > 0) {
    attributes.FAVORITE_FAMILIES = data.viewedFamilies.join(', ');
  }

  return attributes;
}
