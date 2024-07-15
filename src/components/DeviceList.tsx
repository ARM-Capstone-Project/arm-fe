// src/components/DeviceList.tsx

import React from 'react';

interface Device {
  id: number;
  name: string;
  type: string;
  status: string;
  location: string;
}

interface DeviceListProps {
  devices: Device[];
}

const DeviceList: React.FC<DeviceListProps> = ({ devices }) => {
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b border-gray-200">ID</th>
          <th className="py-2 px-4 border-b border-gray-200">Name</th>
          <th className="py-2 px-4 border-b border-gray-200">Type</th>
          <th className="py-2 px-4 border-b border-gray-200">Status</th>
          <th className="py-2 px-4 border-b border-gray-200">Location</th>
        </tr>
      </thead>
      <tbody>
        {devices.map(device => (
          <tr key={device.id}>
            <td className="py-2 px-4 border-b border-gray-200">{device.id}</td>
            <td className="py-2 px-4 border-b border-gray-200">{device.name}</td>
            <td className="py-2 px-4 border-b border-gray-200">{device.type}</td>
            <td className={`py-2 px-4 border-b border-gray-200 ${device.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>
              {device.status}
            </td>
            <td className="py-2 px-4 border-b border-gray-200">{device.location}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DeviceList;
