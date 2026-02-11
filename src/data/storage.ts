// Storage utility with Supabase cloud storage and localStorage fallback
import { ChildProfile, ScoringWeights, DEFAULT_WEIGHTS } from './scoringEngine';
import { supabase, isSupabaseConfigured, getUserId, ProfileRow } from './supabase';

// Storage error notification
let storageErrorCallback: ((message: string) => void) | null = null;

export function setStorageErrorCallback(callback: (message: string) => void): void {
  storageErrorCallback = callback;
}

function notifyStorageError(operation: string, error: unknown): void {
  const message = `Failed to ${operation}. Your changes may not be saved.`;
  console.error(message, error);
  storageErrorCallback?.(message);
}

const STORAGE_KEYS = {
  PROFILES: 'the-long-game-profiles',
  ACTIVE_PROFILE_ID: 'the-long-game-active-profile',
  WEIGHTS: 'the-long-game-weights',
  COMPARE_LIST: 'the-long-game-compare',
};

// Check if we're using Supabase
export const isCloudEnabled = (): boolean => isSupabaseConfigured() && supabase !== null;

// ============================================================================
// TYPE CONVERSIONS
// ============================================================================

const rowToProfile = (row: ProfileRow): ChildProfile => ({
  id: row.id,
  name: row.name,
  age: row.age,
  gender: row.gender,
  ethnicity: row.ethnicity || undefined,
  zipCode: row.zip_code,
  state: row.state,
  currentHeightInches: row.current_height_inches,
  estimatedAdultHeightInches: row.estimated_adult_height_inches,
  parentHeights: (row.father_height_inches && row.mother_height_inches)
    ? { fatherInches: row.father_height_inches, motherInches: row.mother_height_inches }
    : undefined
});

const profileToRow = (profile: ChildProfile, userId: string): Partial<ProfileRow> => ({
  id: profile.id,
  user_id: userId,
  name: profile.name,
  age: profile.age,
  gender: profile.gender,
  ethnicity: profile.ethnicity || null,
  zip_code: profile.zipCode,
  state: profile.state,
  current_height_inches: profile.currentHeightInches,
  estimated_adult_height_inches: profile.estimatedAdultHeightInches,
  father_height_inches: profile.parentHeights?.fatherInches || null,
  mother_height_inches: profile.parentHeights?.motherInches || null
});

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
// PROFILES
// ============================================================================

export function loadProfiles(): ChildProfile[] {
  // Synchronous version for initial load - returns cached local data
  return loadProfilesLocal();
}

export async function loadProfilesAsync(): Promise<ChildProfile[]> {
  if (!isCloudEnabled() || !supabase) {
    return loadProfilesLocal();
  }

  try {
    const userId = getUserId();
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;

    const profiles = (data || []).map(rowToProfile);
    saveProfilesLocal(profiles); // Cache locally
    return profiles;
  } catch (error) {
    console.error('Supabase error, using local data:', error);
    return loadProfilesLocal();
  }
}

export function saveProfile(profile: ChildProfile): void {
  // Save locally first (synchronous)
  const profiles = loadProfilesLocal();
  const existingIndex = profiles.findIndex(p => p.id === profile.id);

  if (existingIndex >= 0) {
    profiles[existingIndex] = profile;
  } else {
    profiles.push(profile);
  }
  saveProfilesLocal(profiles);

  // Then sync to Supabase (async, fire-and-forget)
  if (isCloudEnabled() && supabase) {
    const userId = getUserId();
    const row = profileToRow(profile, userId);

    supabase
      .from('profiles')
      .upsert(row, { onConflict: 'id' })
      .then(({ error }: { error: unknown }) => {
        if (error) console.error('Failed to save to Supabase:', error);
      });
  }
}

export function deleteProfile(profileId: string): void {
  // Delete locally
  const profiles = loadProfilesLocal();
  const filtered = profiles.filter(p => p.id !== profileId);
  saveProfilesLocal(filtered);

  // Clear active if it was deleted
  const activeId = getActiveProfileId();
  if (activeId === profileId) {
    setActiveProfileId(null);
  }

  // Delete from Supabase
  if (isCloudEnabled() && supabase) {
    supabase
      .from('profiles')
      .delete()
      .eq('id', profileId)
      .then(({ error }: { error: unknown }) => {
        if (error) console.error('Failed to delete from Supabase:', error);
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

  // Sync to Supabase
  if (isCloudEnabled() && supabase) {
    const userId = getUserId();
    supabase
      .from('user_settings')
      .upsert({ user_id: userId, active_profile_id: profileId }, { onConflict: 'user_id' })
      .then(({ error }: { error: unknown }) => {
        if (error) console.error('Failed to save active profile to Supabase:', error);
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

  // Sync to Supabase
  if (isCloudEnabled() && supabase) {
    const userId = getUserId();
    supabase
      .from('user_settings')
      .upsert({ user_id: userId, weights }, { onConflict: 'user_id' })
      .then(({ error }: { error: unknown }) => {
        if (error) console.error('Failed to save weights to Supabase:', error);
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

  // Sync to Supabase
  if (isCloudEnabled() && supabase) {
    const userId = getUserId();
    supabase
      .from('user_settings')
      .upsert({ user_id: userId, compare_list: sportIds }, { onConflict: 'user_id' })
      .then(({ error }: { error: unknown }) => {
        if (error) console.error('Failed to save compare list to Supabase:', error);
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
// SYNC FROM CLOUD
// ============================================================================

export async function syncFromCloud(): Promise<void> {
  if (!isCloudEnabled() || !supabase) return;

  try {
    const userId = getUserId();

    // Sync profiles
    const { data: profiles } = await supabase
      .from('profiles')
      .select('*')
      .eq('user_id', userId);

    if (profiles && profiles.length > 0) {
      saveProfilesLocal(profiles.map(rowToProfile));
    }

    // Sync settings
    const { data: settings } = await supabase
      .from('user_settings')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (settings) {
      if (settings.active_profile_id) {
        localStorage.setItem(STORAGE_KEYS.ACTIVE_PROFILE_ID, settings.active_profile_id);
      }
      if (settings.weights) {
        localStorage.setItem(STORAGE_KEYS.WEIGHTS, JSON.stringify(settings.weights));
      }
      if (settings.compare_list) {
        localStorage.setItem(STORAGE_KEYS.COMPARE_LIST, JSON.stringify(settings.compare_list));
      }
    }

    console.log('Synced data from cloud');
  } catch (error) {
    console.error('Failed to sync from cloud:', error);
  }
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
