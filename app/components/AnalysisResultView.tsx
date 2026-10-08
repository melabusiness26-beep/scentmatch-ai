'use client';

import Link from 'next/link';
import { Perfume } from '@/lib/perfumes';
import { ImageAnalysisResult } from '@/types/image-analysis';

interface AnalysisResultViewProps {
  analysis: ImageAnalysisResult['data'];
  similarPerfumes: Perfume[];
  onNewSearch: () => void;
}

const Rating = ({ value, max = 10 }: { value?: number; max?: number }) => {
  if (!value) return null;
  const percentage = (value / max) * 100;
  return (
    <div style={{ width: '100%', height: '6px', backgroundColor: '#e8dcc8', borderRadius: '3px', overflow: 'hidden' }}>
      <div
        style={{
          height: '100%',
          width: `${percentage}%`,
          backgroundColor: '#d4af37',
          transition: 'width 0.3s ease',
        }}
      />
    </div>
  );
};

export default function AnalysisResultView({
  analysis,
  similarPerfumes,
  onNewSearch,
}: AnalysisResultViewProps) {
  if (!analysis) return null;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
      {/* 1. HERO SECTION */}
      <section style={{ backgroundColor: '#2a1d12', color: '#f9f6f1', padding: '4rem 2rem', borderRadius: '12px', marginBottom: '3rem', textAlign: 'center' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
          <span style={{ backgroundColor: analysis.confidence === 'high' ? '#d4af37' : analysis.confidence === 'medium' ? '#c4b5a0' : '#9a8a7e', color: '#2a1d12', padding: '0.25rem 0.75rem', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>
            {analysis.confidence?.toUpperCase()} Konfidenz
          </span>
        </div>
        <h1 style={{ fontSize: '3.5rem', fontFamily: "'Playfair Display', serif", fontWeight: 700, margin: '1rem 0' }}>
          {analysis.perfumeName}
        </h1>
        <p style={{ fontSize: '1.5rem', color: '#d4af37', marginBottom: '1.5rem' }}>
          {analysis.brandName}
        </p>
        {analysis.year && <p style={{ fontSize: '0.9rem', color: '#c4b5a0' }}>seit {analysis.year}</p>}
        <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#e8dcc8', maxWidth: '600px', margin: '2rem auto' }}>
          {analysis.poeticDescription || analysis.generalDescription}
        </p>
      </section>

      {/* 2. STECKBRIEF */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.8rem', fontFamily: "'Playfair Display', serif", color: '#2a1d12', marginBottom: '1.5rem' }}>
          Steckbrief
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1.5rem' }}>
          {analysis.origin && (
            <div style={{ backgroundColor: '#f9f6f1', padding: '1rem', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.85rem', color: '#9a8a7e', marginBottom: '0.5rem' }}>🌍 Herkunft</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#2a1d12' }}>
                {analysis.origin}
              </div>
            </div>
          )}
          {analysis.year && (
            <div style={{ backgroundColor: '#f9f6f1', padding: '1rem', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.85rem', color: '#9a8a7e', marginBottom: '0.5rem' }}>📅 Jahr</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#2a1d12' }}>
                {analysis.year}
              </div>
            </div>
          )}
          {analysis.concentration && (
            <div style={{ backgroundColor: '#f9f6f1', padding: '1rem', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.85rem', color: '#9a8a7e', marginBottom: '0.5rem' }}>🧴 Konzentration</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#2a1d12' }}>
                {analysis.concentration}
              </div>
            </div>
          )}
          {analysis.parfumeur && (
            <div style={{ backgroundColor: '#f9f6f1', padding: '1rem', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.85rem', color: '#9a8a7e', marginBottom: '0.5rem' }}>👃 Parfümeur</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#2a1d12' }}>
                {analysis.parfumeur}
              </div>
            </div>
          )}
          {analysis.family && (
            <div style={{ backgroundColor: '#f9f6f1', padding: '1rem', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.85rem', color: '#9a8a7e', marginBottom: '0.5rem' }}>🌸 Duftfamilie</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#2a1d12' }}>
                {analysis.family}
              </div>
            </div>
          )}
          {analysis.gender && (
            <div style={{ backgroundColor: '#f9f6f1', padding: '1rem', borderRadius: '8px' }}>
              <div style={{ fontSize: '0.85rem', color: '#9a8a7e', marginBottom: '0.5rem' }}>👥 Geschlecht</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '600', color: '#2a1d12' }}>
                {analysis.gender === 'woman' ? 'Damen' : analysis.gender === 'man' ? 'Herren' : 'Unisex'}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. BEWERTUNGEN */}
      {(analysis.rating || analysis.sillage || analysis.longevity || analysis.projection || analysis.uniqueness || analysis.priceValue) && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontFamily: "'Playfair Display', serif", color: '#2a1d12', marginBottom: '1.5rem' }}>
            Bewertungen
          </h2>
          <div style={{ backgroundColor: '#f9f6f1', padding: '2rem', borderRadius: '12px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
              {analysis.longevity && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#2a1d12' }}>Haltbarkeit</label>
                    <span style={{ fontSize: '0.85rem', color: '#9a8a7e' }}>{analysis.longevity}/10</span>
                  </div>
                  <Rating value={analysis.longevity} />
                </div>
              )}
              {analysis.sillage && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#2a1d12' }}>Sillage</label>
                    <span style={{ fontSize: '0.85rem', color: '#9a8a7e' }}>{analysis.sillage}/10</span>
                  </div>
                  <Rating value={analysis.sillage} />
                </div>
              )}
              {analysis.projection && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#2a1d12' }}>Projektion</label>
                    <span style={{ fontSize: '0.85rem', color: '#9a8a7e' }}>{analysis.projection}/10</span>
                  </div>
                  <Rating value={analysis.projection} />
                </div>
              )}
              {analysis.uniqueness && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#2a1d12' }}>Einzigartigkeit</label>
                    <span style={{ fontSize: '0.85rem', color: '#9a8a7e' }}>{analysis.uniqueness}/10</span>
                  </div>
                  <Rating value={analysis.uniqueness} />
                </div>
              )}
              {analysis.priceValue && (
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                    <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#2a1d12' }}>Preis-Wert</label>
                    <span style={{ fontSize: '0.85rem', color: '#9a8a7e' }}>{analysis.priceValue}/10</span>
                  </div>
                  <Rating value={analysis.priceValue} />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 4. DUFT-DNA */}
      {analysis.duftDNA && Object.values(analysis.duftDNA).some(v => v) && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontFamily: "'Playfair Display', serif", color: '#2a1d12', marginBottom: '1.5rem' }}>
            Duft-DNA
          </h2>
          <div style={{ backgroundColor: '#f9f6f1', padding: '2rem', borderRadius: '12px' }}>
            {analysis.duftDNA.blumig !== undefined && (
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#2a1d12' }}>Blumig</label>
                  <span style={{ fontSize: '0.85rem', color: '#9a8a7e' }}>{analysis.duftDNA.blumig}%</span>
                </div>
                <Rating value={analysis.duftDNA.blumig} max={100} />
              </div>
            )}
            {analysis.duftDNA.holzig !== undefined && (
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#2a1d12' }}>Holzig</label>
                  <span style={{ fontSize: '0.85rem', color: '#9a8a7e' }}>{analysis.duftDNA.holzig}%</span>
                </div>
                <Rating value={analysis.duftDNA.holzig} max={100} />
              </div>
            )}
            {analysis.duftDNA.frisch !== undefined && (
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#2a1d12' }}>Frisch</label>
                  <span style={{ fontSize: '0.85rem', color: '#9a8a7e' }}>{analysis.duftDNA.frisch}%</span>
                </div>
                <Rating value={analysis.duftDNA.frisch} max={100} />
              </div>
            )}
            {analysis.duftDNA.süss !== undefined && (
              <div style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#2a1d12' }}>Süss</label>
                  <span style={{ fontSize: '0.85rem', color: '#9a8a7e' }}>{analysis.duftDNA.süss}%</span>
                </div>
                <Rating value={analysis.duftDNA.süss} max={100} />
              </div>
            )}
            {analysis.duftDNA.würzig !== undefined && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <label style={{ fontSize: '0.9rem', fontWeight: '600', color: '#2a1d12' }}>Würzig</label>
                  <span style={{ fontSize: '0.85rem', color: '#9a8a7e' }}>{analysis.duftDNA.würzig}%</span>
                </div>
                <Rating value={analysis.duftDNA.würzig} max={100} />
              </div>
            )}
          </div>
        </section>
      )}

      {/* 5. DUFTPYRAMIDE */}
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.8rem', fontFamily: "'Playfair Display', serif", color: '#2a1d12', marginBottom: '1.5rem' }}>
          Duftpyramide
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '1.5rem' }}>
          <div style={{ backgroundColor: '#f9f6f1', padding: '1.5rem', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: '600', color: '#d4af37', marginBottom: '1rem', textTransform: 'uppercase' }}>
              Kopfnoten
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {analysis.notes.top.length > 0 ? (
                analysis.notes.top.map((note, idx) => (
                  <span key={idx} style={{ fontSize: '0.95rem', color: '#2a1d12', display: 'flex', alignItems: 'flex-start', gap: '0.35rem' }}>
                    <span style={{ flexShrink: 0 }}>•</span><span>{note}</span>
                  </span>
                ))
              ) : (
                <span style={{ fontSize: '0.9rem', color: '#9a8a7e', fontStyle: 'italic' }}>Keine Daten</span>
              )}
            </div>
          </div>

          <div style={{ backgroundColor: '#f9f6f1', padding: '1.5rem', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: '600', color: '#d4af37', marginBottom: '1rem', textTransform: 'uppercase' }}>
              Herznoten
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {analysis.notes.heart.length > 0 ? (
                analysis.notes.heart.map((note, idx) => (
                  <span key={idx} style={{ fontSize: '0.95rem', color: '#2a1d12', display: 'flex', alignItems: 'flex-start', gap: '0.35rem' }}>
                    <span style={{ flexShrink: 0 }}>•</span><span>{note}</span>
                  </span>
                ))
              ) : (
                <span style={{ fontSize: '0.9rem', color: '#9a8a7e', fontStyle: 'italic' }}>Keine Daten</span>
              )}
            </div>
          </div>

          <div style={{ backgroundColor: '#f9f6f1', padding: '1.5rem', borderRadius: '8px' }}>
            <h3 style={{ fontSize: '0.9rem', fontWeight: '600', color: '#d4af37', marginBottom: '1rem', textTransform: 'uppercase' }}>
              Basisnoten
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {analysis.notes.base.length > 0 ? (
                analysis.notes.base.map((note, idx) => (
                  <span key={idx} style={{ fontSize: '0.95rem', color: '#2a1d12', display: 'flex', alignItems: 'flex-start', gap: '0.35rem' }}>
                    <span style={{ flexShrink: 0 }}>•</span><span>{note}</span>
                  </span>
                ))
              ) : (
                <span style={{ fontSize: '0.9rem', color: '#9a8a7e', fontStyle: 'italic' }}>Keine Daten</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 6. DUFTREISE */}
      {analysis.duftJourney && Object.values(analysis.duftJourney).some(v => v) && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontFamily: "'Playfair Display', serif", color: '#2a1d12', marginBottom: '1.5rem' }}>
            Duftreise durch den Tag
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1.5rem' }}>
            {analysis.duftJourney.morgen && (
              <div style={{ backgroundColor: '#fff8e7', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #ffd700' }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: '600', color: '#d4af37', marginBottom: '0.5rem' }}>🌅 Morgen</h3>
                <p style={{ fontSize: '0.95rem', color: '#2a1d12', margin: 0 }}>{analysis.duftJourney.morgen}</p>
              </div>
            )}
            {analysis.duftJourney.mittag && (
              <div style={{ backgroundColor: '#fff8e7', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #ffd700' }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: '600', color: '#d4af37', marginBottom: '0.5rem' }}>☀️ Mittag</h3>
                <p style={{ fontSize: '0.95rem', color: '#2a1d12', margin: 0 }}>{analysis.duftJourney.mittag}</p>
              </div>
            )}
            {analysis.duftJourney.abend && (
              <div style={{ backgroundColor: '#fff8e7', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #ffd700' }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: '600', color: '#d4af37', marginBottom: '0.5rem' }}>🌆 Abend</h3>
                <p style={{ fontSize: '0.95rem', color: '#2a1d12', margin: 0 }}>{analysis.duftJourney.abend}</p>
              </div>
            )}
            {analysis.duftJourney.nacht && (
              <div style={{ backgroundColor: '#fff8e7', padding: '1.5rem', borderRadius: '8px', borderLeft: '4px solid #ffd700' }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: '600', color: '#d4af37', marginBottom: '0.5rem' }}>🌙 Nacht</h3>
                <p style={{ fontSize: '0.95rem', color: '#2a1d12', margin: 0 }}>{analysis.duftJourney.nacht}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 7. CHARAKTER */}
      {(analysis.characterTags || analysis.personalityType || analysis.mood) && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontFamily: "'Playfair Display', serif", color: '#2a1d12', marginBottom: '1.5rem' }}>
            Charakter & Persönlichkeit
          </h2>
          <div style={{ backgroundColor: '#2a1d12', color: '#f9f6f1', padding: '2rem', borderRadius: '12px' }}>
            {analysis.personalityType && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: '600', color: '#d4af37', marginBottom: '0.5rem' }}>Persönlichkeitstyp</h3>
                <p style={{ fontSize: '1.1rem', color: '#f9f6f1', margin: 0 }}>{analysis.personalityType}</p>
              </div>
            )}
            {analysis.mood && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: '600', color: '#d4af37', marginBottom: '0.5rem' }}>Stimmung</h3>
                <p style={{ fontSize: '1.1rem', color: '#f9f6f1', margin: 0 }}>{analysis.mood}</p>
              </div>
            )}
            {analysis.characterTags && analysis.characterTags.length > 0 && (
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: '600', color: '#d4af37', marginBottom: '0.75rem' }}>Charakter-Tags</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  {analysis.characterTags.map((tag, idx) => (
                    <span key={idx} style={{ backgroundColor: '#d4af37', color: '#2a1d12', padding: '0.5rem 1rem', borderRadius: '20px', fontSize: '0.9rem', fontWeight: '600' }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 8. WANN TRAGEN */}
      {(analysis.seasonRecommendation || analysis.occasionList || analysis.climate) && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontFamily: "'Playfair Display', serif", color: '#2a1d12', marginBottom: '1.5rem' }}>
            Wann tragen?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            {analysis.seasonRecommendation && (
              <div style={{ backgroundColor: '#f9f6f1', padding: '1.5rem', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: '600', color: '#b08b4f', marginBottom: '0.5rem' }}>🍂 Saison</h3>
                <p style={{ fontSize: '1rem', color: '#2a1d12', margin: 0 }}>{analysis.seasonRecommendation}</p>
              </div>
            )}
            {analysis.occasionList && analysis.occasionList.length > 0 && (
              <div style={{ backgroundColor: '#f9f6f1', padding: '1.5rem', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: '600', color: '#b08b4f', marginBottom: '0.75rem' }}>🎯 Anlässe</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {analysis.occasionList.map((occ, idx) => (
                    <span key={idx} style={{ backgroundColor: '#e8dcc8', color: '#2a1d12', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.85rem' }}>
                      {occ}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {analysis.climate && analysis.climate.length > 0 && (
              <div style={{ backgroundColor: '#f9f6f1', padding: '1.5rem', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: '600', color: '#b08b4f', marginBottom: '0.75rem' }}>🌡️ Klima</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {analysis.climate.map((c, idx) => (
                    <span key={idx} style={{ backgroundColor: '#e8dcc8', color: '#2a1d12', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.85rem' }}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 9. PERFEKTER MOMENT */}
      {analysis.perfectMoment && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontFamily: "'Playfair Display', serif", color: '#2a1d12', marginBottom: '1.5rem' }}>
            Der perfekte Moment
          </h2>
          <div style={{ backgroundColor: '#fff8e7', padding: '2rem', borderRadius: '12px', borderLeft: '4px solid #d4af37' }}>
            <p style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#2a1d12', margin: 0, fontStyle: 'italic' }}>
              ✨ {analysis.perfectMoment}
            </p>
          </div>
        </section>
      )}

      {/* 10. VERGLEICH */}
      {analysis.comparisonPerfumes && analysis.comparisonPerfumes.length > 0 && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontFamily: "'Playfair Display', serif", color: '#2a1d12', marginBottom: '1.5rem' }}>
            Vergleich mit bekannten Düften
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {analysis.comparisonPerfumes.map((comp, idx) => (
              <div key={idx} style={{ backgroundColor: '#f9f6f1', padding: '1.5rem', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#2a1d12', marginBottom: '0.75rem' }}>
                  {comp.name}
                </h3>
                <p style={{ fontSize: '0.95rem', color: '#6b5a4e', lineHeight: 1.6, margin: 0 }}>
                  {comp.reason}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 11. FUN FACTS */}
      {analysis.funFacts && analysis.funFacts.length > 0 && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontFamily: "'Playfair Display', serif", color: '#2a1d12', marginBottom: '1.5rem' }}>
            Fun Facts & Geschichte
          </h2>
          <div style={{ backgroundColor: '#f9f6f1', padding: '2rem', borderRadius: '12px' }}>
            {analysis.history && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: '600', color: '#b08b4f', marginBottom: '0.75rem' }}>📖 Geschichte</h3>
                <p style={{ fontSize: '0.95rem', color: '#6b5a4e', lineHeight: 1.6 }}>{analysis.history}</p>
              </div>
            )}
            {analysis.famouswearers && analysis.famouswearers.length > 0 && (
              <div style={{ marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: '600', color: '#b08b4f', marginBottom: '0.75rem' }}>⭐ Bekannte Träger</h3>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {analysis.famouswearers.map((wearer, idx) => (
                    <span key={idx} style={{ backgroundColor: '#e8dcc8', color: '#2a1d12', padding: '0.25rem 0.75rem', borderRadius: '12px', fontSize: '0.85rem' }}>
                      {wearer}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {analysis.funFacts.length > 0 && (
              <div>
                <h3 style={{ fontSize: '0.95rem', fontWeight: '600', color: '#b08b4f', marginBottom: '0.75rem' }}>💡 Interessantes</h3>
                <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                  {analysis.funFacts.map((fact, idx) => (
                    <li key={idx} style={{ fontSize: '0.95rem', color: '#6b5a4e', lineHeight: 1.6, marginBottom: '0.5rem' }}>
                      {fact}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      {/* 12. ÄHNLICHE DÜFTE AUS AURESSA */}
      {similarPerfumes.length > 0 && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontFamily: "'Playfair Display', serif", color: '#2a1d12', marginBottom: '1.5rem' }}>
            Ähnliche Düfte aus Auressa
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }}>
            {similarPerfumes.map((perfume) => (
              <Link
                key={perfume.id}
                href={`/duft/${perfume.slug}`}
                style={{
                  display: 'block',
                  padding: '1.5rem',
                  backgroundColor: '#f9f6f1',
                  borderRadius: '8px',
                  border: '1px solid #e8dcc8',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(212, 175, 55, 0.2)';
                  e.currentTarget.style.borderColor = '#d4af37';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = 'none';
                  e.currentTarget.style.borderColor = '#e8dcc8';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#2a1d12', margin: '0 0 0.5rem 0' }}>
                  {perfume.perfume_name}
                </h3>
                <p style={{ fontSize: '0.9rem', color: '#b08b4f', margin: '0 0 0.75rem 0', fontWeight: '600' }}>
                  {perfume.brands?.name || 'Unbekannte Marke'}
                </p>
                {perfume.fragrance_family && (
                  <p style={{ fontSize: '0.85rem', color: '#6b5a4e', lineHeight: 1.4, margin: '0 0 0.75rem 0' }}>
                    {perfume.fragrance_family}
                  </p>
                )}
                {perfume.price_chf && (
                  <p style={{ fontSize: '0.95rem', fontWeight: '600', color: '#d4af37', margin: 0 }}>
                    CHF {perfume.price_chf}
                  </p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* 13. ÄHNLICHE DÜFTE (KI-WISSEN) */}
      {analysis.similarPerfumes && analysis.similarPerfumes.length > 0 && (
        <section style={{ marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontFamily: "'Playfair Display', serif", color: '#2a1d12', marginBottom: '1.5rem' }}>
            Ähnliche Düfte (aus KI-Wissen)
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
            {analysis.similarPerfumes.map((perf, idx) => (
              <div key={idx} style={{ backgroundColor: '#f9f6f1', padding: '1.5rem', borderRadius: '8px', border: '1px solid #e8dcc8' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: '600', color: '#2a1d12', marginBottom: '0.75rem' }}>
                  {perf.name}
                </h3>
                <p style={{ fontSize: '0.95rem', color: '#6b5a4e', lineHeight: 1.6, margin: 0 }}>
                  {perf.reason}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 15. NEUE SUCHE BUTTON */}
      <section style={{ textAlign: 'center', marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid #e8dcc8' }}>
        <button
          onClick={onNewSearch}
          style={{
            padding: '14px 40px',
            borderRadius: '8px',
            border: '2px solid #d4af37',
            backgroundColor: '#d4af37',
            color: '#2a1d12',
            fontSize: '1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            fontFamily: "'Inter', sans-serif",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#2a1d12';
            e.currentTarget.style.color = '#d4af37';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#d4af37';
            e.currentTarget.style.color = '#2a1d12';
          }}
        >
          🔍 Neue Suche starten
        </button>
        <p style={{ fontSize: '0.9rem', color: '#9a8a7e', marginTop: '1rem' }}>
          Einen anderen Duft analysieren?
        </p>
      </section>
    </div>
  );
}
