// RawDataComponent.tsx
import React from 'react'
import { RawData } from './interfaces/DeviceInterfaces'

interface RawDataProps {
  data: RawData
}

const RawDataComponent: React.FC<RawDataProps> = ({ data }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md mb-4 bg-white">
      <h3 className="text-lg font-semibold mb-2">Raw Data</h3>
      <p className="text-sm text-gray-700">
        <strong>ID:</strong> {data.id}
      </p>
      <p className="text-sm text-gray-700">
        <strong>Name:</strong> {data.rawName}
      </p>
      <p className="text-sm text-gray-700">
        <strong>Unit:</strong> {data.unitOfMeasurement}
      </p>
    </div>
  )
}

export default RawDataComponent
