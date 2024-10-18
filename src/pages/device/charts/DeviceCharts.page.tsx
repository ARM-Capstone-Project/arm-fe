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

    if (loading) return <div className="text-center">Loading...</div>;
    if (error) return <div className="text-red-500 text-center">{error}</div>;

    return (
        <div className="p-4">
            <ReadingCharts data={sensorData} />
            <div className="mt-6">
                <h2 className="text-xl font-bold mb-4">Sensor Data List</h2>
                <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-2 px-4 border-b text-left text-gray-600">Timestamp</th>
                            <th className="py-2 px-4 border-b text-left text-gray-600">Sensor</th>
                            <th className="py-2 px-4 border-b text-left text-gray-600">Value</th>
                            <th className="py-2 px-4 border-b text-left text-gray-600">Unit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sensorData.map((sensorDataItem) => (
                            sensorDataItem.readings.map((reading, index) => (
                                <tr key={`${sensorDataItem.id}-${index}`} className="hover:bg-gray-50">
                                    <td className="py-2 px-4 border-b">{new Date(sensorDataItem.timestamp).toLocaleString()}</td>
                                    <td className="py-2 px-4 border-b">{reading.sensor}</td>
                                    <td className="py-2 px-4 border-b">{reading.value}</td>
                                    <td className="py-2 px-4 border-b">{reading.unit}</td>
                                </tr>
                            ))
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DeviceCharts;
