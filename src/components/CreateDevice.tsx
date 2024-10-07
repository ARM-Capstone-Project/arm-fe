import React, { useState } from 'react';
import { Device, Sensor } from './../types/device';
import './Device/DeviceForm.css';
import { useNavigate } from 'react-router-dom';

const CreateDevice: React.FC = () => {
  const [device, setDevice] = useState<Device>({
    deviceId: '',
    deviceName: '',
    deviceType: '',
    sensors: [],
    zone: '',
    location: '',
    status: 'active',
    users: [],
  });

  const [csvData, setCsvData] = useState<string[][]>([]);
  const [file, setFile] = useState<File | null>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files ? e.target.files[0] : null;

    if (selectedFile && selectedFile.type === "text/csv") {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        const rows = text.split('\n').map(row => row.split(','));
        setCsvData(rows);
      };
      reader.readAsText(selectedFile);
      setFile(selectedFile);
    } else {
      setCsvData([]);
      setFile(null);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setDevice((prevDevice) => ({
      ...prevDevice,
      [id]: value,
    }));
  };

  const handleSensorChange = (index: number, field: keyof Sensor, value: string) => {
    setDevice((prevDevice) => {
      const updatedSensors = prevDevice.sensors.map((sensor, i) =>
        i === index ? { ...sensor, [field]: value } : sensor
      );

      return {
        ...prevDevice,
        sensors: updatedSensors,
      };
    });
  };

  const handleAddSensor = () => {
    setDevice((prevDevice) => ({
      ...prevDevice,
      sensors: [
        ...prevDevice.sensors,
        { name: '', type: '', unit: '', deviceId: prevDevice.deviceId },
      ],
    }));
  };

  const handleRemoveSensor = (index: number) => {
    setDevice((prevDevice) => ({
      ...prevDevice,
      sensors: prevDevice.sensors.filter((_, i) => i !== index),
    }));
  };

  const handleSave = () => {
    // Basic validation
    if (!device.deviceId) {
      window.alert('Device ID is required.');
      return;
    }
  
    if (!device.deviceName) {
      window.alert('Device Name is required.');
      return;
    }
  
    if (!device.deviceType) {
      window.alert('Device Type is required.');
      return;
    }
  
    // You can perform the actual save operation here (e.g., sending data to an API)
    window.alert(`Created device: ${device.deviceName}`);
    console.log('Saving device:', device);
  
    // After saving, navigate to the devices list
    navigate(`/devices?section=deviceslist`);
  };
  

  const handleUpload = () => {
    if (file) {
      window.alert(`Uploaded: ${file.name}`);
    } else {
      window.alert('No file selected for upload.');
    }
  };
  
  const handleCancel =() => {
    navigate(`/devices?section=deviceslist`);
  }


  return (
    <div className="device-form">
      <h1 className="form-title">Create Device</h1>

      {/* File Upload */}
      <div className="form-group mb-4">
        <label htmlFor="fileUpload" className="block font-medium">Upload CSV File:</label>
        <input
          type="file"
          id="fileUpload"
          accept=".csv"
          onChange={handleFileChange}
          className="mt-2"
        />
      </div>

      {/* CSV Preview */}
      {csvData.length > 0 && (
        <div className="csv-preview mt-4">
          <h2>CSV Preview</h2>
          <table className="csv-table">
            <thead>
              <tr>
                {csvData[0].map((header, index) => (
                  <th key={index}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {csvData.slice(1).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, cellIndex) => (
                    <td key={cellIndex}>{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {/* Upload Button */}
          <button
            type="button"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mt-4"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
      )}

      <form>
        <div className="form-group">
          <label htmlFor="deviceId">Device ID:</label>
          <input
            type="text"
            id="deviceId"
            value={device.deviceId}
            onChange={handleInputChange}
            required // Mark as required
          />
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
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
            onClick={handleAddSensor}
          >
            Add Sensor
          </button>
          <table className="sensor-table">
            <tbody>
              {device.sensors.map((sensor, index) => (
                <tr key={index} className="sensor-group mb-4">
                  <td>
                    <label htmlFor={`sensor-name-${index}`}>Sensor Name:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id={`sensor-name-${index}`}
                      value={sensor.name}
                      onChange={(e) => handleSensorChange(index, 'name', e.target.value)}
                    />
                  </td>
                  <td>
                    <label htmlFor={`sensor-type-${index}`}>Sensor Type:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id={`sensor-type-${index}`}
                      value={sensor.type}
                      onChange={(e) => handleSensorChange(index, 'type', e.target.value)}
                    />
                  </td>
                  <td>
                    <label htmlFor={`sensor-unit-${index}`}>Unit:</label>
                  </td>
                  <td>
                    <input
                      type="text"
                      id={`sensor-unit-${index}`}
                      value={sensor.unit}
                      onChange={(e) => handleSensorChange(index, 'unit', e.target.value)}
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 ml-4"
                      onClick={() => handleRemoveSensor(index)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="form-group">
          <label htmlFor="zone">Zone:</label>
          <input
            type="text"
            id="zone"
            value={device.zone}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            value={device.location}
            onChange={handleInputChange}
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
                checked={device.status === 'active'}
                onChange={(e) => handleInputChange({ target: { id: 'status', value: e.target.value } } as React.ChangeEvent<HTMLInputElement>)}
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
                onChange={(e) => handleInputChange({ target: { id: 'status', value: e.target.value } } as React.ChangeEvent<HTMLInputElement>)}
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
    </div>
  );
};

export default CreateDevice;