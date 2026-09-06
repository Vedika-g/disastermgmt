import React, { useState } from 'react';
import { CommandMap } from '../components/gis/CommandMap';
import { useEmergency } from '../context/EmergencyContext';
import { RiskBadge } from '../components/common/RiskBadge';
import {
  MapPin,
  Users,
  Building2,
  Radio,
  AlertTriangle,
  Compass,
  Filter,
  Layers,
  Crosshair,
  Search,
} from 'lucide-react';

export const LiveGisPage: React.FC = () => {
  const {
    riskZones,
    teams,
    shelters,
    hospitals,
    sensors,
    alerts,
    focusOnMap,
  } = useEmergency();

  const [activeTab, setActiveTab] = useState<'ZONES' | 'TEAMS' | 'SHELTERS' | 'HOSPITALS' | 'SENSORS'>('ZONES');
  const [filterQuery, setFilterQuery] = useState('');

  return (
    <div className="p-4 md:p-6 space-y-4 max-w-[1800px] mx-auto animate-fade-in">
      {/* Title Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-command-border pb-3">
        <div>
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-400" />
            <h1 className="text-xl font-bold font-mono text-white uppercase tracking-wide">
              Live GIS Tactical Map & Spatial Intelligence
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-500/40 uppercase">
              Cartographic HUD
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Full-viewport geospatial command suite with multi-layer overlays and telemetry fly-to
          </p>
        </div>

        {/* Quick Location Fly-to Dropdown */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-slate-400">Quick Sector Jump:</span>
          <select
            onChange={(e) => {
              const zone = riskZones.find((z) => z.id === e.target.value);
              if (zone) focusOnMap(zone.coordinates, 15, zone.name, 'ZONE', zone.id);
            }}
            className="bg-command-card border border-command-border rounded px-3 py-1 text-xs font-mono text-white focus:outline-none focus:border-blue-500"
          >
            <option value="">Select Zone...</option>
            {riskZones.map((z) => (
              <option key={z.id} value={z.id}>
                {z.name} (Risk: {z.riskScore})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: GIS Map Canvas + Interactive Asset Inspector Rail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Full-size Map (8 cols) */}
        <div className="lg:col-span-8">
          <CommandMap height="720px" />
        </div>

        {/* Tactical Asset Inspector Rail (4 cols) */}
        <div className="lg:col-span-4 bg-command-card border border-command-border rounded-lg flex flex-col h-[720px] overflow-hidden">
          {/* Tab Selector */}
          <div className="grid grid-cols-5 p-1 bg-command-surface border-b border-command-border text-center text-[10px] font-mono font-bold">
            <button
              onClick={() => setActiveTab('ZONES')}
              className={`py-2 rounded transition-colors ${
                activeTab === 'ZONES' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              ZONES ({riskZones.length})
            </button>
            <button
              onClick={() => setActiveTab('TEAMS')}
              className={`py-2 rounded transition-colors ${
                activeTab === 'TEAMS' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              TEAMS ({teams.length})
            </button>
            <button
              onClick={() => setActiveTab('SHELTERS')}
              className={`py-2 rounded transition-colors ${
                activeTab === 'SHELTERS' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              SHELTERS ({shelters.length})
            </button>
            <button
              onClick={() => setActiveTab('HOSPITALS')}
              className={`py-2 rounded transition-colors ${
                activeTab === 'HOSPITALS' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              MED ({hospitals.length})
            </button>
            <button
              onClick={() => setActiveTab('SENSORS')}
              className={`py-2 rounded transition-colors ${
                activeTab === 'SENSORS' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              IOT ({sensors.length})
            </button>
          </div>

          {/* Search filter input */}
          <div className="p-2.5 border-b border-command-border/60 bg-command-surface/50">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder={`Filter ${activeTab.toLowerCase()}...`}
                value={filterQuery}
                onChange={(e) => setFilterQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1 bg-command-card border border-command-border rounded text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          {/* List Content */}
          <div className="flex-1 p-3 overflow-y-auto space-y-2.5">
            {activeTab === 'ZONES' &&
              riskZones
                .filter((z) => z.name.toLowerCase().includes(filterQuery.toLowerCase()))
                .map((z) => (
                  <div
                    key={z.id}
                    onClick={() => focusOnMap(z.coordinates, 15, z.name, 'ZONE', z.id)}
                    className="p-3 bg-command-surface rounded border border-command-border hover:border-blue-500/60 cursor-pointer transition-colors text-xs"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <strong className="text-white font-mono">{z.name}</strong>
                      <RiskBadge level={z.status} size="sm" />
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-[11px] font-mono text-slate-400 mt-1">
                      <div>Risk Score: <strong className="text-red-400">{z.riskScore}/100</strong></div>
                      <div>Water Level: <strong className="text-white">{z.waterLevelMeters}m</strong></div>
                      <div>Population: <strong className="text-slate-200">{z.population.toLocaleString()}</strong></div>
                      <div>Rescues: <strong className="text-amber-400">{z.activeRescues} Active</strong></div>
                    </div>
                    <div className="mt-2 text-[10px] font-mono text-blue-400 flex items-center justify-end gap-1">
                      <Crosshair className="w-3 h-3" /> Focus Location
                    </div>
                  </div>
                ))}

            {activeTab === 'TEAMS' &&
              teams
                .filter((t) => t.name.toLowerCase().includes(filterQuery.toLowerCase()))
                .map((t) => (
                  <div
                    key={t.id}
                    onClick={() => focusOnMap(t.coordinates, 16, t.name, 'TEAM', t.id)}
                    className="p-3 bg-command-surface rounded border border-command-border hover:border-blue-500/60 cursor-pointer transition-colors text-xs"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <strong className="text-white font-mono">{t.name}</strong>
                      <RiskBadge level={t.status} size="sm" />
                    </div>
                    <p className="text-[11px] text-blue-300 font-mono">{t.type}</p>
                    <p className="text-[11px] text-slate-300 mt-1">Task: {t.currentAssignment}</p>
                    <div className="grid grid-cols-2 gap-1 text-[10px] font-mono text-slate-400 mt-2">
                      <div>Members: {t.members}</div>
                      <div>Priority: <span className="text-red-400">{t.priority}</span></div>
                    </div>
                    <div className="mt-2 text-[10px] font-mono text-blue-400 flex items-center justify-end gap-1">
                      <Crosshair className="w-3 h-3" /> Focus Location
                    </div>
                  </div>
                ))}

            {activeTab === 'SHELTERS' &&
              shelters
                .filter((s) => s.name.toLowerCase().includes(filterQuery.toLowerCase()))
                .map((s) => (
                  <div
                    key={s.id}
                    onClick={() => focusOnMap(s.coordinates, 16, s.name, 'SHELTER', s.id)}
                    className="p-3 bg-command-surface rounded border border-command-border hover:border-emerald-500/60 cursor-pointer transition-colors text-xs"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <strong className="text-white font-mono">{s.name}</strong>
                      <RiskBadge level={s.status} size="sm" />
                    </div>
                    <div className="text-[11px] font-mono text-slate-300 mt-1">
                      Occupancy: <strong className="text-emerald-400">{s.currentOccupancy} / {s.capacity}</strong> ({Math.round((s.currentOccupancy / s.capacity) * 100)}%)
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-[10px] font-mono text-slate-400 mt-1">
                      <div>Water: {s.waterSupplyLiters.toLocaleString()} L</div>
                      <div>Food Kits: {s.foodKitsRemaining}</div>
                    </div>
                    <div className="mt-2 text-[10px] font-mono text-emerald-400 flex items-center justify-end gap-1">
                      <Crosshair className="w-3 h-3" /> Focus Location
                    </div>
                  </div>
                ))}

            {activeTab === 'HOSPITALS' &&
              hospitals
                .filter((h) => h.name.toLowerCase().includes(filterQuery.toLowerCase()))
                .map((h) => (
                  <div
                    key={h.id}
                    onClick={() => focusOnMap(h.coordinates, 16, h.name)}
                    className="p-3 bg-command-surface rounded border border-command-border hover:border-red-500/60 cursor-pointer transition-colors text-xs"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <strong className="text-white font-mono">{h.name}</strong>
                      <RiskBadge level={h.status} size="sm" />
                    </div>
                    <div className="text-[11px] font-mono text-slate-300 mt-1">
                      Total Beds: {h.totalBeds} • Avail: <strong className="text-emerald-400">{h.availableBeds}</strong>
                    </div>
                    <div className="text-[11px] font-mono text-red-300">
                      ICU Beds: {h.icuBedsAvailable} / {h.icuBedsTotal} Avail
                    </div>
                    <div className="mt-2 text-[10px] font-mono text-red-400 flex items-center justify-end gap-1">
                      <Crosshair className="w-3 h-3" /> Focus Location
                    </div>
                  </div>
                ))}

            {activeTab === 'SENSORS' &&
              sensors
                .filter((sn) => sn.name.toLowerCase().includes(filterQuery.toLowerCase()))
                .map((sn) => (
                  <div
                    key={sn.id}
                    onClick={() => focusOnMap(sn.coordinates, 16, sn.name)}
                    className="p-3 bg-command-surface rounded border border-command-border hover:border-amber-500/60 cursor-pointer transition-colors text-xs"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <strong className="text-white font-mono text-[11px]">{sn.name}</strong>
                      <RiskBadge level={sn.status} size="sm" />
                    </div>
                    <div className="text-sm font-mono font-bold text-amber-400 mt-1">
                      {sn.currentReading} {sn.unit}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400">
                      Threshold: {sn.alertThreshold} {sn.unit} • Battery: {sn.batteryPercent}%
                    </div>
                    <div className="mt-2 text-[10px] font-mono text-amber-400 flex items-center justify-end gap-1">
                      <Crosshair className="w-3 h-3" /> Focus Location
                    </div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};
