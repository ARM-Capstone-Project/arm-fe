// src/components/DeviceMap.tsx

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Mock data for device locations
const deviceLocations = [
  { id: 1, name: 'Temperature Sensors Group', location: [1.3521, 103.8198], type: 'temperature' },
  { id: 2, name: 'Pressure Sensors Group', location: [1.3621, 103.8298], type: 'pressure' },
  { id: 3, name: 'Moisture Sensors Group', location: [1.3721, 103.8398], type: 'moisture' },
  { id: 4, name: 'Humidity Sensors Group', location: [1.3821, 103.8498], type: 'humidity' },
];

// Custom icon for the markers
const icon = L.icon({
  iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
  shadowUrl: 'https://leafletjs.com/examples/custom-icons/leaf-shadow.png',
  iconSize: [38, 95],
  shadowSize: [50, 64],
  iconAnchor: [22, 94],
  shadowAnchor: [4, 62],
  popupAnchor: [-3, -76],
});

const DeviceMap: React.FC = () => {
  return (
    <div className="map-container">
      <MapContainer center={[1.3521, 103.8198]} zoom={12} style={{ height: '600px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {deviceLocations.map(device => (
          <Marker key={device.id} position={device.location} icon={icon}>
            <Popup>
              <strong>{device.name}</strong><br />
              Type: {device.type}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default DeviceMap;