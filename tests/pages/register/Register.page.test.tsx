import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Register from '../../../src/pages/register/Register.page'

vi.mock('../../../src/services/auth.service', () => ({
  default: {
    register: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
  },
}))

describe('Register Component', () => {
  let api

  beforeEach(async () => {
    api = (await import('../../../src/services/auth.service')).default
    vi.clearAllMocks()
  })

  it('should render the registration form', () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>,
    )

    expect(screen.getByLabelText(/username/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sign up/i })).toBeInTheDocument()
    expect(screen.getByText(/already registered\?/i)).toBeInTheDocument()
  })

  it('should validate username length', async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>,
    )

    fireEvent.change(screen.getByLabelText(/username/i), { target: { value: 'ab' } })
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }))

    expect(
      await screen.findByText(/the username must be between 3 and 20 characters/i),
    ).toBeInTheDocument()
  })

  it('should validate password length', async () => {
    render(
      <MemoryRouter>
        <Register />
      </MemoryRouter>,
    )

    fireEvent.change(screen.getByLabelText(/password/i), { target: { value: '12345' } })
    fireEvent.click(screen.getByRole('button', { name: /sign up/i }))

    expect(
      await screen.findByText(/the password must be between 6 and 40 characters/i),
    ).toBeInTheDocument()
  })
})
