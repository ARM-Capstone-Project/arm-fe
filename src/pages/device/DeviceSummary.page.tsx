import React, { useEffect, useState } from 'react';
import DeviceIcons from '../../components/DeviceIcons';
import Submenu from '../../components/Submenu';
import LiveStatusChart from '../../components/LiveStatusChart';
import AlarmSetting from './AlarmSetting.page';
import DeviceMap from './DeviceMap.page';
import DevicePage from './DevicePage.page';
import DevicesList from './DevicesList.page';
import { useSearchParams } from 'react-router-dom';
import CreateDevice from '../../components/CreateDevice';

// Mock data for devices and their live status
const mockDevices = [
    { id: 1, name: 'Temperature Sensor', type: 'temperature', location: 'Room A' },
    { id: 2, name: 'Pressure Sensor', type: 'pressure', location: 'Room B' },
    { id: 3, name: 'Moisture Sensor', type: 'moisture', location: 'Garden' },
    { id: 4, name: 'Humidity Sensor', type: 'humidity', location: 'Greenhouse' },
  ];
  
// Mock data for devices and their live status
const mockLiveData = [
    { time: new Date('2024-07-15T12:00:00Z').getTime(), temperature: 25 },
    { time: new Date('2024-07-15T12:15:00Z').getTime(), temperature: 27 },
    { time: new Date('2024-07-15T12:30:00Z').getTime(), temperature: 26 },
    { time: new Date('2024-07-15T12:45:00Z').getTime(), temperature: 24 },
    { time: new Date('2024-07-15T13:00:00Z').getTime(), temperature: 23 },
    { time: new Date('2024-07-15T13:15:00Z').getTime(), temperature: 22 },
    { time: new Date('2024-07-15T13:30:00Z').getTime(), temperature: 21 },
    { time: new Date('2024-07-15T13:45:00Z').getTime(), temperature: 20 },
  ];

// Mock data for devices and their live status
const mockLiveDataTemperature = [
    { time: new Date('2024-07-15T12:00:00Z').getTime(), temperature: 25 },
    { time: new Date('2024-07-15T12:15:00Z').getTime(), temperature: 27 },
    { time: new Date('2024-07-15T12:30:00Z').getTime(), temperature: 26 },
    { time: new Date('2024-07-15T12:45:00Z').getTime(), temperature: 24 },
    { time: new Date('2024-07-15T13:00:00Z').getTime(), temperature: 23 },
    { time: new Date('2024-07-15T13:15:00Z').getTime(), temperature: 22 },
    { time: new Date('2024-07-15T13:30:00Z').getTime(), temperature: 21 },
    { time: new Date('2024-07-15T13:45:00Z').getTime(), temperature: 20 },
  ];
  
  const mockLiveDataMoisture = [
    { time: new Date('2024-07-15T12:00:00Z').getTime(), moisture: 60 },
    { time: new Date('2024-07-15T12:15:00Z').getTime(), moisture: 75 },
    { time: new Date('2024-07-15T12:30:00Z').getTime(), moisture: 50 },
    { time: new Date('2024-07-15T12:45:00Z').getTime(), moisture: 45 },
    { time: new Date('2024-07-15T13:00:00Z').getTime(), moisture: 40 },
    { time: new Date('2024-07-15T13:15:00Z').getTime(), moisture: 85 },
    { time: new Date('2024-07-15T13:30:00Z').getTime(), moisture: 30 },
    { time: new Date('2024-07-15T13:45:00Z').getTime(), moisture: 25 },
  ];

  // Mock data for pressure sensor
