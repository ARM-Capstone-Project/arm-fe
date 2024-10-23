import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import DeviceList from '../../src/components/DeviceList'

describe('DeviceList', () => {
  const mockDevices = [
    {
      id: '1',
      tagNo: 'TAG001',
      name: 'Device 1',
      type: 'temperature',
      status: 'active',
      zoneName: 'Zone 1',
      location: 'Location 1',
    },
    {
      id: '2',
      tagNo: 'TAG002',
      name: 'Device 2',
      type: 'pressure',
      status: 'inactive',
      zoneName: 'Zone 2',
      location: 'Location 2',
    },
  ]

  it('renders the device list with correct data', () => {
    render(
      <DeviceList devices={mockDevices} onEdit={vi.fn()} onView={vi.fn()} onRemove={vi.fn()} />,
    )

    expect(screen.getByText('Device 1')).toBeInTheDocument()
    expect(screen.getByText('Device 2')).toBeInTheDocument()
  })

  it('sorts devices by tag number when clicked', () => {
    render(
      <DeviceList devices={mockDevices} onEdit={vi.fn()} onView={vi.fn()} onRemove={vi.fn()} />,
    )

    fireEvent.click(screen.getByText('Tag Number'))
    expect(screen.getByText('Device 1')).toBeInTheDocument()
    expect(screen.getByText('Device 2')).toBeInTheDocument()
  })

  it('filters devices by tag number', () => {
    render(
      <DeviceList devices={mockDevices} onEdit={vi.fn()} onView={vi.fn()} onRemove={vi.fn()} />,
    )

    fireEvent.change(screen.getByPlaceholderText('Filter Tag No'), { target: { value: 'TAG001' } })
    expect(screen.getByText('Device 1')).toBeInTheDocument()
    expect(screen.queryByText('Device 2')).not.toBeInTheDocument()
  })

  it('calls onEdit when edit icon is clicked', () => {
    const onEdit = vi.fn()
    render(<DeviceList devices={mockDevices} onEdit={onEdit} onView={vi.fn()} onRemove={vi.fn()} />)

    fireEvent.click(screen.getAllByTitle('Edit')[0])
    expect(onEdit).toHaveBeenCalledWith(mockDevices[0])
  })

  it('calls onView when view icon is clicked', () => {
    const onView = vi.fn()
    render(<DeviceList devices={mockDevices} onEdit={vi.fn()} onView={onView} onRemove={vi.fn()} />)

    fireEvent.click(screen.getAllByTitle('View')[0])
    expect(onView).toHaveBeenCalledWith(mockDevices[0])
  })

  it('calls onRemove when remove icon is clicked', () => {
    const onRemove = vi.fn()
    render(
      <DeviceList devices={mockDevices} onEdit={vi.fn()} onView={vi.fn()} onRemove={onRemove} />,
    )

    fireEvent.click(screen.getAllByTitle('Remove')[0])
    expect(onRemove).toHaveBeenCalledWith(mockDevices[0])
  })
})
