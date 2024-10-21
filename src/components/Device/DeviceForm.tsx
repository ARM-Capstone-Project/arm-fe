import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Device } from '../../types/device';
import './DeviceDetail.css';

const DeviceDetail: React.FC = () => {
  const [device, setDevice] = useState<Device | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { deviceId } = useParams<{ deviceId: string }>();

  // Mock data
  const dummyDevice: Device = {
    id: "dev1",
    batchNo: "batch1", 
    name: "Sample Device",
    type: "Sensor",
    description: "A sample sensor device", 
    tagNo: "tag1", 
    sensors: [
      { id: "sensor1", name: "sensor 1", type: "Temperature", unit: "Celsius", device_id: "dev1", status: "active" },
      { id: "sensor2", name: "sensor 2", type: "Humidity", unit: "g/kg", device_id: "dev1", status: "active" }
    ],
    zoneId: "zone1", 
    zoneName: "Zone A",
    location: "Room 101",
    status: "active",
    users: [
      { id: "usr1", username: "Amy", role: "Supervisor" },
      { id: "usr2", username: "Joe", role: "Supervisor" },
      { id: "usr3", username: "Fin", role: "Operator" },
      { id: "usr4", username: "Agae", role: "Operator" }
    ]
  };

  const fetchDevice = (deviceId: string): Promise<Device> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        // TODO: Add line 35 and 36 because error  'deviceId' is defined but never used
        console.log(deviceId)
        resolve(dummyDevice); // Simulating data fetch with dummy data
      }, 1000); // Simulate delay
    });
  };

  useEffect(() => {
    if (deviceId) {
      fetchDevice(deviceId)
        .then((data: Device) => {
          setDevice(data);
          setLoading(false);
        })
        .catch((err: Error) => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [deviceId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="device-detail">
      <h1 className="detail-title">Device Details</h1>
      {device && (
        <div>
          <div className="detail-group">
            <label>Device ID:</label>
            <p>{device.id}</p>
          </div>
          <div className="detail-group">
            <label>Device Name:</label>
            <p>{device.name}</p>
          </div>
          <div className="detail-group">
            <label>Device Type:</label>
            <p>{device.type}</p>
          </div>
          <div className="detail-group">
            <label>Zone:</label>
            <p>{device.zoneName}</p>
          </div>
          <div className="detail-group">
            <label>Location:</label>
            <p>{device.location}</p>
          </div>
          <div className="detail-group">
            <label>Status:</label>
            <p>{device.status}</p>
          </div>

          <div className="detail-section">
            <h2>Sensors</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type (Unit)</th>
                </tr>
              </thead>
              <tbody>
                {device.sensors.map((sensor) => (
                  <tr key={sensor.id}>
                    <td>{sensor.name}</td>
                    <td>{sensor.type} ({sensor.unit})</td>
                  </tr>
                ))}
              </tbody>
            </table>            
          </div>

          <div className="detail-section">
            <h2>Assigned Users</h2>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Role</th>
                </tr>
              </thead>
              <tbody>
                {device.users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.username}</td>
                    <td>{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>        
          </div>
        </div>
      )}
    </div>
  );
};

export default DeviceDetail;