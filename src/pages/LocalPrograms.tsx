import { useState } from 'react';
import { SPORTS_DATA } from '../data/sportsData';

/**
 * Local Programs Directory
 * Route: /local-programs
 * Shows youth sports programs in the user's region
 */
export default function LocalPrograms() {
  const [selectedSport, setSelectedSport] = useState<string>('all');
  const [userZip, setUserZip] = useState<string>('93101'); // Default Santa Barbara

  // Placeholder for programs data - will be populated by agents
  const programs: any[] = [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Local Sports Programs</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Find youth sports programs in your area
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              ZIP Code
            </label>
            <input
              type="text"
              value={userZip}
              onChange={(e) => setUserZip(e.target.value)}
              placeholder="93101"
              maxLength={5}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Sport
            </label>
            <select
              value={selectedSport}
              onChange={(e) => setSelectedSport(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-white focus:ring-2 focus:ring-emerald-500 outline-none"
            >
              <option value="all">All Sports</option>
              {SPORTS_DATA.map(sport => (
                <option key={sport.id} value={sport.id}>
                  {sport.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        {programs.length === 0 ? (
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-12 text-center">
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto bg-slate-100 dark:bg-slate-700 rounded-full flex items-center justify-center">
                <span className="text-2xl">🔍</span>
              </div>
            </div>
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-2">
              No programs found
            </h2>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Local programs are being added for your area. Check back soon!
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-500">
              ZIP: {userZip} | Sport: {selectedSport === 'all' ? 'All' : selectedSport}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6 hover:shadow-lg transition-shadow"
              >
                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-2">
                  {program.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                  {program.sport}
                </p>
                <div className="space-y-2 text-sm">
                  <p className="text-slate-700 dark:text-slate-300">
                    📍 {program.location}
                  </p>
                  <p className="text-slate-700 dark:text-slate-300">
                    👥 Ages {program.ageRange.min}-{program.ageRange.max}
                  </p>
                  <p className="text-slate-700 dark:text-slate-300">
                    💰 ${program.cost.min}-${program.cost.max}/season
                  </p>
                </div>
                <a
                  href={program.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors text-center font-medium"
                >
                  Learn More
                </a>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
