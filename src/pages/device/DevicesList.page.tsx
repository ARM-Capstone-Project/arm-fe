import React, { useState } from 'react';
import DeviceList from '../../components/DeviceList';
import { Device } from '../../types/device';
import { useNavigate } from 'react-router-dom';

const mockDevices: Device[] = [
    {
        deviceId: '123',
        deviceName: 'Temperature Sensor 1',
        deviceType: 'temperature',
        sensors: ['sensor1', 'sensor2'],
        zone: 'Zone A',
        location: 'Building 1, Room 101',
        status: 'active',
    },
    {
        deviceId: '121',
        deviceName: 'Pressure Sensor 1',
        deviceType: 'pressure',
        sensors: ['sensor3'],
        zone: 'Zone B',
        location: 'Building 1, Room 102',
        status: 'inactive',
    },
    {
        deviceId: '122',
        deviceName: 'Humidity Sensor 1',
        deviceType: 'humidity',
        sensors: ['sensor4', 'sensor5'],
        zone: 'Zone C',
        location: 'Building 2, Room 201',
        status: 'active',
    },
    {
        deviceId: 'D004',
        deviceName: 'Moisture Sensor 1',
        deviceType: 'moisture',
        sensors: ['sensor6'],
        zone: 'Zone D',
        location: 'Garden',
        status: 'inactive',
    },
    {
        deviceId: 'D005',
        deviceName: 'Frequency Sensor 1',
        deviceType: 'movement frequency',
        sensors: ['sensor7', 'sensor8'],
        zone: 'Zone E',
        location: 'Building 3, Room 301',
        status: 'active',
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