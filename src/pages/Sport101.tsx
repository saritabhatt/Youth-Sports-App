import { useParams } from 'react-router-dom';
import { getSport101Content } from '../data/sport101Content';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { ArrowLeft, Star, Users, TrendingUp, DollarSign } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Sport101() {
  const { sportId } = useParams<{ sportId: string }>();
  const content = sportId ? getSport101Content(sportId) : null;

  if (!content) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950 p-6">
        <div className="max-w-4xl mx-auto">
          <Link to="/">
            <Button variant="outline" size="sm" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold">Sport not found</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">We couldn't find that sport.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 p-6">
      <div className="max-w-4xl mx-auto">
        <Link to="/">
          <Button variant="outline" size="sm" className="mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </Link>

        <div className="mb-8">
          <div className="text-6xl mb-4">{content.emoji}</div>
          <h1 className="text-4xl font-bold mb-2">{content.name}</h1>
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(content.parentRating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-semibold">{content.parentRating}</span>
            <span className="text-gray-600 dark:text-gray-400">({content.parentReviewCount} parent reviews)</span>
          </div>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Quick Rundown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Duration</p>
                <p className="font-semibold">{content.quickRundown.duration}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Players per Side</p>
                <p className="font-semibold">{content.quickRundown.playersPerSide}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Season</p>
                <p className="font-semibold">{content.quickRundown.season}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Typical Age to Start</p>
                <p className="font-semibold">{content.quickRundown.typicalAgeToStart}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{content.howItWorks}</p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Key Skills Developed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {content.keySkills.map((skill, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-green-500 mt-1">✓</span>
                  <span>{skill}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Equipment You'll Need</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {content.equipment.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center">
                  <span>{item.name}</span>
                  <span className="text-gray-600 dark:text-gray-400">{item.cost}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>The Season Looks Like</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{content.seasonStructure}</p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Common Injuries & Prevention</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {content.commonInjuries.map((item, idx) => (
              <div key={idx} className="border-l-4 border-orange-500 pl-4">
                <h4 className="font-semibold text-lg mb-2">{item.injury}</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="font-semibold">Prevention:</span> {item.prevention}</p>
                  <p><span className="font-semibold">Recovery:</span> {item.recovery}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Cost Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="font-semibold">Recreational league</span>
                <span>{content.costs.recreational}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Competitive/Club</span>
                <span>{content.costs.competitive}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold">Private coaching</span>
                <span>{content.costs.coaching}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mb-6 bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Coach's Perspective
            </CardTitle>
          </CardHeader>
          <CardContent>
            <blockquote className="italic text-gray-700 dark:text-gray-300 mb-2">
              "{content.coachQuote}"
            </blockquote>
            <p className="text-sm font-semibold text-gray-600 dark:text-gray-400">— {content.coachName}</p>
          </CardContent>
        </Card>

        {content.videoUrl && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>See It In Action</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video w-full rounded-lg overflow-hidden">
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

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>College Opportunity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span>% of youth players reaching college</span>
              <span className="font-semibold">{content.collegeOpportunity.percentReachCollege}%</span>
            </div>
            <div className="flex justify-between">
              <span>D1 scholarships available</span>
              <span className="font-semibold">{content.collegeOpportunity.scholarshipsAvailable ? 'Yes' : 'No'}</span>
            </div>
            <div className="flex justify-between">
              <span>Investment to reach college level</span>
              <span className="font-semibold">{content.collegeOpportunity.investmentToReachCollege}</span>
            </div>
          </CardContent>
        </Card>

        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            Ready to try {content.name}? Check out local programs and coaches in your area.
          </p>
          <Link to="/programs">
            <Button size="lg">Find Local Programs</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
