export interface SensorData {
  id: string
  deviceId: string
  timestamp: string
  readings: Reading[]
}
export interface Reading {
  sensor: string
  unit: string
  value: number
}
