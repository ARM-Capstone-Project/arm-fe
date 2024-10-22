import React from 'react'
import { render, screen } from '@testing-library/react'
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
      </MemoryRouter>
    )
    
    expect(screen.getByText('Live Status')).toBeInTheDocument()
    expect(screen.getByText('Map')).toBeInTheDocument()
    expect(screen.getByText('Devices List')).toBeInTheDocument()
    expect(screen.getByText('Device Setup')).toBeInTheDocument()
    expect(screen.getByText('Threshold Setting')).toBeInTheDocument()
  })
})