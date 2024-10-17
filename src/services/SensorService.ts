import axios from 'axios';
import { Sensor } from '../types/device';
import api from '../api/index';

export const fetchSensorsByDeviceId = async (deviceId: string): Promise<Sensor[]> => {
    try {
      const response = await api.get<Sensor[]>(`sensors/device/${deviceId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching sensors from DeviceID: ', error);
      throw new Error(`Error fetching sensors: ${error}`);
    }
  };