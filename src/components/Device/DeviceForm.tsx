import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchDevice } from '../../api/deviceApi';
import { Device } from '../../types/device';
import './DeviceForm.css';

interface DeviceFormProps {
  mode: 'view' | 'edit';
}

const DeviceForm: React.FC<DeviceFormProps> = ({ mode }) => {
  const [device, setDevice] = useState<Device | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate(); // Hook for navigation
  const { deviceId } = useParams<{ deviceId: string }>(); // Get deviceId from URL params

  // Mock data
  const dummyDevice: Device = {
    deviceId: '123',
    deviceName: 'Sample Device',
    deviceType: 'Sensor',
    sensors: ['Temperature', 'Humidity'],
    zone: 'Zone A',
    location: 'Room 101',
  };

  const fetchDevice = (deviceId: string): Promise<Device> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(dummyDevice); // Return the dummy data
      }, 1000); // Simulate a delay
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

  const handleCheckboxChange = (sensor: string) => {
    setDevice((prevDevice) => {
      if (prevDevice) {
        const updatedSensors = prevDevice.sensors.includes(sensor)
          ? prevDevice.sensors.filter((s) => s !== sensor)
          : [...prevDevice.sensors, sensor];

        return {
          ...prevDevice,
          sensors: updatedSensors,
        };
      }
      return null; // Return null if prevDevice is null
    });
  };

  const handleSave = () => {
    // Implement your save logic here
    console.log('Saved device:', device);

    // After saving, navigate back to the view page
    navigate(`/device-form/${device?.deviceId}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="device-form">
      <h1 className="form-title">{mode === 'edit' ? 'Edit Device' : 'View Device'}</h1>
      {device && (
        <form>
          <div className="form-group">
            <label htmlFor="deviceId">Device ID:</label>
            <input type="text" id="deviceId" value={device.deviceId} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="deviceName">Device Name:</label>
            <input type="text" id="deviceName" value={device.deviceName} readOnly={mode === 'view'} />
          </div>
          <div className="form-group">
            <label htmlFor="deviceType">Device Type:</label>
            <input type="text" id="deviceType" value={device.deviceType} readOnly={mode === 'view'} />
          </div>
          <div className="form-group">
            <label htmlFor="sensors">Sensors:</label>
            <div className="sensor-checkboxes">
              {['Temperature', 'Humidity', 'Pressure'].map((sensor) => (
                <div key={sensor} className="sensor-checkbox">
                  <input
                    type="checkbox"
                    id={`sensor-${sensor}`}
                    checked={device.sensors.includes(sensor)}
                    onChange={() => mode === 'edit' && handleCheckboxChange(sensor)}
                    disabled={mode === 'view'}
                  />
                  <label htmlFor={`sensor-${sensor}`}>{sensor}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="zone">Zone:</label>
            <input type="text" id="zone" value={device.zone} readOnly={mode === 'view'} />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input type="text" id="location" value={device.location} readOnly={mode === 'view'} />
          </div>
          {mode === 'edit' && (
            <button type="button" onClick={handleSave}>Save</button>
          )}
        </form>
      )}
    </div>
  );
};

export default DeviceForm;