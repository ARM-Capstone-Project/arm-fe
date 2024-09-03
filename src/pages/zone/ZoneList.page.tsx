import React, { useState, useEffect } from 'react';
import { FaTrash } from 'react-icons/fa';
import { MapContainer, TileLayer, Polygon, Popup } from 'react-leaflet';
import { Link } from 'react-router-dom';

interface Zone {
    id: number;
    code: string;
    name: string;
    description: string;
    coordinates: [number, number][]; // Polygon coordinates for the zone area
}

const purpleOptions = { fillColor: 'blue', color: 'purple', weight: 2 }; 

const ZoneList: React.FC = () => {
    const [zones, setZones] = useState<Zone[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5);
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

    useEffect(() => {
        const fetchZones = async () => {
            const data: Zone[] = [
                { id: 1, code: 'JI01', name: 'Jurong Island', description: 'Industrial zone in the southwest.', coordinates: [[1.2663, 103.7072], [1.2653, 103.7172], [1.2763, 103.7172], [1.2763, 103.7072]] },
                { id: 2, code: 'BT01', name: 'Bukit Timah', description: 'Residential area known for Bukit Timah Nature Reserve.', coordinates: [[1.3403, 103.7764], [1.3503, 103.7764], [1.3503, 103.7664], [1.3403, 103.7664]] },
                { id: 3, code: 'AMK01', name: 'Ang Mo Kio', description: 'Mature residential town in central Singapore.', coordinates: [[1.3691, 103.8497], [1.3791, 103.8497], [1.3791, 103.8397], [1.3691, 103.8397]] },
                { id: 4, code: 'PG01', name: 'Punggol', description: 'Waterfront residential town in the northeast.', coordinates: [[1.4043, 103.9020], [1.4143, 103.9020], [1.4143, 103.8920], [1.4043, 103.8920]] },
                { id: 5, code: 'WL01', name: 'Woodlands', description: 'Residential town in the northern region.', coordinates: [[1.4355, 103.7865], [1.4455, 103.7865], [1.4455, 103.7765], [1.4355, 103.7765]] },
            ];
            setZones(data);
        };
        fetchZones();
    }, []);

    // Filter and sort zones
    const filteredZones = zones.filter(zone =>
        zone.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const sortedZones = filteredZones.sort((a, b) => {
        const nameA = a.name.toUpperCase();
        const nameB = b.name.toUpperCase();

        if (nameA < nameB) {
            return sortOrder === 'asc' ? -1 : 1;
        }
        if (nameA > nameB) {
            return sortOrder === 'asc' ? 1 : -1;
        }
        return 0;
    });

    // Pagination logic
    const totalPages = Math.ceil(sortedZones.length / itemsPerPage);
    const currentZones = sortedZones.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleDelete = (id: number) => {
        setZones(zones.filter(zone => zone.id !== id));
        console.log(`Deleted Zone ID: ${id}`);
    };

    const handleSortChange = () => {
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
      };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-semibold text-gray-800">View Zones</h1>
                <Link to="/zone/new">
                    <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        Add New Zone
                    </button>
                </Link>
            </div>
            <div className="bg-white rounded-lg shadow-md p-4">
                <div className="flex mb-4">
                    <input
                        type="text"
                        placeholder="Search by zone name..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
                    />
                    <button className="ml-2 px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                            <path stroke-linecap="round" stroke-linejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                </div>
                <div className="mt-8 flow-root">
                    <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-300">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
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
                                                Description
                                            </th>
                                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 bg-white">
                                        {currentZones.length > 0 ? (
                                            currentZones.map(zone => (
                                                <tr key={zone.code}>
                                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                                                        <Link to={`/zones/${zone.id}`} className="text-indigo-600 hover:text-indigo-900">
                                                            {zone.code}
                                                        </Link>
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        {zone.name}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                        {zone.description}
                                                    </td>
                                                    <td className="whitespace-nowrap px-3 py-4 text-sm flex space-x-4">
                                                        <FaTrash
                                                            className="text-red-500 cursor-pointer"
                                                            onClick={() => handleDelete(zone.id)}
                                                        />
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={4} className="text-center py-4 text-gray-500">
                                                    No Zones Found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                            
                        </div>
                    </div>
                </div>
                
            </div>
            <div className="flex justify-between items-center mt-4">
                <button
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                disabled={currentPage === 1}
                >
                    Previous
                </button>
                <div className="text-gray-700">
                    Page {currentPage} of {totalPages}
                </div>
                <button
                onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
                disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
            <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Map of Singapore</h2>
                <div className="map-container">
                    <MapContainer center={[1.3521, 103.8198]} zoom={12} style={{ height: '600px', width: '100%' }}>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        />
                        {zones.map(zone => (
                            <Polygon
                                key={zone.code}
                                positions={zone.coordinates}
                                pathOptions={purpleOptions} // Apply style options
                            >
                                <Popup>
                                    <p>{zone.code}</p>
                                    <p><strong>{zone.name}</strong></p>
                                    Description: {zone.description}
                                </Popup>
                            </Polygon>
                        ))}
                    </MapContainer>
                </div>
            </div>
        </div>
    );
};

export default ZoneList;