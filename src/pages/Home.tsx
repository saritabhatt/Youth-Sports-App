import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { useProfiles } from '../hooks';
import { getActiveProfileId } from '../data/storage';

export function Home() {
  const { data: profiles = [] } = useProfiles();
  
  const profileCount = profiles.length;
  const hasActiveProfile = useMemo(() => !!getActiveProfileId(), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Youth Sports Assessment
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Discover sports that match your child's skills, interests, and lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-12">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
              <div className="text-3xl font-bold text-blue-600">{profileCount}</div>
              <div className="text-gray-600 dark:text-gray-400">Profile{profileCount !== 1 ? 's' : ''}</div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
              <div className="text-3xl font-bold text-indigo-600">100+</div>
              <div className="text-gray-600 dark:text-gray-400">Sports</div>
            </div>
          </div>

          <div className="space-y-4">
            {hasActiveProfile ? (
              <>
                <Link
                  to="/results"
                  className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-center transition"
                >
                  View Assessment Results
                </Link>
                <Link
                  to="/results"
                  className="block w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg text-center transition"
                >
                  Manage Profiles
                </Link>
              </>
            ) : (
              <Link
                to="/results"
                className="block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-center transition"
              >
                Get Started
              </Link>
            )}
            <Link
              to="/about"
              className="block w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-bold py-3 px-6 rounded-lg text-center transition"
            >
              Learn More
            </Link>
          </div>

          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-8 text-center">
              Features
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
                <div className="text-3xl mb-3">📊</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Smart Scoring</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Advanced algorithms match sports to your child's abilities
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
                <div className="text-3xl mb-3">⚙️</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Customizable</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Adjust weights to prioritize what matters most
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow">
                <div className="text-3xl mb-3">📈</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Compare</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Side-by-side sport comparison and detailed analysis
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
