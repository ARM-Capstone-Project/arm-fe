import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Hello from '../src/Hello'

describe('Hello Component', () => {
  it('should render the heading', () => {
    render(<Hello />)
    const heading = screen.getByText(/Vite \+ React/i)
    expect(heading).toBeInTheDocument()
  })

  it('should increment the count when button is clicked', () => {
    render(<Hello />)

    const button = screen.getByRole('button', { name: /count is 0/i })
    expect(button).toBeInTheDocument()

    fireEvent.click(button)
    expect(button.textContent).toBe('count is 1')

    fireEvent.click(button)
    expect(button.textContent).toBe('count is 2')
  })

  it('should render the docs text', () => {
    render(<Hello />)
    const docsText = screen.getByText(/Click on the Vite and React logos to learn more/i)
    expect(docsText).toBeInTheDocument()
  })
})
