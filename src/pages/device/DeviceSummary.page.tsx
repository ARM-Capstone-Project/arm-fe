import React, { useEffect, useState } from 'react'
import DeviceIcons from '../../components/DeviceIcons'
import Submenu from '../../components/Submenu'
import AlarmSetting from './AlarmSetting.page'
import DeviceMap from './DeviceMap.page'
import DevicesList from './DevicesList.page'
import { useSearchParams } from 'react-router-dom'
import CreateDevice from '../../components/CreateDevice'
import DeviceCharts from './charts/DeviceCharts.page'

// Mock data for devices and their live status
const mockDevices = [
  { id: 'DHT22-001', name: 'Temperature/Humidity', type: 'temperature', location: 'Alco' },
  { id: 'ac11-0856', name: 'Methane Detector', type: 'pressure', location: 'Alco' },
]

const Device: React.FC = () => {
  const [searchParams] = useSearchParams()
  const [selectedSection, setSelectedSection] = useState<string>(
    searchParams.get('section') || 'liveData',
  )
  const [selectedDeviceId, setSelectedDeviceId] = useState<string>(mockDevices[0].id) // Default to the first device

  const handleSelect = (section: string) => {
    setSelectedSection(section)
  }

  useEffect(() => {
    const section = searchParams.get('section')
    if (section) {
      setSelectedSection(section)
    }
  }, [searchParams])

  const handleDeviceSelect = (id: string) => {
    setSelectedDeviceId(id)
  }

  const renderContent = () => {
    switch (selectedSection) {
      case 'liveData':
        return (
          <div>
            <DeviceCharts deviceId={selectedDeviceId} />
          </div>
        ) // Pass the selected device ID
      case 'deviceslist':
        return (
          <div>
            <DevicesList />
          </div>
        )
      case 'showMap':
        return (
          <div>
            <DeviceMap />
          </div>
        )
      case 'alarmSetting':
        return (
          <div>
            <AlarmSetting />
          </div>
        )
      case 'showActions':
        return (
          <div>
            <CreateDevice />
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="p-4 text-black">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-rose-600">View Devices</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mockDevices.map((device) => (
          <div
            key={device.id}
            className="bg-white shadow-md rounded p-4 cursor-pointer"
            onClick={() => handleDeviceSelect(device.id)} // Set selected device ID on click
          >
            <DeviceIcons
              type={device.type as 'temperature' | 'pressure' | 'moisture' | 'humidity'}
            />
            <h3 className="text-xl font-semibold mt-2">{device.name}</h3>
            <h3 className="text-xl font-semibold mt-2">{device.id} </h3>
            <p className="text-gray-500">Zone: {device.location}</p>
          </div>
        ))}
      </div>
      <Submenu onSelect={handleSelect} />
      <div className="mt-4 text-black">{renderContent()}</div>
    </div>
  )
}

export default Device
