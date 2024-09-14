import React from 'react';
import { Device } from '../types/device';

interface DeviceListProps {
  devices: Device[];
  onEdit: (deviceId: string) => void;
  onView: (deviceId: string) => void;
  onRemove: (deviceId: string) => void;
}

const DeviceList: React.FC<DeviceListProps> = ({ devices, onEdit, onView, onRemove }) => {
  return (
    <table className="min-w-full bg-white border-collapse">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b border-gray-200">ID</th>
          <th className="py-2 px-4 border-b border-gray-200">Name</th>
          <th className="py-2 px-4 border-b border-gray-200">Type</th>
          <th className="py-2 px-4 border-b border-gray-200">Status</th>
          <th className="py-2 px-4 border-b border-gray-200">Location</th>
          <th className="py-2 px-4 border-b border-gray-200">Actions</th>
        </tr>
      </thead>
      <tbody>
        {devices.map(device => (
          <tr key={device.deviceId}>
            <td className="py-2 px-4 border-b border-gray-200">{device.deviceId}</td>
            <td className="py-2 px-4 border-b border-gray-200">{device.deviceName}</td>
            <td className="py-2 px-4 border-b border-gray-200">{device.deviceType}</td>
            <td className={`py-2 px-4 border-b border-gray-200 ${device.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>
              {device.status}
            </td>
            <td className="py-2 px-4 border-b border-gray-200">{device.location}</td>
            <td className="py-2 px-4 border-b border-gray-200 flex gap-2">
              <button 
                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600" 
                onClick={() => onView(device.deviceId)}
              >
                View
              </button>
              <button 
                className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600" 
                onClick={() => onEdit(device.deviceId)}
              >
                Edit
              </button>
              <button 
                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600" 
                onClick={() => onRemove(device.deviceId)}
              >
                Remove
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DeviceList;
