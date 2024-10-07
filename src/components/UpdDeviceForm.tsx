import React, { useState, useEffect } from 'react';
import { Device, Sensor } from './../types/device';
import './Device/DeviceForm.css';
import { useParams, useNavigate } from 'react-router-dom';

const UpdDeviceForm: React.FC = () => {
  const { deviceId } = useParams<{ deviceId?: string }>();
  const [device, setDevice] = useState<Device | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

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
        resolve(dummyDevice);
      }, 1000);
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
    } else {
      setError('Device ID is missing');
      setLoading(false);
    }
  }, [deviceId]);

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

  const handleSensorChange = (index: number, field: keyof Sensor, value: string) => {
    setDevice((prevDevice) => {
      if (prevDevice) {
        const updatedSensors = prevDevice.sensors.map((sensor, i) =>
          i === index ? { ...sensor, [field]: value } : sensor
        );

        return {
          ...prevDevice,
          sensors: updatedSensors,
        };
      }
      return null;
    });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;

    setDevice((prevDevice) => {
      if (prevDevice) {
        return {
          ...prevDevice,
          status: value as 'active' | 'inactive',
        };
      }
      return null;
    });
  };

  const handleSave = () => {
    if (device) {
        window.alert(`Updated for ${device.deviceName}`);
      console.log('Saving device:', device);
      navigate(`/devices?section=deviceslist`);
    }
  };
  const handleCancel =() => {
    navigate(`/devices?section=deviceslist`);
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="device-form">
      <h1 className="form-title">Device Form</h1>
      {device && (
        <form>
          <div className="form-group">
            <label htmlFor="deviceId">Device ID:</label>
            <input type="text" id="deviceId" value={device.deviceId} readOnly />
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
            <label>Sensors:</label>
            <table className="sensor-table">
              <thead>
                <tr>
                  <th>Sensor Name</th>
                  <th>Sensor Type</th>
                  <th>Unit</th>
                </tr>
              </thead>
              <tbody>
                {device.sensors.map((sensor, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        value={sensor.name}
                        onChange={(e) => handleSensorChange(index, 'name', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={sensor.type}
                        onChange={(e) => handleSensorChange(index, 'type', e.target.value)}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={sensor.unit}
                        onChange={(e) => handleSensorChange(index, 'unit', e.target.value)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
          <button
    type="button"
    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    onClick={handleSave}
  >
    Save
  </button>
  <button
    type="button"
    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-4"
    onClick={handleCancel}
  >
    Cancel
  </button>
  
</div>

        </form>
      )}
    </div>
  );
};

export default UpdDeviceForm;