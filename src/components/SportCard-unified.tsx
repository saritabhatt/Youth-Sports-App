import { motion } from "framer-motion";
import { ScoredSport } from '../data/scoringEngine';
import { SPORT_CATEGORIES, SportCategory, getOrganizationsForSport } from '../data/sportsData';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Info, Check } from 'lucide-react';

interface SportCardProps {
  scoredSport: ScoredSport;
  rank: number;
  onViewDetails?: (sport: ScoredSport) => void;
  isInCompare?: boolean;
  onToggleCompare?: (sportId: string) => void;
  canAddToCompare?: boolean;
  zipCode?: string;
  index?: number;
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
  zipCode,
  index = 0
}: SportCardProps) {
  const { sport, scores, weightedTotal, heightAdvantageNote, ageMatch, ageMatchNote } = scoredSport;
  const category = SPORT_CATEGORIES[sport.category as SportCategory];
  const ageMatchStyle = ageMatchColors[ageMatch];
  const localOrgs = zipCode ? getOrganizationsForSport(sport.id, zipCode) : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
    >
      <Card className={`rounded-xl border transition-all duration-200 overflow-hidden hover:shadow-lg ${
        isInCompare ? 'border-emerald-400 ring-2 ring-emerald-100' : 'border-slate-200 hover:border-slate-300'
      }`}>
        {/* Header */}
        <div 
          className="p-4 pb-3 cursor-pointer hover:bg-slate-50 transition-colors"
          onClick={() => onViewDetails?.(scoredSport)}
        >
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="text-2xl">{category.icon}</div>
              <div>
                <h3 className="font-semibold text-slate-800 text-lg leading-tight">
                  {sport.name}
                </h3>
                <p className="text-xs text-slate-500">{category.name}</p>
              </div>
            </div>
            <div className="text-right flex-shrink-0">
              <div className={`text-3xl font-bold ${
                weightedTotal >= 70 ? 'text-emerald-600' :
                weightedTotal >= 50 ? 'text-blue-600' :
                'text-slate-600'
              }`}>
                {weightedTotal}
                <span className="text-xs block text-slate-400">match</span>
              </div>
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

        {/* Score breakdown */}
        <div className="px-4 pb-3">
          <div className="space-y-2">
            {[
              { key: 'funFactor', label: 'Fun', emoji: '🎉' },
              { key: 'skillFocus', label: 'Skill', emoji: '🎯' },
              { key: 'competition', label: 'Competition', emoji: '🏆' },
              { key: 'opportunity', label: 'Physical', emoji: '📈' },
              { key: 'accessibility', label: 'Affordability', emoji: '💰' }
            ].map(({ key, label, emoji }) => {
              const score = scores[key as keyof typeof scores];
              return (
                <div key={key} className="group">
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="text-xs text-slate-600 flex items-center gap-1">
                      <span>{emoji}</span>
                      <span className="hidden sm:inline">{label}</span>
                    </span>
                    <span className={`text-xs font-semibold ${scoreToColor(score)}`}>
                      {score}/10
                    </span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${score * 10}%` }}
                      transition={{ delay: index * 0.05 + 0.2, duration: 0.6 }}
                      className={`h-full rounded-full ${scoreToBarColor(score)}`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Age timing & Height */}
        <div className="px-4 pb-3 space-y-2">
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${ageMatchStyle.bg} ${ageMatchStyle.text}`}>
            {ageMatch === 'perfect' || ageMatch === 'good' ? '✓' : '⏳'}
            {ageMatchStyle.label}
          </div>
          <p className="text-xs text-slate-500">{ageMatchNote}</p>
          
          {heightAdvantageNote && heightAdvantageNote !== "Add estimated adult height for personalized opportunity score" && (
            <div className="text-xs text-slate-600 bg-slate-50 rounded p-2">
              📏 {heightAdvantageNote}
            </div>
          )}
        </div>

        {/* Local Organizations */}
        {localOrgs.length > 0 && (
          <div className="px-4 pb-3">
            <div className="text-xs text-emerald-700 font-medium mb-1">📍 Local</div>
            <div className="flex flex-wrap gap-1">
              {localOrgs.slice(0, 2).map((org, i) => (
                <span key={i} className="text-xs bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded">
                  {org.name.length > 20 ? org.name.substring(0, 20) + '...' : org.name}
                </span>
              ))}
              {localOrgs.length > 2 && (
                <span className="text-xs text-emerald-500">+{localOrgs.length - 2}</span>
              )}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="px-4 py-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            ${sport.costRange.entryLevel.min}-${sport.costRange.competitive.max}/yr
          </div>
          <div className="flex items-center gap-2">
            {onViewDetails && (
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onViewDetails(scoredSport);
                }}
              >
                <Info className="w-4 h-4" />
              </Button>
            )}
            {onToggleCompare && (
              <Button
                size="sm"
                variant={isInCompare ? "default" : "outline"}
                disabled={!canAddToCompare && !isInCompare}
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleCompare(sport.id);
                }}
              >
                {isInCompare ? (
                  <>
                    <Check className="w-3 h-3 mr-1" />
                    Compare
                  </>
                ) : (
                  '+ Compare'
                )}
              </Button>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
