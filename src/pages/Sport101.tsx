import { useParams } from 'react-router-dom';
import { getSport101Content } from '../data/sport101Content';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowLeft, Star, Users, TrendingUp, DollarSign, ChevronRight, AlertCircle, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Sport101() {
  const { sportId } = useParams<{ sportId: string }>();
  const content = sportId ? getSport101Content(sportId) : null;

  if (!content) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-gray-950 dark:to-gray-900 p-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/">
            <Button variant="outline" size="sm" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="text-center py-20">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Sport not found</h1>
            <p className="text-slate-600 dark:text-slate-400 text-lg">We couldn't find that sport in our database.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-blue-950/20 dark:to-purple-950/20 p-6">
      <div className="max-w-5xl mx-auto">
        <Link to="/">
          <Button variant="outline" size="sm" className="mb-8 hover-lift">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Assessments
          </Button>
        </Link>

        {/* Hero Section */}
        <div className="mb-12 animate-fade-in">
          <div className="flex items-start gap-6 mb-6">
            <div className="text-7xl md:text-8xl drop-shadow-lg">{content.emoji}</div>
            <div className="flex-1">
              <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight">
                {content.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(content.parentRating)
                          ? 'fill-amber-400 text-amber-400'
                          : 'text-slate-300 dark:text-slate-600'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xl font-bold text-slate-900 dark:text-white">{content.parentRating}</span>
                <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-sm text-slate-600 dark:text-slate-400">
                  {content.parentReviewCount} parent reviews
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Rundown Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-12 animate-slide-up-stagger">
          {[
            { label: 'Duration', value: content.quickRundown.duration, icon: '⏱️' },
            { label: 'Players per Side', value: content.quickRundown.playersPerSide, icon: '👥' },
            { label: 'Season', value: content.quickRundown.season, icon: '📅' },
            { label: 'Typical Age to Start', value: content.quickRundown.typicalAgeToStart, icon: '🎂' }
          ].map((item, idx) => (
            <div key={idx} className="bg-white/80 dark:bg-gray-800/50 backdrop-blur border border-slate-200/50 dark:border-slate-700/50 rounded-xl p-6 hover-lift">
              <div className="text-3xl mb-3">{item.icon}</div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">{item.label}</p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">{item.value}</p>
            </div>
          ))}
        </div>

        {/* How It Works */}
        <Card className="mb-8 bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-800/50 dark:to-gray-800/30 backdrop-blur border border-slate-200/50 dark:border-slate-700/50">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl">How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">{content.howItWorks}</p>
          </CardContent>
        </Card>

        {/* Key Skills */}
        <Card className="mb-8 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 dark:from-emerald-950/30 dark:to-teal-950/30 border border-emerald-200/50 dark:border-emerald-900/30">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Zap className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
              Key Skills Developed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.keySkills.map((skill, idx) => (
                <li key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-white/50 dark:bg-gray-800/30 hover-lift transition-all">
                  <span className="text-lg text-emerald-500 dark:text-emerald-400 font-bold flex-shrink-0">✓</span>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{skill}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Equipment */}
        <Card className="mb-8 bg-gradient-to-br from-white/90 to-white/70 dark:from-gray-800/50 dark:to-gray-800/30 backdrop-blur border border-slate-200/50 dark:border-slate-700/50">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl">Equipment You'll Need</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {content.equipment.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <span className="font-medium text-slate-900 dark:text-slate-100">{item.name}</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{item.cost}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Season Structure */}
        <Card className="mb-8 bg-gradient-to-br from-blue-50/50 to-indigo-50/50 dark:from-blue-950/30 dark:to-indigo-950/30 border border-blue-200/50 dark:border-blue-900/30">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl">The Season Looks Like</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-lg">{content.seasonStructure}</p>
          </CardContent>
        </Card>

        {/* Injuries */}
        <Card className="mb-8 bg-gradient-to-br from-orange-50/50 to-red-50/50 dark:from-orange-950/30 dark:to-red-950/30 border border-orange-200/50 dark:border-orange-900/30">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <AlertCircle className="w-6 h-6 text-orange-600 dark:text-orange-400" />
              Common Injuries & Prevention
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {content.commonInjuries.map((item, idx) => (
              <div key={idx} className="border-l-4 border-orange-500 dark:border-orange-400 pl-4 p-4 rounded bg-white/50 dark:bg-gray-800/30">
                <h4 className="font-bold text-lg text-slate-900 dark:text-white mb-3">{item.injury}</h4>
                <div className="space-y-2 text-slate-700 dark:text-slate-300">
                  <p><span className="font-semibold text-orange-600 dark:text-orange-400">Prevention:</span> {item.prevention}</p>
                  <p><span className="font-semibold text-orange-600 dark:text-orange-400">Recovery:</span> {item.recovery}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Cost Breakdown */}
        <Card className="mb-8 bg-gradient-to-br from-purple-50/50 to-pink-50/50 dark:from-purple-950/30 dark:to-pink-950/30 border border-purple-200/50 dark:border-purple-900/30">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <DollarSign className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              Cost Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { label: 'Recreational league', value: content.costs.recreational },
                { label: 'Competitive/Club', value: content.costs.competitive },
                { label: 'Private coaching', value: content.costs.coaching }
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 rounded-lg bg-white/50 dark:bg-gray-800/30 hover:bg-white dark:hover:bg-gray-800/50 transition-colors">
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{item.label}</span>
                  <span className="font-bold text-purple-600 dark:text-purple-400 text-lg">{item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Coach's Perspective */}
        <Card className="mb-8 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 dark:from-blue-950/30 dark:to-cyan-950/30 border border-blue-200/50 dark:border-blue-900/30">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-2xl">
              <Users className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              Coach's Perspective
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-white/50 dark:bg-gray-800/30 rounded-lg p-6 border-l-4 border-blue-500">
              <blockquote className="italic text-slate-700 dark:text-slate-300 text-lg mb-4 leading-relaxed">
                "{content.coachQuote}"
              </blockquote>
              <p className="font-semibold text-blue-600 dark:text-blue-400">— {content.coachName}</p>
            </div>
          </CardContent>
        </Card>

        {/* Video */}
        {content.videoUrl && (
          <Card className="mb-8 bg-white/80 dark:bg-gray-800/50 backdrop-blur border border-slate-200/50 dark:border-slate-700/50 overflow-hidden">
            <CardHeader className="pb-4">
              <CardTitle className="text-2xl">See It In Action</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video w-full rounded-xl overflow-hidden shadow-lg">
                <iframe
                  width="100%"
                  height="100%"
                  src={content.videoUrl}
                  title={`${content.name} Video`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </CardContent>
          </Card>
        )}

        {/* College Opportunity */}
        <Card className="mb-12 bg-gradient-to-br from-amber-50/50 to-yellow-50/50 dark:from-amber-950/30 dark:to-yellow-950/30 border border-amber-200/50 dark:border-amber-900/30">
          <CardHeader className="pb-4">
            <CardTitle className="text-2xl">College Opportunity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { 
                  label: '% of youth reaching college',
                  value: content.collegeOpportunity.percentReachCollege + '%',
                  icon: '📈'
                },
                {
                  label: 'D1 Scholarships',
                  value: content.collegeOpportunity.scholarshipsAvailable ? 'Available' : 'Limited',
                  icon: '🎓'
                },
                {
                  label: 'Investment to D1 Level',
                  value: content.collegeOpportunity.investmentToReachCollege,
                  icon: '💰'
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-white/50 dark:bg-gray-800/30 rounded-lg p-4 text-center hover-lift">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">{item.label}</p>
                  <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">{item.value}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center py-12 border-t border-slate-200 dark:border-slate-800">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Ready to try {content.name}?
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8 max-w-2xl mx-auto">
            Check out local programs and coaches in your area to get started on this exciting sporting journey.
          </p>
          <Link to="/programs">
            <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-6 px-8 text-lg hover-lift">
              Find Local Programs
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
