import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  Sprout, 
  TrendingUp, 
  ShieldCheck, 
  ArrowRight, 
  Play, 
  LogIn, 
  UserPlus, 
  MapPin, 
  Lock, 
  Phone, 
  User,
  Sparkles,
  CheckCircle2
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const { login, signup, demoLogin } = useAuth();

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);

  // Form states
  const [loginMobile, setLoginMobile] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const [signupName, setSignupName] = useState('');
  const [signupMobile, setSignupMobile] = useState('');
  const [signupLocation, setSignupLocation] = useState('Nashik');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupError, setSignupError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDemoClick = async () => {
    setIsSubmitting(true);
    await demoLogin();
    setIsSubmitting(false);
    navigate('/input');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');
    setIsSubmitting(true);
    try {
      await login(loginMobile, loginPassword);
      setShowLoginModal(false);
      navigate('/input');
    } catch (err) {
      setLoginError(err.response?.data?.detail || 'Invalid mobile number or password.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setSignupError('');
    setIsSubmitting(true);
    try {
      await signup(signupName, signupMobile, signupLocation, signupPassword);
      setShowSignupModal(false);
      navigate('/input');
    } catch (err) {
      setSignupError(err.response?.data?.detail || 'Failed to create account. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#06110a] text-slate-100 flex flex-col justify-between relative overflow-hidden">
      {/* Background Decorative Lighting & Glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-600/20 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 -right-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Top Navbar */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-900/50">
            <Sprout className="w-7 h-7 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white flex items-center gap-2">
              KrishiSetu <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">AI</span>
            </h1>
            <p className="text-xs text-emerald-400 font-medium">SIH Prototype Edition</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowLoginModal(true)}
            className="px-4 py-2 rounded-xl border border-emerald-700/50 text-emerald-300 hover:bg-emerald-900/30 text-sm font-semibold transition-all flex items-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            LOGIN
          </button>
          <button
            onClick={() => setShowSignupModal(true)}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-semibold transition-all shadow-md shadow-emerald-900/40 flex items-center gap-2"
          >
            <UserPlus className="w-4 h-4" />
            CREATE ACCOUNT
          </button>
        </div>
      </nav>

      {/* Main Hero Section */}
      <main className="w-full max-w-7xl mx-auto px-6 py-10 my-auto z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column Text & Action Buttons */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-spin" style={{ animationDuration: '4s' }} />
            Smart India Hackathon Prototype
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Sell Smarter. <br />
            <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
              Earn Better.
            </span>
          </h1>

          <p className="text-base md:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">
            AI-powered farm sale decisions that help farmers choose the right market, buyer and selling time — maximizing actual net realisation after transport & handling costs.
          </p>

          {/* Core Feature Badges */}
          <div className="pt-2 flex flex-wrap gap-4 justify-center lg:justify-start text-xs font-medium text-slate-300">
            <div className="flex items-center gap-2 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Net Realisation Formula
            </div>
            <div className="flex items-center gap-2 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> AI Mandi Scoring
            </div>
            <div className="flex items-center gap-2 bg-emerald-950/40 border border-emerald-800/40 px-3 py-1.5 rounded-lg">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> ML What-If Forecast
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            {/* TRY DEMO BUTTON */}
            <button
              onClick={handleDemoClick}
              disabled={isSubmitting}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-emerald-500 to-emerald-600 hover:from-amber-400 hover:to-emerald-500 text-white font-extrabold text-lg shadow-xl shadow-emerald-900/60 hover:scale-[1.02] transition-all flex items-center justify-center gap-3 border border-amber-300/30 glow-gold cursor-pointer"
            >
              <Play className="w-6 h-6 fill-white" />
              TRY DEMO
              <ArrowRight className="w-5 h-5 ml-1" />
            </button>

            <button
              onClick={() => setShowLoginModal(true)}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-200 border border-emerald-700/50 font-bold text-base transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <LogIn className="w-5 h-5 text-emerald-400" />
              LOGIN
            </button>

            <button
              onClick={() => setShowSignupModal(true)}
              className="w-full sm:w-auto px-6 py-4 rounded-2xl bg-emerald-900/30 hover:bg-emerald-900/50 text-emerald-300 border border-emerald-800/50 font-bold text-base transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <UserPlus className="w-5 h-5" />
              CREATE ACCOUNT
            </button>
          </div>

          <p className="text-xs text-slate-400 font-mono text-center lg:text-left">
            * Instant Demo Access seeded for <span className="text-amber-300 font-bold">Demo Farmer (Nashik)</span>
          </p>
        </div>

        {/* Right Column Visual Graphic */}
        <div className="lg:col-span-5 relative flex justify-center">
          <div className="w-full max-w-md p-6 rounded-3xl glass-panel glow-emerald relative z-10 border border-emerald-500/30">
            {/* Visual Header Card */}
            <div className="relative rounded-2xl overflow-hidden mb-6 bg-gradient-to-b from-emerald-800 to-emerald-950 p-6 text-center border border-emerald-500/20">
              <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-400/50 flex items-center justify-center mb-3">
                <span className="text-4xl">👨‍🌾</span>
              </div>
              <h3 className="text-xl font-bold text-white">Smart Mandi Decision</h3>
              <p className="text-xs text-emerald-200 mt-1">Comparing 20+ Mandis & Logistics</p>
            </div>

            {/* Quick Live Preview Cards */}
            <div className="space-y-3 text-sm">
              <div className="p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-500/30 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-500/20 flex items-center justify-center text-emerald-300 font-bold">
                    🧅
                  </div>
                  <div>
                    <div className="font-bold text-white text-xs">Recommended Market</div>
                    <div className="text-emerald-400 font-extrabold">LASALGAON MANDI</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-400">Net Realisation</div>
                  <div className="text-amber-400 font-extrabold text-sm">₹2,020/q</div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between">
                <div>
                  <div className="text-xs text-amber-300 font-bold uppercase tracking-wider">Expected Farmer Income</div>
                  <div className="text-2xl font-extrabold text-amber-400">₹10,100</div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30">
                  + ₹1,500 FPO Option
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* LOGIN MODAL */}
      {showLoginModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0b1b11] border border-emerald-500/40 rounded-3xl w-full max-w-md p-6 shadow-2xl relative">
            <button
              onClick={() => setShowLoginModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl font-bold w-8 h-8 rounded-full bg-emerald-950 flex items-center justify-center"
            >
              ×
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-2">
                <LogIn className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-extrabold text-white">Farmer Login</h3>
              <p className="text-xs text-slate-400 mt-1">Access your saved crop analysis & sales</p>
            </div>

            {/* SIH Judge Demo Hint */}
            <div className="mb-5 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-300 flex items-center justify-between">
              <div>
                <span className="font-bold">SIH Judge Demo Login:</span>
                <br />Mobile: <span className="font-mono font-bold text-white">9999999999</span> | Pass: <span className="font-mono font-bold text-white">demo123</span>
              </div>
              <button
                onClick={() => {
                  setLoginMobile('9999999999');
                  setLoginPassword('demo123');
                }}
                className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs"
              >
                Auto Fill
              </button>
            </div>

            {loginError && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/80 border border-red-500/50 text-red-300 text-xs font-semibold">
                {loginError}
              </div>
            )}

            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Mobile Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-3.5 text-emerald-500" />
                  <input
                    type="text"
                    required
                    value={loginMobile}
                    onChange={(e) => setLoginMobile(e.target.value)}
                    placeholder="Enter 10-digit mobile"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 text-sm font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-3.5 text-emerald-500" />
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-base shadow-lg shadow-emerald-900/50 transition-all mt-2 cursor-pointer"
              >
                {isSubmitting ? 'Authenticating...' : 'LOGIN'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* SIGNUP MODAL */}
      {showSignupModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#0b1b11] border border-emerald-500/40 rounded-3xl w-full max-w-md p-6 shadow-2xl relative">
            <button
              onClick={() => setShowSignupModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-white text-xl font-bold w-8 h-8 rounded-full bg-emerald-950 flex items-center justify-center"
            >
              ×
            </button>

            <div className="text-center mb-6">
              <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-2">
                <UserPlus className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-extrabold text-white">Create Farmer Account</h3>
              <p className="text-xs text-slate-400 mt-1">Join KrishiSetu AI for smarter crop earnings</p>
            </div>

            {signupError && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/80 border border-red-500/50 text-red-300 text-xs font-semibold">
                {signupError}
              </div>
            )}

            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-3.5 text-emerald-500" />
                  <input
                    type="text"
                    required
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder="e.g. Ramesh Patil"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Mobile Number</label>
                <div className="relative">
                  <Phone className="w-4 h-4 absolute left-3 top-3.5 text-emerald-500" />
                  <input
                    type="text"
                    required
                    value={signupMobile}
                    onChange={(e) => setSignupMobile(e.target.value)}
                    placeholder="Enter 10-digit mobile"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 text-sm font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Location / District</label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3 top-3.5 text-emerald-500" />
                  <select
                    value={signupLocation}
                    onChange={(e) => setSignupLocation(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-white focus:outline-none focus:border-emerald-400 text-sm"
                  >
                    <option value="Nashik">Nashik</option>
                    <option value="Pune">Pune</option>
                    <option value="Ahmednagar">Ahmednagar</option>
                    <option value="Kolhapur">Kolhapur</option>
                    <option value="Nagpur">Nagpur</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Password</label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-3.5 text-emerald-500" />
                  <input
                    type="password"
                    required
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    placeholder="Create a password"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-emerald-950/60 border border-emerald-800 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 text-sm"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-base shadow-lg shadow-emerald-900/50 transition-all mt-2 cursor-pointer"
              >
                {isSubmitting ? 'Creating Account...' : 'CREATE ACCOUNT'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
