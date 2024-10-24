// src/components/Notification.tsx

import React, { useState } from 'react'
import { FaBell, FaTrash } from 'react-icons/fa'
import Title from '../../components/Title'

const mockNotifications = [
  {
    id: 1,
    title: 'Temperature Alert',
    message: 'Temperature in Room A has exceeded the threshold.',
    time: '5 minutes ago',
  },
  {
    id: 2,
    title: 'Pressure Alert',
    message: 'Pressure in Room B is too low.',
    time: '10 minutes ago',
  },
  {
    id: 3,
    title: 'Humidity Alert',
    message: 'Humidity in the Greenhouse is too high.',
    time: '30 minutes ago',
  },
]

const Notification: React.FC = () => {
  const [notifications, setNotifications] = useState(mockNotifications)

  const handleDelete = (id: number) => {
    setNotifications(notifications.filter((notification) => notification.id !== id))
    console.log(`Deleted Notification ID: ${id}`)
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between mb-6">
        <Title title="Notifications" />
        <FaBell className="text-gray-600 text-2xl" />
      </div>
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div key={notification.id} className="bg-white shadow rounded-lg p-4 flex items-start">
            <div className="flex-shrink-0">
              <FaBell className="text-rose-600 text-2xl" />
            </div>
            <div className="ml-4 w-full">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-800">{notification.title}</h3>
                <span className="text-gray-500 text-sm">{notification.time}</span>
              </div>
              <p className="mt-2 text-gray-600">{notification.message}</p>
              <div className="mt-2 text-right">
                <button
                  className="text-red-500 hover:text-red-700 focus:outline-none"
                  onClick={() => handleDelete(notification.id)}
                  aria-label={`Delete ${notification.title}`}
                >
                  <FaTrash className="text-red-500" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Notification
