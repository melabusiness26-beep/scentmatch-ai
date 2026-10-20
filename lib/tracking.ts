// Behavior Tracking für Personalisierung
// Speichert Nutzer-Interaktionen in localStorage und sendet sie mit Newsletter-Anmeldung

export interface UserBehavior {
  viewedPerfumeIds: string[];
  viewedCategories: string[];
  viewedFamilies: string[];
  viewedGuides: string[];
  preferredInterest?: 'women' | 'men' | 'unisex';
  lastActivity?: string;
}

const STORAGE_KEY = 'auressa_user_behavior';
const CATEGORY_KEY = 'auressa_category_preference';

export function trackPerfumeView(perfumeId: string, slug?: string) {
  if (!perfumeId && !slug) return;
  const id = slug || perfumeId;

  const behavior = getBehavior();
  if (!behavior.viewedPerfumeIds.includes(id)) {
    behavior.viewedPerfumeIds.push(id);
  }
  behavior.lastActivity = new Date().toISOString();
  saveBehavior(behavior);
}

export function trackCategoryClick(category: 'women' | 'men' | 'unisex') {
  const behavior = getBehavior();
  if (!behavior.viewedCategories.includes(category)) {
    behavior.viewedCategories.push(category);
  }
  behavior.preferredInterest = category;
  behavior.lastActivity = new Date().toISOString();
  saveBehavior(behavior);

  localStorage.setItem(CATEGORY_KEY, category);
}

export function trackFamilyClick(family: string) {
  if (!family) return;
  const behavior = getBehavior();
  if (!behavior.viewedFamilies.includes(family)) {
    behavior.viewedFamilies.push(family);
  }
  behavior.lastActivity = new Date().toISOString();
  saveBehavior(behavior);
}

export function trackGuideView(guideSlug: string) {
  if (!guideSlug) return;
  const behavior = getBehavior();
  if (!behavior.viewedGuides.includes(guideSlug)) {
    behavior.viewedGuides.push(guideSlug);
  }
  behavior.lastActivity = new Date().toISOString();
  saveBehavior(behavior);
}

export function getBehavior(): UserBehavior {
  if (typeof window === 'undefined') return getEmptyBehavior();

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch (e) {
    console.error('Error reading behavior from storage:', e);
  }

  return getEmptyBehavior();
}

export function getEmptyBehavior(): UserBehavior {
  return {
    viewedPerfumeIds: [],
    viewedCategories: [],
    viewedFamilies: [],
    viewedGuides: [],
  };
}

export function saveBehavior(behavior: UserBehavior) {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(behavior));
  } catch (e) {
    console.error('Error saving behavior to storage:', e);
  }
}

export function getPreferredInterest(): 'women' | 'men' | 'unisex' | undefined {
  if (typeof window === 'undefined') return undefined;

  try {
    const stored = localStorage.getItem(CATEGORY_KEY);
    if (stored && ['women', 'men', 'unisex'].includes(stored)) {
      return stored as 'women' | 'men' | 'unisex';
    }
  } catch (e) {
    console.error('Error reading preferred interest:', e);
  }

  return undefined;
}

export function clearBehavior() {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(CATEGORY_KEY);
  } catch (e) {
    console.error('Error clearing behavior:', e);
  }
}
