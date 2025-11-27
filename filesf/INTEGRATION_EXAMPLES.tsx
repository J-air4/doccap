/**
 * EXAMPLE: How to Integrate Classic Builder into Your App
 * 
 * This file shows two approaches:
 * 1. Add as a separate route
 * 2. Add as a toggle/switch in your main app
 */

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import ClinicalNarrativeBuilder from './ClinicalNarrativeBuilder'; // Your current app
import ClassicNarrativeBuilder from './features/classic-builder/ClassicNarrativeBuilder';

// ============================================
// OPTION 1: Separate Route (Recommended)
// ============================================

export function AppWithRoutes() {
  return (
    <BrowserRouter>
      {/* Navigation */}
      <nav className="bg-gray-800 text-white p-4">
        <div className="max-w-7xl mx-auto flex gap-4">
          <Link to="/" className="hover:text-blue-300">Modern Builder</Link>
          <Link to="/classic" className="hover:text-blue-300">Classic Builder</Link>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/" element={<ClinicalNarrativeBuilder />} />
        <Route path="/classic" element={<ClassicNarrativeBuilder />} />
      </Routes>
    </BrowserRouter>
  );
}

// ============================================
// OPTION 2: Toggle Between Modes
// ============================================

export function AppWithToggle() {
  const [useClassicMode, setUseClassicMode] = useState(false);

  return (
    <div>
      {/* Mode Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <button
          onClick={() => setUseClassicMode(!useClassicMode)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
        >
          {useClassicMode ? '🆕 Switch to Modern' : '🕹️ Switch to Classic'}
        </button>
      </div>

      {/* Render Current Mode */}
      {useClassicMode ? (
        <ClassicNarrativeBuilder />
      ) : (
        <ClinicalNarrativeBuilder />
      )}
    </div>
  );
}

// ============================================
// OPTION 3: Modal/Popup (Advanced)
// ============================================

export function AppWithModal() {
  const [showClassicBuilder, setShowClassicBuilder] = useState(false);

  return (
    <div>
      {/* Your Current App */}
      <ClinicalNarrativeBuilder />

      {/* Button to Open Classic Builder */}
      <button
        onClick={() => setShowClassicBuilder(true)}
        className="fixed bottom-4 right-4 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
      >
        🕹️ Try Classic Mode
      </button>

      {/* Classic Builder as Modal */}
      {showClassicBuilder && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
          <div className="absolute inset-4 bg-white rounded-lg shadow-2xl overflow-auto">
            <button
              onClick={() => setShowClassicBuilder(false)}
              className="absolute top-4 right-4 z-10 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              ✕ Close Classic Mode
            </button>
            <ClassicNarrativeBuilder />
          </div>
        </div>
      )}
    </div>
  );
}

// ============================================
// OPTION 4: User Preference (Persistent)
// ============================================

export function AppWithUserPreference() {
  const [preferClassic, setPreferClassic] = useState(() => {
    const saved = localStorage.getItem('prefer-classic-mode');
    return saved === 'true';
  });

  const toggleMode = () => {
    const newValue = !preferClassic;
    setPreferClassic(newValue);
    localStorage.setItem('prefer-classic-mode', String(newValue));
  };

  return (
    <div>
      {/* Persistent Mode Toggle */}
      <div className="fixed top-4 right-4 z-50 bg-white rounded-lg shadow-lg p-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={preferClassic}
            onChange={toggleMode}
            className="w-5 h-5"
          />
          <span className="text-sm font-medium">
            Use Classic Mode
          </span>
        </label>
      </div>

      {/* Render Preferred Mode */}
      {preferClassic ? (
        <ClassicNarrativeBuilder />
      ) : (
        <ClinicalNarrativeBuilder />
      )}
    </div>
  );
}

// ============================================
// Export Default (Choose One)
// ============================================

// Pick the approach you want:
export default AppWithRoutes;
// export default AppWithToggle;
// export default AppWithModal;
// export default AppWithUserPreference;
