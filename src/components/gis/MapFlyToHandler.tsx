import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { useEmergency } from '../../context/EmergencyContext';

export const MapFlyToHandler: React.FC = () => {
  const map = useMap();
  const { activeMapTarget } = useEmergency();

  useEffect(() => {
    if (activeMapTarget) {
      map.flyTo(activeMapTarget.coordinates, activeMapTarget.zoom || 14, {
        duration: 1.2,
        easeLinearity: 0.25,
      });
    }
  }, [activeMapTarget, map]);

  return null;
};
