import { Link } from 'react-router-dom';
import { Home, BookOpen, DollarSign, MapPin, CheckSquare } from 'lucide-react';

export function Navigation() {
  return (
    <nav className="flex items-center gap-2 sm:gap-4 flex-wrap">
      <Link
        to="/"
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
        title="Home"
      >
        <Home className="w-4 h-4" />
        <span className="hidden sm:inline">Home</span>
      </Link>
      
      <Link
        to="/trials"
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
        title="Trial Tracker"
      >
        <CheckSquare className="w-4 h-4" />
        <span className="hidden sm:inline">Trials</span>
      </Link>

      <Link
        to="/budget"
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-green-600 dark:hover:text-green-400 transition-colors"
        title="Budget Planner"
      >
        <DollarSign className="w-4 h-4" />
        <span className="hidden sm:inline">Budget</span>
      </Link>

      <Link
        to="/programs"
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-orange-600 dark:hover:text-orange-400 transition-colors"
        title="Programs Directory"
      >
        <MapPin className="w-4 h-4" />
        <span className="hidden sm:inline">Programs</span>
      </Link>

      <Link
        to="/about"
        className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        title="About"
      >
        <BookOpen className="w-4 h-4" />
        <span className="hidden sm:inline">About</span>
      </Link>
    </nav>
  );
}
