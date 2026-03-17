import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SPORTS_DATA } from '../data/sportsData';

export function ProgramsDirectory() {
  const [selectedSport, setSelectedSport] = useState<string | null>(null);

  const programs = [
    { id: 1, name: 'Santa Barbara Youth Athletics - Soccer', sport: 'Soccer', location: 'Montecito, CA', rating: 4.8 },
    { id: 2, name: 'Santa Barbara Parks & Rec - Basketball', sport: 'Basketball', location: 'Santa Barbara', rating: 4.2 },
    { id: 3, name: 'Santa Barbara Swim Team', sport: 'Swimming', location: 'Santa Barbara', rating: 4.7 },
  ];

  const filtered = selectedSport ? programs.filter((p) => p.sport === selectedSport) : programs;

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 p-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/">Back to Home</Link>
        <h1 className="text-4xl font-bold mb-8">Local Programs Directory</h1>

        <div className="mb-6 flex gap-2 flex-wrap">
          <button
            onClick={() => setSelectedSport(null)}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            All
          </button>
          {Array.from(new Set(programs.map((p) => p.sport))).map((sport) => (
            <button
              key={sport}
              onClick={() => setSelectedSport(sport)}
              className={`px-4 py-2 rounded ${
                selectedSport === sport ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-900'
              }`}
            >
              {sport}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.map((program) => (
            <div key={program.id} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
              <h3 className="text-xl font-bold mb-2">{program.name}</h3>
              <p className="text-gray-600 dark:text-gray-400">📍 {program.location}</p>
              <p className="text-gray-600 dark:text-gray-400">⭐ {program.rating}</p>
              <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded">View Details</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
