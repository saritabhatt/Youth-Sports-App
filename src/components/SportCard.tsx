import { ScoredSport } from '../data/scoringEngine';
import { SPORT_CATEGORIES, SportCategory, getOrganizationsForSport } from '../data/sportsData';

interface SportCardProps {
  scoredSport: ScoredSport;
  rank: number;
  onViewDetails?: (sport: ScoredSport) => void;
  isInCompare?: boolean;
  onToggleCompare?: (sportId: string) => void;
  canAddToCompare?: boolean;
  zipCode?: string;
}

const scoreToColor = (score: number): string => {
  if (score >= 8) return 'text-emerald-600';
  if (score >= 6) return 'text-blue-600';
  if (score >= 4) return 'text-amber-600';
  return 'text-slate-500';
};

const scoreToBarColor = (score: number): string => {
  if (score >= 8) return 'bg-emerald-500';
  if (score >= 6) return 'bg-blue-500';
  if (score >= 4) return 'bg-amber-500';
  return 'bg-slate-400';
};

const scoreToLabel = (score: number): string => {
  if (score >= 8) return 'Excellent';
  if (score >= 6) return 'Good';
  if (score >= 4) return 'Fair';
  return 'Low';
};

const ageMatchColors: Record<string, { bg: string; text: string; label: string }> = {
  perfect: { bg: 'bg-emerald-100', text: 'text-emerald-700', label: 'Perfect Timing' },
  good: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Good Time' },
  early: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Early Start' },
  late: { bg: 'bg-slate-100', text: 'text-slate-600', label: 'Late Start' }
};

export default function SportCard({ 
  scoredSport, 
  rank, 
  onViewDetails, 
  isInCompare = false,
  onToggleCompare,
  canAddToCompare = true,
  zipCode
}: SportCardProps) {
  const { sport, scores, weightedTotal, heightAdvantageNote, ageMatch, ageMatchNote } = scoredSport;
  const category = SPORT_CATEGORIES[sport.category as SportCategory];
  const ageMatchStyle = ageMatchColors[ageMatch];
  
  // Get local organizations if in Santa Barbara area
  const localOrgs = zipCode ? getOrganizationsForSport(sport.id, zipCode) : [];

  return (
    <div
      className={`bg-white rounded-xl border transition-all duration-200 overflow-hidden hover-lift ${
        isInCompare ? 'border-emerald-400 ring-2 ring-emerald-100' : 'border-slate-200 hover:border-slate-300'
      }`}
    >
      {/* Header */}
      <div 
        className="p-4 pb-3 cursor-pointer"
        onClick={() => onViewDetails?.(scoredSport)}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">{category.icon}</div>
            <div>
              <h3 className="font-semibold text-slate-800 text-lg leading-tight">
                {sport.name}
              </h3>
              <p className="text-xs text-slate-500">{category.name}</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-3xl font-bold ${
              weightedTotal >= 70 ? 'text-emerald-600' :
              weightedTotal >= 50 ? 'text-blue-600' :
              'text-slate-600'
            }`} title={`Match score: ${weightedTotal}% - ${weightedTotal >= 70 ? 'Strong match' : weightedTotal >= 50 ? 'Good match' : 'Fair match'}`}>
              {weightedTotal}
              <span className="sr-only">% - {weightedTotal >= 70 ? 'Strong match' : weightedTotal >= 50 ? 'Good match' : 'Fair match'}</span>
            </div>
            <div className="text-xs text-slate-400">score</div>
          </div>
        </div>
        
        {/* Rank badge */}
        {rank > 0 && rank <= 3 && (
          <div className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium mt-2 ${
            rank === 1 ? 'bg-amber-100 text-amber-700' :
            rank === 2 ? 'bg-slate-200 text-slate-700' :
            'bg-orange-100 text-orange-700'
          }`}>
            {rank === 1 ? '🥇' : rank === 2 ? '🥈' : '🥉'} #{rank} Pick
          </div>
        )}
      </div>

      {/* Score breakdown with animated bars */}
      <div
        className="px-4 pb-3 cursor-pointer"
        onClick={() => onViewDetails?.(scoredSport)}
      >
        <div className="space-y-2">
          {[
            { key: 'funFactor', label: 'Fun Factor', emoji: '🎉' },
            { key: 'skillFocus', label: 'Skill Development', emoji: '🎯' },
            { key: 'competition', label: 'Low Competition', emoji: '🏆' },
            { key: 'opportunity', label: 'Physical Fit', emoji: '📈' },
            { key: 'accessibility', label: 'Affordability', emoji: '💰' }
          ].map(({ key, label, emoji }) => {
            const score = scores[key as keyof typeof scores];
            const textLabel = scoreToLabel(score);
            return (
              <div key={key} className="group" title={`${label}: ${score}/10 (${textLabel})`}>
                <div className="flex items-center justify-between mb-0.5">
                  <span className="text-xs text-slate-600 flex items-center gap-1">
                    <span aria-hidden="true">{emoji}</span>
                    <span className="hidden sm:inline">{label}</span>
                    <span className="sm:hidden">{label.split(' ')[0]}</span>
                  </span>
                  <span className={`text-xs font-semibold ${scoreToColor(score)}`}>
                    {score}
                    <span className="sr-only"> out of 10 - {textLabel}</span>
                  </span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ease-out ${scoreToBarColor(score)}`}
                    style={{ width: `${score * 10}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Age timing badge */}
      <div 
        className="px-4 pb-3 cursor-pointer"
        onClick={() => onViewDetails?.(scoredSport)}
      >
        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${ageMatchStyle.bg} ${ageMatchStyle.text}`}>
          {ageMatch === 'perfect' && '✓'}
          {ageMatch === 'good' && '✓'}
          {ageMatch === 'early' && '⏳'}
          {ageMatch === 'late' && '⌛'}
          {ageMatchStyle.label}
        </div>
        <p className="text-xs text-slate-500 mt-1">{ageMatchNote}</p>
      </div>

      {/* Height advantage note */}
      {heightAdvantageNote && heightAdvantageNote !== "Add estimated adult height for personalized opportunity score" && (
        <div 
          className="px-4 pb-3 cursor-pointer"
          onClick={() => onViewDetails?.(scoredSport)}
        >
          <div className="text-xs text-slate-600 bg-slate-50 rounded p-2">
            📏 {heightAdvantageNote}
          </div>
        </div>
      )}

      {/* Local Organizations (Santa Barbara) */}
      {localOrgs.length > 0 && (
        <div className="px-4 pb-3">
          <div className="text-xs text-emerald-700 font-medium mb-1">📍 Local Programs</div>
          <div className="flex flex-wrap gap-1">
            {localOrgs.slice(0, 2).map((org, i) => (
              <span key={i} className="text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded">
                {org.name.length > 25 ? org.name.substring(0, 25) + '...' : org.name}
              </span>
            ))}
            {localOrgs.length > 2 && (
              <span className="text-xs text-emerald-500">+{localOrgs.length - 2} more</span>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="px-4 py-3 bg-slate-50 border-t border-slate-100">
        <div className="flex items-center justify-between">
          <div className="text-xs text-slate-500">
            ${sport.costRange.entryLevel.min}-${sport.costRange.competitive.max}/yr
          </div>
          {onToggleCompare && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare(sport.id);
              }}
              disabled={!canAddToCompare && !isInCompare}
              className={`text-xs px-2.5 py-1 rounded-lg font-medium transition-colors ${
                isInCompare 
                  ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
                  : canAddToCompare
                    ? 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              }`}
            >
              {isInCompare ? '✓ Comparing' : '+ Compare'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
