import { ScoringWeights, DEFAULT_WEIGHTS } from '../data/scoringEngine';

interface ScoringWeightsSlidersProps {
  weights: ScoringWeights;
  onChange: (weights: ScoringWeights) => void;
}

const WEIGHT_CONFIG = [
  {
    key: 'funFactor' as keyof ScoringWeights,
    label: 'Fun Factor',
    description: 'How much enjoyment and passion matter',
    emoji: '🎉',
    color: 'emerald'
  },
  {
    key: 'skillFocus' as keyof ScoringWeights,
    label: 'Skill Focus',
    description: 'Importance of technical development',
    emoji: '🎯',
    color: 'blue'
  },
  {
    key: 'competition' as keyof ScoringWeights,
    label: 'Competition',
    description: 'Lower local competition = more opportunity',
    emoji: '🏆',
    color: 'amber'
  },
  {
    key: 'opportunity' as keyof ScoringWeights,
    label: 'Opportunity',
    description: 'Physical advantage based on predicted height',
    emoji: '📈',
    color: 'purple'
  },
  {
    key: 'accessibility' as keyof ScoringWeights,
    label: 'Accessibility',
    description: 'Cost to play and program availability',
    emoji: '💰',
    color: 'rose'
  }
];

const colorClasses: Record<string, { track: string; thumb: string; bg: string }> = {
  emerald: { track: 'accent-emerald-500', thumb: 'bg-emerald-500', bg: 'bg-emerald-50' },
  blue: { track: 'accent-blue-500', thumb: 'bg-blue-500', bg: 'bg-blue-50' },
  amber: { track: 'accent-amber-500', thumb: 'bg-amber-500', bg: 'bg-amber-50' },
  purple: { track: 'accent-purple-500', thumb: 'bg-purple-500', bg: 'bg-purple-50' },
  rose: { track: 'accent-rose-500', thumb: 'bg-rose-500', bg: 'bg-rose-50' }
};

export default function ScoringWeightsSliders({ weights, onChange }: ScoringWeightsSlidersProps) {
  const handleChange = (key: keyof ScoringWeights, value: number) => {
    onChange({ ...weights, [key]: value });
  };

  const resetToDefault = () => {
    onChange(DEFAULT_WEIGHTS);
  };

  const totalWeight = Object.values(weights).reduce((sum, w) => sum + w, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-slate-800">Prioritize What Matters</h3>
          <p className="text-sm text-slate-500">Adjust sliders to weight scoring factors</p>
        </div>
        <button
          onClick={resetToDefault}
          className="text-sm text-slate-500 hover:text-slate-700 underline"
        >
          Reset to default
        </button>
      </div>

      <div className="space-y-4">
        {WEIGHT_CONFIG.map(({ key, label, description, emoji, color }) => {
          const colors = colorClasses[color];
          const value = weights[key];
          const percentage = totalWeight > 0 ? Math.round((value / totalWeight) * 100) : 0;
          
          return (
            <div key={key} className={`p-3 rounded-lg ${colors.bg} border border-slate-200`}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{emoji}</span>
                  <div>
                    <span className="font-medium text-slate-800">{label}</span>
                    <p className="text-xs text-slate-500">{description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-sm font-semibold text-slate-700">{percentage}%</span>
                  <span className="text-xs text-slate-400 block">weight</span>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <span className="text-xs text-slate-400 w-8">Low</span>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={value}
                  onChange={(e) => handleChange(key, parseInt(e.target.value))}
                  className={`flex-1 h-2 rounded-lg appearance-none cursor-pointer ${colors.track}`}
                  style={{
                    background: `linear-gradient(to right, var(--tw-gradient-from) ${value}%, #e2e8f0 ${value}%)`
                  }}
                />
                <span className="text-xs text-slate-400 w-8 text-right">High</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Visual breakdown */}
      <div className="mt-4 p-3 bg-slate-100 rounded-lg">
        <p className="text-xs text-slate-500 mb-2">Weight Distribution</p>
        <div className="flex h-3 rounded-full overflow-hidden">
          {WEIGHT_CONFIG.map(({ key, color }) => {
            const value = weights[key];
            const percentage = totalWeight > 0 ? (value / totalWeight) * 100 : 0;
            const colors = colorClasses[color];
            return (
              <div
                key={key}
                className={`${colors.thumb} transition-all duration-300`}
                style={{ width: `${percentage}%` }}
                title={`${key}: ${Math.round(percentage)}%`}
              />
            );
          })}
        </div>
        <div className="flex justify-between mt-1 text-xs text-slate-400">
          {WEIGHT_CONFIG.map(({ key, emoji }) => {
            const value = weights[key];
            const percentage = totalWeight > 0 ? Math.round((value / totalWeight) * 100) : 0;
            return percentage > 5 ? (
              <span key={key}>{emoji}</span>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
}
