import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import ThresholdSettingList from '../../../src/pages/device/ThresholdListing.page'
import { describe, it, expect, vi } from 'vitest'

const mockThresholds = [
  {
    id: '1',
    deviceId: 'device-1',
    sensorId: 'sensor-1',
    reading: 75,
    condition: 'greater than',
    email: 'test@example.com',
    level: 'warning',
    unit: '°C',
  },
  {
    id: '2',
    deviceId: 'device-2',
    sensorId: 'sensor-2',
    reading: 50,
    condition: 'less than',
    email: 'alert@example.com',
    level: 'critical',
    unit: '°C',
  },
]

describe('ThresholdSettingList Component', () => {
  it('renders the table with headers and data', () => {
    render(<ThresholdSettingList thresholds={mockThresholds} onEdit={vi.fn()} />)

    expect(screen.getByText(/Device ID/i)).toBeInTheDocument()
    expect(screen.getByText(/Sensor ID/i)).toBeInTheDocument()
    expect(screen.getByText(/Reading/i)).toBeInTheDocument()
    expect(screen.getByText(/Condition/i)).toBeInTheDocument()
    expect(screen.getByText(/Email/i)).toBeInTheDocument()
    expect(screen.getByText(/Level/i)).toBeInTheDocument()
    expect(screen.getByText(/Unit/i)).toBeInTheDocument()
    expect(screen.getByText(/Actions/i)).toBeInTheDocument()

    expect(screen.getByText(/device-1/i)).toBeInTheDocument()
    expect(screen.getByText(/sensor-1/i)).toBeInTheDocument()
    expect(screen.getByText(/75/i)).toBeInTheDocument()
    expect(screen.getByText(/greater than/i)).toBeInTheDocument()
    expect(screen.getByText(/test@example.com/i)).toBeInTheDocument()
    expect(screen.getByText(/warning/i)).toBeInTheDocument()

    expect(screen.getByText(/device-2/i)).toBeInTheDocument()
    expect(screen.getByText(/sensor-2/i)).toBeInTheDocument()
    expect(screen.getByText(/50/i)).toBeInTheDocument()
    expect(screen.getByText(/less than/i)).toBeInTheDocument()
    expect(screen.getByText(/alert@example.com/i)).toBeInTheDocument()
    expect(screen.getByText(/critical/i)).toBeInTheDocument()
  })

  it('calls onEdit when the edit button is clicked', () => {
    const handleEdit = vi.fn()
    render(<ThresholdSettingList thresholds={mockThresholds} onEdit={handleEdit} />)

    fireEvent.click(screen.getAllByText(/Edit/i)[0])

    expect(handleEdit).toHaveBeenCalledWith(mockThresholds[0])
  })
})
