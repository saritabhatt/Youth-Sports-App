import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Results } from './pages/Results';
import { About } from './pages/About';
import SportDetail from './pages/SportDetail';
import BudgetPlanner from './pages/BudgetPlanner';
import LocalPrograms from './pages/LocalPrograms';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
        <Route path="/about" element={<About />} />
        <Route path="/sports/:sportId" element={<SportDetail />} />
        <Route path="/budget-planner" element={<BudgetPlanner />} />
        <Route path="/local-programs" element={<LocalPrograms />} />
        {/* /trials route to be added after Trial Tracker feature */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
