import React, { useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Polygon,
  Polyline,
  Marker,
  Popup,
  Circle,
} from 'react-leaflet';
import L from 'leaflet';
import { useEmergency } from '../../context/EmergencyContext';
import { MapFlyToHandler } from './MapFlyToHandler';
import { MapLegend } from './MapLegend';
import { MapLayerControl } from './MapLayerControl';
import { RiskBadge } from '../common/RiskBadge';

// Fix Leaflet default icon issues in bundled React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Create Tactical Custom SVG DivIcons
const createTacticalIcon = (symbol: string, bgColor: string, borderColor: string, textColor: string = '#ffffff') => {
  return L.divIcon({
    className: 'tactical-div-icon',
    html: `<div style="
      background: ${bgColor};
      border: 2px solid ${borderColor};
      color: ${textColor};
      width: 28px;
      height: 28px;
      border-radius: 6px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 11px;
      font-weight: 800;
      font-family: monospace;
      box-shadow: 0 4px 10px rgba(0,0,0,0.6);
    ">${symbol}</div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
    popupAnchor: [0, -14],
  });
};

const teamIcon = createTacticalIcon('R', '#1e3a8a', '#3b82f6');
const shelterIcon = createTacticalIcon('S', '#064e3b', '#10b981');
const hospitalIcon = createTacticalIcon('+', '#7f1d1d', '#ef4444');
const sensorIcon = createTacticalIcon('~', '#78350f', '#f59e0b');
const blockageIcon = createTacticalIcon('!', '#450a0a', '#dc2626');
const reportIcon = createTacticalIcon('?', '#581c87', '#a855f7');

interface CommandMapProps {
  height?: string;
  showControls?: boolean;
}

export const CommandMap: React.FC<CommandMapProps> = ({
  height = '600px',
  showControls = true,
}) => {
  const {
    disaster,
    riskZones,
    teams,
    shelters,
    hospitals,
    sensors,
    alerts,
    routes,
    fieldReports,
    layers,
    selectedRouteId,
    setSelectedRouteId,
    focusOnMap,
    assignTeam,
  } = useEmergency();

  const [baseLayer, setBaseLayer] = useState<'dark' | 'osm' | 'satellite'>('osm');

  // Completely free, open tile configurations without ANY API key or watermark requirements
  const tileConfig = {
    // 1. Authentic OpenStreetMap Standard (Full-color, real street names, landmarks, river flow)
    osm: {
      url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      className: '',
    },
    // 2. Tactical Dark Mode (High-contrast tactical dark filter applied over standard OpenStreetMap)
    dark: {
      url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
      attribution: '&copy; OpenStreetMap contributors • Tactical EOC Filter',
      className: 'tactical-dark-map-tiles',
    },
    // 3. Esri World Imagery (Real High-Resolution Satellite Tiles without API key)
    satellite: {
      url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      attribution: 'Esri, Maxar, Earthstar Geographics',
      className: '',
    },
  }[baseLayer];

  return (
    <div className="relative w-full rounded-lg overflow-hidden border border-command-border shadow-2xl bg-command-bg" style={{ height }}>
      <MapContainer
        center={disaster.centerCoordinates}
        zoom={disaster.zoom}
        style={{ width: '100%', height: '100%', backgroundColor: '#080b11' }}
        zoomControl={true}
      >
        <TileLayer
          url={tileConfig.url}
          attribution={tileConfig.attribution}
          className={tileConfig.className}
        />
        <MapFlyToHandler />

        {/* 1. FLOOD RISK ZONES (POLYGONS) */}
        {layers.floodZones &&
          riskZones.map((zone) => {
            let fillColor = '#ef4444';
            let strokeColor = '#dc2626';

            if (zone.status === 'HIGH') {
              fillColor = '#f97316';
              strokeColor = '#ea580c';
            } else if (zone.status === 'MODERATE') {
              fillColor = '#eab308';
              strokeColor = '#ca8a04';
            } else if (zone.status === 'LOW') {
              fillColor = '#10b981';
              strokeColor = '#059669';
            }

            return (
              <React.Fragment key={zone.id}>
                <Polygon
                  positions={zone.polygon}
                  pathOptions={{
                    color: strokeColor,
                    fillColor: fillColor,
                    fillOpacity: 0.32,
                    weight: 2.5,
                    dashArray: zone.status === 'CRITICAL' ? '4, 4' : undefined,
                  }}
                  eventHandlers={{
                    click: () => focusOnMap(zone.coordinates, 14, zone.name, 'ZONE', zone.id),
                  }}
                >
                  <Popup>
                    <div className="space-y-2 p-1 font-mono text-xs">
                      <div className="flex items-center justify-between gap-2 border-b border-command-border pb-1">
                        <strong className="text-sm font-bold text-white uppercase">{zone.name}</strong>
                        <RiskBadge level={zone.status} size="sm" />
                      </div>
                      <div className="grid grid-cols-2 gap-1 text-[11px] text-slate-300">
                        <div>Risk Score: <strong className="text-red-400">{zone.riskScore} / 100</strong></div>
                        <div>Water Stage: <strong className="text-white">{zone.waterLevelMeters}m</strong></div>
                        <div>Population: <strong className="text-white">{zone.population.toLocaleString()}</strong></div>
                        <div>Evacuated: <strong className="text-emerald-400">{zone.evacuatedPopulation.toLocaleString()}</strong></div>
                      </div>
                      <div className="text-[11px] text-amber-300">
                        <strong>Hazard:</strong> {zone.hazard}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        <strong>Needs:</strong> {zone.criticalNeeds.join(', ')}
                      </div>
                    </div>
                  </Popup>
                </Polygon>

                {/* Center marker / label circle */}
                <Circle
                  center={zone.coordinates}
                  radius={160}
                  pathOptions={{ color: strokeColor, fillColor: fillColor, fillOpacity: 0.8 }}
                />
              </React.Fragment>
            );
          })}

        {/* 2. EVACUATION ROUTES (POLYLINES) */}
        {layers.routes &&
          routes.map((rt) => {
            const isSelected = selectedRouteId === rt.id;
            let routeColor = '#10b981'; // safe
            let dashPattern: string | undefined = undefined;

            if (rt.status === 'MODERATE') {
              routeColor = '#f59e0b';
            } else if (rt.status === 'BLOCKED') {
              routeColor = '#ef4444';
              dashPattern = '6, 6';
            }

            return (
              <Polyline
                key={rt.id}
                positions={rt.pathCoordinates}
                pathOptions={{
                  color: isSelected ? '#0284c7' : routeColor,
                  weight: isSelected ? 6 : 4,
                  opacity: isSelected ? 1 : 0.8,
                  dashArray: dashPattern,
                }}
                eventHandlers={{
                  click: () => setSelectedRouteId(rt.id),
                }}
              >
                <Popup>
                  <div className="p-1 font-mono text-xs space-y-1.5">
                    <div className="flex items-center justify-between gap-2 border-b border-command-border pb-1">
                      <strong className="text-white font-bold">{rt.name}</strong>
                      <RiskBadge level={rt.status} size="sm" />
                    </div>
                    <div className="text-[11px] text-slate-300">
                      <div>From: <strong>{rt.fromZone}</strong></div>
                      <div>To: <strong>{rt.toShelter}</strong></div>
                      <div>Distance: <strong>{rt.distanceKm} km</strong> | ETA: <strong>{rt.etaMinutes} mins</strong></div>
                    </div>
                    {rt.blockageReason && (
                      <div className="text-red-400 text-[11px] bg-red-950/40 p-1.5 rounded border border-red-500/30">
                        <strong>Blockage:</strong> {rt.blockageReason}
                      </div>
                    )}
                  </div>
                </Popup>
              </Polyline>
            );
          })}

        {/* 3. RESCUE TEAMS */}
        {layers.teams &&
          teams.map((team) => (
            <Marker key={team.id} position={team.coordinates} icon={teamIcon}>
              <Popup>
                <div className="p-1 font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between gap-2 border-b border-command-border pb-1">
                    <strong className="text-sm font-bold text-white">{team.name}</strong>
                    <RiskBadge level={team.status} size="sm" />
                  </div>
                  <div className="text-[11px] text-slate-300 space-y-0.5">
                    <div>Type: <strong>{team.type}</strong></div>
                    <div>Location: <strong>{team.locationName}</strong></div>
                    <div>Members: <strong>{team.members} Personnel</strong></div>
                    <div>Priority: <strong className="text-red-400">{team.priority}</strong></div>
                    <div>Task: <span className="text-amber-300">{team.currentAssignment}</span></div>
                    <div>Comms: <span className="text-slate-400">{team.contactFreq}</span></div>
                  </div>
                  <div className="border-t border-command-border pt-1.5 flex gap-2">
                    <button
                      onClick={() => assignTeam(team.id, 'Dispatched to Pandu / Bharalu flood zone', 'CRITICAL')}
                      className="w-full text-center px-2 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-[10px] font-bold uppercase transition-colors"
                    >
                      Quick Dispatch
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

        {/* 4. SHELTERS */}
        {layers.shelters &&
          shelters.map((sh) => (
            <Marker key={sh.id} position={sh.coordinates} icon={shelterIcon}>
              <Popup>
                <div className="p-1 font-mono text-xs space-y-2">
                  <div className="flex items-center justify-between gap-2 border-b border-command-border pb-1">
                    <strong className="text-sm font-bold text-white">{sh.name}</strong>
                    <RiskBadge level={sh.status} size="sm" />
                  </div>
                  <div className="text-[11px] text-slate-300 space-y-0.5">
                    <div>Capacity: <strong>{sh.currentOccupancy} / {sh.capacity} ({Math.round((sh.currentOccupancy / sh.capacity) * 100)}%)</strong></div>
                    <div>Water Supply: <strong>{sh.waterSupplyLiters.toLocaleString()} L</strong></div>
                    <div>Food Kits: <strong>{sh.foodKitsRemaining}</strong></div>
                    <div>Contact: <strong>{sh.contactPerson} ({sh.contactPhone})</strong></div>
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Facilities: {sh.facilities.join(', ')}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

        {/* 5. HOSPITALS */}
        {layers.hospitals &&
          hospitals.map((hosp) => (
            <Marker key={hosp.id} position={hosp.coordinates} icon={hospitalIcon}>
              <Popup>
                <div className="p-1 font-mono text-xs space-y-1.5">
                  <div className="flex items-center justify-between gap-2 border-b border-command-border pb-1">
                    <strong className="text-sm font-bold text-white">{hosp.name}</strong>
                    <RiskBadge level={hosp.status} size="sm" />
                  </div>
                  <div className="text-[11px] text-slate-300 space-y-0.5">
                    <div>Total Beds: <strong>{hosp.totalBeds}</strong> (Avail: <strong className="text-emerald-400">{hosp.availableBeds}</strong>)</div>
                    <div>ICU Beds: <strong>{hosp.icuBedsAvailable} / {hosp.icuBedsTotal} Avail</strong></div>
                    <div>Oxygen: <strong className="text-blue-300">{hosp.oxygenStatus}</strong></div>
                    <div>Trauma: <span className="text-slate-400">{hosp.traumaLevel}</span></div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

        {/* 6. IOT SENSORS */}
        {layers.sensors &&
          sensors.map((sensor) => (
            <Marker key={sensor.id} position={sensor.coordinates} icon={sensorIcon}>
              <Popup>
                <div className="p-1 font-mono text-xs space-y-1.5">
                  <div className="flex items-center justify-between gap-2 border-b border-command-border pb-1">
                    <strong className="text-sm font-bold text-white">{sensor.name}</strong>
                    <RiskBadge level={sensor.status} size="sm" />
                  </div>
                  <div className="text-[11px] text-slate-300 space-y-0.5">
                    <div>Reading: <strong className="text-red-400 text-sm">{sensor.currentReading} {sensor.unit}</strong></div>
                    <div>Alert Threshold: <strong>{sensor.alertThreshold} {sensor.unit}</strong></div>
                    <div>Battery: <strong>{sensor.batteryPercent}%</strong></div>
                    <div>Last Ping: <span className="text-slate-400">{sensor.lastTransmission}</span></div>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}

        {/* 7. ROAD BLOCKAGES */}
        {layers.blockages &&
          alerts
            .filter((a) => a.severity === 'CRITICAL' && a.title.toLowerCase().includes('block'))
            .map((blk) => (
              <Marker key={blk.id} position={blk.coordinates} icon={blockageIcon}>
                <Popup>
                  <div className="p-1 font-mono text-xs space-y-1.5">
                    <div className="flex items-center justify-between gap-2 border-b border-command-border pb-1">
                      <strong className="text-white font-bold">{blk.title}</strong>
                      <RiskBadge level="CRITICAL" size="sm" />
                    </div>
                    <p className="text-[11px] text-red-300">{blk.description}</p>
                    <div className="text-[10px] text-slate-400 font-mono">Reported: {blk.timestamp} via {blk.source}</div>
                  </div>
                </Popup>
              </Marker>
            ))}

        {/* 8. FIELD SOS REPORTS */}
        {layers.fieldReports &&
          fieldReports.map((fr) => (
            <Marker key={fr.id} position={fr.coordinates} icon={reportIcon}>
              <Popup>
                <div className="p-1 font-mono text-xs space-y-1.5">
                  <div className="flex items-center justify-between gap-2 border-b border-command-border pb-1">
                    <strong className="text-white font-bold">{fr.id} — Ground Report</strong>
                    <RiskBadge level={fr.severity} size="sm" />
                  </div>
                  <div className="text-[11px] text-slate-300">
                    <div>Location: <strong>{fr.locationName}</strong></div>
                    <div>By: <strong>{fr.submittedBy}</strong></div>
                    <div>Water Depth: <strong>{fr.waterDepthCm} cm</strong> | Trapped: <strong className="text-red-400">{fr.trappedPersonsCount}</strong></div>
                  </div>
                  <p className="text-[11px] text-slate-300 bg-command-card p-1.5 rounded">{fr.description}</p>
                </div>
              </Popup>
            </Marker>
          ))}
      </MapContainer>

      {/* Floating Tactical Layer & Legend Controls */}
      {showControls && (
        <>
          <MapLayerControl baseLayer={baseLayer} setBaseLayer={setBaseLayer} />
          <MapLegend />
        </>
      )}
    </div>
  );
};
