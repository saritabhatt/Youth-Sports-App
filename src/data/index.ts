// Central export file for all sports data and programs

export * from './sportsData';
export * from './localProgramsData';

// Re-export key utilities
export {
  searchPrograms,
  getProgramsByRegion,
  getProgramsBySport,
  getProgramsByAge,
  getProgramsByAgeAndRegion,
  getAffordablePrograms,
  getCompetitivePrograms,
  getRecreationalPrograms,
  getTopProgramsByRegion,
  getProgramStats,
  REGIONS,
  REGION_NAMES,
  REGION_DESCRIPTIONS
} from './localProgramsData';

export {
  getSportsByCategory,
  getHeightAdvantageForChild,
  getRegionalCompetition,
  heightAdvantageToScore,
  calculateOpportunityScore,
  SPORT_CATEGORIES,
  ZIP_TO_REGION,
  REGION_NAMES as SPORT_REGION_NAMES,
  getRegionFromZip
} from './sportsData';
