import React from 'react';
import { WifiOff, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useEmergency } from '../../context/EmergencyContext';

export const OfflineIndicator: React.FC = () => {
  const {
    isOfflineMode,
    toggleOfflineMode,
    offlineQueuedReports,
    syncOfflineReports,
    isSyncing,
    systemStatus,
  } = useEmergency();

  return (
    <div
      className={`border rounded-lg p-3 transition-all ${
        isOfflineMode
          ? 'bg-amber-950/30 border-amber-500/50 text-amber-200'
          : 'bg-command-card/80 border-command-border text-slate-300'
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div
            className={`p-1.5 rounded ${
              isOfflineMode ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
            }`}
          >
            {isOfflineMode ? <WifiOff className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider font-mono">
                {isOfflineMode ? 'OFFLINE DISCONNECTED MODE' : 'FIELD NETWORK CONNECTED'}
              </span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded border ${
                  isOfflineMode
                    ? 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                    : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
                }`}
              >
                {offlineQueuedReports.length} QUEUED
              </span>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5 font-mono">
              Last synchronization: {systemStatus.lastSyncTime} IST • Local cache active
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleOfflineMode}
            className={`text-xs px-2.5 py-1 rounded border font-mono transition-colors ${
              isOfflineMode
                ? 'bg-slate-800 text-slate-200 border-slate-700 hover:bg-slate-700'
                : 'bg-amber-950/30 text-amber-400 border-amber-500/30 hover:bg-amber-900/40'
            }`}
          >
            {isOfflineMode ? 'Go Online' : 'Simulate Offline'}
          </button>

          <button
            onClick={() => syncOfflineReports()}
            disabled={isSyncing || offlineQueuedReports.length === 0}
            className="flex items-center gap-1.5 text-xs px-3 py-1 rounded bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-mono font-medium transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            {isSyncing ? 'Syncing...' : 'Sync Now'}
          </button>
        </div>
      </div>
    </div>
  );
};
