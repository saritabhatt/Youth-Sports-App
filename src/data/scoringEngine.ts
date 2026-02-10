// Scoring Engine - Calculates personalized sport scores based on child profile
import { 
  Sport, 
  SPORTS_DATA, 
  RegionType, 
  Gender,
  getRegionFromZip,
  getRegionalCompetition,
  getHeightAdvantageForChild,
  heightAdvantageToScore
} from './sportsData';

// ============================================================================
// TYPES
// ============================================================================

export interface ChildProfile {
  id: string;
  name: string;
  age: number;                    // Age in years
  gender: Gender;
  zipCode: string;
  state: string;
  ethnicity?: string;             // Optional, not used in scoring
  currentHeightInches: number;
  estimatedAdultHeightInches: number | null;
  parentHeights?: {
    fatherInches: number;
    motherInches: number;
  };
}

export interface ScoringWeights {
  funFactor: number;      // 0-100, how much fun matters
  skillFocus: number;     // 0-100, how much skill development matters
  competition: number;    // 0-100, how much LOW competition matters (opportunity)
  opportunity: number;    // 0-100, how much demographic/height advantage matters
  accessibility: number;  // 0-100, how much cost/availability matters
}

export const DEFAULT_WEIGHTS: ScoringWeights = {
  funFactor: 50,
  skillFocus: 50,
  competition: 50,
  opportunity: 50,
  accessibility: 50
};

export interface ScoredSport {
  sport: Sport;
  scores: {
    funFactor: number;          // 1-10
    skillFocus: number;         // 1-10
    competition: number;        // 1-10 (inverse - higher = less competitive = better)
    opportunity: number;        // 1-10 (height/demographic advantage)
    accessibility: number;      // 1-10
  };
  weightedTotal: number;        // Final weighted score 0-100
  heightAdvantageNote: string | null;
  competitionNote: string | null;
  ageMatch: 'perfect' | 'good' | 'late' | 'early';
  ageMatchNote: string;
}

// ============================================================================
// SCORING FUNCTIONS
// ============================================================================

/**
 * Calculate the competition score for a sport in a region
 * Higher score = LESS competition = better opportunity to stand out
 */
function calculateCompetitionScore(sport: Sport, region: RegionType): { score: number; note: string | null } {
  const regionalComp = getRegionalCompetition(sport, region);
  
  if (!regionalComp) {
    return { score: 5, note: null };
  }
  
  // Invert competition level (1-5 becomes 10-2)
  // competitionLevel 1 (low) -> score 10
  // competitionLevel 5 (very high) -> score 2
  const score = 12 - (regionalComp.competitionLevel * 2);
  
  return {
    score: Math.max(1, Math.min(10, score)),
    note: regionalComp.notes || null
  };
}

/**
 * Calculate the opportunity score based on height advantage
 * This is the key factor for matching physical attributes to sports
 */
function calculateOpportunityScore(
  sport: Sport, 
  gender: Gender, 
  estimatedHeightInches: number | null
): { score: number; note: string | null } {
  if (estimatedHeightInches === null) {
    return { score: 5, note: "Add estimated adult height for personalized opportunity score" };
  }
  
  const heightAdv = getHeightAdvantageForChild(sport, gender, estimatedHeightInches);
  
  if (!heightAdv) {
    return { score: 5, note: null };
  }
  
  return {
    score: heightAdvantageToScore(heightAdv),
    note: heightAdv.notes
  };
}

/**
 * Determine age match category
 */
function calculateAgeMatch(sport: Sport, childAge: number): { match: 'perfect' | 'good' | 'late' | 'early'; note: string } {
  const { min, max } = sport.idealStartAge;
  
  if (childAge >= min && childAge <= max) {
    return { match: 'perfect', note: `Ideal age to start (${min}-${max} years)` };
  }
  
  if (childAge < min) {
    const yearsEarly = min - childAge;
    if (yearsEarly <= 2) {
      return { match: 'early', note: `${yearsEarly} year${yearsEarly > 1 ? 's' : ''} early - can start with foundational skills` };
    }
    return { match: 'early', note: `${yearsEarly} years early - consider waiting or recreational only` };
  }
  
  // childAge > max
  const yearsLate = childAge - max;
  if (yearsLate <= 2) {
    return { match: 'good', note: `Can still start - ${yearsLate} year${yearsLate > 1 ? 's' : ''} past ideal but viable` };
  }
  if (yearsLate <= 4) {
    return { match: 'late', note: `Starting late but recreational participation still valuable` };
  }
  return { match: 'late', note: `Late start - focus on recreational enjoyment` };
}

/**
 * Calculate all scores for a single sport
 */
