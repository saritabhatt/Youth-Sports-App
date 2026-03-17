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
  loadProfiles,
  saveProfile,
  deleteProfile,
  getActiveProfileId,
  setActiveProfileId,
  loadWeights,
  saveWeights,
  loadCompareList,
  addToCompare,
  removeFromCompare,
  clearCompare,
} from '../data/storage';

type ViewMode = 'setup' | 'results';
type FilterCategory = SportCategory | 'all';
type SortOption = 'score' | 'name' | 'age-match' | 'cost';

// Load initial state once outside component to avoid duplicate calls
const initialProfiles = loadProfiles();
const initialActiveId = getActiveProfileId();
const initialViewMode: ViewMode = initialProfiles.length > 0 && initialActiveId ? 'results' : 'setup';

function ResultsContent() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { toasts, removeToast, success } = useToast();

  // State management
  const [profiles, setProfiles] = useState<ChildProfile[]>(initialProfiles);
  const [activeProfileId, setActiveProfileIdState] = useState<string | null>(initialActiveId);
  const [viewMode, setViewMode] = useState<ViewMode>(
    (searchParams.get('mode') as ViewMode) || initialViewMode
  );
  const [scoredSports, setScoredSports] = useState<ScoredSport[]>([]);
  const [weights, setWeights] = useState<ScoringWeights>(loadWeights());
  const [compareList, setCompareList] = useState(loadCompareList());
  const [filterCategory, setFilterCategory] = useState<FilterCategory>('all');
  const [sortOption, setSortOption] = useState<SortOption>('score');
  const [selectedSport, setSelectedSport] = useState<ScoredSport | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMinAge, setFilterMinAge] = useState<number | null>(null);
  const [filterMaxAge, setFilterMaxAge] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearch = useDebounce(searchTerm, 300);

  // Sync active profile ID
  const activeProfile = useMemo(
    () => profiles.find((p) => p.id === activeProfileId),
    [profiles, activeProfileId]
  );

  // Score sports when profile or weights change
  useEffect(() => {
    if (!activeProfile) {
      setScoredSports([]);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setScoredSports(scoreAllSports(activeProfile, weights));
      setIsLoading(false);
    }, 0);
  }, [activeProfile, weights]);

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
          s.sport.description.toLowerCase().includes(search)
      );
    }

    // Age range filter
    if (filterMinAge !== null) {
      filtered = filtered.filter((s) => s.sport.ageRange.max >= filterMinAge);
    }
    if (filterMaxAge !== null) {
      filtered = filtered.filter((s) => s.sport.ageRange.min <= filterMaxAge);
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortOption) {
        case 'score':
          return b.totalScore - a.totalScore;
        case 'name':
          return a.sport.name.localeCompare(b.sport.name);
        case 'age-match':
          return b.ageMatch - a.ageMatch;
        case 'cost':
          return a.sport.estimatedCost - b.sport.estimatedCost;
        default:
          return 0;
      }
    });

    return sorted;
  }, [scoredSports, filterCategory, debouncedSearch, filterMinAge, filterMaxAge, sortOption]);

  // Handle profile changes
  const handleAddProfile = useCallback((profile: ChildProfile) => {
    const newProfile = { ...profile, id: Date.now().toString() };
    const updated = [...profiles, newProfile];
    setProfiles(updated);
    saveProfile(newProfile);
    setActiveProfileIdState(newProfile.id);
    setActiveProfileId(newProfile.id);
    setViewMode('results');
    success(`Profile "${profile.name}" created!`);
  }, [profiles, success]);

  const handleUpdateProfile = useCallback((updated: ChildProfile) => {
    setProfiles((prev) =>
      prev.map((p) => (p.id === updated.id ? updated : p))
    );
    saveProfile(updated);
    success(`Profile "${updated.name}" updated!`);
  }, [success]);

  const handleDeleteProfile = useCallback((id: string) => {
    deleteProfile(id);
    const newProfiles = profiles.filter((p) => p.id !== id);
    setProfiles(newProfiles);
    if (activeProfileId === id) {
      const nextId = newProfiles[0]?.id || null;
      setActiveProfileIdState(nextId);
      setActiveProfileId(nextId);
    }
    success('Profile deleted');
  }, [profiles, activeProfileId, success]);

  const handleSelectProfile = useCallback((id: string) => {
    setActiveProfileIdState(id);
    setActiveProfileId(id);
    setViewMode('results');
  }, []);

  // Handle weight changes
  const handleWeightsChange = useCallback((updated: ScoringWeights) => {
    setWeights(updated);
    saveWeights(updated);
  }, []);

  // Handle compare mode
  const handleAddToCompare = useCallback((sport: ScoredSport) => {
    addToCompare(sport.sport.id);
    setCompareList((prev) => [...new Set([...prev, sport.sport.id])]);
    success('Added to comparison');
  }, [success]);

  const handleRemoveFromCompare = useCallback((sportId: string) => {
    removeFromCompare(sportId);
    setCompareList((prev) => prev.filter((id) => id !== sportId));
  }, []);

  const handleClearCompare = useCallback(() => {
    clearCompare();
    setCompareList([]);
  }, []);

  const compareSports = useMemo(
    () => scoredSports.filter((s) => compareList.includes(s.sport.id)),
    [scoredSports, compareList]
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ToastContainer toasts={toasts} removeToast={removeToast} />

      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Results</h1>
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
            <ChildProfileForm onSubmit={handleAddProfile} />

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
                          Age {profile.age} • {profile.skillLevel}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSelectProfile(profile.id)}
                          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
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
                {/* Profile selector and comparison */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <ProfileSelector
                    profiles={profiles}
                    activeProfileId={activeProfileId!}
                    onSelectProfile={handleSelectProfile}
                  />

                  {compareSports.length > 0 && (
                    <div className="mt-6">
                      <CompareMode
                        sports={compareSports}
                        onRemove={handleRemoveFromCompare}
                        onClear={handleClearCompare}
                      />
                    </div>
                  )}
                </div>

                {/* Weights Adjustment */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <ScoringWeightsSliders weights={weights} onChange={handleWeightsChange} />
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

                  <div className="grid md:grid-cols-3 gap-4">
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
                        {SPORT_CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
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

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Export
                      </label>
                      <ExportMenu
                        sports={filteredAndSortedSports}
                        profile={activeProfile}
                      />
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Recommended Sports ({filteredAndSortedSports.length})
                  </h2>

                  {isLoading ? (
                    <div className="flex justify-center items-center py-12">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  ) : filteredAndSortedSports.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredAndSortedSports.map((sport) => (
                        <div key={sport.sport.id}>
                          <SportCard
                            sport={sport}
                            onViewDetails={() => setSelectedSport(sport)}
                            onAddToCompare={() => handleAddToCompare(sport)}
                            isInCompare={compareList.includes(sport.sport.id)}
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
            sport={selectedSport}
            onClose={() => setSelectedSport(null)}
            onAddToCompare={() => {
              handleAddToCompare(selectedSport);
              setSelectedSport(null);
            }}
            isInCompare={compareList.includes(selectedSport.sport.id)}
          />
        )}
      </div>
    </div>
  );
}

export function Results() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div></div>}>
      <ResultsContent />
    </Suspense>
  );
}
