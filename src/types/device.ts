import { User } from "./user";

export interface Sensor {
  name: string;
  type: string;
  unit: string;
  deviceId: string;
}

export interface Device {
  deviceId: string;
  deviceName: string;
  deviceType: string;
  sensors: Sensor[];
  zone: string;
  location: string;
  status: 'active' | 'inactive';
  users: User[];
}