import React, { useState } from 'react';

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

const AlarmSettings: React.FC = () => {
  const [alarms, setAlarms] = useState(generateMockAlarms());

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">Alarm Settings</h2>
        <button className="bg-blue-500 text-white px-4 py-2 px-2 rounded">
          Add Alarm
        </button>
      </div>

      <div className="bg-white shadow rounded-lg p-4">
        <table className="min-w-full bg-white border-collapse border border-slate-300">
          <thead>
            <tr>
              <th className="py-2 px-2 border border-slate-200">ID</th>
              <th className="py-2 px-2 border border-slate-200">Alarm Name</th>
              <th className="py-2 px-2 border border-slate-200">Alert</th>
              <th className="py-2 px-2 border border-slate-200">Send Via</th>
              <th className="py-2 px-2 border border-slate-200">Send To</th>
              <th className="py-2 px-2 border border-slate-200">Enabled</th>
              <th className="py-2 px-2 border border-slate-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {alarms.map((alarm) => (
              <tr key={alarm.id}>
                <td className="py-2 px-2 border border-slate-200">{alarm.id}</td>
                <td className="py-2 px-2 border border-slate-200">{alarm.alarmName}</td>
                <td className="py-2 px-2 border border-slate-200">{alarm.alert}</td>
                <td className="py-2 px-2 border border-slate-200">{alarm.sendVia}</td>
                <td className="py-2 px-2 border border-slate-200">{alarm.sendTo}</td>
                <td className="py-2 px-2 border border-slate-200">
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
                <td className="py-2  px-2 border border-slate-200">
                  <button className=" text-red-500 rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AlarmSettings;
