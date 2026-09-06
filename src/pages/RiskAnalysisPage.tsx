import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
} from 'recharts';
import {
  riskTimelineData,
  riskDistributionData,
  populationAtRiskData,
  riskFactorsRadar,
} from '../data/mockAnalytics';
import { useEmergency } from '../context/EmergencyContext';
import { RiskBadge } from '../components/common/RiskBadge';
import { Flame, Users, ShieldAlert, BarChart3, TrendingUp, Info } from 'lucide-react';

export const RiskAnalysisPage: React.FC = () => {
  const { disaster, riskZones, focusOnMap } = useEmergency();

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1800px] mx-auto animate-fade-in">
      {/* Header */}
      <div className="border-b border-command-border pb-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Flame className="w-5 h-5 text-red-500" />
              <h1 className="text-xl font-bold font-mono text-white uppercase tracking-wide">
                Risk & Priority Analysis Engine
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-500/40 uppercase font-bold">
                COMPOSITE MODEL
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Multi-dimensional threat scoring, population vulnerability assessment, and historical progression
            </p>
          </div>

          <div className="p-2 rounded bg-command-card border border-command-border text-[11px] font-mono text-slate-300 flex items-center gap-2">
            <Info className="w-4 h-4 text-blue-400 shrink-0" />
            <span>UI demonstrates operational risk indicators and empirical factors (Decision-Support Matrix)</span>
          </div>
        </div>
      </div>

      {/* Top Section: Composite Risk Score Hero Banner + Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Large Score Card (4 cols) */}
        <div className="lg:col-span-4 bg-command-card border border-red-500/30 rounded-lg p-6 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute -right-6 -bottom-6 w-36 h-36 bg-red-500/10 rounded-full blur-2xl pointer-events-none" />

          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-slate-400">
              AGGREGATE SECTOR RISK
            </span>
            <div className="flex items-baseline gap-3 my-3">
              <span className="text-6xl font-black font-mono text-white tracking-tight">
                {disaster.overallRiskScore}
              </span>
              <span className="text-2xl font-mono text-slate-500 font-bold">/ 100</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-950/60 border border-red-500/50 text-red-300 font-mono font-bold text-xs uppercase mb-4">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping-slow" />
              STATUS: HIGH RISK ELEVATION
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-sans">
              Weighted composite evaluation across 7 operational zones. Significant threat to population centers due to Bellary Nala bank breaches and low-lying stormwater drainage failure.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2 pt-4 border-t border-command-border/60 text-xs font-mono">
            <div>
              <span className="text-slate-500 block text-[10px]">Peak Forecast:</span>
              <strong className="text-white">+4.5 Hours</strong>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">Rain Rate:</span>
              <strong className="text-amber-400">162.4 mm / 24h</strong>
            </div>
          </div>
        </div>

        {/* Risk Distribution Donut (4 cols) */}
        <div className="lg:col-span-4 bg-command-card border border-command-border rounded-lg p-5 flex flex-col">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-2">
            Zone Risk Distribution
          </h3>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={riskDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={48}
                  outerRadius={75}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {riskDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ backgroundColor: '#0d121d', borderColor: '#1f2d44', borderRadius: '6px', fontSize: '11px', fontFamily: 'monospace' }}
                  itemStyle={{ color: '#ffffff' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 font-mono text-[11px] pt-2 border-t border-command-border/60">
            {riskDistributionData.map((d, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                <span className="text-slate-400 truncate">{d.name.split(' ')[0]}:</span>
                <strong className="text-white ml-auto">{d.value}%</strong>
              </div>
            ))}
          </div>
        </div>

        {/* Multi-Factor Radar Assessment (4 cols) */}
        <div className="lg:col-span-4 bg-command-card border border-command-border rounded-lg p-5 flex flex-col">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 mb-1">
            Empirical Risk Indicators
          </h3>
          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={riskFactorsRadar}>
                <PolarGrid stroke="#1f2d44" />
                <PolarAngleAxis dataKey="factor" tick={{ fill: '#94a3b8', fontSize: 9, fontFamily: 'monospace' }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#334155" tick={{ fill: '#64748b', fontSize: 8 }} />
                <Radar name="Observed Index" dataKey="score" stroke="#ef4444" fill="#ef4444" fillOpacity={0.4} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0d121d', borderColor: '#1f2d44', borderRadius: '6px', fontSize: '11px', fontFamily: 'monospace' }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Middle Section: Risk Over Time (Line Chart) & Population At Risk (Bar Chart) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Risk Trend Over Time (6 cols) */}
        <div className="lg:col-span-6 bg-command-card border border-command-border rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                24-Hour Risk Progression & Inundation Curve
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">Past readings and 6-hour forward projection</p>
            </div>
            <span className="text-[10px] font-mono bg-command-surface px-2 py-0.5 rounded border border-command-border text-slate-400">
              Hourly Series
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={riskTimelineData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2d44" />
                <XAxis dataKey="time" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }} />
                <YAxis stroke="#64748b" domain={[20, 100]} tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0d121d', borderColor: '#1f2d44', borderRadius: '6px', fontSize: '11px', fontFamily: 'monospace' }}
                />
                <Line type="monotone" dataKey="riskScore" stroke="#ef4444" strokeWidth={3} dot={{ r: 4, fill: '#ef4444' }} name="Risk Score (/100)" />
                <Line type="monotone" dataKey="rainfall" stroke="#38bdf8" strokeWidth={2} strokeDasharray="4 4" dot={false} name="Rainfall mm" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Population at Risk Bar Chart (6 cols) */}
        <div className="lg:col-span-6 bg-command-card border border-command-border rounded-lg p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
                Population Exposure & Evacuation Status by Zone
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">Evacuated vs Remaining vulnerable residents</p>
            </div>
            <span className="text-[10px] font-mono text-emerald-400">Total: 24,860</span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={populationAtRiskData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1f2d44" />
                <XAxis dataKey="zone" stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }} />
                <YAxis stroke="#64748b" tick={{ fill: '#94a3b8', fontSize: 10, fontFamily: 'monospace' }} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0d121d', borderColor: '#1f2d44', borderRadius: '6px', fontSize: '11px', fontFamily: 'monospace' }}
                />
                <Bar dataKey="evacuated" stackId="a" fill="#10b981" name="Evacuated" />
                <Bar dataKey="remaining" stackId="a" fill="#f97316" name="Remaining Vulnerable" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Section: Zone-by-Zone Priority Matrix */}
      <div className="bg-command-card border border-command-border rounded-lg overflow-hidden">
        <div className="px-5 py-3.5 bg-command-surface border-b border-command-border flex items-center justify-between">
          <h3 className="text-xs font-bold font-mono text-white uppercase tracking-wider">
            DETAILED ZONE-BY-ZONE RISK & PRIORITY MATRIX
          </h3>
          <span className="text-[11px] font-mono text-slate-400">7 Sectors Evaluated</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-command-surface/80 text-slate-400 uppercase text-[10px] border-b border-command-border">
              <tr>
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Zone Code / Locality</th>
                <th className="py-3 px-4">Risk Score</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Water Level</th>
                <th className="py-3 px-4">Total Pop</th>
                <th className="py-3 px-4">Evacuated</th>
                <th className="py-3 px-4">Active Rescues</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-command-border/60 text-slate-300">
              {riskZones.map((z, idx) => (
                <tr key={z.id} className="hover:bg-command-cardHover transition-colors">
                  <td className="py-3 px-4 font-bold text-white">#{idx + 1}</td>
                  <td className="py-3 px-4">
                    <strong className="text-white block">{z.name}</strong>
                    <span className="text-[10px] text-slate-500 font-sans">{z.locality}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-sm font-bold text-red-400">{z.riskScore}</span>
                    <span className="text-slate-500 text-[10px]"> / 100</span>
                  </td>
                  <td className="py-3 px-4">
                    <RiskBadge level={z.status} size="sm" />
                  </td>
                  <td className="py-3 px-4 text-white font-bold">{z.waterLevelMeters} m</td>
                  <td className="py-3 px-4">{z.population.toLocaleString()}</td>
                  <td className="py-3 px-4 text-emerald-400 font-semibold">{z.evacuatedPopulation.toLocaleString()}</td>
                  <td className="py-3 px-4 text-amber-300">{z.activeRescues} Operations</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => focusOnMap(z.coordinates, 15, z.name, 'ZONE', z.id)}
                      className="px-2.5 py-1 rounded bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/40 text-[10px] uppercase font-bold transition-colors"
                    >
                      Focus Map
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
