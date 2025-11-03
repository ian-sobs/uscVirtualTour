'use client';

import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { MAP_CONFIG, MAP_STYLES } from '@/app/lib/googleMaps';

export default function GoogleMap() {
  return (
    <APIProvider apiKey={MAP_CONFIG.apiKey}>
      <Map
        defaultCenter={MAP_CONFIG.center}
        defaultZoom={MAP_CONFIG.zoom}
        styles={MAP_STYLES}
        mapId="1255c889f9110b35d6071258"
        className="w-full h-full"
        disableDefaultUI={false}
        gestureHandling="greedy"
      />
    </APIProvider>
  );
}