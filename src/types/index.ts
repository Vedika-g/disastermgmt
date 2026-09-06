export type SeverityLevel = 'CRITICAL' | 'HIGH' | 'WARNING' | 'INFO' | 'RESOLVED';
export type TeamStatus = 'AVAILABLE' | 'EN_ROUTE' | 'ACTIVE' | 'STANDBY' | 'OFFLINE';
export type InfraStatus = 'OPERATIONAL' | 'PARTIALLY_DAMAGED' | 'CRITICAL' | 'OFFLINE';
export type RouteStatus = 'SAFE' | 'MODERATE' | 'BLOCKED';
export type ReportStatus = 'UNDER_REVIEW' | 'VERIFIED' | 'DISPATCHED' | 'RESOLVED';
export type SensorStatus = 'NORMAL' | 'WARNING' | 'CRITICAL' | 'OFFLINE';

export interface DisasterScenario {
  id: string;
  name: string;
  category: string;
  region: string;
  state: string;
  centerCoordinates: [number, number];
  zoom: number;
  severityLevel: SeverityLevel;
  overallRiskScore: number; // 0-100
  affectedPopulation: number;
  criticalZonesCount: number;
  activeAlertsCount: number;
  deployedTeamsCount: number;
  availableSheltersCount: number;
  activeSince: string;
  lastUpdated: string;
  weatherSummary: string;
  rainfall24hMm: number;
  riverStageMeters: number;
  floodPeakForecast: string;
}

export interface RiskZone {
  id: string;
  code: string;
  name: string;
  locality: string;
  riskScore: number;
  hazard: string;
  population: number;
  evacuatedPopulation: number;
  trend: 'increasing' | 'stable' | 'decreasing';
  status: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';
  coordinates: [number, number];
  polygon: [number, number][];
  waterLevelMeters: number;
  priorityRank: number;
  activeRescues: number;
  criticalNeeds: string[];
}

export interface Alert {
  id: string;
  severity: SeverityLevel;
  title: string;
  location: string;
  zoneId?: string;
  coordinates: [number, number];
  timestamp: string;
  timeAgo: string;
  description: string;
  source: string; // e.g. "Field Report + GIS", "IoT River Gauge", "Drone Recon"
  status: 'NEW' | 'INVESTIGATING' | 'DISPATCHED' | 'RESOLVED';
  relatedRiskScore: number;
  actionRequired: string;
  assignedTeam?: string;
}

export interface RescueTeam {
  id: string;
  name: string;
  type: string; // "NDRF Urban SAR", "SDRF Water Rescue", "Fire & Emergency", "Civil Defense"
  locationName: string;
  coordinates: [number, number];
  status: TeamStatus;
  members: number;
  currentAssignment: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  equipment: string[];
  vehicleType: string;
  lastUpdate: string;
  contactFreq: string;
  batteryTelemetry?: number;
}

export interface ResourceAllocation {
  zoneId: string;
  zoneName: string;
  quantity: number;
}

export interface ResourceItem {
  id: string;
  category: 'VEHICLES' | 'WATER_RESCUE' | 'MEDICAL' | 'RATIONS' | 'EQUIPMENT' | 'POWER_COMMS';
  name: string;
  total: number;
  available: number;
  deployed: number;
  unit: string;
  lowStockThreshold: number;
  status: 'OPTIMAL' | 'LOW' | 'CRITICAL';
  recommendedAllocations: ResourceAllocation[];
}

export interface Shelter {
  id: string;
  name: string;
  locationName: string;
  coordinates: [number, number];
  capacity: number;
  currentOccupancy: number;
  status: 'OPERATIONAL' | 'NEAR_CAPACITY' | 'FULL';
  facilities: string[];
  medicalStaffPresent: boolean;
  foodKitsRemaining: number;
  waterSupplyLiters: number;
  contactPerson: string;
  contactPhone: string;
}

export interface Hospital {
  id: string;
  name: string;
  locationName: string;
  coordinates: [number, number];
  totalBeds: number;
  availableBeds: number;
  icuBedsTotal: number;
  icuBedsAvailable: number;
  powerBackup: boolean;
  oxygenStatus: 'STABLE' | 'MODERATE' | 'LOW';
  traumaLevel: string;
  status: 'OPERATIONAL' | 'SURGE_CAPACITY' | 'CRITICAL';
}

export interface InfrastructureAsset {
  id: string;
  name: string;
  type: 'ROAD' | 'BRIDGE' | 'HOSPITAL' | 'POWER_STATION' | 'WATER_TREATMENT' | 'COMMS_TOWER' | 'DAM';
  locationName: string;
  coordinates: [number, number];
  status: InfraStatus;
  damagePercentage: number;
  structuralRisk: 'CRITICAL' | 'HIGH' | 'MODERATE' | 'LOW';
  lastUpdated: string;
  inspectionNotes: string;
  impactOnEvacuation: string;
}

export interface FieldReport {
  id: string;
  locationName: string;
  zoneId: string;
  coordinates: [number, number];
  submittedBy: string;
  timestamp: string;
  severity: SeverityLevel;
  description: string;
  status: ReportStatus;
  photoUrl?: string;
  casualtiesCount: number;
  waterDepthCm: number;
  trappedPersonsCount: number;
  requiredAssistance: string;
  isOfflineQueued?: boolean;
}

export interface EvacuationRoute {
  id: string;
  name: string;
  fromZone: string;
  toShelter: string;
  distanceKm: number;
  etaMinutes: number;
  status: RouteStatus;
  blockageReason?: string;
  isRecommended: boolean;
  pathCoordinates: [number, number][];
  checkpoints: string[];
}

export interface IoTSensor {
  id: string;
  type: 'RIVER_LEVEL' | 'RAINFALL_GAUGE' | 'WATER_FLOW_VELOCITY' | 'BRIDGE_STRAIN';
  name: string;
  locationName: string;
  coordinates: [number, number];
  currentReading: number;
  unit: string;
  normalRange: [number, number];
  alertThreshold: number;
  status: SensorStatus;
  batteryPercent: number;
  lastTransmission: string;
}

export interface ActivityEvent {
  id: string;
  time: string;
  type: 'RISK_CHANGE' | 'TEAM_DISPATCH' | 'FIELD_REPORT' | 'BLOCKAGE' | 'SHELTER_UPDATE' | 'SENSOR_ALERT' | 'SYSTEM';
  severity: SeverityLevel;
  message: string;
  targetId?: string;
}

export interface SystemStatus {
  aiServices: 'OPERATIONAL' | 'DEGRADED' | 'OFFLINE';
  gisEngine: 'OPERATIONAL' | 'DEGRADED' | 'OFFLINE';
  sensorsOnlineCount: number;
  sensorsTotalCount: number;
  fieldNetwork: 'OPERATIONAL' | 'DEGRADED' | 'OFFLINE';
  dataSync: 'OPERATIONAL' | 'SYNCING' | 'OFFLINE';
  lastSyncTime: string;
  isSimulationPaused: boolean;
}
