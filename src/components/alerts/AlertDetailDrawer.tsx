import React, { useState } from 'react';
import { Alert } from '../../types';
import { Drawer } from '../common/Drawer';
import { RiskBadge } from '../common/RiskBadge';
import { MapPin, Users, CheckCircle, ShieldAlert, Clock, Radio, ArrowRight } from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';

interface AlertDetailDrawerProps {
  alert: Alert | null;
  isOpen: boolean;
  onClose: () => void;
}

export const AlertDetailDrawer: React.FC<AlertDetailDrawerProps> = ({
  alert,
  isOpen,
  onClose,
}) => {
  const { teams, updateAlertStatus, focusOnMap } = useEmergency();
  const [selectedTeamId, setSelectedTeamId] = useState<string>('R-17');

  if (!alert) return null;

  const handleAssign = () => {
    updateAlertStatus(alert.id, 'DISPATCHED', selectedTeamId);
    onClose();
  };

  const handleResolve = () => {
    updateAlertStatus(alert.id, 'RESOLVED');
    onClose();
  };

  const handleViewOnMap = () => {
    focusOnMap(alert.coordinates, 15, alert.title, 'ALERT', alert.id);
    onClose();
  };

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={alert.title}
      subtitle={`Incident ID: ${alert.id} • Registered ${alert.timestamp}`}
      badge={<RiskBadge level={alert.severity} size="sm" />}
      footer={
        <>
          <button
            onClick={handleViewOnMap}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded border border-command-border text-xs font-mono text-slate-300 hover:text-white hover:bg-command-card"
          >
            <MapPin className="w-3.5 h-3.5" /> View on Map
          </button>
          {alert.status !== 'RESOLVED' ? (
            <button
              onClick={handleResolve}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-medium"
            >
              <CheckCircle className="w-3.5 h-3.5" /> Mark Resolved
            </button>
          ) : (
            <span className="text-emerald-400 text-xs font-mono">Status: Incident Closed</span>
          )}
        </>
      }
    >
      {/* Alert Metadata Grid */}
      <div className="grid grid-cols-2 gap-3 p-3 bg-command-card rounded border border-command-border text-xs font-mono">
        <div>
          <span className="text-slate-400 block text-[10px]">Location / Sector</span>
          <strong className="text-white text-[11px]">{alert.location}</strong>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px]">Telemetry Source</span>
          <span className="text-slate-200 text-[11px] flex items-center gap-1">
            <Radio className="w-3 h-3 text-blue-400" />
            {alert.source}
          </span>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px]">Composite Risk Impact</span>
          <strong className="text-red-400 text-sm">{alert.relatedRiskScore} / 100</strong>
        </div>
        <div>
          <span className="text-slate-400 block text-[10px]">Triage Lifecycle</span>
          <span className="text-amber-300 font-bold">{alert.status}</span>
        </div>
      </div>

      {/* Description */}
      <div>
        <h4 className="text-xs uppercase font-mono font-bold text-slate-400 tracking-wider mb-1.5">
          Incident Operational Narrative
        </h4>
        <p className="p-3 bg-command-card rounded border border-command-border text-slate-200 text-xs leading-relaxed">
          {alert.description}
        </p>
      </div>

      {/* Action Directive */}
      <div>
        <h4 className="text-xs uppercase font-mono font-bold text-slate-400 tracking-wider mb-1.5">
          Standard Operating Procedure (SOP) Directive
        </h4>
        <div className="p-3 bg-red-950/20 border border-red-500/30 rounded text-xs text-red-200 font-mono flex items-start gap-2">
          <ShieldAlert className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <span>{alert.actionRequired}</span>
        </div>
      </div>

      {/* Assigned Team & Dispatch Control */}
      <div className="border-t border-command-border pt-4">
        <h4 className="text-xs uppercase font-mono font-bold text-slate-400 tracking-wider mb-2 flex items-center justify-between">
          <span>Task Team Assignment</span>
          {alert.assignedTeam && (
            <span className="text-blue-400 text-[11px] font-mono">
              Currently: {alert.assignedTeam}
            </span>
          )}
        </h4>

        <div className="flex gap-2">
          <select
            value={selectedTeamId}
            onChange={(e) => setSelectedTeamId(e.target.value)}
            className="flex-1 bg-command-card border border-command-border rounded px-3 py-1.5 text-xs font-mono text-white focus:outline-none focus:border-blue-500"
          >
            {teams.map((t) => (
              <option key={t.id} value={t.name}>
                {t.name} ({t.type} • {t.status})
              </option>
            ))}
          </select>
          <button
            onClick={handleAssign}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-medium rounded flex items-center gap-1.5 transition-colors"
          >
            <Users className="w-3.5 h-3.5" />
            <span>Dispatch</span>
          </button>
        </div>
      </div>
    </Drawer>
  );
};
