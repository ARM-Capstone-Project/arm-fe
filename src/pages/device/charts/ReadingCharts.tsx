// ReadingCharts.tsx
import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { SensorData } from './interfaces/SensorData'

interface LineChartProps {
  data: SensorData[]
}

interface TransformedItem {
  name: string
  [key: string]: string | number // Allows dynamic keys of string type
}

const ReadingCharts: React.FC<LineChartProps> = ({ data }) => {
  // Transform data for the chart
  const transformedData: TransformedItem[] = data.map((item) => {
    const transformedItem: TransformedItem = { name: item.timestamp } // Create a name key for the X-axis
    item.readings.forEach((reading) => {
      transformedItem[reading.sensor] = reading.value // Map sensor types to their values
    })
    return transformedItem
  })
  // Get unique sensor keys for dynamic line creation
  const sensorKeys = [
    ...new Set(data.flatMap((item) => item.readings.map((reading) => reading.sensor))),
  ]

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        width={730}
        height={250}
        data={transformedData}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        {sensorKeys.map((sensor) => (
          <Line
            key={sensor as string}
            type="monotone"
            dataKey={sensor as string}
            stroke={getStrokeColor(sensor as string)}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  )
}

// Function to determine stroke color based on sensor type
const getStrokeColor = (sensor: string): string => {
  switch (sensor) {
    case 'temperature':
      return '#8884d8' // Color for temperature
    case 'humidity':
      return '#82ca9d' // Color for humidity
    default:
      return '#000' // Default color
  }
}

export default ReadingCharts
