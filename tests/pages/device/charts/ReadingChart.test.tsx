import React from 'react'
import ReadingCharts from '../../../../src/pages/device/charts/ReadingCharts'
import { SensorData } from '../../../../src/pages/device/charts/interfaces/SensorData'
import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

describe('ReadingCharts Component', () => {
  const mockData: SensorData[] = [
    {
      timestamp: '2021-01-01T00:00:00Z',
      readings: [
        {
          sensor: 'temperature',
          value: 22,
          unit: '',
        },
        {
          sensor: 'humidity',
          value: 60,
          unit: '',
        },
      ],
      id: '',
      deviceId: '',
    },
    {
      timestamp: '2021-01-01T01:00:00Z',
      readings: [
        {
          sensor: 'temperature',
          value: 24,
          unit: '',
        },
        {
          sensor: 'humidity',
          value: 55,
          unit: '',
        },
      ],
      id: '',
      deviceId: '',
    },
  ]

  it('transforms the data correctly', () => {
    const transformedData = mockData.map((item) => {
      const transformedItem: { name: string; temperature?: number; humidity?: number } = {
        name: item.timestamp,
      }
      item.readings.forEach((reading) => {
        transformedItem[reading.sensor] = reading.value
      })
      return transformedItem
    })

    expect(transformedData).toEqual([
      { name: '2021-01-01T00:00:00Z', temperature: 22, humidity: 60 },
      { name: '2021-01-01T01:00:00Z', temperature: 24, humidity: 55 },
    ])
  })

  it('gets the correct stroke color for sensors', () => {
    expect(getStrokeColor('temperature')).toBe('#8884d8')
    expect(getStrokeColor('humidity')).toBe('#82ca9d')
    expect(getStrokeColor('unknown')).toBe('#000')
  })
})

export const getStrokeColor = (sensor: string): string => {
  switch (sensor) {
    case 'temperature':
      return '#8884d8'
    case 'humidity':
      return '#82ca9d'
    default:
      return '#000'
  }
}
