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
      className={`relative bg-white/80 dark:bg-gray-800/50 backdrop-blur rounded-2xl border transition-all duration-300 overflow-hidden hover-lift group ${
        isInCompare 
          ? 'border-emerald-400 dark:border-emerald-500 ring-2 ring-emerald-200 dark:ring-emerald-900/50 shadow-lg shadow-emerald-500/20' 
          : 'border-slate-200/50 dark:border-slate-700/50 hover:border-emerald-300 dark:hover:border-emerald-600 hover:shadow-lg hover:shadow-slate-400/10'
      }`}
    >
      {/* Premium gradient accent line */}
      {weightedTotal >= 70 && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400"></div>
      )}

      {/* Header */}
      <div 
        className="p-6 pb-4 cursor-pointer transition-transform duration-300 group-hover:translate-y-0"
        onClick={() => onViewDetails?.(scoredSport)}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="text-4xl group-hover:scale-110 transition-transform duration-300 drop-shadow-sm">{category.icon}</div>
            <div className="flex-1">
              <h3 className="font-bold text-slate-900 dark:text-white text-xl leading-tight mb-1">
                {sport.name}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{category.name}</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-4xl font-bold transition-colors ${
              weightedTotal >= 70 ? 'text-emerald-600 dark:text-emerald-400' :
              weightedTotal >= 50 ? 'text-blue-600 dark:text-blue-400' :
              'text-slate-400 dark:text-slate-500'
            }`} title={`Match score: ${weightedTotal}% - ${weightedTotal >= 70 ? 'Strong match' : weightedTotal >= 50 ? 'Good match' : 'Fair match'}`}>
              {weightedTotal}<span className="text-lg">%</span>
              <span className="sr-only">% - {weightedTotal >= 70 ? 'Strong match' : weightedTotal >= 50 ? 'Good match' : 'Fair match'}</span>
            </div>
            <div className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-1">Match Score</div>
          </div>
        </div>
        
        {/* Rank badge */}
        {rank > 0 && rank <= 3 && (
          <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold mt-3 backdrop-blur ${
            rank === 1 ? 'bg-gradient-to-r from-amber-100 to-yellow-100 dark:from-amber-900/40 dark:to-yellow-900/40 text-amber-700 dark:text-amber-300 shadow-lg shadow-amber-200/50' :
            rank === 2 ? 'bg-gradient-to-r from-slate-200 to-slate-100 dark:from-slate-700 dark:to-slate-600 text-slate-700 dark:text-slate-200 shadow-lg shadow-slate-200/50' :
            'bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/40 dark:to-red-900/40 text-orange-700 dark:text-orange-300 shadow-lg shadow-orange-200/50'
          }`}>
            {rank === 1 ? '🥇' : rank === 2 ? '🥈' : '🥉'} Top {rank}
          </div>
        )}
      </div>

      {/* Score breakdown with animated bars */}
      <div
        className="px-6 pb-4 cursor-pointer border-t border-slate-200/50 dark:border-slate-700/50"
        onClick={() => onViewDetails?.(scoredSport)}
      >
        <div className="space-y-3">
          {[
            { key: 'funFactor', label: 'Fun Factor', emoji: '🎉' },
            { key: 'skillFocus', label: 'Skill Development', emoji: '🎯' },
            { key: 'competition', label: 'Competition', emoji: '🏆' },
            { key: 'opportunity', label: 'Physical Fit', emoji: '📈' },
            { key: 'accessibility', label: 'Affordability', emoji: '💰' }
          ].map(({ key, label, emoji }) => {
            const score = scores[key as keyof typeof scores];
            const textLabel = scoreToLabel(score);
            return (
              <div key={key} className="group/score" title={`${label}: ${score}/10 (${textLabel})`}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm text-slate-700 dark:text-slate-300 flex items-center gap-2 font-medium">
                    <span aria-hidden="true" className="text-lg">{emoji}</span>
                    <span className="hidden sm:inline">{label}</span>
                    <span className="sm:hidden">{label.split(' ')[0]}</span>
                  </span>
                  <span className={`text-sm font-bold ${scoreToColor(score)}`}>
                    {score}<span className="text-xs text-slate-500 dark:text-slate-400">/10</span>
                    <span className="sr-only"> out of 10 - {textLabel}</span>
                  </span>
                </div>
                <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ease-out group-hover/score:shadow-lg ${scoreToBarColor(score)}`}
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
        className="px-6 pb-4 cursor-pointer border-t border-slate-200/50 dark:border-slate-700/50"
        onClick={() => onViewDetails?.(scoredSport)}
      >
        <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold backdrop-blur ${ageMatchStyle.bg} ${ageMatchStyle.text}`}>
          {ageMatch === 'perfect' && '✓'}
          {ageMatch === 'good' && '✓'}
          {ageMatch === 'early' && '⏳'}
          {ageMatch === 'late' && '⌛'}
          {ageMatchStyle.label}
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 font-medium">{ageMatchNote}</p>
      </div>

      {/* Height advantage note */}
      {heightAdvantageNote && heightAdvantageNote !== "Add estimated adult height for personalized opportunity score" && (
        <div 
          className="px-6 pb-4 cursor-pointer border-t border-slate-200/50 dark:border-slate-700/50"
          onClick={() => onViewDetails?.(scoredSport)}
        >
          <div className="text-sm text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/50 rounded-lg p-3 font-medium">
            📏 {heightAdvantageNote}
          </div>
        </div>
      )}

      {/* Local Organizations (Santa Barbara) */}
      {localOrgs.length > 0 && (
        <div className="px-6 pb-4 border-t border-slate-200/50 dark:border-slate-700/50">
          <div className="text-xs text-emerald-700 dark:text-emerald-400 font-bold uppercase tracking-wider mb-2">📍 Local Programs</div>
          <div className="flex flex-wrap gap-2">
            {localOrgs.slice(0, 2).map((org, i) => (
              <span key={i} className="text-xs bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 px-3 py-1.5 rounded-full font-medium">
                {org.name.length > 25 ? org.name.substring(0, 25) + '...' : org.name}
              </span>
            ))}
            {localOrgs.length > 2 && (
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">+{localOrgs.length - 2} more</span>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="px-6 py-4 bg-gradient-to-r from-slate-50 to-slate-100/50 dark:from-slate-800/30 dark:to-slate-800/20 border-t border-slate-200/50 dark:border-slate-700/50">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Cost Range</div>
            <div className="text-sm font-bold text-slate-900 dark:text-white mt-1">
              ${sport.costRange.entryLevel.min}-${sport.costRange.competitive.max}/yr
            </div>
          </div>
          {onToggleCompare && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleCompare(sport.id);
              }}
              disabled={!canAddToCompare && !isInCompare}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition-all duration-300 ${
                isInCompare 
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:shadow-lg hover:shadow-emerald-500/30' 
                  : canAddToCompare
                    ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-300 dark:hover:bg-slate-600'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed opacity-50'
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
