import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { BrowserRouter as Router } from 'react-router-dom'
import CreateDevice from '../../src/components/CreateDevice'
import * as ZoneService from '../../src/services/ZoneService'
import * as DeviceService from '../../src/services/DeviceService'
import { MemoryRouter } from 'react-router-dom'

vi.mock('../../src/services/ZoneService')
vi.mock('../../src/services/DeviceService')

const mockZones = [
  { id: '1', name: 'Zone 1' },
  { id: '2', name: 'Zone 2' },
]

describe('CreateDevice', () => {
  beforeEach(() => {
    ZoneService.fetchAllZones.mockResolvedValue(mockZones)
    DeviceService.createDevice.mockResolvedValue({ name: 'Device 1' })
    render(
      <Router>
        <CreateDevice />
      </Router>,
    )
  })

  it('loads zones on mount', async () => {
    await waitFor(() => expect(ZoneService.fetchAllZones).toHaveBeenCalled())
    expect(screen.getByText('Select a Zone')).toBeInTheDocument()
    expect(screen.getByText('Zone 1')).toBeInTheDocument()
    expect(screen.getByText('Zone 2')).toBeInTheDocument()
  })

  it('handles file input change', async () => {
    const file = new Blob(['name,type,unit\nsensor1,type1,unit1'], { type: 'text/csv' })
    Object.defineProperty(file, 'name', { value: 'sensors.csv' })
    const input = screen.getByLabelText('Upload CSV File:')
    fireEvent.change(input, { target: { files: [file] } })

    expect(await screen.findByText('CSV Preview')).toBeInTheDocument()
    expect(screen.getByText('name')).toBeInTheDocument()
  })

  it('adds and removes a sensor', async () => {
    fireEvent.click(screen.getByText('Add Sensor'))
    expect(screen.getByLabelText('Sensor Name:')).toBeInTheDocument()
    fireEvent.click(screen.getByText('Remove'))
    expect(screen.queryByLabelText('Sensor Name:')).not.toBeInTheDocument()
  })
})
