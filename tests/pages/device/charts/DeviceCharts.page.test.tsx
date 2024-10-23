import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import DeviceCharts from '../../../../src/pages/device/charts/DeviceCharts.page'
import { fetchSensorDataByDeviceId } from '../../../../src/pages/device/charts/ChartDataService'
import { describe, it, expect, beforeEach, vi } from 'vitest'

vi.mock('../../../../src/pages/device/charts/ChartDataService')

const mockSensorData = [
  {
    id: 'sensor1',
    timestamp: '2024-01-01T12:00:00Z',
    readings: [
      { sensor: 'Temperature', value: '22', unit: 'Celsius' },
      { sensor: 'Humidity', value: '45', unit: 'g/kg' },
    ],
  },
  {
    id: 'sensor2',
    timestamp: '2024-01-02T12:00:00Z',
    readings: [{ sensor: 'Pressure', value: '1013', unit: 'hPa' }],
  },
]

describe('DeviceCharts', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders loading state initially', () => {
    render(<DeviceCharts deviceId="device1" />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('renders error message on fetch failure', async () => {
    fetchSensorDataByDeviceId.mockRejectedValueOnce(new Error('Network Error'))
    render(<DeviceCharts deviceId="device1" />)

    await waitFor(() =>
      expect(
        screen.getByText('Failed to fetch sensor data, Error: Network Error'),
      ).toBeInTheDocument(),
    )
  })
})
