import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SPORTS_DATA, SPORT_CATEGORIES } from '../data/sportsData';
import { ArrowLeft, DollarSign, TrendingUp, PieChart as PieChartIcon } from 'lucide-react';

export function BudgetPlanner() {
  const [selectedSports, setSelectedSports] = useState<{ id: string; intensity: 'recreational' | 'competitive' }[]>([]);

  const costMap: Record<string, Record<'recreational' | 'competitive', number>> = {
    soccer: { recreational: 300, competitive: 3000 },
    basketball: { recreational: 250, competitive: 2000 },
    swimming: { recreational: 1500, competitive: 3500 },
    tennis: { recreational: 800, competitive: 2500 },
    baseball: { recreational: 500, competitive: 2800 },
    hockey: { recreational: 2000, competitive: 5000 },
    gymnastics: { recreational: 1200, competitive: 3800 },
    volleyball: { recreational: 400, competitive: 2200 },
  };

  const toggleSport = (sportId: string) => {
    setSelectedSports((prev) => {
      const exists = prev.find((s) => s.id === sportId);
      if (exists) {
        return prev.filter((s) => s.id !== sportId);
      } else {
        return [...prev, { id: sportId, intensity: 'recreational' }];
      }
    });
  };

  const toggleIntensity = (sportId: string, intensity: 'recreational' | 'competitive') => {
    setSelectedSports((prev) =>
      prev.map((s) => (s.id === sportId ? { ...s, intensity } : s))
    );
  };

  const sportDetails = selectedSports.map((sport) => {
    const data = SPORTS_DATA.find((s) => s.id === sport.id);
    const costs = costMap[sport.id] || { recreational: 0, competitive: 0 };
    const categoryData = data ? SPORT_CATEGORIES[data.category as keyof typeof SPORT_CATEGORIES] : null;
    return {
      id: sport.id,
      name: data?.name || sport.id,
      emoji: categoryData?.icon || '🏆',
      intensity: sport.intensity,
      cost: costs[sport.intensity] || 0,
    };
  });

  const yearlyTotal = sportDetails.reduce((total, sport) => total + sport.cost, 0);
  const monthlyTotal = yearlyTotal / 12;

  const maxCost = Math.max(...sportDetails.map((s) => s.cost), 1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50 dark:from-gray-950 dark:via-purple-950/20 dark:to-blue-950/20 p-6">
      <div className="max-w-6xl mx-auto">
        <Link to="/">
          <button className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
        </Link>

        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            💰 Budget Planner
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl">
            Plan your sports investment with our smart budget calculator. See real costs for different intensity levels.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Cost Cards */}
          <div className="lg:col-span-2 animate-slide-up-stagger">
            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {/* Yearly Total */}
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border border-emerald-200/50 dark:border-emerald-900/50 rounded-2xl p-8 hover-lift">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">📅</div>
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-200 to-teal-200 dark:from-emerald-800 dark:to-teal-800 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-emerald-700 dark:text-emerald-300" />
                  </div>
                </div>
                <p className="text-sm font-semibold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-2">
                  Yearly Investment
                </p>
                <p className="text-4xl font-bold text-emerald-700 dark:text-emerald-300">
                  ${yearlyTotal.toLocaleString()}
                </p>
              </div>

              {/* Monthly Total */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/40 dark:to-indigo-950/40 border border-blue-200/50 dark:border-blue-900/50 rounded-2xl p-8 hover-lift">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-4xl">📊</div>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-200 to-indigo-200 dark:from-blue-800 dark:to-indigo-800 rounded-lg flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-blue-700 dark:text-blue-300" />
                  </div>
                </div>
                <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider mb-2">
                  Monthly Average
                </p>
                <p className="text-4xl font-bold text-blue-700 dark:text-blue-300">
                  ${monthlyTotal.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Sport Selection */}
            <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-8 hover-lift">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
                <span className="text-3xl">🏆</span>
                Select Sports & Intensity
              </h2>
              
              <div className="space-y-4">
                {SPORTS_DATA.slice(0, 8).map((sport) => {
                  const selected = selectedSports.find((s) => s.id === sport.id);
                  const costs = costMap[sport.id] || { recreational: 0, competitive: 0 };
                  const categoryData = SPORT_CATEGORIES[sport.category as keyof typeof SPORT_CATEGORIES];
                  
                  return (
                    <div key={sport.id} className="border border-slate-200 dark:border-slate-700 rounded-xl p-4 hover:border-emerald-400 dark:hover:border-emerald-600 transition-colors">
                      <div className="flex items-center gap-4">
                        <input
                          type="checkbox"
                          id={sport.id}
                          checked={!!selected}
                          onChange={() => toggleSport(sport.id)}
                          className="w-5 h-5 rounded cursor-pointer"
                        />
                        <label htmlFor={sport.id} className="flex-1 cursor-pointer flex items-center gap-2">
                          <span className="text-2xl">{categoryData?.icon || '🏆'}</span>
                          <span className="font-semibold text-slate-900 dark:text-white">{sport.name}</span>
                        </label>
                        
                        {selected && (
                          <div className="flex gap-2">
                            <button
                              onClick={() => toggleIntensity(sport.id, 'recreational')}
                              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                                selected.intensity === 'recreational'
                                  ? 'bg-emerald-600 text-white shadow-lg'
                                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                              }`}
                            >
                              Rec
                            </button>
                            <button
                              onClick={() => toggleIntensity(sport.id, 'competitive')}
                              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                                selected.intensity === 'competitive'
                                  ? 'bg-purple-600 text-white shadow-lg'
                                  : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                              }`}
                            >
                              Comp
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Cost Breakdown Chart */}
          <div className="lg:col-span-1 animate-slide-up" style={{ animationDelay: '0.15s' }}>
            {selectedSports.length > 0 ? (
              <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-8 sticky top-20 hover-lift">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                  <PieChartIcon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  Cost Breakdown
                </h3>

                <div className="space-y-4">
                  {sportDetails.map((sport) => {
                    const sportData = SPORTS_DATA.find((s) => s.id === sport.id);
                    const categoryData = SPORT_CATEGORIES[sportData?.category as keyof typeof SPORT_CATEGORIES || 'general'];
                    return (
                      <div key={sport.id} className="group">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="text-lg">{categoryData?.icon || '🏆'}</span>
                            <span className="font-semibold text-slate-900 dark:text-white text-sm">{sport.name}</span>
                          </div>
                          <span className="font-bold text-slate-900 dark:text-white text-sm">
                            ${sport.cost.toLocaleString()}
                          </span>
                        </div>
                        <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2.5 overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full transition-all group-hover:from-emerald-600 group-hover:to-teal-600"
                            style={{
                              width: `${(sport.cost / maxCost) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                          {sport.intensity === 'recreational' ? '🟦 Recreational' : '🟪 Competitive'}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-slate-900 dark:text-white">Total:</span>
                    <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                      ${yearlyTotal.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-8 sticky top-20 text-center">
                <div className="text-5xl mb-4">🎯</div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">No Sports Selected</h3>
                <p className="text-slate-600 dark:text-slate-400">
                  Select sports to see budget breakdown
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30 border border-amber-200/50 dark:border-amber-900/50 rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
            💡 Budget Tips
          </h3>
          <ul className="grid md:grid-cols-2 gap-4">
            {[
              'Start with recreational leagues to explore interests',
              'Equipment costs can vary; consider quality vs. budget options',
              'Some facilities offer scholarships for financial assistance',
              'Look for combo packages or group discounts',
            ].map((tip, idx) => (
              <li key={idx} className="flex gap-3 text-slate-700 dark:text-slate-300">
                <span className="text-xl">✨</span>
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
