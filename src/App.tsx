import { useState, useMemo, useEffect, useCallback } from 'react';
import ChildProfileForm from './components/ChildProfileForm';
import ScoringWeightsSliders from './components/ScoringWeightsSliders';
import SportCard from './components/SportCard';
import SportDetailModal from './components/SportDetailModal';
import ProfileSelector from './components/ProfileSelector';
import CompareMode from './components/CompareMode';
import ExportMenu from './components/ExportMenu';
import { ToastContainer, useToast } from './components/Toast';
import { ThemeToggle } from './components/ThemeToggle';
import { Navigation } from './components/Navigation';
import { useDebounce } from './utils/useDebounce';
import { 
  ChildProfile, 
  ScoringWeights, 
  ScoredSport,
  scoreAllSports,
} from './data/scoringEngine';
import { 
  SPORT_CATEGORIES, 
  SportCategory, 
  getRegionFromZip, 
  REGION_NAMES 
} from './data/sportsData';
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
  clearCompare
} from './data/storage';

type ViewMode = 'setup' | 'results';
type FilterCategory = SportCategory | 'all';
type SortOption = 'score' | 'name' | 'age-match' | 'cost';

// Load initial state once outside component to avoid duplicate calls
const initialProfiles = loadProfiles();
const initialActiveId = getActiveProfileId();
const initialViewMode: ViewMode = initialProfiles.length > 0 && initialActiveId ? 'results' : 'setup';

