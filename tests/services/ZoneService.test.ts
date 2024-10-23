import { describe, it, expect, vi } from 'vitest'
import api from '../../src/api/index'
import { fetchZoneById, fetchAllZones } from '../../src/services/ZoneService'
import { Zone } from '../../src/types/device'

vi.mock('../../src/api/index', () => ({
  default: {
    get: vi.fn(),
  },
}))

describe('Zone Service', () => {
  const mockZone: Zone = { id: '1', name: 'Living Room' }
  const mockZones: Zone[] = [
    { id: '1', name: 'Living Room' },
    { id: '2', name: 'Bedroom' },
  ]

  describe('fetchZoneById', () => {
    it('should fetch a zone by ID', async () => {
      ;(api.get as vi.Mock).mockResolvedValue({ data: mockZone })
      const zone = await fetchZoneById('1')
      expect(api.get).toHaveBeenCalledWith('zones/1')
      expect(zone).toEqual(mockZone)
    })

    it('should throw an error if fetching a zone fails', async () => {
      const errorMessage = 'Network Error'
      ;(api.get as vi.Mock).mockRejectedValue(new Error(errorMessage))
      await expect(fetchZoneById('1')).rejects.toThrow(
        `Error fetching device: Error: ${errorMessage}`,
      )
    })
  })

  describe('fetchAllZones', () => {
    it('should fetch all zones', async () => {
      ;(api.get as vi.Mock).mockResolvedValue({ data: mockZones })
      const zones = await fetchAllZones()
      expect(api.get).toHaveBeenCalledWith('zones')
      expect(zones).toEqual(mockZones)
    })

    it('should throw an error if fetching zones fails', async () => {
      const errorMessage = 'Network Error'
      ;(api.get as vi.Mock).mockRejectedValue(new Error(errorMessage))
      await expect(fetchAllZones()).rejects.toThrow(`Error fetching zones: Error: ${errorMessage}`)
    })
  })
})
