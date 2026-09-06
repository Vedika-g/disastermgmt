import React, { useState } from 'react';
import { ResourceItem } from '../types';
import { useEmergency } from '../context/EmergencyContext';
import { RiskBadge } from '../components/common/RiskBadge';
import { Modal } from '../components/common/Modal';
import { Boxes, Sparkles, Truck, Check, AlertCircle, ArrowRight, RefreshCw, BarChart2 } from 'lucide-react';

export const ResourcesPage: React.FC = () => {
  const {
    resources,
    riskZones,
    executeResourceAllocation,
    executeAllRecommendedAllocations,
  } = useEmergency();

  const [selectedResource, setSelectedResource] = useState<ResourceItem | null>(null);
  const [allocationAmount, setAllocationAmount] = useState<number>(1);
  const [targetZoneId, setTargetZoneId] = useState<string>('zone-a');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allocatedSuccessMsg, setAllocatedSuccessMsg] = useState<string | null>(null);

  const totalInventory = resources.reduce((acc, r) => acc + r.total, 0);
  const deployedInventory = resources.reduce((acc, r) => acc + r.deployed, 0);
  const lowStockCount = resources.filter((r) => r.status === 'LOW' || r.status === 'CRITICAL').length;

  const handleOpenAllocate = (resource: ResourceItem) => {
    setSelectedResource(resource);
    setAllocationAmount(Math.min(resource.available, 2));
    setIsModalOpen(true);
  };

  const handleConfirmAllocation = () => {
    if (selectedResource) {
      executeResourceAllocation(selectedResource.id, targetZoneId, allocationAmount);
      setIsModalOpen(false);
      setAllocatedSuccessMsg(`Successfully allocated ${allocationAmount} ${selectedResource.unit} to Zone.`);
      setTimeout(() => setAllocatedSuccessMsg(null), 3000);
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-6 max-w-[1800px] mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-command-border pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Boxes className="w-5 h-5 text-emerald-400" />
            <h1 className="text-xl font-bold font-mono text-white uppercase tracking-wide">
              Emergency Logistics & Resource Optimization
            </h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-500/40 uppercase font-bold">
              AI ALLOCATION ENGINE
            </span>
          </div>
          <p className="text-xs text-slate-400 font-mono mt-1">
            Real-time supply chain monitoring, equipment readiness, and dynamic disaster demand-matching
          </p>
        </div>

        {allocatedSuccessMsg && (
          <div className="px-3 py-1 rounded bg-emerald-950/80 border border-emerald-500 text-emerald-300 text-xs font-mono flex items-center gap-1.5 animate-fade-in">
            <Check className="w-3.5 h-3.5" />
            <span>{allocatedSuccessMsg}</span>
          </div>
        )}
      </div>

      {/* AI Recommended Allocation Priority Banner */}
      <div className="bg-command-card border border-emerald-500/30 rounded-lg p-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-command-border/60 pb-3 mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <h3 className="text-xs font-bold font-mono text-white uppercase tracking-wider">
              AI RECOMMENDED LOGISTICS ALLOCATION BATCH
            </h3>
          </div>
          <button
            onClick={() => {
              executeAllRecommendedAllocations();
              setAllocatedSuccessMsg('Batch allocation executed across all priority zones.');
              setTimeout(() => setAllocatedSuccessMsg(null), 3500);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold transition-colors"
          >
            <span>Execute All Recommendations</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-3 bg-command-surface rounded border border-command-border text-xs font-mono">
            <div className="flex items-center justify-between mb-1">
              <strong className="text-white">Zone A (Vadgaon)</strong>
              <RiskBadge level="CRITICAL" size="sm" />
            </div>
            <p className="text-[11px] text-slate-400 mb-2">Priority: Extreme Flooding</p>
            <ul className="space-y-1 text-slate-300 text-[11px]">
              <li>→ 2 Motorized Inflatable Boats</li>
              <li>→ 3 ALS High-Clearance Ambulances</li>
              <li>→ 500 Drinking Water Units</li>
              <li>→ 8 Medical Trauma Packs</li>
            </ul>
          </div>

          <div className="p-3 bg-command-surface rounded border border-command-border text-xs font-mono">
            <div className="flex items-center justify-between mb-1">
              <strong className="text-white">Zone C (Auto Nagar)</strong>
              <RiskBadge level="CRITICAL" size="sm" />
            </div>
            <p className="text-[11px] text-slate-400 mb-2">Priority: Bridge Submersion</p>
            <ul className="space-y-1 text-slate-300 text-[11px]">
              <li>→ 1 Rescue Boat</li>
              <li>→ 2 ALS Ambulances</li>
              <li>→ 350 Water Units</li>
              <li>→ 2 High-Volume Sump Pumps</li>
            </ul>
          </div>

          <div className="p-3 bg-command-surface rounded border border-command-border text-xs font-mono">
            <div className="flex items-center justify-between mb-1">
              <strong className="text-white">Zone B (Tilakwadi)</strong>
              <RiskBadge level="HIGH" size="sm" />
            </div>
            <p className="text-[11px] text-slate-400 mb-2">Priority: Subway Impasse</p>
            <ul className="space-y-1 text-slate-300 text-[11px]">
              <li>→ 3 Trash Sump Pumps (1500 LPM)</li>
              <li>→ 1 Rescue Boat</li>
              <li>→ 200 Food Ration Kits</li>
            </ul>
          </div>

          <div className="p-3 bg-command-surface rounded border border-command-border text-xs font-mono">
            <div className="flex items-center justify-between mb-1">
              <strong className="text-white">Zone D (Shahapur)</strong>
              <RiskBadge level="HIGH" size="sm" />
            </div>
            <p className="text-[11px] text-slate-400 mb-2">Priority: Substation Outage</p>
            <ul className="space-y-1 text-slate-300 text-[11px]">
              <li>→ 2 Mobile Diesel Generators (25kVA)</li>
              <li>→ 250 Emergency Food Kits</li>
              <li>→ 1 High-Clearance Ambulance</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Main Resource Inventory Grid */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
            Centrally Managed Inventory Telemetry
          </h3>
          <span className="text-[11px] font-mono text-slate-400">
            {lowStockCount > 0 && <span className="text-amber-400">{lowStockCount} Items Low Stock • </span>}
            Click Allocate to redistribute
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {resources.map((item) => {
            const deployedPct = Math.round((item.deployed / item.total) * 100);
            return (
              <div
                key={item.id}
                className="bg-command-card border border-command-border rounded-lg p-4 flex flex-col justify-between hover:border-command-borderLight transition-all"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-command-surface border border-command-border text-slate-400">
                      {item.category}
                    </span>
                    <RiskBadge level={item.status === 'CRITICAL' ? 'CRITICAL' : item.status === 'LOW' ? 'WARNING' : 'OPERATIONAL'} size="sm" />
                  </div>

                  <h4 className="text-xs font-bold text-white font-mono mb-2">{item.name}</h4>

                  {/* Stock Counts */}
                  <div className="grid grid-cols-3 gap-1.5 p-2 rounded bg-command-surface border border-command-border/60 text-center font-mono text-xs mb-3">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Total</span>
                      <strong className="text-white">{item.total.toLocaleString()}</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Avail</span>
                      <strong className={item.available <= item.lowStockThreshold ? 'text-amber-400' : 'text-emerald-400'}>
                        {item.available.toLocaleString()}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block">Deployed</span>
                      <strong className="text-blue-400">{item.deployed.toLocaleString()}</strong>
                    </div>
                  </div>

                  {/* Utilization Progress */}
                  <div className="space-y-1 mb-2">
                    <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                      <span>Deployment Rate</span>
                      <span>{deployedPct}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          deployedPct >= 85 ? 'bg-red-500' : deployedPct >= 65 ? 'bg-blue-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${deployedPct}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-command-border/60 flex items-center gap-2">
                  <button
                    onClick={() => handleOpenAllocate(item)}
                    disabled={item.available === 0}
                    className="w-full py-1.5 rounded bg-blue-600 hover:bg-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white text-xs font-mono font-medium transition-colors"
                  >
                    {item.available === 0 ? 'Exhausted' : 'Allocate Resource'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Allocation Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={`Deploy Resource — ${selectedResource?.name}`}
        subtitle={`Available: ${selectedResource?.available} ${selectedResource?.unit}`}
      >
        <div className="space-y-4 font-mono text-xs">
          <div>
            <label className="block text-slate-400 uppercase text-[10px] font-bold mb-1">
              Select Destination Operational Zone:
            </label>
            <select
              value={targetZoneId}
              onChange={(e) => setTargetZoneId(e.target.value)}
              className="w-full bg-command-card border border-command-border rounded p-2 text-white text-xs focus:outline-none focus:border-blue-500"
            >
              {riskZones.map((z) => (
                <option key={z.id} value={z.id}>
                  {z.name} (Risk: {z.riskScore} • Needs: {z.criticalNeeds.slice(0, 2).join(', ')})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-slate-400 uppercase text-[10px] font-bold mb-1">
              Quantity to Dispatch ({selectedResource?.unit}):
            </label>
            <input
              type="number"
              min={1}
              max={selectedResource?.available || 1}
              value={allocationAmount}
              onChange={(e) => setAllocationAmount(Number(e.target.value))}
              className="w-full bg-command-card border border-command-border rounded p-2 text-white text-xs focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="p-2.5 rounded bg-command-surface border border-command-border text-[11px] text-slate-300">
            Dispatching will immediately deduct from central stockpile and log a priority courier directive to the selected zone command.
          </div>

          <div className="flex items-center justify-end gap-2 pt-3 border-t border-command-border">
            <button
              onClick={() => setIsModalOpen(false)}
              className="px-3 py-1.5 rounded border border-command-border text-slate-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmAllocation}
              className="px-4 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white font-bold"
            >
              Confirm Deployment
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
