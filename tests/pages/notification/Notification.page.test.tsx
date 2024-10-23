import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import Notification from '../../../src/pages/notification/Notification.page'

describe('Notification Component', () => {
  beforeEach(() => {
    render(<Notification />)
  })

  it('renders the title', () => {
    expect(screen.getByText('Notifications')).toBeInTheDocument()
  })

  it('renders all notifications', () => {
    expect(screen.getByText('Temperature Alert')).toBeInTheDocument()
    expect(screen.getByText('Pressure Alert')).toBeInTheDocument()
    expect(screen.getByText('Humidity Alert')).toBeInTheDocument()
  })

  it('renders notification messages', () => {
    expect(
      screen.getByText('Temperature in Room A has exceeded the threshold.'),
    ).toBeInTheDocument()
    expect(screen.getByText('Pressure in Room B is too low.')).toBeInTheDocument()
    expect(screen.getByText('Humidity in the Greenhouse is too high.')).toBeInTheDocument()
  })

  it('renders notification times', () => {
    expect(screen.getByText('5 minutes ago')).toBeInTheDocument()
    expect(screen.getByText('10 minutes ago')).toBeInTheDocument()
    expect(screen.getByText('30 minutes ago')).toBeInTheDocument()
  })

  it('deletes a notification when the delete button is clicked', async () => {
    const deleteButton = screen.getByRole('button', { name: /delete temperature alert/i })

    fireEvent.click(deleteButton)

    expect(await screen.queryByText('Temperature Alert')).not.toBeInTheDocument()
  })

  it('logs the deleted notification ID to the console', async () => {
    console.log = vi.fn()
    const deleteButton = screen.getByRole('button', { name: /delete temperature alert/i })

    fireEvent.click(deleteButton)

    expect(await console.log).toHaveBeenCalledWith('Deleted Notification ID: 1')
  })

  it('removes the notification from the list after deletion', async () => {
    const deleteButton = screen.getByRole('button', { name: /delete temperature alert/i })

    fireEvent.click(deleteButton)

    expect(await screen.queryByText('Temperature Alert')).not.toBeInTheDocument()
  })

  it('does not throw errors when clicking delete on already removed notifications', async () => {
    const deleteButton = screen.getByRole('button', { name: /delete temperature alert/i })

    fireEvent.click(deleteButton)

    expect(await screen.queryByText('Temperature Alert')).not.toBeInTheDocument()
  })
})
