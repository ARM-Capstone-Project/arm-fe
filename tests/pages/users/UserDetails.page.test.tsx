import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import UserDetails from '../../../src/pages/users/UserDetails.page'
import api from '../../../src/api/index'

vi.mock('../../../src/api/index')

describe('UserDetails Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  const renderUserDetails = () => {
    render(
      <MemoryRouter initialEntries={['/users/1']}>
        <UserDetails />
      </MemoryRouter>,
    )
  }

  it('should render loading state initially', () => {
    renderUserDetails()
    expect(screen.getByText(/loading user details/i)).toBeInTheDocument()
  })

  it('should fetch and display user details', async () => {
    const user = {
      id: '1',
      username: 'testuser',
      email: 'test@example.com',
      roles: [{ id: '1', name: 'Admin', description: 'Administrator' }],
      zones: [{ id: '1', name: 'Zone A' }],
    }

    api.get.mockResolvedValueOnce({ data: user })
    renderUserDetails()

    await waitFor(() => {
      expect(screen.getByText(/user details/i)).toBeInTheDocument()
      expect(screen.getByText(/testuser/i)).toBeInTheDocument()
      expect(screen.getByText(/test@example.com/i)).toBeInTheDocument()
      expect(screen.getByText(/administrator/i)).toBeInTheDocument()
      expect(screen.getByText(/zone a/i)).toBeInTheDocument()
    })
  })

  it('should display an error message when fetching user fails', async () => {
    api.get.mockRejectedValueOnce(new Error('Network error'))
    renderUserDetails()

    await waitFor(() => {
      expect(screen.getByText(/failed to fetch user details/i)).toBeInTheDocument()
    })
  })

  it('should navigate back to previous page', async () => {
    const user = {
      id: '1',
      username: 'testuser',
      email: 'test@example.com',
      roles: [],
      zones: [],
    }

    api.get.mockResolvedValueOnce({ data: user })
    renderUserDetails()

    await waitFor(() => {
      expect(screen.getByText(/user details/i)).toBeInTheDocument()
    })

    fireEvent.click(screen.getByRole('button', { name: /back/i }))
    expect(window.history.state).toBe(null)
  })

  it('should handle delete failure gracefully', async () => {
    const user = {
      id: '1',
      username: 'testuser',
      email: 'test@example.com',
      roles: [],
      zones: [],
    }

    api.get.mockResolvedValueOnce({ data: user })
    renderUserDetails()

    await waitFor(() => {
      expect(screen.getByText(/user details/i)).toBeInTheDocument()
    })

    vi.spyOn(window, 'confirm').mockReturnValue(true)
    api.delete.mockRejectedValueOnce(new Error('Delete error'))

    fireEvent.click(screen.getByRole('button', { name: /delete user/i }))

    await waitFor(() => {
      expect(screen.getByText(/failed to delete user/i)).toBeInTheDocument()
    })
  })
})
