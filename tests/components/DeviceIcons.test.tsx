import React from 'react'
import { render } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import DeviceIcons from '../../src/components/DeviceIcons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThermometerHalf, faTachometerAlt, faTint, faWater } from '@fortawesome/free-solid-svg-icons'

describe('DeviceIcons', () => {
  it('renders temperature icon', () => {
    const { container } = render(<DeviceIcons type="temperature" />)
    const icon = container.querySelector('svg')
    expect(icon).toBeTruthy()
    expect(icon).toHaveClass('text-blue-500 text-4xl')
  })

  it('renders pressure icon', () => {
    const { container } = render(<DeviceIcons type="pressure" />)
    const icon = container.querySelector('svg')
    expect(icon).toBeTruthy()
    expect(icon).toHaveClass('text-blue-500 text-4xl')
  })

  it('renders moisture icon', () => {
    const { container } = render(<DeviceIcons type="moisture" />)
    const icon = container.querySelector('svg')
    expect(icon).toBeTruthy()
    expect(icon).toHaveClass('text-blue-500 text-4xl')
  })

  it('renders humidity icon', () => {
    const { container } = render(<DeviceIcons type="humidity" />)
    const icon = container.querySelector('svg')
    expect(icon).toBeTruthy()
    expect(icon).toHaveClass('text-blue-500 text-4xl')
  })

  it('defaults to temperature icon when type is unknown', () => {
    const { container } = render(<DeviceIcons type="unknown" />)
    const icon = container.querySelector('svg')
    expect(icon).toBeTruthy()
    expect(icon).toHaveClass('text-blue-500 text-4xl')
  })
})
