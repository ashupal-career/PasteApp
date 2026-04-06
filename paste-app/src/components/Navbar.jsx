import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg"></div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              PasteBin
            </span>
          </div>
          <div className="flex gap-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`
              }
            >
              Create
            </NavLink>
            <NavLink
              to="/pastes"
              className={({ isActive }) =>
                `px-4 py-2 rounded-lg transition-all duration-200 font-medium ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                    : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`
              }
            >
              My Pastes
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar