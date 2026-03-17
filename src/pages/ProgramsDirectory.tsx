import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SPORTS_DATA } from '../data/sportsData';
import { ArrowLeft, MapPin, Star, Phone, Globe, Users, Award, ChevronRight } from 'lucide-react';

export function ProgramsDirectory() {
  const [selectedSport, setSelectedSport] = useState<string | null>(null);

  const programs = [
    {
      id: 1,
      name: 'Santa Barbara Youth Athletics - Soccer',
      sport: 'Soccer',
      emoji: '⚽',
      location: 'Montecito, CA',
      rating: 4.8,
      reviews: 127,
      ageRange: '6-18',
      season: 'Fall & Spring',
      cost: '$300-$800',
      coaches: 12,
      contact: '(805) 555-0101',
      website: 'sbyouthsports.com',
      description: 'Premier youth soccer programs with certified coaches and state-of-the-art facilities.'
    },
    {
      id: 2,
      name: 'Santa Barbara Parks & Rec - Basketball',
      sport: 'Basketball',
      emoji: '🏀',
      location: 'Santa Barbara',
      rating: 4.2,
      reviews: 89,
      ageRange: '8-18',
      season: 'Winter',
      cost: '$250-$600',
      coaches: 8,
      contact: '(805) 555-0102',
      website: 'sbarbaraparks.com',
      description: 'Community basketball league with competitive and recreational tiers.'
    },
    {
      id: 3,
      name: 'Santa Barbara Swim Team',
      sport: 'Swimming',
      emoji: '🏊',
      location: 'Santa Barbara',
      rating: 4.7,
      reviews: 156,
      ageRange: '4-18',
      season: 'Year-round',
      cost: '$1,500-$3,500',
      coaches: 6,
      contact: '(805) 555-0103',
      website: 'sbswimteam.org',
      description: 'USA Swimming affiliate with development and competitive programs.'
    },
    {
      id: 4,
      name: 'Coastal Tennis Academy',
      sport: 'Tennis',
      emoji: '🎾',
      location: 'Goleta, CA',
      rating: 4.6,
      reviews: 92,
      ageRange: '6-18',
      season: 'Year-round',
      cost: '$400-$1,200',
      coaches: 7,
      contact: '(805) 555-0104',
      website: 'coastaltennisacademy.com',
      description: 'Professional tennis instruction with indoor and outdoor courts.'
    },
    {
      id: 5,
      name: 'Santa Barbara Baseball League',
      sport: 'Baseball',
      emoji: '⚾',
      location: 'Santa Barbara',
      rating: 4.4,
      reviews: 103,
      ageRange: '5-18',
      season: 'Spring',
      cost: '$200-$900',
      coaches: 15,
      contact: '(805) 555-0105',
      website: 'sbbaseballleague.org',
      description: 'Historic youth baseball organization with multiple competitive divisions.'
    },
  ];

  const filtered = selectedSport ? programs.filter((p) => p.sport === selectedSport) : programs;
  const sports = Array.from(new Set(programs.map((p) => p.sport)));

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-blue-950/20 dark:to-purple-950/20 p-6">
      <div className="max-w-7xl mx-auto">
        <Link to="/">
          <button className="inline-flex items-center gap-2 text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-semibold mb-8 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
        </Link>

        {/* Header */}
        <div className="mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
            🏢 Local Programs Directory
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 max-w-2xl">
            Discover premier youth sports programs in your area. Find the perfect fit for your child.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedSport(null)}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover-lift ${
                selectedSport === null
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-500/30'
                  : 'bg-white/80 dark:bg-gray-800/50 text-slate-900 dark:text-white border border-slate-200/50 dark:border-slate-700/50 hover:bg-white dark:hover:bg-gray-800'
              }`}
            >
              All Programs
            </button>
            {sports.map((sport) => {
              const programForSport = programs.find((p) => p.sport === sport);
              return (
                <button
                  key={sport}
                  onClick={() => setSelectedSport(sport)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover-lift flex items-center gap-2 ${
                    selectedSport === sport
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-white/80 dark:bg-gray-800/50 text-slate-900 dark:text-white border border-slate-200/50 dark:border-slate-700/50 hover:bg-white dark:hover:bg-gray-800'
                  }`}
                >
                  <span className="text-xl">{programForSport?.emoji || '🏆'}</span>
                  {sport}
                </button>
              );
            })}
          </div>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-1 gap-6 animate-slide-up-stagger">
          {filtered.map((program, idx) => (
            <div
              key={program.id}
              className="bg-white/80 dark:bg-gray-800/50 backdrop-blur border border-slate-200/50 dark:border-slate-700/50 rounded-2xl overflow-hidden hover-lift group transition-all duration-300"
              style={{ animationDelay: `${idx * 0.05}s` }}
            >
              {/* Card Header with Gradient */}
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-950/30 dark:to-purple-950/30 p-6 border-b border-slate-200/50 dark:border-slate-700/50">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    <div className="text-5xl group-hover:scale-110 transition-transform duration-300">
                      {program.emoji}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                        {program.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3">
                        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(program.rating)
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-slate-300 dark:text-slate-600'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-bold text-slate-900 dark:text-white">{program.rating}</span>
                        <span className="text-sm text-slate-600 dark:text-slate-400">({program.reviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4">
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed">
                  {program.description}
                </p>

                {/* Info Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    { icon: MapPin, label: 'Location', value: program.location },
                    { icon: Users, label: 'Age Range', value: program.ageRange },
                    { icon: Award, label: 'Season', value: program.season },
                    { icon: '💰', label: 'Cost', value: program.cost },
                    { icon: '👨‍🏫', label: 'Coaches', value: program.coaches.toString() },
                    { icon: '📅', label: 'Season', value: program.season },
                  ].map((item, i) => (
                    <div key={i} className="bg-slate-50 dark:bg-slate-800/50 rounded-lg p-3">
                      <div className="flex items-center gap-2 mb-1">
                        {typeof item.icon === 'string' ? (
                          <span className="text-lg">{item.icon}</span>
                        ) : (
                          <item.icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                        )}
                        <p className="text-xs font-semibold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                          {item.label}
                        </p>
                      </div>
                      <p className="font-semibold text-slate-900 dark:text-white text-sm">{item.value}</p>
                    </div>
                  ))}
                </div>

                {/* Contact Info */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-700 space-y-3">
                  <a
                    href={`tel:${program.contact}`}
                    className="flex items-center gap-3 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium"
                  >
                    <Phone className="w-5 h-5" />
                    {program.contact}
                  </a>
                  <a
                    href={`https://${program.website}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-medium"
                  >
                    <Globe className="w-5 h-5" />
                    {program.website}
                  </a>
                </div>

                {/* CTA */}
                <button className="w-full mt-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 group-hover:shadow-lg group-hover:shadow-emerald-500/30">
                  Learn More & Enroll
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">No Programs Found</h3>
            <p className="text-slate-600 dark:text-slate-400">
              Try selecting a different sport or check back soon for more programs.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
