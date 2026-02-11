// API client for backend communication with localStorage fallback

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

// Generate a unique user identifier for this browser
const getUserIdentifier = (): string => {
  const storageKey = 'the-long-game-user-id';
  let userId = localStorage.getItem(storageKey);
  if (!userId) {
    userId = crypto.randomUUID ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem(storageKey, userId);
  }
  return userId;
};

const getHeaders = (): HeadersInit => ({
  'Content-Type': 'application/json',
  'X-User-Identifier': getUserIdentifier()
});

// Check if API is available
let apiAvailable: boolean | null = null;

export const checkApiAvailability = async (): Promise<boolean> => {
  if (apiAvailable !== null) return apiAvailable;

  try {
    const response = await fetch(`${API_BASE_URL}/health`, {
      method: 'GET',
      signal: AbortSignal.timeout(2000)
    });
    apiAvailable = response.ok;
  } catch {
    apiAvailable = false;
  }

  return apiAvailable;
};

// Reset API availability check (useful after network changes)
export const resetApiCheck = (): void => {
  apiAvailable = null;
};

// Generic API request handler
const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...getHeaders(),
      ...options.headers
    }
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || `HTTP ${response.status}`);
  }

  return response.json();
};

// Profile API
export const profileApi = {
  getAll: () => apiRequest<ProfileData[]>('/profiles'),

  getById: (id: string) => apiRequest<ProfileData>(`/profiles/${id}`),

  create: (profile: ProfileData) => apiRequest<ProfileData>('/profiles', {
    method: 'POST',
    body: JSON.stringify(profile)
  }),

  update: (id: string, profile: Partial<ProfileData>) => apiRequest<ProfileData>(`/profiles/${id}`, {
    method: 'PUT',
    body: JSON.stringify(profile)
  }),

  delete: (id: string) => apiRequest<{ message: string }>(`/profiles/${id}`, {
    method: 'DELETE'
  })
};

// Settings API
export const settingsApi = {
  get: () => apiRequest<SettingsData>('/settings'),

  updateActiveProfile: (profileId: string | null) => apiRequest<{ activeProfileId: string | null }>('/settings/active-profile', {
    method: 'PUT',
    body: JSON.stringify({ profileId })
  }),

  updateWeights: (weights: WeightsData) => apiRequest<{ weights: WeightsData }>('/settings/weights', {
    method: 'PUT',
    body: JSON.stringify({ weights })
  }),

  getCompareList: () => apiRequest<{ compareList: string[] }>('/settings/compare'),

  updateCompareList: (compareList: string[]) => apiRequest<{ compareList: string[] }>('/settings/compare', {
    method: 'PUT',
    body: JSON.stringify({ compareList })
  }),

  addToCompare: (sportId: string) => apiRequest<{ compareList: string[] }>(`/settings/compare/${sportId}`, {
    method: 'POST'
  }),

  removeFromCompare: (sportId: string) => apiRequest<{ compareList: string[] }>(`/settings/compare/${sportId}`, {
    method: 'DELETE'
  }),

  clearCompare: () => apiRequest<{ compareList: string[] }>('/settings/compare', {
    method: 'DELETE'
  })
};

// Types matching the backend API
export interface ProfileData {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female';
  ethnicity?: string;
  zipCode: string;
  state: string;
  currentHeightInches: number;
  estimatedAdultHeightInches?: number;
  parentHeights?: {
    fatherInches?: number;
    motherInches?: number;
  };
}

export interface WeightsData {
  funFactor: number;
  skillFocus: number;
  competition: number;
  opportunity: number;
  accessibility: number;
}

export interface SettingsData {
  activeProfileId: string | null;
  weights: WeightsData;
  compareList: string[];
}
