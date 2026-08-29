import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  CheckCircle2, 
  TrendingUp, 
  MapPin, 
  Award, 
  Truck, 
  DollarSign, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  ChevronRight,
  Info,
  Building2,
  Zap
} from 'lucide-react';

const DecisionPage = () => {
  const navigate = useNavigate();
  const { latestAnalysis } = useAuth();

  // Use stored analysis or standard seeded SIH demo scenario default
  const data = latestAnalysis || {
    crop: "Onion",
    quantity_kg: 500,
    quantity_quintals: 5.0,
    quality: "Grade A",
    farmer_location: "Nashik",
    urgency: "Need money within 3 days",
    recommended_market: {
      market_name: "Lasalgaon Mandi",
      selling_price: 2400.0,
      distance_km: 65.0,
      transport_cost: 250.0,
      handling_cost: 50.0,
      storage_cost: 0.0,
      expected_loss: 80.0,
      net_realisation: 2020.0,
      expected_income: 10100.0,
      demand_level: "High",
      ai_score: 89.0,
      is_recommended: true
    },
    all_markets: [
      { market_name: "Lasalgaon Mandi", selling_price: 2400.0, distance_km: 65.0, transport_cost: 250.0, handling_cost: 50.0, storage_cost: 0.0, expected_loss: 80.0, net_realisation: 2020.0, expected_income: 10100.0, demand_level: "High", ai_score: 89.0, is_recommended: true },
      { market_name: "Pune Market Yard", selling_price: 2350.0, distance_km: 210.0, transport_cost: 350.0, handling_cost: 60.0, storage_cost: 10.0, expected_loss: 50.0, net_realisation: 1880.0, expected_income: 9400.0, demand_level: "Medium", ai_score: 76.0, is_recommended: false },
      { market_name: "Vashi APMC Mumbai", selling_price: 2500.0, distance_km: 180.0, transport_cost: 400.0, handling_cost: 70.0, storage_cost: 20.0, expected_loss: 50.0, net_realisation: 1960.0, expected_income: 9800.0, demand_level: "High", ai_score: 71.0, is_recommended: false }
    ],
    reasons: [
      "Highest expected net earning (₹10,100 total for 500 kg)",
      "Strong market demand in Lasalgaon mandi (High demand index)",
      "Lower logistics cost relative to distant APMCs",
      "Reliable buyers with fast 24-hour payment terms",
      "Optimal choice for your 3-day cash urgency"
    ],
    recommended_buyer: {
      name: "FreshMart Agrotech",
      price_per_kg: 25.0,
      distance_km: 18.0,
      payment_terms: "24-hour payment",
      reliability_score: 94.0,
      verified: true
    }
  };

  const rec = data.recommended_market;
  const buyer = data.recommended_buyer;

  return (
    <div className="min-h-screen bg-[#06110a] text-slate-100 py-10 px-4 flex flex-col justify-between">
      <div className="w-full max-w-6xl mx-auto space-y-8 my-auto">
        {/* Header & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-emerald-900/50 pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-semibold mb-2">
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              AI Recommendation Engine
            </div>
            <h1 className="text-3xl md:text-5xl font-extrabold text-white tracking-tight">
              AI SELLING DECISION
            </h1>
          </div>
          <div className="px-4 py-2.5 rounded-2xl bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-sm font-semibold flex items-center gap-3">
            <span className="text-xl">🧅</span>
            <div>
              <span className="font-extrabold text-white">{data.quantity_kg} kg</span> • {data.quality} {data.crop}
              <div className="text-xs text-slate-400">Location: {data.farmer_location}</div>
            </div>
          </div>
        </div>

        {/* Top Highlight Section: Recommendation Card + Net Realisation Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Recommendation Card */}
          <div className="lg:col-span-6 glass-panel rounded-3xl p-6 md:p-8 border border-emerald-500/40 relative overflow-hidden glow-emerald flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none"></div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-4 py-1.5 rounded-full bg-emerald-500 text-slate-950 font-extrabold text-xs tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 fill-slate-950 text-emerald-500" />
                  RECOMMENDED DECISION: SELL NOW
                </span>
                <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-3 py-1 rounded-lg border border-amber-400/30">
                  Score: {rec.ai_score}/100 ⭐
                </span>
              </div>

              <div>
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Recommended Market</div>
                <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-1 uppercase">
                  {rec.market_name}
                </h2>
                <div className="text-lg text-emerald-300 font-semibold mt-0.5">
                  Market Price: <span className="text-white font-extrabold">₹{rec.selling_price.toLocaleString()}/quintal</span>
                </div>
              </div>

              <div className="pt-2 grid grid-cols-2 gap-4">
                <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-800/60">
                  <div className="text-xs text-slate-400 font-medium">Expected Net Realisation</div>
                  <div className="text-2xl font-extrabold text-white mt-1">
                    ₹{rec.net_realisation.toLocaleString()}<span className="text-xs text-slate-400 font-normal">/q</span>
                  </div>
                </div>
                <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/40 glow-gold">
                  <div className="text-xs text-amber-300 font-bold uppercase tracking-wider">Expected Farmer Income</div>
                  <div className="text-3xl font-extrabold text-amber-400 mt-1">
                    ₹{rec.expected_income.toLocaleString()}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => navigate('/what-if')}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-amber-500 to-emerald-500 hover:from-amber-400 hover:to-emerald-400 text-slate-950 font-extrabold text-lg shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                EXPLORE WHAT-IF SIMULATOR
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Net Realisation Breakdown Card */}
          <div className="lg:col-span-6 glass-panel rounded-3xl p-6 md:p-8 border border-emerald-800/60 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-emerald-400" />
                  Net Realisation Breakdown
                </h3>
                <span className="text-xs text-emerald-400 font-mono">Formula Breakdown</span>
              </div>

              <div className="space-y-3 font-mono text-sm">
                <div className="flex justify-between py-2 border-b border-emerald-900/40">
                  <span className="text-slate-300 font-sans">Selling Price</span>
                  <span className="text-white font-bold">₹{rec.selling_price.toLocaleString()}/q</span>
                </div>
                <div className="flex justify-between py-2 border-b border-emerald-900/40 text-red-300">
                  <span className="text-slate-300 font-sans">Transport (65 km)</span>
                  <span className="font-bold">− ₹{rec.transport_cost}/q</span>
                </div>
                <div className="flex justify-between py-2 border-b border-emerald-900/40 text-red-300">
                  <span className="text-slate-300 font-sans">Handling Overheads</span>
                  <span className="font-bold">− ₹{rec.handling_cost}/q</span>
                </div>
                <div className="flex justify-between py-2 border-b border-emerald-900/40 text-red-300">
                  <span className="text-slate-300 font-sans">Storage Costs</span>
                  <span className="font-bold">− ₹{rec.storage_cost}/q</span>
                </div>
                <div className="flex justify-between py-2 border-b border-emerald-900/40 text-red-300">
                  <span className="text-slate-300 font-sans">Expected Transit Loss</span>
                  <span className="font-bold">− ₹{rec.expected_loss}/q</span>
                </div>

                <div className="flex justify-between py-3 border-t-2 border-emerald-500/40 text-base font-extrabold">
                  <span className="text-emerald-400 font-sans">NET REALISATION</span>
                  <span className="text-emerald-400">₹{rec.net_realisation.toLocaleString()}/q</span>
                </div>
              </div>

              <div className="mt-4 p-3.5 rounded-2xl bg-emerald-950/70 border border-emerald-800 flex items-center justify-between text-sm">
                <span className="text-slate-300">Total Quantity ({data.quantity_kg} kg)</span>
                <span className="text-amber-400 font-extrabold text-base">
                  = ₹{rec.expected_income.toLocaleString()} Net Income
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Market Comparison Table */}
        <div className="glass-panel rounded-3xl p-6 md:p-8 border border-emerald-900/60">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-400" />
                Mandi Market Comparison
              </h3>
              <p className="text-xs text-slate-400">
                5-Factor Score: Net Realisation (40%) • Demand (25%) • Reliability (15%) • Distance (10%) • Payment (10%)
              </p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="border-b border-emerald-900/60 text-slate-400 text-xs font-bold uppercase">
                  <th className="py-3 px-4">Market</th>
                  <th className="py-3 px-4">Mandi Price</th>
                  <th className="py-3 px-4">Distance</th>
                  <th className="py-3 px-4">Demand</th>
                  <th className="py-3 px-4">Net Realisation</th>
                  <th className="py-3 px-4 text-right">AI Score</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-900/30">
                {data.all_markets.map((m, idx) => (
                  <tr key={idx} className={m.is_recommended ? "bg-emerald-500/10 font-semibold" : "hover:bg-emerald-950/30"}>
                    <td className="py-4 px-4 flex items-center gap-2">
                      {m.is_recommended && <span className="text-emerald-400">🟢</span>}
                      <span className={m.is_recommended ? "text-white font-bold" : "text-slate-200"}>
                        {m.market_name}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-mono font-bold text-white">₹{m.selling_price.toLocaleString()}/q</td>
                    <td className="py-4 px-4 text-slate-300">{m.distance_km} km</td>
                    <td className="py-4 px-4">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-300 text-xs font-bold border border-emerald-800">
                        {m.demand_level}
                      </span>
                    </td>
                    <td className="py-4 px-4 font-mono font-bold text-amber-400">₹{m.net_realisation.toLocaleString()}/q</td>
                    <td className="py-4 px-4 text-right font-extrabold text-emerald-400">
                      {m.ai_score}/100 {m.is_recommended ? "⭐" : ""}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Why KrishiSetu Recommends Lasalgaon + Recommended Buyer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Dynamic AI Explanation */}
          <div className="lg:col-span-7 glass-panel rounded-3xl p-6 md:p-8 border border-emerald-900/60">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Why KrishiSetu recommends {rec.market_name}
            </h3>
            <ul className="space-y-3">
              {data.reasons.map((reason, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-200 text-sm">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Recommended Verified Buyer Card */}
          <div className="lg:col-span-5 glass-panel rounded-3xl p-6 md:p-8 border border-emerald-500/30 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-widest">Recommended Buyer</span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-400/30 flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" /> Verified
                </span>
              </div>

              <h4 className="text-2xl font-extrabold text-white">{buyer.name}</h4>
              
              <div className="mt-4 space-y-2 text-sm font-medium">
                <div className="flex justify-between py-1 border-b border-emerald-900/40">
                  <span className="text-slate-400">Direct Price Offered</span>
                  <span className="text-amber-400 font-extrabold">₹{buyer.price_per_kg}/kg</span>
                </div>
                <div className="flex justify-between py-1 border-b border-emerald-900/40">
                  <span className="text-slate-400">Distance</span>
                  <span className="text-white font-bold">{buyer.distance_km} km away</span>
                </div>
                <div className="flex justify-between py-1 border-b border-emerald-900/40">
                  <span className="text-slate-400">Payment Lead Time</span>
                  <span className="text-emerald-300 font-bold">{buyer.payment_terms}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-400">Buyer Reliability</span>
                  <span className="text-emerald-400 font-bold">{buyer.reliability_score}% Rating</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <button
                onClick={() => navigate('/what-if')}
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-base shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                EXPLORE WHAT-IF SIMULATOR
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DecisionPage;
