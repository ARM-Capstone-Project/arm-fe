import axios from 'axios';
import { Device } from '../types/device';
import api from '../api/index'

// get Device by Id
export const fetchDevice = async (deviceId: string): Promise<Device> => {
  try {
    const response = await api.get<Device>(`devices/${deviceId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching device: ', error);
    throw new Error(`Error fetching device: ${error}`);
  }
};

// get all devices
export const fetchAllDevices = async (): Promise<Device[]> => {
  try {
    const response = await api.get<Device[]>('devices');
    return response.data;
  } catch (error) {
    console.error('Error fetching devices:', error);
    throw new Error(`Error fetching devices: ${error}`);
  }
};

  export const deleteDevice = async (deviceId: string) => {
    try {
        await api.delete(`devices/${deviceId}`);
    } catch (error) {
        console.error('Error deleting device:', error);
        throw new Error(`Error deleting device: ${error}`);
    }
};

export const saveDevice = async (deviceId: string, device: Device) => {
  try {
      await api.put(`devices/${deviceId}`, device);
  } catch (error) {
      console.error('Error updating device:', error);
      throw new Error(`Error updating device: ${error}`);
  }
};

export const createDevice = async (device: Device) => {
  try {
    const response = await api.post<Device>(`devices`, device);
    return response.data;
  } catch (error) {
    console.error('Error creating device:', error);
      throw new Error(`Error creting device: ${error}`);
  }
};