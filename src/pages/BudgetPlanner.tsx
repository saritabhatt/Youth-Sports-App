import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Checkbox } from '../components/ui/checkbox';
import { ArrowLeft, DollarSign, TrendingDown } from 'lucide-react';
import { SPORTS_DATA } from '../data/sportsData';

export function BudgetPlanner() {
  const [selectedSports, setSelectedSports] = useState<{ id: string; intensity: 'recreational' | 'competitive' }[]>([]);

  // Cost mapping for different sport intensity levels
  const costMap: Record<string, Record<'recreational' | 'competitive', number>> = {
    soccer: { recreational: 300, competitive: 3000 },
    basketball: { recreational: 250, competitive: 2000 },
    baseball: { recreational: 280, competitive: 2500 },
    swimming: { recreational: 1500, competitive: 3500 },
    tennis: { recreational: 1500, competitive: 4000 },
    gymnastics: { recreational: 1000, competitive: 4500 },
    volleyball: { recreational: 250, competitive: 2500 },
    track: { recreational: 200, competitive: 1500 },
    lacrosse: { recreational: 400, competitive: 3000 },
    football: { recreational: 300, competitive: 2000 },
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

  const toggleIntensity = (sportId: string) => {
    setSelectedSports((prev) =>
      prev.map((s) =>
        s.id === sportId
          ? { ...s, intensity: s.intensity === 'recreational' ? 'competitive' : 'recreational' }
          : s
      )
    );
  };

  const yearlyTotal = selectedSports.reduce((total, sport) => {
    const costs = costMap[sport.id] || { recreational: 0, competitive: 0 };
    return total + (costs[sport.intensity] || 0);
  }, 0);

  const monthlyTotal = yearlyTotal / 12;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 p-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/">
          <Button variant="outline" size="sm" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>

        <h1 className="text-4xl font-bold mb-2">Budget Calculator</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Select sports to see the total yearly cost and monthly breakdown.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sport Selection */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Select Sports</CardTitle>
                <CardDescription>Choose which sports your child is interested in</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {SPORTS_DATA.slice(0, 10).map((sport) => {
                  const selected = selectedSports.find((s) => s.id === sport.id);
                  return (
                    <div key={sport.id} className="flex items-start gap-4 p-3 border rounded-lg">
                      <Checkbox
                        checked={!!selected}
                        onCheckedChange={() => toggleSport(sport.id)}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{sport.name}</h3>
                        {selected && (
                          <div className="mt-2 space-y-2">
                            <label className="flex items-center gap-2 text-sm">
                              <input
                                type="radio"
                                name={`${sport.id}-intensity`}
                                value="recreational"
                                checked={selected.intensity === 'recreational'}
                                onChange={() => toggleIntensity(sport.id)}
                              />
                              Recreational (${costMap[sport.id]?.recreational || 0}/year)
                            </label>
                            <label className="flex items-center gap-2 text-sm">
                              <input
                                type="radio"
                                name={`${sport.id}-intensity`}
                                value="competitive"
                                checked={selected.intensity === 'competitive'}
                                onChange={() => toggleIntensity(sport.id)}
                              />
                              Competitive (${costMap[sport.id]?.competitive || 0}/year)
                            </label>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* Cost Summary */}
          <div className="space-y-4">
            {/* Yearly Cost */}
            <Card className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  Yearly Cost
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                  ${yearlyTotal.toLocaleString()}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  ${monthlyTotal.toFixed(2)} per month on average
                </p>
              </CardContent>
            </Card>

            {/* Selected Sports Summary */}
            {selectedSports.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Selected Sports</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {selectedSports.map((sport) => {
                    const sportData = SPORTS_DATA.find((s) => s.id === sport.id);
                    const cost = costMap[sport.id]?.[sport.intensity] || 0;
                    return (
                      <div key={sport.id} className="flex justify-between text-sm">
                        <div>
                          <p className="font-semibold">{sportData?.name}</p>
                          <p className="text-xs text-gray-600 dark:text-gray-400">{sport.intensity}</p>
                        </div>
                        <p className="font-semibold">${cost}</p>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>
            )}

            {/* Comparison */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingDown className="w-5 h-5" />
                  How It Compares
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Average family</span>
                  <span className="font-semibold">$2,400/year</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Your region (SB)</span>
                  <span className="font-semibold">$2,100/year</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">High-end combo</span>
                  <span className="font-semibold">$5,500/year</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {selectedSports.length === 0 && (
          <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-950 rounded-lg text-center">
            <p className="text-gray-700 dark:text-gray-300">
              Select sports from the list above to see how much you'd spend per year.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
