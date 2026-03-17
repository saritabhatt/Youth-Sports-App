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
import { useDebounce } from '../utils/useDebounce';
import {
  ChildProfile,
  ScoringWeights,
  ScoredSport,
  scoreAllSports,
} from '../data/scoringEngine';
import {
  SPORT_CATEGORIES,
  SportCategory,
  getRegionFromZip,
  REGION_NAMES,
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

  // React Query hooks for data fetching with loading/error states
  const { 
    data: profiles = [], 
    isLoading: profilesLoading,
    isError: profilesError,
  } = useProfiles();
  
  const { 
    data: weights,
    isLoading: weightsLoading,
  } = useWeights();
  
  const { 
    data: compareList = [],
  } = useCompareList();
  
  // Mutations with automatic cache invalidation
  const saveProfileMutation = useSaveProfile();
  const deleteProfileMutation = useDeleteProfile();
  const saveWeightsMutation = useSaveWeights();
  const addToCompareMutation = useAddToCompare();
  const removeFromCompareMutation = useRemoveFromCompare();
  const clearCompareMutation = useClearCompare();

  // Local UI state
  const [activeProfileId, setActiveProfileIdState] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>(
    (searchParams.get('mode') as ViewMode) || 'setup'
  );
  const [filterCategory, setFilterCategory] = useState<FilterCategory>('all');
  const [sortOption, setSortOption] = useState<SortOption>('score');
  const [selectedSport, setSelectedSport] = useState<ScoredSport | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearch = useDebounce(searchTerm, 300);

  // Initialize active profile when profiles load
  useEffect(() => {
    if (profiles.length > 0 && !activeProfileId) {
      setActiveProfileIdState(profiles[0].id);
      setViewMode('results');
    } else if (profiles.length === 0) {
      setViewMode('setup');
    }
  }, [profiles, activeProfileId]);

  // Get active profile
  const activeProfile = useMemo(
    () => profiles.find((p) => p.id === activeProfileId) || null,
    [profiles, activeProfileId]
  );

  // Get scored sports using React Query
  const { 
    data: scoredSports = [],
    isLoading: scoredSportsLoading,
  } = useScoredSports(activeProfile, weights || null);

  // Apply filters and sorting
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
          s.sport.category.toLowerCase().includes(search)
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
          const ageOrder = { perfect: 0, good: 1, early: 2, late: 3 };
          return ageOrder[a.ageMatch] - ageOrder[b.ageMatch];
        case 'cost':
          return a.sport.costRange.entryLevel.min - b.sport.costRange.entryLevel.min;
        default:
          return 0;
      }
    });

    return sorted;
  }, [scoredSports, filterCategory, debouncedSearch, sortOption]);

  // Get compare sports
  const compareSports = useMemo(
    () => scoredSports.filter((s) => compareList.includes(s.sport.id)),
    [scoredSports, compareList]
  );

  // Profile handlers
  const handleAddProfile = useCallback((profile: ChildProfile) => {
    const newProfile = { ...profile, id: Date.now().toString() };
    saveProfileMutation.mutate(newProfile, {
      onSuccess: () => {
        setActiveProfileIdState(newProfile.id);
        setActiveProfileId(newProfile.id);
        setViewMode('results');
        success(`Profile "${profile.name}" created!`);
      },
    });
  }, [saveProfileMutation, success]);

  const handleUpdateProfile = useCallback((updated: ChildProfile) => {
    saveProfileMutation.mutate(updated, {
      onSuccess: () => {
        success(`Profile "${updated.name}" updated!`);
      },
    });
  }, [saveProfileMutation, success]);

  const handleDeleteProfile = useCallback((id: string) => {
    deleteProfileMutation.mutate(id, {
      onSuccess: () => {
        if (activeProfileId === id) {
          const nextProfile = profiles.find((p) => p.id !== id);
          const nextId = nextProfile?.id || null;
          setActiveProfileIdState(nextId);
          if (nextId) setActiveProfileId(nextId);
        }
        success('Profile deleted');
      },
    });
  }, [deleteProfileMutation, activeProfileId, profiles, success]);

  const handleSelectProfile = useCallback((id: string) => {
    setActiveProfileIdState(id);
    setActiveProfileId(id);
    setViewMode('results');
  }, []);

  // Weight handlers
  const handleWeightsChange = useCallback((updated: ScoringWeights) => {
    saveWeightsMutation.mutate(updated);
  }, [saveWeightsMutation]);

  // Compare handlers
  const handleAddToCompare = useCallback((sport: ScoredSport) => {
    addToCompareMutation.mutate(sport.sport.id, {
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

  const region = activeProfile ? getRegionFromZip(activeProfile.zipCode) : null;

  // Loading state
  if (profilesLoading || weightsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
          <p className="mt-4 text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    );
  }

  // Setup View
  if (viewMode === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        {/* Header */}
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
          <div className="max-w-2xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="text-3xl">🏅</div>
                <div>
                  <h1 className="text-xl font-bold text-slate-800 dark:text-white">The Long Game</h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Youth Sports Assessment</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ThemeToggle />
                {profiles.length > 0 && (
                  <button
                    onClick={() => setViewMode('results')}
                    className="text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium"
                  >
                    View Results →
                  </button>
                )}
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-8">
          {/* Existing profiles */}
          {profiles.length > 0 && (
            <div className="mb-6">
              <ProfileSelector
                profiles={profiles}
                activeProfileId={activeProfileId || profiles[0].id}
                onSelect={handleSelectProfile}
                onEdit={(p) => handleSelectProfile(p.id)}
                onDelete={handleDeleteProfile}
                onCreateNew={() => setViewMode('setup')}
              />
            </div>
          )}

          {/* Create form */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-800">
                Create Child Profile
              </h2>
              <p className="text-slate-500 mt-1">
                Tell us about your child to get personalized sport recommendations
              </p>
            </div>

            <ChildProfileForm
              onProfileCreated={handleAddProfile}
              existingProfile={null}
              onCancel={profiles.length > 0 ? () => setViewMode('results') : undefined}
            />
          </div>
        </main>

        <ToastContainer toasts={toasts} onRemove={removeToast} />
      </div>
    );
  }

  // Results View
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="text-2xl">🏅</div>
              <div>
                <h1 className="text-lg font-bold text-slate-800 dark:text-white">The Long Game</h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ThemeToggle />
              
              {/* Compare button */}
              {compareList.length > 0 && (
                <button
                  onClick={() => {
                    // Placeholder for compare modal
                  }}
                  className="flex items-center gap-2 px-3 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors"
                >
                  <span>Compare</span>
                  <span className="bg-white/20 px-1.5 rounded">{compareList.length}</span>
                </button>
              )}

              {/* Export */}
              {activeProfile && (
                <ExportMenu profile={activeProfile} scoredSports={scoredSports} />
              )}

              {/* Profile info */}
              {activeProfile && (
                <div className="hidden sm:flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-medium text-slate-800 dark:text-white">{activeProfile.name}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {activeProfile.age} years • {region && REGION_NAMES[region]}
                    </div>
                  </div>
                  <button
                    onClick={() => setViewMode('setup')}
                    className="px-3 py-1.5 text-sm bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-lg transition-colors"
                  >
                    Switch
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <aside className="lg:col-span-1 space-y-4">
            <ProfileSelector
              profiles={profiles}
              activeProfileId={activeProfileId || profiles[0]?.id}
              onSelect={handleSelectProfile}
              onEdit={(p) => handleSelectProfile(p.id)}
              onDelete={handleDeleteProfile}
              onCreateNew={() => setViewMode('setup')}
            />

            {/* Category Filter */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4">
              <h3 className="font-semibold text-slate-800 dark:text-white mb-3">Categories</h3>
              <div className="space-y-1 max-h-64 overflow-y-auto">
                <button
                  onClick={() => setFilterCategory('all')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    filterCategory === 'all'
                      ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 font-medium'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  All Sports ({scoredSports.length})
                </button>
                {Object.entries(SPORT_CATEGORIES).map(([key, { name, icon }]) => {
                  const count = scoredSports.filter(s => s.sport.category === key).length;
                  if (count === 0) return null;
                  return (
                    <button
                      key={key}
                      onClick={() => setFilterCategory(key as SportCategory)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        filterCategory === key
                          ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300 font-medium'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400'
                      }`}
                    >
                      {icon} {name} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Weights Toggle */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
              <button
                onClick={() => {}}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
              >
                <span className="font-semibold text-slate-800 dark:text-white">Customize Priorities</span>
                <span className="text-slate-400 dark:text-slate-600">▼</span>
              </button>

              <div className="px-4 pb-4 border-t border-slate-100 dark:border-slate-700">
                <div className="pt-4">
                  <ScoringWeightsSliders
                    weights={weights || { funFactor: 1, skillFocus: 1, competition: 1, opportunity: 1, accessibility: 1 }}
                    onChange={handleWeightsChange}
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Search and Sort Bar */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 p-4 mb-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-1">
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search sports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <label htmlFor="sort-select" className="text-sm text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    Sort by:
                  </label>
                  <select
                    id="sort-select"
                    value={sortOption}
                    onChange={(e) => setSortOption(e.target.value as SortOption)}
                    className="px-3 py-2 border border-slate-200 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="score">Best Match</option>
                    <option value="name">Name (A-Z)</option>
                    <option value="age-match">Age Timing</option>
                    <option value="cost">Lowest Cost</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-white">
                  {filterCategory === 'all' ? 'All Sports' : SPORT_CATEGORIES[filterCategory]?.name || 'Sports'}
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {filteredAndSortedSports.length} sports
                  {debouncedSearch && ` matching "${debouncedSearch}"`}
                </p>
              </div>

              {compareList.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500 dark:text-slate-400">{compareList.length}/4 selected</span>
                  <button
                    onClick={handleClearCompare}
                    className="text-sm text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>

            {/* Sport Grid */}
            {scoredSportsLoading ? (
              <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600"></div>
              </div>
            ) : filteredAndSortedSports.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredAndSortedSports.map((scoredSport, index) => (
                  <SportCard
                    key={scoredSport.sport.id}
                    scoredSport={scoredSport}
                    rank={filterCategory === 'all' ? index + 1 : 0}
                    onViewDetails={setSelectedSport}
                    isInCompare={compareList.includes(scoredSport.sport.id)}
                    onToggleCompare={
                      compareList.includes(scoredSport.sport.id)
                        ? () => handleRemoveFromCompare(scoredSport.sport.id)
                        : () => handleAddToCompare(scoredSport)
                    }
                    canAddToCompare={compareList.length < 4}
                    zipCode={activeProfile?.zipCode}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <div className="w-20 h-20 mx-auto mb-4 bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">No sports found</h3>
                <p className="text-slate-500 dark:text-slate-400">Try adjusting your filters or search terms.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Sport Detail Modal */}
      {selectedSport && (
        <SportDetailModal
          scoredSport={selectedSport}
          region={region || 'west-coast'}
          onClose={() => setSelectedSport(null)}
        />
      )}

      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}

export function Results() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            <p className="mt-4 text-slate-600 dark:text-slate-400">Loading results...</p>
          </div>
        </div>
      }
    >
      <ResultsContent />
    </Suspense>
  );
}
