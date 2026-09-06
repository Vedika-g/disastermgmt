import React from 'react';
import { MapPin, TrendingUp, TrendingDown, Minus, Users, AlertTriangle } from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';
import { RiskBadge } from './RiskBadge';

export const TopPriorityLocations: React.FC = () => {
  const { riskZones, focusOnMap } = useEmergency();

  // Sort by priorityRank or riskScore descending
  const sortedZones = [...riskZones].sort((a, b) => b.riskScore - a.riskScore);

  const getTrendIcon = (trend: string) => {
    if (trend === 'increasing') {
      return (
        <span className="flex items-center gap-1 text-red-400 font-mono text-[11px] font-semibold">
          <TrendingUp className="w-3.5 h-3.5" /> Increasing
        </span>
      );
    }
    if (trend === 'decreasing') {
      return (
        <span className="flex items-center gap-1 text-emerald-400 font-mono text-[11px] font-semibold">
          <TrendingDown className="w-3.5 h-3.5" /> Decreasing
        </span>
      );
    }
    return (
      <span className="flex items-center gap-1 text-slate-400 font-mono text-[11px]">
        <Minus className="w-3.5 h-3.5" /> Stable
      </span>
    );
  };

  return (
    <div className="bg-command-card border border-command-border rounded-lg overflow-hidden flex flex-col h-full">
      <div className="px-4 py-3 border-b border-command-border/60 bg-command-surface flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-red-400" />
          <h3 className="text-xs font-bold font-mono text-white uppercase tracking-wider">
            TOP PRIORITY RISK LOCATIONS
          </h3>
        </div>
        <span className="text-[10px] font-mono text-slate-400">Ranked by Composite AI Vulnerability</span>
      </div>

      <div className="p-3 space-y-2.5 overflow-y-auto max-h-[580px]">
        {sortedZones.map((zone, index) => {
          const rankFormatted = String(index + 1).padStart(2, '0');
          return (
            <div
              key={zone.id}
              className="bg-command-surface/70 border border-command-border rounded-lg p-3 hover:border-command-borderLight transition-all"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-black px-1.5 py-0.5 rounded bg-slate-800 text-slate-200 border border-slate-700">
                    {rankFormatted}
                  </span>
                  <div>
                    <h4 className="text-xs font-bold text-white tracking-wide">{zone.name}</h4>
                    <p className="text-[10px] text-slate-400 font-mono">{zone.locality}</p>
                  </div>
                </div>
                <RiskBadge level={zone.status} size="sm" />
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 my-2 py-2 border-y border-command-border/50 text-[11px] font-mono">
                <div>
                  <span className="text-slate-400 text-[10px] block">Risk Score:</span>
                  <strong className="text-white text-sm font-bold">{zone.riskScore}</strong>
                  <span className="text-slate-500 text-[10px]"> / 100</span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Population:</span>
                  <span className="text-slate-200 font-semibold flex items-center gap-1">
                    <Users className="w-3 h-3 text-slate-400" />
                    {zone.population.toLocaleString()}
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Trend:</span>
                  {getTrendIcon(zone.trend)}
                </div>
              </div>

              <div className="flex items-center justify-between gap-2 pt-1 text-xs">
                <div className="text-[11px] text-amber-300 truncate">
                  <strong className="text-slate-400 font-mono">Hazard:</strong> {zone.hazard}
                </div>

                <button
                  onClick={() => focusOnMap(zone.coordinates, 15, zone.name, 'ZONE', zone.id)}
                  className="flex items-center gap-1 px-2.5 py-1 rounded bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/40 text-[11px] font-mono font-medium transition-colors shrink-0"
                >
                  <MapPin className="w-3 h-3" />
                  <span>View on Map</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
