import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Device } from '../../types/device';
import '../../components/Device/DeviceDetail.css';
import DeviceSensorReading from '../../components/DeviceSensorReading';

const DeviceDetail: React.FC = () => {

  const { state } = useLocation();
  const deviceFromState = state?.device;
  const [device, setDevice] = useState<Device | null>(deviceFromState);

  // TODO: error  'setDevice' is assigned a value but never used
  setDevice(device)

  // const [device, setDevice] = useState<Device | null>(null);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);
  // const { deviceId } = useParams<{ deviceId: string }>();

  // // Mock data
  // const dummyDevice: Device = {
  //   id: '123',
  //   name: 'Sample Device',
  //   type: 'Sensor',
  //   batchNo: 'Batch 1',
  //   description: 'Test device',
  //   tagNo: 'Tag 1',
  //   zoneId: 'zone1234',
  //   sensors: [
  //     { name: 'sensor 1', type: 'Temperature', unit: 'Celsius', deviceId: '123' },
  //     { name: 'sensor 2', type: 'Humidity', unit: 'g/kg', deviceId: '123' },
  //   ],
  //   zoneName: 'Zone A',
  //   location: 'Room 101',
  //   status: 'active',
  //   users: [
  //     { id: 'usr1', name: 'Amy', role: 'Supervisor' },
  //     { id: 'usr2', name: 'Joe', role: 'Supervisor' },
  //     { id: 'usr3', name: 'Fin', role: 'Operator' },
  //     { id: 'usr4', name: 'Agae', role: 'Operator' },
  //   ],
  // };

  // const fetchDevice = (deviceId: string): Promise<Device> => {
  //   return new Promise((resolve) => {
  //     setTimeout(() => {
  //       resolve(dummyDevice); // Simulating data fetch with dummy data
  //     }, 1000); // Simulate delay
  //   });
  // };

  // useEffect(() => {
  //   if (deviceId) {
  //     fetchDevice(deviceId)
  //       .then((data: Device) => {
  //         setDevice(data);
  //         setLoading(false);
  //       })
  //       .catch((err: Error) => {
  //         setError(err.message);
  //         setLoading(false);
  //       });
  //   }
  // }, [deviceId]);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  return (
    <div className="device-detail">
      <h1 className="detail-title">Device Details</h1>
      {device && (
        <div>
          <div className="detail-group">
            <label style={{ fontSize: '20px' }}>Device Tag No:</label>
            <p>{device.tagNo}</p>
          </div>
          <div className="detail-group">
            <label style={{ fontSize: '20px' }}>Device Name:</label>
            <p>{device.name}</p>
          </div>
          <div className="detail-group">
            <label style={{ fontSize: '20px' }}>Device Type:</label>
            <p>{device.type}</p>
          </div>
          <div className="detail-group">
            <label style={{ fontSize: '20px' }}>Zone:</label>
            <p>{device.zoneName}</p>
          </div>
          <div className="detail-group">
            <label style={{ fontSize: '20px' }}>Location:</label>
            <p>{device.location}</p>
          </div>
          <div className="detail-group">
            <label style={{ fontSize: '20px' }}>Status:</label>
            <p>{device.status}</p>
          </div>

          <div className="detail-section">
            <h2>Sensors</h2>
            {device.sensors && device.sensors.length > 0 ? (
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
    ) : (
      <p>No sensors available.</p>
    )}
  </div>

          <div className="detail-section">
            <h2>Assigned Users</h2>
            {device.users && device.users.length > 0 ? (
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
    ) : (
      <p>No users assigned.</p>
    )}
  </div>
        </div>
      )}
      <br></br>
      <br></br>
      <div>
    <DeviceSensorReading />
    </div>
    </div>
    
  );
};

export default DeviceDetail;