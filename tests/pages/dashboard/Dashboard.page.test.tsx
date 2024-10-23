import React from 'react'
import { render, screen } from '@testing-library/react'
import Dashboard from '../../../src/pages/dashboard/Dashboard.page'

vi.mock('react-leaflet', () => ({
  MapContainer: vi.fn(({ children }) => <div>{children}</div>),
  TileLayer: vi.fn(() => null),
  Marker: vi.fn(({ children }) => <div>{children}</div>),
  Popup: vi.fn(({ children }) => <div>{children}</div>),
}))

describe('Dashboard', () => {
  it('displays device locations on the map', () => {
    render(<Dashboard />)
    expect(screen.getByText('Device Locations')).toBeInTheDocument()
    expect(screen.getByText('Device List and Status')).toBeInTheDocument()
    expect(screen.getAllByText(/Sensors Group/i).length).toBeGreaterThan(0)
  })
})
