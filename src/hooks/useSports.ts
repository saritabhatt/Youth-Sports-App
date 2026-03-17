import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ChildProfile, scoreAllSports, ScoringWeights } from '../data/scoringEngine';
import { loadWeights, saveWeights, loadCompareList, addToCompare, removeFromCompare, clearCompare } from '../data/storage';
import { SPORTS_DATA } from '../data/sportsData';

const WEIGHTS_QUERY_KEY = ['weights'];
const SPORTS_DATA_QUERY_KEY = ['sportsData'];
const COMPARE_LIST_QUERY_KEY = ['compareList'];
const SCORED_SPORTS_QUERY_KEY = ['scoredSports'];

/**
 * Hook to fetch scoring weights with React Query
 * Provides loading/error states and automatic caching
 */
export const useWeights = () => {
  return useQuery({
    queryKey: WEIGHTS_QUERY_KEY,
    queryFn: () => loadWeights(),
    staleTime: Infinity, // Weights don't change unless user modifies them
    gcTime: 1000 * 60 * 10,
  });
};

/**
 * Hook to update scoring weights
 * Automatically invalidates the weights and scored sports queries
 */
export const useSaveWeights = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (weights: ScoringWeights) => {
      saveWeights(weights);
      return weights;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WEIGHTS_QUERY_KEY });
      queryClient.invalidateQueries({ queryKey: SCORED_SPORTS_QUERY_KEY });
    },
  });
};

/**
 * Hook to fetch sports data
 * Provides access to all available sports and categories
 */
export const useSportsData = () => {
  return useQuery({
    queryKey: SPORTS_DATA_QUERY_KEY,
    queryFn: () => SPORTS_DATA,
    staleTime: Infinity, // Static data
    gcTime: 1000 * 60 * 10,
  });
};

/**
 * Hook to compute scored sports for a profile
 * Combines profile data and weights to calculate rankings
 */
export const useScoredSports = (profile: ChildProfile | null, weights: ScoringWeights | null) => {
  return useQuery({
    queryKey: SCORED_SPORTS_QUERY_KEY,
    queryFn: () => {
      if (!profile || !weights) return [];
      return scoreAllSports(profile, weights);
    },
    enabled: !!profile && !!weights,
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });
};

/**
 * Hook to fetch the compare list
 */
export const useCompareList = () => {
  return useQuery({
    queryKey: COMPARE_LIST_QUERY_KEY,
    queryFn: () => loadCompareList(),
    staleTime: Infinity,
    gcTime: 1000 * 60 * 10,
  });
};

/**
 * Hook to add a sport to the compare list
 */
export const useAddToCompare = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sportId: string) => {
      return addToCompare(sportId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMPARE_LIST_QUERY_KEY });
    },
  });
};

/**
 * Hook to remove a sport from the compare list
 */
export const useRemoveFromCompare = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (sportId: string) => {
      return removeFromCompare(sportId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMPARE_LIST_QUERY_KEY });
    },
  });
};

/**
 * Hook to clear the compare list
 */
export const useClearCompare = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      clearCompare();
      return [];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: COMPARE_LIST_QUERY_KEY });
    },
  });
};
