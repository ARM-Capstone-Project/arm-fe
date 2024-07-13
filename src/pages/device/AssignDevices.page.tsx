import React, { useState } from 'react';

const operators = [
  { id: 3, name: 'Bob Johnson', role: 'Operator' },
];

const devices = [
  { id: 1, name: 'Temperature Sensor' },
  { id: 2, name: 'Pressure Sensor' },
  { id: 3, name: 'Moisture Sensor' },
  { id: 4, name: 'Humidity Sensor' },
];

const AssignDevices: React.FC = () => {
  const [selectedOperator, setSelectedOperator] = useState('');
  const [selectedDevices, setSelectedDevices] = useState<number[]>([]);

  const handleAssignDevices = () => {
    // Handle device assignment logic here
    console.log('Devices Assigned:', { selectedOperator, selectedDevices });
  };

  const toggleDeviceSelection = (deviceId: number) => {
    setSelectedDevices((prevSelected) =>
      prevSelected.includes(deviceId)
        ? prevSelected.filter((id) => id !== deviceId)
        : [...prevSelected, deviceId]
    );
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Assign Devices</h2>
      </div>
      <div className="bg-white shadow rounded-lg p-4">
        <div className="mb-4">
          <label className="block text-gray-700">Select Operator</label>
          <select
            value={selectedOperator}
            onChange={(e) => setSelectedOperator(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring focus:ring-opacity-50 focus:ring-blue-300"
          >
            <option value="">Select Operator</option>
            {operators.map((operator) => (
              <option key={operator.id} value={operator.id}>
                {operator.name}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Select Devices</label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {devices.map((device) => (
              <div key={device.id} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedDevices.includes(device.id)}
                  onChange={() => toggleDeviceSelection(device.id)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2">{device.name}</span>
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={handleAssignDevices}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Assign Devices
        </button>
      </div>
    </div>
  );
};

export default AssignDevices;
