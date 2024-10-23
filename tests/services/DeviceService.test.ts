import { describe, it, expect, vi } from 'vitest'
import api from '../../src/api/index'
import {
  fetchDevice,
  fetchAllDevices,
  deleteDevice,
  saveDevice,
  createDevice,
} from '../../src/services/DeviceService'
import { Device } from '../../src/types/device'

vi.mock('../../src/api/index', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}))

describe('Device Service', () => {
  const mockDevice: Device = { id: '1', name: 'Test Device' }

  describe('fetchDevice', () => {
    it('should fetch a device by ID', async () => {
      ;(api.get as vi.Mock).mockResolvedValue({ data: mockDevice })
      const device = await fetchDevice('1')
      expect(api.get).toHaveBeenCalledWith('devices/1')
      expect(device).toEqual(mockDevice)
    })

    it('should throw an error if fetching a device fails', async () => {
      const errorMessage = 'Network Error'
      ;(api.get as vi.Mock).mockRejectedValue(new Error(errorMessage))
      await expect(fetchDevice('1')).rejects.toThrow(
        `Error fetching device: Error: ${errorMessage}`,
      )
    })
  })

  describe('fetchAllDevices', () => {
    it('should fetch all devices', async () => {
      ;(api.get as vi.Mock).mockResolvedValue({ data: [mockDevice] })
      const devices = await fetchAllDevices()
      expect(api.get).toHaveBeenCalledWith('devices')
      expect(devices).toEqual([mockDevice])
    })

    it('should throw an error if fetching devices fails', async () => {
      const errorMessage = 'Network Error'
      ;(api.get as vi.Mock).mockRejectedValue(new Error(errorMessage))
      await expect(fetchAllDevices()).rejects.toThrow(
        `Error fetching devices: Error: ${errorMessage}`,
      )
    })
  })

  describe('deleteDevice', () => {
    it('should delete a device', async () => {
      ;(api.delete as vi.Mock).mockResolvedValue({})
      await deleteDevice('1')
      expect(api.delete).toHaveBeenCalledWith('devices/1')
    })

    it('should throw an error if deleting a device fails', async () => {
      const errorMessage = 'Network Error'
      ;(api.delete as vi.Mock).mockRejectedValue(new Error(errorMessage))
      await expect(deleteDevice('1')).rejects.toThrow(
        `Error deleting device: Error: ${errorMessage}`,
      )
    })
  })

  describe('saveDevice', () => {
    it('should save a device', async () => {
      ;(api.put as vi.Mock).mockResolvedValue({})
      await saveDevice('1', mockDevice)
      expect(api.put).toHaveBeenCalledWith('devices/1', mockDevice)
    })

    it('should throw an error if saving a device fails', async () => {
      const errorMessage = 'Network Error'
      ;(api.put as vi.Mock).mockRejectedValue(new Error(errorMessage))
      await expect(saveDevice('1', mockDevice)).rejects.toThrow(
        `Error updating device: Error: ${errorMessage}`,
      )
    })
  })

  describe('createDevice', () => {
    it('should create a device', async () => {
      ;(api.post as vi.Mock).mockResolvedValue({ data: mockDevice })
      const device = await createDevice(mockDevice)
      expect(api.post).toHaveBeenCalledWith('devices', mockDevice)
      expect(device).toEqual(mockDevice)
    })

    it('should throw an error if creating a device fails', async () => {
      const errorMessage = 'Network Error'
      ;(api.post as vi.Mock).mockRejectedValue(new Error(errorMessage))
      await expect(createDevice(mockDevice)).rejects.toThrow(
        `Error creting device: Error: ${errorMessage}`,
      )
    })
  })
})
