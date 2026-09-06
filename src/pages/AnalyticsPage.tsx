import React from 'react';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  riskTimelineData,
  resourceUtilizationData,
  evacuationProgressData,
  responseTimesData,
} from '../data/mockAnalytics';
import { BarChart3, TrendingUp, Users, Clock, ShieldAlert, Boxes } from 'lucide-react';

export const AnalyticsPage: React.FC = () => {
  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1800px] mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-command-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-400" />
            <h1 className="text-xl font-bold font-mono text-white uppercase tracking-wide">
              Strategic Analytics & Disaster Intelligence
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-500/40 uppercase font-bold">
              HISTORICAL & FORECAST
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Empirical evaluation of disaster escalation, rescue team operational response velocity, and evacuation velocity
          </p>
        </div>

        <span className="text-xs font-mono text-slate-400">
          Last Analytics Sync: <strong className="text-white">12:42:18 IST</strong>
        </span>
      </div>

      {/* Row 1: Incident & Risk Trend Line Chart + Evacuation Progress Area Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Incident & Risk Curve */}
        <div className="bg-command-card border border-command-border rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                Incident & Risk Escalation Curve
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">Risk score (/100) and active alerts over 24-hour window</p>
            </div>
            <span className="text-[10px] font-mono text-red-400">Peak Risk: 85 (Projected 14:00)</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={riskTimelineData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2d44" />
                <XAxis dataKey="time" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }} />
                <YAxis stroke="#64748b" domain={[0, 100]} tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0d121d', borderColor: '#1f2d44', borderRadius: '6px', fontSize: '11px', fontFamily: 'monospace' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'monospace' }} />
                <Line type="monotone" dataKey="riskScore" stroke="#ef4444" strokeWidth={3} dot={{ r: 4, fill: '#ef4444' }} name="Risk Score (/100)" />
                <Line type="monotone" dataKey="alerts" stroke="#f59e0b" strokeWidth={2} name="Active Alert Count" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2: Evacuation Progress */}
        <div className="bg-command-card border border-command-border rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                Cumulative Evacuation Progress vs Target Curve
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">Actual evacuated citizens vs dynamic target</p>
            </div>
            <span className="text-[10px] font-mono text-emerald-400">10,430 Evacuated</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={evacuationProgressData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorEvac" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2d44" />
                <XAxis dataKey="hour" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }} />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0d121d', borderColor: '#1f2d44', borderRadius: '6px', fontSize: '11px', fontFamily: 'monospace' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'monospace' }} />
                <Area type="monotone" dataKey="target" stroke="#64748b" strokeDasharray="3 3" fill="none" name="Evacuation Target" />
                <Area type="monotone" dataKey="evacuated" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorEvac)" name="Citizens Safely Relocated" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Row 2: Response Times by Sector + Resource Burn-down Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 3: Response Time Velocity */}
        <div className="bg-command-card border border-command-border rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                Rescue Force Response Times by Operational Sector
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">Average time in minutes from incident SOS trigger to on-scene arrival</p>
            </div>
            <span className="text-[10px] font-mono text-cyan-400">Target: &lt; 15 mins</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={responseTimesData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2d44" />
                <XAxis dataKey="sector" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }} />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0d121d', borderColor: '#1f2d44', borderRadius: '6px', fontSize: '11px', fontFamily: 'monospace' }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', fontFamily: 'monospace' }} />
                <Bar dataKey="avgMinutes" fill="#38bdf8" name="Actual Response (mins)" />
                <Bar dataKey="targetMinutes" fill="#334155" name="SOP Benchmark (mins)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 4: Critical Resource Utilization Rates */}
        <div className="bg-command-card border border-command-border rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                Critical Resource Stock Utilization Rate
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">Percentage of inventory currently deployed in field operations</p>
            </div>
            <span className="text-[10px] font-mono text-amber-400">High Demand</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={resourceUtilizationData} layout="vertical" margin={{ top: 10, right: 30, left: 40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2d44" />
                <XAxis type="number" domain={[0, 100]} stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }} />
                <YAxis dataKey="resource" type="category" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0d121d', borderColor: '#1f2d44', borderRadius: '6px', fontSize: '11px', fontFamily: 'monospace' }}
                />
                <Bar dataKey="utilRate" fill="#f97316" name="Utilization %" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
