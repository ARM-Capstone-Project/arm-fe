// NewDevicePopup.tsx
import React, { useState } from 'react';
import { Device, Sensor, RawData } from './interfaces/DeviceInterfaces';

interface NewDevicePopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (deviceData: Device) => void;
}

const NewDevicePopup: React.FC<NewDevicePopupProps> = ({ isOpen, onClose, onSubmit }) => {
  const [deviceId, setDeviceId] = useState('');
  const [sensors, setSensors] = useState<Sensor[]>([{
    id: '', sensorId: '', rawDataList: [],
    name: '',
    type: '',
    unit: '',
    deviceId: ''
  }]);

  const handleAddSensor = () => {
    setSensors([...sensors, {
      id: '', sensorId: '', rawDataList: [],
      name: '',
      type: '',
      unit: '',
      deviceId: ''
    }]);
  };

  const handleRemoveSensor = (index: number) => {
    setSensors(sensors.filter((_, i) => i !== index));
  };

  const handleSensorChange = (index: number, key: keyof Sensor, value: string) => {
    const updatedSensors = [...sensors];
    updatedSensors[index] = { ...updatedSensors[index], [key]: value };
    setSensors(updatedSensors);
  };

  const handleRawDataChange = (sensorIndex: number, rawDataIndex: number, key: keyof RawData, value: string) => {
    const updatedSensors = [...sensors];
    const updatedRawDataList = [...updatedSensors[sensorIndex].rawDataList];
    updatedRawDataList[rawDataIndex] = { ...updatedRawDataList[rawDataIndex], [key]: value };
    updatedSensors[sensorIndex] = { ...updatedSensors[sensorIndex], rawDataList: updatedRawDataList };
    setSensors(updatedSensors);
  };

  const handleAddRawData = (sensorIndex: number) => {
    const updatedSensors = [...sensors];
    updatedSensors[sensorIndex].rawDataList.push({ id: '', rawName: '', unitOfMeasurement: '' });
    setSensors(updatedSensors);
  };

  const handleRemoveRawData = (sensorIndex: number, rawDataIndex: number) => {
    const updatedSensors = [...sensors];
    updatedSensors[sensorIndex].rawDataList = updatedSensors[sensorIndex].rawDataList.filter((_, i) => i !== rawDataIndex);
    setSensors(updatedSensors);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (deviceId && sensors.length > 0) {
      onSubmit({ id: '', deviceId, sensors });
      setDeviceId('');
      setSensors([{
        id: '', sensorId: '', rawDataList: [],
        name: '',
        type: '',
        unit: '',
        deviceId: ''
      }]);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4">Add New Device</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Device ID</label>
            <input
              type="text"
              value={deviceId}
              onChange={(e) => setDeviceId(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="Enter device ID"
              required
            />
          </div>
          {sensors.map((sensor, sensorIndex) => (
            <div key={sensorIndex} className="mb-4 p-4 border border-gray-300 rounded">
              <h3 className="text-xl font-semibold mb-2">Sensor {sensorIndex + 1}</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Sensor ID</label>
                <input
                  type="text"
                  value={sensor.sensorId}
                  onChange={(e) => handleSensorChange(sensorIndex, 'sensorId', e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Enter sensor ID"
                  required
                />
              </div>
              <button
                type="button"
                onClick={() => handleAddRawData(sensorIndex)}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Add Raw Data
              </button>
              {sensor.rawDataList.map((rawData, rawDataIndex) => (
                <div key={rawDataIndex} className="mb-4 p-4 border border-gray-300 rounded">
                  <h4 className="text-lg font-semibold mb-2">Raw Data {rawDataIndex + 1}</h4>
                  <div className="mb-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Raw Name</label>
                    <input
                      type="text"
                      value={rawData.rawName}
                      onChange={(e) => handleRawDataChange(sensorIndex, rawDataIndex, 'rawName', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="Enter raw name"
                      required
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Unit of Measurement</label>
                    <input
                      type="text"
                      value={rawData.unitOfMeasurement}
                      onChange={(e) => handleRawDataChange(sensorIndex, rawDataIndex, 'unitOfMeasurement', e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded"
                      placeholder="Enter unit of measurement"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveRawData(sensorIndex, rawDataIndex)}
                    className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    Remove Raw Data
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleRemoveSensor(sensorIndex)}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
              >
                Remove Sensor
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddSensor}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Add Sensor
          </button>
          <div className="mt-4">
            <button
              type="submit"
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Save Device
            </button>
            <button
              type="button"
              onClick={onClose}
              className="ml-4 bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewDevicePopup;
