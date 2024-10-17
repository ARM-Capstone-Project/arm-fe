import { User } from "./user";

export interface Sensor {
  id: string;
  name: string;
  status: string;
  type: string;
  unit: string;
  device_id: string;
}

export interface SensorReading{
  deviceId: string;
  timestamp: string;
  type: string; //temperature, etc  
  value: string;
  unit: string;
}

export interface Device {
  id: string;
  batchNo: string;
  name: string;
  type: string;
  description: string;
  tagNo: string;
  sensors: Sensor[];
  zoneId: string;
  zoneName: string;
  location: string;
  status: 'active' | 'inactive';
  users: User[];
}

export interface Zone {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  radius: number;
}