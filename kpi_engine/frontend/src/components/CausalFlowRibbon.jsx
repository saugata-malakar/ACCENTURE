import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, ShieldAlert, TrendingDown, DollarSign, 
  ExternalLink, Sliders, CheckCircle2, ChevronRight, Zap
} from 'lucide-react';

export default function CausalFlowRibbon() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 'step-1',
      title: 'Checkout Errors Surge',
      subtitle: '+1,450% Surge (0.8% → 12.4%)',
      metric: 'r = 0.82 · Onset: Aug 9',
      tag: 'Root Driver #1',
      tagColor: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      loss: '-$2,850/wk Leakage',
      desc: 'High payment latency triggered 500 error cascade on mobile gateways.',
      link: '/case/East%20Region/2026-08-11',
    },
    {
      id: 'step-2',
      title: 'Order Volume Collapse',
      subtitle: '-14.2% Order Drop (320 → 274/day)',
      metric: 'Volume Drag (Orders)',
      tag: 'Direct Intermediate',
      tagColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/30',
      loss: '-$319.98 / day Drag',
      desc: 'Frustrated shoppers abandoned active baskets during payment verification.',
      link: '/knowledge-graph',
    },
    {
      id: 'step-3',
      title: 'Basket Price Contraction',
      subtitle: '-2.1% Shrinkage ($89.20 → $87.32)',
      metric: 'Price Drag (AOV)',
      tag: 'Elasticity Impact',
      tagColor: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      loss: '-$144.57 / day Drag',
      desc: 'Promotional discount cannibalization diluted basket average.',
      link: '/simulator',
    },
    {
      id: 'step-4',
      title: 'Total Net Revenue Drop',
      subtitle: '-11.6% Regional Revenue Loss',
      metric: 'Net Enterprise Drag',
      tag: 'Executive P&L Impact',
      tagColor: 'bg-purple-500/20 text-[#d896ff] border-purple-500/30',
      loss: '-$453.16 / day Net',
      desc: 'East Region daily revenue dropped from $4,064 to $3,611.',
      link: '/case/East%20Region/2026-08-11',
    },
  ];

  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-indigo-950/80 to-slate-950 text-white rounded-3xl p-6 border border-indigo-500/30 shadow-xl overflow-hidden">
      
      {/* Decorative Ambient Background Elements */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-[#a100ff]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-60 h-60 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6 relative z-10">
        <div className="space-y-0.5">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md bg-[#a100ff]/30 text-[#d896ff] border border-[#a100ff]/40 text-[10px] font-extrabold uppercase tracking-wider">
              Autonomous Causal Flow
            </span>
            <span className="text-xs text-slate-400 font-mono">Temporal Precedence Confirmed (td ≤ tk)</span>
          </div>
          <h2 className="text-lg font-black tracking-tight text-white flex items-center gap-2">
            Interactive Operational-to-Financial Causal Ribbon
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/simulator')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/15 text-white text-xs font-semibold rounded-xl border border-white/15 transition-all"
          >
            <Sliders size={13} className="text-amber-400" />
            <span>Simulate Interventions</span>
          </button>
        </div>
      </div>

      {/* 4-Step Animated Causal Ribbon */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
        {steps.map((s, idx) => {
          const isSelected = activeStep === idx;
          return (
            <div
              key={s.id}
              onClick={() => setActiveStep(idx)}
              className={`p-4 rounded-2xl border transition-all duration-300 cursor-pointer relative overflow-hidden group ${
                isSelected 
                  ? 'bg-slate-800/90 border-[#a100ff] shadow-lg shadow-purple-950/50 scale-[1.02] ring-1 ring-[#a100ff]/50' 
                  : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-850'
              }`}
            >
              {/* Step indicator top pill */}
              <div className="flex justify-between items-center mb-2">
                <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-md border ${s.tagColor}`}>
                  {s.tag}
                </span>
                <span className="text-[10px] font-mono font-bold text-slate-400">
                  0{idx + 1}
                </span>
              </div>

              {/* Title & Subtitle */}
              <div className="text-sm font-bold text-white mb-0.5 group-hover:text-indigo-300 transition-colors">
                {s.title}
              </div>
              <div className="text-xs font-semibold text-slate-300 mb-2">
                {s.subtitle}
              </div>

              {/* Loss badge */}
              <div className="bg-slate-950/70 p-2 rounded-xl border border-slate-800/90 mb-2.5 flex items-center justify-between">
                <span className="text-[10px] text-slate-400 font-mono">{s.metric}</span>
                <span className="text-xs font-mono font-bold text-rose-400">{s.loss}</span>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed line-clamp-2">
                {s.desc}
              </p>

              {/* Bottom interactive action link */}
              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-bold text-indigo-400 group-hover:text-indigo-300">
                <span>Inspect Lineage</span>
                <ChevronRight size={12} className="transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
