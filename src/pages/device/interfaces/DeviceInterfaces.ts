// interfaces.ts
export interface RawData {
    id: string;
    rawName: string;
    unitOfMeasurement: string;
  }
  
  export interface Sensor {
    id: string;
    sensorId: string;
    rawDataList: RawData[];
  }
  
  export interface Device {
    id: string;
    deviceId: string;
    sensors: Sensor[];
  }
  