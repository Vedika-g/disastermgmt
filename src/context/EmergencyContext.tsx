import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import {
  DisasterScenario,
  RiskZone,
  Alert,
  RescueTeam,
  ResourceItem,
  Shelter,
  Hospital,
  InfrastructureAsset,
  FieldReport,
  EvacuationRoute,
  IoTSensor,
  ActivityEvent,
  SystemStatus,
} from '../types';

import { initialDisaster } from '../data/mockDisaster';
import { initialRiskZones } from '../data/mockRiskZones';
import { initialAlerts } from '../data/mockAlerts';
import { initialTeams } from '../data/mockTeams';
import { initialResources } from '../data/mockResources';
import { initialShelters } from '../data/mockShelters';
import { initialHospitals } from '../data/mockHospitals';
import { initialInfrastructure } from '../data/mockInfrastructure';
import { initialFieldReports } from '../data/mockFieldReports';
import { initialRoutes } from '../data/mockRoutes';
import { initialSensors, initialActivityEvents } from '../data/mockSensors';

export interface MapFocusTarget {
  coordinates: [number, number];
  zoom: number;
  title: string;
  type: 'ZONE' | 'TEAM' | 'SHELTER' | 'ALERT' | 'INFRA' | 'REPORT' | 'SENSOR';
  id?: string;
}

export interface MapLayerState {
  floodZones: boolean;
  teams: boolean;
  shelters: boolean;
  hospitals: boolean;
  sensors: boolean;
  blockages: boolean;
  routes: boolean;
  fieldReports: boolean;
}

interface EmergencyContextType {
  disaster: DisasterScenario;
  riskZones: RiskZone[];
  alerts: Alert[];
  teams: RescueTeam[];
  resources: ResourceItem[];
  shelters: Shelter[];
  hospitals: Hospital[];
  infrastructure: InfrastructureAsset[];
  fieldReports: FieldReport[];
  routes: EvacuationRoute[];
  sensors: IoTSensor[];
  activityFeed: ActivityEvent[];
  systemStatus: SystemStatus;
  
  // Map Interactions
  activeMapTarget: MapFocusTarget | null;
  focusOnMap: (coords: [number, number], zoom?: number, title?: string, type?: MapFocusTarget['type'], id?: string) => void;
  clearMapFocus: () => void;
  selectedRouteId: string | null;
  setSelectedRouteId: (id: string | null) => void;
  layers: MapLayerState;
  toggleLayer: (layer: keyof MapLayerState) => void;
  
  // Operational Actions
  assignTeam: (teamId: string, task: string, priority?: 'CRITICAL' | 'HIGH' | 'MEDIUM') => void;
  updateAlertStatus: (alertId: string, status: Alert['status'], assignedTeam?: string) => void;
  executeResourceAllocation: (resourceId: string, zoneId: string, quantity: number) => void;
  executeAllRecommendedAllocations: () => void;
  
  // Field Reporting & Offline Simulation
  isOfflineMode: boolean;
  offlineQueuedReports: FieldReport[];
  toggleOfflineMode: () => void;
  submitFieldReport: (reportData: Partial<FieldReport>) => { success: boolean; queued: boolean };
  syncOfflineReports: () => Promise<number>;
  isSyncing: boolean;

  // Simulation Controls
  currentTimeString: string;
  toggleSimulationPause: () => void;
  manualSimulateUpdate: () => void;
}

const EmergencyContext = createContext<EmergencyContextType | undefined>(undefined);

