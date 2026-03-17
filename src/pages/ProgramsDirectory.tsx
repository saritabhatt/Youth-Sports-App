import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowLeft, MapPin, Star, Users, DollarSign, ExternalLink } from 'lucide-react';
import { SPORTS_DATA } from '../data/sportsData';

interface LocalProgram {
  id: string;
  name: string;
  sport: string;
  location: string;
  ageRange: { min: number; max: number };
  rating: number;
  reviewCount: number;
  cost: { min: number; max: number };
  season: string;
  contact: string;
  website: string;
}

// Sample local programs for Santa Barbara area
const LOCAL_PROGRAMS: LocalProgram[] = [
  {
    id: 'sbya-soccer',
    name: 'Santa Barbara Youth Athletics - Soccer',
    sport: 'Soccer',
    location: 'Montecito, CA',
    ageRange: { min: 4, max: 18 },
    rating: 4.8,
    reviewCount: 47,
    cost: { min: 250, max: 400 },
    season: 'Fall & Spring',
    contact: 'contact@sbya.org',
    website: 'https://www.sbya.org',
  },
  {
    id: 'sbparks-soccer',
    name: 'Santa Barbara Parks & Rec - Soccer',
    sport: 'Soccer',
    location: 'Santa Barbara',
    ageRange: { min: 6, max: 16 },
    rating: 4.2,
    reviewCount: 23,
    cost: { min: 200, max: 300 },
    season: 'Fall & Spring',
    contact: 'parks@sbparks.org',
    website: 'https://www.sbparks.org',
  },
  {
    id: 'sbya-basketball',
    name: 'Santa Barbara Youth Athletics - Basketball',
    sport: 'Basketball',
    location: 'Montecito, CA',
    ageRange: { min: 5, max: 18 },
    rating: 4.6,
    reviewCount: 38,
    cost: { min: 250, max: 350 },
    season: 'Winter',
    contact: 'contact@sbya.org',
    website: 'https://www.sbya.org',
  },
  {
    id: 'sbswim-competitive',
    name: 'Santa Barbara Swim Team',
    sport: 'Swimming',
    location: 'Santa Barbara',
    ageRange: { min: 6, max: 18 },
    rating: 4.7,
    reviewCount: 52,
    cost: { min: 2400, max: 4800 },
    season: 'Year-round',
    contact: 'info@sbswimteam.org',
    website: 'https://www.sbswimteam.org',
  },
  {
    id: 'sb-gym-academy',
    name: 'Santa Barbara Gymnastics Academy',
    sport: 'Gymnastics',
    location: 'Santa Barbara',
    ageRange: { min: 3, max: 18 },
    rating: 4.8,
    reviewCount: 61,
    cost: { min: 960, max: 2400 },
    season: 'Year-round',
    contact: 'enroll@sbgymnastics.com',
    website: 'https://www.sbgymnastics.com',
  },
  {
    id: 'sb-tennis-club',
    name: 'Santa Barbara Tennis Club',
    sport: 'Tennis',
    location: 'Santa Barbara',
    ageRange: { min: 4, max: 18 },
    rating: 4.4,
    reviewCount: 35,
    cost: { min: 1200, max: 4800 },
    season: 'Year-round',
    contact: 'junior@sbtennis.com',
    website: 'https://www.sbtennis.com',
  },
];

export function ProgramsDirectory() {
  const [selectedSport, setSelectedSport] = useState<string | null>(null);

  const filteredPrograms = selectedSport
    ? LOCAL_PROGRAMS.filter((p) => p.sport.toLowerCase() === selectedSport.toLowerCase())
    : LOCAL_PROGRAMS;

  const uniqueSports = Array.from(new Set(LOCAL_PROGRAMS.map((p) => p.sport)));

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 p-6">
      <div className="max-w-5xl mx-auto">
        <Link to="/">
          <Button variant="outline" size="sm" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>

        <h1 className="text-4xl font-bold mb-2">Local Programs Directory</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Find sports programs in your area. Currently showing Santa Barbara area programs.
        </p>

        {/* Sport Filter */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Filter by Sport</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={selectedSport === null ? 'default' : 'outline'}
                onClick={() => setSelectedSport(null)}
              >
                All Sports ({LOCAL_PROGRAMS.length})
              </Button>
              {uniqueSports.map((sport) => {
                const count = LOCAL_PROGRAMS.filter((p) => p.sport === sport).length;
                return (
                  <Button
                    key={sport}
                    variant={selectedSport === sport ? 'default' : 'outline'}
                    onClick={() => setSelectedSport(sport)}
                  >
                    {sport} ({count})
                  </Button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Programs List */}
        <div className="space-y-4">
          {filteredPrograms.map((program) => (
            <Card key={program.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  {/* Left side - Program info */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-1">{program.name}</h3>
                    <div className="flex items-center gap-4 mb-3 flex-wrap">
                      <div className="flex items-center gap-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(program.rating)
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                        <span className="text-sm font-semibold ml-1">{program.rating}</span>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          ({program.reviewCount} reviews)
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span>{program.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <Users className="w-4 h-4 flex-shrink-0" />
                        <span>Ages {program.ageRange.min}-{program.ageRange.max}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                        <DollarSign className="w-4 h-4 flex-shrink-0" />
                        <span>
                          ${program.cost.min} - ${program.cost.max} per season
                        </span>
                      </div>
                      <div className="text-gray-700 dark:text-gray-300">
                        <strong>Season:</strong> {program.season}
                      </div>
                    </div>
                  </div>

                  {/* Right side - Actions */}
                  <div className="space-y-3 md:text-right">
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">Contact</p>
                      <p className="text-sm font-semibold text-blue-600 dark:text-blue-400">
                        {program.contact}
                      </p>
                    </div>
                    <a href={program.website} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" className="w-full md:w-auto">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Visit Website
                      </Button>
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredPrograms.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">
                No programs found for the selected sport.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Info Section */}
        <Card className="mt-8 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle>Need to add more programs?</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 mb-4">
              We're continuously adding more local programs. If you know of a program that should be listed here,
              please contact us.
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Currently showing Santa Barbara area programs. Expand your location to add more nearby programs.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
