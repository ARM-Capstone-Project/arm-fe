import axios from 'axios';
import { Device } from '../types/device';

export const fetchDevice = async (deviceId: string): Promise<Device> => {
  const response = await axios.get<Device>(`https://api.example.com/devices/${deviceId}`);
  return response.data;
};