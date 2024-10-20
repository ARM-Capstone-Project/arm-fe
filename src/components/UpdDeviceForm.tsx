import React, { useState, useEffect } from 'react';
import { Device, Sensor } from './../types/device';
import './Device/DeviceForm.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { fetchSensorsByDeviceId } from '../services/SensorService';
import { saveDevice } from '../services/DeviceService';

const UpdDeviceForm: React.FC = () => {
  const { state } = useLocation();
  const deviceFromState = state?.device;
  const [device, setDevice] = useState<Device | null>(deviceFromState);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [sensors, setSensors] = useState<Sensor[]>(device?.sensors || []);

  // Temporary local state to store the form inputs before saving
  const [formValues, setFormValues] = useState({
    name: device?.name || '',
    type: device?.type || '',
    zoneName: device?.zoneName || '',
    location: device?.location || '',
    status: device?.status || 'inactive',
  });

  useEffect(() => {
    const fetchSensors = async () => {
      if (device) {
        setLoading(true);
        try {
          const sensorsData = await fetchSensorsByDeviceId(device.id);
          setSensors(sensorsData);
        } catch (error) {
          console.error('Error fetching sensors:', error);
          setError('Failed to fetch sensors. Please try again.');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchSensors();
  }, [device]);

  // Update local form values on input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;

    setFormValues((prevValues) => ({
      ...prevValues,
      status: value as 'active' | 'inactive',
    }));
  };

  // Save the device with updated form values (keep sensors intact)
  const handleSave = async () => {
    if (device && device.id) {
      const updatedDevice = {
        ...device,
        name: formValues.name,
        type: formValues.type,
        zoneName: formValues.zoneName,
        location: formValues.location,
        status: formValues.status,
        sensors: sensors, // Keep the existing sensors
      };

      try {
        window.alert(`Updated for ${updatedDevice.name}`);
        console.log('Saving device:', updatedDevice);
  
        await saveDevice(updatedDevice.id, updatedDevice);
        // TODO: Add line 83 and 84 because error 'setDevice' is assigned a value but never used
        setDevice(updatedDevice)
        navigate(`/devices?section=deviceslist`);
      } catch (error) {
        console.error('Error saving device:', error);
        window.alert('Failed to save device. Please try again.');
      }
    }
  };

  const handleCancel = () => {
    navigate(`/devices?section=deviceslist`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="device-form">
      <h1 className="form-title">Device Form</h1>
      {device && (
        <form onSubmit={(e) => e.preventDefault()}> {/* Prevent default form submission */}
          <div className="form-group">
            <label htmlFor="tagNo">Device ID:</label>
            <input type="text" id="tagNo" value={device.tagNo} readOnly />
          </div>
          <div className="form-group">
            <label htmlFor="deviceName">Device Name:</label>
            <input
              type="text"
              id="name"
              value={formValues.name} // Use local form state
              onChange={handleInputChange} // Update local form state
            />
          </div>
          <div className="form-group">
            <label htmlFor="deviceType">Device Type:</label>
            <input
              type="text"
              id="type"
              value={formValues.type} // Use local form state
              onChange={handleInputChange} // Update local form state
            />
          </div>

          <div className="form-group">
            <label htmlFor="zoneName">Zone:</label>
            <input
              type="text"
              id="zoneName"
              value={formValues.zoneName} // Use local form state
              onChange={handleInputChange} // Update local form state
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location:</label>
            <input
              type="text"
              id="location"
              value={formValues.location} // Use local form state
              onChange={handleInputChange} // Update local form state
            />
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
                  checked={formValues.status === 'active'}
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
                  checked={formValues.status === 'inactive'}
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
              onClick={handleSave} // Save the form when button is clicked
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