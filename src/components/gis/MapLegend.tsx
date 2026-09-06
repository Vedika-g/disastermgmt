import React, { useState } from 'react';
import { Layers, ChevronDown, ChevronUp } from 'lucide-react';

export const MapLegend: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="absolute bottom-4 left-4 z-[1000] bg-command-surface/95 border border-command-border rounded-lg shadow-xl backdrop-blur-md text-xs text-slate-300 w-56 overflow-hidden">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-3 py-2 bg-command-card/70 border-b border-command-border/60 hover:bg-command-card text-left font-mono font-bold tracking-wider text-[11px] text-white"
      >
        <div className="flex items-center gap-1.5">
          <Layers className="w-3.5 h-3.5 text-blue-400" />
          <span>GIS MAP LEGEND</span>
        </div>
        {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
      </button>

      {isExpanded && (
        <div className="p-3 space-y-2.5 font-mono text-[11px]">
          {/* Risk Zones */}
          <div>
            <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1.5">
              Risk Zones (Inundation)
            </div>
            <div className="grid grid-cols-2 gap-1.5 text-[10px]">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-red-600/70 border border-red-500" />
                <span>Critical (&gt;85)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-orange-600/70 border border-orange-500" />
                <span>High (70-85)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-amber-500/70 border border-amber-400" />
                <span>Moderate</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-600/70 border border-emerald-500" />
                <span>Low / Safe</span>
              </div>
            </div>
          </div>

          {/* Tactical Assets */}
          <div className="border-t border-command-border/60 pt-2">
            <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1.5">
              Tactical Assets & Markers
            </div>
            <div className="space-y-1 text-[10px]">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500 ring-2 ring-blue-950" />
                <span>Rescue Teams (NDRF/SDRF)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-emerald-950" />
                <span>Shelters / Relocation Hubs</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400 ring-2 ring-red-950" />
                <span>Hospitals & Triage Centers</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400 ring-2 ring-amber-950" />
                <span>IoT Sensors (River Gauges)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded bg-red-600 ring-1 ring-white/50" />
                <span>Road Blockages & Debris</span>
              </div>
            </div>
          </div>

          {/* Evacuation Routes */}
          <div className="border-t border-command-border/60 pt-2">
            <div className="text-slate-400 text-[10px] uppercase font-bold tracking-wider mb-1.5">
              Evacuation Corridors
            </div>
            <div className="space-y-1 text-[10px]">
              <div className="flex items-center gap-2">
                <span className="w-4 h-1 rounded bg-emerald-400" />
                <span>Recommended Route (Safe)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-1 rounded bg-amber-400" />
                <span>Alternate Route (Caution)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-1 rounded bg-red-500 border-dashed" />
                <span>Blocked / Flooded Road</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
