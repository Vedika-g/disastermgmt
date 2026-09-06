export const riskTimelineData = [
  { time: '00:00', riskScore: 42, rainfall: 15, alerts: 3 },
  { time: '02:00', riskScore: 48, rainfall: 28, alerts: 4 },
  { time: '04:00', riskScore: 56, rainfall: 45, alerts: 6 },
  { time: '06:00', riskScore: 68, rainfall: 78, alerts: 9 },
  { time: '08:00', riskScore: 74, rainfall: 110, alerts: 11 },
  { time: '10:00', riskScore: 79, rainfall: 142, alerts: 13 },
  { time: '12:00', riskScore: 82, rainfall: 162, alerts: 14 },
  { time: '14:00 (Est)', riskScore: 85, rainfall: 175, alerts: 16 },
  { time: '16:00 (Est)', riskScore: 83, rainfall: 160, alerts: 15 },
  { time: '18:00 (Est)', riskScore: 78, rainfall: 130, alerts: 12 },
];

export const riskDistributionData = [
  { name: 'Critical (Risk > 85)', value: 35, count: 2, color: '#ef4444' },
  { name: 'High (Risk 70-85)', value: 40, count: 2, color: '#f97316' },
  { name: 'Moderate (Risk 55-70)', value: 20, count: 2, color: '#eab308' },
  { name: 'Low (Risk < 55)', value: 5, count: 1, color: '#10b981' },
];

export const populationAtRiskData = [
  { zone: 'Zone A', totalPop: 8420, evacuated: 3100, remaining: 5320, risk: 94 },
  { zone: 'Zone C', totalPop: 5230, evacuated: 1850, remaining: 3380, risk: 88 },
  { zone: 'Zone B', totalPop: 4860, evacuated: 2200, remaining: 2660, risk: 81 },
  { zone: 'Zone D', totalPop: 3120, evacuated: 1400, remaining: 1720, risk: 74 },
  { zone: 'Zone E', totalPop: 1840, evacuated: 980, remaining: 860, risk: 66 },
  { zone: 'Zone F', totalPop: 950, evacuated: 610, remaining: 340, risk: 58 },
  { zone: 'Zone G', totalPop: 440, evacuated: 290, remaining: 150, risk: 51 },
];

export const riskFactorsRadar = [
  { factor: 'Hazard Severity', score: 92, benchmark: 50 },
  { factor: 'Population Exposure', score: 86, benchmark: 45 },
  { factor: 'Infra Vulnerability', score: 81, benchmark: 40 },
  { factor: 'Accessibility Disruption', score: 89, benchmark: 35 },
  { factor: 'Damage Level', score: 78, benchmark: 30 },
  { factor: 'Resource Gap', score: 65, benchmark: 25 },
];

export const resourceUtilizationData = [
  { resource: 'Inflatable Boats', deployed: 20, available: 8, total: 28, utilRate: 71 },
  { resource: 'Ambulances', deployed: 26, available: 9, total: 35, utilRate: 74 },
  { resource: 'Generators', deployed: 35, available: 7, total: 42, utilRate: 83 },
  { resource: 'De-water Pumps', deployed: 39, available: 11, total: 50, utilRate: 78 },
  { resource: 'Sat Comms', deployed: 19, available: 5, total: 24, utilRate: 79 },
];

export const evacuationProgressData = [
  { hour: '06:00', evacuated: 1200, target: 4000 },
  { hour: '08:00', evacuated: 3100, target: 8000 },
  { hour: '10:00', evacuated: 6400, target: 14000 },
  { hour: '12:00', evacuated: 10430, target: 20000 },
  { hour: '14:00 (Proj)', evacuated: 15800, target: 24860 },
  { hour: '16:00 (Proj)', evacuated: 21500, target: 24860 },
];

export const responseTimesData = [
  { sector: 'Zone A', avgMinutes: 14, targetMinutes: 10 },
  { sector: 'Zone B', avgMinutes: 18, targetMinutes: 12 },
  { sector: 'Zone C', avgMinutes: 24, targetMinutes: 15 },
  { sector: 'Zone D', avgMinutes: 12, targetMinutes: 10 },
  { sector: 'Zone E', avgMinutes: 20, targetMinutes: 15 },
];
