import { SensorReading } from '../types/device';
import React, { useEffect, useState } from 'react';
// import axios from 'axios';
import { parse } from 'date-fns';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';

const mockSensorReading: SensorReading[] = [
    {
        deviceId: '123',
        timestamp: '13/07/2024 20:00:00',
        type: 'humidity',
        value: '50.1',
        unit: 'g/Kg'
    },
    {
        deviceId: '123',
        timestamp: '13/07/2024 21:00:00',
        type: 'temperature_c',
        value: '29.4',
        unit: 'Celsius'
    },
    {
        deviceId: '123',
        timestamp: '13/07/2024 21:30:00',
        type: 'temperature_f',
        value: '84.92',
        unit: 'Fahrenheit'
    },
];

const DeviceSensorReading: React.FC = () => {
    const [readings, setReadings] = useState<SensorReading[]>(mockSensorReading);

    useEffect(() => {
        const fetchSensorData = async () => {
            try {
                // Uncomment this line when the API is ready
                // const response = await axios.get<SensorReading[]>('https://api.example.com/sensor-readings');
                // setReadings(response.data);
                // TODO: Add line 49 and 50 because error  'setReadings' is assigned a value but never used
                setReadings(readings)
            } catch (error) {
                console.error('Error fetching sensor data:', error);
            }
        };

        fetchSensorData();
    }, []);

    // Prepare data for charts based on reading type
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const groupedData = readings.reduce((acc: { [key: string]: any[] }, reading) => {
        const parsedDate = parse(reading.timestamp, 'dd/MM/yyyy HH:mm:ss', new Date()).toLocaleString();
        const value = parseFloat(reading.value);
        
        if (!acc[reading.type]) {
            acc[reading.type] = [];
        }

        acc[reading.type].push({ time: parsedDate, value, unit: reading.unit });
        return acc;
    }, {});

   
    return (
        <div>
            <h2 style={{ fontSize: '20px' }}>Sensor Readings</h2>
            <br></br>
            {Object.keys(groupedData).map((type) => (
                <div key={type}>
                    <h3>
                        {`${type.charAt(0).toUpperCase() + type.slice(1).replace('_', ' ')} (${groupedData[type][0].unit})`}
                    </h3>
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={groupedData[type]}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line type="monotone" dataKey="value" stroke='#ff7300' />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            ))}
        </div>
    );
};

export default DeviceSensorReading;