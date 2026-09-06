import React, { useState } from 'react';
import {
  Flame,
  Users,
  AlertTriangle,
  Radio,
  Building2,
  Compass,
  ArrowUpRight,
  ShieldAlert,
  Layers,
  Sparkles,
} from 'lucide-react';
import { useEmergency } from '../context/EmergencyContext';
import { MetricCard } from '../components/common/MetricCard';
import { CommandMap } from '../components/gis/CommandMap';
import { TopPriorityLocations } from '../components/common/TopPriorityLocations';
import { ActivityFeed } from '../components/common/ActivityFeed';
import { RiskBadge } from '../components/common/RiskBadge';
import { Link } from 'react-router-dom';

export const OverviewPage: React.FC = () => {
  const { disaster, riskZones, alerts, teams, shelters } = useEmergency();

  const activeAlertsCount = alerts.filter((a) => a.status !== 'RESOLVED').length;
  const criticalZones = riskZones.filter((z) => z.status === 'CRITICAL');

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1800px] mx-auto animate-fade-in">
      {/* Header Banner */}
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-command-border/80 pb-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h1 className="text-xl md:text-2xl font-black text-white tracking-wide font-mono uppercase">
              Disaster Command Center
            </h1>
            <RiskBadge level={disaster.severityLevel} size="md" />
          </div>
          <p className="text-xs md:text-sm text-slate-400 mt-1">
            Real-time emergency monitoring and response coordination • {disaster.name}
          </p>
        </div>

        {/* Quick actions / operational status */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-command-card border border-command-border text-xs font-mono text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>SEOC BELAGAVI ACTIVE</span>
          </div>
          <Link
            to="/field-mode"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-semibold transition-colors"
          >
            <span>Switch to Field Responder Mode</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 6 Key KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        <MetricCard
          title="Overall Risk"
          value={`${disaster.overallRiskScore}/100`}
          subtitle="Composite vulnerability"
          badgeText="HIGH"
          badgeVariant="critical"
          trendText="+4% (1h)"
          trendDirection="up"
          icon={Flame}
        />
        <MetricCard
          title="Affected Population"
          value={disaster.affectedPopulation.toLocaleString()}
          subtitle="Estimated in danger zone"
          badgeText="DISPLACED"
          badgeVariant="high"
          trendText="+120 (30m)"
          trendDirection="up"
          icon={Users}
        />
        <MetricCard
          title="Critical Zones"
          value={`0${disaster.criticalZonesCount}`}
          subtitle="Immediate rescue focus"
          badgeText="ACTIVE"
          badgeVariant="critical"
          trendText="2 High Risk"
          trendDirection="neutral"
          icon={ShieldAlert}
        />
        <MetricCard
          title="Active Alerts"
          value={activeAlertsCount}
          subtitle="Unresolved incidents"
          badgeText="CAT-3"
          badgeVariant="warning"
          trendText="3 Road Blocks"
          trendDirection="up"
          icon={AlertTriangle}
        />
        <MetricCard
          title="Response Teams"
          value="32 Active"
          subtitle="NDRF, SDRF & Fire"
          badgeText="DEPLOYED"
          badgeVariant="operational"
          trendText="6 En Route"
          trendDirection="down"
          icon={Radio}
        />
        <MetricCard
          title="Shelters"
          value="18 Avail"
          subtitle="Relief center capacity"
          badgeText="68% OCC"
          badgeVariant="info"
          trendText="1,440 at Stadium"
          trendDirection="neutral"
          icon={Building2}
        />
      </div>

      {/* Center Section: Main GIS Command Map & Priority Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Large GIS Map Canvas (8 cols on desktop) */}
        <div className="lg:col-span-8 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-400" />
              <h2 className="text-xs font-bold font-mono text-white uppercase tracking-wider">
                MAIN COMMAND GIS MAP • BELAGAVI SECTOR
              </h2>
            </div>
            <span className="text-[11px] font-mono text-slate-400">
              Interactive Layer Toggles • Click any Zone or Marker
            </span>
          </div>

          <CommandMap height="580px" />
        </div>

        {/* Top Priority Locations Ranked Panel (4 cols on desktop) */}
        <div className="lg:col-span-4 h-full">
          <TopPriorityLocations />
        </div>
      </div>

      {/* Bottom Section: Real-Time Activity Feed & Quick Operations Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Activity Feed (7 cols) */}
        <div className="lg:col-span-7">
          <ActivityFeed />
        </div>

        {/* Operational Loop Overview & AI Status (5 cols) */}
        <div className="lg:col-span-5 bg-command-card border border-command-border rounded-lg p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-command-border/60 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-purple-400" />
                <h3 className="text-xs font-bold font-mono text-white uppercase tracking-wider">
                  AI DECISION SUPPORT ENGINE
                </h3>
              </div>
              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                ● ACTIVE CONTINUOUS LOOP
              </span>
            </div>

            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              Multi-spectral Synthetic Aperture Radar (SAR) combined with 128 ground ultrasonic sensors has calculated severe inundation along the Bellary Nala corridor. AI recommends concentrating motorized inflatable craft in <strong>Zone A</strong> and <strong>Zone C</strong>.
            </p>

            <div className="space-y-2.5 font-mono text-xs">
              <div className="flex items-center justify-between p-2.5 rounded bg-command-surface border border-command-border">
                <span className="text-slate-400 text-[11px]">Water Inundation Confidence</span>
                <strong className="text-emerald-400">98.2% (10m Resolution)</strong>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded bg-command-surface border border-command-border">
                <span className="text-slate-400 text-[11px]">Primary Evacuation Corridor</span>
                <strong className="text-cyan-400">Zone A → Club Rd → Shelter 04</strong>
              </div>
              <div className="flex items-center justify-between p-2.5 rounded bg-command-surface border border-command-border">
                <span className="text-slate-400 text-[11px]">Critical Choke Point</span>
                <strong className="text-red-400">NH-48 km 412 (1.3m Submerged)</strong>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-command-border/60 mt-4 flex items-center justify-between">
            <Link
              to="/intelligence"
              className="text-xs font-mono text-blue-400 hover:text-blue-300 flex items-center gap-1 font-semibold"
            >
              <span>Explore AI Intelligence Pipeline →</span>
            </Link>
            <Link
              to="/evacuation"
              className="text-xs font-mono text-emerald-400 hover:text-emerald-300 flex items-center gap-1 font-semibold"
            >
              <span>View Route Planner →</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
