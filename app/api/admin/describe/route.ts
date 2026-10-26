import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';
import { requireAdmin } from '@/lib/admin-auth';

// „Text vorschlagen" im Admin: Claude schreibt eine Duftbeschreibung NUR aus
// den Daten im Formular. Die Gründerin liest den Vorschlag, passt ihn an und
// speichert ihn selbst – nichts wird automatisch veröffentlicht.
// Braucht ANTHROPIC_API_KEY in Vercel.

// Ein Textvorschlag kann einige Sekunden dauern.
export const maxDuration = 60;

const SYSTEM = `Du schreibst Duftbeschreibungen für Auressa (auressa.ch), eine Schweizer Plattform, die Düfte empfiehlt. Leserinnen und Leser sind 18 bis 40 Jahre alt.

So schreibst du:
- Deutsch in Schweizer Schreibweise: immer „ss", nie „ß". Beträge als „CHF 60".
- Wie eine erfahrene Duft-Redakteurin: konkret, sinnlich, ruhig im Ton. Kurze und mittellange Sätze.
- Beschreibe, wie sich die Noten anfühlen und zusammenwirken, statt sie nur aufzuzählen. Nenne aber keine Note, die nicht in den Daten steht.
- Drei Absätze, getrennt durch eine Leerzeile, insgesamt 110 bis 170 Wörter. Erster Absatz: Hintergrund (falls angegeben) und Charakter. Zweiter: Duftverlauf und wann er passt. Dritter: kurze, ehrliche Einordnung zu Haltbarkeit, Ausstrahlung und Preis.

Verboten:
- Erfinden. Verwende nur die gelieferten Daten. Keine Angaben zu Beliebtheit, Verkaufszahlen, Auszeichnungen, Prominenten, Inhaltsstoffen, Herkunft der Rohstoffe oder Jahreszahlen, die nicht geliefert wurden. Fehlt ein Feld, lass das Thema weg.
- Übertreiben. Keine Superlative wie „der beste", „unvergleichlich", „ein wahres Meisterwerk". Haltbarkeit und Ausstrahlung ehrlich nach den Werten beschreiben (0 bis 10): unter 5 eher kurz bzw. hautnah, 5 bis 6 mittel, ab 7 lange bzw. deutlich.
- Floskeln und typische Werbesprache: „verführerisch", „betörend", „unwiderstehlich", „Entdecke", „Tauche ein", „Duftreise", „Signature-Duft", „ein Hauch von Luxus".
- Fragen an die Leserin, Ausrufezeichen, Emojis, Aufzählungen, Überschriften, Gedankenstriche als Stilmittel.
- Über Auressa selbst sprechen oder zum Kauf auffordern.

Gib nur den fertigen Text zurück, ohne Einleitung oder Kommentar.`;

type DescribeInput = {
  perfume_name?: string;
  brand?: string;
  concentration?: string;
  gender?: string;
  fragrance_family?: string;
  top_notes?: string;
  heart_notes?: string;
  base_notes?: string;
  season?: string;
  occasion?: string;
  longevity?: string;
  sillage?: string;
  price_chf?: string;
  volume_ml?: string;
  release_year?: string;
  perfumer?: string;
  inspiration?: string;
};

const FAMILY: Record<string, string> = {
  clean: 'frisch / clean',
  gourmand: 'süss / gourmand',
  woody: 'holzig',
  floral: 'blumig'
};
const GENDER: Record<string, string> = { Women: 'Damen', Men: 'Herren', Unisex: 'Unisex' };
const CONCENTRATION: Record<string, string> = {
  EdP: 'Eau de Parfum',
  EdT: 'Eau de Toilette',
  EdC: 'Eau de Cologne',
  Extrait: 'Extrait de Parfum',
  Cologne: 'Cologne'
};

