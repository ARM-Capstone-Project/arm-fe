import React from 'react'
import { render, screen } from '@testing-library/react'
import QueryBuilder from '../../../src/pages/device/QueryBuilder'
import { describe, it, expect, vi, beforeEach } from 'vitest'

vi.mock('@react-awesome-query-builder/ui', () => {
  const originalModule = vi.importActual('@react-awesome-query-builder/ui')

  return {
    ...originalModule,
    Utils: {
      loadTree: vi.fn().mockReturnValue({ id: 'mockedTreeId', type: 'group' }),
      queryString: vi.fn().mockReturnValue('mockedQueryString'),
      uuid: vi.fn().mockReturnValue('mockedUUID'),
    },
    BasicConfig: {
      fields: {
        reading: {
          label: 'Reading',
          type: 'number',
          fieldSettings: {
            min: 0,
          },
          valueSources: ['value'],
          preferWidgets: ['number'],
        },
      },
    },
    Query: (props) => <div>{JSON.stringify(props)}</div>,
    Builder: () => <div>Mocked Query Builder</div>,
  }
})

describe('QueryBuilder Component', () => {
  const onConditionChange = vi.fn()

  beforeEach(() => {
    render(<QueryBuilder onConditionChange={onConditionChange} />)
  })

  it('renders the QueryBuilder component', () => {
    expect(screen.getByText(/Threshold Setting/i)).toBeInTheDocument()
  })

  it('displays the correct query string in the result', () => {
    expect(screen.getByText(/Threshold Setting:/i)).toBeInTheDocument()
    expect(screen.getByText(/mockedQueryString/i)).toBeInTheDocument()
  })
})
