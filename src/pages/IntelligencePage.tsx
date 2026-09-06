import React from 'react';
import { PipelineVisualizer } from '../components/intelligence/PipelineVisualizer';
import {
  Satellite,
  Radio,
  Binary,
  Smartphone,
  Cpu,
  Flame,
  CheckCircle2,
  AlertTriangle,
  Layers,
  Eye,
  Info,
  Activity,
  Scan,
} from 'lucide-react';

export const IntelligencePage: React.FC = () => {
  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1800px] mx-auto animate-fade-in">
      {/* Header */}
      <div className="border-b border-command-border pb-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-purple-400" />
              <h1 className="text-xl font-bold font-mono text-white uppercase tracking-wide">
                AI Intelligence & Multi-Source Data Ingestion
              </h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/40 uppercase font-bold">
                MULTI-MODAL FUSION
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-1">
              Automated ingestion pipeline from Earth observation satellites, tactical UAV swarms, IoT river gauges, and field SOS reports
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded bg-command-card border border-command-border text-xs font-mono text-slate-300">
            <Info className="w-4 h-4 text-blue-400 shrink-0" />
            <span>Demonstration Architecture • Simulated Neural Computer Vision Outputs</span>
          </div>
        </div>
      </div>

      {/* 4 Major Ingestion Source Telemetry Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* 1. SATELLITE */}
        <div className="bg-command-card border border-command-border rounded-lg p-4 flex flex-col justify-between hover:border-command-borderLight transition-all">
          <div>
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="p-2 rounded bg-blue-600/20 text-blue-400 border border-blue-500/30">
                <Satellite className="w-5 h-5" />
              </div>
              <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                CONNECTED
              </span>
            </div>

            <h3 className="text-sm font-bold font-mono text-white tracking-wide uppercase">
              SATELLITE
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Earth observation imagery
            </p>

            <div className="mt-3 p-2.5 rounded bg-command-surface border border-command-border/60 font-mono text-xs text-slate-300 space-y-1">
              <div>Sensor: <strong>Sentinel-1 SAR / ISRO RISAT</strong></div>
              <div>Pass Time: <strong>10:45 AM IST (Today)</strong></div>
              <div>Resolution: <strong>10m Synthetic Aperture</strong></div>
              <div>Band: <strong>C-Band VV/VH Polarization</strong></div>
            </div>
          </div>

          <div className="pt-3 border-t border-command-border/60 mt-3 text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span>Tile Ingest: 1.4 GB</span>
            <span className="text-emerald-400">Processed</span>
          </div>
        </div>

        {/* 2. DRONE */}
        <div className="bg-command-card border border-command-border rounded-lg p-4 flex flex-col justify-between hover:border-command-borderLight transition-all">
          <div>
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="p-2 rounded bg-cyan-600/20 text-cyan-400 border border-cyan-500/30">
                <Scan className="w-5 h-5" />
              </div>
              <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                ACTIVE
              </span>
            </div>

            <h3 className="text-sm font-bold font-mono text-white tracking-wide uppercase">
              DRONE
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Drone imagery & live video stream
            </p>

            <div className="mt-3 p-2.5 rounded bg-command-surface border border-command-border/60 font-mono text-xs text-slate-300 space-y-1">
              <div>Active UAVs: <strong>6 Units Airborne</strong></div>
              <div>Payload: <strong>FLIR Thermal + 4K RGB</strong></div>
              <div>Altitude: <strong>120m AGL (Sector A/C)</strong></div>
              <div>Link Quality: <strong>98% Encrypted COFDM</strong></div>
            </div>
          </div>

          <div className="pt-3 border-t border-command-border/60 mt-3 text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span>Video Downlink</span>
            <span className="text-cyan-400">Live 1080p60</span>
          </div>
        </div>

        {/* 3. IoT SENSORS */}
        <div className="bg-command-card border border-command-border rounded-lg p-4 flex flex-col justify-between hover:border-command-borderLight transition-all">
          <div>
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="p-2 rounded bg-amber-600/20 text-amber-400 border border-amber-500/30">
                <Radio className="w-5 h-5" />
              </div>
              <span className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                128 SENSORS ONLINE
              </span>
            </div>

            <h3 className="text-sm font-bold font-mono text-white tracking-wide uppercase">
              IoT SENSORS
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Environmental & infrastructure sensors
            </p>

            <div className="mt-3 p-2.5 rounded bg-command-surface border border-command-border/60 font-mono text-xs text-slate-300 space-y-1">
              <div>Network: <strong>LoRaWAN + 4G Narrowband</strong></div>
              <div>River Stages: <strong>4.85m Max (Bellary Nala)</strong></div>
              <div>Rain Gauges: <strong>162.4 mm Accumulated</strong></div>
              <div>Health: <strong>4 Offline (Power Trip)</strong></div>
            </div>
          </div>

          <div className="pt-3 border-t border-command-border/60 mt-3 text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span>Sample Interval</span>
            <span className="text-amber-400">Every 15 sec</span>
          </div>
        </div>

        {/* 4. FIELD / SOS REPORTS */}
        <div className="bg-command-card border border-command-border rounded-lg p-4 flex flex-col justify-between hover:border-command-borderLight transition-all">
          <div>
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="p-2 rounded bg-red-600/20 text-red-400 border border-red-500/30">
                <Smartphone className="w-5 h-5" />
              </div>
              <span className="flex items-center gap-1.5 text-[11px] font-mono text-red-400 bg-red-950/60 border border-red-500/30 px-2 py-0.5 rounded font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" />
                47 NEW REPORTS
              </span>
            </div>

            <h3 className="text-sm font-bold font-mono text-white tracking-wide uppercase">
              FIELD / SOS REPORTS
            </h3>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              Ground-level emergency reports
            </p>

            <div className="mt-3 p-2.5 rounded bg-command-surface border border-command-border/60 font-mono text-xs text-slate-300 space-y-1">
              <div>Channel: <strong>Field App + SMS + Helpline 112</strong></div>
              <div>Critical Triage: <strong>14 Unresolved Incidents</strong></div>
              <div>Geotagged: <strong>100% Coordinate Verified</strong></div>
              <div>Offline Cache Sync: <strong>Enabled</strong></div>
            </div>
          </div>

          <div className="pt-3 border-t border-command-border/60 mt-3 text-[11px] font-mono text-slate-400 flex items-center justify-between">
            <span>Triage Status</span>
            <span className="text-red-400">High Influx</span>
          </div>
        </div>
      </div>

      {/* Visual Operational Flow Pipeline (Animated Loop) */}
      <PipelineVisualizer />

      {/* Mock AI Analysis Results Cards */}
      <div className="bg-command-card border border-command-border rounded-lg p-5">
        <div className="flex items-center justify-between border-b border-command-border/60 pb-3 mb-4">
          <div>
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              AI INFERENCE DETECTION & MODEL INFERENCE OUTPUTS
            </h3>
            <p className="text-[11px] text-slate-400 font-mono">
              Synthesized predictions from Deep Learning segmentation, anomaly classification, and change detection models
            </p>
          </div>
          <span className="text-[10px] font-mono bg-purple-950 border border-purple-500/40 text-purple-300 px-2 py-0.5 rounded">
            SIMULATED AI INFERENCE
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
          {/* Card 1: Damage detected */}
          <div className="bg-command-surface border border-command-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <strong className="text-white uppercase text-xs">Damage Detected</strong>
              <span className="text-red-400 font-bold">CRITICAL</span>
            </div>
            <p className="text-slate-300 text-[11px] mb-3">
              Longitudinal structural shear detected on Old Vadgaon Bridge pier 2. Automated crack boundary segmentation indicates 4.2cm separation.
            </p>
            <div className="p-2 rounded bg-command-card border border-command-border text-[10px] text-slate-400 space-y-0.5">
              <div>Model: Mask R-CNN Structural Defect Net</div>
              <div>Inference Confidence: <strong className="text-white">96.8%</strong></div>
            </div>
          </div>

          {/* Card 2: Flood extent detected */}
          <div className="bg-command-surface border border-command-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <strong className="text-white uppercase text-xs">Flood Extent Detected</strong>
              <span className="text-cyan-400 font-bold">14.8 SQ KM</span>
            </div>
            <p className="text-slate-300 text-[11px] mb-3">
              Surface water expansion classified across Belagavi basin. Waterlogged polygon vectorized with high cohesion to low-elevation topography.
            </p>
            <div className="p-2 rounded bg-command-card border border-command-border text-[10px] text-slate-400 space-y-0.5">
              <div>Model: U-Net SAR Water Segmentation</div>
              <div>Inference Confidence: <strong className="text-white">98.2%</strong></div>
            </div>
          </div>

          {/* Card 3: Infrastructure detected */}
          <div className="bg-command-surface border border-command-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <strong className="text-white uppercase text-xs">Infrastructure Impasse</strong>
              <span className="text-amber-400 font-bold">2 ROAD BLOCKS</span>
            </div>
            <p className="text-slate-300 text-[11px] mb-3">
              NH-48 Golden Quadrilateral km 412 verified submerged under 1.3m water. Tilakwadi railway subway impassable to non-amphibious transport.
            </p>
            <div className="p-2 rounded bg-command-card border border-command-border text-[10px] text-slate-400 space-y-0.5">
              <div>Model: Road Passability Vision Transformer</div>
              <div>Inference Confidence: <strong className="text-white">94.5%</strong></div>
            </div>
          </div>

          {/* Card 4: Change detected */}
          <div className="bg-command-surface border border-command-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <strong className="text-white uppercase text-xs">Change Detected</strong>
              <span className="text-orange-400 font-bold">+28% INUNDATION (3H)</span>
            </div>
            <p className="text-slate-300 text-[11px] mb-3">
              Bi-temporal change detection comparing 09:00 AM drone pass to 12:00 PM SAR baseline shows 42 additional residential clusters compromised in Zone A.
            </p>
            <div className="p-2 rounded bg-command-card border border-command-border text-[10px] text-slate-400 space-y-0.5">
              <div>Model: Siamese Change Detection Network</div>
              <div>Inference Confidence: <strong className="text-white">93.1%</strong></div>
            </div>
          </div>

          {/* Card 5: Population impact estimate */}
          <div className="bg-command-surface border border-command-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <strong className="text-white uppercase text-xs">Population Impact Estimate</strong>
              <span className="text-red-400 font-bold">24,860 AT RISK</span>
            </div>
            <p className="text-slate-300 text-[11px] mb-3">
              Spatial overlay of inundation polygons onto municipal census census blocks estimates 24,860 residents in high-vulnerability structures.
            </p>
            <div className="p-2 rounded bg-command-card border border-command-border text-[10px] text-slate-400 space-y-0.5">
              <div>Model: Demographic Spatial Exposure Matrix</div>
              <div>Variance Margin: <strong className="text-white">± 3.4%</strong></div>
            </div>
          </div>

          {/* Card 6: AI Feedback Loop Directive */}
          <div className="bg-command-surface border border-command-border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <strong className="text-white uppercase text-xs">Feedback & Optimization</strong>
              <span className="text-emerald-400 font-bold">ACTIVE LOOP</span>
            </div>
            <p className="text-slate-300 text-[11px] mb-3">
              Field responder reports constantly recalibrate model confidence weights, triggering real-time route replanning and shelter capacity load-balancing.
            </p>
            <div className="p-2 rounded bg-command-card border border-command-border text-[10px] text-slate-400 space-y-0.5">
              <div>Optimization Loop: Closed-Loop PID Logistics</div>
              <div>Recalibration Cycle: <strong className="text-white">Every 60 sec</strong></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
