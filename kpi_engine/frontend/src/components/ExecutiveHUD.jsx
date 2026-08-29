import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Zap, Activity, ShieldCheck, Cpu, Sliders, Presentation
} from 'lucide-react';
import { AccentureSymbol } from './AccentureLogo';

export default function ExecutiveHUD({ onOpenBriefing }) {
  const navigate = useNavigate();

  return (
    <aside 
      aria-label="Executive Control HUD"
      className="fixed bottom-5 left-1/2 -translate-x-1/2 z-40 max-w-5xl w-[92%] transition-all duration-500"
    >
      <div className="relative bg-slate-950/85 backdrop-blur-xl border border-slate-700/70 rounded-2xl shadow-2xl shadow-purple-950/40 p-2.5 px-4 flex items-center justify-between gap-4 text-white ring-1 ring-white/10">
        
        {/* Glow Accent Ambient Ring */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-[#a100ff]/30 via-indigo-500/20 to-emerald-500/20 rounded-2xl blur-xs -z-10" />

        {/* Left: Brand + Real-Time Engine Telemetry */}
        <div className="flex items-center gap-3.5 shrink-0">
          <AccentureSymbol className="w-7 h-7 shrink-0 hidden sm:flex" />
          
          <div className="space-y-0.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-100">
                Autonomous Decision Engine Active
              </span>
              <span className="px-1.5 py-0.2 rounded-md bg-purple-500/20 text-[#d896ff] border border-purple-500/30 text-[9px] font-bold font-mono">
                v2.4
              </span>
            </div>
            
            <div className="flex items-center gap-3 text-[10px] text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                <Cpu size={10} className="text-indigo-400" /> DuckDB C++: <strong className="text-slate-200 font-semibold">24ms</strong>
              </span>
              <span className="hidden md:flex items-center gap-1">
                <Zap size={10} className="text-amber-400" /> Groq LPU: <strong className="text-slate-200 font-semibold">780ms</strong>
              </span>
              <span className="hidden lg:flex items-center gap-1 text-emerald-400 font-bold">
                <ShieldCheck size={11} /> 100% Deterministic Math
              </span>
            </div>
          </div>
        </div>

        {/* Center: Live Revenue Shield Metrics */}
        <div className="hidden xl:flex items-center gap-4 px-4 py-1 bg-slate-900/80 rounded-xl border border-slate-800 text-xs">
          <div>
            <div className="text-[9px] uppercase font-bold text-slate-400">Monitored Value</div>
            <div className="font-bold font-mono text-slate-100">$500M+ ARR</div>
          </div>
          <div className="w-px h-6 bg-slate-700" />
          <div>
            <div className="text-[9px] uppercase font-bold text-rose-400">Anomaly Drag</div>
            <div className="font-bold font-mono text-rose-400">-$453/day</div>
          </div>
          <div className="w-px h-6 bg-slate-700" />
          <div>
            <div className="text-[9px] uppercase font-bold text-emerald-400">Recoverable</div>
            <div className="font-bold font-mono text-emerald-400">+$142K/yr</div>
          </div>
        </div>

        {/* Right: Quick Launch Interactive Features */}
        <div className="flex items-center gap-2 shrink-0">
          
          {/* 1-Click C-Suite Presentation Briefing */}
          <button
            onClick={onOpenBriefing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-[#7a00c2] to-[#a100ff] hover:from-[#8b00de] hover:to-[#b324ff] text-white text-xs font-bold shadow-md shadow-purple-900/30 transition-all hover:scale-[1.03] active:scale-[0.98]"
          >
            <Presentation size={13} />
            <span className="hidden sm:inline">Executive Briefing</span>
          </button>

          {/* Jump to Scenario Simulator */}
          <button
            onClick={() => navigate('/simulator')}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 transition-all"
          >
            <Sliders size={12} className="text-amber-400" />
            <span className="hidden md:inline">What-If Sim</span>
          </button>

          {/* Jump to Knowledge Graph */}
          <button
            onClick={() => navigate('/knowledge-graph')}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-semibold border border-slate-700 transition-all"
          >
            <Activity size={12} className="text-indigo-400" />
            <span className="hidden md:inline">Causal DAG</span>
          </button>

        </div>

      </div>
    </aside>
  );
}
