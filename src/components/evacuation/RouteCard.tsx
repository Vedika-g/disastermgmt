import React from 'react';
import { EvacuationRoute } from '../../types';
import { RiskBadge } from '../common/RiskBadge';
import { Navigation, AlertOctagon, CheckCircle2, Clock, Milestone, ArrowRight } from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';

interface RouteCardProps {
  route: EvacuationRoute;
  isSelected: boolean;
  onSelect: (routeId: string) => void;
}

export const RouteCard: React.FC<RouteCardProps> = ({
  route,
  isSelected,
  onSelect,
}) => {
  const { focusOnMap } = useEmergency();

  const handleSelect = () => {
    onSelect(route.id);
    if (route.pathCoordinates.length > 0) {
      // Focus mid-route
      const midPoint = route.pathCoordinates[Math.floor(route.pathCoordinates.length / 2)];
      focusOnMap(midPoint, 14, route.name);
    }
  };

  return (
    <div
      onClick={handleSelect}
      className={`cursor-pointer rounded-lg p-4 border transition-all ${
        isSelected
          ? 'bg-blue-950/30 border-blue-500 shadow-lg shadow-blue-950/40 scale-[1.01]'
          : 'bg-command-card border-command-border hover:border-command-borderLight hover:bg-command-cardHover'
      }`}
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex items-center gap-2">
          {route.isRecommended ? (
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 uppercase">
              ★ RECOMMENDED
            </span>
          ) : route.status === 'BLOCKED' ? (
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-red-950/60 border border-red-500/40 text-red-300 uppercase">
              ✕ BLOCKED ROUTE
            </span>
          ) : (
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-amber-950/60 border border-amber-500/40 text-amber-300 uppercase">
              ALTERNATE ROUTE
            </span>
          )}
        </div>
        <RiskBadge level={route.status} size="sm" />
      </div>

      <h3 className="text-sm font-bold text-white tracking-wide mb-1">
        {route.name}
      </h3>

      <div className="flex items-center gap-1.5 text-xs text-slate-300 mb-3 font-mono">
        <span className="text-slate-400">{route.fromZone}</span>
        <ArrowRight className="w-3.5 h-3.5 text-blue-400 shrink-0" />
        <strong className="text-white">{route.toShelter}</strong>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 gap-2 p-2.5 rounded bg-command-surface border border-command-border/60 text-xs font-mono mb-3">
        <div className="flex items-center gap-1.5">
          <Milestone className="w-3.5 h-3.5 text-slate-400" />
          <div>
            <span className="text-[10px] text-slate-500 block">Est. Distance</span>
            <strong className="text-white text-xs">{route.distanceKm} km</strong>
          </div>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-slate-400" />
          <div>
            <span className="text-[10px] text-slate-500 block">Transit Time</span>
            <strong className="text-white text-xs">{route.etaMinutes} min</strong>
          </div>
        </div>
      </div>

      {/* Blockage Alert or Checkpoints */}
      {route.blockageReason ? (
        <div className="p-2.5 rounded bg-red-950/30 border border-red-500/30 text-xs text-red-300 flex items-start gap-2">
          <AlertOctagon className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <div>
            <strong className="font-mono text-[10px] uppercase block text-red-400">Hazard Cause:</strong>
            <span className="text-[11px]">{route.blockageReason}</span>
          </div>
        </div>
      ) : (
        <div className="text-[11px] text-slate-400">
          <span className="font-mono text-[10px] uppercase text-slate-500 block mb-1">Waypoints & Checkpoints:</span>
          <div className="flex flex-wrap gap-1 font-mono text-[10px]">
            {route.checkpoints.map((cp, i) => (
              <span key={i} className="px-1.5 py-0.5 bg-command-surface rounded border border-command-border text-slate-300">
                {cp}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-3 pt-2 border-t border-command-border/60 flex items-center justify-between text-xs font-mono">
        <span className="text-slate-400 text-[11px]">
          {isSelected ? '● Highlighted on GIS Map' : 'Click to trace corridor'}
        </span>
        <span className="text-blue-400 font-medium flex items-center gap-1">
          <Navigation className="w-3 h-3" /> Select Route
        </span>
      </div>
    </div>
  );
};
