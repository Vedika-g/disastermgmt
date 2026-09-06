import React from 'react';
import { Radio, AlertCircle, Users, ShieldAlert, Compass, Activity } from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';
import { RiskBadge } from './RiskBadge';

export const ActivityFeed: React.FC = () => {
  const { activityFeed, focusOnMap, riskZones, teams, alerts } = useEmergency();

  const handleEventClick = (evt: typeof activityFeed[0]) => {
    if (!evt.targetId) return;

    // Try finding matching zone
    const zone = riskZones.find((z) => z.id === evt.targetId);
    if (zone) {
      focusOnMap(zone.coordinates, 14, zone.name, 'ZONE', zone.id);
      return;
    }

    // Try finding matching team
    const team = teams.find((t) => t.id === evt.targetId);
    if (team) {
      focusOnMap(team.coordinates, 15, team.name, 'TEAM', team.id);
      return;
    }

    // Try finding matching alert
    const alert = alerts.find((a) => a.id === evt.targetId);
    if (alert) {
      focusOnMap(alert.coordinates, 15, alert.title, 'ALERT', alert.id);
      return;
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'RISK_CHANGE':
        return <AlertCircle className="w-3.5 h-3.5 text-red-400" />;
      case 'TEAM_DISPATCH':
        return <Users className="w-3.5 h-3.5 text-blue-400" />;
      case 'BLOCKAGE':
        return <ShieldAlert className="w-3.5 h-3.5 text-red-500" />;
      case 'SHELTER_UPDATE':
        return <Compass className="w-3.5 h-3.5 text-emerald-400" />;
      default:
        return <Activity className="w-3.5 h-3.5 text-slate-400" />;
    }
  };

  return (
    <div className="bg-command-card border border-command-border rounded-lg overflow-hidden flex flex-col h-full">
      <div className="px-4 py-3 border-b border-command-border/60 bg-command-surface flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Radio className="w-4 h-4 text-emerald-400 animate-pulse" />
          <h3 className="text-xs font-bold font-mono text-white uppercase tracking-wider">
            LIVE OPERATIONAL ACTIVITY FEED
          </h3>
        </div>
        <span className="text-[10px] font-mono text-slate-400">Real-time Telemetry</span>
      </div>

      <div className="p-3 overflow-y-auto space-y-2 flex-1 max-h-[380px]">
        {activityFeed.map((evt) => (
          <div
            key={evt.id}
            onClick={() => handleEventClick(evt)}
            className={`p-2.5 rounded border border-command-border/70 bg-command-surface/50 text-xs transition-colors ${
              evt.targetId ? 'cursor-pointer hover:border-command-borderLight hover:bg-command-cardHover' : ''
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <div className="flex items-center gap-2">
                {getIcon(evt.type)}
                <span className="font-mono text-[11px] font-bold text-slate-300">
                  {evt.time}
                </span>
              </div>
              <RiskBadge level={evt.severity} size="sm" showDot={false} />
            </div>
            <p className="text-slate-300 leading-snug pl-5">{evt.message}</p>
            {evt.targetId && (
              <div className="pl-5 mt-1 text-[10px] font-mono text-blue-400 flex items-center gap-1">
                <span>View on GIS Map →</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
