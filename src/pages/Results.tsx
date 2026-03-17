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
  const [compareIds, setCompareIds] = useState<string[]>(loadCompareList());
  const [filterCategory, setFilterCategory] = useState<FilterCategory>('all');
  const [sortOption, setSortOption] = useState<SortOption>('score');
  const [selectedSport, setSelectedSport] = useState<ScoredSport | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileToEdit, setProfileToEdit] = useState<ChildProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearch = useDebounce(searchTerm, 300);

  // Sync active profile
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
    const isNew = !profiles.find(p => p.id === profile.id);
    saveProfile(profile);
    setProfiles(loadProfiles());
    setActiveProfileIdState(profile.id);
    setActiveProfileId(profile.id);
    setViewMode('results');
    setIsEditingProfile(false);
    setProfileToEdit(null);
    success(isNew ? `Profile created for ${profile.name}` : `Profile updated for ${profile.name}`);
  }, [profiles, success]);

  const handleSelectProfile = useCallback((profileId: string) => {
    setActiveProfileIdState(profileId);
    setActiveProfileId(profileId);
    setViewMode('results');
  }, []);

  const handleEditProfile = useCallback((p: ChildProfile) => {
    setProfileToEdit(p);
    setIsEditingProfile(true);
    setViewMode('setup');
  }, []);

  const handleDeleteProfile = useCallback((profileId: string) => {
    deleteProfile(profileId);
    const updatedProfiles = loadProfiles();
    setProfiles(updatedProfiles);

    if (activeProfileId === profileId) {
      const nextId = updatedProfiles[0]?.id || null;
      setActiveProfileIdState(nextId);
      setActiveProfileId(nextId);
    }
    success('Profile deleted');
  }, [activeProfileId, success]);

  // Handle weight changes
  const handleWeightsChange = useCallback((updated: ScoringWeights) => {
    setWeights(updated);
    saveWeights(updated);
  }, []);

  // Handle compare mode
  const handleToggleCompare = useCallback((sportId: string) => {
    setCompareIds((prev) => {
      if (prev.includes(sportId)) {
        removeFromCompare(sportId);
        return prev.filter((id) => id !== sportId);
      } else {
        if (prev.length < 4) {
          addToCompare(sportId);
          success('Added to comparison');
          return [...prev, sportId];
        }
        return prev;
      }
    });
  }, [success]);

  const handleClearCompare = useCallback(() => {
    clearCompare();
    setCompareIds([]);
  }, []);

  const compareSports = useMemo(
    () => scoredSports.filter((s) => compareIds.includes(s.sport.id)),
    [scoredSports, compareIds]
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <ToastContainer toasts={toasts} onRemove={removeToast} />

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
            {(profiles.length === 0 || isEditingProfile) && (
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  {profileToEdit ? 'Edit Profile' : 'Create Child Profile'}
                </h2>
                <ChildProfileForm
                  onProfileCreated={handleProfileCreated}
                  existingProfile={profileToEdit}
                  onCancel={profiles.length > 0 ? () => {
                    setIsEditingProfile(false);
                    setProfileToEdit(null);
                    setViewMode('results');
                  } : undefined}
                />
              </div>
            )}

            {profiles.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  Existing Profiles
                </h2>
                <ProfileSelector
                  profiles={profiles}
                  activeProfileId={activeProfileId!}
                  onSelect={handleSelectProfile}
                  onEdit={handleEditProfile}
                  onDelete={handleDeleteProfile}
                  onCreateNew={() => {
                    setProfileToEdit(null);
                    setIsEditingProfile(true);
                  }}
                />
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
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                      {activeProfile.name}
                    </h2>
                    <button
                      onClick={() => handleEditProfile(activeProfile)}
                      className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-sm"
                    >
                      Edit Profile
                    </button>
                  </div>

                  {compareIds.length > 0 && (
                    <div className="mt-6">
                      <CompareMode
                        scoredSports={scoredSports}
                        compareIds={compareIds}
                        onRemove={handleToggleCompare}
                        onClear={handleClearCompare}
                        zipCode={activeProfile.zipCode}
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
                        {Object.entries(SPORT_CATEGORIES).map(([key]) => (
                          <option key={key} value={key}>
                            {SPORT_CATEGORIES[key as SportCategory].name}
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
                        profile={activeProfile}
                        scoredSports={filteredAndSortedSports}
                      />
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Recommended Sports ({filteredAndSortedSports.length})
                  </h2>

                  {scoredSportsLoading ? (
                    <div className="flex justify-center items-center py-12">
                      <div className="text-center">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-2"></div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm">Calculating scores...</p>
                      </div>
                    </div>
                  ) : filteredAndSortedSports.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {filteredAndSortedSports.map((sport, index) => (
                        <SportCard
                          key={sport.sport.id}
                          scoredSport={sport}
                          rank={filterCategory === 'all' ? index + 1 : 0}
                          onViewDetails={() => setSelectedSport(sport)}
                          isInCompare={compareIds.includes(sport.sport.id)}
                          onToggleCompare={handleToggleCompare}
                          canAddToCompare={compareIds.length < 4}
                          zipCode={activeProfile.zipCode}
                        />
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
        {selectedSport && activeProfile && (
          <SportDetailModal
            scoredSport={selectedSport}
            region={getRegionFromZip(activeProfile.zipCode) || 'west-coast'}
            onClose={() => setSelectedSport(null)}
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
