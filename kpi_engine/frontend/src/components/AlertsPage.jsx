import { useState, useEffect, useMemo } from 'react';
import { getAlerts } from '../api/client';
import { usePersona } from '../context/PersonaContext';
import { useNavigate } from 'react-router-dom';
import { 
  Bell, Search, Filter, AlertTriangle, ArrowRight, 
  CheckCircle2, Clock, ShieldCheck, ChevronRight, User,
  DollarSign, Zap, Download, CheckSquare, Square, RefreshCw,
  Send, Flame, Activity
} from 'lucide-react';
import DispatchActionModal from './DispatchActionModal';

// Helper to estimate $ impact based on metric and % change
function estimateDollarImpact(kpi, region, pctChange) {
  if (kpi === 'Revenue') {
    const base = region === 'East Region' ? 28450 : 22100;
    return Math.round(Math.abs((pctChange / 100) * base));
  }
  if (kpi === 'Checkout Error Rate') {
    return 3135; // direct revenue leak per week
  }
  if (kpi === 'Average Order Value') {
    return 1450;
  }
  return 850;
}

export default function AlertsPage() {
  const { persona, role } = usePersona();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [acknowledgedAlerts, setAcknowledgedAlerts] = useState(new Set());
  const [selectedAlerts, setSelectedAlerts] = useState(new Set());
  const [dispatchingAlert, setDispatchingAlert] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const navigate = useNavigate();

  const fetchAlertsData = () => {
    setLoading(true);
    getAlerts(persona, role)
      .then(setData)
      .catch(console.error)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchAlertsData();
  }, [persona, role]);

  const handleAcknowledge = (e, key) => {
    e.stopPropagation();
    setAcknowledgedAlerts(prev => new Set([...prev, key]));
  };

  const handleToggleSelect = (e, key) => {
    e.stopPropagation();
    setSelectedAlerts(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  const handleSelectAll = () => {
    if (selectedAlerts.size === filteredAlerts.length) {
      setSelectedAlerts(new Set());
    } else {
      setSelectedAlerts(new Set(filteredAlerts.map(a => `${a.kpi}-${a.region}-${a.week_start}`)));
    }
  };

  const handleBulkAcknowledge = () => {
    setAcknowledgedAlerts(prev => new Set([...prev, ...selectedAlerts]));
    setToastMessage(`✓ ${selectedAlerts.size} alerts acknowledged`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleBulkExport = () => {
    const csvRows = ['KPI,Region,Week,Severity,Priority,PctChange,ZScore,Owner,DollarImpact'];
    filteredAlerts.forEach(a => {
      const dollar = estimateDollarImpact(a.kpi, a.region, a.pct_change);
      csvRows.push(`"${a.kpi}","${a.region}","${a.week_start}","${a.severity}",${a.priority_score},"${a.pct_change}%",${a.z_score},"${a.routed_to}",$${dollar}`);
    });
    const blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `alerts-export-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    setToastMessage(`✓ Exported ${filteredAlerts.length} alerts to CSV`);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredAlerts = useMemo(() => {
    if (!data?.alerts) return [];
    return data.alerts.filter(alert => {
      const matchesSearch = alert.kpi.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            alert.region.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            alert.routed_to.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter;
      return matchesSearch && matchesSeverity;
    });
  }, [data, searchQuery, severityFilter]);

  // Aggregate total impact at risk
  const totalDollarImpact = useMemo(() => {
    return filteredAlerts.reduce((sum, a) => sum + estimateDollarImpact(a.kpi, a.region, a.pct_change), 0);
  }, [filteredAlerts]);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center space-x-3">
        <div className="w-6 h-6 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        <span className="text-slate-600 font-medium">Scanning Proactive Alert Subsystem...</span>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 pb-20">
      
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-xl border border-slate-700 animate-in fade-in slide-in-from-bottom-3">
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-3xl shadow-xl">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-500/30 text-indigo-300 border border-indigo-500/30 flex items-center gap-1">
              <Bell size={12} /> Proactive Alerting Subsystem
            </span>
            <span className="text-xs text-slate-400">Owner-Routed Inbound Stream</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Active Anomaly Alerts</h1>
          <p className="text-slate-300 text-sm mt-1">
            Prioritized by statistical deviation (|z| &times; business weight &times; recency) and auto-routed to KPI owners.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white/10 backdrop-blur px-4 py-2.5 rounded-2xl border border-white/10 text-right">
            <div className="text-[10px] text-slate-300 font-medium uppercase">Active Queue</div>
            <div className="text-xl font-bold text-amber-400">{filteredAlerts.length} Alerts</div>
          </div>
          <div className="bg-rose-500/20 backdrop-blur px-4 py-2.5 rounded-2xl border border-rose-500/30 text-right">
            <div className="text-[10px] text-rose-300 font-medium uppercase">Est. Revenue at Risk</div>
            <div className="text-xl font-black text-rose-400 font-mono">${totalDollarImpact.toLocaleString()}/wk</div>
          </div>
        </div>
      </div>

      {/* Filter & Bulk Actions Bar */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <div className="relative flex-1 min-w-[240px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text"
            placeholder="Search by KPI, region, or owner..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 pl-10 pr-4 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-indigo-500 focus:bg-white transition-all"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap text-xs">
          <span className="text-slate-400 font-medium flex items-center gap-1"><Filter size={13} /> Severity:</span>
          {['all', 'high', 'medium', 'low'].map(s => (
            <button
              key={s}
              onClick={() => setSeverityFilter(s)}
              className={`px-3 py-1.5 rounded-xl font-bold capitalize transition-all ${
                severityFilter === s 
                  ? 'bg-slate-900 text-white shadow-xs' 
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Bulk Action Controls */}
        <div className="flex items-center gap-2">
          {selectedAlerts.size > 0 && (
            <>
              <button
                onClick={handleBulkAcknowledge}
                className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
              >
                <CheckCircle2 size={13} /> Acknowledge ({selectedAlerts.size})
              </button>
            </>
          )}
          <button
            onClick={handleBulkExport}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all border border-slate-200 flex items-center gap-1.5"
          >
            <Download size={13} /> Export CSV
          </button>
        </div>
      </div>

      {/* Groundbreaking Feature: Timeline Waterfall Strip */}
      <div className="bg-slate-900 text-white rounded-3xl p-5 shadow-sm border border-slate-800 space-y-3">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold flex items-center gap-1.5 text-indigo-300">
            <Activity size={14} className="text-indigo-400" /> Incident Timeline & Onset Sequence
          </span>
          <span className="text-slate-400 text-[10px]">Trailing 3-Week Incident Propagation</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { date: 'Aug 09', event: 'Checkout Error Surge (East Region)', impact: '-$3,300/wk', severity: 'P1 Initial Driver', color: 'border-rose-500/50 bg-rose-950/40 text-rose-300' },
            { date: 'Aug 11', event: 'Revenue Drop Flagged (East Region)', impact: '-11.6% Revenue', severity: 'P1 Primary Anomaly', color: 'border-amber-500/50 bg-amber-950/40 text-amber-300' },
            { date: 'Aug 18', event: 'Marketing Ad Spend Delay (North Region)', impact: 'Moderate Lag', severity: 'P2 Monitoring', color: 'border-indigo-500/50 bg-indigo-950/40 text-indigo-300' },
          ].map((item, i) => (
            <div key={i} className={`p-3 rounded-2xl border ${item.color} space-y-1`}>
              <div className="flex justify-between items-center text-[10px] font-mono">
                <span className="font-bold">{item.date}</span>
                <span className="font-bold uppercase tracking-wider">{item.severity}</span>
              </div>
              <div className="text-xs font-bold text-white">{item.event}</div>
              <div className="text-[10px] text-slate-300 font-semibold">{item.impact}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts Table */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider font-bold">
              <tr>
                <th className="px-4 py-4 w-10 text-center">
                  <button onClick={handleSelectAll} className="text-slate-400 hover:text-slate-700">
                    {selectedAlerts.size === filteredAlerts.length && filteredAlerts.length > 0 ? (
                      <CheckSquare size={16} className="text-indigo-600" />
                    ) : (
                      <Square size={16} />
                    )}
                  </button>
                </th>
                <th className="px-4 py-4">Severity</th>
                <th className="px-4 py-4">KPI & Metric</th>
                <th className="px-4 py-4">Region</th>
                <th className="px-4 py-4">Est. $ Impact</th>
                <th className="px-4 py-4">% Shift & Z-Score</th>
                <th className="px-4 py-4">Assigned Owner</th>
                <th className="px-4 py-4 text-right">Action Playbook</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filteredAlerts.map((alert, i) => {
                const key = `${alert.kpi}-${alert.region}-${alert.week_start}`;
                const isAck = acknowledgedAlerts.has(key);
                const isSelected = selectedAlerts.has(key);
                const dollar = estimateDollarImpact(alert.kpi, alert.region, alert.pct_change);

                return (
                  <tr 
                    key={i} 
                    onClick={() => navigate(`/case/${encodeURIComponent(alert.region)}/${encodeURIComponent(alert.week_start)}?metric=${encodeURIComponent(alert.metric_col || 'revenue')}`)}
                    className={`hover:bg-indigo-50/40 cursor-pointer transition-colors group ${isSelected ? 'bg-indigo-50/60' : ''}`}
                  >
                    <td className="px-4 py-4 text-center" onClick={(e) => handleToggleSelect(e, key)}>
                      <button className="text-slate-400 hover:text-slate-700">
                        {isSelected ? (
                          <CheckSquare size={16} className="text-indigo-600" />
                        ) : (
                          <Square size={16} />
                        )}
                      </button>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        alert.severity === 'high' 
                          ? 'bg-rose-100 text-rose-700 border border-rose-200' 
                          : alert.severity === 'medium'
                          ? 'bg-amber-100 text-amber-700 border border-amber-200'
                          : 'bg-blue-100 text-blue-700 border border-blue-200'
                      }`}>
                        <AlertTriangle size={12} />
                        {alert.severity}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                        {alert.kpi}
                      </div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                        <Clock size={10} /> Week of {alert.week_start}
                      </div>
                    </td>
                    <td className="px-4 py-4 font-semibold text-slate-800">
                      {alert.region}
                    </td>
                    <td className="px-4 py-4 font-mono font-bold text-rose-600 text-sm">
                      -${dollar.toLocaleString()}/wk
                    </td>
                    <td className="px-4 py-4">
                      <span className={`font-bold ${alert.pct_change < 0 ? 'text-rose-600' : 'text-emerald-600'}`}>
                        {alert.pct_change > 0 ? '+' : ''}{alert.pct_change}%
                      </span>
                      <span className="text-[11px] text-slate-400 block font-mono">
                        z = {alert.z_score} (Prio: {alert.priority_score?.toFixed(1)})
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-800 font-semibold px-2.5 py-1 rounded-xl text-xs border border-slate-200">
                        <User size={12} className="text-slate-400" />
                        {alert.routed_to}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setDispatchingAlert({
                              driver: alert.kpi,
                              action: `Escalate ${alert.kpi} incident in ${alert.region}`,
                              owner: alert.routed_to
                            });
                          }}
                          className="px-2.5 py-1 rounded-xl text-xs font-bold bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 transition-all flex items-center gap-1"
                        >
                          <Send size={11} /> Dispatch
                        </button>
                        <button
                          onClick={(e) => handleAcknowledge(e, key)}
                          className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                            isAck 
                              ? 'bg-emerald-100 text-emerald-700' 
                              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                          }`}
                        >
                          {isAck ? '✓ Acknowledged' : 'Acknowledge'}
                        </button>
                        <ChevronRight size={16} className="text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Dispatch Modal */}
      {dispatchingAlert && (
        <DispatchActionModal
          onClose={() => setDispatchingAlert(null)}
          action={dispatchingAlert}
          caseData={{
            metric: dispatchingAlert.driver,
            region: 'East Region',
            week_start: '2026-08-11'
          }}
        />
      )}

    </div>
  );
}