export const EmergencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [disaster, setDisaster] = useState<DisasterScenario>(initialDisaster);
  const [riskZones, setRiskZones] = useState<RiskZone[]>(initialRiskZones);
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [teams, setTeams] = useState<RescueTeam[]>(initialTeams);
  const [resources, setResources] = useState<ResourceItem[]>(initialResources);
  const [shelters, setShelters] = useState<Shelter[]>(initialShelters);
  const [hospitals] = useState<Hospital[]>(initialHospitals);
  const [infrastructure, setInfrastructure] = useState<InfrastructureAsset[]>(initialInfrastructure);
  const [fieldReports, setFieldReports] = useState<FieldReport[]>(initialFieldReports);
  const [routes] = useState<EvacuationRoute[]>(initialRoutes);
  const [sensors, setSensors] = useState<IoTSensor[]>(initialSensors);
  const [activityFeed, setActivityFeed] = useState<ActivityEvent[]>(initialActivityEvents);

  const [activeMapTarget, setActiveMapTarget] = useState<MapFocusTarget | null>(null);
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>('route-rec-01');

  const [layers, setLayers] = useState<MapLayerState>({
    floodZones: true,
    teams: true,
    shelters: true,
    hospitals: true,
    sensors: true,
    blockages: true,
    routes: true,
    fieldReports: true,
  });

  // Offline field reporting simulation
  const [isOfflineMode, setIsOfflineMode] = useState<boolean>(false);
  const [offlineQueuedReports, setOfflineQueuedReports] = useState<FieldReport[]>([
    {
      id: 'OFFLINE-01',
      locationName: 'Pandu Ghat Riverside Lowlands',
      zoneId: 'zone-a',
      coordinates: [26.1730, 91.7190],
      submittedBy: 'Team R-17 Field Unit B',
      timestamp: '11:54 AM',
      severity: 'HIGH',
      description: 'Local transformer sparked and died. Need mobile emergency battery lights for 25 households.',
      status: 'UNDER_REVIEW',
      casualtiesCount: 0,
      waterDepthCm: 85,
      trappedPersonsCount: 6,
      requiredAssistance: 'Portable generator & high-lumen flashlights',
      isOfflineQueued: true,
    },
    {
      id: 'OFFLINE-02',
      locationName: 'Noonmati Refinery Canal Culvert',
      zoneId: 'zone-f',
      coordinates: [26.1810, 91.7800],
      submittedBy: 'Civil Defense Volunteer Patrol',
      timestamp: '12:10 PM',
      severity: 'WARNING',
      description: 'Hill silt debris jammed under minor culvert. Water pooling toward market lanes.',
      status: 'UNDER_REVIEW',
      casualtiesCount: 0,
      waterDepthCm: 35,
      trappedPersonsCount: 0,
      requiredAssistance: '2 laborers with rakes / tow strap',
      isOfflineQueued: true,
    },
  ]);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);

  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    aiServices: 'OPERATIONAL',
    gisEngine: 'OPERATIONAL',
    sensorsOnlineCount: 128,
    sensorsTotalCount: 132,
    fieldNetwork: 'OPERATIONAL',
    dataSync: 'OPERATIONAL',
    lastSyncTime: '12:42:18',
    isSimulationPaused: false,
  });

  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // Real-time clock tick every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const currentTimeString = currentTime.toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  // Map focus handler
  const focusOnMap = useCallback(
    (coords: [number, number], zoom = 14, title = 'Location', type: MapFocusTarget['type'] = 'ZONE', id?: string) => {
      setActiveMapTarget({
        coordinates: coords,
        zoom,
        title,
        type,
        id,
      });
    },
    []
  );

  const clearMapFocus = useCallback(() => {
    setActiveMapTarget(null);
  }, []);

  const toggleLayer = useCallback((layer: keyof MapLayerState) => {
    setLayers((prev) => ({ ...prev, [layer]: !prev[layer] }));
  }, []);

  // Team Assignment
  const assignTeam = useCallback(
    (teamId: string, task: string, priority: 'CRITICAL' | 'HIGH' | 'MEDIUM' = 'HIGH') => {
      setTeams((prev) =>
        prev.map((t) =>
          t.id === teamId
            ? { ...t, currentAssignment: task, status: 'ACTIVE', priority, lastUpdate: currentTimeString }
            : t
        )
      );

      setActivityFeed((prev) => [
        {
          id: `evt-${Date.now()}`,
          time: currentTimeString,
          type: 'TEAM_DISPATCH',
          severity: priority === 'CRITICAL' ? 'CRITICAL' : 'HIGH',
          message: `Team ${teamId} assigned: "${task}"`,
          targetId: teamId,
        },
        ...prev.slice(0, 19),
      ]);
    },
    [currentTimeString]
  );

  // Alert Management
  const updateAlertStatus = useCallback(
    (alertId: string, status: Alert['status'], assignedTeam?: string) => {
      setAlerts((prev) =>
        prev.map((a) =>
          a.id === alertId
            ? { ...a, status, assignedTeam: assignedTeam || a.assignedTeam }
            : a
        )
      );

      const target = alerts.find((a) => a.id === alertId);
      if (target) {
        setActivityFeed((prev) => [
          {
            id: `evt-${Date.now()}`,
            time: currentTimeString,
            type: 'SYSTEM',
            severity: status === 'RESOLVED' ? 'INFO' : 'HIGH',
            message: `Alert ${alertId} (${target.title}) marked as ${status}${assignedTeam ? ` -> Assigned to ${assignedTeam}` : ''}.`,
            targetId: alertId,
          },
          ...prev.slice(0, 19),
        ]);
      }
    },
    [alerts, currentTimeString]
  );

  // Resource Allocation
  const executeResourceAllocation = useCallback(
    (resourceId: string, zoneId: string, quantity: number) => {
      setResources((prev) =>
        prev.map((res) => {
          if (res.id === resourceId) {
            const actualAlloc = Math.min(res.available, quantity);
            return {
              ...res,
              available: res.available - actualAlloc,
              deployed: res.deployed + actualAlloc,
              status: res.available - actualAlloc <= res.lowStockThreshold ? 'LOW' : 'OPTIMAL',
            };
          }
          return res;
        })
      );

      const resItem = resources.find((r) => r.id === resourceId);
      const targetZone = riskZones.find((z) => z.id === zoneId);

      setActivityFeed((prev) => [
        {
          id: `evt-${Date.now()}`,
          time: currentTimeString,
          type: 'SYSTEM',
          severity: 'INFO',
          message: `Allocated ${quantity} ${resItem?.unit || 'units'} of ${resItem?.name} to ${targetZone?.name || zoneId}.`,
        },
        ...prev.slice(0, 19),
      ]);
    },
    [resources, riskZones, currentTimeString]
  );

  const executeAllRecommendedAllocations = useCallback(() => {
    setResources((prev) =>
      prev.map((res) => {
        let totalAllocated = 0;
        res.recommendedAllocations.forEach((alloc) => {
          totalAllocated += alloc.quantity;
        });
        const actualDeploy = Math.min(res.available, totalAllocated);
        return {
          ...res,
          available: Math.max(0, res.available - actualDeploy),
          deployed: res.deployed + actualDeploy,
          status: res.available - actualDeploy <= res.lowStockThreshold ? 'LOW' : 'OPTIMAL',
        };
      })
    );

    setActivityFeed((prev) => [
      {
        id: `evt-${Date.now()}`,
        time: currentTimeString,
        type: 'SYSTEM',
        severity: 'HIGH',
        message: 'AI Recommended Resource Allocation Batch executed across Zones A, B, C & D.',
      },
      ...prev.slice(0, 19),
    ]);
  }, [currentTimeString]);

  // Field reports & offline simulation
  const toggleOfflineMode = useCallback(() => {
    setIsOfflineMode((prev) => !prev);
  }, []);

  const submitFieldReport = useCallback(
    (reportData: Partial<FieldReport>) => {
      const newId = `FR-${Math.floor(2054 + Math.random() * 900)}`;
      const newReport: FieldReport = {
        id: newId,
        locationName: reportData.locationName || 'Guwahati Operational Sector',
        zoneId: reportData.zoneId || 'zone-a',
        coordinates: reportData.coordinates || [26.1750 + (Math.random() - 0.5) * 0.02, 91.7280 + (Math.random() - 0.5) * 0.02],
        submittedBy: reportData.submittedBy || 'Field Unit Bravo (SDRF)',
        timestamp: currentTimeString,
        severity: reportData.severity || 'HIGH',
        description: reportData.description || 'Rapid situation update from ground responder.',
        status: 'UNDER_REVIEW',
        casualtiesCount: reportData.casualtiesCount || 0,
        waterDepthCm: reportData.waterDepthCm || 50,
        trappedPersonsCount: reportData.trappedPersonsCount || 0,
        requiredAssistance: reportData.requiredAssistance || 'Rescue assessment',
        photoUrl: reportData.photoUrl,
        isOfflineQueued: isOfflineMode,
      };

      if (isOfflineMode) {
        setOfflineQueuedReports((prev) => [newReport, ...prev]);
        return { success: true, queued: true };
      } else {
        setFieldReports((prev) => [newReport, ...prev]);
        setActivityFeed((prev) => [
          {
            id: `evt-${Date.now()}`,
            time: currentTimeString,
            type: 'FIELD_REPORT',
            severity: newReport.severity,
            message: `New field report ${newId} submitted from ${newReport.locationName}.`,
            targetId: newId,
          },
          ...prev.slice(0, 19),
        ]);
        return { success: true, queued: false };
      }
    },
    [isOfflineMode, currentTimeString]
  );

  const syncOfflineReports = useCallback(async () => {
    if (offlineQueuedReports.length === 0) return 0;
    setIsSyncing(true);

    // Simulate realistic 1.2s network handshakes
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const synced = offlineQueuedReports.map((r) => ({ ...r, isOfflineQueued: false }));
    setFieldReports((prev) => [...synced, ...prev]);
    const count = offlineQueuedReports.length;
    setOfflineQueuedReports([]);
    setIsSyncing(false);

    setActivityFeed((prev) => [
      {
        id: `evt-${Date.now()}`,
        time: currentTimeString,
        type: 'SYSTEM',
        severity: 'INFO',
        message: `Field sync complete: ${count} offline reports transmitted and merged into GIS triage.`,
      },
      ...prev.slice(0, 19),
    ]);

    setSystemStatus((prev) => ({
      ...prev,
      lastSyncTime: currentTimeString,
      dataSync: 'OPERATIONAL',
    }));

    return count;
  }, [offlineQueuedReports, currentTimeString]);

  // Simulation controls
  const toggleSimulationPause = useCallback(() => {
    setSystemStatus((prev) => ({
      ...prev,
      isSimulationPaused: !prev.isSimulationPaused,
    }));
  }, []);

  // Subtle live simulation step
  const manualSimulateUpdate = useCallback(() => {
    // Subtle sensor fluctuations
    setSensors((prev) =>
      prev.map((s) => {
        if (s.type === 'RIVER_LEVEL') {
          const delta = (Math.random() - 0.45) * 0.04;
          const newReading = Math.max(0.1, Number((s.currentReading + delta).toFixed(2)));
          return {
            ...s,
            currentReading: newReading,
            status: newReading >= s.alertThreshold ? 'CRITICAL' : 'WARNING',
            lastTransmission: 'Just now',
          };
        }
        if (s.type === 'RAINFALL_GAUGE') {
          const delta = Math.random() * 0.3;
          return {
            ...s,
            currentReading: Number((s.currentReading + delta).toFixed(1)),
            lastTransmission: 'Just now',
          };
        }
        return s;
      })
    );

    // Subtle shelter occupancy shifts (evacuees arriving)
    setShelters((prev) =>
      prev.map((sh) => {
        if (sh.id === 'shelter-04' && sh.currentOccupancy < sh.capacity) {
          const added = Math.floor(Math.random() * 6);
          const newOcc = Math.min(sh.capacity, sh.currentOccupancy + added);
          return {
            ...sh,
            currentOccupancy: newOcc,
            foodKitsRemaining: Math.max(10, sh.foodKitsRemaining - added),
          };
        }
        return sh;
      })
    );

    setDisaster((prev) => ({
      ...prev,
      lastUpdated: currentTimeString,
      affectedPopulation: prev.affectedPopulation + Math.floor(Math.random() * 5),
    }));
  }, [currentTimeString]);

  // Periodic subtle background simulation every 15 seconds if not paused
  useEffect(() => {
    if (systemStatus.isSimulationPaused) return;

    const interval = setInterval(() => {
      manualSimulateUpdate();
    }, 15000);

    return () => clearInterval(interval);
  }, [systemStatus.isSimulationPaused, manualSimulateUpdate]);

  return (
    <EmergencyContext.Provider
      value={{
        disaster,
        riskZones,
        alerts,
        teams,
        resources,
        shelters,
        hospitals,
        infrastructure,
        fieldReports,
        routes,
        sensors,
        activityFeed,
        systemStatus,
        activeMapTarget,
        focusOnMap,
        clearMapFocus,
        selectedRouteId,
        setSelectedRouteId,
        layers,
        toggleLayer,
        assignTeam,
        updateAlertStatus,
        executeResourceAllocation,
        executeAllRecommendedAllocations,
        isOfflineMode,
        offlineQueuedReports,
        toggleOfflineMode,
        submitFieldReport,
        syncOfflineReports,
        isSyncing,
        currentTimeString,
        toggleSimulationPause,
        manualSimulateUpdate,
      }}
    >
      {children}
    </EmergencyContext.Provider>
  );
};

export const useEmergency = () => {
  const context = useContext(EmergencyContext);
  if (!context) {
    throw new Error('useEmergency must be used within an EmergencyProvider');
  }
  return context;
};
