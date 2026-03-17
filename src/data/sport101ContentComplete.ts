/**
 * Sport 101: Complete Content Pages for All Youth Sports
 * Comprehensive reference guide for parents and athletes
 * Updated: March 2026
 */

export interface CommonInjury {
  name: string;
  description: string;
  prevention: string[];
  recovery: string;
}

export interface CostBreakdown {
  recreational: { min: number; max: number; description: string };
  competitive: { min: number; max: number; description: string };
}

export interface Sport101Entry {
  id: string;
  name: string;
  emoji: string;
  rules: string; // 2-3 sentences
  equipment: string[];
  seasonStructure: {
    seasonType: "fall" | "winter" | "spring" | "summer" | "year-round";
    duration: string;
    peakMonth: string;
  };
  commonInjuries: CommonInjury[];
  costBreakdown: CostBreakdown;
  coachQuote: {
    text: string;
    name: string;
    title: string;
  };
  collegeOpportunityPercent: number;
  videoEmbedLink: string;
}

export const COMPLETE_SPORT_101: Record<string, Sport101Entry> = {
  // ============================================================================
  // TEAM BALL SPORTS
  // ============================================================================
  
  soccer: {
    id: "soccer",
    name: "Soccer",
    emoji: "⚽",
    rules: "Two teams of 11 players attempt to move a spherical ball into the opposing goal using any body part except hands and arms. A goal is awarded when the entire ball crosses the goal line. Matches consist of two 45-minute halves.",
    equipment: ["Soccer cleats", "Shin guards", "Soccer ball", "Jersey and shorts", "Goalkeeper gloves (keeper)", "Training cones"],
    seasonStructure: {
      seasonType: "fall",
      duration: "August - November (fall); February - May (spring)",
      peakMonth: "October"
    },
    commonInjuries: [
      {
        name: "Ankle Sprain",
        description: "Ankle ligament injury from twisting during play",
        prevention: ["Proper warm-up", "Ankle strengthening exercises", "Appropriate footwear"],
        recovery: "RICE protocol (2-4 weeks); physical therapy for balance"
      },
      {
        name: "ACL/MCL Knee Injuries",
        description: "Knee ligament tears from sudden direction changes",
        prevention: ["Neuromuscular training", "Proper landing mechanics", "Quadriceps strengthening"],
        recovery: "6-12 months; may require surgery"
      },
      {
        name: "Concussion",
        description: "Head injury from ball or player contact",
        prevention: ["Proper heading technique", "Neck strengthening", "Limit youth headers"],
        recovery: "Medical evaluation; 7-10+ days return-to-play"
      }
    ],
    costBreakdown: {
      recreational: { min: 300, max: 800, description: "Local rec league with basic equipment" },
      competitive: { min: 2000, max: 5000, description: "Club/travel team with fees and tournaments" }
    },
    coachQuote: {
      text: "Soccer teaches that success comes from working as one unit, not from individual stars. The best players understand that making teammates better is the ultimate goal.",
      name: "Coach Silva",
      title: "Youth Academy Director"
    },
    collegeOpportunityPercent: 7,
    videoEmbedLink: "https://www.youtube.com/embed/QWzYaZDK6-0"
  },

  basketball: {
    id: "basketball",
    name: "Basketball",
    emoji: "🏀",
    rules: "Two teams of five players compete to shoot a ball through the opposing team's elevated hoop. A goal is worth 2 points (3 for shots beyond the arc). Games consist of four 12-minute quarters (youth).",
    equipment: ["Basketball shoes", "Basketball", "Athletic socks", "Jersey and shorts", "Mouthguard", "Court markings"],
    seasonStructure: {
      seasonType: "winter",
      duration: "November - March",
      peakMonth: "February"
    },
    commonInjuries: [
      {
        name: "Ankle Sprain",
        description: "Most common basketball injury from cutting and jumping",
        prevention: ["Ankle strengthening", "Proper footwear", "Adequate warm-up"],
        recovery: "RICE protocol; 1-4 weeks recovery"
      },
      {
        name: "ACL/Patellar Tendinitis",
        description: "Knee injuries from jumping and pivoting",
        prevention: ["Plyometric training", "Proper landing mechanics", "Core strengthening"],
        recovery: "4-12 weeks for mild; 6-12 months for ACL tears"
      },
      {
        name: "Concussion",
        description: "Head injury from ball or player contact",
        prevention: ["Court awareness", "Neck strengthening", "Protective equipment"],
        recovery: "Medical evaluation; 7-10 day return-to-play protocol"
      }
    ],
    costBreakdown: {
      recreational: { min: 400, max: 1000, description: "Park district or school league" },
      competitive: { min: 1500, max: 4000, description: "AAU/club team with tournaments" }
    },
    coachQuote: {
      text: "In basketball, you learn that effort is always in your control. You can't control how tall you are or referee calls, but you can control your energy on every possession.",
      name: "Coach Martinez",
      title: "High School Head Coach"
    },
    collegeOpportunityPercent: 3,
    videoEmbedLink: "https://www.youtube.com/embed/4qg-JYI5xaw"
  },

  football: {
    id: "football",
    name: "American Football",
    emoji: "🏈",
    rules: "Two teams of 11 players compete to advance an oval ball down a 100-yard field to score touchdowns (6 points). Teams get four attempts (downs) to advance 10 yards. Games consist of four 15-minute quarters.",
    equipment: ["Football", "Helmet with facemask", "Shoulder pads", "Protective pads", "Gloves", "Cleats", "Mouthguard"],
    seasonStructure: {
      seasonType: "fall",
      duration: "August - November",
      peakMonth: "October"
    },
    commonInjuries: [
      {
        name: "Concussion",
        description: "Head injury from tackles or collisions",
        prevention: ["Proper tackling technique", "Quality helmet fitting", "Neck strengthening"],
        recovery: "Medical clearance; 7-14+ day graduated return-to-play"
      },
      {
        name: "ACL Tear",
        description: "Knee ligament injury from cutting, planting, or contact",
        prevention: ["Neuromuscular training", "Proper landing mechanics", "Strength training"],
        recovery: "6-12 months post-surgery; extensive rehabilitation"
      },
      {
        name: "Shoulder Separation",
        description: "AC joint injury from falls or direct impact",
        prevention: ["Shoulder strengthening", "Proper tackling form", "Core stability"],
        recovery: "4-12 weeks; may require surgery for severe cases"
      },
      {
        name: "Ankle Sprain",
        description: "Ankle ligament injury from tackles",
        prevention: ["Ankle strengthening", "Proper footwear with support", "Field maintenance"],
        recovery: "2-6 weeks recovery; PT for proprioception"
      }
    ],
    costBreakdown: {
      recreational: { min: 800, max: 1500, description: "Youth flag or tackle league" },
      competitive: { min: 2500, max: 6000, description: "High-level club with all equipment" }
    },
    coachQuote: {
      text: "Football is a game of inches, and those inches are measured by heart. Every player has to give 100% on every single play.",
      name: "Coach Thompson",
      title: "Youth Football Director"
    },
    collegeOpportunityPercent: 7,
    videoEmbedLink: "https://www.youtube.com/embed/Dqv33_a5NL8"
  },

  volleyball: {
    id: "volleyball",
    name: "Volleyball",
    emoji: "🏐",
    rules: "Two teams of six players are separated by a net. Teams hit a ball over the net, trying to land it on the opponent's side. A team scores when the opposing team fails to return the ball. Matches are best-of-five sets.",
    equipment: ["Volleyball", "Net and posts", "Volleyball shoes", "Knee pads", "Jersey and shorts", "Court"],
    seasonStructure: {
      seasonType: "fall",
      duration: "August - November; year-round for clubs",
      peakMonth: "October"
    },
    commonInjuries: [
      {
        name: "Patellar Tendinitis (Jumper's Knee)",
        description: "Knee injury from repeated jumping",
        prevention: ["Proper landing mechanics", "Quadriceps strengthening", "Adequate rest"],
        recovery: "2-12 weeks rest and physical therapy"
      },
      {
        name: "Ankle Sprain",
        description: "Ankle injury from lateral movements and landing",
        prevention: ["Ankle strengthening", "Proper footwear", "Dynamic warm-up"],
        recovery: "1-4 weeks with rehabilitation"
      },
      {
        name: "Rotator Cuff Strain",
        description: "Shoulder overuse from overhead movements",
        prevention: ["Shoulder strengthening", "Proper technique", "Adequate rest"],
        recovery: "2-8 weeks with physical therapy"
      }
    ],
    costBreakdown: {
      recreational: { min: 200, max: 600, description: "Park district or school league" },
      competitive: { min: 1500, max: 3500, description: "Club team with fees" }
    },
    coachQuote: {
      text: "Volleyball is the ultimate team sport. No one player can win it alone. You have to trust your teammates, communicate constantly, and work as one unit.",
      name: "Coach Chen",
      title: "Club Volleyball Director"
    },
    collegeOpportunityPercent: 3,
    videoEmbedLink: "https://www.youtube.com/embed/hdrD1R0K8c0"
  },

  baseball: {
    id: "baseball",
    name: "Baseball",
    emoji: "⚾",
    rules: "Two teams of nine players alternate batting and fielding. The batting team scores by hitting a pitched ball and advancing around four bases. An inning consists of three outs for each team. A standard game is nine innings.",
    equipment: ["Baseball and bat", "Baseball glove", "Cleats", "Uniform", "Helmet with facemask", "Catcher's gear"],
    seasonStructure: {
      seasonType: "spring",
      duration: "March - June (school); longer for select",
      peakMonth: "May"
    },
    commonInjuries: [
      {
        name: "Rotator Cuff Strain",
        description: "Shoulder overuse from throwing",
        prevention: ["Proper throwing mechanics", "Pitch count limits", "Shoulder strengthening"],
        recovery: "4-12 weeks rest; gradual return to throwing"
      },
      {
        name: "Little League Elbow",
        description: "Medial epicondylitis in young pitchers",
        prevention: ["Age-appropriate pitch counts", "Proper mechanics", "Adequate rest"],
        recovery: "Several weeks to months; may need surgery"
      },
      {
        name: "Concussion",
        description: "Head injury from being hit by pitch",
        prevention: ["Proper helmet fit", "Awareness at plate", "Coach communication"],
        recovery: "Medical evaluation; 7-10 day return-to-play"
      }
    ],
    costBreakdown: {
      recreational: { min: 400, max: 1000, description: "Little League or park district" },
      competitive: { min: 1500, max: 4000, description: "Select/travel team" }
    },
    coachQuote: {
      text: "Baseball is 90% mental. When you're standing in the box or on the mound, you have to trust your training and trust yourself.",
      name: "Coach Rodriguez",
      title: "Travel Baseball Coach"
    },
    collegeOpportunityPercent: 6,
    videoEmbedLink: "https://www.youtube.com/embed/0W_dDMPWZOc"
  },

  lacrosse: {
    id: "lacrosse",
    name: "Lacrosse",
    emoji: "🥍",
    rules: "Two teams of ten players use a stick with netted pocket to catch, carry, and throw a small rubber ball. Teams score by throwing the ball into the opposing goal. Games consist of four 15-minute quarters.",
    equipment: ["Lacrosse stick", "Lacrosse ball", "Helmet with face mask", "Shoulder pads", "Protective gear", "Cleats"],
    seasonStructure: {
      seasonType: "spring",
      duration: "March - June (school); longer for club",
      peakMonth: "May"
    },
    commonInjuries: [
      {
        name: "Head and Neck Injuries",
        description: "Impact from ball or stick to head",
        prevention: ["Proper helmet fit", "Neck strengthening", "Checking technique"],
        recovery: "Medical evaluation; return-to-play protocol"
      },
      {
        name: "Knee Injuries",
        description: "ACL or meniscus from pivoting",
        prevention: ["Knee strengthening", "Agility training", "Dynamic warm-up"],
        recovery: "4-12 months for severe"
      },
      {
        name: "Shoulder Injuries",
        description: "Dislocation or separation from falls",
        prevention: ["Shoulder pad fitting", "Strength training", "Proper form"],
        recovery: "2-12 weeks depending on severity"
      }
    ],
    costBreakdown: {
      recreational: { min: 600, max: 1200, description: "Youth rec league" },
      competitive: { min: 2000, max: 5000, description: "Club/school team with travel" }
    },
    coachQuote: {
      text: "Lacrosse is the fastest game on two feet. It teaches speed, agility, and quick decision-making. But most importantly, it teaches toughness.",
      name: "Coach Walsh",
      title: "High School Lacrosse Coach"
    },
    collegeOpportunityPercent: 2,
    videoEmbedLink: "https://www.youtube.com/embed/0qhfLwXXRvM"
  },

  softball: {
    id: "softball",
    name: "Softball",
    emoji: "🥎",
    rules: "Similar to baseball with underhand pitching. Two teams alternate batting and fielding with the goal of scoring runs by advancing around four bases. A standard game is seven innings.",
    equipment: ["Softball", "Bat", "Glove", "Cleats", "Uniform", "Helmet with facemask", "Catcher's gear"],
    seasonStructure: {
      seasonType: "spring",
      duration: "March - June (school); year-round for select",
      peakMonth: "May"
    },
    commonInjuries: [
      {
        name: "Shoulder Strain",
        description: "Overuse from throwing",
        prevention: ["Proper throwing mechanics", "Adequate warm-up", "Shoulder strengthening"],
        recovery: "2-8 weeks rest with gradual return"
      },
      {
        name: "Knee Injuries",
        description: "From running, pivoting, or diving",
        prevention: ["Proper footwear", "Knee strengthening", "Proper sliding technique"],
        recovery: "1-8 weeks depending on severity"
      },
      {
        name: "Hamstring Strain",
        description: "Overuse from running and sprinting",
        prevention: ["Adequate stretching", "Gradual progression", "Hamstring strengthening"],
        recovery: "2-6 weeks recovery"
      }
    ],
    costBreakdown: {
      recreational: { min: 300, max: 800, description: "Local softball league" },
      competitive: { min: 1500, max: 3500, description: "Travel team with equipment" }
    },
    coachQuote: {
      text: "Softball teaches girls to be confident and fearless. When you can field a hard-hit ball and throw across the diamond, you believe you can do anything.",
      name: "Coach Anderson",
      title: "Youth Softball Coach"
    },
    collegeOpportunityPercent: 4,
    videoEmbedLink: "https://www.youtube.com/embed/b-5jPcKs0YY"
  },

  rugby: {
    id: "rugby",
    name: "Rugby",
    emoji: "🏉",
    rules: "Two teams of 15 players compete to advance an oval ball down a field to score tries. Scrums and lineouts are key formations. Physical tackling is fundamental; no pads required.",
    equipment: ["Rugby ball", "Jersey", "Shorts and socks", "Scrum cap", "Mouthguard", "Rugby boots", "Optional shoulder pads"],
    seasonStructure: {
      seasonType: "fall",
      duration: "August - November; varies for clubs",
      peakMonth: "October"
    },
    commonInjuries: [
      {
        name: "Head and Neck Injuries",
        description: "Concussion or neck strain from tackles",
        prevention: ["Tackling technique training", "Neck strengthening", "Scrum cap use"],
        recovery: "Medical evaluation; 7-14+ day return-to-play"
      },
      {
        name: "Shoulder Injuries",
        description: "Dislocation or separation from tackles",
        prevention: ["Shoulder strengthening", "Proper tackling", "Core stability"],
        recovery: "4-12 weeks depending on severity"
      },
      {
        name: "Knee Injuries",
        description: "ACL or ligament injuries from tackles",
        prevention: ["Knee strengthening", "Proper body positioning", "Agility training"],
        recovery: "4-12 months for ACL tears"
      }
    ],
    costBreakdown: {
      recreational: { min: 400, max: 1000, description: "Rugby club membership" },
      competitive: { min: 1500, max: 4000, description: "High-level club with coaching" }
    },
    coachQuote: {
      text: "Rugby is a game for all shapes and sizes. It teaches toughness, teamwork, and respect. Every player has a job, and when everyone executes, magic happens.",
      name: "Coach O'Sullivan",
      title: "Rugby Coach"
    },
    collegeOpportunityPercent: 1,
    videoEmbedLink: "https://www.youtube.com/embed/vQYfPRX7U1A"
  },

  // ============================================================================
  // INDIVIDUAL SPORTS
  // ============================================================================

  tennis: {
    id: "tennis",
    name: "Tennis",
    emoji: "🎾",
    rules: "Two players (singles) or four (doubles) use rackets to hit a ball across a net. Points are awarded when opponent fails to return the ball. Matches consist of sets determined by games scored in 15, 30, 40, game sequence.",
    equipment: ["Tennis racket", "Tennis balls", "Tennis shoes", "Shorts/skirt and shirt", "Headband", "Court"],
    seasonStructure: {
      seasonType: "year-round",
      duration: "Spring and fall seasons; summer camps",
      peakMonth: "May and October"
    },
    commonInjuries: [
      {
        name: "Tennis Elbow",
        description: "Lateral epicondylitis from repeated swings",
        prevention: ["Proper racket fit", "Correct swing technique", "Elbow strengthening"],
        recovery: "2-6 weeks with rest; may need strapping"
      },
      {
        name: "Rotator Cuff Strain",
        description: "Shoulder overuse from serving",
        prevention: ["Shoulder strengthening", "Proper serving mechanics", "Adequate rest"],
        recovery: "2-8 weeks with physical therapy"
      },
      {
        name: "Knee Injuries",
        description: "Knee strain from lateral movements",
        prevention: ["Proper footwear", "Knee strengthening", "Dynamic warm-up"],
        recovery: "1-6 weeks depending on severity"
      }
    ],
    costBreakdown: {
      recreational: { min: 300, max: 800, description: "Park district lessons and court" },
      competitive: { min: 1500, max: 4000, description: "Private coaching and tournaments" }
    },
    coachQuote: {
      text: "Tennis is 80% mental. You're battling yourself as much as your opponent. Learning to stay calm under pressure separates champions.",
      name: "Coach Santos",
      title: "Professional Tennis Coach"
    },
    collegeOpportunityPercent: 1,
    videoEmbedLink: "https://www.youtube.com/embed/xGWlF7Vs_yM"
  },

  golf: {
    id: "golf",
    name: "Golf",
    emoji: "⛳",
    rules: "Individual players hit a ball from a tee box into a series of holes using as few strokes as possible. A standard round has 18 holes. Lowest total score wins. Handicap systems allow fair competition.",
    equipment: ["Golf clubs", "Golf balls", "Golf bag", "Golf shoes", "Golf glove", "Golf tees", "Rangefinder (optional)"],
    seasonStructure: {
      seasonType: "year-round",
      duration: "Spring/fall primary; winter/summer for tournaments",
      peakMonth: "April and September"
    },
    commonInjuries: [
      {
        name: "Lower Back Strain",
        description: "Overuse from repetitive twisting",
        prevention: ["Proper swing mechanics", "Core strengthening", "Stretching"],
        recovery: "1-4 weeks; PT for proper mechanics"
      },
      {
        name: "Rotator Cuff Strain",
        description: "Shoulder overuse from swinging",
        prevention: ["Shoulder strengthening", "Proper technique", "Flexibility"],
        recovery: "2-6 weeks recovery"
      },
      {
        name: "Golfer's Elbow",
        description: "Inner elbow pain from swinging",
        prevention: ["Proper grip and mechanics", "Elbow strengthening", "Flexibility"],
        recovery: "2-6 weeks with rest"
      }
    ],
    costBreakdown: {
      recreational: { min: 500, max: 1500, description: "Public course play with basic equipment" },
      competitive: { min: 2000, max: 6000, description: "Club membership and private lessons" }
    },
    coachQuote: {
      text: "Golf is a game of patience and precision. Every shot matters, and you have to trust your preparation. The best golfers stay focused for 18 holes and never give up.",
      name: "Coach O'Brien",
      title: "PGA Junior League Director"
    },
    collegeOpportunityPercent: 2,
    videoEmbedLink: "https://www.youtube.com/embed/wRkgfQWHQMU"
  },

  // ============================================================================
  // TRACK & FIELD
  // ============================================================================

  "track-sprints": {
    id: "track-sprints",
    name: "Track & Field - Sprints",
    emoji: "🏃",
    rules: "Sprinters race in distances of 100m, 200m, or 400m on an oval track. Races are timed with winners determined by fastest time. Proper starting technique and lane adherence required.",
    equipment: ["Running spikes", "Running shorts/top", "Track", "Starting blocks", "Numbered bibs"],
    seasonStructure: {
      seasonType: "spring",
      duration: "March - June (outdoor); December - February (indoor)",
      peakMonth: "May"
    },
    commonInjuries: [
      {
        name: "Hamstring Strain",
        description: "Most common from explosive pushing",
        prevention: ["Dynamic warm-up", "Hamstring flexibility", "Eccentric strengthening"],
        recovery: "2-8 weeks; PT essential"
      },
      {
        name: "Shin Splints",
        description: "Tibial stress from running",
        prevention: ["Proper footwear", "Gradual increase", "Calf strengthening"],
        recovery: "2-8 weeks rest; cross-training allowed"
      },
      {
        name: "Ankle Sprain",
        description: "From uneven track or misstep",
        prevention: ["Ankle strengthening", "Proper footwear", "Track inspection"],
        recovery: "1-4 weeks recovery"
      }
    ],
    costBreakdown: {
      recreational: { min: 200, max: 500, description: "Park district or school track" },
      competitive: { min: 800, max: 2500, description: "Club team with coaching" }
    },
    coachQuote: {
      text: "Sprinting is about power and technique. You've got maybe ten seconds to execute perfectly. It's a mental game as much as physical.",
      name: "Coach Johnson",
      title: "Track & Field Coach"
    },
    collegeOpportunityPercent: 5,
    videoEmbedLink: "https://www.youtube.com/embed/hQiGR9rNFCU"
  },

  "track-distance": {
    id: "track-distance",
    name: "Track & Field - Distance",
    emoji: "🏃",
    rules: "Distance runners compete in 800m, 1600m, 3200m, and longer events. Races won by fastest time. Passing zones and pacing are strategic elements.",
    equipment: ["Running spikes or distance shoes", "Running clothes", "Track", "Timing system", "Numbered bibs"],
    seasonStructure: {
      seasonType: "spring",
      duration: "March - June (outdoor); November - February (indoor/XC)",
      peakMonth: "May and November"
    },
    commonInjuries: [
      {
        name: "IT Band Syndrome",
        description: "Overuse injury from repetitive running",
        prevention: ["Gradual mileage increase", "Cross-training", "Hip strengthening"],
        recovery: "2-12 weeks; may need PT"
      },
      {
        name: "Shin Splints",
        description: "Tibial pain from repetitive stress",
        prevention: ["Proper footwear", "Gradual increases", "Calf strengthening"],
        recovery: "2-8 weeks; cross-training okay"
      },
      {
        name: "Stress Fractures",
        description: "Small cracks from overtraining",
        prevention: ["Careful progression", "Adequate nutrition", "Regular rest"],
        recovery: "4-12 weeks complete rest"
      }
    ],
    costBreakdown: {
      recreational: { min: 150, max: 400, description: "School/park district XC and track" },
      competitive: { min: 800, max: 2500, description: "Club team with coaching" }
    },
    coachQuote: {
      text: "Distance running is 70% mental. Your body can do amazing things if your mind is strong. The race is won when you want to quit but choose to push.",
      name: "Coach Liu",
      title: "Cross Country Coach"
    },
    collegeOpportunityPercent: 8,
    videoEmbedLink: "https://www.youtube.com/embed/VV7MoL6c9oA"
  },

  // ============================================================================
  // WATER SPORTS
  // ============================================================================

  swimming: {
    id: "swimming",
    name: "Swimming",
    emoji: "🏊",
    rules: "Swimmers race in various distances using different strokes: freestyle, backstroke, breaststroke, butterfly. Races won by fastest time. Proper stroke technique and turns required.",
    equipment: ["Swimsuit", "Cap", "Goggles", "Pull buoy", "Kickboard", "Swimming pool"],
    seasonStructure: {
      seasonType: "year-round",
      duration: "October - March primary; summer also common",
      peakMonth: "February"
    },
    commonInjuries: [
      {
        name: "Swimmer's Shoulder",
        description: "Rotator cuff overuse from strokes",
        prevention: ["Proper technique", "Balanced development", "Adequate rest"],
        recovery: "2-12 weeks; PT essential"
      },
      {
        name: "Breaststroker's Knee",
        description: "Medial knee pain from frog kick",
        prevention: ["Proper kick technique", "Hip/quad strengthening", "Flexibility"],
        recovery: "2-8 weeks recovery"
      },
      {
        name: "Back Pain",
        description: "Lower back strain from spinal extension",
        prevention: ["Core strengthening", "Balanced training", "Flexibility"],
        recovery: "2-6 weeks with proper technique"
      }
    ],
    costBreakdown: {
      recreational: { min: 300, max: 800, description: "Park district swim team" },
      competitive: { min: 1500, max: 4000, description: "High-level club team" }
    },
    coachQuote: {
      text: "Swimming is individual excellence within a team environment. While racing alone, the team's energy propels you forward. Your improvement lifts the entire team.",
      name: "Coach Martinez",
      title: "Swim Team Director"
    },
    collegeOpportunityPercent: 3,
    videoEmbedLink: "https://www.youtube.com/embed/Wp6M_ItV2gQ"
  },

  diving: {
    id: "diving",
    name: "Diving",
    emoji: "🤿",
    rules: "Divers perform acrobatic maneuvers off springboard (1m/3m) or platform (5m/7.5m/10m). Judges score based on difficulty and execution (0-10 scale).",
    equipment: ["Diving board", "Swimsuit", "Pool with proper depth", "Goggles", "Board padding"],
    seasonStructure: {
      seasonType: "year-round",
      duration: "Competition November - May; training year-round",
      peakMonth: "March"
    },
    commonInjuries: [
      {
        name: "Ankle/Foot Injuries",
        description: "Impact from board contact or landing",
        prevention: ["Proper technique", "Ankle strengthening", "Progressive difficulty"],
        recovery: "1-8 weeks depending on severity"
      },
      {
        name: "Neck and Spine Injuries",
        description: "Whiplash from improper entry",
        prevention: ["Proper alignment", "Neck strengthening", "Gradual progression"],
        recovery: "2-12 weeks; may need imaging"
      },
      {
        name: "Shoulder Strain",
        description: "Impact or overuse injury",
        prevention: ["Proper arm positioning", "Shoulder strengthening", "Adequate rest"],
        recovery: "2-6 weeks recovery"
      }
    ],
    costBreakdown: {
      recreational: { min: 400, max: 1000, description: "Diving club with pool" },
      competitive: { min: 2000, max: 5000, description: "Elite diving program" }
    },
    coachQuote: {
      text: "Diving is about precision and confidence. Every somersault must be perfect, and you must have courage to throw yourself off a platform. Mastery comes through repetition.",
      name: "Coach Park",
      title: "Diving Coach"
    },
    collegeOpportunityPercent: 2,
    videoEmbedLink: "https://www.youtube.com/embed/EQy92s3FSmA"
  },

  "water-polo": {
    id: "water-polo",
    name: "Water Polo",
    emoji: "🏐",
    rules: "Two teams of seven compete in a pool, throwing a ball into the opposing goal. Players cannot touch the pool bottom, and have 35 seconds to shoot. Games consist of four 8-minute quarters.",
    equipment: ["Water polo ball", "Goggles", "Water polo cap", "Goal net", "Pool"],
    seasonStructure: {
      seasonType: "fall",
      duration: "August - November; some clubs year-round",
      peakMonth: "October"
    },
    commonInjuries: [
      {
        name: "Shoulder Injuries",
        description: "Rotator cuff strain from throwing",
        prevention: ["Shoulder strengthening", "Proper throwing", "Adequate rest"],
        recovery: "2-12 weeks with PT"
      },
      {
        name: "Ear Injuries",
        description: "Cauliflower ear or tympanum rupture",
        prevention: ["Proper ear guard fitting", "Impact avoidance"],
        recovery: "Varies; permanent without surgery"
      },
      {
        name: "Knee Injuries",
        description: "Knee strain from treading water",
        prevention: ["Knee strengthening", "Proper technique", "Core strength"],
        recovery: "1-8 weeks depending on severity"
      }
    ],
    costBreakdown: {
      recreational: { min: 400, max: 1000, description: "Local water polo club" },
      competitive: { min: 1500, max: 3500, description: "Competitive club with coaching" }
    },
    coachQuote: {
      text: "Water polo is chess in the water. You're constantly thinking three steps ahead. It's the ultimate blend of athleticism and strategy.",
      name: "Coach Petrov",
      title: "Water Polo Coach"
    },
    collegeOpportunityPercent: 1,
    videoEmbedLink: "https://www.youtube.com/embed/qNJqfHlr-94"
  },

  surfing: {
    id: "surfing",
    name: "Surfing",
    emoji: "🏄",
    rules: "Surfers ride ocean waves on a board, scored based on maneuver quality (turns, aerials). Competitions have time limits; best waves count toward score.",
    equipment: ["Surfboard", "Wetsuits", "Rash guard", "Surfboard leash", "Fins"],
    seasonStructure: {
      seasonType: "year-round",
      duration: "Wave conditions vary; fall/winter best swells",
      peakMonth: "Fall and Winter"
    },
    commonInjuries: [
      {
        name: "Shoulder Dislocation/Strain",
        description: "Injury from paddling",
        prevention: ["Shoulder strengthening", "Proper technique", "Flexibility"],
        recovery: "2-12 weeks with PT"
      },
      {
        name: "Cuts and Lacerations",
        description: "Cuts from board, reef, or rocks",
        prevention: ["Proper wetsuits", "Reef awareness", "Protective gear"],
        recovery: "Variable; may need stitches"
      },
      {
        name: "Back Strain",
        description: "Lower back pain from paddling",
        prevention: ["Core strengthening", "Proper technique", "Flexibility"],
        recovery: "2-6 weeks with PT"
      }
    ],
    costBreakdown: {
      recreational: { min: 400, max: 1200, description: "Board, wetsuits, equipment" },
      competitive: { min: 1500, max: 4000, description: "Specialized equipment, coaching" }
    },
    coachQuote: {
      text: "Surfing is about reading the ocean and finding your rhythm. The ocean humbles you and teaches respect. Every wave is different; every session is a lesson.",
      name: "Coach Kahale",
      title: "Surfing Instructor"
    },
    collegeOpportunityPercent: 0.5,
    videoEmbedLink: "https://www.youtube.com/embed/7gW_TdE-aRw"
  },

  sailing: {
    id: "sailing",
    name: "Sailing",
    emoji: "⛵",
    rules: "Sailors navigate boats around a course marked by buoys. Rules govern starting lines and mark rounding. Winner determined by lowest point score over multiple races.",
    equipment: ["Sailboat", "Sails", "Life jacket", "Gloves", "Non-slip shoes", "Rope and rigging"],
    seasonStructure: {
      seasonType: "spring",
      duration: "March - October; varies by location",
      peakMonth: "May and September"
    },
    commonInjuries: [
      {
        name: "Hand and Blister Injuries",
        description: "Blisters and cuts from rope",
        prevention: ["Glove use", "Proper technique", "Gradual callus building"],
        recovery: "1-4 weeks for blisters"
      },
      {
        name: "Knee Injuries",
        description: "Knee strain from positioning",
        prevention: ["Proper positioning", "Strengthening", "Stretching"],
        recovery: "1-6 weeks depending on severity"
      },
      {
        name: "Back Strain",
        description: "Lower back pain from positioning",
        prevention: ["Core strengthening", "Flexibility", "Adequate rest"],
        recovery: "2-6 weeks recovery"
      }
    ],
    costBreakdown: {
      recreational: { min: 500, max: 1500, description: "Club membership and boat access" },
      competitive: { min: 2000, max: 6000, description: "Race fees, equipment, coaching" }
    },
    coachQuote: {
      text: "Sailing teaches strategy, physics, and teamwork. You're battling elements and competitors. The sailor who understands wind and works with crew will win.",
      name: "Coach Davidson",
      title: "Sailing Coach"
    },
    collegeOpportunityPercent: 1,
    videoEmbedLink: "https://www.youtube.com/embed/0cdtvu6VChU"
  },

  // ============================================================================
  // COMBAT SPORTS
  // ============================================================================

  wrestling: {
    id: "wrestling",
    name: "Wrestling",
    emoji: "🤼",
    rules: "Two competitors grapple using various holds and techniques. Points awarded for takedowns, escapes, reversals, near-falls. Winning by pinning shoulders to mat or by points.",
    equipment: ["Wrestling singlet", "Wrestling shoes", "Headgear", "Mouthguard", "Hand wraps", "Wrestling mat"],
    seasonStructure: {
      seasonType: "winter",
      duration: "November - March",
      peakMonth: "February"
    },
    commonInjuries: [
      {
        name: "Cauliflower Ear",
        description: "Fluid in outer ear from friction",
        prevention: ["Proper headgear", "Protective padding", "Ear care"],
        recovery: "Requires drainage; permanent without treatment"
      },
      {
        name: "Knee Injuries",
        description: "ACL/MCL injuries from takedowns",
        prevention: ["Proper technique", "Knee strengthening", "Agility training"],
        recovery: "4-12 months for severe"
      },
      {
        name: "Shoulder Injuries",
        description: "Dislocation or strain from throws",
        prevention: ["Shoulder strengthening", "Proper technique", "Core stability"],
        recovery: "2-12 weeks depending on severity"
      },
      {
        name: "Skin Infections",
        description: "Mat herpes, ringworm from contact",
        prevention: ["Mat hygiene", "Personal hygiene", "Covering cuts"],
        recovery: "1-4 weeks with treatment"
      }
    ],
    costBreakdown: {
      recreational: { min: 300, max: 800, description: "School wrestling program" },
      competitive: { min: 1000, max: 3000, description: "Club team with coaching" }
    },
    coachQuote: {
      text: "Wrestling builds character. You learn toughness, discipline, and how to overcome adversity. When you're on that mat, you discover who you really are.",
      name: "Coach Kowalski",
      title: "High School Wrestling Coach"
    },
    collegeOpportunityPercent: 5,
    videoEmbedLink: "https://www.youtube.com/embed/wL2KrvvZWf8"
  },

  "martial-arts": {
    id: "martial-arts",
    name: "Martial Arts",
    emoji: "🥋",
    rules: "Varies by discipline (Karate, Taekwondo, etc.). Competitors execute techniques against opponents or demonstrate forms/katas. Scoring based on technique execution, control, and effectiveness.",
    equipment: ["Uniform/gi", "Protective pads", "Headgear", "Mouthguard", "Belt (varies by rank)"],
    seasonStructure: {
      seasonType: "year-round",
      duration: "Continuous training with seasonal competitions",
      peakMonth: "Varies by organization"
    },
    commonInjuries: [
      {
        name: "Hand and Wrist Injuries",
        description: "Fractures from striking",
        prevention: ["Hand wrapping", "Protective padding", "Correct technique"],
        recovery: "2-8 weeks depending on severity"
      },
      {
        name: "Head and Neck Injuries",
        description: "Concussion from kicks/punches",
        prevention: ["Proper headgear", "Defensive technique", "Controlled training"],
        recovery: "Medical evaluation; 7-14 day return protocol"
      },
      {
        name: "Knee Injuries",
        description: "Knee strain from kicking",
        prevention: ["Proper technique", "Hip flexibility", "Knee strengthening"],
        recovery: "2-12 weeks depending on severity"
      },
      {
        name: "Rib Injuries",
        description: "Bruising or fracture from strikes",
        prevention: ["Chest padding", "Controlled contact", "Core strengthening"],
        recovery: "2-6 weeks rest"
      }
    ],
    costBreakdown: {
      recreational: { min: 500, max: 1500, description: "Local dojo membership" },
      competitive: { min: 1500, max: 4000, description: "High-level dojo with coaching" }
    },
    coachQuote: {
      text: "Martial arts teaches more than self-defense. It teaches discipline, respect, and self-improvement. Every belt earned represents growth as a person.",
      name: "Sensei Takahashi",
      title: "Martial Arts Instructor"
    },
    collegeOpportunityPercent: 0,
    videoEmbedLink: "https://www.youtube.com/embed/mT_-JCZlAKE"
  },

  boxing: {
    id: "boxing",
    name: "Boxing",
    emoji: "🥊",
    rules: "Two fighters compete in a ring, landing punches while avoiding strikes. Rounds typically 3 minutes with 1-minute breaks. Points awarded for clean punches; match won by knockout or points.",
    equipment: ["Boxing gloves", "Mouthguard", "Hand wraps", "Boxing shoes", "Headgear (amateur)", "Boxing ring"],
    seasonStructure: {
      seasonType: "year-round",
      duration: "Continuous training; competition year-round",
      peakMonth: "Varies"
    },
    commonInjuries: [
      {
        name: "Concussion",
        description: "Head injury from punches",
        prevention: ["Proper headgear", "Defensive technique", "Neck strengthening"],
        recovery: "Medical evaluation; 7-14+ day return protocol"
      },
      {
        name: "Hand and Wrist Injuries",
        description: "Fractures from punching",
        prevention: ["Proper wrapping", "Correct form", "Padded gloves"],
        recovery: "2-8 weeks depending on severity"
      },
      {
        name: "Eye Injuries",
        description: "Cuts or bruising around eyes",
        prevention: ["Proper headgear fit", "Defensive positioning"],
        recovery: "1-4 weeks for bruising"
      },
      {
        name: "Shoulder and Back Strain",
        description: "Overuse from punching",
        prevention: ["Shoulder strengthening", "Proper technique", "Core work"],
        recovery: "2-8 weeks recovery"
      }
    ],
    costBreakdown: {
      recreational: { min: 300, max: 800, description: "Boxing gym membership" },
      competitive: { min: 1000, max: 3000, description: "Premium training and competition" }
    },
    coachQuote: {
      text: "Boxing is the sweet science. It teaches discipline, respect, and mental toughness. You learn to face fears and overcome them.",
      name: "Coach Thompson",
      title: "Boxing Coach"
    },
    collegeOpportunityPercent: 0,
    videoEmbedLink: "https://www.youtube.com/embed/P_cqJe-bnNc"
  },

  // ============================================================================
  // WINTER SPORTS
  // ============================================================================

  skiing: {
    id: "skiing",
    name: "Skiing",
    emoji: "⛷️",
    rules: "Skiers descend snow-covered mountains, navigating gates in alpine, mogul, or cross-country events. Winners determined by fastest time; style points awarded in some events.",
    equipment: ["Skis", "Ski boots", "Bindings", "Ski poles", "Helmet", "Goggles", "Insulated jacket/pants", "Gloves"],
    seasonStructure: {
      seasonType: "winter",
      duration: "December - March",
      peakMonth: "February"
    },
    commonInjuries: [
      {
        name: "ACL Knee Injuries",
        description: "Most common; tears from falls/twisting",
        prevention: ["Proper binding adjustment", "Knee strengthening", "Skill development"],
        recovery: "6-12 months; may need surgery"
      },
      {
        name: "Ankle Injuries",
        description: "Fracture or sprain",
        prevention: ["Boot fit", "Ankle strengthening", "Balance training"],
        recovery: "2-8 weeks depending on severity"
      },
      {
        name: "Wrist and Hand Injuries",
        description: "Fractures from falls",
        prevention: ["Wrist guards", "Proper falling technique", "Hand strengthening"],
        recovery: "4-8 weeks for fractures"
      },
      {
        name: "Concussion",
        description: "Head injury from falls",
        prevention: ["Proper helmet fit", "Skill-appropriate terrain", "Speed control"],
        recovery: "Medical evaluation; 7-14 day return protocol"
      }
    ],
    costBreakdown: {
      recreational: { min: 800, max: 2000, description: "Equipment, lift tickets, lessons" },
      competitive: { min: 3000, max: 8000, description: "High-end equipment, coaching, travel" }
    },
    coachQuote: {
      text: "Skiing is about control and confidence. Trust your technique, trust your equipment, and trust the mountain. The best skiers flow with the terrain.",
      name: "Coach Bergmann",
      title: "Ski Academy Director"
    },
    collegeOpportunityPercent: 1,
    videoEmbedLink: "https://www.youtube.com/embed/qNaWBJbwGFw"
  },

  snowboarding: {
    id: "snowboarding",
    name: "Snowboarding",
    emoji: "🏂",
    rules: "Snowboarders descend snowy terrain on a single board, navigating gates or obstacles. Events include slalom, halfpipe, slopestyle, big air. Winners by fastest time or highest style score.",
    equipment: ["Snowboard", "Snowboard boots", "Bindings", "Helmet", "Goggles", "Wrist guards", "Insulated jacket/pants", "Gloves"],
    seasonStructure: {
      seasonType: "winter",
      duration: "December - March",
      peakMonth: "February"
    },
    commonInjuries: [
      {
        name: "Wrist Fractures",
        description: "Most common; from falling on hands",
        prevention: ["Wrist guards", "Proper falling technique", "Strength training"],
        recovery: "4-8 weeks with bracing"
      },
      {
        name: "Ankle Injuries",
        description: "Fracture or sprain",
        prevention: ["Boot fit", "Ankle strengthening", "Proper technique"],
        recovery: "2-8 weeks depending on severity"
      },
      {
        name: "Knee Injuries",
        description: "From falls or twisting",
        prevention: ["Knee strengthening", "Proper technique", "Balance training"],
        recovery: "2-12 weeks depending on severity"
      },
      {
        name: "Concussion",
        description: "Impact from falls",
        prevention: ["Proper helmet use", "Skill progression", "Speed control"],
        recovery: "Medical evaluation; 7-14 day return protocol"
      }
    ],
    costBreakdown: {
      recreational: { min: 700, max: 1800, description: "Equipment, lift tickets, lessons" },
      competitive: { min: 2500, max: 7000, description: "High-end equipment, coaching, travel" }
    },
    coachQuote: {
      text: "Snowboarding is about style, courage, and pushing limits. You must commit to tricks and trust your body. The best riders aren't afraid to fall.",
      name: "Coach Jensen",
      title: "Snowboarding Coach"
    },
    collegeOpportunityPercent: 0.5,
    videoEmbedLink: "https://www.youtube.com/embed/PrIgS8gL_Zo"
  },

  hockey: {
    id: "hockey",
    name: "Ice Hockey",
    emoji: "🏒",
    rules: "Two teams of six (five skaters + goalie) compete to hit a puck into the opposing goal using hockey sticks. Games consist of three 20-minute periods. Physical contact allowed within rules.",
    equipment: ["Hockey skates", "Hockey stick", "Hockey puck", "Protective gear", "Hockey pants", "Jersey", "Goalie equipment"],
    seasonStructure: {
      seasonType: "winter",
      duration: "September - April",
      peakMonth: "March"
    },
    commonInjuries: [
      {
        name: "Concussion",
        description: "Head injury from checks, falls, puck",
        prevention: ["Proper helmet fit", "Neck strengthening", "Checking technique"],
        recovery: "Medical evaluation; 7-14+ day return protocol"
      },
      {
        name: "Shoulder Separation",
        description: "AC joint injury from checks",
        prevention: ["Shoulder pad fit", "Checking technique", "Strength training"],
        recovery: "2-12 weeks depending on grade"
      },
      {
        name: "ACL Knee Injuries",
        description: "MCL/ACL from cuts and checks",
        prevention: ["Knee strengthening", "Proper skating technique", "Core stability"],
        recovery: "4-12 months for ACL tears"
      },
      {
        name: "Lacerations",
        description: "Cuts from stick, blade, or puck",
        prevention: ["Protective equipment", "Proper cage use", "Stick discipline"],
        recovery: "Variable; may need stitches"
      }
    ],
    costBreakdown: {
      recreational: { min: 1000, max: 2500, description: "Equipment, ice time, league fees" },
      competitive: { min: 3000, max: 7000, description: "High-end equipment, coaching, travel" }
    },
    coachQuote: {
      text: "Ice hockey teaches speed, teamwork, and mental toughness. The game moves fast; you must think ahead. The best players anticipate what's coming.",
      name: "Coach O'Brien",
      title: "Youth Hockey Coach"
    },
    collegeOpportunityPercent: 3,
    videoEmbedLink: "https://www.youtube.com/embed/cP6PqfSs6k4"
  },

  // ============================================================================
  // GYMNASTICS & DANCE SPORTS
  // ============================================================================

  gymnastics: {
    id: "gymnastics",
    name: "Gymnastics",
    emoji: "🤸",
    rules: "Gymnasts perform acrobatic movements on apparatus (floor, beam, bars, vault). Judges score based on difficulty and execution (0-10 scale). Competitors attempt highest scores.",
    equipment: ["Leotard", "Gymnastics mat/padding", "Balance beam", "Bars", "Vault table", "Grips", "Chalk"],
    seasonStructure: {
      seasonType: "year-round",
      duration: "Training year-round; competition November - April",
      peakMonth: "February"
    },
    commonInjuries: [
      {
        name: "Wrist Injuries",
        description: "Sprains and fractures from impacts",
        prevention: ["Wrist strengthening", "Proper landing", "Wrist guards", "Gradual progression"],
        recovery: "2-8 weeks depending on severity"
      },
      {
        name: "Knee Injuries",
        description: "Strain from landing impacts",
        prevention: ["Knee strengthening", "Proper landing", "Gradual progression", "Adequate padding"],
        recovery: "2-12 weeks depending on severity"
      },
      {
        name: "Shoulder Injuries",
        description: "Dislocation or cuff strain from bars",
        prevention: ["Shoulder strengthening", "Proper technique", "Core stability", "Spotting"],
        recovery: "2-12 weeks depending on severity"
      },
      {
        name: "Head/Neck Injuries",
        description: "Concussion or neck strain from falls",
        prevention: ["Proper spotting", "Gradual progression", "Adequate padding", "Neck strengthening"],
        recovery: "Medical evaluation; return-to-training protocol"
      }
    ],
    costBreakdown: {
      recreational: { min: 400, max: 1000, description: "Gym membership and classes" },
      competitive: { min: 2000, max: 6000, description: "Elite gym membership and coaching" }
    },
    coachQuote: {
      text: "Gymnastics builds incredible confidence. When kids land a move they've worked toward, the joy is real. They learn they can do hard things.",
      name: "Coach Svetlana",
      title: "Gymnastics Coach"
    },
    collegeOpportunityPercent: 2,
    videoEmbedLink: "https://www.youtube.com/embed/fHEuqQpPt7k"
  },

  dance: {
    id: "dance",
    name: "Dance",
    emoji: "💃",
    rules: "Dancers perform choreographed routines judged on technique, expression, and execution. Styles include ballet, modern, hip-hop, jazz. Scores based on artistic quality and difficulty.",
    equipment: ["Dance costumes", "Dance shoes (varies by style)", "Dance floor", "Music system", "Mirrors"],
    seasonStructure: {
      seasonType: "year-round",
      duration: "Continuous training; competition year-round",
      peakMonth: "Varies by organization"
    },
    commonInjuries: [
      {
        name: "Ankle Sprains",
        description: "From pivoting or impacts",
        prevention: ["Ankle strengthening", "Proper shoes", "Dynamic warm-up", "Gradual progression"],
        recovery: "1-6 weeks recovery"
      },
      {
        name: "Knee Injuries",
        description: "Strain from jumps and repetitive moves",
        prevention: ["Knee strengthening", "Flexibility", "Proper technique", "Adequate rest"],
        recovery: "2-8 weeks depending on severity"
      },
      {
        name: "Hip and Groin Strain",
        description: "From leg extensions",
        prevention: ["Hip flexibility", "Gradual progression", "Stretching", "Strength training"],
        recovery: "2-6 weeks recovery"
      },
      {
        name: "Back Strain",
        description: "From extension and arching",
        prevention: ["Core strengthening", "Flexibility", "Proper alignment", "Adequate rest"],
        recovery: "2-6 weeks with PT"
      }
    ],
    costBreakdown: {
      recreational: { min: 300, max: 800, description: "Dance classes and studio time" },
      competitive: { min: 1500, max: 4000, description: "Private coaching, costumes, travel" }
    },
    coachQuote: {
      text: "Dance is about expressing yourself through movement. It teaches discipline, creativity, and teamwork. Every performance tells a story.",
      name: "Choreographer Chen",
      title: "Dance Director"
    },
    collegeOpportunityPercent: 1,
    videoEmbedLink: "https://www.youtube.com/embed/7-M5eAqwkC0"
  },

  cheerleading: {
    id: "cheerleading",
    name: "Cheerleading",
    emoji: "📣",
    rules: "Cheerleaders perform choreographed routines with stunts, tumbling, and chants, usually supporting athletic teams. Competition judged on execution, difficulty, and performance. Routines typically 2-3 minutes.",
    equipment: ["Uniform", "Cheerleading shoes", "Hair bows", "Pom-poms", "Mats", "Studs/grips"],
    seasonStructure: {
      seasonType: "fall",
      duration: "August - March",
      peakMonth: "January-February"
    },
    commonInjuries: [
      {
        name: "Ankle Sprains",
        description: "From stunting or jumping",
        prevention: ["Ankle strengthening", "Proper footwear", "Dynamic warm-up", "Spotting"],
        recovery: "1-6 weeks recovery"
      },
      {
        name: "Knee Injuries",
        description: "From jumping and stunting",
        prevention: ["Knee strengthening", "Flexibility", "Proper landing", "Adequate rest"],
        recovery: "2-8 weeks depending on severity"
      },
      {
        name: "Shoulder Injuries",
        description: "From stunting",
        prevention: ["Shoulder strengthening", "Proper spotting", "Proper technique", "Core stability"],
        recovery: "2-12 weeks depending on severity"
      },
      {
        name: "Concussion",
        description: "From falls or stunt collision",
        prevention: ["Proper spotting", "Gradual progression", "Neck strengthening", "Padding"],
        recovery: "Medical evaluation; 7-14 day return-to-activity"
      }
    ],
    costBreakdown: {
      recreational: { min: 300, max: 800, description: "School cheer squad" },
      competitive: { min: 1500, max: 4000, description: "All-star team with coaching" }
    },
    coachQuote: {
      text: "Cheerleading teaches teamwork at the highest level. You're trusting teammates with your body. Building that trust and executing perfect routines creates bonds that last.",
      name: "Coach Williams",
      title: "Cheer Coach"
    },
    collegeOpportunityPercent: 0.5,
    videoEmbedLink: "https://www.youtube.com/embed/qMwv0Jf0NXI"
  },

  // ============================================================================
  // ADDITIONAL SPORTS (abbreviated format for remaining sports)
  // ============================================================================

  "rock-climbing": {
    id: "rock-climbing",
    name: "Rock Climbing",
    emoji: "🧗",
    rules: "Climbers ascend artificial walls or natural rock. Indoor competitions involve speed races, difficult climbs, or traversals. Routes labeled by difficulty grade.",
    equipment: ["Climbing shoes", "Harness", "Carabiners", "Rope", "Belay device", "Chalk", "Helmet", "Crash pads"],
    seasonStructure: {
      seasonType: "year-round",
      duration: "Indoor year-round; outdoor seasonal",
      peakMonth: "Varies by location"
    },
    commonInjuries: [
      {
        name: "Finger and Hand Injuries",
        description: "Tendon strain, pulley injuries",
        prevention: ["Proper warm-up", "Finger taping", "Gradual progression", "Rest days"],
        recovery: "2-12 weeks; some need surgery"
      },
      {
        name: "Shoulder Impingement",
        description: "Rotator cuff strain",
        prevention: ["Shoulder strengthening", "Flexibility", "Proper technique", "Adequate rest"],
        recovery: "2-8 weeks recovery"
      },
      {
        name: "Knee Injuries",
        description: "From improper positioning",
        prevention: ["Proper footwork", "Knee strengthening", "Flexibility", "Technique"],
        recovery: "2-6 weeks recovery"
      }
    ],
    costBreakdown: {
      recreational: { min: 300, max: 800, description: "Indoor gym membership" },
      competitive: { min: 1000, max: 3000, description: "Premium gym, coaching" }
    },
    coachQuote: {
      text: "Climbing is problem-solving with your body. Every route is unique. It teaches persistence, strategy, and respect for your limits.",
      name: "Coach Palmer",
      title: "Climbing Coach"
    },
    collegeOpportunityPercent: 0,
    videoEmbedLink: "https://www.youtube.com/embed/oDGPZL46Gkk"
  },

  cycling: {
    id: "cycling",
    name: "Cycling",
    emoji: "🚴",
    rules: "Cyclists race on road or mountain bikes in events like races, time trials, cross-country. Winners determined by fastest time over distance/course.",
    equipment: ["Bicycle", "Helmet", "Cycling shoes", "Jersey and shorts", "Gloves", "Sunglasses", "Water bottle"],
    seasonStructure: {
      seasonType: "spring",
      duration: "March - October",
      peakMonth: "June and September"
    },
    commonInjuries: [
      {
        name: "Knee Pain",
        description: "Overuse from repetitive pedaling",
        prevention: ["Proper bike fit", "Gradual mileage increase", "Flexibility", "Strength"],
        recovery: "2-6 weeks rest from cycling"
      },
      {
        name: "Lower Back Pain",
        description: "Strain from cycling posture",
        prevention: ["Proper bike fit", "Core strengthening", "Flexibility", "Posture"],
        recovery: "2-6 weeks recovery"
      },
      {
        name: "Road Rash",
        description: "Skin abrasions from falls",
        prevention: ["Protective gear", "Defensive riding", "Road awareness", "Speed control"],
        recovery: "1-4 weeks healing"
      }
    ],
    costBreakdown: {
      recreational: { min: 500, max: 1500, description: "Basic bike and equipment" },
      competitive: { min: 2000, max: 6000, description: "High-end bike and race fees" }
    },
    coachQuote: {
      text: "Cycling teaches persistence and mental toughness. You're fighting wind, hills, and yourself. The best cyclists suffer well and keep pushing.",
      name: "Coach Rivera",
      title: "Cycling Coach"
    },
    collegeOpportunityPercent: 1,
    videoEmbedLink: "https://www.youtube.com/embed/tUnhQkh39fY"
  },

  triathlon: {
    id: "triathlon",
    name: "Triathlon",
    emoji: "🏊",
    rules: "Athletes compete in swimming, cycling, running sequentially. Fastest combined time wins. Standard distances are sprint or Olympic.",
    equipment: ["Swimsuit, goggles", "Bicycle, shoes, helmet", "Running shoes", "Triathlon suit", "Water bottles", "Wetsuit"],
    seasonStructure: {
      seasonType: "spring",
      duration: "April - September",
      peakMonth: "June and August"
    },
    commonInjuries: [
      {
        name: "Overuse Injuries",
        description: "From training multiple sports",
        prevention: ["Gradual progression", "Cross-training balance", "Recovery days", "Strength training"],
        recovery: "2-12 weeks depending on injury"
      },
      {
        name: "Runner's Knee",
        description: "From running portion",
        prevention: ["Proper running form", "Knee strengthening", "Gradual increases", "Recovery"],
        recovery: "2-8 weeks recovery"
      },
      {
        name: "Shoulder Impingement",
        description: "From swimming",
        prevention: ["Proper technique", "Shoulder strengthening", "Flexibility", "Rest days"],
        recovery: "2-12 weeks recovery"
      }
    ],
    costBreakdown: {
      recreational: { min: 1000, max: 2500, description: "Equipment and race entry" },
      competitive: { min: 3000, max: 7000, description: "High-end equipment, coaching, travel" }
    },
    coachQuote: {
      text: "Triathlon is about balance - three sports, energy management, and pacing. It teaches holistic fitness and mental resilience.",
      name: "Coach Kumar",
      title: "Triathlon Coach"
    },
    collegeOpportunityPercent: 0,
    videoEmbedLink: "https://www.youtube.com/embed/GvGmDzFbXPw"
  },

  skateboarding: {
    id: "skateboarding",
    name: "Skateboarding",
    emoji: "🛹",
    rules: "Skateboarders perform tricks judged on creativity, difficulty, and style. Street involves obstacle courses; park uses ramps and bowls.",
    equipment: ["Skateboard", "Safety pads", "Helmet", "Skating shoes", "Grip tape"],
    seasonStructure: {
      seasonType: "year-round",
      duration: "Spring/fall outdoor seasons",
      peakMonth: "June and September"
    },
    commonInjuries: [
      {
        name: "Wrist Fractures",
        description: "From falls",
        prevention: ["Wrist guards", "Proper falling", "Gradual progression", "Control focus"],
        recovery: "4-8 weeks with bracing"
      },
      {
        name: "Ankle Injuries",
        description: "From impacts",
        prevention: ["Ankle strengthening", "Proper footwear", "Gradual progression", "Protective gear"],
        recovery: "2-8 weeks recovery"
      },
      {
        name: "Concussion",
        description: "From falls",
        prevention: ["Proper helmet", "Skill-appropriate terrain", "Safety mentality"],
        recovery: "Medical evaluation; 7-14 day return-to-skating"
      }
    ],
    costBreakdown: {
      recreational: { min: 150, max: 400, description: "Basic skateboard and gear" },
      competitive: { min: 500, max: 1500, description: "Premium board and travel" }
    },
    coachQuote: {
      text: "Skateboarding is about self-expression and progression. You set your goals and push at your pace. The community supports everyone landing their next trick.",
      name: "Coach Taylor",
      title: "Skateboarding Instructor"
    },
    collegeOpportunityPercent: 0,
    videoEmbedLink: "https://www.youtube.com/embed/VSWQUI5cYEw"
  },

  "ultimate-frisbee": {
    id: "ultimate-frisbee",
    name: "Ultimate Frisbee",
    emoji: "🥏",
    rules: "Two teams of seven throw a frisbee advancing toward end zone to score. Non-contact; self-refereed. Fastest hands and field awareness win.",
    equipment: ["Frisbee/disc", "Athletic clothing", "Running shoes", "Cones"],
    seasonStructure: {
      seasonType: "spring",
      duration: "March - June; fall varies",
      peakMonth: "May"
    },
    commonInjuries: [
      {
        name: "Ankle Sprain",
        description: "From cutting and direction changes",
        prevention: ["Ankle strengthening", "Dynamic warm-up", "Proper footwear", "Agility training"],
        recovery: "1-6 weeks recovery"
      },
      {
        name: "Shoulder Strain",
        description: "From throwing",
        prevention: ["Proper throwing mechanics", "Shoulder strengthening", "Adequate warm-up"],
        recovery: "2-8 weeks recovery"
      },
      {
        name: "Knee Injuries",
        description: "From running and cutting",
        prevention: ["Knee strengthening", "Proper footwear", "Dynamic warm-up", "Conditioning"],
        recovery: "2-8 weeks recovery"
      }
    ],
    costBreakdown: {
      recreational: { min: 50, max: 300, description: "Frisbee and basic equipment" },
      competitive: { min: 400, max: 1500, description: "Team fees and tournament entries" }
    },
    coachQuote: {
      text: "Ultimate teaches that sports can be competitive, fun, and self-policing. It's built on integrity and respect. Play hard but play with honor.",
      name: "Coach Anderson",
      title: "Ultimate Frisbee Coach"
    },
    collegeOpportunityPercent: 0,
    videoEmbedLink: "https://www.youtube.com/embed/fqT-1DGCF0Y"
  },

  archery: {
    id: "archery",
    name: "Archery",
    emoji: "🏹",
    rules: "Archers shoot arrows at targets from set distance, scoring points on accuracy. Events include target archery, field archery, 3D. Higher accuracy = higher score.",
    equipment: ["Bow", "Arrows", "Quiver", "Finger tab/glove", "Arm guard", "Target stand"],
    seasonStructure: {
      seasonType: "year-round",
      duration: "Spring/fall primary",
      peakMonth: "May and September"
    },
    commonInjuries: [
      {
        name: "Forearm Strain",
        description: "From drawing bow",
        prevention: ["Proper form", "Wrist/forearm strengthening", "Gradual increase", "Rest days"],
        recovery: "2-6 weeks recovery"
      },
      {
        name: "Shoulder Injury",
        description: "From repetitive drawing",
        prevention: ["Shoulder strengthening", "Flexibility", "Proper form", "Adequate warm-up"],
        recovery: "2-8 weeks recovery"
      },
      {
        name: "Back Strain",
        description: "From posture",
        prevention: ["Proper stance", "Core strengthening", "Flexibility", "Gradual progression"],
        recovery: "2-6 weeks recovery"
      }
    ],
    costBreakdown: {
      recreational: { min: 300, max: 800, description: "Entry-level bow and arrows" },
      competitive: { min: 1500, max: 4000, description: "Premium bow and competition fees" }
    },
    coachQuote: {
      text: "Archery is about focus, discipline, and consistency. Every shot requires 100% concentration. Small improvements in technique lead to big score improvements.",
      name: "Coach Wei",
      title: "Archery Coach"
    },
    collegeOpportunityPercent: 0,
    videoEmbedLink: "https://www.youtube.com/embed/FWCzTEDHEwE"
  },

  "flag-football": {
    id: "flag-football",
    name: "Flag Football",
    emoji: "🏈",
    rules: "Like football but without tackling. Defensive players remove flags from ball carrier's waist. Non-contact version for accessible play.",
    equipment: ["Football", "Flag belt", "Cleats", "Jersey and pants", "Cones"],
    seasonStructure: {
      seasonType: "fall",
      duration: "August - October",
      peakMonth: "September"
    },
    commonInjuries: [
      {
        name: "Ankle Sprain",
        description: "From cutting and lateral movement",
        prevention: ["Ankle strengthening", "Proper footwear", "Dynamic warm-up", "Agility"],
        recovery: "1-4 weeks recovery"
      },
      {
        name: "Knee Injuries",
        description: "From cutting",
        prevention: ["Knee strengthening", "Dynamic warm-up", "Proper footwear", "Conditioning"],
        recovery: "1-6 weeks recovery"
      },
      {
        name: "Muscle Strains",
        description: "Hamstring or groin",
        prevention: ["Dynamic stretching", "Flexibility", "Strength", "Gradual progression"],
        recovery: "1-4 weeks recovery"
      }
    ],
    costBreakdown: {
      recreational: { min: 150, max: 400, description: "Park district flag football" },
      competitive: { min: 500, max: 1500, description: "Competitive club play" }
    },
    coachQuote: {
      text: "Flag football teaches strategy without collision risk. It's fast-paced and inclusive. It shows that football is about smarts and teamwork.",
      name: "Coach Jackson",
      title: "Flag Football Coach"
    },
    collegeOpportunityPercent: 0,
    videoEmbedLink: "https://www.youtube.com/embed/0qQ_ZzD8m_w"
  },

  pickleball: {
    id: "pickleball",
    name: "Pickleball",
    emoji: "🎾",
    rules: "Two-four players on a small court using solid paddles and perforated ball over low net. Scoring to 11 (must win by 2). Non-volley zone ('kitchen') prevents aggressive net play.",
    equipment: ["Pickleball paddle", "Pickleball", "Pickleball shoes", "Court", "Net"],
    seasonStructure: {
      seasonType: "year-round",
      duration: "Spring, summer, fall seasons",
      peakMonth: "April and October"
    },
    commonInjuries: [
      {
        name: "Ankle Sprain",
        description: "From lateral movement",
        prevention: ["Ankle strengthening", "Proper footwear", "Dynamic warm-up", "Balance"],
        recovery: "1-4 weeks recovery"
      },
      {
        name: "Knee Injuries",
        description: "From lateral movement",
        prevention: ["Knee strengthening", "Dynamic warm-up", "Proper footwear", "Agility"],
        recovery: "1-6 weeks recovery"
      },
      {
        name: "Shoulder Strain",
        description: "From paddle swings",
        prevention: ["Proper technique", "Shoulder strengthening", "Warm-up", "Rest days"],
        recovery: "2-6 weeks recovery"
      }
    ],
    costBreakdown: {
      recreational: { min: 150, max: 500, description: "Paddle and court access" },
      competitive: { min: 800, max: 2000, description: "Premium paddle and tournament fees" }
    },
    coachQuote: {
      text: "Pickleball is addictive because it's accessible and fun. Competitive pickleball teaches strategy and finesse. It's a game for everyone.",
      name: "Coach Hayes",
      title: "Pickleball Pro"
    },
    collegeOpportunityPercent: 0,
    videoEmbedLink: "https://www.youtube.com/embed/0VAyc1L1n1Y"
  },

  badminton: {
    id: "badminton",
    name: "Badminton",
    emoji: "🏸",
    rules: "Two-four players hit a shuttlecock over a net, attempting to land on opponent's side. Scoring to 21 (must win by 2). Points awarded only to serving team.",
    equipment: ["Badminton racket", "Shuttlecock", "Badminton shoes", "Athletic attire", "Net and posts"],
    seasonStructure: {
      seasonType: "year-round",
      duration: "Spring and fall primary",
      peakMonth: "April and October"
    },
    commonInjuries: [
      {
        name: "Ankle Sprain",
        description: "From rapid lateral movement",
        prevention: ["Ankle strengthening", "Proprioception", "Proper footwear", "Dynamic warm-up"],
        recovery: "1-4 weeks recovery"
      },
      {
        name: "Knee Injuries",
        description: "From lunges and lateral movement",
        prevention: ["Knee strengthening", "Proper footwear", "Dynamic warm-up", "Agility"],
        recovery: "1-6 weeks recovery"
      },
      {
        name: "Badminton Elbow",
        description: "Lateral epicondylitis from overhead shots",
        prevention: ["Proper technique", "Elbow strengthening", "Flexibility", "Adequate rest"],
        recovery: "2-6 weeks recovery"
      }
    ],
    costBreakdown: {
      recreational: { min: 100, max: 300, description: "Basic racket and shuttles" },
      competitive: { min: 500, max: 1500, description: "Premium racket and competition" }
    },
    coachQuote: {
      text: "Badminton is the fastest racket sport. It requires explosive power and quick reflexes. Winners anticipate and adjust fastest.",
      name: "Coach Lee",
      title: "Badminton Coach"
    },
    collegeOpportunityPercent: 0,
    videoEmbedLink: "https://www.youtube.com/embed/TqFIlLkC3qM"
  },

  squash: {
    id: "squash",
    name: "Squash",
    emoji: "🎯",
    rules: "Two players hit a small ball against a front wall using rackets, attempting unreturnable shots. Scoring to 11 points (win by 2). Non-volley zone affects strategy.",
    equipment: ["Squash racket", "Squash ball", "Squash shoes", "Eye goggles", "Squash court"],
    seasonStructure: {
      seasonType: "year-round",
      duration: "Fall and spring primary",
      peakMonth: "October and April"
    },
    commonInjuries: [
      {
        name: "Eye Injuries",
        description: "Impact from ball or racket",
        prevention: ["Protective eyewear", "Court awareness", "Controlled play"],
        recovery: "Variable; may need medical attention"
      },
      {
        name: "Ankle Sprain",
        description: "From rapid movement",
        prevention: ["Ankle strengthening", "Proper footwear", "Dynamic warm-up", "Balance"],
        recovery: "1-4 weeks recovery"
      },
      {
        name: "Knee Injuries",
        description: "From lateral movement",
        prevention: ["Knee strengthening", "Proper footwear", "Dynamic warm-up", "Agility"],
        recovery: "1-6 weeks recovery"
      },
      {
        name: "Arm Overuse",
        description: "Racket arm fatigue/strain",
        prevention: ["Proper technique", "Arm strengthening", "Flexibility", "Adequate rest"],
        recovery: "2-8 weeks recovery"
      }
    ],
    costBreakdown: {
      recreational: { min: 200, max: 600, description: "Court fees and basic racket" },
      competitive: { min: 800, max: 2000, description: "Premium racket and competition" }
    },
    coachQuote: {
      text: "Squash is precision and power. You're not just hitting hard; you're placing it exactly where opponent can't reach. It requires intelligence and dedication.",
      name: "Coach Patel",
      title: "Squash Coach"
    },
    collegeOpportunityPercent: 0,
    videoEmbedLink: "https://www.youtube.com/embed/g4j-TZ6TpWc"
  },

  "field-hockey": {
    id: "field-hockey",
    name: "Field Hockey",
    emoji: "🏑",
    rules: "Two teams of 11 use sticks to move ball into opposing goal. Ball control via stick only. Games consist of two 35-minute halves. Physical checking limited.",
    equipment: ["Field hockey stick", "Hockey ball", "Protective goggles", "Cleats", "Jersey and shorts", "Shin guards"],
    seasonStructure: {
      seasonType: "fall",
      duration: "August - November",
      peakMonth: "October"
    },
    commonInjuries: [
      {
        name: "Eye/Face Injuries",
        description: "From stick or ball impact",
        prevention: ["Protective goggles", "Controlled play", "Proper stick handling"],
        recovery: "Variable; may need medical attention"
      },
      {
        name: "Ankle Sprain",
        description: "From cutting and pivoting",
        prevention: ["Ankle strengthening", "Proper footwear", "Dynamic warm-up", "Agility"],
        recovery: "1-4 weeks recovery"
      },
      {
        name: "Knee Injuries",
        description: "From lateral movement",
        prevention: ["Knee strengthening", "Proper footwear", "Dynamic warm-up", "Agility"],
        recovery: "2-8 weeks depending on severity"
      },
      {
        name: "Shin Splints",
        description: "From running on field",
        prevention: ["Proper footwear", "Gradual increase", "Calf strengthening", "Recovery"],
        recovery: "2-6 weeks recovery"
      }
    ],
    costBreakdown: {
      recreational: { min: 300, max: 800, description: "School/park district hockey" },
      competitive: { min: 1200, max: 3000, description: "Club team with coaching" }
    },
    coachQuote: {
      text: "Field hockey is fast and dynamic. It teaches quick thinking and stick skills. The best players make the game look easy because they've mastered fundamentals.",
      name: "Coach Morgan",
      title: "Field Hockey Coach"
    },
    collegeOpportunityPercent: 1,
    videoEmbedLink: "https://www.youtube.com/embed/RrvPVsIlqgE"
  },

  "figure-skating": {
    id: "figure-skating",
    name: "Figure Skating",
    emoji: "⛸️",
    rules: "Skaters perform choreographed routines on ice, judged on technical skills (jumps, spins) and artistic expression. Individual or pair competition. Scores based on difficulty and execution.",
    equipment: ["Figure skates", "Skating costumes", "Socks", "Training pads", "Ice rink"],
    seasonStructure: {
      seasonType: "winter",
      duration: "Year-round training; competition September - March",
      peakMonth: "February"
    },
    commonInjuries: [
      {
        name: "Ankle Injuries",
        description: "From jumps or falls",
        prevention: ["Ankle strengthening", "Proper skate fit", "Progressive training", "Technique"],
        recovery: "2-8 weeks recovery"
      },
      {
        name: "Knee Injuries",
        description: "From jumping and spinning",
        prevention: ["Knee strengthening", "Flexibility", "Proper alignment", "Core strength"],
        recovery: "2-12 weeks depending on severity"
      },
      {
        name: "Hip/Back Strain",
        description: "From spins and flexibility demands",
        prevention: ["Hip flexibility", "Core strengthening", "Progressive training", "Technique"],
        recovery: "2-6 weeks recovery"
      },
      {
        name: "Concussion",
        description: "From falls",
        prevention: ["Proper falling", "Progressive skill", "Neck strengthening", "Controlled environment"],
        recovery: "Medical evaluation; 7-14 day return-to-skating"
      }
    ],
    costBreakdown: {
      recreational: { min: 800, max: 2000, description: "Lessons and ice time" },
      competitive: { min: 3000, max: 8000, description: "Elite coaching and competition" }
    },
    coachQuote: {
      text: "Figure skating is art on ice. It combines athletic power with artistic expression. It requires dedication, flexibility, and courage to fall and get back up.",
      name: "Coach Volkov",
      title: "Figure Skating Coach"
    },
    collegeOpportunityPercent: 0.5,
    videoEmbedLink: "https://www.youtube.com/embed/9VLYjx1D8k0"
  },

  equestrian: {
    id: "equestrian",
    name: "Equestrian",
    emoji: "🐴",
    rules: "Riders compete on horseback in jumping (hunter/jumper), dressage (classical riding), or eventing. Judged on horsemanship, technique, and horse-rider harmony.",
    equipment: ["Horse", "Saddle", "Bridle", "Helmet", "Riding boots", "Riding outfit", "Protective vest"],
    seasonStructure: {
      seasonType: "spring",
      duration: "April - October",
      peakMonth: "June and August"
    },
    commonInjuries: [
      {
        name: "Head/Neck Injuries",
        description: "From falls",
        prevention: ["Proper helmet fit", "Safety vest", "Horsemanship training", "Appropriate horse"],
        recovery: "Medical evaluation; 7-14+ day return-to-riding"
      },
      {
        name: "Wrist/Hand Injuries",
        description: "Fractures from falls",
        prevention: ["Protective gloves", "Proper falling", "Hand strengthening", "Safety vest"],
        recovery: "4-8 weeks for fractures"
      },
      {
        name: "Hip/Pelvic Injuries",
        description: "From falls",
        prevention: ["Protective padding", "Proper dismounting", "Horsemanship", "Safety equipment"],
        recovery: "4-12 weeks depending on severity"
      },
      {
        name: "Back Injuries",
        description: "From falls or riding mechanics",
        prevention: ["Proper posture", "Core strengthening", "Protective vest", "Flexibility"],
        recovery: "2-12 weeks recovery"
      }
    ],
    costBreakdown: {
      recreational: { min: 1000, max: 3000, description: "Lessons and stable fees" },
      competitive: { min: 3000, max: 10000, description: "Horse ownership, coaching, travel" }
    },
    coachQuote: {
      text: "Equestrian is a partnership. You're developing a relationship with a horse based on trust and communication. It teaches respect, patience, and horsemanship.",
      name: "Coach Richardson",
      title: "Equestrian Instructor"
    },
    collegeOpportunityPercent: 1,
    videoEmbedLink: "https://www.youtube.com/embed/m0cOXtm13qY"
  },

  fencing: {
    id: "fencing",
    name: "Fencing",
    emoji: "🤺",
    rules: "Two fencers duel with swords (épée, foil, sabre), attempting to touch opponent's body. First to 15 points (5 in team matches) wins. Weapon-specific scoring rules.",
    equipment: ["Fencing weapon", "Mask", "Jacket", "Glove", "Pants", "Socks and shoes", "Chest protector"],
    seasonStructure: {
      seasonType: "year-round",
      duration: "Fall and spring primary",
      peakMonth: "March and November"
    },
    commonInjuries: [
      {
        name: "Hand/Finger Injuries",
        description: "Cuts or contusions from blade",
        prevention: ["Glove fit", "Protective positioning", "Controlled practice"],
        recovery: "1-4 weeks depending on severity"
      },
      {
        name: "Knee Injuries",
        description: "From lunging and footwork",
        prevention: ["Knee strengthening", "Proper technique", "Dynamic warm-up", "Flexibility"],
        recovery: "2-8 weeks recovery"
      },
      {
        name: "Ankle Sprain",
        description: "From lateral movement",
        prevention: ["Ankle strengthening", "Balance training", "Proper footwear", "Dynamic warm-up"],
        recovery: "1-4 weeks recovery"
      },
      {
        name: "Groin Strain",
        description: "From lunging",
        prevention: ["Hip/groin flexibility", "Eccentric strengthening", "Proper technique", "Gradual increases"],
        recovery: "2-6 weeks recovery"
      }
    ],
    costBreakdown: {
      recreational: { min: 400, max: 1000, description: "Club membership and equipment" },
      competitive: { min: 1500, max: 4000, description: "Premium equipment and travel" }
    },
    coachQuote: {
      text: "Fencing is chess at high speed. You think three moves ahead, read opponents, execute precisely. It teaches tactical thinking and staying calm under pressure.",
      name: "Coach Dubois",
      title: "Fencing Coach"
    },
    collegeOpportunityPercent: 0.5,
    videoEmbedLink: "https://www.youtube.com/embed/JxljMg8nTWQ"
  },

  "table-tennis": {
    id: "table-tennis",
    name: "Table Tennis",
    emoji: "🏓",
    rules: "Two-four players hit a small plastic ball over a net on a table. Points scored when opponent fails to return. Serving rotates every 2 points. First to 11 (by 2) wins.",
    equipment: ["Ping pong paddle", "Ping pong ball", "Ping pong table", "Net", "Athletic shoes"],
    seasonStructure: {
      seasonType: "year-round",
      duration: "Fall and spring primary",
      peakMonth: "April and November"
    },
    commonInjuries: [
      {
        name: "Elbow Injury",
        description: "Lateral epicondylitis from swinging",
        prevention: ["Proper technique", "Elbow strengthening", "Flexibility", "Warm-up and rest"],
        recovery: "2-6 weeks recovery"
      },
      {
        name: "Wrist Injury",
        description: "From repetitive hitting",
        prevention: ["Wrist strengthening", "Proper grip", "Support/bracing", "Gradual increases"],
        recovery: "1-4 weeks recovery"
      },
      {
        name: "Shoulder Strain",
        description: "From repetitive motion",
        prevention: ["Shoulder strengthening", "Flexibility", "Proper technique", "Rest days"],
        recovery: "2-8 weeks recovery"
      },
      {
        name: "Ankle/Knee Strain",
        description: "From rapid footwork",
        prevention: ["Ankle/knee strengthening", "Proper footwear", "Dynamic warm-up", "Balance"],
        recovery: "1-6 weeks recovery"
      }
    ],
    costBreakdown: {
      recreational: { min: 50, max: 300, description: "Basic paddle and table access" },
      competitive: { min: 400, max: 1500, description: "Premium paddle and tournament fees" }
    },
    coachQuote: {
      text: "Table tennis requires massive speed despite the small table. It teaches quick reactions and spin control. The ability to read opponent instantly is key.",
      name: "Coach Zhang",
      title: "Table Tennis Coach"
    },
    collegeOpportunityPercent: 0,
    videoEmbedLink: "https://www.youtube.com/embed/y6sOz6zZy2k"
  },

  "cross-country-skiing": {
    id: "cross-country-skiing",
    name: "Cross Country Skiing",
    emoji: "⛷️",
    rules: "Skiers race on groomed trails using skating or classic technique. Races range sprint to marathon. Fastest time wins. Terrain/snow conditions vary seasonally.",
    equipment: ["Cross country skis", "Ski boots", "Ski poles", "Skiing suit", "Insulated layers", "Gloves and hat"],
    seasonStructure: {
      seasonType: "winter",
      duration: "December - March",
      peakMonth: "February"
    },
    commonInjuries: [
      {
        name: "Hip Flexor Strain",
        description: "From repetitive skiing motion",
        prevention: ["Hip flexibility", "Gradual progression", "Proper technique", "Adequate warm-up"],
        recovery: "2-6 weeks recovery"
      },
      {
        name: "Knee Injuries",
        description: "From repetitive motion",
        prevention: ["Knee strengthening", "Flexibility", "Proper technique", "Adequate recovery"],
        recovery: "2-8 weeks recovery"
      },
      {
        name: "Lower Back Strain",
        description: "From bent-over posture",
        prevention: ["Core strengthening", "Flexibility", "Proper technique", "Ergonomic positioning"],
        recovery: "2-6 weeks recovery"
      }
    ],
    costBreakdown: {
      recreational: { min: 400, max: 1200, description: "Equipment and trail passes" },
      competitive: { min: 1500, max: 4000, description: "High-end skis and coaching" }
    },
    coachQuote: {
      text: "Cross country skiing is pure endurance. You're fighting snow, wind, and fatigue. The beauty is finding your rhythm and maintaining pace.",
      name: "Coach Bjornsson",
      title: "Cross Country Skiing Coach"
    },
    collegeOpportunityPercent: 1,
    videoEmbedLink: "https://www.youtube.com/embed/bfSPNkN7c8Q"
  },

  bmx: {
    id: "bmx",
    name: "BMX",
    emoji: "🚲",
    rules: "BMX racing on dirt courses; freestyle involves trick performances. Racing determined by fastest time; freestyle judged on difficulty and style.",
    equipment: ["BMX bicycle", "Helmet", "Protective pads", "Cycling shoes", "Jersey and pants", "Gloves", "Track/park"],
    seasonStructure: {
      seasonType: "spring",
      duration: "March - October",
      peakMonth: "June and August"
    },
    commonInjuries: [
      {
        name: "Wrist Fractures",
        description: "From falls",
        prevention: ["Wrist guards", "Proper falling", "Gradual progression", "Protective padding"],
        recovery: "4-8 weeks with bracing"
      },
      {
        name: "Ankle/Foot Injuries",
        description: "From falls",
        prevention: ["Proper footwear", "Ankle strengthening", "Balance training", "Protective gear"],
        recovery: "2-8 weeks recovery"
      },
      {
        name: "Road Rash",
        description: "Skin abrasions from falls",
        prevention: ["Full protective gear", "Skill progression", "Smooth surfaces for learning"],
        recovery: "1-4 weeks healing"
      },
      {
        name: "Concussion",
        description: "From falls",
        prevention: ["Proper helmet", "Safety training", "Skill-appropriate challenges"],
        recovery: "Medical evaluation; 7-14 day return-to-riding"
      }
    ],
    costBreakdown: {
      recreational: { min: 200, max: 600, description: "BMX bike and protective gear" },
      competitive: { min: 800, max: 2500, description: "Premium bike and race fees" }
    },
    coachQuote: {
      text: "BMX racing is all about heart and grit. You're battling other riders and yourself. It teaches toughness and never giving up.",
      name: "Coach Torres",
      title: "BMX Coach"
    },
    collegeOpportunityPercent: 0,
    videoEmbedLink: "https://www.youtube.com/embed/iXt_4VCHBzQ"
  }
};

/**
 * Helper functions
 */
export function getSport101(sportId: string): Sport101Entry | undefined {
  return COMPLETE_SPORT_101[sportId];
}

export function getAllSports101(): Sport101Entry[] {
  return Object.values(COMPLETE_SPORT_101);
}

export function getDocumentedSportIds(): string[] {
  return Object.keys(COMPLETE_SPORT_101);
}

export function getSport101Count(): number {
  return Object.keys(COMPLETE_SPORT_101).length;
}
