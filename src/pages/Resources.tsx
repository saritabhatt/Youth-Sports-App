import { Link } from 'react-router-dom';
import { Brain, TrendingUp, AlertCircle, Heart, Users, BookOpen, ExternalLink } from 'lucide-react';

export function Resources() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-950 dark:via-blue-950/20 dark:to-purple-950/20">
      {/* Hero */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            The Power of Youth Sports
          </h1>
          <p className="text-lg md:text-xl opacity-95 max-w-3xl mx-auto">
            Research-backed insights on why youth sports matter for mental health, confidence, and development—plus what we're missing for our girls.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 py-16 md:py-20">
        {/* Key Stats Section */}
        <section className="mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-12">
            The Research is Clear
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: Brain,
                title: "Mental Health",
                stat: "23-35%",
                desc: "Lower risk of depression for boys who play sports vs. non-athletes",
                color: "emerald"
              },
              {
                icon: Brain,
                title: "Mental Health (Girls)",
                stat: "11-14%",
                desc: "Lower risk of anxiety and depression for girls who play sports",
                color: "blue"
              },
              {
                icon: Heart,
                title: "Continuous Participation",
                stat: "Proven",
                desc: "Staying in sports throughout youth = better adult mental health",
                color: "rose"
              },
              {
                icon: TrendingUp,
                title: "Academic Performance",
                stat: "Higher Scores",
                desc: "Sports participants show improved grades, attendance, and test scores",
                color: "purple"
              },
              {
                icon: Users,
                title: "Team Sports Edge",
                stat: "19%",
                desc: "Lower depression scores for team sport participants vs. individual sport",
                color: "amber"
              },
              {
                icon: AlertCircle,
                title: "The Dropoff",
                stat: "Age 14",
                desc: "Girls drop out at 2x the rate of boys by age 14 (49% vs. 8%)",
                color: "red"
              }
            ].map((stat, idx) => {
              const Icon = stat.icon;
              const colorMap: Record<string, string> = {
                emerald: "from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 border-emerald-200 dark:border-emerald-900/50",
                blue: "from-blue-50 to-cyan-50 dark:from-blue-900/30 dark:to-cyan-900/30 border-blue-200 dark:border-blue-900/50",
                rose: "from-rose-50 to-pink-50 dark:from-rose-900/30 dark:to-pink-900/30 border-rose-200 dark:border-rose-900/50",
                purple: "from-purple-50 to-indigo-50 dark:from-purple-900/30 dark:to-indigo-900/30 border-purple-200 dark:border-purple-900/50",
                amber: "from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 border-amber-200 dark:border-amber-900/50",
                red: "from-red-50 to-rose-50 dark:from-red-900/30 dark:to-rose-900/30 border-red-200 dark:border-red-900/50",
              };

              return (
                <div
                  key={idx}
                  className={`bg-gradient-to-br ${colorMap[stat.color]} border rounded-2xl p-6 hover:shadow-lg transition-shadow`}
                >
                  <Icon className="w-8 h-8 mb-4 text-slate-900 dark:text-white" />
                  <h3 className="font-bold text-slate-900 dark:text-white mb-2">{stat.title}</h3>
                  <p className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3">
                    {stat.stat}
                  </p>
                  <p className="text-sm text-slate-700 dark:text-slate-300">{stat.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Mental Health Benefits */}
        <section className="mb-16">
          <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <Brain className="w-8 h-8 text-emerald-600" />
              Mental Health Benefits: The Evidence
            </h3>
            
            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 text-lg">
                  🎯 How Team Sports Protect Mental Health
                </h4>
                <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                  <li className="flex gap-3">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><strong>Stronger effects than individual sports:</strong> Team sports show 19% lower depression scores and 17% lower social problem scores</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><strong>Built-in social support:</strong> Teammates provide belonging, reducing loneliness and isolation</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><strong>Endorphin release:</strong> Physical activity naturally reduces anxiety and depression symptoms</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><strong>Confidence from achievement:</strong> Personal and group victories boost self-esteem</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span><strong>Coping skills:</strong> Learning to handle setbacks, pressure, and conflict</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-emerald-50 to-teal-50 dark:from-emerald-900/30 dark:to-teal-900/30 rounded-xl p-6 border border-emerald-200 dark:border-emerald-900/50">
                <p className="text-slate-700 dark:text-slate-300">
                  <strong className="text-emerald-700 dark:text-emerald-400">Key Finding:</strong> A critical discovery is that <strong>dropping out of sports is worse for mental health than never playing</strong>. This suggests the environment and reasons for quitting matter enormously. Kids who quit due to fun factors show better outcomes than those who experience abuse, conflict, or shame.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-2 text-lg">
                  📊 By the Numbers: Mental Health Protection
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { label: "Depression risk (boys)", value: "35% lower" },
                    { label: "Anxiety risk (boys)", value: "21% lower" },
                    { label: "Depression risk (girls)", value: "11% lower" },
                    { label: "Anxiety risk (girls)", value: "14% lower" },
                    { label: "Exercise/day at age 11", value: "12% lower mental health risk per hour" },
                    { label: "Best outcome", value: "Continuous team sports through youth" }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{item.label}</p>
                      <p className="text-xl font-bold text-slate-900 dark:text-white">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Girls Dropout Crisis */}
        <section className="mb-16">
          <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-rose-600" />
              The Girls Dropout Crisis: We're Losing Half Our Athletes
            </h3>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-rose-50 to-pink-50 dark:from-rose-900/30 dark:to-pink-900/30 rounded-xl p-6 border border-rose-200 dark:border-rose-900/50">
                <p className="text-slate-700 dark:text-slate-300 text-lg">
                  <strong className="text-rose-700 dark:text-rose-400">The Crisis:</strong> By age 14, girls drop out of sports at <strong>2x the rate of boys</strong>. Globally, <strong>49% of girls disengage from sports during adolescence</strong>—a rate 6x higher than boys.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-4 text-lg">
                  🚨 Why Girls Are Leaving (Real Data)
                </h4>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { barrier: "Fear of being judged", percent: "68%", icon: "😳" },
                    { barrier: "Body image concerns", percent: "61%", icon: "😟" },
                    { barrier: "Don't like being watched", percent: "73%", icon: "👀" },
                    { barrier: "Period-related avoidance", percent: "78%", icon: "⚠️" },
                    { barrier: "Low confidence (age 14-15)", percent: "46%", icon: "😔" },
                    { barrier: "Experienced sexist abuse", percent: "33% (42% ages 15-18)", icon: "⚠️" },
                    { barrier: "Schoolwork pressure", percent: "47%", icon: "📚" },
                    { barrier: "PE enjoyment drops with age", percent: "from 86% (age 8) to 56% (age 14-15)", icon: "📉" }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4">
                      <p className="text-3xl mb-2">{item.icon}</p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">{item.barrier}</p>
                      <p className="text-xl font-bold text-rose-600 dark:text-rose-400">{item.percent}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-3 text-lg">
                  📍 Structural Barriers Making It Worse
                </h4>
                <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                  <li className="flex gap-3">
                    <span className="text-rose-600 font-bold">⚠️</span>
                    <span><strong>1.3 million fewer team spots</strong> for girls than boys on high school/college teams</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-rose-600 font-bold">⚠️</span>
                    <span><strong>Only 27% of youth sports coaches are women</strong> → girls lack mentors and role models</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-rose-600 font-bold">⚠️</span>
                    <span><strong>Less funding for girls' programs</strong> → fewer fields, less equipment, worse facilities</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-rose-600 font-bold">⚠️</span>
                    <span><strong>Early specialization</strong> → 70% of kids experience burnout by age 13</span>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 rounded-xl p-6 border border-amber-200 dark:border-amber-900/50">
                <h4 className="font-bold text-slate-900 dark:text-white mb-2">
                  💡 What Girls Actually Want (The Good News)
                </h4>
                <p className="text-slate-700 dark:text-slate-300">
                  Girls participate in sports for the <strong>same reasons as boys: for fun, to be with friends, and to get fit</strong>. The issue isn't motivation—it's the environment. When sports are inclusive, judgment-free, and focused on enjoyment rather than winning, girls stay engaged.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Academic & Confidence */}
        <section className="mb-16">
          <div className="bg-white/80 dark:bg-gray-800/50 backdrop-blur border border-slate-200/50 dark:border-slate-700/50 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-purple-600" />
              Beyond Sports: Academic & Life Success
            </h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-4 text-lg">
                  📈 Academic Benefits
                </h4>
                <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                  <li className="flex gap-3">
                    <span className="text-purple-600">✓</span>
                    <span>Higher test scores (NAPLAN, state assessments)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-purple-600">✓</span>
                    <span>Lower absenteeism rates</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-purple-600">✓</span>
                    <span>Better attention and memory</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-purple-600">✓</span>
                    <span>More likely to pursue higher education</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-purple-600">✓</span>
                    <span>Improved concentration and problem-solving</span>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 dark:text-white mb-4 text-lg">
                  💪 Life Skills & Character
                </h4>
                <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                  <li className="flex gap-3">
                    <span className="text-purple-600">✓</span>
                    <span>Discipline and goal-setting</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-purple-600">✓</span>
                    <span>Teamwork and communication</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-purple-600">✓</span>
                    <span>Leadership and responsibility</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-purple-600">✓</span>
                    <span>Perseverance through challenges</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-purple-600">✓</span>
                    <span>Emotional regulation and resilience</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="mb-12">
          <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-2xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Make the Right Choice for Your Child
            </h3>
            <p className="text-lg opacity-95 mb-8 max-w-2xl mx-auto">
              The research is clear: sports change lives. But not all sports environments are equal. Find the sport and program that makes your child feel confident, included, and excited to play.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-white text-emerald-600 font-bold py-3 px-8 rounded-xl hover:bg-slate-50 transition-colors"
            >
              Start the Assessment
              <ExternalLink className="w-5 h-5" />
            </Link>
          </div>
        </section>

        {/* Sources */}
        <section>
          <div className="bg-slate-100/50 dark:bg-slate-800/30 rounded-2xl p-8">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              Research Sources
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
              This page is backed by peer-reviewed research and reports from:
            </p>
            <ul className="grid md:grid-cols-2 gap-3 text-sm text-slate-700 dark:text-slate-300">
              {[
                "Aspen Institute - State of Play (2024-2025)",
                "British Journal of Sports Medicine",
                "Sociology of Sport Journal",
                "PLOS ONE - Sport Participation Studies",
                "UNESCO - Women & Girls in Sport",
                "NFHS - High School Sports Participation",
                "CDC - Sports Injury Data",
                "Project Play Research Institute"
              ].map((source, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="text-emerald-600">•</span>
                  {source}
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
