import axios from 'axios';
import { Device } from '../types/device';
import api from "../api/index";

// get Device by Id
export const fetchDevice = async (deviceId: string): Promise<Device> => {
  try {
    const response = await api.get<Device>(`/devices/${deviceId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching device with ID ${deviceId}:`, error);
    throw new Error(`Error fetching device: ${error instanceof Error ? error.message : error}`);
  }
};

// get all devices
export const fetchAllDevices = async (): Promise<Device[]> => {
  try {
    const response = await api.get('/devices');
    return response.data as Device[];
  } catch (error) {
    console.error('Error fetching devices: ', error);
    return[];
  }
};
