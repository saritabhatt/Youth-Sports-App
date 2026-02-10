import { ScoredSport } from '../data/scoringEngine';
import { SPORT_CATEGORIES, SportCategory, getOrganizationsForSport, LocalOrganization } from '../data/sportsData';

interface CompareModeProps {
  scoredSports: ScoredSport[];
  compareIds: string[];
  onRemove: (sportId: string) => void;
  onClear: () => void;
  onClose: () => void;
  zipCode?: string;
}

const ScoreBar = ({ value, max = 10, color }: { value: number; max?: number; color: string }) => (
  <div className="flex items-center gap-2">
    <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
      <div 
        className={`h-full ${color} transition-all duration-300`}
        style={{ width: `${(value / max) * 100}%` }}
      />
    </div>
    <span className="text-sm font-semibold w-6 text-right">{value}</span>
  </div>
);

const StarRating = ({ value, max = 5 }: { value: number; max?: number }) => (
  <div className="flex">
    {Array.from({ length: max }, (_, i) => (
      <span key={i} className={i < value ? 'text-amber-400' : 'text-slate-200'}>★</span>
    ))}
  </div>
);

export default function CompareMode({ 
  scoredSports, 
  compareIds, 
  onRemove, 
  onClear, 
  onClose,
  zipCode 
}: CompareModeProps) {
  const sportsToCompare = compareIds
    .map(id => scoredSports.find(s => s.sport.id === id))
    .filter((s): s is ScoredSport => s !== undefined);

  if (sportsToCompare.length === 0) {
    return null;
  }

  // Get local organizations for each sport
  const getLocalOrgs = (sportId: string): LocalOrganization[] => {
    if (!zipCode) return [];
    return getOrganizationsForSport(sportId, zipCode);
  };

  const comparisonRows = [
    { key: 'weightedTotal', label: 'Overall Score', getValue: (s: ScoredSport) => s.weightedTotal, max: 100, color: 'bg-emerald-500' },
    { key: 'funFactor', label: 'Fun Factor', getValue: (s: ScoredSport) => s.scores.funFactor, max: 10, color: 'bg-pink-500' },
    { key: 'skillFocus', label: 'Skill Focus', getValue: (s: ScoredSport) => s.scores.skillFocus, max: 10, color: 'bg-blue-500' },
    { key: 'competition', label: 'Competition (lower local)', getValue: (s: ScoredSport) => s.scores.competition, max: 10, color: 'bg-amber-500' },
    { key: 'opportunity', label: 'Opportunity', getValue: (s: ScoredSport) => s.scores.opportunity, max: 10, color: 'bg-purple-500' },
    { key: 'accessibility', label: 'Accessibility', getValue: (s: ScoredSport) => s.scores.accessibility, max: 10, color: 'bg-teal-500' },
  ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
      <div className="min-h-screen p-4 flex items-start justify-center">
        <div className="bg-white rounded-2xl max-w-6xl w-full shadow-2xl my-8">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-slate-200 p-4 rounded-t-2xl z-10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-800">Compare Sports</h2>
                <p className="text-sm text-slate-500">Side-by-side comparison of {sportsToCompare.length} sports</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={onClear}
                  className="px-3 py-1.5 text-sm text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Clear All
                </button>
                <button
                  onClick={onClose}
                  className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Sport Headers */}
            <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${sportsToCompare.length}, 1fr)` }}>
              <div></div>
              {sportsToCompare.map(scored => {
                const category = SPORT_CATEGORIES[scored.sport.category as SportCategory];
                return (
                  <div key={scored.sport.id} className="text-center relative">
                    <button
                      onClick={() => onRemove(scored.sport.id)}
                      className="absolute -top-1 -right-1 w-6 h-6 bg-slate-200 hover:bg-red-500 hover:text-white rounded-full text-slate-500 text-xs transition-colors"
                    >
                      ×
                    </button>
                    <div className="text-3xl mb-2">{category.icon}</div>
                    <h3 className="font-bold text-slate-800">{scored.sport.name}</h3>
                    <p className="text-xs text-slate-500">{category.name}</p>
                    <div className={`mt-2 text-2xl font-bold ${
                      scored.weightedTotal >= 70 ? 'text-emerald-600' :
                      scored.weightedTotal >= 50 ? 'text-blue-600' :
                      'text-slate-600'
                    }`}>
                      {scored.weightedTotal}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Score Comparisons */}
            <div className="mt-8 space-y-4">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Scores</h3>
              {comparisonRows.map(row => (
                <div 
                  key={row.key} 
                  className="grid gap-4 items-center py-2"
                  style={{ gridTemplateColumns: `200px repeat(${sportsToCompare.length}, 1fr)` }}
                >
                  <div className="text-sm text-slate-600">{row.label}</div>
                  {sportsToCompare.map(scored => (
                    <div key={scored.sport.id}>
                      <ScoreBar value={row.getValue(scored)} max={row.max} color={row.color} />
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Timing & Age */}
            <div className="mt-8 space-y-4">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Timing</h3>
              <div 
                className="grid gap-4 items-center py-2"
                style={{ gridTemplateColumns: `200px repeat(${sportsToCompare.length}, 1fr)` }}
              >
                <div className="text-sm text-slate-600">Age Match</div>
                {sportsToCompare.map(scored => (
                  <div key={scored.sport.id} className="text-sm">
                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
                      scored.ageMatch === 'perfect' ? 'bg-emerald-100 text-emerald-700' :
                      scored.ageMatch === 'good' ? 'bg-blue-100 text-blue-700' :
                      scored.ageMatch === 'early' ? 'bg-amber-100 text-amber-700' :
                      'bg-slate-100 text-slate-600'
                    }`}>
                      {scored.ageMatch === 'perfect' ? 'Perfect Timing' :
                       scored.ageMatch === 'good' ? 'Good Time' :
                       scored.ageMatch === 'early' ? 'Early Start' : 'Late Start'}
                    </span>
                  </div>
                ))}
              </div>
              <div 
                className="grid gap-4 items-center py-2"
                style={{ gridTemplateColumns: `200px repeat(${sportsToCompare.length}, 1fr)` }}
              >
                <div className="text-sm text-slate-600">Ideal Start Age</div>
                {sportsToCompare.map(scored => (
                  <div key={scored.sport.id} className="text-sm font-medium">
                    {scored.sport.idealStartAge.min}-{scored.sport.idealStartAge.max} years
                  </div>
                ))}
              </div>
            </div>

            {/* Cost */}
            <div className="mt-8 space-y-4">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Cost</h3>
              <div 
                className="grid gap-4 items-center py-2"
                style={{ gridTemplateColumns: `200px repeat(${sportsToCompare.length}, 1fr)` }}
              >
                <div className="text-sm text-slate-600">Entry Level</div>
                {sportsToCompare.map(scored => (
                  <div key={scored.sport.id} className="text-sm">
                    ${scored.sport.costRange.entryLevel.min.toLocaleString()}-${scored.sport.costRange.entryLevel.max.toLocaleString()}/yr
                  </div>
                ))}
              </div>
              <div 
                className="grid gap-4 items-center py-2"
                style={{ gridTemplateColumns: `200px repeat(${sportsToCompare.length}, 1fr)` }}
              >
                <div className="text-sm text-slate-600">Competitive</div>
                {sportsToCompare.map(scored => (
                  <div key={scored.sport.id} className="text-sm font-medium text-amber-700">
                    ${scored.sport.costRange.competitive.min.toLocaleString()}-${scored.sport.costRange.competitive.max.toLocaleString()}/yr
                  </div>
                ))}
              </div>
            </div>

            {/* Long-term Value */}
            <div className="mt-8 space-y-4">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Long-term Value</h3>
              <div 
                className="grid gap-4 items-center py-2"
                style={{ gridTemplateColumns: `200px repeat(${sportsToCompare.length}, 1fr)` }}
              >
                <div className="text-sm text-slate-600">College Opportunity</div>
                {sportsToCompare.map(scored => (
                  <div key={scored.sport.id}>
                    <StarRating value={scored.sport.collegeOpportunity} />
                  </div>
                ))}
              </div>
              <div 
                className="grid gap-4 items-center py-2"
                style={{ gridTemplateColumns: `200px repeat(${sportsToCompare.length}, 1fr)` }}
              >
                <div className="text-sm text-slate-600">Lifespan Value</div>
                {sportsToCompare.map(scored => (
                  <div key={scored.sport.id}>
                    <StarRating value={scored.sport.lifespanValue} />
                  </div>
                ))}
              </div>
            </div>

            {/* Physical Demands */}
            <div className="mt-8 space-y-4">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Physical Demands</h3>
              {['cardio', 'strength', 'coordination', 'flexibility'].map(demand => (
                <div 
                  key={demand}
                  className="grid gap-4 items-center py-2"
                  style={{ gridTemplateColumns: `200px repeat(${sportsToCompare.length}, 1fr)` }}
                >
                  <div className="text-sm text-slate-600 capitalize">{demand}</div>
                  {sportsToCompare.map(scored => (
                    <div key={scored.sport.id}>
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <div
                            key={i}
                            className={`w-4 h-4 rounded ${
                              i < scored.sport.physicalDemands[demand as keyof typeof scored.sport.physicalDemands]
                                ? 'bg-slate-600'
                                : 'bg-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Local Organizations (if available) */}
            {zipCode && zipCode.startsWith('931') && (
              <div className="mt-8 space-y-4">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                  Local Programs (Santa Barbara)
                </h3>
                <div 
                  className="grid gap-4"
                  style={{ gridTemplateColumns: `200px repeat(${sportsToCompare.length}, 1fr)` }}
                >
                  <div></div>
                  {sportsToCompare.map(scored => {
                    const orgs = getLocalOrgs(scored.sport.id);
                    return (
                      <div key={scored.sport.id} className="space-y-2">
                        {orgs.length > 0 ? (
                          orgs.slice(0, 3).map((org, i) => (
                            <div key={i} className="text-xs p-2 bg-slate-50 rounded-lg">
                              <div className="font-medium text-slate-800">{org.name}</div>
                              <div className="text-slate-500">
                                {org.type === 'club' && '🏆 Club'}
                                {org.type === 'rec' && '⚽ Recreation'}
                                {org.type === 'nonprofit' && '💚 Nonprofit'}
                                {org.type === 'private' && '👤 Private'}
                                {org.type === 'school' && '🎓 School'}
                                {org.costRange && ` • $${org.costRange.min}-$${org.costRange.max}/yr`}
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-xs text-slate-400 italic">No local programs found</div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Height Notes */}
            <div className="mt-8 space-y-4">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Height Factor</h3>
              <div 
                className="grid gap-4"
                style={{ gridTemplateColumns: `200px repeat(${sportsToCompare.length}, 1fr)` }}
              >
                <div></div>
                {sportsToCompare.map(scored => (
                  <div key={scored.sport.id} className="text-xs text-slate-600 bg-slate-50 p-2 rounded-lg">
                    {scored.heightAdvantageNote || 'No specific height advantage'}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
