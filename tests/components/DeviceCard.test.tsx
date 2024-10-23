import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import DeviceCard from '../../src/components/DeviceCard'

describe('DeviceCard', () => {
  it('renders with online status', () => {
    render(<DeviceCard deviceName="Device A" status="Online" />)
    expect(screen.getByText('Device A')).toBeInTheDocument()
    expect(screen.getByText('Status: Online')).toBeInTheDocument()
    expect(screen.getByText('Status: Online')).toHaveClass('text-green-500')
  })

  it('renders with offline status', () => {
    render(<DeviceCard deviceName="Device B" status="Offline" />)
    expect(screen.getByText('Device B')).toBeInTheDocument()
    expect(screen.getByText('Status: Offline')).toBeInTheDocument()
    expect(screen.getByText('Status: Offline')).toHaveClass('text-red-500')
  })

  it('renders with empty device name', () => {
    render(<DeviceCard deviceName="" status="Online" />)
    expect(screen.getByText('Status: Online')).toBeInTheDocument()
  })

  it('renders with empty status', () => {
    render(<DeviceCard deviceName="Device C" status="" />)
    expect(screen.getByText('Device C')).toBeInTheDocument()
    expect(screen.getByText('Status:')).toBeInTheDocument()
  })
})
