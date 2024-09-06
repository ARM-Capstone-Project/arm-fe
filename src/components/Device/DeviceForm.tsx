import React, { useState, useEffect } from 'react';
import { fetchDevice } from '../../api/deviceApi';
import { Device } from '../../types/device';


const DeviceForm: React.FC = () => {
  const [device, setDevice] = useState<Device | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const deviceId = '123'; // Replace with actual deviceId
    fetchDevice(deviceId)
      .then((data: Device) => { // Type `data` as `Device`
        setDevice(data);
        setLoading(false);
      })
      .catch((err: Error) => { // Type `err` as `Error`
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Device Form</h1>
      {device && (
        <form>
          <div>
            <label htmlFor="deviceId">Device ID:</label>
            <input type="text" id="deviceId" value={device.deviceId} readOnly />
          </div>
          <div>
            <label htmlFor="deviceName">Device Name:</label>
            <input type="text" id="deviceName" value={device.deviceName} readOnly />
          </div>
          <div>
            <label htmlFor="deviceType">Device Type:</label>
            <input type="text" id="deviceType" value={device.deviceType} readOnly />
          </div>
          <div>
            <label htmlFor="sensors">Sensors:</label>
            <ul>
              {device.sensors.map((sensor: string, index: number) => ( // Explicitly type `sensor` as `string`
                <li key={index}>{sensor}</li>
              ))}
            </ul>
          </div>
          <div>
            <label htmlFor="zone">Zone:</label>
            <input type="text" id="zone" value={device.zone} readOnly />
          </div>
          <div>
            <label htmlFor="location">Location:</label>
            <input type="text" id="location" value={device.location} readOnly />
          </div>
        </form>
      )}
    </div>
  );
};

export default DeviceForm;