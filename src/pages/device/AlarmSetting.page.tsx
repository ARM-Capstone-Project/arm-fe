import React, { useState } from 'react';
import Title from '../../components/Title';
import Table from '../../components/Table';
import { FaTrash } from 'react-icons/fa';

// Generate mock data
const generateMockAlarms = () => {
  const alarms = [];

  for (let i = 1; i <= 10; i++) {
    alarms.push({
      id: i,
      alarmName: `Alarm ${i}`,
      alert: `Alert message for Alarm ${i}`,
      sendVia: 'Email',
      sendTo: 'admin@example.com',
      enabled: i % 2 === 0 ? true : false,
    });
  }

  return alarms;
};

const headers = (
  <tr>
      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
        ID
      </th>
      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
        Alarm Name
      </th>
      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
        Alert
      </th>
      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
        Sent via
      </th>
      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
        Sent to
      </th>
      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
        Enabled
      </th>
      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
        Actions
      </th>
  </tr>
);

const handleDelete = (id: number) => {
  console.log(`Deleted Alarm ID: ${id}`);
};


const AlarmSettings: React.FC = () => {
  const [alarms, setAlarms] = useState(generateMockAlarms());

  const rows = (
    <>
    {alarms.map((alarm) => (
      <tr key={alarm.id}>
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{alarm.id}</td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{alarm.alarmName}</td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{alarm.alert}</td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{alarm.sendVia}</td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{alarm.sendTo}</td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <input
            type="checkbox"
            checked={alarm.enabled}
            onChange={() => {
              const updatedAlarms = alarms.map((a) =>
                a.id === alarm.id ? { ...a, enabled: !a.enabled } : a
              );
              setAlarms(updatedAlarms);
            }}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
          <FaTrash
            className="text-red-500 cursor-pointer"
            onClick={() => handleDelete(alarm.id)}
          />
        </td>
      </tr>
    ))}
    </>
    );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <Title title="Alarm Settings" />
        <button className="bg-blue-500 text-white px-4 py-2 px-2 rounded">
          Add Alarm
        </button>
      </div>

      <Table headers={headers} rows={rows} />
    </div>
  );
};

export default AlarmSettings;
