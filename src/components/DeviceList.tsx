import React, { useState } from 'react';
import { Device } from '../types/device';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTv, faStopCircle, faWandMagic, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons';

interface DeviceListProps {
  devices: Device[];
  onEdit: (deviceId: string) => void;
  onView: (deviceId: string) => void;
  onRemove: (deviceId: string) => void;
}

const DeviceList: React.FC<DeviceListProps> = ({ devices, onEdit, onView, onRemove }) => {
  const [sortColumn, setSortColumn] = useState<keyof Device>('deviceId');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filters, setFilters] = useState({
    deviceId: '',
    deviceName: '',
    deviceType: '',
    status: '',
    zone: '',
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
      device.deviceId.toLowerCase().includes(filters.deviceId.toLowerCase())
    )
    .filter((device) =>
      device.deviceName.toLowerCase().includes(filters.deviceName.toLowerCase())
    )
    .filter((device) =>
      device.deviceType.toLowerCase().includes(filters.deviceType.toLowerCase())
    )
    .filter((device) =>
      filters.status ? device.status.toLowerCase() === filters.status.toLowerCase() : true
    )
    .filter((device) =>
      device.status.toLowerCase().includes(filters.zone.toLowerCase())
    )
    .filter((device) =>
      device.location.toLowerCase().includes(filters.location.toLowerCase())
    );

  const sortedDevices = filteredDevices.sort((a, b) => {
    const order = sortOrder === 'asc' ? 1 : -1;

    if (a[sortColumn] < b[sortColumn]) return -1 * order;
    if (a[sortColumn] > b[sortColumn]) return 1 * order;
    return 0;
  });

  return (
    <div>
      <table className="min-w-full bg-white border-collapse">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200 cursor-pointer" onClick={() => handleSort('deviceId')}>
              ID {sortColumn === 'deviceId' && (sortOrder === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)}
            </th>
            <th className="py-2 px-4 border-b border-gray-200 cursor-pointer" onClick={() => handleSort('deviceName')}>
              Name {sortColumn === 'deviceName' && (sortOrder === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)}
              
            </th>
            <th className="py-2 px-4 border-b border-gray-200 cursor-pointer" onClick={() => handleSort('deviceType')}>
              Type {sortColumn === 'deviceType' && (sortOrder === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)}
              
            </th>
            <th className="py-2 px-4 border-b border-gray-200 cursor-pointer" onClick={() => handleSort('status')}>
              Status {sortColumn === 'status' && (sortOrder === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)}
              
            </th>
            <th className="py-2 px-4 border-b border-gray-200 cursor-pointer" onClick={() => handleSort('zone')}>
              Zone {sortColumn === 'zone' && (sortOrder === 'asc' ? <FontAwesomeIcon icon={faSortUp} /> : <FontAwesomeIcon icon={faSortDown} />)}
              
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
                name="deviceId"
                placeholder="Filter ID"
                value={filters.deviceId}
                onChange={handleFilterChange}
                className="border p-1 mt-1 w-full"
              />
          </td>
          <td>
          <input
                type="text"
                name="deviceName"
                placeholder="Filter Name"
                value={filters.deviceName}
                onChange={handleFilterChange}
                className="border p-1 mt-1 w-full"
              />
          </td>
          <td>
          <input
                type="text"
                name="deviceType"
                placeholder="Filter Type"
                value={filters.deviceType}
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
                value={filters.zone}
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
            <tr key={device.deviceId}>
              <td className="py-2 px-4 border-b border-gray-200">{device.deviceId}</td>
              <td className="py-2 px-4 border-b border-gray-200">{device.deviceName}</td>
              <td className="py-2 px-4 border-b border-gray-200">{device.deviceType}</td>
              <td className={`py-2 px-4 border-b border-gray-200 ${device.status === 'active' ? 'text-green-500' : 'text-red-500'}`}>
                {device.status}
              </td>
              <td className="py-2 px-4 border-b border-gray-200">{device.zone}</td>
              <td className="py-2 px-4 border-b border-gray-200">{device.location}</td>
              <td className="py-2 px-4 border-b border-gray-200 flex gap-2">
                <FontAwesomeIcon icon={faTv} title="View" onClick={() => onView(device.deviceId)} />
                <FontAwesomeIcon icon={faWandMagic} title="Edit" onClick={() => onEdit(device.deviceId)} />
                <FontAwesomeIcon icon={faStopCircle} title="Remove" onClick={() => onRemove(device.deviceId)} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeviceList;