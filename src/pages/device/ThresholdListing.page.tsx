import React from 'react';
import ThresholdSetting from './interfaces/ThresholdSetting';

interface ThresholdSettingListProps {
  thresholds: ThresholdSetting[];
  onEdit: (threshold: ThresholdSetting) => void; // New prop for edit function
}

const ThresholdSettingList: React.FC<ThresholdSettingListProps> = ({ thresholds, onEdit }) => {
  return (
    <div className="container mx-auto">
      <table className="table-auto w-full rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 text-left text-gray-600 font-semibold">
            <th className="p-3 hidden">ID</th>
            <th className="p-3">Device ID</th>
            <th className="p-3">Sensor ID</th>
            <th className="p-3">Reading</th>
            <th className="p-3">Condition</th>
            <th className="p-3">Email</th>
            <th className="p-3">Level</th>
            <th className="p-3">Unit</th>
            <th className="p-3">Actions</th> {/* New Actions column */}
          </tr>
        </thead>
        <tbody>
          {thresholds.map((threshold) => (
            <tr key={threshold.id} className="border-b">
              <td className="p-3 hidden">{threshold.id}</td>
              <td className="p-3">{threshold.deviceId}</td>
              <td className="p-3">{threshold.sensorId}</td>
              <td className="p-3">{threshold.reading}</td>
              <td className="p-3">{threshold.condition}</td>
              <td className="p-3">{threshold.email}</td>
              <td className="p-3">{threshold.level}</td>
              <td className="p-3">{threshold.unit}</td>
              <td className="p-3">
                <button
                  onClick={() => onEdit(threshold)} // Trigger edit function
                  className="bg-yellow-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ThresholdSettingList
