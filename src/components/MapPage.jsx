import React from 'react';
import { MapContainer, TileLayer, Marker, ZoomControl } from 'react-leaflet';
import { Clock } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapPage.css';
import './BusynessPage.css';

// UCSD Coordinates
const center = [32.8801, -117.2340];

const locations = [
  { id: 1, name: "Scholar's Italian", waitTime: 13, pos: [32.8812, -117.2365] },
  { id: 2, name: "Goody's MarketPlace", waitTime: 5, pos: [32.8825, -117.2340] },
  { id: 3, name: "Pines", waitTime: 20, pos: [32.8785, -117.2380] },
  { id: 4, name: "64 Degrees", waitTime: 35, pos: [32.8750, -117.2405] },
  { id: 5, name: "Canyon Vista", waitTime: 10, pos: [32.8805, -117.2280] },
  { id: 6, name: "Sixth Market", waitTime: 8, pos: [32.8795, -117.2315] },
];

const createCustomIcon = (waitTime) => {
  return L.divIcon({
    className: 'custom-map-bubble',
    html: `
      <div class="bubble-content">
        <span class="wait-number">${waitTime}</span>
        <span class="wait-text">Min Wait</span>
      </div>
      <div class="bubble-pointer"></div>
    `,
    iconSize: [60, 60],
    iconAnchor: [30, 60]
  });
};

const MapPage = ({ onLocationClick, onBusynessPress }) => {
  return (
    <div className="map-page-container">
      <MapContainer 
        center={center} 
        zoom={16} 
        zoomControl={false}
        className="leaflet-map"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
        />
        <ZoomControl position="topleft" />
        
        {locations.map(loc => (
          <Marker 
            key={loc.id} 
            position={loc.pos} 
            icon={createCustomIcon(loc.waitTime)}
            eventHandlers={{
              click: () => onLocationClick && onLocationClick(loc)
            }}
          />
        ))}
      </MapContainer>

      {/* Clock / Busyness button — below zoom controls */}
      <button className="map-clock-btn" onClick={onBusynessPress}>
        <Clock size={18} strokeWidth={2} />
      </button>
    </div>
  );
};

export default MapPage;
