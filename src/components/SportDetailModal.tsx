import { useEffect, useRef, useMemo } from 'react';
import { ScoredSport } from '../data/scoringEngine';
import { SPORT_CATEGORIES, REGION_NAMES, RegionType, SportCategory } from '../data/sportsData';
import { getProgramsBySportName } from '../data/localProgramsData';
import { MapPin, Globe, Phone } from 'lucide-react';

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
  
  // Get local programs for this sport
  const localPrograms = useMemo(
    () => getProgramsBySportName(sport.name, region as 'santa-barbara' | 'los-angeles' | 'ventura' | 'san-luis-obispo' | 'kern-county' | 'inyo-county'),
    [sport.name, region]
  );

  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Focus trap and initial focus
  useEffect(() => {
    const previousActiveElement = document.activeElement as HTMLElement;
    modalRef.current?.focus();
    return () => {
      previousActiveElement?.focus();
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="sport-modal-title"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="text-4xl" aria-hidden="true">{category.icon}</div>
            <div>
              <h2 id="sport-modal-title" className="text-2xl font-bold text-slate-800">{sport.name}</h2>
              <p className="text-slate-500">{category.name}</p>
            </div>
          </div>
          <div className="text-right">
            <div className={`text-4xl font-bold ${
              weightedTotal >= 70 ? 'text-emerald-600' :
              weightedTotal >= 50 ? 'text-blue-600' :
              'text-slate-600'
            }`}>
              {weightedTotal}
            </div>
            <div className="text-sm text-slate-400">Match Score</div>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Score Breakdown */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3">Score Breakdown</h3>
            <div className="grid grid-cols-5 gap-3">
              {[
                { key: 'funFactor', label: 'Fun Factor', emoji: '🎉', desc: 'Enjoyment potential' },
                { key: 'skillFocus', label: 'Skill Focus', emoji: '🎯', desc: 'Technical development' },
                { key: 'competition', label: 'Competition', emoji: '🏆', desc: 'Local intensity (inverse)' },
                { key: 'opportunity', label: 'Opportunity', emoji: '📈', desc: 'Height advantage' },
                { key: 'accessibility', label: 'Accessibility', emoji: '💰', desc: 'Cost & availability' }
              ].map(({ key, label, emoji, desc }) => {
                const score = scores[key as keyof typeof scores];
                return (
                  <div key={key} className="text-center p-3 bg-slate-50 rounded-xl">
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
                  </div>
                );
              })}
            </div>
          </div>

          {/* Age Timing */}
          <div className="p-4 bg-slate-50 rounded-xl">
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
          </div>

          {/* Height Advantage */}
          {heightAdvantageNote && (
            <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex items-center gap-3">
                <span className="text-xl">📏</span>
                <div>
                  <h4 className="font-semibold text-slate-800">Height Factor</h4>
                  <p className="text-sm text-slate-600">{heightAdvantageNote}</p>
                </div>
              </div>
            </div>
          )}

          {/* Regional Competition */}
          {regionalComp && (
            <div className="p-4 bg-amber-50 rounded-xl border border-amber-100">
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
                    <span className="text-sm font-medium text-slate-700 ml-2">
                      {regionalComp.competitionLevel === 5 ? 'Very High' :
                       regionalComp.competitionLevel === 4 ? 'High' :
                       regionalComp.competitionLevel === 3 ? 'Moderate' :
                       regionalComp.competitionLevel === 2 ? 'Low' : 'Very Low'}
                    </span>
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
                    <span className="text-sm font-medium text-slate-700 ml-2">
                      {regionalComp.programAvailability === 5 ? 'Abundant' :
                       regionalComp.programAvailability === 4 ? 'Good' :
                       regionalComp.programAvailability === 3 ? 'Moderate' :
                       regionalComp.programAvailability === 2 ? 'Limited' : 'Rare'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Cost Breakdown */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3">Cost to Play</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl">
                <div className="text-xs text-slate-500 mb-1">Recreational / Entry Level</div>
                <div className="text-xl font-bold text-slate-800">
                  ${sport.costRange.entryLevel.min.toLocaleString()} - ${sport.costRange.entryLevel.max.toLocaleString()}
                </div>
                <div className="text-xs text-slate-400">per year</div>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl">
                <div className="text-xs text-slate-500 mb-1">Competitive / Travel</div>
                <div className="text-xl font-bold text-slate-800">
                  ${sport.costRange.competitive.min.toLocaleString()} - ${sport.costRange.competitive.max.toLocaleString()}
                </div>
                <div className="text-xs text-slate-400">per year</div>
              </div>
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
                  <div key={key} className="text-center p-3 bg-slate-50 rounded-lg">
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
                  </div>
                );
              })}
            </div>
          </div>

          {/* College & Lifespan */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-purple-50 rounded-xl border border-purple-100">
              <div className="text-xs text-purple-600 mb-1">College Opportunity</div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={i < sport.collegeOpportunity ? 'text-purple-500' : 'text-purple-200'}>
                    ★
                  </span>
                ))}
              </div>
              <div className="text-xs text-purple-600 mt-1">
                {sport.collegeOpportunity >= 4 ? 'Strong scholarship potential' :
                 sport.collegeOpportunity >= 3 ? 'Good opportunities available' :
                 sport.collegeOpportunity >= 2 ? 'Limited varsity programs' : 'Primarily club level'}
              </div>
            </div>
            <div className="p-4 bg-teal-50 rounded-xl border border-teal-100">
              <div className="text-xs text-teal-600 mb-1">Lifespan Value</div>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} className={i < sport.lifespanValue ? 'text-teal-500' : 'text-teal-200'}>
                    ★
                  </span>
                ))}
              </div>
              <div className="text-xs text-teal-600 mt-1">
                {sport.lifespanValue >= 4 ? 'Play for a lifetime' :
                 sport.lifespanValue >= 3 ? 'Recreational into adulthood' :
                 sport.lifespanValue >= 2 ? 'Peak in youth/young adult' : 'Youth-focused'}
              </div>
            </div>
          </div>

          {/* Local Organizations */}
          <div>
            <h3 className="text-lg font-semibold text-slate-800 mb-3 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-600" />
              Local Programs & Organizations
            </h3>
            {localPrograms.length > 0 ? (
              <div className="space-y-3">
                {localPrograms.slice(0, 5).map((program) => (
                  <div key={program.id} className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl border border-emerald-100">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-slate-900">{program.name}</h4>
                        <p className="text-sm text-slate-600">{program.organization}</p>
                      </div>
                      <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                        {program.programType}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 mb-3">{program.description}</p>
                    <div className="space-y-2 text-sm">
                      {program.location && (
                        <div className="flex items-center gap-2 text-slate-600">
                          <MapPin className="w-4 h-4 text-emerald-600" />
                          {program.location}
                        </div>
                      )}
                      {program.contact?.phone && (
                        <div className="flex items-center gap-2 text-slate-600">
                          <Phone className="w-4 h-4 text-emerald-600" />
                          {program.contact.phone}
                        </div>
                      )}
                      {program.contact?.website && (
                        <a 
                          href={program.contact.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-medium"
                        >
                          <Globe className="w-4 h-4" />
                          Visit Website
                        </a>
                      )}
                    </div>
                  </div>
                ))}
                {localPrograms.length > 5 && (
                  <div className="p-3 bg-blue-50 rounded-xl text-center">
                    <p className="text-sm text-blue-700 font-medium">
                      {localPrograms.length - 5} more programs available
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-100 text-center">
                <p className="text-slate-600 mb-4">No local programs found in our database.</p>
                <a
                  href={`https://www.google.com/search?q=${encodeURIComponent(sport.name + ' programs near Santa Barbara CA')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all"
                >
                  <Globe className="w-4 h-4" />
                  Search Google
                </a>
              </div>
            )}
          </div>

          {/* Notes */}
          {sport.notes && (
            <div className="p-4 bg-slate-100 rounded-xl">
              <p className="text-sm text-slate-600 italic">{sport.notes}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-slate-200 p-4">
          <button
            onClick={onClose}
            className="w-full py-3 bg-slate-800 text-white rounded-xl font-medium hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
