import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Login from '../../../src/pages/login/Login.page'
import { login } from '../../../src/services/auth.service'

vi.mock('../../../src/services/auth.service', () => ({
  login: vi.fn(),
}))

describe('Login Component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should render the login form', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    )

    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument()
    expect(screen.getByText(/not registered\?/i)).toBeInTheDocument()
  })

  it('should display validation messages on empty submit', async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    )

    fireEvent.click(screen.getByRole('button', { name: /login/i }))

    await waitFor(() => {
      expect(screen.getAllByText('This field is required!').length).toBe(2)
    })
  })

  it('should display a success message upon successful login', async () => {
    ;(login as vi.Mock).mockResolvedValueOnce({})

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    )

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } })
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } })
    fireEvent.click(screen.getByRole('button', { name: /login/i }))

    await waitFor(() => {
      expect(window.location.pathname).toBe('/')
    })
  })

  it('should display an error message upon failed login', async () => {
    ;(login as vi.Mock).mockRejectedValueOnce({
      response: { data: { message: 'Login failed!' } },
    })

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    )

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } })
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } })
    fireEvent.click(screen.getByRole('button', { name: /login/i }))

    await waitFor(() => {
      expect(screen.getByText(/login failed!/i)).toBeInTheDocument()
    })
  })

  it('should disable the button while loading', async () => {
    ;(login as vi.Mock).mockImplementation(() => new Promise(() => {}))

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    )

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'testuser' } })
    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: 'password' } })
    fireEvent.click(screen.getByRole('button', { name: /login/i }))

    await waitFor(() => {
      expect(screen.getByRole('button', { name: /login/i })).toBeDisabled()
    })
  })
})
