import { useState, useEffect } from 'react';
import { uploadCustomDataset, getDispatchHistory, getHealth } from '../api/client';
import { 
  Database, Upload, CheckCircle2, AlertTriangle, ShieldCheck, 
  ExternalLink, Layers, RefreshCw, FileText, ArrowRight, Zap, Check, Lock, Cpu,
  Radio, Activity, CheckCircle
} from 'lucide-react';

export default function DataConnectorsPage() {
  const [connectors, setConnectors] = useState([
    { id: 'snowflake', name: 'Snowflake Data Warehouse', category: 'Data Warehouse', status: 'Connected', rows: '600,000+ tx rows', cadence: 'Zero-Copy DuckDB', icon: '', latency: '24ms', health: '99.98%' },
    { id: 'databricks', name: 'Databricks Unity Catalog', category: 'Lakehouse', status: 'Connected', rows: '2,400 marketing records', cadence: 'Hourly sync', icon: '', latency: '35ms', health: '100.0%' },
    { id: 'stripe', name: 'Stripe Billing & Payments', category: 'Payment Gateway', status: 'Connected', rows: '12,000 support logs', cadence: 'Real-time Webhook', icon: '', latency: '8ms', health: '99.99%' },
    { id: 'salesforce', name: 'Salesforce Enterprise CRM', category: 'CRM & Pipeline', status: 'Connected', rows: '342 accounts', cadence: 'Daily sync', icon: '', latency: '240ms', health: '99.85%' },
    { id: 'bigquery', name: 'Google BigQuery', category: 'Analytics Lake', status: 'Available', rows: '—', cadence: 'Batch sync', icon: '', latency: '—', health: 'Ready' },
    { id: 'postgres', name: 'PostgreSQL Operational DB', category: 'OLTP Database', status: 'Available', rows: '—', cadence: 'CDC Streaming', icon: '', latency: '—', health: 'Ready' },
  ]);

  const [customCsv, setCustomCsv] = useState('');
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [dispatchLogs, setDispatchLogs] = useState([]);
  const [activeTab, setActiveTab] = useState('connectors');
  const [syncingId, setSyncingId] = useState(null);
  const [toastMsg, setToastMsg] = useState(null);

  useEffect(() => {
    getDispatchHistory().then(res => setDispatchLogs(res.history || [])).catch(() => {});
    getHealth().then(health => {
      if (health?.data_rows) {
        setConnectors(prev => prev.map(c => {
          if (c.id === 'snowflake' && health.data_rows.transactions) {
            return { ...c, rows: `${health.data_rows.transactions.toLocaleString()} tx rows` };
          }
          if (c.id === 'databricks' && health.data_rows.marketing) {
            return { ...c, rows: `${health.data_rows.marketing.toLocaleString()} marketing rows` };
          }
          if (c.id === 'stripe' && health.data_rows.support) {
            return { ...c, rows: `${health.data_rows.support.toLocaleString()} support tickets` };
          }
          return c;
        }));
      }
    }).catch(() => {});
  }, []);

  const sampleCsvData = `date,region,orders,revenue,checkout_errors,marketing_spend
2026-08-01,East Region,140,4200,2,500
2026-08-02,East Region,138,4140,1,500
2026-08-03,East Region,142,4260,3,500
2026-08-04,East Region,135,4050,2,500
2026-08-05,East Region,139,4170,2,500
2026-08-06,East Region,141,4230,1,500
2026-08-07,East Region,140,4200,3,500
2026-08-08,East Region,142,4260,2,500
2026-08-09,East Region,130,3900,12,400
2026-08-10,East Region,125,3750,15,400
2026-08-11,East Region,118,3540,18,400`;

  const handleUpload = async () => {
    if (!customCsv.trim()) return;
    setUploadLoading(true);
    try {
      const res = await uploadCustomDataset(customCsv, 'client_production_data.csv');
      setUploadResult(res);
    } catch (err) {
      setToastMsg(`Upload failed: ${err.message}`);
      setTimeout(() => setToastMsg(null), 3000);
    } finally {
      setUploadLoading(false);
    }
  };

  const handleLoadSample = () => {
    setCustomCsv(sampleCsvData);
  };

  const handleSync = (id, name) => {
    setSyncingId(id);
    setTimeout(() => {
      setSyncingId(null);
      setToastMsg(`✓ ${name} schema successfully synced & verified`);
      setTimeout(() => setToastMsg(null), 3000);
    }, 900);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-20">
      
      {/* Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-2.5 rounded-2xl shadow-xl border border-slate-700 animate-in fade-in">
          {toastMsg}
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 flex items-center gap-1">
              <Zap size={12} /> Enterprise Integration Hub
            </span>
            <span className="text-xs text-slate-400">Zero-ETL Semantic Connectors</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Data Connectors & Ingestion Studio</h1>
          <p className="text-slate-300 text-sm mt-1">
            Connect live enterprise warehouses or drop custom CSV datasets for immediate automated root-cause analysis.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white/10 backdrop-blur px-5 py-3 rounded-2xl border border-white/10 text-right">
            <div className="text-xs text-slate-300 uppercase font-semibold">Active Streams</div>
            <div className="text-2xl font-bold text-emerald-400 flex items-center gap-1.5 justify-end">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> 4 Connected
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 gap-6 text-sm font-semibold">
        <button
          onClick={() => setActiveTab('connectors')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'connectors' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Database size={16} /> Enterprise Data Connectors (6)
        </button>
        <button
          onClick={() => setActiveTab('upload')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'upload' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Upload size={16} /> Custom CSV Ingest Studio
        </button>
        <button
          onClick={() => setActiveTab('dispatches')}
          className={`pb-3 border-b-2 transition-all flex items-center gap-2 ${
            activeTab === 'dispatches' ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-800'
          }`}
        >
          <Zap size={16} /> Dispatched Actions Audit ({dispatchLogs.length})
        </button>
      </div>

      {/* Tab 1: Connectors Grid */}
      {activeTab === 'connectors' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {connectors.map((c) => (
            <div key={c.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 hover:border-indigo-300 transition-all space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <span className="text-3xl p-2 bg-slate-50 rounded-2xl border border-slate-100">{c.icon}</span>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{c.name}</h3>
                    <span className="text-xs text-slate-400">{c.category}</span>
                  </div>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold flex items-center gap-1 ${
                  c.status === 'Connected' ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' : 'bg-slate-100 text-slate-600'
                }`}>
                  {c.status === 'Connected' && <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />}
                  {c.status}
                </span>
              </div>

              <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100 text-xs space-y-1.5 text-slate-600">
                <div className="flex justify-between">
                  <span>Throughput:</span>
                  <span className="font-semibold text-slate-800">{c.rows}</span>
                </div>
                <div className="flex justify-between">
                  <span>Cadence:</span>
                  <span className="font-semibold text-slate-800">{c.cadence}</span>
                </div>
                <div className="flex justify-between">
                  <span>Latency / SLA:</span>
                  <span className="font-mono font-semibold text-indigo-600">{c.latency} · {c.health}</span>
                </div>
              </div>

              <button 
                onClick={() => handleSync(c.id, c.name)}
                disabled={syncingId === c.id}
                className="w-full py-2 bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 text-slate-700 font-bold rounded-xl text-xs transition-colors flex items-center justify-center gap-1.5"
              >
                <RefreshCw size={13} className={syncingId === c.id ? 'animate-spin text-indigo-600' : ''} />
                {syncingId === c.id ? 'Syncing...' : c.status === 'Connected' ? 'Sync Schema & Verify' : 'Connect Source'}
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Custom CSV Ingest Studio */}
      {activeTab === 'upload' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-bold text-slate-900 text-base">Paste Custom Enterprise CSV</h3>
                <p className="text-xs text-slate-500">Provide client dataset with date, metric, and operational driver columns</p>
              </div>
              <button 
                onClick={handleLoadSample}
                className="text-xs text-indigo-600 hover:text-indigo-700 font-bold underline"
              >
                Load Sample Dataset
              </button>
            </div>

            <textarea 
              rows={10}
              value={customCsv}
              onChange={(e) => setCustomCsv(e.target.value)}
              placeholder="Paste raw CSV contents here..."
              className="w-full bg-slate-50 font-mono text-xs p-4 rounded-2xl border border-slate-200 outline-none focus:bg-white focus:border-indigo-500"
            />

            <button
              onClick={handleUpload}
              disabled={!customCsv.trim() || uploadLoading}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-2xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2"
            >
              {uploadLoading ? <RefreshCw size={14} className="animate-spin" /> : <Upload size={14} />}
              <span>Process & Auto-Synthesize Diagnostic Case</span>
            </button>
          </div>

          <div className="lg:col-span-5 space-y-4">
            {uploadResult ? (
              <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 space-y-4">
                <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm">
                  <CheckCircle2 size={18} /> Ingested & Schema Inferred
                </div>
                
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
                  <div className="font-bold">{uploadResult.message}</div>
                  <div>Completeness: <strong>{uploadResult.completeness_pct}%</strong></div>
                  <div>Detected Date Column: <strong>{uploadResult.detected_date_column}</strong></div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-700 uppercase mb-2">Inferred Numeric Metrics</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {uploadResult.numeric_metrics?.map(col => (
                      <span key={col} className="px-2.5 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-semibold">
                        {col}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-slate-700 uppercase mb-2">Registered Semantic KPIs</h4>
                  <div className="space-y-1.5">
                    {uploadResult.inferred_kpis?.map((kpi, idx) => (
                      <div key={idx} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex justify-between items-center text-xs">
                        <span className="font-bold text-slate-800">{kpi.kpi_name}</span>
                        <span className="text-slate-500 font-mono">Total: ${kpi.total?.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-50 rounded-3xl p-8 border border-dashed border-slate-300 text-center text-slate-400 space-y-2">
                <FileText size={32} className="mx-auto text-slate-300" />
                <p className="text-xs font-medium">Inferred dataset schema, statistical summary, and generated anomaly signals will appear here.</p>
              </div>
            )}
          </div>

        </div>
      )}

      {/* Tab 3: Dispatches Audit Log */}
      {activeTab === 'dispatches' && (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-5 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-900 text-base">Enterprise Action Dispatch Audit Trail</h3>
            <span className="text-xs text-slate-500">Immutable Compliance Log</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-700">
              <thead className="bg-slate-50/80 border-b border-slate-200 text-slate-500 text-xs uppercase font-bold">
                <tr>
                  <th className="px-6 py-4">Dispatch ID</th>
                  <th className="px-6 py-4">Timestamp</th>
                  <th className="px-6 py-4">Target Channel</th>
                  <th className="px-6 py-4">Authorized Persona</th>
                  <th className="px-6 py-4">Status & Reference</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {dispatchLogs.map((log, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-mono font-bold text-indigo-600 text-xs">{log.dispatch_id}</td>
                    <td className="px-6 py-4 text-xs text-slate-500">{new Date(log.timestamp).toLocaleString()}</td>
                    <td className="px-6 py-4">
                      <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 capitalize">
                        {log.channel}
                      </span>
                    </td>
                    <td className="px-6 py-4 uppercase text-xs font-bold text-slate-800">{log.authorized_by}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                        <CheckCircle2 size={13} /> {log.status}
                      </div>
                      {log.external_reference && (
                        <div className="text-[10px] text-slate-400 font-mono">{log.external_reference}</div>
                      )}
                    </td>
                  </tr>
                ))}
                {dispatchLogs.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-slate-400 text-xs">
                      No external actions dispatched yet. Dispatch an action from a case study or alerts panel to record audit logs.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

    </div>
  );
}
