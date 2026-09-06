import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, MapPin, AlertTriangle, Smartphone, Menu } from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';

interface MobileNavProps {
  onOpenMenu: () => void;
}

export const MobileNav: React.FC<MobileNavProps> = ({ onOpenMenu }) => {
  const { alerts, isOfflineMode } = useEmergency();
  const criticalCount = alerts.filter((a) => a.severity === 'CRITICAL' && a.status !== 'RESOLVED').length;

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#070a10] border-t border-command-border px-2 py-1.5 flex items-center justify-around text-[10px] font-mono">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 p-1 rounded transition-colors ${
            isActive ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-white'
          }`
        }
      >
        <LayoutDashboard className="w-4 h-4" />
        <span>Overview</span>
      </NavLink>

      <NavLink
        to="/map"
        className={({ isActive }) =>
          `flex flex-col items-center gap-1 p-1 rounded transition-colors ${
            isActive ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-white'
          }`
        }
      >
        <MapPin className="w-4 h-4" />
        <span>GIS Map</span>
      </NavLink>

      <NavLink
        to="/alerts"
        className={({ isActive }) =>
          `relative flex flex-col items-center gap-1 p-1 rounded transition-colors ${
            isActive ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-white'
          }`
        }
      >
        <AlertTriangle className="w-4 h-4" />
        <span>Alerts</span>
        {criticalCount > 0 && (
          <span className="absolute top-0 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
        )}
      </NavLink>

      <NavLink
        to="/field-mode"
        className={({ isActive }) =>
          `relative flex flex-col items-center gap-1 p-1 rounded transition-colors ${
            isActive ? 'text-blue-400 font-bold' : 'text-slate-400 hover:text-white'
          }`
        }
      >
        <Smartphone className="w-4 h-4" />
        <span>Field</span>
        {isOfflineMode && (
          <span className="absolute top-0 right-0 w-2 h-2 bg-amber-500 rounded-full" />
        )}
      </NavLink>

      <button
        onClick={onOpenMenu}
        className="flex flex-col items-center gap-1 p-1 text-slate-400 hover:text-white transition-colors"
      >
        <Menu className="w-4 h-4" />
        <span>More</span>
      </button>
    </div>
  );
};
