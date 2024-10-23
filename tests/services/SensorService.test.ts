import { describe, it, expect, vi } from 'vitest'
import api from '../../src/api/index'
import { fetchSensorsByDeviceId } from '../../src/services/SensorService'
import { Sensor } from '../../src/types/device'

vi.mock('../../src/api/index', () => ({
  default: {
    get: vi.fn(),
  },
}))

describe('Sensor Service', () => {
  const mockSensors: Sensor[] = [{ id: '1', name: 'Temperature Sensor' }]

  describe('fetchSensorsByDeviceId', () => {
    it('should fetch sensors by device ID', async () => {
      ;(api.get as vi.Mock).mockResolvedValue({ data: mockSensors })
      const sensors = await fetchSensorsByDeviceId('device-1')
      expect(api.get).toHaveBeenCalledWith('sensors/device/device-1')
      expect(sensors).toEqual(mockSensors)
    })

    it('should throw an error if fetching sensors fails', async () => {
      const errorMessage = 'Network Error'
      ;(api.get as vi.Mock).mockRejectedValue(new Error(errorMessage))
      await expect(fetchSensorsByDeviceId('device-1')).rejects.toThrow(
        `Error fetching sensors: Error: ${errorMessage}`,
      )
    })
  })
})
