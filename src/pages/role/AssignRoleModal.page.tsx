import React, { useState } from 'react'
import api from '../../api/index'

interface Role {
  id: string
  name: string
}

interface AssignRoleModalProps {
  userId: string
  roles: Role[]
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void // Callback for successful role assignment
}

const AssignRoleModal: React.FC<AssignRoleModalProps> = ({
  userId,
  isOpen,
  onClose,
  onSuccess,
}) => {
  const [roleName, setRoleName] = useState<string>('')
  const [error, setError] = useState<string | null>(null)

  const allRoles = ['MANAGER', 'OPERATOR', 'USER']

  if (!isOpen) return null // Return nothing if modal is not open

  const handleAssignRole = async () => {
    if (!roleName) {
      setError('Please select a role.')
      return
    }

    try {
      await api.post('/admin/assign_role', null, {
        params: {
          userId: userId,
          roleName: roleName,
        },
      })
      onSuccess() // Call the onSuccess callback on success
      onClose() // Close the modal after successful API call
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(`Failed to assign role, ${error}`)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">Assign Role</h2>

        <div className="mb-4">
          <label htmlFor="role-select" className="block mb-2">
            Select Role
          </label>
          <select
            id="role-select"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 py-2"
          >
            <option value="">-- Select Role --</option>
            {allRoles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleAssignRole}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Assign Role
          </button>
        </div>
      </div>
    </div>
  )
}

export default AssignRoleModal
