// Test: Reproduziert die Vorschau mit echten Daten
// Nimmt echte Perfume-Objekte + echte Noten-Häufigkeiten von dir

import { computeSimilarity } from './lib/similarity';
import type { Perfume } from './lib/perfumes';

// Du füllst diese Daten aus Supabase ein
const BLACK_OPIUM: Perfume = {
  id: 'black-opium-id',
  perfume_name: 'Black Opium',
  slug: 'black-opium',
  gender: 'Women',
  fragrance_family: 'gourmand',
  price_chf: 85,
  longevity: null,
  sillage: null,
  scentmatch_score: null,
  season: null,
  occasion: null,
  description: null,
  image_url: null,
  affiliate_url: null,
  top_notes: ['rosa pfeffer', 'orangenblüte', 'birne'],
  heart_notes: ['kaffee', 'jasmin'],
  base_notes: ['vanille', 'patchouli', 'zedernholz'],
  brands: { name: 'Yves Saint Laurent', slug: null, country: null }
};

const ASAD: Perfume = {
  id: 'asad-id',
  perfume_name: 'Asad',
  slug: 'asad',
  gender: 'Unisex',
  fragrance_family: 'woody',
  price_chf: null,
  longevity: null,
  sillage: null,
  scentmatch_score: null,
  season: null,
  occasion: null,
  description: null,
  image_url: null,
  affiliate_url: null,
  top_notes: ['bergamotte', 'schwarzer pfeffer', 'ananas'],
  heart_notes: ['tabak', 'kaffee'],
  base_notes: ['vanille', 'zedernholz', 'patchouli'],
  brands: { name: 'Lattafa', slug: null, country: null }
};

const SI_PASSIONE: Perfume = {
  id: 'si-passione-id',
  perfume_name: 'Sì Passione',
  slug: 'si-passione',
  gender: 'Women',
  fragrance_family: 'floral',
  price_chf: 65,
  longevity: null,
  sillage: null,
  scentmatch_score: null,
  season: null,
  occasion: null,
  description: null,
  image_url: null,
  affiliate_url: null,
  top_notes: ['birne', 'pink pfeffer'],
  heart_notes: ['rose', 'jasmin'],
  base_notes: ['vanille', 'patchouli', 'zedernholz'],
  brands: { name: 'Armani', slug: null, country: null }
};

// Pool: Muss alle 409+ Perfumes enthalten, um echte Häufigkeiten zu berechnen
// Hier ein Platzhalter - du ersetzt mit echten Daten von Supabase
const POOL: Perfume[] = [BLACK_OPIUM, ASAD, SI_PASSIONE];
// TODO: Laden aus Supabase: SELECT * FROM perfumes

console.log('=== Test: Black Opium → Asad ===');
const result1 = computeSimilarity(BLACK_OPIUM, ASAD, POOL);
console.log(`Level: ${result1.level}`);
console.log(`Score: ${result1.score}`);
console.log(`Shared Top: ${result1.sharedNotes.top}`);
console.log(`Shared Heart: ${result1.sharedNotes.heart}`);
console.log(`Shared Base: ${result1.sharedNotes.base}`);
console.log('');

console.log('=== Test: Black Opium → Sì Passione ===');
const result2 = computeSimilarity(BLACK_OPIUM, SI_PASSIONE, POOL);
console.log(`Level: ${result2.level}`);
console.log(`Score: ${result2.score}`);
console.log(`Shared Top: ${result2.sharedNotes.top}`);
console.log(`Shared Heart: ${result2.sharedNotes.heart}`);
console.log(`Shared Base: ${result2.sharedNotes.base}`);
console.log('');

// Erwartet (aus Vorschau):
// Asad: "sehr ähnlich" (oder "ähnliche Richtung"?)
// Sì Passione: "ähnliche Richtung"
