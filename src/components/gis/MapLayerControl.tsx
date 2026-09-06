import React, { useState } from 'react';
import { SlidersHorizontal, ChevronDown, ChevronUp, Eye, EyeOff } from 'lucide-react';
import { useEmergency, MapLayerState } from '../../context/EmergencyContext';

interface MapLayerControlProps {
  baseLayer: 'dark' | 'osm' | 'satellite';
  setBaseLayer: (l: 'dark' | 'osm' | 'satellite') => void;
}

export const MapLayerControl: React.FC<MapLayerControlProps> = ({
  baseLayer,
  setBaseLayer,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    layers,
    toggleLayer,
    riskZones,
    teams,
    shelters,
    hospitals,
    sensors,
    alerts,
    routes,
    fieldReports,
  } = useEmergency();

  const layerItems: { key: keyof MapLayerState; label: string; count: number; color: string }[] = [
    { key: 'floodZones', label: 'Flood & Risk Zones', count: riskZones.length, color: 'text-red-400' },
    { key: 'teams', label: 'Rescue Teams (NDRF/SDRF)', count: teams.length, color: 'text-blue-400' },
    { key: 'shelters', label: 'Relief Shelters', count: shelters.length, color: 'text-emerald-400' },
    { key: 'hospitals', label: 'Hospitals & Medical', count: hospitals.length, color: 'text-red-300' },
    { key: 'sensors', label: 'IoT Water/Rain Gauges', count: sensors.length, color: 'text-amber-400' },
    { key: 'blockages', label: 'Road Blockages & Debris', count: alerts.filter(a => a.severity === 'CRITICAL').length, color: 'text-red-500' },
    { key: 'routes', label: 'Evacuation Corridors', count: routes.length, color: 'text-cyan-400' },
    { key: 'fieldReports', label: 'Field SOS Reports', count: fieldReports.length, color: 'text-purple-400' },
  ];

  return (
    <div className="absolute top-4 right-4 z-[1000] bg-command-surface/95 border border-command-border rounded-lg shadow-2xl backdrop-blur-md text-xs w-64 overflow-hidden">
      {/* Toggle header */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3.5 py-2.5 bg-command-card/80 border-b border-command-border/60 hover:bg-command-card text-left font-mono font-bold tracking-wider text-[11px] text-white transition-colors"
      >
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-3.5 h-3.5 text-blue-400" />
          <span>TACTICAL LAYERS</span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400">
          <span className="text-[10px] bg-command-surface px-1.5 py-0.5 rounded border border-command-border">
            {Object.values(layers).filter(Boolean).length} Active
          </span>
          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-3 space-y-3 font-mono">
          {/* Base Layer Switch */}
          <div>
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5">
              Base Cartography
            </div>
            <div className="grid grid-cols-3 gap-1">
              <button
                onClick={() => setBaseLayer('dark')}
                className={`py-1 px-1.5 text-[10px] rounded border transition-colors ${
                  baseLayer === 'dark'
                    ? 'bg-blue-600/30 text-white border-blue-500 font-bold'
                    : 'bg-command-card text-slate-400 border-command-border hover:text-slate-200'
                }`}
              >
                Tactical Dark
              </button>
              <button
                onClick={() => setBaseLayer('osm')}
                className={`py-1 px-1.5 text-[10px] rounded border transition-colors ${
                  baseLayer === 'osm'
                    ? 'bg-blue-600/30 text-white border-blue-500 font-bold'
                    : 'bg-command-card text-slate-400 border-command-border hover:text-slate-200'
                }`}
              >
                Street Map
              </button>
              <button
                onClick={() => setBaseLayer('satellite')}
                className={`py-1 px-1.5 text-[10px] rounded border transition-colors ${
                  baseLayer === 'satellite'
                    ? 'bg-blue-600/30 text-white border-blue-500 font-bold'
                    : 'bg-command-card text-slate-400 border-command-border hover:text-slate-200'
                }`}
              >
                Satellite Sim
              </button>
            </div>
          </div>

          {/* Disaster & Live Data Overlays */}
          <div className="border-t border-command-border/60 pt-2.5">
            <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1.5 flex items-center justify-between">
              <span>Operational Overlays</span>
            </div>

            <div className="space-y-1">
              {layerItems.map((item) => {
                const isActive = layers[item.key];
                return (
                  <button
                    key={item.key}
                    onClick={() => toggleLayer(item.key)}
                    className={`w-full flex items-center justify-between px-2 py-1.5 rounded text-[11px] transition-colors ${
                      isActive
                        ? 'bg-command-card text-white hover:bg-command-cardHover'
                        : 'text-slate-500 hover:text-slate-400'
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      {isActive ? (
                        <Eye className={`w-3.5 h-3.5 ${item.color}`} />
                      ) : (
                        <EyeOff className="w-3.5 h-3.5 text-slate-600" />
                      )}
                      <span className="truncate">{item.label}</span>
                    </div>
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded border font-mono ${
                        isActive
                          ? 'bg-command-surface border-command-border text-slate-300'
                          : 'border-transparent text-slate-600'
                      }`}
                    >
                      {item.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
