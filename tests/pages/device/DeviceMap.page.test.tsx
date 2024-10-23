import { render, screen } from '@testing-library/react'
import DeviceMap from '../../../src/pages/device/DeviceMap.page'
import { describe, it, expect, vi } from 'vitest'
import React from 'react'

vi.mock('react-leaflet', () => {
  return {
    MapContainer: ({ children }) => <div>{children}</div>,
    TileLayer: () => <div>Tile Layer</div>,
    Marker: ({ children }) => <div data-testid="marker">{children}</div>,
    Popup: ({ children }) => <div>{children}</div>,
  }
})

describe('DeviceMap Component', () => {
  it('renders the map container', () => {
    render(<DeviceMap />)
    expect(screen.getByText('Tile Layer')).toBeInTheDocument()
  })

  it('renders all device markers', () => {
    render(<DeviceMap />)
    const markers = screen.getAllByTestId('marker')
    expect(markers).toHaveLength(4)

    expect(markers[0]).toHaveTextContent('Temperature Sensors Group')
    expect(markers[0]).toHaveTextContent('Type: temperature')

    expect(markers[1]).toHaveTextContent('Pressure Sensors Group')
    expect(markers[1]).toHaveTextContent('Type: pressure')

    expect(markers[2]).toHaveTextContent('Moisture Sensors Group')
    expect(markers[2]).toHaveTextContent('Type: moisture')

    expect(markers[3]).toHaveTextContent('Humidity Sensors Group')
    expect(markers[3]).toHaveTextContent('Type: humidity')
  })
})
