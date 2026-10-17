#!/usr/bin/env python3
"""
Auressa Parfum-Recherche Tool
Verwendung: python parfum_research.py "Marke" "Duftname"
Beispiel:   python parfum_research.py "Jardin Bohème" "Épisode Romantique Orchidée Sublime"
"""

import anthropic
import sys
import json
import re

def research_perfume(brand: str, name: str) -> dict:
    """Recherchiert alle Infos zu einem Parfum via Claude mit Web Search."""

    client = anthropic.Anthropic()

    search_prompt = f"""
Du recherchierst das Parfum "{brand} - {name}" für eine Schweizer Duft-Plattform (auressa.ch).

Suche auf folgenden Quellen und extrahiere ALLE verfügbaren, wahrheitsgemässen Informationen:
1. Fragrantica.com (Noten, Bewertungen, Accord)
2. Parfumo.com (Bewertungen, Longevity, Sillage)
3. Douglas.ch (Schweizer Preis CHF)
4. Weitere Shops (Flaconi, Notino, Parfumdreams.ch) für Preisvergleich

Gib die Antwort als JSON zurück mit dieser exakten Struktur:
{{
  "brand": "Markenname",
  "name": "Duftname",
  "slug": "duftname-als-slug",
  "gender": "Women / Men / Unisex",
  "family": "Duftfamilie auf Englisch",
  "top_notes": ["Note1", "Note2"],
  "heart_notes": ["Note1", "Note2"],
  "base_notes": ["Note1", "Note2"],
  "scentmatch_score": null,
  "longevity": null,
  "sillage": null,
  "season": ["Frühling", "Sommer", "Herbst", "Winter"],
  "occasion": ["Alltag", "Date", "Büro", "Abends", "Besondere Anlässe"],
  "price_chf": "XX CHF",
  "description_de": "Kurze deutsche Beschreibung (2-3 Sätze)",
  "sources": ["Quelle1", "Quelle2"],
  "notes_confidence": "high / medium / low",
  "price_source": "Wo der Preis gefunden wurde"
}}

Wichtig:
- Nur wahrheitsgemässe Daten, keine Erfindungen
- Bei unbekannten Werten: null eintragen
- Longevity und Sillage: Skala 1-10
- Scentmatch Score: Skala 0-100
- Slug: Kleinbuchstaben, Bindestriche statt Leerzeichen, keine Sonderzeichen
- Preise bevorzugt von douglas.ch (Schweiz), sonst Umrechnung von EUR angeben
"""

    print(f"\n🔍 Recherchiere: {brand} - {name}")
    print("=" * 50)

    # Claude mit Web Search Tool – Agentic Loop
    messages = [{"role": "user", "content": search_prompt}]
    tools = [{
        "type": "web_search_20250305",
        "name": "web_search",
        "max_uses": 10
    }]

    result_text = ""
    while True:
        response = client.messages.create(
            model="claude-sonnet-4-5",
            max_tokens=4096,
            tools=tools,
            messages=messages
        )

        # Text aus dieser Runde sammeln
        for block in response.content:
            if hasattr(block, 'text'):
                result_text += block.text

        # Fertig wenn stop_reason nicht tool_use
        if response.stop_reason != "tool_use":
            break

        # Tool-Ergebnisse zurückschicken (web_search läuft server-seitig)
        messages.append({"role": "assistant", "content": response.content})
        tool_results = []
        for block in response.content:
            if block.type == "tool_use":
                print(f"  🌐 Suche: {block.input.get('query', '')}")
                tool_results.append({
                    "type": "tool_result",
                    "tool_use_id": block.id,
                    "content": ""  # Web Search gibt Ergebnisse direkt zurück
                })
        if tool_results:
            messages.append({"role": "user", "content": tool_results})

    # JSON aus Antwort extrahieren
    json_match = re.search(r'\{[\s\S]*\}', result_text)
    if json_match:
        try:
            data = json.loads(json_match.group())
            return data
        except json.JSONDecodeError:
            print("⚠️  JSON-Parsing fehlgeschlagen, rohe Antwort:")
            print(result_text)
            return {}

    print("⚠️  Kein JSON gefunden in Antwort:")
    print(result_text)
    return {}


def format_datenblatt(data: dict) -> str:
    """Formatiert die Daten als Auressa-Datenblatt."""

    def list_to_str(lst, sep="\n  • "):
        if not lst:
            return "  • –"
        return sep + sep.join(lst)

    def score_str(val, max_val):
        return f"{val} (von {max_val})" if val is not None else "– (nicht bewertet)"

    season_str = ", ".join(data.get("season", [])) or "–"
    occasion_str = ", ".join(data.get("occasion", [])) or "–"
    sources_str = "\n".join([f"✅ {s}" for s in data.get("sources", [])]) or "–"

    output = f"""
═════════════════════════════════════════════════════
          {data.get('brand', '').upper()} {data.get('name', '').upper()}
═════════════════════════════════════════════════════

BASIC INFO
──────────
Marke / Brand:           {data.get('brand', '–')}
Duftname / Name:         {data.get('name', '–')}
Slug:                    {data.get('slug', '–')}
Geschlecht / Gender:     {data.get('gender', '–')}
Duftfamilie / Family:    {data.get('family', '–')}

NOTEN / NOTES
─────────────
Kopfnoten / Top:{list_to_str(data.get('top_notes', []))}

Herznoten / Heart:{list_to_str(data.get('heart_notes', []))}

Basisnoten / Base:{list_to_str(data.get('base_notes', []))}

BEWERTUNGEN / RATINGS
─────────────────────
Scentmatch Score:        {score_str(data.get('scentmatch_score'), 100)}
Longevity:               {score_str(data.get('longevity'), 10)}
Sillage:                 {score_str(data.get('sillage'), 10)}

KONTEXT / CONTEXT
─────────────────
Saison / Season:         {season_str}
Anlass / Occasion:       {occasion_str}
Preis / Price CHF:       {data.get('price_chf', '– CHF')}
Beschreibung:            {data.get('description_de', '–')}

QUELLEN / SOURCES
─────────────────
{sources_str}
Preis-Quelle:            {data.get('price_source', '–')}
Daten-Konfidenz:         {data.get('notes_confidence', '–')}

═════════════════════════════════════════════════════
"""
    return output


def main():
    if len(sys.argv) < 3:
        print("Verwendung: python parfum_research.py \"Marke\" \"Duftname\"")
        print("Beispiel:   python parfum_research.py \"Jardin Bohème\" \"Épisode Romantique Orchidée Sublime\"")
        sys.exit(1)

    brand = sys.argv[1]
    name = sys.argv[2]

    # Recherche
    data = research_perfume(brand, name)

    if not data:
        print("❌ Recherche fehlgeschlagen.")
        sys.exit(1)

    # Datenblatt ausgeben
    datenblatt = format_datenblatt(data)
    print(datenblatt)

    # Optional: Als JSON speichern
    slug = data.get('slug', 'parfum').replace('/', '-')
    json_file = f"{slug}.json"
    with open(json_file, 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=2)
    print(f"💾 Rohdaten gespeichert: {json_file}")


if __name__ == "__main__":
    main()
