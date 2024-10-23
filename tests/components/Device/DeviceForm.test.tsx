import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import DeviceDetail from '../../../src/components/Device/DeviceForm'
import { Device } from '../../../src/types/device'

describe('DeviceDetail', () => {
  it('renders loading state initially', () => {
    render(
      <MemoryRouter initialEntries={['/devices/dev1']}>
        <Routes>
          <Route path="/devices/:deviceId" element={<DeviceDetail />} />
        </Routes>
      </MemoryRouter>,
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })
})
