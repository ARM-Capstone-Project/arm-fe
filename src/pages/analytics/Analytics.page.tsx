// src/pages/AnalyticsPage.tsx

import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar
} from 'recharts';
import GaugeChart from 'react-gauge-chart';
import DeviceList from '../../components/DeviceList.tsx';
import AlertList from '../../components/AlertList.tsx';
import Title from '../../components/Title.tsx';
import L from 'leaflet';
import { LatLngTuple } from 'leaflet';
import { Device } from 'types/device.ts';

// Mock data for charts and gauges
const lineChartData = [
  { name: 'Jan', temperature: 20, humidity: 60 },
  { name: 'Feb', temperature: 22, humidity: 62 },
  { name: 'Mar', temperature: 18, humidity: 65 },
  { name: 'Apr', temperature: 24, humidity: 70 },
  { name: 'May', temperature: 26, humidity: 75 },
  { name: 'Jun', temperature: 28, humidity: 80 },
  { name: 'Jul', temperature: 30, humidity: 85 },
  { name: 'Aug', temperature: 27, humidity: 78 },
  { name: 'Sep', temperature: 25, humidity: 72 },
  { name: 'Oct', temperature: 22, humidity: 68 },
  { name: 'Nov', temperature: 20, humidity: 65 },
  { name: 'Dec', temperature: 18, humidity: 60 },
];

const barChartData = [
  { name: 'Device 1', value: 400 },
  { name: 'Device 2', value: 300 },
  { name: 'Device 3', value: 200 },
  { name: 'Device 4', value: 278 },
  { name: 'Device 5', value: 189 },
];

const mockDevices: Device[] = [
  {
    id: "dev1",
    batchNo: "batch1", 
    name: "Sample Device",
    type: "Sensor",
    description: "A sample sensor device", 
    tagNo: "tag1", 
    sensors: [
      { id: "sensor1", name: "sensor 1", type: "Temperature", unit: "Celsius", device_id: "dev1", status: "active" },
      { id: "sensor2", name: "sensor 2", type: "Humidity", unit: "g/kg", device_id: "dev1", status: "active" }
    ],
    zoneId: "zone1", 
    zoneName: "Zone A",
    location: "Room 101",
    status: "active",
    users: [
      { id: "usr1", username: "Amy", role: "Supervisor" },
      { id: "usr2", username: "Joe", role: "Supervisor" },
      { id: "usr3", username: "Fin", role: "Operator" },
      { id: "usr4", username: "Agae", role: "Operator" }
    ]
  },
  {
    id: "dev2",
    batchNo: "batch2", 
    name: "Outdoor Sensor",
    type: "Sensor",
    description: "An outdoor sensor device", 
    tagNo: "tag2", 
    sensors: [
      { id: "sensor3", name: "sensor 3", type: "Moisture", unit: "%", device_id: "dev2", status: "active" },
      { id: "sensor4", name: "sensor 4", type: "Light", unit: "lux", device_id: "dev2", status: "active" }
    ],
    zoneId: "zone2", 
    zoneName: "Zone B",
    location: "Garden",
    status: "inactive",
    users: [
      { id: "usr5", username: "Lily", role: "Supervisor" },
      { id: "usr6", username: "David", role: "Operator" }
    ]
  },
  {
    id: "dev3",
    batchNo: "batch3", 
    name: "Pressure Monitor",
    type: "Monitor",
    description: "A pressure monitoring device", 
    tagNo: "tag3", 
    sensors: [
      { id: "sensor5", name: "sensor 5", type: "Pressure", unit: "Psi", device_id: "dev3", status: "active" }
    ],
    zoneId: "zone3", 
    zoneName: "Zone C",
    location: "Factory Floor",
    status: "active",
    users: [
      { id: "usr7", username: "Mia", role: "Supervisor" },
      { id: "usr8", username: "Tom", role: "Operator" }
    ]
  },
  {
    id: "dev4",
    batchNo: "batch4", 
    name: "Humidity Detector",
    type: "Sensor",
    description: "A humidity detection device", 
    tagNo: "tag4", 
    sensors: [
      { id: "sensor6", name: "sensor 6", type: "Humidity", unit: "%", device_id: "dev4", status: "active" }
    ],
    zoneId: "zone4", 
    zoneName: "Zone D",
    location: "Warehouse",
    status: "active",
    users: [
      { id: "usr9", username: "John", role: "Supervisor" },
      { id: "usr10", username: "Eve", role: "Operator" }
    ]
  }
];

const mockAlerts = [
  { id: 1, name: 'Temperature Alert', description: 'High temperature detected', timestamp: '2024-07-15 12:00' },
  { id: 2, name: 'Pressure Alert', description: 'Low pressure detected', timestamp: '2024-07-15 12:15' },
  { id: 3, name: 'Moisture Alert', description: 'High moisture detected', timestamp: '2024-07-15 12:30' },
  { id: 4, name: 'Humidity Alert', description: 'Low humidity detected', timestamp: '2024-07-15 12:45' },
];

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

const AnalyticsPage: React.FC = () => {
  return (
    <div className="p-4">
      <Title title="IoT Analytics" />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Line Chart */}
        <div className="bg-white shadow-md rounded p-4">
          <h2 className="text-xl font-semibold mb-4">Temperature and Humidity Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={lineChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="temperature" stroke="#ff7300" />
              <Line type="monotone" dataKey="humidity" stroke="#387908" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-white shadow-md rounded p-4">
          <h2 className="text-xl font-semibold mb-4">Device Activity</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Gauges */}
        <div className="bg-white shadow-md rounded p-4">
          <h2 className="text-xl font-semibold mb-4">Temperature Gauge</h2>
          <GaugeChart id="gauge-chart1" percent={0.5} nrOfLevels={30} colors={['#FF5F6D', '#FFC371']} arcWidth={0.3} />
          <h2 className="text-xl font-semibold mt-6 mb-4">Humidity Gauge</h2>
          <GaugeChart id="gauge-chart2" percent={0.7} nrOfLevels={30} colors={['#6E40AA', '#FF5F6D']} arcWidth={0.3} />
        </div>

        {/* Device List and Status */}
        <div className="bg-white shadow-md rounded p-4">
          <h2 className="text-xl font-semibold mb-4">Device List and Status</h2>
          <DeviceList 
            devices={mockDevices}
            onEdit={() => {}}
            onRemove={() => {}}
            onView={() => {}}
          />
        </div>
        
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6">
        {/* Geographical Map */}
        <div className="bg-white shadow-md rounded p-4">
          <h2 className="text-xl font-semibold mb-4">Device Locations</h2>
          <MapContainer center={[1.3521, 103.8198]} zoom={12} style={{ height: '400px', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {deviceLocations.map(device => (
              <Marker key={device.id} position={device.location as LatLngTuple} icon={icon}>
                <Popup>
                  <strong>{device.name}</strong><br />
                  Type: {device.type}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* Alerts */}
      <div className="bg-white shadow-md rounded p-4">
        <h2 className="text-xl font-semibold mb-4">Alerts</h2>
        <AlertList alerts={mockAlerts} />
      </div>
    </div>
  );
};

export default AnalyticsPage;
