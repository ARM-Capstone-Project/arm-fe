import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Device from '../../../src/pages/device/DeviceSummary.page'
import { describe, it, expect, vi } from 'vitest'

vi.mock('../../../../src/components/DeviceIcons', () => () => <div>DeviceIcon</div>)
vi.mock('../../../../src/components/Submenu', () => ({ onSelect }) => (
  <div>
    <button onClick={() => onSelect('liveData')}>Live Data</button>
    <button onClick={() => onSelect('deviceslist')}>Devices List</button>
    <button onClick={() => onSelect('showMap')}>Show Map</button>
    <button onClick={() => onSelect('alarmSetting')}>Alarm Setting</button>
    <button onClick={() => onSelect('showActions')}>Show Actions</button>
  </div>
))
vi.mock('../../../../src/pages/device/charts/DeviceCharts.page', () => () => (
  <div>DeviceCharts</div>
))
vi.mock('../../../../src/pages/device/DevicesList.page', () => () => <div>DevicesList</div>)
vi.mock('../../../../src/pages/device/DeviceMap.page', () => () => <div>DeviceMap</div>)
vi.mock('../../../../src/pages/device/AlarmSetting.page', () => () => <div>AlarmSetting</div>)
vi.mock('../../../../src/components/CreateDevice', () => () => <div>CreateDevice</div>)

describe('Device Component', () => {
  it('renders the device icons and information', () => {
    render(
      <MemoryRouter>
        <Device />
      </MemoryRouter>,
    )

    expect(screen.getByText('Temperature/Humidity')).toBeInTheDocument()
    expect(screen.getByText('DHT22-001')).toBeInTheDocument()
    expect(screen.getByText('Methane Detector')).toBeInTheDocument()
    expect(screen.getByText('ac11-0856')).toBeInTheDocument()
  })
})
