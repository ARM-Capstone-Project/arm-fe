import { render, screen } from '@testing-library/react'
import CompanyHierarchy from '../../../src/pages/company/CompanyHierarchy.page'
import { hierarchyData } from '../../../src/pages/company/mockData'
import { describe, it, expect } from 'vitest'

describe('CompanyHierarchy', () => {
  it('renders the CompanyHierarchy component', () => {
    render(<CompanyHierarchy />)

    expect(screen.getByText(/company hierarchy/i)).toBeInTheDocument()
    expect(screen.getByAltText(`${hierarchyData.admin.name}'s profile`)).toBeInTheDocument()
    expect(screen.getByText(hierarchyData.admin.name)).toBeInTheDocument()
    expect(screen.getByText(hierarchyData.admin.role)).toBeInTheDocument()
  })

  it('renders hierarchy nodes correctly', () => {
    render(<CompanyHierarchy />)

    const adminNode = screen.getByText(hierarchyData.admin.name)
    expect(adminNode).toBeInTheDocument()

    hierarchyData.admin.children?.forEach((child) => {
      const childNameElements = screen.getAllByText(child.name)
      expect(childNameElements.length).toBeGreaterThan(0)
      expect(screen.getByAltText(`${child.name}'s profile`)).toBeInTheDocument()
    })
  })
})
