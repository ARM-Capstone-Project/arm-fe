export default  interface SensorReading {
  deviceId: string;
  sensorId: string;
  reading: "temperature" | "humidity" | "methane";
  condition: string;
  email: string;
  level: "warning" | "critical";
  unit: "celsius" | "%" | "ppm";
}