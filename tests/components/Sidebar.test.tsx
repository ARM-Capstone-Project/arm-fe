import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { vi, describe, it, expect, beforeEach } from 'vitest'
import Sidebar from '../../src/components/Sidebar'

vi.mock('./sidebar/ListItem', () => {
  return function MockListItem(props: any) {
    return <li>{props.text}</li>
  }
})

const mockCurrentUser = { username: 'testUser' }

describe('Sidebar', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders correctly with default props', () => {
    render(
      <MemoryRouter>
        <Sidebar currentUser={mockCurrentUser} />
      </MemoryRouter>,
    )
    expect(screen.getByText('Alco Remote Monitoring')).toBeInTheDocument()
    expect(screen.getByText('Devices')).toBeInTheDocument()
    expect(screen.getByText('Zones')).toBeInTheDocument()
    expect(screen.getByText('Notifications')).toBeInTheDocument()
    expect(screen.getByText('Analytics')).toBeInTheDocument()
  })

  it('toggles sidebar open/closed', () => {
    render(
      <MemoryRouter>
        <Sidebar currentUser={mockCurrentUser} />
      </MemoryRouter>,
    )

    const toggleButton = screen.getByRole('button')
    const sidebar = screen.getByRole('complementary')
    fireEvent.click(toggleButton)

    expect(sidebar).toHaveClass('w-20')
  })

  it('renders the correct number of ListItems', () => {
    render(
      <MemoryRouter>
        <Sidebar currentUser={mockCurrentUser} />
      </MemoryRouter>,
    )

    const listItems = screen.getAllByRole('listitem')
    expect(listItems).toHaveLength(4)
  })
})
