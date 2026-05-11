import React from 'react';
import { MapContainer, TileLayer, Marker, ZoomControl } from 'react-leaflet';
import { Clock } from 'lucide-react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './MapPage.css';
import './BusynessPage.css';

// UCSD Coordinates — centred on Warren College area
const center = [32.8789, -117.2355];

const locations = [
  { id: 1,  name: 'OceanView Terrace',      waitTime: 12, pos: [32.8852, -117.2428] }, // Eleanor Roosevelt College
  { id: 2,  name: 'Ventanas',               waitTime: 8,  pos: [32.8860, -117.2408] }, // Eleanor Roosevelt College
  { id: 3,  name: '64 Degrees',             waitTime: 35, pos: [32.8748, -117.2410] }, // Revelle College
  { id: 4,  name: 'Canyon Vista',           waitTime: 10, pos: [32.8820, -117.2268] }, // Warren College
  { id: 5,  name: 'Spice',                  waitTime: 15, pos: [32.8772, -117.2398] }, // Muir College
  { id: 6,  name: 'Club Med',               waitTime: 5,  pos: [32.8718, -117.2372] }, // School of Medicine
  { id: 7,  name: 'Foodworx',              waitTime: 18, pos: [32.8793, -117.2345] }, // Sixth College (old)
  { id: 8,  name: 'Sixth Restaurants',      waitTime: 20, pos: [32.8808, -117.2308] }, // Sixth College
  { id: 9,  name: "Goody's MarketPlace",    waitTime: 5,  pos: [32.8830, -117.2335] }, // Market
  { id: 10, name: 'Sixth Market',           waitTime: 3,  pos: [32.8800, -117.2320] }, // Market
  { id: 11, name: 'Pines',                  waitTime: 22, pos: [32.8790, -117.2375] }, // Marshall College
];

const createCustomIcon = (waitTime) => {
  return L.divIcon({
    className: 'custom-map-bubble',
    html: `
      <div class="bubble-content">
        <span class="wait-number">${waitTime}</span>
        <span class="wait-text">MIN WAIT</span>
      </div>
      <div class="bubble-pointer"></div>
    `,
    iconSize: [88, 72],
    iconAnchor: [44, 72]
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
          className="map-tile"
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
