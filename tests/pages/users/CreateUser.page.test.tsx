import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import CreateUser from '../../../src/pages/users/CreateUser.page'

describe('CreateUser Component', () => {
  beforeEach(() => {
    window.alert = vi.fn()
  })

  it('should render the component correctly', () => {
    render(<CreateUser />)

    expect(screen.getByRole('heading', { name: /create user/i })).toBeInTheDocument()
    expect(screen.getByLabelText(/name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/role/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /create user/i })).toBeInTheDocument()
  })

  it('should allow the user to enter their name', () => {
    render(<CreateUser />)

    const nameInput = screen.getByLabelText(/name/i)
    fireEvent.change(nameInput, { target: { value: 'John Doe' } })

    expect(nameInput.value).toBe('John Doe')
  })

  it('should allow the user to select a role', () => {
    render(<CreateUser />)

    const roleSelect = screen.getByLabelText(/role/i)
    fireEvent.change(roleSelect, { target: { value: 'Supervisor' } })

    expect(roleSelect.value).toBe('Supervisor')
  })

  it('should alert the correct message when creating a user', () => {
    render(<CreateUser />)

    const nameInput = screen.getByLabelText(/name/i)
    const roleSelect = screen.getByLabelText(/role/i)
    const createUserButton = screen.getByRole('button', { name: /create user/i })

    fireEvent.change(nameInput, { target: { value: 'Jane Smith' } })
    fireEvent.change(roleSelect, { target: { value: 'Supervisor' } })
    fireEvent.click(createUserButton)

    expect(window.alert).toHaveBeenCalledWith('User Created: Jane Smithwith role Supervisor')
  })
})