const mockLiveDataPressure = [
    { time: new Date('2024-07-15T12:00:00Z').getTime(), pressure: 30 },
    { time: new Date('2024-07-15T12:15:00Z').getTime(), pressure: 220 },
    { time: new Date('2024-07-15T12:30:00Z').getTime(), pressure: 50 },
    { time: new Date('2024-07-15T12:45:00Z').getTime(), pressure: 120 },
    { time: new Date('2024-07-15T13:00:00Z').getTime(), pressure: 60 },
    { time: new Date('2024-07-15T13:15:00Z').getTime(), pressure: 80 },
    { time: new Date('2024-07-15T13:30:00Z').getTime(), pressure: 40 },
    { time: new Date('2024-07-15T13:45:00Z').getTime(), pressure: 120 },
  ];
  
  // Mock data for humidity sensor
  const mockLiveDataHumidity = [
    { time: new Date('2024-07-15T12:00:00Z').getTime(), humidity: 50 },
    { time: new Date('2024-07-15T12:15:00Z').getTime(), humidity: 65 },
    { time: new Date('2024-07-15T12:30:00Z').getTime(), humidity: 62 },
    { time: new Date('2024-07-15T12:45:00Z').getTime(), humidity: 75 },
    { time: new Date('2024-07-15T13:00:00Z').getTime(), humidity: 65 },
    { time: new Date('2024-07-15T13:15:00Z').getTime(), humidity: 50 },
    { time: new Date('2024-07-15T13:30:00Z').getTime(), humidity: 57 },
    { time: new Date('2024-07-15T13:45:00Z').getTime(), humidity: 68 },
  ];

const Device: React.FC = () => {
  //updated to navigate after device update
    const [searchParams] = useSearchParams();
    const [selectedSection, setSelectedSection] = useState<string>(searchParams.get('section') || 'liveData');

    const handleSelect = (section: string) => {
        setSelectedSection(section);
      };

      useEffect(() => {
        // Update the active section based on URL query parameter when the page loads
        const section = searchParams.get('section');
      if (section) {
        setSelectedSection(section);
      }
    }, [searchParams]);

    const renderContent = () => {
        switch (selectedSection) {
          case 'liveData':
            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="w-full sm:w-full">
                  <LiveStatusChart
                    data={mockLiveDataTemperature}
                    dataKey="temperature"
                    yAxisLabel="Temperature (°F)"
                    strokeColor="#BE123C"
                    yAxisDomain={[-10, 40]}
                  />
                </div>
                <div className="w-full sm:w-full">
                  <LiveStatusChart
                    data={mockLiveDataMoisture}
                    dataKey="moisture"
                    yAxisLabel="Moisture (%)"
                    strokeColor="#3182CE"
                    yAxisDomain={[0, 100]}
                  />
                </div>
                <div className="w-full sm:w-full">
                  <LiveStatusChart
                    data={mockLiveDataPressure}
                    dataKey="pressure"
                    yAxisLabel="Pressure (Psi)"
                    strokeColor="#E27108"
                    yAxisDomain={[0, 40]}
                  />
                </div>
                <div className="w-full sm:w-full">
                  <LiveStatusChart
                    data={mockLiveDataHumidity}
                    dataKey="humidity"
                    yAxisLabel="Humidity (%)"
                    strokeColor="#7209DB"
                    yAxisDomain={[0, 100]}
                  />
                </div>
              </div>
            );
          case 'deviceslist':
            return<div><DevicesList /></div>
          case 'showMap':
            return <div><DeviceMap /></div>;
          case 'alarmSetting':
            return <div><AlarmSetting /></div>;
         case 'showActions' : 
         return <div><CreateDevice /></div>;
          default:
            return null;
        }
      };

  return (
    <div className="p-4 text-black">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-rose-600">View Devices</h2>
        {/* Any additional header content */}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Example devices */}
        <div className="bg-white shadow-md rounded p-4">
          <DeviceIcons type="temperature" />
          <h3 className="text-xl font-semibold mt-2">Temperature Sensor</h3>
          <p className="text-gray-500">Location: Room A</p>
        </div>
        <div className="bg-white shadow-md rounded p-4">
          <DeviceIcons type="pressure" />
          <h3 className="text-xl font-semibold mt-2">Pressure Sensor</h3>
          <p className="text-gray-500">Location: Room B</p>
        </div>
        <div className="bg-white shadow-md rounded p-4">
          <DeviceIcons type="moisture" />
          <h3 className="text-xl font-semibold mt-2">Moisture Sensor</h3>
          <p className="text-gray-500">Location: Garden</p>
        </div>
        <div className="bg-white shadow-md rounded p-4">
          <DeviceIcons type="humidity" />
          <h3 className="text-xl font-semibold mt-2">Humidity Sensor</h3>
          <p className="text-gray-500">Location: Greenhouse</p>
        </div>
      </div>
      <Submenu onSelect={handleSelect} />
      <div className="mt-4 text-black">{renderContent()}</div>
    </div>
  );
}
export default Device;

