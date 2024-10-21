export default interface ThresholdSetting {
  id: string // Add this line
  deviceId: string
  sensorId: string
  reading: 'temperature' | 'humidity' | 'methane'
  condition: string
  level: 'caution' | 'critical'
  unit: 'celsius' | 'percentage' | 'ppm'
  email: string
}
