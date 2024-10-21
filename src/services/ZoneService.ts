import { Zone } from '../types/device'
import api from '../api/index'

export const fetchZoneById = async (zoneId: string): Promise<Zone> => {
  try {
    const response = await api.get<Zone>(`zones/${zoneId}`)
    return response.data
  } catch (error) {
    console.error('Error fetching device: ', error)
    throw new Error(`Error fetching device: ${error}`)
  }
}

export const fetchAllZones = async (): Promise<Zone[]> => {
  try {
    const response = await api.get<Zone[]>('zones')
    return response.data
  } catch (error) {
    console.error('Error fetching zones:', error)
    throw new Error(`Error fetching zones: ${error}`)
  }
}
