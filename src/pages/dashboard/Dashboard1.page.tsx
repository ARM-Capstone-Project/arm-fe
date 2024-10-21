// src/components/Dashboard.tsx
import React from 'react'
import DeviceCard from '../../components/DeviceCard.tsx'

const Dashboard: React.FC = () => {
  const devices = [
    { name: 'Temperature Sensor', status: 'Online' },
    { name: 'Humidity Sensor', status: 'Offline' },
    { name: 'Light Sensor', status: 'Online' },
    { name: 'Motion Detector', status: 'Online' },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {devices.map((device, index) => (
        <DeviceCard key={index} deviceName={device.name} status={device.status} />
      ))}
    </div>
  )
}

export default Dashboard
