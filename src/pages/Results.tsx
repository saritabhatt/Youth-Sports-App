import { Link } from 'react-router-dom';
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
  const [searchParams] = useSearchParams();
  const { toasts, removeToast, success } = useToast();

  // State management
  const [profiles, setProfiles] = useState<ChildProfile[]>(initialProfiles);
  const [activeId, setActiveId] = useState<string | null>(initialActiveId);
  const [viewMode, setViewMode] = useState<ViewMode>(
    (searchParams.get('mode') as ViewMode) || initialViewMode
  );
  const [scoredSports, setScoredSports] = useState<ScoredSport[]>([]);
  const [weights, setWeights] = useState<ScoringWeights>(loadWeights());
  const [compareIds, setCompareIds] = useState<string[]>(loadCompareList());
  const [categoryFilter, setCategoryFilter] = useState<FilterCategory>('all');
  const [sortBy, setSortBy] = useState<SortOption>('score');
  const [selectedSport, setSelectedSport] = useState<ScoredSport | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Sync active profile ID
  const profile = useMemo(
    () => profiles.find((p) => p.id === activeId),
    [profiles, activeId]
  );

  // Score sports when profile or weights change
  useEffect(() => {
    if (!profile) {
      setScoredSports([]);
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setScoredSports(scoreAllSports(profile, weights));
      setIsLoading(false);
    }, 0);
  }, [profile, weights]);

  // Filter and sort sports
  const filteredSports = useMemo(() => {
    let filtered = scoredSports;

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter((s) => s.sport.category === categoryFilter);
    }

    // Search filter
    if (debouncedSearchQuery.trim()) {
      const search = debouncedSearchQuery.toLowerCase();
      filtered = filtered.filter(
        (s) =>
          s.sport.name.toLowerCase().includes(search) ||
          s.sport.category.toLowerCase().includes(search)
      );
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'score':
          return b.weightedTotal - a.weightedTotal;
        case 'name':
          return a.sport.name.localeCompare(b.sport.name);
        case 'age-match':
          return a.ageMatch.localeCompare(b.ageMatch);
        case 'cost':
          return a.sport.costRange.entryLevel.min - b.sport.costRange.entryLevel.min;
        default:
          return 0;
      }
    });

    return sorted;
  }, [scoredSports, categoryFilter, debouncedSearchQuery, sortBy]);

  // Handle profile changes
  const handleProfileCreated = useCallback((newProfile: ChildProfile) => {
    const isNew = !profiles.find(p => p.id === newProfile.id);
    saveProfile(newProfile);
    setProfiles(loadProfiles());
    setActiveId(newProfile.id);
    setActiveProfileId(newProfile.id);
    setViewMode('results');
    success(isNew ? `Profile created for ${newProfile.name}` : `Profile updated for ${newProfile.name}`);
  }, [profiles, success]);

  const handleSelectProfile = useCallback((id: string) => {
    setActiveId(id);
    setActiveProfileId(id);
    setViewMode('results');
  }, []);

  const handleDeleteProfile = useCallback((id: string) => {
    deleteProfile(id);
    const updated = loadProfiles();
    setProfiles(updated);
    if (activeId === id) {
      const nextId = updated[0]?.id || null;
      setActiveId(nextId);
      setActiveProfileId(nextId);
    }
    success('Profile deleted');
  }, [activeId, success]);

  // Handle weight changes
  const handleWeightsChange = useCallback((updated: ScoringWeights) => {
    setWeights(updated);
    saveWeights(updated);
  }, []);

  // Handle compare mode
  const handleToggleCompare = useCallback((sportId: string) => {
    setCompareIds(prev => {
      if (prev.includes(sportId)) {
        removeFromCompare(sportId);
        return prev.filter(id => id !== sportId);
      } else {
        addToCompare(sportId);
        return [...prev, sportId];
      }
    });
  }, []);

  const handleClearCompare = useCallback(() => {
    clearCompare();
    setCompareIds([]);
    setShowCompare(false);
  }, []);

  const compareSports = useMemo(
    () => scoredSports.filter((s) => compareIds.includes(s.sport.id)),
    [scoredSports, compareIds]
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow sticky top-0 z-40">
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
                : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300'
            }`}
          >
            Results
          </button>
          <button
            onClick={() => setViewMode('setup')}
            className={`px-4 py-2 rounded font-semibold transition ${
              viewMode === 'setup'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white hover:bg-gray-300'
            }`}
          >
            Manage Profiles
          </button>
        </div>

        {viewMode === 'setup' ? (
          /* Setup View */
          <div className="space-y-8">
            <ChildProfileForm onProfileCreated={handleProfileCreated} />

            {profiles.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Existing Profiles
                </h2>
                <div className="space-y-2">
                  {profiles.map((p) => (
                    <div
                      key={p.id}
                      className="flex justify-between items-center bg-white dark:bg-gray-800 p-4 rounded"
                    >
                      <div>
                        <div className="font-semibold text-gray-900 dark:text-white">
                          {p.name}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          Age {p.age} • {p.gender}
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleSelectProfile(p.id)}
                          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                        >
                          Select
                        </button>
                        <button
                          onClick={() => handleDeleteProfile(p.id)}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
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
            {profile ? (
              <div className="space-y-8">
                {/* Profile selector */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                  <ProfileSelector
                    profiles={profiles}
                    activeProfileId={activeId!}
                    onSelect={handleSelectProfile}
                    onEdit={() => setViewMode('setup')}
                    onDelete={handleDeleteProfile}
                    onCreateNew={() => setViewMode('setup')}
                  />

                  {compareSports.length > 0 && (
                    <div className="mt-6">
                      <CompareMode
                        scoredSports={compareSports}
                        compareIds={compareIds}
                        onRemove={handleToggleCompare}
                        onClear={handleClearCompare}
                        onClose={() => setShowCompare(false)}
                        zipCode={profile?.zipCode}
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
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded"
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Category
                      </label>
                      <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value as FilterCategory)}
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded"
                      >
                        <option value="all">All Categories</option>
                        {Object.entries(SPORT_CATEGORIES).map(([key]) => (
                          <option key={key} value={key}>
                            {key.charAt(0).toUpperCase() + key.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        Sort By
                      </label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value as SortOption)}
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
                      <ExportMenu profile={profile} scoredSports={filteredSports} />
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Recommended Sports ({filteredSports.length})
                  </h2>

                  {isLoading ? (
                    <div className="flex justify-center items-center py-12">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                    </div>
                  ) : filteredSports.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredSports.map((scoredSport, idx) => (
                        <div key={scoredSport.sport.id}>
                          <SportCard
                            scoredSport={scoredSport}
                            rank={idx + 1}
                            onViewDetails={() => setSelectedSport(scoredSport)}
                            onToggleCompare={handleToggleCompare}
                            isInCompare={compareIds.includes(scoredSport.sport.id)}
                            canAddToCompare={compareIds.length < 4}
                            zipCode={profile?.zipCode}
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
            onClose={() => setSelectedSport(null)}
            onToggleCompare={() => handleToggleCompare(selectedSport.sport.id)}
            isInCompare={compareIds.includes(selectedSport.sport.id)}
            canAddToCompare={compareIds.length < 4}
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
