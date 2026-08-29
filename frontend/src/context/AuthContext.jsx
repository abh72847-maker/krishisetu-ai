import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, signupUser } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [farmer, setFarmer] = useState(() => {
    const saved = localStorage.getItem('krishisetu_farmer');
    return saved ? JSON.parse(saved) : null;
  });

  const [latestAnalysis, setLatestAnalysis] = useState(() => {
    const saved = localStorage.getItem('krishisetu_analysis');
    return saved ? JSON.parse(saved) : null;
  });

  const saveFarmerState = (data) => {
    setFarmer(data);
    localStorage.setItem('krishisetu_farmer', JSON.stringify(data));
  };

  const saveAnalysisState = (data) => {
    setLatestAnalysis(data);
    localStorage.setItem('krishisetu_analysis', JSON.stringify(data));
  };

  const login = async (mobile, password) => {
    const data = await loginUser(mobile, password);
    saveFarmerState(data);
    return data;
  };

  const demoLogin = async () => {
    try {
      const data = await loginUser("9999999999", "demo123");
      saveFarmerState(data);
      return data;
    } catch (err) {
      // Fallback demo farmer object if backend call fails during offline preview
      const fallbackDemo = {
        token: "demo_token_9999999999",
        farmer_id: 1,
        name: "Demo Farmer",
        mobile: "9999999999",
        location: "Nashik"
      };
      saveFarmerState(fallbackDemo);
      return fallbackDemo;
    }
  };

  const signup = async (name, mobile, location, password) => {
    const data = await signupUser(name, mobile, location, password);
    saveFarmerState(data);
    return data;
  };

  const logout = () => {
    setFarmer(null);
    setLatestAnalysis(null);
    localStorage.removeItem('krishisetu_farmer');
    localStorage.removeItem('krishisetu_analysis');
  };

  return (
    <AuthContext.Provider value={{
      farmer,
      latestAnalysis,
      saveAnalysisState,
      login,
      demoLogin,
      signup,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
