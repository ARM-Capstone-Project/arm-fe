import { render, screen } from '@testing-library/react'
import AlertList from '../../src/components/AlertList'
import { describe, it, expect } from 'vitest'

describe('AlertList', () => {
  const mockAlerts = [
    {
      id: 1,
      name: 'Alert 1',
      description: 'This is alert 1',
      timestamp: '2024-10-21T12:34:56Z',
    },
    {
      id: 2,
      name: 'Alert 2',
      description: 'This is alert 2',
      timestamp: '2024-10-22T08:20:00Z',
    },
  ]

  it('should render the table headers correctly', () => {
    render(<AlertList alerts={[]} />)

    expect(screen.getByText('ID')).toBeInTheDocument()
    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByText('Timestamp')).toBeInTheDocument()
  })

  it('should render the alert list rows correctly', () => {
    render(<AlertList alerts={mockAlerts} />)

    expect(screen.getByText('1')).toBeInTheDocument()
    expect(screen.getByText('Alert 1')).toBeInTheDocument()
    expect(screen.getByText('This is alert 1')).toBeInTheDocument()
    expect(screen.getByText('2024-10-21T12:34:56Z')).toBeInTheDocument()

    expect(screen.getByText('2')).toBeInTheDocument()
    expect(screen.getByText('Alert 2')).toBeInTheDocument()
    expect(screen.getByText('This is alert 2')).toBeInTheDocument()
    expect(screen.getByText('2024-10-22T08:20:00Z')).toBeInTheDocument()
  })

  it('should render "No alerts" message when alert list is empty', () => {
    render(<AlertList alerts={[]} />)
    expect(screen.queryByText('No alerts')).toBeNull()
  })
})
