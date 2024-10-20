import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/index";
import Pagination from "../../components/Pagination";
import Table from "../../components/Table";
import Title from "../../components/Title";
import UserRoleTable from "./UserRoleTable.page.tsx";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [selectedRole, setSelectedRole] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const navigate = useNavigate(); // React Router's navigation hook

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await api.get("/users");
        setUsers(response.data);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setError(`Failed to fetch users, ${error}`);
      }
    };

    fetchUsers();

  }, []);


  // Filter users by role
  const filteredUsers = selectedRole
    ? users.filter((user) =>  user.roles.some(role => role.name === selectedRole))
    : users;

  // const filterUsersByRole = (users: User[], roleName: string): User[] => {
  //   return users.filter(user => 
  //     user.roles.some(role => role.name === roleName)
  //   );
  // };

    // const adminUsers = filterUsersByRole(users, "ADMIN");
    // console.log(adminUsers);

  // Sort users by name
  const sortedUsers = filteredUsers.toSorted((a, b) => {
    const nameA = a.username.toUpperCase();
    const nameB = b.username.toUpperCase();

    if (nameA < nameB) {
      return sortOrder === "asc" ? -1 : 1;
    }
    if (nameA > nameB) {
      return sortOrder === "asc" ? 1 : -1;
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
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  // Handle adding a new user
  // const handleAddUser = () => {
  //   const newUser = {
  //     id: users.length + 1,
  //     name: newUserName,
  //     role: newUserRole,
  //   };

  //   setUsers([...users, newUser]);
  //   setNewUserName("");
  // };

  const handleUserClick = (userId: string) => {
    navigate(`/users/${userId}`); // Navigate to the user details page
  };

  const allRoles = ['ADMIN' , 'MANAGER', 'OPERATOR' ,'USER'];

  const headers = (
    <tr>
      <th
        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 cursor-pointer"
        onClick={handleSortChange}
      >
        Name {sortOrder === "asc" ? "▲" : "▼"}
      </th>
      <th 
        // scope="col"
        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
       >
        <div className="overflow-x-auto w-full max-w-md">
            <ul className="flex space-x-4">
                {allRoles.map((role) => (
                    <li key={role} className="px-4 py-2 text-center w-60">{role}</li>
                ))}
            </ul>
</div>
      </th>
      <th
        // scope="col"
        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
      >
        Actions
      </th>
    </tr>
  );

  const rows = (
    <>
      {currentUsers.map((user) => (
        <tr key={user.id}>
          <td className="whitespace-nowrap px-3 py-4 text-sm ">
            <a
              className="username_txt"
              onClick={() => handleUserClick(user.id)}
            >
              {user.username}{" "}
            </a>
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm">
            <UserRoleTable user={user} />
          </td>
          <td className="whitespace-nowrap px-3 py-4 text-sm flex space-x-4">
            {user.roles.some((role) => role.name === "ADMIN") ? (
              <> </>
            ) : (
              <>
                <div>
                  <button className={`px-2 py-1 rounded bg-red-500 text-white`}>
                    Delete
                  </button>
                  <a
                    href="/assign_device"
                    className={`mx-3 px-2 py-1 rounded ${
                      user.role === "Admin"
                        ? "bg-gray-300  cursor-not-allowed"
                        : "text-blue-500"
                    }`}
                  >
                    Assign
                  </a>
                </div>
              </>
            )}
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

      <div className="flex items-center justify-between bg-white p-6 shadow-md rounded-lg">
      <h2 className=" font-semibold">Invite or Manage Users</h2>

      {/* Add New User Button */}
      <button className="flex items-center bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
        + 
        Add New User
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
          <option value="ADMIN">ADMIN</option>
          <option value="MANAGER">MANAGER</option>
          <option value="OPERATOR">OPERATOR</option>
        </select>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <Table headers={headers} rows={rows} border-none/>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default UsersList;

