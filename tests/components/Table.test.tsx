import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import Table from '../../src/components/Table'

describe('Table component', () => {
  const headers = (
    <tr>
      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900">
        Header 1
      </th>
      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
        Header 2
      </th>
    </tr>
  )

  const rows = (
    <>
      <tr>
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
          Row 1 Col 1
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Row 1 Col 2</td>
      </tr>
      <tr>
        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900">
          Row 2 Col 1
        </td>
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">Row 2 Col 2</td>
      </tr>
    </>
  )

  it('renders the table with provided headers and rows', () => {
    render(<Table headers={headers} rows={rows} />)

    expect(screen.getByText('Header 1')).toBeInTheDocument()
    expect(screen.getByText('Header 2')).toBeInTheDocument()

    expect(screen.getByText('Row 1 Col 1')).toBeInTheDocument()
    expect(screen.getByText('Row 1 Col 2')).toBeInTheDocument()
    expect(screen.getByText('Row 2 Col 1')).toBeInTheDocument()
    expect(screen.getByText('Row 2 Col 2')).toBeInTheDocument()
  })

  it('should have correct class names', () => {
    render(<Table headers={headers} rows={rows} />)

    const tableElement = screen.getByRole('table')
    expect(tableElement).toHaveClass('min-w-full divide-y divide-gray-300')
  })
})
