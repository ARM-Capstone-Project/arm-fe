/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import api from '../../api/index'
import AssignRoleModal from '../role/AssignRoleModal.page.tsx'

const UserDetails = () => {
  const { userId } = useParams<{ userId: string }>() // Get userId from the URL

  const [user, setUser] = useState<any>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate() // Used to redirect after delete
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Fetch user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${userId}`)
        setUser(response.data)
      } catch (error: any) {
        setError(`Failed to fetch user details, ${error}`)
      } finally {
        setLoading(false)
      }
    }

    fetchUser()
  }, [userId])

  // Delete user
  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await api.delete(`/users/${userId}`)
        alert('User deleted successfully')
        navigate('/users') // Redirect to the user list after deletion
      } catch (error: any) {
        setError(`Failed to delete user, ${error}`)
      }
    }
  }

  const handleOpenModal = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
  }

  const handleSuccess = () => {
    console.log('Role assigned successfully!')
    // Additional success logic if needed
    window.location.reload()
  }

  if (loading) {
    return <div className="text-center py-8">Loading user details...</div>
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="container p-6 bg-white shadow-md rounded-lg">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {user ? (
          <div>
            <h2 className="text-2xl font-bold mb-6 text-gray-800">User Details</h2>
            <div className="mb-4">
              <span className="font-semibold text-gray-600">ID:</span>
              <p className="text-gray-700">{user.id}</p>
            </div>

            <div className="mb-4">
              <span className="font-semibold text-gray-600">Username:</span>
              <p className="text-gray-700">{user.username}</p>
            </div>

            <div className="mb-4">
              <span className="font-semibold text-gray-600">Email:</span>
              <p className="text-gray-700">{user.email}</p>
            </div>

            {/* Display Roles */}
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-600">Roles</h3>
              <ul className="list-disc ml-6">
                {user.roles.map((role: any) => (
                  <li key={role.id}>
                    <strong className="text-blue-600">{role.name}</strong>:
                    <span className="text-gray-700"> {role.description}</span>
                  </li>
                ))}
              </ul>

              <div>
                <br />
                <a
                  onClick={handleOpenModal}
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                >
                  Assign Role
                </a>

                {/* Render the modal */}
                <AssignRoleModal
                  userId={user.id} // Example user ID
                  isOpen={isModalOpen}
                  onClose={handleCloseModal}
                  onSuccess={handleSuccess}
                  roles={[]}
                />
              </div>
            </div>

            {/* Display Zones if any */}
            {user.zones && user.zones.length > 0 ? (
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-600">Zones</h3>
                <ul className="list-disc ml-6">
                  {user.zones.map((zone: any) => (
                    <li key={zone.id}>{zone.name}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="mb-4 text-gray-600">No zones assigned.</p>
            )}

            {/* Back and Delete Buttons */}
            <div className="flex justify-between mt-6">
              <button
                onClick={() => navigate(-1)} // Navigate back to the previous page
                className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-4 py-2 rounded"
              >
                Back
              </button>

              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleDelete}
              >
                Delete User
              </button>
            </div>
          </div>
        ) : (
          <p className="text-red-500">User not found.</p>
        )}
      </div>
    </div>
  )
}

export default UserDetails
