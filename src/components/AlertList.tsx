// src/components/AlertList.tsx

import React from 'react';

interface Alert {
  id: number;
  name: string;
  description: string;
  timestamp: string;
}

interface AlertListProps {
  alerts: Alert[];
}

const AlertList: React.FC<AlertListProps> = ({ alerts }) => {
  return (
    <table className="min-w-full bg-white">
      <thead>
        <tr>
          <th className="py-2 px-4 border-b border-gray-200">ID</th>
          <th className="py-2 px-4 border-b border-gray-200">Name</th>
          <th className="py-2 px-4 border-b border-gray-200">Description</th>
          <th className="py-2 px-4 border-b border-gray-200">Timestamp</th>
        </tr>
      </thead>
      <tbody>
        {alerts.map(alert => (
          <tr key={alert.id}>
            <td className="py-2 px-4 border-b border-gray-200">{alert.id}</td>
            <td className="py-2 px-4 border-b border-gray-200">{alert.name}</td>
            <td className="py-2 px-4 border-b border-gray-200">{alert.description}</td>
            <td className="py-2 px-4 border-b border-gray-200">{alert.timestamp}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AlertList;
