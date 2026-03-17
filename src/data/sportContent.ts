/**
 * Sport 101 Content - Detailed educational content for each sport
 * Populated by content writers
 * Structure: sportId -> full educational content
 */

export interface CommonInjury {
  injury: string;
  prevalence: string; // "20% of injuries"
  prevention: string;
  recoveryDays: { min: number; max: number };
}

export interface SportContent {
  sportId: string;
  name: string;
  description: string; // 2-3 sentences on what the sport is
  rules: string; // How the game works
  seasonStructure: string; // "Fall + Spring seasons, 12 weeks each"
  typicalSchedule: string; // "2-3 practices/week + 1 game/week"
  equipment: {
    name: string;
    cost: string; // "$60-80"
    required: boolean;
  }[];
  commonInjuries: CommonInjury[];
  costBreakdown: {
    recreational: {
      min: number;
      max: number;
      description: string;
    };
    competitive: {
      min: number;
      max: number;
      description: string;
    };
    privateCoaching: {
      perHour: string; // "$50-100"
    };
  };
  coachAdvice: {
    quote: string;
    coachName: string;
    experience: string; // "15 years"
    region?: string; // "Santa Barbara"
  };
  collegePathway: {
    percentReachCollege: number; // 2 = 2%
    d1ScholarshipsAvailable: boolean;
    yearlyInvestmentToReachCollege: string; // "$15,000-30,000"
    competitionLevel: "High" | "Moderate" | "Low";
  };
  videoEmbedUrl?: string; // YouTube embed URL
  keySkillsDeveloped: string[];
  idealAgeToStart: number;
}

/**
 * Sport Content Database
 * To be populated by agents
 * Example structure below:
 */
export const SPORT_CONTENT: Record<string, SportContent> = {
  // Example - will be filled in by content agents
  soccer: {
    sportId: "soccer",
    name: "Soccer (Association Football)",
    description:
      "Soccer is a team sport where two teams of 11 players try to move a ball downfield and score by getting it in the opponent's goal. It's the world's most popular sport and emphasizes teamwork, strategic thinking, and cardiovascular fitness.",
    rules:
      "90 minutes of play divided into two 45-minute halves. Players cannot use their hands (except goalkeeper). Score by getting the ball in the goal.",
    seasonStructure: "Fall season (Aug-Nov) and Spring season (Jan-April). Most recreational programs run both.",
    typicalSchedule: "2-3 practices per week + 1 game per week during season",
    equipment: [
      { name: "Soccer cleats", cost: "$60-100", required: true },
      { name: "Shin guards", cost: "$20-40", required: true },
      { name: "Soccer ball", cost: "$20-40", required: false },
      { name: "Jersey/shorts", cost: "Usually provided by team", required: false },
      { name: "Socks", cost: "$10-15", required: true },
    ],
    commonInjuries: [
      {
        injury: "Ankle sprains",
        prevalence: "20% of soccer injuries",
        prevention: "Proper warm-up, ankle strengthening exercises, gradual intensity increase",
        recoveryDays: { min: 14, max: 42 },
      },
      {
        injury: "Knee injuries",
        prevalence: "15% of soccer injuries",
        prevention: "Proper technique, core strengthening, quad/hamstring flexibility",
        recoveryDays: { min: 14, max: 84 },
      },
      {
        injury: "Concussion (from headers)",
        prevalence: "5% of soccer injuries",
        prevention: "Proper heading technique taught by age 10+, neck strengthening",
        recoveryDays: { min: 7, max: 21 },
      },
    ],
    costBreakdown: {
      recreational: {
        min: 200,
        max: 400,
        description: "Local parks & rec leagues, recreational clubs",
      },
      competitive: {
        min: 2000,
        max: 4500,
        description: "Travel/club teams, includes coaching, tournaments, travel",
      },
      privateCoaching: {
        perHour: "$50-100",
      },
    },
    coachAdvice: {
      quote:
        "The best soccer players aren't always the fastest or most athletic—they're the ones who listen, adapt, and work with their teammates. Coachability beats raw talent every time.",
      coachName: "Coach Marco Rodriguez",
      experience: "15 years",
      region: "Santa Barbara Youth Athletics",
    },
    collegePathway: {
      percentReachCollege: 2,
      d1ScholarshipsAvailable: true,
      yearlyInvestmentToReachCollege: "$15,000-30,000",
      competitionLevel: "High",
    },
    videoEmbedUrl: "https://www.youtube.com/embed/I4K1TYEjxHM", // Replace with actual video
    keySkillsDeveloped: [
      "Spatial awareness",
      "Team communication",
      "Lower body strength",
      "Cardiovascular endurance",
      "Strategic thinking",
      "Ball control",
    ],
    idealAgeToStart: 5,
  },

  // Add more sports below (basketball, swimming, tennis, gymnastics, etc.)
  // This will be populated by the content writer agent
};

/**
 * Get content for a specific sport
 */
export function getSportContent(sportId: string): SportContent | undefined {
  return SPORT_CONTENT[sportId.toLowerCase()];
}

/**
 * Get all sports with content available
 */
export function getAllSportContent(): SportContent[] {
  return Object.values(SPORT_CONTENT);
}
