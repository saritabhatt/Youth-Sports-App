import { Link } from 'react-router-dom';
import { Home, BookOpen, DollarSign, MapPin, CheckSquare } from 'lucide-react';

export function Navigation() {
  return (
    <nav className="flex items-center gap-1 sm:gap-2 flex-wrap">
      <Link
        to="/"
        className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 hover-lift text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 group"
        title="Home"
      >
        <Home className="w-5 h-5 transition-transform group-hover:scale-110" />
        <span className="hidden sm:inline">Home</span>
      </Link>
      
      <Link
        to="/trials"
        className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 hover-lift text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-950/30 group"
        title="Trial Tracker"
      >
        <CheckSquare className="w-5 h-5 transition-transform group-hover:scale-110" />
        <span className="hidden sm:inline">Trials</span>
      </Link>

      <Link
        to="/budget"
        className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 hover-lift text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/30 group"
        title="Budget Planner"
      >
        <DollarSign className="w-5 h-5 transition-transform group-hover:scale-110" />
        <span className="hidden sm:inline">Budget</span>
      </Link>

      <Link
        to="/programs"
        className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 hover-lift text-slate-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 hover:bg-orange-50 dark:hover:bg-orange-950/30 group"
        title="Programs Directory"
      >
        <MapPin className="w-5 h-5 transition-transform group-hover:scale-110" />
        <span className="hidden sm:inline">Programs</span>
      </Link>

      <Link
        to="/about"
        className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 hover-lift text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/30 group"
        title="About"
      >
        <BookOpen className="w-5 h-5 transition-transform group-hover:scale-110" />
        <span className="hidden sm:inline">About</span>
      </Link>
    </nav>
  );
}
