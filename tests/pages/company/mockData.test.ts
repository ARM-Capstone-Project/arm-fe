import { hierarchyData } from '../../../src/pages/company/mockData'

describe('hierarchyData', () => {
  it('contains admin data', () => {
    expect(hierarchyData).toHaveProperty('admin')
    expect(hierarchyData.admin).toHaveProperty('name', 'Admin User')
    expect(hierarchyData.admin).toHaveProperty('role', 'Admin')
    expect(hierarchyData.admin).toHaveProperty('profilePicture', 'https://via.placeholder.com/150')
    expect(hierarchyData.admin).toHaveProperty('children')
    expect(Array.isArray(hierarchyData.admin.children)).toBe(true)
    expect(hierarchyData.admin.children.length).toBe(2)
  })

  it('contains supervisor data', () => {
    hierarchyData.admin.children.forEach((supervisor, index) => {
      expect(supervisor).toHaveProperty('name', `Supervisor ${index + 1}`)
      expect(supervisor).toHaveProperty('role', 'Supervisor')
      expect(supervisor).toHaveProperty('profilePicture', 'https://via.placeholder.com/150')
      expect(supervisor).toHaveProperty('children')
      expect(Array.isArray(supervisor.children)).toBe(true)
      expect(supervisor.children.length).toBe(2)
    })
  })

  it('contains operator data', () => {
    hierarchyData.admin.children.forEach((supervisor) => {
      supervisor.children.forEach((operator, index) => {
        expect(operator).toHaveProperty('role', 'Operator')
        expect(operator).toHaveProperty('profilePicture', 'https://via.placeholder.com/150')
      })
    })
  })
})
