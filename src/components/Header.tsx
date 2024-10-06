import React, { useState } from 'react';
import profileImg from '../assets/profile-picture.jpeg';

const Header: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="bg-white border-gray-200 light:bg-gray-900 shadow text-white p-2 flex justify-between items-center">
      <h1 className="text-2xl font-bold ">IoT Remote Monitoring System</h1>
      <div className="relative">
      <button 
        onClick={toggleDropdown} 
        className="flex items-center profile_btn text-sm font-medium text-gray-900 rounded-full hover:text-blue-600 dark:hover:text-blue-500 md:mr-0 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:text-white"
      >
        <img className="w-8 h-8 mr-2 rounded-full" src={profileImg} alt="user photo" />
        <span>Jane</span>
      </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2">
            <a href="/profile" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Profile</a>
            <a href="/settings" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Settings</a>
            <a href="/logout" className="block px-4 py-2 text-gray-800 hover:bg-gray-200">Logout</a>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
