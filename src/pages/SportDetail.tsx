import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { SPORTS_DATA, Sport } from '../data/sportsData';

/**
 * Sport Detail Page - Full Sport 101 information
 * Route: /sports/:sportId
 */
export default function SportDetail() {
  const { sportId } = useParams<{ sportId: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'overview' | 'injuries' | 'cost' | 'college'>('overview');

  // Find sport in data
  const sport = SPORTS_DATA.find(s => s.id === sportId);

  if (!sport) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center p-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-4">Sport Not Found</h1>
          <button
            onClick={() => navigate('/results')}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
          >
            Back to Results
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="text-emerald-600 dark:text-emerald-400 hover:underline mb-4"
          >
            ← Back
          </button>
          <div className="flex items-center gap-4">
            <div className="text-5xl">{/* Sport emoji would go here */}</div>
            <div>
              <h1 className="text-4xl font-bold text-slate-800 dark:text-white">{sport.name}</h1>
              <p className="text-slate-600 dark:text-slate-400">Complete Sport Guide</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Quick Facts */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-600 dark:text-slate-400">Ideal Start Age</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">
              {sport.idealStartAge?.min || 6}-{sport.idealStartAge?.max || 8}
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-600 dark:text-slate-400">Rec Cost/Year</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">
              ${sport.costRange?.entryLevel?.min || 0}
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-600 dark:text-slate-400">College Opportunity</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">
              {sport.collegeOpportunity || 2}/5
            </p>
          </div>
          <div className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-slate-200 dark:border-slate-700">
            <p className="text-sm text-slate-600 dark:text-slate-400">Lifespan Value</p>
            <p className="text-2xl font-bold text-slate-800 dark:text-white">
              {sport.lifespanValue || 3}/5
            </p>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-2 mb-6 border-b border-slate-200 dark:border-slate-700">
          {(['overview', 'injuries', 'cost', 'college'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 font-medium border-b-2 transition-colors ${
                activeTab === tab
                  ? 'border-emerald-600 text-emerald-600 dark:text-emerald-400'
                  : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <section>
                <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">How It Works</h2>
                <p className="text-slate-600 dark:text-slate-300">
                  {sport.notes || 'No detailed description available. Check back soon!'}
                </p>
              </section>

              {sport.baseScores && (
                <section>
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">What It Develops</h2>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Fun Factor</p>
                      <div className="flex gap-1">
                        {[...Array(10)].map((_, i) => (
                          <div
                            key={i}
                            className={`h-2 w-2 rounded-full ${
                              i < sport.baseScores.funFactor ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Skill Focus</p>
                      <div className="flex gap-1">
                        {[...Array(10)].map((_, i) => (
                          <div
                            key={i}
                            className={`h-2 w-2 rounded-full ${
                              i < sport.baseScores.skillFocus ? 'bg-blue-500' : 'bg-slate-300 dark:bg-slate-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400">Accessibility</p>
                      <div className="flex gap-1">
                        {[...Array(10)].map((_, i) => (
                          <div
                            key={i}
                            className={`h-2 w-2 rounded-full ${
                              i < sport.baseScores.accessibility ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-600'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </section>
              )}

              {sport.physicalDemands && (
                <section>
                  <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-3">Physical Demands</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Cardio: {sport.physicalDemands.cardio}/5</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Strength: {sport.physicalDemands.strength}/5</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Coordination: {sport.physicalDemands.coordination}/5</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-600 dark:text-slate-400">Flexibility: {sport.physicalDemands.flexibility}/5</p>
                    </div>
                  </div>
                </section>
              )}
            </div>
          )}

          {activeTab === 'injuries' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Common Injuries & Prevention</h2>
              <p className="text-slate-600 dark:text-slate-300 mb-4">
                Coming soon - injury data for {sport.name}
              </p>
            </div>
          )}

          {activeTab === 'cost' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">Cost Breakdown</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Recreational:</span>
                  <span className="font-bold text-slate-800 dark:text-white">
                    ${sport.costRange?.entryLevel?.min || 0}-${sport.costRange?.entryLevel?.max || 0}/year
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Competitive:</span>
                  <span className="font-bold text-slate-800 dark:text-white">
                    ${sport.costRange?.competitive?.min || 0}-${sport.costRange?.competitive?.max || 0}/year
                  </span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'college' && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-4">College Opportunities</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Scholarship Potential</p>
                  <p className="text-lg font-bold text-slate-800 dark:text-white">
                    {sport.collegeOpportunity || 2}/5
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
