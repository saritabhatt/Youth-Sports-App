// Storage utility for persisting profiles and settings
import { ChildProfile, ScoringWeights, DEFAULT_WEIGHTS } from './scoringEngine';

// Storage error notification - users can be alerted when data fails to save
let storageErrorCallback: ((message: string) => void) | null = null;

export function setStorageErrorCallback(callback: (message: string) => void): void {
  storageErrorCallback = callback;
}

function notifyStorageError(operation: string, error: unknown): void {
  const message = `Failed to ${operation}. Your changes may not be saved.`;
  console.error(message, error);
  if (storageErrorCallback) {
    storageErrorCallback(message);
  }
}

const STORAGE_KEYS = {
  PROFILES: 'the-long-game-profiles',
  ACTIVE_PROFILE_ID: 'the-long-game-active-profile',
  WEIGHTS: 'the-long-game-weights',
  COMPARE_LIST: 'the-long-game-compare',
};

// ============================================================================
// PROFILES
// ============================================================================

export function saveProfiles(profiles: ChildProfile[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(profiles));
  } catch (e) {
    notifyStorageError('save profiles', e);
  }
}

export function loadProfiles(): ChildProfile[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PROFILES);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load profiles:', e);
  }
  return [];
}

export function saveProfile(profile: ChildProfile): void {
  const profiles = loadProfiles();
  const existingIndex = profiles.findIndex(p => p.id === profile.id);

  if (existingIndex >= 0) {
    profiles[existingIndex] = profile;
  } else {
    profiles.push(profile);
  }

  saveProfiles(profiles);
}

export function deleteProfile(profileId: string): void {
  const profiles = loadProfiles();
  const filtered = profiles.filter(p => p.id !== profileId);
  saveProfiles(filtered);

  // Clear active if it was deleted
  const activeId = getActiveProfileId();
  if (activeId === profileId) {
    setActiveProfileId(null);
  }
}

// ============================================================================
// ACTIVE PROFILE
// ============================================================================

export function setActiveProfileId(profileId: string | null): void {
  try {
    if (profileId) {
      localStorage.setItem(STORAGE_KEYS.ACTIVE_PROFILE_ID, profileId);
    } else {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_PROFILE_ID);
    }
  } catch (e) {
    notifyStorageError('save active profile', e);
  }
}

export function getActiveProfileId(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_PROFILE_ID);
  } catch (e) {
    console.error('Failed to load active profile:', e);
  }
  return null;
}

export function getActiveProfile(): ChildProfile | null {
  const activeId = getActiveProfileId();
  if (!activeId) return null;

  const profiles = loadProfiles();
  return profiles.find(p => p.id === activeId) || null;
}

// ============================================================================
// WEIGHTS
// ============================================================================

export function saveWeights(weights: ScoringWeights): void {
  try {
    localStorage.setItem(STORAGE_KEYS.WEIGHTS, JSON.stringify(weights));
  } catch (e) {
    notifyStorageError('save scoring weights', e);
  }
}

export function loadWeights(): ScoringWeights {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.WEIGHTS);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load weights:', e);
  }
  return DEFAULT_WEIGHTS;
}

// ============================================================================
// COMPARE LIST
// ============================================================================

export function saveCompareList(sportIds: string[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.COMPARE_LIST, JSON.stringify(sportIds));
  } catch (e) {
    notifyStorageError('save compare list', e);
  }
}

export function loadCompareList(): string[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.COMPARE_LIST);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (e) {
    console.error('Failed to load compare list:', e);
  }
  return [];
}

export function addToCompare(sportId: string): string[] {
  const list = loadCompareList();
  if (!list.includes(sportId) && list.length < 4) {
    list.push(sportId);
    saveCompareList(list);
  }
  return list;
}

export function removeFromCompare(sportId: string): string[] {
  const list = loadCompareList();
  const filtered = list.filter(id => id !== sportId);
  saveCompareList(filtered);
  return filtered;
}

export function clearCompare(): void {
  saveCompareList([]);
}

// ============================================================================
// CLEAR ALL
// ============================================================================

export function clearAllStorage(): void {
  try {
    Object.values(STORAGE_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
  } catch (e) {
    notifyStorageError('clear storage', e);
  }
}
