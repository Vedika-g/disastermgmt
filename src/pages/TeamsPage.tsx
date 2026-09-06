import React, { useState } from 'react';
import { RescueTeam, TeamStatus } from '../types';
import { useEmergency } from '../context/EmergencyContext';
import { RiskBadge } from '../components/common/RiskBadge';
import { Modal } from '../components/common/Modal';
import { Users, MapPin, Radio, ShieldAlert, CheckCircle2, BatteryCharging, Wrench, Search } from 'lucide-react';

export const TeamsPage: React.FC = () => {
  const { teams, assignTeam, focusOnMap } = useEmergency();

  const [selectedTeam, setSelectedTeam] = useState<RescueTeam | null>(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [taskInput, setTaskInput] = useState('');
  const [priorityInput, setPriorityInput] = useState<'CRITICAL' | 'HIGH' | 'MEDIUM'>('HIGH');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpenAssign = (team: RescueTeam) => {
    setSelectedTeam(team);
    setTaskInput(team.currentAssignment);
    setPriorityInput(team.priority);
    setIsAssignModalOpen(true);
  };

  const handleSaveAssign = () => {
    if (selectedTeam && taskInput.trim()) {
      assignTeam(selectedTeam.id, taskInput.trim(), priorityInput);
      setIsAssignModalOpen(false);
    }
  };

  const filteredTeams = teams.filter((t) => {
    if (statusFilter !== 'ALL' && t.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const match =
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.locationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.currentAssignment.toLowerCase().includes(searchQuery.toLowerCase());
      if (!match) return false;
    }
    return true;
  });

  const activeCount = teams.filter((t) => t.status === 'ACTIVE').length;
  const enRouteCount = teams.filter((t) => t.status === 'EN_ROUTE').length;
  const standbyCount = teams.filter((t) => t.status === 'STANDBY' || t.status === 'AVAILABLE').length;

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1800px] mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-command-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-blue-400" />
            <h1 className="text-xl font-bold font-mono text-white uppercase tracking-wide">
              Rescue Teams & Field Force Dispatch
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-950 text-blue-300 border border-blue-500/40 uppercase font-bold">
              32 TOTAL FORCES
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Real-time tracking of NDRF, SDRF, Fire & Emergency services, and Civil Defense battalions
          </p>
        </div>

        {/* Quick Tally */}
        <div className="flex flex-wrap gap-2 text-xs font-mono">
          <span className="px-3 py-1 rounded bg-blue-950/50 border border-blue-500/30 text-blue-300">
            Active in Field: <strong className="text-white">{activeCount}</strong>
          </span>
          <span className="px-3 py-1 rounded bg-amber-950/50 border border-amber-500/30 text-amber-300">
            En Route: <strong className="text-white">{enRouteCount}</strong>
          </span>
          <span className="px-3 py-1 rounded bg-emerald-950/50 border border-emerald-500/30 text-emerald-300">
            Standby / Avail: <strong className="text-white">{standbyCount}</strong>
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-3 bg-command-card border border-command-border rounded-lg flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-3 flex-1 min-w-[280px]">
          <div className="relative flex-1 max-w-xs">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search team ID, agency, sector..."
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
              <option value="ACTIVE">Active</option>
              <option value="EN_ROUTE">En Route</option>
              <option value="AVAILABLE">Available</option>
              <option value="STANDBY">Standby</option>
              <option value="OFFLINE">Offline</option>
            </select>
          </div>
        </div>

        {statusFilter !== 'ALL' && (
          <button onClick={() => setStatusFilter('ALL')} className="text-slate-400 hover:text-white underline">
            Reset Filter
          </button>
        )}
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTeams.map((team) => (
          <div
            key={team.id}
            className="bg-command-card border border-command-border rounded-lg p-4 flex flex-col justify-between hover:border-command-borderLight transition-all"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold font-mono text-white">{team.name}</h3>
                    <RiskBadge level={team.status} size="sm" />
                  </div>
                  <p className="text-xs text-blue-400 font-mono mt-0.5">{team.type}</p>
                </div>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded border border-command-border text-slate-400">
                  {team.members} Personnel
                </span>
              </div>

              {/* Assignment Callout */}
              <div className="p-2.5 rounded bg-command-surface border border-command-border/60 text-xs font-mono my-3 space-y-1">
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span>Current Assignment:</span>
                  <span className="text-red-400 font-bold uppercase">{team.priority}</span>
                </div>
                <p className="text-slate-200 font-medium">{team.currentAssignment}</p>
              </div>

              {/* Location & Vehicle Details */}
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-300 mb-3">
                <div>
                  <span className="text-slate-500 text-[10px] block">Current Sector:</span>
                  <span className="truncate block font-semibold">{team.locationName}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Comms Frequency:</span>
                  <span className="text-slate-400 truncate block">{team.contactFreq}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Tactical Vehicle:</span>
                  <span className="text-slate-300 truncate block">{team.vehicleType}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] block">Radio Telemetry:</span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <BatteryCharging className="w-3 h-3" /> {team.batteryTelemetry || 80}%
                  </span>
                </div>
              </div>

              {/* Equipment Tags */}
              <div className="mb-3">
                <span className="text-[10px] font-mono text-slate-500 uppercase block mb-1">Standard Issue Gear:</span>
                <div className="flex flex-wrap gap-1 font-mono text-[10px]">
                  {team.equipment.map((eq, i) => (
                    <span key={i} className="px-1.5 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">
                      {eq}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions: View on Map, Assign Task */}
            <div className="flex items-center gap-2 pt-3 border-t border-command-border/60 text-xs font-mono">
              <button
                onClick={() => focusOnMap(team.coordinates, 16, team.name, 'TEAM', team.id)}
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded bg-command-surface hover:bg-command-cardHover text-slate-300 hover:text-white border border-command-border text-[11px] transition-colors"
              >
                <MapPin className="w-3 h-3" />
                <span>View on Map</span>
              </button>
              <button
                onClick={() => handleOpenAssign(team)}
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-medium transition-colors"
              >
                <Wrench className="w-3 h-3" />
                <span>Assign Task</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Task Assignment Modal */}
      <Modal
        isOpen={isAssignModalOpen}
        onClose={() => setIsAssignModalOpen(false)}
        title={`Assign Mission — ${selectedTeam?.name}`}
        subtitle={`Current Location: ${selectedTeam?.locationName}`}
      >
        <div className="space-y-4 font-mono text-xs">
          <div>
            <label className="block text-slate-400 uppercase text-[10px] font-bold mb-1">
              Operational Mission Task Directive:
            </label>
            <textarea
              rows={3}
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              className="w-full bg-command-card border border-command-border rounded p-2 text-white focus:outline-none focus:border-blue-500 font-mono text-xs"
              placeholder="Enter task description (e.g., Evacuate 15 stranded citizens near Vadgaon South Chawl)..."
            />
          </div>

          <div>
            <label className="block text-slate-400 uppercase text-[10px] font-bold mb-1">
              Priority Escalation Level:
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['CRITICAL', 'HIGH', 'MEDIUM'] as const).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => setPriorityInput(lvl)}
                  className={`py-1.5 rounded border text-xs font-bold transition-colors ${
                    priorityInput === lvl
                      ? lvl === 'CRITICAL'
                        ? 'bg-red-950 text-red-300 border-red-500'
                        : lvl === 'HIGH'
                        ? 'bg-orange-950 text-orange-300 border-orange-500'
                        : 'bg-slate-800 text-white border-blue-500'
                      : 'bg-command-card text-slate-400 border-command-border hover:text-white'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 rounded bg-blue-950/20 border border-blue-500/30 text-[11px] text-blue-200">
            Assigning will update the unit's tactical status to <strong>ACTIVE</strong> and broadcast across the encrypted VHF radio mesh.
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-command-border">
            <button
              onClick={() => setIsAssignModalOpen(false)}
              className="px-3 py-1.5 rounded border border-command-border text-slate-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveAssign}
              className="px-4 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white font-bold"
            >
              Confirm Dispatch
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
