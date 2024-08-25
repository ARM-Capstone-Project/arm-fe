import React from 'react';

const Listing: React.FC = () => {
  const deviceData = [
    {
      deviceId: "device1",
      sensorId: "dht22",
      type: "temperature",
      unit: "celsius",
      thresholds: [
        {
          level: "low",
          min: 5,
          max: 10,
          notificationEmail: "myapwintcho@gmail.com"
        },
        {
          level: "medium",
          min: 10,
          max: 20,
          notificationEmail: "myapwintcho@gmail.com"
        },
        {
          level: "high",
          min: 20,
          max: 30,
          notificationEmail: "myapwintcho@gmail.com"
        }
      ]
    },
    {
      deviceId: "device2",
      type: "methane",
      unit: "ppm",
      thresholds: [
        {
          level: "low",
          min: 5,
          max: 10,
          notificationEmail: "myapwintcho@gmail.com"
        },
        {
          level: "medium",
          min: 10,
          max: 20,
          notificationEmail: "myapwintcho@gmail.com"
        },
        {
          level: "high",
          min: 20,
          max: 30,
          notificationEmail: "myapwintcho@gmail.com"
        }
      ]
    }
  ];

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {deviceData.map((device, index) => (
        <div key={index} className="bg-white shadow rounded-lg p-6 mb-6">
          <h3 className="text-2xl font-bold mb-4">Device ID: {device.deviceId}</h3>
          <p><strong>Sensor ID:</strong> {device.sensorId}</p>
          <p><strong>Type:</strong> {device.type}</p>
          <p><strong>Unit:</strong> {device.unit}</p>

          <h4 className="text-xl font-bold mt-4 mb-2">Thresholds</h4>
          <table className="min-w-full bg-white border-collapse border border-slate-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border border-slate-200">Level</th>
                <th className="py-2 px-4 border border-slate-200">Min Value</th>
                <th className="py-2 px-4 border border-slate-200">Max Value</th>
                <th className="py-2 px-4 border border-slate-200">Notification Email</th>
              </tr>
            </thead>
            <tbody>
              {device.thresholds.map((threshold, idx) => (
                <tr key={idx}>
                  <td className="py-2 px-4 border border-slate-200">{threshold.level}</td>
                  <td className="py-2 px-4 border border-slate-200">{threshold.min}</td>
                  <td className="py-2 px-4 border border-slate-200">{threshold.max}</td>
                  <td className="py-2 px-4 border border-slate-200">{threshold.notificationEmail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default Listing;
