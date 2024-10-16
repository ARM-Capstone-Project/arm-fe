// src/pages/Dashboard.tsx
import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import GaugeChart from 'react-gauge-chart';
import DeviceList from "../../components/DeviceList";
import L from "leaflet";

// Mock data for charts and gauges
/*const lineChartData = [
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
*/
// const mockDevices = [
//   { id: 1, name: 'Temperature Sensor 1', type: 'temperature', status: 'active', location: 'Room A' },
//   { id: 2, name: 'Pressure Sensor 1', type: 'pressure', status: 'active', location: 'Room B' },
//   { id: 3, name: 'Moisture Sensor 1', type: 'moisture', status: 'inactive', location: 'Garden' },
//   { id: 4, name: 'Humidity Sensor 1', type: 'humidity', status: 'active', location: 'Greenhouse' },
// ];

const mockDevices: Device[] = [
  {
    deviceId: "123",
    deviceName: "Sample Device",
    deviceType: "Sensor",
    sensors: [
      {
        name: "sensor 1",
        type: "Temperature",
        unit: "Celsius",
        deviceId: "123",
      },
      { name: "sensor 2", type: "Humidity", unit: "g/kg", deviceId: "123" },
    ],
    zone: "Zone A",
    location: "Room 101",
    status: "active",
    users: [
      { id: "usr1", name: "Amy", role: "Supervisor" },
      { id: "usr2", name: "Joe", role: "Supervisor" },
      { id: "usr3", name: "Fin", role: "Operator" },
      { id: "usr4", name: "Agae", role: "Operator" },
    ],
  },
  {
    deviceId: "124",
    deviceName: "Outdoor Sensor",
    deviceType: "Sensor",
    sensors: [
      { name: "sensor 3", type: "Moisture", unit: "%", deviceId: "124" },
      { name: "sensor 4", type: "Light", unit: "lux", deviceId: "124" },
    ],
    zone: "Zone B",
    location: "Garden",
    status: "inactive",
    users: [
      { id: "usr5", name: "Lily", role: "Supervisor" },
      { id: "usr6", name: "David", role: "Operator" },
    ],
  },
  {
    deviceId: "125",
    deviceName: "Pressure Monitor",
    deviceType: "Monitor",
    sensors: [
      { name: "sensor 5", type: "Pressure", unit: "Psi", deviceId: "125" },
    ],
    zone: "Zone C",
    location: "Factory Floor",
    status: "active",
    users: [
      { id: "usr7", name: "Mia", role: "Supervisor" },
      { id: "usr8", name: "Tom", role: "Operator" },
    ],
  },
  {
    deviceId: "126",
    deviceName: "Humidity Detector",
    deviceType: "Sensor",
    sensors: [
      { name: "sensor 6", type: "Humidity", unit: "%", deviceId: "126" },
    ],
    zone: "Zone D",
    location: "Warehouse",
    status: "active",
    users: [
      { id: "usr9", name: "John", role: "Supervisor" },
      { id: "usr10", name: "Eve", role: "Operator" },
    ],
  },
];

// Mock data for device locations
const deviceLocations = [
  {
    id: 1,
    name: "Temperature Sensors Group",
    location: [1.3521, 103.8198],
    type: "temperature",
  },
  {
    id: 2,
    name: "Pressure Sensors Group",
    location: [1.3621, 103.8298],
    type: "pressure",
  },
  {
    id: 3,
    name: "Moisture Sensors Group",
    location: [1.3721, 103.8398],
    type: "moisture",
  },
  {
    id: 4,
    name: "Humidity Sensors Group",
    location: [1.3821, 103.8498],
    type: "humidity",
  },
];

// Custom icon for the markers
const icon = L.icon({
  iconUrl: "https://leafletjs.com/examples/custom-icons/leaf-green.png",
  shadowUrl: "https://leafletjs.com/examples/custom-icons/leaf-shadow.png",
  iconSize: [38, 95],
  shadowSize: [50, 64],
  iconAnchor: [22, 94],
  shadowAnchor: [4, 62],
  popupAnchor: [-3, -76],
});

const Dashboard: React.FC = () => {
  const [devices, setDevices] = useState<Device[]>(mockDevices);

  return (
    <div className="p-4">
      {/* <h1 className="text-3xl font-bold mb-6">IoT Dashboard</h1>
       */}

      <div className="grid grid-cols-1 gap-6 mb-6">
        {/* Geographical Map */}
        <div className="bg-white shadow-md rounded p-4">
          <h2 className="text-xl font-semibold mb-4">Device Locations</h2>
          <MapContainer
            center={[1.3521, 103.8198]}
            zoom={12}
            style={{ height: "400px", width: "100%" }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {deviceLocations.map((device) => (
              <Marker
                key={device.id}
                position={device.location as [number, number]}
                icon={icon}
              >
                <Popup>
                  <strong>{device.name}</strong>
                  <br />
                  Type: {device.type}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>

      {/* Device List and Status */}
      <div className="bg-white shadow-md rounded p-4">
        <h2 className="text-xl font-semibold mb-4">Device List and Status</h2>
        <DeviceList devices={devices} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Line Chart */}
        {/* <div className="bg-white shadow-md rounded p-4">
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
        </div> */}

        {/* Gauges */}
        {/* <div className="bg-white shadow-md rounded p-4">
          <h2 className="text-xl font-semibold mb-4">Temperature Gauge</h2>
          <GaugeChart id="gauge-chart1" percent={0.5} nrOfLevels={30} colors={['#FF5F6D', '#FFC371']} arcWidth={0.3} />
          <h2 className="text-xl font-semibold mt-6 mb-4">Humidity Gauge</h2>
          <GaugeChart id="gauge-chart2" percent={0.7} nrOfLevels={30} colors={['#6E40AA', '#FF5F6D']} arcWidth={0.3} />
        </div> */}
      </div>
    </div>
  );
};

export default Dashboard;
