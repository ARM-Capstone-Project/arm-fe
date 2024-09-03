import React, { useState } from 'react';
import Pagination from '../../components/Pagination';
import Table from '../../components/Table';
import Title from '../../components/Title';

// Generate mock data
const generateMockUsers = () => {
  const users = [];

  users.push({ id: 1, name: 'Admin User', role: 'Admin' });

  for (let i = 2; i <= 9; i++) {
    users.push({ id: i, name: `Supervisor ${i}`, role: 'Supervisor' });
  }

  for (let i = 10; i <= 12; i++) {
    users.push({ id: i, name: `Operator ${i}`, role: 'Operator' });
  }

  return users;
};

const UserList: React.FC = () => {
  const [users, setUsers] = useState(generateMockUsers());
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedRole, setSelectedRole] = useState('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [newUserName, setNewUserName] = useState('');
  const [newUserRole, setNewUserRole] = useState('Operator'); // Default role for new user

  // Filter users by role
  const filteredUsers = selectedRole
    ? users.filter((user) => user.role === selectedRole)
    : users;

  // Sort users by name
  const sortedUsers = filteredUsers.sort((a, b) => {
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

  // Calculate total pages
  const totalPages = Math.ceil(sortedUsers.length / itemsPerPage);

  // Get current page users
  const currentUsers = sortedUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle pagination
  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Handle role filter change
  const handleRoleFilterChange = (role: string) => {
    setSelectedRole(role);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Handle sort change
  const handleSortChange = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Handle adding a new user
  const handleAddUser = () => {
    const newUser = {
      id: users.length + 1,
      name: newUserName,
      role: newUserRole,
    };

    setUsers([...users, newUser]);
    setNewUserName('');
  };

  const headers = (
    <tr>
      <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
        ID
      </th>
      <th 
        scope="col" 
        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
        onClick={handleSortChange}
      >
        Name {sortOrder === 'asc' ? '▲' : '▼'}
      </th>
      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
        Role
      </th>
      <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
        Actions
      </th>
  </tr>
  );
  
  const rows = (
    <>
      {currentUsers.map((user) => (
        <tr key={user.id}>
          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
              {user.id}
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {user.name}
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
              {user.role}
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm flex space-x-4">
            <button
                className={`px-2 py-1 rounded ${
                    user.role === 'Admin' ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'bg-red-500 text-white'
                }`}
                disabled={user.role === 'Admin'}
            >
                Delete
            </button>
            <a
                href="/assign_device"
                className={`mx-3 px-2 py-1 rounded ${
                    user.role === 'Admin' ? 'bg-gray-300 text-gray-500 cursor-not-allowed' : 'text-blue-500'
                }`}
            >
                Assign
            </a>
          </td>
        </tr>
      ))}
    </>
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Title title="User Management" />

      {/* Add User Form */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Add New User</h3>
        <div className="flex space-x-2 items-center">
          <input
            type="text"
            placeholder="Enter name"
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
            className="px-4 py-2 border rounded-md focus:ring focus:ring-opacity-50 focus:ring-blue-300 flex-grow"
          />
          <select
            value={newUserRole}
            onChange={(e) => setNewUserRole(e.target.value)}
            className="px-4 py-2 border rounded-md focus:ring focus:ring-opacity-50 focus:ring-blue-300"
          >
            {/* <option value="Admin">Admin</option> */}
            <option value="Supervisor">Supervisor</option>
            <option value="Operator">Operator</option>
            {/* Add additional roles as needed */}
          </select>
          <button
            onClick={handleAddUser}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Add
          </button>
        </div>
      </div>

      <div className="mb-4 w-1/4">
        <label className="block text-gray-700 mb-2">Filter by Role</label>
        <select
          value={selectedRole}
          onChange={(e) => handleRoleFilterChange(e.target.value)}
          className="block w-full px-4 py-2 border rounded-md focus:ring focus:ring-opacity-50 focus:ring-blue-300"
        >
          <option value="">All</option>
          <option value="Admin">Admin</option>
          <option value="Supervisor">Supervisor</option>
          <option value="Operator">Operator</option>
        </select>
      </div>

      <Table headers={headers} rows={rows} />

      <Pagination 
        currentPage={currentPage} 
        totalPages={totalPages} 
        onPageChange={handlePageChange} 
      />
    </div>
  );
};

export default UserList;
