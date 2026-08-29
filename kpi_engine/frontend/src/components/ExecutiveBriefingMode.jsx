import React, { useState } from 'react';
import { 
  X, Presentation, Download, CheckCircle2, ShieldCheck, 
  Flame, Award, ArrowUpRight, Printer, Sparkles, Building2
} from 'lucide-react';
import AccentureLogo, { AccentureSymbol } from './AccentureLogo';

export default function ExecutiveBriefingMode({ isOpen, onClose }) {
  const [signedOff, setSignedOff] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-2xl flex flex-col overflow-y-auto p-4 md:p-8 animate-fadeIn text-white select-none">
      
      {/* Top Header Bar */}
      <div className="max-w-6xl w-full mx-auto flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <AccentureLogo className="h-7" variant="light" showSubtext subtext="APPLIED INTELLIGENCE" />
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-[#a100ff]/20 text-[#d896ff] border border-[#a100ff]/40 text-[10px] font-extrabold uppercase">
            C-Suite Briefing Suite
          </span>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="/Accenture_KPI_Decision_Engine_Business_Proposal.pdf"
            download="Accenture_KPI_Decision_Engine_Business_Proposal.pdf"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#7a00c2] to-[#a100ff] hover:from-[#8b00de] hover:to-[#b324ff] text-white text-xs font-bold shadow-lg shadow-purple-900/40 transition-all hover:scale-[1.02]"
          >
            <Download size={14} />
            <span>Download 12-Page Proposal (PDF)</span>
          </a>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-all"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-6xl w-full mx-auto space-y-6">
        
        {/* Hero Incident Title Card */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 border border-indigo-500/30 shadow-2xl space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-[11px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
              P1 Incident Triage Briefing · East Region
            </span>
            <span className="text-xs font-mono text-slate-400">
              Period: Week of August 11, 2026 · Audit ID: AUD-9482
            </span>
          </div>

          <h1 className="text-2xl md:text-3xl font-black text-white">
            Enterprise Decision Memo: -11.6% Regional Revenue Drag
          </h1>
          
          <p className="text-sm text-slate-300 leading-relaxed max-w-4xl">
            The autonomous decision engine detected a <strong>-$453.16/day (-11.6%)</strong> revenue shift. Directed causal DAG analysis proved that <strong>Checkout Error Rate (+1,450% surge on Aug 09)</strong> preceded and caused the revenue drop on Aug 11 with <strong>r = 0.82</strong> correlation.
          </p>
        </div>

        {/* 3 Executive Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 space-y-1">
            <div className="text-[10px] uppercase font-bold text-slate-400">Annual Net Value</div>
            <div className="text-2xl font-black text-[#a100ff] font-mono">+$1,705,000 / yr</div>
            <div className="text-xs text-slate-400">Direct revenue recovery + analyst capacity</div>
          </div>

          <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 space-y-1">
            <div className="text-[10px] uppercase font-bold text-slate-400">Payback Period</div>
            <div className="text-2xl font-black text-emerald-400 font-mono">3.4 Months</div>
            <div className="text-xs text-slate-400">Rapid time-to-value with 284% IRR</div>
          </div>

          <div className="bg-slate-900/90 rounded-2xl p-5 border border-slate-800 space-y-1">
            <div className="text-[10px] uppercase font-bold text-slate-400">MTTR Velocity</div>
            <div className="text-2xl font-black text-indigo-400 font-mono">92% Faster</div>
            <div className="text-xs text-slate-400">5-7 Days down to &lt; 18 Minutes</div>
          </div>
        </div>

        {/* Additive Waterfall Step Breakdown */}
        <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 space-y-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Sparkles size={16} className="text-[#a100ff]" />
            Deterministic Additive Decomposition (ΔRev = ΔVol + ΔPrice + ΔMix)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-center">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="text-[10px] uppercase font-bold text-slate-400">Baseline Revenue</div>
              <div className="text-lg font-bold font-mono text-white mt-1">$28,450 / wk</div>
            </div>

            <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-500/30">
              <div className="text-[10px] uppercase font-bold text-rose-300">Volume Effect</div>
              <div className="text-lg font-bold font-mono text-rose-400 mt-1">-$319.98 / day</div>
              <div className="text-[9px] text-slate-400">Order Drop (274 vs 320)</div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/30">
              <div className="text-[10px] uppercase font-bold text-amber-300">Price Effect</div>
              <div className="text-lg font-bold font-mono text-amber-400 mt-1">-$144.57 / day</div>
              <div className="text-[9px] text-slate-400">Basket Shrinkage ($87.32)</div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30">
              <div className="text-[10px] uppercase font-bold text-emerald-300">Mix Lift</div>
              <div className="text-lg font-bold font-mono text-emerald-400 mt-1">+$11.39 / day</div>
              <div className="text-[9px] text-slate-400">High-Margin Accessories</div>
            </div>
          </div>
        </div>

        {/* Executive Sign-off block */}
        <div className="bg-slate-900/90 rounded-3xl p-6 border border-slate-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="text-sm font-bold text-white">Steering Committee Sign-Off & Action Authorization</div>
            <div className="text-xs text-slate-400">
              Authorizes Phase 1 Engineering Hotfix dispatch to Jira and marketing campaign throttling.
            </div>
          </div>

          <div className="flex items-center gap-3">
            {signedOff ? (
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold">
                <CheckCircle2 size={16} className="text-emerald-400" />
                <span>Authorized by C-Suite Sponsor</span>
              </div>
            ) : (
              <button
                onClick={() => setSignedOff(true)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-900/30 transition-all hover:scale-[1.02]"
              >
                <ShieldCheck size={16} />
                <span>Approve & Authorize Dispatch</span>
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
