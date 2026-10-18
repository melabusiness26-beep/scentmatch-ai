'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SiteHeader from '@/app/SiteHeader';

interface ScentProfile {
  id: string;
  name: string;
  preferredFamilies: string[];
  lovedNotes: string[];
  dislikedNotes: string[];
  occasions: string[];
  seasons: string[];
  budget: string;
  intensity: string;
  createdAt: string;
}

const FAMILIES = ['clean', 'gourmand', 'woody', 'floral'];
const OCCASIONS = ['Büro', 'Freizeit', 'Ausgehen', 'Fitness', 'Reisen', 'Besondere Anlässe'];
const SEASONS = ['Frühling', 'Sommer', 'Herbst', 'Winter', 'Ganzjährig'];
const BUDGETS = ['Unter 50 CHF', '50–100 CHF', '100–150 CHF', '150+ CHF', 'Egal'];
const INTENSITIES = ['Leicht', 'Moderat', 'Intensiv', 'Sehr intensiv'];

export default function MyProfilePage() {
  const [profiles, setProfiles] = useState<ScentProfile[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const [newProfile, setNewProfile] = useState<Partial<ScentProfile>>({
    name: '',
    preferredFamilies: [],
    lovedNotes: [],
    dislikedNotes: [],
    occasions: [],
    seasons: [],
    budget: '',
    intensity: '',
  });

  useEffect(() => {
    const saved = localStorage.getItem('auressa-profiles');
    if (saved) {
      try {
        setProfiles(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load profiles:', e);
      }
    }
  }, []);

  const saveProfiles = (updated: ScentProfile[]) => {
    setProfiles(updated);
    localStorage.setItem('auressa-profiles', JSON.stringify(updated));
  };

  const createProfile = () => {
    if (!newProfile.name?.trim()) {
      alert('Bitte gib einen Namen ein');
      return;
    }

    const profile: ScentProfile = {
      id: Date.now().toString(),
      name: newProfile.name,
      preferredFamilies: newProfile.preferredFamilies || [],
      lovedNotes: newProfile.lovedNotes || [],
      dislikedNotes: newProfile.dislikedNotes || [],
      occasions: newProfile.occasions || [],
      seasons: newProfile.seasons || [],
      budget: newProfile.budget || '',
      intensity: newProfile.intensity || '',
      createdAt: new Date().toISOString(),
    };

    saveProfiles([...profiles, profile]);
    setNewProfile({
      name: '',
      preferredFamilies: [],
      lovedNotes: [],
      dislikedNotes: [],
      occasions: [],
      seasons: [],
      budget: '',
      intensity: '',
    });
    setIsCreating(false);
  };

  const deleteProfile = (id: string) => {
    saveProfiles(profiles.filter(p => p.id !== id));
  };

  const toggleArrayValue = (
    array: string[] | undefined,
    value: string
  ): string[] => {
    const arr = array || [];
    return arr.includes(value)
      ? arr.filter(v => v !== value)
      : [...arr, value];
  };

  return (
    <main style={{ background: '#FAF7F2' }}>
      <SiteHeader />

      <div className="container" style={{ paddingTop: '40px' }}>
        <nav className="breadcrumb small" aria-label="Navigation">
          <Link href="/">Start</Link>
          <span className="breadcrumb-sep">›</span>
          <span className="breadcrumb-current">Mein Profil</span>
        </nav>

        <section style={{ marginBottom: '3rem' }}>
          <h1 style={{
            fontSize: 'clamp(32px, 5vw, 56px)',
            fontFamily: "'Playfair Display', serif",
            fontWeight: 700,
            marginBottom: '1rem',
            color: '#1F1410',
          }}>
            Meine Duft-Profile
          </h1>
          <p style={{
            fontSize: '1.05rem',
            color: '#6B5344',
            lineHeight: 1.6,
          }}>
            Erstelle Profile für verschiedene Anlässe oder Stimmungen. Speichere deine Duft-Vorlieben lokal und nutze sie, um schnell Empfehlungen zu finden.
          </p>
        </section>

        {profiles.length > 0 && (
          <section style={{ marginBottom: '3rem' }}>
            <h2 style={{
              fontSize: '1.3rem',
              fontFamily: "'Playfair Display', serif",
              fontWeight: 700,
              marginBottom: '1.5rem',
              color: '#1F1410',
            }}>
              Deine Profile ({profiles.length})
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '1.5rem',
            }}>
              {profiles.map(profile => (
                <div
                  key={profile.id}
                  style={{
                    padding: '1.5rem',
                    background: 'white',
                    borderRadius: '12px',
                    border: '1px solid rgba(212,175,55,0.15)',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                    <h3 style={{
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      color: '#1F1410',
                      margin: 0,
                    }}>
                      {profile.name}
                    </h3>
                    <button
                      onClick={() => deleteProfile(profile.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#d4af37',
                        fontSize: '1.2rem',
                        cursor: 'pointer',
                        padding: 0,
                      }}
                    >
                      ×
                    </button>
                  </div>

                  <div style={{ fontSize: '0.9rem', color: '#6B5344', lineHeight: 1.8 }}>
                    {profile.preferredFamilies.length > 0 && (
                      <div>
                        <strong style={{ color: '#D4AF37' }}>Familien:</strong> {profile.preferredFamilies.join(', ')}
                      </div>
                    )}
                    {profile.lovedNotes.length > 0 && (
                      <div>
                        <strong style={{ color: '#D4AF37' }}>Lieblingsnoten:</strong> {profile.lovedNotes.join(', ')}
                      </div>
                    )}
                    {profile.occasions.length > 0 && (
                      <div>
                        <strong style={{ color: '#D4AF37' }}>Anlässe:</strong> {profile.occasions.join(', ')}
                      </div>
                    )}
                    {profile.budget && (
                      <div>
                        <strong style={{ color: '#D4AF37' }}>Budget:</strong> {profile.budget}
                      </div>
                    )}
                  </div>

                  <button
                    style={{
                      marginTop: '1rem',
                      display: 'block',
                      width: '100%',
                      padding: '10px',
                      background: '#D4AF37',
                      color: '#1F1410',
                      border: 'none',
                      borderRadius: '8px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      fontSize: '0.9rem',
                    }}
                  >
                    Mit diesem Profil zum Quiz →
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Create New */}
        <section style={{
          padding: '2rem',
          background: 'white',
          borderRadius: '12px',
          border: '1px solid rgba(212,175,55,0.15)',
        }}>
          {!isCreating ? (
            <button
              onClick={() => setIsCreating(true)}
              style={{
                width: '100%',
                padding: '1rem',
                background: 'linear-gradient(135deg, #D4AF37, #E5C158)',
                color: '#1F1410',
                border: 'none',
                borderRadius: '10px',
                fontWeight: 700,
                fontSize: '1rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              + Neues Profil erstellen
            </button>
          ) : (
            <div>
              <h3 style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                color: '#1F1410',
                marginBottom: '1.5rem',
              }}>
                Neues Duft-Profil
              </h3>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  fontWeight: 600,
                  color: '#D4AF37',
                  marginBottom: '0.5rem',
                }}>
                  Profil-Name
                </label>
                <input
                  type="text"
                  placeholder="z. B. 'Büro-Dufte' oder 'Sommer'"
                  value={newProfile.name || ''}
                  onChange={(e) => setNewProfile({ ...newProfile, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    border: '1px solid rgba(212,175,55,0.2)',
                    fontSize: '1rem',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  fontWeight: 600,
                  color: '#D4AF37',
                  marginBottom: '0.8rem',
                }}>
                  Lieblings-Duftfamilien
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                  {FAMILIES.map(fam => (
                    <button
                      key={fam}
                      onClick={() =>
                        setNewProfile({
                          ...newProfile,
                          preferredFamilies: toggleArrayValue(newProfile.preferredFamilies, fam),
                        })
                      }
                      style={{
                        padding: '8px 16px',
                        background: newProfile.preferredFamilies?.includes(fam)
                          ? '#D4AF37'
                          : 'rgba(212,175,55,0.1)',
                        color: newProfile.preferredFamilies?.includes(fam)
                          ? '#1F1410'
                          : '#6B5344',
                        border: '1px solid rgba(212,175,55,0.2)',
                        borderRadius: '20px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        transition: 'all 0.2s',
                      }}
                    >
                      {fam.charAt(0).toUpperCase() + fam.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{
                  display: 'block',
                  fontWeight: 600,
                  color: '#D4AF37',
                  marginBottom: '0.8rem',
                }}>
                  Budget
                </label>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
                  {BUDGETS.map(budget => (
                    <button
                      key={budget}
                      onClick={() => setNewProfile({ ...newProfile, budget })}
                      style={{
                        padding: '8px 16px',
                        background: newProfile.budget === budget
                          ? '#D4AF37'
                          : 'rgba(212,175,55,0.1)',
                        color: newProfile.budget === budget
                          ? '#1F1410'
                          : '#6B5344',
                        border: '1px solid rgba(212,175,55,0.2)',
                        borderRadius: '20px',
                        fontWeight: 600,
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        transition: 'all 0.2s',
                      }}
                    >
                      {budget}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={createProfile}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: '#D4AF37',
                    color: '#1F1410',
                    border: 'none',
                    borderRadius: '8px',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  Profil speichern
                </button>
                <button
                  onClick={() => {
                    setIsCreating(false);
                    setNewProfile({
                      name: '',
                      preferredFamilies: [],
                      lovedNotes: [],
                      dislikedNotes: [],
                      occasions: [],
                      seasons: [],
                      budget: '',
                      intensity: '',
                    });
                  }}
                  style={{
                    flex: 1,
                    padding: '12px',
                    background: 'white',
                    color: '#1F1410',
                    border: '1px solid rgba(212,175,55,0.2)',
                    borderRadius: '8px',
                    fontWeight: 600,
                    cursor: 'pointer',
                  }}
                >
                  Abbrechen
                </button>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
