// DevicePage.tsx
import React, { useEffect, useState } from 'react';
import { Device } from './interfaces/DeviceInterfaces';
import NewDevicePopup from './NewDevicePopup';
import DeviceComponent from './DeviceComponent.page';

const fetchDevice = async (): Promise<Device> => {
  // Replace with your data fetching logic
  return {
    id: 'device1',
    deviceId: '12345',
    sensors: [
      { id: "sensor1", name: "sensor 1", type: "Temperature", unit: "Celsius", deviceId: "dev1", sensorId: "sen1", rawDataList: [] },
      { id: "sensor2", name: "sensor 2", type: "Humidity", unit: "g/kg", deviceId: "dev1", sensorId: "sen2", rawDataList: [] }
    ],
  };
};

const DevicePage: React.FC = () => {
  const [device, setDevice] = useState<Device | null>(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    const loadDevice = async () => {
      const deviceData = await fetchDevice();
      setDevice(deviceData);
    };

    loadDevice();
  }, []);

  const handleOpenPopup = () => setIsPopupOpen(true);
  const handleClosePopup = () => setIsPopupOpen(false);

  const handleSubmitNewDevice = (deviceData: Device) => {
    // Implement the logic to handle new device submission
    console.log('New Device Data:', deviceData);
    // You can also update the state or make an API call to save the device
  };

  if (!device) return <p className="text-center text-lg text-gray-700">Loading...</p>;

  return (
    <div className="container mx-auto p-4">
      <DeviceComponent device={device} />
      <button
        onClick={handleOpenPopup}
        className="mt-4 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
      >
        Add New Device
      </button>
      <NewDevicePopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        onSubmit={handleSubmitNewDevice}
      />
    </div>
  );
};

export default DevicePage;
