import React, { useState } from 'react';
import { useEmergency } from '../context/EmergencyContext';
import { OfflineIndicator } from '../components/common/OfflineIndicator';
import { RiskBadge } from '../components/common/RiskBadge';
import { CommandMap } from '../components/gis/CommandMap';
import {
  Smartphone,
  Navigation,
  Send,
  Camera,
  CheckCircle2,
  AlertTriangle,
  Radio,
  FileCheck,
  RefreshCw,
  Clock,
  MapPin,
} from 'lucide-react';

export const FieldMobileView: React.FC = () => {
  const {
    teams,
    submitFieldReport,
    offlineQueuedReports,
    isOfflineMode,
    syncOfflineReports,
    isSyncing,
    focusOnMap,
  } = useEmergency();

  // Active assignment for Team R-17
  const currentTeam = teams.find((t) => t.id === 'R-17') || teams[0];

  // Form State
  const [reportType, setReportType] = useState('Flood Inundation Breach');
  const [severity, setSeverity] = useState<'CRITICAL' | 'HIGH' | 'WARNING'>('CRITICAL');
  const [locationName, setLocationName] = useState('Zone A — South Ward 4');
  const [description, setDescription] = useState('');
  const [casualties, setCasualties] = useState(0);
  const [waterDepth, setWaterDepth] = useState(90);
  const [resourceReq, setResourceReq] = useState('2 Inflatable Boats + 50 Life Jackets');
  const [hasPhoto, setHasPhoto] = useState(false);
  const [submitFeedback, setSubmitFeedback] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) {
      alert('Please enter a field report description.');
      return;
    }

    const res = submitFieldReport({
      locationName,
      submittedBy: `${currentTeam.name} (Field Officer)`,
      severity,
      description,
      casualtiesCount: Number(casualties),
      waterDepthCm: Number(waterDepth),
      requiredAssistance: resourceReq,
      photoUrl: hasPhoto
        ? 'https://images.unsplash.com/photo-1547683905-f686c993aae5?auto=format&fit=crop&w=600&q=80'
        : undefined,
    });

    if (res.queued) {
      setSubmitFeedback('Report saved to local offline device queue (Waiting for sync).');
    } else {
      setSubmitFeedback('Report transmitted directly to SEOC GIS Operations Board!');
    }

    setDescription('');
    setHasPhoto(false);
    setTimeout(() => setSubmitFeedback(null), 4000);
  };

  return (
    <div className="p-3 md:p-6 max-w-4xl mx-auto space-y-6 animate-fade-in font-sans">
      {/* Mobile Device Container Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-command-border pb-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded bg-blue-600/20 text-blue-400 border border-blue-500/40">
            <Smartphone className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-lg font-bold font-mono text-white tracking-wide uppercase">
              Field Responder Mobile Terminal
            </h1>
            <p className="text-xs text-slate-400 font-mono">
              Operative UI: {currentTeam.name} • VHF Mesh Ch-08
            </p>
          </div>
        </div>

        <div className="text-right font-mono text-xs">
          <span className="text-slate-400 text-[11px] block">Unit Status:</span>
          <span className="text-emerald-400 font-bold uppercase">{currentTeam.status}</span>
        </div>
      </div>

      {/* Offline Status & Sync Simulator Banner */}
      <OfflineIndicator />

      {/* My Assignment Card */}
      <div className="bg-command-card border border-red-500/40 rounded-lg p-4 shadow-xl">
        <div className="flex items-start justify-between gap-2 border-b border-command-border/60 pb-2.5 mb-3">
          <div className="flex items-center gap-2">
            <Radio className="w-4 h-4 text-red-400 animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              MY CURRENT MISSION ASSIGNMENT
            </span>
          </div>
          <RiskBadge level={currentTeam.priority} size="sm" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-mono">
          <div>
            <span className="text-slate-500 text-[10px] block uppercase">Operational Task:</span>
            <strong className="text-white text-sm">{currentTeam.currentAssignment}</strong>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] block uppercase">Designated Sector:</span>
            <span className="text-amber-300 font-semibold">{currentTeam.locationName}</span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] block uppercase">Team Strength:</span>
            <span className="text-slate-200">{currentTeam.members} Rescue Specialists</span>
          </div>
        </div>
      </div>

      {/* Navigation & Tactical Field Map */}
      <div className="bg-command-card border border-command-border rounded-lg p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-cyan-400" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Field Navigation & Route Guidance
            </h3>
          </div>
          <button
            onClick={() => focusOnMap(currentTeam.coordinates, 16, currentTeam.name)}
            className="text-[11px] font-mono text-blue-400 hover:text-white"
          >
            Center on Unit →
          </button>
        </div>
        <CommandMap height="320px" showControls={false} />
      </div>

      {/* Ground Report Submission Form */}
      <div className="bg-command-card border border-command-border rounded-lg p-5">
        <div className="flex items-center justify-between border-b border-command-border/60 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Send className="w-4 h-4 text-blue-400" />
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-white">
              Submit Ground Situation / SOS Recon Report
            </h3>
          </div>
          <span className="text-[10px] font-mono text-slate-400">
            {isOfflineMode ? '● Queued Locally in Offline Cache' : '● Direct Satellite Uplink'}
          </span>
        </div>

        {submitFeedback && (
          <div className="mb-4 p-3 rounded bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs font-mono flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{submitFeedback}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">
                Report Type:
              </label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
                className="w-full bg-command-surface border border-command-border rounded p-2 text-white text-xs focus:outline-none focus:border-blue-500"
              >
                <option value="Flood Inundation Breach">Flood Inundation Breach</option>
                <option value="Road / Bridge Impasse">Road / Bridge Impasse</option>
                <option value="Stranded Civilians">Stranded Civilians</option>
                <option value="Medical Emergency">Medical Emergency</option>
                <option value="Power / Substation Failure">Power / Substation Failure</option>
              </select>
            </div>

            <div>
              <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">
                Severity Rating:
              </label>
              <div className="grid grid-cols-3 gap-2">
                {(['CRITICAL', 'HIGH', 'WARNING'] as const).map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSeverity(lvl)}
                    className={`py-1.5 rounded border text-xs font-bold transition-colors ${
                      severity === lvl
                        ? lvl === 'CRITICAL'
                          ? 'bg-red-950 text-red-300 border-red-500'
                          : lvl === 'HIGH'
                          ? 'bg-orange-950 text-orange-300 border-orange-500'
                          : 'bg-amber-950 text-amber-300 border-amber-500'
                        : 'bg-command-surface text-slate-400 border-command-border hover:text-white'
                    }`}
                  >
                    {lvl}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">
                Field Location:
              </label>
              <input
                type="text"
                value={locationName}
                onChange={(e) => setLocationName(e.target.value)}
                className="w-full bg-command-surface border border-command-border rounded p-2 text-white text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">
                Water Depth (cm):
              </label>
              <input
                type="number"
                value={waterDepth}
                onChange={(e) => setWaterDepth(Number(e.target.value))}
                className="w-full bg-command-surface border border-command-border rounded p-2 text-white text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">
                Trapped / Casualties:
              </label>
              <input
                type="number"
                value={casualties}
                onChange={(e) => setCasualties(Number(e.target.value))}
                className="w-full bg-command-surface border border-command-border rounded p-2 text-white text-xs focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">
              Field Description & Situation Assessment:
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detail flood surge speed, structural integrity, access obstacles..."
              className="w-full bg-command-surface border border-command-border rounded p-2 text-white text-xs focus:outline-none focus:border-blue-500 font-mono"
            />
          </div>

          <div>
            <label className="block text-slate-400 text-[10px] uppercase font-bold mb-1">
              Urgent Logistics Request:
            </label>
            <input
              type="text"
              value={resourceReq}
              onChange={(e) => setResourceReq(e.target.value)}
              className="w-full bg-command-surface border border-command-border rounded p-2 text-white text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Photo attachment simulator */}
          <div className="flex items-center justify-between p-3 rounded bg-command-surface border border-command-border">
            <div className="flex items-center gap-2 text-xs">
              <Camera className="w-4 h-4 text-blue-400" />
              <span className="text-slate-300">
                {hasPhoto ? 'Photo Attached: recon_sector_a_surge.jpg (1.8MB)' : 'Attach Geotagged Recon Photo'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => setHasPhoto(!hasPhoto)}
              className="px-2.5 py-1 rounded bg-command-card border border-command-border text-slate-300 hover:text-white text-xs"
            >
              {hasPhoto ? 'Remove' : 'Simulate Camera Capture'}
            </button>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold tracking-wider text-xs uppercase transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-950"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isOfflineMode ? 'Queue Report in Offline Storage' : 'Transmit Field Report to EOC'}</span>
          </button>
        </form>
      </div>

      {/* Offline Queued Reports Drawer Section */}
      {offlineQueuedReports.length > 0 && (
        <div className="bg-command-card border border-amber-500/40 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3 border-b border-command-border/60 pb-2">
            <div className="flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-amber-400" />
              <h3 className="text-xs font-mono font-bold uppercase text-white">
                Queued Offline Reports ({offlineQueuedReports.length})
              </h3>
            </div>
            <button
              onClick={() => syncOfflineReports()}
              disabled={isSyncing}
              className="flex items-center gap-1 text-xs px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white font-mono"
            >
              <RefreshCw className={`w-3 h-3 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Sync All'}</span>
            </button>
          </div>

          <div className="space-y-2">
            {offlineQueuedReports.map((r) => (
              <div
                key={r.id}
                className="p-2.5 rounded bg-command-surface border border-command-border text-xs font-mono flex items-center justify-between"
              >
                <div>
                  <strong className="text-white block">{r.locationName}</strong>
                  <span className="text-[11px] text-slate-400">{r.description}</span>
                </div>
                <RiskBadge level={r.severity} size="sm" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
