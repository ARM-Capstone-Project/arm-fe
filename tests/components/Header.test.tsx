
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import Header from '../../src/components/Header'

describe('Header component', () => {
  const mockLogOut = vi.fn()
  const mockUser = { username: 'testuser' }

  it('renders correctly with the current user', () => {
    render(<Header currentUser={mockUser} logOut={mockLogOut} />)

    expect(screen.getByText('IoT Remote Monitoring System')).toBeInTheDocument()
    expect(screen.getByText('testuser')).toBeInTheDocument()
    expect(screen.getByAltText('user photo')).toBeInTheDocument()
  })

  it('toggles the dropdown when the button is clicked', () => {
    render(<Header currentUser={mockUser} logOut={mockLogOut} />)

    const button = screen.getByRole('button', { name: /testuser/i })
    fireEvent.click(button)

    expect(screen.getByText('Profile')).toBeInTheDocument()
    expect(screen.getByText('Logout')).toBeInTheDocument()

    fireEvent.click(button)

    expect(screen.queryByText('Profile')).not.toBeInTheDocument()
    expect(screen.queryByText('Logout')).not.toBeInTheDocument()
  })

  it('calls logOut when the logout link is clicked', () => {
    render(<Header currentUser={mockUser} logOut={mockLogOut} />)

    const button = screen.getByRole('button', { name: /testuser/i })
    fireEvent.click(button)

    const logoutLink = screen.getByText('Logout')
    fireEvent.click(logoutLink)

    expect(mockLogOut).toHaveBeenCalledTimes(1)
  })

  it('navigates to profile when the profile link is clicked', () => {
    render(<Header currentUser={mockUser} logOut={mockLogOut} />)

    const button = screen.getByRole('button', { name: /testuser/i })
    fireEvent.click(button)

    const profileLink = screen.getByText('Profile')
    expect(profileLink.closest('a')).toHaveAttribute('href', '/profile')
  })
})
