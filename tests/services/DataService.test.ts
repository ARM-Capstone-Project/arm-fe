import { describe, it, expect, vi } from 'vitest'
import axios from 'axios'
import { saveThreshold, fetchThresholds } from '../../src/services/DataService'
import ThresholdSetting from '../../src/pages/device/interfaces/ThresholdSetting'

vi.mock('axios')

describe('Threshold Service', () => {
  const mockThreshold: ThresholdSetting = {
    id: 1,
    name: 'Test Threshold',
    value: 100,
  }

  describe('saveThreshold', () => {
    it('should save a threshold and log the response', async () => {
      ;(axios.post as vi.Mock).mockResolvedValue({ data: 'Success' })
      const consoleLogSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
      await saveThreshold(mockThreshold)
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:8081/api/device-thresholds',
        mockThreshold,
        {
          headers: { 'Content-Type': 'application/json' },
        },
      )
      expect(consoleLogSpy).toHaveBeenCalledWith('Success')
      consoleLogSpy.mockRestore()
    })

    it('should log an error if saving the threshold fails', async () => {
      const errorMessage = 'Network Error'
      ;(axios.post as vi.Mock).mockRejectedValue(new Error(errorMessage))
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      await saveThreshold(mockThreshold)
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error saving threshold:', expect.any(Error))
      consoleErrorSpy.mockRestore()
    })
  })

  describe('fetchThresholds', () => {
    it('should fetch thresholds successfully', async () => {
      ;(axios.get as vi.Mock).mockResolvedValue({ data: [mockThreshold] })
      const thresholds = await fetchThresholds()
      expect(axios.get).toHaveBeenCalledWith('http://localhost:8081/api/device-thresholds')
      expect(thresholds).toEqual([mockThreshold])
    })

    it('should return an empty array if fetching thresholds fails', async () => {
      const errorMessage = 'Network Error'
      ;(axios.get as vi.Mock).mockRejectedValue(new Error(errorMessage))
      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
      const thresholds = await fetchThresholds()
      expect(thresholds).toEqual([])
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching thresholds:', expect.any(Error))
      consoleErrorSpy.mockRestore()
    })
  })
})
