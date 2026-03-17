import { useState } from 'react';
import { Link } from 'react-router-dom';
import { SPORTS_DATA } from '../data/sportsData';

interface Trial {
  id: string;
  sportName: string;
  rating: number;
  notes: string;
}

export function TrialTracker() {
  const [trials, setTrials] = useState<Trial[]>([
    { id: '1', sportName: 'Soccer', rating: 9, notes: 'She loves the team aspect!' },
    { id: '2', sportName: 'Tennis', rating: 3, notes: 'Too much sitting around' },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ sport: '', rating: 5, notes: '' });

  const handleAddTrial = () => {
    if (formData.sport) {
      setTrials([{ id: Math.random().toString(), sportName: formData.sport, rating: formData.rating, notes: formData.notes }, ...trials]);
      setFormData({ sport: '', rating: 5, notes: '' });
      setShowForm(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 p-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/">Back to Home</Link>
        <h1 className="text-4xl font-bold mb-8">Trial Tracker</h1>

        {!showForm && (
          <button onClick={() => setShowForm(true)} className="px-6 py-2 bg-purple-600 text-white rounded mb-8">
            + Add Trial
          </button>
        )}

        {showForm && (
          <div className="bg-blue-100 dark:bg-blue-900 rounded-lg p-6 mb-6">
            <select
              value={formData.sport}
              onChange={(e) => setFormData({ ...formData, sport: e.target.value })}
              className="w-full px-3 py-2 border rounded mb-4 dark:bg-gray-800"
            >
              <option value="">Select a sport...</option>
              {SPORTS_DATA.map((sport) => (
                <option key={sport.id} value={sport.name}>{sport.name}</option>
              ))}
            </select>

            <label className="block mb-4">Rating: {formData.rating}/10</label>
            <input
              type="range"
              min="1"
              max="10"
              value={formData.rating}
              onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
              className="w-full mb-4"
            />

            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Notes..."
              className="w-full px-3 py-2 border rounded mb-4 dark:bg-gray-800"
              rows={3}
            />

            <div className="flex gap-2">
              <button onClick={handleAddTrial} className="px-4 py-2 bg-purple-600 text-white rounded">
                Save
              </button>
              <button onClick={() => setShowForm(false)} className="px-4 py-2 bg-gray-400 text-white rounded">
                Cancel
              </button>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {trials.map((trial) => (
            <div key={trial.id} className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4">
              <h4 className="font-bold text-lg">{trial.sportName}</h4>
              <p className="text-sm">Rating: {trial.rating}/10</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{trial.notes}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
