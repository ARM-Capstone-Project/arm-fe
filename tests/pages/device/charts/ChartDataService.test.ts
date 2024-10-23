import { fetchSensorDataByDeviceId } from '../../../../src/pages/device/charts/ChartDataService'
import axios from 'axios'
import { describe, it, expect, vi } from 'vitest'

vi.mock('axios')

describe('fetchSensorDataByDeviceId', () => {
  const mockDeviceId = 'device-123'
  const mockSensorData = [
    { id: '1', value: 22, timestamp: '2021-01-01T00:00:00Z' },
    { id: '2', value: 24, timestamp: '2021-01-01T01:00:00Z' },
  ]

  it('fetches sensor data successfully', async () => {
    ;(axios.get as vi.Mock).mockResolvedValue({ data: mockSensorData })

    const result = await fetchSensorDataByDeviceId(mockDeviceId)

    expect(axios.get).toHaveBeenCalledWith(
      `http://localhost:8081/api/sensor-readings/by-device-id/${mockDeviceId}`,
    )
    expect(result).toEqual(mockSensorData)
  })

  it('logs an error if fetching sensor data fails', async () => {
    const errorMessage = 'Network Error'
    ;(axios.get as vi.Mock).mockRejectedValue(new Error(errorMessage))

    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    await expect(fetchSensorDataByDeviceId(mockDeviceId)).rejects.toThrow(errorMessage)
    expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching sensor data:', expect.any(Error))

    consoleErrorSpy.mockRestore()
  })
})
