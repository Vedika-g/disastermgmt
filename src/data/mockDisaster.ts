import { DisasterScenario } from '../types';

export const initialDisaster: DisasterScenario = {
  id: 'DIS-2026-ASM-09',
  name: 'Flood Emergency — Assam Brahmaputra Basin',
  category: 'Severe Riverine Inundation & Urban Surge',
  region: 'Kamrup Metropolitan (Guwahati Sector)',
  state: 'Assam',
  centerCoordinates: [26.1600, 91.7500],
  zoom: 12,
  severityLevel: 'CRITICAL',
  overallRiskScore: 82,
  affectedPopulation: 24860,
  criticalZonesCount: 7,
  activeAlertsCount: 14,
  deployedTeamsCount: 32,
  availableSheltersCount: 18,
  activeSince: '04 Sep 2026, 05:30 IST',
  lastUpdated: '12:42:18 IST',
  weatherSummary: 'Heavy Influx from Upper Brahmaputra & Meghalaya Hills (194 mm/24h) | Saraighat Crest Warning',
  rainfall24hMm: 194.2,
  riverStageMeters: 50.45, // Above danger mark 49.68m
  floodPeakForecast: 'Brahmaputra crest peak expected in +3.5 hours (+0.55m surge)',
};
