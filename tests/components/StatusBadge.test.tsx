import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import StatusBadge from '../../src/components/StatusBadge'

describe('StatusBadge component', () => {
  it('renders active status correctly', () => {
    render(<StatusBadge status="active" />)

    const badge = screen.getByText('Active')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('bg-green-50', 'text-green-700', 'ring-green-600/20')
  })

  it('renders inactive status correctly', () => {
    render(<StatusBadge status="inactive" />)

    const badge = screen.getByText('Inactive')
    expect(badge).toBeInTheDocument()
    expect(badge).toHaveClass('bg-red-50', 'text-red-700', 'ring-red-600/20')
  })
})
