import React, { useState } from 'react';
import DeviceList from '../../components/DeviceList';
import { Device } from '../../types/device';
import { useNavigate } from 'react-router-dom';

const mockDevices: Device[] = [
        {
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
        },
        {
          deviceId: '124',
          deviceName: 'Outdoor Sensor',
          deviceType: 'Sensor',
          sensors: [
            { name: 'sensor 3', type: 'Moisture', unit: '%', deviceId: '124' },
            { name: 'sensor 4', type: 'Light', unit: 'lux', deviceId: '124' },
          ],
          zone: 'Zone B',
          location: 'Garden',
          status: 'inactive',
          users: [
            { id: 'usr5', name: 'Lily', role: 'Supervisor' },
            { id: 'usr6', name: 'David', role: 'Operator' },
          ],
        },
        {
          deviceId: '125',
          deviceName: 'Pressure Monitor',
          deviceType: 'Monitor',
          sensors: [
            { name: 'sensor 5', type: 'Pressure', unit: 'Psi', deviceId: '125' },
          ],
          zone: 'Zone C',
          location: 'Factory Floor',
          status: 'active',
          users: [
            { id: 'usr7', name: 'Mia', role: 'Supervisor' },
            { id: 'usr8', name: 'Tom', role: 'Operator' },
          ],
        },
        {
          deviceId: '126',
          deviceName: 'Humidity Detector',
          deviceType: 'Sensor',
          sensors: [
            { name: 'sensor 6', type: 'Humidity', unit: '%', deviceId: '126' },
          ],
          zone: 'Zone D',
          location: 'Warehouse',
          status: 'active',
          users: [
            { id: 'usr9', name: 'John', role: 'Supervisor' },
            { id: 'usr10', name: 'Eve', role: 'Operator' },
          ],
        },
      ];      

const DevicesList: React.FC = () => {
    const [devices, setDevices] = useState<Device[]>(mockDevices);
    const navigate = useNavigate();

    const handleEdit = (deviceId: string) => {
        console.log('Edit device:', deviceId);
        navigate(`/device-upd/${deviceId}`, { state: { deviceId } });
    };

    const handleView = (deviceId: string) => {
        console.log('View device:', deviceId);
        navigate(`/device-form/${deviceId}`, {state: {deviceId}});
    };

    const handleRemove = (deviceId: string) => {
        setDevices(devices.filter((device) => device.deviceId !== deviceId));
        console.log('Remove device:', deviceId);
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold mb-6">Device Management</h1>
            {devices.length > 0 ? (
                <DeviceList
                    devices={devices}
                    onEdit={handleEdit}
                    onView={handleView}
                    onRemove={handleRemove}
                />
            ) : (
                <p>No devices available.</p>
            )}
        </div>
    );
};

export default DevicesList;