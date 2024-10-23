import axios from 'axios'
import api from '../../src/api'
import { describe, it, expect, beforeEach, vi } from 'vitest'

describe('API Axios Instance', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('should have the correct base URL and headers', () => {
    expect(api.defaults.baseURL).toBe('http://localhost:8081/api/')
    expect(api.defaults.headers['Content-Type']).toBe('application/json')
  })

  it('should reject promises with an error when the request fails', async () => {
    const mockRequest = vi.spyOn(axios, 'request').mockRejectedValue(new Error('Network Error'))

    await expect(api.get('/test-endpoint')).rejects.toThrow('Network Error')

    mockRequest.mockRestore()
  })
})
