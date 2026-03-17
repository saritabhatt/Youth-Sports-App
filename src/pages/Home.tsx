import { Link } from 'react-router-dom';
import { useMemo } from 'react';
import { useProfiles } from '../hooks';
import { getActiveProfileId } from '../data/storage';
import { ArrowRight, Sparkles, BarChart3, Settings2, TrendingUp } from 'lucide-react';

export function Home() {
  const { data: profiles = [] } = useProfiles();
  
  const profileCount = profiles.length;
  const hasActiveProfile = useMemo(() => !!getActiveProfileId(), []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-blue-950/20 dark:to-purple-950/20 overflow-hidden">
      {/* Decorative gradient orbs */}
      <div className="fixed -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-300/20 to-blue-400/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="fixed -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-purple-300/20 to-pink-400/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 md:mb-20 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-50 to-blue-50 dark:from-emerald-950/30 dark:to-blue-950/30 px-4 py-2 rounded-full mb-6 border border-emerald-200 dark:border-emerald-900/50">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">AI-Powered Sports Matching</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 bg-gradient-to-r from-slate-900 via-blue-800 to-purple-900 dark:from-white dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
              Find Your Child's Perfect Sport
            </h1>
            
            <p className="text-lg md:text-2xl text-slate-600 dark:text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Discover personalized sports recommendations based on your child's unique skills, interests, and lifestyle with our advanced assessment engine.
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-12 md:mb-16 animate-slide-up-stagger">
            <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur border border-slate-200/50 dark:border-slate-700/50 rounded-xl p-6 md:p-8 hover-lift group">
              <div className="flex items-center justify-between mb-3">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  {profileCount}
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                Profile{profileCount !== 1 ? 's' : ''} Created
              </p>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur border border-slate-200/50 dark:border-slate-700/50 rounded-xl p-6 md:p-8 hover-lift group">
              <div className="flex items-center justify-between mb-3">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  100+
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Sports Available</p>
            </div>

            <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur border border-slate-200/50 dark:border-slate-700/50 rounded-xl p-6 md:p-8 hover-lift group col-span-2 md:col-span-1">
              <div className="flex items-center justify-between mb-3">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-br from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  AI
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Settings2 className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">Powered</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3 md:space-y-4 mb-16 md:mb-20">
            {hasActiveProfile ? (
              <>
                <Link
                  to="/results"
                  className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 dark:from-emerald-500 dark:to-teal-500 dark:hover:from-emerald-600 dark:hover:to-teal-600 text-white font-bold py-4 px-6 rounded-xl text-center transition-all duration-300 hover-lift shadow-lg shadow-emerald-500/20"
                >
                  View Assessment Results
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  to="/results"
                  className="flex items-center justify-center gap-2 w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold py-4 px-6 rounded-xl text-center transition-all duration-300 hover-lift border border-slate-200 dark:border-slate-700"
                >
                  Manage Profiles
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </>
            ) : (
              <Link
                to="/results"
                className="flex items-center justify-center gap-2 w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 dark:from-emerald-500 dark:to-teal-500 dark:hover:from-emerald-600 dark:hover:to-teal-600 text-white font-bold py-4 px-6 rounded-xl text-center transition-all duration-300 hover-lift shadow-lg shadow-emerald-500/20 animate-scale-in"
              >
                Get Started Now
                <ArrowRight className="w-5 h-5" />
              </Link>
            )}

            <div className="grid grid-cols-2 gap-3 md:gap-4">
              <Link
                to="/trials"
                className="flex items-center justify-center gap-2 w-full bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 dark:hover:bg-blue-950/50 text-blue-700 dark:text-blue-300 font-semibold py-3 px-4 rounded-xl text-center transition-all duration-300 border border-blue-200 dark:border-blue-800 hover-lift"
              >
                📋 Trials
              </Link>
              <Link
                to="/budget"
                className="flex items-center justify-center gap-2 w-full bg-purple-50 dark:bg-purple-950/30 hover:bg-purple-100 dark:hover:bg-purple-950/50 text-purple-700 dark:text-purple-300 font-semibold py-3 px-4 rounded-xl text-center transition-all duration-300 border border-purple-200 dark:border-purple-800 hover-lift"
              >
                💰 Budget
              </Link>
            </div>

            <Link
              to="/programs"
              className="flex items-center justify-center gap-2 w-full bg-orange-50 dark:bg-orange-950/30 hover:bg-orange-100 dark:hover:bg-orange-950/50 text-orange-700 dark:text-orange-300 font-semibold py-3 px-4 rounded-xl text-center transition-all duration-300 border border-orange-200 dark:border-orange-800 hover-lift"
            >
              🏢 Programs Directory
            </Link>

            <Link
              to="/about"
              className="flex items-center justify-center gap-2 w-full text-slate-600 dark:text-slate-400 font-semibold py-3 px-4 rounded-xl text-center transition-all duration-300 hover:text-slate-900 dark:hover:text-white"
            >
              Learn More →
            </Link>
          </div>

          {/* Features Section */}
          <div className="mt-20 md:mt-24 pt-16 md:pt-20 border-t border-slate-200 dark:border-slate-800">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 dark:text-white mb-12">
              Powerful Features for Smart Sports Decisions
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6 md:gap-8 animate-slide-up-stagger">
              {[
                {
                  icon: '📊',
                  title: 'Smart Scoring',
                  description: 'Advanced algorithms match sports to your child\'s unique abilities, personality, and preferences with precision',
                  gradient: 'from-emerald-100 to-teal-100 dark:from-emerald-900/30 dark:to-teal-900/30'
                },
                {
                  icon: '⚙️',
                  title: 'Fully Customizable',
                  description: 'Adjust weights and priorities to match your family\'s values and what matters most to you',
                  gradient: 'from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30'
                },
                {
                  icon: '🔄',
                  title: 'Side-by-Side Compare',
                  description: 'Easily compare sports head-to-head with detailed analytics and insights for informed decisions',
                  gradient: 'from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30'
                }
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-white/80 dark:bg-gray-800/50 backdrop-blur border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-8 hover-lift group"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
