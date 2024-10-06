// apiService.ts
import axios from 'axios';
import SensorReading from '../pages/device/interfaces/ThresholdSetting';

const API_URL = 'http://localhost:8080/api/device-thresholds'; // Replace with your actual API URL
export const saveThreshold = async (threshold: SensorReading) => {
    try {
      const response = await axios.post(API_URL, threshold, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error saving threshold:', error);
    }
  };

  // Function to fetch a list of thresholds
export const fetchThresholds = async (): Promise<SensorReading[]> => {
  try {
      const response = await axios.get(API_URL);
      return response.data; // Assumes the API returns an array of SensorReading objects
  } catch (error) {
      console.error('Error fetching thresholds:', error);
      return []; // Return an empty array on error
  }
};