import React, { useState } from 'react';
import {
  ShieldAlert,
  Radio,
  Play,
  Pause,
  RotateCw,
  Bell,
  Search,
  User,
  Activity,
  Server,
  Cpu,
  Wifi,
} from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';

interface HeaderProps {
  onOpenNotifications?: () => void;
  onSearchSelect?: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenNotifications }) => {
  const {
    disaster,
    systemStatus,
    currentTimeString,
    toggleSimulationPause,
    manualSimulateUpdate,
    alerts,
    focusOnMap,
    riskZones,
  } = useEmergency();

  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<{ name: string; type: string; coords: [number, number] }[]>([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const activeAlertsCount = alerts.filter((a) => a.status !== 'RESOLVED').length;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const q = e.target.value;
    setSearchQuery(q);

    if (q.trim().length > 1) {
      const matchedZones = riskZones
        .filter((z) => z.name.toLowerCase().includes(q.toLowerCase()) || z.hazard.toLowerCase().includes(q.toLowerCase()))
        .map((z) => ({ name: z.name, type: 'RISK ZONE', coords: z.coordinates }));

      const matchedAlerts = alerts
        .filter((a) => a.title.toLowerCase().includes(q.toLowerCase()) || a.location.toLowerCase().includes(q.toLowerCase()))
        .map((a) => ({ name: a.title, type: 'INCIDENT ALERT', coords: a.coordinates }));

      setSearchResults([...matchedZones, ...matchedAlerts].slice(0, 6));
      setShowSearchDropdown(true);
    } else {
      setSearchResults([]);
      setShowSearchDropdown(false);
    }
  };

  const handleSelectResult = (coords: [number, number], name: string) => {
    focusOnMap(coords, 15, name);
    setShowSearchDropdown(false);
    setSearchQuery('');
  };

  return (
    <header className="sticky top-0 z-40 bg-[#070a10] border-b border-command-border text-slate-200">
      {/* Top Banner Bar */}
      <div className="px-4 py-2 flex flex-wrap items-center justify-between gap-3 border-b border-command-border/50 bg-[#090d16]">
        {/* Left: Product Identity & Active Incident */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-red-600/20 border border-red-500/40 flex items-center justify-center text-red-400 shrink-0 shadow-sm shadow-red-950">
              <ShieldAlert className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-black tracking-wider text-white font-mono">
                  DISASTER COMMAND
                </span>
                <span className="text-[10px] bg-red-950/60 border border-red-500/40 text-red-300 font-mono px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">
                  DEFCON 2 • CAT-3 ALERT
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-tight hidden sm:block">
                AI-Driven Disaster Response & Emergency Management Platform
              </p>
            </div>
          </div>

          <div className="h-6 w-px bg-command-border hidden md:block" />

          {/* Active Incident Tag */}
          <div className="hidden lg:flex items-center gap-2 bg-command-surface px-2.5 py-1 rounded border border-command-border text-xs">
            <span className="text-slate-400 uppercase text-[10px] font-mono">Active Incident:</span>
            <span className="font-semibold text-white tracking-wide">{disaster.name}</span>
            <span className="text-slate-400 font-mono text-[11px]">({disaster.region})</span>
          </div>
        </div>

        {/* Center: Search */}
        <div className="relative flex-1 max-w-xs md:max-w-sm">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search zones, alerts, teams (e.g. Zone A, NH-48)..."
              value={searchQuery}
              onChange={handleSearchChange}
              onFocus={() => searchQuery.length > 1 && setShowSearchDropdown(true)}
              className="w-full pl-8 pr-3 py-1 text-xs bg-command-surface border border-command-border rounded focus:outline-none focus:border-blue-500 text-slate-200 placeholder-slate-500 font-mono"
            />
          </div>

          {/* Search Dropdown */}
          {showSearchDropdown && searchResults.length > 0 && (
            <div className="absolute left-0 right-0 top-full mt-1 bg-command-card border border-command-border rounded shadow-xl z-50 overflow-hidden">
              {searchResults.map((res, i) => (
                <button
                  key={i}
                  onClick={() => handleSelectResult(res.coords, res.name)}
                  className="w-full text-left px-3 py-2 text-xs hover:bg-command-cardHover border-b border-command-border/40 last:border-b-0 flex items-center justify-between"
                >
                  <span className="text-white truncate font-medium">{res.name}</span>
                  <span className="text-[10px] font-mono text-slate-400 px-1.5 py-0.5 rounded bg-command-surface border border-command-border">
                    {res.type}
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Telemetry & Controls */}
        <div className="flex items-center gap-3">
          {/* Live indicator & Clock */}
          <div className="flex items-center gap-2 font-mono text-xs bg-command-surface border border-command-border px-2.5 py-1 rounded">
            <div className="flex items-center gap-1.5">
              <span
                className={`w-2 h-2 rounded-full ${
                  systemStatus.isSimulationPaused ? 'bg-amber-400' : 'bg-emerald-400 animate-ping-slow'
                }`}
              />
              <span
                className={`font-bold tracking-wider ${
                  systemStatus.isSimulationPaused ? 'text-amber-400' : 'text-emerald-400'
                }`}
              >
                {systemStatus.isSimulationPaused ? 'PAUSED' : 'LIVE'}
              </span>
            </div>
            <span className="text-slate-500">|</span>
            <span className="text-white font-semibold">{currentTimeString}</span>
          </div>

          {/* Pause / Play simulation */}
          <button
            onClick={toggleSimulationPause}
            title={systemStatus.isSimulationPaused ? 'Resume live simulation' : 'Pause simulation'}
            className="p-1.5 rounded border border-command-border bg-command-surface hover:bg-command-card text-slate-300 hover:text-white transition-colors"
          >
            {systemStatus.isSimulationPaused ? <Play className="w-3.5 h-3.5 text-emerald-400" /> : <Pause className="w-3.5 h-3.5" />}
          </button>

          {/* Force tick / refresh */}
          <button
            onClick={manualSimulateUpdate}
            title="Trigger instant simulation tick"
            className="p-1.5 rounded border border-command-border bg-command-surface hover:bg-command-card text-slate-300 hover:text-white transition-colors"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>

          {/* Alert notifications bell */}
          <button
            onClick={onOpenNotifications}
            className="relative p-1.5 rounded border border-command-border bg-command-surface hover:bg-command-card text-slate-300 hover:text-white transition-colors"
          >
            <Bell className="w-3.5 h-3.5" />
            {activeAlertsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-[9px] font-mono font-bold rounded-full flex items-center justify-center animate-pulse">
                {activeAlertsCount}
              </span>
            )}
          </button>

          {/* User badge placeholder */}
          <div className="hidden xl:flex items-center gap-2 pl-2 border-l border-command-border/60 text-xs">
            <div className="w-6 h-6 rounded bg-blue-600/30 border border-blue-500/40 text-blue-300 flex items-center justify-center font-mono font-bold text-[11px]">
              VP
            </div>
            <div className="text-left leading-tight">
              <div className="text-white text-[11px] font-semibold">Cdr. V. Patil</div>
              <div className="text-slate-400 text-[9px] font-mono uppercase">SEOC Controller</div>
            </div>
          </div>
        </div>
      </div>

      {/* Sub-Header: System Status Ribbon */}
      <div className="px-4 py-1 flex items-center justify-between text-[11px] font-mono text-slate-400 bg-[#06090e] overflow-x-auto whitespace-nowrap">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 text-slate-300">
            <Server className="w-3 h-3 text-emerald-400" />
            <span>AI Inference: <strong className="text-emerald-400">ONLINE (98.2%)</strong></span>
          </span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <Activity className="w-3 h-3 text-emerald-400" />
            <span>GIS Engine: <strong className="text-emerald-400">ACTIVE (10m SAR)</strong></span>
          </span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <Radio className="w-3 h-3 text-emerald-400" />
            <span>IoT Sensors: <strong className="text-emerald-400">{systemStatus.sensorsOnlineCount}/{systemStatus.sensorsTotalCount} ONLINE</strong></span>
          </span>
          <span className="flex items-center gap-1.5 text-slate-300">
            <Wifi className="w-3 h-3 text-emerald-400" />
            <span>Field Mesh: <strong className="text-emerald-400">OPERATIONAL</strong></span>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="hidden sm:inline text-slate-400">
            Weather: <span className="text-slate-300">162.4mm / 24h</span>
          </span>
          <span className="text-slate-500">|</span>
          <span className="text-slate-400">
            Bellary Nala: <span className="text-red-400 font-bold">4.85m (Critical Stage)</span>
          </span>
        </div>
      </div>
    </header>
  );
};
