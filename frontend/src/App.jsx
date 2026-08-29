import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import LandingPage from './pages/LandingPage';
import FarmerInputPage from './pages/FarmerInputPage';
import DecisionPage from './pages/DecisionPage';
import WhatIfPage from './pages/WhatIfPage';
import Footer from './components/Footer';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-[#06110a] text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-white">
          <div className="flex-1 flex flex-col">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/input" element={<FarmerInputPage />} />
              <Route path="/decision" element={<DecisionPage />} />
              <Route path="/what-if" element={<WhatIfPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
