import { useState, useMemo, useEffect, useCallback, Suspense } from 'react';
import { useSearchParams } from 'react-router-dom';
import ChildProfileForm from '../components/ChildProfileForm';
import ScoringWeightsSliders from '../components/ScoringWeightsSliders';
import SportCard from '../components/SportCard';
import SportDetailModal from '../components/SportDetailModal';
import ProfileSelector from '../components/ProfileSelector';
import CompareMode from '../components/CompareMode';
import ExportMenu from '../components/ExportMenu';
import { ToastContainer, useToast } from '../components/Toast';
import { ThemeToggle } from '../components/ThemeToggle';
import { LoadingState } from '../components/LoadingState';
import { useDebounce } from '../utils/useDebounce';
import {
  ChildProfile,
  ScoringWeights,
  ScoredSport,
} from '../data/scoringEngine';
import {
  SPORT_CATEGORIES,
  SportCategory,
  getRegionFromZip,
} from '../data/sportsData';
import {
  setActiveProfileId,
} from '../data/storage';
import {
  useProfiles,
  useSaveProfile,
  useDeleteProfile,
  useWeights,
  useSaveWeights,
  useScoredSports,
  useCompareList,
  useAddToCompare,
  useRemoveFromCompare,
  useClearCompare,
} from '../hooks';

type ViewMode = 'setup' | 'results';
type FilterCategory = SportCategory | 'all';
type SortOption = 'score' | 'name' | 'age-match' | 'cost';

