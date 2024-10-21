// DeviceComponent.tsx
import React from 'react'
import { Device } from './interfaces/DeviceInterfaces'
import SensorComponent from './SensorComponent.page'

interface DeviceProps {
  device: Device
}

const DeviceComponent: React.FC<DeviceProps> = ({ device }) => {
  return (
    <div className="p-6 border rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold mb-4">Device</h1>
      <p className="text-lg text-gray-800 mb-2">
        <strong>ID:</strong> {device.id}
      </p>
      <p className="text-lg text-gray-800 mb-4">
        <strong>Device ID:</strong> {device.deviceId}
      </p>
      <div>
        {device.sensors.map((sensor) => (
          <SensorComponent key={sensor.id} sensor={sensor} />
        ))}
      </div>
    </div>
  )
}

export default DeviceComponent
