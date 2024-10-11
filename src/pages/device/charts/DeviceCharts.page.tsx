// src/pages/device/charts/DeviceCharts.page.tsx
import React, { useEffect, useState } from 'react';
import ReadingCharts from './ReadingCharts';
import { SensorData } from './interfaces/SensorData';
import { fetchSensorDataByDeviceId } from './ChartDataService';
const DeviceCharts: React.FC<{ deviceId: string }> = ({ deviceId }) => {
    const [sensorData, setSensorData] = useState<SensorData[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const getSensorData = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchSensorDataByDeviceId(deviceId);
                setSensorData(data); // Set the fetched data
            } catch (error) {
                setError('Failed to fetch sensor data');
            } finally {
                setLoading(false);
            }
        };

        getSensorData();
    }, [deviceId]); // Run effect when deviceId changes

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            
            <ReadingCharts data={sensorData} />
        </div>
    );
};

export default DeviceCharts;
