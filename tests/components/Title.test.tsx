import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Title from '../../src/components/Title'

describe('Title component', () => {
  it('renders the title correctly', () => {
    const testTitle = 'My Title'
    render(<Title title={testTitle} />)

    const titleElement = screen.getByText(testTitle)
    expect(titleElement).toBeInTheDocument()
    expect(titleElement).toHaveClass('text-3xl', 'font-bold', 'text-gray-800')
  })
})