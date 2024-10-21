// apiService.ts
import axios from 'axios';
import { SensorData } from './interfaces/SensorData';

const API_URL_READINGS = 'http://localhost:8081/api/sensor-readings/by-device-id';

export const fetchSensorDataByDeviceId = async (deviceId: string): Promise<SensorData[]> => {
  try {
      const response = await axios.get<SensorData[]>(`${API_URL_READINGS}/${deviceId}`); // Adjust the endpoint as needed
      return response.data; // Ensure the API returns an array of SensorData
  } catch (error) {
      console.error('Error fetching sensor data:', error);
      throw error; // Re-throw the error for handling in the component
  }
};