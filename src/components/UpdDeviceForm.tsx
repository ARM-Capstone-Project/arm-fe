import React, { useState, useEffect } from 'react';
import { fetchDevice } from './../services/device.service';
import { Device } from './../types/device';
import './Device/DeviceForm.css';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const UpdDeviceForm: React.FC = () => {
  const { deviceId } = useParams<{ deviceId?: string }>(); // deviceId can be undefined
  const [device, setDevice] = useState<Device | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // Mock data start
  const dummyDevice: Device = {
    deviceId: '123',
    deviceName: 'Sample Device',
    deviceType: 'Sensor',
    sensors: ['Temperature', 'Humidity'],
    zone: 'Zone A',
    location: 'Room 101',
    status: 'active',
  };

  const fetchDevice = (deviceId: string): Promise<Device> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(dummyDevice); // Return the dummy data
      }, 1000); // Simulate a delay
    });
  };
  //end mock data

  useEffect(() => {
    if (deviceId) { // Check if deviceId is defined
      fetchDevice(deviceId)
        .then((data: Device) => {
          setDevice(data);
          setLoading(false);
        })
        .catch((err: Error) => {
          setError(err.message);
          setLoading(false);
        });
    } else {
      setError('Device ID is missing');
      setLoading(false);
    }
  }, [deviceId]); // Add deviceId to dependencies

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
      return null;
    });
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setDevice((prevDevice) => {
      if (prevDevice) {        
        return {
          ...prevDevice,
          [id]: value,
        };
      }
      return null;
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleSave = () => {
    if (device) {
      console.log('Saving device:', device);
      navigate(`/devices?section=${'deviceslist'}`);
      // Implement your save logic here, e.g., sending data to a server.
      // For now, just log the device object.
    }
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    setDevice((prevDevice) => {
      if (prevDevice) {
        return {
          ...prevDevice,
          status: value, // set either 'active' or 'inactive'
        };
      }
      return null;
    });
  };

  return (
    <div className="device-form">
      <h1 className="form-title">Device Form</h1>
      {device && (
        <form>
          <div className="form-group">
            <label htmlFor="deviceId">Device ID:</label>
            <input type="text" id="deviceId" value={device.deviceId} readOnly/>
          </div>
          <div className="form-group">
            <label htmlFor="deviceName">Device Name:</label>
            <input
              type="text"
              id="deviceName"
              value={device.deviceName}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="deviceType">Device Type:</label>
            <input
              type="text"
              id="deviceType"
              value={device.deviceType}
              onChange={handleInputChange}
            />
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
                    onChange={() => handleCheckboxChange(sensor)}
                  />
                  <label htmlFor={`sensor-${sensor}`}>{sensor}</label>
                </div>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="zone">Zone:</label>
            <input type="text" id="zone" value={device.zone} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input type="text" id="location" value={device.location} onChange={handleInputChange} />
          </div>
          <div className="form-group">
            <label className="block font-medium">Status:</label>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="status-active"
                  name="status"
                  value="active"
                  checked={device.status === 'active'}
                  onChange={handleStatusChange}
                  className="mr-2"
                />
                <label htmlFor="status-active" className="text-sm">Activate</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="status-inactive"
                  name="status"
                  value="inactive"
                  checked={device.status === 'inactive'}
                  onChange={handleStatusChange}
                  className="mr-2"
                />
                <label htmlFor="status-inactive" className="text-sm">Deactivate</label>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-4">
            <button type="button" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" onClick={handleSave}>Save</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdDeviceForm;