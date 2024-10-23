import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Submenu from '../../src/components/Submenu'

describe('Submenu component', () => {
  const onSelectMock = vi.fn()

  beforeEach(() => {
    onSelectMock.mockClear()
  })

  it('renders all submenu items', () => {
    render(
      <MemoryRouter>
        <Submenu onSelect={onSelectMock} />
      </MemoryRouter>,
    )

    expect(screen.getByText('Live Status')).toBeInTheDocument()
    expect(screen.getByText('Map')).toBeInTheDocument()
    expect(screen.getByText('Devices List')).toBeInTheDocument()
    expect(screen.getByText('Device Setup')).toBeInTheDocument()
    expect(screen.getByText('Threshold Setting')).toBeInTheDocument()
  })

  it('calls onSelect with the correct section when an item is clicked', () => {
    render(
      <MemoryRouter>
        <Submenu onSelect={onSelectMock} />
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByText('Map'))
    expect(onSelectMock).toHaveBeenCalledWith('showMap')

    fireEvent.click(screen.getByText('Devices List'))
    expect(onSelectMock).toHaveBeenCalledWith('deviceslist')

    fireEvent.click(screen.getByText('Device Setup'))
    expect(onSelectMock).toHaveBeenCalledWith('showActions')

    fireEvent.click(screen.getByText('Threshold Setting'))
    expect(onSelectMock).toHaveBeenCalledWith('alarmSetting')
  })
})
