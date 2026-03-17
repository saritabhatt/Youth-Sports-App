import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home } from './pages/Home';
import { Results } from './pages/Results';
import { About } from './pages/About';
import SportDetail from './pages/SportDetail';

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/results" element={<Results />} />
        <Route path="/about" element={<About />} />
        <Route path="/sports/:sportId" element={<SportDetail />} />
        {/* New features will add routes here */}
        {/* /budget-planner */}
        {/* /local-programs */}
        {/* /trials */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
