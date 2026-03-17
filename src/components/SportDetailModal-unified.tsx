import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { ScoredSport } from '../data/scoringEngine';
import { SPORT_CATEGORIES, REGION_NAMES, RegionType, SportCategory } from '../data/sportsData';
import { Button } from './ui/button';
import { Card } from './ui/card';

interface SportDetailModalProps {
  scoredSport: ScoredSport;
  region: RegionType;
  onClose: () => void;
}

export default function SportDetailModal({ scoredSport, region, onClose }: SportDetailModalProps) {
  const { sport, scores, weightedTotal, heightAdvantageNote, competitionNote, ageMatchNote } = scoredSport;
  const category = SPORT_CATEGORIES[sport.category as SportCategory];
  const modalRef = useRef<HTMLDivElement>(null);

  const regionalComp = sport.regionalCompetition.find(rc => rc.region === region);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    const previousActiveElement = document.activeElement as HTMLElement;
    modalRef.current?.focus();
    return () => {
      previousActiveElement?.focus();
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sport-modal-title"
      >
        <motion.div
          ref={modalRef}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          tabIndex={-1}
          className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl outline-none"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-start justify-between">
            <div className="flex items-center gap-4 flex-1">
              <div className="text-4xl" aria-hidden="true">{category.icon}</div>
              <div>
                <h2 id="sport-modal-title" className="text-2xl font-bold text-slate-800">{sport.name}</h2>
                <p className="text-slate-500">{category.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className={`text-4xl font-bold ${
                  weightedTotal >= 70 ? 'text-emerald-600' :
                  weightedTotal >= 50 ? 'text-blue-600' :
                  'text-slate-600'
                }`}>
                  {weightedTotal}
                </div>
                <div className="text-sm text-slate-400">Match</div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)] space-y-6">
            {/* Score Breakdown */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Score Breakdown</h3>
              <div className="grid grid-cols-5 gap-3">
                {[
                  { key: 'funFactor', label: 'Fun', emoji: '🎉', desc: 'Enjoyment' },
                  { key: 'skillFocus', label: 'Skill', emoji: '🎯', desc: 'Development' },
                  { key: 'competition', label: 'Competition', emoji: '🏆', desc: 'Intensity' },
                  { key: 'opportunity', label: 'Opportunity', emoji: '📈', desc: 'Advantage' },
                  { key: 'accessibility', label: 'Accessibility', emoji: '💰', desc: 'Cost' }
                ].map(({ key, label, emoji, desc }) => {
                  const score = scores[key as keyof typeof scores];
                  return (
                    <Card key={key} className="p-3 text-center">
                      <div className="text-2xl mb-1">{emoji}</div>
                      <div className={`text-2xl font-bold ${
                        score >= 8 ? 'text-emerald-600' :
                        score >= 6 ? 'text-blue-600' :
                        score >= 4 ? 'text-amber-600' :
                        'text-slate-500'
                      }`}>
                        {score}
                      </div>
                      <div className="text-xs font-medium text-slate-700 mt-1">{label}</div>
                      <div className="text-[10px] text-slate-400">{desc}</div>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Age Timing */}
            <Card className="p-4 bg-slate-50">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xl">⏰</span>
                <div>
                  <h4 className="font-semibold text-slate-800">Timing</h4>
                  <p className="text-sm text-slate-600">{ageMatchNote}</p>
                </div>
              </div>
              <div className="text-xs text-slate-500">
                Ideal start age: {sport.idealStartAge.min}-{sport.idealStartAge.max} years
              </div>
            </Card>

            {/* Height Advantage */}
            {heightAdvantageNote && (
              <Card className="p-4 bg-blue-50 border border-blue-100">
                <div className="flex items-center gap-3">
                  <span className="text-xl">📏</span>
                  <div>
                    <h4 className="font-semibold text-slate-800">Height Factor</h4>
                    <p className="text-sm text-slate-600">{heightAdvantageNote}</p>
                  </div>
                </div>
              </Card>
            )}

            {/* Regional Competition */}
            {regionalComp && (
              <Card className="p-4 bg-amber-50 border border-amber-100">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-xl">🗺️</span>
                  <div>
                    <h4 className="font-semibold text-slate-800">
                      {REGION_NAMES[region]} Competition
                    </h4>
                    {competitionNote && (
                      <p className="text-sm text-slate-600">{competitionNote}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-xs text-slate-500 mb-1">Competition Level</div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <div
                          key={i}
                          className={`w-4 h-4 rounded ${
                            i < regionalComp.competitionLevel ? 'bg-amber-500' : 'bg-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="bg-white rounded-lg p-3">
                    <div className="text-xs text-slate-500 mb-1">Program Availability</div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <div
                          key={i}
                          className={`w-4 h-4 rounded ${
                            i < regionalComp.programAvailability ? 'bg-emerald-500' : 'bg-slate-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            )}

            {/* Cost */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Cost to Play</h3>
              <div className="grid grid-cols-2 gap-4">
                <Card className="p-4">
                  <div className="text-xs text-slate-500 mb-1">Entry Level</div>
                  <div className="text-xl font-bold text-slate-800">
                    ${sport.costRange.entryLevel.min.toLocaleString()} - ${sport.costRange.entryLevel.max.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-400">per year</div>
                </Card>
                <Card className="p-4">
                  <div className="text-xs text-slate-500 mb-1">Competitive</div>
                  <div className="text-xl font-bold text-slate-800">
                    ${sport.costRange.competitive.min.toLocaleString()} - ${sport.costRange.competitive.max.toLocaleString()}
                  </div>
                  <div className="text-xs text-slate-400">per year</div>
                </Card>
              </div>
            </div>

            {/* Physical Demands */}
            <div>
              <h3 className="text-lg font-semibold text-slate-800 mb-3">Physical Demands</h3>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { key: 'cardio', label: 'Cardio', emoji: '❤️' },
                  { key: 'strength', label: 'Strength', emoji: '💪' },
                  { key: 'coordination', label: 'Coordination', emoji: '🎯' },
                  { key: 'flexibility', label: 'Flexibility', emoji: '🧘' }
                ].map(({ key, label, emoji }) => {
                  const level = sport.physicalDemands[key as keyof typeof sport.physicalDemands];
                  return (
                    <Card key={key} className="p-3 text-center">
                      <div className="text-lg mb-1">{emoji}</div>
                      <div className="flex justify-center gap-0.5 mb-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < level ? 'bg-slate-600' : 'bg-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                      <div className="text-xs text-slate-600">{label}</div>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* College & Lifespan */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 bg-purple-50 border border-purple-100">
                <div className="text-xs text-purple-600 mb-1">College Opportunity</div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className={i < sport.collegeOpportunity ? 'text-purple-500' : 'text-purple-200'}>
                      ★
                    </span>
                  ))}
                </div>
                <div className="text-xs text-purple-600 mt-1">
                  {sport.collegeOpportunity >= 4 ? 'Strong potential' : 'Moderate potential'}
                </div>
              </Card>
              <Card className="p-4 bg-teal-50 border border-teal-100">
                <div className="text-xs text-teal-600 mb-1">Lifespan Value</div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i} className={i < sport.lifespanValue ? 'text-teal-500' : 'text-teal-200'}>
                      ★
                    </span>
                  ))}
                </div>
                <div className="text-xs text-teal-600 mt-1">
                  {sport.lifespanValue >= 4 ? 'Lifelong value' : 'Youth-focused'}
                </div>
              </Card>
            </div>

            {/* Notes */}
            {sport.notes && (
              <Card className="p-4 bg-slate-100">
                <p className="text-sm text-slate-600 italic">{sport.notes}</p>
              </Card>
            )}
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t border-slate-200 p-4">
            <Button
              onClick={onClose}
              className="w-full"
            >
              Close
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
