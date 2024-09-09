//import React, { useState, useCallback } from 'react';
import React, { useState } from 'react';
import QueryBuilder from './QueryBuilder';
import SensorReadingList from './ThresholdListing.page';
import SensorReading from './interfaces/SensorReading';


const readings: SensorReading[] = [
  {
    deviceId: "a",
    sensorId: "b",
    reading: "temperature",
    condition: "(reading >= 40 && reading <= 50)",
    email: "your_notification_email@example.com",
    level: "warning",
    unit: "celsius",
  },

];



const AlarmSettings: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newThreshold, setNewThreshold] = useState({
    deviceId: '',
    sensorId: '',
    level: '',
    reading: '',
    email: '',
  });



  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewThreshold({
      ...newThreshold,
      [e.target.name]: e.target.value
    });
  };

  const handleAddThreshold = () => {
    // Here you would typically update the state or call an API to save the new threshold
    console.log('New Threshold:', newThreshold);
    setIsModalOpen(false);
  };


  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Threshold Settings</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Threshold
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
      <SensorReadingList readings={readings} />
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
                value={newThreshold.deviceId}
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
                value={newThreshold.sensorId}
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
                value={newThreshold.reading}
                onChange={handleInputChange} // Add this line
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select Reading</option>
                <option value="temperature">Temperature</option> {/* Fixed option value */}
                <option value="humidity">Humidity</option> {/* Fixed option value */}
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="level">
                Level
              </label>
              <select
                id="level"
                name="level"
                value={newThreshold.level}
                onChange={handleInputChange} // Add this line
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select Level</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
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
                value={newThreshold.email}
                onChange={handleInputChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />

            </div>
            <QueryBuilder></QueryBuilder>
            <div>

            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleAddThreshold}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Add Threshold
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default AlarmSettings;
