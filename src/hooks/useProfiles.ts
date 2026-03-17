import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ChildProfile } from '../data/scoringEngine';
import { loadProfiles, saveProfile, deleteProfile } from '../data/storage';

const PROFILES_QUERY_KEY = ['profiles'];

/**
 * Hook to fetch all profiles with React Query
 * Provides loading/error states and automatic caching
 */
export const useProfiles = () => {
  return useQuery({
    queryKey: PROFILES_QUERY_KEY,
    queryFn: () => loadProfiles(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes (formerly cacheTime)
  });
};

/**
 * Hook to create or update a profile
 * Automatically invalidates the profiles query
 */
export const useSaveProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: ChildProfile) => {
      saveProfile(profile);
      return profile;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILES_QUERY_KEY });
    },
  });
};

/**
 * Hook to delete a profile
 * Automatically invalidates the profiles query
 */
export const useDeleteProfile = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profileId: string) => {
      deleteProfile(profileId);
      return profileId;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILES_QUERY_KEY });
    },
  });
};

/**
 * Hook to get a single profile by ID
 */
export const useProfile = (profileId: string | null) => {
  return useQuery({
    queryKey: ['profile', profileId],
    queryFn: () => {
      if (!profileId) return null;
      const profiles = loadProfiles();
      return profiles.find(p => p.id === profileId) || null;
    },
    enabled: !!profileId,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};
