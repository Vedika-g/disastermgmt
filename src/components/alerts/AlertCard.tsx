import React from 'react';
import { Alert } from '../../types';
import { RiskBadge } from '../common/RiskBadge';
import { MapPin, Eye, Users, Clock, Radio } from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';

interface AlertCardProps {
  alert: Alert;
  onInvestigate: (alert: Alert) => void;
}

export const AlertCard: React.FC<AlertCardProps> = ({ alert, onInvestigate }) => {
  const { focusOnMap } = useEmergency();

  return (
    <div className="bg-command-card border border-command-border rounded-lg p-4 hover:border-command-borderLight transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <RiskBadge level={alert.severity} size="sm" />
            <span className="text-[10px] font-mono text-slate-400">{alert.id}</span>
          </div>
          <span className="text-[10px] font-mono text-slate-400 flex items-center gap-1">
            <Clock className="w-3 h-3" /> {alert.timestamp}
          </span>
        </div>

        <h3 className="text-sm font-bold text-white tracking-wide mb-1 leading-snug">
          {alert.title}
        </h3>

        <p className="text-xs text-slate-300 line-clamp-2 mb-3">
          {alert.description}
        </p>

        <div className="grid grid-cols-2 gap-2 text-[11px] font-mono p-2 rounded bg-command-surface/80 border border-command-border/60 mb-3">
          <div>
            <span className="text-slate-500 text-[10px] block">Location:</span>
            <span className="text-slate-300 truncate block">{alert.location}</span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] block">Source:</span>
            <span className="text-blue-400 flex items-center gap-1 truncate">
              <Radio className="w-2.5 h-2.5 shrink-0" /> {alert.source}
            </span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] block">Risk Impact:</span>
            <span className="text-red-400 font-bold">{alert.relatedRiskScore} / 100</span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] block">Assigned Team:</span>
            <span className="text-amber-300 truncate block">
              {alert.assignedTeam || 'Unassigned'}
            </span>
          </div>
        </div>
      </div>

      {/* Buttons: View on Map, Investigate, Assign Team */}
      <div className="flex items-center gap-2 pt-2 border-t border-command-border/60 text-xs font-mono">
        <button
          onClick={() => focusOnMap(alert.coordinates, 15, alert.title, 'ALERT', alert.id)}
          className="flex-1 flex items-center justify-center gap-1 px-2.5 py-1.5 rounded bg-command-surface hover:bg-command-cardHover text-slate-300 hover:text-white border border-command-border text-[11px] transition-colors"
        >
          <MapPin className="w-3 h-3" />
          <span>Map</span>
        </button>

        <button
          onClick={() => onInvestigate(alert)}
          className="flex-1 flex items-center justify-center gap-1 px-2.5 py-1.5 rounded bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/40 text-[11px] font-medium transition-colors"
        >
          <Eye className="w-3 h-3" />
          <span>Investigate</span>
        </button>

        <button
          onClick={() => onInvestigate(alert)}
          className="flex-1 flex items-center justify-center gap-1 px-2.5 py-1.5 rounded bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/40 text-[11px] font-medium transition-colors"
        >
          <Users className="w-3 h-3" />
          <span>Assign</span>
        </button>
      </div>
    </div>
  );
};
