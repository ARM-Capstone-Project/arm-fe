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
    deviceId: '123',
    deviceName: 'Sample Device',
    deviceType: 'Sensor',
    sensors: [
      { name: 'sensor 1', type: 'Temperature', unit: 'Celsius', deviceId: '123' },
      { name: 'sensor 2', type: 'Humidity', unit: 'g/kg', deviceId: '123' },
    ],
    zone: 'Zone A',
    location: 'Room 101',
    status: 'active',
    users: [
      { id: 'usr1', name: 'Amy', role: 'Supervisor' },
      { id: 'usr2', name: 'Joe', role: 'Supervisor' },
      { id: 'usr3', name: 'Fin', role: 'Operator' },
      { id: 'usr4', name: 'Agae', role: 'Operator' },
    ],
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
            <p>{device.deviceId}</p>
          </div>
          <div className="detail-group">
            <label>Device Name:</label>
            <p>{device.deviceName}</p>
          </div>
          <div className="detail-group">
            <label>Device Type:</label>
            <p>{device.deviceType}</p>
          </div>
          <div className="detail-group">
            <label>Zone:</label>
            <p>{device.zone}</p>
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
            <tbody>
      {device.sensors.map((sensor, index) => (
        <tr key={index}>
          <td></td><td></td>
          <td>{sensor.name} </td>
          <td>- {sensor.type} ({sensor.unit})</td>
        </tr>
      ))}
    </tbody>
    </table>            
          </div>

          <div className="detail-section">
            <h2>Assigned Users</h2>
            <table>
            <tbody>
            {device.users.map((user) => (
        <tr key={user.id}>
          <td></td><td></td>
          <td>{user.name} </td>
          <td>- {user.role}</td>
        </tr>
      ))}
    </tbody>
    </table>        
            {/* <ul>
              {device.users.map((user) => (
                <li key={user.id}>
                  {user.name} - {user.role}
                </li>
              ))}
            </ul> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default DeviceDetail;