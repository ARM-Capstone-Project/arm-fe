import React, { useState } from 'react';
import { Device } from '../types/device';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv, faStopCircle, faWandMagic, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

interface DeviceListProps {
  devices: Device[];
  onEdit: (device: Device) => void;
  onView: (ddevice: Device) => void;
  onRemove: (ddevice: Device) => void;
}

const DeviceList: React.FC<DeviceListProps> = ({ devices, onEdit, onView, onRemove }) => {
  const [sortColumn, setSortColumn] = useState<keyof Device>('id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filters, setFilters] = useState({
    tagNo: '',
    id: '',
    name: '',
    type: '',
    status: '',
    zoneName: '',
    location: '',    
  });

  const handleSort = (column: keyof Device) => {
    if (sortColumn === column) {
      setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const filteredDevices = devices
  .filter((device) =>
    (device.tagNo?.toLowerCase() ?? '').includes(filters.tagNo?.toLowerCase() ?? '')
  )
  .filter((device) =>
    (device.name?.toLowerCase() ?? '').includes(filters.name?.toLowerCase() ?? '')
  )
  .filter((device) =>
    (device.type?.toLowerCase() ?? '').includes(filters.type?.toLowerCase() ?? '')
  )
  .filter((device) =>
    filters.status ? (device.status?.toLowerCase() ?? '') === filters.status?.toLowerCase() : true
  )
  .filter((device) =>
    (device.zoneName?.toLowerCase() ?? '').includes(filters.zoneName?.toLowerCase() ?? '')
  )
  .filter((device) =>
    (device.location?.toLowerCase() ?? '').includes(filters.location?.toLowerCase() ?? '')
  );

const sortedDevices = filteredDevices.sort((a, b) => {
  const order = sortOrder === 'asc' ? 1 : -1;

  if ((a[sortColumn] ?? '') < (b[sortColumn] ?? '')) return -1 * order;
  if ((a[sortColumn] ?? '') > (b[sortColumn] ?? '')) return 1 * order;
  return 0;
});


  return (
    <div>
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200 cursor-pointer" onClick={() => handleSort('tagNo')}>
              Tag Number {sortColumn === 'tagNo' && (sortOrder === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)}
            </th>
            <th className="py-2 px-4 border-b border-gray-200 cursor-pointer" onClick={() => handleSort('name')}>
              Name {sortColumn === 'name' && (sortOrder === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)}
              
            </th>
            <th className="py-2 px-4 border-b border-gray-200 cursor-pointer" onClick={() => handleSort('type')}>
              Type {sortColumn === 'type' && (sortOrder === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)}
              
            </th>
            <th className="py-2 px-4 border-b border-gray-200 cursor-pointer" onClick={() => handleSort('status')}>
              Status {sortColumn === 'status' && (sortOrder === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)}
              
            </th>
            <th className="py-2 px-4 border-b border-gray-200 cursor-pointer" onClick={() => handleSort('zoneName')}>
              Zone {sortColumn === 'zoneName' && (sortOrder === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)}
              
            </th>
            <th className="py-2 px-4 border-b border-gray-200 cursor-pointer" onClick={() => handleSort('location')}>
              Location {sortColumn === 'location' && (sortOrder === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)}
              
            </th>
            <th className="py-2 px-4 border-b border-gray-200">Actions</th>
          </tr>
        </thead>
        <tbody>
        <tr >
          <td>
          <input
                type="text"
                name="tagNo"
                placeholder="Filter Tag No"
                value={filters.tagNo}
                onChange={handleFilterChange}
                className="border p-1 mt-1 w-full"
              />
          </td>
          <td>
          <input
                type="text"
                name="deviceName"
                placeholder="Filter Name"
                value={filters.name}
                onChange={handleFilterChange}
                className="border p-1 mt-1 w-full"
              />
          </td>
          <td>
          <input
                type="text"
                name="deviceType"
                placeholder="Filter Type"
                value={filters.type}
                onChange={handleFilterChange}
                className="border p-1 mt-1 w-full"
              />
          </td>
          <td>
          <select
                name="status"
                value={filters.status}
                onChange={handleFilterChange}
                className="border p-1 mt-1 w-full"
              >
                <option value="">All</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
          </td>
          <td>
          <input
                type="text"
                name="zone"
                placeholder="Filter Zone"
                value={filters.zoneName}
                onChange={handleFilterChange}
                className="border p-1 mt-1 w-full"
              />
          </td>
          <td>
          <input
                type="text"
                name="location"
                placeholder="Filter Location"
                value={filters.location}
                onChange={handleFilterChange}
                className="border p-1 mt-1 w-full"
              />
          </td>
        </tr>
          {sortedDevices.map((device) => (
            <tr key={device.id}>
              <td className="py-2 px-4 border-b border-gray-200">{device.tagNo}</td>
              <td className="py-2 px-4 border-b border-gray-200">{device.name}</td>
              <td className="py-2 px-4 border-b border-gray-200">{device.type}</td>
              <td className={`py-2 px-4 border-b border-gray-200 ${device.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>
                {device.status}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">{device.zoneName}</td>
              <td className="py-2 px-4 border-b border-gray-200">{device.location}</td>
              <td className="py-2 px-4 border-b border-gray-200 flex gap-2">
                <FontAwesomeIcon icon={faTv} title="View" onClick={() => onView(device)} />
                <FontAwesomeIcon icon={faWandMagic} title="Edit" onClick={() => onEdit(device)} />
                <FontAwesomeIcon icon={faStopCircle} title="Remove" onClick={() => onRemove(device)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeviceList;