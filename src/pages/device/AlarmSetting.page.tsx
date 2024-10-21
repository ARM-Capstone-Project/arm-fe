import React, { useState, useEffect } from 'react'
import QueryBuilder from './QueryBuilder'
import { saveThreshold, fetchThresholds } from '../../services/DataService'
import ThresholdSetting from './interfaces/ThresholdSetting'
import ThresholdSettingList from './ThresholdListing.page'

const AlarmSettings: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [currentThreshold, setCurrentThreshold] = useState<ThresholdSetting | null>(null)
  const [newThreshold, setNewThreshold] = useState<ThresholdSetting>({
    id: '',
    deviceId: '',
    sensorId: '',
    reading: 'temperature',
    condition: '',
    email: '',
    level: 'caution',
    unit: 'celsius',
  })
  const [thresholds, setThresholds] = useState<ThresholdSetting[]>([])
  useEffect(() => {
    const loadThresholds = async () => {
      try {
        const fetchedThresholds = await fetchThresholds()
        setThresholds(fetchedThresholds)
      } catch (error) {
        console.error('Failed to fetch thresholds:', error)
      }
    }

    loadThresholds()
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (isEditing && currentThreshold) {
      setCurrentThreshold({
        ...currentThreshold,
        [e.target.name]: e.target.value,
      })
    } else {
      setNewThreshold({
        ...newThreshold,
        [e.target.name]: e.target.value,
      })
    }
  }

  const handleConditionChange = (condition: string) => {
    if (isEditing && currentThreshold) {
      setCurrentThreshold((prev) => ({
        ...prev!,
        condition,
      }))
    } else {
      setNewThreshold((prev) => ({
        ...prev,
        condition,
      }))
    }
  }

  const handleAddOrEditThreshold = async () => {
    if (isEditing && currentThreshold) {
      const updatedThreshold = { ...currentThreshold }
      try {
        await saveThreshold(updatedThreshold)
        setThresholds((prev) =>
          prev.map((threshold) =>
            threshold.id === updatedThreshold.id ? updatedThreshold : threshold,
          ),
        )
        setIsModalOpen(false)
        setCurrentThreshold(null)
      } catch (error) {
        console.error('Failed to update threshold', error)
      }
    } else {
      console.log('New Threshold:', newThreshold)
      try {
        await saveThreshold(newThreshold)
        setThresholds((prev) => [...prev, newThreshold])
        setIsModalOpen(false)
        setNewThreshold({
          id: '',
          deviceId: '',
          sensorId: '',
          reading: 'temperature',
          condition: '',
          email: '',
          level: 'caution',
          unit: 'celsius',
        })
      } catch (error) {
        console.error('Failed to add threshold', error)
      }
    }
  }

  const handleEditThreshold = (threshold: ThresholdSetting) => {
    setCurrentThreshold(threshold)
    setIsEditing(true)
    setNewThreshold(threshold) // Populate newThreshold with the current threshold
    setIsModalOpen(true)
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Threshold Settings</h2>
        <button
          onClick={() => {
            setIsModalOpen(true)
            setIsEditing(false)
            setNewThreshold({
              id: '',
              deviceId: '',
              sensorId: '',
              reading: 'temperature',
              condition: '',
              email: '',
              level: 'caution',
              unit: 'celsius',
            }) // Reset for adding new threshold
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Threshold
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <ThresholdSettingList thresholds={thresholds} onEdit={handleEditThreshold} />
      </div>
      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-2/3 max-w-2xl">
            <h3 className="text-2xl font-bold mb-4">Add New Threshold</h3>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="deviceId">
                Device Id
              </label>
              <input
                id="deviceId"
                name="deviceId"
                type="text"
                value={
                  isEditing && currentThreshold ? currentThreshold.deviceId : newThreshold.deviceId
                }
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="sensorId">
                Sensor Id
              </label>
              <input
                id="sensorId"
                name="sensorId"
                type="text"
                value={
                  isEditing && currentThreshold ? currentThreshold.sensorId : newThreshold.sensorId
                }
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="reading">
                Reading
              </label>
              <select
                id="reading"
                name="reading"
                value={
                  isEditing && currentThreshold ? currentThreshold.reading : newThreshold.reading
                }
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select Reading</option>
                <option value="temperature">temperature</option>
                <option value="humidity">humidity</option>
                <option value="methane">methane</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="level">
                Level
              </label>
              <select
                id="level"
                name="level"
                value={isEditing && currentThreshold ? currentThreshold.level : newThreshold.level}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select Level</option>
                <option value="caution">caution</option>
                <option value="critical">critical</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="text"
                value={isEditing && currentThreshold ? currentThreshold.email : newThreshold.email}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="unit">
                Unit
              </label>
              <input
                id="unit"
                name="unit"
                type="text"
                value={isEditing && currentThreshold ? currentThreshold.unit : newThreshold.unit}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <QueryBuilder onConditionChange={handleConditionChange} />
            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleAddOrEditThreshold}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                {isEditing ? 'Save Changes' : 'Add Threshold'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AlarmSettings
