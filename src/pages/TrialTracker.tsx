import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowLeft, Trash2, Plus, Calendar, Star, MessageSquare } from 'lucide-react';
import { SPORTS_DATA } from '../data/sportsData';

interface Trial {
  id: string;
  sportId: string;
  sportName: string;
  durationWeeks: number;
  rating: number;
  notes: string;
  dateTrialed: Date;
}

const DURATION_LABELS: Record<number, string> = {
  1: '1 class',
  4: '1 month',
  16: 'Full season',
};

export function TrialTracker() {
  const [trials, setTrials] = useState<Trial[]>([
    {
      id: '1',
      sportId: 'soccer',
      sportName: 'Soccer',
      durationWeeks: 16,
      rating: 9,
      notes: 'She loves the team aspect and scoring goals!',
      dateTrialed: new Date('2024-09-01'),
    },
    {
      id: '2',
      sportId: 'tennis',
      sportName: 'Tennis',
      durationWeeks: 4,
      rating: 3,
      notes: 'Too much sitting around, needs more action',
      dateTrialed: new Date('2024-08-15'),
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    sportId: '',
    durationWeeks: 4,
    rating: 5,
    notes: '',
  });

  const handleAddTrial = () => {
    if (formData.sportId) {
      const sport = SPORTS_DATA.find((s) => s.id === formData.sportId);
      const newTrial: Trial = {
        id: Math.random().toString(36).substr(2, 9),
        sportId: formData.sportId,
        sportName: sport?.name || formData.sportId,
        durationWeeks: formData.durationWeeks,
        rating: formData.rating,
        notes: formData.notes,
        dateTrialed: new Date(),
      };

      setTrials([newTrial, ...trials]);
      setFormData({ sportId: '', durationWeeks: 4, rating: 5, notes: '' });
      setShowForm(false);
    }
  };

  const handleDeleteTrial = (id: string) => {
    setTrials(trials.filter((t) => t.id !== id));
  };

  const averageRating =
    trials.length > 0 ? (trials.reduce((sum, t) => sum + t.rating, 0) / trials.length).toFixed(1) : 0;

  const loveSports = trials.filter((t) => t.rating >= 7);
  const likeSports = trials.filter((t) => t.rating >= 4 && t.rating < 7);
  const dislikeSports = trials.filter((t) => t.rating < 4);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 p-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/">
          <Button variant="outline" size="sm" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>

        <h1 className="text-4xl font-bold mb-2">Trial Tracker</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Keep track of sports your child has tried and how they felt about each one.
        </p>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Total Trials</p>
              <p className="text-3xl font-bold">{trials.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Average Rating</p>
              <p className="text-3xl font-bold">{averageRating}/10</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Loves It</p>
              <p className="text-3xl font-bold text-green-600">{loveSports.length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Add Trial Button */}
        {!showForm && (
          <div className="mb-8">
            <Button onClick={() => setShowForm(true)} size="lg" className="w-full md:w-auto">
              <Plus className="w-5 h-5 mr-2" />
              Add Trial
            </Button>
          </div>
        )}

        {/* Add Trial Form */}
        {showForm && (
          <Card className="mb-8 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle>Record a New Trial</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Sport</label>
                <select
                  value={formData.sportId}
                  onChange={(e) => setFormData({ ...formData, sportId: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                >
                  <option value="">Select a sport...</option>
                  {SPORTS_DATA.map((sport) => (
                    <option key={sport.id} value={sport.id}>
                      {sport.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Duration</label>
                <select
                  value={formData.durationWeeks}
                  onChange={(e) => setFormData({ ...formData, durationWeeks: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                >
                  <option value="1">1 class</option>
                  <option value="4">1 month</option>
                  <option value="16">Full season</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Rating: {formData.rating}/10</label>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: parseInt(e.target.value) })}
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Notes</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="What did they think? What went well or didn't?"
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-800 dark:border-gray-700"
                  rows={3}
                />
              </div>

              <div className="flex gap-2">
                <Button onClick={handleAddTrial} className="flex-1">
                  Save Trial
                </Button>
                <Button onClick={() => setShowForm(false)} variant="outline" className="flex-1">
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Trials by Category */}
        {loveSports.length > 0 && (
          <Card className="mb-6 border-green-200 dark:border-green-800">
            <CardHeader>
              <CardTitle className="text-green-700 dark:text-green-400">❤️ Loves It (7+)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {loveSports.map((trial) => (
                <TrialCard key={trial.id} trial={trial} onDelete={handleDeleteTrial} />
              ))}
            </CardContent>
          </Card>
        )}

        {likeSports.length > 0 && (
          <Card className="mb-6 border-yellow-200 dark:border-yellow-800">
            <CardHeader>
              <CardTitle className="text-yellow-700 dark:text-yellow-400">👍 Likes It (4-6)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {likeSports.map((trial) => (
                <TrialCard key={trial.id} trial={trial} onDelete={handleDeleteTrial} />
              ))}
            </CardContent>
          </Card>
        )}

        {dislikeSports.length > 0 && (
          <Card className="mb-6 border-red-200 dark:border-red-800">
            <CardHeader>
              <CardTitle className="text-red-700 dark:text-red-400">😕 Not for Them (1-3)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {dislikeSports.map((trial) => (
                <TrialCard key={trial.id} trial={trial} onDelete={handleDeleteTrial} />
              ))}
            </CardContent>
          </Card>
        )}

        {trials.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                No trials recorded yet. Start tracking sports your child tries!
              </p>
              <Button onClick={() => setShowForm(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add First Trial
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

function TrialCard({ trial, onDelete }: { trial: Trial; onDelete: (id: string) => void }) {
  const durationLabel = DURATION_LABELS[trial.durationWeeks] || `${trial.durationWeeks} weeks`;

  return (
    <div className="flex items-start justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <div className="flex-1">
        <div className="flex items-center gap-3 mb-2">
          <h4 className="font-semibold text-lg">{trial.sportName}</h4>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(trial.rating / 2)
                    ? 'fill-yellow-400 text-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
            <span className="text-sm font-semibold ml-1">{trial.rating}/10</span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-gray-600 dark:text-gray-400 mb-2">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            {trial.dateTrialed.toLocaleDateString()}
          </span>
          <span>{durationLabel}</span>
        </div>

        {trial.notes && (
          <p className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
            <MessageSquare className="w-4 h-4 flex-shrink-0 mt-0.5" />
            {trial.notes}
          </p>
        )}
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={() => onDelete(trial.id)}
        className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
}
