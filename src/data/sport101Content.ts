export interface Sport101Content {
  id: string;
  name: string;
  emoji: string;
  quickRundown: {
    duration: string;
    playersPerSide: string;
    season: string;
    typicalAgeToStart: string;
  };
  howItWorks: string;
  keySkills: string[];
  equipment: { name: string; cost: string }[];
  seasonStructure: string;
  commonInjuries: {
    injury: string;
    prevention: string;
    recovery: string;
  }[];
  costs: {
    recreational: string;
    competitive: string;
    coaching: string;
  };
  coachQuote: string;
  coachName: string;
  videoUrl: string;
  collegeOpportunity: {
    percentReachCollege: number;
    scholarshipsAvailable: boolean;
    investmentToReachCollege: string;
  };
  parentRating: number;
  parentReviewCount: number;
}

export const SPORT_101_CONTENT: Record<string, Sport101Content> = {
  soccer: {
    id: 'soccer',
    name: 'Soccer',
    emoji: '⚽',
    quickRundown: {
      duration: '90 minutes',
      playersPerSide: '11 players',
      season: 'Fall & Spring (varies by region)',
      typicalAgeToStart: '4-6 years'
    },
    howItWorks: 'Soccer is a team sport where two teams of 11 players try to move a ball downfield and score by getting it in the opponent\'s goal. It\'s the world\'s most popular sport and emphasizes teamwork, quick decision-making, and continuous movement.',
    keySkills: [
      'Spatial awareness',
      'Team communication',
      'Lower body strength',
      'Endurance',
      'Quick decision-making'
    ],
    equipment: [
      { name: 'Soccer cleats', cost: '$60-80' },
      { name: 'Shin guards', cost: '$20-30' },
      { name: 'Soccer ball', cost: '$20-30' },
      { name: 'Jersey/shorts', cost: 'Usually provided by team' }
    ],
    seasonStructure: 'Fall season (Aug-Nov) and Spring season (Jan-April). Typical structure: 1-2 practices per week + 1 game per week. Recreational leagues usually have no travel; club teams vary.',
    commonInjuries: [
      {
        injury: 'Ankle sprains',
        prevention: 'Proper warm-up, ankle strengthening exercises, appropriate footwear',
        recovery: '2-4 weeks for mild strain'
      },
      {
        injury: 'Knee injuries',
        prevention: 'Proper technique, core strengthening, hamstring flexibility',
        recovery: '4-8 weeks'
      },
      {
        injury: 'Head trauma',
        prevention: 'Proper heading technique (start teaching at age 10+), neck strengthening',
        recovery: 'Weeks to months'
      }
    ],
    costs: {
      recreational: '$200-400/season',
      competitive: '$2000-4000/season + travel',
      coaching: '$50-100/hour'
    },
    coachQuote: 'I\'ve coached soccer for 15 years. What makes a kid successful isn\'t athleticism—it\'s coachability. Kids who listen, adapt, and work with their teammates thrive.',
    coachName: 'Coach Marco, Santa Barbara Youth Athletics',
    videoUrl: 'https://www.youtube.com/embed/HN2nKR0TYOo',
    collegeOpportunity: {
      percentReachCollege: 2,
      scholarshipsAvailable: true,
      investmentToReachCollege: '$15,000-30,000/year'
    },
    parentRating: 4.6,
    parentReviewCount: 47
  },
  basketball: {
    id: 'basketball',
    name: 'Basketball',
    emoji: '🏀',
    quickRundown: {
      duration: '40 minutes (two 20-min halves)',
      playersPerSide: '5 players',
      season: 'Winter (varies by region)',
      typicalAgeToStart: '5-7 years'
    },
    howItWorks: 'Basketball is a fast-paced team sport where two teams of 5 players try to shoot a ball through an elevated hoop. It emphasizes hand-eye coordination, teamwork, and quick transitions between offense and defense.',
    keySkills: [
      'Hand-eye coordination',
      'Jumping ability',
      'Court awareness',
      'Passing and shooting',
      'Quick footwork'
    ],
    equipment: [
      { name: 'Basketball shoes', cost: '$80-120' },
      { name: 'Basketball (for home practice)', cost: '$25-50' },
      { name: 'Athletic socks', cost: '$10-20' },
      { name: 'Jersey/shorts', cost: 'Usually provided by team' }
    ],
    seasonStructure: 'Winter season (Nov-Mar) typically. Most teams practice 2-3 times per week with 1-2 games per week. Competitive leagues may have tournaments.',
    commonInjuries: [
      {
        injury: 'Ankle sprains',
        prevention: 'Proper warm-up, ankle taping, appropriate footwear with ankle support',
        recovery: '1-3 weeks for mild strain'
      },
      {
        injury: 'Knee injuries',
        prevention: 'Proper landing technique, core strengthening, hamstring flexibility',
        recovery: '2-6 weeks'
      },
      {
        injury: 'Finger/hand injuries',
        prevention: 'Proper catching technique, finger taping if needed',
        recovery: '1-2 weeks'
      }
    ],
    costs: {
      recreational: '$150-350/season',
      competitive: '$1500-3000/season',
      coaching: '$40-80/hour'
    },
    coachQuote: 'Basketball teaches kids resilience. Every possession is a new opportunity. Kids learn to bounce back from mistakes immediately.',
    coachName: 'Coach Jennifer, Santa Barbara Parks & Rec',
    videoUrl: 'https://www.youtube.com/embed/K7xt_dqKAVk',
    collegeOpportunity: {
      percentReachCollege: 1.5,
      scholarshipsAvailable: true,
      investmentToReachCollege: '$12,000-25,000/year'
    },
    parentRating: 4.5,
    parentReviewCount: 38
  },
  swimming: {
    id: 'swimming',
    name: 'Swimming',
    emoji: '🏊',
    quickRundown: {
      duration: '45-90 minutes (practice)',
      playersPerSide: 'Individual sport (team competition)',
      season: 'Year-round (varies by team)',
      typicalAgeToStart: '3-5 years'
    },
    howItWorks: 'Swimming is an individual sport where athletes compete in different strokes (freestyle, backstroke, breaststroke, butterfly) in pools. It\'s one of the best full-body workouts and excellent for all fitness levels.',
    keySkills: [
      'Cardiovascular endurance',
      'Muscle strength',
      'Breath control',
      'Coordination',
      'Discipline'
    ],
    equipment: [
      { name: 'Swimsuit', cost: '$30-60' },
      { name: 'Goggles', cost: '$15-30' },
      { name: 'Swim cap', cost: '$5-15' },
      { name: 'Pull buoy/kickboard', cost: '$15-30' }
    ],
    seasonStructure: 'Many teams operate year-round. Typical practice schedule: 3-5 times per week, 1-2 hours per session. Competition season varies by region.',
    commonInjuries: [
      {
        injury: 'Shoulder impingement',
        prevention: 'Proper stroke technique, shoulder strengthening, adequate recovery',
        recovery: '2-4 weeks'
      },
      {
        injury: 'Knee pain',
        prevention: 'Proper kicking technique, flexibility work, core strength',
        recovery: '1-3 weeks'
      },
      {
        injury: 'Ear infections',
        prevention: 'Dry ears after swimming, use earplugs if prone',
        recovery: '1-2 weeks with treatment'
      }
    ],
    costs: {
      recreational: '$100-250/month',
      competitive: '$200-400/month + meet fees',
      coaching: '$30-60/hour'
    },
    coachQuote: 'Swimming is the perfect sport for kids who are self-motivated. You see progress every week—faster times, better endurance. It\'s very rewarding.',
    coachName: 'Coach Michael, Santa Barbara Swim Team',
    videoUrl: 'https://www.youtube.com/embed/LnJ9_2uL-h4',
    collegeOpportunity: {
      percentReachCollege: 3,
      scholarshipsAvailable: true,
      investmentToReachCollege: '$15,000-35,000/year'
    },
    parentRating: 4.7,
    parentReviewCount: 52
  },
  tennis: {
    id: 'tennis',
    name: 'Tennis',
    emoji: '🎾',
    quickRundown: {
      duration: '45-90 minutes (match)',
      playersPerSide: '1-2 players (singles or doubles)',
      season: 'Year-round (varies by region)',
      typicalAgeToStart: '4-6 years'
    },
    howItWorks: 'Tennis is an individual or doubles sport where players use rackets to hit a ball over a net. It emphasizes hand-eye coordination, strategy, and quick court movement. Can be played recreationally or competitively.',
    keySkills: [
      'Hand-eye coordination',
      'Quick footwork',
      'Strategic thinking',
      'Agility',
      'Mental focus'
    ],
    equipment: [
      { name: 'Tennis racket', cost: '$80-150' },
      { name: 'Tennis balls (per can)', cost: '$8-12' },
      { name: 'Tennis shoes', cost: '$70-120' },
      { name: 'Tennis clothing', cost: '$30-60' }
    ],
    seasonStructure: 'Many regions have year-round play. School teams typically play in spring/fall. Competitive players often play on club teams with matches weekly.',
    commonInjuries: [
      {
        injury: 'Tennis elbow',
        prevention: 'Proper racket grip size, technique coaching, gradual increase in play',
        recovery: '2-6 weeks'
      },
      {
        injury: 'Ankle sprains',
        prevention: 'Proper footwork, ankle strengthening, good court shoes',
        recovery: '1-3 weeks'
      },
      {
        injury: 'Shoulder strain',
        prevention: 'Proper serve technique, shoulder strengthening, adequate rest',
        recovery: '2-4 weeks'
      }
    ],
    costs: {
      recreational: '$100-250/month',
      competitive: '$200-500/month + tournament fees',
      coaching: '$50-100/hour'
    },
    coachQuote: 'Tennis teaches independence and mental toughness. Kids learn to problem-solve on court and handle pressure. It\'s one-on-one competition that builds character.',
    coachName: 'Coach Patricia, Santa Barbara Tennis Club',
    videoUrl: 'https://www.youtube.com/embed/WnKK49z1xWU',
    collegeOpportunity: {
      percentReachCollege: 2.5,
      scholarshipsAvailable: true,
      investmentToReachCollege: '$12,000-28,000/year'
    },
    parentRating: 4.4,
    parentReviewCount: 35
  },
  gymnastics: {
    id: 'gymnastics',
    name: 'Gymnastics',
    emoji: '🤸',
    quickRundown: {
      duration: '1-2 hours (practice)',
      playersPerSide: 'Individual sport (team competition)',
      season: 'Year-round',
      typicalAgeToStart: '3-5 years'
    },
    howItWorks: 'Gymnastics is an individual sport where athletes perform routines on apparatus like bars, beam, floor, and vault. It emphasizes strength, flexibility, balance, and body control. Can be recreational or elite competitive.',
    keySkills: [
      'Strength and flexibility',
      'Body awareness',
      'Balance',
      'Courage',
      'Coordination'
    ],
    equipment: [
      { name: 'Leotard/shorts', cost: '$30-60' },
      { name: 'Gymnastic shoes', cost: '$25-40' },
      { name: 'Hair accessories', cost: '$5-15' },
      { name: 'Grip tape (for bars)', cost: '$8-15' }
    ],
    seasonStructure: 'Most gyms offer year-round classes. Competitive teams practice 6-15+ hours per week depending on level. Competition season is typically Sept-April.',
    commonInjuries: [
      {
        injury: 'Wrist sprains',
        prevention: 'Proper warm-up, wrist strengthening, gradual skill progression',
        recovery: '2-4 weeks'
      },
      {
        injury: 'Ankle sprains',
        prevention: 'Ankle strengthening exercises, proper landing technique',
        recovery: '1-3 weeks'
      },
      {
        injury: 'Back strain',
        prevention: 'Core strengthening, flexibility work, proper technique',
        recovery: '2-6 weeks'
      }
    ],
    costs: {
      recreational: '$80-150/month',
      competitive: '$300-800/month',
      coaching: '$40-100/hour'
    },
    coachQuote: 'Gymnastics builds incredible self-confidence. When a kid lands a move they\'ve been working on, the joy is unreal. They start believing they can do hard things.',
    coachName: 'Coach Sarah, Santa Barbara Gymnastics Academy',
    videoUrl: 'https://www.youtube.com/embed/l3aPcZcQwOw',
    collegeOpportunity: {
      percentReachCollege: 2,
      scholarshipsAvailable: true,
      investmentToReachCollege: '$20,000-40,000/year'
    },
    parentRating: 4.8,
    parentReviewCount: 61
  }
};

export function getSport101Content(sportId: string): Sport101Content | null {
  return SPORT_101_CONTENT[sportId] || null;
}

export function getAllSport101Contents(): Sport101Content[] {
  return Object.values(SPORT_101_CONTENT);
}