export function scoreSport(sport: Sport, profile: ChildProfile): ScoredSport {
  const region = getRegionFromZip(profile.zipCode);
  
  // Fun Factor - direct from base scores
  const funFactor = sport.baseScores.funFactor;
  
  // Skill Focus - direct from base scores
  const skillFocus = sport.baseScores.skillFocus;
  
  // Competition (opportunity from low competition)
  const competitionResult = calculateCompetitionScore(sport, region);
  
  // Opportunity (height/demographic advantage)
  const opportunityResult = calculateOpportunityScore(
    sport, 
    profile.gender, 
    profile.estimatedAdultHeightInches
  );
  
  // Accessibility - direct from base scores
  const accessibility = sport.baseScores.accessibility;
  
  // Age match
  const ageMatchResult = calculateAgeMatch(sport, profile.age);
  
  return {
    sport,
    scores: {
      funFactor,
      skillFocus,
      competition: competitionResult.score,
      opportunity: opportunityResult.score,
      accessibility
    },
    weightedTotal: 0, // Will be calculated with weights
    heightAdvantageNote: opportunityResult.note,
    competitionNote: competitionResult.note,
    ageMatch: ageMatchResult.match,
    ageMatchNote: ageMatchResult.note
  };
}

/**
 * Calculate weighted total from scores and weights
 * Sports where the child has a strong physical advantage get a bonus
 */
export function calculateWeightedTotal(scores: ScoredSport['scores'], weights: ScoringWeights): number {
  // Normalize weights to sum to 1
  const totalWeight = weights.funFactor + weights.skillFocus + weights.competition + weights.opportunity + weights.accessibility;
  
  if (totalWeight === 0) return 0;
  
  const normalizedWeights = {
    funFactor: weights.funFactor / totalWeight,
    skillFocus: weights.skillFocus / totalWeight,
    competition: weights.competition / totalWeight,
    opportunity: weights.opportunity / totalWeight,
    accessibility: weights.accessibility / totalWeight
  };
  
  // Calculate weighted sum (scores are 1-10, multiply by 10 to get 0-100 range)
  let weightedSum = 
    scores.funFactor * normalizedWeights.funFactor * 10 +
    scores.skillFocus * normalizedWeights.skillFocus * 10 +
    scores.competition * normalizedWeights.competition * 10 +
    scores.opportunity * normalizedWeights.opportunity * 10 +
    scores.accessibility * normalizedWeights.accessibility * 10;
  
  // Bonus for strong physical advantage (opportunity score of 10)
  // This ensures height-advantaged sports rise to the top
  if (scores.opportunity === 10) {
    weightedSum += 8; // Bonus points for strong height advantage
  } else if (scores.opportunity >= 7) {
    weightedSum += 4; // Smaller bonus for moderate advantage
  } else if (scores.opportunity <= 2) {
    weightedSum -= 5; // Penalty for strong disadvantage
  }
  
  return Math.round(Math.max(0, Math.min(100, weightedSum)));
}

/**
 * Score all sports for a child profile with given weights
 */
export function scoreAllSports(profile: ChildProfile, weights: ScoringWeights = DEFAULT_WEIGHTS): ScoredSport[] {
  return SPORTS_DATA.map(sport => {
    const scored = scoreSport(sport, profile);
    scored.weightedTotal = calculateWeightedTotal(scored.scores, weights);
    return scored;
  }).sort((a, b) => b.weightedTotal - a.weightedTotal);
}

/**
 * Get top recommended sports
 */
export function getTopRecommendations(
  profile: ChildProfile, 
  weights: ScoringWeights = DEFAULT_WEIGHTS,
  count: number = 10
): ScoredSport[] {
  return scoreAllSports(profile, weights).slice(0, count);
}

/**
 * Get sports grouped by timing
 */
export function getSportsByTiming(profile: ChildProfile, weights: ScoringWeights = DEFAULT_WEIGHTS): {
  perfect: ScoredSport[];
  good: ScoredSport[];
  early: ScoredSport[];
  late: ScoredSport[];
} {
  const scored = scoreAllSports(profile, weights);
  
  return {
    perfect: scored.filter(s => s.ageMatch === 'perfect'),
    good: scored.filter(s => s.ageMatch === 'good'),
    early: scored.filter(s => s.ageMatch === 'early'),
    late: scored.filter(s => s.ageMatch === 'late')
  };
}

/**
 * Calculate estimated adult height using mid-parental height method
 */
export function estimateAdultHeight(
  fatherHeightInches: number,
  motherHeightInches: number,
  childGender: Gender
): number {
  // Mid-Parental Height Method
  // For boys: (Father's height + Mother's height + 5 inches) / 2
  // For girls: (Father's height + Mother's height - 5 inches) / 2
  if (childGender === 'male') {
    return Math.round((fatherHeightInches + motherHeightInches + 5) / 2);
  } else {
    return Math.round((fatherHeightInches + motherHeightInches - 5) / 2);
  }
}

/**
 * Format height as feet'inches"
 */
export function formatHeight(inches: number): string {
  const feet = Math.floor(inches / 12);
  const remainingInches = Math.round(inches % 12);
  return `${feet}'${remainingInches}"`;
}

/**
 * Parse height from feet and inches to total inches
 */
export function parseHeight(feet: number, inches: number): number {
  return feet * 12 + inches;
}
