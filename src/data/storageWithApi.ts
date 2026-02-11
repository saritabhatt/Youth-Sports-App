// Storage with API backend and localStorage fallback
import { ChildProfile, ScoringWeights, DEFAULT_WEIGHTS } from './scoringEngine';
import { profileApi, settingsApi, checkApiAvailability, ProfileData } from './api';

// Storage error notification
let storageErrorCallback: ((message: string) => void) | null = null;
let apiStatusCallback: ((isOnline: boolean) => void) | null = null;

export function setStorageErrorCallback(callback: (message: string) => void): void {
  storageErrorCallback = callback;
}

export function setApiStatusCallback(callback: (isOnline: boolean) => void): void {
  apiStatusCallback = callback;
}

function notifyStorageError(operation: string, error: unknown): void {
  const message = `Failed to ${operation}. Your changes may not be saved.`;
  console.error(message, error);
  storageErrorCallback?.(message);
}

function notifyApiStatus(isOnline: boolean): void {
  apiStatusCallback?.(isOnline);
}

const STORAGE_KEYS = {
  PROFILES: 'the-long-game-profiles',
  ACTIVE_PROFILE_ID: 'the-long-game-active-profile',
  WEIGHTS: 'the-long-game-weights',
  COMPARE_LIST: 'the-long-game-compare',
  PENDING_SYNC: 'the-long-game-pending-sync',
};

// Track if we're using API or localStorage
let usingApi = false;

// Convert between frontend ChildProfile and API ProfileData
const toProfileData = (profile: ChildProfile): ProfileData => ({
  id: profile.id,
  name: profile.name,
  age: profile.age,
  gender: profile.gender,
  ethnicity: profile.ethnicity,
  zipCode: profile.zipCode,
  state: profile.state,
  currentHeightInches: profile.currentHeightInches,
  estimatedAdultHeightInches: profile.estimatedAdultHeightInches ?? undefined,
  parentHeights: profile.parentHeights
});

const toChildProfile = (data: ProfileData): ChildProfile => ({
  id: data.id,
  name: data.name,
  age: data.age,
  gender: data.gender,
  ethnicity: data.ethnicity,
  zipCode: data.zipCode,
  state: data.state,
  currentHeightInches: data.currentHeightInches,
  estimatedAdultHeightInches: data.estimatedAdultHeightInches ?? null,
  parentHeights: (data.parentHeights?.fatherInches !== undefined && data.parentHeights?.motherInches !== undefined)
    ? { fatherInches: data.parentHeights.fatherInches, motherInches: data.parentHeights.motherInches }
    : undefined
});

// ============================================================================
// INITIALIZATION
// ============================================================================

export async function initializeStorage(): Promise<boolean> {
  try {
    usingApi = await checkApiAvailability();
    notifyApiStatus(usingApi);

    if (usingApi) {
      console.log('Connected to backend API');
      await syncLocalToApi();
    } else {
      console.log('Using localStorage (offline mode)');
    }

    return usingApi;
  } catch (error) {
    console.error('Storage initialization error:', error);
    usingApi = false;
    notifyApiStatus(false);
    return false;
  }
}

// Sync local data to API when coming online
async function syncLocalToApi(): Promise<void> {
  try {
    const localProfiles = loadProfilesLocal();
    const apiProfiles = await profileApi.getAll();

    // Upload any local profiles not in API
    for (const localProfile of localProfiles) {
      const existsInApi = apiProfiles.some(p => p.id === localProfile.id);
      if (!existsInApi) {
        try {
          await profileApi.create(toProfileData(localProfile));
          console.log(`Synced profile ${localProfile.name} to API`);
        } catch (error) {
          console.error(`Failed to sync profile ${localProfile.id}:`, error);
        }
      }
    }

    // Update local storage with API data
    const mergedProfiles = [...apiProfiles.map(toChildProfile)];
    saveProfilesLocal(mergedProfiles);
  } catch (error) {
    console.error('Failed to sync data:', error);
  }
}

// ============================================================================
// LOCAL STORAGE HELPERS
// ============================================================================

function saveProfilesLocal(profiles: ChildProfile[]): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PROFILES, JSON.stringify(profiles));
  } catch (e) {
    notifyStorageError('save profiles locally', e);
  }
}