export default function App() {
  // Toast notifications
  const { toasts, removeToast, success } = useToast();

  // Load initial state from storage
  const [profiles, setProfiles] = useState<ChildProfile[]>(initialProfiles);
  const [activeId, setActiveId] = useState<string | null>(initialActiveId);
  const [weights, setWeights] = useState<ScoringWeights>(() => loadWeights());
  const [compareIds, setCompareIds] = useState<string[]>(() => loadCompareList());

  // UI state
  const [viewMode, setViewMode] = useState<ViewMode>(initialViewMode);
  const [categoryFilter, setCategoryFilter] = useState<FilterCategory>('all');
  const [showTopOnly, setShowTopOnly] = useState(false);
  const [selectedSport, setSelectedSport] = useState<ScoredSport | null>(null);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [profileToEdit, setProfileToEdit] = useState<ChildProfile | null>(null);
  const [showWeights, setShowWeights] = useState(false);
  const [showCompare, setShowCompare] = useState(false);

  // Search and sort
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const [sortBy, setSortBy] = useState<SortOption>('score');

  // Get active profile
  const profile = useMemo(() => {
    return profiles.find(p => p.id === activeId) || null;
  }, [profiles, activeId]);

  // Calculate scores
  const scoredSports = useMemo(() => {
    if (!profile) return [];
    return scoreAllSports(profile, weights);
  }, [profile, weights]);

  // Apply filters, search, and sort
  const filteredSports = useMemo(() => {
    let filtered = scoredSports;

    // Apply search (using debounced query to reduce renders)
    if (debouncedSearchQuery.trim()) {
      const query = debouncedSearchQuery.toLowerCase();
      filtered = filtered.filter(s =>
        s.sport.name.toLowerCase().includes(query) ||
        s.sport.category.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(s => s.sport.category === categoryFilter);
    }

    // Apply sorting
    if (sortBy !== 'score') {
      filtered = [...filtered].sort((a, b) => {
        switch (sortBy) {
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
    }

    // Apply top 10 filter
    if (showTopOnly) {
      filtered = filtered.slice(0, 10);
    }

    return filtered;
  }, [scoredSports, categoryFilter, showTopOnly, debouncedSearchQuery, sortBy]);

  // Save weights when changed
  useEffect(() => {
    saveWeights(weights);
  }, [weights]);

  // Handlers wrapped in useCallback for performance
  const handleProfileCreated = useCallback((newProfile: ChildProfile) => {
    const isNew = !profiles.find(p => p.id === newProfile.id);
    saveProfile(newProfile);
    setProfiles(loadProfiles());
    setActiveId(newProfile.id);
    setActiveProfileId(newProfile.id);
    setViewMode('results');
    setIsEditingProfile(false);
    setProfileToEdit(null);
    success(isNew ? `Profile created for ${newProfile.name}` : `Profile updated for ${newProfile.name}`);
  }, [profiles, success]);

  const handleSelectProfile = useCallback((profileId: string) => {
    setActiveId(profileId);
    setActiveProfileId(profileId);
    setViewMode('results');
  }, []);

  const handleEditProfile = useCallback((p: ChildProfile) => {
    setProfileToEdit(p);
    setIsEditingProfile(true);
    setViewMode('setup');
  }, []);

  const handleDeleteProfile = useCallback((profileId: string) => {
    const profileName = profiles.find(p => p.id === profileId)?.name || 'Profile';
    deleteProfile(profileId);
    const updatedProfiles = loadProfiles();
    setProfiles(updatedProfiles);

    setActiveId(currentActiveId => {
      if (profileId === currentActiveId) {
        if (updatedProfiles.length > 0) {
          setActiveProfileId(updatedProfiles[0].id);
          return updatedProfiles[0].id;
        } else {
          setViewMode('setup');
          return null;
        }
      }
      return currentActiveId;
    });
    success(`${profileName} deleted`);
  }, [profiles, success]);

  const handleToggleCompare = useCallback((sportId: string) => {
    setCompareIds(currentIds => {
      if (currentIds.includes(sportId)) {
        return removeFromCompare(sportId);
      } else {
        return addToCompare(sportId);
      }
    });
  }, []);

  const handleClearCompare = useCallback(() => {
    clearCompare();
    setCompareIds([]);
  }, []);

  const region = profile ? getRegionFromZip(profile.zipCode) : null;

  // Setup View
  if (viewMode === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        {/* Header */}
        <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
          <div className="max-w-2xl mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="text-3xl">🏅</div>
                <div>
                  <h1 className="text-xl font-bold text-slate-800 dark:text-white">The Long Game</h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Youth Sports Assessment</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <ThemeToggle />
                {profiles.length > 0 && !isEditingProfile && (
                  <button
                    onClick={() => setViewMode('results')}
                    className="text-sm text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium"
                  >
                    View Results →
                  </button>
                )}
              </div>
            </div>
            <Navigation />
          </div>
        </header>

        <main className="max-w-2xl mx-auto px-4 py-8">
          {/* Existing profiles */}
          {profiles.length > 0 && !isEditingProfile && (
            <div className="mb-6">
              <ProfileSelector
                profiles={profiles}
                activeProfileId={activeId}
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

          {/* Create/Edit form */}
          {(profiles.length === 0 || isEditingProfile) && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800">
                  {profileToEdit ? 'Edit Profile' : 'Create Child Profile'}
                </h2>
                <p className="text-slate-500 mt-1">
                  Tell us about your child to get personalized sport recommendations
                </p>
              </div>
              
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
        </main>

        {/* Toast Notifications */}
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
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="text-2xl">🏅</div>
              <div>
                <h1 className="text-lg font-bold text-slate-800 dark:text-white">The Long Game</h1>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <ThemeToggle />
              {/* Compare button */}
              {compareIds.length > 0 && (
                <button
                  onClick={() => setShowCompare(true)}
                  className="flex items-center gap-2 px-3 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600 transition-colors"
                >
                  <span>Compare</span>
                  <span className="bg-white/20 px-1.5 rounded">{compareIds.length}</span>
                </button>
              )}
              
              {/* Export */}
              {profile && (
                <ExportMenu profile={profile} scoredSports={scoredSports} />
              )}
              
              {/* Profile info */}
              {profile && (
                <div className="hidden sm:flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-medium text-slate-800">{profile.name}</div>
                    <div className="text-xs text-slate-500">
                      {profile.age} years • {region && REGION_NAMES[region]}
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setIsEditingProfile(false);
                      setProfileToEdit(null);
                      setViewMode('setup');
                    }}
                    className="px-3 py-1.5 text-sm bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
                  >
                    Switch
                  </button>
                </div>
              )}
            </div>
          </div>
          <Navigation />
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Filters & Weights */}
          <aside className="lg:col-span-1 space-y-4">
            {/* Profile selector (mobile & desktop) */}
            <ProfileSelector
              profiles={profiles}
              activeProfileId={activeId}
              onSelect={handleSelectProfile}
              onEdit={handleEditProfile}
              onDelete={handleDeleteProfile}
              onCreateNew={() => {
                setProfileToEdit(null);
                setIsEditingProfile(true);
                setViewMode('setup');
              }}
            />

            {/* Category Filter */}
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <h3 className="font-semibold text-slate-800 mb-3">Categories</h3>
              <div className="space-y-1 max-h-64 overflow-y-auto">
                <button
                  onClick={() => setCategoryFilter('all')}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                    categoryFilter === 'all' 
                      ? 'bg-emerald-100 text-emerald-700 font-medium' 
                      : 'hover:bg-slate-100 text-slate-600'
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
                      onClick={() => setCategoryFilter(key as SportCategory)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        categoryFilter === key 
                          ? 'bg-emerald-100 text-emerald-700 font-medium' 
                          : 'hover:bg-slate-100 text-slate-600'
                      }`}
                    >
                      {icon} {name} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Filters */}
            <div className="bg-white rounded-xl border border-slate-200 p-4">
              <h3 className="font-semibold text-slate-800 mb-3">Quick Filters</h3>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showTopOnly}
                  onChange={(e) => setShowTopOnly(e.target.checked)}
                  className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                />
                <span className="text-sm text-slate-600">Show top 10 only</span>
              </label>
            </div>

            {/* Weights Toggle */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <button
                onClick={() => setShowWeights(!showWeights)}
                className="w-full px-4 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <span className="font-semibold text-slate-800">Customize Priorities</span>
                <span className="text-slate-400">{showWeights ? '▲' : '▼'}</span>
              </button>
              
              {showWeights && (
                <div className="px-4 pb-4 border-t border-slate-100">
                  <div className="pt-4">
                    <ScoringWeightsSliders 
                      weights={weights} 
                      onChange={setWeights} 
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Santa Barbara local note */}
            {profile?.zipCode?.startsWith('931') && (
              <div className="bg-emerald-50 rounded-xl border border-emerald-100 p-4">
                <div className="flex items-center gap-2 text-emerald-700 font-medium text-sm mb-1">
                  📍 Santa Barbara Area
                </div>
                <p className="text-xs text-emerald-600">
                  Local programs and organizations are shown on sport cards.
                </p>
              </div>
            )}
          </aside>

          {/* Main Content - Sport Cards */}
          <div className="lg:col-span-3">
            {/* Search and Sort Bar */}
            <div className="bg-white rounded-xl border border-slate-200 p-4 mb-4">
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search Input */}
                <div className="relative flex-1">
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search sports..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                      aria-label="Clear search"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2">
                  <label htmlFor="sort-select" className="text-sm text-slate-500 whitespace-nowrap">Sort by:</label>
                  <select
                    id="sort-select"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="px-3 py-2 border border-slate-200 rounded-lg text-sm bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  >
                    <option value="score">Best Match</option>
                    <option value="name">Name (A-Z)</option>
                    <option value="age-match">Age Timing</option>
                    <option value="cost">Lowest Cost</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Results Header */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  {categoryFilter === 'all' ? 'All Sports' : SPORT_CATEGORIES[categoryFilter].name}
                </h2>
                <p className="text-sm text-slate-500">
                  {filteredSports.length} sports{debouncedSearchQuery && ` matching "${debouncedSearchQuery}"`} ranked for {profile?.name}
                </p>
              </div>

              {compareIds.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-slate-500">{compareIds.length}/4 selected</span>
                  <button
                    onClick={handleClearCompare}
                    className="text-sm text-slate-500 hover:text-slate-700"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>

            {/* Sport Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredSports.map((scoredSport, index) => (
                <SportCard
                  key={scoredSport.sport.id}
                  scoredSport={scoredSport}
                  rank={categoryFilter === 'all' ? index + 1 : 0}
                  onViewDetails={setSelectedSport}
                  isInCompare={compareIds.includes(scoredSport.sport.id)}
                  onToggleCompare={handleToggleCompare}
                  canAddToCompare={compareIds.length < 4}
                  zipCode={profile?.zipCode}
                />
              ))}
            </div>

            {filteredSports.length === 0 && (
              <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
                <div className="w-20 h-20 mx-auto mb-4 bg-slate-100 rounded-full flex items-center justify-center">
                  <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">No sports found</h3>
                <p className="text-slate-500 mb-4 max-w-sm mx-auto">
                  {debouncedSearchQuery
                    ? `No sports match "${debouncedSearchQuery}". Try a different search term.`
                    : 'Try adjusting your filters or selecting a different category.'}
                </p>
                <div className="flex justify-center gap-3">
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-colors"
                    >
                      Clear Search
                    </button>
                  )}
                  {categoryFilter !== 'all' && (
                    <button
                      onClick={() => setCategoryFilter('all')}
                      className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-sm font-medium hover:bg-slate-200 transition-colors"
                    >
                      Show All Sports
                    </button>
                  )}
                </div>
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

      {/* Compare Mode */}
      {showCompare && (
        <CompareMode
          scoredSports={scoredSports}
          compareIds={compareIds}
          onRemove={handleToggleCompare}
          onClear={handleClearCompare}
          onClose={() => setShowCompare(false)}
          zipCode={profile?.zipCode}
        />
      )}

      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
