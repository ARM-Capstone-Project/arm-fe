// src/components/AlertList.tsx

import React from 'react';
import Table from './Table';

interface Alert {
  id: number;
  name: string;
  description: string;
  timestamp: string;
}

interface AlertListProps {
  alerts: Alert[];
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
      Description
    </th>
    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
      Timestamp
    </th>
  </tr>
);

const rows = (alerts: Alert[]) => (
  <>
    {alerts.map(alert => (
      <tr key={alert.id}>
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
          {alert.id}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {alert.name}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {alert.description}
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          {alert.timestamp}
        </td>
      </tr>
    ))}
  </>
);

const AlertList: React.FC<AlertListProps> = ({ alerts }) => {
  return (
    <Table headers={headers} rows={rows(alerts)} />
  );
};

export default AlertList;
