// SensorComponent.tsx
import React from 'react';
import { Sensor } from './interfaces/DeviceInterfaces';
import RawDataComponent from './RawDataComponent.page';

interface SensorProps {
  sensor: Sensor;
}

const SensorComponent: React.FC<SensorProps> = ({ sensor }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md mb-4 bg-gray-50">
      <h2 className="text-xl font-semibold mb-2">Sensor</h2>
      <p className="text-sm text-gray-700"><strong>ID:</strong> {sensor.id}</p>
      <p className="text-sm text-gray-700"><strong>Sensor ID:</strong> {sensor.sensorId}</p>
      <div className="mt-4">
        {sensor.rawDataList.map(rawData => (
          <RawDataComponent key={rawData.id} data={rawData} />
        ))}
      </div>
    </div>
  );
};

export default SensorComponent;
