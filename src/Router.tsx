import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Results } from './pages/Results';
import { About } from './pages/About';
import { Sport101 } from './pages/Sport101';
import { BudgetPlanner } from './pages/BudgetPlanner';
import { ProgramsDirectory } from './pages/ProgramsDirectory';
import { TrialTracker } from './pages/TrialTracker';
import { Resources } from './pages/Resources';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
        <Route path="/about" element={<About />} />
        <Route path="/sports/:sportId" element={<Sport101 />} />
        <Route path="/budget" element={<BudgetPlanner />} />
        <Route path="/programs" element={<ProgramsDirectory />} />
        <Route path="/trials" element={<TrialTracker />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
