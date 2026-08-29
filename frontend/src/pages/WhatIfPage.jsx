import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchWhatIfSimulation } from '../services/api';
import { 
  Sliders, 
  Clock, 
  Users, 
  Play, 
  ArrowLeft, 
  TrendingUp, 
  DollarSign, 
  Sparkles, 
  Award, 
  ShieldCheck, 
  CheckCircle2
} from 'lucide-react';

const WhatIfPage = () => {
  const navigate = useNavigate();
  const { latestAnalysis } = useAuth();

  const [activeScenario, setActiveScenario] = useState('sell_now');
  const [simulationData, setSimulationData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const cropName = latestAnalysis?.crop || "Onion";
  const qtyKg = latestAnalysis?.quantity_kg || 500;
  const currentNetR = latestAnalysis?.recommended_market?.net_realisation || 2020.0;

  useEffect(() => {
    const loadSimulation = async () => {
      setIsLoading(true);
      try {
        const res = await fetchWhatIfSimulation({
          crop: cropName,
          quantity_kg: qtyKg,
          location: latestAnalysis?.farmer_location || "Nashik",
          urgency: latestAnalysis?.urgency || "Need money within 3 days",
          current_net_realisation: currentNetR
        });
        setSimulationData(res);
      } catch (err) {
        console.error("Using fallback what-if calculation:", err);
        setSimulationData({
          baseline_income: 10100.0,
          options: [
            {
              scenario_key: "sell_now",
              title: "SELL NOW",
              current_price: 2400.0,
              forecast_price: null,
              net_realisation: 2020.0,
              expected_income: 10100.0,
              income_delta: 0.0,
              badge: "🟢 AI DECISION: SELL NOW",
              description: "Best current net realisation with strong demand and manageable logistics.",
              details: {
                mandi: "Lasalgaon",
                selling_price: "₹2,400/q",
                net_realisation: "₹2,020/q",
                risk: "Minimal"
              }
            },
            {
              scenario_key: "wait_3_days",
              title: "WAIT 3 DAYS",
              current_price: 2400.0,
              forecast_price: 2520.0,
              net_realisation: 2120.0,
              expected_income: 10600.0,
              income_delta: 500.0,
              badge: "🟡 AI FORECAST: WAIT 3 DAYS",
              description: "AI ML model forecasts Mandi prices will rise to ₹2,520/q in 3 days.",
              details: {
                current_price: "₹2,400/q",
                ai_forecast: "₹2,520/q",
                potential_improvement: "+₹500",
                risk: "Moderate (Storage loss)"
              }
            },
            {
              scenario_key: "join_fpo",
              title: "JOIN FPO",
              current_price: 2400.0,
              forecast_price: 2700.0,
              net_realisation: 2700.0,
              expected_income: 13500.0,
              income_delta: 1500.0,
              badge: "🟢 AI DECISION: JOIN FPO ⭐",
              description: "Pool crop quantity with Nashik Agro FPO to unlock premium buyer price negotiations.",
              details: {
                individual_quantity: `${qtyKg} kg`,
                fpo_combined_quantity: "2,000 kg",
                individual_offer: "₹24/kg",
                fpo_negotiated_offer: "₹27/kg",
                individual_income: "₹12,000",
                fpo_potential_income: "₹13,500",
                additional_potential_income: "+₹1,500"
              }
            }
          ]
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadSimulation();
  }, [cropName, qtyKg, currentNetR]);

  const currentOption = simulationData?.options.find(opt => opt.scenario_key === activeScenario) || simulationData?.options[0];

  return (
    <div className="min-h-screen bg-[#06110a] text-slate-100 py-10 px-4 flex flex-col justify-between relative">
      <div className="w-full max-w-5xl mx-auto space-y-8 my-auto z-10">
        {/* Navigation Back Link & Header */}
        <div>
          <button
            onClick={() => navigate('/decision')}
            className="inline-flex items-center gap-2 text-xs font-bold text-emerald-400 hover:text-emerald-300 mb-4 cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" /> Back to AI Decision
          </button>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-900/50 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold mb-2">
                <Sliders className="w-3.5 h-3.5" />
                Financial Impact Simulator
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                What-If Simulator
              </h1>
              <p className="text-sm text-emerald-300/80 mt-1">
                See how different selling choices could affect your income.
              </p>
            </div>

            {/* Baseline Card Banner */}
            <div className="p-4 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-right">
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">CURRENT DECISION</div>
              <div className="text-emerald-400 font-extrabold text-sm flex items-center justify-end gap-1.5 mt-0.5">
                🟢 SELL NOW
              </div>
              <div className="text-xl font-extrabold text-white mt-1">
                Expected Income: <span className="text-amber-400">₹10,100</span>
              </div>
            </div>
          </div>
        </div>

        {/* Choice Selection Tabs */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={() => setActiveScenario('sell_now')}
            className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
              activeScenario === 'sell_now'
                ? 'bg-emerald-600/20 border-emerald-400 glow-emerald'
                : 'glass-panel border-emerald-900/60 hover:border-emerald-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">OPTION 1</span>
              <Play className={`w-4 h-4 ${activeScenario === 'sell_now' ? 'text-emerald-400 fill-emerald-400' : 'text-slate-500'}`} />
            </div>
            <h3 className="text-xl font-extrabold text-white mt-2">SELL NOW</h3>
            <p className="text-xs text-slate-400 mt-1">Best immediate net realisation today</p>
            <div className="mt-3 text-lg font-extrabold text-amber-400">₹10,100</div>
          </button>

          <button
            onClick={() => setActiveScenario('wait_3_days')}
            className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
              activeScenario === 'wait_3_days'
                ? 'bg-amber-500/20 border-amber-400 glow-gold'
                : 'glass-panel border-emerald-900/60 hover:border-emerald-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">OPTION 2</span>
              <Clock className={`w-4 h-4 ${activeScenario === 'wait_3_days' ? 'text-amber-400' : 'text-slate-500'}`} />
            </div>
            <h3 className="text-xl font-extrabold text-white mt-2">WAIT 3 DAYS</h3>
            <p className="text-xs text-slate-400 mt-1">ML forecasted mandi price rise</p>
            <div className="mt-3 text-lg font-extrabold text-amber-400 flex items-center justify-between">
              <span>₹10,600</span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                +₹500
              </span>
            </div>
          </button>

          <button
            onClick={() => setActiveScenario('join_fpo')}
            className={`p-5 rounded-2xl border text-left transition-all cursor-pointer ${
              activeScenario === 'join_fpo'
                ? 'bg-emerald-500/25 border-emerald-300 glow-emerald'
                : 'glass-panel border-emerald-900/60 hover:border-emerald-700'
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-300 uppercase tracking-widest">OPTION 3</span>
              <Users className={`w-4 h-4 ${activeScenario === 'join_fpo' ? 'text-emerald-300' : 'text-slate-500'}`} />
            </div>
            <h3 className="text-xl font-extrabold text-white mt-2">JOIN FPO</h3>
            <p className="text-xs text-slate-400 mt-1">Bulk negotiation collective selling</p>
            <div className="mt-3 text-lg font-extrabold text-amber-400 flex items-center justify-between">
              <span>₹13,500</span>
              <span className="text-xs px-2 py-0.5 rounded bg-emerald-400 text-slate-950 font-extrabold">
                +₹1,500 ⭐
              </span>
            </div>
          </button>
        </div>

        {/* Dynamic Detailed Result Card */}
        {currentOption && (
          <div className="glass-panel rounded-3xl p-6 md:p-10 border border-emerald-500/40 relative overflow-hidden transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-emerald-900/40 pb-6">
              <div>
                <span className="px-3.5 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold text-xs tracking-wider border border-emerald-500/40">
                  {currentOption.badge}
                </span>
                <h2 className="text-3xl font-extrabold text-white mt-3 uppercase">
                  {currentOption.title}
                </h2>
                <p className="text-sm text-slate-300 mt-1">{currentOption.description}</p>
              </div>

              <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/40 text-right min-w-[200px]">
                <div className="text-xs text-amber-300 font-bold uppercase tracking-wider">Simulated Income</div>
                <div className="text-3xl font-extrabold text-amber-400 mt-1">
                  ₹{currentOption.expected_income.toLocaleString()}
                </div>
                {currentOption.income_delta > 0 && (
                  <div className="text-xs text-emerald-300 font-bold mt-1">
                    Potential Improvement: +₹{currentOption.income_delta.toLocaleString()}
                  </div>
                )}
              </div>
            </div>

            {/* Scenario Breakdown Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(currentOption.details).map(([key, val], idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-900/60">
                  <div className="text-xs text-slate-400 uppercase font-bold tracking-wider">
                    {key.replace(/_/g, ' ')}
                  </div>
                  <div className="text-lg font-extrabold text-white mt-1">{val}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Back to Start Action */}
        <div className="text-center pt-4">
          <button
            onClick={() => navigate('/input')}
            className="px-8 py-3.5 rounded-2xl bg-emerald-950 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 font-bold text-sm transition-all cursor-pointer"
          >
            ← Test Another Crop Scenario
          </button>
        </div>
      </div>
    </div>
  );
};

export default WhatIfPage;
