import axios from 'axios';
import { Device } from '../types/device';

// get Device by Id
export const fetchDevice = async (deviceId: string): Promise<Device> => {
  try {
    const response = await axios.get<Device>(`https://api.example.com/devices/${deviceId}`);
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching device: ${error}`);
  }
};

// get all devices
export const fetchAllDevices = async (): Promise<Device[]> => {
  try {
    const response = await axios.get<Device[]>('https://api.example.com/devices');
    return response.data;
  } catch (error) {
    throw new Error(`Error fetching devices: ${error}`);
  }
};
