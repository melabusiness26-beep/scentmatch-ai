# Duft-Katalog („Mergen = fertig")

Jeder Duft ist eine Datei `perfumes/<slug>.json` – im gleichen Format wie der
Import-Block im Admin, plus `"slug"`.

- **Vor jedem Build** prüft `scripts/sync-catalog.mts` alle Dateien. Ist eine
  fehlerhaft (ungültiger Wert, Pflichtangabe fehlt, Dateiname ≠ slug), wird der
  Build gestoppt – die PR-Vorschau wird rot, live geht nichts.
- **Beim Production-Build** (nach dem Merge nach `main`) werden **neue** Düfte in
  Supabase eingetragen, fehlende Marken angelegt. Bestehende Düfte (gleicher slug
  oder gleiche Marke + Name + Konzentration) werden **nie geändert oder gelöscht**.
  Korrekturen an bestehenden Düften laufen über den Admin.
- Die Dateien der bestehenden Düfte sind zugleich eine Sicherung (Stand beim Export).
- Abschalten: Umgebungsvariable `CATALOG_SYNC=off` in Vercel.

Pflichtangaben: slug, perfume_name, brand, gender, fragrance_family, concentration,
season, occasion. Alles andere ist freiwillig – nur echte, geprüfte Angaben eintragen.
