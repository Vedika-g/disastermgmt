import React, { useState } from 'react';
import { FieldReport } from '../types';
import { useEmergency } from '../context/EmergencyContext';
import { RiskBadge } from '../components/common/RiskBadge';
import { Modal } from '../components/common/Modal';
import { ClipboardList, MapPin, CheckCircle, Users, Clock, AlertTriangle, Search, Filter, Image as ImageIcon } from 'lucide-react';

export const FieldReportsPage: React.FC = () => {
  const { fieldReports, focusOnMap, teams, assignTeam } = useEmergency();

  const [selectedReport, setSelectedReport] = useState<FieldReport | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [severityFilter, setSeverityFilter] = useState<string>('ALL');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredReports = fieldReports.filter((r) => {
    if (severityFilter !== 'ALL' && r.severity !== severityFilter) return false;
    if (statusFilter !== 'ALL' && r.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const match =
        r.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.locationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.submittedBy.toLowerCase().includes(searchQuery.toLowerCase());
      if (!match) return false;
    }
    return true;
  });

  const handleOpenDetail = (report: FieldReport) => {
    setSelectedReport(report);
    setIsDetailOpen(true);
  };

  const handleQuickDispatch = (report: FieldReport) => {
    assignTeam('R-17', `Immediate response to ${report.id} at ${report.locationName}`, report.severity === 'CRITICAL' ? 'CRITICAL' : 'HIGH');
    alert(`Dispatched Team R-17 to field incident ${report.id}.`);
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1800px] mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-command-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <ClipboardList className="w-5 h-5 text-amber-400" />
            <h1 className="text-xl font-bold font-mono text-white uppercase tracking-wide">
              Field Reconnaissance & SOS Ground Reports
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-500/40 uppercase font-bold">
              GROUND TRIAGE
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Live incident stream submitted by field operatives, civil defense squads, and citizen SOS hotlines
          </p>
        </div>

        <span className="text-xs font-mono text-slate-400">
          Total Ingested: <strong className="text-white">{fieldReports.length} Reports</strong>
        </span>
      </div>

      {/* Filter Bar */}
      <div className="p-3 bg-command-card border border-command-border rounded-lg flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-3 flex-1 min-w-[280px]">
          <div className="relative flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search FR ID, location, submitter..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 bg-command-surface border border-command-border rounded text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Severity:</span>
            <select
              value={severityFilter}
              onChange={(e) => setSeverityFilter(e.target.value)}
              className="bg-command-surface border border-command-border rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="ALL">All Severities</option>
              <option value="CRITICAL">Critical</option>
              <option value="HIGH">High</option>
              <option value="WARNING">Warning</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-command-surface border border-command-border rounded px-2.5 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="UNDER_REVIEW">Under Review</option>
              <option value="VERIFIED">Verified</option>
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
            className="text-slate-400 hover:text-white underline"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            className="bg-command-card border border-command-border rounded-lg p-4 flex flex-col justify-between hover:border-command-borderLight transition-all"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <strong className="text-sm font-mono text-white">{report.id}</strong>
                  <RiskBadge level={report.severity} size="sm" />
                </div>
                <span className="text-[10px] font-mono text-slate-400">{report.timestamp}</span>
              </div>

              <h4 className="text-xs font-bold text-white mb-1 leading-snug">{report.locationName}</h4>
              <p className="text-[11px] text-blue-300 font-mono mb-2">By: {report.submittedBy}</p>

              <p className="text-xs text-slate-300 bg-command-surface p-2.5 rounded border border-command-border/60 mb-3 line-clamp-3">
                {report.description}
              </p>

              {/* Photo placeholder preview if available */}
              {report.photoUrl && (
                <div className="mb-3 relative rounded overflow-hidden border border-command-border h-28 bg-black/40">
                  <img
                    src={report.photoUrl}
                    alt="Recon Evidence"
                    className="w-full h-full object-cover opacity-80"
                  />
                  <span className="absolute bottom-1 right-1 text-[9px] font-mono bg-black/80 px-1.5 py-0.5 rounded text-slate-300 flex items-center gap-1">
                    <ImageIcon className="w-2.5 h-2.5" /> Photographic Evidence Attached
                  </span>
                </div>
              )}

              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-300 mb-3 p-2 bg-command-surface/50 rounded border border-command-border/40">
                <div>
                  <span className="text-slate-500 text-[10px] block">Water Depth:</span>
                  <strong className="text-white">{report.waterDepthCm} cm</strong>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Trapped Persons:</span>
                  <strong className={report.trappedPersonsCount > 0 ? 'text-red-400' : 'text-slate-300'}>
                    {report.trappedPersonsCount} Citizens
                  </strong>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-500 text-[10px] block">Requirement:</span>
                  <span className="text-amber-300 truncate block">{report.requiredAssistance}</span>
                </div>
              </div>
            </div>

            {/* Actions: View Details, View on Map, Assign Team */}
            <div className="flex items-center gap-2 pt-2 border-t border-command-border/60 text-xs font-mono">
              <button
                onClick={() => focusOnMap(report.coordinates, 16, report.id, 'REPORT', report.id)}
                className="flex-1 py-1.5 rounded bg-command-surface hover:bg-command-cardHover text-slate-300 hover:text-white border border-command-border text-[11px] flex items-center justify-center gap-1 transition-colors"
              >
                <MapPin className="w-3 h-3" /> Map
              </button>
              <button
                onClick={() => handleOpenDetail(report)}
                className="flex-1 py-1.5 rounded bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white border border-blue-500/40 text-[11px] flex items-center justify-center gap-1 transition-colors"
              >
                Details
              </button>
              <button
                onClick={() => handleQuickDispatch(report)}
                className="flex-1 py-1.5 rounded bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/40 text-[11px] flex items-center justify-center gap-1 transition-colors"
              >
                <Users className="w-3 h-3" /> Assign
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Modal */}
      <Modal
        isOpen={isDetailOpen}
        onClose={() => setIsDetailOpen(false)}
        title={`Field Report ${selectedReport?.id}`}
        subtitle={`Submitted at ${selectedReport?.timestamp} by ${selectedReport?.submittedBy}`}
      >
        <div className="space-y-4 font-mono text-xs text-slate-200">
          <div className="p-3 rounded bg-command-card border border-command-border space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Severity Assessment:</span>
              <RiskBadge level={selectedReport?.severity || 'HIGH'} size="sm" />
            </div>
            <div>Location: <strong className="text-white">{selectedReport?.locationName}</strong></div>
            <div>Water Inundation Depth: <strong className="text-red-400">{selectedReport?.waterDepthCm} cm</strong></div>
            <div>Trapped Persons / Casualties: <strong className="text-white">{selectedReport?.trappedPersonsCount} trapped, {selectedReport?.casualtiesCount} casualties</strong></div>
          </div>

          <div>
            <h4 className="text-slate-400 uppercase text-[10px] font-bold mb-1">Field Narrative:</h4>
            <p className="p-3 bg-command-card rounded border border-command-border text-slate-300 leading-relaxed font-sans text-xs">
              {selectedReport?.description}
            </p>
          </div>

          <div>
            <h4 className="text-slate-400 uppercase text-[10px] font-bold mb-1">Tactical Equipment Requirement:</h4>
            <div className="p-2.5 bg-amber-950/20 border border-amber-500/30 rounded text-amber-200 text-xs">
              {selectedReport?.requiredAssistance}
            </div>
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-command-border">
            <button
              onClick={() => setIsDetailOpen(false)}
              className="px-4 py-1.5 rounded border border-command-border text-slate-300 hover:text-white"
            >
              Close
            </button>
            <button
              onClick={() => {
                if (selectedReport) {
                  focusOnMap(selectedReport.coordinates, 16, selectedReport.id);
                  setIsDetailOpen(false);
                }
              }}
              className="px-4 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold"
            >
              Fly to Location on GIS
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
