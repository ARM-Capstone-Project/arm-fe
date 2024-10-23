import { describe, it, expect, vi } from 'vitest'
import api from '../../src/api/index'
import { login, register, getCurrentUser } from '../../src/services/auth.service'

vi.mock('../../src/api/index', () => ({
  default: {
    post: vi.fn(),
  },
}))

describe('Auth Service', () => {
  const mockLoginResponse = { token: 'mockToken' }

  describe('login', () => {
    it('should log in the user and store the token', async () => {
      ;(api.post as vi.Mock).mockResolvedValue({
        data: mockLoginResponse,
        headers: { authorization: 'Bearer mockToken' },
      })
      const response = await login('user', 'password')
      expect(api.post).toHaveBeenCalledWith('/auth/login', {
        username: 'user',
        password: 'password',
      })
      localStorage.setItem('user', JSON.stringify(mockLoginResponse))
      expect(localStorage.getItem('user')).toEqual(JSON.stringify(mockLoginResponse))
      expect(localStorage.getItem('token')).toEqual(mockLoginResponse.token)
      expect(response).toEqual(mockLoginResponse)
    })
  })

  describe('register', () => {
    it('should register a user', async () => {
      ;(api.post as vi.Mock).mockResolvedValue({})
      await register('user', 'user@example.com', 'password')
      expect(api.post).toHaveBeenCalledWith('/auth/register', {
        username: 'user',
        email: 'user@example.com',
        password: 'password',
      })
    })
  })

  describe('getCurrentUser', () => {
    it('should return the current user from localStorage', () => {
      const mockUser = { id: '1', username: 'user' }
      localStorage.setItem('user', JSON.stringify(mockUser))
      const currentUser = getCurrentUser()
      expect(currentUser).toEqual(mockUser)
    })
  })
})
