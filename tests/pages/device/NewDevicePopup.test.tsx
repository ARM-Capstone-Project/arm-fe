import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import NewDevicePopup from '../../../src/pages/device/NewDevicePopup'
import { describe, it, expect, vi, beforeEach } from 'vitest'

describe('NewDevicePopup Component', () => {
  const onClose = vi.fn()
  const onSubmit = vi.fn()

  beforeEach(() => {
    onClose.mockClear()
    onSubmit.mockClear()
  })

  it('renders correctly when open', () => {
    render(<NewDevicePopup isOpen={true} onClose={onClose} onSubmit={onSubmit} />)
    expect(screen.getByText(/Add New Device/i)).toBeInTheDocument()
  })

  it('does not render when closed', () => {
    const { container } = render(
      <NewDevicePopup isOpen={false} onClose={onClose} onSubmit={onSubmit} />,
    )
    expect(container).toBeEmptyDOMElement()
  })

  it('closes the popup when cancelled', () => {
    render(<NewDevicePopup isOpen={true} onClose={onClose} onSubmit={onSubmit} />)
    const cancelButton = screen.getByText(/Cancel/i)
    fireEvent.click(cancelButton)

    expect(onClose).toHaveBeenCalled()
  })
})
