import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SPORTS_DATA } from '../data/sportsData';

export function BudgetPlanner() {
  const [selectedSports, setSelectedSports] = useState<{ id: string; intensity: 'recreational' | 'competitive' }[]>([]);

  const costMap: Record<string, Record<'recreational' | 'competitive', number>> = {
    soccer: { recreational: 300, competitive: 3000 },
    basketball: { recreational: 250, competitive: 2000 },
    swimming: { recreational: 1500, competitive: 3500 },
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

  const yearlyTotal = selectedSports.reduce((total, sport) => {
    const costs = costMap[sport.id] || { recreational: 0, competitive: 0 };
    return total + (costs[sport.intensity] || 0);
  }, 0);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 p-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/">Back to Home</Link>
        <h1 className="text-4xl font-bold mb-8">Budget Planner</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-4">Select Sports</h2>
          <div className="space-y-4">
            {SPORTS_DATA.slice(0, 5).map((sport) => (
              <label key={sport.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedSports.some((s) => s.id === sport.id)}
                  onChange={() => toggleSport(sport.id)}
                />
                <span>{sport.name}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="bg-green-100 dark:bg-green-900 rounded-lg p-6">
          <h3 className="text-3xl font-bold mb-2">Yearly Cost: ${yearlyTotal.toLocaleString()}</h3>
          <p className="text-lg">Monthly: ${(yearlyTotal / 12).toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}
