import React, { useState } from 'react';
import { Alert, SeverityLevel } from '../types';
import { useEmergency } from '../context/EmergencyContext';
import { AlertCard } from '../components/alerts/AlertCard';
import { AlertDetailDrawer } from '../components/alerts/AlertDetailDrawer';
import { AlertTriangle, Filter, Search, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const AlertsPage: React.FC = () => {
  const { alerts, riskZones } = useEmergency();

  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Filters
  const [severityFilter, setSeverityFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredAlerts = alerts.filter((a) => {
    if (severityFilter !== 'ALL' && a.severity !== severityFilter) return false;
    if (statusFilter !== 'ALL' && a.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const match =
        a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.source.toLowerCase().includes(searchQuery.toLowerCase());
      if (!match) return false;
    }
    return true;
  });

  const handleInvestigate = (alert: Alert) => {
    setSelectedAlert(alert);
    setIsDrawerOpen(true);
  };

  const criticalCount = alerts.filter((a) => a.severity === 'CRITICAL' && a.status !== 'RESOLVED').length;
  const highCount = alerts.filter((a) => a.severity === 'HIGH' && a.status !== 'RESOLVED').length;
  const warningCount = alerts.filter((a) => a.severity === 'WARNING' && a.status !== 'RESOLVED').length;
  const resolvedCount = alerts.filter((a) => a.status === 'RESOLVED').length;

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1800px] mx-auto animate-fade-in">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-command-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <h1 className="text-xl font-bold font-mono text-white uppercase tracking-wide">
              Alerts & Incident Triage Command
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-950 text-red-300 border border-red-500/40 uppercase font-bold">
              {criticalCount} Critical
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Real-time incident ingestion, priority dispatch, roadblock telemetry, and multi-agency response
          </p>
        </div>

        {/* Severity Summary Pills */}
        <div className="flex flex-wrap gap-2 text-xs font-mono">
          <button
            onClick={() => setSeverityFilter('CRITICAL')}
            className="px-2.5 py-1 rounded bg-red-950/50 border border-red-500/40 text-red-300 hover:bg-red-900/60 transition-colors"
          >
            Critical: <strong className="text-white">{criticalCount}</strong>
          </button>
          <button
            onClick={() => setSeverityFilter('HIGH')}
            className="px-2.5 py-1 rounded bg-orange-950/50 border border-orange-500/40 text-orange-300 hover:bg-orange-900/60 transition-colors"
          >
            High: <strong className="text-white">{highCount}</strong>
          </button>
          <button
            onClick={() => setSeverityFilter('WARNING')}
            className="px-2.5 py-1 rounded bg-amber-950/50 border border-amber-500/40 text-amber-300 hover:bg-amber-900/60 transition-colors"
          >
            Warning: <strong className="text-white">{warningCount}</strong>
          </button>
          <button
            onClick={() => setStatusFilter('RESOLVED')}
            className="px-2.5 py-1 rounded bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 hover:bg-emerald-900/60 transition-colors"
          >
            Resolved: <strong className="text-white">{resolvedCount}</strong>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-3.5 bg-command-card border border-command-border rounded-lg flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex flex-wrap items-center gap-3 flex-1 min-w-[280px]">
          {/* Search */}
          <div className="relative flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search title, road, source..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-command-surface border border-command-border rounded text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Severity filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 text-[11px]">Severity:</span>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="bg-command-surface border border-command-border rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="ALL">All Severities</option>
              <option value="CRITICAL">Critical</option>
              <option value="HIGH">High</option>
              <option value="WARNING">Warning</option>
              <option value="INFO">Information</option>
              <option value="RESOLVED">Resolved</option>
            </select>
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400 text-[11px]">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-command-surface border border-command-border rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="NEW">New (Unassigned)</option>
              <option value="INVESTIGATING">Investigating</option>
              <option value="DISPATCHED">Dispatched</option>
              <option value="RESOLVED">Resolved</option>
            </select>
          </div>
        </div>

        {(severityFilter !== 'ALL' || statusFilter !== 'ALL' || searchQuery) && (
          <button
            onClick={() => {
              setSeverityFilter('ALL');
              setStatusFilter('ALL');
              setSearchQuery('');
            }}
            className="text-slate-400 hover:text-white text-[11px] underline"
          >
            Clear Filters
          </button>
        )}
      </div>

      {/* Alerts Grid */}
      {filteredAlerts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAlerts.map((alert) => (
            <AlertCard key={alert.id} alert={alert} onInvestigate={handleInvestigate} />
          ))}
        </div>
      ) : (
        <div className="p-12 text-center bg-command-card border border-command-border rounded-lg text-slate-400 font-mono text-xs">
          No alerts match the current filter selection.
        </div>
      )}

      {/* Incident Detail Drawer */}
      <AlertDetailDrawer
        alert={selectedAlert}
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
};
