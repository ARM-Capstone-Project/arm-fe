import isAdmin from '../../src/common/Helpers'
import { describe, it, expect } from 'vitest'

describe('isAdmin', () => {
  it('should return true for a user with ADMIN role', () => {
    const user = { roles: ['USER', 'ADMIN'] }
    expect(isAdmin(user)).toBe(true)
  })

  it('should return false for a user without ADMIN role', () => {
    const user = { roles: ['USER'] }
    expect(isAdmin(user)).toBe(false)
  })

  it('should return false for a user with no roles', () => {
    const user = { roles: [] }
    expect(isAdmin(user)).toBe(false)
  })

  it('should return false for a null user', () => {
    expect(isAdmin(null)).toBe(null)
  })

  it('should return false for an undefined user', () => {
    expect(isAdmin(undefined)).toBe(undefined)
  })
})
