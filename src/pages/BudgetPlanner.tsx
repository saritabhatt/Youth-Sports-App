import { useState } from 'react';
import { SPORTS_DATA } from '../data/sportsData';

/**
 * Budget Planner - Calculate multi-sport yearly costs
 * Route: /budget-planner
 */
export default function BudgetPlanner() {
  const [selectedSports, setSelectedSports] = useState<Array<{ id: string; intensity: 'recreational' | 'competitive' }>>([]);
  const [showResults, setShowResults] = useState(false);

  const toggleSport = (sportId: string, intensity: 'recreational' | 'competitive' = 'recreational') => {
    const exists = selectedSports.find(s => s.id === sportId);
    if (exists) {
      setSelectedSports(selectedSports.filter(s => s.id !== sportId));
    } else {
      if (selectedSports.length < 4) {
        setSelectedSports([...selectedSports, { id: sportId, intensity }]);
      }
    }
  };

  const calculateTotalCost = () => {
    let total = 0;
    selectedSports.forEach(({ id, intensity }) => {
      const sport = SPORTS_DATA.find(s => s.id === id);
      if (sport) {
        const costRange = intensity === 'recreational' ? sport.costRange?.entryLevel : sport.costRange?.competitive;
        if (costRange) {
          total += (costRange.min + costRange.max) / 2;
        }
      }
    });
    return Math.round(total);
  };

  const monthlyBreakdown = () => {
    // Simplified - would need actual season dates from sports data
    return [
      { month: 'Jan-Mar', cost: Math.round(calculateTotalCost() / 4) },
      { month: 'Apr-Jun', cost: Math.round(calculateTotalCost() / 4) },
      { month: 'Jul-Sep', cost: Math.round(calculateTotalCost() / 4) },
      { month: 'Oct-Dec', cost: Math.round(calculateTotalCost() / 4) },
    ];
  };

  const totalCost = calculateTotalCost();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      {/* Header */}
      <header className="bg-white dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-slate-800 dark:text-white">Budget Planner</h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Calculate total yearly sports costs for your family
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sport Selection */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
              <h2 className="text-lg font-bold text-slate-800 dark:text-white mb-4">
                Select Sports ({selectedSports.length}/4)
              </h2>

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {SPORTS_DATA.map(sport => {
                  const isSelected = selectedSports.some(s => s.id === sport.id);
                  return (
                    <button
                      key={sport.id}
                      onClick={() => toggleSport(sport.id)}
                      disabled={!isSelected && selectedSports.length >= 4}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                        isSelected
                          ? 'bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 font-medium'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600'
                      }`}
                    >
                      {sport.name}
                    </button>
                  );
                })}
              </div>

              {selectedSports.length > 0 && (
                <button
                  onClick={() => {
                    setSelectedSports([]);
                    setShowResults(false);
                  }}
                  className="w-full mt-4 px-3 py-2 text-sm bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-2">
            {selectedSports.length === 0 ? (
              <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-8 text-center">
                <p className="text-slate-600 dark:text-slate-400">
                  Select up to 4 sports to see the total yearly cost
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Total Cost Card */}
                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900 dark:to-emerald-800 rounded-lg border border-emerald-200 dark:border-emerald-700 p-6">
                  <p className="text-emerald-700 dark:text-emerald-300 text-sm font-medium mb-2">YEARLY TOTAL</p>
                  <p className="text-5xl font-bold text-emerald-700 dark:text-emerald-200">
                    ${totalCost.toLocaleString()}
                  </p>
                  <p className="text-emerald-600 dark:text-emerald-400 text-sm mt-2">
                    {selectedSports.length} sport{selectedSports.length !== 1 ? 's' : ''} selected
                  </p>
                </div>

                {/* Monthly Breakdown */}
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Monthly Breakdown</h3>
                  <div className="space-y-3">
                    {monthlyBreakdown().map((month, idx) => (
                      <div key={idx} className="flex items-center justify-between">
                        <span className="text-slate-600 dark:text-slate-400">{month.month}</span>
                        <div className="flex-1 ml-4">
                          <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full">
                            <div
                              className="h-2 bg-emerald-500 rounded-full"
                              style={{ width: `${(month.cost / (totalCost / 4)) * 100}%` }}
                            />
                          </div>
                        </div>
                        <span className="ml-4 font-bold text-slate-800 dark:text-white text-right min-w-16">
                          ${month.cost}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Selected Sports Detail */}
                <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-4">Selected Sports</h3>
                  <div className="space-y-3">
                    {selectedSports.map(({ id, intensity }) => {
                      const sport = SPORTS_DATA.find(s => s.id === id);
                      const costRange = intensity === 'recreational' ? sport?.costRange?.entryLevel : sport?.costRange?.competitive;
                      return (
                        <div key={id} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 rounded-lg">
                          <div>
                            <p className="font-medium text-slate-800 dark:text-white">{sport?.name}</p>
                            <p className="text-sm text-slate-600 dark:text-slate-400 capitalize">{intensity}</p>
                          </div>
                          <p className="font-bold text-slate-800 dark:text-white">
                            ${costRange ? ((costRange.min + costRange.max) / 2).toLocaleString() : 0}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
