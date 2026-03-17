import { Link } from 'react-router-dom';

export function About() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Link to="/" className="text-blue-600 hover:text-blue-700 font-semibold mb-8 inline-block">
            ← Back to Home
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
            About Youth Sports Assessment
          </h1>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4">
              We believe that every young person has the potential to excel in sports. Our mission
              is to help parents, coaches, and young athletes discover sports that align with their
              unique skills, interests, and lifestyle.
            </p>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">How It Works</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">1. Profile Creation</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Start by creating a profile for your child with their basic information, including
                  age, skill level, and interests.
                </p>
              </div>
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">2. Smart Scoring</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Our algorithm evaluates hundreds of sports across multiple factors including physical
                  requirements and skill development potential.
                </p>
              </div>
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">3. Customization</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Fine-tune the results by adjusting weights for different factors based on your priorities.
                </p>
              </div>
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">4. Exploration</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Compare sports side-by-side and explore detailed information to make informed decisions.
                </p>
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <div className="text-2xl mb-3">📊</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Comprehensive Scoring</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Evaluate skills, physical attributes, interests, cost, and accessibility.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <div className="text-2xl mb-3">⚙️</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Fully Customizable</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Adjust weights and criteria to match your family's unique needs.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <div className="text-2xl mb-3">🌍</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Location-Aware</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Results account for regional availability of different sports.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <div className="text-2xl mb-3">📱</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Easy to Use</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Intuitive interface for parents and young athletes alike.
                </p>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 dark:bg-gray-800 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ready to Get Started?</h2>
            <Link
              to="/results"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition"
            >
              Start Assessment
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
