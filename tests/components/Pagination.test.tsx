import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import Pagination from '../../src/components/Pagination'

describe('Pagination component', () => {
  const onPageChangeMock = vi.fn()

  afterEach(() => {
    onPageChangeMock.mockClear()
  })

  it('renders current page and total pages', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChangeMock} />)

    expect(screen.getByText('Page 1 of 5')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Previous/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Next/i })).toBeInTheDocument()
  })

  it('disables the Previous button on the first page', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChangeMock} />)

    const previousButton = screen.getByRole('button', { name: /Previous/i })
    expect(previousButton).toBeDisabled()
  })

  it('disables the Next button on the last page', () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={onPageChangeMock} />)

    const nextButton = screen.getByRole('button', { name: /Next/i })
    expect(nextButton).toBeDisabled()
  })

  it('calls onPageChange with the previous page when Previous button is clicked', () => {
    render(<Pagination currentPage={2} totalPages={5} onPageChange={onPageChangeMock} />)

    fireEvent.click(screen.getByRole('button', { name: /Previous/i }))
    expect(onPageChangeMock).toHaveBeenCalledWith(1)
  })

  it('calls onPageChange with the next page when Next button is clicked', () => {
    render(<Pagination currentPage={2} totalPages={5} onPageChange={onPageChangeMock} />)

    fireEvent.click(screen.getByRole('button', { name: /Next/i }))
    expect(onPageChangeMock).toHaveBeenCalledWith(3)
  })

  it('does not call onPageChange if Previous button is clicked on the first page', () => {
    render(<Pagination currentPage={1} totalPages={5} onPageChange={onPageChangeMock} />)

    fireEvent.click(screen.getByRole('button', { name: /Previous/i }))
    expect(onPageChangeMock).not.toHaveBeenCalled()
  })

  it('does not call onPageChange if Next button is clicked on the last page', () => {
    render(<Pagination currentPage={5} totalPages={5} onPageChange={onPageChangeMock} />)

    fireEvent.click(screen.getByRole('button', { name: /Next/i }))
    expect(onPageChangeMock).not.toHaveBeenCalled()
  })
})