function ResultsContent() {
  const [searchParams] = useSearchParams();
  const { toasts, removeToast, success } = useToast();

  // React Query hooks for data fetching
  const { data: profiles = [], isLoading: profilesLoading } = useProfiles();
  const { data: weights, isLoading: weightsLoading } = useWeights();
  const { data: compareList = [] } = useCompareList();
  
  // Mutations
  const saveProfileMutation = useSaveProfile();
  const deleteProfileMutation = useDeleteProfile();
  const saveWeightsMutation = useSaveWeights();
  const addToCompareMutation = useAddToCompare();
  const removeFromCompareMutation = useRemoveFromCompare();
  const clearCompareMutation = useClearCompare();

  // State management for UI
  const [activeProfileId, setActiveProfileIdState] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('results');
  const [filterCategory, setFilterCategory] = useState<FilterCategory>('all');
  const [sortOption, setSortOption] = useState<SortOption>('score');
  const [selectedSport, setSelectedSport] = useState<ScoredSport | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileToEdit, setProfileToEdit] = useState<ChildProfile | null>(null);

  const debouncedSearch = useDebounce(searchTerm, 300);

  // Initialize active profile ID from profiles
  useEffect(() => {
    if (profiles.length > 0 && !activeProfileId) {
      const firstProfile = profiles[0];
      setActiveProfileIdState(firstProfile.id);
    }
  }, [profiles, activeProfileId]);

  // Get active profile
  const activeProfile = useMemo(
    () => profiles.find((p) => p.id === activeProfileId) || null,
    [profiles, activeProfileId]
  );

  // Get scored sports using React Query
  const { data: scoredSports = [], isLoading: scoredSportsLoading } = useScoredSports(
    activeProfile,
    weights || null
  );

  // Filter and sort sports
  const filteredAndSortedSports = useMemo(() => {
    let filtered = scoredSports;

    // Category filter
    if (filterCategory !== 'all') {
      filtered = filtered.filter((s) => s.sport.category === filterCategory);
    }

    // Search filter
    if (debouncedSearch.trim()) {
      const search = debouncedSearch.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.sport.name.toLowerCase().includes(search) ||
          s.sport.notes.toLowerCase().includes(search)
      );
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortOption) {
        case 'score':
          return b.weightedTotal - a.weightedTotal;
        case 'name':
          return a.sport.name.localeCompare(b.sport.name);
        case 'age-match':
          return (a.ageMatch === 'perfect' ? 0 : 1) - (b.ageMatch === 'perfect' ? 0 : 1);
        case 'cost':
          return a.sport.costRange.entryLevel.min - b.sport.costRange.entryLevel.min;
        default:
          return 0;
      }
    });

    return sorted;
  }, [scoredSports, filterCategory, debouncedSearch, sortOption]);

  // Handle profile changes
  const handleProfileCreated = useCallback((profile: ChildProfile) => {
    const newProfile = { ...profile, id: profile.id || Date.now().toString() };
    saveProfileMutation.mutate(newProfile, {
      onSuccess: () => {
        setActiveProfileIdState(newProfile.id);
        setActiveProfileId(newProfile.id);
        setViewMode('results');
        setIsEditingProfile(false);
        setProfileToEdit(null);
        success(`Profile "${profile.name}" created!`);
      },
    });
  }, [saveProfileMutation, success]);

  const handleSelectProfile = useCallback((id: string) => {
    setActiveProfileIdState(id);
    setActiveProfileId(id);
    setViewMode('results');
  }, []);

  const handleEditProfile = useCallback((p: ChildProfile) => {
    setProfileToEdit(p);
    setIsEditingProfile(true);
    setViewMode('setup');
  }, []);

  const handleDeleteProfile = useCallback((id: string) => {
    const profileName = profiles.find(p => p.id === id)?.name || 'Profile';
    deleteProfileMutation.mutate(id, {
      onSuccess: () => {
        if (activeProfileId === id) {
          const nextProfile = profiles.find((p) => p.id !== id);
          const nextId = nextProfile?.id || null;
          setActiveProfileIdState(nextId);
          setActiveProfileId(nextId);
        }
        success(`${profileName} deleted`);
      },
    });
  }, [deleteProfileMutation, activeProfileId, profiles, success]);

  // Handle weight changes
  const handleWeightsChange = useCallback((updated: ScoringWeights) => {
    saveWeightsMutation.mutate(updated, {
      onSuccess: () => {
        success('Weights updated');
      },
    });
  }, [saveWeightsMutation, success]);

  // Handle compare mode
  const handleAddToCompare = useCallback((sportId: string) => {
    addToCompareMutation.mutate(sportId, {
      onSuccess: () => {
        success('Added to comparison');
      },
    });
  }, [addToCompareMutation, success]);

  const handleRemoveFromCompare = useCallback((sportId: string) => {
    removeFromCompareMutation.mutate(sportId);
  }, [removeFromCompareMutation]);

  const handleClearCompare = useCallback(() => {
    clearCompareMutation.mutate();
  }, [clearCompareMutation]);

  const compareSports = useMemo(
    () => scoredSports.filter((s) => compareList.includes(s.sport.id)),
    [scoredSports, compareList]
  );

  // Loading state for initial data fetch
  if (profilesLoading || weightsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <LoadingState message="Loading your data..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">The Long Game</h1>
          <ThemeToggle />
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* View Mode Toggle */}
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setViewMode('results')}
            className={`px-4 py-2 rounded font-semibold transition ${
              viewMode === 'results'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Results
          </button>
          <button
            onClick={() => setViewMode('setup')}
            className={`px-4 py-2 rounded font-semibold transition ${
              viewMode === 'setup'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            Manage Profiles
          </button>
        </div>

        {viewMode === 'setup' ? (
          /* Setup View */
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                {isEditingProfile && profileToEdit ? 'Edit Profile' : 'Create Profile'}
              </h2>
              <ChildProfileForm
                onProfileCreated={handleProfileCreated}
                existingProfile={profileToEdit}
                onCancel={
                  isEditingProfile
                    ? () => {
                        setIsEditingProfile(false);
                        setProfileToEdit(null);
                      }
                    : undefined
                }
              />
            </div>

            {profiles.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Existing Profiles
                </h2>
                <div className="space-y-2">
                  {profiles.map((profile) => (
                    <div
                      key={profile.id}
                      className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded"
                    >
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {profile.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Age {profile.age}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditProfile(profile)}
                          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleSelectProfile(profile.id)}
                          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          Select
                        </button>
                        <button
                          onClick={() => handleDeleteProfile(profile.id)}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Results View */
          <>
            {activeProfile ? (
              <div className="space-y-8">
                {/* Profile selector */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <ProfileSelector
                    profiles={profiles}
                    activeProfileId={activeProfileId!}
                    onSelect={handleSelectProfile}
                    onEdit={handleEditProfile}
                    onDelete={handleDeleteProfile}
                    onCreateNew={() => {
                      setProfileToEdit(null);
                      setIsEditingProfile(true);
                      setViewMode('setup');
                    }}
                  />

                  {compareSports.length > 0 && (
                    <div className="mt-6">
                      <CompareMode
                        scoredSports={compareSports}
                        compareIds={compareList}
                        onRemove={handleRemoveFromCompare}
                        onClear={handleClearCompare}
                        onClose={() => {}}
                        zipCode={activeProfile?.zipCode}
                      />
                    </div>
                  )}
                </div>

                {/* Weights Adjustment */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Customize Priorities
                  </h3>
                  {weights && (
                    <ScoringWeightsSliders weights={weights} onChange={handleWeightsChange} />
                  )}
                </div>

                {/* Filters */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                      Search
                    </label>
                    <input
                      type="text"
                      placeholder="Search sports..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Category
                      </label>
                      <select
                        value={filterCategory}
                        onChange={(e) => setFilterCategory(e.target.value as FilterCategory)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded"
                      >
                        <option value="all">All Categories</option>
                        {Object.entries(SPORT_CATEGORIES).map(([key, { name }]) => (
                          <option key={key} value={key}>
                            {name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Sort By
                      </label>
                      <select
                        value={sortOption}
                        onChange={(e) => setSortOption(e.target.value as SortOption)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded"
                      >
                        <option value="score">Best Match</option>
                        <option value="name">Name (A-Z)</option>
                        <option value="age-match">Age Match</option>
                        <option value="cost">Cost</option>
                      </select>
                    </div>
                  </div>

                  {compareList.length > 0 && (
                    <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-900/20 p-3 rounded">
                      <span className="text-sm text-blue-700 dark:text-blue-200">
                        {compareList.length} sport{compareList.length !== 1 ? 's' : ''} selected for comparison
                      </span>
                      <button
                        onClick={handleClearCompare}
                        className="ml-auto text-sm text-blue-600 dark:text-blue-300 hover:underline"
                      >
                        Clear
                      </button>
                    </div>
                  )}
                </div>

                {/* Results */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Recommended Sports ({filteredAndSortedSports.length})
                  </h2>

                  {scoredSportsLoading ? (
                    <LoadingState message="Calculating scores..." size="large" />
                  ) : filteredAndSortedSports.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredAndSortedSports.map((sport) => (
                        <div key={sport.sport.id}>
                          <SportCard
                            scoredSport={sport}
                            onViewDetails={() => setSelectedSport(sport)}
                            isInCompare={compareList.includes(sport.sport.id)}
                            onToggleCompare={() => {
                              if (compareList.includes(sport.sport.id)) {
                                handleRemoveFromCompare(sport.sport.id);
                              } else if (compareList.length < 4) {
                                handleAddToCompare(sport.sport.id);
                              }
                            }}
                            canAddToCompare={compareList.length < 4}
                            zipCode={activeProfile?.zipCode}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="bg-white dark:bg-gray-800 p-8 rounded-lg text-center">
                      <p className="text-gray-600 dark:text-gray-400">
                        No sports match your criteria
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-800 p-8 rounded-lg text-center">
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  No profile selected. Create or select a profile to see results.
                </p>
                <button
                  onClick={() => setViewMode('setup')}
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Create Profile
                </button>
              </div>
            )}
          </>
        )}

        {/* Sport Detail Modal */}
        {selectedSport && (
          <SportDetailModal
            scoredSport={selectedSport}
            region={activeProfile ? getRegionFromZip(activeProfile.zipCode) : 'west-coast'}
            onClose={() => setSelectedSport(null)}
          />
        )}
      </div>
    </div>
  );
}

export function Results() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <LoadingState message="Loading..." />
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
