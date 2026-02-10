import { useState, useRef, useEffect } from 'react';
import { ChildProfile, ScoredSport } from '../data/scoringEngine';
import { downloadTextReport, downloadCSVReport, openPrintableReport } from '../data/exportUtils';

interface ExportMenuProps {
  profile: ChildProfile;
  scoredSports: ScoredSport[];
}

export default function ExportMenu({ profile, scoredSports }: ExportMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleExport = (type: 'text' | 'csv' | 'pdf') => {
    switch (type) {
      case 'text':
        downloadTextReport(profile, scoredSports);
        break;
      case 'csv':
        downloadCSVReport(profile, scoredSports);
        break;
      case 'pdf':
        openPrintableReport(profile, scoredSports);
        break;
    }
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors text-sm font-medium text-slate-700"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Export
        <svg className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
          <div className="px-3 py-2 border-b border-slate-100">
            <p className="text-xs text-slate-500">Export recommendations for</p>
            <p className="font-medium text-slate-800">{profile.name}</p>
          </div>
          
          <div className="py-1">
            <button
              onClick={() => handleExport('pdf')}
              className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center gap-3 transition-colors"
            >
              <span className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center" aria-hidden="true">
                <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </span>
              <div>
                <div className="text-sm font-medium text-slate-800">PDF Report</div>
                <div className="text-xs text-slate-500">Print-ready format</div>
              </div>
            </button>

            <button
              onClick={() => handleExport('text')}
              className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center gap-3 transition-colors"
            >
              <span className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center" aria-hidden="true">
                <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </span>
              <div>
                <div className="text-sm font-medium text-slate-800">Text Report</div>
                <div className="text-xs text-slate-500">Detailed plain text</div>
              </div>
            </button>

            <button
              onClick={() => handleExport('csv')}
              className="w-full px-3 py-2 text-left hover:bg-slate-50 flex items-center gap-3 transition-colors"
            >
              <span className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center" aria-hidden="true">
                <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </span>
              <div>
                <div className="text-sm font-medium text-slate-800">CSV Data</div>
                <div className="text-xs text-slate-500">For spreadsheets</div>
              </div>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
