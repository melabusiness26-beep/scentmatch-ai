'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (slug: string) => void;
  isFavorite: (slug: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);

  // Gespeicherte Favoriten erst im Browser laden. Die Seite selbst wird trotzdem sofort
  // (auch auf dem Server) angezeigt – sonst sähe Google nur eine leere Seite.
  useEffect(() => {
    try {
      const saved = localStorage.getItem('auressa-favorites');
      if (saved) {
        // Nur eine Liste von Texten übernehmen – beschädigte Daten führen sonst zum Absturz.
        const parsed: unknown = JSON.parse(saved);
        if (Array.isArray(parsed)) setFavorites(parsed.filter((x): x is string => typeof x === 'string'));
      }
    } catch (error) {
      console.error('Failed to load favorites:', error);
    }
  }, []);

  const toggleFavorite = (slug: string) => {
    setFavorites(prev => {
      const updated = prev.includes(slug)
        ? prev.filter(s => s !== slug)
        : [...prev, slug];

      try {
        localStorage.setItem('auressa-favorites', JSON.stringify(updated));
      } catch (error) {
        console.error('Failed to save favorites:', error);
      }

      return updated;
    });
  };

  const isFavorite = (slug: string) => favorites.includes(slug);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within FavoritesProvider');
  }
  return context;
}
