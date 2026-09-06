import React, { useState } from 'react';
import { InfrastructureAsset } from '../types';
import { useEmergency } from '../context/EmergencyContext';
import { RiskBadge } from '../components/common/RiskBadge';
import { CommandMap } from '../components/gis/CommandMap';
import { Building2, AlertTriangle, CheckCircle2, MapPin, Wrench, Search, ShieldAlert } from 'lucide-react';

export const InfrastructurePage: React.FC = () => {
  const { infrastructure, focusOnMap } = useEmergency();

  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [typeFilter, setTypeFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAssets = infrastructure.filter((item) => {
    if (statusFilter !== 'ALL' && item.status !== statusFilter) return false;
    if (typeFilter !== 'ALL' && item.type !== typeFilter) return false;
    if (searchQuery.trim()) {
      const match =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.locationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.inspectionNotes.toLowerCase().includes(searchQuery.toLowerCase());
      if (!match) return false;
    }
    return true;
  });

  const criticalInfraCount = infrastructure.filter((i) => i.status === 'CRITICAL' || i.status === 'OFFLINE').length;
  const partialDamageCount = infrastructure.filter((i) => i.status === 'PARTIALLY_DAMAGED').length;
  const operationalCount = infrastructure.filter((i) => i.status === 'OPERATIONAL').length;

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1800px] mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-command-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Building2 className="w-5 h-5 text-blue-400" />
            <h1 className="text-xl font-bold font-mono text-white uppercase tracking-wide">
              Critical Lifelines & Infrastructure Monitoring
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-500/40 uppercase font-bold">
              LIFELINE STATUS
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Real-time structural integrity, road networks, bridges, power substations, and water plants
          </p>
        </div>

        {/* Telemetry Pills */}
        <div className="flex flex-wrap gap-2 text-xs font-mono">
          <span className="px-2.5 py-1 rounded bg-red-950/50 border border-red-500/30 text-red-300">
            Critical / Offline: <strong className="text-white">{criticalInfraCount}</strong>
          </span>
          <span className="px-2.5 py-1 rounded bg-amber-950/50 border border-amber-500/30 text-amber-300">
            Partially Damaged: <strong className="text-white">{partialDamageCount}</strong>
          </span>
          <span className="px-2.5 py-1 rounded bg-emerald-950/50 border border-emerald-500/30 text-emerald-300">
            Operational: <strong className="text-white">{operationalCount}</strong>
          </span>
        </div>
      </div>

      {/* Map View Integration */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono font-bold uppercase text-white flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-blue-400" />
            Geospatial Infrastructure Damage & Lifeline Impasse
          </span>
          <span className="text-[11px] font-mono text-slate-400">Click any asset below to fly to map</span>
        </div>
        <CommandMap height="400px" />
      </div>

      {/* Filter & Search Bar */}
      <div className="p-3 bg-command-card border border-command-border rounded-lg flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-3 flex-1 min-w-[280px]">
          <div className="relative flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search bridge, substation, road..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-command-surface border border-command-border rounded text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-command-surface border border-command-border rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="OPERATIONAL">Operational</option>
              <option value="PARTIALLY_DAMAGED">Partially Damaged</option>
              <option value="CRITICAL">Critical</option>
              <option value="OFFLINE">Offline</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Type:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-command-surface border border-command-border rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="ALL">All Asset Types</option>
              <option value="BRIDGE">Bridge</option>
              <option value="ROAD">Road</option>
              <option value="POWER_STATION">Power Substation</option>
              <option value="WATER_TREATMENT">Water Plant</option>
              <option value="COMMS_TOWER">Telecom Tower</option>
              <option value="DAM">Barrage / Dam</option>
            </select>
          </div>
        </div>

        {(statusFilter !== 'ALL' || typeFilter !== 'ALL' || searchQuery) && (
          <button
            onClick={() => {
              setStatusFilter('ALL');
              setTypeFilter('ALL');
              setSearchQuery('');
            }}
            className="text-slate-400 hover:text-white underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Infrastructure Table */}
      <div className="bg-command-card border border-command-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono text-xs">
            <thead className="bg-command-surface text-slate-400 uppercase text-[10px] border-b border-command-border">
              <tr>
                <th className="py-3 px-4">Asset ID & Name</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Damage Level</th>
                <th className="py-3 px-4">Last Updated</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-command-border/60 text-slate-300">
              {filteredAssets.map((asset) => (
                <tr key={asset.id} className="hover:bg-command-cardHover transition-colors">
                  <td className="py-3 px-4">
                    <strong className="text-white block">{asset.name}</strong>
                    <span className="text-[10px] text-slate-500">{asset.id}</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-command-surface border border-command-border text-[10px] text-blue-300">
                      {asset.type}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-300">{asset.locationName}</td>
                  <td className="py-3 px-4">
                    <RiskBadge level={asset.status} size="sm" />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span
                        className={`font-bold ${
                          asset.damagePercentage >= 70
                            ? 'text-red-400'
                            : asset.damagePercentage >= 30
                            ? 'text-amber-400'
                            : 'text-emerald-400'
                        }`}
                      >
                        {asset.damagePercentage}%
                      </span>
                      <div className="w-16 bg-slate-800 rounded-full h-1.5 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            asset.damagePercentage >= 70
                              ? 'bg-red-500'
                              : asset.damagePercentage >= 30
                              ? 'bg-amber-400'
                              : 'bg-emerald-500'
                          }`}
                          style={{ width: `${asset.damagePercentage}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-slate-400">{asset.lastUpdated}</td>
                  <td className="py-3 px-4">
                    <button
                      onClick={() => focusOnMap(asset.coordinates, 16, asset.name, 'INFRA', asset.id)}
                      className="px-2.5 py-1 rounded bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/40 text-[10px] uppercase font-bold transition-colors"
                    >
                      Locate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
