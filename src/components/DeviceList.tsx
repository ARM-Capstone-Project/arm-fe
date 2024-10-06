// src/components/DeviceList.tsx

import React from 'react';
import Table from './Table';

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

const headers = (
  <tr>
    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
      ID
    </th>
    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
      Name
    </th>
    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
      Type
    </th>
    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
      Status
    </th>
    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
      Location
    </th>
  </tr>
);

const generateRows = (devices: Device[]) => (
  <>
    {devices.map(device => (
      <tr key={device.id}>
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
          {device.id}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {device.name}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {device.type}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm">
          <span
            className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${
              device.status === 'active'
                ? 'bg-green-50 text-green-700 ring-green-600/20'
                : 'bg-red-50 text-red-700 ring-red-600/20'
            }`}
          >
            {device.status}
          </span>
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {device.location}
        </td>
      </tr>
    ))}
  </>
);

const DeviceList: React.FC<DeviceListProps> = ({ devices }) => {
  return (
    <Table headers={headers} rows={generateRows(devices)} />
  );
};

export default DeviceList;
