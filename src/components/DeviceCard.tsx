// src/components/DeviceCard.tsx
import React from 'react'

interface DeviceCardProps {
  deviceName: string;
  status: string;
}

const DeviceCard: React.FC<DeviceCardProps> = ({ deviceName, status }) => {
  return (
    <div className="bg-white shadow-md rounded p-4 m-4">
      <h2 className="text-xl font-semibold">{deviceName}</h2>
      <p className={`mt-2 ${status === 'Online' ? 'text-green-500' : 'text-red-500'}`}>
        Status: {status}
      </p>
    </div>
  );
}

export default DeviceCard;
