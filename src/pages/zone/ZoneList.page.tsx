import React, { useState, useEffect } from 'react'
import { FaTrash } from 'react-icons/fa'
import { MapContainer, TileLayer, Circle, Popup } from 'react-leaflet'
import { Link } from 'react-router-dom'
import Pagination from '../../components/Pagination'
import Table from '../../components/Table'
import Title from '../../components/Title'
import api from '../../api/index'

interface Zone {
  id: string
  name: string
  latitude: number
  longitude: number
  radius: number
}

const ZoneList: React.FC = () => {
  const [zones, setZones] = useState<Zone[]>([])
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(5)
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  useEffect(() => {
    const fetchZones = async () => {
      try {
        const response = await api.get('/zones')
        const data = response.data as Zone[]
        setZones(data)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(`Failed to fetch zones, ${error}`)
      }
    }

    fetchZones()
  }, [])

  const filteredZones = zones.filter((zone) =>
    zone.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const sortedZones = filteredZones.sort((a, b) => {
    const nameA = a.name.toUpperCase()
    const nameB = b.name.toUpperCase()

    return sortOrder === 'asc' ? (nameA < nameB ? -1 : 1) : nameA > nameB ? -1 : 1
  })

  const totalPages = Math.ceil(sortedZones.length / itemsPerPage)
  const currentZones = sortedZones.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  )

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this zone?')) {
      try {
        await api.delete(`/zones/${id}`)
        setZones((prevZones) => prevZones.filter((zone) => zone.id !== id))
        alert(`Deleted Zone ID: ${id} successfully`)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(`Failed to delete zone, ${error.message}`)
      }
    }
  }

  const handleSortChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
  }

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber)
  }

  const headers = (
    <tr>
      <th
        scope="col"
        className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
      >
        Code
      </th>
      <th
        scope="col"
        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
        onClick={handleSortChange}
      >
        Name {sortOrder === 'asc' ? '▲' : '▼'}
      </th>
      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
        Latitude
      </th>
      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
        Longitude
      </th>
      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
        Radius
      </th>
      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
        Actions
      </th>
    </tr>
  )

  const rows = (
    <>
      {currentZones.length > 0 ? (
        currentZones.map((zone) => (
          <tr key={zone.id}>
            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
              <Link to={`/zones/${zone.id}`} className="text-indigo-600 hover:text-indigo-900">
                {zone.id}
              </Link>
            </td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{zone.name}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{zone.latitude}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{zone.longitude}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{zone.radius}</td>
            <td className="whitespace-nowrap px-3 py-4 text-sm flex space-x-4">
              <FaTrash
                id={`trash-${zone.id}`}
                className="text-red-500 cursor-pointer"
                onClick={() => handleDelete(zone.id)}
              />
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan={5} className="text-center py-4 text-gray-500">
            No Zones Found.
          </td>
        </tr>
      )}
    </>
  )

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center ">
        <Title title="View Zones" />
        <Link to="/zone/new">
          <button className="flex items-center mb-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Add New Zone
          </button>
        </Link>
      </div>
      {error && <div className="mb-4 text-red-600">{error}</div>}
      <div className="bg-white rounded-lg shadow-md p-4">
        <div className="flex mb-4">
          <input
            type="text"
            placeholder="Search by zone name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
          <button className="ml-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </div>
        <div className="mt-8 flow-root">
          <Table headers={headers} rows={rows} />
        </div>
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Map of Singapore</h2>
        <div className="map-container">
          <MapContainer
            center={[1.3521, 103.8198]}
            zoom={12}
            style={{ height: '600px', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {zones.map((zone) => (
              <Circle
                key={zone.id}
                center={[zone.latitude, zone.longitude]}
                radius={zone.radius}
                pathOptions={{
                  color: 'blue',
                  fillColor: 'blue',
                  fillOpacity: 0.3,
                }}
              >
                <Popup>
                  <p>{zone.id}</p>
                  <p></p>
                  <p>Latitude: {zone.latitude}</p>
                  <p>Longitude: {zone.longitude}</p>
                </Popup>
              </Circle>
            ))}
          </MapContainer>
        </div>
      </div>
    </div>
  )
}

export default ZoneList