// Nur ausgefüllte Felder kommen in die Anfrage – so kann Claude Fehlendes nicht „ergänzen".
function dataBlock(d: DescribeInput): string {
  const s = (v?: string) => (v ?? '').toString().trim().slice(0, 300);
  const rows: [string, string][] = [
    ['Name', s(d.perfume_name)],
    ['Marke', s(d.brand)],
    ['Konzentration', CONCENTRATION[s(d.concentration)] || s(d.concentration)],
    ['Für', GENDER[s(d.gender)] || s(d.gender)],
    ['Duftfamilie', FAMILY[s(d.fragrance_family)] || s(d.fragrance_family)],
    ['Kopfnoten', s(d.top_notes)],
    ['Herznoten', s(d.heart_notes)],
    ['Basisnoten', s(d.base_notes)],
    ['Saison', s(d.season)],
    ['Anlass', s(d.occasion)],
    ['Haltbarkeit (0–10)', s(d.longevity)],
    ['Ausstrahlung / Sillage (0–10)', s(d.sillage)],
    ['Richtpreis', s(d.price_chf) ? `CHF ${s(d.price_chf)}${s(d.volume_ml) ? ` für ${s(d.volume_ml)} ml` : ''}` : ''],
    ['Erscheinungsjahr', s(d.release_year)],
    ['Komponiert von', s(d.perfumer)],
    ['Inspiration', s(d.inspiration)]
  ];
  return rows
    .filter(([, v]) => v)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n');
}

export async function POST(request: NextRequest) {
  const denied = await requireAdmin(request);
  if (denied) return denied;

  if (!process.env.ANTHROPIC_API_KEY) {
    return NextResponse.json(
      { error: 'ANTHROPIC_API_KEY fehlt in Vercel – Textvorschläge sind noch nicht eingerichtet.' },
      { status: 503 }
    );
  }

  let input: DescribeInput;
  try {
    input = (await request.json()) as DescribeInput;
  } catch {
    return NextResponse.json({ error: 'Ungültige Anfrage' }, { status: 400 });
  }
  if (!input.perfume_name?.trim()) {
    return NextResponse.json({ error: 'Duftname fehlt' }, { status: 400 });
  }
  if (!input.top_notes?.trim() && !input.heart_notes?.trim() && !input.base_notes?.trim()) {
    return NextResponse.json({ error: 'Bitte zuerst die Duftnoten eintragen.' }, { status: 400 });
  }

  const client = new Anthropic();
  try {
    const response = await client.beta.messages.create({
      model: 'claude-opus-5-5',
      max_tokens: 16000,
      output_config: { effort: 'medium' },
      betas: ['server-side-fallback-2026-07-01'],
      fallbacks: 'default',
      system: SYSTEM,
      messages: [
        {
          role: 'user',
          content: `Schreibe die Beschreibung für diesen Duft. Verwende ausschliesslich diese Daten:\n\n${dataBlock(input)}`
        }
      ]
    });

    if (response.stop_reason === 'refusal') {
      return NextResponse.json({ error: 'Claude hat diesen Text abgelehnt. Bitte nochmals versuchen.' }, { status: 502 });
    }

    const text = response.content
      .filter((b): b is Anthropic.Beta.Messages.BetaTextBlock => b.type === 'text')
      .map((b) => b.text)
      .join('')
      .replace(/ß/g, 'ss')
      .trim();
    if (!text) {
      return NextResponse.json({ error: 'Kein Text erhalten. Bitte nochmals versuchen.' }, { status: 502 });
    }
    return NextResponse.json({ text });
  } catch (error) {
    if (error instanceof Anthropic.AuthenticationError) {
      return NextResponse.json({ error: 'Der Anthropic-Schlüssel in Vercel ist ungültig.' }, { status: 502 });
    }
    if (error instanceof Anthropic.RateLimitError) {
      return NextResponse.json({ error: 'Zu viele Anfragen – bitte kurz warten.' }, { status: 429 });
    }
    if (error instanceof Anthropic.APIError) {
      console.error('describe: Anthropic-Fehler', error.status, error.message);
      return NextResponse.json({ error: `Fehler bei Claude (${error.status ?? 'unbekannt'}).` }, { status: 502 });
    }
    console.error('describe: unerwarteter Fehler', error);
    return NextResponse.json({ error: 'Unerwarteter Fehler.' }, { status: 500 });
  }
}
