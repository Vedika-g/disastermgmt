import React from 'react';
import { Drawer } from '../common/Drawer';
import { useEmergency } from '../../context/EmergencyContext';
import { RiskBadge } from '../common/RiskBadge';
import { AlertTriangle, Clock, MapPin } from 'lucide-react';

interface NotificationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationsDrawer: React.FC<NotificationsDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const { alerts, focusOnMap } = useEmergency();

  const unresolvedAlerts = alerts.filter((a) => a.status !== 'RESOLVED');

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Incident Emergency Notifications"
      subtitle={`${unresolvedAlerts.length} Unresolved Incidents Awaiting Operational Clearance`}
      width="md"
    >
      <div className="space-y-3 font-mono text-xs">
        {unresolvedAlerts.map((alert) => (
          <div
            key={alert.id}
            className="p-3 bg-command-card border border-command-border rounded-lg space-y-2 hover:border-command-borderLight transition-all"
          >
            <div className="flex items-center justify-between">
              <RiskBadge level={alert.severity} size="sm" />
              <span className="text-[10px] text-slate-400 flex items-center gap-1">
                <Clock className="w-3 h-3" /> {alert.timestamp}
              </span>
            </div>

            <h4 className="text-xs font-bold text-white leading-snug">{alert.title}</h4>
            <p className="text-[11px] text-slate-300 font-sans">{alert.description}</p>

            <div className="flex items-center justify-between pt-1 border-t border-command-border/50 text-[11px]">
              <span className="text-slate-400 truncate">{alert.location}</span>
              <button
                onClick={() => {
                  focusOnMap(alert.coordinates, 16, alert.title, 'ALERT', alert.id);
                  onClose();
                }}
                className="text-blue-400 hover:text-white flex items-center gap-1 font-bold shrink-0 ml-2"
              >
                <MapPin className="w-3 h-3" /> Focus Map
              </button>
            </div>
          </div>
        ))}
      </div>
    </Drawer>
  );
};
