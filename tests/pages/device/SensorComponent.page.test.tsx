import React from 'react'
import { render, screen } from '@testing-library/react'
import SensorComponent from '../../../src/pages/device/SensorComponent.page'
import { describe, it, expect, vi } from 'vitest'

describe('SensorComponent', () => {
  const mockSensor = {
    id: 'sensor-1',
    sensorId: 'sensorId-1',
    rawDataList: [
      { id: 'raw-1', rawName: 'Temperature', unitOfMeasurement: 'C' },
      { id: 'raw-2', rawName: 'Humidity', unitOfMeasurement: '%' },
    ],
  }

  it('renders sensor details correctly', () => {
    render(<SensorComponent sensor={mockSensor} />)

    expect(screen.getByText(/sensor-1/i)).toBeInTheDocument()
    expect(screen.getByText(/sensorId-1/i)).toBeInTheDocument()
  })

  it('renders raw data components for each raw data item', () => {
    render(<SensorComponent sensor={mockSensor} />)

    expect(screen.getByText('Temperature')).toBeInTheDocument()
    expect(screen.getByText('Humidity')).toBeInTheDocument()
  })
})
