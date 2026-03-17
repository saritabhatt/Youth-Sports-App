import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function About() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Back Link */}
          <Link to="/" className="text-blue-600 hover:text-blue-700 font-semibold mb-8 inline-block">
            ← Back to Home
          </Link>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-8">
            About Youth Sports Assessment
          </h1>

          {/* Introduction */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4">
              We believe that every young person has the potential to excel in sports. Our mission
              is to help parents, coaches, and young athletes discover sports that align with their
              unique skills, interests, and lifestyle.
            </p>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
              The Youth Sports Assessment app uses scientifically-backed algorithms to match
              children with sports where they're most likely to succeed and enjoy themselves.
            </p>
          </div>

          {/* How It Works */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">How It Works</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">1. Profile Creation</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Start by creating a profile for your child with their basic information, including
                  age, skill level, physical attributes, and interests.
                </p>
              </div>
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">2. Smart Scoring</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Our algorithm evaluates hundreds of sports across multiple factors including physical
                  requirements, skill development potential, accessibility, and cost.
                </p>
              </div>
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">3. Customization</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Fine-tune the results by adjusting weights for different factors. What matters most
                  to your family? Cost? Skill development? Social aspects? You have complete control.
                </p>
              </div>
              <div className="border-l-4 border-blue-600 pl-6">
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">4. Comparison & Exploration</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Compare sports side-by-side, explore detailed information, and make informed decisions
                  about which sports to try.
                </p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Key Features</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <div className="text-2xl mb-3">📊</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Comprehensive Scoring</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We evaluate skills, physical attributes, interests, cost, accessibility, and more.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <div className="text-2xl mb-3">⚙️</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Fully Customizable</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Adjust weights and criteria to match your family's unique needs and priorities.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <div className="text-2xl mb-3">🌍</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Location-Aware</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Results account for regional availability and popularity of different sports.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <div className="text-2xl mb-3">📱</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Easy to Use</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Intuitive interface makes it simple for parents and young athletes to explore options.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <div className="text-2xl mb-3">💾</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Export & Share</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Export your results as PDF or CSV to share with family, coaches, or clubs.
                </p>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <div className="text-2xl mb-3">🔄</div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Multiple Profiles</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Manage assessments for multiple children and compare recommendations.
                </p>
              </div>
            </div>
          </div>

          {/* Science Behind */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">The Science Behind It</h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-4">
              Our algorithm is based on research from sports science, child development, and athletic
              performance studies. We evaluate:
            </p>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-4">
              <li><strong>Physical Attributes</strong> - Height, weight, coordination, strength</li>
              <li><strong>Skill Development</strong> - How quickly skills can be developed in each sport</li>
              <li><strong>Age Appropriateness</strong> - Sport suitability for the child's age</li>
              <li><strong>Interests & Personality</strong> - Team vs individual sports, indoor vs outdoor</li>
              <li><strong>Accessibility</strong> - Programs available in your area and travel distance</li>
              <li><strong>Cost & Resources</strong> - Equipment and participation costs</li>
              <li><strong>Health & Safety</strong> - Injury risk profiles and health considerations</li>
            </ul>
          </div>

          {/* FAQ */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">Is my data private?</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Yes! All profile data is stored locally on your device. We don't collect or share any
                  personal information without your consent.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  How accurate are the recommendations?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Our algorithm is quite accurate as a starting point for exploration. However, the best
                  sports are ultimately discovered through trying them out. We recommend using these
                  recommendations as a guide for experimentation.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  Can I update my child's profile later?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  Absolutely! As your child develops new skills or interests, you can update their profile
                  and receive new recommendations.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                  How many sports are in your database?
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  We include over 100 sports in our database, covering team sports, individual sports,
                  recreational activities, and more.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="bg-blue-50 dark:bg-gray-800 p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Ready to Get Started?</h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Discover the perfect sports for your child today!
            </p>
            <Link
              to="/"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
