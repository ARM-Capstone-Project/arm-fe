import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import DevicesList from '../../../src/pages/device/DevicesList.page'
import * as DeviceService from '../../../src/services/DeviceService'
import * as ZoneService from '../../../src/services/ZoneService'
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('../../../src/services/DeviceService')
vi.mock('../../../src/services/ZoneService')

const mockDevices = [
  {
    id: '123',
    name: 'Sample Device',
    zoneId: 'zone-1',
  },
]

const mockZone = {
  name: 'Zone A',
}

describe('DevicesList', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.mock('react-router-dom', async () => {
      const actual = await vi.importActual('react-router-dom')
      return {
        ...actual,
        useNavigate: vi.fn(),
      }
    })
  })

  it('renders loading state when no devices are available', async () => {
    DeviceService.fetchAllDevices.mockResolvedValueOnce([])
    render(
      <MemoryRouter>
        <DevicesList />
      </MemoryRouter>,
    )

    expect(screen.getByText('No devices available.')).toBeInTheDocument()
  })

  it('renders devices correctly', async () => {
    DeviceService.fetchAllDevices.mockResolvedValueOnce(mockDevices)
    ZoneService.fetchZoneById.mockResolvedValueOnce(mockZone)

    render(
      <MemoryRouter>
        <DevicesList />
      </MemoryRouter>,
    )

    await waitFor(() => expect(screen.getByText('Sample Device')).toBeInTheDocument())
  })

  it('removes a device', async () => {
    DeviceService.fetchAllDevices.mockResolvedValueOnce(mockDevices)
    ZoneService.fetchZoneById.mockResolvedValueOnce(mockZone)
    DeviceService.deleteDevice.mockResolvedValueOnce(undefined)

    render(
      <MemoryRouter>
        <DevicesList />
      </MemoryRouter>,
    )

    await waitFor(() => expect(screen.getByText('Sample Device')).toBeInTheDocument())

    window.confirm = vi.fn(() => true)
    fireEvent.click(screen.getByText('Remove'))

    expect(DeviceService.deleteDevice).toHaveBeenCalledWith('123')
    await waitFor(() => expect(screen.queryByText('Sample Device')).not.toBeInTheDocument())
  })
})
