import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const checkHealth = async () => {
  try {
    const res = await api.get('/api/health');
    return res.data;
  } catch (err) {
    console.error('Health check error:', err);
    return { status: 'error' };
  }
};

export const loginUser = async (mobile, password) => {
  const res = await api.post('/api/auth/login', { mobile, password });
  return res.data;
};

export const signupUser = async (name, mobile, location, password) => {
  const res = await api.post('/api/auth/signup', { name, mobile, location, password });
  return res.data;
};

export const analyzeCropSale = async (payload) => {
  const res = await api.post('/api/crop-analysis', payload);
  return res.data;
};

export const fetchWhatIfSimulation = async (payload) => {
  const res = await api.post('/api/what-if', payload);
  return res.data;
};

export default api;
