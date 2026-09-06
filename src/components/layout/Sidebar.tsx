import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  MapPin,
  Flame,
  AlertTriangle,
  Compass,
  Users,
  Boxes,
  Building2,
  ClipboardList,
  BarChart3,
  Cpu,
  Smartphone,
  ChevronLeft,
  ChevronRight,
  Radio,
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;
  isMobileOpen: boolean;
  setIsMobileOpen: (v: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isCollapsed,
  setIsCollapsed,
  isMobileOpen,
  setIsMobileOpen,
}) => {
  const { alerts, fieldReports, isOfflineMode, offlineQueuedReports } = useEmergency();
  const criticalAlertsCount = alerts.filter((a) => a.severity === 'CRITICAL' && a.status !== 'RESOLVED').length;
  const reviewReportsCount = fieldReports.filter((r) => r.status === 'UNDER_REVIEW').length;

  const navItems = [
    {
      to: '/',
      label: 'Command Overview',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      to: '/map',
      label: 'Live GIS Map',
      icon: MapPin,
      badge: 'LIVE',
      badgeColor: 'bg-blue-950 text-blue-400 border-blue-500/30',
    },
    {
      to: '/risk-analysis',
      label: 'Risk & Priority',
      icon: Flame,
      badge: '82/100',
      badgeColor: 'bg-red-950 text-red-400 border-red-500/30',
    },
    {
      to: '/alerts',
      label: 'Alerts & Incidents',
      icon: AlertTriangle,
      badge: criticalAlertsCount > 0 ? `${criticalAlertsCount}` : null,
      badgeColor: 'bg-red-900 text-white animate-pulse',
    },
    {
      to: '/evacuation',
      label: 'Evacuation Routes',
      icon: Compass,
      badge: null,
    },
    {
      to: '/teams',
      label: 'Rescue Teams',
      icon: Users,
      badge: '32',
      badgeColor: 'bg-slate-800 text-slate-300 border-slate-700',
    },
    {
      to: '/resources',
      label: 'Resources & Supply',
      icon: Boxes,
      badge: 'AI Opt',
      badgeColor: 'bg-emerald-950 text-emerald-400 border-emerald-500/30',
    },
    {
      to: '/infrastructure',
      label: 'Critical Infra',
      icon: Building2,
      badge: null,
    },
    {
      to: '/field-reports',
      label: 'Field Recon Reports',
      icon: ClipboardList,
      badge: reviewReportsCount > 0 ? `${reviewReportsCount}` : null,
      badgeColor: 'bg-amber-950 text-amber-400 border-amber-500/30',
    },
    {
      to: '/analytics',
      label: 'Analytics & Trends',
      icon: BarChart3,
      badge: null,
    },
    {
      to: '/intelligence',
      label: 'Data Pipeline & AI',
      icon: Cpu,
      badge: 'Loop',
      badgeColor: 'bg-purple-950 text-purple-300 border-purple-500/30',
    },
    {
      to: '/field-mode',
      label: 'Field Responder App',
      icon: Smartphone,
      badge: isOfflineMode ? 'OFFLINE' : offlineQueuedReports.length > 0 ? `${offlineQueuedReports.length}Q` : 'Field',
      badgeColor: isOfflineMode ? 'bg-amber-900 text-amber-200 animate-pulse' : 'bg-blue-900/60 text-blue-300 border-blue-500/30',
    },
  ];

  const content = (
    <div className="h-full flex flex-col justify-between bg-[#080b11] border-r border-command-border text-slate-300">
      {/* Top Header/Toggle */}
      <div>
        <div className="p-3 flex items-center justify-between border-b border-command-border/60">
          {!isCollapsed && (
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-red-500 animate-pulse" />
              <span className="text-[11px] font-mono font-bold tracking-widest text-slate-400 uppercase">
                SEOC NAVIGATION
              </span>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1 rounded hover:bg-command-card text-slate-400 hover:text-white transition-colors hidden md:block"
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation links */}
        <nav className="p-2 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-md text-xs font-medium transition-all group ${
                    isActive
                      ? 'bg-blue-600/20 text-white border border-blue-500/40 shadow-sm shadow-blue-900/40'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-command-card/80 border border-transparent'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                {!isCollapsed && (
                  <div className="flex items-center justify-between flex-1 truncate">
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span
                        className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded border ml-2 shrink-0 ${
                          item.badgeColor || 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer Info */}
      {!isCollapsed && (
        <div className="p-3 border-t border-command-border/60 bg-command-surface/50 text-[10px] font-mono text-slate-500 space-y-1">
          <div className="flex items-center justify-between text-slate-400">
            <span>SIH 2026 EOC ARCH</span>
            <span className="text-emerald-400">v2.4.0</span>
          </div>
          <div>Jurisdiction: Belagavi Dist SEOC</div>
        </div>
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Persistent Sidebar */}
      <aside
        className={`hidden md:block transition-all duration-200 shrink-0 sticky top-[73px] h-[calc(100vh-73px)] z-30 ${
          isCollapsed ? 'w-16' : 'w-60'
        }`}
      >
        {content}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-black/80 backdrop-blur-xs flex">
          <div className="w-64 h-full bg-[#080b11] shadow-2xl animate-slide-in">
            {content}
          </div>
          <div className="flex-1" onClick={() => setIsMobileOpen(false)} />
        </div>
      )}
    </>
  );
};
