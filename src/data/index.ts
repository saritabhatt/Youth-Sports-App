// Central export file for all sports data and programs

export * from './sportsData';

// Re-export key utilities from localProgramsData (excluding Sport type which conflicts)
export type { LocalProgram, OrganizationType } from './localProgramsData';
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
