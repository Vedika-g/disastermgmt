import React, { useState } from 'react';
import { CommandMap } from '../components/gis/CommandMap';
import { RouteCard } from '../components/evacuation/RouteCard';
import { useEmergency } from '../context/EmergencyContext';
import { Compass, Building2, ShieldAlert, CheckCircle2, Navigation, AlertOctagon } from 'lucide-react';
import { RiskBadge } from '../components/common/RiskBadge';

export const EvacuationPage: React.FC = () => {
  const { routes, shelters, selectedRouteId, setSelectedRouteId, focusOnMap } = useEmergency();

  const selectedRoute = routes.find((r) => r.id === selectedRouteId) || routes[0];

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1800px] mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-command-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Compass className="w-5 h-5 text-emerald-400" />
            <h1 className="text-xl font-bold font-mono text-white uppercase tracking-wide">
              Evacuation Route Planning & Corridor Optimization
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 uppercase font-bold">
              DYNAMIC ROUTING
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            GIS network analysis, flood hazard avoidance, safe destination shelters, and live choke point tracking
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs font-mono">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-command-card border border-command-border text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>2 Recommended Safe Corridors</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-red-950/40 border border-red-500/40 text-red-300">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            <span>2 Arterials Blocked</span>
          </div>
        </div>
      </div>

      {/* Main Grid: GIS Map Centerpiece (7 cols) + Route Cards Panel (5 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Map (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono font-bold uppercase text-white flex items-center gap-2">
              <Navigation className="w-3.5 h-3.5 text-blue-400" />
              Live Route Tracing on GIS Map
            </span>
            <span className="text-[11px] font-mono text-cyan-400">
              Selected: <strong>{selectedRoute?.name}</strong>
            </span>
          </div>
          <CommandMap height="600px" />
        </div>

        {/* Route Cards & Selector (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
              Evaluated Evacuation Corridors
            </h3>
            <span className="text-[11px] font-mono text-slate-400">Select to highlight path</span>
          </div>

          <div className="space-y-3 max-h-[580px] overflow-y-auto pr-1">
            {routes.map((route) => (
              <RouteCard
                key={route.id}
                route={route}
                isSelected={selectedRouteId === route.id}
                onSelect={(id) => setSelectedRouteId(id)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section: Destination Relocation Shelters Live Capacity */}
      <div className="bg-command-card border border-command-border rounded-lg p-5">
        <div className="flex items-center justify-between border-b border-command-border/60 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Primary Assembly Points & Designated Safe Relocation Shelters
            </h3>
          </div>
          <span className="text-[11px] font-mono text-slate-400">Live Intake & Inventory Telemetry</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {shelters.slice(0, 3).map((shelter) => {
            const occRate = Math.round((shelter.currentOccupancy / shelter.capacity) * 100);
            return (
              <div
                key={shelter.id}
                className="bg-command-surface border border-command-border rounded-lg p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <h4 className="text-xs font-bold text-white font-mono">{shelter.name}</h4>
                      <p className="text-[10px] text-slate-400">{shelter.locationName}</p>
                    </div>
                    <RiskBadge level={shelter.status} size="sm" />
                  </div>

                  {/* Occupancy bar */}
                  <div className="my-3">
                    <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                      <span className="text-slate-400">Occupancy:</span>
                      <strong className={occRate >= 80 ? 'text-red-400' : 'text-emerald-400'}>
                        {shelter.currentOccupancy} / {shelter.capacity} ({occRate}%)
                      </strong>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          occRate >= 80 ? 'bg-red-500' : occRate >= 60 ? 'bg-amber-400' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${occRate}%` }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-slate-300 py-2 border-t border-command-border/50">
                    <div>Water Supply: <strong className="text-white">{shelter.waterSupplyLiters.toLocaleString()} L</strong></div>
                    <div>Food Kits: <strong className="text-white">{shelter.foodKitsRemaining} kits</strong></div>
                    <div>Medical Staff: <strong className="text-emerald-400">{shelter.medicalStaffPresent ? 'Present' : 'En Route'}</strong></div>
                    <div>Contact: <span className="text-slate-400 truncate block">{shelter.contactPhone}</span></div>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-command-border/50 flex items-center justify-between text-xs font-mono">
                  <button
                    onClick={() => focusOnMap(shelter.coordinates, 16, shelter.name, 'SHELTER', shelter.id)}
                    className="text-blue-400 hover:text-blue-300 text-[11px] font-medium"
                  >
                    View Shelter on Map →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