function loadProfilesLocal(): ChildProfile[] {
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

// ============================================================================
// PROFILES (with API fallback)
// ============================================================================

export async function loadProfilesAsync(): Promise<ChildProfile[]> {
  if (usingApi) {
    try {
      const profiles = await profileApi.getAll();
      const childProfiles = profiles.map(toChildProfile);
      saveProfilesLocal(childProfiles); // Cache locally
      return childProfiles;
    } catch (error) {
      console.error('API error, falling back to local:', error);
      notifyApiStatus(false);
    }
  }
  return loadProfilesLocal();
}

export function loadProfiles(): ChildProfile[] {
  // Synchronous version for initial load
  return loadProfilesLocal();
}

export async function saveProfileAsync(profile: ChildProfile): Promise<void> {
  // Always save locally first
  const profiles = loadProfilesLocal();
  const existingIndex = profiles.findIndex(p => p.id === profile.id);

  if (existingIndex >= 0) {
    profiles[existingIndex] = profile;
  } else {
    profiles.push(profile);
  }
  saveProfilesLocal(profiles);

  // Then sync to API
  if (usingApi) {
    try {
      if (existingIndex >= 0) {
        await profileApi.update(profile.id, toProfileData(profile));
      } else {
        await profileApi.create(toProfileData(profile));
      }
    } catch (error) {
      console.error('Failed to save to API:', error);
      markPendingSync('profile', profile.id);
    }
  }
}

export function saveProfile(profile: ChildProfile): void {
  // Synchronous version - queues API update
  const profiles = loadProfilesLocal();
  const existingIndex = profiles.findIndex(p => p.id === profile.id);

  if (existingIndex >= 0) {
    profiles[existingIndex] = profile;
  } else {
    profiles.push(profile);
  }
  saveProfilesLocal(profiles);

  // Queue API update
  if (usingApi) {
    const isNew = existingIndex < 0;
    (isNew ? profileApi.create(toProfileData(profile)) : profileApi.update(profile.id, toProfileData(profile)))
      .catch(error => {
        console.error('Failed to save to API:', error);
        markPendingSync('profile', profile.id);
      });
  }
}

export async function deleteProfileAsync(profileId: string): Promise<void> {
  // Delete locally
  const profiles = loadProfilesLocal();
  const filtered = profiles.filter(p => p.id !== profileId);
  saveProfilesLocal(filtered);

  // Clear active if it was deleted
  const activeId = getActiveProfileId();
  if (activeId === profileId) {
    setActiveProfileId(null);
  }

  // Delete from API
  if (usingApi) {
    try {
      await profileApi.delete(profileId);
    } catch (error) {
      console.error('Failed to delete from API:', error);
    }
  }
}

export function deleteProfile(profileId: string): void {
  const profiles = loadProfilesLocal();
  const filtered = profiles.filter(p => p.id !== profileId);
  saveProfilesLocal(filtered);

  const activeId = getActiveProfileId();
  if (activeId === profileId) {
    setActiveProfileId(null);
  }

  if (usingApi) {
    profileApi.delete(profileId).catch(error => {
      console.error('Failed to delete from API:', error);
    });
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

  if (usingApi) {
    settingsApi.updateActiveProfile(profileId).catch(error => {
      console.error('Failed to update active profile in API:', error);
    });
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
  const profiles = loadProfilesLocal();
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

  if (usingApi) {
    settingsApi.updateWeights(weights).catch(error => {
      console.error('Failed to save weights to API:', error);
    });
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

  if (usingApi) {
    settingsApi.updateCompareList(sportIds).catch(error => {
      console.error('Failed to save compare list to API:', error);
    });
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
// PENDING SYNC TRACKING
// ============================================================================

function markPendingSync(type: string, id: string): void {
  try {
    const pending = JSON.parse(localStorage.getItem(STORAGE_KEYS.PENDING_SYNC) || '[]');
    pending.push({ type, id, timestamp: Date.now() });
    localStorage.setItem(STORAGE_KEYS.PENDING_SYNC, JSON.stringify(pending));
  } catch (e) {
    console.error('Failed to mark pending sync:', e);
  }
}

export function getPendingSyncs(): { type: string; id: string; timestamp: number }[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.PENDING_SYNC) || '[]');
  } catch {
    return [];
  }
}

export function clearPendingSyncs(): void {
  localStorage.removeItem(STORAGE_KEYS.PENDING_SYNC);
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

// ============================================================================
// STATUS
// ============================================================================

export function isUsingApi(): boolean {
  return usingApi;
}
