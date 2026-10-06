export type DetektivAnswers = {
  location: 'person' | 'store' | 'holiday' | 'hotel' | 'online' | 'unknown';
  country: string;
  gender: 'woman' | 'man' | 'unisex' | 'unknown';
  age: 'under25' | '25-40' | 'over40' | 'unknown';
  timing: '<1year' | '1-5years' | '>5years' | 'unknown';
  feeling: 'fresh' | 'warm' | 'woody' | 'floral' | 'oriental' | 'spicy';
  strength: 'subtle' | 'medium' | 'intense' | 'unknown';
  occasion: 'daily' | 'evening' | 'office' | 'special' | 'unknown';
  price: '<50' | '50-150' | '>150' | 'unknown';
  brand: string;
  bottle: string;
  description: string;
};

export type SavedSearch = {
  timestamp: number;
  answers: DetektivAnswers;
  resultIds: string[];
};

export type SavedPerfume = {
  perfumeId: string;
  savedAt: number;
  rating: 'heart' | 'remove' | null;
};

export const storage = {
  getSearch: (): SavedSearch | null => {
    try {
      const data = localStorage.getItem('duft-detektiv-search');
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  saveSearch: (answers: DetektivAnswers, resultIds: string[]) => {
    try {
      const search: SavedSearch = {
        timestamp: Date.now(),
        answers,
        resultIds,
      };
      localStorage.setItem('duft-detektiv-search', JSON.stringify(search));
    } catch {
      console.error('Failed to save search');
    }
  },

  getSavedPerfumes: (): SavedPerfume[] => {
    try {
      const data = localStorage.getItem('gemerkte-duefte');
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  addPerfume: (perfumeId: string) => {
    try {
      const saved = storage.getSavedPerfumes();
      if (!saved.find(p => p.perfumeId === perfumeId)) {
        saved.push({
          perfumeId,
          savedAt: Date.now(),
          rating: null,
        });
        localStorage.setItem('gemerkte-duefte', JSON.stringify(saved));
      }
    } catch {
      console.error('Failed to save perfume');
    }
  },

  removePerfume: (perfumeId: string) => {
    try {
      const saved = storage.getSavedPerfumes();
      const filtered = saved.filter(p => p.perfumeId !== perfumeId);
      localStorage.setItem('gemerkte-duefte', JSON.stringify(filtered));
    } catch {
      console.error('Failed to remove perfume');
    }
  },

  generateShareUrl: (answers: DetektivAnswers): string => {
    const params = new URLSearchParams({
      location: answers.location,
      country: answers.country,
      gender: answers.gender,
      age: answers.age,
      timing: answers.timing,
      feeling: answers.feeling,
      strength: answers.strength,
      occasion: answers.occasion,
      price: answers.price,
      brand: answers.brand,
      bottle: answers.bottle,
      description: answers.description,
    });
    return `${typeof window !== 'undefined' ? window.location.origin : ''}/duft-detektiv/search?${params.toString()}`;
  },

  parseShareUrl: (searchParams: URLSearchParams): Partial<DetektivAnswers> => {
    return {
      location: (searchParams.get('location') as any) || 'unknown',
      country: searchParams.get('country') || '',
      gender: (searchParams.get('gender') as any) || 'unknown',
      age: (searchParams.get('age') as any) || 'unknown',
      timing: (searchParams.get('timing') as any) || 'unknown',
      feeling: (searchParams.get('feeling') as any) || 'fresh',
      strength: (searchParams.get('strength') as any) || 'unknown',
      occasion: (searchParams.get('occasion') as any) || 'unknown',
      price: (searchParams.get('price') as any) || 'unknown',
      brand: searchParams.get('brand') || '',
      bottle: searchParams.get('bottle') || '',
      description: searchParams.get('description') || '',
    };
  },
};
